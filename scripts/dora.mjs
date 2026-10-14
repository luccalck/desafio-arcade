import {writeFile,mkdir} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const keys={deploymentFrequency:['deploys/dia','Implantações formais bem-sucedidas / dias da janela'],leadTime:['horas','Média entre data do commit e término do deploy-prd aprovado; virada seguida de falha usa horário do commit de controle, sem afirmar confirmação CDN'],changeFailureRate:['%','Implantações formais seguidas de rollback correlacionado / implantações formais'],mttr:['minutos','Média da abertura ao fechamento de Issues de alerta']};
const inside=(value,from,to)=>Number.isFinite(Date.parse(value))&&Date.parse(value)>=Date.parse(from)&&Date.parse(value)<Date.parse(to);
export async function collectPages(get,{limit=100}={}){
 const all=[];for(let page=1;page<=limit;page++){const part=await get(page);if(!Array.isArray(part))throw Error('Resposta paginada inválida.');all.push(...part);if(part.length<100)return all;}throw Error('Limite de paginação excedido; resultado incompleto.');
}
export function calculateDora({repo,from,to,runs,jobs,commits,issues,rollbacks,promotions=null,generatedAt=new Date().toISOString()}){
 if(!/^[-\w.]+\/[-\w.]+$/.test(repo)||!Number.isFinite(Date.parse(from))||!Number.isFinite(Date.parse(to))||Date.parse(to)<=Date.parse(from))throw Error('Repositório ou janela inválidos.');
 const days=(Date.parse(to)-Date.parse(from))/86400000,deploys=[];
 for(const run of runs){
  if(run.event!=='push'||!(run.head_branch==='main'||/^v\d+\.\d+\.\d+$/.test(run.head_branch??''))||!/^[a-f0-9]{40}$/.test(run.head_sha??''))continue;
  for(const job of jobs.get(run.id)??[])if(job.name==='deploy-prd'){
   const promoted=promotions?.find(p=>p.sha===run.head_sha&&p.run===run.id&&inside(p.at,from,to));
   if(promoted){
    const confirmed=job.conclusion==='success'&&inside(job.completed_at,from,to);
    deploys.push({sha:run.head_sha,at:confirmed?job.completed_at:promoted.at,url:confirmed?(job.html_url??run.html_url):promoted.url,run:run.id,promotionUrl:promoted.url,timing:confirmed?'deploy-prd-concluido-com-smoke':'commit-de-controle-sem-confirmacao-cdn'});
   }
   else if(promotions===null&&job.conclusion==='success'&&inside(job.completed_at,from,to))deploys.push({sha:run.head_sha,at:job.completed_at,url:job.html_url??run.html_url,run:run.id});
  }
 }
 const unique=[...new Map(deploys.map(d=>[`${d.run}:${d.sha}`,d])).values()].sort((a,b)=>a.at.localeCompare(b.at));
 const leads=unique.map(d=>({d,start:commits.get(d.sha)})).filter(x=>x.start&&Date.parse(x.start)<=Date.parse(x.d.at));
 const closed=issues.filter(i=>!i.pull_request&&inside(i.created_at,from,to)&&inside(i.closed_at,from,to)&&Date.parse(i.closed_at)>=Date.parse(i.created_at));
 const failed=rollbacks===null?null:unique.filter(d=>rollbacks.some(r=>r.sha===d.sha&&Date.parse(r.at)>=Date.parse(d.at)&&Date.parse(r.at)<Date.parse(to)));
 const metric=(key,value,samples,source,reason)=>({value,unit:keys[key][0],samples,source:source??null,reason:reason??null});
 const metrics={
  deploymentFrequency:metric('deploymentFrequency',unique.length?unique.length/days:null,unique.length,unique[0]?.url,unique.length?null:'Nenhum deploy-prd formal bem-sucedido na janela.'),
  leadTime:metric('leadTime',leads.length?leads.reduce((sum,x)=>sum+(Date.parse(x.d.at)-Date.parse(x.start))/3600000,0)/leads.length:null,leads.length,leads[0]?.d.url,leads.length?null:'Sem vínculo completo commit → deploy-prd.'),
  changeFailureRate:metric('changeFailureRate',unique.length&&failed!==null?100*failed.length/unique.length:null,unique.length,failed===null?null:unique[0]?.url,failed===null?'Histórico gh-pages de rollback indisponível.':unique.length?null:'Sem deploy formal como denominador.'),
  mttr:metric('mttr',closed.length?closed.reduce((sum,i)=>sum+(Date.parse(i.closed_at)-Date.parse(i.created_at))/60000,0)/closed.length:null,closed.length,closed[0]?.html_url,closed.length?null:'Sem Issue de alerta aberta e fechada na janela.')
 };
 return {schema:1,generatedAt,period:{from,to},metrics,baseline:{carpartsDays:11,leadTimeDays:metrics.leadTime.value===null?null:metrics.leadTime.value/24},evidence:{deploys:unique,issues:closed.map(i=>({number:i.number,url:i.html_url,opened:i.created_at,closed:i.closed_at})),rollbacks:rollbacks?.map(r=>({sha:r.sha,at:r.at,url:r.url}))??null},definitions:Object.fromEntries(Object.entries(keys).map(([k,v])=>[k,v[1]]))};
}
export async function fetchDora({repo,from,to,token,fetcher=globalThis.fetch}){
 if(!token)throw Error('GH_TOKEN necessário para consulta somente leitura.');
 const api=async path=>{const r=await fetcher(`https://api.github.com/repos/${repo}${path}`,{headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'},signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error(`GitHub API HTTP ${r.status}: ${path}`);return r.json();};
 const created=`${new Date(Date.parse(from)-86400000).toISOString()}..${to}`;
 const runs=await collectPages(async page=>(await api(`/actions/workflows/esteira.yml/runs?created=${encodeURIComponent(created)}&per_page=100&page=${page}`)).workflow_runs);
 const eligible=runs.filter(r=>r.event==='push'&&(r.head_branch==='main'||/^v\d+\.\d+\.\d+$/.test(r.head_branch??''))&&Date.parse(r.created_at)>=Date.parse(from)-86400000&&Date.parse(r.created_at)<Date.parse(to));
 const jobs=new Map(),commits=new Map();
 for(const run of eligible){
  jobs.set(run.id,await collectPages(async page=>(await api(`/actions/runs/${run.id}/jobs?per_page=100&page=${page}`)).jobs));
  if(!commits.has(run.head_sha))commits.set(run.head_sha,(await api(`/commits/${run.head_sha}`)).commit.committer.date);
 }
 const issues=await collectPages(async page=>await api(`/issues?state=all&labels=alerta&since=${encodeURIComponent(from)}&per_page=100&page=${page}`));
 let rollbacks=null,promotions=null;try{
  const history=await collectPages(async page=>await api(`/commits?sha=gh-pages&since=${encodeURIComponent(from)}&until=${encodeURIComponent(to)}&per_page=100&page=${page}`));
  rollbacks=history.flatMap(c=>{const match=/^deploy: rollback [a-f0-9]{40}; falha=([a-f0-9]{40});/.exec(c.commit?.message??'');return match?[{sha:match[1],at:c.commit.committer.date,url:c.html_url}]:[];});
  promotions=history.flatMap(c=>{const match=/^deploy: promover ([a-f0-9]{40});.*execução (\d+)\/\d+/.exec(c.commit?.message??'');return match?[{sha:match[1],run:Number(match[2]),at:c.commit.committer.date,url:c.html_url}]:[];});
 }catch(e){if(!String(e.message).includes('HTTP 404'))throw e;}
 return calculateDora({repo,from,to,runs:eligible,jobs,commits,issues,rollbacks,promotions});
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const [from,to,output='reports/dora.json']=process.argv.slice(2),repo=process.env.GITHUB_REPOSITORY??'luccalck/desafio-arcade';
 if(!from||!to)throw Error('Uso: node scripts/dora.mjs <from-ISO> <to-ISO> [saída]');
 const result=await fetchDora({repo,from,to,token:process.env.GH_TOKEN});await mkdir(dirname(output),{recursive:true});await writeFile(output,JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify({generatedAt:result.generatedAt,period:result.period,metrics:result.metrics,output}));
}
