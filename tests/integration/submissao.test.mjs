import {it,expect} from 'vitest';
import {zipSync,strToU8} from 'fflate';
import {createHash} from 'node:crypto';
import {mkdtemp,writeFile,readFile,mkdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createBundle} from '../../scripts/ci-bundle.mjs';
import {createSubmissionPackage,verifySubmissionPackage,validateVideoProvenance,validateProductionReceipt} from '../../scripts/submissao.mjs';
const hash=b=>createHash('sha256').update(b).digest('hex'),sha='b'.repeat(40),runId='123456',runAttempt='1',siteUrl='https://example.invalid/arcade/';
async function fixture(){
 // Bytes sintéticos, API/duração adaptadas: somente regressões de contrato, nunca evidência de vídeo ou execução acadêmica.
 const tmp=await mkdtemp(join(tmpdir(),'submissao-contrato-')),bundleDir=join(tmp,'bundle'),outDir=join(tmp,'submissao'),productionDir=join(tmp,'producao'),videoPath=join(tmp,'pitch.mp4'),videoProvenancePath=join(tmp,'video-provenance.json');
 const version={sha,version:'0.6.0',build:'2026-10-14T00:00:00Z'};
 const site=Object.fromEntries(['index.html','game.js','style.css','LEIA-ME.txt','LICENSE.txt','THIRD_PARTY.txt'].map(n=>[n,strToU8('fixture '+n)]));site['version.json']=strToU8(JSON.stringify(version));
 const zip=zipSync(site),inputs={'build/artifacts/build.zip':zip,'build/artifacts/build.zip.sha256':strToU8(hash(zip)),'build/artifacts/GDD.pdf':strToU8('%PDF-1.4 fixture'),'build/artifacts/RelatorioTecnico.pdf':strToU8('%PDF-1.4 fixture'),'build/dist/version.json':site['version.json'],'seguranca/sbom.cdx.json':strToU8('{"bomFormat":"CycloneDX"}'),'construcao/relatorio-pdfinfo.txt':strToU8('Pages: 8\n')};
 for(const n of ['seguranca/gitleaks.json','seguranca/npm-audit.json','qualidade/junit.xml','qualidade/coverage/coverage-summary.json','e2e/reports/e2e-junit.xml','construcao/pdfinfo.txt','construcao/reproducibility.json'])inputs[n]=strToU8('fixture');
 const bundle=createBundle(inputs,{sha,run:runId,runAttempt});
 for(const [name,bytes] of Object.entries(bundle)){await mkdir(join(bundleDir,name,'..'),{recursive:true});await writeFile(join(bundleDir,name),bytes);}
 const video=strToU8('fixture MP4; não é vídeo real'),expectedVideo={run:'444',runAttempt:'2',headSha:'c'.repeat(40),sha256:hash(video),repository:'equipe/fixture'};
 const meta={schema:1,productionSha:sha,version:version.version,build:version.build,zipSha256:hash(zip),siteUrl,sha256:hash(video),bytes:video.length,duration:89.9,rightsConfirmed:true,captionsConfirmed:true,origin:{type:'run',id:'333'},validation:{workflow:'entrada-video.yml',repository:expectedVideo.repository,run:expectedVideo.run,runAttempt:expectedVideo.runAttempt,headSha:expectedVideo.headSha,actor:'responsavel-fixture'}};
 const receipt={schema:1,sha,sourceSha:sha,run:runId,runAttempt,zipSha256:hash(zip),state:'publicada',approval:{environment:'producao',state:'approved',reviewer:'colega-fixture'}};
 const smoke={passed:true,mode:'root',url:siteUrl,expectedSha:sha,version,run:runId,runAttempt,errors:[]};
 await mkdir(productionDir);await writeFile(join(productionDir,'producao.json'),JSON.stringify(receipt));await writeFile(join(productionDir,'producao-smoke.json'),JSON.stringify(smoke));
 await writeFile(videoPath,video);await writeFile(videoProvenancePath,JSON.stringify(meta));
 const fetchImpl=async url=>new URL(url).pathname.endsWith('rollout.json')?{ok:true,json:async()=>({strategy:'azul-verde',estavel:sha,retiradas:[]})}:{ok:true,arrayBuffer:async()=>site[new URL(url).pathname.split('/').at(-1)]};
 return {tmp,meta,receipt,smoke,video,bundle,options:{bundleDir,outDir,productionDir,videoPath,videoProvenancePath,expectedSha:sha,runId,runAttempt,siteUrl,expectedVideo,fetchImpl}};
}
async function withFixture(fn){const f=await fixture();try{await fn(f);}finally{await rm(f.tmp,{recursive:true,force:true});}}
it('empacota apenas bytes do bundle verificado após produção aprovada e vídeo fixado',async()=>withFixture(async({options,bundle})=>{
 const p=await createSubmissionPackage(options);expect(p.files).toHaveLength(4);
 expect(await readFile(join(options.outDir,'build.zip'))).toEqual(Buffer.from(bundle['build.zip']));
 expect(await readFile(join(options.outDir,'LINK_DO_JOGO.txt'),'utf8')).toBe(siteUrl+'\n');
 expect((await verifySubmissionPackage(options.outDir,{expectedSha:sha,runId,runAttempt})).valid).toBe(true);
 await expect(createSubmissionPackage(options)).rejects.toThrow(/vazio/);
}));
it('recusa bundle adulterado, SHA e tentativa externos divergentes',async()=>withFixture(async({options})=>{
 await expect(createSubmissionPackage({...options,expectedSha:'a'.repeat(40)})).rejects.toThrow(/SHA/);
 await expect(createSubmissionPackage({...options,runAttempt:'2'})).rejects.toThrow(/Tentativa/);
 await writeFile(join(options.bundleDir,'build.zip'),strToU8('adulterado'));
 await expect(createSubmissionPackage(options)).rejects.toThrow(/integridade/);
}));
it('vídeo antigo, digest não autorizado, origem e consentimentos ausentes bloqueiam',async()=>withFixture(async({options,meta,video,bundle})=>{
 const params={sha,version:'0.6.0',build:'2026-10-14T00:00:00Z',zipSha256:hash(bundle['build.zip']),siteUrl,expectedVideo:options.expectedVideo};
 for(const changed of [{...meta,productionSha:'a'.repeat(40)},{...meta,rightsConfirmed:false},{...meta,captionsConfirmed:false},{...meta,duration:90.001},{...meta,validation:{...meta.validation,run:'555'}}])expect(()=>validateVideoProvenance(video,changed,params)).toThrow();
 expect(()=>validateVideoProvenance(video,meta,{...params,expectedVideo:{...options.expectedVideo,sha256:'0'.repeat(64)}})).toThrow(/digest/);
 await writeFile(options.videoPath,new Uint8Array());await expect(createSubmissionPackage(options)).rejects.toThrow(/vazio/);
}));
it('recuperação, smoke antigo ou produção com outro ZIP nunca aceitam submissão',async()=>withFixture(async({options,receipt,smoke,bundle})=>{
 const params={sha,run:runId,attempt:runAttempt,zipSha256:hash(bundle['build.zip']),siteUrl};
 for(const changed of [{...receipt,state:'recuperada'},{...receipt,zipSha256:'0'.repeat(64)},{...receipt,approval:null}])expect(()=>validateProductionReceipt(changed,smoke,params)).toThrow(/produção/);
 expect(()=>validateProductionReceipt(receipt,{...smoke,run:'555'},params)).toThrow(/Smoke/);
 await expect(createSubmissionPackage({...options,fetchImpl:async()=>({ok:true,json:async()=>({strategy:'azul-verde',estavel:'a'.repeat(40)})})})).rejects.toThrow(/estável/);
}));
it('recusa bytes públicos diferentes mesmo com ponteiro correto',async()=>withFixture(async({options})=>{
 await expect(createSubmissionPackage({...options,fetchImpl:async url=>new URL(url).pathname.endsWith('rollout.json')?{ok:true,json:async()=>({strategy:'azul-verde',estavel:sha})}:{ok:true,arrayBuffer:async()=>strToU8('outros bytes')}})).rejects.toThrow(/Bytes de produção/);
}));
it('revalidação recusa pacote adulterado ou metadados divergentes da origem fixada',async()=>withFixture(async({options})=>{
 await createSubmissionPackage(options);
 await expect(verifySubmissionPackage(options.outDir,{expectedSha:'a'.repeat(40)})).rejects.toThrow(/origem fixada/);
 const m=JSON.parse(await readFile(join(options.outDir,'submissao-manifest.json'),'utf8'));m.version='9.9.9';await writeFile(join(options.outDir,'submissao-manifest.json'),JSON.stringify(m));
 await expect(verifySubmissionPackage(options.outDir)).rejects.toThrow(/versão/);
 await writeFile(join(options.outDir,'pitch.mp4'),strToU8('alterado'));await expect(verifySubmissionPackage(options.outDir)).rejects.toThrow(/SHA-256 divergente/);
}));
