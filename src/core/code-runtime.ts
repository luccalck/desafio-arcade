import {CodeError} from './code-types';
import type {Expr,Input,Program,Rule,Stmt,Value} from './code-types';
import {parseCode} from './code-parser';
const truth=(v:Value)=>Array.isArray(v)?v.length>0:!!v;
const equal=(a:Value,b:Value):boolean=>Array.isArray(a)||Array.isArray(b)?Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((v,i)=>equal(v,b[i])):(typeof a==='number'||typeof a==='boolean')&&(typeof b==='number'||typeof b==='boolean')?Number(a)===Number(b):a===b;
export function executeCode(program:Program,input:Input):Value{
 const incoming=structuredClone(input),locals=new Map<string,Value>();let steps=0,returned:Value|undefined;
 const check=(line:number)=>{if(++steps>2000)throw new CodeError('Execução excedeu 2000 operações. Reveja o laço.',line);};
 const binding=(id:string,line:number)=>{if(!locals.has(id))throw new CodeError(`Variável “${id}” não foi criada.`,line);return locals.get(id)!;};
 const number=(v:Value,line:number)=>{if(typeof v!=='number'||!Number.isFinite(v))throw new CodeError('Esta operação precisa de um número finito.',line);return v;};
 function binary(op:string,a:Value,b:Value,line:number):Value{
  if(op==='==')return equal(a,b);if(op==='!=')return !equal(a,b);
  const x=number(a,line),y=number(b,line);let result:number;
  if(['/', '//','%'].includes(op)&&y===0)throw new CodeError('Divisão por zero; confira os valores.',line);
  switch(op){case '+':result=x+y;break;case '-':result=x-y;break;case '*':result=x*y;break;case '/':result=x/y;break;case '//':result=Math.floor(x/y);break;case '%':result=x-Math.floor(x/y)*y;break;case '<':return x<y;case '<=':return x<=y;case '>':return x>y;case '>=':return x>=y;default:throw new CodeError('Operador não disponível.',line);}
  if(!Number.isFinite(result))throw new CodeError('Resultado precisa ser finito.',line);return result;
 }
 function evaluate(e:Expr):Value{
  check(e.line);switch(e.type){
   case 'literal':return e.value;
   case 'name':return binding(e.name,e.line);
   case 'property':if(!Object.hasOwn(incoming,e.name))throw new CodeError(`entrada["${e.name}"] não existe nesta chamada.`,e.line);return incoming[e.name];
   case 'array':if(e.items.length>64)throw new CodeError('A lista aceita até 64 itens.',e.line);return e.items.map(i=>number(evaluate(i),i.line));
   case 'unary':{const v=evaluate(e.value);return e.op==='not'?!truth(v):e.op==='-'?-number(v,e.line):number(v,e.line);}
   case 'binary':{const left=evaluate(e.left);if(e.op==='and')return truth(left)?evaluate(e.right):left;if(e.op==='or')return truth(left)?left:evaluate(e.right);return binary(e.op,left,evaluate(e.right),e.line);}
   case 'compare':{let previous=evaluate(e.values[0]);for(let i=0;i<e.ops.length;i++){const next=evaluate(e.values[i+1]);if(!binary(e.ops[i],previous,next,e.line))return false;previous=next;}return true;}
  }
 }
 function block(body:Stmt[]){for(const stmt of body){if(returned!==undefined)break;statement(stmt);}}
 function statement(s:Stmt){check(s.line);switch(s.type){
  case 'assign':{const value=evaluate(s.value);locals.set(s.name,s.op==='='?value:binary(s.op[0],binding(s.name,s.line),value,s.line));break;}
  case 'push':{const value=binding(s.name,s.line);if(!Array.isArray(value))throw new CodeError('append precisa de uma lista.',s.line);if(value.length>=64)throw new CodeError('A lista aceita até 64 itens.',s.line);value.push(number(evaluate(s.value),s.line));break;}
  case 'return':returned=evaluate(s.value);break;
  case 'if':block(truth(evaluate(s.condition))?s.yes:s.no);break;
  case 'range':{const start=number(evaluate(s.start),s.line),stop=number(evaluate(s.stop),s.line),step=number(evaluate(s.step),s.line);if(![start,stop,step].every(Number.isSafeInteger)||step===0)throw new CodeError('range precisa de inteiros e passo diferente de zero.',s.line);let iterations=0;for(let i=start;step>0?i<stop:i>stop;i+=step){if(returned!==undefined)break;if(++iterations>64)throw new CodeError('Laço passou de 64 repetições.',s.line);locals.set(s.name,i);block(s.body);}break;}
 }}
 block(program.body);if(returned===undefined)throw new CodeError('A função precisa devolver um resultado com return.');return structuredClone(returned);
}
export function compileCode(source:string,name:string):Rule{const program=parseCode(source,name);return input=>executeCode(program,input);}
