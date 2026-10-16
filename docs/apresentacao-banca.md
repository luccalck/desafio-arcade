# Apresentação e demonstração — roteiro de ensaio

Squad Aura67 · Rota do Código · atualizado em16/10/2026. Roteiro preparado, ainda sem ensaio coletivo ou banca realizados. Reservar10min de apresentação,5min de demonstração real e5min de perguntas. Não declarar domínio individual, aprendizado, consentimento ou execução futura como fatos.

## Apresentação — dez minutos

| Tempo | Integrante | O que mostrar e explicar |
|---|---|---|
|00:00–02:30|Lucca Castilho Costa|Problema de aprender regras sem compreender efeitos; público iniciante; cinco funções Python e projeto final; GDD completo e escolhas de escopo|
|02:30–05:00|Davi Marcondes Paes de Souza|Core separado da UI; JSON bloqueante;318testes/36E2E na CI do PR40; cobertura do core97,90%; bug real com regressão; limites de acessibilidade e playtest|
|05:00–07:30|Miguel Oliveira de Almeida|GitHubActions/Pages; mesmo ZIP entre ambientes; azul-verde e sessão; aprovações; falha do coletorHML/correção revisada; offline e proveniência|
|07:30–10:00|Lucas Souza da Silva|Gitleaks/audit/SBOM/licenças/IA; sondas e painel; ensaios de alertas/recuperação e limites; pacote/triagem e o que estiver efetivamente concluído|

As provas individuais estão em contribuicoes.md, com commit próprio/arquivo/revisão em três INT por pessoa. Os números acima pertencem à CI318/36 do PR40; confirmar o SHA da versão que será apresentada. Não dizer que a aplicação está emv1.0.0 antes de essa versão existir. Não prometer acessibilidade100%, domínio já avaliado ou conformidade absoluta.

## Demonstração real — cinco minutos

Preparar abas e ZIP original antes de começar. A demonstração do professor inclui pipeline e falha/rollback, além do jogo. Não gastar o bloco inteiro tentando completar seis missões do zero.

| Janela planejada | Ação | Evidência e limite |
|---|---|---|
|00:00–01:00|Abrir produção; ler versão/SHA; editar/testar uma função e mostrar efeito no jogo|Origem pública e comportamento real; não usar mockup ou vídeo como aplicação ao vivo|
|01:00–02:00|Mostrar PR aprovado, execução CI/HML/PRD e recibos do mesmo ZIP|Se quiser acompanhar execução nova, iniciá-la com antecedência coordenada; observar fila/aprovação/Pages reais. Não prometer todo o deploy em um minuto|
|02:00–04:00|Demonstrar a falha/recuperação solicitada e mostrar ponteiro, hashes, smoke e HTTP|Preparar ensaio com os quatro. O professor pode pedir versão defeituosa e cronometrar incluindo Pages. Ensaios já feitos:manual80,66s/automático17,166s, com falha só no observador; não equivalem por si ao pedido literal na banca|
|04:00–05:00|Abrir index.html do ZIP descompactado sem rede e mostrar regra/exportação|Pacote original, não uma build refeita. Reativar rede após a demonstração|

Se uma execução ultrapassar o tempo ou falhar, mostrar o estado real e registrar a limitação; histórico anterior é evidência complementar, não sucesso ao vivo fictício. A sequência cronometrada precisa ser ensaiada antes da banca; o planejamento acima não garante que todas as ações caberão sem preparo.

## Sondas, alertas e DORA — fala baseada nas fontes

O painel consulta dados reais da branch observabilidade. A captura de16/10,05:28UTC mostrou14amostras,100% dos códigos conhecidos e91ms de latência média, sem representar SLA. O SHA erae9dd28c/0.7.0; reconferir no dia. Havia2deploys formais na janela14dias, frequência0,142857/dia, leadtime médio35min19s, taxa de falha50% (um rollback planejado correlacionado) e MTTR operacionalN/D. Fontes/denominadores estão em evidencias/fechamento-independente-2026-10-16/; não usar números antigos de ausência de deploy ou0% como estado atual.

Os alertas38/39 abriram/fecharam automaticamente em alvo HTTP temporário de ensaio, com1s/3s; labelensaio e marcadores impedem misturar com incidentes espontâneos. O cron de15min pode atrasar; sondar.mjs coleta, alertas.mjs reconcilia Issues e observar-producao.mjs espera a execução pós-deploy. Não afirmar que esse último é detector imediato de indisponibilidade.

## Perguntas — cinco minutos

- Lucca: explicar público, aprendizado, uma regra e limites do Python pedagógico; não é CPython completo nem usa IAremota em runtime.
- Davi: explicar caso de fronteira, regressão de bug e diferença entre teste automatizado e playtest humano.
- Miguel: rastrear checksum/SHA/run/tentativa, promoção, sessão e recuperação sem recompilar.
- Lucas: rastrear segurança/direitos, origem DORA, ensaios versus incidentes e critérios de triagem.

Todos devem explicar contribuições próprias e ajudar quando o tema atravessar papéis. Se não souber, consultar a fonte e responder com o limite real. A presença, domínio e fatorF serão avaliados pelo professor; não estão comprovados por este roteiro.

## Antes da banca

Conferir acesso aos links, versão congelada, arquivos originais da pipeline, contingência offline, equipamentos, quatro participantes e duração do ensaio. Confirmar direitos dos materiais finais. Não acionar concurso, Drive ou aceitar termos externos sem autorização específica. O registro da entrega e recibo fica em evidencias/entrega-banca.md; a fichaHTML/TXT permanece por último.
