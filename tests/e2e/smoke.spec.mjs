import { test,expect } from '@playwright/test';
import { start,addRoute,firstRoute } from './helpers.mjs';
test('smoke: versão, início e entrega da primeira fase',async({page})=>{
  const errors=[];page.on('pageerror',(e)=>errors.push(e.message));
  await page.goto('./');await expect(page.locator('.version')).toContainText('v0.1.0');
  if(process.env.EXPECTED_SHA)await expect(page.locator('.version')).toContainText(process.env.EXPECTED_SHA.slice(0,7));
  await start(page);await addRoute(page,firstRoute);
  await page.getByRole('button',{name:'▶ Executar',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Entrega concluída!',exact:true})).toBeVisible();
  expect(errors).toEqual([]);
});
