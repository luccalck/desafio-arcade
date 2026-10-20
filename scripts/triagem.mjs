import {readFile,readdir,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {requiredAssets,checkDuration,checkZip,makeManifest,verifyManifest} from './pacote-validacao.mjs';
export {requiredAssets,checkDuration,checkZip,makeManifest,verifyManifest};
import {parseDeadline,evaluateDeliveryDeadline} from './prazo-triagem.mjs';
export {parseDeadline,validateDeadline} from './prazo-triagem.mjs';

const fail=message=>{throw new Error(message);};

export function parseSquad(markdown){
 const rows=markdown.split(/\r?\n/).filter(line=>/^\|/.test(line)).map(line=>line.trim().replace(/^\||\|$/g,'').split('|').map(cell=>cell.trim()));
 const data=rows.slice(2).filter(row=>row.length>=4&&row.slice(0,4).some(Boolean));
 if(data.length!==4)fail(`SQUAD deve conter exatamente quatro integrantes; encontrados ${data.length}.`);
 for(const [index,[name,ra,role,account]] of data.entries()){
  if(!name||!ra||!role||!account)fail(`SQUAD: integrante ${index+1} tem campo obrigatório vazio.`);
  if(!/^\d{6,12}$/.test(ra))fail(`SQUAD: RA do integrante ${index+1} deve conter somente dígitos.`);
  if(!/^[A-Za-z0-9-]+$/.test(account))fail(`SQUAD: conta GitHub inválida para integrante ${index+1}.`);
 }
 for(const [label,column] of [['nome',0],['RA',1],['conta GitHub',3]])if(new Set(data.map(row=>row[column].toLocaleLowerCase('pt-BR'))).size!==data.length)fail(`SQUAD contém ${label} duplicado.`);
 return data;
}
export function checkGddSections(text){
 const headings=[...text.matchAll(/^\s*(?:\d+[.)]\s*)?(Premissa e problema endereçado|High concept|Gênero e plataforma|Mecânicas-core)\s*$/gim)].map(m=>m[1].toLocaleLowerCase('pt-BR'));
 const expected=['premissa e problema endereçado','high concept','gênero e plataforma','mecânicas-core'];
 if(expected.some(section=>!headings.includes(section)))fail('GDD não contém as quatro seções obrigatórias.');return true;
}
export async function run(command,args,options={}){
 return await new Promise((resolve,reject)=>{const child=spawn(command,args,{stdio:['ignore','pipe','pipe'],...options});let stdout='',stderr='';child.stdout.on('data',b=>stdout+=b);child.stderr.on('data',b=>stderr+=b);child.on('error',reject);child.on('close',code=>code===0?resolve(stdout.trim()):reject(new Error(`${command} falhou (${code}): ${stderr.trim()}`)));});
}
export async function notifyAlert({kind='TriagemIndisponivel',url,reason,repo=process.env.GITHUB_REPOSITORY,token=process.env.GH_TOKEN}={}){
 if(!repo||!token)return null;
 const base=`https://api.github.com/repos/${repo}`;
 const marker=`<!-- arcade-alert:v1:${kind}:producao -->`;
 try{
  const search=await fetch(`${base}/issues?state=open&labels=alerta`,{
   headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json'}
  });
  if(search.ok){
   const issues=await search.json();
   if(issues.some(i=>i.body?.includes(marker)))return {action:'already-open'};
  }
  const res=await fetch(`${base}/issues`,{
   method:'POST',
   headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','Content-Type':'application/json'},
   body:JSON.stringify({
    title:`${kind}: producao`,
    labels:['alerta'],
    body:`${marker}\n\nAlerta de triagem agendada.\n\nAlvo: ${url}\nMotivo: ${reason}\nData: ${new Date().toISOString()}\n\nOrigem: GitHub Actions Triagem Agendada.`
   })
  });
  if(res.ok){
   const created=await res.json();
   return {action:'opened',issue:created.html_url};
  }
 }catch(err){
  console.error(`Falha ao notificar alerta GitHub: ${err.message}`);
 }
 return null;
}

export async function validateSubmission({directory,env=process.env,now=new Date(),fetchImpl=fetch,runCommand=run,squadText,generateManifest=false,mode='entrega',alertApi=null,alertOnFailure=false,verifyPackage=async(directory,options)=>(await import('./submissao.mjs')).verifySubmissionPackage(directory,options)}){
 let deliveryWindow;
 if(mode==='vigilancia'){
  const deadline=env.PRAZO?parseDeadline(env.PRAZO):null;
  deliveryWindow={deadline:env.PRAZO??null,checkedAt:now.toISOString(),withinDeadline:deadline?now<=deadline:null,exceptionApplied:false,status:'not-enforced-monitoring'};
 }else{
  deliveryWindow=evaluateDeliveryDeadline(env,now);
 }
 parseSquad(squadText??await readFile('SQUAD.md','utf8'));
 const names=await readdir(directory);for(const name of requiredAssets)if(!names.includes(name))fail(`Arquivo ausente: ${name}.`);
 const files={};for(const name of requiredAssets)files[name]=new Uint8Array(await readFile(join(directory,name)));
 checkZip(files['build.zip']);
 await runCommand('pdfinfo',[join(directory,'GDD.pdf')]);
 const gddText=await runCommand('pdftotext',[join(directory,'GDD.pdf'),'-']);checkGddSections(gddText);
 const seconds=await runCommand('ffprobe',['-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',join(directory,'pitch.mp4')]);checkDuration(seconds);
 const url=(await readFile(join(directory,'LINK_DO_JOGO.txt'),'utf8')).trim();const publicRoot=new URL(url);
 if(!['http:','https:'].includes(publicRoot.protocol)||publicRoot.username||publicRoot.password||publicRoot.search||publicRoot.hash)fail('URL pública deve ser HTTP(S) sem credenciais, query ou fragmento.');
 publicRoot.pathname=publicRoot.pathname.replace(/\/?$/,'/');

 let response;
 try{
  response=await fetchImpl(publicRoot.href);
 }catch(err){
  if(alertApi)await alertApi.notify?.('JogoForaDoAr',publicRoot.href,err.message);
  else if(alertOnFailure)await notifyAlert({kind:'JogoForaDoAr',url:publicRoot.href,reason:err.message});
  fail(`URL pública inacessível: ${err.message}`);
 }

 if(response.status!==200){
  if(alertApi)await alertApi.notify?.('JogoForaDoAr',publicRoot.href,`HTTP ${response.status}`);
  else if(alertOnFailure)await notifyAlert({kind:'JogoForaDoAr',url:publicRoot.href,reason:`HTTP ${response.status}`});
  fail(`URL pública respondeu HTTP ${response.status}.`);
 }

 const expectedSha=env.EXPECTED_SHA;if(!/^[a-f0-9]{40}$/.test(expectedSha||''))fail('EXPECTED_SHA deve ser o SHA real da candidata (40 hexadecimais).');
 try{
  await runCommand('npx',['playwright','test','--config','playwright.public.config.mjs','--project=prd-smoke'],{env:{...process.env,PAGES_URL:publicRoot.href,BASE_URL:new URL('hml/',publicRoot).href,EXPECTED_SHA:expectedSha}});
 }catch(err){
  if(alertApi)await alertApi.notify?.('SmokeFalhou',publicRoot.href,err.message);
  else if(alertOnFailure)await notifyAlert({kind:'SmokeFalhou',url:publicRoot.href,reason:err.message});
  throw err;
 }

 const manifestPath=join(directory,'MANIFESTO.sha256');
 if(generateManifest)await writeFile(manifestPath,makeManifest(files),{flag:'wx'});
 const manifest=await readFile(manifestPath,'utf8');verifyManifest(files,manifest);
 await verifyPackage(directory,{expectedSha,runId:env.SUBMISSION_RUN_ID??env.GITHUB_RUN_ID,runAttempt:env.SUBMISSION_RUN_ATTEMPT??env.GITHUB_RUN_ATTEMPT});
 return {approved:true,url:publicRoot.href,assets:requiredAssets.length,mode,formalDeliveryApproved:mode==='entrega',deliveryWindow};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 try{
  const args=process.argv.slice(2);
  const generateManifest=args.includes('--gerar-manifesto');
  const vigilancia=args.includes('--vigilancia')||args.some(a=>a.startsWith('--modo=vigilancia'));
  const alertar=args.includes('--alertar');
  const directory=args.find(arg=>!arg.startsWith('--'));
  if(!directory)fail('Uso: node scripts/triagem.mjs <diretório-submissão> [--gerar-manifesto] [--vigilancia] [--alertar]');
  const result=await validateSubmission({
   directory,
   generateManifest,
   mode:vigilancia?'vigilancia':'entrega',
   alertOnFailure:alertar
  });
  console.log(JSON.stringify(result));
  console.log(vigilancia?'VIGILÂNCIA TÉCNICA APROVADA':'TRIAGEM APROVADA');
 }
 catch(error){console.error(`TRIAGEM REPROVADA: ${error.message}`);process.exitCode=1;}
}
