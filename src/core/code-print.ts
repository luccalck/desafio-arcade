import type {Program} from './code-types';
// Bridge para o mesmo interpretador AST do export; nunca interpola fonte bruta.
export function printCode(program:Program):string{
 if(!/^[a-zA-Z][\w]*$/.test(program.name))throw Error('Nome de função inválido.');
 return `function ${program.name}(entrada) { return window.__RUN_PYTHON__(${JSON.stringify(program).replaceAll('<','\\u003c')}, entrada); }`;
}
