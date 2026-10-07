import {describe,it,expect} from 'vitest';
import {parseProgress,completeMission,loadProgress,saveProgress,resetProgress,PROGRESS_KEY} from '../../src/core/progress';
const ids=['dados','firmware','circuito','automacao','lotes','final'];
describe('campanha local',()=>{
 it('primeira missão concede um marco',()=>expect(completeMission([],ids[0],ids)).toEqual(['dados']));
 it('revisitar não aumenta XP',()=>expect(completeMission(['dados'],'dados',ids).length*100).toBe(100));
 it('missão bloqueada não completa',()=>expect(completeMission([],'circuito',ids)).toEqual([]));
 it('missão desconhecida não completa',()=>expect(completeMission([],'outra',ids)).toEqual([]));
 it('campanha completa contém seis marcos',()=>expect(ids.reduce((p,id)=>completeMission(p,id,ids),[] as string[])).toEqual(ids));
 it('não modifica lista anterior',()=>{const before=['dados'];completeMission(before,'firmware',ids);expect(before).toEqual(['dados']);});
 it('JSON válido restaura prefixo da campanha',()=>expect(parseProgress(JSON.stringify({version:2,completed:['dados','firmware']}),ids)).toEqual(['dados','firmware']));
 it.each(['{invalid','null','{}',JSON.stringify({version:1,completed:ids}),JSON.stringify({version:2,completed:['circuito']}),JSON.stringify({version:2,completed:['dados','dados']}),JSON.stringify({version:2,completed:['dados','outra']})])('dados inválidos têm fallback: %s',raw=>expect(parseProgress(raw,ids)).toEqual([]));
 it('sem armazenamento carrega vazio',()=>expect(loadProgress(undefined,ids)).toEqual([]));
 it('erro de leitura não quebra a partida',()=>expect(loadProgress({getItem(){throw Error('indisponível');},setItem(){},removeItem(){}},ids)).toEqual([]));
 it('erro de escrita mantém fallback',()=>expect(saveProgress({getItem(){return null;},setItem(){throw Error('quota');},removeItem(){}},['dados'])).toBe(false));
 it('reset só remove chave do jogo',()=>{const removed:string[]=[];resetProgress({getItem(){return null;},setItem(){},removeItem(k){removed.push(k);}});expect(removed).toEqual([PROGRESS_KEY]);});
 it('reset sem armazenamento é seguro',()=>expect(()=>resetProgress(undefined)).not.toThrow());
});
