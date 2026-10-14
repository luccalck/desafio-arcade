import {test,expect} from '@playwright/test';
import {createServer} from 'node:http';
import {loaderFiles} from '../../scripts/prepare-pages.mjs';
const sha='a'.repeat(40),repository='luccalck/desafio-arcade';
async function fixture(){const files=loaderFiles(),s=createServer((req,res)=>{let name=new URL(req.url,'http://localhost').pathname.slice('/arcade/'.length);if(name==='status/')name+='index.html';if(name==='rollout.json'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify({schema:1,strategy:'azul-verde',estavel:sha,anterior:null,canario:null,percentual:0,retiradas:[]}));return;}if(!files[name]){res.statusCode=404;res.end('ausente');return;}res.setHeader('Content-Type',name.endsWith('.mjs')?'application/javascript':'text/html');res.end(files[name]);});await new Promise(r=>s.listen(0,'127.0.0.1',r));return {url:`http://127.0.0.1:${s.address().port}/arcade/status/`,close:async()=>{s.closeAllConnections();await new Promise(r=>s.close(r));}};}
async function dataRoutes(page,mode){
 const time=new Date(Date.now()-60000).toISOString(),header='data,alvo,codigo,tempo,versao\n';
 const reply=(r,body,status=200)=>r.fulfill({status,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},body:typeof body==='string'?body:JSON.stringify(body)});
 await page.route(`https://api.github.com/repos/${repository}/git/ref/heads/observabilidade`,r=>reply(r,mode==='absent'?{}:{object:{sha}},mode==='absent'?404:200));
 await page.route(`https://raw.githubusercontent.com/${repository}/${sha}/status/**`,r=>{
  const name=new URL(r.request().url()).pathname.split('/').at(-1);
  if(name==='sondas.csv')return reply(r,mode==='malformed'?'inválido\n':header+`${time},producao,200,0.2,0.6.0\n`);
  if(name==='ultima.json')return reply(r,{schema:1,formalPrd:true,samples:[{data:time,alvo:'producao',codigo:200,tempo:0.2,versao:'0.6.0',sha,erro:null}]});
  if(name==='dora.json')return reply(r,{schema:1,generatedAt:time,period:{from:new Date(Date.now()-86400000).toISOString(),to:time},metrics:{deploymentFrequency:{value:2,unit:'deploys/dia',samples:2,source:'https://github.com/fixture/arcade/actions'},leadTime:{value:null,reason:'<img src=x onerror=alert(1)> sem dados'}}});
  return reply(r,{},404);
 });
}
test('painel real local em celular expõe ausência sem números fictícios e funciona por teclado',async({page},info)=>{
 const f=await fixture();try{await page.setViewportSize({width:390,height:844});await dataRoutes(page,'absent');await page.goto(f.url);await expect(page.locator('#state')).toContainText('Estado atual desconhecido');await expect(page.locator('#availability')).toHaveText('Indisponível');await expect(page.locator('#latency')).toHaveText('Indisponível');await expect(page.locator('#dora .metric-value').filter({hasText:'Indisponível'})).toHaveCount(4);await expect(page.locator('#errors')).toContainText('HTTP404');
  await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Pular para os indicadores'})).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('#main')).toBeFocused();await page.getByRole('button',{name:'Atualizar dados'}).focus();await page.keyboard.press('Enter');await expect(page.getByRole('button',{name:'Atualizar dados'})).toBeEnabled();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  const path=info.outputPath('painel-local-sem-dados-mobile.png');await page.screenshot({path,fullPage:true});await info.attach('painel-local-sem-dados-mobile',{path,contentType:'image/png'});
 }finally{await f.close();}
});
test('painel renderiza fontes sintéticas com SHA/período e não interpreta conteúdo como HTML',async({page},info)=>{
 const f=await fixture();try{await dataRoutes(page,'healthy');await page.goto(f.url);await expect(page.locator('#availability')).toHaveText('100.0%');await expect(page.locator('#latency')).toHaveText('200ms');await expect(page.locator('#version')).toHaveText('0.6.0');await expect(page.locator('#version-detail')).toContainText(sha);await expect(page.locator('#rollout')).toContainText('Azul-verde');await expect(page.locator('#dora')).toContainText('2 deploys/dia');await expect(page.locator('#dora')).toContainText('<img src=x');await expect(page.locator('#dora img')).toHaveCount(0);await expect(page.locator('#source a')).toHaveAttribute('href',`https://raw.githubusercontent.com/${repository}/${sha}/status/sondas.csv`);
  const path=info.outputPath('painel-local-dados-sinteticos-desktop.png');await page.screenshot({path,fullPage:true});await info.attach('painel-local-dados-sinteticos-desktop',{path,contentType:'image/png'});
 }finally{await f.close();}
});
test('CSV inválido conserva estado desconhecido e explicita a causa',async({page})=>{
 const f=await fixture();try{await dataRoutes(page,'malformed');await page.goto(f.url);await expect(page.locator('#availability')).toHaveText('Indisponível');await expect(page.locator('#errors')).toContainText('Cabeçalho CSV incompatível');await expect(page.locator('#version')).toHaveText('Indisponível');}finally{await f.close();}
});
