import {it,expect} from 'vitest';
import {zipSync,strToU8} from 'fflate';
import {mkdtemp,writeFile,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createSubmissionPackage,verifySubmissionPackage} from '../../scripts/submissao.mjs';

const makeBundle=()=>zipSync({'site/index.html':strToU8('ok'),'site/LEIA-ME.txt':strToU8('leia')});

it('cria pacote de submissao completo com manifesto e metadados validos',async()=>{
 const tmp=await mkdtemp(join(tmpdir(),'submissao-test-'));
 const bundleDir=join(tmp,'bundle');
 const outDir=join(tmp,'submissao');
 try{
  const {mkdir}=await import('node:fs/promises');
  await mkdir(bundleDir,{recursive:true});
  await writeFile(join(bundleDir,'GDD.pdf'),strToU8('%PDF-1.4 mock GDD'));
  await writeFile(join(bundleDir,'build.zip'),makeBundle());
  const videoPath=join(tmp,'pitch.mp4');
  await writeFile(videoPath,strToU8('fake mp4 video'));

  const result=await createSubmissionPackage({
   bundleDir,
   videoPath,
   siteUrl:'https://example.invalid/arcade',
   outDir,
   expectedSha:'b'.repeat(40),
   runId:'123456',
   runAttempt:'1'
  });

  expect(result.files).toHaveLength(4);
  expect(await readFile(join(outDir,'LINK_DO_JOGO.txt'),'utf8')).toBe('https://example.invalid/arcade/\n');
  expect(await readFile(join(outDir,'MANIFESTO.sha256'),'utf8')).toContain('  GDD.pdf');
  expect(await readFile(join(outDir,'MANIFESTO.sha256'),'utf8')).toContain('  pitch.mp4');

  const verification=await verifySubmissionPackage(outDir);
  expect(verification.valid).toBe(true);
  expect(verification.assets).toBe(4);

  const manifestJson=JSON.parse(await readFile(join(outDir,'submissao-manifest.json'),'utf8'));
  expect(manifestJson.sourceSha).toBe('b'.repeat(40));
  expect(manifestJson.runId).toBe('123456');
  expect(manifestJson.files['GDD.pdf']).toBeDefined();
 }finally{
  await rm(tmp,{recursive:true,force:true});
 }
});

it('recusa criacao de pacote se video estiver ausente ou vazio',async()=>{
 const tmp=await mkdtemp(join(tmpdir(),'submissao-video-err-'));
 const bundleDir=join(tmp,'bundle');
 try{
  const {mkdir}=await import('node:fs/promises');
  await mkdir(bundleDir,{recursive:true});
  await writeFile(join(bundleDir,'GDD.pdf'),strToU8('%PDF-1.4 mock GDD'));
  await writeFile(join(bundleDir,'build.zip'),makeBundle());
  const emptyVideoPath=join(tmp,'empty.mp4');
  await writeFile(emptyVideoPath,new Uint8Array(0));

  await expect(createSubmissionPackage({
   bundleDir,
   videoPath:emptyVideoPath,
   siteUrl:'https://example.invalid/'
  })).rejects.toThrow(/pitch\.mp4 não pode ser vazio/);

  await expect(createSubmissionPackage({
   bundleDir,
   videoPath:join(tmp,'inexistente.mp4'),
   siteUrl:'https://example.invalid/'
  })).rejects.toThrow(/não encontrado/);
 }finally{
  await rm(tmp,{recursive:true,force:true});
 }
});

it('recusa criacao se GDD ou build.zip forem invalidos',async()=>{
 const tmp=await mkdtemp(join(tmpdir(),'submissao-invalid-bundle-'));
 const bundleDir=join(tmp,'bundle');
 try{
  const {mkdir}=await import('node:fs/promises');
  await mkdir(bundleDir,{recursive:true});
  await writeFile(join(bundleDir,'GDD.pdf'),strToU8('not a pdf'));
  await writeFile(join(bundleDir,'build.zip'),makeBundle());
  const videoPath=join(tmp,'pitch.mp4');
  await writeFile(videoPath,strToU8('video'));

  await expect(createSubmissionPackage({
   bundleDir,
   videoPath,
   siteUrl:'https://example.invalid/'
  })).rejects.toThrow(/GDD\.pdf corrompido ou formato inválido/);

  await writeFile(join(bundleDir,'GDD.pdf'),strToU8('%PDF-1.4 valid header'));
  await writeFile(join(bundleDir,'build.zip'),strToU8('not a zip'));

  await expect(createSubmissionPackage({
   bundleDir,
   videoPath,
   siteUrl:'https://example.invalid/'
  })).rejects.toThrow(/build\.zip corrompido/);
 }finally{
  await rm(tmp,{recursive:true,force:true});
 }
});

it('recusa verificacao se qualquer arquivo do manifesto for adulterado',async()=>{
 const tmp=await mkdtemp(join(tmpdir(),'submissao-tamper-'));
 const bundleDir=join(tmp,'bundle');
 const outDir=join(tmp,'submissao');
 try{
  const {mkdir}=await import('node:fs/promises');
  await mkdir(bundleDir,{recursive:true});
  await writeFile(join(bundleDir,'GDD.pdf'),strToU8('%PDF-1.4 mock GDD'));
  await writeFile(join(bundleDir,'build.zip'),makeBundle());
  const videoPath=join(tmp,'pitch.mp4');
  await writeFile(videoPath,strToU8('video'));

  await createSubmissionPackage({
   bundleDir,
   videoPath,
   siteUrl:'https://example.invalid/',
   outDir
  });

  // Adulterar um arquivo
  await writeFile(join(outDir,'pitch.mp4'),strToU8('tampered video'));
  await expect(verifySubmissionPackage(outDir)).rejects.toThrow(/SHA-256 divergente/);
 }finally{
  await rm(tmp,{recursive:true,force:true});
 }
});
