import {describe,it,expect} from 'vitest';
import data from '../../src/content/missions.json';
import {validateContent} from '../../src/content/validate';
const copy=()=>structuredClone(data);
describe('conteúdo da oficina',()=>{
 it('seis missões e referências válidas',()=>expect(validateContent(data)).toHaveLength(6));
 it.each([null,{},'JSON',[1]])('entrada inválida %s',value=>expect(()=>validateContent(value)).toThrow());
 it('campo desconhecido',()=>{const d=copy();Object.assign(d.missions[0],{extra:true});expect(()=>validateContent(d)).toThrow();});
 it('meta inventada',()=>{const d=copy();d.missions[0].cases[0].expected=5;expect(()=>validateContent(d)).toThrow(/Resultado/);});
 it('referência errada',()=>{const d=copy();d.missions[1].reference=d.missions[1].starter;expect(()=>validateContent(d)).toThrow(/Referência/);});
 it('starter já resolvido',()=>{const d=copy();d.missions[0].starter=d.missions[0].reference;expect(()=>validateContent(d)).toThrow(/Starter/);});
 it('IDs repetidos',()=>{const d=copy();d.missions[1].id=d.missions[0].id;expect(()=>validateContent(d)).toThrow(/IDs/);});
 it('ordem errada',()=>{const d=copy();d.missions.reverse();expect(()=>validateContent(d)).toThrow(/Ordem/);});
 it('casos insuficientes',()=>{const d=copy();d.missions[1].cases=[];expect(()=>validateContent(d)).toThrow(/Casos/);});
 it('campo de entrada estranho',()=>{const d=copy();Object.assign(d.missions[1].cases[0].input,{invasao:1});expect(()=>validateContent(d)).toThrow();});
 it('zero obrigatório na onda',()=>{const d=copy();d.missions[4].cases[0]={label:'dois',input:{quantidade:2},expected:[40,120]};expect(()=>validateContent(d)).toThrow(/zero/);});
 it('final não tem sexta função artificial',()=>{const d=copy();d.missions[5].starter='return 0;';expect(()=>validateContent(d)).toThrow(/cinco funções/);});
});
