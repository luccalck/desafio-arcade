import {it,expect} from 'vitest';
import {zipSync,strToU8} from 'fflate';
import {createHash} from 'node:crypto';
import {validateTag,planRelease,publishRelease,github} from '../../scripts/release.mjs';
const sha='a'.repeat(40),run='123',notes='## 0.6.0\nNotas editoriais sintéticas para teste.\n';
const hash=b=>createHash('sha256').update(b).digest('hex');
const proof={annotated:true,integrated:true,protectedMain:true,approved:true};
function bundle(){
 const site=Object.fromEntries(['index.html','game.js','style.css','LEIA-ME.txt','LICENSE.txt','THIRD_PARTY.txt'].map(n=>[n,strToU8('fixture')]));
 site['version.json']=strToU8(JSON.stringify({sha,version:'0.6.0',build:'2026-10-13T00:00:00Z'}));
 const zip=zipSync(site,{mtime:new Date('2026-10-13T00:00:00Z')}),files={'build.zip':zip,'build.zip.sha256':strToU8(hash(zip)),'GDD.pdf':strToU8('%PDF-fixture'),'RelatorioTecnico.pdf':strToU8('%PDF-report-fixture'),'version.json':site['version.json'],'sbom.cdx.json':strToU8('{"bomFormat":"CycloneDX"}')};
 for(const n of ['reports/seguranca/gitleaks.json','reports/seguranca/npm-audit.json','reports/qualidade/junit.xml','reports/qualidade/coverage/coverage-summary.json','reports/e2e/reports/e2e-junit.xml','reports/construcao/pdfinfo.txt','reports/construcao/relatorio-pdfinfo.txt','reports/construcao/reproducibility.json'])files[n]=strToU8('fixture');
 files['reports/construcao/relatorio-pdfinfo.txt']=strToU8('Pages: 1\n');
 files['ci-manifest.json']=strToU8(JSON.stringify({schema:1,sha,run,runAttempt:'1',version:'0.6.0',build:'2026-10-13T00:00:00Z',files:Object.fromEntries(Object.entries(files).map(([n,b])=>[n,{sha256:hash(b),bytes:b.length}]))}));return files;
}
const plan=()=>planRelease({bundle:bundle(),sha,run,tag:'v0.6.0',version:'0.6.0',proof,notes,notesHash:hash(notes)});
it('recusa tag leve, fora da main, sem proteção/aprovação e versão incoerente',()=>{
 for(const key of Object.keys(proof))expect(()=>validateTag({tag:'v0.6.0',sha,version:'0.6.0',proof:{...proof,[key]:false}})).toThrow();
 for(const tag of ['v1.0.0','v00.6.0','v0.6.0-rc1','outra'])expect(()=>validateTag({tag,sha,version:'0.6.0',proof})).toThrow();
});
it('preserva os bytes aprovados e exige notas com hash autorizado',()=>{
 const p=plan();expect(Object.keys(p.assets)).toEqual(['build.zip','build.zip.sha256','sbom.cdx.json','GDD.pdf','RelatorioTecnico.pdf','release-manifest.json']);
 expect(JSON.parse(Buffer.from(p.assets['release-manifest.json']).toString()).runAttempt).toBe('1');
 expect(hash(p.assets['build.zip'])).toBe(hash(bundle()['build.zip']));
 expect(()=>planRelease({bundle:bundle(),sha,run,tag:'v0.6.0',version:'0.6.0',proof,notes,notesHash:'b'.repeat(64)})).toThrow(/notas/i);
 const bad=bundle();bad['build.zip'][0]^=1;expect(()=>planRelease({bundle:bad,sha,run,tag:'v0.6.0',version:'0.6.0',proof,notes,notesHash:hash(notes)})).toThrow(/integridade/);
});
function apiMock(existing=null){
 const state={release:existing,bytes:{},writes:[]};
 return {state,api:{
  getRelease:async()=>state.release,
  getReleaseById:async()=>state.release,
  createDraft:async p=>{state.writes.push('draft');state.release={id:1,draft:true,body:p.notes,assets:[]};return state.release;},
  downloadAsset:async a=>state.bytes[a.name],
  uploadAsset:async(r,name,bytes)=>{state.writes.push(name);state.bytes[name]=bytes;r.assets.push({id:name,name});},
  publish:async()=>state.writes.push('publish'),
 }};
}
it('cria draft, anexa tudo e publica somente depois; repetição é idempotente',async()=>{
 const m=apiMock(),p=plan();await publishRelease(p,m.api);expect(m.state.writes.at(-1)).toBe('publish');
 m.state.release.draft=false;m.state.writes=[];await publishRelease(p,m.api);expect(m.state.writes).toEqual([]);
});
it('recusa sobrescrita antes de qualquer escrita e não repara release publicada incompleta',async()=>{
 const p=plan(),m=apiMock({id:1,draft:false,body:p.notes,assets:[{name:'build.zip'}]});m.state.bytes['build.zip']=strToU8('adulterado');
 await expect(publishRelease(p,m.api)).rejects.toThrow(/divergente/);expect(m.state.writes).toEqual([]);
 m.state.bytes['build.zip']=p.assets['build.zip'];await expect(publishRelease(p,m.api)).rejects.toThrow(/incompleta/);expect(m.state.writes).toEqual([]);
 const notesChanged=apiMock({id:2,draft:true,body:'outras notas',assets:[]});await expect(publishRelease(p,notesChanged.api)).rejects.toThrow(/Notas/);expect(notesChanged.state.writes).toEqual([]);
 const corrupted=apiMock(),upload=corrupted.api.uploadAsset;
 corrupted.api.uploadAsset=async(r,n,b)=>{await upload(r,n,b);if(n==='build.zip')corrupted.state.bytes[n]=strToU8('upload incorreto');};
 await expect(publishRelease(p,corrupted.api)).rejects.toThrow(/Upload divergente/);expect(corrupted.state.writes).not.toContain('publish');
});

it('não publica outro attempt sob inventário da primeira tentativa',()=>{
 expect(()=>planRelease({bundle:bundle(),sha,run,attempt:'2',tag:'v0.6.0',version:'0.6.0',proof,notes,notesHash:hash(notes)})).toThrow(/Tentativa/);
});

it('confere draft por ID mesmo quando endpoint por tag só retorna releases publicadas',async()=>{
 const m=apiMock(),p=plan();m.api.getRelease=async()=>null;
 await publishRelease(p,m.api);
 expect(m.state.writes.filter(x=>x==='draft')).toHaveLength(1);
 expect(m.state.writes.at(-1)).toBe('publish');
});

it('adaptador localiza draft por listagem autenticada e reconfere pelo ID',async()=>{
 const calls=[],draft={id:123,tag_name:'v0.6.0',draft:true,assets:[]};
 const api=github('squad/jogo','credencial-sintetica',{fetchImpl:async url=>{
  calls.push(url);
  if(url.endsWith('/tags/v0.6.0'))return new Response('{}',{status:404});
  return new Response(JSON.stringify(url.includes('?')?[draft]:draft),{status:200});
 }});
 expect(await api.getRelease('v0.6.0')).toEqual(draft);
 expect(await api.getReleaseById(123)).toEqual(draft);
 expect(calls.map(u=>new URL(u).pathname)).toEqual(['/repos/squad/jogo/releases/tags/v0.6.0','/repos/squad/jogo/releases','/repos/squad/jogo/releases/123']);
 expect(()=>api.getReleaseById('../123')).toThrow(/ID/);
});
it('adaptador recusa drafts ambíguos e não lista quando a release já está publicada',async()=>{
 const draft={id:123,tag_name:'v0.6.0',draft:true};
 const ambiguous=github('squad/jogo','credencial-sintetica',{fetchImpl:async url=>url.includes('/tags/')?new Response('{}',{status:404}):new Response(JSON.stringify([draft,{...draft,id:456}]))});
 await expect(ambiguous.getRelease('v0.6.0')).rejects.toThrow(/ambíguos/);
 let count=0;const published={...draft,draft:false};
 const api=github('squad/jogo','credencial-sintetica',{fetchImpl:async()=>{count++;return new Response(JSON.stringify(published));}});
 expect(await api.getRelease('v0.6.0')).toEqual(published);expect(count).toBe(1);
});

it('dispensa auditável não dispensa tag anotada, main protegida, integração ou identidade exata',()=>{
 const reviewException={kind:'owner-waiver',authorized:true,humanReview:false,sha,tag:'v1.0.0',pullRequest:47,owner:'responsavel',actor:'responsavel'};
 const waived={...proof,approved:false,reviewException};
 expect(validateTag({tag:'v1.0.0',sha,version:'1.0.0',proof:waived})).toBe(true);
 for(const key of ['annotated','integrated','protectedMain'])expect(()=>validateTag({tag:'v1.0.0',sha,version:'1.0.0',proof:{...waived,[key]:false}})).toThrow();
 for(const changed of [{authorized:false},{humanReview:true},{sha:'b'.repeat(40)},{actor:'outro'},{owner:''},{pullRequest:48},{tag:'v0.6.0'}])expect(()=>validateTag({tag:'v1.0.0',sha,version:'1.0.0',proof:{...waived,reviewException:{...reviewException,...changed}}})).toThrow(/approved/);
});
it('manifesto da release conserva o estado real da revisão',()=>{
 const manifest=JSON.parse(Buffer.from(plan().assets['release-manifest.json']).toString());
 expect(manifest.review).toEqual({approved:true,approvals:[],exception:null});
});
