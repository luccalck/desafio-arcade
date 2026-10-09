import {test,expect,enter,solve,shot} from './helpers.mjs';
import {readFileSync} from 'node:fs';
test('smoke web: versão, editor e primeira função corrigida',async({page})=>{await page.goto('./');await expect(page.locator('.top-meta')).toContainText(`v${JSON.parse(readFileSync('package.json','utf8')).version}`);await enter(page);await expect(page.locator('#test-summary')).not.toContainText('Tudo certo');await solve(page,0);await expect(page.locator('#next-mission')).toBeVisible();});
test('primeira missão: problema real, JavaScript e correção',async({page})=>{
 await enter(page);await page.locator('#test-rules').click();await expect(page.locator('#test-summary')).toContainText('1/4');await page.locator('#show-tests').click();await expect(page.locator('dialog')).toContainText('Obtido');await page.getByRole('button',{name:'Fechar',exact:true}).click();await solve(page,0);await page.locator('#play-game').click();await page.keyboard.down('ArrowLeft');await expect.poll(async()=>Number(await page.locator('#ship').getAttribute('data-x'))).toBeLessThan(200);await page.keyboard.up('ArrowLeft');await page.locator('#pause-game').click();await shot(page,'oficina-primeira-desktop');
});
