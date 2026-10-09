import type {Expr,Program,Stmt} from './code-types';
export function printCode(program:Program):string{
 const literal=(v:number|string|boolean)=>JSON.stringify(v).replaceAll('<','\\u003c');
 function expr(e:Expr):string{switch(e.type){case 'literal':return literal(e.value);case 'name':return e.name;case 'property':return `entrada.${e.name}`;case 'array':return `[${e.items.map(expr).join(', ')}]`;case 'unary':return `(${e.op}${expr(e.value)})`;case 'binary':return `(${expr(e.left)} ${e.op} ${expr(e.right)})`;}}
 let serial=0;
 function stmt(s:Stmt):string{switch(s.type){case 'declare':return `${s.constant?'const':'let'} ${s.name} = ${expr(s.value)};`;case 'assign':return `${s.name} ${s.op} ${expr(s.value)};`;case 'push':return `${s.name}.push(${expr(s.value)});`;case 'return':return `return ${expr(s.value)};`;case 'if':return `if (${expr(s.condition)}) {\n${s.yes.map(stmt).join('\n')}\n}${s.no.length?` else {\n${s.no.map(stmt).join('\n')}\n}`:''}`;case 'for':{const id=++serial;return `{let __iterations${id}=0; for (${stmt(s.init)} ${expr(s.condition)}; ${stmt(s.update).slice(0,-1)}) {if (++__iterations${id}>64) throw new Error('Limite de repetição');\n${s.body.map(stmt).join('\n')}\n}}`;}}}
 const body=program.body.map(stmt).join('\n').replaceAll('if (++__iterations','if (++__steps>2000) throw new Error("Limite de operações"); if (++__iterations');
 return `function ${program.name}(entrada) {\nlet __steps=0;\n${body}\n}`;
}
