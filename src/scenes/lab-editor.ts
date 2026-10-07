import type {Action,Block,Expr,IfBlock,Mission} from '../core/lab-types';
import {actionLabels,countBlocks,predicateLabels} from '../core/lab-engine';
import {escape} from './shared';
export const actionNotes:Record<Action,string>={power:'Prepara a energia da central',sensor:'Precisa da central ligada',read:'Precisa do sensor iniciado',report:'Precisa de uma leitura',charge:'Acrescenta a carga disponível',process:'Usa energia para uma operação',resetCount:'Cria a variável enviados com zero',count:'Aumenta o contador após um envio',send:'Encaminha o pacote atual',review:'Separa o pacote atual',allow:'Decide que o acesso está liberado',deny:'Decide que o acesso está bloqueado',release:'Conclui o sistema com meta atingida',hold:'Mantém o relatório bloqueado'};
export function makeIf(m:Mission,afterLoop=false):IfBlock{
 let condition:Expr={kind:'predicate',name:m.predicates[0]};
 if(m.mode==='boolean')condition={kind:'or',left:{kind:'or',left:{kind:'predicate',name:'credentials'},right:{kind:'predicate',name:'enoughEnergy'}},right:{kind:'predicate',name:'maintenance'}};
 if(m.mode==='final')condition={kind:'and',left:{kind:'predicate',name:afterLoop?'countMet':'valid'},right:{kind:'predicate',name:afterLoop?'lotDone':'permission'}};
 return {kind:'if',condition,then:[],else:[]};
}
export function listAt(program:Block[],path:string):Block[]{
 if(!path)return program;let list=program;const parts=path.split('.');
 for(let i=0;i<parts.length;i+=2){const b=list[Number(parts[i])],field=parts[i+1];if(b?.kind==='foreach'&&field==='body')list=b.body;else if(b?.kind==='if'&&(field==='then'||field==='else'))list=b[field];else throw new Error('Grupo inválido no editor.');}
 return list;
}
export function blockAt(program:Block[],path:string):Block{const parts=path.split('.');const index=Number(parts.pop());return listAt(program,parts.join('.'))[index];}
function predicateSelect(m:Mission,name:string,part:string,e:Expr,path:string,disabled:boolean):string{
 const value=e.kind==='predicate'?e.name:m.predicates[0];
 return `<select id="condition-${path}-${part}" aria-label="${name} ${path}" data-change="predicate" data-path="${path}" data-part="${part}" ${disabled?'disabled':''}>${m.predicates.map(p=>`<option value="${p}" ${p===value?'selected':''}>${escape(predicateLabels[p])}?</option>`).join('')}</select>`;
}
function joinSelect(name:string,part:string,e:Expr,path:string,disabled:boolean):string{return `<select id="join-${path}-${part}" aria-label="${name} ${path}" data-change="operator" data-path="${path}" data-part="${part}" ${disabled?'disabled':''}><option value="and" ${e.kind==='and'?'selected':''}>E</option><option value="or" ${e.kind==='or'?'selected':''}>OU</option></select>`;}
function condition(m:Mission,b:IfBlock,path:string,disabled:boolean):string{
 const e=b.condition;
 if(e.kind==='predicate')return predicateSelect(m,'Condição','a',e,path,disabled);
 const inside=m.mode==='boolean'&&e.left.kind!=='predicate'?e.left:e;
 return `<div class="condition-group"><span>(</span>${predicateSelect(m,'Primeira condição','a',inside.left,path,disabled)}${joinSelect('Conector interno','inner',inside,path,disabled)}${predicateSelect(m,'Segunda condição','b',inside.right,path,disabled)}<span>)</span></div>${m.mode==='boolean'&&e.left.kind!=='predicate'?`<div class="condition-alternative">${joinSelect('Conector externo','outer',e,path,disabled)}${predicateSelect(m,'Alternativa','c',e.right,path,disabled)}</div>`:''}`;
}
function actionChoice(m:Mission,path:string,branch:string,disabled:boolean):string{return `<label class="branch-add">Adicionar em ${branch}<select id="branch-${path}" aria-label="Adicionar em ${branch} ${path}" data-change="append" data-parent="${path}" ${disabled?'disabled':''}><option value="">Escolha uma ação…</option>${m.actions.map(a=>`<option value="${a}">${escape(actionLabels[a])}</option>`).join('')}</select></label>`;}
function rows(m:Mission,blocks:Block[],parent:string,active:string,disabled:boolean):string{
 return blocks.map((b,i)=>{
 const path=parent?`${parent}.${i}`:String(i),instructionPath=path.replaceAll('.body.','.').replaceAll('.then.','.t.').replaceAll('.else.','.e.');
 const group=b.kind!=='action',title=b.kind==='action'?actionLabels[b.action]:b.kind==='if'?'SE / SENÃO':'PARA CADA pacote';
 return `<article class="code-block ${group?'group':''} ${active===instructionPath||group&&active.startsWith(instructionPath+'.')?'executed':''}" data-block="${path}"><header><span class="line-number">${i+1}</span><strong>${escape(title)}</strong><div class="line-controls">${parent.endsWith('then')||parent.endsWith('else')?'':`<button data-action="move" data-path="${path}" data-direction="-1" aria-label="Mover bloco ${path} para cima" ${disabled||i===0?'disabled':''}>↑</button><button data-action="move" data-path="${path}" data-direction="1" aria-label="Mover bloco ${path} para baixo" ${disabled||i===blocks.length-1?'disabled':''}>↓</button>`}<button id="remove-${path}" data-action="remove" data-path="${path}" aria-label="Remover bloco ${path}" ${disabled?'disabled':''}>×</button></div></header>
 ${b.kind==='action'?`<p>${escape(actionNotes[b.action])}</p>`:b.kind==='if'?`<div class="condition-builder">${condition(m,b,path,disabled)}</div><div class="branches"><section class="yes-branch"><h4>ENTÃO <small>quando verdadeiro</small></h4>${rows(m,b.then,`${path}.then`,active,disabled)}${actionChoice(m,`${path}.then`,'ENTÃO',disabled)}</section><section class="no-branch"><h4>SENÃO <small>quando falso</small></h4>${rows(m,b.else,`${path}.else`,active,disabled)}${actionChoice(m,`${path}.else`,'SENÃO',disabled)}</section></div>`:`<div class="loop-body"><p>Repita este trabalho uma vez por item:</p>${rows(m,b.body,`${path}.body`,active,disabled)}<div class="loop-palette"><button id="loop-if-${path}" data-action="add-if" data-parent="${path}.body" ${disabled?'disabled':''}>+ SE / SENÃO</button>${m.actions.map(a=>`<button data-action="add" data-kind="${a}" data-parent="${path}.body" ${disabled?'disabled':''}>+ ${escape(actionLabels[a])}</button>`).join('')}</div></div>`}</article>`;
 }).join('');
}
export function editor(m:Mission,program:Block[],active:string,disabled:boolean):string{
 return `<section class="program-panel" aria-labelledby="program-title"><div class="panel-heading"><h2 id="program-title">Seu programa</h2><span data-testid="block-count">${countBlocks(program)} / ${m.maxBlocks} blocos</span></div><p>Monte as regras. Teste, observe e ajuste.</p><div class="command-palette">${m.actions.map(a=>`<button id="add-${a}" data-action="add" data-kind="${a}" ${disabled?'disabled':''}><b>+</b><span>${escape(actionLabels[a])}<small>${escape(actionNotes[a])}</small></span></button>`).join('')}${m.hasIf?`<button id="add-if" class="special" data-action="add-if" ${disabled?'disabled':''}>◇ SE / SENÃO</button>`:''}${m.hasLoop?`<button id="add-loop" class="special" data-action="add-loop" ${disabled?'disabled':''}>↻ PARA CADA pacote</button>`:''}</div><div class="program-list">${program.length?rows(m,program,'',active,disabled):'<div class="empty-program"><span>＋</span><strong>O sistema espera suas instruções</strong><p>Escolha um bloco acima para começar.</p></div>'}</div><button id="clear-program" class="quiet" data-action="clear" ${disabled?'disabled':''}>Limpar programa</button></section>`;
}
