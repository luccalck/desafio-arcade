import {expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
export const levels=JSON.parse(await readFile('src/content/levels.json','utf8')).levels;
export const firstRoute=levels[0].solution.map(c=>c.kind);
export async function start(page){
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');
 await page.getByRole('button',{name:'▶ Jogar',exact:true}).click();
 await page.getByRole('button',{name:'Já conheço: ir à missão',exact:true}).click();
 await page.getByRole('button',{name:/Iniciar missão/}).click();
}
export async function addRoute(page,route){for(const kind of route)await page.locator(`#add-${kind}`).click();}
export async function stepRoute(page,steps){for(let i=0;i<steps;i++)await page.getByRole('button',{name:'Um passo',exact:true}).click();}
export async function finishFirst(page){await addRoute(page,firstRoute);await stepRoute(page,firstRoute.length);await expect(page.getByRole('heading',{name:'Sistema recuperado!',exact:true})).toBeVisible();}
export async function next(page){await page.getByRole('button',{name:/Próxima missão/}).click();await page.getByRole('button',{name:/Iniciar missão/}).click();}
export async function solve(page,index){
 await page.getByRole('button',{name:'Limpar',exact:true}).click();
 let steps=0;
 for(const command of levels[index].solution){
  if(command.kind==='repeat'){
   await page.getByRole('button',{name:/Montar bloco Repetir/}).click();
   for(const kind of command.body)await page.locator(`#draft-${kind}`).click();
   await page.getByLabel('2. Repita').selectOption(String(command.times));
   await page.getByRole('button',{name:'3. Adicionar repetição ao programa',exact:true}).click();steps+=command.body.length*command.times;
  }else{await addRoute(page,[command.kind]);steps++;}
 }
 await stepRoute(page,steps);
 await expect(page.getByRole('heading',{name:'Sistema recuperado!',exact:true})).toBeVisible();
}
