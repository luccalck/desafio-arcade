import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {enterChallenge,finishFirst} from './helpers.mjs';
const version=JSON.parse(readFileSync('package.json','utf8')).version;
test('smoke: versão e um ciclo completo do laboratório',async({page})=>{
 await page.goto('./');await expect(page.locator('.version')).toContainText(`v${version}`);await enterChallenge(page);await finishFirst(page);await expect(page.getByTestId('xp')).toHaveText('100 XP');
});
