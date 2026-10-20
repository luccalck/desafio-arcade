import {createHash} from 'node:crypto';
import {execFileSync,spawnSync} from 'node:child_process';
import {readFile,readdir} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {verifyBundle} from './ci-bundle.mjs';
const hash=b=>createHash('sha256').update(b).digest('hex');
export function validateTag({tag,sha,version,proof}){
 if(!/^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(tag)||tag!==`v${version}`||!/^[a-f0-9]{40}$/.test(sha))throw Error('Tag/SemVer/SHA divergentes.');
 for(const key of ['annotated','integrated','protectedMain'])if(proof?.[key]!==true)throw Error(`Proveniência recusada: ${key}.`);
 const e=proof?.reviewException;
 const exception=e?.kind==='owner-waiver'&&e.authorized===true&&e.humanReview===false&&e.sha===sha&&e.tag===tag&&tag==='v1.0.0'&&e.pullRequest===47&&typeof e.owner==='string'&&e.owner.length>0&&e.actor===e.owner;
 if(proof?.approved!==true&&!exception)throw Error('Proveniência recusada: approved.');
 return true;
}
export function planRelease({bundle,sha,run,attempt='1',tag,version,proof,notes,notesHash}){
 validateTag({tag,sha,version,proof});const manifest=verifyBundle(bundle,{sha,run});
 if(!/^[1-9]\d*$/.test(String(attempt))||String(manifest.runAttempt)!==String(attempt))throw Error('Tentativa do artefato inválida/divergente.');
 if(manifest.version!==version)throw Error('Versão do artefato diverge da tag/package.json.');
 if(!notes?.includes(`## ${version}\n`)||hash(notes)!==notesHash)throw Error('Notas ausentes ou hash das notas não autorizado.');
 const assets=Object.fromEntries(['build.zip','build.zip.sha256','sbom.cdx.json','GDD.pdf','RelatorioTecnico.pdf'].map(n=>[n,bundle[n]]));
 const inventory=Object.fromEntries(Object.entries(assets).map(([n,b])=>[n,{sha256:hash(b),bytes:b.length}]));
 assets['release-manifest.json']=Buffer.from(JSON.stringify({schema:1,tag,sha,run:String(run),runAttempt:String(attempt),version,build:manifest.build,notesSha256:notesHash,review:{approved:proof.approved===true,approvals:proof.approvals??[],exception:proof.reviewException??null},files:inventory},null,2)+'\n');
 return {tag,sha,notes,assets};
}
export async function publishRelease(plan,api){
 let release=await api.getRelease(plan.tag);
 if(release&&release.body!==plan.notes)throw Error('Notas da release existente divergentes.');
 const missing=[];
 for(const [name,bytes] of Object.entries(plan.assets)){
  const matches=release?.assets.filter(a=>a.name===name)||[];
  if(matches.length>1)throw Error(`Assets duplicados: ${name}`);
  if(matches.length&&hash(await api.downloadAsset(matches[0]))!==hash(bytes))throw Error(`Asset divergente: ${name}`);
  if(!matches.length)missing.push([name,bytes]);
 }
 if(release?.assets.some(a=>!Object.hasOwn(plan.assets,a.name)))throw Error('Release contém assets fora do inventário esperado.');
 if(release&&!release.draft&&missing.length)throw Error('Release publicada incompleta: não modificar anexos após publicação.');
 if(!release)release=await api.createDraft(plan);
 for(const [name,bytes] of missing)await api.uploadAsset(release,name,bytes);
 if(release.draft){
  const uploaded=await api.getReleaseById(release.id);
  if(uploaded?.body!==plan.notes||uploaded.assets.length!==Object.keys(plan.assets).length)throw Error('Draft incompleto antes da publicação.');
  for(const [name,bytes] of Object.entries(plan.assets)){
   const matches=uploaded.assets.filter(a=>a.name===name);
   if(matches.length!==1||hash(await api.downloadAsset(matches[0]))!==hash(bytes))throw Error(`Upload divergente: ${name}`);
  }
  await api.publish(release);
 }
 return {tag:plan.tag,sha:plan.sha,assets:Object.keys(plan.assets),unchanged:missing.length===0&&!release.draft};
}
export function github(repo,token,{fetchImpl=fetch}={}){
 if(!/^[\w.-]+\/[\w.-]+$/.test(repo||'')||!token)throw Error('Configure GITHUB_REPOSITORY e GH_TOKEN.');
 const base=`https://api.github.com/repos/${repo}`;
 async function request(url,{method='GET',body,raw=false,missing=false}={}){
  const response=await fetchImpl(url,{method,headers:{Authorization:`Bearer ${token}`,Accept:raw?'application/octet-stream':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28',...(body?{'Content-Type':Buffer.isBuffer(body)||body instanceof Uint8Array?'application/octet-stream':'application/json'}:{})},body:body?(Buffer.isBuffer(body)||body instanceof Uint8Array?body:JSON.stringify(body)):undefined,signal:AbortSignal.timeout(30000)});
  if(missing&&response.status===404)return null;
  if(!response.ok)throw Error(`GitHub ${method}: HTTP${response.status}; nenhuma credencial incluída neste erro.`);
  return raw?Buffer.from(await response.arrayBuffer()):response.status===204?null:response.json();
 }
 const get=p=>request(base+p);
 async function all(p){const rows=[];for(let page=1;page<=20;page++){const part=await get(`${p}${p.includes('?')?'&':'?'}per_page=100&page=${page}`);rows.push(...part);if(part.length<100)return rows;}throw Error('Paginação excedida; aprovação não inferida.');}
 async function getRelease(tag){
  const published=await request(`${base}/releases/tags/${encodeURIComponent(tag)}`,{missing:true});
  if(published)return published;
  // O endpoint por tag retorna releases publicadas. Rascunhos exigem listagem autenticada.
  const drafts=(await all('/releases')).filter(r=>r.draft===true&&r.tag_name===tag);
  if(drafts.length>1)throw Error('Rascunhos ambíguos para a tag; publicação bloqueada.');
  return drafts[0]??null;
 }
 return {get,all,getRelease,
  getReleaseById:id=>{if(!Number.isSafeInteger(id)||id<1)throw Error('ID de release inválido.');return get(`/releases/${id}`);},
  createDraft:p=>request(`${base}/releases`,{method:'POST',body:{tag_name:p.tag,target_commitish:p.sha,name:p.tag,body:p.notes,draft:true,make_latest:'false'}}),
  downloadAsset:a=>request(`${base}/releases/assets/${a.id}`,{raw:true}),
  uploadAsset:(r,name,bytes)=>request(`https://uploads.github.com/repos/${repo}/releases/${r.id}/assets?name=${encodeURIComponent(name)}`,{method:'POST',body:bytes}),
  publish:r=>request(`${base}/releases/${r.id}`,{method:'PATCH',body:{draft:false,make_latest:'false'}}),
 };
}
export async function proveTag({tag,sha,version,api,waiverSha,actor}){
 const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
 const annotated=git('cat-file','-t',`refs/tags/${tag}`)==='tag';
 if(git('rev-parse',`refs/tags/${tag}^{}`)!==sha||git('rev-parse','HEAD')!==sha)throw Error('Tag/checkout não apontam ao SHA esperado.');
 const remote=await api.get(`/git/ref/tags/${tag}`);
 if(remote.object.sha!==git('rev-parse',`refs/tags/${tag}`))throw Error('Tag remota diverge do checkout.');
 const integrated=spawnSync('git',['merge-base','--is-ancestor',sha,'origin/main']).status===0;
 const main=await api.get('/branches/main');let approved=false;const approvals=[];
 const associated=await api.all(`/commits/${sha}/pulls`);
 for(const pr of associated){
  if(pr.base.ref!=='main'||!pr.merged_at)continue;
  const votes=new Map();
  for(const review of await api.all(`/pulls/${pr.number}/reviews`))if(['APPROVED','CHANGES_REQUESTED','DISMISSED'].includes(review.state))votes.set(review.user.login,review);
  for(const [login,r] of votes)if(login!==pr.user.login&&r.state==='APPROVED'&&r.commit_id===pr.head.sha){approved=true;approvals.push({pr:pr.number,review:r.html_url});}
 }
 let reviewException=null;
 if(!approved&&waiverSha===sha&&tag==='v1.0.0'){
  const repository=await api.get('');
  const owner=repository.owner?.login;
  const pr=associated.find(p=>p.number===47&&p.base?.ref==='main'&&p.merged_at&&p.user?.login===owner);
  if(owner&&actor===owner&&pr)reviewException={kind:'owner-waiver',authorized:true,humanReview:false,owner,actor,sha,tag,pullRequest:47,reason:'Dispensa expressa de revisão pelo proprietário em19/10/2026; não equivale a revisão humana.'};
 }
 const proof={annotated,integrated,protectedMain:main.protected===true,approved,approvals,reviewException};
 validateTag({tag,sha,version,proof});return proof;
}
async function tree(root,prefix=''){
 const files={};for(const e of await readdir(join(root,prefix),{withFileTypes:true})){
  if(e.isSymbolicLink())throw Error('Link não permitido no pacote.');const name=prefix?`${prefix}/${e.name}`:e.name;
  if(e.isDirectory())Object.assign(files,await tree(root,name));else if(e.isFile())files[name]=await readFile(join(root,name));
 }return files;
}
async function main(){
 const [mode,bundlePath,notesPath='docs/notas-versao.md']=process.argv.slice(2);
 if(!['provenance','publish'].includes(mode))throw Error('Use provenance ou publish BUNDLE NOTES.');
 const ref=process.env.GITHUB_REF||'';
 if(mode==='provenance'&&!ref.startsWith('refs/tags/')){console.log('Ref de desenvolvimento: nenhuma release autorizada.');return;}
 if(!ref.startsWith('refs/tags/'))throw Error('Release exige push de tag.');
 const tag=ref.slice('refs/tags/'.length),sha=process.env.GITHUB_SHA;
 // Rejeitar formato antes de usar tag em Git/API.
 if(!/^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(tag))throw Error('Tag não é vX.Y.Z estável.');
 const version=JSON.parse(await readFile('package.json','utf8')).version;
 const api=github(process.env.GITHUB_REPOSITORY,process.env.GH_TOKEN);
 const proof=await proveTag({tag,sha,version,api,waiverSha:process.env.REVIEW_WAIVER_SHA,actor:process.env.GITHUB_ACTOR});
 console.log(JSON.stringify({tag,sha,proof}));
 if(mode==='publish'){
  if(!/^[1-9]\d*$/.test(process.env.GITHUB_RUN_ATTEMPT||''))throw Error('Tentativa da execução ausente/inválida.');
  const plan=planRelease({bundle:await tree(resolve(bundlePath)),sha,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,tag,version,proof,notes:await readFile(notesPath,'utf8'),notesHash:process.env.RELEASE_NOTES_SHA256});
  console.log(JSON.stringify(await publishRelease(plan,api)));
 }
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await main();
