import data from '../content/levels.json';
import {tutorial,tutorialSteps} from '../content/tutorial';
import type {Level,Command,Primitive,RunState} from '../core/types';
import {countBlocks,startRun,stepRun} from '../core/engine';
import {completeMission,loadProgress,saveProgress,resetProgress,type StoragePort} from '../core/progress';
import {board,variables} from './board';
import {editor} from './program';
import {header,home,briefing,training,result,complete,resetDialog} from './views';
import {escape} from './shared';
declare const __VERSION__:{version:string;sha:string};
const levels=data.levels as Level[],ids=levels.map(l=>l.id);
const root=document.querySelector<HTMLDivElement>('#app')!;
let storage:StoragePort|undefined;
try{storage=localStorage;}catch{/* file:// ou política do navegador pode impedir armazenamento. */}
let completed=loadProgress(storage,ids),saved=Boolean(storage);
let screen:'menu'|'tutorial'|'briefing'|'game'|'result'|'complete'='menu';
let index=0,program:Command[]=[],state:RunState|undefined;
let automatic=false,timer:ReturnType<typeof setTimeout>|undefined;
let draft:Primitive[]=[],times=3,repeatOpen=false,hintCount=0,earned=0,promptReset=false;
let feedback='Adicione comandos e clique em Executar ou Um passo.';
let trainingState=startRun(tutorial,tutorial.solution);
const level=()=>levels[index];
const cancel=()=>{clearTimeout(timer);automatic=false;};
const campaign=()=>({completed,saved,version:__VERSION__});
function enter(i:number){
 cancel();index=i;program=structuredClone(level().initialProgram);state=undefined;draft=[];times=3;repeatOpen=false;hintCount=0;
 feedback=program.length?'Este programa tem um erro. Use Um passo para descobrir onde.':'Adicione comandos e observe como a sequência muda o sistema.';
 screen='game';render(true);
}
function showBrief(i:number){cancel();index=i;screen='briefing';render(true);}
function showTraining(){cancel();trainingState=startRun(tutorial,tutorial.solution);screen='tutorial';render(true);}
function game():string{
 const l=level();
 return `<main class="game-layout"><div class="mission"><div><p class="eyebrow">MISSÃO 0${index+1} / 04 <span>${escape(l.concept)}</span></p><h1>${escape(l.title)}</h1><p class="mission-objective"><b>OBJETIVO</b> ${escape(l.objective)}</p></div><button id="hint" class="hint-button" data-action="hint" ${automatic?'disabled':''}>? ${hintCount?'Próxima dica':'Preciso de uma dica'} <small>${hintCount}/${l.hints.length}</small></button></div>
  ${hintCount?`<aside class="hint-box"><span>DICA ${hintCount}</span><p>${escape(l.hints[hintCount-1])}</p></aside>`:''}
  <section class="map-section" aria-label="Mapa e estado do sistema">${variables(l,state)}${board(l,state)}
   <div class="feedback ${state?.reason?'failure':''}" data-testid="feedback" role="status" aria-live="polite" aria-atomic="true"><span class="feedback-icon">${automatic?'▶':'⌁'}</span><span>${escape(state?.message??feedback)}</span></div>
   <div class="map-footer"><span>↑ Avançar segue o robô · ↶/↷ Virar não anda</span><button id="reset-mission" data-action="reset" ${automatic?'disabled':''}>Recomeçar missão</button></div></section>
  ${editor(l,program,automatic,state,draft,times,repeatOpen)}
  <div class="mobile-playbar" aria-label="Controles rápidos da missão"><span>${countBlocks(program)} / ${l.maxBlocks}<small>BLOCOS</small></span>${automatic?'<button id="mobile-stop" data-action="stop">■ Parar</button>': '<button id="mobile-run" class="primary" data-action="run" aria-label="Executar programa">▶ Executar</button>'}<button id="mobile-step" data-action="step" aria-label="Executar um passo" ${automatic?'disabled':''}>Um passo</button></div></main>`;
}
function render(moveFocus=false){
 const focused=document.activeElement?.id;
 root.innerHTML=header(campaign())+(screen==='menu'?home(levels,campaign()):screen==='tutorial'?training(trainingState):screen==='briefing'?briefing(level(),index):screen==='game'?game():screen==='result'&&state?result(level(),index,state,earned):complete(levels,campaign()))+
  `<footer class="site-footer"><span>PEQUENOS COMANDOS. SISTEMAS RECUPERADOS.</span><span>Teclado ou toque · sem conta · offline</span></footer>`+(promptReset?resetDialog():'');
 if(promptReset){root.querySelector<HTMLDialogElement>('dialog')?.showModal();document.getElementById('reset-cancel')?.focus();return;}
 if(moveFocus){const main=root.querySelector<HTMLElement>('main');main?.setAttribute('tabindex','-1');main?.focus({preventScroll:true});window.scrollTo(0,0);}
 else if(focused){const target=document.getElementById(focused) as HTMLButtonElement|null;
  if(target&&!target.disabled)target.focus({preventScroll:true});
  else document.getElementById(automatic?'stop':'run')?.focus({preventScroll:true});
 }
}
function begin():boolean{
 try{state=startRun(level(),program);feedback=state.message;return true;}
 catch(error){feedback=error instanceof Error?error.message:String(error);state=undefined;render();return false;}
}
function tick(){
 if(!state)return;
 state=stepRun(level(),state);
 if(state.status!=='running'){
  cancel();earned=0;
  if(state.status==='won'){
   const before=completed.length;completed=completeMission(completed,level().id,ids);earned=(completed.length-before)*100;
   saved=saveProgress(storage,completed);
  }
  screen='result';render(true);return;
 }
 render();
 if(automatic)timer=setTimeout(tick,matchMedia('(prefers-reduced-motion: reduce)').matches?90:500);
}
function append(command:Command){
 const candidate=[...program,command];
 if(countBlocks(candidate)>level().maxBlocks)feedback=`Limite de ${level().maxBlocks} blocos. Remova um comando${level().allowRepeat?' ou represente o padrão com Repetir':''}.`;
 else{program=candidate;feedback='Bloco adicionado. Seu programa será executado nessa ordem.';}
 state=undefined;render();
}
function revealMap(){
 if(screen==='game'&&matchMedia('(max-width:800px)').matches)root.querySelector('.variables')?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
root.addEventListener('change',event=>{
 const target=event.target as HTMLSelectElement;
 if(automatic)return;
 if(target.id==='repeat-times'){times=Number(target.value);return;}
 if(target.dataset.commandIndex!==undefined){
  const i=Number(target.dataset.commandIndex),kind=target.value as Primitive;
  if(program[i]&&level().allowedActions.includes(kind)){program[i]={kind};state=undefined;feedback=`Comando ${i+1} alterado. Execute para verificar a correção.`;render();}
 }
});
root.addEventListener('cancel',()=>{promptReset=false;render();document.getElementById('reset-progress')?.focus();},true);
root.addEventListener('click',event=>{
 const button=(event.target as HTMLElement).closest<HTMLElement>('[data-action]');if(!button)return;
 if((button as HTMLButtonElement).disabled)return;
 event.preventDefault();const action=button.dataset.action;
 if(action==='menu'){cancel();screen='menu';render(true);return;}
 if(action==='play'){if(completed.length===4){screen='complete';render(true);}else if(!completed.length)showTraining();else showBrief(completed.length);return;}
 if(action==='select'){const i=Number(button.dataset.index);if(i>completed.length||i<0||i>=levels.length)return;if(!i&&!completed.length)showTraining();else showBrief(i);return;}
 if(action==='tutorial'){showTraining();return;}
 if(action==='train-action'){
  if(button.dataset.kind!==tutorialSteps[trainingState.cursor]?.kind)return;
  trainingState=stepRun(tutorial,trainingState);render();
  document.getElementById(trainingState.cursor===4?'training-next':`train-${tutorialSteps[trainingState.cursor].kind}`)?.focus({preventScroll:true});return;
 }
 if(action==='training-next'){showBrief(0);return;}
 if(action==='begin-mission'){enter(index);return;}
 if(action==='reset-prompt'){promptReset=true;render();return;}
 if(action==='reset-cancel'){promptReset=false;render();document.getElementById('reset-progress')?.focus();return;}
 if(action==='reset-confirm'){resetProgress(storage);completed=[];promptReset=false;screen='menu';render(true);return;}
 if(action==='next'){if(index===levels.length-1){screen='complete';render(true);}else showBrief(index+1);return;}
 if(automatic&&action!=='stop')return;
 if(action==='stop'){cancel();state=undefined;feedback='Execução interrompida. Edite e execute novamente desde o início.';render();return;}
 if(action==='reset'){enter(index);return;}
 if(action==='edit'){screen='game';state=undefined;feedback='Programa preservado. Troque, adicione ou reordene os comandos.';render(true);return;}
 if(action==='hint'){hintCount=Math.min(hintCount+1,level().hints.length);render();return;}
 if(action==='run'){if(begin()){automatic=true;render();document.getElementById(matchMedia('(max-width:800px)').matches?'mobile-stop':'stop')?.focus({preventScroll:true});revealMap();timer=setTimeout(tick,180);}return;}
 if(action==='step'){if(state?.status==='running'||begin()){tick();revealMap();}return;}
 if(action==='add'){append({kind:button.dataset.kind as Primitive});return;}
 if(action==='toggle-repeat'){repeatOpen=!repeatOpen;render();return;}
 if(action==='draft'){if(draft.length<8)draft.push(button.dataset.kind as Primitive);else feedback='O grupo aceita até oito ações.';render();return;}
 if(action==='draft-clear'){draft=[];render();return;}
 if(action==='repeat-add'){if(draft.length)append({kind:'repeat',times,body:[...draft]});return;}
 if(action==='clear'){program=[];state=undefined;feedback='Programa limpo. Monte uma nova solução.';render();return;}
 const i=Number(button.dataset.index);if(!Number.isInteger(i)||!program[i])return;
 if(action==='remove')program.splice(i,1);
 if(action==='up'&&i>0)[program[i-1],program[i]]=[program[i],program[i-1]];
 if(action==='down'&&i<program.length-1)[program[i+1],program[i]]=[program[i],program[i+1]];
 state=undefined;render();document.getElementById(`add-${level().allowedActions[0]}`)?.focus({preventScroll:true});
});
render();
