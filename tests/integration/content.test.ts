import {describe,it,expect} from 'vitest';
import source from '../../src/content/missions.json';
import {validateContent} from '../../src/content/validate';
const fresh=()=>structuredClone(source);
describe('conteúdo educativo integrado ao interpretador',()=>{
 it('seis missões, exemplos e todos cenários têm solução real',()=>expect(validateContent(source)).toHaveLength(6));
 it('JSON sem campanha é bloqueado',()=>expect(()=>validateContent({})).toThrow(/JSON/));
 it('campo não autorizado é bloqueado',()=>expect(()=>validateContent({...source,extra:1})).toThrow(/JSON/));
 it('ordem dos conceitos é validada',()=>{const d=fresh();[d.missions[0],d.missions[1]]=[d.missions[1],d.missions[0]];expect(()=>validateContent(d)).toThrow(/Ordem/);});
 it('ID de missão duplicado é rejeitado',()=>{const d=fresh();d.missions[1].id=d.missions[0].id;expect(()=>validateContent(d)).toThrow(/duplicados/);});
 it('programa sem leitura não passa',()=>{const d=fresh();d.missions[0].solution.pop();expect(()=>validateContent(d)).toThrow(/Solução/);});
 it('contador final não é inventado',()=>{const d=fresh();d.missions[5].scenarios[0].targetCount=7;expect(()=>validateContent(d)).toThrow(/contador/);});
 it('lote não excede oito itens',()=>{const d=fresh();d.missions[4].scenarios[0].packets=Array.from({length:9},(_,i)=>({id:`p${i}`,valid:true,permission:true}));expect(()=>validateContent(d)).toThrow(/JSON/);});
 it('pacotes precisam de IDs únicos',()=>{const d=fresh();d.missions[4].scenarios[0].packets[1].id=d.missions[4].scenarios[0].packets[0].id;expect(()=>validateContent(d)).toThrow(/pacote/);});
 it('final exige três casos, inclusive zero',()=>{const d=fresh();d.missions[5].scenarios.pop();expect(()=>validateContent(d)).toThrow(/três/);});
 it('exemplo é executado, não apenas ilustrado',()=>{const d=fresh();d.missions[0].demo.program.pop();expect(()=>validateContent(d)).toThrow(/Exemplo/);});
 it('solução que autoriza tudo falha em cenário sem credencial',()=>{const d=fresh();d.missions[3].solution=[{kind:'action',action:'allow'}];expect(()=>validateContent(d)).toThrow(/Solução/);});
 it('alteração de valores de entrada exige meta coerente',()=>{const d=fresh();d.missions[1].scenarios[0].charge=8;expect(()=>validateContent(d)).toThrow(/energia/);});
});
