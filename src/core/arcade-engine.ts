import type {Input,Rule,Value} from './code-types';
export const FUNCTION_NAMES=['controlar','mover','colidir','pontuar','criarOnda'] as const;
export type FunctionName=typeof FUNCTION_NAMES[number];
export type Rules=Record<FunctionName,Rule>;
export interface Item {id:number;x:number;y:number;type:'cristal'|'estrela'|'pedra'}
export interface GameState {status:'playing'|'won'|'lost'|'error';tick:number;x:number;lives:number;score:number;wave:number;items:Item[];nextId:number;error:string;flash:'hit'|'collect'|null}
const valueNumber=(value:Value,name:string)=>{if(typeof value!=='number'||!Number.isFinite(value))throw new Error(`${name} precisa devolver um número finito.`);return value;};
function waveItems(state:GameState,rules:Rules){
 const quantity=Math.min(3+Math.floor(state.wave/2),5),positions=rules.criarOnda({quantidade:quantity});
 if(!Array.isArray(positions)||positions.length!==quantity||positions.some(x=>!Number.isFinite(x)||x<20||x>460)||new Set(positions).size!==positions.length)throw new Error('criarOnda precisa devolver uma posição válida por objeto, sem duplicar.');
 state.wave++;positions.forEach((x,i)=>state.items.push({id:state.nextId++,x,y:-20-i*8,type:(state.wave+i)%4===0?'pedra':(state.wave+i)%3===0?'estrela':'cristal'}));
}
export function createGame(rules:Rules):GameState{
 const state:GameState={status:'playing',tick:0,x:240,lives:3,score:0,wave:0,items:[],nextId:1,error:'',flash:null};
 try{waveItems(state,rules);}catch(e){state.status='error';state.error=e instanceof Error?e.message:'Regra inválida.';}return state;
}
export function stepGame(previous:GameState,input:{left:boolean;right:boolean},rules:Rules):GameState{
 const state=structuredClone(previous);if(state.status!=='playing')return state;state.flash=null;
 try{
  const direction=valueNumber(rules.controlar({esquerda:input.left,direita:input.right}),'controlar');if(![-1,0,1].includes(direction))throw new Error('controlar deve devolver -1, 0 ou 1.');
  const x=valueNumber(rules.mover({posicao:state.x,direcao:direction,velocidade:4}),'mover');state.x=Math.max(20,Math.min(460,x));
  const alive:Item[]=[];for(const item of state.items){item.y+=2.6;const distance=Math.hypot(state.x-item.x,270-item.y);const collides=rules.colidir({distancia:distance,raio:23});if(typeof collides!=='boolean')throw new Error('colidir precisa devolver true ou false.');
   if(collides){if(item.type==='pedra'){state.lives--;state.flash='hit';}else{const score=valueNumber(rules.pontuar({pontos:state.score,tipo:item.type}),'pontuar');if(!Number.isInteger(score)||score<0||score>9999)throw new Error('pontuar precisa devolver pontos inteiros entre 0 e 9999.');state.score=score;state.flash='collect';}}
   else if(item.y<350)alive.push(item);
  }state.items=alive;state.tick++;
  if(state.lives<=0)state.status='lost';else if(state.score>=100)state.status='won';else if(state.tick%150===0)waveItems(state,rules);
 }catch(e){state.status='error';state.error=e instanceof Error?e.message:'Regra inválida.';}return state;
}
export interface CodeCase {label:string;input:Input;expected:Value}
export interface Mission {id:string;title:string;concept:string;goal:string;help:string;functionName:FunctionName|'final';starter:string;reference:string;cases:CodeCase[];reward:number}
export interface CaseResult {label:string;input:Input;expected:Value;actual:Value|null;ok:boolean;error:string}
export function evaluateCases(rule:Rule,cases:CodeCase[]):CaseResult[]{return cases.map(c=>{try{const actual=rule(c.input);return {...c,actual,ok:JSON.stringify(actual)===JSON.stringify(c.expected),error:''};}catch(e){return {...c,actual:null,ok:false,error:e instanceof Error?e.message:'Falha na função.'};}});}
