import {zipSync,strToU8} from 'fflate';
import {createHash} from 'node:crypto';
export const oldSha='a'.repeat(40),newSha='b'.repeat(40);
export const options={sha:newSha,run:'123',runAttempt:'1',actor:'DaviSouza78',siteUrl:'https://example.test/arcade/'};
export const version=sha=>({sha,version:'0.6.0',build:'2026-10-14T00:00:00Z'});
export const site=sha=>Object.fromEntries(['index.html','game.js','style.css','version.json','LEIA-ME.txt','LICENSE.txt','THIRD_PARTY.txt'].map(n=>[n,strToU8(n==='version.json'?JSON.stringify(version(sha)):'fixture '+n)]));
export const releases=sha=>Object.fromEntries(Object.entries(site(sha)).map(([n,v])=>[`releases/${sha}/${n}`,v]));
export const pointer=(estavel=oldSha,anterior=null,canario=null)=>({schema:1,strategy:'azul-verde',estavel,anterior,canario,percentual:0,retiradas:[]});
export const tree=(p=pointer())=>({...releases(oldSha),'rollout.json':strToU8(JSON.stringify(p)),'hml/preservar.txt':strToU8('preservar')});
export function bundle(){
 // Somente contrato sintético, sem alegar PDF/relatório acadêmico executado.
 const hash=b=>createHash('sha256').update(b).digest('hex'),zip=zipSync(site(newSha));
 const files={'build.zip':zip,'build.zip.sha256':strToU8(hash(zip)),'GDD.pdf':strToU8('%PDF-fixture'),'RelatorioTecnico.pdf':strToU8('%PDF-report-fixture'),'version.json':strToU8(JSON.stringify(version(newSha))),'sbom.cdx.json':strToU8('{"bomFormat":"CycloneDX"}')};
 for(const n of ['reports/seguranca/gitleaks.json','reports/seguranca/npm-audit.json','reports/qualidade/junit.xml','reports/qualidade/coverage/coverage-summary.json','reports/e2e/reports/e2e-junit.xml','reports/construcao/pdfinfo.txt','reports/construcao/relatorio-pdfinfo.txt','reports/construcao/reproducibility.json'])files[n]=strToU8('fixture');
 files['reports/construcao/relatorio-pdfinfo.txt']=strToU8('Pages: 1\n');
 files['ci-manifest.json']=strToU8(JSON.stringify({schema:1,...options,version:'0.6.0',build:version(newSha).build,files:Object.fromEntries(Object.entries(files).map(([n,b])=>[n,{sha256:hash(b),bytes:b.length}]))}));return files;
}
