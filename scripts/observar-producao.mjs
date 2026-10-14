import {execFileSync} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import {setTimeout as pause} from 'node:timers/promises';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
export async function waitMonitor({dispatch,readRuns,title,timeoutMs=600000,intervalMs=10000,sleep=pause}){
 const previous=new Set((await readRuns()).map(r=>r.id)),start=performance.now();await dispatch();
 while(performance.now()-start<timeoutMs){
  const matches=(await readRuns()).filter(r=>!previous.has(r.id)&&r.display_title===title);
  if(matches.length>1)throw Error('Execução de monitor ambígua.');
  const run=matches[0];if(run?.status==='completed'){if(run.conclusion!=='success')throw Error(`Monitor não confirmou produção/alertas: ${run.html_url}`);return {id:run.id,url:run.html_url,conclusion:run.conclusion};}
  await sleep(intervalMs);
 }
 throw Error('Monitor pós-produção não terminou no prazo; não presumir sondas ou alertas ativos.');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const e=process.env;if(e.GITHUB_ACTIONS!=='true'||!/^[-\w.]+\/[-\w.]+$/.test(e.GITHUB_REPOSITORY??'')||!/^[a-f0-9]{40}$/.test(e.EXPECTED_SHA??''))throw Error('Contexto pós-produção inválido.');
 const parent=`${e.GITHUB_RUN_ID}/${e.GITHUB_RUN_ATTEMPT}`,repo=e.GITHUB_REPOSITORY;
 const result=await waitMonitor({title:`Sondas pós-produção ${parent}`,readRuns:async()=>JSON.parse(execFileSync('gh',['api',`repos/${repo}/actions/workflows/monitor.yml/runs?branch=main&event=workflow_dispatch&per_page=30`],{encoding:'utf8'})).workflow_runs,dispatch:async()=>execFileSync('gh',['workflow','run','monitor.yml','--repo',repo,'--ref','main','-f',`parent_run=${parent}`,'-f',`expected_sha=${e.EXPECTED_SHA}`],{stdio:'pipe'})});
 await mkdir('reports',{recursive:true});await writeFile('reports/monitor-pos-producao.json',JSON.stringify({parent,sha:e.EXPECTED_SHA,...result},null,2)+'\n');console.log(JSON.stringify(result));
}
