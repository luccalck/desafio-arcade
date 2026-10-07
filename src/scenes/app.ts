import data from '../content/missions.json';
import type {Action,Block,Expr,LabState,Mission,Predicate,Scenario} from '../core/lab-types';
import {startLab,stepLab} from '../core/lab-engine';
import {loadProgress,saveProgress,resetProgress,completeMission} from '../core/progress';
import type {StoragePort} from '../core/progress';
import {loadPreferences,savePreferences} from '../core/preferences';
import {blockAt,listAt,makeIf} from './lab-editor';
import {campaign,complete,header,home,lesson,modal,result,workspace} from './views';
import type {Campaign,Overlay,Stage} from './views';
declare const __VERSION__:{version:string;sha:string};
const missions=data.missions as Mission[],ids=missions.map(m=>m.id);
const app=document.querySelector<HTMLDivElement>('#app')!;
let storage:StoragePort|undefined;try{storage=window.localStorage;}catch{/* Fallback local de sessão. */}
let legacy=false;try{legacy=!!storage?.getItem('rota-do-codigo:campaign:v1');}catch{/* Não acessar outros dados. */}
const c:Campaign={completed:loadProgress(storage,ids),saved:!!storage,legacy,version:__VERSION__};
let preferences=loadPreferences(storage);
let view:'home'|'missions'|'lesson'|'workspace'|'result'|'complete'='home',overlay:Overlay=null,modalBack:Overlay=null;
let missionIndex=0,stage:Stage='demo',program:Block[]=[],caseIndex=0,runs:(LabState|undefined)[]=[],results:('pending'|'won'|'failed')[]=[];
let busy=false,batchActive=false,pausedAuto=false,review=false,hintCount=0,error='',earned=0,timer:ReturnType<typeof setInterval>|undefined;
const mission=()=>missions[missionIndex];
const cases=():Scenario[]=>stage==='demo'?[mission().demo.scenario]:stage==='practice'?mission().practice:mission().scenarios;
const reduced=()=>preferences.reduced||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function stop(){if(timer)clearInterval(timer);timer=undefined;busy=false;}
function resetAttempt(){stop();caseIndex=0;runs=cases().map(()=>undefined);results=cases().map(()=>'pending');batchActive=false;error='';earned=0;}
function focusTop(){app.focus();window.scrollTo({top:0,behavior:'instant'});}
function render(focusId?:string){
 const active=focusId??(document.activeElement instanceof HTMLElement?document.activeElement.id:'');
 document.documentElement.classList.toggle('reduced-motion',reduced());document.documentElement.classList.toggle('large-text',preferences.largeText);
 const state=runs[caseIndex];
 const body=view==='home'?home(missions,c):view==='missions'?campaign(missions,c):view==='lesson'?lesson(mission(),missionIndex,review):view==='workspace'?workspace(mission(),missionIndex,stage,program,cases(),caseIndex,state,results,busy,hintCount,error):view==='complete'?complete(missions,c):result(mission(),stage,state!,cases(),results,earned);
 app.innerHTML=header(missions,c,view==='workspace')+body+`<footer class="game-footer"><span>PEQUENOS PROGRAMAS. GRANDES IDEIAS.</span><span>TECLADO / TOQUE / OFFLINE</span></footer>`+modal(overlay,preferences);
 const dialog=app.querySelector<HTMLDialogElement>('#game-modal');if(dialog&&!dialog.open)dialog.showModal();
 if(active){const target=document.getElementById(active);if(target&&(!dialog||dialog.contains(target)))target.focus({preventScroll:true});}
 if(dialog)dialog.addEventListener('cancel',e=>{e.preventDefault();closeModal();});
}
function begin(index:number){if(!missions[index]||index>c.completed.length)return;stop();overlay=null;missionIndex=index;review=false;hintCount=0;view='lesson';render();focusTop();}
function setStage(next:Stage){stage=next;program=structuredClone(next==='demo'?mission().demo.program:next==='practice'?mission().initialPractice:[]);resetAttempt();hintCount=0;review=false;view='workspace';overlay=null;render();focusTop();}
function navigate(next:typeof view){stop();overlay=null;view=next;render();focusTop();}
function finish(){
 stop();batchActive=false;
 if(stage==='demo'){render();return;}
 if(results.every(r=>r==='won')&&stage==='challenge'){
  const before=c.completed.length;c.completed=completeMission(c.completed,mission().id,ids);earned=c.completed.length>before?mission().reward:0;c.saved=saveProgress(storage,c.completed);
 }
 view='result';render();focusTop();
}
function advance(){
 try{
  if(!batchActive){caseIndex=0;runs=cases().map(()=>undefined);results=cases().map(()=>'pending');batchActive=true;}
  if(runs[caseIndex]?.status==='won'){caseIndex++;}
  const s=cases()[caseIndex];if(!runs[caseIndex])runs[caseIndex]=startLab(mission(),s,program);
  runs[caseIndex]=stepLab(mission(),s,runs[caseIndex]!);
  const state=runs[caseIndex]!;
  if(state.status!=='running')results[caseIndex]=state.status;
  if(state.status==='failed'||(state.status==='won'&&caseIndex===cases().length-1))finish();else render();
 }catch(e){stop();batchActive=false;error=e instanceof Error?e.message:String(e);render();}
}
function revealSystem(){if(window.innerWidth<=800)app.querySelector('.simulator')?.scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});}
function auto(){if(stage==='demo'&&runs[0]?.status==='won')return;stop();busy=true;advance();if(busy)timer=setInterval(advance,reduced()?65:420);revealSystem();}
function pause(){pausedAuto=busy;stop();overlay='pause';render();}
function resume(){overlay=null;modalBack=null;render('top-menu');if(pausedAuto){pausedAuto=false;busy=true;timer=setInterval(advance,reduced()?65:420);render();}}
function closeModal(){if(overlay==='pause'){resume();return;}overlay=modalBack;modalBack=null;render(overlay?'resume':'options');}
function editProgram(mutate:()=>void,focusId?:string){stop();mutate();resetAttempt();render(focusId);}
function selectedBlock(path:string){return blockAt(program,path);}
app.addEventListener('click',event=>{
 const target=(event.target as HTMLElement).closest<HTMLButtonElement>('button[data-action]');if(!target||target.disabled)return;
 const action=target.dataset.action!,path=target.dataset.path??'',parent=target.dataset.parent??'';
 switch(action){
 case 'home':navigate('home');break;
 case 'missions':navigate('missions');break;
 case 'new':if(c.completed.length){modalBack=null;overlay='new';render();}else begin(0);break;
 case 'continue':if(c.completed.length===6)navigate('complete');else begin(c.completed.length);break;
 case 'select':begin(Number(target.dataset.index));break;
 case 'demo':setStage('demo');break;
 case 'practice':setStage('practice');break;
 case 'challenge':setStage('challenge');break;
 case 'next':if(missionIndex===5)navigate('complete');else begin(missionIndex+1);break;
 case 'add':editProgram(()=>listAt(program,parent).push({kind:'action',action:target.dataset.kind as Action}),target.id);break;
 case 'add-if':editProgram(()=>listAt(program,parent).push(makeIf(mission(),!parent&&program.some(b=>b.kind==='foreach'))),target.id);break;
 case 'add-loop':editProgram(()=>program.push({kind:'foreach',body:[]}),target.id);break;
 case 'remove':{
  const parts=path.split('.'),index=Number(parts.pop());editProgram(()=>listAt(program,parts.join('.')).splice(index,1),`add-${mission().actions[0]}`);break;
 }
 case 'move':{
  const parts=path.split('.'),index=Number(parts.pop()),direction=Number(target.dataset.direction);editProgram(()=>{const list=listAt(program,parts.join('.')),other=index+direction;if(other>=0&&other<list.length)[list[index],list[other]]=[list[other],list[index]];});break;
 }
 case 'clear':editProgram(()=>{program=[];},`add-${mission().actions[0]}`);break;
 case 'run':auto();break;
 case 'step':advance();revealSystem();break;
 case 'stop':stop();render('run-program');break;
 case 'case':caseIndex=Number(target.dataset.index);batchActive=false;render();break;
 case 'hint':hintCount=Math.min(3,hintCount+1);render('hint');break;
 case 'pause':pause();break;
 case 'resume':resume();break;
 case 'restart':setStage(stage);break;
 case 'review-lesson':stop();overlay=null;review=true;view='lesson';render();focusTop();break;
 case 'return-work':review=false;view='workspace';render();focusTop();break;
 case 'edit':resetAttempt();view='workspace';render();focusTop();break;
 case 'options':modalBack=overlay==='pause'?'pause':null;overlay='options';render();break;
 case 'help':modalBack=null;overlay='help';render();break;
 case 'close-modal':closeModal();break;
 case 'reset-prompt':modalBack='options';overlay='reset';render();break;
 case 'confirm-reset':{
  const isNew=overlay==='new';resetProgress(storage);c.completed=[];stop();overlay=null;modalBack=null;if(isNew)begin(0);else navigate('home');break;
 }
 }
});
app.addEventListener('change',event=>{
 const target=event.target as HTMLSelectElement|HTMLInputElement;
 if(target.dataset.change==='setting'){
  preferences={...preferences,[target.dataset.key!]: (target as HTMLInputElement).checked};savePreferences(storage,preferences);render(target.id);return;
 }
 if(target.dataset.change==='append'){
  if(target.value)editProgram(()=>listAt(program,target.dataset.parent!).push({kind:'action',action:target.value as Action}),target.id);return;
 }
 const b=selectedBlock(target.dataset.path??'');if(b?.kind!=='if')return;
 editProgram(()=>{
  const e=b.condition;const part=target.dataset.part!;
  if(target.dataset.change==='operator'){
   if(target.value!=='and'&&target.value!=='or')return;
   const group=mission().mode==='boolean'&&part==='inner'&&e.kind!=='predicate'?e.left:e;if(group.kind!=='predicate')group.kind=target.value;
  }else{
   const leaf:Expr={kind:'predicate',name:target.value as Predicate};
   if(e.kind==='predicate')b.condition=leaf;
   else if(part==='c')e.right=leaf;
   else{const group=mission().mode==='boolean'?e.left:e;if(group.kind!=='predicate'){if(part==='a')group.left=leaf;else group.right=leaf;}}
  }
 },target.id);
});
render();
