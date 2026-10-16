import {createHash} from 'node:crypto';
import {readFile,readdir,mkdir,writeFile} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
import {pathToFileURL} from 'node:url';
import {preparePages} from './prepare-pages.mjs';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const json=bytes=>JSON.parse(Buffer.from(bytes).toString('utf8'));
const bytes=value=>Buffer.from(JSON.stringify(value,null,2)+'\n');
const required={
 'build/artifacts/build.zip':'build.zip','build/artifacts/build.zip.sha256':'build.zip.sha256',
 'build/artifacts/GDD.pdf':'GDD.pdf','build/artifacts/RelatorioTecnico.pdf':'RelatorioTecnico.pdf','build/dist/version.json':'version.json',
 'seguranca/sbom.cdx.json':'sbom.cdx.json','seguranca/gitleaks.json':'reports/seguranca/gitleaks.json',
 'seguranca/npm-audit.json':'reports/seguranca/npm-audit.json',
 'qualidade/junit.xml':'reports/qualidade/junit.xml','qualidade/coverage/coverage-summary.json':'reports/qualidade/coverage/coverage-summary.json',
 'e2e/reports/e2e-junit.xml':'reports/e2e/reports/e2e-junit.xml',
 'construcao/pdfinfo.txt':'reports/construcao/pdfinfo.txt','construcao/relatorio-pdfinfo.txt':'reports/construcao/relatorio-pdfinfo.txt','construcao/reproducibility.json':'reports/construcao/reproducibility.json',
};
function safe(name){if(!name||name.includes('\\')||name.startsWith('/')||name.split('/').some(p=>!p||p==='.'||p==='..'||p.includes(':')))throw Error(`caminho inválido: ${name}`);}
function identity(sha,run){if(!/^[a-f0-9]{40}$/.test(sha))throw Error('SHA inválido.');if(!/^\d+$/.test(String(run)))throw Error('run inválido.');}
function content(files,sha){
 for(const name of ['build.zip','build.zip.sha256','GDD.pdf','RelatorioTecnico.pdf','version.json','sbom.cdx.json'])if(!files[name])throw Error(`Ausente: ${name}`);
 const checksum=Buffer.from(files['build.zip.sha256']).toString().trim().split(/\s+/)[0];
 preparePages({zip:files['build.zip'],checksum,sha});
 const version=json(files['version.json']);
 // O JSON externo tem de ser exatamente o empacotado, além do SHA esperado.
 const expanded=preparePages({zip:files['build.zip'],checksum,sha});
 if(hash(expanded['hml/version.json'])!==hash(files['version.json']))throw Error('version.json diverge do ZIP.');
 for(const name of ['GDD.pdf','RelatorioTecnico.pdf'])if(!Buffer.from(files[name]).subarray(0,5).equals(Buffer.from('%PDF-')))throw Error(`PDF inválido: ${name}.`);
 validateReportPages(Buffer.from(files['reports/construcao/relatorio-pdfinfo.txt']??'').toString());
 if(json(files['sbom.cdx.json']).bomFormat!=='CycloneDX')throw Error('SBOM inválido.');
 return version;
}
export function createBundle(inputs,{sha,run,runAttempt=process.env.GITHUB_RUN_ATTEMPT??'1'}){
 if(!/^[1-9]\d*$/.test(String(runAttempt)))throw Error('Tentativa inválida.');
 identity(sha,run);for(const name of Object.keys(inputs))safe(name);
 const files={};
 for(const [source,target] of Object.entries(required)){if(!inputs[source])throw Error(`Ausente: ${source}`);files[target]=inputs[source];}
 for(const [name,value] of Object.entries(inputs)){
  if(/^(qualidade|seguranca|e2e|construcao)\//.test(name))files[`reports/${name}`]=value;
 }
 const version=content(files,sha),inventory={};
 for(const name of Object.keys(files).sort())inventory[name]={sha256:hash(files[name]),bytes:files[name].length};
 files['ci-manifest.json']=bytes({schema:1,sha,run:String(run),runAttempt:String(runAttempt),version:version.version,build:version.build,files:inventory});
 verifyBundle(files,{sha,run,runAttempt});return files;
}
export function verifyBundle(files,{sha,run,runAttempt}){
 identity(sha,run);for(const name of Object.keys(files))safe(name);
 const manifest=json(files['ci-manifest.json']);
 if(!/^[1-9]\d*$/.test(String(manifest.runAttempt))||(runAttempt!==undefined&&manifest.runAttempt!==String(runAttempt)))throw Error('Tentativa de origem divergente ou inválida.');
 if(manifest.schema!==1||manifest.sha!==sha||manifest.run!==String(run))throw Error('SHA/run/schema de origem divergente.');
 const actual=Object.keys(files).filter(n=>n!=='ci-manifest.json').sort(),expected=Object.keys(manifest.files).sort();
 if(JSON.stringify(actual)!==JSON.stringify(expected))throw Error('inventário divergente.');
 for(const name of expected){safe(name);if(hash(files[name])!==manifest.files[name].sha256||files[name].length!==manifest.files[name].bytes)throw Error(`integridade divergente: ${name}`);}
 for(const target of Object.values(required))if(!files[target])throw Error(`Ausente: ${target}`);
 const version=content(files,sha);if(manifest.version!==version.version||manifest.build!==version.build)throw Error('Metadados de versão divergentes.');
 return manifest;
}
export async function readBundleTree(root,prefix=''){
 const files={};for(const entry of await readdir(join(root,prefix),{withFileTypes:true})){
  const name=prefix?`${prefix}/${entry.name}`:entry.name;safe(name);
  if(entry.isSymbolicLink())throw Error(`Link não permitido: ${name}`);
  if(entry.isDirectory())Object.assign(files,await readBundleTree(root,name));else if(entry.isFile())files[name]=await readFile(join(root,name));
 }return files;
}
export function validateReportPages(pdfinfo){
 const count=Number(/^Pages:\s+(\d+)\s*$/m.exec(pdfinfo)?.[1]);
 if(!Number.isInteger(count)||count<1||count>12)throw Error('Relatório técnico deve abrir por pdfinfo e conter de 1 a 12 páginas.');
 return count;
}
export function hmlTiming({events=[],sha,ref,finishedAt,run,runAttempt,tagProof,mergeProof,pushPayload,repository}){
 identity(sha,run);
 let receivedAt,source,eventType,pushEventId,proof;
 // merged_at é o horário persistido pelo GitHub para a publicação do merge na main.
 // Conferir o merge_commit_sha impede confundir a aprovação de uma feature com sua integração.
 if(ref==='refs/heads/main'&&mergeProof?.merged===true&&mergeProof.baseRef==='main'&&mergeProof.mergeCommitSha===sha&&Number.isInteger(mergeProof.number)&&mergeProof.number>0&&typeof mergeProof.mergedAt==='string'&&Number.isFinite(Date.parse(mergeProof.mergedAt))){
  receivedAt=mergeProof.mergedAt;source='GitHub Pull Requests API merged_at; merge_commit_sha/base main conferidos';eventType='PullRequestMerge';proof=mergeProof;
 }
 const payloadMatches=pushPayload?.ref===ref&&pushPayload.deleted!==true&&repository&&pushPayload.repository?.full_name===repository&&(pushPayload.after===sha||(tagProof?.ref===ref&&tagProof.sha===sha&&tagProof.objectSha===pushPayload.after));
 if(!receivedAt&&payloadMatches){
  const value=pushPayload.repository.pushed_at;
  const date=typeof value==='number'&&Number.isFinite(value)&&value>0?new Date(value*1000):typeof value==='string'&&/^\d{4}-\d\d-\d\dT/.test(value)?new Date(value):null;
  if(date&&Number.isFinite(date.valueOf())){receivedAt=date.toISOString();source='GitHub Actions push payload repository.pushed_at; repositório/ref/after conferidos';eventType='ActionsPushPayload';proof={repository,ref,after:pushPayload.after};}
 }
 if(!receivedAt){
  const matches=events.filter(e=>(e.type==='PushEvent'&&e.payload?.ref===ref&&(e.payload?.head===sha||e.payload?.after===sha))||(ref.startsWith('refs/tags/')&&tagProof?.sha===sha&&tagProof?.ref===ref&&e.type==='CreateEvent'&&e.payload?.ref_type==='tag'&&e.payload.ref===ref.slice(10)));
  const event=matches.sort((a,b)=>Date.parse(b.created_at)-Date.parse(a.created_at))[0];
  if(event?.id&&Number.isFinite(Date.parse(event.created_at))){receivedAt=event.created_at;source='GitHub repository Events API created_at; SHA/ref conferidos';eventType=event.type;pushEventId=String(event.id);proof=event.type==='CreateEvent'?tagProof:undefined;}
 }
 if(!receivedAt)throw Error('PushEvent, payload ou merge comprovado de mesmo SHA/ref ausente; criação do run e data do commit não substituem publicação.');
 const seconds=(Date.parse(finishedAt)-Date.parse(receivedAt))/1000;
 if(!Number.isFinite(seconds)||seconds<0)throw Error('Cronologia push/HML inválida.');
 return {schema:1,sha,ref,run:String(run),runAttempt:String(runAttempt),pushEventId,pushReceivedAt:receivedAt,e2eFinishedAt:finishedAt,pushToHmlSeconds:seconds,limitSeconds:900,withinLimit:seconds<=900,eventType,proof,source};
}
export async function collectHmlTiming(env=process.env){
 const {GITHUB_REPOSITORY:repo,GITHUB_SHA:sha,GITHUB_REF:ref,GITHUB_RUN_ID:run,GITHUB_RUN_ATTEMPT:runAttempt,GH_TOKEN:token}=env;
 if(!/^[\w.-]+\/[\w.-]+$/.test(repo??'')||!token)throw Error('Repositório/token de leitura exigidos para comprovar push.');
 const finishedAt=new Date().toISOString();
 async function api(path){
  let r;
  try{r=await fetch(`https://api.github.com/repos/${repo}/${path}`,{headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json'},cache:'no-store',signal:AbortSignal.timeout(15000)});}catch{throw Error('API GitHub: falha de transporte ou tempo limite.');}
  if(!r.ok)throw Error(`API GitHub: HTTP ${r.status}.`);
  try{return await r.json();}catch{throw Error('API GitHub: resposta JSON inválida.');}
 }
 let tagProof,mergeProof,pushPayload,prSourceError;
 if(ref.startsWith('refs/tags/')){
  let object=(await api(`git/ref/tags/${ref.slice(10)}`)).object;const objectSha=object.sha;
  if(object.type==='tag')object=(await api(`git/tags/${object.sha}`)).object;
  if(object.type!=='commit'||object.sha!==sha)throw Error('Tag remota não aponta ao commit do deploy.');
  tagProof={ref,sha:object.sha,objectSha,source:`https://api.github.com/repos/${repo}/git/ref/tags/${ref.slice(10)}`};
 }
 if(ref==='refs/heads/main'){
  let prs;
  try{
   prs=await api(`commits/${sha}/pulls?per_page=100`);
   if(!Array.isArray(prs))throw Error('API GitHub: lista de PRs inválida.');
  }catch(e){prSourceError=`Fonte de PRs indisponível: ${e.message}`;}
  if(Array.isArray(prs)){
   const pr=prs.find(p=>p?.merged_at&&p.base?.ref==='main'&&p.base?.repo?.full_name===repo&&p.merge_commit_sha===sha);
   if(pr)mergeProof={number:pr.number,baseRef:pr.base.ref,merged:true,mergeCommitSha:pr.merge_commit_sha,mergedAt:pr.merged_at,url:pr.html_url};
  }
 }
 if(env.GITHUB_EVENT_NAME==='push'&&env.GITHUB_EVENT_PATH)pushPayload=JSON.parse(await readFile(env.GITHUB_EVENT_PATH,'utf8'));
 let report,error;
 const params={sha,ref,finishedAt,run,runAttempt,tagProof,mergeProof,pushPayload,repository:repo};
 try{report=hmlTiming(params);}catch(e){error=e;}
 // O feed público é somente fonte complementar: pode atrasar até seis horas.
 // Nunca aumentar a janela de15min nem substituir a fonte por created_at do run.
 for(let retry=0;!report&&retry<2;retry++){
  const events=[];for(let page=1;page<=3;page++){
   let batch;
   try{batch=await api(`events?per_page=100&page=${page}`);}catch(e){throw Error([`Fonte de eventos indisponível: ${e.message}`,prSourceError].filter(Boolean).join(' '),{cause:e});}
   events.push(...batch);if(batch.length<100)break;
  }
  try{report=hmlTiming({...params,events});}catch(e){error=e;}
  if(!report&&retry<1)await new Promise(resolve=>setTimeout(resolve,60000));
 }
 if(!report)throw Error([error.message,prSourceError].filter(Boolean).join(' '));
 if(prSourceError)report.sourceWarnings=[prSourceError];
 report.apiUrl=mergeProof?.url??`https://api.github.com/repos/${repo}/events`;report.collectedAt=new Date().toISOString();
 await mkdir('reports',{recursive:true});await writeFile('reports/hml-run.json',JSON.stringify(report,null,2)+'\n');
 if(!report.withinLimit)throw Error(`Push→HML ${report.pushToHmlSeconds}s excede 900s.`);
 return report;
}
async function main(){
 const [mode,input,output,sha,run]=process.argv.slice(2);
 if(mode==='hml-timing'){console.log(JSON.stringify(await collectHmlTiming()));return;}
 if(!['create','verify'].includes(mode)||!input||!output||!sha||!run)throw Error('Use create|verify INPUT OUTPUT SHA RUN_ID (OUTPUT=- em verify).');
 const source=await readBundleTree(resolve(input));
 if(mode==='verify'){const manifest=verifyBundle(source,{sha,run,runAttempt:process.env.GITHUB_RUN_ATTEMPT});console.log(`Contrato validado: SHA ${manifest.sha}; run ${manifest.run}; ${Object.keys(manifest.files).length} arquivos.`);return;}
 const files=createBundle(source,{sha,run}),destination=resolve(output);
 await mkdir(destination,{recursive:true});if((await readdir(destination)).length)throw Error('Destino deve estar vazio; não sobrescrever pacote anterior.');
 for(const [name,value] of Object.entries(files)){const target=join(destination,name);await mkdir(dirname(target),{recursive:true});await writeFile(target,value);}
 console.log(`Pacote CI criado sem recompilação: SHA ${sha}; run ${run}; ${Object.keys(files).length} arquivos.`);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await main();
