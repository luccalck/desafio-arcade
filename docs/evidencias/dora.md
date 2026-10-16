# Etapa 024 — DORA e linha de base

## Estado atualizado —16/10/2026, após publicação técnica

As consultas de14–15/10 abaixo são baselines históricas, não o estado atual. A coleta38940593792 confirma dois deploys em14dias:frequência0,142857/dia,lead time médio35min19s,CFR50% com rollback planejado correlacionado,MTTR operacionalnull/zeroIssues elegíveis. As Issues38/39 têm abertura/fechamento reais e média2s **do ensaio**, separada do MTTR operacional. [Dados atuais](fechamento-independente-2026-10-16/monitor-atual-dora.json) e [interpretação/correção da contagem de deploys](fechamento-independente-2026-10-16.md). Os três valores numéricos e o null têm fontes; não afirmar ausência atual de painel/deploys nem substituir null por zero.

## Registro histórico preservado

Consulta autenticada somente leitura em 14/10/2026 às 05:05 UTC, repositório `luccalck/desafio-arcade`, janela **01/10/2026 00:00 UTC a 14/10/2026 05:02 UTC**. Comando: `node scripts/dora.mjs 2026-10-01T00:00:00Z 2026-10-14T05:02:40Z reports/dora-md2.json`. A [exportação redigida](dora-consulta-024.json) guarda horário, janela e resultado, sem token; não é dado publicado. Foram percorridas as páginas da API de [execuções da esteira](https://github.com/luccalck/desafio-arcade/actions/workflows/esteira.yml), [Issues com etiqueta alerta](https://github.com/luccalck/desafio-arcade/issues?q=label%3Aalerta) e histórico `gh-pages` quando disponível. A API da branch `observabilidade` retornou **404** na mesma consulta; nenhum `status/dora.json` foi publicado.

| Métrica | Resultado | Denominador/unidade | Fonte e regra |
|---|---|---|---|
| Frequência | N/D | 0 deploys formais; deploys/dia | Jobs `deploy-prd` reais concluídos na janela, ou promoção comprovada em `gh-pages`, vinculados ao run/SHA. CI, HML e preview excluídos. |
| Lead time | N/D | 0 pares commit→produção; horas | Data do commit GitHub ao término do job ou promoção comprovada. |
| Falha de mudança | N/D | 0 deploys formais; % | Promoção/deploy formal seguido de commit de rollback com SHA defeituoso correlacionado. Sem denominador, zero seria incorreto. |
| Recuperação | N/D | 0 Issues de alerta abertas e fechadas na janela; minutos | `created_at`→`closed_at`; Issue aberta ou sem incidente não é zero. |

O script usa paginação, janela UTC com fim exclusivo, unidades e links de origem, e rejeita limite de páginas sem resultado completo. O contrato `status/dora.json` é alimentado pelo `monitor.yml` somente quando a branch padrão e `MONITOR_ENABLED` estiverem ativos; o painel lê o mesmo commit da branch observabilidade. Dados sem observações são `null`/indisponíveis. Cinco testes de cálculo, ausência, correlação e paginação passaram dentro dos 247 testes de CI local. A linha de base Carparts é **11 dias** conforme o MD e auditoria; sem lead time medido, diferença e comparação de resultado ficam N/D. Não existe mínimo de dez execuções na ficha. O agendamento `*/15` do GitHub Actions pode atrasar ou ser descartado sob carga, como já documentado em [sondas](sondas.md); horários efetivos precisam ser comparados antes de afirmar cadência. O relatório final deve preservar essa limitação.

Pendências por requisito estão em [Passo 024](../execucao/05-pendencias-por-passo.md#passo-024). S05 e HTML original não estavam disponíveis neste computador para confronto direto.


## Coleta real e limites — 15/10/2026

O workflow calculou DORA com APIs reais nas runs38704560758,38744110194 e38770216623. Os quatro valores permanecem N/D: não houve deploy-prd formal bem-sucedido elegível, nem Issue de alerta aberta e fechada. Não substituímos denominadores ausentes por zero ou dados sintéticos. A comparação com onze dias e o efeito de uma melhoria continuam pendentes de eventos reais.

As sondas acumularam seis amostras reais. As duas execuções agendadas observadas ficaram aproximadamente5h19 separadas, embora cron esteja configurado*/15; isso impede prometer observação efetiva a cada quinze minutos ou continuidade entre amostras. O disparo manual38770216623 foi registrado como manual. [Fontes, CSV e DORA preservados](operacao-2026-10-15.md).
