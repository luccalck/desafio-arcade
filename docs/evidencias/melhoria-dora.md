# Etapa 028 — decisão de melhoria orientada por DORA

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
