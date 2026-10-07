import { describe, it, expect } from 'vitest';
import { compile, countBlocks, startRun, stepRun, runProgram } from '../../src/core/engine';
import type { Level, Command } from '../../src/core/types';
import data from '../../src/content/levels.json';
const first = data.levels[0] as Level;
const cmd = (kind: 'advance' | 'left' | 'right'): Command => ({ kind });
const open: Level = { ...first, objects:[],requiredPackets:0,requiresCircuit:false, grid: ['....','....','....','....'], start: {x:1,y:2,direction:'east'}, goal:{x:3,y:0}, maxBlocks:20 };
describe('interpretação e execução', () => {
  it('conta ações básicas', () => expect(countBlocks([cmd('advance'),cmd('left')])).toBe(2));
  it('conta repetição e seu corpo', () => expect(countBlocks([{kind:'repeat',times:4,body:['advance','left']}])).toBe(3));
  it('rejeita programa vazio', () => expect(() => compile(first, [])).toThrow(/adicione/i));
  it('rejeita excesso de blocos', () => expect(() => compile(first, Array.from({length:first.maxBlocks+1},()=>cmd('left')))).toThrow(/blocos/i));
  it('rejeita comando desconhecido', () => expect(() => compile(first, [{kind:'fly'} as unknown as Command])).toThrow(/comando/i));
  it('rejeita repetição em fase sem esse recurso', () => expect(() => compile(first, [{kind:'repeat',times:2,body:['advance']}])).toThrow(/repetição/i));
  it('rejeita quantidade não inteira', () => expect(() => compile({...first,allowRepeat:true}, [{kind:'repeat',times:2.5,body:['advance']}])).toThrow(/2 a 4/i));
  it('rejeita corpo vazio', () => expect(() => compile({...first,allowRepeat:true}, [{kind:'repeat',times:2,body:[]}])).toThrow(/corpo/i));
  it('expande repetição com índice e iteração de origem', () => expect(compile({...open,allowRepeat:true}, [{kind:'repeat',times:2,body:['advance','left']}])).toEqual([
    {kind:'advance',commandIndex:0,iteration:1},{kind:'left',commandIndex:0,iteration:1},{kind:'advance',commandIndex:0,iteration:2},{kind:'left',commandIndex:0,iteration:2},
  ]));
  it('inicia na posição original, sem passos', () => expect(startRun(open,[cmd('advance')])).toMatchObject({x:1,y:2,direction:'east',steps:0,status:'running'}));
  it('avança uma casa na orientação atual', () => expect(stepRun(open,startRun(open,[cmd('advance'),cmd('left')]))).toMatchObject({x:2,y:2,direction:'east'}));
  it('esquerda muda apenas orientação', () => expect(stepRun(open,startRun(open,[cmd('left'),cmd('advance')]))).toMatchObject({x:1,y:2,direction:'north'}));
  it('direita muda apenas orientação', () => expect(stepRun(open,startRun(open,[cmd('right'),cmd('advance')]))).toMatchObject({x:1,y:2,direction:'south'}));
  it('quatro curvas retornam à orientação original', () => expect(runProgram(open,Array.from({length:4},()=>cmd('left'))).direction).toBe('east'));
  it('colisão perde sem atravessar parede', () => expect(runProgram(first,[cmd('left'),cmd('advance')])).toMatchObject({x:0,y:3,status:'failed',reason:'wall'}));
  it('limite do mapa perde sem mudar posição', () => expect(runProgram({...open,start:{x:0,y:0,direction:'north'}},[cmd('advance')])).toMatchObject({x:0,y:0,status:'failed',reason:'boundary'}));
  it('fim do programa fora do destino é falha', () => expect(runProgram(open,[cmd('left')])).toMatchObject({status:'failed',reason:'exhausted'}));
  it('atinge destino e encerra antes de comandos restantes', () => expect(runProgram({...open,goal:{x:2,y:2}},[cmd('advance'),cmd('right')])).toMatchObject({status:'won',steps:1,direction:'east'}));
  it('limite de passos impede execução longa', () => expect(runProgram({...open,maxSteps:1},[cmd('left'),cmd('right')])).toMatchObject({status:'failed',reason:'limit',steps:1}));
  it('estado anterior não é mutado', () => { const original=startRun(open,[cmd('advance'),cmd('left')]); const copy=structuredClone(original); stepRun(open,original); expect(original).toEqual(copy); });
  it('passo após encerramento preserva estado', () => {const end=runProgram(open,[cmd('left')]); expect(stepRun(open,end)).toBe(end);});
  it('recomeçar restaura posição e contador', () => {runProgram(first,first.solution); expect(startRun(first,first.solution)).toMatchObject({x:0,y:3,steps:0,status:'running'});});
  it.each(data.levels.map((l)=>[l.title,l as Level] as const))('solução editorial vence: %s', (_,level) => expect(runProgram(level,level.solution).status).toBe('won'));
});
