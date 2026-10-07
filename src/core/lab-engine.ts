import type {Action,Block,Expr,Instruction,LabState,Mission,Scenario} from './lab-types';
export const actionLabels:Record<Action,string>={power:'Ligar central',sensor:'Iniciar sensor',read:'Ler temperatura',report:'Enviar leitura',charge:'Carregar energia',process:'Processar operação',resetCount:'Iniciar enviados = 0',count:'Somar 1 a enviados',send:'Enviar pacote',review:'Separar para revisão',allow:'Autorizar acesso',deny:'Negar acesso',release:'Liberar relatório',hold:'Manter bloqueado'};
export const predicateLabels={valid:'pacote íntegro',permission:'pacote autorizado',credentials:'credencial válida',enoughEnergy:'energia ≥ 3',maintenance:'manutenção autorizada',countMet:'enviados = meta',lotDone:'lote concluído'};
export function expressionLabel(e:Expr):string{return e.kind==='predicate'?predicateLabels[e.name]:`(${expressionLabel(e.left)} ${e.kind==='and'?'E':'OU'} ${expressionLabel(e.right)})`;}
export function countBlocks(program:Block[]):number{return program.reduce((n,b)=>n+1+(b.kind==='foreach'?countBlocks(b.body):b.kind==='if'?b.then.length+b.else.length:0),0);}
export function validateProgram(m:Mission,program:Block[]):void{
 if(!program.length)throw new Error('Adicione um bloco antes de testar.');
 function expression(e:Expr,depth=0){
  if(!e||depth>2)throw new Error('Condição com agrupamento inválido.');
  if(e.kind==='predicate'){if(!m.predicates.includes(e.name))throw new Error('Condição não disponível nesta missão.');}
  else if((e.kind==='and'||e.kind==='or')&&m.hasGroup){expression(e.left,depth+1);expression(e.right,depth+1);}
  else throw new Error('Condição não disponível ou desconhecida.');
 }
 function visit(blocks:Block[],insideLoop=false){for(const b of blocks){
  if(b.kind==='action'){if(!m.actions.includes(b.action))throw new Error('Ação não disponível nesta missão.');}
  else if(b.kind==='if'){
   if(!m.hasIf)throw new Error('SE não disponível nesta missão.');expression(b.condition);
   if(!b.then.length||!b.else.length)throw new Error('Adicione ações em ENTÃO e SENÃO.');
   if([...b.then,...b.else].some(x=>x.kind!=='action'))throw new Error('Ramos aceitam apenas ações, sem grupos aninhados.');
   visit(b.then,insideLoop);visit(b.else,insideLoop);
  }else if(b.kind==='foreach'){
   if(insideLoop)throw new Error('Não há repetição aninhada.');
   if(!m.hasLoop||!b.body.length||b.body.length>8)throw new Error('PARA CADA precisa de 1 a 8 blocos nesta missão.');visit(b.body,true);
  }else throw new Error('Bloco desconhecido.');
 }}
 visit(program);if(countBlocks(program)>m.maxBlocks)throw new Error(`Limite de ${m.maxBlocks} blocos excedido.`);
}
function instructions(blocks:Block[],prefix=''):Instruction[]{return blocks.map((b,i)=>{
 const path=`${prefix}${i}`;
 return b.kind==='action'?{kind:'action',action:b.action,path}:b.kind==='if'?{kind:'condition',condition:b.condition,yes:b.then,no:b.else,path}:{kind:'foreach',body:b.body,path};
});}
export function startLab(m:Mission,s:Scenario,program:Block[]):LabState{
 validateProgram(m,program);
 const state:LabState={status:'running',message:'Programa pronto. Observe valores e decisões por passo.',steps:0,queue:instructions(program),trace:[],activePath:'',energy:s.energy,charges:0,operations:0,powered:false,sensorOn:false,reading:null,reported:false,count:null,current:m.mode==='conditions'?0:null,routes:{},counted:[],lotDone:false,decision:null,released:false,held:false,gateVerified:m.mode!=='final'};
 if(m.mode==='final'){
  const rule=program.find(b=>b.kind==='if'&&b.then.some(a=>a.action==='release')&&b.else.some(a=>a.action==='hold'));
  if(rule?.kind==='if')try{state.gateVerified=[false,true].every(met=>[false,true].every(done=>evaluateExpression(rule.condition,{...state,count:met?s.targetCount:s.targetCount+1,lotDone:done},s)===(met&&done)));}catch{/* Uma condição de pacote não protege o relatório. */}
 }
 return state;
}
export function evaluateExpression(e:Expr,state:LabState,s:Scenario):boolean{
 if(e.kind!=='predicate')return e.kind==='and'?evaluateExpression(e.left,state,s)&&evaluateExpression(e.right,state,s):evaluateExpression(e.left,state,s)||evaluateExpression(e.right,state,s);
 if(e.name==='valid'||e.name==='permission'){
  if(state.current===null||!s.packets[state.current])throw new Error('A condição de pacote precisa estar dentro de PARA CADA.');
  return s.packets[state.current][e.name];
 }
 if(e.name==='credentials')return s.credentials;
 if(e.name==='enoughEnergy')return state.energy>=3;
 if(e.name==='maintenance')return s.maintenance;
 if(e.name==='countMet')return state.count!==null&&state.count===s.targetCount;
 return state.lotDone;
}
function applyAction(action:Action,state:LabState,m:Mission,s:Scenario):string{
 switch(action){
 case 'power':state.powered=true;return 'Central ligada. O sensor pode ser iniciado.';
 case 'sensor':if(!state.powered)throw new Error('O sensor precisa da central ligada.');state.sensorOn=true;return 'Sensor iniciado. Agora é possível obter uma leitura.';
 case 'read':if(!state.sensorOn)throw new Error('O sensor ainda não foi iniciado.');state.reading=24;return 'Leitura obtida: temperatura = 24 °C.';
 case 'report':if(state.reading===null)throw new Error('Não há leitura para enviar. Leia a temperatura antes.');state.reported=true;return 'Leitura enviada. Comunicação recuperada.';
 case 'charge':if(state.charges>=1)throw new Error('Há apenas uma carga disponível.');state.energy+=s.charge;state.charges++;return `energia recebeu +${s.charge}; agora vale ${state.energy}.`;
 case 'process':if(state.operations>=2)throw new Error('O objetivo permite duas operações.');if(state.energy<s.cost)throw new Error(`Energia insuficiente: ${state.energy}; esta operação usa ${s.cost}.`);state.energy-=s.cost;state.operations++;return `Operação ${state.operations}/2: energia −${s.cost}; agora vale ${state.energy}.`;
 case 'resetCount':state.count=0;state.counted=[];return 'Variável enviados inicializada com 0.';
 case 'allow':case 'deny':if(state.decision!==null)throw new Error('Acesso já decidido nesta execução.');state.decision=action==='allow';return state.decision?'Acesso autorizado.':'Acesso negado.';
 case 'release':if(!state.powered)throw new Error('Ligue a central antes de liberar o relatório.');if(!state.lotDone||state.count!==s.targetCount)throw new Error('Relatório bloqueado: lote precisa terminar e enviados deve atingir a meta.');state.released=true;return 'Relatório liberado: lote concluído e meta atingida.';
 case 'hold':state.held=true;return 'Relatório mantido bloqueado.';
 default:{
  const packet=state.current===null?undefined:s.packets[state.current];
  if(!packet)throw new Error('Escolha o pacote com PARA CADA antes desta ação.');
  if(m.mode==='final'&&!state.powered)throw new Error('Ligue a central antes de processar os pacotes.');
  if(action==='count'){
   if(state.count===null)throw new Error('Inicialize o contador enviados antes de somar.');
   if(state.routes[packet.id]!=='send')throw new Error('Conte somente depois de enviar o pacote.');
   if(state.counted.includes(packet.id))throw new Error('Este pacote já foi contado.');
   state.count++;state.counted.push(packet.id);return `enviados recebeu +1; agora vale ${state.count}.`;
  }
  if(state.routes[packet.id])throw new Error('Este pacote já foi encaminhado.');
  state.routes[packet.id]=action==='send'?'send':'review';return `${packet.id}: ${action==='send'?'enviado':'separado para revisão'}.`;
 }
 }
}
function goal(m:Mission,s:Scenario,state:LabState):string|null{
 if(m.mode==='sequence')return state.reported&&state.powered&&state.sensorOn&&state.reading!==null?null:'Falta obter e enviar uma leitura após preparar o sensor.';
 if(m.mode==='variables')return state.operations===2&&state.energy===s.targetEnergy?null:`Objetivo incompleto: ${state.operations}/2 operações; energia=${state.energy}, alvo=${s.targetEnergy}.`;
 if(m.mode==='boolean')return state.decision===((s.credentials&&s.energy>=3)||s.maintenance)?null:`Decisão incorreta para este cenário. Credencial=${+s.credentials}, energia=${s.energy}, manutenção=${+s.maintenance}. Observe o grupo E e a alternativa OU.`;
 for(const packet of s.packets){const expected=packet.valid&&(m.mode!=='final'||packet.permission)?'send':'review';if(state.routes[packet.id]!==expected)return `${packet.id}: ${expected==='send'?'deveria ser enviado':'deveria ir para revisão'}. Verifique a condição e o ramo executado.`;}
 if(m.mode==='conditions')return null;
 if(!state.lotDone||state.count!==s.targetCount)return `Lote/contador incompleto: enviados=${state.count??'não inicializado'}, meta=${s.targetCount}.`;
 if(m.mode==='final'&&(!state.powered||!state.released||state.held))return 'O núcleo precisa da central ligada e do relatório liberado pela condição final.';
 if(m.mode==='final'&&!state.gateVerified)return 'A condição do relatório precisa liberar somente com meta atingida E lote concluído, e bloquear quando faltar uma delas.';
 return null;
}
export function stepLab(m:Mission,s:Scenario,previous:LabState):LabState{
 if(previous.status!=='running')return previous;
 if(previous.steps>=100)return {...previous,status:'failed',message:'Limite seguro de 100 operações atingido. Simplifique o programa.'};
 const state:LabState={...previous,queue:[...previous.queue],trace:[...previous.trace],routes:{...previous.routes},counted:[...previous.counted]};
 const task=state.queue.shift()!;state.steps++;state.activePath=task.path;
 const before={energy:previous.energy,count:previous.count};let branch:boolean|undefined;
 try{
  if(task.kind==='action')state.message=applyAction(task.action!,state,m,s);
  else if(task.kind==='condition'){
   branch=evaluateExpression(task.condition!,state,s);state.queue.unshift(...instructions(branch?task.yes!:task.no!,`${task.path}.${branch?'t':'e'}.`));
   state.message=`SE ${expressionLabel(task.condition!)}: ${branch?'verdadeiro → ENTÃO':'falso → SENÃO'}.`;
  }else if(task.kind==='foreach'){
   const expanded:Instruction[]=[];s.packets.forEach((_,i)=>{expanded.push({kind:'packet',packetIndex:i,path:task.path},...instructions(task.body!,`${task.path}.`));});
   expanded.push({kind:'end',path:task.path});state.queue.unshift(...expanded);state.message=`PARA CADA vai visitar ${s.packets.length} pacotes, um por vez.`;
  }else if(task.kind==='packet'){state.current=task.packetIndex!;state.message=`Pacote atual: ${s.packets[state.current].id} (${state.current+1}/${s.packets.length}).`;}
  else{state.lotDone=true;state.current=null;state.message='Todos os itens foram visitados. Lote concluído.';}
 }catch(error){state.status='failed';state.message=error instanceof Error?error.message:String(error);}
 state.trace.push({path:task.path,message:state.message,before,after:{energy:state.energy,count:state.count},branch});
 if(state.status==='running'&&!state.queue.length){const problem=goal(m,s,state);state.status=problem?'failed':'won';state.message=problem??'Cenário resolvido! As regras e os resultados atendem ao objetivo.';}
 return state;
}
export function runLab(m:Mission,s:Scenario,program:Block[]):LabState{let state=startLab(m,s,program);while(state.status==='running')state=stepLab(m,s,state);return state;}
