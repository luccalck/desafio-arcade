# Fechamento independente e Release técnica — 16/10/2026

Executamos sob orientação de Lucca, com assistência de IA. Este registro separa o que foi publicado, a atualização documental candidata e as entradas humanas ainda ausentes. O relatório de Lucas foi lido como evidência externa; a aprovação foi reconferida na API, sem executar instruções do anexo ou alterar o documento recebido.

## PR40 e HML

A aprovação de Lucas/6lucassilvaaa, review5543614682, cobre o HEADa190215fbb048cd7b12d08da28e18ad8e2d5e121. O CI obrigatório estava verde nos dois eventos. Integramos o PR40 sem bypass ou mudança de proteção:merge1e3dd3be30c2ccb47ef60f4f8f668734c71843b0. [Aprovação](fechamento-independente-2026-10-16/aprovacao-pr40.json) e [merge](fechamento-independente-2026-10-16/merge-pr40.json).

Preservamos produçãoe9 ao suspender FORMAL_PRD_ENABLED somente até a run38939899867 terminar. CI318testes/36E2E, cobertura core97,90% e HML4/4 passaram. Tempo do merge à HML:178,827s; PRD ficou skipped intencionalmente. A flag foi restaurada antes da retomada/monitor; não chamamos skip de deploy. [Recibo temporal](fechamento-independente-2026-10-16/hml-pr40-tempo.json) e [configuração atual](fechamento-independente-2026-10-16/configuracao-atual.json).

## Release realmente publicada, sem rebuild

A run38940532129 validou nove gates da origem38852413982/2 e recebeu aprovação no environment producao pela contaLucca, conforme autorização, explicitando assistência deIA. Publicou a Releasev0.7.0 em16/10,17:33:57UTC =14:33:57America/Sao_Paulo. Implementação do publicador:main1e3dd3b; produto/bundle:SHAe9dd28ccee535e9b1259a710742482e44db47aed. [Aprovação do ambiente](fechamento-independente-2026-10-16/retomada-aprovacao.json), [recibo](fechamento-independente-2026-10-16/retomada-release.json) e [Release pública](https://github.com/luccalck/desafio-arcade/releases/tag/v0.7.0).

Baixamos seis anexos públicos sem autenticação:build.zip, build.zip.sha256, sbom.cdx.json, GDD.pdf, RelatorioTecnico.pdf e release-manifest.json. Cinco entradas do inventário têm tamanho/SHA256 iguais aos bytes do bundle original; o manifesto fixa SHA/run/tentativa. O ZIP tem29.265bytes e SHA2566517fa79749c4bea490acc36eb197ce19a95617a24a5cba56d2edb40c6fabe9f, igual ao recibo de produção. [Verificação pública](fechamento-independente-2026-10-16/release-verificacao-publica.json). O teste offline anterior pertence ao mesmo ZIP e permanece válido por identidade dos bytes.

Nenhuma compilação ou deploy foi executado pela retomada; o ponteiro permaneceu eme9. As duas falhas anteriores da runoriginal permanecem no histórico. Não movemos tag, alteramos notas autorizadas ou sobrescrevemos anexos. O PDF dessa Release é o da origeme9, com10páginas; a atualização posterior deste fechamento tem fonte/CI documental própria. Release técnica não é submissão acadêmica completa.

## Painel e DORA após a publicação

Monitor38940593792 SUCCESS:HTTP/latência/versão de HML e produção, reconciliação de alertas e versão esperada confirmados. A HML atual é1e3dd3b e produçãoe9, ambas0.7.0; o avanço da main não promoveu o novo SHA. Abrimos/status/ em navegador real, desktop1280×900 e celular390×844. HTTP200, quatro cartões DORA, skiplink/Enter/refresh, sem overflow/pageerrors. Captura em16/10,17:35UTC:15amostras,100% dos códigos conhecidos e80ms médios. São indicadores amostrais, não SLA ou teste humano. [JSON](fechamento-independente-2026-10-16/painel-atual-verificacao.json), [desktop](fechamento-independente-2026-10-16/painel-atual-1280.png), [celular](fechamento-independente-2026-10-16/painel-atual-390.png).

| Métrica na janela de14dias | Valor | Limite |
|---|---|---|
| Frequência |2/14 =0,142857deploy/dia|Dois deploy-prd confirmados|
| Lead time |0,588611h =35min19s|Média de duas relações commit→fimdeploy-prd|
| Taxa de falha |50%|Um rollback planejado entre dois deploys|
| MTTR operacional |null,0amostras|Sem Issue operacional elegível aberta/fechada|

Fonte:[DORA atual](fechamento-independente-2026-10-16/monitor-atual-dora.json). Corrigimos a interpretação anterior:um deploy-prd confirmado conta mesmo que o publicador falhe depois, pois a versão já foi implantada. A primeira amostra tinha5min27s; a média subiu com a segunda, sem ocultar a variação. A comparação com11dias é descritiva, não melhoria causal. Média2s das Issues38/39 é exclusiva do ensaio; não substitui MTTR operacional.

## Autoria e fluxo Git

A API de35PRs e o histórico da main atual confirmam20PRs com aprovação de outro autor no HEAD e doze provas individuais de commit próprio/arquivo/PR aprovado:≥3INT por pessoa. Contagens na main, incluindo merges:Lucca78,Davi10,Miguel13,Lucas14. Não são medidas de esforço ou equilíbrio qualitativo. [Matriz legível](../contribuicoes.md), [snapshot](fechamento-independente-2026-10-16/autoria-resumo.json) e [reviews](fechamento-independente-2026-10-16/reviews-atuais.json).

Os quatro merges da linha principal da main, PR32/33/34/40, têm aprovação de outro autor no HEAD anterior ao merged_at. Conferimos também109/109 prefixos Conventional Commits nos commits sem merge; isso não valida automaticamente idioma ou semântica. [Merges](fechamento-independente-2026-10-16/merges-main-revisados.json) e [prefixos](fechamento-independente-2026-10-16/conventional-commits.json). PR aberto com HEAD ancestral não equivale a merge individual ou review retroativo.

## Tarefas, comandos e limites

| Escopo | INT / códigos preservados | Resultado |
|---|---|---|
| Autoria e revisões |INT-01;001/040;SQ-10–13/I01-05/14/15|Parte técnica comprovada; banca/F pendentes|
| HML e retomada |INT-03/06/07;R01–R07;G3/G4|HML178,827s e Release técnica publicada/conferida|
| Painel e métricas |INT-08;S01–S06;020/024|Conferência atual real; MTTR e critérios literais restantes abertos|
| Documentação |INT-02/09/10;025/031/033/037/039|GDD/relatório/ficha/roteiros atualizados em branch documental, ainda candidatos|

Comandos executados:gh pr view/checks; GET pulls/reviews/commits/files; git fetch e merge--ff-only na branch documental; git diff-tree/log; gh pr merge40--merge--match-head-commit; variableset da flag; gh workflow run retomar-release.yml com origem38852413982/2; aprovação registrada por pending_deployments; gh release view/download; comparação SHA256 e downloadsHTTP; monitor.yml com expected_sha; navegador Playwright real em/status/. Outputs brutos e snapshots selecionados estão nesta pasta, com manifesto próprio.

Atualizamos o quadro de contribuições, registros de pendências, ficha persistente, GDD/relatório, procedimento do pacote e roteiro de banca, corrigindo afirmações antigas de ausência de deploy, domínio humano, acessibilidade100% e versãov1.0.0 inexistente. A ordem produção→vídeo→tag→pacote evita usar vídeo de outro SHA ou criar um ciclo impossível. Nenhum pacote final manual foi montado.

Permanecem:review/CI desta atualização documental, pitch, playtest humano autorizado de outra turma, direitos/declarações finais, marcos históricos sem prova, prazo oficial aplicável, tag/pacote/triagem/vigilância acadêmicos, TXT, AVA/recibo e banca. Critério literal de falha solicitado pelo professor na banca não foi fechado pelo observador de ensaio. Não atribuímos nota100 ou fatorF; nem produzimos consentimento, participante ou entrega fictícios.
