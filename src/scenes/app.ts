import data from '../content/missions.json';
import type {Config,CircuitState,Kind,Layout,Mission,Node} from '../core/circuit-types';
import {startCircuit,stepCircuit} from '../core/circuit-engine';
import {defaultConfig,validateLayout} from '../core/circuit-layout';
import {completeMission,loadProgress,resetProgress,saveProgress} from '../core/progress';
import type {StoragePort} from '../core/progress';
import {loadPreferences,savePreferences} from '../core/preferences';
import {campaign,header,home,modal,result,workspace} from './views';
import type {Campaign,Overlay} from './views';
declare const __VERSION__:{version:string;sha:string};
const missions=data.missions as Mission[],ids=missions.map(m=>m.id),app=document.querySelector<HTMLElement>('#app')!;
let storage:StoragePort|undefined;try{storage=window.localStorage;}catch{/* Sessão em memória. */}
let legacy=false;try{legacy=!!(storage?.getItem('rota-do-codigo:lab:v2')||storage?.getItem('rota-do-codigo:campaign:v1'));}catch{/* Preservar dados anteriores. */}
const c:Campaign={completed:loadProgress(storage,ids),saved:!!storage,legacy,version:__VERSION__};
let preferences=loadPreferences(storage),view:'home'|'missions'|'bench'|'result'='home',overlay:Overlay=null,parentOverlay:Overlay=null;
let index=0,layout:Layout={nodes:structuredClone(missions[0].fixed),edges:[]},selected='',armed:Kind|null=null,link:{from:string;port:string}|null=null,moving=false,serial=0;
let history:Layout[]=[],caseIndex=0,runs:(CircuitState|undefined)[]=[],results:string[]=[],paused=false,message='',earned=0,timer:ReturnType<typeof setInterval>|undefined,overlayResume=false;
const drafts=new Map<number,Layout>();
const mission=()=>missions[index],state=()=>runs[caseIndex],reduced=()=>preferences.reduced||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function stop(){if(timer)clearInterval(timer);timer=undefined;}
function hold(){if(timer){stop();paused=true;}}
function render(focusId?:string){
 const active=focusId??(document.activeElement instanceof HTMLElement?document.activeElement.id:'');
 document.documentElement.classList.toggle('reduced-motion',reduced());document.documentElement.classList.toggle('large-text',preferences.largeText);
 const body=view==='home'?home(missions,c):view==='missions'?campaign(missions,c):view==='result'?result(mission(),earned,index===5,layout.nodes.length-mission().fixed.length):workspace(mission(),index,layout,mission().cases[caseIndex],state(),selected,armed,link?.port??'',moving,message,results,caseIndex,paused);
 app.innerHTML=header(c,view==='bench')+body+modal(overlay,mission(),layout,selected,preferences,state(),caseIndex,results);
 const dialog=app.querySelector<HTMLDialogElement>('dialog');if(dialog){dialog.showModal();dialog.addEventListener('cancel',e=>{e.preventDefault();close();});}
 const target=active?document.getElementById(active):null;if(target&&(!dialog||dialog.contains(target)))target.focus({preventScroll:true});
}
function clearRuns(){stop();runs=mission().cases.map(()=>undefined);results=mission().cases.map(()=>'pending');caseIndex=0;paused=false;earned=0;}
function begin(i:number){if(!missions[i]||i>c.completed.length)return;stop();index=i;layout=structuredClone(drafts.get(i)??{nodes:mission().fixed,edges:[]});selected='';armed=null;link=null;moving=false;history=[];clearRuns();view='bench';overlay=null;message='Escolha uma peça ou selecione a entrada para conectar.';render();app.focus();window.scrollTo({top:0,behavior:'instant'});}
function navigate(next:'home'|'missions'){hold();drafts.set(index,structuredClone(layout));overlay=null;view=next;render();app.focus();window.scrollTo({top:0,behavior:'instant'});}
function open(type:Overlay){parentOverlay=overlay==='pause'?'pause':null;overlayResume=!!timer;hold();overlay=type;render();}
function close(){const next=parentOverlay;overlay=next;parentOverlay=null;render();if(!overlay&&overlayResume&&state()?.status==='running'){overlayResume=false;paused=false;startTimer();}}
function change(next:Layout,focus?:string):boolean{
 const problem=validateLayout(mission(),next);if(problem){hold();message=problem;runs[caseIndex]=undefined;render(focus);return false;}
 history.push(structuredClone(layout));if(history.length>50)history.shift();layout=next;drafts.set(index,structuredClone(layout));clearRuns();message='';render(focus);return true;
}
function updateNode(fn:(n:Node)=>void){const next=structuredClone(layout),n=next.nodes.find(n=>n.id===selected);if(n){fn(n);change(next);}}
function place(kind:Kind,x:number,y:number){if(!mission().available.includes(kind))return;const next=structuredClone(layout),id=`p${++serial}`;next.nodes.push({id,kind,x,y,rotation:0,config:defaultConfig(mission(),kind)});if(change(next,`slot-${x}-${y}`)){selected=id;armed=null;message='Peça encaixada. Conecte sua saída.';render(`slot-${x}-${y}`);}}
function slot(x:number,y:number){
 const n=layout.nodes.find(n=>n.x===x&&n.y===y);
 if(link&&n){const next=structuredClone(layout);next.edges=next.edges.filter(e=>e.from!==link!.from||e.port!==link!.port);next.edges.push({...link,to:n.id});if(change(next,`slot-${x}-${y}`)){link=null;selected=n.id;message=n.kind==='sink'?'Cabo conectado.':'Cabo conectado. Escolha a próxima saída.';render(`slot-${x}-${y}`);}return;}
 if(moving&&!n){const next=structuredClone(layout),node=next.nodes.find(p=>p.id===selected)!;node.x=x;node.y=y;if(change(next,`slot-${x}-${y}`)){moving=false;render(`slot-${x}-${y}`);}return;}
 if(armed&&!n){place(armed,x,y);return;}
 hold();selected=n?.id??'';armed=null;moving=false;link=null;message='';render(`slot-${x}-${y}`);
}
function remove(){const n=layout.nodes.find(n=>n.id===selected);if(!n||mission().fixed.some(f=>f.id===selected))return;const next=structuredClone(layout);next.nodes=next.nodes.filter(p=>p.id!==selected);next.edges=next.edges.filter(e=>e.from!==selected&&e.to!==selected);selected='';link=null;moving=false;change(next,`slot-${n.x}-${n.y}`);}
function tick(){
 const previous=state();if(!previous)return;
 runs[caseIndex]=stepCircuit(mission(),mission().cases[caseIndex],layout,previous);
 const s=state()!;
 if(s.status==='failed'){stop();paused=false;message='';selected=s.fault;render();return;}
 if(s.status==='won'){
  results[caseIndex]='won';if(caseIndex+1<mission().cases.length){caseIndex++;runs[caseIndex]=startCircuit(mission(),mission().cases[caseIndex],layout);}
  else{stop();paused=false;const before=c.completed.length;c.completed=completeMission(c.completed,mission().id,ids);earned=c.completed.length>before?mission().reward:0;c.saved=saveProgress(storage,c.completed);drafts.set(index,structuredClone(layout));view='result';selected='';render();app.focus();window.scrollTo({top:0,behavior:'instant'});return;}
 }
 render();
}
function startTimer(){stop();timer=setInterval(tick,reduced()?25:180);render('run-circuit');}
function run(){
 if(timer){hold();render('run-circuit');return;}
 if(paused&&state()?.status==='running'){paused=false;message='';startTimer();return;}
 clearRuns();selected='';link=null;armed=null;moving=false;message='';runs[0]=startCircuit(mission(),mission().cases[0],layout);
 if(state()?.status==='failed'){render('run-circuit');return;}startTimer();
}
function action(button:HTMLElement){
 const name=button.dataset.action;
 if(name==='slot'){slot(Number(button.dataset.x),Number(button.dataset.y));return;}
 if(name==='home'){navigate('home');return;}if(name==='missions'){navigate('missions');return;}
 if(name==='new'){if(c.completed.length)open('new');else begin(0);return;}
 if(name==='continue'){begin(Math.min(c.completed.length,5));return;}
 if(name==='select'){begin(Number(button.dataset.index));return;}
 if(name==='pick'){hold();selected='';moving=false;link=null;armed=button.dataset.kind as Kind;message='';render(button.id);return;}
 if(name==='deselect'){selected='';armed=null;link=null;moving=false;message='';render('piece-'+mission().available[0]);return;}
 if(name==='connect'){hold();link={from:selected,port:button.dataset.port!};armed=null;moving=false;message='';render(button.id);return;}
 if(name==='disconnect'){const next=structuredClone(layout);next.edges=next.edges.filter(e=>e.from!==selected);change(next);return;}
 if(name==='move'){hold();moving=true;link=null;armed=null;message='';render(button.id);return;}
 if(name==='rotate'){updateNode(n=>{n.rotation=(n.rotation+1)%4;});return;}
 if(name==='remove'){remove();return;}
 if(name==='undo'){const previous=history.pop();if(previous){layout=previous;drafts.set(index,structuredClone(layout));selected='';link=null;armed=null;moving=false;clearRuns();message='Montagem anterior restaurada.';render('undo');}return;}
 if(name==='configure'){open('configure');return;}
 if(name==='value'){updateNode(n=>{n.config.value=Number(button.dataset.value);});return;}
 if(name==='run'){run();return;}
 if(name==='pause'||name==='options'||name==='help'||name==='cases'||name==='log'){open(name);return;}
 if(name==='case'){hold();caseIndex=Number(button.dataset.index);close();return;}
 if(name==='close-modal'){close();return;}
 if(name==='resume'){overlay=null;parentOverlay=null;overlayResume=false;render();if(paused&&state()?.status==='running'){paused=false;startTimer();}return;}
 if(name==='restart'){layout={nodes:structuredClone(mission().fixed),edges:[]};drafts.delete(index);history=[];selected='';armed=null;link=null;moving=false;clearRuns();overlay=null;message='Bancada reiniciada.';render();return;}
 if(name==='reset-prompt'){open('reset');return;}
 if(name==='confirm-reset'){resetProgress(storage);c.completed=[];drafts.clear();c.saved=!!storage;if(overlay==='new')begin(0);else navigate('home');return;}
 if(name==='next'){if(index===5)navigate('missions');else begin(index+1);return;}
 if(name==='edit'){view='bench';clearRuns();message='Experimente outra solução.';render();return;}
}
app.addEventListener('click',e=>{const button=(e.target as HTMLElement).closest<HTMLElement>('[data-action]');if(button)action(button);});
app.addEventListener('change',e=>{
 const field=e.target as HTMLInputElement|HTMLSelectElement;
 if(field.dataset.change==='setting'){const key=field.dataset.key as 'reduced'|'largeText';preferences={...preferences,[key]:(field as HTMLInputElement).checked};savePreferences(storage,preferences);render(field.id);}
 if(field.dataset.change==='config'){const key=field.dataset.key as keyof Config,value=field instanceof HTMLInputElement?field.checked:field.value;updateNode(n=>{n.config={...n.config,[key]:value};});render(field.id);}
});
app.addEventListener('dragstart',e=>{const element=(e.target as HTMLElement).closest<HTMLElement>('[draggable="true"]');if(!element||!e.dataTransfer)return;hold();const payload=element.dataset.port?{from:element.dataset.from,port:element.dataset.port}:element.dataset.kind?{kind:element.dataset.kind}:{id:element.dataset.node};e.dataTransfer.setData('application/x-rdc',JSON.stringify(payload));e.dataTransfer.effectAllowed='move';});
app.addEventListener('dragover',e=>{if((e.target as HTMLElement).closest('.slot:not(:disabled)'))e.preventDefault();});
app.addEventListener('drop',e=>{
 const target=(e.target as HTMLElement).closest<HTMLElement>('.slot:not(:disabled)');if(!target||!e.dataTransfer)return;e.preventDefault();
 try{const payload=JSON.parse(e.dataTransfer.getData('application/x-rdc')),x=Number(target.dataset.x),y=Number(target.dataset.y);if(typeof payload.from==='string'&&typeof payload.port==='string'&&layout.nodes.some(n=>n.id===payload.from)){link={from:payload.from,port:payload.port};slot(x,y);}else if(target.dataset.node)return;else if(typeof payload.kind==='string'&&mission().available.includes(payload.kind))place(payload.kind,x,y);else if(typeof payload.id==='string'&&layout.nodes.some(n=>n.id===payload.id&&!mission().fixed.some(f=>f.id===n.id))){selected=payload.id;moving=true;slot(x,y);}}catch{/* Conteúdo de arraste desconhecido não altera a bancada. */}
});
app.addEventListener('keydown',e=>{
 const target=e.target as HTMLElement;
 if(target.id.startsWith('slot-')&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();let x=Number(target.dataset.x),y=Number(target.dataset.y);x+=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;y+=e.key==='ArrowDown'?1:e.key==='ArrowUp'?-1:0;const next=document.getElementById(`slot-${x}-${y}`) as HTMLButtonElement|null;if(next&&!next.disabled)next.focus();}
 if(e.key==='Delete'&&target.classList.contains('slot')){e.preventDefault();remove();}
 if(e.key==='Escape'&&!overlay){selected='';armed=null;link=null;moving=false;message='';render();}
});
render();
