import {readFile,readdir,mkdir,writeFile,appendFile} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {unzipSync,strFromU8} from 'fflate';
import {verifyBundle} from './ci-bundle.mjs';
import {planRollout} from './rollout.mjs';
import {normalizeRollout,validSha} from '../pages/rollout-contract.mjs';
const hash=b=>createHash('sha256').update(b).digest('hex');
const RELEASE_FILES=['index.html','style.css','game.js','version.json','LEIA-ME.txt','LICENSE.txt','THIRD_PARTY.txt'];
function siteURL(value){const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash)throw Error('SITE_URL HTTPS sem credenciais exigida.');return u.href.replace(/\/?$/,'/');}
function baselineHashes(existing,sha){
 return Object.fromEntries(RELEASE_FILES.map(name=>{
  const bytes=existing[`releases/${sha}/${name}`];if(!bytes)throw Error(`baseline incompleta: ${name}`);
  return [name,hash(bytes)];
 }));
}
export async function verifyRecoveredRelease(transaction,{fetcher=globalThis.fetch}={}){
 if(!validSha(transaction?.baseline)||!transaction.baselineFilesSha256||RELEASE_FILES.some(name=>!/^[a-f0-9]{64}$/.test(transaction.baselineFilesSha256[name]??'')))throw Error('Hashes da baseline ausentes.');
 const base=siteURL(transaction.siteUrl),observed={};
 for(const name of RELEASE_FILES){
  const url=new URL(`releases/${transaction.baseline}/${name}`,base);
  const response=await fetcher(url,{cache:'no-store',redirect:'error',signal:AbortSignal.timeout(10000)});
  if(!response.ok)throw Error(`Recuperação HTTP inválido: ${name}`);
  const bytes=new Uint8Array(await response.arrayBuffer());observed[name]=hash(bytes);
  if(observed[name]!==transaction.baselineFilesSha256[name])throw Error(`Recuperação diverge da baseline: ${name}`);
  if(name==='version.json'){
   const version=JSON.parse(Buffer.from(bytes).toString('utf8'));
   if(version.sha!==transaction.baseline||version.version!==transaction.baselineVersion)throw Error('Versão recuperada divergente.');
  }
 }
 return observed;
}
function identity(bundle,opts){const m=verifyBundle(bundle,opts);if(String(m.runAttempt)!==String(opts.runAttempt)||!/^[1-9]\d*$/.test(String(opts.runAttempt)))throw Error('Tentativa do pacote divergente.');return m;}
export function verifyApproval(environment,history,actor){
 const reviewers=environment.protection_rules?.find(r=>r.type==='required_reviewers')?.reviewers?.filter(r=>r.type==='User').map(r=>r.reviewer.login)??[];
 if(environment.name!=='producao'||environment.can_admins_bypass!==false||!reviewers.length)throw Error('proteção de produção obrigatória.');
 const approved=history.find(r=>r.state==='approved'&&r.user?.type==='User'&&r.user.login!==actor&&reviewers.includes(r.user.login)&&r.environments?.some(e=>e.id===environment.id&&e.name==='producao'));
 if(!approved)throw Error('aprovação humana de producao ausente.');
 return {environment:'producao',environmentId:environment.id,reviewer:approved.user.login,state:'approved'};
}
export function planManualRollback({existing,environment,approvals,actor,reason,run,runAttempt,siteUrl}){
 verifyApproval(environment,approvals,actor);
 if(!['smoke-falhou','alerta-confirmado','degradacao-confirmada','outro-incidente-validado'].includes(reason))throw Error('Motivo operacional inválido.');
 const current=normalizeRollout(JSON.parse(strFromU8(existing['rollout.json'])));
 if(!current.estavel||!current.anterior||current.estavel===current.anterior)throw Error('Versão anterior validada indisponível.');
 const plan=planRollout({action:'rollback',existing,sha:current.anterior,actor,reason,run,runAttempt,siteUrl});
 return {current:current.estavel,target:current.anterior,version:JSON.parse(strFromU8(existing[`releases/${current.anterior}/version.json`])).version,plan};
}
export async function makeHmlReceipt(bundle,{fetcher=globalThis.fetch,...opts}){
 identity(bundle,opts);const base=siteURL(opts.siteUrl),files=unzipSync(bundle['build.zip']),observed={};
 for(const [name,bytes] of Object.entries(files)){
  const r=await fetcher(new URL('hml/'+name,base),{cache:'no-store',redirect:'error',signal:AbortSignal.timeout(10000)});
  if(!r.ok||hash(new Uint8Array(await r.arrayBuffer()))!==hash(bytes))throw Error(`HML diverge do artefato: ${name}`);observed[name]=hash(bytes);
 }
 return {schema:1,sha:opts.sha,run:String(opts.run),runAttempt:String(opts.runAttempt),siteUrl:base,zipSha256:hash(bundle['build.zip']),files:observed,collectedAt:new Date().toISOString()};
}
function verifyReceipt(bundle,opts,r){
 identity(bundle,opts);const files=unzipSync(bundle['build.zip']);
 if(r?.schema!==1||r.sha!==opts.sha||r.run!==String(opts.run)||r.runAttempt!==String(opts.runAttempt)||r.siteUrl!==siteURL(opts.siteUrl)||r.zipSha256!==hash(bundle['build.zip'])||!Number.isFinite(Date.parse(r.collectedAt))||Date.parse(r.collectedAt)>Date.now()+60000||Object.keys(r.files??{}).length!==Object.keys(files).length||Object.entries(files).some(([n,b])=>r.files[n]!==hash(b)))throw Error('Aceite HML de mesmo SHA/run/tentativa/URL/bytes exigido.');
}
export function ensurePipeline(opts,env=process.env){
 if(env.GITHUB_ACTIONS!=='true'||!env.GITHUB_ACTOR||(env.GITHUB_TRIGGERING_ACTOR??env.GITHUB_ACTOR)!==opts.actor||env.GITHUB_SHA!==opts.sha||env.GITHUB_RUN_ID!==String(opts.run)||env.GITHUB_RUN_ATTEMPT!==String(opts.runAttempt)||!/^[-\w.]+\/[-\w.]+$/.test(env.GITHUB_REPOSITORY??'')||!(env.GITHUB_REF==='refs/heads/main'||/^refs\/tags\/v\d+\.\d+\.\d+$/.test(env.GITHUB_REF??'')))throw Error('Contexto da pipeline formal divergente.');
 for(const flag of ['FORMAL_HML_ENABLED','FORMAL_PRD_ENABLED','MONITOR_ENABLED','ALERTS_ENABLED'])if(env[flag]!=='true')throw Error(`Gate inativo: ${flag}`);
}
export function verifyFinalSmoke(transaction,opts,smoke,{recovered=false}={}){
 const expectedSha=recovered?transaction.baseline:opts.sha;
 const at=Date.parse(smoke?.date),openedAt=Date.parse(transaction.createdAt);
 if(transaction.sha!==opts.sha||transaction.run!==String(opts.run)||transaction.runAttempt!==String(opts.runAttempt)||!Number.isFinite(at)||!Number.isFinite(openedAt)||at<openedAt||at>Date.now()+60000||smoke.passed!==true||smoke.mode!=='root'||smoke.expectedSha!==expectedSha||smoke.version?.sha!==expectedSha||(recovered&&smoke.version?.version!==transaction.baselineVersion)||smoke.url!==siteURL(opts.siteUrl)||smoke.run!==String(opts.run)||smoke.runAttempt!==String(opts.runAttempt)||!Array.isArray(smoke.errors)||smoke.errors.length)throw Error('Smoke final da raiz sem prova correspondente.');
}
export function planProduction(stage,{existing,bundle,receipt,environment,approvals,transaction,smoke,...opts}){
 const current=normalizeRollout(JSON.parse(strFromU8(existing['rollout.json']))),reason=`${stage}; execução ${opts.run}/${opts.runAttempt}`;
 if(stage==='abrir'){
  verifyReceipt(bundle,opts,receipt);const approval=verifyApproval(environment,approvals,opts.actor);
  if(!current.estavel)throw Error('Baseline estável recuperável exigida antes de produção.');
  const plan=planRollout({...opts,action:'abrir',reason,existing,bundle});
  const baselineVersion=JSON.parse(strFromU8(existing[`releases/${current.estavel}/version.json`])).version;
  return {action:'abrir',sha:opts.sha,plan,transaction:{schema:1,...opts,siteUrl:siteURL(opts.siteUrl),baseline:current.estavel,baselineVersion,baselineFilesSha256:baselineHashes(existing,current.estavel),zipSha256:receipt.zipSha256,approval,createdAt:new Date().toISOString()}};
 }
 if(transaction?.schema!==1||transaction.sha!==opts.sha||transaction.run!==String(opts.run)||transaction.runAttempt!==String(opts.runAttempt)||transaction.actor!==opts.actor||transaction.siteUrl!==siteURL(opts.siteUrl)||!validSha(transaction.baseline))throw Error('Transação de origem divergente.');
 const actualBaseline=baselineHashes(existing,transaction.baseline);
 for(const name of RELEASE_FILES)if(actualBaseline[name]!==transaction.baselineFilesSha256?.[name])throw Error(`baseline alterada: ${name}`);
 if(stage==='promover'){
  if(current.estavel!==transaction.baseline||current.canario!==opts.sha)throw Error('predecessor mudou antes de promover.');
  return {action:'promover',sha:opts.sha,plan:planRollout({...opts,action:'promover',reason,existing,smoke}),transaction};
 }
 if(stage==='recuperar'){
  let action,sha;
  if(current.estavel===opts.sha&&current.anterior===transaction.baseline){action='rollback';sha=transaction.baseline;}
  else if(current.estavel===transaction.baseline&&current.canario===opts.sha){action='abortar';sha=opts.sha;}
  else if(current.estavel===transaction.baseline&&!current.canario)return {action:null,sha:transaction.baseline,plan:{files:existing},transaction};
  else throw Error('predecessor alheio: recuperação não pode sobrescrever outra implantação.');
  return {action,sha,plan:planRollout({...opts,action,sha,reason,existing}),transaction};
 }
 throw Error('Estágio inválido.');
}
async function tree(root,prefix=''){
 const files={};for(const e of await readdir(join(root,prefix),{withFileTypes:true})){if(e.name==='.git')continue;if(e.isSymbolicLink())throw Error('Link não permitido.');const n=prefix?`${prefix}/${e.name}`:e.name;if(e.isDirectory())Object.assign(files,await tree(root,n));else if(e.isFile())files[n]=await readFile(join(root,n));}return files;
}
const json=async p=>JSON.parse(await readFile(p,'utf8'));
async function save(path,value){await mkdir(dirname(path),{recursive:true});await writeFile(path,JSON.stringify(value,null,2)+'\n');}
async function main(){
 const [stage,...argv]=process.argv.slice(2),args={};
 for(let i=0;i<argv.length;i+=2){const k=argv[i]?.slice(2);if(!argv[i]?.startsWith('--')||!['bundle','sha','run','site-url','receipt'].includes(k)||!argv[i+1]||args[k])throw Error('Argumento inválido.');args[k]=argv[i+1];}
 for(const k of ['sha','run','site-url'])if(!args[k])throw Error(`Falta --${k}`);
 const opts={sha:args.sha,run:args.run,runAttempt:process.env.GITHUB_RUN_ATTEMPT,actor:process.env.GITHUB_TRIGGERING_ACTOR??process.env.GITHUB_ACTOR,siteUrl:siteURL(args['site-url'])};
 if(stage==='hml'){
  if(process.env.GITHUB_ACTIONS!=='true'||opts.sha!==process.env.GITHUB_SHA||opts.run!==process.env.GITHUB_RUN_ID)throw Error('Recibo HML somente no job correspondente.');
  await save('reports/hml-aceite.json',await makeHmlReceipt(await tree(args.bundle),opts));return;
 }
 ensurePipeline(opts);
 if(stage==='manual'){
  if(process.env.GITHUB_EVENT_NAME!=='workflow_dispatch'||process.env.GITHUB_REF!=='refs/heads/main'||!process.env.MANUAL_REASON)throw Error('Rollback manual exige dispatch na main e motivo.');
  const root=resolve('.publish/manual/tree'),output=resolve('.publish/manual/site');
  await mkdir(dirname(root),{recursive:true});
  execFileSync('git',['clone','--branch','gh-pages','--single-branch',`https://github.com/${process.env.GITHUB_REPOSITORY}.git`,root],{stdio:'pipe'});
  const existing=await tree(root),api=path=>JSON.parse(execFileSync('gh',['api',path],{encoding:'utf8'}));
  const result=planManualRollback({...opts,existing,reason:process.env.MANUAL_REASON,environment:api(`repos/${process.env.GITHUB_REPOSITORY}/environments/producao`),approvals:api(`repos/${process.env.GITHUB_REPOSITORY}/actions/runs/${opts.run}/approvals`)});
  const flags=['--action','rollback','--existing',root,'--output',output,'--sha',result.target,'--actor',opts.actor,'--reason',process.env.MANUAL_REASON,'--commit','true'];
  execFileSync(process.execPath,[resolve('scripts/rollout.mjs'),...flags],{stdio:'pipe'});
  execFileSync('git',['-C',root,'-c','credential.helper=!f() { echo username=x-access-token; echo password="$GH_TOKEN"; }; f','push','origin','gh-pages'],{stdio:'pipe'});
  await save('reports/rollback-manual.json',{schema:1,from:result.current,sha:result.target,baseline:result.target,baselineVersion:result.version,baselineFilesSha256:baselineHashes(existing,result.target),siteUrl:opts.siteUrl,actor:opts.actor,reason:process.env.MANUAL_REASON,run:opts.run,runAttempt:opts.runAttempt,at:new Date().toISOString()});
  if(process.env.GITHUB_OUTPUT)await appendFile(process.env.GITHUB_OUTPUT,`path=${output}\nsha=${result.target}\nversion=${result.version}\n`);
  return;
 }
 const checkpoint='reports/producao-transacao.json';
 if(['finalizar','confirmar-recuperacao'].includes(stage)){
  const tx=await json(checkpoint),recovered=stage==='confirmar-recuperacao',s=await json(recovered?'reports/recuperacao-smoke.json':'reports/producao-smoke.json'),sha=recovered?tx.baseline:opts.sha;
  verifyFinalSmoke(tx,opts,s,{recovered});
  const recoveredFilesSha256=recovered?await verifyRecoveredRelease(tx):undefined;
  await save(recovered?'reports/producao-recuperacao.json':'reports/producao.json',{schema:1,sha,sourceSha:tx.sha,actor:tx.actor,run:opts.run,runAttempt:opts.runAttempt,zipSha256:tx.zipSha256,recoveredFilesSha256,state:recovered?'recuperada':'publicada',cause:recovered?'falha ou cancelamento do ciclo de produção; consultar logs da execução':undefined,approval:tx.approval,observedAt:new Date().toISOString()});
  if(process.env.GITHUB_STEP_SUMMARY)await appendFile(process.env.GITHUB_STEP_SUMMARY,`\nProdução ${recovered?'recuperada após falha (job permanece vermelho)':'verificada'}: ${sha}; execução ${opts.run}/${opts.runAttempt}.\n`);return;
 }
 if(!['abrir','promover','recuperar'].includes(stage))throw Error('Estágio desconhecido.');
 const root=resolve('.publish/prd',stage,'tree'),output=resolve('.publish/prd',stage,'site');
 await mkdir(dirname(root),{recursive:true});
 execFileSync('git',['clone','--branch','gh-pages','--single-branch',`https://github.com/${process.env.GITHUB_REPOSITORY}.git`,root],{stdio:'pipe'});
 const existing=await tree(root),api=path=>JSON.parse(execFileSync('gh',['api',path],{encoding:'utf8'}));
 let result;
 if(stage==='abrir'){
  const bundle=await tree(args.bundle),receipt=await json(args.receipt??'aceite-hml/hml-aceite.json');
  // Nova conferência evita promover HML ultrapassada enquanto aguardava aprovação.
  verifyReceipt(bundle,opts,receipt);await makeHmlReceipt(bundle,opts);
  result=planProduction(stage,{...opts,existing,bundle,receipt,environment:api(`repos/${process.env.GITHUB_REPOSITORY}/environments/producao`),approvals:api(`repos/${process.env.GITHUB_REPOSITORY}/actions/runs/${opts.run}/approvals`)});
  await save(checkpoint,result.transaction);
  if(process.env.GITHUB_OUTPUT)await appendFile(process.env.GITHUB_OUTPUT,'recoverable=true\n');
 }else result=planProduction(stage,{...opts,existing,transaction:await json(checkpoint),smoke:stage==='promover'?await json('reports/candidata-smoke.json'):undefined});
 if(result.action){
  const flags=['--action',result.action,'--existing',root,'--output',output,'--sha',result.sha,'--actor',opts.actor,'--reason',`${stage}; execução ${opts.run}/${opts.runAttempt}`,'--commit','true'];
  if(stage==='abrir')flags.push('--bundle',resolve(args.bundle),'--run',opts.run,'--run-attempt',opts.runAttempt);
  if(stage==='promover')flags.push('--run',opts.run,'--run-attempt',opts.runAttempt,'--site-url',opts.siteUrl,'--smoke',resolve('reports/candidata-smoke.json'));
  execFileSync(process.execPath,[resolve('scripts/rollout.mjs'),...flags],{stdio:'pipe'});
  // Token só no ambiente do helper, jamais interpolado no comando ou em relatórios.
  execFileSync('git',['-C',root,'-c','credential.helper=!f() { echo username=x-access-token; echo password="$GH_TOKEN"; }; f','push','origin','gh-pages'],{stdio:'pipe'});
 }else{await mkdir(output,{recursive:true});for(const [name,bytes] of Object.entries(existing)){await mkdir(dirname(join(output,name)),{recursive:true});await writeFile(join(output,name),bytes);}}
 if(process.env.GITHUB_OUTPUT)await appendFile(process.env.GITHUB_OUTPUT,`path=${output}\nsha=${stage==='recuperar'?result.transaction.baseline:opts.sha}\nversion=${result.transaction.baselineVersion}\n`);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await main();
