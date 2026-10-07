export const PROGRESS_KEY='rota-do-codigo:lab:v2';
export interface StoragePort {getItem(key:string):string|null;setItem(key:string,value:string):void;removeItem(key:string):void}
export function parseProgress(raw:string|null,ids:string[]):string[]{
  if(!raw)return [];
  try{
    const value=JSON.parse(raw);
    if(!value||value.version!==2||!Array.isArray(value.completed)||value.completed.length>ids.length)return [];
    if(value.completed.some((id:unknown,i:number)=>id!==ids[i]))return [];
    return [...value.completed];
  }catch{return [];}
}
export function completeMission(completed:string[],id:string,ids:string[]):string[]{
  if(ids[completed.length]!==id)return [...completed];
  return [...completed,id];
}
export function loadProgress(storage:StoragePort|undefined,ids:string[]):string[]{
  try{return parseProgress(storage?.getItem(PROGRESS_KEY)??null,ids);}catch{return [];}
}
export function saveProgress(storage:StoragePort|undefined,completed:string[]):boolean{
  if(!storage)return false;
  try{storage.setItem(PROGRESS_KEY,JSON.stringify({version:2,completed}));return true;}catch{return false;}
}
export function resetProgress(storage:StoragePort|undefined):void{
  try{storage?.removeItem(PROGRESS_KEY);}catch{/* A sessão pode continuar em memória. */}
}
