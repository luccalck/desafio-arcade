import {createServer} from 'node:http';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {pathToFileURL} from 'node:url';
import {sondar} from './sondar.mjs';
import {reconcileAlerts,github} from './alertas.mjs';
export async function exerciseAlerts({api,run,attempt,sha,version,output='reports/ensaio-alertas.json',delayMs=2200}){
 if(!/^[1-9]\d*$/.test(String(run))||!/^[1-9]\d*$/.test(String(attempt))||!/^[a-f0-9]{40}$/.test(sha)||!/^\d+\.\d+\.\d+$/.test(version)||delayMs<2100||delayMs>5000)throw Error('Contexto de ensaio inválido.');
 let mode='normal';const result={schema:1,scope:'ensaio',exerciseId:`${run}-${attempt}`,startedAt:new Date().toISOString(),injection:'HTTP404 e atraso real no servidor temporário127.0.0.1; não é produção',phases:[],issues:[],completed:false};
 const server=createServer((req,res)=>{const respond=()=>{res.setHeader('Content-Type','application/json');res.statusCode=mode==='fora'?404:200;res.end(JSON.stringify(req.url==='/version.json'?{version,sha}:{scope:'ensaio',mode}));};if(mode==='lento'&&req.url==='/')setTimeout(respond,delayMs);else respond();});
 await new Promise((yes,no)=>{server.once('error',no);server.listen(0,'127.0.0.1',yes);});
 const url=`http://127.0.0.1:${server.address().port}/`;
 async function phase(name,next){mode=next;const sample=await sondar({alvo:'hml',url});const report={schema:1,scope:'ensaio',exerciseId:result.exerciseId,run:String(run),runAttempt:String(attempt),formalHml:false,formalPrd:false,samples:[sample]};const alerts=await reconcileAlerts(report,api);result.phases.push({name,report,alerts});return alerts;}
 try{
  const first=await phase('fora-do-ar','fora');if(!first.actions.some(x=>x.kind==='JogoForaDoAr'&&x.action==='opened'))throw Error('JogoForaDoAr não abriu.');
  const duplicate=await phase('deduplicacao-fora','fora');if(duplicate.actions.some(x=>x.action==='opened'))throw Error('Alerta duplicado.');
  const restored=await phase('recuperacao-http','normal');if(!restored.actions.some(x=>x.kind==='JogoForaDoAr'&&x.action==='closed'))throw Error('JogoForaDoAr não fechou.');
  const slow=await phase('latencia-alta','lento');if(!slow.actions.some(x=>x.kind==='LatenciaAlta'&&x.action==='opened'))throw Error('LatenciaAlta não abriu.');
  const slowDuplicate=await phase('deduplicacao-latencia','lento');if(slowDuplicate.actions.some(x=>x.action==='opened'))throw Error('Latência duplicada.');
  const healthy=await phase('recuperacao-latencia','normal');if(!healthy.actions.some(x=>x.kind==='LatenciaAlta'&&x.action==='closed'))throw Error('LatenciaAlta não fechou.');
  for(const phase of result.phases)for(const action of phase.alerts.actions)if(action.action==='opened'){
   const number=Number(action.issue.split('/').at(-1)),issue=await api.get({number});
   if(issue.state!=='closed'||!Number.isFinite(Date.parse(issue.created_at))||!Number.isFinite(Date.parse(issue.closed_at)))throw Error('Issue sem fechamento comprovado.');
   result.issues.push({number,url:issue.html_url,kind:action.kind,openedAt:issue.created_at,closedAt:issue.closed_at,recoveryMinutes:(Date.parse(issue.closed_at)-Date.parse(issue.created_at))/60000});
  }
  result.exerciseMttrMinutes=result.issues.reduce((sum,i)=>sum+i.recoveryMinutes,0)/result.issues.length;result.completed=true;
 }catch(error){result.error=error.message;throw error;}
 finally{
  // Somente o alvo e marcador deste ensaio são restaurados; nenhum incidente operacional é fechado.
  if(!result.completed)try{await phase('limpeza-final','normal');}catch{result.cleanupFailed=true;}
  server.closeAllConnections();await new Promise(yes=>server.close(yes));result.finishedAt=new Date().toISOString();await mkdir(dirname(resolve(output)),{recursive:true});await writeFile(output,JSON.stringify(result,null,2)+'\n');
 }
 return result;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 if(process.env.GITHUB_ACTIONS!=='true'||process.env.GITHUB_EVENT_NAME!=='workflow_dispatch'||process.env.ENSAIO_SCOPE!=='alertas')throw Error('Somente dispatch explícito de ensaio no Actions.');
 const pkg=JSON.parse(await(await import('node:fs/promises')).readFile('package.json','utf8'));
 const r=await exerciseAlerts({api:github(process.env.GITHUB_REPOSITORY,process.env.GH_TOKEN),run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,sha:process.env.GITHUB_SHA,version:pkg.version});
 console.log(JSON.stringify({scope:r.scope,completed:r.completed,issues:r.issues,exerciseMttrMinutes:r.exerciseMttrMinutes}));
}
