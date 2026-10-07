import { test,expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import {start,addRoute,stepRoute,finishFirst} from './helpers.mjs';
test('regressão: primeira fase termina e avança para depuração',async({page})=>{
  await start(page);await finishFirst(page);await page.getByRole('button',{name:/Próximo desafio/}).click();
  await expect(page.getByRole('heading',{name:'Rota interrompida',exact:true})).toBeVisible();
  await expect(page.getByTestId('block-count')).toHaveText('2 / 14 blocos');
});
test('regressão: derrota permite editar, corrigir e reiniciar',async({page})=>{
  await start(page);await addRoute(page,['left','advance']);await stepRoute(page,2);
  await expect(page.getByRole('heading',{name:'Vamos corrigir a rota.'})).toBeVisible();
  await expect(page.getByRole('status')).toContainText('parede');
  await page.getByRole('button',{name:'Editar e tentar novamente'}).click();
  await expect(page.getByTestId('block-count')).toHaveText('2 / 8 blocos');
  await page.getByRole('button',{name:'Limpar',exact:true}).click();await finishFirst(page);
  await page.getByRole('button',{name:'Reiniciar desafio'}).click();
  await expect(page.getByTestId('block-count')).toHaveText('0 / 8 blocos');
  await expect(page.getByTestId('position')).toContainText('coluna 1, linha 4');
});
test('campanha: repetir conclui o padrão e permite recomeçar',async({page})=>{
  const levels=JSON.parse(await readFile('src/content/levels.json','utf8')).levels;
  await start(page);await finishFirst(page);await page.getByRole('button',{name:/Próximo desafio/}).click();
  await page.getByRole('button',{name:'Limpar',exact:true}).click();await addRoute(page,levels[1].solution.map((c)=>c.kind));
  await stepRoute(page,11);await page.getByRole('button',{name:/Próximo desafio/}).click();
  await page.getByText('Montar bloco repetir',{exact:true}).click();
  for(const kind of ['advance','left','advance','right'])await page.locator(`[data-action="draft"][data-kind="${kind}"]`).click();
  await page.getByRole('button',{name:'Adicionar repetição'}).click();
  await expect(page.getByTestId('block-count')).toHaveText('5 / 5 blocos');
  await stepRoute(page,15);await page.getByRole('button',{name:/Concluir jornada/}).click();
  await expect(page.getByRole('heading',{name:/Você encontrou/})).toBeVisible();
  await page.getByRole('button',{name:/Recomeçar jornada/}).click();
  await expect(page.getByRole('heading',{name:'Primeira entrega'})).toBeVisible();
});
test('mobile: sem overflow horizontal e ações alcançáveis',async({page})=>{
  await page.setViewportSize({width:390,height:844});await start(page);await finishFirst(page);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  await page.screenshot({path:'reports/screens/fim-mobile.png',fullPage:true});
});
test('offline: arquivo local completa primeira fase com rede desativada',async({browser})=>{
  test.skip(Boolean(process.env.BASE_URL),'Teste da build local; HML usa regressão HTTP.');
  const context=await browser.newContext({offline:true});
  try {
    const page=await context.newPage();const external=[];
    page.on('request',r=>{if(/^https?:/.test(r.url()))external.push(r.url());});
    await page.goto(pathToFileURL(resolve('dist/index.html')).href);
    await page.getByRole('button',{name:/Começar a jornada/}).click();await finishFirst(page);
    expect(external).toEqual([]);
  } finally {await context.close();}
});
test('teclado: remover último comando preserva foco no editor',async({page})=>{
  await start(page);await page.locator('#add-advance').focus();await page.keyboard.press('Enter');
  const remove=page.getByRole('button',{name:'Remover comando 1',exact:true});await remove.focus();await page.keyboard.press('Enter');
  await expect(page.locator('#add-advance')).toBeFocused();
});
