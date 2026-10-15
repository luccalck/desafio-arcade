import {FUNCTION_NAMES,evaluateCases} from '../core/arcade-engine';
import type {Mission} from '../core/arcade-engine';
import type {Sources} from '../core/workshop-save';
import {parseCode} from '../core/code-parser';
import {compileCode} from '../core/code-runtime';
import {printCode} from '../core/code-print';
import {PLAYER_CSS} from './arcade-player';
import {escape} from './shared';
export function createPythonSource(sources:Sources,missions:Mission[],license:string):string{
 for(const [i,name] of FUNCTION_NAMES.entries())if(evaluateCases(compileCode(sources[name],name),missions[i].cases).some(c=>!c.ok))throw Error('Valide todas as funções antes de exportar.');
 return '# Órbita / regras Python da Oficina de Jogos\n# As funções recebem um dicionário entrada. Para jogar no navegador, abra meu-jogo.html.\n# O HTML inclui o interpretador educativo e o motor web; este arquivo contém suas regras.\n'+license.split('\n').map(line=>'# '+line).join('\n')+'\n\n'+FUNCTION_NAMES.map(name=>sources[name].trim()).join('\n\n')+'\n';
}
export function createProjectHTML(sources:Sources,missions:Mission[],bundle:string,license:string):string{
 const functions=FUNCTION_NAMES.map((name,i)=>{const rule=compileCode(sources[name],name);if(evaluateCases(rule,missions[i].cases).some(c=>!c.ok))throw Error('Valide todas as funções antes de exportar.');return printCode(parseCode(sources[name],name));}).join('\n\n');
 return `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Meu jogo - Órbita</title><style>body{margin:0;background:#080f1a;color:#edf6ff;font-family:Trebuchet MS,sans-serif;padding:20px}main{max-width:640px;margin:auto}h1{font-size:28px}button#play{border:0;border-radius:10px;padding:14px 28px;background:#f9d65c;color:#152b3b;font-weight:bold;cursor:pointer}footer{margin-top:20px;color:#9eb5c9;font-size:12px}.sr-only{position:absolute;clip:rect(0,0,0,0);width:1px;height:1px;overflow:hidden}${PLAYER_CSS}</style><main><h1>Órbita / meu jogo</h1><p>Colete 100 pontos. Evite as pedras. Use ← → ou os botões de toque.</p><div id="arcade"></div><button id="play">Jogar novamente</button><footer>Criado na Oficina de Jogos / Rota do Código. Regras criadas em Python, executadas pelo interpretador educativo no navegador. Baixe também suas funções .py na oficina. Código do projeto sob licença MIT; assistência de IA registrada no repositório https://github.com/luccalck/desafio-arcade .</footer><details><summary>Licença MIT</summary><pre style="white-space:pre-wrap">${escape(license)}</pre></details></main><script>\n${functions}\nwindow.__PROJECT_RULES__={${FUNCTION_NAMES.join(',')}};\n${bundle}\n</script></html>`;
}
