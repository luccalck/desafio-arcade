export type Value=number|string|boolean|number[];
export type Input=Record<string,Value>;
export type Rule=(input:Input)=>Value;
export type Expr=
 | {type:'literal';value:number|string|boolean;line:number}
 | {type:'name';name:string;line:number}
 | {type:'property';name:string;line:number}
 | {type:'array';items:Expr[];line:number}
 | {type:'unary';op:string;value:Expr;line:number}
 | {type:'binary';op:string;left:Expr;right:Expr;line:number};
export type Stmt=
 | {type:'declare';name:string;value:Expr;constant:boolean;line:number}
 | {type:'assign';name:string;op:string;value:Expr;line:number}
 | {type:'push';name:string;value:Expr;line:number}
 | {type:'return';value:Expr;line:number}
 | {type:'if';condition:Expr;yes:Stmt[];no:Stmt[];line:number}
 | {type:'for';init:Stmt;condition:Expr;update:Stmt;body:Stmt[];line:number};
export interface Program {name:string;body:Stmt[]}
export class CodeError extends Error {
 constructor(message:string,public line=1){super(`Linha ${line}: ${message}`);this.name='CodeError';}
}
