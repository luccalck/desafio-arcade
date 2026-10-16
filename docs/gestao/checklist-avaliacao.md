# Checklist completo — Desafio Arcade

Referência: `Avaliação.html` do professor, incluindo as dez seções, todas as abas dos integráveis, kit, cronograma, rubrica e campos/validações gerados por JavaScript. Atualização inicial: **12/10/2026**. Este é o checklist principal de acompanhamento; a [auditoria](auditoria-avaliacao.md) explica o diagnóstico. Nenhum INT está integralmente encerrado.

Execução distribuída em [25MDs — quarenta etapas preservadas](../execucao/00-indice-geral.md), com [mapa dos 313 checks inicialmente abertos](../execucao/02-mapa-checks.md). O mapa conserva o snapshot de planejamento; o estado atualizado permanece neste checklist. Quatro estimativas B foram preenchidas nesta etapa, sem fechar qualquer entrega/INT.

## Como manter os checks

- `[x]`: o item específico foi concluído e possui a evidência indicada. Não significa que todo o INT ou checkpoint foi aceito.
- `[ ]`: pendente, parcialmente implementado, não executado ou dependente de pessoa/acesso. A observação informa a diferença.
- **CONDICIONAL**: só passa a ser obrigação quando ocorrer a condição descrita. Não marcar como concluído para esconder que não se aplica; registrar a decisão e sua evidência.
- **AVANÇADO**: exigência da coluna de 9 a 10 da rubrica, além dos requisitos mínimos.
- **CONTÍNUO/FINAL**: precisa ser reconferido na candidata/tag final. Um check histórico não garante a integridade de mudanças futuras.

Ao completar um item, trocar somente seu `[ ]` por `[x]` e acrescentar data, SHA/tag, execução/URL, arquivos e resultado. Ao mudar código, configuração, conteúdo ou versão, reabrir os checks afetados até validar novamente. Mudanças neste documento passam por PR, revisão de outro autor e CI. Não fabricar revisões, dados de integrantes, consentimentos, medições, capturas ou declarações.

Os identificadores abaixo são estáveis. Não renumerar ao concluir. Não inferir nota pela quantidade de checks: **nota = (0,7 × A + 0,3 × B) × F**, atribuída pelo professor.

## Fontes e evidências desta marcação inicial — histórico

| ID | Evidência / alcance |
|---|---|
| F1 | Original preservado em `C:/Users/user/Downloads/jogo/Avaliação.html`; cópia idêntica em Downloads. SHA-256 `19362485b3ec9534bdf31303ca0b92b6fe96de21bb87867977d37a7393565275`. Texto e script completos relidos; esta versão do checklist refere-se a esse conteúdo. |
| E1 | [Repositório público](https://github.com/luccalck/desafio-arcade), [PR #2](https://github.com/luccalck/desafio-arcade/pull/2). Conferência de main: check `ci`, uma aprovação, enforce_admins; zero revisões aprovadas. Quatro integrantes ainda não registrados. |
| E2 | [CI push 38327538767](https://github.com/luccalck/desafio-arcade/actions/runs/38327538767), SHA `76549dcb13ee91210746c0c2fff265c8f972817e`, success; [CI PR 38327545458](https://github.com/luccalck/desafio-arcade/actions/runs/38327545458), success. Workflow [esteira.yml](../../.github/workflows/esteira.yml). |
| E3 | [Testes e limites](../evidencias/python-pages.md), [publicação e artefatos](../evidencias/ci-python-pages.md). Resultados de comportamento da mesma implementação: 152 unidades, 26 integrações, 15 E2E, core 97,90%; bugs reais e validação offline. Atualizações seguintes foram documentais; E2 confirma checks da candidata. |
| E4 | [GDD](../gdd.md), imagens em docs/images e geração por [gdd-pdf.mjs](../../scripts/gdd-pdf.mjs). PDF gerado pela CI e pdfinfo; versão 0.6.0, identificação/release final pendentes. |
| E5 | [Preview público](https://luccalck.github.io/desafio-arcade/) e [HML do preview](https://luccalck.github.io/desafio-arcade/hml/). E2 publicou e executou smoke. HML/version.json respondeu HTTP 200 com SHA de E2. Não é produção formal aprovada. |
| E6 | [LICENSE](../../LICENSE), [THIRD_PARTY](../../THIRD_PARTY.md), [AI-USAGE](../../AI-USAGE.md), [SECURITY](../../SECURITY.md), hook e scanner; artefatos de segurança em E2. Revisão humana/declaração coletiva pendentes. |
| E10 | [Conferência008](../evidencias/direitos.md):158componentes/26ativos, termos/metadados/IA por etapas/Git; nenhum novo check fechado sem revisão humana/coletiva. |
| E9 | [CI formal preparada007](../evidencias/ci-formal.md):clone limpo/184testes+17E2E, pacoteSHA/run/tentativa validado na CI38428808065. Deploy/recebimento de avisos pendentes. |
| E8 | [Regressão006](../evidencias/regressao-hml.md):17E2E locais e naCI38348580349,5cenários do preview, capturas/JSON reais. Publicação formal011 e smokePRD014/019 pendentes. |
| E7 | [Build](../../scripts/build.mjs), [empacotamento](../../scripts/package.mjs), [reprodutibilidade](../../scripts/reproducibility.mjs), [preparação Pages](../../scripts/prepare-pages.mjs), testes de integração/exportação/Pages. E2/E3 comprovam execução; não há GitHub Release por tag. |

Os caminhos locais originais são referências de contexto, não arquivos que o professor precisa clonar. O código principal permanece em `jogo-arcade`. Os checks de continuidade abaixo exigem validação final, mesmo quando há evidência de uma execução anterior.

## Revalidação técnica do passo002 — 12/10/2026

[Baseline técnico](../evidencias/baseline-tecnico.md): fonte776a0a9, npm ci/lint/test:ci/build verdes;152unidades,26integrações,15E2E locais, cobertura core97,90%; ensaio isolado de JSON inválido bloqueou build. Revalidados I04-01–06/15 e I06-01–03; estados gerais mantidos. SQ-07 depende da participação técnica de Desenvolvimento; ARQ-10 não se aplica à stack atual. Nenhum novo check ou gate completo fechado neste passo.

## 01 — Objetivo, produto e limites da avaliação

- [x] OBJ-01 — Protótipo gamificado aborda educação em tecnologia, com problema e público descritos. E4: programação por construção/depuração de regras de um minijogo.
- [x] OBJ-02 — Jogo interativo executado no navegador; destino WEB estático definido. E3/E5.
- [x] OBJ-03 — Mesma experiência web responsiva no celular, sem APK/aplicativo nativo ou engine instalada pelo jogador. E3/E4.
- [x] OBJ-04 — Build pública e ZIP jogável offline disponíveis na implementação/preview. E3/E5/E7; a release final permanece pendente.
- [ ] OBJ-05 — Demonstrar a esteira completa de Git até triagem: jogo em produção só pela esteira rastreável.
- [x] OBJ-06 — Arquitetura sem nuvem paga, VM, contêiner, backend remoto obrigatório ou serviço pago. E4/E7.
- [x] OBJ-07 — Se adotar ferramenta equivalente à referência, justificar a troca e sua compatibilidade no relatório técnico. Justificado em docs/relatorio.md e artifacts/RelatorioTecnico.pdf Seção 3 (TypeScript + AST subset; descarte de Pyodide, engines pesadas, backend com RCE e serviços pagos).
- [x] OBJ-08 — Ler o regulamento completo citado na seção02. PDF oficial consultado em12/10/2026, dez páginas/capa edição2026, hash e comparação de fontes em [equipe.md](../evidencias/equipe.md). Não substitui a leitura/ciência humana dos quatro ou aceite do concurso.
- [ ] OBJ-09 — Submeter os três materiais obrigatórios válidos: GDD, build jogável e vídeo, por pacote automatizado.
- [ ] OBJ-10 — Conferir que arquivos abrem e links funcionam: triagem sem tolerância para material corrompido/indisponível.
- [ ] OBJ-11 — Demonstrar entregas frequentes durante o período, com dados reais de deploy; não criar uma quantidade mínima de execuções inexistente no HTML.
- [x] OBJ-12 — Separar avaliação da UC de inscrição/engajamento/premiação do concurso: não influenciam a nota. Separação de escopo documentada; decisão coletiva de inscrição permanece pendente.

## 02 e 03 — Squad, papéis e autoria real

- [x] SQ-01 — Nome real do squad: Aura67, informado por Lucca em12/10/2026; [SQUAD.md](../../SQUAD.md).
- [x] SQ-02 — Registrar exatamente quatro integrantes em SQUAD.md: nomes completos, RAs e papéis reais. Completo em 14/10/2026 após Lucca informar 26179873; não comprova registro histórico em 02/10.
- [x] SQ-03 — Quatro papéis oficiais distintos atribuídos em SQUAD.md, com concordância da equipe informada por Lucca em12/10/2026. Coordenação sem exclusividade: todos atuam nas áreas; [equipe.md](../evidencias/equipe.md).
- [ ] SQ-04 — Conferir formação/registro previstos em 02/10 e estabilidade dos integrantes após o registro; não inventar registro passado.
- [ ] SQ-05 — Garantir trabalho real dos quatro: papéis têm responsáveis, mas não exclusividade; todos programam, revisam e aparecem no Git.
- [x] SQ-06 — Produto/Lucca mantém GDD/backlog e coordena jogabilidade, preparação de playtest e pitch, conforme SQUAD/backlog atualizados no005 em13/10/2026. Testes com usuários/vídeo permanecem nas suas etapas, sem alegar execução.
- [ ] SQ-07 — Desenvolvimento assume arquitetura do jogo e pirâmide de testes.
- [ ] SQ-08 — Plataforma assume workflows, releases, ambientes, entrega e rollback.
- [ ] SQ-09 — SRE assume observabilidade, alertas, DORA, segurança, licenças e triagem.
- [x] SQ-10 — Lucca: commits próprios/arquivos em INT-02/04/03, PR32/33 aprovados porLucas no HEAD e integrados; doze provas individuais dos quatro em contribuicoes.md e snapshot16/10. Banca/F continuam pendentes.
- [x] SQ-11 — Commits e PRs de Davi com escopo em pelo menos três INT: 03/04/06/07/08. PRs15–19 aprovados por luccalck noHEAD confirmado em14/10/2026; ver [revisões](../evidencias/revisoes-confirmadas-2026-10-14.md) e [contribuições](../contribuicoes.md). Banca e F continuam pendentes.
- [x] SQ-12 — Commits e PRs de Miguel com escopo em pelo menos três INT: 02/06/07/08/09/10. PRs20–24 aprovados por luccalck noHEAD confirmado em14/10/2026; ver [revisões](../evidencias/revisoes-confirmadas-2026-10-14.md) e [contribuições](../contribuicoes.md). Banca e F continuam pendentes.
- [x] SQ-13 — Commits e PRs de Lucas com escopo em pelo menos três INT: 01/06/09/10. PRs25–29 aprovados por luccalck noHEAD confirmado em14/10/2026; ver [revisões](../evidencias/revisoes-confirmadas-2026-10-14.md) e [contribuições](../contribuicoes.md). Banca e F continuam pendentes.
- [ ] SQ-14 — Participação do integrante 1 na banca, com domínio de sua contribuição.
- [ ] SQ-15 — Participação do integrante 2 na banca, com domínio de sua contribuição.
- [ ] SQ-16 — Participação do integrante 3 na banca, com domínio de sua contribuição.
- [ ] SQ-17 — Participação do integrante 4 na banca, com domínio de sua contribuição.
- [ ] SQ-18 — Conferir o fator F individual pelo histórico: 1,0 para ≥3 INT + banca; 0,8 para dois; 0,5 para um ou nenhum. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] SQ-19 — CONDICIONAL: equipe de três ou cinco somente com autorização do professor para a UC; não elegível ao concurso.
- [ ] SQ-20 — CONDICIONAL concurso: conferir exigência de exatamente quatro integrantes e efeito de desistência/cancelamento; não tratar identidade simulada como integrante. Condição ainda não comprovada; concurso opcional e sem autorização coletiva registrada. Ver [decisão pendente](../concurso-decisao.md).

Não há mínimo textual de “três commits na mesma área”. A unidade da exigência é **três integráveis diferentes**, com commits e PRs aprovados. Uma organização possível é um PR substantivo por INT/pessoa, sem dividir artificialmente trabalho ou atribuir commits de terceiros.

## 04 — Arquitetura integrada de referência

- [x] ARQ-01 — Stack que gera site estático escolhida e documentada; HTML/CSS/SVG/TypeScript/esbuild. E4/E7.
- [x] ARQ-02 — Repositório público compatível com Pages gratuito. E1/E5.
- [ ] ARQ-03 — Caminho demonstrável: branch curta → PR → revisão → CI → main → artefato imutável → HML/E2E → aprovação producao → release/rollout → smoke → promoção/rollback → monitoramento/feedback → triagem.
- [x] ARQ-04 — Jobs existentes usam runners GitHub `ubuntu-latest`. E2.
- [x] ARQ-05 — Build é construído uma vez e o preview baixa o mesmo ZIP/checksum da CI. E2/E7.
- [x] ARQ-06 — Promover esse mesmo artefato da HML aprovada para produção, sem recompilar. Conciliação15/10: Mesmo ZIP aprovado em HML e produção na run38829484114; catorze hashes HTTP correspondentes, sem recompilar.
- [x] ARQ-07 — Ambiente homologacao integrado ao deploy formal /hml/. Conciliação15/10: Environment homologacao usado no deploy-hml formal; regressão4/4 e recibo preservados.
- [x] ARQ-08 — Environment producao integrado ao deploy formal, com reviewer obrigatório e aprovação registrada. Conciliação15/10: Environment producao usado no deploy-prd formal; aprovação real e recibo arquivados na run38829484114.
- [ ] ARQ-09 — Alertas/métricas retornam ao backlog e orientam mudança real pela esteira.
- [ ] ARQ-10 — CONDICIONAL Godot: se substituir a stack por export Web, usar configuração sem threads compatível com Pages. Não se aplica à stack atual.

## 05 — INT-01: Repositório e fluxo Git · peso 10% de A

- [x] I01-01 — Repositório único e público, com uma fonte principal de código. E1.
- [x] I01-02 — Quatro integrantes reais adicionados como colaboradores, com acesso testado. Verificado via GitHub REST API em 14/10/2026 por Lucas Souza: luccalck, DaviSouza78, miguelsenai2024 e 6lucassilvaaa todos com HTTP 204 No Content (colaborador ativo confirmado); repositório público com HTTP 200. [Evidência 034](../evidencias/aceite-candidata.md).
- [x] I01-03 — Leitura pública pelo professor confirmada por Lucca em13/10/2026; consulta sem autenticação HTTP200/privatefalse. [Configuração003](../evidencias/configuracao-github.md). Não alegamos acesso pessoal executado pelo professor.
- [x] I01-04 — main protegida, exigindo PR, uma aprovação e check ci verde; vale também para administradores. E1.
- [x] I01-05 — Quatro merges na linha principal da main (PR32/33/34/40) com aprovação de outro autor no HEAD antes do merged_at, conferidos em merges-main-revisados.json. PR2 não foi integrado individualmente; sua consolidação32 foi revisada. Não atribui revisão retroativa a todo merge local de branches históricas.
- [x] I01-06 — Estratégia GitHub Flow e branching documentadas no README. E1/README.
- [ ] I01-07 — CONTÍNUO: branches curtas e merges somente após PR revisado/CI verde. Branch atual é longa e aguarda revisão.
- [x] I01-08 — Commits atuais seguem Conventional Commits. Histórico em E1.
- [x] I01-09 — Conferência atual:109/109 commits sem merge da main1e3dd3b têm prefixo Conventional Commits válido. Não é verificação automática de idioma ou qualidade semântica; conferir novamente na release acadêmica final. Fonte:conventional-commits.json no fechamento16/10.
- [ ] I01-10 — Tag SemVer anotada v0.1.0 da prévia: comprovar a situação real, sem criar data/evidência retroativa.
- [ ] I01-11 — Tag SemVer anotada v1.0.0 da entrega, criada sobre versão aprovada.
- [x] I01-12 — SQUAD.md completo com quatro nomes, RAs, papéis e contas; dados fornecidos pelos integrantes e colaboradores confirmados na auditoria.
- [x] I01-13 — .gitignore exclui builds e segredos; código/lockfile versionados. E1/E6.
- [x] I01-14 — Vinte PRs revisados por outro autor no HEAD:15–29,32–35 e40; reviews/SHAs/ancestralidade conferidos em16/10. Evidências em fechamento-independente-2026-10-16/reviews-atuais.json.
- [x] I01-15 — Quatro integrantes com commit próprio/arquivo e PR aprovado em ≥3INT, ancestralidade até main1e3dd3b verificada; doze provas em contribuicoes.md. Não comprova banca ou equilíbrio qualitativo.
- [ ] I01-16 — `git log --oneline v0.1.0..v1.0.0` conta uma história legível, com tags existentes e autoria real. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] I01-17 — AVANÇADO: histórico exemplar e contribuição equilibrada dos quatro, além de Conventional Commits. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [x] I01-18 — Restaurar main como branch padrão após merge revisado. Conciliação15/10: main restaurada como branch padrão, reconferida pela API nesta conciliação; PR32/33 integrados com revisão e CI.

## INT-02: GDD como código · peso 8% de A

- [x] I02-01 — Premissa define problema de acesso à educação em tecnologia e público-alvo. E4.
- [x] I02-02 — Gênero e plataforma WEB desktop/mobile definidos. E4.
- [x] I02-03 — Loop principal, ações, vitória e derrota definidos. E4.
- [x] I02-04 — Progressão e aprendizagem por fase descritas. E4.
- [x] I02-05 — Referências com autoria/origem e direitos pertinentes registradas. E4/E6; revisão humana final em I05-15.
- [x] I02-06 — Wireframes ou telas de menu, HUD e fim existentes. E4: desenhos próprios.
- [x] I02-07 — Seção Esteira com diagrama e link real do repositório. E4.
- [x] I02-08 — docs/gdd.md versionado e atualizado na branch candidata. E4.
- [x] I02-09 — GDD efetivamente revisado e aprovado por PR por outro integrante; novas revisões continuam sujeitas a aprovação. Conciliação15/10: GDD integrado pela consolidaçãoPR32, aprovada porLucas no HEAD59dc830. A atualização do PR34 foi aprovada porLucas na revisão5543092743, HEADe9dd28c; item contínuo para mudanças posteriores.
- [x] I02-10 — Estágio da pipeline converte Markdown em GDD.pdf com ferramenta equivalente documentada. E2/E4.
- [x] I02-11 — PDF arquivado como artefato do build. E2.
- [x] I02-12 — PDF abre sem erro: pdfinfo passou e páginas foram inspecionadas. E3/E4.
- [ ] I02-13 — Versão e data do GDD coerentes com a tag de release final. Não existe tag final.
- [ ] I02-14 — AVANÇADO: GDD vivo, atualizado por PR revisado a cada mudança de mecânica. Revisão025 proposta sem mudança de mecânica; PR/aceite humano e mudanças futuras precisam de prova.
- [x] I02-15 — AVANÇADO: telas do Stitch comprovadas. Desenhos próprios cumprem a alternativa mínima; não declarar que foram feitos no Stitch. Se propor equivalência, validar com professor.

### Complemento obrigatório do modelo GDD fornecido

Esta subseção mantém o documento completo solicitado, além das quatro seções mínimas citadas no HTML. Os checks indicam conteúdo existente, não revisão coletiva/aceite final.

- [x] GDD-01 — Premissa/problema social ou educativo, público e justificativa de gamificação. E4.
- [x] GDD-02 — High concept em um único parágrafo de até 1.000 caracteres. E4.
- [x] GDD-03 — Gênero, plataforma WEB, engine/linguagem/frameworks. E4.
- [x] GDD-04 — Mecânicas-core, ações, loop, dificuldade/progressão, vitória/derrota, aprendizagem e recompensas usadas. E4.
- [x] GDD-05 — Enredo/personagens ou explicação honesta de não aplicabilidade. E4.
- [x] GDD-06 — Fluxo com diagrama de estados/navegação, menus, partida e encerramento. E4.
- [x] GDD-07 — Level design com mapas em imagens, posições, objetos e recursos pertinentes. E4.
- [x] GDD-08 — UI/UX com wireframes/telas de menu/HUD/fim, acessibilidade e responsividade. E4.
- [x] GDD-09 — Áudio/música: declarar ausência ou registrar origem/licença de trilha/efeitos. E4: ausência declarada.
- [x] GDD-10 — Arte/referências/concept art com origem e direitos. E4/E6.
- [x] GDD-11 — IA/terceiros, ferramentas, usos, componentes, licenças e direitos descritos. E4/E6.
- [x] GDD-12 — Ideias adicionais/roadmap separados do implementado. E4.
- [x] GDD-13 — Identificação completa: squad, quatro nomes, RAs, papéis e contas; Lucca Castilho Costa / 26179873 confirmado em 14/10/2026.
- [ ] GDD-14 — Versão/data coerentes com release, links finais reais e acessíveis.
- [ ] GDD-15 — Declaração de originalidade/direitos conferida pelos quatro, sem assinatura/CPF públicos; eventual versão privada conforme orientação.
- [ ] GDD-16 — Revisão humana de texto, tabelas, declarações, mapas e legibilidade da versão final do PDF.

## INT-03: Pipeline CI/CD no GitHub Actions · peso 15% de A

- [x] I03-01 — Workflow como código em .github/workflows, esteira.yml versionado. E2.
- [x] I03-02 — Disparo automático em push e pull_request. E2.
- [x] I03-03 — Jobs atuais em ubuntu-latest. E2.
- [x] I03-04 — Checkout e npm ci com package-lock.json. E2.
- [x] I03-05 — Lint executado e bloqueante. E2.
- [x] I03-06 — Unidade/integração executadas com JUnit e cobertura. E2/E3.
- [x] I03-07 — Segurança Gitleaks/npm audit/SBOM integrada e bloqueante conforme INT-05. E2.
- [x] I03-08 — Build do jogo, GDD.pdf e build.zip automatizados. E2/E7.
- [x] I03-09 — Checkout limpo dos jobs da run38829484114/1 executou CI→HML→PRD e monitor com sucesso, consumindo bundle verificado e configuração versionada/variables. Aprovação de produção registrada. Reconferir na tag final. [Provas](../evidencias/operacao-2026-10-15.md).
- [x] I03-10 — Status check ci obrigatório na main. E1.
- [x] I03-11 — Credenciais usadas pelo workflow via secrets/token do GitHub; configuração não sensível via variables. E2/E6.
- [x] I03-12 — Permissões mínimas declaradas nos jobs atuais. E2.
- [x] I03-13 — CONTÍNUO: revisar permissões/secrets/variables após adicionar deploys, sondas e triagem. Revisado: contents:read padrão, permissões mínimas restritas a jobs específicos, secrets em repositório sem vazamento em logs. [Evidência 036](../evidencias/triagem-final.md).
- [x] I03-14 — Relatórios, PDF, ZIP/checksum e SBOM publicados como artefatos da CI, inclusive diagnósticos de falha previstos. E2.
- [x] I03-15 — deploy-hml formal passou na run38829484114, SHA88d533e, após ci verde, publicando o mesmo ZIP verificado e recibo de sete hashes. [Recibo](../evidencias/operacao-2026-10-15/hml-88-aceite.json).
- [x] I03-16 — Regressão E2E executada contra HML da main773af17 na run38674290799 (4/4), reconferida em15/10/2026 (4/4 desktop/toque). O job HML completo continuou vermelho na coleta de tempo. [Provas](../evidencias/operacao-2026-10-15.md).
- [x] I03-17 — deploy-prd executou após HML bem-sucedida e aprovação real do environmentproducao, mantendo reviewer e proteção. [Prova](../evidencias/operacao-2026-10-15/prd-88-recibo.json).
- [ ] I03-18 — Produção integra publicação de release, estratégia progressiva, smoke e rollback.
- [x] I03-19 — Aprovação real de luccalck no environmentproducao da run38829484114/1 registrada, conforme política existente; sem bypass ou mudança de regras. [API](../evidencias/operacao-2026-10-15/aprovacoes-38829484114.json).
- [x] I03-20 — Push do merge33 na main disparou CI→HML→PRD→monitor automaticamente; única aprovação manual prevista emproducao. Run38829484114 integralmente verde; release por tag e submissão final continuam separadas. [Jobs](../evidencias/operacao-2026-10-15/jobs-38829484114.json).
- [x] I03-21 — Push→HML formal medido em216,414s, abaixo de900s, run38829484114/1 SHA88d533e. Fonte merged_at do merge exato e conclusão da regressão, sem usar created_at do run. [Medição](../evidencias/operacao-2026-10-15/hml-88-tempo.json).
- [x] I03-22 — AVANÇADO: estágios independentes paralelos na CI. E2: qualidade/segurança/build/E2E.
- [x] I03-23 — AVANÇADO: cache de dependências configurado e utilizado pela CI. E2/setup-node.
- [ ] I03-24 — AVANÇADO: notificações da esteira implementadas e recebimento comprovado.
- [x] I03-25 — AVANÇADO: prazo HML comprovado em216,414s na esteira formal38829484114, com regressão, recibo e hashes aprovados. [Medição](../evidencias/operacao-2026-10-15/hml-88-tempo.json).

## INT-04: Testes automatizados · peso 12% de A

- [x] I04-01 — Regras puras separadas da renderização em src/core. E3.
- [x] I04-02 — Pelo menos quinze testes de unidade. E3: 152.
- [x] I04-03 — Cobertura ≥70% de src/core. E3: instruções 97,90%.
- [x] I04-04 — Pelo menos três testes de integração. E3: 26.
- [x] I04-05 — Carregamento e validação de schema do conteúdo JSON testados. E3.
- [x] I04-06 — JSON inválido quebra a build. E3/E7.
- [x] I04-07 — Pelo menos dois cenários E2E de navegador. E3: quinze originais; [regressão006](../evidencias/regressao-hml.md):17locais verdes e5cenários no preview público em13/10/2026.
- [x] I04-08 — Roteiro completo executado na HML da main773af17: cinco missões, 23 casos finais, vitória700XP e reinício, desktop/toque, 4/4 na CI e 4/4 na reconferência15/10. [Provas](../evidencias/operacao-2026-10-15.md).
- [x] I04-09 — Regressão integrada ao deploy-hml formal e executada na run38674290799, antes da etapa de medição que falhou. O gate impediu PRD; preservar esse comportamento nos próximos deploys. [Provas](../evidencias/operacao-2026-10-15.md).
- [x] I04-10 — Smoke público da candidata e da raiz executados antes/depois da virada azul-verde, run38829484114/1; fonte88d533e,0.7.0, passou sem erros. [Smoke](../evidencias/operacao-2026-10-15/prd-88-smoke.json).
- [x] I04-11 — Teste falhando impede o check ci e bloqueia merge na main. E1/E2.
- [x] I04-12 — Bug real encontrado por teste, corrigido com regressão correspondente. E3: foco/regra antiga/exportação Python, registros em docs/evidencias.
- [x] I04-13 — Citar bug, falha anterior, correção e teste no relatório técnico final, com links reais. Citados em docs/relatorio.md e artifacts/RelatorioTecnico.pdf Seção 4: bug-regra-antiga (workshop.spec.mjs, commit 76b7797) e bug-foco (Issue #1).
- [ ] I04-14 — CONDICIONAL Opal/AI Studio: se usados para conteúdo, eval/golden.jsonl valida formato antes de entrar no jogo. Não usados atualmente; não criar evidência fictícia de golden eval.
- [x] I04-15 — AVANÇADO: cobertura acima da meta. E3.
- [x] I04-16 — AVANÇADO: bug real capturado por teste de regressão. E3; apresentado no relatório técnico (I04-13).
- [x] I04-17 — CONTÍNUO/FINAL: candidata0.7.0/78c367d com273testes unidade/integração e36E2E, lint/segurança/build/reprodutibilidade verdes na CI38674970174. Tag acadêmica final exige nova conferência; não há aceite antecipado. [Provas](../evidencias/operacao-2026-10-15.md).

## INT-05: Segurança, licenças e IA · peso 10% de A

- [x] I05-01 — Gitleaks na pipeline com falha bloqueante ao detectar segredo. E2/E6.
- [x] I05-02 — Histórico Git incluído na varredura. E2: checkout fetch-depth 0.
- [x] I05-03 — Relatório Gitleaks disponível como artefato. E2.
- [x] I05-04 — npm audit das dependências de produção bloqueia vulnerabilidade crítica. E2/E6.
- [x] I05-05 — Relatório npm audit arquivado. E2.
- [x] I05-06 — Dependabot ativado/verificado em13/10/2026: alerts habilitados, APIHTTP200/0alerts, securityupdatesenabled e YAMLnpm/Actions na branchpadrão. [Segurança004](../evidencias/seguranca-inicial.md). Não alegamos PR ou job de atualização executado.
- [x] I05-07 — SBOM CycloneDX/SPDX gerado com npm sbom. E2.
- [x] I05-08 — SBOM disponível como artefato de build. E2.
- [x] I05-09 — SBOM anexado à Release técnica pública v0.7.0; download anônimo/hash iguais ao bundle38852413982/2. Reconferir nas próximas releases.
- [x] I05-10 — THIRD_PARTY.md inventaria componentes/ativos atuais e referências/licenças. E6.
- [ ] I05-11 — CONTÍNUO/FINAL: conferir toda biblioteca, sprite, som, fonte e música, com autor, link e licença, incluindo vídeo.
- [x] I05-12 — LICENSE do projeto versionada. E6.
- [x] I05-13 — AI-USAGE.md registra ferramentas, finalidades, instruções/resultados aceitos e situação real de revisão. E6.
- [ ] I05-14 — Completar rastreabilidade por uso: data, ferramenta, integrante real, finalidade, prompt resumido, resultado aceito, revisão humana e commit/PR. Narrativa atual não supre dados humanos/revisões ausentes.
- [ ] I05-15 — Revisão humana de todo uso relevante de IA, fatos educativos, código e direitos antes do merge.
- [ ] I05-16 — Conferir direito de uso das ferramentas de IA e ativos/licenças compatíveis com uso público; declaração coletiva real.
- [ ] I05-17 — AI-USAGE coerente com o histórico completo até a tag final; registrar novos usos ao ocorrerem.
- [x] I05-18 — Código gerado passa pelos mesmos testes e scanners. E2/E6.
- [x] I05-19 — AVANÇADO: pre-commit Gitleaks instalado e execução local comprovada. E6/commits documentais anteriores.
- [x] I05-20 — AVANÇADO: política de vulnerabilidade/segredos documentada em SECURITY.md. E6; revisão coletiva ainda pendente.
- [ ] I05-21 — AVANÇADO: usos de IA rastreáveis por PR, com revisão humana registrada (I05-14/15/17).
- [ ] I05-22 — CONTÍNUO/FINAL: conferir direitos/licenças de todos os ativos e usos de IA, inclusive materiais finais. Inventários existem, mas não atestar conformidade integral ou ausência de plágio só pelo scanner. [Reconferência](../evidencias/triagem-final.md).
- [x] I05-23 — CONTÍNUO/FINAL: zero credencial real no repositório; se houver incidente, revogar e corrigir com evidência sem expor o valor. Credencial real zera INT-05. Varredura com Gitleaks em todo o histórico com 0 achados; credenciais locais mantidas estritamente em memória/sessão. [Evidência 036](../evidencias/triagem-final.md).

## INT-06: Release versionada e empacotada · peso 10% de A

- [x] I06-01 — npm ci + npm run build geram dist sem passo manual. E2/E7.
- [x] I06-02 — dist/version.json contém SemVer, SHA e data do build. E5/E7.
- [x] I06-03 — Versão aparece discretamente na tela inicial. E3/E4.
- [x] I06-04 — build.zip gerado no CI. E2/E7.
- [x] I06-05 — build.zip.sha256 gerado no CI. E2/E7.
- [x] I06-06 — ZIP e checksum publicados como artefatos da execução. E2.
- [x] I06-07 — Tag anotadav0.7.0 disparou publicador; após falhas preservadas, retomada38940532129 publicou em16/10,17:33:57UTC. Não é tag acadêmicav1.0.0.
- [x] I06-08 — Release pública v0.7.0 anexa build.zip original;29.265bytes e hash iguais à origem homologada. Verificação pública16/10.
- [x] I06-09 — Release pública v0.7.0 anexa build.zip.sha256; download anônimo e conteúdo conferidos.
- [x] I06-10 — Release pública v0.7.0 anexa sbom.cdx.json; download/hash iguais ao bundle original.
- [x] I06-11 — Release pública v0.7.0 anexa GDD.pdf; download/hash iguais ao bundle original e PDF18p da origem.
- [x] I06-12 — Notas dos bytes do HEAD revisadoe9 foram conferidas por hash autorizado e revisão do PR34; Release publicada pela retomada revisada no PR40. Notas futuras exigem nova conferência.
- [x] I06-13 — ZIP descompactado permite jogar abrindo index.html, ou método offline documentado. E3/E7.
- [x] I06-14 — Dois builds do mesmo commit têm conteúdo igual, exceto data em version.json. E3/E7; revalidado localmente em14/10/2026 no SHA `92757b6` por `npm run reproducibility`; detalhes/limite de promoção em [release-integridade.md](../evidencias/release-integridade.md).
- [x] I06-15 — ZIP publicado na Releasev0.7.0 tem hash6517fa79749c4bea490acc36eb197ce19a95617a24a5cba56d2edb40c6fabe9f, idêntico ao bundle38852413982/2 e reciboPRD. Release-verificacao-publica.json preserva comparação.
- [x] I06-16 — Build atual abaixo de 25 MB. E3; revalidado localmente em14/10/2026: ZIP de29.022 bytes no SHA `92757b6`, ver [release-integridade.md](../evidencias/release-integridade.md). PRD/release final ainda não conferidos em I06-15/17.
- [ ] I06-17 — CONTÍNUO/FINAL: conferir offline, tamanho, versão, SHA, data e integridade da release final.
- [x] I06-18 — Escopo técnico v0.7.0:build reprodutível da CI, notas revisadas e SBOM/GDD anexados, seis downloads anônimos conferidos. Não encerra futura release acadêmica.

## INT-07: Ambientes, entrega e rollback · peso 12% de A

- [x] I07-01 — Publicação por equivalência técnica declarada: PagesActions publica a árvore gh-pages escrita pela pipeline, preservando mesmos bytes, ambientes e gates; configuração é build_type=workflow e não a opção literal Deploy from a branch. Justificativa e validação em [Pages](../evidencias/pages-equivalencia-2026-10-16.md).
- [x] I07-02 — gh-pages escrito apenas pela pipeline nas publicações atuais. E2/E7.
- [x] I07-03 — CONTÍNUO: histórico gh-pages consultado na auditoria contém apenas publicação pelo bot deActions, sem alteração manual observada. Preservar esse controle e reconferir publicações formais/recuperação; não equivale a execução dePRD.
- [x] I07-04 — /hml/ contém a build0.7.0 da main773af17 aprovada no CI; os sete arquivos HTTP são idênticos ao ZIP38674290799/1. Isso não declara aceite integral do job HML. Conferência15/10. [Provas](../evidencias/operacao-2026-10-15.md).
- [x] I07-05 — Releases do preview em /releases/<sha>/, preservadas sem sobrescrever conteúdo. E2/E7.
- [x] I07-06 — Release formal /releases/88d533e preservada nas etapas candidata/virada; contratos de imutabilidade testados na CI e sete hashes públicos iguais ao ZIP. Não equivale a GitHub Release por tag. [Prova](../evidencias/operacao-2026-10-15/hashes-88-publicos.json).
- [x] I07-07 — /index.html carrega controle de rollout e redireciona para versão. E5/E7.
- [x] I07-08 — rollout formal público contém estavel88d533e, anterior71933bf, canario=null e percentual=0, strategyazul-verde. [Ponteiro](../evidencias/operacao-2026-10-15/rollout-88-publico.json).
- [x] I07-09 — Estratégia azul-verde documentada e executada na run38829484114, com smoke da candidata antes da virada e da raiz depois. [Jobs](../evidencias/operacao-2026-10-15/jobs-38829484114.json).
- [ ] I07-10 — CONDICIONAL canário: distribuir aproximadamente 10% das sessões à nova versão.
- [ ] I07-11 — CONDICIONAL canário: smoke e período de observação comprovados antes de promover a 100%.
- [x] I07-12 — CONDICIONAL azul-verde aplicado: candidata publicada em sua pasta imutável e testada antes da troca. [Smoke](../evidencias/operacao-2026-10-15/prd-88-candidata-smoke.json).
- [x] I07-13 — CONDICIONAL azul-verde aplicado: estavel passou para88d533e, anterior71933bf mantida, candidata sem tráfego durante preparação e canario retirado após promoção. [Ponteiro](../evidencias/operacao-2026-10-15/rollout-88-publico.json).
- [x] I07-14 — Preview preserva versão do jogador durante a sessão quando ainda válida. E7/testes Pages.
- [x] I07-15 — Versão preservada em sessão real durante promoções; versão retirada volta à baseline, sessão nova e storage indisponível escolhem e9dd28c. Evidência: operacao-release-2026-10-16/sessao-promocao.json e manual-verificacao.json.
- [ ] I07-16 — Parte operacional executada:falha no observador de ensaio acionou recuperação real na run38851915984. O smoke normal anterior passou; falta o critério literal de smokePRD detectando versão defeituosa, inclusive demonstração na banca.
- [x] I07-17 — Rollback real restaurou estavel para anterior, retirou candidata e conferiu sete hashes sem recompilar; runs38851754358 e38851915984. Estratégia azul-verde, não canário.
- [x] I07-18 — rollback.yml executado por dispatch ensaio-controlado, com aprovação do environment, Pages e smoke; run38851754358 SUCCESS; 80,66 s do dispatch ao smoke.
- [x] I07-19 — Histórico gh-pages registra ator/motivo/run da promoção: commit67ce33d, bot Actions, atorluccalck, motivo promover, execução38829484114/1. Fonte ligada no DORA real. [Evidência](../evidencias/operacao-2026-10-15/dora-38830013027.json).
- [ ] I07-20 — Ensaio formal de observador com falha e rollback real executado em17,166s. A build do jogo não foi alterada para falhar; o pedido literal de versão defeituosa proposital na banca continua pendente.
- [ ] I07-21 — Falha de carregamento foi observada e acionou recuperação real no ensaio. Falta vincular a demonstração literal de versão defeituosa a alerta ou smoke no contexto solicitado pelo professor; não chamar script de injeção de smokePRD falho.
- [x] I07-22 — Recuperação automática medida em17,166 s, incluindo Pages, sete hashes e smoke; run38851915984. Manual80,66 s até smoke. Escopo ensaio, sem incidente espontâneo.
- [x] I07-23 — Observação HTTP durante recuperação:65 amostras automáticas e171 manuais, todas200. Continuidade demonstrada na janela amostrada; não garante os intervalos entre consultas.
- [ ] I07-24 — Executar a demonstração cronometrada pedida pelo professor na banca. Roteiro estruturado de 5 minutos (commit→produção, falha→alerta→rollback em < 5 min sem queda de URL e modo offline) documentado em docs/evidencias/entrega-banca.md Seção 3; demonstração ao vivo aguarda a banca presencial.
- [ ] I07-25 — Parte técnica:recuperação automática17,166s incluindoPages/hashes/smoke e65HTTP200 observados. Demonstração cronometrada na banca ainda pendente(I07-24); não é aceite antecipado do professor.

## INT-08: Monitoramento, alertas e DORA · peso 10% de A

- [x] I08-01 — monitor.yml versionado com schedule a cada quinze minutos. 13/10/2026, commit b3d5353/PR#15 e CIs38501135262/38501139202 SUCCESS; arquivo/cron comprovados, monitor ainda inativo e execução/persistência pendentes.
- [x] I08-02 — Sonda pós-produção38830013027 verificou PRD formal0.7.0/SHA88d533e, HTTP200,0,033560s e sem erro; gate pós-produção passou. [Sonda](../evidencias/operacao-2026-10-15/sondas-38830013027.json).
- [x] I08-03 — Sondar HML publicada da main: três execuções reais38704560758/38744110194/38770216623 confirmaramHTTP200,0.7.0/SHA773af17. Fonte formal de aprovação completa ainda aguarda nova run. [Provas](../evidencias/operacao-2026-10-15.md).
- [x] I08-04 — CódigoHTTP real dos dois alvos registrado nas seis amostras de15/10; todos200. Raiz ainda preview, sem inferir produção formal. [CSV](../evidencias/operacao-2026-10-15/sondas.csv).
- [x] I08-05 — Tempo real de resposta dos dois alvos registrado nas seis amostras de15/10,0,094492–0,338412s; não é garantia de latência futura. [CSV](../evidencias/operacao-2026-10-15/sondas.csv).
- [x] I08-06 — Versão eSHA obtidos de version.json real: HML0.7.0/773af17 e raizpreview0.6.0/71933bf. [Sonda](../evidencias/operacao-2026-10-15/sondas-38770216623.json).
- [x] I08-07 — CSV acumulado com seis amostras reais: data,alvo,codigo,tempo,versao. Três runs concluídas, sem preencher amostras entre execuções. [CSV](../evidencias/operacao-2026-10-15/sondas.csv).
- [x] I08-08 — Dados persistidos pelo bot na branch observabilidade nas três coletas reais; monitor não publica Pages. [Execuções/fontes](../evidencias/operacao-2026-10-15.md).
- [x] I08-09 — Criar label alerta nas Issues. 14/10/2026, contaDaviSouza78: criação e GET labels/alerta confirmados; corB60205/descrição operacional. [Evidência016](../evidencias/alertas.md). Não comprova incidente.
- [x] I08-10 — Abertura automática exercitada com HTTP404 real no alvo temporário do ensaio38847296363,Issue38. Escopo ensaio/labelensaio; a exigência literal labelalerta permanece emI08-31.
- [x] I08-11 — Abertura automática exercitada com atrasoHTTP real2,2s no ensaio38847296363,Issue39. Escopo ensaio/labelensaio; não afirma lentidão da produção.
- [x] I08-12 — Ensaio38847296363 repetiu duas sondas por falha e não duplicouIssues38/39. Bug da primeira tentativa preservado/corrigido com regressão. Prova:ensaio-2026-10-16/alertas-ensaio-aprovado.json.
- [x] I08-13 — Issue38 fechada automaticamente após retornoHTTP200 válido no ensaio38847296363;1s entre abertura/fechamento. Não é incidente da produção.
- [x] I08-14 — Issue39 fechada automaticamente após latência/HTTP normalizados no ensaio38847296363;3s entre abertura/fechamento. Não é incidente da produção.
- [x] I08-15 — Quatro integrantes assistem o repositório e verificam recebimento das notificações por e-mail/celular conforme seus canais. 14/10/2026: Davi respondeu nestechat “todos ja fizeram a validação” à pergunta explícita sobreWatch/recebimento pelosquatro. Confirmação humana, sem alegar inspeção pelaIA. [Evidência016](../evidencias/alertas.md).
- [x] I08-16 — Painel público /status/ publicado pela pipeline, HTTP200; carregamento real no navegador e refresh aprovados, desktop/celular. [Prova](../evidencias/operacao-2026-10-15/painel-88-browser.json).
- [x] I08-17 — Painel mostra100% entre sete amostras de códigos conhecidos da URL (inclui preview histórico); não demonstra SLA ou continuidade. [Prova](../evidencias/operacao-2026-10-15/painel-88-browser.json).
- [x] I08-18 — Painel mostrou latência média110ms das amostras existentes, com origem/período explícitos. Não é tempo garantido. [Prova](../evidencias/operacao-2026-10-15/painel-88-browser.json).
- [x] I08-19 — Painel mostrou0.7.0/SHA88d533e coerente com produção formal e sonda atual. [Prova](../evidencias/operacao-2026-10-15/painel-88-browser.json).
- [x] I08-20 — Painel mostrou Azul-verde, candidata ausente e0% de novas sessões na candidata. Estável atual servida no smoke real. [Prova](../evidencias/operacao-2026-10-15/painel-88-browser.json).
- [x] I08-21 — Quatro cards DORA renderizados com três números reais e MTTRIndisponível por falta de alerta fechado. Não inventar o quarto valor. [Prova](../evidencias/operacao-2026-10-15/painel-88-browser.json).
- [x] I08-22 — scripts/dora.mjs executou com fontes GitHub nas três coletas; quatro métricas corretamente sem valores por ausência de deploy/alerta formal elegível. Isso valida coleta/cálculo, não I08-23–29. [JSON](../evidencias/operacao-2026-10-15/dora-38770216623.json).
- [x] I08-23 — Frequência real1/14=0,0714286deploys/dia na janela de14dias, uma implantação formal com fonte GitHub. [DORA](../evidencias/operacao-2026-10-15/dora-38830013027.json).
- [x] I08-24 — Lead time real0,0908333h=5min27s entre commitmain88d533e e fim do deploy-prd com smoke; uma observação. [DORA](../evidencias/operacao-2026-10-15/dora-38830013027.json).
- [x] I08-25 — Taxa real0% com um deploy formal e nenhum rollback correlacionado na janela. Amostra pequena; não afirma confiabilidade futura. [DORA](../evidencias/operacao-2026-10-15/dora-38830013027.json).
- [x] I08-26 — Issues43/44 com labelalerta+ensaio criadas/fechadas automaticamente em38950333359:2s/4s,média3s calculada dos timestampsGitHub. Tempo real do ensaio; MTTR operacional continuaN/D por exclusão explícita de ensaios. Prova:fechamento-entregaveis-2026-10-16/ensaio-alertas.json.
- [x] I08-27 — Lead time observado0,00378472dia comparado à linha de base fornecida de11dias; apenas uma amostra e ponto inicial definido no script, sem atribuir causalidade ou ganho garantido. [DORA](../evidencias/operacao-2026-10-15/dora-38830013027.json).
- [x] I08-28 — Em16/10,com2deploys/CFR50% incluindorollbackplanejado/leadmédio35min19s, registramos decisão de preservar a produção e separar evidências de ensaio ao avaliar UX, evitando novosdeploys apenas para gerar amostras. Ver melhoria-dora.md. Efeito de melhoria deDORA ainda não demonstrado(I08-29/32).
- [ ] I08-29 — Medir/documentar efeito da melhoria, sem fabricar ganho ou quantidade mínima de execuções.
- [x] I08-30 — Relatório registra atrasos reais dos schedules: duas execuções agendadas15/10 separadas por cerca de5h19 apesar de cron*/15. Não promete pontualidade/CDN contínua por cron. [Fontes](../evidencias/operacao-2026-10-15.md).
- [x] I08-31 — EnsaioHTTP real38950333359:Issues43/44 abriram com labelalerta+ensaio,sem duplicação,e fecharam automaticamente após normalização,em2s/4s. Classificação corrigida sem alterar Issues antigas nem contaminar DORA operacional. É demonstração controlada de detecção/tratamento, não queda espontânea da aplicação; fontes/limites no fechamento-entregaveis-2026-10-16.md.
- [ ] I08-32 — AVANÇADO: melhoria orientada por métrica com resultado verificável.
- [ ] I08-33 — CONDICIONAL: contagem anônima de partidas/fases, se adotada; sem identificar jogador, finalidade documentada.

## INT-09: Build pública, pacote e triagem · peso 8% de A

- [ ] I09-01 — Pipeline gera pasta submissao, sem montar pacote final manualmente.
- [ ] I09-02 — submissao/GDD.pdf gerado pela pipeline e válido.
- [ ] I09-03 — submissao/LINK_DO_JOGO.txt aponta à URL pública da produção formal.
- [ ] I09-04 — submissao/build.zip contém o site dist da mesma release promovida.
- [x] I09-05 — Build ZIP atual inclui LEIA-ME.txt com execução offline. E3/E7.
- [ ] I09-06 — submissao/pitch.mp4 é entrada humana real validada, não gameplay simulado.
- [ ] I09-07 — submissao/MANIFESTO.sha256 contém hash de cada arquivo do pacote, inclusive GDD, link, ZIP e vídeo.
- [x] I09-08 — Implementar scripts/triagem.sh/job equivalente justificado, integrado à pipeline. 14/10/2026: scripts/triagem.sh suporta argumentos de triagem e está integrado ao job submissao de .github/workflows/esteira.yml e scripts/submissao.mjs; validado em testes unitários/integração.
- [ ] I09-09 — Triagem confere HTTP 200 da URL pública.
- [ ] I09-10 — Triagem executa smoke Playwright na URL pública.
- [ ] I09-11 — Triagem confere PDF abre por pdfinfo.
- [ ] I09-12 — Triagem confere presença das quatro seções mínimas obrigatórias do GDD.
- [ ] I09-13 — Triagem mede vídeo com ffprobe e bloqueia duração >90 s.
- [ ] I09-14 — Triagem descompacta build.zip e confere index.html.
- [ ] I09-15 — Triagem valida exatamente quatro integrantes reais em SQUAD.md; não contar cabeçalhos como integrantes.
- [ ] I09-16 — Triagem valida data atual contra prazo corretamente configurado, sem assumir horário 19:00 do exemplo.
- [ ] I09-17 — Triagem gera/confere manifesto SHA-256 e falha se os arquivos/hash não corresponderem.
- [ ] I09-18 — Falha em qualquer checagem reprova o job e impede entrega considerada aprovada.
- [ ] I09-19 — Rodar triagem na tag v1.0.0 e arquivar resultado TRIAGEM APROVADA verdadeiro.
- [ ] I09-20 — Arquivar pacote e logs da triagem junto da release/execução correspondente.
- [ ] I09-21 — AVANÇADO: triagem agendada até a banca. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] I09-22 — AVANÇADO: triagem agendada avisa se a URL cair até a banca, com notificação real. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] I09-23 — CONDICIONAL concurso: enviar o mesmo pacote ao Drive do responsável e conferir acesso total ao e-mail do regulamento.
- [ ] I09-24 — CONDICIONAL concurso: testar compartilhamento em janela anônima com outra conta.

## INT-10: Vídeo e relatório · peso 5% de A

- [x] I10-01 — Roteiro do pitch explica proposta de gamificação.
- [x] I10-02 — Roteiro explica conceito e diferencial.
- [ ] I10-03 — Gravar gameplay real da build de produção formal.
- [ ] I10-04 — Gerar pitch.mp4 com duração ≤90 segundos verificada por ffprobe.
- [x] I10-05 — Registrar direitos de trilha e imagens em THIRD_PARTY.md, ou declarar ausência de trilha quando aplicável.
- [ ] I10-06 — Inserir legendas legíveis por acessibilidade.
- [x] I10-07 — Obter concordância real de quem aparece/tem imagem ou voz publicada no vídeo.
- [x] I10-08 — Relatório técnico gerado e validado na CI38772751460, SHAee8f2e4:10páginas A4,583.390bytes, pdfinfo/texto aprovados. É relatório da candidata; evidências finais dePRD/release/triagem ainda pendentes. [Prova](../evidencias/operacao-2026-10-15/relatorio-ci-verificacao.json).
- [x] I10-09 — Relatório apresenta arquitetura da esteira e decisões. docs/relatorio.md Seção 2 (Jobs esteira.yml, pacote-ci, ambientes HML/PRD).
- [x] I10-10 — Relatório apresenta alternativas descartadas e justificativas. docs/relatorio.md Seção 3 (Descarte de Pyodide, engines pesadas, backend com RCE, nuvem paga).
- [ ] I10-11 — Relatório contém prints reais com data e links de build/evidência de cada um dos dez INT. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] I10-12 — Relatório contém quatro DORA reais e comparação com a linha de base. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [x] I10-13 — Retrospectiva registra o que funcionou. docs/relatorio.md Seção7.
- [x] I10-14 — Retrospectiva registra o que não funcionou. docs/relatorio.md Seção7: antecipação de aceites e acúmulo dePRs semintegração.
- [x] I10-15 — Retrospectiva registra o que mudariam, sustentado por dados. docs/relatorio.md Seção7: revisão de registros/proveniência, com base nos27checkscontestados e bundleauditado; efeitoDORAa medir.
- [x] I10-16 — Contribuição de cada integrante com links dos PRs reais. docs/relatorio.md Seção7 e docs/contribuicoes.md mapeiam os28PRsautorais e os respectivos estados de revisão.
- [x] I10-17 — PDF da CI38772751460 baixado, aberto e com10páginas renderizadas/inspecionadas;3imagens e58links. Artefato build acessível no Actions; preservar PDF final na release quando aprovada. [Prova](../evidencias/operacao-2026-10-15/relatorio-ci-verificacao.json).
- [ ] I10-18 — Acrescentar evidências reais de release/triagem após as execuções; não declarar sucesso antecipado. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] I10-19 — AVANÇADO: narrativa clara do pitch, legendas e retrospectiva honesta com dados.

## 06 — Kit de partida: fechar as lacunas dos exemplos

Os esqueletos não passam como estão. Nomes/estrutura exemplificados não obrigam a trocar uma implementação equivalente funcional; justificar equivalências no relatório. Itens repetidos abaixo apontam aos checks principais, para não perder os TODO e instruções do kit.

- [x] KIT-01 — README explica como rodar, branching e arquitetura. README atual.
- [x] KIT-02 — Código organizado em core/renderização/conteúdo e testes unidade/integração/E2E. E3.
- [x] KIT-03 — package.json/lockfile, configuração Gitleaks e esteira versionados. E2/E6.
- [ ] KIT-04 — Fonte docs/relatorio.md e gerador PDF disponíveis; validar/publicar relatório final e completar provas pendentes de I10-08 a I10-18.
- [x] KIT-05 — rollback.yml executado com sucesso pela pipeline; run38851754358, aprovação, Pages, hashes e smoke verificados (I07-18).
- [x] KIT-06 — monitor.yml executado com sondas e reconciliação de alertas verdes em38704560758,38744110194 e38770216623. Painel, incidentes tratados e métricas com denominadores continuam pendentes. [Provas](../evidencias/operacao-2026-10-15.md).
- [x] KIT-07 — Painel status publicado e verificado em navegador desktop/celular, com versão, amostragem, rollout e DORA sem preencher lacunas. [Prova](../evidencias/operacao-2026-10-15/painel-88-browser.json).
- [ ] KIT-08 — Publicação, rollout, DORA e triagem implementados por scripts equivalentes aos exemplos; não copiar TODO como solução.
- [x] KIT-09 — Actions revisadas em releases/refs/action.yml oficiais em13/10/2026, fixadas por SHA; CI38428808065 validou ferramentas ativas. [Revisão007](../evidencias/ci-formal.md); Pages ainda não executado neste passo.
- [x] KIT-10 — Cache npm e checkout com histórico para scanner nos jobs atuais. E2.
- [x] KIT-11 — Corrigir lacuna SemVer no version.json do exemplo. E5/E7: version 0.6.0 presente.
- [x] KIT-12 — Equivalência PagesActions/gh-pages fundamentada e tecnicamente validada; ver I07-01. Não pressupõe nota ou aceite antecipado do professor.
- [x] KIT-13 — Integrar homologacao e producao nos jobs; producao com reviewer obrigatório (ARQ-07/08). Conciliação15/10: Environments integrados e usados na execução formal38829484114, com reviewer obrigatório e aprovação registrada em producao.
- [x] KIT-14 — SITE_URL pública configurada em13/10/2026 com https://luccalck.github.io/desafio-arcade e destinos derivados documentados/verificados no [passo003](../evidencias/configuracao-github.md). Integração nos jobs formais/sondas/triagem permanece nos respectivos checks.
- [x] KIT-15 — Esperar propagação do Pages com tentativa limitada antes dos E2E formais de HML. Conciliação15/10: Espera limitada de propagação executada no deploy-hml formal, seguida de quatro cenários públicos aprovados.
- [x] KIT-16 — Publicação atual não cancela um deploy em andamento: grupo pages-preview cancel-in-progress false. E2.
- [x] KIT-17 — Preservar essa proteção de concorrência no deploy/rollout formal; serializar mudanças de ponteiro. Conciliação15/10: Concorrência de publicação/rollout serializada no workflow integrado e usada no deploy formal; ensaio de colisão/falha parcial ainda pertence à recuperação.
- [ ] KIT-18 — Implementar ações canario/promover/rollback ou equivalentes da estratégia escolhida, com commit ator/motivo (I07).
- [x] KIT-19 — Carregador formal observado em sessões reais nas promoções/retirada e storage indisponível; sessão-promocao.json e manual-verificacao.json no registro16/10.
- [ ] KIT-20 — Completar promoção após observação e notificação de falha: TODO do workflow (I03-24/I07).
- [ ] KIT-21 — Ajustar validação SQUAD ao formato real; corrigir contagem de cabeçalho do exemplo (I09-15).
- [ ] KIT-22 — Completar validação das seções do PDF que o exemplo triagem não implementa (I09-12).
- [ ] KIT-23 — Medir duração real, sem truncar segundos para aceitar vídeo acima de 90 s (I09-13).
- [ ] KIT-24 — Prazo configurado de forma verdadeira; 19:00 é exemplo, não horário confirmado (I09-16).
- [x] KIT-25 — observabilidade/status/sondas.csv acumulou seis registros reais com cabeçalho data,alvo,codigo,tempo,versao. [Cópia verificada](../evidencias/operacao-2026-10-15/sondas.csv).
- [x] KIT-26 — Funcionalidades implementadas e executadas em ensaioHTTP real38847296363:latência e autocerramento dasIssues38/39. Limite literal de label do ensaio permanece emI08-31.
- [x] KIT-27 — Versão sondada implementada e confirmada nas três execuções de15/10, sem confundir raizpreview comPRD formal. [Provas](../evidencias/operacao-2026-10-15.md).
- [ ] KIT-28 — Registrar IA com todos os campos do modelo e declaração humana verdadeira; nomes/linhas de exemplo não são nossos integrantes (I05-14/15/16).
- [ ] KIT-29 — CONDICIONAL: golden.jsonl se houver conteúdo Opal/AI Studio, conforme requisito específico I04-14; não impor eval a todo código produzido com IA.

## 07 — Cronograma, prévia, fechamento e envio

Datas abaixo são as datas do enunciado original, não comprovação de que houve entrega. Preservar registros verdadeiros; não retroagir commits/tags. A inscrição opcional é independente da nota.

- [ ] CR-01 — Conferir marcos de 02/10: leitura do regulamento, formação, escolha do tema, SQUAD e repositório, primeiro PR com esqueleto.
- [ ] CR-02 — Conferir prévia formativa de 05/10: v0.1.0, INT-01/02/03/06 e tela jogável na HML pela pipeline; guardar devolutiva real se houver. A prévia não compõe a nota.
- [ ] CR-03 — Conferir atividades previstas para 06–08/10: INT-04/05/07/08 funcionando, ensaio cronometrado, gravação e triagem aprovada. Sem cronologia/ensaio/gravação/triagem completos; não retroagir prova na etapa026.
- [ ] CR-04 — Conferir marco de entrega: tag v1.0.0, pacote, relatório técnico e ficha TXT enviados ao AVA; horário do início da aula não é inferido do script. Artefatos conferidos em docs/evidencias/entrega-banca.md; envio no AVA aguarda ação humana do responsável.
- [ ] CR-05 — Confirmar recibo/acesso dos anexos no AVA e URLs para o professor, sem declarar envio que não ocorreu. Protocolo de obtenção e arquivamento do recibo formalizado em docs/evidencias/entrega-banca.md Seção 2; arquivamento pendente do upload real.
- [ ] CR-06 — Ensaiar apresentação de dez minutos com os quatro. Roteiro estruturado em docs/apresentacao-banca.md com 2m30s de fala para cada um dos quatro integrantes; ensaio conjunto é ação presencial humana pendente.
- [ ] CR-07 — Ensaiar demonstração ao vivo de cinco minutos com falha injetada e rollback. Roteiro em três atos (promoção, falha/alerta/rollback < 5 min e contingência offline) estruturado em docs/evidencias/entrega-banca.md Seção 3; ensaio conjunto e execução presencial agendados.
- [ ] CR-08 — Preparar os quatro para cinco minutos de perguntas. Roteiro com perguntas técnicas prováveis e respostas fundamentadas preparado em docs/apresentacao-banca.md Seção 3.
- [ ] CR-09 — Após v1.0.0, congelar funcionalidades e admitir correções via PR revisado/CI. Política preparada; sem tag final no snapshot auditado.
- [x] CR-10 — CONTÍNUO: nunca alterar produção/gh-pages manualmente após congelamento. Política ativa: toda publicação em gh-pages e produção ocorre exclusivamente por workflows do GitHub Actions com aprovação de environment.
- [ ] CR-11 — CONDICIONAL concurso: submissão até 21/10/2026, 23h59, horário de Brasília. Condição ainda não comprovada; concurso opcional e sem autorização coletiva registrada. Ver [decisão pendente](../concurso-decisao.md).
- [ ] CR-12 — CONDICIONAL concurso: melhorias após devolutiva continuam passando pela esteira. Condição ainda não comprovada; concurso opcional e sem autorização coletiva registrada. Ver [decisão pendente](../concurso-decisao.md).
- [ ] CR-13 — CONDICIONAL concurso: manter URL pública no ar durante triagem de novembro. Condição ainda não comprovada; concurso opcional e sem autorização coletiva registrada. Ver [decisão pendente](../concurso-decisao.md).

## 08 — Rubrica completa e banca

Esta tabela transcreve os três níveis como critérios de conferência. Os estados básicos são descrições de desempenho insuficiente para o objetivo, não funcionalidades que devemos implementar. A meta avançada requer também mínimos e aceites; INT não entregue/não funcional recebe 0 a 2.

| INT | Básico: 3–5 | Proficiente: 6–8 | Avançado: 9–10 / checks |
|---|---|---|---|
| 01 | Histórico, mas commits direto na main | PRs revisados, main protegida, tags SemVer | Histórico exemplar, Conventional Commits, equilíbrio dos quatro — I01-17 |
| 02 | GDD completo fora da pipeline | GDD versionado, PDF no build | GDD vivo por PR em cada mudança, telas Stitch — I02-14/15 |
| 03 | Pipeline com passos manuais | Todos os estágios, credenciais seguras | ≤15 min HML, paralelismo/cache/notificações — I03-21 a I03-25 |
| 04 | Só unidade | Pirâmide completa/gate | Cobertura acima da meta, bug real com regressão — I04-15/16 |
| 05 | Inventário incompleto | Scanners/SBOM/registros completos | Pre-commit, política de vulnerabilidade, IA por PR — I05-19 a I05-21 |
| 06 | Build manual ou sem versão rastreável | ZIP/checksum/version/release por tag | Reprodutível, notas revisadas, SBOM/GDD na release — I06-18 |
| 07 | Só produção/sobrescrita | HML/releases/estratégia | Rollback automático <5 min na banca sem queda — I07-25 |
| 08 | Sondas sem alertas/painel | Dois alertas/painel/DORA | Alerta real tratado, melhoria por métrica — I08-31/32 |
| 09 | Pacote manual | Triagem aprovada/pacote pipeline | Triagem agendada avisa queda até banca — I09-21/22 |
| 10 | Vídeo >90 s/relatório sem evidências | Vídeo/relatório completos | Narrativa clara, legendas, retrospectiva com dados — I10-19 |

- [ ] B-01 — Inovação/originalidade (25% de B): demonstrar aprendizagem por mecânica tecnológica além de quiz com pontos.
- [ ] B-02 — Inovação/originalidade: diferencial explicado e observável na experiência.
- [ ] B-03 — Viabilidade técnica/execução (25%): demonstrar commit → produção ao vivo. Roteiro estruturado em docs/evidencias/entrega-banca.md Seção 3 (Ato 1); demonstração presencial na banca agendada.
- [ ] B-04 — Viabilidade técnica/execução: demonstrar falha injetada → alerta → rollback, com continuidade. Roteiro estruturado em docs/evidencias/entrega-banca.md Seção 3 (Ato 2: recuperação < 5 min sem queda de URL e modo offline); demonstração presencial agendada.
- [ ] B-05 — Viabilidade técnica/execução: justificar manutenção e evolução da solução. Justificativa de stack limpa, custo zero e conformidade de privacidade DIR-09 documentadas em docs/evidencias/entrega-banca.md e docs/relatorio.md Seção 3.
- [ ] B-06 — Jogabilidade (30%): colega de outra turma joga por três minutos sem explicação. Registro preparado em `docs/evidencias/playtest.md`; sessão humana pendente.
- [ ] B-07 — Jogabilidade: observar/registrar compreensão real, sem inventar respostas. Pendente de sessão.
- [ ] B-08 — Jogabilidade: observar/registrar diversão real. Pendente de sessão.
- [ ] B-09 — Jogabilidade: observar/registrar aprendizagem real. Pendente de sessão.
- [x] B-10 — Jogabilidade: não há bugs bloqueantes na build demonstrada. Validado na candidata v0.6.0 via 36 testes E2E do Playwright (teclado, toque mobile 390x844, offline file:// e exportação Python/HTML). [Evidência 034](../evidencias/aceite-candidata.md).
- [ ] B-11 — Apresentação (20%): fala clara e dentro do tempo.
- [ ] B-12 — Apresentação: divisão efetiva da fala entre os quatro.
- [ ] B-13 — Apresentação: vídeo com qualidade/clareza suficientes e direitos conferidos.
- [ ] B-14 — Apresentação: responder perguntas com domínio dos fatos e limitações.
- [x] B-15 — Conferir pesos A: 10/8/15/12/10/10/12/10/8/5; pesos B: 25/25/30/20; aplicar F real, sem prometer nota. Auditado em docs/evidencias/auditoria-encerramento.md e docs/gestao/ficha-entrega.md; fórmula (0,7×A + 0,3×B)×F mapeada sem prometer nota oficial.

### Correspondência com os doze critérios do plano de ensino

| Critério | Onde conferir neste checklist |
|---|---|
| 1 — CI/CD | I03, I07 |
| 2 — Git colaborativo/rastreável | I01, SQ |
| 3 — Build/teste/deploy | I03, I05 |
| 4 — Docker/Kubernetes (parcial) | I06/I07: artefato imutável e promoção; contêineres/orquestração ficam fora desta avaliação |
| 5 — Testes automatizados | I04 |
| 6 — Azul-verde/canário/rollback | I07, B-04 |
| 7 — Observabilidade | I08: sondas/alertas/painel; sem exigência Prometheus/Grafana |
| 8 — Esteira completa | I09, banca |
| 9 — Entender negócio em equipe | OBJ, SQ, I02 |
| 10 — Comunicação visual/clara | I10, B |
| 11 — Análise/resultados | I08, retrospectiva I10 |
| 12 — Colaboração respeitosa | I01, SQ, F individual |

### Condições eliminatórias — reconferência final

- [ ] EL-01 — Sem plágio ou ativo sem licença/autorização: infração zera avaliação do squad. Conferir revisão final de direitos, inventários/IA e vídeo; não assumir licençaMIT sobre toda referência gerada por terceiros.
- [x] EL-02 — CONTÍNUO: nenhuma alteração manual deprodução observada na consulta; históricoPages consultado é dobotActions. Reconferir no fechamento; política obrigatória preservada.
- [x] EL-03 — Nenhuma credencial real no repositório: infração zera INT-05 e requer revogação. Varredura com Gitleaks limpa no histórico completo. [Evidência 036](../evidencias/triagem-final.md).
- [x] EL-04 — Pipeline funciona desde clone limpo: falha nessa condição zera INT-03. Verificado em runner limpo ubuntu-latest do GitHub Actions. [Evidência 036](../evidencias/triagem-final.md).
- [ ] EL-05 — Regra original de prazo do enunciado: conferir com o professor; não atestar atendimento por cronologia Git nem fabricar data/horário.

## 09 — IA, originalidade, imagem e LGPD

- [ ] DIR-01 — Confirmar direito de uso das ferramentas de IA utilizadas.
- [ ] DIR-02 — Todo uso relevante registrado e revisado por humano antes do merge (I05-14/15).
- [x] DIR-03 — Código gerado submetido aos mesmos testes/varreduras. E2/E6.
- [ ] DIR-04 — Conferir imagens, sons e textos gerados: não imitam personagens, marcas ou obras protegidas.
- [ ] DIR-05 — Ativos próprios ou licenciados; preferência CC0/CC BY, com crédito ao autor quando necessário.
- [ ] DIR-06 — Não usar marcas/logotipos/personagens de terceiros no jogo ou vídeo, inclusive Framework/SENAI, sem autorização.
- [ ] DIR-07 — Bibliotecas com licença compatível registradas em THIRD_PARTY e SBOM; revisão final com vídeo/release.
- [x] DIR-08 — Jogo atual não solicita nome, e-mail, idade, localização ou dado identificável. E3/E4.
- [ ] DIR-09 — CONTÍNUO/FINAL: reconferir ausência de coleta pessoal na build entregue, incluindo serviços/telemetria adicionados.
- [ ] DIR-10 — CONDICIONAL ranking: só apelido escolhido na hora e guardado no navegador. Jogo atual não tem ranking.
- [ ] DIR-11 — CONDICIONAL telemetria: somente anônima e agregada, com coleta/finalidade explicadas no README.
- [x] DIR-12 — Ausência de telemetria explicitada no README em13/10/2026, com dados/chaves/reset; rede/código conferidos no [004](../evidencias/seguranca-inicial.md). Reconferência finalDIR-09 continua aberta.
- [x] DIR-13 — Concordância real de quem aparecer no vídeo (I10-07).
- [ ] DIR-14 — Conferir declaração coletiva de propriedade/originalidade: na UC, protótipo pertence ao squad.
- [ ] DIR-15 — Não publicar CPF/assinaturas/segredos em código, logs, capturas ou artefatos públicos; reconferência final complementar às orientações do projeto.
- [ ] DIR-16 — CONDICIONAL concurso: decisão informada e conjunta sobre licença à Framework e uso de nome/imagem/voz; não aceitar termos automaticamente.

## 10 — Ficha TXT: campos e validações reais do JavaScript

[Respostas persistentes da ficha](ficha-entrega.md), atualizadas em13/10 com nomes completos e RAs de três integrantes; quatro RAs registrados no MD, incluindo Lucca26179873; preenchimento final doHTMLpendente. Registrar dados nesteMD não equivale a preencher/entregar oHTML.

Preencher juntos no HTML original, com declarações verdadeiras. Validação de formulário não verifica automaticamente a existência/qualidade das evidências. Não marcar os dez INT só para liberar o botão.

- [x] FIC-01 — Aura67 preenchido no rascunho do HTML original/Live Server em12/10/2026; [registro](../evidencias/equipe.md). Reconferir ao gerar ficha final.
- [x] FIC-02 — URL HTTP/HTTPS do repositório real disponível. E1; inserção no formulário em FIC-29.
- [ ] FIC-03 — Integrante 1: nome completo com pelo menos duas palavras, RA com pelo menos três caracteres, papel real.
- [ ] FIC-04 — Integrante 2: nome completo com pelo menos duas palavras, RA com pelo menos três caracteres, papel real.
- [ ] FIC-05 — Integrante 3: nome completo com pelo menos duas palavras, RA com pelo menos três caracteres, papel real.
- [ ] FIC-06 — Integrante 4: nome completo com pelo menos duas palavras, RA com pelo menos três caracteres, papel real.
- [x] FIC-07 — Quatro papéis oficiais distintos conferidos/selecionados no HTML original em12/10/2026, conforme equipe confirmada; [registro](../evidencias/equipe.md). Quatro RAs registrados noMDem14/10/2026; transcrição final noHTML e entrega continuam pendentes.
- [ ] FIC-08 — URL pública de produção formal — obrigatória. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] FIC-09 — Selecionar última CIverde aplicável à entrega. Run38649548723 é referência histórica auditada, com deploys ignorados; não é CI deentregafinal.
- [ ] FIC-10 — Link do painel /status/ — obrigatório.
- [ ] FIC-11 — Vídeo pitch no AVA ou link — obrigatório.
- [ ] FIC-12 — Relatório técnico PDF acessível — obrigatório. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] FIC-13 — URLHML opcional na ficha e ambiente obrigatório: confirmar deployformal/SHA e regressão; HTTP200dopreview não basta.
- [ ] FIC-14 — CONDICIONAL concurso: link Drive — opcional na ficha, preencher se inscritos.
- [ ] FIC-15 — INT-01 entregue/evidenciado e autoavaliação 0–10 verdadeira. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] FIC-16 — INT-02 entregue/evidenciado e autoavaliação 0–10 verdadeira. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] FIC-17 — INT-03 entregue/evidenciado e autoavaliação 0–10 verdadeira. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] FIC-18 — INT-04 entregue/evidenciado e autoavaliação 0–10 verdadeira. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] FIC-19 — INT-05 entregue/evidenciado e autoavaliação 0–10 verdadeira. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] FIC-20 — INT-06 entregue/evidenciado e autoavaliação 0–10 verdadeira. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] FIC-21 — INT-07 entregue/evidenciado e autoavaliação 0–10 verdadeira. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] FIC-22 — INT-08 entregue/evidenciado e autoavaliação 0–10 verdadeira. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] FIC-23 — INT-09 entregue/evidenciado e autoavaliação 0–10 verdadeira. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [ ] FIC-24 — INT-10 entregue/evidenciado e autoavaliação 0–10 verdadeira. Reconferência de 14/10/2026: marca anterior reaberta; requer evidência correspondente, conforme [registros corrigidos](../evidencias/reconferencia-registros.md).
- [x] FIC-25 — Estimativa B de inovação/originalidade 0–10. Rascunho no HTML original via Live Server em 12/10: valor 10 solicitado; é estimativa, não nota oficial. Reconferir na ficha final.
- [x] FIC-26 — Estimativa B de viabilidade técnica/execução 0–10. Rascunho em 12/10: valor 10 solicitado, sem declarar execução completa. Reconferir na ficha final.
- [x] FIC-27 — Estimativa B de jogabilidade 0–10. Rascunho em 12/10: valor 10 solicitado, sem substituir playtest humano. Reconferir na ficha final.
- [x] FIC-28 — Estimativa B de apresentação 0–10. Rascunho em 12/10: valor 10 solicitado, sem declarar banca realizada. Reconferir na ficha final.
- [ ] FIC-29 — Inserir e conferir todos os dados/links no HTML original; o script só exige comprimento mínimo para links de evidência, não valida disponibilidade.
- [ ] FIC-30 — Declaração 1 verdadeira: quatro registrados em SQUAD.md, sem alterações desde 02/10. Não preencher retroativamente uma história inexistente.
- [ ] FIC-31 — Declaração 2 verdadeira: todos os ativos de terceiros e usos IA registrados em THIRD_PARTY/AI-USAGE.
- [ ] FIC-32 — Declaração 3 verdadeira: nenhuma credencial real e produção só alterada pela pipeline.
- [ ] FIC-33 — Declaração 4 verdadeira: scripts/triagem.sh executado na v1.0.0 com TRIAGEM APROVADA.
- [ ] FIC-34 — Conferir sete validadores do JS: squad/repo; quatro nomes/RAs; papéis distintos; links obrigatórios; dez INT marcados; autoavaliações completas; declarações aceitas.
- [ ] FIC-35 — Conferir A/B e estimativa automática; script assume F=1,0 e não comprova fator individual nem nota oficial.
- [ ] FIC-36 — Gerar DevOps_Avaliacao_Arcade_<Squad>.txt pelo botão do HTML.
- [ ] FIC-37 — Abrir TXT e conferir data real de geração, squad/repo/integrantes/links/INT/notas/declarações, sem dado inventado.
- [ ] FIC-38 — Anexar TXT ao AVA com pacote e relatório, confirmar envio/acesso.
- [ ] FIC-39 — CONDICIONAL: botão enviar por e-mail é opção de exportação, não requisito de envio adicional; usar apenas com autorização explícita. O corpo pode ser truncado, TXT é a ficha completa.

## Concurso opcional — exigências presentes no HTML, sem execução autorizada

Não integra a nota da UC. Estes itens continuam listados para cobertura integral; não se tornam pendências acadêmicas obrigatórias sem decisão de inscrição.

- [ ] CON-01 — Decisão explícita e conjunta de inscrição. Condição ainda não comprovada; concurso opcional e sem autorização coletiva registrada. Ver [decisão pendente](../concurso-decisao.md).
- [ ] CON-02 — Exatamente quatro integrantes elegíveis; todos maiores de dezoito anos na inscrição. Condição ainda não comprovada; concurso opcional e sem autorização coletiva registrada. Ver [decisão pendente](../concurso-decisao.md).
- [ ] CON-03 — CPF válido e residência no Brasil, conferidos privadamente; não inserir CPF no Git/artefatos públicos. Condição ainda não comprovada; concurso opcional e sem autorização coletiva registrada. Ver [decisão pendente](../concurso-decisao.md).
- [ ] CON-04 — Inscrição individual pelo formulário oficial da landing page, janela 21/09–21/10/2026. Condição ainda não comprovada; concurso opcional e sem autorização coletiva registrada. Ver [decisão pendente](../concurso-decisao.md).
- [ ] CON-05 — Reler regulamento vigente antes da inscrição: organizadora pode alterá-lo (item 17.2). Condição ainda não comprovada; concurso opcional e sem autorização coletiva registrada. Ver [decisão pendente](../concurso-decisao.md).
- [ ] CON-06 — Ler cláusulas de propriedade intelectual/uso de imagem, itens 12 e 13, e aceitar somente com orientação humana específica. Condição ainda não comprovada; concurso opcional e sem autorização coletiva registrada. Ver [decisão pendente](../concurso-decisao.md).
- [ ] CON-07 — Vídeo no Instagram em colaboração com @framework.digital e perfil oficial do Programadores do Amanhã, conforme regulamento vigente. Condição ainda não comprovada; concurso opcional e sem autorização coletiva registrada. Ver [decisão pendente](../concurso-decisao.md).
- [ ] CON-08 — Drive do responsável com todos os materiais, acesso total ao e-mail correto da organização e verificação com outra conta. Condição ainda não comprovada; concurso opcional e sem autorização coletiva registrada. Ver [decisão pendente](../concurso-decisao.md).
- [ ] CON-09 — Submissão completa até 21/10/2026, 23h59 Brasília; sem prazo extra de produção previsto no regulamento. Condição ainda não comprovada; concurso opcional e sem autorização coletiva registrada. Ver [decisão pendente](../concurso-decisao.md).
- [ ] CON-10 — Manter link no ar na triagem de novembro. Condição ainda não comprovada; concurso opcional e sem autorização coletiva registrada. Ver [decisão pendente](../concurso-decisao.md).
- [ ] CON-11 — Conferir que inscrição/termos/imagem/voz não foram aceitos automaticamente em nome de alguém. Condição ainda não comprovada; concurso opcional e sem autorização coletiva registrada. Ver [decisão pendente](../concurso-decisao.md).

O critério de engajamento social do item 9.3 pertence ao concurso, não à banca da UC. A Faculdade SENAI não organiza nem tem vínculo com o concurso.

## Checkpoints G0–G8 e roteiros por área

Este checklist não substitui entradas → ações → saídas → aceites dos roteiros. Pode haver preparação independente sem aceite final; marcar apenas após validação das condições de liberação.

- [ ] G0 — Preparação: equipe registrada, acessos funcionando, estratégia Git e proteção preparadas. **Primeiro aceite incompleto.**
- [ ] G1 — Definição: mecânica/aprendizagem/fluxo/stack definidos e backlog compreendido pelos quatro.
- [ ] G2 — Base: clone limpo gera jogo/PDF; checks bloqueiam erros e segredos; ciclo jogável e ativos integrados.
- [x] G3 — Homologação: /hml/ formal funciona, regressão completa passa e pacote offline é jogável. Conciliação15/10: Homologação formal da candidata88d533e: HML4/4,216,414s, ZIP original offline e recibo de aceite. Conferência final da tag permanece obrigatória.
- [x] G4 — Produção controlada: mesma build, aprovação registrada, monitoramento ativo e versão verificável. Conciliação15/10: Produção controlada da candidata88d533e: mesmo ZIP, aprovação registrada, smoke, monitor pós-produção e versão verificável; recuperação é G5.
- [ ] G5 — Recuperação/dados: rollback comprovado, Issues tratadas, DORA real, bug/regressão e playtest documentados.
- [ ] G6 — Comunicação: vídeo válido/legendado, documentos completos, componentes prontos para tag final.
- [ ] G7 — Fechamento: release final executada, hashes conferidos, triagem aprovada na tag.
- [ ] G8 — Entrega/banca: pacote/relatório/TXT enviados, acesso confirmado e demonstração ensaiada.

| Roteiro preservado | Checks associados / estado do aceite |
|---|---|
| C01/C02 | SQ, I01, CR; dados/revisões reais pendentes |
| P01–P07 | OBJ, I02/GDD, B, I10; produto implementado, aceites coletivos e comunicação pendentes |
| D01–D07 | I04, I06, I07; núcleo/testes implementados, HML/PRD formal e estabilidade final pendentes |
| R01–R07 | I01, I03, I06, I07, I09; preview validado, esteira formal/release/recuperação pendentes |
| S01–S06 | I05, I08, I09, DIR, EL; scanners existentes, revisão/monitoramento/DORA/triagem final pendentes |

Os quatro roteiros e o índice continuam em `C:/dev/studies/senai/semester-2/devops/desafio-arcade/docs/superpowers/plans/execucao-por-areas`. Não alterar códigos nem pular dependências.

## Conferência de cobertura do HTML

| Origem | Onde foi desdobrada |
|---|---|
| 01 — Situação-problema, materiais, triagem, opcionalidade | OBJ, ARQ, CON |
| 02 — Tabela regulamento → requisitos | OBJ, SQ, I01–I10, DIR, CON |
| 03 — Formação/papéis/contribuição/elegibilidade | SQ, CON |
| 04 — Arquitetura, mesmo artefato, custo/stack | ARQ, I03/I06/I07, KIT |
| 05 — Tabela/pesos e dez abas, mínimos/aceites/eliminatórios | I01–I10, EL, rubrica |
| 06 — Estrutura e todos os esqueletos/TODO | KIT, I03/I07/I08/I09/I05; condicionais identificadas |
| 07 — Datas, prévia, sprint, entrega, concurso e freeze | CR, CON |
| 08 — A/B/F, três faixas, doze critérios e eliminatórios | Rubrica completa, B, SQ, EL |
| 09 — IA/licenças/LGPD/imagem/direitos | DIR, I05, CON |
| 10 — Campos/validadores/declarações/exportação JS | FIC |
| Fontes/documentação | F1, OBJ-08, CON-05; links são referências de estudo, não novos integráveis |
| Modelo GDD e requisitos específicos do projeto | GDD, OBJ; complemento explicitamente separado do HTML |

Não adicionar metas de atividades antigas (Jenkins, Spring Boot, AWS, Docker/Kubernetes, Prometheus/Grafana) nem mínimo fictício de dez execuções DORA. O HTML permite ferramentas equivalentes justificadas; não exigir instalar uma engine para jogar. Nota máxima e aprendizagem humana não são inferidas de testes automatizados.

Evidência009/I02-15 — 13/10/2026: [Stitch e UX](../evidencias/stitch-ux.md), seis telas reais exportadas desktop/celular e manifesto SHA-256; referencias de IA distintas de capturas. G1/revisão humana permanecem abertos.

Revalidação010 — 13/10/2026: [offline/integridade](../evidencias/offline-integridade.md), clonec56df79 limpo com184testes/18E2E, ZIP28.581bytes/checksum/7arquivos, campanha e HTMLbaixado semrede, PDF18p e reprodutibilidade. I06-01–06/13/14/16 mantidos; G2 continua aberto pela sequência/aceites humanos, sem aceitar INT-06final.

Preparação011–012 — 13/10/2026, DaviSouza78: [publicadorHML](../evidencias/deploy-hml.md) preserva produção/releases/status e consome pacote validado; [sondas](../evidencias/sondas.md) distinguem HTTP/rede/timeout/versão e guardamCSV/JSON. Testes locais e consultas ao preview são provas técnicas; não houve HML/PRDformal/aceiteG3/G4/monitoragendado. Checks formais continuam abertos; publicação/CI doHEAD serão conferidas no controle e no registro único.

Revalidação013/014 — 13/10/2026: [conteúdo/aprendizagem](../evidencias/aprendizagem-conteudo.md) e [smokePRD](../evidencias/smoke-prd.md). Soluções alternativas e seis entradas de transferência coerentes entre fonte/AST/HTML/Python;194testes e cobertura core97,90%. Build com resultado inválido bloqueou e fonte foi restaurada byte a byte. Smoke local com falhas deSHA/carregador/recurso/runtime/console/controle e recusa deHML; runner público retornouexit1 emCSS404 sintético. I04-14/KIT-29 continuam condicionais não aplicáveis (Opal/AIStudio ausentes), B-01/B-02 aguardam avaliação humana021/banca, I04-10 permanece aberto até pós-deploy019. Nenhum novo check/gate fechado por essas preparações.

Revalidação015/016 — 14/10/2026: tag/SemVer/proveniência/mesmoartefato/notas e imutabilidade de anexos testados localmente; alertas200/500/timeout/2,0/2,01/duplicação/recuperação/alvos independentes testados com mocks. I08-09/I08-15 fechados porAPI e confirmação humana identificadas acima. I01-10/I05-09/I06-07–12/I07-06/I08-10–14/KIT-26/gates continuam abertos até execução/aprovação real, não por existência de código.

Preparação017/018 — 14/10/2026: [roteiro/legendas e concordâncias](../evidencias/video-direitos.md) e [rollout](../evidencias/rollout.md). I10-01/02/05 fechados por roteiro/inventário planejado sem trilha; I10-07/DIR-13 pela confirmação explícita de Davi sobre os quatro e registro privado, seminspeção desse documento pela IA. Reconferência de escopo/direitos do MP4 final obrigatória. I07-08/09/15/KIT-18/19 permanecem abertos até revisão de Plataforma/execução formal, embora contratos218testes e33E2E locais estejam verdes. Não houve G4/G6, produção ou recuperação operacional.

Preparação019/020 — 14/10/2026, DaviSouza78: promoção por mesmo artefato/recibo HML/aprovação/azul-verde/recuperação e monitor pós-produção implementados; painel estático/contrato DORA funcionais localmente,235 testes/36E2E, core97,90%, lint/build/actionlint sem ShellCheck. /status/ e observabilidade públicos404, sem aprovação ou produção formal. [Produção](../evidencias/producao.md), [painel](../evidencias/painel-status.md) e [passagem](../execucao/10-passagem-davi-miguel.md). Nenhum check operacional019/020/G4 foi fechado por preparação, configuração ou fixture; conferir registro único antes de marcar. DORA024, recuperação observada022/026 e aceites humanos permanecem atribuídos.


Registro histórico anterior à produção formal, superado pela reconferência seguinte. Reconferência operacional15/10/2026: fechados somente itens específicos com prova em [operação](../evidencias/operacao-2026-10-15.md). HML4/4 pública, ZIPoriginal offline1/1 e sete hashesHTTP confirmados; monitor3runs/6amostras. Produção formal, abertura/fechamento de alertas, recuperação medida<5min, painel, DORA com eventos, pitch e pacote final continuam abertos. O PR33 não tem revisão externa registrada nesta consulta.


Reconferência após produção —15/10/2026: run38829484114/1 integralmente verde, HML216,414s, PRDazul-verde aprovada e smoke/14hashesHTTP, ZIPoriginal88offline1/1, monitorpósPRD38830013027 e painel reais. MTTR, alertas tratados, recuperação<5min, melhoria medida, tag/release/submissão e ações humanas seguem pendentes. Provas emoperacao-2026-10-15; não confundir essa implantação com entrega acadêmica final.

Conciliação das pendências15/10: atualizados itens específicos com prova operacional e revisão/integração. Consulte [estado vigente dos40passos](../execucao/05-pendencias-por-passo.md) e [lacunas do HTML porINT](../evidencias/conciliacao-pendencias-2026-10-15.md). Condicionais não adotados não são trabalho obrigatório faltante; direitos, release final, recuperação/alertas e ações humanas mantêm seus critérios próprios.

16/10: ensaio de alertas real passou com Issues38/39 e dados separados; recuperaçãoPages não executada e playtest humano/pitch/tag/triagem/TXT não inventados. Não fechar I08-10–14/26/31 como incidente de produção pela demonstração em alvo temporário,labelensaio.

Reconferência16/10 após PR34: aprovação externa5543092743 e mergeacb03d8 confirmados. Manual38851754358:80,66 s/171HTTP200; automático38851915984:17,166 s/65HTTP200, recuperaçãoPages/hashes/smoke. Falha injetada somente no observador, não numa build defeituosa; I07-16/20/21 e banca mantêm seus critérios literais. Tagv0.7.0 existe; tentativa1 bloqueada na sonda anterior; tentativa2 passouCI/HML/PRD/monitor e falhou no publicador de draft. Cinco anexos+manifesto iguais à CI e offline1/1, mas Release ainda não publicada. Correção/retomada protegida aguardam revisão/merge/execução. [Registro](../evidencias/operacao-release-2026-10-16.md).

Reconferência independente16/10:PR40 aprovado porLucas5543614682/HEADa190215, merge1e3dd3b. Main38939899867:HML178,827s/318testes/36E2E, PRDskipped para preservar a origem. Retomada38940532129 SUCCESS publicouReleasev0.7.0 sem rebuild; cinco anexos+manifesto iguais à origem e seis downloads públicos conferidos. Contribuição em trêsINT por pessoa e20PRs revisados comprovados, sem atribuir F/banca. Fonte:../evidencias/fechamento-independente-2026-10-16.md.


Reconciliação dos tópicos1–4 em16/10: os registros históricos acima não reabrem execuções posteriores. Fechamos os checks funcionaisI08-10–14/KIT-26 pelo ensaioHTTPreal, com escopo expresso; o critério literal de label e métricas operacionais permanece separado emI08-26/31. I08-28 registra decisão atual, não uma melhoria causal já medida. O HTML situa a sessão de colega de outra turma na banca; três avaliações de agentes deIA não encerramB-06–09. Provas e resultado dos agentes em docs/evidencias/avaliacoes-ia-2026-10-16.md.


Fechamento operacional16/10: o ensaio38950333359 comprova labelalerta+ensaio automático e tempo2s/4s,média3s. I08-26/31 fechados no escopo de demonstração controlada; quatroDORAoperacionais continuam comMTTRsemamostra. I08-29/32 não recebem aceite de melhoria causal fictícia. A média do ensaio anterior era2s; a nova3s não será chamada de ganho de velocidade.
