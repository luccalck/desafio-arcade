import { expect } from '@playwright/test';
export const firstRoute=['advance','advance','advance','left','advance','advance'];
export async function start(page){await page.goto('./');await page.getByRole('button',{name:/Começar a jornada/}).click();}
export async function addRoute(page,route){for(const kind of route)await page.locator(`#add-${kind}`).click();}
export async function stepRoute(page,steps){for(let i=0;i<steps;i++)await page.getByRole('button',{name:'Um passo',exact:true}).click();}
export async function finishFirst(page){await addRoute(page,firstRoute);await stepRoute(page,6);await expect(page.getByRole('heading',{name:'Entrega concluída!',exact:true})).toBeVisible();}
