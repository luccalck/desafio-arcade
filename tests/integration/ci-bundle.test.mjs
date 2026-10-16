import {it,expect} from 'vitest';
import {zipSync,strToU8} from 'fflate';
import {createHash} from 'node:crypto';
import {createBundle,verifyBundle,validateReportPages,hmlTiming} from '../../scripts/ci-bundle.mjs';
const sha='a'.repeat(40),run='123',hash=b=>createHash('sha256').update(b).digest('hex');
function fixture(){
 // Fixtures sintéticas de contrato; não são PDF/relatórios de execução acadêmica.
 const version={sha,version:'0.6.0',build:'2026-10-13T00:00:00Z'};
 const site=Object.fromEntries(['index.html','game.js','style.css','LEIA-ME.txt','LICENSE.txt','THIRD_PARTY.txt'].map(n=>[n,strToU8('fixture')]));
 site['version.json']=strToU8(JSON.stringify(version));const zip=zipSync(site);
 return {'build/artifacts/build.zip':zip,'build/artifacts/build.zip.sha256':strToU8(`${hash(zip)}  build.zip\n`),'build/artifacts/GDD.pdf':strToU8('%PDF-1.4 fixture'),'build/artifacts/RelatorioTecnico.pdf':strToU8('%PDF-1.4 fixture report'),'build/dist/version.json':site['version.json'],'seguranca/sbom.cdx.json':strToU8('{"bomFormat":"CycloneDX"}'),'seguranca/gitleaks.json':strToU8('[]'),'seguranca/npm-audit.json':strToU8('{"metadata":{"vulnerabilities":{"critical":0}}}'),'qualidade/junit.xml':strToU8('<testsuites tests="1" failures="0"/>'),'qualidade/coverage/coverage-summary.json':strToU8('{}'),'e2e/reports/e2e-junit.xml':strToU8('<testsuites tests="1" failures="0"/>'),'construcao/pdfinfo.txt':strToU8('fixture'),'construcao/relatorio-pdfinfo.txt':strToU8('Pages: 8\n'),'construcao/reproducibility.json':strToU8('{"passed":true}')};
}
it('reúne bytes originais e identifica SHA/run, sem recompilar',()=>{const inputs=fixture(),bundle=createBundle(inputs,{sha,run});expect(bundle['build.zip']).toEqual(inputs['build/artifacts/build.zip']);expect(verifyBundle(bundle,{sha,run}).version).toBe('0.6.0');});
it('recusa scanner/relatório ausente',()=>{const inputs=fixture();delete inputs['seguranca/gitleaks.json'];expect(()=>createBundle(inputs,{sha,run})).toThrow(/gitleaks/);});
it('checksum e SHA incorretos bloqueiam o contrato',()=>{const inputs=fixture();inputs['build/artifacts/build.zip.sha256']=strToU8('0'.repeat(64));expect(()=>createBundle(inputs,{sha,run})).toThrow(/checksum/);expect(()=>createBundle(fixture(),{sha:'b'.repeat(40),run})).toThrow(/SHA/);});
it('adulteração de PDF após coleta bloqueia deploy',()=>{const bundle=createBundle(fixture(),{sha,run});bundle['GDD.pdf']=strToU8('%PDF diferente');expect(()=>verifyBundle(bundle,{sha,run})).toThrow(/integridade/);});
it('run diferente e arquivo extra impedem consumir outro pacote',()=>{const bundle=createBundle(fixture(),{sha,run});expect(()=>verifyBundle(bundle,{sha,run:'999'})).toThrow(/run/);bundle['extra.txt']=strToU8('extra');expect(()=>verifyBundle(bundle,{sha,run})).toThrow(/inventário/);});
it('caminho fora do pacote é recusado',()=>{const inputs=fixture();inputs['qualidade/../../fora']=strToU8('fixture');expect(()=>createBundle(inputs,{sha,run})).toThrow(/caminho/);});

it('tentativa e relatório ausentes ou adulterados impedem consumir outra origem',()=>{
 const bundle=createBundle(fixture(),{sha,run,runAttempt:'2'});
 expect(()=>verifyBundle(bundle,{sha,run,runAttempt:'1'})).toThrow(/Tentativa/);
 const inputs=fixture();delete inputs['build/artifacts/RelatorioTecnico.pdf'];expect(()=>createBundle(inputs,{sha,run})).toThrow(/RelatorioTecnico/);
 for(const info of ['Pages: 13','Pages: 0','corrompido'])expect(()=>validateReportPages(info)).toThrow(/12 páginas/);
 expect(validateReportPages('Pages: 12\n')).toBe(12);
});
it('tempo push→HML usa evento exato; run criado e commit datado não substituem push',()=>{
 const ref='refs/heads/main',finishedAt='2026-10-14T12:15:00Z',event={id:'10',type:'PushEvent',created_at:'2026-10-14T12:00:00Z',payload:{ref,head:sha}};
 expect(hmlTiming({events:[event],sha,ref,finishedAt,run,runAttempt:'1'}).withinLimit).toBe(true);
 expect(hmlTiming({events:[event],sha,ref,finishedAt:'2026-10-14T12:15:01Z',run,runAttempt:'1'}).withinLimit).toBe(false);
 expect(()=>hmlTiming({events:[{...event,payload:{ref,head:'b'.repeat(40)}}],sha,ref,finishedAt,run})).toThrow(/PushEvent/);
 expect(()=>hmlTiming({events:[],sha,ref,finishedAt,run})).toThrow(/PushEvent/);
});

it('merge comprovado na main mede a publicação sem depender da API de eventos atrasada',()=>{
 const ref='refs/heads/main',finishedAt='2026-10-15T03:10:00Z';
 const mergeProof={number:32,baseRef:'main',merged:true,mergeCommitSha:sha,mergedAt:'2026-10-15T03:03:48Z',url:'https://github.com/equipe/jogo/pull/32'};
 const result=hmlTiming({events:[],sha,ref,finishedAt,run,runAttempt:'1',mergeProof});
 expect(result.pushToHmlSeconds).toBe(372);expect(result.withinLimit).toBe(true);expect(result.source).toContain('merged_at');
 for(const changed of [{...mergeProof,merged:false},{...mergeProof,baseRef:'feature/x'},{...mergeProof,mergeCommitSha:'b'.repeat(40)},{...mergeProof,mergedAt:null}])expect(()=>hmlTiming({events:[],sha,ref,finishedAt,run,mergeProof:changed})).toThrow();
});
it('payload imutável do push exige repositório, ref, SHA e timestamp verdadeiros',()=>{
 const ref='refs/heads/main',finishedAt='2026-10-15T03:10:00Z',repository='equipe/jogo';
 const pushPayload={ref,after:sha,deleted:false,repository:{full_name:repository,pushed_at:Date.parse('2026-10-15T03:05:00Z')/1000}};
 const result=hmlTiming({events:[],sha,ref,finishedAt,run,repository,pushPayload});
 expect(result.pushToHmlSeconds).toBe(300);expect(result.source).toContain('repository.pushed_at');
 for(const changed of [{...pushPayload,after:'b'.repeat(40)},{...pushPayload,ref:'refs/heads/outra'},{...pushPayload,deleted:true},{...pushPayload,repository:{...pushPayload.repository,full_name:'outra/equipe'}},{...pushPayload,repository:{...pushPayload.repository,pushed_at:null}}])expect(()=>hmlTiming({events:[],sha,ref,finishedAt,run,repository,pushPayload:changed})).toThrow();
});
it('push de tag anotada confere objeto remoto antes de usar timestamp do payload',()=>{
 const ref='refs/tags/v0.7.0',repository='equipe/jogo',objectSha='c'.repeat(40),finishedAt='2026-10-15T03:10:00Z';
 const pushPayload={ref,after:objectSha,repository:{full_name:repository,pushed_at:'2026-10-15T03:05:00Z'}};
 const args={events:[],sha,ref,finishedAt,run,repository,pushPayload,tagProof:{ref,sha,objectSha}};
 expect(hmlTiming(args).pushToHmlSeconds).toBe(300);
 expect(()=>hmlTiming({...args,tagProof:{ref,sha,objectSha:'d'.repeat(40)}})).toThrow();
});
