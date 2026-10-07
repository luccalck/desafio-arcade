import {describe,it,expect} from 'vitest';
import {runProgram,startRun,stepRun,isGateOpen} from '../../src/core/engine';
import type {Level,Primitive,Command} from '../../src/core/types';
const actions=(...kinds:Primitive[]):Command[]=>kinds.map(kind=>({kind}));
const lab:Level={
 id:'lab-test',title:'Laboratório',concept:'Dados',objective:'Colete dados antes de entregar.',
 hint:'Observe os terminais.',hints:['Observe os terminais.'],briefing:'Cada terminal contém um pacote.',lesson:'Coleta altera a variável.',
 grid:['....','....'],start:{x:0,y:1,direction:'east'},goal:{x:3,y:1},
 maxBlocks:20,maxSteps:32,allowRepeat:true,allowedActions:['advance','left','right','collect','activate'],
 requiredPackets:1,requiresCircuit:false,objects:[{kind:'terminal',id:'t1',x:1,y:1}],initialProgram:[],solution:actions('advance','collect','advance','advance')
};
describe('objetos e objetivos tecnológicos',()=>{
 it('coleta um pacote no terminal e conclui',()=>expect(runProgram(lab,lab.solution)).toMatchObject({status:'won',packets:['t1']}));
 it('coleta duplicada é idempotente',()=>expect(runProgram(lab,actions('advance','collect','collect','advance','advance')).packets).toEqual(['t1']));
 it('coletar fora do terminal interrompe com explicação',()=>expect(runProgram(lab,actions('collect'))).toMatchObject({status:'failed',reason:'interaction',packets:[]}));
 it('destino sem pacote não vence',()=>expect(runProgram(lab,actions('advance','advance','advance'))).toMatchObject({status:'failed',reason:'objectives'}));
 it('chegada incompleta permite ações seguintes de coleta',()=>{
  const atGoal={...lab,objects:[{kind:'terminal' as const,id:'t1',x:3,y:1}]};
  expect(runProgram(atGoal,actions('advance','advance','advance','collect'))).toMatchObject({status:'won',steps:4});
 });
 it('primeiro pacote mostra estado sem concluir antes do destino',()=>{
  let s=startRun(lab,lab.solution);s=stepRun(lab,s);s=stepRun(lab,s);
  expect(s).toMatchObject({status:'running',packets:['t1'],x:1,y:1});
 });
 it('coleta não modifica arrays do estado anterior',()=>{
  const s=stepRun(lab,startRun(lab,lab.solution));const copy=structuredClone(s);stepRun(lab,s);expect(s).toEqual(copy);
 });
 it('tentativa nova reinicia pacotes',()=>{runProgram(lab,lab.solution);expect(startRun(lab,lab.solution).packets).toEqual([]);});
 it('ação não habilitada na missão é rejeitada',()=>expect(()=>startRun({...lab,allowedActions:['advance']},actions('collect'))).toThrow(/disponível/i));
 it('repetição com coleta atende terminais distintos',()=>{
  const pattern:Level={...lab,grid:['.......','#######'],start:{x:0,y:0,direction:'east'},goal:{x:6,y:0},requiredPackets:3,
   objects:[2,4,6].map((x,i)=>({kind:'terminal',id:`t${i}`,x,y:0})),maxBlocks:4};
  expect(runProgram(pattern,[{kind:'repeat',times:3,body:['advance','advance','collect']}])).toMatchObject({status:'won',steps:9,packets:['t0','t1','t2']});
 });
 it('trilha registra movimentos sem repetir posições nas curvas',()=>expect(runProgram(lab,lab.solution).path).toEqual([{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:3,y:1}]));
});
describe('circuito AND',()=>{
 it.each([[false,false,false],[true,false,false],[false,true,false],[true,true,true]])('A=%s B=%s -> %s',(A,B,result)=>expect(isGateOpen({A,B})).toBe(result));
 const circuit:Level={...lab,requiredPackets:0,requiresCircuit:true,grid:['.....','.....'],goal:{x:4,y:1},objects:[
  {kind:'switch',id:'a',signal:'A',x:0,y:1},{kind:'switch',id:'b',signal:'B',x:1,y:1},{kind:'gate',id:'gate',x:2,y:1}
 ]};
 it('porta bloqueia com os dois sinais desligados',()=>expect(runProgram(circuit,actions('advance','advance'))).toMatchObject({status:'failed',reason:'gate',x:1}));
 it('só A não abre a porta',()=>expect(runProgram(circuit,actions('activate','advance','advance'))).toMatchObject({status:'failed',reason:'gate',signals:{A:true,B:false}}));
 it('só B não abre a porta',()=>expect(runProgram(circuit,actions('advance','activate','advance'))).toMatchObject({status:'failed',reason:'gate',signals:{A:false,B:true}}));
 it('A e B permitem passagem e vitória',()=>expect(runProgram(circuit,actions('activate','advance','activate','advance','advance','advance'))).toMatchObject({status:'won',signals:{A:true,B:true}}));
 it('ativar fora do interruptor falha',()=>expect(runProgram({...lab,objects:[]},actions('activate'))).toMatchObject({status:'failed',reason:'interaction'}));
 it('ativar de novo não desliga sinal',()=>expect(runProgram(circuit,actions('activate','activate')).signals).toEqual({A:true,B:false}));
 it('iniciar outra tentativa reinicia ambos',()=>expect(startRun(circuit,actions('activate')).signals).toEqual({A:false,B:false}));
});
