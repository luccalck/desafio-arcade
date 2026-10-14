import {readFile,readdir,mkdir,writeFile} from 'node:fs/promises';
import {resolve,join,dirname,relative,isAbsolute,sep} from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import {realpathSync} from 'node:fs';
import {strFromU8,strToU8} from 'fflate';
import {normalizeRollout,validSha} from '../pages/rollout-contract.mjs';
import {preparePages,loaderFiles} from './prepare-pages.mjs';
import {verifyBundle} from './ci-bundle.mjs';
const EMPTY={schema:1,strategy:'azul-verde',estavel:null,anterior:null,canario:null,percentual:0,retiradas:[]};
const REQUIRED=['index.html','style.css','game.js','version.json','LEIA-ME.txt','LICENSE.txt','THIRD_PARTY.txt'];
function assertRelease(files,sha){
 if(!validSha(sha)||REQUIRED.some(n=>!files[`releases/${sha}/${n}`]))throw Error('Release completa exigida.');
 const v=JSON.parse(strFromU8(files[`releases/${sha}/version.json`]));
 if(v.sha!==sha||!/^\d+\.\d+\.\d+$/.test(v.version||''))throw Error('Release incoerente.');
}
export function planRollout({action,existing={},bundle,sha,run,runAttempt,actor,reason,smoke,siteUrl}){
 if(!/^[a-zA-Z0-9][a-zA-Z0-9-]{0,38}$/.test(actor||''))throw Error('ator inválido.');
 if(typeof reason!=='string'||!reason.trim()||reason.length>240||[...reason].some(c=>c.charCodeAt(0)<32))throw Error('motivo inválido.');
 if(!validSha(sha))throw Error('SHA inválido.');
 const files={...existing},rollout=existing['rollout.json']?normalizeRollout(JSON.parse(strFromU8(existing['rollout.json']))):{...EMPTY,retiradas:[]};
 const failedSha=action==='rollback'?rollout.estavel:null;
 // Recuperação não depende de a versão defeituosa ainda estar completa.
 for(const s of (action==='rollback'?[sha]:action==='abortar'?[rollout.estavel,rollout.anterior]:[rollout.estavel,rollout.anterior,rollout.canario]).filter(Boolean))assertRelease(files,s);
 if(action==='abrir'){
  if(rollout.retiradas.includes(sha)||sha===rollout.estavel||sha===rollout.anterior||(rollout.canario&&rollout.canario!==sha))throw Error('Candidato já ativo, retirado ou ocupado.');
  const manifest=verifyBundle(bundle,{sha,run});
  if(String(manifest.runAttempt)!==String(runAttempt))throw Error('Tentativa do artefato divergente.');
  const expanded=preparePages({zip:bundle['build.zip'],checksum:strFromU8(bundle['build.zip.sha256']).trim().split(/\s+/)[0],sha,existing});
  for(const [name,bytes] of Object.entries(expanded))if(name.startsWith(`releases/${sha}/`))files[name]=bytes;
  rollout.canario=sha;
 }else if(action==='promover'){
  if(rollout.canario!==sha)throw Error('SHA não é candidato.');
  const base=new URL(siteUrl);if(base.protocol!=='https:'||base.username||base.password||base.search||base.hash)throw Error('URL inválida.');
  const expected=new URL(`releases/${sha}/`,base.href.replace(/\/?$/,'/')).href;
  if(!smoke||smoke.passed!==true||smoke.mode!=='release'||smoke.expectedSha!==sha||smoke.version?.sha!==sha||smoke.url!==expected||!Array.isArray(smoke.errors)||smoke.errors.length||String(smoke.run)!==String(run)||String(smoke.runAttempt)!==String(runAttempt)||!run||!runAttempt)throw Error('smoke aprovado do mesmo SHA/run/tentativa/URL exigido.');
  rollout.anterior=rollout.estavel;rollout.estavel=sha;rollout.canario=null;
 }else if(action==='rollback'){
  if(rollout.anterior!==sha)throw Error('Destino de rollback não é anterior.');
  rollout.retiradas=[...new Set([...rollout.retiradas,rollout.estavel,rollout.canario].filter(Boolean))];
  rollout.estavel=sha;rollout.anterior=null;rollout.canario=null;
 }else if(action==='abortar'){
  if(rollout.canario!==sha||!rollout.estavel)throw Error('Candidata e estável recuperável exigidas.');
  rollout.retiradas=[...new Set([...rollout.retiradas,sha])];rollout.canario=null;
 }else throw Error('Ação deve ser abrir, promover, rollback ou abortar.');
 const validated=normalizeRollout(rollout);if(action!=='abortar')assertRelease(files,sha);
 files['rollout.json']=strToU8(JSON.stringify(validated,null,2)+'\n');Object.assign(files,loaderFiles());
 return {files,rollout:validated,message:`deploy: ${action} ${sha};${failedSha?` falha=${failedSha};`:''} ator=${actor}; motivo=${reason.trim()}`};
}
async function tree(root,prefix=''){
 const files={};for(const e of await readdir(join(root,prefix),{withFileTypes:true})){if(e.name==='.git')continue;if(e.isSymbolicLink())throw Error('Link não permitido.');const name=prefix?`${prefix}/${e.name}`:e.name;if(e.isDirectory())Object.assign(files,await tree(root,name));else if(e.isFile())files[name]=await readFile(join(root,name));}return files;
}
export function commitPlan({root,files,message,env=process.env}){
 // Sem push/deploy: o job protegido consumidor deve publicar a árvore e medir o smoke.
 if(env.GITHUB_ACTIONS!=='true'||!env.GITHUB_ACTOR||!message.includes(`ator=${env.GITHUB_TRIGGERING_ACTOR??env.GITHUB_ACTOR};`))throw Error('Aplicação somente pela pipeline com ator correspondente.');
 const git=(...args)=>execFileSync('git',['-C',root,...args],{encoding:'utf8'}).trim();
 const canonical=path=>{const p=realpathSync.native(path);return process.platform==='win32'?p.toLowerCase():p;};
 if(canonical(git('rev-parse','--show-toplevel'))!==canonical(root)||git('branch','--show-current')!=='gh-pages'||git('status','--porcelain'))throw Error('Checkout gh-pages limpo exigido.');
 const changed=Object.keys(files).filter(name=>['index.html','loader.mjs','rollout-contract.mjs','rollout.json','status/index.html','status/status.mjs'].includes(name)||/^releases\/[a-f0-9]{40}\//.test(name));
 return {git,changed};
}
async function main(){
 const argv=process.argv.slice(2),args={};
 for(let i=0;i<argv.length;i+=2){const key=argv[i]?.slice(2);if(!argv[i]?.startsWith('--')||!['action','existing','output','bundle','sha','run','run-attempt','actor','reason','smoke','site-url','commit'].includes(key)||!argv[i+1]||args[key])throw Error('Argumento inválido.');args[key]=argv[i+1];}
 for(const k of ['action','existing','output','sha','actor','reason'])if(!args[k])throw Error(`Falta --${k}`);
 const input=resolve(args.existing),output=resolve(args.output),within=(a,b)=>{const r=relative(a,b);return !r||r!=='..'&&!r.startsWith('..'+sep)&&!isAbsolute(r);};
 if(within(input,output)||within(output,input)||(args.bundle&&(within(resolve(args.bundle),output)||within(output,resolve(args.bundle)))))throw Error('Saída separada exigida.');
 const result=planRollout({action:args.action,existing:await tree(input),bundle:args.bundle?await tree(resolve(args.bundle)):undefined,sha:args.sha,run:args.run,runAttempt:args['run-attempt'],actor:args.actor,reason:args.reason,smoke:args.smoke?JSON.parse(await readFile(args.smoke,'utf8')):undefined,siteUrl:args['site-url']});
 const plan=args.commit==='true'?commitPlan({root:input,...result}):null;
 if(args.commit&&args.commit!=='true')throw Error('--commit aceita somente true.');
 await mkdir(output,{recursive:true});if((await readdir(output)).length)throw Error('Saída vazia exigida.');
 for(const [name,bytes] of Object.entries(result.files)){const dest=resolve(output,name),local=relative(output,dest);if(local.startsWith('..')||isAbsolute(local))throw Error('Arquivo fora da saída.');await mkdir(dirname(dest),{recursive:true});await writeFile(dest,bytes);}
 if(plan){for(const name of plan.changed){const dest=join(input,name);await mkdir(dirname(dest),{recursive:true});await writeFile(dest,result.files[name]);}plan.git('add','--',...plan.changed);if(plan.git('diff','--cached','--name-only'))plan.git('-c','user.name=github-actions[bot]','-c','user.email=41898282+github-actions[bot]@users.noreply.github.com','commit','-m',result.message);}
 console.log(result.message);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await main();
