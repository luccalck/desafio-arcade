import type {Case,CircuitState,Config,Layout,Mission,Packet,Predicate} from './circuit-types';
import {validateLayout} from './circuit-layout';
const memory=(m:Mission)=>m.mode==='buffer'||m.mode==='final';
export function predicate(name:Predicate,p:Packet,s:Pick<CircuitState,'count'|'batchDone'>,c:Case):boolean{return name==='countMet'?s.count===c.target:name==='batchDone'?s.batchDone:p[name];}
export function decide(config:Config,p:Packet,s:Pick<CircuitState,'count'|'batchDone'>,c:Case):boolean{
 const a=predicate(config.a!,p,s,c),b=config.op==='single'?false:predicate(config.b!,p,s,c);
 let value=config.op==='single'?a:config.op==='and'?a&&b:a||b;
 if(config.third){const third=predicate(config.c!,p,s,c);value=config.outer==='and'?value&&third:value||third;}
 return config.invert?!value:value;
}
export function startCircuit(m:Mission,c:Case,l:Layout):CircuitState{
 const problem=validateLayout(m,l),source=m.fixed.find(n=>n.kind==='source')!;
 return {status:problem?'failed':'running',tick:0,queue:c.packets.map(p=>({node:source.id,packet:{...p}})),held:Object.fromEntries(l.nodes.filter(n=>n.kind==='buffer').map(n=>[n.id,[]])),count:0,batchDone:false,outputs:[],active:'',lastPacket:null,lastEdge:null,fault:'',message:problem??'Bancada pronta.',trace:[]};
}
function fail(s:CircuitState,message:string,node=s.active):CircuitState{s.status='failed';s.fault=node;s.message=message;return s;}
export function stepCircuit(m:Mission,c:Case,l:Layout,previous:CircuitState):CircuitState{
 if(previous.status!=='running')return previous;
 const s=structuredClone(previous);s.lastEdge=null;
 if(++s.tick>512)return fail(s,'A execução excedeu 512 movimentos.');
 if(!s.queue.length){
  if(!s.batchDone){
   s.batchDone=true;
   for(const [id,held] of Object.entries(s.held)){
    if(held.length){const e=l.edges.find(e=>e.from===id&&e.port==='out');if(!e)return fail(s,'Buffer sem cabo de saída.',id);s.queue.push(...held.map(p=>({node:e.to,packet:{...p},from:id,port:'out'})));s.held[id]=[];}
   }
   if(s.queue.length){s.message='Lote completo. A memória libera os dados.';s.active='';return s;}
  }
  if(s.outputs.length!==c.expected.length)return fail(s,'Algum pacote ficou sem destino.');
  for(const wanted of c.expected){const actual=s.outputs.find(p=>p.id===wanted.id);if(!actual||actual.sink!==wanted.sink||actual.value!==wanted.value){s.active=actual?.sink??'';s.lastPacket=c.packets.find(p=>p.id===wanted.id)??null;return fail(s,!actual?'Pacote perdido.':actual.sink!==wanted.sink?'Este pacote chegou ao destino errado.':`Valor ${actual.value}; esperado ${wanted.value}.`);}}
  if(memory(m)&&(s.count!==c.target||!Object.keys(s.held).length))return fail(s,`Memória: ${s.count} dados; meta ${c.target}.`);
  s.status='won';s.message='Todas as saídas estão corretas.';s.active='';return s;
 }
 const event=s.queue.shift()!,n=l.nodes.find(n=>n.id===event.node)!;
 s.active=n.id;s.lastPacket={...event.packet};s.lastEdge=event.from?{from:event.from,port:event.port!,to:n.id}:null;
 const before=event.packet.value,p={...event.packet};let port='out',message='Pacote transmitido.';
 if(n.kind==='sink'){
  if(s.outputs.some(o=>o.id===p.id))return fail(s,'O circuito duplicou um pacote.');
  if(memory(m)&&n.id==='ok'&&!s.batchDone)return fail(s,'Os dados saíram antes de o lote terminar. Use memória.');
  s.outputs.push({id:p.id,sink:n.id,value:p.value});
  const goal=c.expected.find(o=>o.id===p.id)!;
  if(goal.sink!==n.id||goal.value!==p.value)return fail(s,goal.sink!==n.id?'Destino incorreto. Ajuste a decisão.':`Saiu ${p.value}; precisamos de ${goal.value}.`,n.id);
  message='Saída correta.';
 }else if(n.kind==='buffer'){
  if(s.batchDone)return fail(s,'A memória recebeu dados depois do fechamento.');
  s.held[n.id].push(p);s.count++;message=`Memória guarda ${s.count}/${c.target}.`;
 }else{
  if(n.kind==='add'){p.value+=n.config.value!;message=`${before} + ${n.config.value} = ${p.value}`;}
  if(n.kind==='multiply'){p.value*=n.config.value!;message=`${before} × ${n.config.value} = ${p.value}`;}
  if(p.value>999)return fail(s,'O valor excedeu 999.');
  if(n.kind==='filter'){port=decide(n.config,p,s,c)?'yes':'no';message=port==='yes'?'Regra verdadeira → sim.':'Regra falsa → não.';}
  const e=l.edges.find(e=>e.from===n.id&&e.port===port);
  if(!e)return fail(s,`Falta o cabo da saída ${port==='yes'?'sim':port==='no'?'não':'→'}.`,n.id);
  s.queue.push({node:e.to,packet:p,from:n.id,port});
 }
 s.lastPacket=p;s.message=message;s.trace.push({tick:s.tick,node:n.id,packet:p.id,before,after:p.value,port:n.kind==='sink'||n.kind==='buffer'?undefined:port,message});
 return s;
}
export function runCircuit(m:Mission,c:Case,l:Layout):CircuitState{let s=startCircuit(m,c,l);while(s.status==='running')s=stepCircuit(m,c,l,s);return s;}
