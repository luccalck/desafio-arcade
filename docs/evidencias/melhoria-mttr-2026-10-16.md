# Melhoria orientada pelo MTTR do ensaio —16/10/2026

Usamos os tempos reais de recuperação do ensaio para escolher uma intervenção pequena no caminho de reconciliação dos alertas. Mantivemos o limiar de latência, o atraso de 2,2 s, o cenário HTTP, os marcadores e o fechamento automático. A produção permaneceu no SHA e9dd28c; as execuções abaixo usaram o runner e a API real de Issues.

## Dado, hipótese e decisão

A baseline38950333359 apresentou abertura→fechamento de2s e4s nas Issues43/44, média3s. A inspeção encontrou seis fases sequenciais, cada uma verificando novamente as duas labels antes de listar/fechar Issues. A regressão com o adaptador anterior confirmou12consultas de metadados.

Hipótese: retirar consultas repetidas reduz trabalho antes do fechamento e pode diminuir o MTTR observado. Escolhemos guardar na instância do adaptador apenas confirmações de labels já existentes ou criadas com sucesso. A alternativa de paralelizar os GETs manteria12requisições. O cache termina com o processo, não armazena sondas ou listas de Issues e não aceita falhas como confirmação. Uma nova instância revalida as labels.

## Mudança e testes

Commit de implementação:9c226981a10788eefcffb7fe09717261eaed9bea. Em scripts/alertas.mjs, confirmedLabels evita novas consultas após sucesso; diagnostics informa somente contadores não sensíveis. scripts/ensaio-alertas.mjs preserva esse diagnóstico no recibo real. Nenhum cálculo de scripts/dora.mjs foi alterado para obter um resultado favorável.

Quatro regressões novas falharam antes. Depois,24testes focais passaram, cobrindo as seis fases,503 seguido de nova consulta,404/criação bem-sucedida,403 na criação,instâncias independentes e label inválida. Lint/tipagem passaram. As CIs de push38953484114 e PR38953489607 passaram no HEAD da implementação, assim como a execução posterior do ensaio.

## Resultado real antes/depois

| Medida | Antes | Depois | Diferença observada |
|---|---|---|---|
| Execução |38950333359 /432eb57|38953734834 /9c22698|Mesmo roteiro de seis fases|
| JogoForaDoAr |Issue43:2s|Issue45:1s|−1s|
| LatenciaAlta |Issue44:4s|Issue46:4s|Sem redução observada|
| MTTR médio do ensaio |3s,duasIssues|2,5s,duasIssues|−0,5s;16,7%|
| Consultas de labels |12no teste do adaptador anterior|2no contador da execução real|−10;83,3%|

As Issues45/46 nasceram com alerta+ensaio, não duplicaram e fecharam automaticamente. O resultado original registra duas labels confirmadas e duas requisições de metadados. O denominador da comparação de tempo é duas Issues por execução; não são quatro incidentes de produção.

Fontes: [baseline original](melhoria-mttr-2026-10-16/baseline-38950333359.json), [resultado posterior](melhoria-mttr-2026-10-16/depois-38953734834.json), [comparação calculada](melhoria-mttr-2026-10-16/comparacao.json), [Issue45](melhoria-mttr-2026-10-16/issue-45.json), [Issue46](melhoria-mttr-2026-10-16/issue-46.json), [run](melhoria-mttr-2026-10-16/run-depois.json), [testes antes](melhoria-mttr-2026-10-16/testes-antes.json) e [depois](melhoria-mttr-2026-10-16/testes-depois.json).

## Limites e operação normal

A redução de chamadas é demonstrada pela regressão e pelo contador. A redução de0,5s no MTTR é uma observação entre duas execuções, não prova de que todo o ganho foi causado pelo cache: runners e latência da API variam, e timestamps de Issues têm resolução de um segundo. Não repetimos o ensaio para escolher o melhor resultado ou encurtamos a falha artificial. A média de LatenciaAlta permaneceu4s; essa ausência de ganho também foi preservada.

O monitor38954187844 terminouSUCCESS após o ensaio: HML/produçãoHTTP200,versão0.7.0; produçãoe9dd28c preservada. O DORA operacional continuou com MTTRnull/zeroIssues elegíveis, pois os marcadores de ensaio são excluídos. [Sondas](melhoria-mttr-2026-10-16/monitor-sondas.json) e [DORA](melhoria-mttr-2026-10-16/monitor-dora.json). Não alteramos frequência de deploy,lead time,CFR ou histórico de incidentes para demonstrar melhoria.

No monitor normal há hoje uma reconciliação por processo; não alegamos ganho de consultas nesse fluxo. A melhoria alcança reconciliações repetidas na mesma instância, efetivamente usadas no ensaio. A mudança está no PR41; integração e publicação dependem da aprovação válida do HEAD final por outro integrante. O relatório e os checks registram a conclusão técnica no escopo controlado, sem antecipar nota ou aceite do professor.

## Rastreabilidade

INT-08;I08-28/29/32;S05;Passo028. Plano:docs/superpowers/plans/2026-10-16-melhoria-mttr.md. Comandos:npx vitest run das quatro suítes focais,npm run lint,gh workflow run esteira.yml--ref docs/fechamento-independente-f ensaio=alertas,gh run download,GETIssues45/46,monitor.yml na main com expected_sha fixado e cálculo de comparação dos recibos originais. O manifesto conserva os bytes dos resultados; Gitleaks e CI permanecem bloqueantes.
