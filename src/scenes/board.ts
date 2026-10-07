import {isGateOpen} from '../core/engine';
import type {Level,RunState,Direction} from '../core/types';
import {escape,robot} from './shared';
export const directionNames:Record<Direction,string>={north:'norte',east:'leste',south:'sul',west:'oeste'};
const arrows:Record<Direction,string>={north:'↑',east:'→',south:'↓',west:'←'};
export function board(level:Level,state?:RunState):string{
 const position=state??level.start;
 const packets=state?.packets??[],signals=state?.signals??{A:false,B:false};
 const open=isGateOpen(signals);
 const cells=level.grid.map((row,y)=>`<div role="row" class="grid-row">`+[...row].map((cell,x)=>{
  const bot=x===position.x&&y===position.y,goal=x===level.goal.x&&y===level.goal.y;
  const visited=state?.path.some(p=>p.x===x&&p.y===y);
  const object=level.objects.find(o=>o.x===x&&o.y===y);
  let badge='',name=cell==='#'?'parede':'piso';
  if(object?.kind==='terminal'){
   const collected=packets.includes(object.id);name=collected?'terminal atendido':'terminal com pacote';
   badge=`<span class="object terminal ${collected?'collected':''}" aria-hidden="true"><span>${collected?'✓':'▤'}</span><small>DADOS</small></span>`;
  }else if(object?.kind==='switch'){
   const on=signals[object.signal];name=`interruptor ${object.signal}, ${on?'ligado':'desligado'}`;
   badge=`<span class="object switch ${on?'on':''}" aria-hidden="true"><b>${object.signal}</b><small>${on?'1':'0'}</small></span>`;
  }else if(object?.kind==='gate'){
   name=`porta AND ${open?'aberta':'fechada'}`;
   badge=`<span class="object gate ${open?'open':''}" aria-hidden="true"><b>${open?'↔':'╳'}</b><small>AND</small></span>`;
  }
  if(goal){name+='; servidor de destino';badge+=`<span class="server" aria-hidden="true"><i></i><i></i><small>BASE</small></span>`;}
  if(bot)name+=`; robô voltado para ${directionNames[position.direction]}`;
  const from=state?.from??position;
  return `<div class="cell ${cell==='#'?'wall':'floor'} ${goal?'goal':''} ${visited?'visited':''} ${bot?'bot':''}" role="gridcell" aria-label="Coluna ${x+1}, linha ${y+1}: ${name}">
   ${badge}${bot?`<span class="bot-visual" style="--from-x:${from.x-x};--from-y:${from.y-y}">${robot}<span class="direction">${arrows[position.direction]}</span></span>`:''}
  </div>`;
 }).join('')+'</div>').join('');
 return `<div class="board-shell"><div class="board-top"><span><i class="live-led"></i>PLACA / ${escape(level.id)}</span><span>N ↑</span></div>
  <div class="board" role="grid" aria-label="Mapa da missão" style="--columns:${level.grid[0].length}">${cells}</div>
  <div class="map-legend">${level.requiredPackets?'<span>▤ Terminal de dados</span>':''}${level.requiresCircuit?'<span>A/B Interruptores</span><span>╳ Porta AND</span>':''}<span>▥ Servidor</span><span>■ Parede</span></div></div>
  <p class="position" data-testid="position">Robô na coluna ${position.x+1}, linha ${position.y+1}, voltado para ${directionNames[position.direction]} ${arrows[position.direction]}.</p>`;
}
export function variables(level:Level,state?:RunState):string{
 const signals=state?.signals??{A:false,B:false};
 return `<section class="variables" aria-label="Estado do sistema">
  ${level.requiredPackets?`<div class="variable"><span>VARIÁVEL / PACOTES</span><strong data-testid="packets">${state?.packets.length??0}<small> / ${level.requiredPackets}</small></strong><span>Coletar aumenta esse valor</span></div>`:''}
  ${level.requiresCircuit?`<div class="logic-panel"><span class="micro">PORTA LÓGICA / AND</span><div class="logic-values"><span>A <b data-testid="signal-a">${Number(signals.A)}</b></span><i>AND</i><span>B <b data-testid="signal-b">${Number(signals.B)}</b></span><i>→</i><strong data-testid="and-output" class="${isGateOpen(signals)?'on':''}">${Number(isGateOpen(signals))}</strong></div><p>${isGateOpen(signals)?'Verdadeiro · passagem aberta':'Falso · ligue os dois interruptores'}</p></div>`:''}
  <div class="variable steps"><span>EXECUÇÃO / PASSOS</span><strong>${state?.steps??0}<small> / ${level.maxSteps}</small></strong><span>${state?.executions[state.cursor-1]?.iteration?`Iteração ${state.executions[state.cursor-1].iteration}`:'Sem cronômetro'}</span></div>
 </section>`;
}
