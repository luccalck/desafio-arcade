import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {createServer} from 'node:http';
import {releaseSmoke} from './release-smoke.mjs';
const version=JSON.parse(readFileSync('dist/version.json','utf8')),sha=version.sha;
async function fixture(fault=''){
 // Servidor sintético local atende navegador E consultas API de versão/recursos.
 let root,release;
 const server=createServer((req,res)=>{
  const send=(body,type='text/html',status=200)=>{res.writeHead(status,{'Content-Type':type});res.end(body);};
  if(req.url==='/favicon.ico')return send('','image/x-icon',204);
  const suffix=new URL(req.url,root).pathname.slice('/contract/'.length);
  if(!suffix)return send(fault==='loader'?'<main>carregador inválido</main>':`<script>location.replace(${JSON.stringify(release+'index.html')})</script>`);
  if(suffix==='rollout.json')return send(JSON.stringify({activeSha:fault==='pointer'?'b'.repeat(40):sha}),'application/json');
  const name=suffix.replace(`releases/${sha}/`,'')||'index.html';
  if(!['index.html','game.js','style.css','version.json'].includes(name))return send('ausente','text/plain',404);
  if(fault==='asset'&&name==='style.css')return send('ausente','text/plain',404);
  if(name==='version.json')return send(JSON.stringify({...version,sha:fault==='sha'?'b'.repeat(40):sha}),'application/json');
  let body=readFileSync(`dist/${name}`,'utf8');
  if(name==='game.js'){
   if(fault==='runtime')body+=';setTimeout(()=>{throw Error("fixture fatal")},0);';
   if(fault==='console')body+=';console.error("fixture console fatal");';
   if(fault==='control')body='window.addEventListener("keydown",e=>e.stopImmediatePropagation(),true);'+body;
  }
  return send(body,name.endsWith('.js')?'application/javascript':name.endsWith('.css')?'text/css':'text/html');
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 root=`http://127.0.0.1:${server.address().port}/contract/`;release=`${root}releases/${sha}/`;
 return {root,release,close:async()=>{server.closeAllConnections();await new Promise(r=>server.close(r));}};
}
test('contrato smoke aceita raiz com carregador e release correta',async({page},info)=>{
 const site=await fixture();try{await releaseSmoke(page,info,{url:site.root,sha,mode:'root',timeout:3000});}finally{await site.close();}
});
test('contrato smoke aceita candidata direta sem promover ponteiro',async({page},info)=>{
 const site=await fixture();try{await releaseSmoke(page,info,{url:site.release,sha,mode:'release',timeout:3000});}finally{await site.close();}
});
test('contrato smoke recusa HML como produção e candidata de outro SHA',async({page},info)=>{
 await expect(releaseSmoke(page,info,{url:'http://127.0.0.1/hml/',sha})).rejects.toThrow(/HML/);
 await expect(releaseSmoke(page,info,{url:`http://127.0.0.1/releases/${'b'.repeat(40)}/`,sha,mode:'release'})).rejects.toThrow(/SHA/);
});
for(const [fault,reason] of [['pointer',/SHA|ponteiro/],['sha',/SHA/],['loader',/URL|toHaveURL/],['asset',/recurso|HTTP/],['runtime',/fatal|runtime/],['console',/fatal|console/],['control',/movimento|toBeGreaterThan/]]){
 test(`contrato smoke bloqueia ${fault}`,async({page},info)=>{
  const site=await fixture(fault);
  try{await expect(releaseSmoke(page,info,{url:site.root,sha,mode:'root',timeout:2000})).rejects.toThrow(reason);}finally{await site.close();}
 });
}
