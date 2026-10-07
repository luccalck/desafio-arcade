# Laboratório de lógica - plano de implementação

> Execução inline com executing-plans na branch feature/primeiro-ciclo, fonte única jogo-arcade. Subskills opcionais de worktree/subagent/finishing não disponíveis no catálogo; nenhum agente ou novo checkout necessário. Aprovação integral do design já recebida. Preservar C/P/D/R/S e G0–G8.

**Objetivo:** cinco missões de lógica e desafio final com aula/exemplo/prática/desafio, menus de jogo e WEB offline.
**Arquitetura:** core puro interpretando ações, SE/SENÃO, expressões booleanas e PARA CADA limitado; conteúdo JSON/schema/soluções em seis missões; HTML/SVG/CSS com estados de aprendizagem e editor acessível. Uma campanha ativa.
**Stack:** TypeScript/Ajv/Vitest/Playwright/esbuild existentes; nenhuma dependência nova.

## P01/P02/D01 - contratos e conteúdo (INT02/04)

- [ ] Criar src/core/lab-types.ts e tests/unit/lab-engine.test.ts antes de lab-engine: Block = {kind:'action',action} | {kind:'if',condition,then,else} | {kind:'foreach',body}; Expr = predicate | and/or com left/right. Estado guarda energia, contador, estado da central, decisões, lotes e fila de instruções; trace explica antes/depois e ramo.
- [ ] Teste inicial: `expect(runLab(sequence,scenario,[{kind:'action',action:'read'}]).status).toBe('failed')`; rodar `npm test -- tests/unit/lab-engine.test.ts` e preservar falha contratual por módulo ausente.
- [ ] Implementar src/core/lab-engine.ts: startLab copia cenário/fila; stepLab avalia uma instrução, expande ramo/PARA CADA na fila, aplica precondições e orçamento100. Sem eval, laço aninhado ou mutação do cenário. runLab itera até fim; evaluateGoal valida saídas/counter/precondições por modo.
- [ ] Criar src/content/missions.json com seis missões, cards de aula, exemplo distinto, prática guiada parcial e cenários do desafio (final3). Soluções estruturadas executadas contra todos os cenários. Semântica limita objetos/IDs/cenários, lotes8, profundidade de condição e budgets.
- [ ] Modificar src/content/schema.json, validate.ts e scripts/check-content.ts para novo conteúdo; testes integração cobrem schema desconhecido, ID duplicado, solução errada, contagem final incoerente e lote inválido. `npm run content:check` deve informar6missões válidas.

## D02/D04 - regras e persistência (INT04/06)

- [ ] Contratos significativos: sequência/precondições; carregar/processar valores e limites; ambos ramos; tabela E/OU agrupada; lote3/5 e contador; finalcom0saídas; dependência de inicializar; gate de relatório; imutabilidade; algoritmo errado falha em dataset pertinente; limite100operações.
- [ ] Modificar progress.ts para chave rota-do-codigo:lab:v2/version2, IDs novos. Não migrar vitória antiga para conceitos novos. Atualizar tests/unit/progress.test.ts e criar preferências validadas em src/core/preferences.ts (chave própria, catch armazenamento). XP via recompensas de100/200; replay idempotente e reset só chave própria.
- [ ] Retirar engine/grid/types/conteúdo de rotas e seus testes das fontes ativas, preservados no histórico Git e evidência real#1; adaptar regressão de foco ao editor novo. `npm run test:ci`: mínimo15unit/3integração e cobertura≥70core, sem testes que só espelham render.

## P03/P04/D03 - menus e aprendizagem (INT02/04)

- [ ] Criar editor focado src/scenes/lab-editor.ts e simulador src/scenes/lab-board.ts; substituir views/app, manter shared/robô original. Renderizar filas, energia/contador, central, pacote atual, regra/ramo e saídas reais do estado. Editor por botões/select com agrupamento explícito; utilitário `blockAt(program,path)` localiza bloco por índices, nenhum eval.
- [ ] Tela inicial (novo/continuar/missões/ajuda/opções), seis setores desbloqueados por sequência, lição3cards, exemplo por passo semXP, prática guiada semXP e desafio com casos diferentes; finalcom3casos. Resultado de falha preserva programa; XP só após todos os cenários passarem. Pausa conserva execução, reabrir aula permite retornar ao programa.
- [ ] Opções de texto maior/movimento reduzido e reset confirmado; progress antigo preservado com aviso. layout responsivo/paleta atual, controles44px, foco/texto/ícones, não exigir arrastar; sem áudio novo.
- [ ] E2E helpers escolhem missão por execução real da anterior, adicionam solução através de controles UI; nenhum unlock injetado no storage para simular campanha. Testes: menus/aula/demo/prática/desafio, correção, variáveis, ambos ramos, E/OU, lote, final3/700XP, reload/replay/reset próprio, pause, revisão aula, opções, foco real#1, mobile e file offline.

## R02/R03/S01/S02 - documentação e aceites técnicos (INT02/03/04/05/06)

- [ ] Bump0.3.0 sem tag: `npm version 0.3.0 --no-git-tag-version`; atualizar index/LEIA-ME. `npm run lint`, build e test:e2e; inspecionar screenshots desktop/mobile reais, corrigir problemas encontrados.
- [ ] Commit implementação por bloco com hookGitleaks; capturas para GDD identificam fonte real. Atualizar GDD12seções e Esteira, seis mapas/sistemas, UI/fluxo/arte/IA/design/README/matriz. MarcadorPDFedit uma vez antes de autorar GDD, gerarPDF/pdfinfo/renderizar todaspáginas e inspecionar.
- [ ] `npm run reproducibility`, package, audit produção crítico, sbom; conferir ZIP/hash. Push mesmo PRdraft, esperar CI atual verde (qualidade/segurança/build/E2E/ci). Atualizar título/descrição e acompanhamento local com métricas reais; revisão humana ainda pendente, nenhum merge.

Não fechar G0 ou inventar eficácia/playtest/release. HML/PRD/rollback/sondas/DORA/vídeo/triagem não são aceites deste redesign. Datas/versões/links devem distinguir candidato de produção.
