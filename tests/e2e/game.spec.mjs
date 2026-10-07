import {test,expect} from '@playwright/test';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {enterChallenge,finishFirst,fillProgram,execute,lessonToChallenge,missions} from './helpers.mjs';

test('menus: ajuda, opções e mapa de seis setores são utilizáveis',async({page})=>{
 await page.goto('./');await page.screenshot({path:'reports/screens/menu-logica-desktop.png',fullPage:true});await expect(page.locator('#continue-game')).toBeDisabled();
 await page.locator('#how-to').click();await expect(page.getByRole('dialog',{name:'Como jogar'})).toBeVisible();await page.getByRole('button',{name:'Entendi',exact:true}).click();
 await page.locator('#options').click();await page.locator('#setting-large').check();await page.locator('#setting-reduced').check();expect(await page.locator('html').getAttribute('class')).toContain('large-text');await page.getByRole('button',{name:'Voltar',exact:true}).click();
 await page.reload();await page.locator('#options').click();await expect(page.locator('#setting-large')).toBeChecked();await page.keyboard.press('Escape');await page.locator('#missions-menu').click();await expect(page.locator('.sector')).toHaveCount(6);await expect(page.getByRole('button',{name:/Desafio final:/})).toBeDisabled();
});
test('sequência: aula, exemplo, prática sem XP, desafio e correção',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');await page.locator('#new-game').click();await expect(page.locator('.lesson-cards article')).toHaveCount(3);await page.screenshot({path:'reports/screens/aula-sequencia.png',fullPage:true});
 await page.locator('#lesson-next').click();await expect(page.locator('#start-practice')).toBeDisabled();await page.locator('#step-program').click();await expect(page.getByTestId('feedback')).toContainText('Central ligada');await page.locator('#run-program').click();await expect(page.locator('#start-practice')).toBeEnabled();await page.locator('#start-practice').click();
 await page.locator('#add-read').click();await page.locator('#add-report').click();await execute(page,'practice');await expect(page.getByTestId('xp')).toHaveText('0 XP');await page.locator('#result-next').click();await expect(page.getByTestId('block-count')).toHaveText('0 / 16 blocos');
 await page.locator('#add-read').click();await page.locator('#run-program').click();await expect(page.getByRole('heading',{name:'Vamos revisar a lógica.'})).toBeVisible();await expect(page.getByTestId('feedback')).toContainText('sensor');await page.locator('#edit-program').click();await finishFirst(page);await expect(page.getByTestId('xp')).toHaveText('100 XP');
});
test('variáveis: acompanha mudança e o mesmo programa resolve entradas diferentes',async({page})=>{
 await enterChallenge(page,1);await fillProgram(page,missions[1].solution);await page.locator('#step-program').click();await expect(page.getByTestId('energy')).toHaveText('5');await expect(page.getByTestId('feedback')).toContainText('+3');await page.screenshot({path:'reports/screens/variaveis-desktop.png',fullPage:true});
 await page.locator('#run-program').click();await expect(page.getByRole('heading',{name:'Sistema recuperado!',exact:true})).toBeVisible();await expect(page.locator('.result-cases .won')).toHaveCount(2);
});
test('campanha: condições, E/OU, lotes e final em três cenários chegam a 700XP',async({page})=>{
 await enterChallenge(page);await finishFirst(page);
 for(let i=1;i<6;i++){
  await page.locator('#result-next').click();await lessonToChallenge(page,i);
  if(i===2){const bad=structuredClone(missions[i].solution);bad[0].else=[{kind:'action',action:'send'}];await fillProgram(page,bad);await page.locator('#run-program').click();await expect(page.getByRole('heading',{name:'Vamos revisar a lógica.'})).toBeVisible();await expect(page.getByTestId('feedback')).toContainText('revisão');await page.locator('#edit-program').click();}
  if(i===3){const bad=structuredClone(missions[i].solution);bad[0].condition.left.kind='or';await fillProgram(page,bad);await page.locator('#run-program').click();await expect(page.getByRole('heading',{name:'Vamos revisar a lógica.'})).toBeVisible();await page.locator('#edit-program').click();await page.locator('[id="join-0-inner"]').selectOption('and');await page.screenshot({path:'reports/screens/logica-e-ou-desktop.png',fullPage:true});}
  else await fillProgram(page,missions[i].solution);
  if(i===4)await page.screenshot({path:'reports/screens/repeticao-desktop.png',fullPage:true});
  if(i===5)await page.screenshot({path:'reports/screens/nucleo-final-desktop.png',fullPage:true});
  await execute(page);if(i===5)await expect(page.locator('.result-cases .won')).toHaveCount(3);
 }
 await expect(page.getByTestId('xp')).toHaveText('700 XP');await page.locator('#result-next').click();await expect(page.getByRole('heading',{name:/Suas regras/})).toBeVisible();await expect(page.locator('.medal-shelf>div')).toHaveCount(6);
});
test('progresso: reload, replay sem XP extra e reset só da chave própria',async({page})=>{
 await enterChallenge(page);await finishFirst(page);await page.reload();await expect(page.getByTestId('xp')).toHaveText('100 XP');await expect(page.locator('#continue-game')).toBeEnabled();
 await page.locator('#missions-menu').click();await page.getByRole('button',{name:/Missão 1:/}).click();await lessonToChallenge(page,0);await finishFirst(page);await expect(page.getByTestId('xp')).toHaveText('100 XP');
 await page.getByRole('button',{name:'Mapa de missões',exact:true}).click();await page.getByRole('button',{name:'Menu principal',exact:true}).click();await page.evaluate(()=>localStorage.setItem('outro-projeto','preservar'));await page.locator('#options').click();await page.locator('#reset-progress').click();await page.locator('#reset-confirm').click();await expect(page.getByTestId('xp')).toHaveText('0 XP');expect(await page.evaluate(()=>localStorage.getItem('outro-projeto'))).toBe('preservar');
});
test('teclado: remover último bloco preserva foco no editor (regressão #1)',async({page})=>{
 await enterChallenge(page);await page.locator('#add-power').focus();await page.keyboard.press('Enter');await page.locator('#remove-0').focus();await page.keyboard.press('Enter');await expect(page.locator('#add-power')).toBeFocused();
});
test('pausa: execução para e pode ser retomada',async({page})=>{
 await page.goto('./');await page.locator('#new-game').click();await page.locator('#lesson-next').click();await page.locator('#run-program').click();await page.locator('#top-menu').click();await expect(page.getByRole('dialog',{name:'Menu de pausa'})).toBeVisible();const before=await page.getByTestId('feedback').innerText();await page.waitForTimeout(650);expect(await page.getByTestId('feedback').innerText()).toBe(before);await page.locator('#resume').click();await expect(page.locator('#start-practice')).toBeEnabled({timeout:10000});
});
test('rever explicação preserva programa em edição',async({page})=>{
 await enterChallenge(page);await page.locator('#add-power').click();await page.locator('#add-sensor').click();await page.locator('#review-lesson').click();await expect(page.locator('.lesson-cards')).toBeVisible();await page.locator('#lesson-next').click();await expect(page.getByTestId('block-count')).toHaveText('2 / 16 blocos');
});
test('mobile: menus, aula e grupos condicionais sem overflow; campanha real',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');await page.screenshot({path:'reports/screens/menu-logica-mobile.png',fullPage:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.locator('#new-game').click();
 for(let i=0;i<6;i++){
  await lessonToChallenge(page,i);await fillProgram(page,missions[i].solution);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(i===2)await page.screenshot({path:'reports/screens/condicoes-mobile.png',fullPage:true});if(i===5)await page.screenshot({path:'reports/screens/final-mobile.png',fullPage:true});
  await page.locator('#mobile-run').click();await expect(page.getByRole('heading',{name:'Sistema recuperado!',exact:true})).toBeVisible();if(i<5)await page.locator('#result-next').click();
 }
 await expect(page.getByTestId('xp')).toHaveText('700 XP');
});
test('offline: file:// sem rede executa aprendizagem e desafio',async({browser})=>{
 test.skip(Boolean(process.env.BASE_URL),'HML usa HTTP; arquivo verifica build local.');const context=await browser.newContext({offline:true,reducedMotion:'reduce'});
 try{const page=await context.newPage(),external=[];page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});await page.goto(pathToFileURL(resolve('dist/index.html')).href);await page.locator('#new-game').click();await lessonToChallenge(page,0);await finishFirst(page);expect(external).toEqual([]);}finally{await context.close();}
});
test('armazenamento bloqueado mantém jogo e XP na sessão',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Bloqueado para teste','SecurityError');}}));await enterChallenge(page);await finishFirst(page);await page.getByRole('button',{name:'Mapa de missões',exact:true}).click();await page.getByRole('button',{name:'Menu principal',exact:true}).click();await expect(page.getByText('Progresso apenas nesta sessão',{exact:true})).toBeVisible();await expect(page.getByTestId('xp')).toHaveText('100 XP');
});
test('campanha antiga é preservada sem desbloquear conceitos novos',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('rota-do-codigo:campaign:v1',JSON.stringify({version:1,completed:['dados','firmware','circuito','automacao']})));await page.goto('./');await expect(page.getByText(/Nova campanha de lógica/)).toBeVisible();await expect(page.getByTestId('xp')).toHaveText('0 XP');expect(await page.evaluate(()=>localStorage.getItem('rota-do-codigo:campaign:v1'))).toContain('automacao');
});
