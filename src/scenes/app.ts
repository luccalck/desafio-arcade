import data from '../content/levels.json';
import type { Level, Command, Primitive, RunState } from '../core/types';
import { countBlocks, startRun, stepRun } from '../core/engine';
import { board } from './board';
import { editor } from './program';
import { escape, robot } from './shared';
declare const __VERSION__: { version:string; sha:string };
const levels=data.levels as Level[];
const root=document.querySelector<HTMLDivElement>('#app')!;
let screen:'menu'|'game'|'result'|'complete'='menu';
let index=0, program:Command[]=[], state:RunState|undefined;
let automatic=false, timer:ReturnType<typeof setTimeout>|undefined;
let draft:Primitive[]=[], times=4, feedback='Monte o programa e observe o percurso.';
const level=()=>levels[index];
const cancel=()=>{clearTimeout(timer);automatic=false;};
function enter(i:number){cancel();index=i;program=structuredClone(level().initialProgram);state=undefined;draft=[];times=4;feedback='Monte o programa e observe o percurso.';screen='game';render(true);}
function header(){return `<header class="site-header"><a href="#" data-action="menu" class="brand"><span class="brand-mark">↱</span>ROTA DO CÓDIGO</a><span class="header-note">UMA OFICINA DE IDEIAS</span><button data-action="menu" class="quiet">Menu inicial</button></header>`;}
function menu(){return `<main class="landing"><div class="hero-copy"><p class="eyebrow">APRENDER FAZENDO / 01—03</p><h1>Uma rota.<br>Muitas <em>ideias.</em></h1><p class="hero-text">O robô tem uma entrega a fazer.<br>Você tem os comandos para levá-lo até lá.</p><button id="start" class="primary large" data-action="start">Começar a jornada <span>↗</span></button><p class="version">v${escape(__VERSION__.version)} · ${escape(__VERSION__.sha.slice(0,7))} <span>WEB / OFFLINE</span></p></div><div class="hero-workshop"><div class="workshop-label"><span>BANCADA 001</span><span>PRONTO PARA PROGRAMAR</span></div><div class="hero-robot">${robot}</div><div class="route-decoration" aria-hidden="true"><span>01 ↑</span><i></i><span>02 ↶</span><i></i><span>03 ↑</span></div><p>Observe. Experimente. Corrija.</p></div><section class="how-to" aria-labelledby="how-title"><div><p class="eyebrow">SEU PRIMEIRO ALGORITMO</p><h2 id="how-title">Você programa.<br>Ele percorre.</h2></div><ol><li><b>01</b><div><strong>Monte a rota</strong><p>Adicione e organize comandos. Avançar anda uma casa; virar muda a direção.</p></div></li><li><b>02</b><div><strong>Veja o que acontece</strong><p>Execute tudo ou acompanhe um passo por vez. Cada ação fica visível no mapa.</p></div></li><li><b>03</b><div><strong>Aprenda com a tentativa</strong><p>Encontrou uma parede? Corrija os comandos e tente de novo. Não há cronômetro.</p></div></li></ol></section><section class="journey" aria-label="Três desafios">${levels.map((l,i)=>`<article><span>DESAFIO 0${i+1}</span><h3>${escape(l.concept)}</h3><p>${escape(l.title)}</p></article>`).join('')}</section></main>`;}
function game(){const l=level();return `<main class="game-layout"><div class="mission"><p class="eyebrow">DESAFIO 0${index+1} / 03 <span>${escape(l.concept)}</span></p><h1>${escape(l.title)}</h1><p>${escape(l.objective)}</p><details class="hint"><summary>Preciso de uma dica</summary><p>${escape(l.hint)}</p></details></div><section class="map-section" aria-label="Mapa e execução">${board(l,state)}<div class="feedback" role="status" aria-live="polite" aria-atomic="true">${escape(state?.message??feedback)}</div><div class="map-footer"><span>Passos: ${state?.steps??0} / ${l.maxSteps}</span><button data-action="reset" ${automatic?'disabled':''}>Reiniciar desafio</button></div></section>${editor(l,program,automatic,state,draft,times)}</main>`;}
function result(){const l=level();const won=state?.status==='won';return `<main class="result-layout"><section>${board(l,state)}</section><section class="result-copy"><p class="eyebrow">DESAFIO 0${index+1} / ${won?'RESOLVIDO':'NOVA TENTATIVA'}</p><h1>${won?'Entrega concluída!':'Vamos corrigir a rota.'}</h1><p role="status">${escape(state?.message??'')}</p>${won?`<div class="lesson"><span>O QUE VOCÊ APLICOU</span><h2>${escape(l.concept)}</h2><p>${escape(l.lesson)}</p></div>`:''}<div class="result-actions">${won?`<button id="next" class="primary" data-action="next">${index===levels.length-1?'Concluir jornada':'Próximo desafio'} ↗</button>`:''}<button id="edit" class="${won?'':'primary'}" data-action="edit">${won?'Experimentar outra rota':'Editar e tentar novamente'}</button><button data-action="reset">Reiniciar desafio</button></div></section><details class="trace"><summary>Ver o registro da execução (${state?.steps??0} passos)</summary><ol>${state?.trace.map((line)=>`<li>${escape(line)}</li>`).join('')??''}</ol></details></main>`;}
function complete(){return `<main class="complete"><div class="completion-mark">${robot}</div><p class="eyebrow">03 / 03 DESAFIOS CONCLUÍDOS</p><h1>Você encontrou<br><em>o caminho.</em></h1><p>Uma sequência leva a um resultado. Depurar revela a causa de um erro. Repetir transforma ações em um padrão.</p><p>Agora experimente outra solução e observe como ela muda o percurso.</p><button id="restart" class="primary large" data-action="start">Recomeçar jornada ↗</button><button data-action="menu">Voltar ao menu</button></main>`;}
function render(moveFocus=false){
  const focused=document.activeElement?.id;
  root.innerHTML=header()+(screen==='menu'?menu():screen==='game'?game():screen==='result'?result():complete())+`<footer class="site-footer"><span>PEQUENOS COMANDOS. GRANDES DESCOBERTAS.</span><span>Sem conta · sem limite de tempo · por teclado ou toque</span></footer>`;
  if(moveFocus){root.querySelector('main')?.setAttribute('tabindex','-1');root.querySelector<HTMLElement>('main')?.focus();}
  else if(focused){document.getElementById(focused)?.focus({preventScroll:true});}
}
function begin(){try {state=startRun(level(),program);feedback=state.message;return true;}catch(error){feedback=error instanceof Error?error.message:String(error);state=undefined;render();return false;}}
function tick(){
  if(!state)return;
  state=stepRun(level(),state);
  if(state.status!=='running'){cancel();screen='result';render(true);return;}
  render();
  if(automatic)timer=setTimeout(tick,matchMedia('(prefers-reduced-motion: reduce)').matches?120:550);
}
function append(command:Command){
  const candidate=[...program,command];
  if(countBlocks(candidate)>level().maxBlocks){feedback=`Limite de ${level().maxBlocks} blocos. Remova um comando ou use repetição quando disponível.`;}
  else {program=candidate;feedback='Comando adicionado. Execute para observar o resultado.';state=undefined;}
  render();
}
root.addEventListener('change',(event)=>{const target=event.target as HTMLSelectElement;if(target.id==='repeat-times')times=Number(target.value);});
root.addEventListener('click',(event)=>{
  const button=(event.target as HTMLElement).closest<HTMLElement>('[data-action]');if(!button)return;event.preventDefault();
  const action=button.dataset.action;
  if(action==='menu'){cancel();screen='menu';render(true);return;}
  if(action==='start'){enter(0);return;}
  if(action==='next'){if(index===levels.length-1){screen='complete';render(true);}else enter(index+1);return;}
  if(automatic&&action!=='stop')return;
  if(action==='stop'){cancel();feedback='Execução interrompida. Editar ou executar novamente começa na posição inicial.';state=undefined;render();return;}
  if(action==='reset'){enter(index);return;}
  if(action==='edit'){screen='game';state=undefined;feedback='Programa preservado. Edite os comandos e execute novamente.';render(true);return;}
  if(action==='run'){if(begin()){automatic=true;render();timer=setTimeout(tick,100);}return;}
  if(action==='step'){if(state?.status==='running'||begin())tick();return;}
  if(action==='add'){append({kind:button.dataset.kind as Primitive});return;}
  if(action==='draft'){if(draft.length<8)draft.push(button.dataset.kind as Primitive);else feedback='O grupo aceita até oito ações.';render();return;}
  if(action==='draft-clear'){draft=[];render();return;}
  if(action==='repeat-add'){if(draft.length){append({kind:'repeat',times,body:[...draft]});}return;}
  if(action==='clear'){program=[];state=undefined;feedback='Programa limpo. Monte uma nova rota.';render();return;}
  const i=Number(button.dataset.index);
  if(action==='remove')program.splice(i,1);
  if(action==='up'&&i>0)[program[i-1],program[i]]=[program[i],program[i-1]];
  if(action==='down'&&i<program.length-1)[program[i+1],program[i]]=[program[i],program[i+1]];
  state=undefined;render();
  // A renderização substitui o controle anterior; devolva o foco a uma ação válida.
  root.querySelector<HTMLElement>('[data-action="add"]')?.focus({preventScroll:true});
});
render();
