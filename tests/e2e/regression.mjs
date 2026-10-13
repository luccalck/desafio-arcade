import {expect} from '@playwright/test';
import {readFileSync,writeFileSync} from 'node:fs';
import {missions,solve,pilot} from './helpers.mjs';

export const pkg=JSON.parse(readFileSync('package.json','utf8'));

// Só lê HTTP/DOM e dirige controles. Não escreve storage nem chama o core.
export async function verifyBuild(page,url,expectedSha){
 const versionURL=new URL('version.json',url).href;
 await expect.poll(async()=>{
  try{const response=await page.request.get(versionURL,{timeout:10000});return {sha:response.ok()?(await response.json()).sha:'',http:response.status()};}catch(error){return {sha:'',error:error.message};}
 },{timeout:60000,intervals:[1000,2000,5000],message:`Aguardar SHA publicado em ${versionURL}`}).toMatchObject({sha:expectedSha});
 const response=await page.request.get(versionURL);expect(response.status()).toBe(200);
 const version=await response.json();expect(version.version).toBe(process.env.EXPECTED_VERSION||pkg.version);
 const document=await page.goto(url,{waitUntil:'networkidle'});expect(document.status()).toBe(200);
 await expect(page.locator('.top-meta')).toContainText(`v${version.version}`);
 await expect(page.locator('.top-meta')).toContainText(expectedSha.slice(0,7));
 await expect(page.locator('.home')).toContainText('Aprenda Python');
 return version;
}

export async function evidence(page,info,label,version){
 const screenshot=info.outputPath(`${label}.png`);
 await page.screenshot({path:screenshot,fullPage:true});
 await info.attach(label,{path:screenshot,contentType:'image/png'});
 const metadata=info.outputPath(`${label}.json`);
 writeFileSync(metadata,JSON.stringify({
  date:new Date().toISOString(),url:page.url(),version,scenario:info.title,project:info.project.name,
  input:info.project.use.hasTouch?'toque':'teclado',viewport:page.viewportSize(),
 },null,2)+'\n');
 await info.attach(`${label}-metadados`,{path:metadata,contentType:'application/json'});
}

async function activate(page,locator,touch){if(touch)await locator.tap();else await locator.click();}

export async function campaignRegression(page,info,{url,sha,touch=false}){
 const version=await verifyBuild(page,url,sha);
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await evidence(page,info,'menu',version);
 await activate(page,page.locator('#new-game'),touch);
 await expect(page.locator('#code-editor')).toHaveValue(missions[0].starter);
 await expect(page.locator('#next-mission')).toBeHidden();
 await activate(page,page.locator('#help'),touch);
 await expect(page.locator('dialog')).toContainText('if significa');
 await activate(page,page.getByRole('button',{name:'Fechar',exact:true}),touch);
 await page.locator('#code-editor').fill('def controlar(entrada):\n    return 0');
 await activate(page,page.locator('#test-rules'),touch);
 await expect(page.locator('#test-summary')).not.toContainText('Tudo certo');
 await expect(page.locator('#next-mission')).toBeHidden();
 await solve(page,0);
 await expect(page.locator('#xp-count')).toHaveText('100 XP');
 await expect(page.locator('#next-mission')).toBeVisible();
 await evidence(page,info,'primeira-missao-concluida',version);
 await activate(page,page.locator('#next-mission'),touch);
 for(let i=1;i<5;i++){
  await expect(page.locator('#mission-title')).toHaveText(missions[i].title);
  await solve(page,i);
  await activate(page,page.locator('#next-mission'),touch);
 }
 await expect(page.locator('#mission-title')).toHaveText(missions[5].title);
 await activate(page,page.locator('#test-rules'),touch);
 await expect(page.locator('#test-summary')).toContainText('23/23');
 await expect(page.locator('#download-game')).toBeHidden();
 if(touch)expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await pilot(page,touch);
 await expect(page.locator('#game-stage')).toHaveAttribute('data-status','won');
 await expect(page.locator('#game-stage')).toContainText('Você venceu!');
 await expect(page.locator('#test-summary')).toContainText('Projeto concluído');
 await expect(page.locator('#xp-count')).toHaveText('700 XP');
 await expect(page.locator('#download-game')).toBeVisible();
 await expect(page.locator('#download-python')).toBeVisible();
 expect(errors).toEqual([]);
 await evidence(page,info,'encerramento-real',version);
}

export async function restartRegression(page,info,{url,sha,touch=false}){
 const version=await verifyBuild(page,url,sha);
 await activate(page,page.locator('#new-game'),touch);
 await solve(page,0);
 await activate(page,page.locator('.brand'),touch);
 await activate(page,page.locator('#missions-menu'),touch);
 await expect(page.locator('[data-action=select][data-index="1"]')).toBeEnabled();
 await expect(page.locator('[data-action=select][data-index="2"]')).toBeDisabled();
 await activate(page,page.locator('[data-action=select][data-index="0"]'),touch);
 await expect(page.locator('#code-editor')).toHaveValue(missions[0].reference);
 await activate(page,page.locator('.brand'),touch);
 await activate(page,page.locator('#options'),touch);
 await activate(page,page.getByRole('button',{name:'Reiniciar oficina',exact:true}),touch);
 await expect(page.locator('dialog')).toContainText('Reiniciar oficina?');
 await activate(page,page.getByRole('button',{name:'Reiniciar',exact:true}),touch);
 await expect(page.locator('#xp-count')).toHaveText('0 XP');
 await expect(page.locator('#continue-game')).toBeDisabled();
 await page.reload();
 await expect(page.locator('#xp-count')).toHaveText('0 XP');
 await activate(page,page.locator('#new-game'),touch);
 await expect(page.locator('#code-editor')).toHaveValue(missions[0].starter);
 await expect(page.locator('#next-mission')).toBeHidden();
 await evidence(page,info,'reinicio-confirmado',version);
}
