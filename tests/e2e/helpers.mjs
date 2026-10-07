import {readFileSync} from 'node:fs';
import {expect} from '@playwright/test';
export const missions=JSON.parse(readFileSync('src/content/missions.json','utf8')).missions;
const byId=(page,id)=>page.locator(`[id="${id}"]`);
async function expression(page,e,path){
 if(e.kind==='predicate'){await byId(page,`condition-${path}-a`).selectOption(e.name);return;}
 const nested=e.left.kind!=='predicate',g=nested?e.left:e;
 await byId(page,`condition-${path}-a`).selectOption(g.left.name);
 await byId(page,`join-${path}-inner`).selectOption(g.kind);
 await byId(page,`condition-${path}-b`).selectOption(g.right.name);
 if(nested){await byId(page,`join-${path}-outer`).selectOption(e.kind);await byId(page,`condition-${path}-c`).selectOption(e.right.name);}
}
async function addBlock(page,b,parent=''){
 const container=parent?page.locator(`[data-block="${parent.replace(/\.body$/,'')}"] > .loop-body`):page.locator('.program-panel > .program-list');
 const index=await container.locator(':scope > .code-block').count(),path=parent?`${parent}.${index}`:String(index);
 if(b.kind==='action'){
  if(parent)await page.locator(`button[data-action="add"][data-kind="${b.action}"][data-parent="${parent}"]`).click();else await byId(page,`add-${b.action}`).click();return;
 }
 if(b.kind==='foreach'){await page.locator('#add-loop').click();for(const node of b.body)await addBlock(page,node,`${path}.body`);return;}
 if(parent)await byId(page,`loop-if-${parent.replace(/\.body$/,'')}`).click();else await page.locator('#add-if').click();
 await expression(page,b.condition,path);
 for(const node of b.then)await byId(page,`branch-${path}.then`).selectOption(node.action);
 for(const node of b.else)await byId(page,`branch-${path}.else`).selectOption(node.action);
}
export async function fillProgram(page,program){await page.locator('#clear-program').click();for(const b of program)await addBlock(page,b);}
export async function execute(page,stage='challenge'){
 await page.locator('#run-program').click();await expect(page.getByRole('heading',{name:stage==='practice'?'Você entendeu a ferramenta!':'Sistema recuperado!',exact:true})).toBeVisible({timeout:20000});
}
export async function lessonToChallenge(page,index){
 await page.locator('#lesson-next').click();await page.locator('#run-program').click();await expect(page.locator('#start-practice')).toBeEnabled({timeout:20000});await page.locator('#start-practice').click();await fillProgram(page,missions[index].solution);await execute(page,'practice');await page.locator('#result-next').click();
}
export async function enterChallenge(page,index=0){
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');await page.locator('#new-game').click();
 for(let i=0;i<=index;i++){await lessonToChallenge(page,i);if(i<index){await fillProgram(page,missions[i].solution);await execute(page);await page.locator('#result-next').click();}}
}
export async function finishFirst(page){await fillProgram(page,missions[0].solution);await execute(page);}
