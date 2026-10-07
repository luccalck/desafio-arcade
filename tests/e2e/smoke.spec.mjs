import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {enter,fillLayout,execute} from './helpers.mjs';
test('smoke da candidata: versão e conexão funcional',async({page})=>{await page.goto('./');await expect(page.locator('.version')).toContainText(`v${JSON.parse(readFileSync('package.json','utf8')).version}`);await enter(page);await fillLayout(page,0);await execute(page);});
