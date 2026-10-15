export type Value=number|string|boolean|number[];
export type Input=Record<string,Value>;
export type Rule=(input:Input)=>Value;
export type Expr=
 | {type:'literal';value:number|string|boolean;line:number}
 | {type:'name';name:string;line:number}
 | {type:'property';name:string;line:number}
 | {type:'array';items:Expr[];line:number}
 | {type:'unary';op:string;value:Expr;line:number}
 | {type:'binary';op:string;left:Expr;right:Expr;line:number}
 | {type:'compare';values:Expr[];ops:string[];line:number};
export type Stmt=
 | {type:'assign';name:string;op:string;value:Expr;line:number}
 | {type:'push';name:string;value:Expr;line:number}
 | {type:'return';value:Expr;line:number}
 | {type:'if';condition:Expr;yes:Stmt[];no:Stmt[];line:number}
 | {type:'range';name:string;start:Expr;stop:Expr;step:Expr;body:Stmt[];line:number};
export interface Program {name:string;body:Stmt[]}
export class CodeError extends Error {
 constructor(message:string,public line=1){super(`Linha ${line}: ${message}`);this.name='CodeError';}
}
