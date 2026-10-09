import {CodeError} from './code-types';
import type {Expr,Input,Program,Rule,Stmt,Value} from './code-types';
import {parseCode} from './code-parser';
interface Binding {value:Value;constant:boolean}
export function executeCode(program:Program,input:Input):Value{
 const incoming=structuredClone(input),scopes:Map<string,Binding>[]=[new Map()];let steps=0,returned:Value|undefined;
 const check=(line:number)=>{if(++steps>2000)throw new CodeError('Execução excedeu 2000 operações. Reveja o laço.',line);};
 const binding=(id:string,line:number)=>{for(let i=scopes.length-1;i>=0;i--){const b=scopes[i].get(id);if(b)return b;}throw new CodeError(`Variável “${id}” não foi criada.`,line);};
 const number=(v:Value,line:number)=>{if(typeof v!=='number'||!Number.isFinite(v))throw new CodeError('Esta operação precisa de um número finito.',line);return v;};
 function binary(op:string,a:Value,b:Value,line:number):Value{
  if(op==='===')return typeof a===typeof b&&a===b;if(op==='!==')return !(typeof a===typeof b&&a===b);
  const x=number(a,line),y=number(b,line);let result:number|boolean;
  switch(op){case '+':result=x+y;break;case '-':result=x-y;break;case '*':result=x*y;break;case '/':result=x/y;break;case '%':result=x%y;break;case '<':return x<y;case '<=':return x<=y;case '>':return x>y;case '>=':return x>=y;default:throw new CodeError('Operador não disponível.',line);}
  if(!Number.isFinite(result))throw new CodeError('Resultado não finito; confira divisão por zero.',line);return result;
 }
 function evaluate(e:Expr):Value{
  check(e.line);
  switch(e.type){
   case 'literal':return e.value;
   case 'name':return binding(e.name,e.line).value;
   case 'property':if(!Object.hasOwn(incoming,e.name))throw new CodeError(`entrada.${e.name} não existe nesta chamada.`,e.line);return incoming[e.name];
   case 'array':if(e.items.length>64)throw new CodeError('A lista aceita até 64 itens.',e.line);return e.items.map(i=>number(evaluate(i),i.line));
   case 'unary':{const value=evaluate(e.value);return e.op==='!'?!value:e.op==='-'?-number(value,e.line):number(value,e.line);}
   case 'binary':{const left=evaluate(e.left);if(e.op==='&&')return left?evaluate(e.right):left;if(e.op==='||')return left?left:evaluate(e.right);return binary(e.op,left,evaluate(e.right),e.line);}
  }
 }
 function block(body:Stmt[]){scopes.push(new Map());for(const stmt of body){if(returned!==undefined)break;statement(stmt);}scopes.pop();}
 function statement(s:Stmt){
  check(s.line);
  switch(s.type){
   case 'declare':{const scope=scopes.at(-1)!;if(scope.has(s.name))throw new CodeError(`Variável “${s.name}” já existe neste bloco.`,s.line);scope.set(s.name,{value:evaluate(s.value),constant:s.constant});break;}
   case 'assign':{const b=binding(s.name,s.line);if(b.constant)throw new CodeError('const não permite substituir o valor.',s.line);b.value=s.op==='='?evaluate(s.value):binary(s.op[0],b.value,evaluate(s.value),s.line);break;}
   case 'push':{const b=binding(s.name,s.line);if(!Array.isArray(b.value))throw new CodeError('push precisa de uma lista.',s.line);if(b.value.length>=64)throw new CodeError('A lista aceita até 64 itens.',s.line);b.value.push(number(evaluate(s.value),s.line));break;}
   case 'return':returned=evaluate(s.value);break;
   case 'if':block(evaluate(s.condition)?s.yes:s.no);break;
   case 'for':{scopes.push(new Map());statement(s.init);let iterations=0;while(returned===undefined&&evaluate(s.condition)){if(++iterations>64)throw new CodeError('Laço passou de 64 repetições. Confira o contador.',s.line);block(s.body);if(returned===undefined)statement(s.update);}scopes.pop();break;}
  }
 }
 for(const s of program.body){if(returned!==undefined)break;statement(s);}
 if(returned===undefined)throw new CodeError('A função precisa devolver um resultado com return.');return structuredClone(returned);
}
export function compileCode(source:string,name:string):Rule{const program=parseCode(source,name);return input=>executeCode(program,input);}
