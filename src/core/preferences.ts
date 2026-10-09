import type {StoragePort} from './progress';
export const SETTINGS_KEY='rota-do-codigo:settings:v1';
export interface Preferences {reduced:boolean;largeText:boolean}
export function parsePreferences(raw:string|null):Preferences{
 try{const value=JSON.parse(raw??'null');if(value&&value.version===1&&typeof value.reduced==='boolean'&&typeof value.largeText==='boolean')return {reduced:value.reduced,largeText:value.largeText};}catch{/* Padrões locais quando dado inválido. */}
 return {reduced:false,largeText:false};
}
export function loadPreferences(storage:StoragePort|undefined):Preferences{try{return parsePreferences(storage?.getItem(SETTINGS_KEY)??null);}catch{return parsePreferences(null);}}
export function savePreferences(storage:StoragePort|undefined,value:Preferences):boolean{try{if(!storage)return false;storage.setItem(SETTINGS_KEY,JSON.stringify({version:1,...value}));return true;}catch{return false;}}
