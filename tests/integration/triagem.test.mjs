import {it,expect} from 'vitest';
import {zipSync,strToU8} from 'fflate';
import {mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {checkDuration,checkGddSections,checkZip,makeManifest,parseSquad,parseDeadline,validateDeadline,verifyManifest,requiredAssets,validateSubmission} from '../../scripts/triagem.mjs';
const validSquad='| Nome | RA | Papel | GitHub |\n|---|---|---|---|\n| Ana | 123456 | Produto | ana |\n| Beto | 234567 | Dev | beto |\n| Caio | 345678 | QA | caio |\n| Dora | 456789 | SRE | dora |';
const bundle=()=>zipSync({'site/index.html':strToU8('ok'),'site/LEIA-ME.txt':strToU8('leia')});
it('SQUAD ignora cabeçalho, exige quatro linhas completas e recusa RA vazio/não numérico',()=>{
 expect(parseSquad(validSquad)).toHaveLength(4);expect(()=>parseSquad(validSquad.replace('123456',''))).toThrow(/vazio/);expect(()=>parseSquad(validSquad.replace('123456','ra-sei'))).toThrow(/dígitos/);expect(()=>parseSquad(validSquad.split('\n').slice(0,5).join('\n'))).toThrow(/exatamente quatro/);
});
it('prazo exige ISO com fuso e reprova somente depois do instante configurado',()=>{
 expect(()=>parseDeadline('09/10/2026 19:00')).toThrow(/ISO/);expect(()=>parseDeadline('2026-02-31T19:00:00Z')).toThrow(/calendário inválida/);expect(()=>validateDeadline('2026-10-14T12:00:00-03:00',new Date('2026-10-14T15:00:01Z'))).toThrow(/encerrado/);expect(validateDeadline('2026-10-14T12:00:00-03:00',new Date('2026-10-14T15:00:00Z'))).toBe(true);
});
it('GDD exige as quatro seções e rejeita PDF convertido sem seção',()=>{
 expect(checkGddSections('Premissa e problema endereçado\nHigh concept\nGênero e plataforma\nMecânicas-core')).toBe(true);expect(()=>checkGddSections('Premissa e problema endereçado\nHigh concept')).toThrow(/quatro seções/);
});
it('ffprobe preserva frações e reprova vídeo acima de 90 segundos',()=>{
 expect(checkDuration('90.000')).toBe(true);expect(()=>checkDuration('0')).toThrow(/inválida/);expect(()=>checkDuration('90.1')).toThrow(/90\.1/);expect(()=>checkDuration('N/A')).toThrow(/inválida/);
});
it('ZIP deve descompactar e conter index e LEIA-ME',()=>{
 expect(checkZip(bundle())).toBe(true);expect(()=>checkZip(new Uint8Array([0,1,2]))).toThrow(/corrompido/);expect(()=>checkZip(zipSync({'index.html':strToU8('ok')}))).toThrow(/LEIA-ME/);
});
it('manifesto cobre exatamente quatro arquivos com hashes correspondentes',()=>{
 const files=Object.fromEntries(requiredAssets.map(name=>[name,strToU8(name)])),manifest=makeManifest(files);expect(verifyManifest(files,manifest)).toBe(true);expect(()=>verifyManifest({...files,'pitch.mp4':strToU8('outro')},manifest)).toThrow(/divergente/);expect(()=>verifyManifest(files,manifest.replace('GDD.pdf','extra.pdf'))).toThrow(/exatamente/);
});
it('reprova HTTP diferente de 200 e smoke Playwright falho',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'triagem-fixture-')),files=Object.fromEntries(requiredAssets.map(name=>[name,strToU8(name)]));files['build.zip']=bundle();files['GDD.pdf']=strToU8('pdf fixture');files['pitch.mp4']=strToU8('video fixture');files['LINK_DO_JOGO.txt']=strToU8('https://example.invalid/');
 try{
  for(const [name,bytes] of Object.entries(files))await writeFile(join(directory,name),bytes);await writeFile(join(directory,'MANIFESTO.sha256'),makeManifest(files));
  const base={directory,verifyPackage:async()=>({valid:true}),squadText:validSquad,env:{PRAZO:'2026-10-15T23:59:59Z',EXPECTED_SHA:'a'.repeat(40)},now:new Date('2026-10-14T00:00:00Z'),runCommand:async(command)=>command==='pdftotext'?'Premissa e problema endereçado\nHigh concept\nGênero e plataforma\nMecânicas-core':'90.0'};
  await expect(validateSubmission({...base,runCommand:async(command)=>{if(command==='pdfinfo')throw new Error('PDF corrompido');return 'ok';}})).rejects.toThrow(/PDF corrompido/);
  await expect(validateSubmission({...base,fetchImpl:async()=>({status:503})})).rejects.toThrow(/HTTP 503/);
  await expect(validateSubmission({...base,fetchImpl:async()=>({status:200}),runCommand:async(command)=>{if(command==='npx')throw new Error('smoke falhou');if(command==='pdftotext')return 'Premissa e problema endereçado\nHigh concept\nGênero e plataforma\nMecânicas-core';return '90.0';}})).rejects.toThrow(/smoke falhou/);
 }finally{await rm(directory,{recursive:true,force:true});}
});
it('percorre o contrato completo com adaptadores e gera manifesto somente após as validações',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'triagem-aprovada-fixture-')),files=Object.fromEntries(requiredAssets.map(name=>[name,strToU8(name)]));files['build.zip']=bundle();files['GDD.pdf']=strToU8('pdf fixture');files['pitch.mp4']=strToU8('video fixture');files['LINK_DO_JOGO.txt']=strToU8('https://example.invalid/');
 try{
  for(const [name,bytes] of Object.entries(files))await writeFile(join(directory,name),bytes);
  let smokeEnv;const result=await validateSubmission({directory,verifyPackage:async()=>({valid:true}),squadText:validSquad,generateManifest:true,env:{PRAZO:'2026-10-15T23:59:59Z',EXPECTED_SHA:'a'.repeat(40)},now:new Date('2026-10-14T00:00:00Z'),fetchImpl:async()=>({status:200}),runCommand:async(command,args,options)=>{if(command==='pdftotext')return 'Premissa e problema endereçado\nHigh concept\nGênero e plataforma\nMecânicas-core';if(command==='npx')smokeEnv=options.env;return '90.0';}});
  expect(result.approved).toBe(true);expect(smokeEnv.PAGES_URL).toBe('https://example.invalid/');expect(smokeEnv.EXPECTED_SHA).toBe('a'.repeat(40));expect(await readFile(join(directory,'MANIFESTO.sha256'),'utf8')).toContain('  pitch.mp4');
 }finally{await rm(directory,{recursive:true,force:true});}
});

it('modo vigilancia permite prazo passado e aciona alertApi em caso de indisponibilidade',async()=>{
 const directory=await mkdtemp(join(tmpdir(),'triagem-vigilancia-fixture-')),files=Object.fromEntries(requiredAssets.map(name=>[name,strToU8(name)]));
 files['build.zip']=bundle();files['GDD.pdf']=strToU8('pdf fixture');files['pitch.mp4']=strToU8('video fixture');files['LINK_DO_JOGO.txt']=strToU8('https://example.invalid/');
 try{
  for(const [name,bytes] of Object.entries(files))await writeFile(join(directory,name),bytes);
  await writeFile(join(directory,'MANIFESTO.sha256'),makeManifest(files));

  const base={directory,verifyPackage:async()=>({valid:true}),squadText:validSquad,env:{PRAZO:'2026-10-10T12:00:00Z',EXPECTED_SHA:'a'.repeat(40)},now:new Date('2026-10-14T00:00:00Z'),fetchImpl:async()=>({status:200}),runCommand:async(command)=>command==='pdftotext'?'Premissa e problema endereçado\nHigh concept\nGênero e plataforma\nMecânicas-core':'90.0'};
  await expect(validateSubmission({...base,mode:'entrega'})).rejects.toThrow(/Prazo de submissão encerrado/);

  const passed=await validateSubmission({...base,mode:'vigilancia'});
  expect(passed.approved).toBe(true);
  expect(passed.mode).toBe('vigilancia');

  const alerts=[];
  const mockAlertApi={notify:async(kind,url,reason)=>{alerts.push({kind,url,reason});}};
  await expect(validateSubmission({...base,mode:'vigilancia',fetchImpl:async()=>({status:503}),alertApi:mockAlertApi,alertOnFailure:true})).rejects.toThrow(/HTTP 503/);
  expect(alerts).toHaveLength(1);
  expect(alerts[0].kind).toBe('JogoForaDoAr');
  expect(alerts[0].url).toBe('https://example.invalid/');
 }finally{await rm(directory,{recursive:true,force:true});}
});
