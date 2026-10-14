import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const kinds=['JogoForaDoAr','LatenciaAlta'];
export function alertStates(s){
 const healthy=s.codigo===200&&s.erro===null&&/^\d+\.\d+\.\d+$/.test(s.versao||'')&&/^[a-f0-9]{40}$/.test(s.sha||'');
 const unavailable=Number.isInteger(s.codigo)&&s.codigo!==200||(s.codigo===null&&['rede','timeout'].includes(s.erro));
 const measured=typeof s.tempo==='number'&&Number.isFinite(s.tempo)&&s.tempo>=0;
 return {JogoForaDoAr:unavailable?'open':healthy?'close':'hold',LatenciaAlta:measured&&s.tempo>2?'open':healthy&&measured?'close':'hold'};
}
function validate(report){
 if(report?.schema!==1||!/^\d+$/.test(report.run||'')||!/^\d+$/.test(report.runAttempt||'')||typeof report.formalHml!=='boolean'||typeof report.formalPrd!=='boolean'||!Array.isArray(report.samples)||report.samples.length<1||report.samples.length>2)throw Error('Relatório de sondas inválido.');
 const seen=new Set();
 for(const s of report.samples){
  if(!['hml','producao'].includes(s.alvo)||seen.has(s.alvo)||!Number.isFinite(Date.parse(s.data))||!(s.codigo===null||Number.isInteger(s.codigo)&&s.codigo>=100&&s.codigo<=599)||!(s.tempo===null||typeof s.tempo==='number'&&Number.isFinite(s.tempo)&&s.tempo>=0)||![null,'http','rede','timeout','ponteiro-http','ponteiro-invalido','versao-http','versao-invalida'].includes(s.erro))throw Error('Amostra inválida/duplicada.');
  const url=new URL(s.url);if(url.protocol!=='https:'||url.username||url.password||url.search||url.hash)throw Error('URL de alvo inválida.');seen.add(s.alvo);
 }
}
const marker=(kind,target)=>`<!-- arcade-alert:v1:${kind}:${target} -->`;
export async function reconcileAlerts(report,api,{repo='luccalck/desafio-arcade'}={}){
 validate(report);
 const active=report.samples.filter(s=>s.alvo==='hml'?report.formalHml:report.formalPrd),actions=[];
 if(!active.length)return {actions,skipped:'Somente preview; sem recuperação/alerta formal.'};
 await api.ensureLabel();const open=await api.listOpen();
 for(const s of active)for(const kind of kinds){
  const state=alertStates(s)[kind],key=marker(kind,s.alvo),matches=open.filter(i=>!i.pull_request&&!i.closed&&i.body?.includes(key));
  if(state==='open'&&!matches.length){
   const issue=await api.create({title:`${kind}: ${s.alvo}`,labels:['alerta'],body:`${key}\n\nSonda real em ${s.data}.\n\nAlvo: ${s.url}\nHTTP: ${s.codigo??'desconhecido'}; segundos: ${s.tempo??'desconhecido'}; versão: ${s.versao??'desconhecida'}; SHA: ${s.sha??'desconhecido'}; erro: ${s.erro??'nenhum'}.\n\nOrigem: https://github.com/${repo}/actions/runs/${report.run} (tentativa ${report.runAttempt}).\n\nSem resposta/timeout não é recuperação; este alerta fecha somente com amostra válida normalizada.`});
   open.push(issue);actions.push({kind,target:s.alvo,action:'opened',issue:issue.html_url});
  }else if(state==='close')for(const issue of matches){await api.close(issue);issue.closed=true;actions.push({kind,target:s.alvo,action:'closed',issue:issue.html_url});}
  else actions.push({kind,target:s.alvo,action:state==='hold'?'unknown-preserved':'already-open',issues:matches.map(i=>i.html_url)});
 }
 return {run:report.run,runAttempt:report.runAttempt,actions};
}
function github(repo,token){
 if(!/^[\w.-]+\/[\w.-]+$/.test(repo||'')||!token)throw Error('Configure GITHUB_REPOSITORY/GH_TOKEN.');
 const base=`https://api.github.com/repos/${repo}`;
 async function request(path,{method='GET',body,missing=false}={}){
  const response=await fetch(base+path,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','Content-Type':'application/json','X-GitHub-Api-Version':'2022-11-28'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(10000)});
  if(missing&&response.status===404)return null;
  if(!response.ok)throw Error(`GitHub ${method}: HTTP${response.status}; credencial omitida.`);
  return response.status===204?null:response.json();
 }
 return {
  ensureLabel:async()=>{if(!await request('/labels/alerta',{missing:true}))await request('/labels',{method:'POST',body:{name:'alerta',color:'B60205',description:'Alertas operacionais do jogo, por alvo e incidente'}});},
  listOpen:async()=>{const result=[];for(let p=1;p<=20;p++){const part=await request(`/issues?state=open&labels=alerta&per_page=100&page=${p}`);result.push(...part);if(part.length<100)return result;}throw Error('Paginação excedida; nenhum fechamento inferido.');},
  create:body=>request('/issues',{method:'POST',body}),
  close:i=>request(`/issues/${i.number}`,{method:'PATCH',body:{state:'closed',state_reason:'completed'}}),
 };
}
async function main(){
 const [input='reports/sondas.json',output='reports/alertas.json']=process.argv.slice(2),report=JSON.parse(await readFile(input,'utf8'));
 validate(report);
 if(report.run!==process.env.GITHUB_RUN_ID||report.runAttempt!==process.env.GITHUB_RUN_ATTEMPT)throw Error('Sondas de outra execução/tentativa: alertas bloqueados.');
 const result=await reconcileAlerts(report,github(process.env.GITHUB_REPOSITORY,process.env.GH_TOKEN),{repo:process.env.GITHUB_REPOSITORY});
 await mkdir(dirname(resolve(output)),{recursive:true});await writeFile(output,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await main();
