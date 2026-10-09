# Bancada visual Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Construir cinco puzzles visuais e um final com peças/conexões, dados animados, múltiplas soluções e pouca informação permanente na tela.

**Architecture:** Core determinístico por eventos processa montagem de módulos em bancada 7×5, portas e cabos, pacotes e memória. Conteúdo JSON/schema contém seis missões, cenários/metas/duas soluções verificadas; HTML/SVG/CSS renderiza snapshots e fornece arraste ou seleção por clique/toque/teclado. Uma única campanha ativa; histórico anterior preservado.

**Tech Stack:** TypeScript, Ajv, Vitest, Playwright, esbuild IIFE, SVG/HTML/CSS existentes; sem dependência nova ou rede na partida.

Execução inline no mesmo repo/branch autorizados. Subskills de worktree/subagent/finishing ausentes no catálogo; não criar checkout/agentes nem trabalhar em main. Revisão humana permanece antes de merge. C/P/D/R/S e G0–G8 preservados.

### 1. P01/P02/D01 — tipos, contratos e simulador (INT02/04)

Files: src/core/circuit-types.ts, circuit-engine.ts, circuit-layout.ts; tests/unit/circuit.test.ts.

- [x] Contratos antes do módulo. Criar teste abaixo e executar `npm test -- tests/unit/circuit.test.ts`: falha por import ausente, preservar JUnit local .contexto/circuit-tdd/red.xml.

```ts
import {runCircuit} from '../../src/core/circuit-engine';
import source from '../../src/content/missions.json';
it('a entrada original não é modificada',()=>{
 const m=source.missions[0],before=JSON.stringify(m);
 runCircuit(m,m.cases[0],m.solutions[0]);
 expect(JSON.stringify(m)).toBe(before);
});
```

- [x] Criar contratos: Kind=source/sink/relay/add/multiply/filter/buffer; Node={id,kind,x,y,rotation,config}; Edge={from,port,to}; Layout={nodes,edges}; Packet={id,value,valid,permission,credentials,energy,maintenance}; Case={id,packets,expected:[{id,sink,value}],target}; Mission={id,title,concept,goal,help,reward,mode,budget,maxSpan,blocked,available,predicates,fixed,cases,solutions}. State={status,tick,queue,held,count,batchDone,outputs,active,lastPacket,lastEdge,fault,message,trace}.
- [x] circuit-layout valida IDs únicos/slots/faixa/obstáculos, orçamento, tipos/configs permitidas, portas disponíveis, conexões únicas por saída, distância/cabo que evita obstáculo, grafo acíclico e source/sink fixos. cablePath escolhe um dos dois trajetos ortogonais válidos; cruzamento não cria junção.
- [x] circuit-engine start copia fila e montagem; step copia estado, processa um evento, registra valor/posição/porta. relay envia; add/multiply transformam; filter avalia predicados agrupados e escolhe yes/no; buffer acumula/conta e só libera após terminar entrada. Fila vazia libera buffers, depois verifica conservação/metas por id/destino/valor e, quando exigida, memória/lote. Orçamento512ticks/10pacotes e range0..999. run itera até statusfinal, sem DOM/eval/mutação externa.
- [x] Contratos: duas montagens válidas por missão; transformação enganosa falha em outras entradas; ambos ramos; E/OU oito combinações; memória antes/depois; perdas/destinos/valores errados; imutabilidade; rota bloqueada/porta inválida/ciclo/limites/configs; estado final idempotente.

### 2. P02/D01/D04 — conteúdo e persistência (INT02/04/06)

Files: src/content/missions.json, schema.json, validate.ts; scripts/check-content.ts/reproducibility.mjs; tests/integration/content.test.ts; src/core/progress.ts; tests/unit/progress.test.ts.

- [x] Escrever seis missões: conexão com parede e span3/duas rotas; x+3 sob entradas1/3/5; integridade com revisão; (credencial E energia) OU manutenção; buffer com contagem e três lotes; finalclassificação íntegro E autorizado/+3/buffer/3lotesincluindo0. Soluções duas por missão, com variantes de rota/ordem/ramificação.
- [x] Ajv strict/additionalProperties false,6missões, cases/packets limitados, números/ranges/enums/slots/configs. Semântica valida ordem/reward100/200/IDs/pacotes/metas e executa as duas soluções em todos os casos. JSON inválido ou solução incompatível interrompe build. Integração verifica campo extra/IDduplicado/meta inventada/solução incompleta/entrada incoerente/limite/lote0 real.
- [x] Progresso novo: `PROGRESS_KEY='rota-do-codigo:bench:v3'`; persistir/validar version3 prefixo IDs. Preservar chaves antigas sem desbloqueio automático. Reutilizar preferences e testes de armazenamento/replay/reset próprio.
- [x] Retirar lab-* e seus testes das fontes ativas depois que novo core/conteúdo passam; histórico Git/evidência real de foco preservados. Não manter duas campanhas concorrentes.

### 3. P03/P04/D03 — apresentação e interação (INT02/04)

Files: src/scenes/circuit-board.ts, circuit-inspector.ts, views.ts, app.ts, src/style.css, index.html.

- [x] Mesa7×5 com botões de encaixe, nós/ícones/portas, SVG de cabos, pacotes animados e destino/meta numérica. Header compacto/meta1frase; bandeja recolhível; iniciar/pausar/desfazer/ajuda. Nenhuma aula obrigatória. Menus/pausa/opções mantidos com pouco texto.
- [x] Colocar por dragstart/drop e por escolher peça+encaixe; mover por seleção+destino e arraste; girar muda orientação visual/posição de portas preservando o significado. Conectar: selecionar peça, saída out/yes/no no inspetor, depois destino; clique/toque/teclado equivalentes. Seleção mostra só inspetor contextual; remover peça remove cabos relacionados; desfazer snapshot limitado50. Falha dá foco/realce em peça/pacote/cabo, montagem preservada.
- [x] Simulação usa snapshots do core com timer; pausa conserva fila/retoma; montar enquanto execução interrompe e reinicia ensaio; verificar casos em sequência e XP após todos. Replays sem XP extra. Resultado compacto; casos/log/help sob demanda. Reduced-motion e texto maior respeitados. Mobile mesa cabe largura, toque≥44px via encaixe/inspetor, sem obrigação de arrastar.

### 4. D05 local/D06 — validação da experiência (INT04)

Files: tests/e2e/helpers.mjs, lab.spec.mjs/smoke.spec.mjs; reports/screens reais.

- [x] Playwright helpers constroem nodes/configs/edges pelo DOM; não injetar desbloqueio/progresso. Testar colocação/conexão, arraste/rotação/movimento/desfazer, falha/correção, cenário transformativo, duas soluções, campanha700, pausa, teclado/foco/remoçãoúltima regressão#1, menus/help/log/options, storage/replay/reset próprio, mobile390×844 e file:// semrede. Smoke inclui versão e primeira missão real.
- [x] `npm run lint`, `test:ci`, `content:check`, `build`, `test:e2e`. Inspecionar captures reais desktop/mobile/transformação/final, corrigir causas das falhas. Primeiro resolver UI da conexão e transformação; expandir demais no mesmo componente.

### 5. R02/R03/S01/S02 — documentos e fechamento técnico (INT02/03/04/05/06)

Files: scripts/build.mjs/docs-assets.mjs/gdd-pdf.mjs, docs/gdd.md/images/evidencias, README/design/backlog/AI-USAGE/matriz, package/lock.

- [x] Version0.4.0 semtag, LEIA-ME fiel aos gestos/WEBoffline. Atualizar doze seções GDD/Esteira/mapas/wireframes/IA/referências e capturas identificadas; preservar fontes históricas e distinção candidato/produção. PDFmarkeredit uma vez antes da autoria, gdd:pdf/pdfinfo/renderALLpáginas/inspeção.
- [ ] `npm run reproducibility`, `package`; auditprodução crítico/SBOM/hookGitleaks; conferir ZIP<25MB/checksum/version. Commits meaningful com scanner, push no mesmo PRdraft, título/descrição final e CI doúltimocommit verde; baixar/conferir artifacts. Sem merge/autorrevisão/produçãofictícia.
- [ ] Acompanhamento local por código/INT/paths/comandos/resultados/evidências/pendências. G0 e revisão pelos quatro continuam humanos; HML/PRD/recuperação/DORA/pitch/tag/triagem não declarar concluídos.


Execução local concluída em07/10/2026; evidências em docs/evidencias/bancada-visual.md. Checklist de push/CI/registro permanece aberto até conferir a execução do último commit. Não representa liberação dos checkpoints acadêmicos.
