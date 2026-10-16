import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import {setTimeout as pause} from 'node:timers/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const files=['index.html','game.js','style.css','version.json','LEIA-ME.txt','LICENSE.txt','THIRD_PARTY.txt'];
const exists=async path=>{try{await access(path);return true;}catch{return false;}};
export function validateExercise(e){
 if(e.GITHUB_ACTIONS!=='true'||e.GITHUB_EVENT_NAME!=='workflow_dispatch'||e.GITHUB_REF!=='refs/heads/main'||e.ENSAIO_SCOPE!=='recuperacao'||!/^[a-f0-9]{40}$/.test(e.GITHUB_SHA??'')||!/^[1-9]\d*$/.test(e.GITHUB_RUN_ID??'')||!/^[1-9]\d*$/.test(e.GITHUB_RUN_ATTEMPT??''))throw Error('Ensaio somente em dispatch explícito da main.');
 const u=new URL(e.SITE_URL);if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash)throw Error('SITE_URL HTTPS inválida.');return u.href.replace(/\/?$/,'/');
}
export function summarizeRecovery({fault,receipt,observations}){
 const start=Date.parse(fault?.faultStartedAt),end=Date.parse(receipt?.observedAt),samples=observations?.samples;
 if(fault?.scope!=='ensaio'||fault.injectionObserved!==true||!Number.isFinite(start)||!Number.isFinite(end)||end<start||receipt.state!=='recuperada'||receipt.sourceSha!==fault.sha||receipt.sha!==fault.baseline||String(receipt.run)!==fault.run||String(receipt.runAttempt)!==fault.attempt||files.some(f=>!/^[a-f0-9]{64}$/.test(receipt.recoveredFilesSha256?.[f]??'')))throw Error('Prova de recuperação divergente ou incompleta.');
 if(!Array.isArray(samples)||samples.length<2||samples.some(s=>s.codigo!==200||!Number.isFinite(Date.parse(s.at)))||Date.parse(samples[0].at)>start||Date.parse(samples.at(-1).at)<end||samples.some((s,i)=>i>0&&(Date.parse(s.at)-Date.parse(samples[i-1].at)>8000||Date.parse(s.at)<Date.parse(samples[i-1].at))))throw Error('Observação HTTP incompleta, interrompida ou com falha.');
 const seconds=(end-start)/1000;if(seconds>=300)throw Error(`Recuperação excedeu limite estrito: ${seconds}s.`);
 return {schema:1,scope:'ensaio',seconds,withinLimit:true,baseline:receipt.sha,candidate:fault.sha,httpSamples:samples.length,observedHttpFailures:0,limitation:'Amostras HTTP não garantem disponibilidade entre observações; falha foi injetada apenas no navegador do ensaio.'};
}
export async function injectBrowserFault({site,sha,channel='chrome',screenshot}){
 const base=new URL(site);if(base.protocol!=='https:'||base.username||base.password||base.search||base.hash||!/^[a-f0-9]{40}$/.test(sha))throw Error('Alvo de injeção inválido.');
 const {chromium}=await import('playwright');const browser=await chromium.launch({channel});let aborted=0;
 try{const page=await browser.newPage();await page.route('**/game.js',async route=>{const u=new URL(route.request().url());if(u.origin===base.origin&&u.pathname.startsWith(base.pathname+`releases/${sha}/`)){aborted++;await route.abort('failed');}else await route.continue();});await page.goto(site,{waitUntil:'networkidle',timeout:20000});if(screenshot)await page.screenshot({path:screenshot,fullPage:true});return {injectionObserved:aborted>0,blockedRequests:aborted,finalUrl:page.url(),observedAt:new Date().toISOString()};}
 finally{await browser.close();}
}
async function save(path,value){await mkdir('reports',{recursive:true});await writeFile(path,JSON.stringify(value,null,2)+'\n');}
async function main(){
 const mode=process.argv[2],site=validateExercise(process.env);
 if(mode==='observar'){
  const result={schema:1,scope:'ensaio',startedAt:new Date().toISOString(),samples:[]};
  const deadline=Date.now()+900000;
  while(Date.now()<deadline){
   const at=new Date().toISOString(),start=performance.now();let codigo=null,error;
   try{const r=await fetch(site,{cache:'no-store',redirect:'error',signal:AbortSignal.timeout(3000)});await r.arrayBuffer();codigo=r.status;}catch(e){error=e.name;}
   result.samples.push({at,codigo,seconds:(performance.now()-start)/1000,error});await save('reports/ensaio-http.json',result);
   if(await exists('reports/ensaio-observador.parar')){result.finishedAt=new Date().toISOString();await save('reports/ensaio-http.json',result);return;}
   await pause(1000);
  }
  throw Error('Observador atingiu15min sem encerramento.');
 }
 if(mode==='injetar'){
  const tx=JSON.parse(await readFile('reports/producao-transacao.json','utf8'));
  if(tx.revalidation||tx.sha===tx.baseline||tx.sha!==process.env.GITHUB_SHA)throw Error('Ensaio exige candidata nova e baseline distinta.');
  const report={scope:'ensaio',run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,sha:tx.sha,baseline:tx.baseline,faultStartedAt:new Date().toISOString(),injection:'Bloqueio de game.js apenas no contexto Playwright deste ensaio',injectionObserved:false};
  await save('reports/ensaio-falha.json',report);
  try{Object.assign(report,await injectBrowserFault({site,sha:tx.sha,channel:process.env.PLAYWRIGHT_CHANNEL||'chromium',screenshot:'reports/ensaio-falha.png'}));}
  finally{await save('reports/ensaio-falha.json',report);}
  throw Error(report.injectionObserved?'ENSAIO CONTROLADO: falha de recurso observada; acionar recuperação existente.':'Injeção não observada: ensaio não comprovado.');
 }
 if(mode==='concluir'){
  await writeFile('reports/ensaio-observador.parar','stop');let observations;
  for(let i=0;i<40;i++){observations=JSON.parse(await readFile('reports/ensaio-http.json','utf8'));if(observations.finishedAt)break;await pause(250);}
  if(!observations.finishedAt)throw Error('Observador não confirmou encerramento.');
  const result=summarizeRecovery({fault:JSON.parse(await readFile('reports/ensaio-falha.json','utf8')),receipt:JSON.parse(await readFile('reports/producao-recuperacao.json','utf8')),observations});await save('reports/ensaio-recuperacao.json',result);console.log(JSON.stringify(result));return;
 }
 throw Error('Use observar, injetar ou concluir.');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await main();
