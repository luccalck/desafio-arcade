export type Kind='source'|'sink'|'relay'|'add'|'multiply'|'filter'|'buffer';
export type Predicate='valid'|'permission'|'credentials'|'energy'|'maintenance'|'countMet'|'batchDone';
export type Mode='connection'|'transform'|'filter'|'boolean'|'buffer'|'final';
export interface Config {value?:number;a?:Predicate;b?:Predicate;op?:'single'|'and'|'or';c?:Predicate;outer?:'and'|'or';third?:boolean;invert?:boolean}
export interface Node {id:string;kind:Kind;x:number;y:number;rotation:number;config:Config}
export interface Edge {from:string;port:string;to:string}
export interface Layout {nodes:Node[];edges:Edge[]}
export interface Packet {id:string;value:number;valid:boolean;permission:boolean;credentials:boolean;energy:boolean;maintenance:boolean}
export interface Output {id:string;sink:string;value:number}
export interface Case {id:string;label:string;packets:Packet[];expected:Output[];target:number}
export interface Mission {id:string;title:string;concept:string;goal:string;help:string;reward:number;mode:Mode;budget:number;maxSpan:number;blocked:{x:number;y:number}[];available:Kind[];parameters:{add:number[];multiply:number[]};predicates:Predicate[];fixed:Node[];cases:Case[];solutions:Layout[]}
export interface Event {node:string;packet:Packet;from?:string;port?:string}
export interface Trace {tick:number;node:string;packet:string;before:number;after:number;port?:string;message:string}
export interface CircuitState {status:'running'|'won'|'failed';tick:number;queue:Event[];held:Record<string,Packet[]>;count:number;batchDone:boolean;outputs:Output[];active:string;lastPacket:Packet|null;lastEdge:Edge|null;fault:string;message:string;trace:Trace[]}
