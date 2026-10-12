import {createHash} from 'node:crypto';
import {readFile,readdir,mkdir,writeFile} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
import {pathToFileURL} from 'node:url';
import {unzipSync,strToU8,strFromU8} from 'fflate';
const REQUIRED=['index.html','style.css','game.js','version.json','LEIA-ME.txt','LICENSE.txt','THIRD_PARTY.txt'];
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
export function preparePages({zip,checksum,sha,existing={}}){
 if(!/^[0-9a-f]{40}$/.test(sha))throw Error('SHA inválido.');
 if(zip.length>=25*1024*1024||hash(zip)!==checksum)throw Error('Tamanho/checksum do build inválido.');
 let expanded=0;
 const site=unzipSync(zip,{filter(entry){if(!REQUIRED.includes(entry.name))throw Error(`arquivo não permitido: ${entry.name}`);expanded+=entry.originalSize;if(expanded>=25*1024*1024)throw Error('Site descompactado excede 25MB.');return true;}});
 if(Object.keys(site).length!==7||REQUIRED.some(name=>!site[name]))throw Error('O build deve conter sete arquivos exigidos.');
 const version=JSON.parse(strFromU8(site['version.json']));if(version.sha!==sha||!/^\d+\.\d+\.\d+$/.test(version.version)||!Number.isFinite(Date.parse(version.build)))throw Error('SHA/versão/data do artefato incoerentes.');
 const files={...existing},prefix=`releases/${sha}/`;
 for(const name of REQUIRED){const path=prefix+name;if(files[path]&&hash(files[path])!==hash(site[name]))throw Error(`Release imutável já existe com conteúdo diferente: ${sha}`);files[path]=site[name];files[`hml/${name}`]=site[name];}
 let previousSha=null;try{previousSha=JSON.parse(strFromU8(existing['rollout.json'])).activeSha;}catch{/* Primeira publicação. */}
 const rollout={strategy:'preview',activeSha:sha,previousSha:previousSha===sha?null:previousSha,version:version.version,build:version.build};
 files['rollout.json']=strToU8(JSON.stringify(rollout,null,2)+'\n');
 files['.nojekyll']=strToU8('');
 const loader=`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Rota do Código</title><style>body{margin:0;display:grid;place-items:center;min-height:100vh;background:#080f1a;color:#edf6ff;font-family:Arial}</style><p id="loading">Abrindo Rota do Código…</p><script>(async()=>{const fallback="${sha}",key="rota-do-codigo:preview:selected",valid=s=>typeof s==="string"&&/^[0-9a-f]{40}$/.test(s);let selected=fallback;try{const response=await fetch('./rollout.json',{cache:'no-store'});if(response.ok){const r=await response.json();if(valid(r.activeSha))selected=r.activeSha;}}catch{}try{const saved=sessionStorage.getItem(key);if(valid(saved)){const r=await fetch('./releases/'+saved+'/version.json',{cache:'no-store'});if(r.ok&&(await r.json()).sha===saved)selected=saved;}sessionStorage.setItem(key,selected);}catch{}location.replace('./releases/'+selected+'/index.html');})().catch(()=>{document.getElementById('loading').textContent='Não foi possível abrir. Atualize a página para tentar novamente.';});</script></html>`;
 files['index.html']=strToU8(loader);return files;
}
async function readTree(root,relative=''){
 const files={};for(const item of await readdir(join(root,relative),{withFileTypes:true})){if(item.name==='.git')continue;const path=relative?`${relative}/${item.name}`:item.name;if(item.isDirectory())Object.assign(files,await readTree(root,path));else if(item.isFile())files[path]=new Uint8Array(await readFile(join(root,path)));}return files;
}
async function main(){const args=Object.fromEntries(process.argv.slice(2).reduce((a,v,i,all)=>i%2?a:[...a,[v.slice(2),all[i+1]]],[]));if(!args.zip||!args.checksum||!args.sha||!args.existing||!args.output)throw Error('Use --zip --checksum --sha --existing --output.');const existing=await readTree(args.existing),files=preparePages({zip:new Uint8Array(await readFile(args.zip)),checksum:(await readFile(args.checksum,'utf8')).trim().split(/\s+/)[0],sha:args.sha,existing});const output=resolve(args.output);for(const [name,bytes] of Object.entries(files)){const target=resolve(output,name);if(!target.startsWith(output+'/')&&!target.startsWith(output+'\\'))throw Error('Arquivo fora do site.');await mkdir(dirname(target),{recursive:true});await writeFile(target,bytes);}console.log(`Preview preparado: ${args.sha}; mesmo build, ${Object.keys(files).length} arquivos preservados.`);}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await main();
