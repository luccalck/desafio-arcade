import { describe, it, expect } from 'vitest';
import { validateContent } from '../../src/content/validate';
import data from '../../src/content/levels.json';
describe('conteúdo publicado', () => {
  it('carrega JSON completo com soluções executáveis', () => expect(validateContent(data)).toHaveLength(3));
  it('rejeita estrutura sem campos obrigatórios', () => expect(() => validateContent({levels:[{id:'incompleto'}]})).toThrow(/esquema/i));
  it('rejeita linhas de larguras diferentes', () => {const bad=structuredClone(data); bad.levels[0].grid[0]='##'; expect(()=>validateContent(bad)).toThrow(/retangular/i);});
  it('rejeita destino em parede', () => {const bad=structuredClone(data); bad.levels[0].goal={x:0,y:0}; expect(()=>validateContent(bad)).toThrow(/destino/i);});
  it('rejeita IDs duplicados', () => {const bad=structuredClone(data); bad.levels[1].id=bad.levels[0].id; expect(()=>validateContent(bad)).toThrow(/duplicado/i);});
  it('rejeita solução que não conclui o mapa', () => {const bad=structuredClone(data); bad.levels[0].solution=[{kind:'left'}]; expect(()=>validateContent(bad)).toThrow(/solução/i);});
  it('rejeita conteúdo inicial que excede limites', () => {const bad=structuredClone(data); bad.levels[1].maxBlocks=1; expect(()=>validateContent(bad)).toThrow(/blocos/i);});
});
