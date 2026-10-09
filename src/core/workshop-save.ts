import type {FunctionName,Mission} from './arcade-engine';
import {FUNCTION_NAMES} from './arcade-engine';
import type {StoragePort} from './progress';
export type Sources=Record<FunctionName,string>;
export const SOURCES_KEY='rota-do-codigo:workshop:sources:v4';
export function starterSources(missions:Mission[]):Sources{return Object.fromEntries(missions.slice(0,5).map(m=>[m.functionName,m.starter])) as Sources;}
export function loadSources(storage:StoragePort|undefined,missions:Mission[]):Sources{
 const fallback=starterSources(missions);try{const raw=JSON.parse(storage?.getItem(SOURCES_KEY)??'null');if(raw?.version!==4||!raw.sources||typeof raw.sources!=='object')return fallback;for(const n of FUNCTION_NAMES)if(typeof raw.sources[n]==='string'&&raw.sources[n].length<=6000)fallback[n]=raw.sources[n];}catch{/* Preserve a oficina na sessão. */}return fallback;
}
export function saveSources(storage:StoragePort|undefined,sources:Sources):boolean{try{if(!storage)return false;storage.setItem(SOURCES_KEY,JSON.stringify({version:4,sources}));return true;}catch{return false;}}
export function resetSources(storage:StoragePort|undefined):void{try{storage?.removeItem(SOURCES_KEY);}catch{/* A sessão continua. */}}
