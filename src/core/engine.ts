import type { Command, Direction, Execution, Level, Primitive, RunState, Signals } from './types';
const primitives: Primitive[] = ['advance', 'left', 'right', 'collect', 'activate'];
const directions: Direction[] = ['north', 'east', 'south', 'west'];
const vectors: Record<Direction, [number, number]> = { north: [0,-1], east: [1,0], south: [0,1], west: [-1,0] };
const names: Record<Direction,string> = { north: 'norte', east: 'leste', south: 'sul', west: 'oeste' };
export const isGateOpen = (signals: Signals): boolean => signals.A && signals.B;
function checkAction(level: Level, kind: Primitive) {
  if (!primitives.includes(kind)) throw new Error('Comando desconhecido.');
  if (!level.allowedActions.includes(kind)) throw new Error('Esse comando não está disponível nesta missão.');
}

export function countBlocks(program: Command[]): number {
  return program.reduce((sum, command) => sum + (command.kind === 'repeat' ? 1 + command.body.length : 1), 0);
}

export function compile(level: Level, program: Command[]): Execution[] {
  if (!program.length) throw new Error('Adicione ao menos um comando antes de executar.');
  const executions: Execution[] = [];
  program.forEach((command, commandIndex) => {
    if (command.kind === 'repeat') {
      if (!level.allowRepeat) throw new Error('Repetição está disponível na missão de automação.');
      if (!Number.isInteger(command.times) || command.times < 2 || command.times > 4) throw new Error('Use de 2 a 4 repetições.');
      if (!Array.isArray(command.body) || !command.body.length || command.body.length > 8 || command.body.some((kind) => !primitives.includes(kind))) throw new Error('O corpo deve ter de 1 a 8 ações básicas.');
      for (let iteration=1; iteration<=command.times; iteration++) {
        command.body.forEach((kind) => {checkAction(level,kind);executions.push({kind, commandIndex, iteration});});
      }
    } else {
      checkAction(level,command.kind);
      executions.push({kind:command.kind, commandIndex});
    }
  });
  if (countBlocks(program) > level.maxBlocks) throw new Error(`O programa excede o limite de ${level.maxBlocks} blocos.`);
  if (executions.length > 256) throw new Error('O programa excede o limite seguro de ações.');
  return executions;
}

export function startRun(level: Level, program: Command[]): RunState {
  return {...level.start, status:'running', steps:0, cursor:0, executions:compile(level,program), trace:[],
    packets:[],signals:{A:false,B:false},path:[{x:level.start.x,y:level.start.y}],from:{x:level.start.x,y:level.start.y},
    message:'Programa pronto. Observe um comando de cada vez.'};
}

export function stepRun(level: Level, previous: RunState): RunState {
  if (previous.status !== 'running') return previous;
  if (previous.steps >= level.maxSteps) return {...previous,status:'failed',reason:'limit',message:`Limite de ${level.maxSteps} passos atingido. Reduza o programa e tente novamente.`};
  const action = previous.executions[previous.cursor];
  const label = `Comando ${action.commandIndex+1}${action.iteration ? `, repetição ${action.iteration}` : ''}`;
  const state: RunState = {...previous,steps:previous.steps+1,cursor:previous.cursor+1,trace:[...previous.trace],
    packets:[...previous.packets],signals:{...previous.signals},path:[...previous.path],
    from:{x:previous.x,y:previous.y},lastAction:action.kind};
  if (action.kind === 'advance') {
    const [dx,dy] = vectors[state.direction];
    const x=state.x+dx, y=state.y+dy;
    const outside = y < 0 || y >= level.grid.length || x < 0 || x >= level.grid[0].length;
    if (outside || level.grid[y][x] === '#') {
      state.status='failed'; state.reason=outside ? 'boundary' : 'wall';
      state.message=`${label} tentou avançar ${outside ? 'para fora do mapa' : 'contra uma parede'}. O robô está voltado para ${names[state.direction]}. Corrija a rota.`;
    } else if (level.objects.some(o=>o.kind==='gate'&&o.x===x&&o.y===y) && !isGateOpen(state.signals)) {
      state.status='failed';state.reason='gate';
      state.message=`${label}: porta fechada. A=${Number(state.signals.A)}, B=${Number(state.signals.B)}. A AND B só é verdadeiro quando os dois sinais estão ligados. Ative ambos os interruptores antes de passar.`;
    } else {
      state.x=x; state.y=y;
      state.path.push({x,y});
      state.message=`${label}: avançou uma casa para ${names[state.direction]}.`;
    }
  } else if (action.kind === 'collect') {
    const terminal=level.objects.find(o=>o.kind==='terminal'&&o.x===state.x&&o.y===state.y);
    if (!terminal) {
      state.status='failed';state.reason='interaction';state.message=`${label}: não há terminal de dados nesta casa. Mova o robô até um terminal azul antes de coletar.`;
    } else if (state.packets.includes(terminal.id)) {
      state.message=`${label}: terminal já atendido. O pacote não foi contado novamente.`;
    } else {
      state.packets.push(terminal.id);state.message=`${label}: pacote coletado. A variável pacotes agora vale ${state.packets.length}/${level.requiredPackets}.`;
    }
  } else if (action.kind === 'activate') {
    const control=level.objects.find(o=>o.kind==='switch'&&o.x===state.x&&o.y===state.y);
    if (!control || control.kind!=='switch') {
      state.status='failed';state.reason='interaction';state.message=`${label}: não há interruptor nesta casa. Chegue ao interruptor A ou B antes de ativar.`;
    } else {
      state.signals[control.signal]=true;
      state.message=`${label}: sinal ${control.signal}=1 (verdadeiro). A AND B = ${Number(isGateOpen(state.signals))} (${isGateOpen(state.signals)?'verdadeiro; porta aberta':'falso; falta ligar o outro sinal'}).`;
    }
  } else {
    const rotation=action.kind === 'left' ? 3 : 1;
    state.direction=directions[(directions.indexOf(state.direction)+rotation)%4];
    state.message=`${label}: virou à ${action.kind === 'left' ? 'esquerda' : 'direita'}. Agora olha para ${names[state.direction]}; a posição não mudou.`;
  }
  state.trace.push(state.message);
  if (state.status === 'failed') return state;
  const atGoal=state.x===level.goal.x && state.y===level.goal.y;
  const ready=state.packets.length>=level.requiredPackets && (!level.requiresCircuit||isGateOpen(state.signals));
  if (atGoal && ready) {
    state.status='won'; state.message='Missão concluída! Dados e condições do sistema foram atendidos.';
  } else if (state.cursor === state.executions.length) {
    state.status='failed';state.reason=atGoal?'objectives':'exhausted';
    state.message=atGoal?`O robô chegou, mas faltam objetivos: pacotes=${state.packets.length}/${level.requiredPackets}${level.requiresCircuit?`, A AND B=${Number(isGateOpen(state.signals))}`:''}. Corrija o programa para atender o sistema.`:'Os comandos terminaram antes do destino. Observe o percurso, edite o programa e tente novamente.';
  } else if(atGoal) {
    state.message+=' Destino alcançado, mas os objetivos ainda estão incompletos; continue as ações.';
  }
  return state;
}

export function runProgram(level: Level, program: Command[]): RunState {
  let state=startRun(level,program);
  while (state.status === 'running') state=stepRun(level,state);
  return state;
}
