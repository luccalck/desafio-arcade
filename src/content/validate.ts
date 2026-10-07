import Ajv from 'ajv';
import schema from './schema.json';
import type {Mission,Mode} from '../core/circuit-types';
import {runCircuit} from '../core/circuit-engine';
const check=new Ajv({strict:true,allErrors:true}).compile(schema);
const modes:Mode[]=['connection','transform','filter','boolean','buffer','final'];
export function validateContent(input:unknown):Mission[]{
 if(!check(input))throw new Error(`JSON inválido: ${check.errors?.map(e=>`${e.instancePath} ${e.message}`).join('; ')}`);
 const missions=(input as {missions:Mission[]}).missions;
 if(new Set(missions.map(m=>m.id)).size!==6)throw new Error('IDs de missão duplicados.');
 missions.forEach((m,i)=>{
  if(m.mode!==modes[i]||m.reward!==(i===5?200:100))throw new Error('Ordem/recompensas incoerentes.');
  if(new Set(m.cases.map(c=>c.id)).size!==m.cases.length)throw new Error('IDs de cenário duplicados.');
  if(m.mode==='final'&&m.cases.length!==3)throw new Error('Final exige três lotes.');
  if(JSON.stringify(m.solutions[0])===JSON.stringify(m.solutions[1]))throw new Error('As soluções precisam ser diferentes.');
  if(m.fixed.filter(n=>n.kind==='source').length!==1||m.fixed.some(n=>!['source','sink'].includes(n.kind)))throw new Error('Entradas/destinos fixos incoerentes.');
  for(const c of m.cases){
   if(new Set(c.packets.map(p=>p.id)).size!==c.packets.length)throw new Error('IDs de pacote duplicados.');
   const expected=c.packets.map(p=>{const ok=m.mode==='filter'||m.mode==='buffer'?p.valid:m.mode==='boolean'?(p.credentials&&p.energy)||p.maintenance:m.mode==='final'?p.valid&&p.permission:true;return {id:p.id,sink:ok?'ok':'reject',value:ok&&['transform','final'].includes(m.mode)?p.value+3:p.value};});
   if(JSON.stringify(expected)!==JSON.stringify(c.expected)||c.target!==expected.filter(p=>p.sink==='ok').length)throw new Error('Metas/saídas não correspondem às entradas.');
   for(const l of m.solutions){const s=runCircuit(m,c,l);if(s.status!=='won')throw new Error(`Solução inválida ${m.id}/${c.id}: ${s.message}`);}
  }
 });
 return missions;
}
