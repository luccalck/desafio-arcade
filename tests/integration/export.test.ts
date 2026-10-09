import {it,expect} from 'vitest';
import data from '../../src/content/missions.json';
import type {Mission} from '../../src/core/arcade-engine';
import type {Sources} from '../../src/core/workshop-save';
import {createProjectHTML} from '../../src/scenes/export';
const missions=data.missions as Mission[],sources=Object.fromEntries(missions.slice(0,5).map(m=>[m.functionName,m.reference])) as Sources;
it('export contém funções JavaScript validadas e player local',()=>{const html=createProjectHTML(sources,missions,'/* player confiável */','MIT License');expect(html).toContain('function controlar');expect(html).toContain('window.__PROJECT_RULES__');expect(html).not.toContain('src="http');expect(html).toContain('licença MIT');});
it('export bloqueia regra que falha em entradas públicas',()=>expect(()=>createProjectHTML({...sources,colidir:missions[2].starter},missions,'','MIT License')).toThrow(/Valide/));
it('comentário do editor não fecha script exportado',()=>{const html=createProjectHTML({...sources,controlar:sources.controlar.replace('{','{ /* </script><script>alert(1)</script> */')},missions,'','MIT License');expect((html.match(/<script>/g)||[]).length).toBe(1);expect(html).not.toContain('alert(1)');});
