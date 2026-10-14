import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {pathToFileURL} from 'node:url';
const HEADER='data,alvo,codigo,tempo,versao';
function target(value){const url=new URL(value);if(!['http:','https:'].includes(url.protocol)||url.username||url.password||url.search||url.hash)throw Error('URL HTTP(S) sem credenciais/query/fragmento exigida.');return new URL(url.href.replace(/\/?$/,'/'));}
async function get(url,timeoutMs){
 const start=performance.now(),response=await fetch(url,{signal:AbortSignal.timeout(timeoutMs),cache:'no-store',redirect:'error'});
 // Inclui consumo do corpo, sob o mesmo timeout; nenhuma latência fictícia.
 const body=await response.text();return {codigo:response.status,tempo:(performance.now()-start)/1000,body};
}
export async function sondar({alvo,url,loader=false,timeoutMs=10000}){
 const base=target(url),r={data:new Date().toISOString(),alvo,url:base.href,codigo:null,tempo:null,versao:'desconhecida',sha:null,versionUrl:null,erro:null};
 try{
  const page=await get(base,timeoutMs);r.codigo=page.codigo;r.tempo=page.tempo;
  if(page.codigo!==200){r.erro='http';return r;}
  let expectedSha=null;
  if(loader){
   const pointer=await get(new URL('rollout.json',base),timeoutMs);
   if(pointer.codigo!==200){r.erro='ponteiro-http';return r;}
   let rollout;try{rollout=JSON.parse(pointer.body);}catch{r.erro='ponteiro-invalido';return r;}
   expectedSha=rollout.activeSha;
   if(!/^[a-f0-9]{40}$/.test(expectedSha||'')){r.erro='ponteiro-invalido';return r;}
  }
  r.versionUrl=new URL(expectedSha?`releases/${expectedSha}/version.json`:'version.json',base).href;
  const response=await get(r.versionUrl,timeoutMs);
  if(response.codigo!==200){r.erro='versao-http';return r;}
  let version;try{version=JSON.parse(response.body);}catch{r.erro='versao-invalida';return r;}
  if(!/^\d+\.\d+\.\d+$/.test(version.version||'')||!/^[a-f0-9]{40}$/.test(version.sha||'')||(expectedSha&&version.sha!==expectedSha)){r.erro='versao-invalida';return r;}
  r.versao=version.version;r.sha=version.sha;
 }catch(error){r.erro=['TimeoutError','AbortError'].includes(error.name)?'timeout':'rede';}
 return r;
}
const cell=v=>{const s=String(v??'desconhecido');return /[",\r\n]/.test(s)?`"${s.replaceAll('"','""')}"`:s;};
export const toCsv=r=>[r.data,r.alvo,r.codigo,r.tempo,r.versao].map(cell).join(',');
export function appendCsv(previous,rows){
 if(previous&&previous.split(/\r?\n/)[0]!==HEADER)throw Error('CSV anterior possui cabeçalho incompatível.');
 return (previous?previous.replace(/\s*$/,'')+'\n':HEADER+'\n')+rows.map(toCsv).join('\n')+'\n';
}
async function main(){
 const [csvPath='reports/sondas.csv',jsonPath='reports/sondas.json']=process.argv.slice(2);
 if(!process.env.SITE_URL)throw Error('Configure SITE_URL real.');
 const base=target(process.env.SITE_URL),rows=[];
 // Sequencial: horário e duração pertencem a cada consulta efetiva.
 rows.push(await sondar({alvo:'hml',url:new URL('hml/',base).href}));
 rows.push(await sondar({alvo:'producao',url:base.href,loader:true}));
 let previous='';try{previous=await readFile(csvPath,'utf8');}catch(error){if(error.code!=='ENOENT')throw error;}
 for(const path of [csvPath,jsonPath])await mkdir(dirname(resolve(path)),{recursive:true});
 await writeFile(csvPath,appendCsv(previous,rows));
 await writeFile(jsonPath,JSON.stringify({schema:1,run:process.env.GITHUB_RUN_ID??null,runAttempt:process.env.GITHUB_RUN_ATTEMPT??null,formalHml:process.env.FORMAL_HML_ENABLED==='true',formalPrd:process.env.FORMAL_PRD_ENABLED==='true',samples:rows},null,2)+'\n');
 console.log(JSON.stringify(rows));
 // Falhas de alvo são dados e precisam persistir; erro de configuração/CSV falha o job.
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await main();
