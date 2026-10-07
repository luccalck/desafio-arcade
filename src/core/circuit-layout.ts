import type {Config,Layout,Mission,Node} from './circuit-types';
export const ports=(node:Node):string[]=>node.kind==='sink'?[]:node.kind==='filter'?['yes','no']:['out'];
export function defaultConfig(m:Mission,kind:Node['kind']):Config{return kind==='add'?{value:1}:kind==='multiply'?{value:2}:kind==='filter'?{a:m.predicates[0],b:m.predicates[1]??m.predicates[0],op:'single',c:m.predicates[2]??m.predicates[0],outer:'or',third:false,invert:false}:{};}
export function cablePath(m:Mission,a:Node,b:Node):{x:number;y:number}[]|null{
 if(Math.abs(a.x-b.x)+Math.abs(a.y-b.y)>m.maxSpan)return null;
 for(const horizontal of [true,false]){
  const path=[{x:a.x,y:a.y}],point={x:a.x,y:a.y};
  for(const axis of horizontal?['x','y'] as const:['y','x'] as const){while(point[axis]!==b[axis]){point[axis]+=Math.sign(b[axis]-point[axis]);path.push({...point});}}
  if(!path.some(p=>m.blocked.some(o=>o.x===p.x&&o.y===p.y)))return path;
 }
 return null;
}
export function validateLayout(m:Mission,l:Layout):string|null{
 const ids=new Set<string>(),slots=new Set<string>();
 if(l.nodes.length>m.budget+m.fixed.length)return 'Você ultrapassou o limite de peças.';
 for(const n of l.nodes){
  if(ids.has(n.id))return 'ID de peça duplicado.';ids.add(n.id);
  if(!Number.isInteger(n.x)||!Number.isInteger(n.y)||n.x<0||n.x>6||n.y<0||n.y>4)return 'Peça fora da bancada.';
  const key=`${n.x}:${n.y}`;if(slots.has(key))return 'Duas peças ocupam o mesmo encaixe.';slots.add(key);
  if(m.blocked.some(p=>p.x===n.x&&p.y===n.y))return 'Encaixe danificado.';
  if(!Number.isInteger(n.rotation)||n.rotation<0||n.rotation>3)return 'Orientação inválida.';
  const fixed=m.fixed.find(f=>f.id===n.id);
  if(fixed){if(JSON.stringify(n)!==JSON.stringify(fixed))return 'Entrada ou destino fixo foi alterado.';}
  else if(!m.available.includes(n.kind)||['source','sink'].includes(n.kind))return 'Peça indisponível nesta missão.';
  if(['add','multiply'].includes(n.kind)&&(!Number.isInteger(n.config.value)||n.config.value!<1||n.config.value!>3))return 'Use um valor de 1 a 3.';
  if((n.kind==='add'||n.kind==='multiply')&&!m.parameters[n.kind].includes(n.config.value!))return 'Parâmetro indisponível nesta missão.';
  if(n.kind==='filter'){
   const c=n.config;
   if(!['single','and','or'].includes(c.op??'')||!['and','or'].includes(c.outer??'')||typeof c.third!=='boolean'||typeof c.invert!=='boolean')return 'Regra de decisão incompleta.';
   const tests=[c.a,...(c.op!=='single'?[c.b]:[]),...(c.third?[c.c]:[])];
   if(tests.some(p=>!p||!m.predicates.includes(p)))return 'Sensor indisponível nesta missão.';
  }
 }
 if(m.fixed.some(f=>!ids.has(f.id)))return 'Entrada ou destino ausente.';
 const outputs=new Set<string>();
 for(const e of l.edges){
  const from=l.nodes.find(n=>n.id===e.from),to=l.nodes.find(n=>n.id===e.to);
  if(!from||!to)return 'Cabo ligado a uma peça ausente.';
  if(!ports(from).includes(e.port)||to.kind==='source')return 'Essa porta não aceita o cabo.';
  if(outputs.has(`${e.from}:${e.port}`))return 'Uma saída só pode ter um cabo.';outputs.add(`${e.from}:${e.port}`);
  if(!cablePath(m,from,to))return `Cabo de ${e.from}: alcance excedido ou obstáculo.`;
 }
 const visiting=new Set<string>(),done=new Set<string>();
 function cycle(id:string):boolean{if(visiting.has(id))return true;if(done.has(id))return false;visiting.add(id);for(const e of l.edges.filter(e=>e.from===id))if(cycle(e.to))return true;visiting.delete(id);done.add(id);return false;}
 if(l.nodes.some(n=>cycle(n.id)))return 'O circuito tem um ciclo. Abra um caminho até um destino.';
 return null;
}
