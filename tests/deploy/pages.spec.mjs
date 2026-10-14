import {test} from '@playwright/test';
import {campaignRegression,restartRegression} from '../e2e/regression.mjs';
import {releaseSmoke} from '../e2e/release-smoke.mjs';
test('@hml campanha: primeira missão até vitória e encerramento',async({page,baseURL},info)=>campaignRegression(page,info,{url:baseURL,sha:process.env.EXPECTED_SHA,touch:!!info.project.use.hasTouch}));
test('@hml reinício confirmado e progressão bloqueada',async({page,baseURL},info)=>restartRegression(page,info,{url:baseURL,sha:process.env.EXPECTED_SHA,touch:!!info.project.use.hasTouch}));
test('@prd smoke reduzido: release do mesmo SHA, editor e movimento',async({page,baseURL},info)=>releaseSmoke(page,info,{url:baseURL,sha:process.env.EXPECTED_SHA,mode:'root'}));
test('@candidate smoke da release candidata sem trocar produção',async({page,baseURL},info)=>releaseSmoke(page,info,{url:baseURL,sha:process.env.EXPECTED_SHA,mode:'release'}));
