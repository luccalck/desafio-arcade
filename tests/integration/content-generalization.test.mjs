import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {validateContent} from '../../src/content/validate';
import {compileCode,executeCode} from '../../src/core/code-runtime';
import {createProjectHTML,createPythonSource} from '../../src/scenes/export';
const data=JSON.parse(readFileSync('src/content/missions.json','utf8'));
const copy=()=>structuredClone(data);
// Soluções editoriais alternativas: não são preenchidas automaticamente no jogo.
const alternatives={
 controlar:'def controlar(entrada):\n    if entrada["direita"]:\n        return 1\n    elif entrada["esquerda"]:\n        return -1\n    return 0',
 mover:'def mover(entrada):\n    return entrada["velocidade"] * entrada["direcao"] + entrada["posicao"]',
 colidir:'def colidir(entrada):\n    return not entrada["distancia"] > entrada["raio"]',
 pontuar:'def pontuar(entrada):\n    bonus = 0\n    if entrada["tipo"] == "cristal":\n        bonus = 10\n    elif entrada["tipo"] == "estrela":\n        bonus = 25\n    return entrada["pontos"] + bonus',
 criarOnda:'def criarOnda(entrada):\n    posicoes = []\n    for posicao in range(40, 40 + 80 * entrada["quantidade"], 80):\n        posicoes.append(posicao)\n    return posicoes',
};
const extra={
 mover:[{input:{posicao:10.5,direcao:-1,velocidade:0.5},expected:10}],
 colidir:[{input:{distancia:10,raio:10},expected:true},{input:{distancia:10.01,raio:10},expected:false}],
 pontuar:[{input:{pontos:42,tipo:'desconhecido'},expected:42}],
 criarOnda:[{input:{quantidade:2},expected:[40,120]},{input:{quantidade:4},expected:[40,120,200,280]}],
};
it('aceita soluções Python alternativas sem exigir igualdade com a referência editorial',()=>{
 const d=copy();for(const m of d.missions.slice(0,5))m.reference=alternatives[m.functionName];
 expect(validateContent(d)).toHaveLength(6);
});
it('preserva soluções alternativas e casos de transferência no AST, HTML exportado e CPython',()=>{
 const missions=validateContent(data),html=createProjectHTML(alternatives,missions,'','MIT License');
 const window={__RUN_PYTHON__:executeCode};
 vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],{window},{timeout:1000});
 const cases=missions.slice(0,5).flatMap(m=>[...m.cases,...(extra[m.functionName]||[])].map(c=>({name:m.functionName,input:c.input,expected:c.expected})));
 const python=createPythonSource(alternatives,missions,'MIT License');
 // Executa somente estas fixtures confiáveis; nunca código recebido de jogador.
 const native=JSON.parse(execFileSync(process.env.PYTHON_BIN||(process.platform==='win32'?'python':'python3'),['-I','-c','import json,sys\np=json.load(sys.stdin)\ns={}\nexec(p["source"],s)\nprint(json.dumps([s[c["name"]](c["input"]) for c in p["cases"]]))'],{input:JSON.stringify({source:python,cases}),encoding:'utf8',timeout:5000}));
 for(const [i,c] of cases.entries()){
  expect(compileCode(alternatives[c.name],c.name)(c.input)).toEqual(c.expected);
  expect(window.__PROJECT_RULES__[c.name](c.input)).toEqual(c.expected);
  expect(native[i]).toEqual(c.expected);
 }
});
