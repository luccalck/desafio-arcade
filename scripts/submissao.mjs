import {createHash} from 'node:crypto';
import {readFile,writeFile,mkdir,readdir,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {unzipSync} from 'fflate';
import {checkDuration,checkZip,makeManifest,verifyManifest,requiredAssets} from './triagem.mjs';
import {verifyBundle,readBundleTree} from './ci-bundle.mjs';
import {preparePages} from './prepare-pages.mjs';

const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const fail=message=>{throw new Error(message);};
const json=bytes=>JSON.parse(Buffer.from(bytes).toString('utf8'));
function site(value){
 const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash)fail('URL pública HTTPS sem credenciais, query ou fragmento exigida.');
 return u.href.replace(/\/?$/,'/');
}
function identity(sha,run,attempt){
 if(!/^[a-f0-9]{40}$/.test(sha??'')||!/^\d+$/.test(String(run))||!/^[1-9]\d*$/.test(String(attempt)))fail('SHA/run/tentativa de origem obrigatórios.');
}
export function validateVideoProvenance(video,meta,{sha,version,build,zipSha256,siteUrl,expectedVideo}){
 const v=meta?.validation;
 if(!expectedVideo||!/^\d+$/.test(String(expectedVideo.run))||!/^[1-9]\d*$/.test(String(expectedVideo.runAttempt))||!/^[a-f0-9]{40}$/.test(expectedVideo.headSha??'')||!/^[a-f0-9]{64}$/.test(expectedVideo.sha256??''))fail('Fixe run/tentativa/SHA do workflow e SHA-256 do vídeo autorizado.');
 if(meta?.schema!==1||meta.productionSha!==sha||meta.version!==version||meta.build!==build||meta.zipSha256!==zipSha256||meta.siteUrl!==site(siteUrl)||meta.sha256!==digest(video)||meta.sha256!==expectedVideo.sha256||meta.bytes!==video.length)fail('Vídeo diverge da produção/digest/metadados autorizados.');
 if(v?.workflow!=='entrada-video.yml'||v.run!==String(expectedVideo.run)||v.runAttempt!==String(expectedVideo.runAttempt)||v.headSha!==expectedVideo.headSha||v.repository!==expectedVideo.repository)fail('Origem do workflow de vídeo divergente.');
 if(!['run','asset'].includes(meta.origin?.type)||!/^\d+$/.test(String(meta.origin?.id))||meta.rightsConfirmed!==true||meta.captionsConfirmed!==true)fail('Origem/direitos/legendas do vídeo não confirmados por responsável.');
 checkDuration(meta.duration);return meta;
}
export function validateProductionReceipt(receipt,smoke,{sha,run,attempt,zipSha256,siteUrl}){
 if(receipt?.schema!==1||receipt.state!=='publicada'||receipt.sha!==sha||receipt.sourceSha!==sha||receipt.run!==String(run)||receipt.runAttempt!==String(attempt)||receipt.zipSha256!==zipSha256||receipt.approval?.environment!=='producao'||receipt.approval.state!=='approved'||!receipt.approval.reviewer)fail('Recibo de produção aprovada de mesmo SHA/run/tentativa/ZIP exigido.');
 if(smoke?.passed!==true||smoke.mode!=='root'||smoke.url!==site(siteUrl)||smoke.expectedSha!==sha||smoke.version?.sha!==sha||smoke.run!==String(run)||smoke.runAttempt!==String(attempt)||!Array.isArray(smoke.errors)||smoke.errors.length)fail('Smoke de produção correspondente exigido.');
 return true;
}
export async function verifyPublishedBuild(zip,sha,siteUrl,fetchImpl=fetch){
 const root=site(siteUrl),options={cache:'no-store',redirect:'error',signal:AbortSignal.timeout(15000)};
 const pointer=await fetchImpl(new URL('rollout.json',root),options);
 if(!pointer.ok)fail('Ponteiro de produção indisponível.');
 const rollout=await pointer.json();if(rollout.strategy!=='azul-verde'||rollout.estavel!==sha||rollout.retiradas?.includes(sha))fail('Produção não estável no SHA esperado.');
 for(const [name,bytes] of Object.entries(unzipSync(zip))){
  const response=await fetchImpl(new URL(`releases/${sha}/${name}`,root),options);
  if(!response.ok||digest(new Uint8Array(await response.arrayBuffer()))!==digest(bytes))fail(`Bytes de produção divergem do ZIP homologado: ${name}.`);
 }
}
export async function createSubmissionPackage({bundleDir,videoPath,siteUrl,outDir='submissao',expectedSha=process.env.EXPECTED_SHA,runId=process.env.GITHUB_RUN_ID,runAttempt=process.env.GITHUB_RUN_ATTEMPT??'1',videoProvenancePath=process.env.VIDEO_PROVENANCE_PATH,productionDir=process.env.PRODUCTION_RECEIPT_DIR,expectedVideo={run:process.env.VIDEO_VALIDATION_RUN,runAttempt:process.env.VIDEO_VALIDATION_ATTEMPT,headSha:process.env.VIDEO_VALIDATION_SHA,sha256:process.env.VIDEO_SHA256,repository:process.env.GITHUB_REPOSITORY},fetchImpl=fetch}){
 if(!bundleDir)fail('Diretório de bundle/origem é obrigatório.');
 if(!videoPath)fail('Vídeo pitch.mp4 é entrada obrigatória (não simular).');
 const stats=await stat(videoPath).catch(()=>fail(`Arquivo de vídeo não encontrado: ${videoPath}`));
 if(!stats.isFile()||stats.size===0)fail('pitch.mp4 não pode ser vazio ou inexistente.');
 identity(expectedSha,runId,runAttempt);
 const root=site(siteUrl),bundle=await readBundleTree(bundleDir),source=verifyBundle(bundle,{sha:expectedSha,run:runId,runAttempt});
 const video=new Uint8Array(await readFile(videoPath)),zipSha256=digest(bundle['build.zip']);
 if(!videoProvenancePath||!productionDir)fail('Proveniência do vídeo e recibo de produção são obrigatórios.');
 const provenance=json(await readFile(videoProvenancePath));
 validateVideoProvenance(video,provenance,{sha:expectedSha,version:source.version,build:source.build,zipSha256,siteUrl:root,expectedVideo});
 const receipt=json(await readFile(join(productionDir,'producao.json'))),smoke=json(await readFile(join(productionDir,'producao-smoke.json')));
 validateProductionReceipt(receipt,smoke,{sha:expectedSha,run:runId,attempt:runAttempt,zipSha256,siteUrl:root});
 await verifyPublishedBuild(bundle['build.zip'],expectedSha,root,fetchImpl);
 const files={'GDD.pdf':bundle['GDD.pdf'],'LINK_DO_JOGO.txt':Buffer.from(root+'\n'),'build.zip':bundle['build.zip'],'pitch.mp4':video};
 const manifest=makeManifest(files);verifyManifest(files,manifest);
 await mkdir(outDir,{recursive:true});if((await readdir(outDir)).length)fail('Destino de submissão deve estar vazio; não sobrescrever pacote imutável.');
 const metadata={schema:2,sourceSha:expectedSha,runId:String(runId),runAttempt:String(runAttempt),version:source.version,build:source.build,zipSha256,siteUrl:root,createdAt:new Date().toISOString(),ciManifestSha256:digest(bundle['ci-manifest.json']),video:provenance,production:receipt,smoke,files:Object.fromEntries(requiredAssets.map(name=>[name,{sha256:digest(files[name]),bytes:files[name].length}]))};
 for(const [name,bytes] of Object.entries(files))await writeFile(join(outDir,name),bytes);
 await writeFile(join(outDir,'MANIFESTO.sha256'),manifest);
 await writeFile(join(outDir,'submissao-manifest.json'),JSON.stringify(metadata,null,2)+'\n');
 return {outDir,files:requiredAssets,manifest,metadata};
}
export async function verifySubmissionPackage(directory,{expectedSha,runId,runAttempt}={}){
 const files={};for(const name of requiredAssets)files[name]=new Uint8Array(await readFile(join(directory,name)));
 checkZip(files['build.zip']);verifyManifest(files,await readFile(join(directory,'MANIFESTO.sha256'),'utf8'));
 const m=json(await readFile(join(directory,'submissao-manifest.json')));
 identity(m.sourceSha,m.runId,m.runAttempt);
 if(m.schema!==2||(expectedSha!==undefined&&m.sourceSha!==expectedSha)||(runId!==undefined&&m.runId!==String(runId))||(runAttempt!==undefined&&m.runAttempt!==String(runAttempt)))fail('Metadados de submissão divergem da origem fixada.');
 preparePages({zip:files['build.zip'],checksum:m.zipSha256,sha:m.sourceSha});
 const expanded=unzipSync(files['build.zip']),version=json(expanded['version.json']);
 if(version.sha!==m.sourceSha||version.version!==m.version||version.build!==m.build||digest(files['build.zip'])!==m.zipSha256)fail('SHA/versão/data/ZIP da submissão divergentes.');
 for(const name of requiredAssets)if(m.files?.[name]?.sha256!==digest(files[name])||m.files[name].bytes!==files[name].length)fail(`Metadados de integridade divergentes: ${name}.`);
 if(Buffer.from(files['LINK_DO_JOGO.txt']).toString().trim()!==site(m.siteUrl))fail('URL da submissão divergente.');
 validateVideoProvenance(files['pitch.mp4'],m.video,{sha:m.sourceSha,version:m.version,build:m.build,zipSha256:m.zipSha256,siteUrl:m.siteUrl,expectedVideo:{...m.video.validation,sha256:m.video.sha256}});
 validateProductionReceipt(m.production,m.smoke,{sha:m.sourceSha,run:m.runId,attempt:m.runAttempt,zipSha256:m.zipSha256,siteUrl:m.siteUrl});
 return {valid:true,assets:requiredAssets.length,metadata:m};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const [command,arg1,arg2,arg3,arg4]=process.argv.slice(2);
  if(command==='create'){
   const result=await createSubmissionPackage({bundleDir:arg1,videoPath:arg2,siteUrl:arg3,outDir:arg4??'submissao'});
   console.log(JSON.stringify({created:true,outDir:result.outDir,assets:result.files.length}));
  }else if(command==='verify')console.log(JSON.stringify(await verifySubmissionPackage(arg1??'submissao',{expectedSha:process.env.EXPECTED_SHA,runId:process.env.SUBMISSION_RUN_ID,runAttempt:process.env.SUBMISSION_RUN_ATTEMPT})));
  else fail('Uso: node scripts/submissao.mjs <create|verify> [opções]');
 }catch(error){console.error(`ERRO SUBMISSAO: ${error.message}`);process.exitCode=1;}
}
