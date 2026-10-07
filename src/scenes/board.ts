import type { Level, RunState, Direction } from '../core/types';
import { escape, robot } from './shared';
export const directionNames: Record<Direction,string>={north:'norte',east:'leste',south:'sul',west:'oeste'};
const arrows: Record<Direction,string>={north:'↑',east:'→',south:'↓',west:'←'};
export function board(level:Level,state?:RunState):string {
  const position=state ?? level.start;
  const cells=level.grid.map((row,y)=>`<div role="row" style="display:contents">`+[...row].map((cell,x)=>{
    const bot=x===position.x&&y===position.y;
    const goal=x===level.goal.x&&y===level.goal.y;
    const start=x===level.start.x&&y===level.start.y;
    const name=bot?`robô voltado para ${directionNames[position.direction]}`:goal?'destino':cell==='#'?'parede':start?'início':'caminho livre';
    return `<div class="cell ${cell==='#'?'wall':'floor'} ${goal?'goal':''} ${bot?'bot':''}" role="gridcell" aria-label="Coluna ${x+1}, linha ${y+1}: ${name}">${bot?`${robot}<span class="direction">${arrows[position.direction]}</span>`:goal?'<span class="module" aria-hidden="true">⚡</span>':start?'<span class="origin" aria-hidden="true">●</span>':''}</div>`;
  }).join('')+'</div>').join('');
  return `<div class="board-shell"><div class="board-top"><span>MAPA / ${escape(level.id)}</span><span>N ↑</span></div><div class="board" role="grid" aria-label="Mapa do desafio" style="--columns:${level.grid[0].length}">${cells}</div><div class="map-legend"><span><i class="legend-start"></i>Início</span><span><i class="legend-goal"></i>Módulo</span><span><i class="legend-wall"></i>Parede</span></div></div><p class="position" data-testid="position">Robô na coluna ${position.x+1}, linha ${position.y+1}, voltado para ${directionNames[position.direction]}.</p>`;
}
