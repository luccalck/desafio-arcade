import {createHash} from 'node:crypto';
import {readFile,writeFile,mkdir,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {checkZip,makeManifest,verifyManifest,requiredAssets} from './triagem.mjs';

const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const fail=message=>{throw new Error(message);};

export async function createSubmissionPackage({
 bundleDir,
 videoPath,
 siteUrl,
 outDir='submissao',
 expectedSha=process.env.EXPECTED_SHA,
 runId=process.env.GITHUB_RUN_ID,
 runAttempt=process.env.GITHUB_RUN_ATTEMPT??'1'
}){
 if(!bundleDir)fail('Diretório de bundle/origem é obrigatório.');
 if(!videoPath)fail('Vídeo pitch.mp4 é entrada obrigatória (não simular).');
 if(!siteUrl)fail('siteUrl pública é obrigatória.');

 const publicUrl=new URL(siteUrl);
 if(!['http:','https:'].includes(publicUrl.protocol))fail('URL pública deve ser HTTP ou HTTPS.');

 const videoStats=await stat(videoPath).catch(()=>fail(`Arquivo de vídeo não encontrado: ${videoPath}`));
 if(!videoStats.isFile()||videoStats.size===0)fail('pitch.mp4 não pode ser vazio ou inexistente.');
 const videoBytes=new Uint8Array(await readFile(videoPath));

 // Localizar GDD.pdf no bundleDir ou bundleDir/artifacts
 let gddBytes;
 try{
  gddBytes=new Uint8Array(await readFile(join(bundleDir,'GDD.pdf')));
 }catch{
  try{
   gddBytes=new Uint8Array(await readFile(join(bundleDir,'artifacts','GDD.pdf')));
  }catch{
   fail('GDD.pdf não encontrado no pacote de entrada.');
  }
 }
 if(!Buffer.from(gddBytes).subarray(0,5).equals(Buffer.from('%PDF-')))fail('GDD.pdf corrompido ou formato inválido.');

 // Localizar build.zip no bundleDir ou bundleDir/artifacts
 let zipBytes;
 try{
  zipBytes=new Uint8Array(await readFile(join(bundleDir,'build.zip')));
 }catch{
  try{
   zipBytes=new Uint8Array(await readFile(join(bundleDir,'artifacts','build.zip')));
  }catch{
   fail('build.zip não encontrado no pacote de entrada.');
  }
 }
 checkZip(zipBytes);

 const linkContent=publicUrl.href.replace(/\/?$/,'/')+'\n';
 const linkBytes=new TextEncoder().encode(linkContent);

 const files={
  'GDD.pdf':gddBytes,
  'LINK_DO_JOGO.txt':linkBytes,
  'build.zip':zipBytes,
  'pitch.mp4':videoBytes
 };

 const manifest=makeManifest(files);
 verifyManifest(files,manifest);

 await mkdir(outDir,{recursive:true});
 await writeFile(join(outDir,'GDD.pdf'),gddBytes);
 await writeFile(join(outDir,'LINK_DO_JOGO.txt'),linkContent);
 await writeFile(join(outDir,'build.zip'),zipBytes);
 await writeFile(join(outDir,'pitch.mp4'),videoBytes);
 await writeFile(join(outDir,'MANIFESTO.sha256'),manifest);

 const metadata={
  schema:1,
  sourceSha:expectedSha||null,
  runId:runId||null,
  runAttempt:String(runAttempt),
  siteUrl:publicUrl.href,
  createdAt:new Date().toISOString(),
  files:Object.fromEntries(
   requiredAssets.map(name=>[name,{sha256:digest(files[name]),bytes:files[name].length}])
  )
 };
 await writeFile(join(outDir,'submissao-manifest.json'),JSON.stringify(metadata,null,2)+'\n');

 return {outDir,files:requiredAssets,manifest,metadata};
}

export async function verifySubmissionPackage(submissaoDir){
 const files={};
 for(const name of requiredAssets){
  files[name]=new Uint8Array(await readFile(join(submissaoDir,name)));
 }
 checkZip(files['build.zip']);
 const manifest=await readFile(join(submissaoDir,'MANIFESTO.sha256'),'utf8');
 verifyManifest(files,manifest);
 return {valid:true,assets:requiredAssets.length};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const [command,arg1,arg2,arg3,arg4]=process.argv.slice(2);
  if(command==='create'){
   const [bundleDir,videoPath,siteUrl,outDir='submissao']=[arg1,arg2,arg3,arg4];
   if(!bundleDir||!videoPath||!siteUrl)fail('Uso: node scripts/submissao.mjs create <origem-bundle> <video-path> <site-url> [out-dir]');
   const result=await createSubmissionPackage({bundleDir,videoPath,siteUrl,outDir});
   console.log(JSON.stringify({created:true,outDir:result.outDir,assets:result.files.length}));
  }else if(command==='verify'){
   const submissaoDir=arg1||'submissao';
   const result=await verifySubmissionPackage(submissaoDir);
   console.log(JSON.stringify(result));
  }else{
   fail('Uso: node scripts/submissao.mjs <create|verify> [opções]');
  }
 }catch(error){
  console.error(`ERRO SUBMISSAO: ${error.message}`);
  process.exitCode=1;
 }
}
