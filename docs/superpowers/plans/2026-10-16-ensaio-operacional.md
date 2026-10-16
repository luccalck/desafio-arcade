# Plano de execução — ensaio operacional

> Execução inline com executing-plans, conforme autorização de Lucca. Desenho aprovado: ../specs/2026-10-16-ensaio-operacional-design.md. Não declarar teste como incidente ou participante humano.

Objetivo: preparar e executar ensaio isolado, preservar provas e fechar somente o que for comprovado. Stack: Node24, Vitest, Playwright e GitHubActions/Pages existentes. Worktreefechamento; identidade GitHub luccalck confirmada; alterações pessoais da outra worktree preservadas.

## Tarefa1 — alertas isolados e DORA

Arquivos: scripts/alertas.mjs, scripts/dora.mjs, tests/integration/ensaio-alertas.test.mjs.

- [ ] Escrever regressões: ensaio não cria/fecha alerta operacional; dois ensaios não se misturam; URLHTTP somente loopback emensaio; escopo inválido rejeitado; DORA não inclui Issue com marcador deensaio.
- [ ] Executar `npx vitest run tests/integration/ensaio-alertas.test.mjs`; preservar falha antes da implementação.
- [ ] Implementar `scope:'ensaio'`, exerciseId igual run-attempt e marcador próprio, mantendo relatórios antigos como operação; exportar adaptador GitHub existente para o executor.
- [ ] Reexecutar regressões e suítes alertas/DORA; resultado esperado: todos verdes e sem mistura de escopos.

## Tarefa2 — demonstração HTTP e workflow

Arquivos: scripts/ensaio-alertas.mjs e .github/workflows/esteira.yml.

- [ ] Executor cria servidor temporário127.0.0.1, mede404 e atraso2,2s com sondar, chama reconciliação real duas vezes para confirmar deduplicação, restaura200 e fecha somente Issues desse ensaio. Sempre interromper servidor e arquivar resultado, incluindo falhas.
- [ ] Acrescentar escolha dispatch `ensaio: nenhum|alertas|recuperacao` e job independente apenas paraalertas. Nenhum deploy de branch é autorizado por essa escolha. Permissões somente contents:read/issues:write; runnerubuntu-latest; relatório artefato always.
- [ ] Executar testes locais do executor e actionlint; publicar commit/PR e dispatch do workflow existente com ref explícita para obter execução real, Issues e horários.

## Tarefa3 — recuperação protegida

Arquivos: scripts/ensaio-recuperacao.mjs, scripts/promover.mjs, .github/workflows/rollback.yml e esteira.yml; testes integration correspondentes.

- [ ] Validar ensaio somente workflow_dispatch/main e candidata distinta da estável; preservar aprovação/ref/SHA/run/tentativa e mesmoZIP. Dispatch não afirma intervalo push→HML; pushesnormais preservam gate900s.
- [ ] Observador HTTP começa antes da promoção e termina após confirmação; injeção Playwright bloqueia somente game.js no contexto de teste, registra falha real e devolve exit1 ao caminho recuperar existente.
- [ ] Verificar recuperação por Pages/hash/smoke e relógio<300s; registrar resultado inclusive falha. Motivo manual ensaio-controlado identificado e validado.
- [ ] Integrar/executar apenas após revisão externa e proteção; se a conta autora não pode aprovar, manter gate e pedir revisão do HEAD concreto.

## Tarefa4 — fechamento independente e comunicação

- [ ] Conferir créditos das seis dependências com fontes primárias; atualizar inventário/THIRD_PARTY e preservar provas.
- [ ] Fazer revisão técnica assistida dos documentos/diffs, sem registrar aprovação humana externa fictícia; reconferir CI e produção atual.
- [ ] Preparar notas/release e validar proveniência; publicar somente tag aprovada e pipeline com políticas reais. Não montar pacote acadêmico final sempitch.
- [ ] Atualizar pendências, AI-USAGE, resultados e relatório mantendo≤12páginas; preservar HTML/TXT/pitchparaofinal e playtesthumano semsimulação.

Não há aprovação de código externo, consentimento, participante humano, release, recuperação ou alerta comprovado por esta preparação. Registrar resultados conforme ocorrerem.
