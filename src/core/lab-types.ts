export type Action = 'power'|'sensor'|'read'|'report'|'charge'|'process'|'resetCount'|'count'|'send'|'review'|'allow'|'deny'|'release'|'hold';
export type Predicate = 'valid'|'permission'|'credentials'|'enoughEnergy'|'maintenance'|'countMet'|'lotDone';
export type Expr = {kind:'predicate';name:Predicate}|{kind:'and'|'or';left:Expr;right:Expr};
export type ActionBlock = {kind:'action';action:Action};
export type IfBlock = {kind:'if';condition:Expr;then:ActionBlock[];else:ActionBlock[]};
export type Block = ActionBlock|IfBlock|{kind:'foreach';body:(ActionBlock|IfBlock)[]};
export interface Packet {id:string;valid:boolean;permission:boolean}
export interface Scenario {id:string;label:string;energy:number;charge:number;cost:number;targetEnergy:number;packets:Packet[];credentials:boolean;maintenance:boolean;targetCount:number}
export type Mode = 'sequence'|'variables'|'conditions'|'boolean'|'loop'|'final';
export interface Mission {
 id:string;title:string;concept:string;icon:string;reward:number;mode:Mode;goal:string;brief:string;
 lessons:{title:string;text:string}[];hints:string[];actions:Action[];predicates:Predicate[];
 hasIf:boolean;hasLoop:boolean;hasGroup:boolean;maxBlocks:number;solution:Block[];initialPractice:Block[];
 demo:{scenario:Scenario;program:Block[]};practice:Scenario[];scenarios:Scenario[];
}
export interface Instruction {kind:'action'|'condition'|'foreach'|'packet'|'end';path:string;action?:Action;condition?:Expr;yes?:ActionBlock[];no?:ActionBlock[];body?:(ActionBlock|IfBlock)[];packetIndex?:number}
export interface Trace {path:string;message:string;before:{energy:number;count:number|null};after:{energy:number;count:number|null};branch?:boolean}
export interface LabState {
 status:'running'|'won'|'failed';message:string;steps:number;queue:Instruction[];trace:Trace[];activePath:string;
 energy:number;charges:number;operations:number;powered:boolean;sensorOn:boolean;reading:number|null;reported:boolean;
 count:number|null;current:number|null;routes:Record<string,'send'|'review'>;counted:string[];lotDone:boolean;
 decision:boolean|null;released:boolean;held:boolean;gateVerified:boolean;
}
