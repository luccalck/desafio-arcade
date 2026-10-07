# Rota do Código — plano de evolução das missões

> Execução inline pela skill executing-plans na sessão autorizada. Complementa os roteiros atuais, preservando códigos C/P/D/R/S e G0–G8; não fecha seus aceites humanos.

**Objetivo:** implementar quatro missões tecnológicas, treino contextual, editor intuitivo e campanha com medalhas/400 XP.

**Arquitetura:** TypeScript/core puro para objetos e objetivos; JSON/Ajv para mapas/soluções; apresentação HTML/SVG; progresso local com fallback em memória. O mesmo pipeline continua gerando build offline/PDF/ZIP/scanners.

**Stack:** stack existente, sem nova dependência. Fonte única `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`, branch feature/primeiro-ciclo, PR #2.

## P01/P02/D01 — contratos e conteúdo (INT-02/04)

- [x] Ampliar `src/core/types.ts`: Primitive inclui collect/activate; MapObject discriminado terminal/switch/gate; Level inclui objects/requiredPackets/requiresCircuit/allowedActions/hints/briefing; RunState inclui packets/signals/path/from/lastAction.
- [x] Substituir JSON por 4 mapas com soluções verificáveis: dados (2 terminais), firmware (programa FF defeituoso), AND (interruptores A/B e porta), automação (repetir3 [advance,advance,collect], 3 terminais).
- [x] Schema continua strict/additionalProperties=false, admite novos comandos e campos. Semântica valida IDs/posições únicos, objetos no piso, objetivos coerentes e todas as soluções executadas. Teste: `expect(()=>validateContent(badGateWithoutB)).toThrow(/circuito/i)`.

## D02/D04 — regras e campanha guiadas por testes (INT-04/06)

- [x] Criar `tests/unit/technology.test.ts` antes de alterar engine: coleta real/idempotente, ação sem terminal, objetivo incompleto, 4 combinações AND, porta fechada/aberta, ativação local, estado imutável e repetição com coleta. Executar `npm test -- tests/unit/technology.test.ts`; esperar falha dos contratos ainda ausentes.
- [x] Engine: collect adiciona ID somente no terminal; activate liga sinal somente no interruptor; advance testa gate; vitória usa `packets.length >= requiredPackets && (!requiresCircuit || (A && B))`. Inicialização reinicia objetos por tentativa. Preservar budgets/trace e regressões anteriores.
- [x] Criar `src/core/progress.ts` e testes: `completeMission([], firstId, ids)` dá [firstId]; repetir não aumenta XP; missão bloqueada não completa; JSON desconhecido/malformado e armazenamento indisponível retornam progresso vazio sem quebrar.
- [x] Adaptar fixtures antigas para piso/objetivos neutros; executar `npm run test:ci`, mínimo anterior preservado e cobertura >=70% de core.

## P03/P04/D03 — experiência de jogo (INT-02/04)

- [x] `src/content/tutorial.ts`: treino separado com [advance,collect,left,advance], terminal e destino; sem XP. `src/scenes/views.ts` apresenta campanha/tutorial/briefing/resultado/fim; `app.ts` coordena navegação, ações e persistência.
- [x] `board.ts` mostra objetos, sinais/porta, pacotes coletados, trilha e direção textual; `program.ts` mostra blocos/iconografia, edição por seleção e repetição por botões. IDs estáveis restauram foco, inclusive montagem de grupo.
- [x] `style.css` define laboratório digital escuro, circuitos, botões com >=44px, foco/contraste e grid responsivo. Mapa/HUD/objetivo visíveis, reduz motion respeitado. Nenhuma interação depende de arrastar ou cor/áudio.
- [x] Play: tutorial → briefing → primeira missão; falha preserva programa; sucesso concede 100XP só na primeira vez, desbloqueia próxima; replay e reset de progresso funcionam sem alterar outras chaves locais.

## D05 local/P02/R02/R03/S01/S02 — aceites técnicos (INT-02/03/04/05/06)

- [x] E2E: tutorial completo, 4 missões/AND/repetir, diagnóstico/falha/correção, bloqueio/progresso/reload/sem farm/reset, teclado/foco, celular sem overflow, file:// sem rede e smoke. Preservar teste real #1. Executar `npm run lint`, `npm run build`, `npm run test:e2e`.
- [x] Capturar menu, missão, circuito e celular reais via testes; inspecionar imagens, corrigir problemas. Capturas identificadas como locais, nunca produção/playtest humano.
- [x] Atualizar GDD 12 seções para v0.2.0, mapas/fluxo/wireframes/concept SVG e AI-USAGE/README. Executar gdd:pdf/pdfinfo/renderização e inspeção de todas as páginas, reprodutibilidade/ZIP/checksum/audit/Gitleaks.
- [ ] Commits por bloco de trabalho no mesmo PR; CI real no último commit, sem merge/revisão falsa. Atualizar descrição #2 para implementação final e registrar estado/evidências no acompanhamento local.

G0 permanece pendente de pessoas/dados. HML/PRD/sondas/DORA/vídeo/triagem não são executados por este redesenho. Após aprovação de outro integrante, seguir R04/R05 e os demais roteiros; preservar mesmo artefato e gates reais.
