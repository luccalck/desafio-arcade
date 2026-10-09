import {describe,it,expect} from 'vitest';

import {compileCode} from '../../src/core/code-runtime';


import data from '../../src/content/missions.json';
const run=(body:string,input={})=>compileCode(`function regra(entrada) { ${body} }`,'regra')(input);
describe('JavaScript do modo iniciante',()=>{
 it.each([[10,-1,3,7],[10,0,3,10],[20,1,4,24]])('movimento %s/%s/%s', (posicao,direcao,velocidade,result)=>{const input={posicao,direcao,velocidade};expect(compileCode(data.missions[1].reference,'mover')(input)).toBe(result);expect(input.posicao).toBe(posicao);});
 it.each([['2+3*4',14],['(2+3)*4',20],['10-4-2',4],['-3+ +2',-1],['10%3',1],['8/2',4],['3>=3',true],['3>4',false],['3<4',true],['3!==4',true],['3===3',true],['!false',true],['0 || 5',5],['2 && 7',7],['false && ausente',false],['true || ausente',true]])('expressão %s', (expr,result)=>expect(run(`return ${expr};`)).toBe(result));
 it('comentários e string escapada não viram código',()=>expect(run(`/* teste */ // linha\n return 'cristal\\n\\u0041';`)).toBe('cristal\nA'));
 it('else if e escopos',()=>expect(run('let x=1; if(false){x=9;} else if(true){let x=3; x+=2;} else{x=0;} return x;')).toBe(1));
 it('atribuições numéricas',()=>expect(run('let x=8; x-=1; x*=2; x/=7; x++; x--; return x;')).toBe(2));
 it('lista vazia e zero iterações',()=>expect(run('let a=[]; for(let i=0;i<0;i++){a.push(i);} return a;')).toEqual([]));
 it('const lista permite push',()=>expect(run('const a=[]; a.push(3); return a;')).toEqual([3]));
 it('return encerra laço e bloco',()=>expect(run('for(let i=0;i<8;i++){ if(i===2){return i;} } return -1;')).toBe(2));
 it('lista de entrada não é modificada externamente',()=>{const input={lista:[1]};expect(compileCode('function regra(entrada){let a=entrada.lista;a.push(2);return a;}','regra')(input)).toEqual([1,2]);expect(input.lista).toEqual([1]);});
 it.each(['let x=1; let x=2; return x;','return ausente;','return entrada.inexistente;','const x=1; x=2; return x;','let a=1; a.push(2); return a;','return 1/0;','return "2"+3;','let a=[]; a.push("texto"); return a;','let a=1;'])('diagnóstico de regra %s',body=>expect(()=>run(body)).toThrow(/Linha/));
 it.each(['fetch("x");return 1;','return entrada.constructor;','let __steps=0;return 1;','let class=1;return class;','return globalThis.x;','while(true){} return 0;','return entrada["pontos"];','return Math.random();','entrada.pontos=9;return 9;','for(const i=0;i<2;i++){return i;} return 0;'])('API/sintaxe fora do subconjunto %s',body=>expect(()=>run(body)).toThrow());
 it('função extra não é executada',()=>expect(()=>compileCode('function regra(entrada){return 0;} function extra(entrada){return 1;}','regra')).toThrow(/somente/));
 it('nome da função fica preservado',()=>expect(()=>compileCode('function outra(entrada){return 1;}','regra')).toThrow(/nome/));
 it('sintaxe aponta a linha real',()=>expect(()=>compileCode('function regra(entrada){\n return 1\n}','regra')).toThrow(/Linha 3/));
 it('símbolo inválido é localizado',()=>expect(()=>run('return @;')).toThrow(/Símbolo/));
 it('bloco não fechado',()=>expect(()=>compileCode('function regra(entrada){return 1;','regra')).toThrow(/Feche/));
 it('escape desconhecido',()=>expect(()=>run("return '\\q';")).toThrow(/Escape/));
 it('número infinito',()=>expect(()=>run('return 1e999;')).toThrow(/finito/));
 it('limite de texto',()=>expect(()=>compileCode(' '.repeat(6001),'regra')).toThrow(/6000/));
 it('limite de grupos',()=>expect(()=>run('return '+'('.repeat(25)+'1'+')'.repeat(25)+';')).toThrow(/grupos/));
 it('limite de AST',()=>expect(()=>run('return '+Array(180).fill('1').join('+')+';')).toThrow(/300/));
 it('laço sem progresso para com diagnóstico',()=>expect(()=>run('let x=0;for(let i=0;i<100;i--){x+=1;} return x;')).toThrow(/64/));
 it('limite da lista',()=>expect(()=>run('let a=[];for(let i=0;i<64;i++){a.push(i);a.push(i);}return a;')).toThrow(/64/));
 it('limite de operações em laços aninhados',()=>expect(()=>run('let x=0;for(let i=0;i<60;i++){for(let j=0;j<60;j++){x+=1;}}return x;')).toThrow(/2000/));
});
