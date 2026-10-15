import {setTimeout as pause} from 'node:timers/promises';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {sondar} from './sondar.mjs';
export async function awaitVersion({url,sha,mode='root',timeoutMs=180000,intervalMs=5000}){
 if(!/^[a-f0-9]{40}$/.test(sha??'')||!['root','release'].includes(mode))throw Error('Alvo de propagação inválido.');
 const start=performance.now();let last;
 while(performance.now()-start<timeoutMs){
  last=await sondar({url,alvo:'propagacao',loader:mode==='root',timeoutMs:Math.max(1,Math.ceil(Math.min(5000,timeoutMs-(performance.now()-start))))});
  if(last.codigo===200&&last.sha===sha&&!last.erro)return last;
  const remaining=timeoutMs-(performance.now()-start);if(remaining>0)await pause(Math.min(intervalMs,remaining));
 }
 throw Error(`Propagação não confirmou SHA esperado: ${last?.erro??last?.sha??'sem resposta'}`);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){const [url,sha,mode]=process.argv.slice(2);console.log(JSON.stringify(await awaitVersion({url,sha,mode})));}
