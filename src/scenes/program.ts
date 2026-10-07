import {countBlocks} from '../core/engine';
import type {Command,Primitive,Level,RunState} from '../core/types';
import {escape} from './shared';
export const labels:Record<Primitive,string>={advance:'Avançar',left:'Virar à esquerda',right:'Virar à direita',collect:'Coletar',activate:'Ativar'};
export const icons:Record<Primitive,string>={advance:'↑',left:'↶',right:'↷',collect:'▤',activate:'⏻'};
const help:Record<Primitive,string>={advance:'Uma casa na direção do robô',left:'Girar 90° sem andar',right:'Girar 90° sem andar',collect:'Recuperar dados do terminal',activate:'Ligar o interruptor desta casa'};
export function editor(level:Level,program:Command[],active:boolean,state:RunState|undefined,draft:Primitive[],times:number,repeatOpen:boolean):string{
 const commandIndex=state?.cursor?state.executions[state.cursor-1]?.commandIndex:-1;
 const disabled=active?'disabled':'';
 const palette=level.allowedActions.map(kind=>`<button id="add-${kind}" class="palette-${kind}" data-action="add" data-kind="${kind}" ${disabled} title="${help[kind]}">
  <span class="command-icon">${icons[kind]}</span><span>${labels[kind]}<small>${help[kind]}</small></span><b>+</b></button>`).join('');
 const rows=program.map((command,i)=>`<li class="program-row ${i===commandIndex?'current':''} ${i===commandIndex&&state?.status==='failed'?'error':''}">
  <span class="line-no">${String(i+1).padStart(2,'0')}</span><div class="command-label">${command.kind==='repeat'?`<strong>↻ Repetir ${command.times} vezes</strong><span class="repeat-body">${command.body.map(kind=>`${icons[kind]} ${escape(labels[kind])}`).join(' → ')}</span>`:
   `<label class="sr-only" for="command-${i}">Alterar comando ${i+1}</label><select id="command-${i}" data-command-index="${i}" ${disabled}>${level.allowedActions.map(kind=>`<option value="${kind}" ${kind===command.kind?'selected':''}>${icons[kind]} ${labels[kind]}</option>`).join('')}</select>`}</div>
  <div class="line-controls"><button id="up-${i}" aria-label="Mover comando ${i+1} para cima" data-action="up" data-index="${i}" ${active||i===0?'disabled':''}>↑</button><button id="down-${i}" aria-label="Mover comando ${i+1} para baixo" data-action="down" data-index="${i}" ${active||i===program.length-1?'disabled':''}>↓</button><button id="remove-${i}" aria-label="Remover comando ${i+1}" data-action="remove" data-index="${i}" ${disabled}>×</button></div></li>`).join('');
 const repeat=level.allowRepeat?`<div class="repeat-builder"><button id="toggle-repeat" class="repeat-toggle" data-action="toggle-repeat" aria-expanded="${repeatOpen}" aria-controls="repeat-content" ${disabled}>↻ Montar bloco Repetir <span>${repeatOpen?'−':'+'}</span></button>
  ${repeatOpen?`<div id="repeat-content"><p>1. Monte o grupo de ações</p><div class="draft-controls">${level.allowedActions.map(kind=>`<button id="draft-${kind}" data-action="draft" data-kind="${kind}" ${disabled} aria-label="Grupo: ${labels[kind]}">${icons[kind]} ${labels[kind]}</button>`).join('')}</div>
  <div class="draft" aria-live="polite">${draft.length?draft.map(kind=>`<span>${icons[kind]} ${labels[kind]}</span>`).join(''):'O grupo está vazio.'}</div>
  <div class="repeat-footer"><label for="repeat-times">2. Repita</label><select id="repeat-times" ${disabled}>${[2,3,4].map(n=>`<option ${times===n?'selected':''}>${n}</option>`).join('')}</select><span>vezes</span><button id="draft-clear" data-action="draft-clear" ${disabled}>Limpar grupo</button></div>
  <button id="repeat-add" class="primary" data-action="repeat-add" ${active||!draft.length?'disabled':''}>3. Adicionar repetição ao programa</button></div>`:''}</div>`:'';
 return `<section class="editor" aria-labelledby="editor-title"><div class="section-heading"><h2 id="editor-title">Seu programa</h2><span data-testid="block-count">${countBlocks(program)} / ${level.maxBlocks} blocos</span></div>
  <p class="editor-guide">Clique para adicionar. A ordem dos blocos é a ordem da execução.</p><div class="palette">${palette}</div>${repeat}
  <ol class="program" aria-label="Sequência de comandos">${rows||'<li class="empty-program"><span>＋</span>Monte sua primeira instrução<br><small>Escolha um comando acima.</small></li>'}</ol>
  <div class="execution-controls"><button id="run" class="primary" data-action="run" ${active?'disabled':''}>▶ Executar</button><button id="step" data-action="step" ${disabled}>Um passo</button><button id="stop" data-action="stop" ${active?'':'disabled'}>Parar</button><button id="clear" data-action="clear" ${disabled}>Limpar</button></div>
  <p class="editor-note">Um passo destaca a instrução e mostra o que ela mudou.</p></section>`;
}
