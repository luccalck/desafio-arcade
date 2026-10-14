import {expect} from '@playwright/test';
import {missions} from './helpers.mjs';
import {verifyBuild,evidence} from './regression.mjs';

// Este contrato lança em qualquer falha: o runner devolve exit code !=0.
// Não promove releases nem executa rollback; consumidores019/022 devem respeitar o código.
export async function releaseSmoke(page,info,{url,sha,mode='root',timeout=10000}){
 if(!/^[a-f0-9]{40}$/.test(sha||''))throw Error('SHA esperado inválido.');
 const base=new URL(url);if(!['http:','https:'].includes(base.protocol)||base.username||base.password||base.search||base.hash)throw Error('URL pública inválida.');
 base.pathname=base.pathname.replace(/\/?$/,'/');
 if(!['root','release'].includes(mode)||/\/hml\/$/.test(base.pathname))throw Error('HML não substitui smoke PRD: escolha root ou release.');
 if(mode==='release'&&!base.pathname.endsWith(`/releases/${sha}/`))throw Error('URL da release não corresponde ao SHA.');
 const errors=[];
 const runtime=e=>errors.push(`runtime fatal: ${e.message}`);
 // Erros HTTP/rede são coletados pelos eventos abaixo, com URL e escopo.
 // A mensagem genérica do navegador pode incluir o favicon opcional da origem.
 const consoleError=e=>{if(e.type()==='error'&&!e.text().startsWith('Failed to load resource:'))errors.push(`console fatal: ${e.text()}`);};
 const failed=r=>{if(r.url().startsWith(base.origin+base.pathname))errors.push(`recurso sem resposta: ${r.url()}`);};
 const response=r=>{if(r.url().startsWith(base.origin+base.pathname)&&r.status()>=400)errors.push(`recurso HTTP${r.status()}: ${r.url()}`);};
 const healthy=()=>{if(errors.length)throw Error(errors.join('\n'));};
 page.on('pageerror',runtime);page.on('console',consoleError);page.on('requestfailed',failed);page.on('response',response);
 let release=base.href,version=null,passed=false;
 try{
  if(mode==='root'){
   const pointer=await page.request.get(new URL('rollout.json',base).href,{timeout});
   expect(pointer.status(),'HTTP do ponteiro').toBe(200);
   const rollout=await pointer.json();
   if(rollout.activeSha&&rollout.estavel&&rollout.activeSha!==rollout.estavel)throw Error('Ponteiro de produção ambíguo.');
   expect(rollout.estavel||rollout.activeSha,'SHA do ponteiro ativo').toBe(sha);
   release=new URL(`releases/${sha}/`,base).href;
  }
  const manifest=await page.request.get(new URL('version.json',release).href,{timeout});
  expect(manifest.status(),'HTTP version.json').toBe(200);
  expect((await manifest.json()).sha,'SHA do artefato').toBe(sha);
  for(const name of ['game.js','style.css']){
   const asset=await page.request.get(new URL(name,release).href,{timeout});
   expect(asset.status(),`recurso ${name}: HTTP200 exigido`).toBe(200);
  }
  // Reutiliza as verificações de versão/DOM do roteiro HML completo.
  version=await verifyBuild(page,release,sha);healthy();
  if(mode==='root'){
   await page.goto(base.href,{waitUntil:'networkidle',timeout});
   await expect(page).toHaveURL(new URL('index.html',release).href,{timeout});healthy();
  }
  await page.locator('#new-game').click({timeout});
  await expect(page.locator('#code-editor')).toHaveValue(missions[0].starter,{timeout});
  await page.locator('#code-editor').fill(missions[0].reference,{timeout});
  await page.locator('#test-rules').click({timeout});
  await expect(page.locator('#test-summary')).toContainText('Tudo certo',{timeout});
  await page.locator('#play-game').click({timeout});
  const initial=Number(await page.locator('#ship').getAttribute('data-x'));
  await page.keyboard.down('ArrowRight');
  try{await expect.poll(async()=>{healthy();return Number(await page.locator('#ship').getAttribute('data-x'));},{timeout,message:'Controle precisa produzir movimento real'}).toBeGreaterThan(initial);}
  finally{await page.keyboard.up('ArrowRight');}
  await page.locator('#pause-game').click({timeout});healthy();passed=true;
  return version;
 }finally{
  await info.attach('smoke-diagnostico',{body:Buffer.from(JSON.stringify({date:new Date().toISOString(),mode,url:base.href,release,expectedSha:sha,version,passed,errors},null,2)),contentType:'application/json'});
  await evidence(page,info,passed?'smoke-aprovado':'smoke-bloqueado',version||{sha});
  page.off('pageerror',runtime);page.off('console',consoleError);page.off('requestfailed',failed);page.off('response',response);
 }
}
