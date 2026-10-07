import {test,expect} from '@playwright/test';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {start,addRoute,stepRoute,finishFirst,next,solve,levels} from './helpers.mjs';

test('tutorial: ação guiada muda posição, dados e direção antes da missão',async({page})=>{
 await page.goto('./');await page.screenshot({path:'reports/screens/campanha-desktop.png',fullPage:true});
 await page.getByRole('button',{name:'▶ Jogar',exact:true}).click();
 await expect(page.locator('#train-collect')).toBeDisabled();await page.locator('#train-advance').click();
 await expect(page.getByTestId('position')).toContainText('coluna 2, linha 3');
 await page.locator('#train-collect').click();await expect(page.getByTestId('packets')).toHaveText('1 / 1');
 await page.locator('#train-left').click();await expect(page.getByTestId('position')).toContainText('norte');
 await page.locator('#train-advance').click();await expect(page.getByRole('heading',{name:'Pronto para programar!'})).toBeVisible();
 await expect(page.getByTestId('xp')).toHaveText('0 XP');
 await page.locator('#training-next').click();await page.getByRole('button',{name:/Iniciar missão/}).click();
 await expect(page.getByTestId('block-count')).toHaveText('0 / 14 blocos');
 await page.screenshot({path:'reports/screens/missao-dados-desktop.png',fullPage:true});
});
test('dados: chegar sem coletar permite corrigir e recomeçar',async({page})=>{
 await start(page);await addRoute(page,levels[0].solution.filter(c=>c.kind!=='collect').map(c=>c.kind));await stepRoute(page,9);
 await expect(page.getByTestId('feedback')).toContainText('faltam objetivos');await expect(page.getByTestId('xp')).toHaveText('0 XP');
 await page.getByRole('button',{name:'Editar e tentar novamente'}).click();await page.getByRole('button',{name:'Limpar',exact:true}).click();await finishFirst(page);
 await expect(page.getByTestId('xp')).toHaveText('100 XP');
 await page.getByRole('button',{name:'Recomeçar missão',exact:true}).click();
 await expect(page.getByTestId('packets')).toHaveText('0 / 2');await expect(page.getByTestId('block-count')).toHaveText('0 / 14 blocos');
});
test('firmware: linha defeituosa é observável e pode ser substituída',async({page})=>{
 await start(page);await finishFirst(page);await next(page);await stepRoute(page,2);
 await expect(page.getByTestId('feedback')).toContainText('Comando 2');await expect(page.getByTestId('feedback')).toContainText('parede');
 await page.getByRole('button',{name:'Editar e tentar novamente'}).click();
 await page.getByLabel('Alterar comando 2',{exact:true}).selectOption('left');
 await addRoute(page,levels[1].solution.slice(2).map(c=>c.kind));await stepRoute(page,14);
 await expect(page.getByRole('heading',{name:'Sistema recuperado!',exact:true})).toBeVisible();
});
test('circuito: AND só abre a passagem depois de ativar A e B',async({page})=>{
 await start(page);await finishFirst(page);await next(page);await solve(page,1);await next(page);
 await addRoute(page,['advance','advance','advance','advance']);await stepRoute(page,4);
 await expect(page.getByTestId('feedback')).toContainText('porta fechada');
 await page.getByRole('button',{name:'Editar e tentar novamente'}).click();await page.getByRole('button',{name:'Limpar',exact:true}).click();
 await addRoute(page,levels[2].solution.map(c=>c.kind));await stepRoute(page,2);
 await expect(page.getByTestId('signal-a')).toHaveText('1');await expect(page.getByTestId('signal-b')).toHaveText('0');await expect(page.getByTestId('and-output')).toHaveText('0');
 await stepRoute(page,5);await expect(page.getByTestId('and-output')).toHaveText('1');
 await page.screenshot({path:'reports/screens/circuito-and-desktop.png',fullPage:true});
 await stepRoute(page,7);await expect(page.getByRole('heading',{name:'Sistema recuperado!',exact:true})).toBeVisible();
});
test('campanha: repetição com coleta conclui as quatro missões e 400 XP',async({page})=>{
 await start(page);await finishFirst(page);
 for(const i of [1,2,3]){await next(page);await solve(page,i);}
 await expect(page.getByTestId('packets')).toHaveText('3 / 3');await expect(page.getByTestId('xp')).toHaveText('400 XP');
 await page.getByRole('button',{name:/Concluir campanha/}).click();
 await expect(page.getByRole('heading',{name:/Seu código/})).toBeVisible();await expect(page.locator('.medal-shelf>div')).toHaveCount(4);
});
test('progresso: reload preserva desbloqueio, replay não duplica XP e reset só apaga jogo',async({page})=>{
 await start(page);await finishFirst(page);await page.reload();
 await expect(page.getByTestId('xp')).toHaveText('100 XP');await expect(page.getByRole('button',{name:/Missão 2:/})).toBeEnabled();await expect(page.getByRole('button',{name:/Missão 3:/})).toBeDisabled();
 await page.getByRole('button',{name:/Missão 1:/}).click();await page.getByRole('button',{name:/Iniciar missão/}).click();await finishFirst(page);
 await expect(page.getByTestId('xp')).toHaveText('100 XP');await expect(page.getByText('MISSÃO REVISITADA',{exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Campanha',exact:true}).click();
 await page.evaluate(()=>localStorage.setItem('outro-projeto','preservar'));
 await page.locator('#reset-progress').click();await page.locator('#reset-confirm').click();
 await expect(page.getByTestId('xp')).toHaveText('0 XP');expect(await page.evaluate(()=>localStorage.getItem('outro-projeto'))).toBe('preservar');
 await expect(page.getByRole('button',{name:/Missão 2:/})).toBeDisabled();
});
test('teclado: remover último comando preserva foco no editor',async({page})=>{
 await start(page);await page.locator('#add-advance').focus();await page.keyboard.press('Enter');
 await page.getByRole('button',{name:'Remover comando 1',exact:true}).focus();await page.keyboard.press('Enter');
 await expect(page.locator('#add-advance')).toBeFocused();
});
test('teclado: montar grupo repetir preserva foco entre inserções',async({page})=>{
 await start(page);await finishFirst(page);for(const i of [1,2]){await next(page);await solve(page,i);}await next(page);
 await page.locator('#toggle-repeat').click();await page.locator('#draft-advance').focus();await page.keyboard.press('Enter');
 await expect(page.locator('#draft-advance')).toBeFocused();await page.keyboard.press('Enter');
 await expect(page.locator('.draft>span')).toHaveCount(2);
});
test('mobile: campanha e missão sem overflow, controles e resultado alcançáveis',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('./');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 await page.screenshot({path:'reports/screens/campanha-mobile.png',fullPage:true});await start(page);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 await page.screenshot({path:'reports/screens/missao-dados-mobile.png',fullPage:true});
 await addRoute(page,levels[0].solution.map(c=>c.kind));
 await expect(page.locator('#mobile-run')).toBeVisible();await page.locator('#mobile-run').click();
 await expect(page.getByRole('heading',{name:'Sistema recuperado!',exact:true})).toBeVisible();
 await page.screenshot({path:'reports/screens/vitoria-mobile.png',fullPage:true});
});
test('offline: file:// recupera dados com rede desativada',async({browser})=>{
 test.skip(Boolean(process.env.BASE_URL),'Arquivo é teste da build local; HML usa regressão HTTP.');
 const context=await browser.newContext({offline:true,reducedMotion:'reduce'});
 try{
  const page=await context.newPage(),external=[];page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});
  await page.goto(pathToFileURL(resolve('dist/index.html')).href);
  await page.getByRole('button',{name:'▶ Jogar',exact:true}).click();await page.getByRole('button',{name:'Já conheço: ir à missão',exact:true}).click();await page.getByRole('button',{name:/Iniciar missão/}).click();await finishFirst(page);expect(external).toEqual([]);
 }finally{await context.close();}
});
test('armazenamento bloqueado: partida e XP continuam na sessão',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Bloqueado para este teste','SecurityError');}}));
 await start(page);await finishFirst(page);await expect(page.getByTestId('xp')).toHaveText('100 XP');
 await page.getByRole('button',{name:'Campanha',exact:true}).click();
 await expect(page.getByText('O progresso fica nesta sessão.',{exact:false})).toBeVisible();
});
