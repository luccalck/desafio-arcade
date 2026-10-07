import {readFileSync} from 'node:fs';
import {expect} from '@playwright/test';
export const missions=JSON.parse(readFileSync('src/content/missions.json','utf8')).missions;
export const PROGRESS_KEY='rota-do-codigo:bench:v3';
export const cell=(page,n)=>page.locator(`#slot-${n.x}-${n.y}`);
export async function choosePiece(page,kind){if(await page.locator('#close-inspector').count())await page.locator('#close-inspector').click();await page.locator(`#piece-${kind}`).click();}
export async function configure(page,n){
 if(!['add','multiply','filter'].includes(n.kind))return;
 await cell(page,n).click();await page.locator('#configure-piece').click();
 if(n.kind!=='filter')await page.getByRole('button',{name:`Valor ${n.config.value}`,exact:true}).click();
 else{
  const c=n.config;await page.locator('#config-a').selectOption(c.a);await page.locator('#config-op').selectOption(c.op);
  if(c.op!=='single')await page.locator('#config-b').selectOption(c.b);
  await page.locator('#config-third').setChecked(c.third);
  if(c.third){await page.locator('#config-outer').selectOption(c.outer);await page.locator('#config-c').selectOption(c.c);}
  await page.locator('#config-invert').setChecked(c.invert);
 }
 await page.locator('#close-dialog').click();
}
export async function fillLayout(page,index,variant=0){
 const m=missions[index],l=m.solutions[variant];
 for(const n of l.nodes.filter(n=>!m.fixed.some(f=>f.id===n.id))){await choosePiece(page,n.kind);await cell(page,n).click();await configure(page,n);}
 for(const e of l.edges){const from=l.nodes.find(n=>n.id===e.from),to=l.nodes.find(n=>n.id===e.to);await cell(page,from).click();await page.locator(`#connect-${e.port}`).click();await cell(page,to).click();}
 if(await page.locator('#close-inspector').count())await page.locator('#close-inspector').click();
}
export async function execute(page){await page.locator('#run-circuit').click();await expect(page.locator('#result-next')).toBeVisible({timeout:20000});}
export async function enter(page,index=0){await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');await page.locator('#new-game').click();for(let i=0;i<index;i++){await fillLayout(page,i);await execute(page);await page.locator('#result-next').click();}}
