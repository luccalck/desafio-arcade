import data from '../content/missions.json';
import type {Mission,Rules,CaseResult,FunctionName} from '../core/arcade-engine';
import {FUNCTION_NAMES,evaluateCases} from '../core/arcade-engine';
import {compileCode} from '../core/code-runtime';
import {completeMission,loadProgress,saveProgress,resetProgress} from '../core/progress';
import type {StoragePort} from '../core/progress';
import {loadSources,saveSources,resetSources,starterSources} from '../core/workshop-save';
import {loadPreferences,savePreferences} from '../core/preferences';
import {mountPlayer,PLAYER_CSS} from './arcade-player';
import type {Player} from './arcade-player';
import {header,home,campaign,workspace,caseTable,xp} from './views';
import {createProjectHTML} from './export';
import {escape} from './shared';
declare const __VERSION__:{version:string;sha:string};
declare const __PLAYER_BUNDLE__:string;
declare const __LICENSE_TEXT__:string;
const missions=data.missions as Mission[],ids=missions.map(m=>m.id),app=document.querySelector<HTMLElement>('#app')!;
const playerStyle=document.createElement('style');playerStyle.textContent=PLAYER_CSS;document.head.append(playerStyle);
let storage:StoragePort|undefined;try{storage=window.localStorage;}catch{/* Sessão em memória. */}
let completed=loadProgress(storage,ids),sources=loadSources(storage,missions),preferences=loadPreferences(storage),saved=!!storage,legacy=false;
try{legacy=!!(storage?.getItem('rota-do-codigo:bench:v3')||storage?.getItem('rota-do-codigo:lab:v2')||storage?.getItem('rota-do-codigo:campaign:v1'));}catch{/* Dados antigos preservados. */}
let view:'home'|'missions'|'workshop'='home',index=0,tab=0,player:Player|undefined,results:CaseResult[]=[],tested=false,finalWon=false,summary='',validated='',opener='',resumeDialog=false;
const m=()=>missions[index],editing=()=>missions[tab],reduced=()=>preferences.reduced||matchMedia('(prefers-reduced-motion: reduce)').matches;
function applyPreferences(){document.documentElement.classList.toggle('large-text',preferences.largeText);document.documentElement.classList.toggle('reduced-motion',reduced());}
function fingerprint(){return JSON.stringify(sources);}
function rules():Rules{return Object.fromEntries(FUNCTION_NAMES.map((name,i)=>[name,compileCode(index===5||i===index?sources[name]:missions[i].reference,name)])) as Rules;}
function updateProgress(){const target=document.getElementById('xp-count');if(target)target.textContent=`${xp(completed)} XP`;}
function complete(){completed=completeMission(completed,m().id,ids);saved=saveProgress(storage,completed);updateProgress();}
function setupPlayer(){player?.dispose();player=undefined;const host=document.getElementById('player-host');if(!host)return;try{player=mountPlayer(host,rules(),s=>{
 const output=document.getElementById('run-message');if(output)output.textContent=s.status==='error'?s.error:s.status==='lost'?'A partida acabou. Você pode jogar novamente.':index===5?'Você chegou aos 100 pontos!':'Sua regra está em ação. Testar regra verifica também outras situações.';
 if(index===5&&s.status==='won'&&tested&&validated===fingerprint()){finalWon=true;summary="Projeto concluído: situações corretas e partida vencida.";document.getElementById('test-summary')!.textContent=summary;complete();const box=document.createElement('div');box.className='project-won';box.innerHTML='<strong>Seu jogo funciona!</strong><button id="download-game" class="primary" data-action="download">↓ Baixar meu jogo</button><small>HTML offline, com suas funções JavaScript.</small>';host.parentElement!.querySelector('.project-won')?.remove();host.parentElement!.append(box);}
 },reduced);const pauseControl=host.querySelector<HTMLButtonElement>('#pause-game');if(pauseControl)pauseControl.disabled=index===5&&!tested;}catch(e){host.innerHTML=`<div class="code-problem"><strong>Revise o código</strong><p>${escape(e instanceof Error?e.message:'Regra inválida.')}</p></div>`;}}
function render(focus?:string){player?.dispose();player=undefined;applyPreferences();app.innerHTML=header(completed,__VERSION__)+(view==='home'?home(completed,legacy,saved):view==='missions'?campaign(missions,completed):workspace(missions,index,tab,sources,tested,finalWon,summary));if(view==='workshop')setupPlayer();if(focus)document.getElementById(focus)?.focus({preventScroll:true});}
function begin(i:number){if(i<0||i>Math.min(completed.length,5))return;index=i;tab=Math.min(i,4);view='workshop';tested=false;validated='';finalWon=false;results=[];summary='';render('code-editor');window.scrollTo({top:0,behavior:'instant'});}
function navigate(next:'home'|'missions'){view=next;render();app.focus();window.scrollTo({top:0,behavior:'instant'});}
function closeDialog(){const dialog=document.querySelector<HTMLDialogElement>('#workshop-dialog');dialog?.close();dialog?.remove();if(opener)document.getElementById(opener)?.focus({preventScroll:true});if(resumeDialog&&player?.state().status==='playing')player.play();resumeDialog=false;}
function dialog(content:string){opener=(document.activeElement as HTMLElement)?.id??'';resumeDialog=player?.playing()??false;player?.pause();const d=document.createElement('dialog');d.id='workshop-dialog';d.innerHTML=`<button class="dialog-close" data-action="close" aria-label="Fechar">×</button>${content}`;app.append(d);d.showModal();d.addEventListener('cancel',e=>{e.preventDefault();closeDialog();});}
function reset(){resetProgress(storage);resetSources(storage);completed=[];sources=starterSources(missions);saved=!!storage;tested=false;finalWon=false;validated='';}
function test(){player?.pause();results=[];tested=false;finalWon=false;validated='';
 try{const targets=index===5?missions.slice(0,5):[m()];for(const target of targets){const name=target.functionName as FunctionName;results.push(...evaluateCases(compileCode(sources[name],name),target.cases).map(c=>({...c,label:index===5?`${name} / ${c.label}`:c.label})));}
  const good=results.filter(c=>c.ok).length;tested=good===results.length;summary=tested?`Tudo certo: ${good}/${results.length} situações.`:`${good}/${results.length} situações corretas. Reveja o resultado.`;
  if(tested){validated=fingerprint();if(index<5)complete();else summary+=' Agora vença a partida para concluir seu projeto.';}
 }catch(e){summary=e instanceof Error?e.message:'Erro na regra.';}
 render('test-rules');}
function help(){const target=editing();dialog(`<span class="eyebrow">ENTENDER / ${escape(target.concept)}</span><h2>${escape(target.title)}</h2><p>${escape(target.help)}</p><div class="syntax-guide"><p><code>let</code> cria variável · <code>if</code> pergunta “se”</p><p><code>return</code> devolve o resultado · <code>for</code> repete</p></div><details><summary>O que o editor aceita?</summary><p>Modo iniciante de JavaScript: a função desta missão, variáveis, números, comparações, if/else, listas/push e for. Sem bibliotecas ou APIs externas. Use ponto e vírgula ao terminar instruções. Um erro é uma oportunidade de testar outra hipótese.</p></details>`);}
function action(button:HTMLElement){switch(button.dataset.action){
 case 'home':navigate('home');break;case 'missions':navigate('missions');break;
 case 'new':if(completed.length)dialog('<h2>Recomeçar a oficina?</h2><p>Isso reinicia somente as missões e funções desta oficina.</p><button class="primary" data-action="confirm-new">Recomeçar</button>');else begin(0);break;
 case 'confirm-new':closeDialog();reset();begin(0);break;
 case 'continue':begin(Math.min(completed.length,5));break;
 case 'select':begin(Number(button.dataset.index));break;
 case 'next':if(tested&&index<5)begin(index+1);break;
 case 'tab':tab=Number(button.dataset.index);render('code-editor');break;
 case 'test':test();break;
 case 'play':if(index===5&&(!tested||validated!==fingerprint())){summary='Teste o projeto antes de iniciar o desafio final.';document.getElementById('test-summary')!.textContent=summary;break;}setupPlayer();player?.play();document.getElementById('player-host')?.scrollIntoView({behavior:'instant',block:'start'});break;
 case 'help':help();break;
 case 'tests':dialog(`<h2>Situações de teste</h2>${caseTable(results)}`);break;
 case 'reset-code':dialog('<h2>Restaurar esta função?</h2><p>Volta ao problema inicial desta missão. As outras funções ficam salvas.</p><button class="primary" data-action="confirm-code-reset">Restaurar função</button>');break;
 case 'confirm-code-reset':sources[editing().functionName as FunctionName]=editing().starter;saveSources(storage,sources);tested=false;validated='';finalWon=false;summary='Código inicial restaurado.';closeDialog();render('code-editor');break;
 case 'options':dialog(`<h2>Opções</h2><label class="setting"><input id="large-text" type="checkbox" ${preferences.largeText?'checked':''}> Texto maior</label><label class="setting"><input id="reduced-motion" type="checkbox" ${preferences.reduced?'checked':''}> Movimento reduzido</label><button data-action="reset-prompt">Reiniciar oficina</button>`);break;
 case 'reset-prompt':closeDialog();dialog('<h2>Reiniciar oficina?</h2><p>Somente o progresso e código desta oficina serão removidos.</p><button class="primary" data-action="confirm-reset">Reiniciar</button>');break;
 case 'confirm-reset':closeDialog();reset();navigate('home');break;
 case 'close':closeDialog();break;
 case 'download':if(finalWon&&tested&&validated===fingerprint()){try{const html=createProjectHTML(sources,missions,__PLAYER_BUNDLE__,__LICENSE_TEXT__),url=URL.createObjectURL(new Blob([html],{type:'text/html;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='meu-jogo.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);}catch(e){document.getElementById('run-message')!.textContent=String(e);}}break;
 }}
app.addEventListener('click',e=>{const button=(e.target as HTMLElement).closest<HTMLElement>('[data-action]');if(button)action(button);});
app.addEventListener('input',e=>{const field=e.target as HTMLElement;if(field.id!=='code-editor')return;const code=(field as HTMLTextAreaElement).value;sources[editing().functionName as FunctionName]=code;saved=saveSources(storage,sources)&&saved;tested=false;validated='';finalWon=false;player?.pause();const pauseControl=document.getElementById('pause-game') as HTMLButtonElement|null;if(pauseControl)pauseControl.disabled=true;document.querySelector('.project-won')?.remove();document.getElementById('code-gutter')!.innerHTML=code.split('\n').map((_,i)=>`<span>${i+1}</span>`).join('');document.getElementById('test-summary')!.textContent='Código alterado. Teste a nova regra.';document.getElementById('test-summary')!.classList.remove('passed');document.getElementById('next-mission')!.hidden=true;});
app.addEventListener('change',e=>{const field=e.target as HTMLInputElement;if(field.id==='large-text'||field.id==='reduced-motion'){preferences={...preferences,[field.id==='large-text'?'largeText':'reduced']:field.checked};savePreferences(storage,preferences);applyPreferences();}});
render();

app.addEventListener('scroll',e=>{const field=e.target as HTMLElement;if(field.id==='code-editor')document.getElementById('code-gutter')!.scrollTop=field.scrollTop;},true);
