import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import {start,addRoute,firstRoute} from './helpers.mjs';
const pkg=JSON.parse(await readFile('package.json','utf8'));
test('smoke: versão e recuperação automática da primeira missão',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('./');await expect(page.locator('.version')).toContainText(`v${pkg.version}`);
 if(process.env.EXPECTED_SHA)await expect(page.locator('.version')).toContainText(process.env.EXPECTED_SHA.slice(0,7));
 await start(page);await addRoute(page,firstRoute);await page.getByRole('button',{name:'▶ Executar',exact:true}).click();
 await expect(page.getByRole('heading',{name:'Sistema recuperado!',exact:true})).toBeVisible();expect(errors).toEqual([]);
});
