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
