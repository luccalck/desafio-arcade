import {it,expect} from 'vitest';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {compileCode} from '../../src/core/code-runtime';
import {parseCode} from '../../src/core/code-parser';
import {printCode} from '../../src/core/code-print';
const data=JSON.parse(readFileSync('src/content/missions.json','utf8'));
for(const mission of data.missions.slice(0,5))it(`semântica JavaScript nativa/editorial e exportada: ${mission.functionName}`,()=>{
 const interpreted=compileCode(mission.reference,mission.functionName),canonical=printCode(parseCode(mission.reference,mission.functionName));
 for(const c of mission.cases){const original=vm.runInNewContext(`(${mission.reference})(${JSON.stringify(c.input)})`,{}, {timeout:100}),exported=vm.runInNewContext(`(${canonical})(${JSON.stringify(c.input)})`,{}, {timeout:100});expect(JSON.stringify(interpreted(c.input))).toBe(JSON.stringify(original));expect(JSON.stringify(exported)).toBe(JSON.stringify(original));}
});
it('emissão não transporta comentários ou fechamento de script',()=>{const text=printCode(parseCode('function regra(entrada){ /* </script> */ return "</script>"; }','regra'));expect(text).not.toContain('</script>');expect(vm.runInNewContext(`(${text})({})`,{},{timeout:100})).toBe('</script>');});
it('for exportado tem guarda de segurança',()=>{const text=printCode(parseCode('function regra(entrada){for(let i=0;i<100;i--){let x=i;}return 1;}','regra'));expect(()=>vm.runInNewContext(`(${text})({})`,{},{timeout:100})).toThrow(/Limite/);});
