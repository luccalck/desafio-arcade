import {normalizeRollout} from './rollout-contract.mjs';
const KEY='rota-do-codigo:preview:selected';
export async function openRelease({fetcher=globalThis.fetch,storage,navigate=path=>globalThis.location.replace(path)}={}){
 const get=async path=>{const r=await fetcher(path,{cache:'no-store',redirect:'error',signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error('Recurso indisponível.');return r;};
 // Sem ponteiro fresco não há como verificar retirada. Não usar fallback gravado no HTML.
 const rollout=normalizeRollout(await (await get('./rollout.json')).json());
 let saved=null;try{storage??=globalThis.sessionStorage;saved=storage?.getItem(KEY);}catch{/* Navegador com storage bloqueado. */}
 const allowed=[rollout.estavel,rollout.anterior].filter(Boolean);
 const choices=[...new Set([...(allowed.includes(saved)?[saved]:[]),...allowed])];
 for(const sha of choices){
  try{
   const base=`./releases/${sha}/`,v=await (await get(base+'version.json')).json();
   if(v.sha!==sha||!/^\d+\.\d+\.\d+$/.test(v.version||''))continue;
   await get(base+'index.html');
   try{storage?.setItem(KEY,sha);}catch{/* Sessão sem persistência usa estável. */}
   navigate(base+'index.html');return sha;
  }catch{/* Tentar somente outra referência autorizada pelo ponteiro atual. */}
 }
 throw Error('Nenhuma release válida disponível. Atualize a página para tentar novamente.');
}
