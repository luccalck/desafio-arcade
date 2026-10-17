# Etapa 028 — decisão de melhoria orientada por DORA

## Resultado atual — melhoria medida em16/10/2026

A decisão passou a ter uma intervenção e medição próprias: usamos o MTTR de3s do ensaio38950333359 para retirar consultas repetidas de labels antes do fechamento. O commit9c22698 confirmou labels por instância apenas após sucesso. A execução38953734834 fechou as Issues45/46 em1s/4s,média2,5s:redução observada16,7%. O contador real registrou2consultas de metadados,contra12reproduzidas com o adaptador anterior no teste das seis fases,83,3% a menos.

[Hipótese,método,resultados,limites e fontes](melhoria-mttr-2026-10-16.md). Os dois tempos continuam identificados como ensaio; DORA operacional não foi alterado e permanece sem amostra deMTTR. Há duas Issues por execução,timestamps de1s e variação entre runners: não afirmar causalidade integral ou ganho sustentado. LatenciaAlta ficou em4s nas duas execuções. A melhoria técnica foi implementada e medida; sua integração segue no PR41,sem aprovação antecipada.

## Registros anteriores preservados

## Estado anterior —16/10/2026

A ausência de métricas descrita em14/10 abaixo foi superada. [Coleta real posterior](fechamento-independente-2026-10-16/monitor-atual-dora.json):dois deploys/14dias,lead time médio35min19s,CFR50% com rollback planejado,MTTR operacionalnull. A média inicial de5min27s subiu com a segunda amostra; não declarar redução ou causalidade favorável. O resultado real da correção do publicador foi falha na origem38852413982/2 seguida de publicação bem-sucedida na retomada38940532129, sem rebuild. É melhoria técnica comprovada, mas não foi escolhida originalmente a partir de DORA e não será renomeada retroativamente como tal.

**Decisão com os dados disponíveis nesta conferência:**manter a produção estável enquanto avaliamos clareza/jogabilidade em três sessões de agentes deIA e não repetir deploys/rollbacks somente para gerar amostras. A janela tem dois deploys e um rollback planejado; misturar novos ensaios tornaria a interpretação ainda mais frágil. Não alteramos o cálculo, descartamos o rollback existente ou inventamos um efeito positivo. A decisão fica registrada agora; o efeito causal de uma melhoria de DORA permanece não comprovado até existir intervenção e comparação real. Essa limitação já pertence ao tópico3, não é uma nona pendência.

## Registro histórico preservado

Miguel Oliveira, 14/10/2026. Executei o coletor existente `scripts/dora.mjs` por API autenticada somente leitura, sem registrar nem compartilhar credenciais. Janela: **01/10/2026 00:00 UTC a 14/10/2026 09:16:34 UTC**; geração: **14/10/2026 09:16:39 UTC**. A resposta redigida está em [dora-consulta-028.json](dora-consulta-028.json), SHA-256 `e08f9f946658fcf66adc7494ae8555cea7a8343905a3bb876da947616f0b52a6`.

| Métrica | Resultado real | Amostras | Motivo |
|---|---:|---:|---|
| Frequência de deploy formal | N/D | 0 | Nenhum `deploy-prd` formal bem-sucedido na janela. |
| Lead time | N/D | 0 | Nenhum vínculo completo commit → deploy formal. |
| Taxa de falha de mudança | N/D | 0 deploys | Sem denominador de deploys formais. |
| MTTR | N/D | 0 Issues | Nenhuma Issue `alerta` aberta e encerrada na janela. |

A consulta também confirmou ausência de deployments `producao`, branch `observabilidade`/publicação do painel operacional e releases formais; `/status/` público respondeu 404. CI, preview e o pacote local da etapa 027 não são amostras de DORA de produção.

**Decisão baseada no dado:** não há gargalo DORA observável para escolher nem baseline contra a qual medir uma intervenção. Não alterei script, workflow, painel ou monitor para declarar ganho sem amostra. A intermitência local de timeout de teste CPython registrada no Passo 026 é um sinal de confiabilidade de teste sob carga, mas não mede as métricas definidas no coletor nem sustenta sozinha uma alegação de melhoria DORA. Build/reprodutibilidade/pacote locais também não são medição de deploy.

I08-28, I08-29, I08-32, ARQ-09 e G5 permanecem abertos. Para continuar: integrar a cadeia após revisão humana, habilitar a publicação formal com environments/monitor/alertas aprovados, coletar deploys e Issues reais; então escolher hipótese pequena com baseline, registrar amostras antes/depois e preservar resultado sem melhoria. As dependências, motivo e ações constam em [Passo 028](../execucao/05-pendencias-por-passo.md#passo-028).
