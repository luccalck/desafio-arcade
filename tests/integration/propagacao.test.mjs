import {it,expect} from 'vitest';
import {createServer} from 'node:http';
import {readFileSync} from 'node:fs';
import {awaitVersion} from '../../scripts/aguardar-versao.mjs';
const sha='b'.repeat(40);
async function serve(handler,run){const s=createServer(handler);await new Promise(r=>s.listen(0,'127.0.0.1',r));try{await run(`http://127.0.0.1:${s.address().port}/`);}finally{s.closeAllConnections();await new Promise(r=>s.close(r));}}
it('aguarda propagação real do servidor sintético e recusa SHA antigo até expirar',async()=>{
 let attempts=0;await serve((req,res)=>{res.statusCode=++attempts<3?404:200;res.end(JSON.stringify({sha,version:'0.6.0'}));},async url=>{const r=await awaitVersion({url,sha,mode:'release',intervalMs:5,timeoutMs:3000});expect(r.sha).toBe(sha);expect(attempts).toBeGreaterThan(2);});
 await serve((req,res)=>res.end(JSON.stringify({sha:'a'.repeat(40),version:'0.6.0'})),async url=>{await expect(awaitVersion({url,sha,mode:'release',timeoutMs:60,intervalMs:5})).rejects.toThrow(/Propagação/);});
});
it('workflow mantém aprovação, mesmo artefato, serialização e recuperação antes de liberar release',()=>{
 const workflow=readFileSync('.github/workflows/esteira.yml','utf8'),prd=workflow.split('  deploy-prd:')[1].split('  monitor-pos-producao:')[0];
 for(const contract of ['needs: [ci, pacote-ci, deploy-hml]','name: producao','group: pages-publicacao','cancel-in-progress: false','aceite-hml-${{ github.sha }}-${{ github.run_id }}-${{ github.run_attempt }}','id: recuperar','id: confirmar-recuperacao',"steps.publicar-recuperacao.outcome == 'success'"])expect(prd).toContain(contract);
 expect(prd.indexOf('--project=release-smoke')).toBeLessThan(prd.indexOf('id: promover'));expect(prd.indexOf('id: promover')).toBeLessThan(prd.indexOf('--project=prd-smoke'));expect(prd).not.toContain('continue-on-error');
});
