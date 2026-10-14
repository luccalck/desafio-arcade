import {it,expect} from 'vitest';
import {zipSync,strToU8} from 'fflate';
import {createHash} from 'node:crypto';
import {prepareHml} from '../../scripts/publicar.mjs';
const sha='a'.repeat(40),run='123';
function bundle(){
 // Contrato sintético; estes bytes não são evidência de CI ou GDD real.
 const site=Object.fromEntries(['index.html','game.js','style.css','LEIA-ME.txt','LICENSE.txt','THIRD_PARTY.txt'].map(n=>[n,strToU8('fixture')]));
 site['version.json']=strToU8(JSON.stringify({sha,version:'0.6.0',build:'2026-10-13T00:00:00Z'}));
 const zip=zipSync(site),hash=b=>createHash('sha256').update(b).digest('hex');
 const files={'build.zip':zip,'build.zip.sha256':strToU8(hash(zip)),'GDD.pdf':strToU8('%PDF-fixture'),'RelatorioTecnico.pdf':strToU8('%PDF-report-fixture'),'version.json':site['version.json'],'sbom.cdx.json':strToU8('{"bomFormat":"CycloneDX"}')};
 for(const name of ['reports/seguranca/gitleaks.json','reports/seguranca/npm-audit.json','reports/qualidade/junit.xml','reports/qualidade/coverage/coverage-summary.json','reports/e2e/reports/e2e-junit.xml','reports/construcao/pdfinfo.txt','reports/construcao/relatorio-pdfinfo.txt','reports/construcao/reproducibility.json'])files[name]=strToU8('fixture');
 files['reports/construcao/relatorio-pdfinfo.txt']=strToU8('Pages: 1\n');
 files['ci-manifest.json']=strToU8(JSON.stringify({schema:1,sha,run,runAttempt:'1',version:'0.6.0',build:'2026-10-13T00:00:00Z',files:Object.fromEntries(Object.entries(files).map(([name,b])=>[name,{sha256:hash(b),bytes:b.length}]))}));
 return files;
}
it('publica somente HML e preserva produção, releases e painel byte a byte',()=>{
 const existing={'index.html':strToU8('loader'),'rollout.json':strToU8('ponteiro'),'status/index.html':strToU8('painel'),'releases/antiga/game.js':strToU8('anterior'),'hml/obsoleto.txt':strToU8('velho')};
 const files=prepareHml(bundle(),{sha,run,existing});
 for(const [name,value] of Object.entries(existing).filter(([n])=>!n.startsWith('hml/')))expect(files[name]).toEqual(value);
 expect(files['hml/obsoleto.txt']).toBeUndefined();
 expect(JSON.parse(new TextDecoder().decode(files['hml/version.json'])).sha).toBe(sha);
 expect(Object.keys(files).filter(n=>n.startsWith('hml/'))).toHaveLength(7);
});
it('recusa pacote de outra execução e bytes adulterados antes de publicar',()=>{
 expect(()=>prepareHml(bundle(),{sha,run:'999'})).toThrow(/run/);
 const files=bundle();files['build.zip'][0]^=1;
 expect(()=>prepareHml(files,{sha,run})).toThrow(/integridade/);
});
