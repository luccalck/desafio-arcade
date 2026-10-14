import {createHash} from 'node:crypto';
import {readFile,readdir,writeFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {unzipSync} from 'fflate';

export const requiredAssets=['GDD.pdf','LINK_DO_JOGO.txt','build.zip','pitch.mp4'];
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const fail=message=>{throw new Error(message);};

export function parseDeadline(value){
 if(!value||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value))fail('PRAZO deve ser uma data ISO 8601 completa com fuso horário.');
 const day=new Date(`${value.slice(0,10)}T00:00:00Z`);if(!Number.isFinite(day.valueOf())||day.toISOString().slice(0,10)!==value.slice(0,10))fail('PRAZO contém uma data de calendário inválida.');
 const date=new Date(value);if(!Number.isFinite(date.valueOf()))fail('PRAZO não é uma data válida.');return date;
}
export function validateDeadline(value,now=new Date()){
 const deadline=parseDeadline(value);if(now>deadline)fail('Prazo de submissão encerrado.');return true;
}
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
export function checkDuration(seconds){
 const n=Number(seconds);if(!Number.isFinite(n)||n<=0)fail('ffprobe retornou duração inválida.');if(n>90)fail(`Vídeo excede 90 segundos (${n}).`);return true;
}
export function checkZip(bytes){
 let files;try{files=unzipSync(bytes);}catch{fail('build.zip corrompido ou ilegível.');}
 const names=Object.keys(files).map(name=>name.replaceAll('\\','/'));
 if(!names.some(name=>/(^|\/)index\.html$/i.test(name)))fail('build.zip não contém index.html.');
 if(!names.some(name=>/(^|\/)LEIA-ME\.txt$/i.test(name)))fail('build.zip não contém LEIA-ME.txt.');return true;
}
export function verifyManifest(fileBytes,manifestText){
 const entries=new Map();for(const line of manifestText.split(/\r?\n/).filter(Boolean)){const match=/^([a-f0-9]{64})\x20{2}([A-Za-z0-9_.-]+)$/.exec(line);if(!match||entries.has(match[2]))fail('MANIFESTO.sha256 tem linha inválida ou duplicada.');entries.set(match[2],match[1]);}
 const keys=[...entries.keys()].sort(),expected=[...requiredAssets].sort();
 if(keys.length!==expected.length||keys.some((key,index)=>key!==expected[index]))fail('Manifesto deve conter exatamente os quatro arquivos exigidos.');
 for(const name of requiredAssets){const entry=entries.get(name),bytes=fileBytes[name];if(!bytes)fail(`Arquivo ausente: ${name}.`);if(!entry||entry!==digest(bytes))fail(`SHA-256 divergente: ${name}.`);}
 return true;
}
export function makeManifest(fileBytes){
 return requiredAssets.map(name=>{if(!fileBytes[name])fail(`Arquivo ausente: ${name}.`);return `${digest(fileBytes[name])}  ${name}`;}).join('\n')+'\n';
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
 if(mode==='vigilancia'){
  if(env.PRAZO)parseDeadline(env.PRAZO);
 }else{
  validateDeadline(env.PRAZO,now);
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
 return {approved:true,url:publicRoot.href,assets:requiredAssets.length,mode};
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
  console.log('TRIAGEM APROVADA');
 }
 catch(error){console.error(`TRIAGEM REPROVADA: ${error.message}`);process.exitCode=1;}
}
