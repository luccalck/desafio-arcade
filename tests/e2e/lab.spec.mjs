import {test,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {choosePiece,configure,enter,execute,fillLayout,missions,PROGRESS_KEY} from './helpers.mjs';
const screens='reports/screens',shot=async(page,name)=>{await mkdir(screens,{recursive:true});await page.screenshot({path:`${screens}/${name}.png`,fullPage:true});};
test('bancada: montagem e conexão sem aulas obrigatórias',async({page})=>{
 await enter(page);await expect(page.locator('.circuit-board')).toBeVisible();await expect(page.locator('#lesson-next')).toHaveCount(0);
 await fillLayout(page,0);await shot(page,'bancada-conexao-desktop');await execute(page);await expect(page.locator('.total-xp')).toHaveText('+100 XP');
});
test('primeira missão aceita o outro caminho',async({page})=>{await enter(page);await fillLayout(page,0,1);await execute(page);});
test('transformação: erro visível e correção preservando montagem',async({page})=>{
 await enter(page,1);await fillLayout(page,1);const n={...missions[1].solutions[0].nodes.find(n=>n.id==='a'),kind:'add',config:{value:2}};await configure(page,n);await page.locator('#run-circuit').click();await expect(page.locator('.bench-feedback')).toContainText('Saiu');await expect(page.locator('.slot.fault')).toHaveCount(1);
 await shot(page,'bancada-erro-real');await configure(page,{...n,config:{value:1}});await page.locator('#close-inspector').click();await shot(page,'bancada-valores-desktop');await execute(page);
});
test('campanha inteira combina sensores, valores e memória:700XP',async({page})=>{
 await enter(page);for(let i=0;i<6;i++){await fillLayout(page,i,i%2);if(i===3)await shot(page,'bancada-acesso-desktop');if(i===5)await shot(page,'bancada-final-desktop');await execute(page);if(i<5)await page.locator('#result-next').click();}
 await expect(page.getByRole('heading',{name:'Você fez funcionar.'})).toBeVisible();await expect(page.locator('.total-xp')).toHaveText('700 XP');
});
test('arrastar, girar, mover, soltar cabos e desfazer alteram peças reais',async({page})=>{
 await enter(page);await page.locator('#piece-relay').dragTo(page.locator('#slot-2-2'));await expect(page.locator('#slot-2-2')).toHaveAttribute('draggable','true');await page.locator('#rotate-piece').click();await expect(page.locator('#slot-2-2 .piece-icon')).toHaveAttribute('style','--rotation:90deg');
 await page.locator('#move-piece').click();await page.locator('#slot-2-0').click();await expect(page.locator('#slot-2-0 .piece-icon')).toHaveText('↗');await page.locator('#undo').click();await expect(page.locator('#slot-2-2 .piece-icon')).toHaveText('↗');
 await page.locator('#slot-0-2').click();await page.locator('#connect-out').dragTo(page.locator('#slot-2-2'));await expect(page.locator('.wire')).toHaveCount(1);await page.locator('#slot-0-2').click();await page.locator('#disconnect-piece').click();await expect(page.locator('.wire')).toHaveCount(0);
});
test('cabo longo e encaixe danificado não criam conexão falsa',async({page})=>{await enter(page);await page.locator('#slot-0-2').click();await page.locator('#connect-out').click();await page.locator('#slot-6-2').click();await expect(page.locator('.bench-feedback')).toContainText('alcance');await expect(page.locator('.wire')).toHaveCount(0);await expect(page.locator('#slot-3-2')).toBeDisabled();});
test('teclado e regressão do foco após remover última peça #1',async({page})=>{await enter(page);await choosePiece(page,'relay');await page.locator('#slot-2-2').focus();await page.keyboard.press('Enter');await page.locator('#remove-piece').click();await expect(page.locator('#slot-2-2')).toBeFocused();await page.keyboard.press('ArrowUp');await expect(page.locator('#slot-2-1')).toBeFocused();await expect(page.locator('.slot.relay')).toHaveCount(0);});
test('pausa conserva a simulação e retoma',async({page})=>{
 await enter(page);await page.emulateMedia({reducedMotion:'no-preference'});await fillLayout(page,0);await page.locator('#run-circuit').click();await expect(page.locator('.packet-token')).toBeVisible();await page.locator('#top-menu').click();await expect(page.getByRole('dialog',{name:'Pausa'})).toBeVisible();const before=await page.locator('.packet-token').getAttribute('transform');await page.waitForTimeout(600);expect(await page.locator('.packet-token').getAttribute('transform')).toBe(before);await page.locator('#resume').click();await expect(page.locator('#result-next')).toBeVisible({timeout:15000});
});
test('ajuda, registro, lotes e preferências ficam sob demanda',async({page})=>{
 await enter(page,1);await expect(page.locator('.trace-list')).toHaveCount(0);await page.locator('#help').click();await expect(page.getByRole('dialog',{name:'Ajuda'})).toContainText('todas as entradas');await page.locator('#close-dialog').click();await page.locator('#open-cases').click();await page.locator('#case-1').click();await expect(page.locator('.packet-strip')).toContainText('N1');await page.locator('#open-log').click();await expect(page.getByRole('dialog',{name:'Registro'})).toContainText('Ligue');await page.locator('#close-dialog').click();
 await page.locator('#top-menu').click();await page.getByRole('button',{name:'Opções',exact:true}).click();await page.locator('#setting-large').check();await page.locator('#setting-reduced').check();await page.reload();await expect(page.locator('html')).toHaveClass(/large-text/);await expect(page.locator('html')).toHaveClass(/reduced-motion/);await shot(page,'bancada-menu-desktop');
});
test('reload/replay/reset preserva outros dados e XP não duplica',async({page})=>{
 await enter(page);await fillLayout(page,0);await execute(page);await page.evaluate(()=>localStorage.setItem('teste-preservado','valor'));await page.reload();await expect(page.locator('.title-footer')).toContainText('100 XP');await page.locator('#missions-menu').click();await page.getByRole('button',{name:'Missão 1: Reconectar a central',exact:true}).click();await fillLayout(page,0);await execute(page);await expect(page.locator('.total-xp')).toHaveText('✓ Concluído');await page.getByRole('button',{name:'Missões',exact:true}).click();await page.locator('.brand').click();await page.locator('#options').click();await page.locator('#reset-progress').click();await page.locator('#reset-confirm').click();await expect(page.locator('.title-footer')).toContainText('0 XP');expect(await page.evaluate(()=>localStorage.getItem('teste-preservado'))).toBe('valor');
});
test('mobile390x844: campanha completa por toque sem overflow',async({page})=>{
 await page.setViewportSize({width:390,height:844});await enter(page);for(let i=0;i<6;i++){await fillLayout(page,i);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);if(i===0)await shot(page,'bancada-mobile');if(i===5)await shot(page,'bancada-final-mobile');await execute(page);if(i<5)await page.locator('#result-next').click();}await expect(page.locator('.total-xp')).toHaveText('700 XP');
});
test('fileoffline sem rede: colocar/conectar e vencer primeira missão',async({page})=>{
 const external=[];page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});await page.context().setOffline(true);await page.emulateMedia({reducedMotion:'reduce'});await page.goto(pathToFileURL(resolve('dist/index.html')).href);await page.locator('#new-game').click();await fillLayout(page,0);await execute(page);expect(external).toEqual([]);
});
test('armazenamento indisponível mantém campanha na sessão',async({page})=>{await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('indisponível');}});});await enter(page);await fillLayout(page,0);await execute(page);await page.getByRole('button',{name:'Missões',exact:true}).click();await page.locator('.brand').click();await expect(page.locator('.title-footer')).toContainText('100 XP');await expect(page.locator('.title-footer')).toContainText('sessão');});
test('campanha antiga permanece sem desbloquear a bancada',async({page})=>{await page.addInitScript(()=>{localStorage.setItem('rota-do-codigo:lab:v2',JSON.stringify({version:2,completed:['lab-sequence']}));});await page.goto('./');await expect(page.locator('.legacy-note')).toBeVisible();await expect(page.locator('#continue-game')).toBeDisabled();expect(await page.evaluate(()=>localStorage.getItem('rota-do-codigo:lab:v2'))).toContain('lab-sequence');expect(await page.evaluate(k=>localStorage.getItem(k),PROGRESS_KEY)).toBeNull();});

