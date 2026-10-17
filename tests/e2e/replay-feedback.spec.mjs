import {test,expect,enter,solve} from './helpers.mjs';

test('reiniciar após derrota anuncia a partida atual, sem aviso residual',async({page})=>{
 await page.clock.install();
 await enter(page);
 for(let i=0;i<3;i++){await solve(page,i);await page.locator('#next-mission').click();}
 // Regra editada pela interface: mantém zero pontos para exercitar uma derrota real.
 await page.locator('#code-editor').fill('def pontuar(entrada):\n    return 0');
 await page.locator('#play-game').click();
 await page.keyboard.down('ArrowLeft');
 await page.clock.runFor(45000);
 await page.keyboard.up('ArrowLeft');
 await expect(page.locator('#game-stage')).toHaveAttribute('data-status','lost');
 await expect(page.locator('#run-message')).toContainText('A partida acabou');
 await page.locator('#play-game').click();
 await expect(page.locator('#game-stage')).toHaveAttribute('data-status','playing');
 await expect(page.locator('#game-lives')).toHaveText('♥ ♥ ♥');
 await expect(page.locator('#game-score')).toHaveText('0');
 await expect(page.locator('#run-message')).toContainText('Partida em andamento');
 await expect(page.locator('#run-message')).not.toContainText('A partida acabou');
});
