import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir:'tests/e2e', timeout:120000, workers:process.env.CI?2:4, fullyParallel:true, retries:process.env.CI?1:0,
  reporter:[['list'],['html',{outputFolder:'reports/e2e',open:'never'}],['junit',{outputFile:'reports/e2e-junit.xml'}]],
  use:{baseURL:process.env.BASE_URL||'http://127.0.0.1:4173',browserName:'chromium',channel:process.env.PLAYWRIGHT_CHANNEL||'chrome',
    trace:'retain-on-failure',screenshot:'only-on-failure',viewport:{width:1280,height:900}},
  webServer:process.env.BASE_URL||process.env.EXTERNAL_SERVER?undefined:{command:'node scripts/dev.mjs',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI},
});
