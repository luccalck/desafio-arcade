import type {Level,RunState} from '../core/types';
import {board,variables} from './board';
import {labels,icons} from './program';
import {tutorial,tutorialSteps} from '../content/tutorial';
import {escape,robot} from './shared';
export interface Campaign {completed:string[];saved:boolean;version:{version:string;sha:string}}
const medals=['DADOS','DEBUG','LÓGICA','AUTOMAÇÃO'];
const glyphs=['▤','⌁','&','↻'];
function miniature(level:Level){return `<div class="mini-map" style="--columns:${level.grid[0].length}" aria-hidden="true">${level.grid.flatMap((row,y)=>[...row].map((cell,x)=>{
 const object=level.objects.find(o=>o.x===x&&o.y===y);
 const goal=x===level.goal.x&&y===level.goal.y;
 return `<i class="${cell==='#'?'mini-wall':'mini-floor'} ${object?'mini-object':''} ${goal?'mini-goal':''}"></i>`;
})).join('')}</div>`;}
export function header(campaign:Campaign):string{
 return `<header class="site-header"><a class="brand" href="#" data-action="menu"><span class="brand-mark">↱</span><span>ROTA DO CÓDIGO<small>MISSÃO / REINICIAR</small></span></a>
  <div class="campaign-meter"><span data-testid="xp">${campaign.completed.length*100} XP</span><div class="xp-track" aria-label="${campaign.completed.length} de 4 missões concluídas"><i style="width:${campaign.completed.length*25}%"></i></div><small>${campaign.completed.length}/4 MISSÕES</small></div>
  <button id="menu-button" class="quiet" data-action="menu">Campanha</button></header>`;
}
export function home(levels:Level[],campaign:Campaign):string{
 const count=campaign.completed.length;
 return `<main class="campaign-home"><section class="campaign-intro"><div><p class="eyebrow"><i class="live-led"></i> LABORATÓRIO DIGITAL / JOGUE NO NAVEGADOR</p>
  <h1>O sistema caiu.<br><em>Você tem o código.</em></h1><p>Programe seu robô para recuperar dados, corrigir erros e reativar o circuito.</p>
  <div class="hero-actions"><button id="play" class="primary large" data-action="play">${count===4?'Ver sistema recuperado':count?'Continuar missão':'▶ Jogar'}${count>0&&count<4?` ${count+1}`:''}</button><button id="learn" data-action="tutorial">Como jogar</button></div>
  <p class="version">v${escape(campaign.version.version)} · ${escape(campaign.version.sha.slice(0,7))} <span>WEB + OFFLINE</span></p></div>
  <div class="robot-dock"><div class="dock-label"><span>UNIDADE RDC-01</span><span class="ready-light">PRONTO</span></div><div class="dock-robot">${robot}</div><div class="dock-readout"><span>↑ PROGRAMAR</span><span>▤ RECUPERAR</span><span>↻ AUTOMATIZAR</span></div></div></section>
  <section class="missions" aria-labelledby="missions-title"><div class="mission-heading"><div><p class="eyebrow">SEU MAPA DE MISSÕES</p><h2 id="missions-title">Quatro sistemas. Uma missão.</h2></div><span>SEM CRONÔMETRO · TENTE DE NOVO</span></div>
  <div class="mission-track">${levels.map((l,i)=>{
   const done=campaign.completed.includes(l.id),locked=i>count;
   return `<button class="mission-card ${done?'done':''} ${locked?'locked':i===count?'available':''}" data-action="select" data-index="${i}" ${locked?'disabled':''} aria-label="Missão ${i+1}: ${escape(l.title)}${locked?', bloqueada':done?', concluída, jogar novamente':', disponível'}">
    <div class="mission-card-top"><span>MISSÃO 0${i+1}</span><b>${done?'✓':locked?'▣':'▶'}</b></div>${miniature(l)}<span class="mission-glyph">${glyphs[i]}</span><h3>${escape(l.title)}</h3><p>${escape(l.concept)}</p><div class="mission-card-bottom"><span>${done?'MEDALHA CONQUISTADA':locked?'CONCLUA A ANTERIOR':'INICIAR MISSÃO'}</span><strong>${done?'✓':'100 XP'}</strong></div></button>`;
  }).join('')}</div></section>
  <div class="campaign-bottom"><p>${campaign.saved?'Progresso neste navegador.':'O progresso fica nesta sessão.'} Sem conta, vidas ou limite de tempo.</p><button id="reset-progress" class="quiet" data-action="reset-prompt">Reiniciar campanha</button></div></main>`;
}
export function briefing(level:Level,index:number):string{
 return `<main class="briefing-layout"><section class="brief-copy"><p class="eyebrow">BRIEFING / MISSÃO 0${index+1}</p><h1>${escape(level.title)}</h1><p class="brief-story">${escape(level.briefing)}</p>
  <div class="objective-card"><span>SEU OBJETIVO</span><h2>${escape(level.objective)}</h2></div><div class="brief-stats"><span>${level.requiredPackets?`${level.requiredPackets} PACOTES`:'A AND B'}</span><span>ATÉ ${level.maxBlocks} BLOCOS</span><span>+100 XP NA PRIMEIRA VEZ</span></div>
  <button id="begin-mission" class="primary large" data-action="begin-mission">Iniciar missão ↗</button><p class="brief-note">Monte os comandos, execute e observe. Se falhar, edite e tente novamente.</p></section><section class="brief-map" aria-label="Prévia do mapa">${board(level)}</section></main>`;
}
export function training(state:RunState):string{
 const step=tutorialSteps[state.cursor];
 return `<main class="training-layout"><section class="training-copy"><p class="eyebrow">TREINO INTERATIVO / SEM XP</p><h1>${step?step.title:'Pronto para programar!'}</h1>
  <p>${step?step.text:'Você avançou, coletou um pacote e mudou de direção. Agora monte sua própria sequência na primeira missão.'}</p>
  <div class="training-progress" aria-label="${state.cursor} de 4 ações do treino">${tutorialSteps.map((s,i)=>`<span class="${i<state.cursor?'done':i===state.cursor?'current':''}">${i<state.cursor?'✓':icons[s.kind]}</span>`).join('')}</div>
  ${step?`<div class="training-controls">${(['advance','collect','left'] as const).map(kind=>`<button id="train-${kind}" class="${step.kind===kind?'primary':''}" data-action="train-action" data-kind="${kind}" ${step.kind!==kind?'disabled':''}>${icons[kind]} ${labels[kind]}</button>`).join('')}</div><p class="training-note">Clique no comando destacado e veja o efeito no mapa.</p>`:'<button id="training-next" class="primary large" data-action="training-next">Ir à primeira missão ↗</button>'}
  ${step?'<button class="quiet" data-action="training-next">Já conheço: ir à missão</button>':''}</section>
  <section>${board(tutorial,state)}${variables(tutorial,state)}<div class="feedback" data-testid="feedback" role="status" aria-live="polite">${escape(state.message)}</div></section></main>`;
}
export function result(level:Level,index:number,state:RunState,earned:number):string{
 const won=state.status==='won';
 return `<main class="result-layout"><section class="result-map">${board(level,state)}${variables(level,state)}</section><section class="result-copy"><p class="eyebrow">MISSÃO 0${index+1} / ${won?'CONCLUÍDA':'DEPURAÇÃO'}</p>
  <h1>${won?'Sistema recuperado!':'Vamos corrigir<br>a instrução.'}</h1><p class="result-message" data-testid="feedback" role="status">${escape(state.message)}</p>
  ${won?`<div class="reward"><span class="medal">${glyphs[index]}</span><div><small>MEDALHA / ${medals[index]}</small><strong>${earned?'+100 XP':'MISSÃO REVISITADA'}</strong><p>${earned?'Nova missão desbloqueada.':'XP já recebido; experimente outra solução.'}</p></div></div><div class="lesson"><span>O QUE SEU CÓDIGO FEZ</span><p>${escape(level.lesson)}</p></div>`:
   `<div class="diagnosis"><span>INSTRUÇÃO ${state.cursor} / ${escape(state.reason??'erro')}</span><p>O programa ficou salvo no editor. Use o registro abaixo para encontrar a causa e ajustar os blocos.</p></div>`}
  <div class="result-actions">${won?`<button id="next" class="primary large" data-action="next">${index===3?'Concluir campanha':'Próxima missão'} ↗</button>`:''}<button id="edit" class="${won?'':'primary'}" data-action="edit">${won?'Experimentar outra solução':'Editar e tentar novamente'}</button><button data-action="reset">Recomeçar missão</button></div></section>
  <details class="trace" ${won?'':'open'}><summary>Registro da execução · ${state.steps} passos</summary><ol>${state.trace.map(line=>`<li>${escape(line)}</li>`).join('')}</ol></details></main>`;
}
export function complete(levels:Level[],campaign:Campaign):string{
 return `<main class="complete"><div class="completion-robot">${robot}</div><p class="eyebrow">04 / 04 SISTEMAS RECUPERADOS</p><h1>Seu código<br><em>fez a diferença.</em></h1><p>Dados recuperados. Firmware corrigido. Circuito aberto. Inspeção automatizada.</p><div class="total-xp">${campaign.completed.length*100} <small>XP</small></div>
  <div class="medal-shelf">${levels.map((l,i)=>`<div><span>${glyphs[i]}</span><strong>${medals[i]}</strong><small>${escape(l.concept)}</small></div>`).join('')}</div><button id="back-campaign" class="primary large" data-action="menu">Voltar ao mapa de missões</button><p>Revisite as missões para testar outras soluções.</p></main>`;
}
export function resetDialog():string{return `<dialog class="reset-dialog" aria-labelledby="reset-title"><h2 id="reset-title">Reiniciar a campanha?</h2><p>As medalhas e o XP deste jogo serão apagados neste navegador. Você pode jogar todas as missões novamente.</p><div><button id="reset-cancel" data-action="reset-cancel">Manter progresso</button><button id="reset-confirm" class="primary" data-action="reset-confirm">Reiniciar campanha</button></div></dialog>`;}
