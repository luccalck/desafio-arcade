import {defineConfig} from '@playwright/test';
const root=process.env.PAGES_URL;
const target=process.env.BASE_URL||(root?new URL('hml/',root.replace(/\/?$/,'/')).href:undefined);
const hml=target?.replace(/\/?$/,'/');
if(!hml)throw Error('Informe BASE_URL da HML ou PAGES_URL da raiz do site.');
for(const value of [hml,root].filter(Boolean)){
 const url=new URL(value);if(!['http:','https:'].includes(url.protocol)||url.username||url.password)throw Error('URL deve ser HTTP(S), sem credenciais.');
}
if(!/^[a-f0-9]{40}$/.test(process.env.EXPECTED_SHA||''))throw Error('EXPECTED_SHA deve identificar o commit real publicado (40 caracteres hexadecimais).');
export default defineConfig({
 testDir:'tests/deploy',workers:1,retries:0,timeout:120000,fullyParallel:false,
 reporter:[['list'],['html',{outputFolder:'reports/pages-e2e',open:'never'}],['junit',{outputFile:'reports/pages-smoke.xml'}]],
 use:{browserName:'chromium',channel:process.env.PLAYWRIGHT_CHANNEL||'chrome',trace:'retain-on-failure',screenshot:'only-on-failure'},
 projects:[
  {name:'hml-desktop',grep:/@hml/,use:{baseURL:hml,viewport:{width:1280,height:900}}},
  {name:'hml-toque',grep:/@hml/,use:{baseURL:hml,viewport:{width:390,height:844},hasTouch:true,isMobile:true}},
  {name:'prd-smoke',grep:/@prd/,use:{baseURL:root,viewport:{width:1280,height:900}}},
 ],
});
