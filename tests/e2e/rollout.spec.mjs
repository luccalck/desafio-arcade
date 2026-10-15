import {test,expect} from '@playwright/test';
import {createServer} from 'node:http';
import {readFileSync} from 'node:fs';
import {loaderFiles} from '../../scripts/prepare-pages.mjs';
import {releaseSmoke} from './release-smoke.mjs';
const actual=JSON.parse(readFileSync('dist/version.json','utf8')),a=actual.sha,b='b'.repeat(40),key='rota-do-codigo:preview:selected';
const formal=(estavel=a,anterior=null)=>({schema:1,strategy:'azul-verde',estavel,anterior,canario:null,percentual:0,retiradas:[]});
async function fixture(){
 let pointer=formal(),badJson=false;const missing=new Set(),requests=[],loader=loaderFiles();
 const s=createServer((req,res)=>{
  const path=new URL(req.url,'http://localhost').pathname;requests.push(path);
  const send=(body,type='text/html',status=200)=>{res.writeHead(status,{'Content-Type':type});res.end(body);};
  if(path==='/favicon.ico')return send('','image/x-icon',204);
  let name=path.slice('/arcade/'.length)||'index.html';
  if(/^releases\/[a-f0-9]{40}\/$/.test(name))name+='index.html';
  if(name==='rollout.json')return send(badJson?'{':JSON.stringify(pointer),'application/json');
  if(loader[name])return send(loader[name],name.endsWith('.mjs')?'application/javascript':'text/html');
  const match=/^releases\/([a-f0-9]{40})\/(index.html|game.js|style.css|version.json)$/.exec(name);
  if(!match||missing.has(name))return send('ausente','text/plain',404);
  if(match[2]==='version.json')return send(JSON.stringify({...actual,sha:match[1]}),'application/json');
  return send(readFileSync('dist/'+match[2]),match[2].endsWith('.js')?'application/javascript':match[2].endsWith('.css')?'text/css':'text/html');
 });
 await new Promise(r=>s.listen(0,'127.0.0.1',r));
 return {root:`http://127.0.0.1:${s.address().port}/arcade/`,requests,missing,set:value=>{pointer=value;},invalid:()=>{badJson=true;},close:async()=>{s.closeAllConnections();await new Promise(r=>s.close(r));}};
}
test('carregador real mantém sessão na promoção e retira versão defeituosa após rollback',async({page})=>{
 const f=await fixture();try{
  f.set({strategy:'preview',activeSha:a,previousSha:null});await page.goto(f.root);await expect(page).toHaveURL(`${f.root}releases/${a}/index.html`);
  f.set(formal(b,a));await page.goto(f.root);await expect(page).toHaveURL(`${f.root}releases/${a}/index.html`);
  await page.evaluate(({key,b})=>sessionStorage.setItem(key,b),{key,b});await page.goto(f.root);await expect(page).toHaveURL(`${f.root}releases/${b}/index.html`);
  f.set({...formal(a),retiradas:[b]});await page.goto(f.root);await expect(page).toHaveURL(`${f.root}releases/${a}/index.html`);
 }finally{await f.close();}
});
test('carregador funciona com storage bloqueado e não envia novas sessões à candidata',async({page})=>{
 const f=await fixture();try{
  f.set({...formal(a),canario:b});await page.addInitScript(()=>Object.defineProperty(window,'sessionStorage',{get(){throw Error('bloqueado');}}));
  await page.goto(f.root);await expect(page).toHaveURL(`${f.root}releases/${a}/index.html`);expect(f.requests.some(p=>p.includes(b))).toBe(false);
 }finally{await f.close();}
});
test('JSON e rede inválidos ficam no erro recuperável sem redirecionamento inventado',async({page})=>{
 const f=await fixture();try{
  f.invalid();await page.goto(f.root);await expect(page.locator('#loading')).toContainText('Não foi possível validar');await expect(page).toHaveURL(f.root);
  expect(f.requests.some(p=>p.includes('/releases/'))).toBe(false);
  await page.route('**/rollout.json',r=>r.abort());await page.goto(f.root);await expect(page.locator('#loading')).toContainText('Não foi possível validar');await expect(page.getByRole('link',{name:'Tentar novamente'})).toBeVisible();
 }finally{await f.close();}
});
test('release sem index não recebe navegação; anterior válida é alternativa',async({page})=>{
 const f=await fixture();try{
  f.set(formal(b,a));f.missing.add(`releases/${b}/index.html`);await page.goto(f.root);await expect(page).toHaveURL(`${f.root}releases/${a}/index.html`);
 }finally{await f.close();}
});
test('smoke014 valida gameplay através do carregador e contrato formal reais',async({page},info)=>{
 const f=await fixture();try{const reportPath=info.outputPath('smoke.json');await releaseSmoke(page,info,{url:f.root,sha:a,mode:'root',reportPath});const report=JSON.parse(readFileSync(reportPath,'utf8'));expect(report.passed).toBe(true);expect(report.expectedSha).toBe(a);}finally{await f.close();}
});
