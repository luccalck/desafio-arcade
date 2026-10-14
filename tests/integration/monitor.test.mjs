import {it,expect} from 'vitest';
import {createServer} from 'node:http';
import {sondar,toCsv,appendCsv} from '../../scripts/sondar.mjs';
const sha='a'.repeat(40);
async function server(handler,run){
 const s=createServer(handler);await new Promise(r=>s.listen(0,'127.0.0.1',r));
 try{await run(`http://127.0.0.1:${s.address().port}/`);}finally{s.closeAllConnections();await new Promise(r=>s.close(r));}
}
it('mede HTTP/tempo/versão da HML por requisições reais ao servidor sintético',async()=>{
 await server((req,res)=>res.end(req.url.endsWith('version.json')?JSON.stringify({version:'0.6.0',sha}):'jogo'),async url=>{
  const r=await sondar({alvo:'hml',url});expect(r.codigo).toBe(200);expect(r.tempo).toBeGreaterThanOrEqual(0);expect(r.versao).toBe('0.6.0');expect(r.erro).toBeNull();
 });
});
it('segue ponteiro do carregador e confere SHA da release ativa',async()=>{
 await server((req,res)=>res.end(req.url==='/rollout.json'?JSON.stringify({activeSha:sha}):req.url===`/releases/${sha}/version.json`?JSON.stringify({version:'0.6.0',sha}):'loader'),async url=>{
  const r=await sondar({alvo:'producao',url,loader:true});expect(r.versao).toBe('0.6.0');expect(r.versionUrl).toBe(`${url}releases/${sha}/version.json`);
 });
});
it('não inventa 200/versão em HTTP503, timeout e erro de rede',async()=>{
 await server((req,res)=>{res.statusCode=503;res.end('fora');},async url=>{const r=await sondar({alvo:'hml',url});expect(r.codigo).toBe(503);expect(r.versao).toBe('desconhecida');});
 await server(()=>{},async url=>{const r=await sondar({alvo:'hml',url,timeoutMs:30});expect(r.codigo).toBeNull();expect(r.tempo).toBeNull();expect(r.erro).toBe('timeout');});
 const r=await sondar({alvo:'hml',url:'http://127.0.0.1:1/'});expect(r.codigo).toBeNull();expect(r.erro).toBe('rede');
});
it('versão inválida e SHA divergente não viram sucesso de versão',async()=>{
 await server((req,res)=>res.end(req.url==='/rollout.json'?JSON.stringify({activeSha:sha}):JSON.stringify({version:'invalida',sha:'b'.repeat(40)})),async url=>{const r=await sondar({alvo:'producao',url,loader:true});expect(r.versao).toBe('desconhecida');expect(r.erro).toBe('versao-invalida');});
});
it('recusa SHA divergente mesmo com SemVer válida e ponteiro inválido',async()=>{
 await server((req,res)=>res.end(req.url==='/rollout.json'?JSON.stringify({activeSha:sha}):JSON.stringify({version:'0.6.0',sha:'b'.repeat(40)})),async url=>{const r=await sondar({alvo:'producao',url,loader:true});expect(r.versao).toBe('desconhecida');expect(r.erro).toBe('versao-invalida');});
 await server((req,res)=>res.end(req.url==='/rollout.json'?'{}':'loader'),async url=>{const r=await sondar({alvo:'producao',url,loader:true});expect(r.erro).toBe('ponteiro-invalido');});
});
it('CSV preserva histórico e cabeçalho, com campos desconhecidos explícitos',()=>{
 const row={data:'2026-10-13T00:00:00Z',alvo:'hml',codigo:null,tempo:null,versao:'desconhecida'};
 const first=appendCsv('',[row]),second=appendCsv(first,[{...row,codigo:200,tempo:0.2,versao:'0.6.0'}]);
 expect(second.split('\n').filter(Boolean)).toHaveLength(3);expect(first).toContain('desconhecido,desconhecido,desconhecida');
 expect(toCsv({...row,alvo:'teste,"local"'})).toContain('"teste,""local"""');expect(()=>appendCsv('outro\n',[row])).toThrow(/cabeçalho/);
});
