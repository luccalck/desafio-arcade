import Ajv from 'ajv';
import schema from './schema.json';
import type {Mission,Mode} from '../core/lab-types';
import {runLab,validateProgram} from '../core/lab-engine';
const check=new Ajv({allErrors:true,strict:true}).compile(schema);
const modes:Mode[]=['sequence','variables','conditions','boolean','loop','final'];
export function validateContent(input:unknown):Mission[]{
 if(!check(input))throw new Error(`JSON inválido: ${check.errors?.map(e=>`${e.instancePath} ${e.message}`).join('; ')}`);
 const missions=(input as {missions:Mission[]}).missions;
 if(new Set(missions.map(m=>m.id)).size!==6)throw new Error('IDs de missão duplicados.');
 missions.forEach((m,i)=>{
  if(m.mode!==modes[i]||m.reward!==(i===5?200:100))throw new Error('Ordem/recompensas da campanha incoerentes.');
  if(new Set(m.scenarios.map(s=>s.id)).size!==m.scenarios.length)throw new Error('IDs de cenário duplicados.');
  if(m.mode==='final'&&m.scenarios.length!==3)throw new Error('Final precisa de três cenários.');
  if(m.hasLoop!==['loop','final'].includes(m.mode))throw new Error('Repetição incoerente com a missão.');
  if(m.initialPractice.length)validateProgram(m,m.initialPractice);
  for(const s of [...m.scenarios,...m.practice,m.demo.scenario]){
   if(new Set(s.packets.map(p=>p.id)).size!==s.packets.length)throw new Error('IDs de pacote duplicados.');
   if(m.mode==='conditions'&&s.packets.length!==1)throw new Error('Condições usam um pacote por cenário.');
   if(m.hasLoop&&!s.packets.length)throw new Error('Lote precisa de pelo menos um pacote.');
   const expected=s.packets.filter(p=>p.valid&&(m.mode!=='final'||p.permission)).length;
   if(s.targetCount!==expected)throw new Error('Meta/contador não corresponde aos dados do cenário.');
   if(m.mode==='variables'&&s.targetEnergy!==s.energy+s.charge-2*s.cost)throw new Error('Valores de energia incoerentes.');
   if(runLab(m,s,m.solution).status!=='won')throw new Error(`Solução inválida de ${m.id} no cenário ${s.id}.`);
  }
  if(runLab(m,m.demo.scenario,m.demo.program).status!=='won')throw new Error('Exemplo não resolve seu cenário.');
 });
 return missions;
}
