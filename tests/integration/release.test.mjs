import {it,expect} from 'vitest';
import {zipSync,strToU8} from 'fflate';
import {createHash} from 'node:crypto';
import {validateTag,planRelease,publishRelease} from '../../scripts/release.mjs';
const sha='a'.repeat(40),run='123',notes='## 0.6.0\nNotas editoriais sintéticas para teste.\n';
const hash=b=>createHash('sha256').update(b).digest('hex');
const proof={annotated:true,integrated:true,protectedMain:true,approved:true};
function bundle(){
 const site=Object.fromEntries(['index.html','game.js','style.css','LEIA-ME.txt','LICENSE.txt','THIRD_PARTY.txt'].map(n=>[n,strToU8('fixture')]));
 site['version.json']=strToU8(JSON.stringify({sha,version:'0.6.0',build:'2026-10-13T00:00:00Z'}));
 const zip=zipSync(site),files={'build.zip':zip,'build.zip.sha256':strToU8(hash(zip)),'GDD.pdf':strToU8('%PDF-fixture'),'version.json':site['version.json'],'sbom.cdx.json':strToU8('{"bomFormat":"CycloneDX"}')};
 for(const n of ['reports/seguranca/gitleaks.json','reports/seguranca/npm-audit.json','reports/qualidade/junit.xml','reports/qualidade/coverage/coverage-summary.json','reports/e2e/reports/e2e-junit.xml','reports/construcao/pdfinfo.txt','reports/construcao/reproducibility.json'])files[n]=strToU8('fixture');
 files['ci-manifest.json']=strToU8(JSON.stringify({schema:1,sha,run,version:'0.6.0',build:'2026-10-13T00:00:00Z',files:Object.fromEntries(Object.entries(files).map(([n,b])=>[n,{sha256:hash(b),bytes:b.length}]))}));return files;
}
const plan=()=>planRelease({bundle:bundle(),sha,run,tag:'v0.6.0',version:'0.6.0',proof,notes,notesHash:hash(notes)});
it('recusa tag leve, fora da main, sem proteção/aprovação e versão incoerente',()=>{
 for(const key of Object.keys(proof))expect(()=>validateTag({tag:'v0.6.0',sha,version:'0.6.0',proof:{...proof,[key]:false}})).toThrow();
 for(const tag of ['v1.0.0','v00.6.0','v0.6.0-rc1','outra'])expect(()=>validateTag({tag,sha,version:'0.6.0',proof})).toThrow();
});
it('preserva os bytes aprovados e exige notas com hash autorizado',()=>{
 const p=plan();expect(Object.keys(p.assets)).toEqual(['build.zip','build.zip.sha256','sbom.cdx.json','GDD.pdf','release-manifest.json']);
 expect(JSON.parse(Buffer.from(p.assets['release-manifest.json']).toString()).runAttempt).toBe('1');
 expect(hash(p.assets['build.zip'])).toBe(hash(bundle()['build.zip']));
 expect(()=>planRelease({bundle:bundle(),sha,run,tag:'v0.6.0',version:'0.6.0',proof,notes,notesHash:'b'.repeat(64)})).toThrow(/notas/i);
 const bad=bundle();bad['build.zip'][0]^=1;expect(()=>planRelease({bundle:bad,sha,run,tag:'v0.6.0',version:'0.6.0',proof,notes,notesHash:hash(notes)})).toThrow(/integridade/);
});
function apiMock(existing=null){
 const state={release:existing,bytes:{},writes:[]};
 return {state,api:{
  getRelease:async()=>state.release,
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
