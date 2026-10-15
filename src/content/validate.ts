import Ajv from 'ajv';
import schema from './schema.json';
import type {Mission} from '../core/arcade-engine';
import {FUNCTION_NAMES,evaluateCases} from '../core/arcade-engine';
import {compileCode} from '../core/code-runtime';
import type {Input,Value} from '../core/code-types';
const check=new Ajv({strict:true,allErrors:true}).compile(schema);
const keys=[['esquerda','direita'],['posicao','direcao','velocidade'],['distancia','raio'],['pontos','tipo'],['quantidade']];
function expected(i:number,v:Input):Value{
 if(i===0){if(typeof v.esquerda!=='boolean'||typeof v.direita!=='boolean')throw Error('Teclas devem ser booleanas.');return v.direita?1:v.esquerda?-1:0;}
 if(i===3){if(typeof v.pontos!=='number'||typeof v.tipo!=='string')throw Error('Pontos/tipo inválidos.');return v.pontos+(v.tipo==='cristal'?10:v.tipo==='estrela'?25:0);}
 if(Object.values(v).some(x=>typeof x!=='number'))throw Error('Entradas numéricas esperadas.');
 if(i===1)return Number(v.posicao)+Number(v.direcao)*Number(v.velocidade);
 if(i===2)return Number(v.distancia)<=Number(v.raio);
 if(!Number.isInteger(v.quantidade)||Number(v.quantidade)<0||Number(v.quantidade)>5)throw Error('Quantidade deve ser 0..5.');
 return Array.from({length:Number(v.quantidade)},(_,n)=>40+n*80);
}
export function validateContent(input:unknown):Mission[]{
 if(!check(input))throw new Error(`JSON inválido: ${check.errors?.map(e=>`${e.instancePath} ${e.message}`).join('; ')}`);
 const missions=(input as {missions:Mission[]}).missions;
 if(new Set(missions.map(m=>m.id)).size!==6)throw Error('IDs duplicados.');
 missions.forEach((m,i)=>{
  if(m.functionName!==[...FUNCTION_NAMES,'final'][i]||m.reward!==(i===5?200:100))throw Error('Ordem/recompensa incoerente.');
  if(i===5){if(m.cases.length||m.starter||m.reference)throw Error('Final usa as cinco funções anteriores.');return;}
  if(m.cases.length<4||new Set(m.cases.map(c=>c.label)).size!==m.cases.length)throw Error('Casos insuficientes ou duplicados.');
  for(const c of m.cases){if(Object.keys(c.input).sort().join()!==[...keys[i]].sort().join())throw Error('Campos de entrada incoerentes.');if(JSON.stringify(c.expected)!==JSON.stringify(expected(i,c.input)))throw Error('Resultado não corresponde à regra real.');}
  if(i===0&&new Set(m.cases.map(c=>`${c.input.esquerda}/${c.input.direita}`)).size!==4)throw Error('Faltam combinações de teclas.');
  if(i===1&&(![-1,0,1].every(d=>m.cases.some(c=>c.input.direcao===d))||new Set(m.cases.map(c=>c.input.velocidade)).size<2))throw Error('Movimento precisa de direção e velocidade variadas.');
  if(i===2&&(!m.cases.some(c=>c.input.distancia===c.input.raio)||!m.cases.some(c=>c.expected===false)||!m.cases.some(c=>c.expected===true)))throw Error('Colisão precisa de limite e ambos os resultados.');
  if(i===3&&(!['cristal','estrela','pedra'].every(t=>m.cases.some(c=>c.input.tipo===t))||!m.cases.some(c=>Number(c.input.pontos)>0)))throw Error('Pontos precisam de estado anterior e tipos variados.');
  if(i===4&&![0,1,3,5].every(n=>m.cases.some(c=>c.input.quantidade===n)))throw Error('Onda precisa incluir zero e quantidades diferentes.');
  if(evaluateCases(compileCode(m.reference,m.functionName),m.cases).some(c=>!c.ok))throw Error(`Referência incompatível: ${m.id}`);
  if(evaluateCases(compileCode(m.starter,m.functionName),m.cases).every(c=>c.ok))throw Error('Starter precisa de um problema a resolver.');
 });return missions;
}
