import {normalizeRollout,validSha} from '../rollout-contract.mjs';
const DAY=86400000,STALE=1800000,SEMVER=/^\d+\.\d+\.\d+$/;
const metrics=[['deploymentFrequency','Frequência de implantação','deploys/dia'],['leadTime','Lead time de mudanças','horas'],['changeFailureRate','Taxa de falha em mudanças','%'],['mttr','Tempo de recuperação','minutos']];
const date=value=>typeof value==='string'&&/^\d{4}-\d\d-\d\dT/.test(value)?Date.parse(value):NaN;
export function parseCsv(text,now=Date.now()){
 if(typeof text!=='string'||text.length>2*1024*1024)throw Error('CSV ausente ou excede limite de 2 MiB.');
 const records=[];let row=[],field='',quoted=false,closed=false;
 const endField=()=>{row.push(field);field='';closed=false;};
 const endRow=()=>{endField();if(row.some(Boolean))records.push(row);row=[];};
 for(let i=0;i<text.length;i++){
  const c=text[i];if(quoted){if(c==='"'){if(text[i+1]==='"'){field+='"';i++;}else{quoted=false;closed=true;}}else field+=c;continue;}
  if(c==='"'){if(field||closed)throw Error('Aspas CSV inválidas.');quoted=true;}
  else if(c===',')endField();else if(c==='\n')endRow();else if(c==='\r'&&text[i+1]==='\n')continue;
  else{if(closed)throw Error('CSV malformado após aspas.');field+=c;}
 }
 if(quoted)throw Error('CSV com aspas abertas.');if(field||row.length||closed)endRow();
 if(records.shift()?.join(',')!=='data,alvo,codigo,tempo,versao')throw Error('Cabeçalho CSV incompatível.');
 const seen=new Map(),result=[];
 for(const r of records){
  if(r.length!==5)throw Error('Linha CSV incompleta.');
  const [data,alvo,code,time,versao]=r,at=date(data),codigo=['','desconhecido'].includes(code)?null:Number(code),tempo=['','desconhecido'].includes(time)?null:Number(time);
  if(!Number.isFinite(at)||at>now+60000||!['hml','producao'].includes(alvo)||(codigo!==null&&(!Number.isInteger(codigo)||codigo<100||codigo>599))||(tempo!==null&&(!Number.isFinite(tempo)||tempo<0))||!(SEMVER.test(versao)||['','desconhecida','desconhecido'].includes(versao)))throw Error('Amostra CSV inválida.');
  const key=data+':'+alvo,serialized=JSON.stringify(r);if(seen.has(key)){if(seen.get(key)!==serialized)throw Error('Amostra duplicada contraditória.');continue;}seen.set(key,serialized);result.push({data,at,alvo,codigo,tempo,versao});
 }
 return result;
}
export function summarize({csv,latest=null,rollout=null,now=Date.now()}){
 const rows=parseCsv(csv,now).filter(r=>r.alvo==='producao'&&r.at>=now-DAY).sort((a,b)=>a.at-b.at),last=rows.at(-1),known=rows.filter(r=>r.codigo!==null),times=rows.filter(r=>r.tempo!==null),stale=!last||now-last.at>STALE;
 const result={period:{from:new Date(now-DAY).toISOString(),to:new Date(now).toISOString()},availability:known.length?known.filter(r=>r.codigo===200).length/known.length*100:null,latency:times.length?times.reduce((s,r)=>s+r.tempo,0)/times.length:null,count:rows.length,known:known.length,unknown:rows.length-known.length,lastSample:last?.data??null,stale,version:null,sha:null,strategy:'Indisponível',errors:[],dora:readDora(null,now)};
 if(stale)result.errors.push(last?'Coleta atrasada há mais de30 min; indicadores históricos, estado atual desconhecido.':'Sem amostras de produção nas últimas24 h.');
 try{
  const p=normalizeRollout(rollout);result.strategy=Object.hasOwn(rollout,'estavel')?`Azul-verde; candidata ${p.canario?'preparada':'ausente'}; ${p.percentual}% de novas sessões na candidata`:'Prévia; produção formal não confirmada';
  const sample=latest?.samples?.find(s=>s.alvo==='producao');
  if(!stale&&latest?.schema===1&&latest.formalPrd===true&&Object.hasOwn(rollout,'estavel')&&sample?.data===last?.data&&last.codigo===200&&sample.codigo===200&&sample.tempo===last.tempo&&sample.erro===null&&sample.sha===p.estavel&&validSha(sample.sha)&&SEMVER.test(sample.versao)&&sample.versao===last.versao){result.version=sample.versao;result.sha=sample.sha;}
  else result.errors.push('Versão atual sem coleta formal fresca/coerente com rollout e CSV.');
 }catch{result.errors.push('Rollout público inválido ou indisponível.');}
 return result;
}
export function readDora(input,now=Date.now()){
 const valid=input?.schema===1&&Number.isFinite(date(input.generatedAt))&&date(input.generatedAt)<=now+60000&&now-date(input.generatedAt)<=DAY&&date(input.period?.from)<date(input.period?.to)&&date(input.period?.to)<=now+60000&&date(input.period?.to)>=now-DAY;
 return metrics.map(([key,label,unit])=>{
  const m=input?.metrics?.[key],source=typeof m?.source==='string'?m.source:'';
  const sourceValid=/^https:\/\/(github\.com|api\.github\.com|raw\.githubusercontent\.com)\//.test(source);
  const ok=valid&&typeof m?.value==='number'&&Number.isFinite(m.value)&&m.value>=0&&(key!=='changeFailureRate'||m.value<=100)&&m.unit===unit&&Number.isInteger(m.samples)&&m.samples>0&&sourceValid;
  return {key,label,unit,value:ok?m.value:null,samples:ok?m.samples:null,source:ok?source:null,period:valid?input.period:null,reason:ok?null:typeof m?.reason==='string'?m.reason.slice(0,512):'Dados rastreáveis indisponíveis; integração da etapa 024 pendente.'};
 });
}
export async function loadStatus({repository,fetcher=globalThis.fetch,rolloutUrl,now=Date.now()}){
 if(!/^[-\w.]+\/[-\w.]+$/.test(repository??''))throw Error('Repositório inválido.');
 const get=async(url,json=false)=>{const r=await fetcher(url,{cache:'no-store',redirect:'error',signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error(`HTTP${r.status??'desconhecido'}: ${url}`);return json?r.json():r.text();};
 const empty=()=>summarize({csv:'data,alvo,codigo,tempo,versao\n',now});
 let commit;try{const ref=await get(`https://api.github.com/repos/${repository}/git/ref/heads/observabilidade`,true);commit=ref.object?.sha;if(!validSha(commit))throw Error('Referência de dados inválida.');}catch(error){return {...empty(),errors:[...empty().errors,`Fonte observabilidade indisponível: ${error.message}`],dataCommit:null};}
 const source=`https://raw.githubusercontent.com/${repository}/${commit}/status/`,paths=[source+'sondas.csv',source+'ultima.json',rolloutUrl,source+'dora.json'];
 const values=await Promise.allSettled(paths.map((p,i)=>get(p,i!==0))),errors=values.filter(v=>v.status==='rejected').map(v=>v.reason.message);
 const value=i=>values[i].status==='fulfilled'?values[i].value:null;
 let result;try{result=summarize({csv:value(0),latest:value(1),rollout:value(2),now});}catch(error){result=empty();errors.push(error.message);}
 result.errors.push(...errors);result.dora=readDora(value(3),now);result.dataCommit=commit;result.source=source;return result;
}
export function renderStatus(root,data){
 const set=(id,value)=>{root.querySelector('#'+id).textContent=value;};
 set('state',data.stale?'Estado atual desconhecido — dados ausentes ou atrasados.':'Dados de amostragem consultados; conferir limitações abaixo.');
 set('period',`Janela: ${data.period.from} até ${data.period.to} (UTC).`);
 set('availability',data.availability===null?'Indisponível':`${data.availability.toFixed(1)}%`);set('samples',`${data.count} amostras; ${data.known} códigos conhecidos; ${data.unknown} sem código.`);
 set('latency',data.latency===null?'Indisponível':data.latency<0.001?'<1ms':`${(data.latency*1000).toFixed(0)}ms`);
 set('version',data.version??'Indisponível');set('version-detail',data.sha?`SHA ${data.sha}`:'Sem coleta formal fresca/coerente com rollout.');set('rollout',data.strategy);
 set('updated',`Última amostra: ${data.lastSample??'desconhecida'} (UTC). Atraso máximo esperado:30 min.`);
 const list=root.querySelector('#errors');list.replaceChildren();for(const error of data.errors){const li=document.createElement('li');li.textContent=error;list.append(li);}
 const sources=root.querySelector('#source');sources.replaceChildren();if(data.source){const a=document.createElement('a');a.href=data.source+'sondas.csv';a.textContent=`CSV público · commit ${data.dataCommit}`;sources.append(a);}else sources.textContent='Fonte pública indisponível; nenhum número foi presumido.';
 const cards=root.querySelector('#dora');cards.replaceChildren();for(const m of data.dora){const card=document.createElement('dl');card.className='card';const dt=document.createElement('dt'),dd=document.createElement('dd'),p=document.createElement('dd');dd.className='metric-value';dt.textContent=m.label;dd.textContent=m.value===null?'Indisponível':`${m.value} ${m.unit}`;p.className='note';p.textContent=m.reason??`${m.samples} observações · ${m.period.from} até ${m.period.to} (UTC)`;card.append(dt,dd,p);if(m.source){const a=document.createElement('a');a.href=m.source;a.textContent='Evidência da métrica';p.append(document.createElement('br'),a);}cards.append(card);}
}
if(typeof document!=='undefined'&&document.documentElement.dataset.status==='arcade'){
 const button=document.getElementById('refresh'),run=async()=>{button.disabled=true;try{const data=await loadStatus({repository:document.getElementById('main').dataset.repository,rolloutUrl:new URL('../rollout.json',location.href).href});renderStatus(document,data);}catch{document.getElementById('state').textContent='Falha ao consultar os dados; tente novamente.';}finally{button.disabled=false;}};
 button.addEventListener('click',run);void run();
}
