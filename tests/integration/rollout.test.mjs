import {it,expect} from 'vitest';
import {strToU8,strFromU8,zipSync} from 'fflate';
import {createHash} from 'node:crypto';
import {planRollout,commitPlan} from '../../scripts/rollout.mjs';
import {normalizeRollout} from '../../pages/rollout-contract.mjs';
import {openRelease} from '../../pages/loader.mjs';
const a='a'.repeat(40),b='b'.repeat(40),c='c'.repeat(40);
const manifest=sha=>({sha,version:'0.6.0',build:'2026-10-14T00:00:00Z'});
const release=sha=>Object.fromEntries(['index.html','game.js','style.css','version.json','LEIA-ME.txt','LICENSE.txt','THIRD_PARTY.txt'].map(n=>[`releases/${sha}/${n}`,strToU8(n==='version.json'?JSON.stringify(manifest(sha)):'fixture '+n)]));
const formal=(estavel=a,anterior=null,canario=null)=>({schema:1,strategy:'azul-verde',estavel,anterior,canario,percentual:0,retiradas:[]});
const tree=r=>({...release(a),...release(b),'hml/preservar.txt':strToU8('preservado'),'rollout.json':strToU8(JSON.stringify(r))});
const opts={actor:'DaviSouza78',reason:'validar candidato',sha:b,run:'123',runAttempt:'1',siteUrl:'https://example.test/arcade/'};
const smoke={passed:true,errors:[],mode:'release',url:`https://example.test/arcade/releases/${b}/`,expectedSha:b,version:manifest(b),run:'123',runAttempt:'1'};
function bundle(sha=b){
 const zip=zipSync(Object.fromEntries(Object.entries(release(sha)).map(([n,v])=>[n.split('/').at(-1),v]))),hash=bytes=>createHash('sha256').update(bytes).digest('hex');
 // Pacote sintético completo; não é resultado de CI acadêmico.
 const files={'build.zip':zip,'build.zip.sha256':strToU8(hash(zip)),'GDD.pdf':strToU8('%PDF-fixture'),'version.json':strToU8(JSON.stringify(manifest(sha))),'sbom.cdx.json':strToU8('{"bomFormat":"CycloneDX"}')};
 for(const n of ['reports/seguranca/gitleaks.json','reports/seguranca/npm-audit.json','reports/qualidade/junit.xml','reports/qualidade/coverage/coverage-summary.json','reports/e2e/reports/e2e-junit.xml','reports/construcao/pdfinfo.txt','reports/construcao/reproducibility.json'])files[n]=strToU8('fixture');
 files['ci-manifest.json']=strToU8(JSON.stringify({schema:1,sha,run:'123',runAttempt:'1',version:'0.6.0',build:manifest(sha).build,files:Object.fromEntries(Object.entries(files).map(([n,v])=>[n,{sha256:hash(v),bytes:v.length}]))}));return files;
}
it('migra preview sem perder ativa/anterior e rejeita ponteiro contraditório ou traversal',()=>{
 expect(normalizeRollout({activeSha:a,previousSha:b,strategy:'preview'})).toEqual(formal(a,b));
 expect(()=>normalizeRollout({...formal(),activeSha:b})).toThrow();
 expect(()=>normalizeRollout({...formal(),canario:'../x'})).toThrow();
 expect(()=>normalizeRollout({...formal(),percentual:10})).toThrow();
});
it('promove uma vez após smoke correto, mantém anterior e preserva HML',()=>{
 const existing=tree(formal(a,null,b)),result=planRollout({...opts,action:'promover',existing,smoke});
 expect(result.rollout).toEqual(formal(b,a));expect(result.files['hml/preservar.txt']).toEqual(existing['hml/preservar.txt']);
 expect(result.message).toContain('DaviSouza78');expect(result.message).toContain('validar candidato');
 expect(()=>planRollout({...opts,action:'promover',existing:result.files,smoke})).toThrow(/candidato/);
 for(const bad of [{...smoke,passed:false},{...smoke,expectedSha:a},{...smoke,run:'outro'},{...smoke,url:`https://other.test/releases/${b}/`}])expect(()=>planRollout({...opts,action:'promover',existing,smoke:bad})).toThrow(/smoke/);
});
it('rollback retira defeituosa, conserva bytes e recusa destino ausente',()=>{
 const existing=tree(formal(b,a)),result=planRollout({...opts,action:'rollback',sha:a,existing});
 expect(result.rollout.estavel).toBe(a);expect(result.rollout.retiradas).toEqual([b]);expect(result.rollout.anterior).toBeNull();
 expect(result.files[`releases/${b}/game.js`]).toEqual(existing[`releases/${b}/game.js`]);
 delete existing[`releases/${b}/index.html`];expect(planRollout({...opts,action:'rollback',sha:a,existing}).rollout.estavel).toBe(a);
 delete existing[`releases/${a}/index.html`];expect(()=>planRollout({...opts,action:'rollback',sha:a,existing})).toThrow(/release/i);
});
it('rollback manual retira também a candidata e preserva arquivos alheios',()=>{
 const existing=tree(formal(b,a,c));Object.assign(existing,release(c));
 const result=planRollout({...opts,action:'rollback',sha:a,existing});
 expect(result.rollout.retiradas).toEqual([b,c]);
 expect(result.rollout.canario).toBeNull();
 expect(result.files['hml/preservar.txt']).toEqual(existing['hml/preservar.txt']);
});
it('não abre candidato com pacote sem proveniência nem aceita ator/motivo inválidos',()=>{
 expect(()=>planRollout({...opts,action:'abrir',existing:tree(formal()),bundle:{}})).toThrow();
 expect(()=>planRollout({...opts,actor:'outro\nator',action:'rollback',sha:a,existing:tree(formal(b,a))})).toThrow(/ator/);
 expect(()=>planRollout({...opts,reason:'',action:'rollback',sha:a,existing:tree(formal(b,a))})).toThrow(/motivo/);
});
it('abre candidato do mesmo artefato sem virar estável e bloqueia bytes diferentes no mesmo SHA',()=>{
 const existing=tree({activeSha:a,previousSha:null,strategy:'preview'}),result=planRollout({...opts,action:'abrir',existing,bundle:bundle()});
 expect(result.rollout).toEqual(formal(a,null,b));expect(result.files[`releases/${b}/game.js`]).toEqual(existing[`releases/${b}/game.js`]);
 existing[`releases/${b}/game.js`]=strToU8('bytes diferentes');expect(()=>planRollout({...opts,action:'abrir',existing,bundle:bundle()})).toThrow(/imutável/);
 expect(()=>planRollout({...opts,runAttempt:'2',action:'abrir',existing:tree(formal()),bundle:bundle()})).toThrow(/Tentativa/);
});
it('recusa commit fora da pipeline e ator divergente antes de acessar checkout',()=>{
 for(const env of [{},{GITHUB_ACTIONS:'true',GITHUB_ACTOR:'outra-conta'}])expect(()=>commitPlan({root:'nao-acessar',files:{},message:'deploy: ator=DaviSouza78; motivo=teste',env})).toThrow(/pipeline/);
});
const response=(body,status=200)=>({ok:status===200,json:async()=>body});
async function load({pointer=formal(a,b,c),saved=b,storageFailure=false,fault='',missing=[]}={}){
 const redirects=[],writes=[];
 const storage={getItem:()=>{if(storageFailure)throw Error('storage');return saved;},setItem:(k,v)=>{if(storageFailure)throw Error('storage');writes.push(v);}};
 const fetcher=async path=>{if(fault==='rede')throw Error('rede');if(path==='./rollout.json'){if(fault==='json')throw Error('json');return response(pointer);}const sha=path.split('/')[2];return response(path.endsWith('version.json')?manifest(sha):'jogo',missing.includes(sha)?404:200);};
 await openRelease({fetcher,storage,navigate:path=>redirects.push(path)});return {redirects,writes};
}
it('sessão válida permanece na anterior, mas nunca recebe candidata em percentual zero',async()=>{
 expect((await load()).redirects).toEqual([`./releases/${b}/index.html`]);
 expect((await load({saved:c})).redirects).toEqual([`./releases/${a}/index.html`]);
});
it('retirada invalida sessão mesmo com arquivos antigos ainda presentes',async()=>{
 const pointer={...formal(a),retiradas:[b]};expect((await load({pointer,saved:b})).redirects).toEqual([`./releases/${a}/index.html`]);
});
it('storage indisponível ou conteúdo inválido seleciona estável verificada',async()=>{
 expect((await load({storageFailure:true})).redirects).toEqual([`./releases/${a}/index.html`]);
 expect((await load({saved:'../../ruim'})).redirects).toEqual([`./releases/${a}/index.html`]);
});
it('falha de rede/JSON/ponteiro ou destinos ausentes não navega para release inexistente',async()=>{
 for(const options of [{fault:'rede'},{fault:'json'},{pointer:{}},{missing:[a,b]},{pointer:{...formal(),estavel:'../x'}}])await expect(load(options)).rejects.toThrow();
 expect((await load({saved:b,missing:[b]})).redirects).toEqual([`./releases/${a}/index.html`]);
});
it('compatibilidade de sessão preview é revalidada sob contrato novo',async()=>{
 expect((await load({pointer:{activeSha:a,previousSha:b,strategy:'preview'}})).redirects).toEqual([`./releases/${b}/index.html`]);
 expect(strFromU8(tree(formal())['rollout.json'])).toContain('estavel');
});
