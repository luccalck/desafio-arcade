# Etapa 026 — preparação e limite do ensaio de recuperação

Miguel Oliveira, 14/10/2026. **Nenhuma falha foi injetada e nenhum rollback operacional foi disparado.** A etapa requer uma janela e controlador combinados com o squad, uma baseline saudável e uma candidata controlada na produção formal. Esses dados/aceites não estavam disponíveis. Não existe Issue de ensaio a vincular; criar uma agora representaria incidente inexistente.

## Preflight verificado

- Clone na branch do MD3, derivada de `447e792`/PR#21; main não contém ainda a cadeia revisada. A branch padrão consultada na API era `docs/ficha-entrega-dados-equipe`.
- API GitHub: **0 deployments** com `environment=producao`; nenhuma das quatro variáveis `FORMAL_HML_ENABLED`, `FORMAL_PRD_ENABLED`, `MONITOR_ENABLED`, `ALERTS_ENABLED` constava na lista de variáveis do repositório. `rollback.yml` retornou HTTP 404 na API de workflows da branch padrão. Isso bloqueia um ensaio operacional pela pipeline atual.
- HTTP público: raiz e `/hml/` responderam 200; HML `version.json` servia 0.6.0/SHA `71933bfd4bd35f8c3ac8f5899a0e9af00db29f32`, anterior à branch do MD3. `/rollout.json` tinha estratégia `preview`, `activeSha` `71933bfd4bd35f8c3ac8f5899a0e9af00db29f32` e `previousSha` `6f5c704665ee6c526571c5d66771f904d8627b59`; `/status/` retornou 404. Esses dados não são produção formal nem prova de disponibilidade durante falha.
- `npm run build` passou, com seis missões e starters que falham como esperado. `npm run test:ci -- --maxWorkers=2` passou **247/247**; `npm run test:e2e` passou **36/36**, incluindo smoke, rollout sintético, campanha desktop/celular e offline. O teste focal do bug de regra antiga passou **1/1**. Essas validações são locais e não medem Pages nem alertas reais.

## Roteiro executável quando as entradas forem reais

| Momento | Ação e prova a preservar |
|---|---|
| Antes | Squad registra janela, controlador, aprovador distinto, URL de produção, SHA/versão/hashes da estável saudável, candidata com defeito deliberado e plano de abortar. Confirmar G0–G4, PRs revisados/integrados, HML aceita, flags e proteção sem bypass. Criar Issue de ensaio somente quando houver ensaio real autorizado, com identificação clara e sem segredo. |
| Início | Registrar timestamp UTC do disparo do workflow e URL/run/tentativa. Publicar exclusivamente pela esteira. Não alterar `gh-pages` manualmente, não sobrescrever releases, não interromper monitoramento. |
| Falha | Preservar relatório de smoke/sondas, erro HTTP ou versão, Issue de alerta com abertura real, SHA da candidata e instante de detecção. Distinguir falha antes da virada de falha após promoção. |
| Recuperação | Verificar job automático vermelho com `recuperar`/ponteiro anterior; se não houver confirmação saudável, acionar `rollback.yml` com aprovação humana protegida. Guardar ator/categoria/commit `gh-pages` e logs de cada tentativa, inclusive falhas. |
| Confirmação | `aguardar-versao`/smoke da raiz, sete hashes HTTP da anterior, URL 200 contínua observada por sondas, monitor e fechamento automático da Issue. Guardar horários de início/fim e propagação Pages; calcular tempo total em minutos desde a falha até confirmação pública, sem subtrair espera ou tentativas. |
| Depois | Comparar resultado com 5 minutos. Se exceder ou houver queda, investigar causa, corrigir por PR/revisão e repetir somente com nova janela. Preservar tentativa anterior e mostrar o histórico à banca. |

O plano utiliza [recuperação automática](rollback-automatico.md), [operação manual](../operacao-rollback.md), [painel](painel-status.md) e [DORA](dora.md). I07-20–23/25, I08-31, CR-03 e G5 permanecem abertos; não há cronômetro, alerta, autocerramento ou demonstração na banca. [Pendências 026](../execucao/05-pendencias-por-passo.md#passo-026).


## Reconferência — 15/10/2026

Executamos 53/53 testes locais de oito suítes e conferimos os catorze hashes HTTP das duas baselines de preview. Flags e workflows agora existem na main, mas a raiz continua no preview0.6.0: nenhuma recuperação formal foi disparada. Falta integrar o PR33 revisado, publicar produção saudável e preparar o modo explícito de ensaio, relógio falha→confirmação pública e amostragem contínua da URL. O workflow manual atual admite motivos de incidente, sem categoria de ensaio; não classificamos um teste como incidente inexistente. Os limites somados das etapas também podem ultrapassar cinco minutos e precisam ser medidos. [Resultados, fontes e próximos aceites](operacao-2026-10-15.md). G5 e os checks de recuperação operacional continuam abertos.
