import Ajv from 'ajv';
import schema from './schema.json';
import { compile, runProgram } from '../core/engine';
import type { Level, Position } from '../core/types';
const ajv = new Ajv({ allErrors: true, strict: true });
const validate = ajv.compile(schema);
export function validateContent(content: unknown): Level[] {
  if (!validate(content)) throw new Error(`Conteúdo inválido no esquema: ${ajv.errorsText(validate.errors)}`);
  const levels=(content as {levels:Level[]}).levels;
  const ids=new Set<string>();
  for (const level of levels) {
    if (ids.has(level.id)) throw new Error(`ID duplicado: ${level.id}`);
    ids.add(level.id);
    const width=level.grid[0].length;
    if (level.grid.some((row)=>row.length!==width)) throw new Error(`${level.id}: mapa deve ser retangular.`);
    const floor=(position:Position)=>level.grid[position.y]?.[position.x] === '.';
    if (!floor(level.start)) throw new Error(`${level.id}: início precisa estar em uma célula livre.`);
    if (!floor(level.goal)) throw new Error(`${level.id}: destino precisa estar em uma célula livre.`);
    if (level.start.x===level.goal.x && level.start.y===level.goal.y) throw new Error(`${level.id}: início e destino precisam ser diferentes.`);
    if (level.initialProgram.length) compile(level,level.initialProgram);
    if (runProgram(level,level.solution).status!=='won') throw new Error(`${level.id}: solução editorial não conclui o mapa.`);
  }
  return levels;
}
