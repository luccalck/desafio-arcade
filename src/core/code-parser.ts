import {CodeError} from './code-types';
import type {Expr,Program,Stmt} from './code-types';
interface Token {value:string;kind:'name'|'number'|'string'|'symbol'|'newline'|'indent'|'dedent'|'end';line:number}
const forbidden=new Set(['entrada','range','constructor','prototype','__proto__','False','None','True','and','as','assert','async','await','break','class','continue','def','del','elif','else','except','finally','for','from','global','if','import','in','is','lambda','nonlocal','not','or','pass','raise','return','try','while','with','yield']);
function lex(source:string):Token[]{
 if(source.length>6000)throw new CodeError('Use até 6000 caracteres nesta função.');
 const tokens:Token[]=[],indents=[0],lines=source.replaceAll('\r\n','\n').split('\n');
 const rx=/"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[a-zA-Z_][\w]*|==|!=|<=|>=|\+=|-=|\*=|\/=|\/\/|[()[\]:.,+\-*/%<>=]/gy;
 for(let n=0;n<lines.length;n++){
  const line=n+1,raw=lines[n];if(/^\s*(?:#.*)?$/.test(raw))continue;
  const whitespace=raw.match(/^\s*/)?.[0]||'';if(whitespace.includes('\t'))throw new CodeError('Use espaços para indentação; Tab no editor insere quatro espaços.',line);
  const indent=whitespace.length,last=indents.at(-1)!;
  if(indent>last){indents.push(indent);tokens.push({value:'',kind:'indent',line});}
  else if(indent<last){while(indent<indents.at(-1)!){indents.pop();tokens.push({value:'',kind:'dedent',line});}if(indent!==indents.at(-1))throw new CodeError('indentação não corresponde a um bloco anterior.',line);}
  let p=indent;while(p<raw.length){if(raw[p]==='#')break;if(raw[p]===' '||raw[p]==='\t'){p++;continue;}rx.lastIndex=p;const m=rx.exec(raw);if(!m)throw new CodeError(`Símbolo não reconhecido: ${raw[p]}`,line);const value=m[0];tokens.push({value,kind:/^["']/.test(value)?'string':/^\d/.test(value)?'number':/^[a-zA-Z_]/.test(value)?'name':'symbol',line});p=rx.lastIndex;}
  tokens.push({value:'',kind:'newline',line});
 }
 while(indents.length>1){indents.pop();tokens.push({value:'',kind:'dedent',line:lines.length});}
 tokens.push({value:'',kind:'end',line:lines.length});return tokens;
}
function stringValue(raw:string,line:number):string{
 const inner=raw.slice(1,-1);let out='';
 for(let i=0;i<inner.length;i++){if(inner[i]!=='\\'){out+=inner[i];continue;}const c=inner[++i],escapes:Record<string,string>={n:'\n',r:'\r',t:'\t','\\':'\\',"'":"'",'"':'"'};
  if(c==='u'&&/^[0-9a-fA-F]{4}$/.test(inner.slice(i+1,i+5))){out+=String.fromCharCode(parseInt(inner.slice(i+1,i+5),16));i+=4;}
  else if(Object.hasOwn(escapes,c))out+=escapes[c];else throw new CodeError('Escape de texto não disponível no modo iniciante.',line);
 }return out;
}
export function parseCode(source:string,expectedName:string):Program{
 const tokens=lex(source);let p=0,nodes=0,depth=0;
 const current=()=>tokens[p],take=()=>tokens[p++];
 const expect=(v:string)=>{if(current().value!==v)throw new CodeError(`Esperado “${v}”; encontrado “${current().value||'fim da linha'}”.`,current().line);return take();};
 const kind=(k:Token['kind'])=>{if(current().kind!==k)throw new CodeError(k==='indent'?'O bloco precisa de indentação com espaços.':'Uma instrução por linha; confira dois-pontos e indentação.',current().line);return take();};
 const match=(v:string)=>{if(current().value===v&&current().kind!=='end'){take();return true;}return false;};
 const name=()=>{const t=take();if(t.kind!=='name'||forbidden.has(t.value)||t.value.startsWith('__'))throw new CodeError('Nome de variável indisponível.',t.line);return t.value;};
 const count=()=>{if(++nodes>300)throw new CodeError('Função muito extensa: limite de 300 operações escritas.',current().line);};
 const enter=()=>{if(++depth>20)throw new CodeError('Muitos grupos dentro de grupos.',current().line);};
 const precedences:Record<string,number>={or:1,and:2,'+':5,'-':5,'*':6,'/':6,'//':6,'%':6};
 const comparisons=new Set(['==','!=','<','<=','>','>=']);
 function primary(allowNot=true):Expr{
  enter();count();const t=take();let result:Expr;
  if(t.value==='('){result=expression();expect(')');}
  else if(t.value==='not'||t.value==='-'||t.value==='+'){if(t.value==='not'&&!allowNot)throw new CodeError('Agrupe not entre parênteses nesta operação.',t.line);result={type:'unary',op:t.value,value:t.value==='not'?expression(3):primary(false),line:t.line};}
  else if(t.value==='['){const items:Expr[]=[];if(current().value!==']'){items.push(expression());while(match(',')){if(current().value===']')break;items.push(expression());}}expect(']');result={type:'array',items,line:t.line};}
  else if(t.kind==='number'){if(/^0[0-9]+$/.test(t.value)&&Number(t.value)!==0)throw new CodeError('Inteiro não pode começar com zeros.',t.line);const value=Number(t.value);if(!Number.isFinite(value))throw new CodeError('Número precisa ser finito.',t.line);result={type:'literal',value,line:t.line};}
  else if(t.kind==='string')result={type:'literal',value:stringValue(t.value,t.line),line:t.line};
  else if(t.value==='True'||t.value==='False')result={type:'literal',value:t.value==='True',line:t.line};
  else if(t.value==='entrada'){expect('[');const key=take();if(key.kind!=='string')throw new CodeError('Use entrada["campo"] para ler uma informação.',key.line);const property=stringValue(key.value,key.line);if(!/^[a-zA-Z][\w]*$/.test(property)||forbidden.has(property)||property.startsWith('__'))throw new CodeError('Campo de entrada indisponível.',key.line);expect(']');result={type:'property',name:property,line:t.line};}
  else if(t.kind==='name'&&!forbidden.has(t.value)&&!t.value.startsWith('__'))result={type:'name',name:t.value,line:t.line};
  else throw new CodeError('Esperado número, variável, condição ou entrada["campo"].',t.line);
  depth--;return result;
 }
 function expression(min=1):Expr{
  let left=primary(min<=3);while(true){
   if(min<=4&&comparisons.has(current().value)){const values=[left],ops:string[]=[],line=current().line;while(comparisons.has(current().value)){count();ops.push(take().value);values.push(expression(5));}left={type:'compare',values,ops,line};continue;}
   const precedence=precedences[current().value]??0;if(precedence<min)break;count();const op=take();left={type:'binary',op:op.value,left,right:expression(precedence+1),line:op.line};
  }return left;
 }
 function suite():Stmt[]{enter();expect(':');kind('newline');kind('indent');const body:Stmt[]=[];while(current().kind!=='dedent'&&current().kind!=='end')body.push(statement());if(!body.length)throw new CodeError('Escreva uma instrução dentro do bloco.',current().line);kind('dedent');depth--;return body;}
 function conditional(line:number):Stmt{const condition=expression(),yes=suite();let no:Stmt[]=[];if(match('elif')){count();no=[conditional(tokens[p-1].line)];}else if(match('else'))no=suite();return {type:'if',condition,yes,no,line};}
 function statement():Stmt{
  count();const t=current();if(match('return')){const value=expression();kind('newline');return {type:'return',value,line:t.line};}
  if(match('if'))return conditional(t.line);
  if(match('for')){const id=name();expect('in');expect('range');expect('(');const args=[expression()];while(match(',')){if(current().value===')')break;if(args.length>=3)throw new CodeError('range aceita um, dois ou três valores.',current().line);args.push(expression());}expect(')');const zero:Expr={type:'literal',value:0,line:t.line},one:Expr={type:'literal',value:1,line:t.line};return {type:'range',name:id,start:args.length===1?zero:args[0],stop:args.length===1?args[0]:args[1],step:args[2]||one,body:suite(),line:t.line};}
  const id=name();let result:Stmt;
  if(match('.')){expect('append');expect('(');const value=expression();expect(')');result={type:'push',name:id,value,line:t.line};}
  else{const op=take();if(!['=','+=','-=','*=','/='].includes(op.value))throw new CodeError('Use atribuição; chamadas livres não estão disponíveis.',op.line);result={type:'assign',name:id,op:op.value,value:expression(),line:t.line};}
  kind('newline');return result;
 }
 expect('def');const f=take();if(f.kind!=='name'||f.value!==expectedName||!/^[a-zA-Z][\w]*$/.test(expectedName))throw new CodeError(`Mantenha o nome da função: ${expectedName}.`,f.line);
 expect('(');expect('entrada');expect(')');const body=suite();if(current().kind!=='end')throw new CodeError('Escreva somente a função desta missão.',current().line);return {name:expectedName,body};
}
