import {test,expect} from '@playwright/test';
import {readFileSync,mkdirSync} from 'node:fs';
export const missions=JSON.parse(readFileSync('src/content/missions.json','utf8')).missions;
export async function enter(page){await page.goto('./');await page.locator('#new-game').click();await expect(page.locator('#code-editor')).toBeVisible();}
export async function solve(page,index){await page.locator('#code-editor').fill(missions[index].reference);await page.locator('#test-rules').click();await expect(page.locator('#test-summary')).toContainText('Tudo certo');}
export async function finalProject(page){await enter(page);for(let i=0;i<5;i++){await solve(page,i);await page.locator('#next-mission').click();}await page.locator('#test-rules').click();await expect(page.locator('#test-summary')).toContainText('23/23');}
export async function pilot(page,touch=false){
 await page.locator('#play-game').click();let held='';
 const set=async side=>{if(side===held)return;if(held){if(touch)await page.mouse.up();else await page.keyboard.up(held==='left'?'ArrowLeft':'ArrowRight');}held=side;if(side){if(touch){const b=await page.locator(`#move-${side}`).boundingBox();await page.mouse.move(b.x+b.width/2,b.y+b.height/2);await page.mouse.down();}else await page.keyboard.down(side==='left'?'ArrowLeft':'ArrowRight');}};
 for(let n=0;n<600;n++){const status=await page.locator('#game-stage').getAttribute('data-status');if(status!=='playing'){await set('');expect(status).toBe('won');await expect(page.locator('#download-game')).toBeVisible();return;}
  const targets=await page.locator('[data-item]').evaluateAll(items=>items.map(e=>({type:e.getAttribute('data-type'),x:Number(e.getAttribute('data-x')),y:Number(e.getAttribute('data-y'))})).filter(i=>i.type!=='pedra'&&i.y<292));
  targets.sort((a,b)=>(b.type==='estrela'?1000:0)+b.y-((a.type==='estrela'?1000:0)+a.y));const ship=Number(await page.locator('#ship').getAttribute('data-x')),target=targets[0];await set(!target||Math.abs(target.x-ship)<8?'':target.x<ship?'left':'right');await page.waitForTimeout(80);
 }await set('');throw Error('Pilotagem não venceu no tempo esperado.');
}
export async function shot(page,name){mkdirSync('reports/screens',{recursive:true});await page.screenshot({path:`reports/screens/${name}.png`,fullPage:true});}
export {test,expect};
