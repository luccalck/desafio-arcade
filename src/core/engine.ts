import type { Command, Direction, Execution, Level, Primitive, RunState } from './types';
const primitives: Primitive[] = ['advance', 'left', 'right'];
const directions: Direction[] = ['north', 'east', 'south', 'west'];
const vectors: Record<Direction, [number, number]> = { north: [0,-1], east: [1,0], south: [0,1], west: [-1,0] };
const names: Record<Direction,string> = { north: 'norte', east: 'leste', south: 'sul', west: 'oeste' };

export function countBlocks(program: Command[]): number {
  return program.reduce((sum, command) => sum + (command.kind === 'repeat' ? 1 + command.body.length : 1), 0);
}

export function compile(level: Level, program: Command[]): Execution[] {
  if (!program.length) throw new Error('Adicione ao menos um comando antes de executar.');
  const executions: Execution[] = [];
  program.forEach((command, commandIndex) => {
    if (command.kind === 'repeat') {
      if (!level.allowRepeat) throw new Error('Repetição está disponível a partir da terceira fase.');
      if (!Number.isInteger(command.times) || command.times < 2 || command.times > 4) throw new Error('Use de 2 a 4 repetições.');
      if (!Array.isArray(command.body) || !command.body.length || command.body.length > 8 || command.body.some((kind) => !primitives.includes(kind))) throw new Error('O corpo deve ter de 1 a 8 ações básicas.');
      for (let iteration=1; iteration<=command.times; iteration++) {
        command.body.forEach((kind) => executions.push({kind, commandIndex, iteration}));
      }
    } else {
      if (!primitives.includes(command.kind)) throw new Error('Comando desconhecido.');
      executions.push({kind:command.kind, commandIndex});
    }
  });
  if (countBlocks(program) > level.maxBlocks) throw new Error(`O programa excede o limite de ${level.maxBlocks} blocos.`);
  if (executions.length > 256) throw new Error('O programa excede o limite seguro de ações.');
  return executions;
}

export function startRun(level: Level, program: Command[]): RunState {
  return {...level.start, status:'running', steps:0, cursor:0, executions:compile(level,program), trace:[], message:'Programa pronto. Observe um comando de cada vez.'};
}

export function stepRun(level: Level, previous: RunState): RunState {
  if (previous.status !== 'running') return previous;
  if (previous.steps >= level.maxSteps) return {...previous,status:'failed',reason:'limit',message:`Limite de ${level.maxSteps} passos atingido. Reduza o programa e tente novamente.`};
  const action = previous.executions[previous.cursor];
  const label = `Comando ${action.commandIndex+1}${action.iteration ? `, repetição ${action.iteration}` : ''}`;
  const state: RunState = {...previous,steps:previous.steps+1,cursor:previous.cursor+1,trace:[...previous.trace]};
  if (action.kind === 'advance') {
    const [dx,dy] = vectors[state.direction];
    const x=state.x+dx, y=state.y+dy;
    const outside = y < 0 || y >= level.grid.length || x < 0 || x >= level.grid[0].length;
    if (outside || level.grid[y][x] === '#') {
      state.status='failed'; state.reason=outside ? 'boundary' : 'wall';
      state.message=`${label} tentou avançar ${outside ? 'para fora do mapa' : 'contra uma parede'}. O robô está voltado para ${names[state.direction]}. Corrija a rota.`;
    } else {
      state.x=x; state.y=y;
      state.message=`${label}: avançou uma casa para ${names[state.direction]}.`;
    }
  } else {
    const rotation=action.kind === 'left' ? 3 : 1;
    state.direction=directions[(directions.indexOf(state.direction)+rotation)%4];
    state.message=`${label}: virou à ${action.kind === 'left' ? 'esquerda' : 'direita'}. Agora olha para ${names[state.direction]}; a posição não mudou.`;
  }
  state.trace.push(state.message);
  if (state.status === 'failed') return state;
  if (state.x === level.goal.x && state.y === level.goal.y) {
    state.status='won'; state.message='Entrega concluída! O robô chegou ao módulo.';
  } else if (state.cursor === state.executions.length) {
    state.status='failed'; state.reason='exhausted'; state.message='Os comandos terminaram antes do destino. Observe o percurso, edite o programa e tente novamente.';
  }
  return state;
}

export function runProgram(level: Level, program: Command[]): RunState {
  let state=startRun(level,program);
  while (state.status === 'running') state=stepRun(level,state);
  return state;
}
