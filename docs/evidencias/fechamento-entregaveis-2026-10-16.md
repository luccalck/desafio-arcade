# Fechamento operacional, alertas e entregáveis —16/10/2026

Atendemos à solicitação de finalizar os artefatos disponíveis, corrigir a classificação dos alertas e retirar atividades concluídas da lista ativa. Conservamos os IDs originais e a fonte de cada resultado. Não existe declaração de nota ou entrega acadêmica integral concluída.

## Aprovação do PR41

Conta autenticada:luccalck. Executamos gh pr review41--approve com corpo explícito de conferência técnica assistida. O GitHub recusou: “Review Can not approve your own pull request”. Exit1,sem review criado. [Registro da recusa](fechamento-entregaveis-2026-10-16/aprovacao-recusada.json) e [snapshot do PR](fechamento-entregaveis-2026-10-16/pr41.json). Não removemos a proteção, usamos conta de colega ou simulamos sua aprovação. Nenhum novo pedido de revisão foi enviado.

## Correção e execução dos alertas

Na migração inicial, labelensaio isolava o coletor antigo até integrar o filtro por marcador. Esse filtro está na main1e3dd3b. Corrigimos scripts/alertas.mjs para criar os novos alertas do ensaio com labelsalerta+ensaio, mantendo o marcador, o título, a listagem por escopo e a exclusão do MTTR operacional. scripts/ensaio-alertas.mjs verifica e registra as duas labels retornadas pelaAPI. Não alteramos retroativamente as Issues38/39.

A regressão de classificação falhou antes:recebeu apenasensaio. Depois,20testes focais de alertas/ensaio/DORA passaram; lint/tipagem passaram. [Antes](fechamento-entregaveis-2026-10-16/alertas-antes.json) e [depois](fechamento-entregaveis-2026-10-16/alertas-depois.json). Commit432eb57d93a54ac50a2284e8c8c3f706164ad538,com CI de push38950077715 e PR38950085400 concluídasSUCCESS.

Despachamos a esteira existente no branchdocs/fechamento-independente,ensaio=alertas. Run38950333359,SHA432eb57,SUCCESS,sem deploy de produção. O servidor temporário do runner respondeu404 e atrasou realmente2,2s; o executor usou aAPI verdadeira de Issues, repetiu sondas para deduplicação e normalizou o alvo para fechar:

| Issue | Tipo | AberturaUTC | FechamentoUTC | Tempo real |
|---|---|---|---|---|
|43|JogoForaDoAr|16/10,18:52:00|16/10,18:52:02|2s|
|44|LatenciaAlta|16/10,18:52:06|16/10,18:52:10|4s|

As duas nasceram comalerta+ensaio,ficaram sem duplicatas e fecharam automaticamente. Média3s,calculada dos timestampsGitHub pelo script. Fontes:[resultado original](fechamento-entregaveis-2026-10-16/ensaio-alertas.json),[Issue43](fechamento-entregaveis-2026-10-16/issue43.json),[Issue44](fechamento-entregaveis-2026-10-16/issue44.json),[run](fechamento-entregaveis-2026-10-16/run-ensaio.json).

A classificação compatível passou de0/2Issues no ensaio anterior para2/2 no novo. A média anterior era2s e a nova3s: não apresentar isso como ganho de velocidade ou atribuir causalidade sem controle das demais variáveis. Corrigimos uma incompatibilidade mensurável de classificação; não fabricamos melhoria de lead time/CFR ou incidente espontâneo. O MTTR operacional permanece separado,sem amostra elegível; I08-29/32 não recebem aceite de melhoriaDORA fictícia. I08-26/31 têm prova no escopo de ensaio controlado com labelalerta.

## Pacotes originais da pipeline e relatório

Baixamos novamente seis anexos da Releasev0.7.0 para entregaveis/2026-10-16/producao-v0.7.0 na pasta de contexto. Os cinco arquivos do inventário foram conferidos por bytes/tamanho/SHA256 contra release-manifest.json. Origem:38852413982/2/e9dd28c; publicação pela retomada38940532129. ZIP29.265bytes/SHA2566517fa79749c4bea490acc36eb197ce19a95617a24a5cba56d2edb40c6fabe9f. Não houve rebuild ou alteração dos anexos públicos.

Baixamos também o bundleCI02712f1/38948501087 e executamos node scripts/ci-bundle.mjs verify:173arquivos,contrato válido. O bundleCI mais recente e seu relatório serão baixados depois que a CI desta atualização concluir, mantendo sua identidade e inventário. Esse download conserva o pacote gerado pela pipeline; não monta submissao manualmente ou mistura arquivos de SHAs diferentes.

O relatório operacional atualizado preserva10páginas,registra a execução dos agentes deIA,a falha corrigida,recuperações,CI,produção,novo ensaio e limites. O PDF da CI correspondente será entregue ao lado dos downloads técnicos,identificado separadamente do PDF imutável da Releasee9. O limite do relatório é12páginas; o GDD completo não tem esse limite.

## Bloqueio comprovado da submissão sem vídeo

Executamos node scripts/submissao.mjs create com o bundleCI original e o caminho de vídeo ainda inexistente. O script devolveu exit1:“Arquivo de vídeo não encontrado”. Não criou o destino. [Saída](fechamento-entregaveis-2026-10-16/bloqueio-pacote-sem-pitch.txt). Não removemos essa validação nem criamos MP4 vazio/fictício. PacoteCI e Release técnica existem; a pasta acadêmica comGDD.pdf,LINK_DO_JOGO.txt,build.zip,pitch.mp4 eMANIFESTO.sha256 depende do vídeo real e dos demais gates de proveniência/triagem. Pitch e fichaTXT continuam adiados por Lucca.

## Atividades concluídas e autoria das sessões

Recuperação técnica concluída:manual80,662735s e automática17,166s,incluindoPages/hashes/smoke,171+65HTTP200 observados. Três avaliações técnicas porIA concluídas,com logs,capturas e limitações próprias. Retiramos tópicos2/4 da lista ativa; resultados permanecem nos históricos,sem renumerar os demais.

Lucca é o solicitante destas operações; os executores dos testes foram os agentes identificados. Não foi observada uma sessão de Lucca como jogador,portanto ela não é registrada em seu nome como participação humana ou pessoa de outra turma. Os critérios presenciais continuam como limites do tópico8. Nenhuma revisão,declaração pessoal ou resultado humano foi inventado.

Escopo:INT-01/03/04/06/07/08/09/10;R06/R07,S01–S06. Comandos e outputs estão indicados acima; dados novos têm manifestoSHA256. Não houve merge,novo deploy,alteração de proteção ou pacote acadêmico declarado completo nesta execução.


Reconferência pós-ensaio:monitor38950747724 SUCCESS,HML/PRDHTTP200/0.7.0,produçãoe9preservada. A coletaGitHub com as novas Issueslabelalerta confirmouMTTRoperacionalnull/0amostras:marcadorensaio continua isolado. Fontes:monitor-sondas.json,monitor-alertas.json e monitor-dora.json na pasta desta evidência.
