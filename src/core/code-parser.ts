import {CodeError} from './code-types';
import type {Expr,Program,Stmt} from './code-types';
interface Token {value:string;kind:'name'|'number'|'string'|'symbol'|'end';line:number}
const forbidden=new Set(['entrada','constructor','prototype','__proto__','function','return','for','if','else','let','const','true','false','break','case','catch','class','continue','debugger','default','delete','do','export','extends','finally','import','in','instanceof','new','null','super','switch','this','throw','try','typeof','var','void','while','with','yield','await','enum','implements','interface','package','private','protected','public','static']);
function lex(source:string):Token[]{
 if(source.length>6000)throw new CodeError('Use até 6000 caracteres nesta função.');
 const rx=/\s+|\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[a-zA-Z_$][\w$]*|===|!==|<=|>=|&&|\|\||\+\+|--|\+=|-=|\*=|\/=|[{}()[\];.,+\-*/%<>=!]/gy;
 const result:Token[]=[];let position=0,line=1;
 while(position<source.length){rx.lastIndex=position;const match=rx.exec(source);if(!match)throw new CodeError(`Símbolo não reconhecido: ${source[position]}`,line);const value=match[0];
  if(!/^\s|^\/\//.test(value)&&!value.startsWith('/*'))result.push({value,line,kind:/^["']/.test(value)?'string':/^\d/.test(value)?'number':/^[a-zA-Z_$]/.test(value)?'name':'symbol'});
  line+=(value.match(/\n/g)||[]).length;position=rx.lastIndex;
 }
 result.push({value:'',kind:'end',line});return result;
}
function stringValue(raw:string,line:number):string{
 const inner=raw.slice(1,-1);let out='';
 for(let i=0;i<inner.length;i++){if(inner[i]!=='\\'){out+=inner[i];continue;}const c=inner[++i];const escapes:Record<string,string>={n:'\n',r:'\r',t:'\t','\\':'\\',"'":"'",'"':'"'};
  if(c==='u'&&/^[0-9a-fA-F]{4}$/.test(inner.slice(i+1,i+5))){out+=String.fromCharCode(parseInt(inner.slice(i+1,i+5),16));i+=4;}
  else if(Object.hasOwn(escapes,c))out+=escapes[c];else throw new CodeError('Escape de texto não disponível no modo iniciante.',line);
 }return out;
}
export function parseCode(source:string,expectedName:string):Program{
 const tokens=lex(source);let p=0,nodes=0,depth=0;
 const current=()=>tokens[p],take=()=>tokens[p++];
 const expect=(v:string)=>{if(current().value!==v)throw new CodeError(`Esperado “${v}”; encontrado “${current().value||'fim do código'}”.`,current().line);return take();};
 const match=(v:string)=>{if(current().value===v){take();return true;}return false;};
 const name=()=>{const t=take();if(t.kind!=='name'||forbidden.has(t.value)||t.value.startsWith('__'))throw new CodeError('Nome de variável indisponível.',t.line);return t.value;};
 const count=()=>{if(++nodes>300)throw new CodeError('Função muito extensa: limite de 300 operações escritas.',current().line);};
 const enter=()=>{if(++depth>20)throw new CodeError('Muitos grupos dentro de grupos.',current().line);};
 const precedences:Record<string,number>={'||':1,'&&':2,'===':3,'!==':3,'<':4,'<=':4,'>':4,'>=':4,'+':5,'-':5,'*':6,'/':6,'%':6};
 function primary():Expr{
  enter();count();const t=take();let result:Expr;
  if(t.value==='('){result=expression();expect(')');}
  else if(['!','-','+'].includes(t.value)){result={type:'unary',op:t.value,value:primary(),line:t.line};}
  else if(t.value==='['){const items:Expr[]=[];if(current().value!==']'){do{items.push(expression());}while(match(','));}expect(']');result={type:'array',items,line:t.line};}
  else if(t.kind==='number'){const value=Number(t.value);if(!Number.isFinite(value))throw new CodeError('Número precisa ser finito.',t.line);result={type:'literal',value,line:t.line};}
  else if(t.kind==='string')result={type:'literal',value:stringValue(t.value,t.line),line:t.line};
  else if(t.value==='true'||t.value==='false')result={type:'literal',value:t.value==='true',line:t.line};
  else if(t.value==='entrada'){expect('.');const property=name();result={type:'property',name:property,line:t.line};}
  else if(t.kind==='name'&&!forbidden.has(t.value)&&!t.value.startsWith('__'))result={type:'name',name:t.value,line:t.line};
  else throw new CodeError('Esperado número, variável, condição ou entrada.campo.',t.line);
  depth--;return result;
 }
 function expression(min=1):Expr{
  let left=primary();while((precedences[current().value]??0)>=min){count();const op=take();left={type:'binary',op:op.value,left,right:expression(precedences[op.value]+1),line:op.line};}return left;
 }
 function assignment(end:boolean):Stmt{
  const t=current(),id=name();let result:Stmt;
  if(match('.')){expect('push');expect('(');const value=expression();expect(')');result={type:'push',name:id,value,line:t.line};}
  else{const op=take();if(op.value==='++'||op.value==='--')result={type:'assign',name:id,op:op.value==='++'?'+=':'-=',value:{type:'literal',value:1,line:t.line},line:t.line};
   else{if(!['=','+=','-=','*=','/='].includes(op.value))throw new CodeError('Use atribuição ou incremento; chamadas livres não estão disponíveis.',op.line);result={type:'assign',name:id,op:op.value,value:expression(),line:t.line};}}
  if(end)expect(';');return result;
 }
 function declaration(end:boolean):Stmt{
  const t=take(),id=name();expect('=');const value=expression();if(end)expect(';');return {type:'declare',name:id,value,constant:t.value==='const',line:t.line};
 }
 function block():Stmt[]{enter();expect('{');const statements:Stmt[]=[];while(current().value!=='}'){if(current().kind==='end')throw new CodeError('Feche o bloco com “}”.',current().line);statements.push(statement());}expect('}');depth--;return statements;}
 function statement():Stmt{
  count();const t=current();if(t.value==='let'||t.value==='const')return declaration(true);
  if(match('return')){const value=expression();expect(';');return {type:'return',value,line:t.line};}
  if(match('if')){expect('(');const condition=expression();expect(')');const yes=block();let no:Stmt[]=[];if(match('else'))no=current().value==='if'?[statement()]:block();return {type:'if',condition,yes,no,line:t.line};}
  if(match('for')){expect('(');if(current().value!=='let')throw new CodeError('Comece o laço com let.',current().line);const init=declaration(true),condition=expression();expect(';');const update=assignment(false);if(update.type!=='assign')throw new CodeError('O laço precisa atualizar seu contador.',t.line);expect(')');return {type:'for',init,condition,update,body:block(),line:t.line};}
  return assignment(true);
 }
 expect('function');const functionName=take();if(functionName.kind!=='name'||functionName.value!==expectedName||!/^[a-zA-Z][\w]*$/.test(expectedName))throw new CodeError(`Mantenha o nome da função: ${expectedName}.`,functionName.line);
 expect('(');expect('entrada');expect(')');const body=block();if(current().kind!=='end')throw new CodeError('Escreva somente a função desta missão.',current().line);
 return {name:expectedName,body};
}
