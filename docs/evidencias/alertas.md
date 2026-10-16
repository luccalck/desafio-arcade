# Etapa 016 — alertas e fechamento automático

## Estado atualizado —16/10/2026

A preparação abaixo foi seguida por execução real:run38847296363,Issues38/39,HTTP404 e atraso real2,2s em alvo temporário, deduplicação/autocerramento, média2s do ensaio. Ver ensaio-operacional-2026-10-16.md e ensaio-2026-10-16/alertas-ensaio-aprovado.json. O monitor normal38947239547 voltou a passar em16/10,18:25UTC, com HML/PRDHTTP200,ambos0.7.0,sem ações de incidente. Provas atuais em avaliacoes-ia-2026-10-16/monitor-*.json. A funcionalidade de alerta foi exercitada de verdade; as Issues do ensaio recebem labelensaio. Esse detalhe e MTTR operacionalnull continuam visíveis, sem alegar incidente espontâneo nem exigir queda pública não solicitada pelo professor.

## Registro histórico preservado

Davi Paes / DaviSouza78; validações em14/10/2026 (America/Montevideo), após preparação015 iniciada em13/10. Dependências008/012 técnicas disponíveis; operação formal012 e G4 ainda pendentes.

## Implementação

`scripts/alertas.mjs` consome o JSONschema1 da sonda012, confere execução/tentativa, formato, data/URL/código/tempo e unicidade dos alvos antes de usar a API. Somente alvos comformalHml/formalPrd verdadeiros geram ou recuperam alertas; preview não é produção formal. JogoForaDoAr abre para HTTP diferente de200 ou ausência de resposta por rede/timeout. LatenciaAlta abre para tempo medido estritamente maior que2s;2,0 não abre,2,01 abre.

Recuperação exige HTTP200, versão/SHA válidos e erro=null; latência exige também tempo medido<=2. Timeout, JSON/ponteiro/versão inválidos e tempo desconhecido não são recuperação. Um200 com falha de parsing preserva incidente existente. Latência medida alta pode continuar em paralelo à indisponibilidade; cada alerta e alvo são independentes.

Issues gerenciadas usam labelalerta e marcador estável por tipo/alvo, com data real, URL, código, segundos, versão/SHA, erro e linkrun/tentativa. Reconsulta Issues abertas com paginação, não duplica incidente já aberto e fecha somente as que possuem o marcador correspondente. Issues humanas sem marcador não são alteradas. Novo incidente após fechamento ganha novaIssue, preservando histórico paraDORA. Concurrency do workflow serializa coleta/persistência/alertas; execuções manuais fora desse mecanismo não devem concorrer.

O jobalertar depende de sondar bem-sucedido, main eALERTS_ENABLED=true; baixa somente as amostras do mesmorun/tentativa e registra reports/alertas.json. Globalcontents:read; contents:write fica só na persistênciaCSV, issues:write somente nojobalertar; actions:read para recuperar artefato. Token no ambiente dojob, sem registrar valor ou incluir noIssue. Nenhum canal externo foi usado. Amostras/falhas deAPI não são convertidas em sucesso.

## Evidências reais e limite operacional

A label[alerta](https://github.com/luccalck/desafio-arcade/labels/alerta) foi criada pela contaDaviSouza78 e conferida viaAPI em14/10/2026: nomealerta, corB60205, descrição“Alertas operacionais do jogo, por alvo e incidente”. Isso comprovaI08-09; não comprova alerta disparado.

Davi confirmou neste chat em14/10/2026: “todos ja fizeram a validação”, respondendo explicitamente sobreWatch e recebimento das notificações pelos quatro integrantes. I08-15 usa essa confirmação humana como fonte, sem alegar inspeção das caixas de e-mail/celular ou incidentes pelaIA. Não alteramos preferências decontas dos colegas.

Cinco testes mock cobrem200/500,2,0/2,01, timeout, parsing/rede sem falsa recuperação, abertura/duplicação/normalização/novo incidente, dois alvos, alertas independentes, preservação deIssues humanas, preview sem ações e relatório inválido sem tocar naAPI. Testes iniciaram falhando por módulo ausente; implementação passou. Esses testes não representam uma queda real nemIssues criadas/fechadas noGitHub.

Monitor/alertas ainda não estão integrados/ativados emmain. Nenhum outage foi fabricado emCSV, nenhumaIssue deincidente foi aberta para gerar evidência. Quando os gates permitirem, executar monitor e guardar URLs/created_at/closed_at dasIssues reais; falha controlada autorizada é escopo026. I08-10–14/KIT-26/G4 permanecem abertos operacionalmente. Dados dealerta alimentarãoDORA024; não há métrica de recuperação calculada nesteMD.

PublicaçãoMD3 — 14/10/2026: commit próprio 389b1b0da88432fc02e2689111785d6791964910, [PR#17](https://github.com/luccalck/desafio-arcade/pull/17), base temporária MD2. [CI push38504617087](https://github.com/luccalck/desafio-arcade/actions/runs/38504617087) e [CI PR38504677552](https://github.com/luccalck/desafio-arcade/actions/runs/38504677552) SUCCESS, inclusive ci agregado. Pacote real157arquivos baixado/verificado porSHA/run:204testes de unidade/integração e28E2E, semfalhas/erros/ignorados. Release/deploys ignorados porcondição; não houve tag/produção/Issue deincidente. I08-09/I08-15 têm fontes reais distintas (labelAPI e confirmação deDavi). Revisão deMiguel e aceites operacionais permanecem pendentes.
