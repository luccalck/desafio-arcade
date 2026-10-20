import {it,expect} from 'vitest';
import {readFile,mkdtemp,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve,sep} from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import {unzipSync} from 'fflate';

it('CLI conclui a verificação de proveniência sem deadlock de importação circular',async()=>{
 const base=resolve(tmpdir()),directory=await mkdtemp(join(base,'arcade-cli-regression-'));
 if(!resolve(directory).startsWith(base+sep))throw Error('Diretório temporário fora da raiz esperada.');
 try{
  const files=unzipSync(await readFile('docs/entrega/1.0.0/submissao.zip'));
  for(const [name,bytes] of Object.entries(files)){
   if(name.includes('/')||name.includes('\\'))throw Error('Fixture deve conter somente arquivos na raiz.');
   await writeFile(join(directory,name),bytes);
  }
  const m=JSON.parse(Buffer.from(files['submissao-manifest.json']).toString());
  const preload=join(directory,'adaptadores-teste.mjs');
  // Adaptadores isolados: testa o CLI e o grafo real de módulos, não a operação pública.
  await writeFile(preload,`import cp from 'node:child_process';
import {syncBuiltinESMExports} from 'node:module';
import {EventEmitter} from 'node:events';
globalThis.fetch=async()=>({status:200});
cp.spawn=(command)=>{
 const child=new EventEmitter();child.stdout=new EventEmitter();child.stderr=new EventEmitter();
 queueMicrotask(()=>{
  child.stdout.emit('data',command==='pdftotext'?'Premissa e problema endereçado\\nHigh concept\\nGênero e plataforma\\nMecânicas-core':command==='ffprobe'?'86':'ok');
  child.emit('close',0);
 });return child;
};syncBuiltinESMExports();`);
  const stdout=execFileSync(process.execPath,['--import',pathToFileURL(preload).href,resolve('scripts/triagem.mjs'),directory,'--vigilancia'],{encoding:'utf8',timeout:8000,env:{...process.env,PRAZO:'2026-10-16T22:35:43-03:00',EXPECTED_SHA:m.sourceSha,SUBMISSION_RUN_ID:m.runId,SUBMISSION_RUN_ATTEMPT:m.runAttempt}});
  expect(stdout).toContain('"approved":true');expect(stdout).toContain('"mode":"vigilancia"');
 }finally{
  await rm(directory,{recursive:true,force:true});
 }
},15000);
