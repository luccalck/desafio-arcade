import {test,expect} from '@playwright/test';
import {missions} from '../e2e/helpers.mjs';
import {campaignRegression,restartRegression,verifyBuild,evidence} from '../e2e/regression.mjs';
test('@hml campanha: primeira missão até vitória e encerramento',async({page,baseURL},info)=>campaignRegression(page,info,{url:baseURL,sha:process.env.EXPECTED_SHA,touch:!!info.project.use.hasTouch}));
test('@hml reinício confirmado e progressão bloqueada',async({page,baseURL},info)=>restartRegression(page,info,{url:baseURL,sha:process.env.EXPECTED_SHA,touch:!!info.project.use.hasTouch}));
test('@prd smoke reduzido: release do mesmo SHA, editor e movimento',async({page,baseURL},info)=>{
 if(!baseURL)throw Error('PAGES_URL da raiz publicada é obrigatória para prd-smoke.');
 const root=baseURL.replace(/\/?$/,'/');
 const rollout=await page.request.get(new URL('rollout.json',root).href);expect(rollout.status()).toBe(200);
 const active=(await rollout.json()).activeSha;expect(active).toBe(process.env.EXPECTED_SHA);
 const release=new URL(`releases/${active}/`,root).href;
 const version=await verifyBuild(page,release,process.env.EXPECTED_SHA);
 await page.goto(root,{waitUntil:'networkidle'});
 await expect(page).toHaveURL(new URL('index.html',release).href);
 await page.locator('#new-game').click();
 await expect(page.locator('#code-editor')).toHaveValue(missions[0].starter);
 await page.locator('#code-editor').fill(missions[0].reference);
 await page.locator('#test-rules').click();
 await expect(page.locator('#test-summary')).toContainText('Tudo certo');
 await page.locator('#play-game').click();await page.keyboard.down('ArrowRight');
 try{await expect.poll(async()=>Number(await page.locator('#ship').getAttribute('data-x'))).toBeGreaterThan(280);}finally{await page.keyboard.up('ArrowRight');}
 await page.locator('#pause-game').click();
 await evidence(page,info,'smoke-release',version);
});
