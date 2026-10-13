# Checklist completo — Desafio Arcade

Referência: `Avaliação.html` do professor, incluindo as dez seções, todas as abas dos integráveis, kit, cronograma, rubrica e campos/validações gerados por JavaScript. Atualização inicial: **12/10/2026**. Este é o checklist principal de acompanhamento; a [auditoria](auditoria-avaliacao.md) explica o diagnóstico. Nenhum INT está integralmente encerrado.

Execução distribuída em [40 passos — dez por integrante](../execucao/00-indice-geral.md), com [mapa dos 313 checks inicialmente abertos](../execucao/02-mapa-checks.md). O mapa conserva o snapshot de planejamento; o estado atualizado permanece neste checklist. Quatro estimativas B foram preenchidas nesta etapa, sem fechar qualquer entrega/INT.

## Como manter os checks

- `[x]`: o item específico foi concluído e possui a evidência indicada. Não significa que todo o INT ou checkpoint foi aceito.
- `[ ]`: pendente, parcialmente implementado, não executado ou dependente de pessoa/acesso. A observação informa a diferença.
- **CONDICIONAL**: só passa a ser obrigação quando ocorrer a condição descrita. Não marcar como concluído para esconder que não se aplica; registrar a decisão e sua evidência.
- **AVANÇADO**: exigência da coluna de 9 a 10 da rubrica, além dos requisitos mínimos.
- **CONTÍNUO/FINAL**: precisa ser reconferido na candidata/tag final. Um check histórico não garante a integridade de mudanças futuras.

Ao completar um item, trocar somente seu `[ ]` por `[x]` e acrescentar data, SHA/tag, execução/URL, arquivos e resultado. Ao mudar código, configuração, conteúdo ou versão, reabrir os checks afetados até validar novamente. Mudanças neste documento passam por PR, revisão de outro autor e CI. Não fabricar revisões, dados de integrantes, consentimentos, medições, capturas ou declarações.

Os identificadores abaixo são estáveis. Não renumerar ao concluir. Não inferir nota pela quantidade de checks: **nota = (0,7 × A + 0,3 × B) × F**, atribuída pelo professor.

## Fontes e evidências desta marcação inicial

| ID | Evidência / alcance |
|---|---|
| F1 | Original preservado em `C:/Users/user/Downloads/jogo/Avaliação.html`; cópia idêntica em Downloads. SHA-256 `19362485b3ec9534bdf31303ca0b92b6fe96de21bb87867977d37a7393565275`. Texto e script completos relidos; esta versão do checklist refere-se a esse conteúdo. |
| E1 | [Repositório público](https://github.com/luccalck/desafio-arcade), [PR #2](https://github.com/luccalck/desafio-arcade/pull/2). Conferência de main: check `ci`, uma aprovação, enforce_admins; zero revisões aprovadas. Quatro integrantes ainda não registrados. |
| E2 | [CI push 38327538767](https://github.com/luccalck/desafio-arcade/actions/runs/38327538767), SHA `76549dcb13ee91210746c0c2fff265c8f972817e`, success; [CI PR 38327545458](https://github.com/luccalck/desafio-arcade/actions/runs/38327545458), success. Workflow [esteira.yml](../../.github/workflows/esteira.yml). |
| E3 | [Testes e limites](../evidencias/python-pages.md), [publicação e artefatos](../evidencias/ci-python-pages.md). Resultados de comportamento da mesma implementação: 152 unidades, 26 integrações, 15 E2E, core 97,90%; bugs reais e validação offline. Atualizações seguintes foram documentais; E2 confirma checks da candidata. |
| E4 | [GDD](../gdd.md), imagens em docs/images e geração por [gdd-pdf.mjs](../../scripts/gdd-pdf.mjs). PDF gerado pela CI e pdfinfo; versão 0.6.0, identificação/release final pendentes. |
| E5 | [Preview público](https://luccalck.github.io/desafio-arcade/) e [HML do preview](https://luccalck.github.io/desafio-arcade/hml/). E2 publicou e executou smoke. HML/version.json respondeu HTTP 200 com SHA de E2. Não é produção formal aprovada. |
| E6 | [LICENSE](../../LICENSE), [THIRD_PARTY](../../THIRD_PARTY.md), [AI-USAGE](../../AI-USAGE.md), [SECURITY](../../SECURITY.md), hook e scanner; artefatos de segurança em E2. Revisão humana/declaração coletiva pendentes. |
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
- [ ] OBJ-07 — Se adotar ferramenta equivalente à referência, justificar a troca e sua compatibilidade no relatório técnico. Stack própria já descrita no GDD; relatório final ausente.
- [x] OBJ-08 — Ler o regulamento completo citado na seção02. PDF oficial consultado em12/10/2026, dez páginas/capa edição2026, hash e comparação de fontes em [equipe.md](../evidencias/equipe.md). Não substitui a leitura/ciência humana dos quatro ou aceite do concurso.
- [ ] OBJ-09 — Submeter os três materiais obrigatórios válidos: GDD, build jogável e vídeo, por pacote automatizado.
- [ ] OBJ-10 — Conferir que arquivos abrem e links funcionam: triagem sem tolerância para material corrompido/indisponível.
- [ ] OBJ-11 — Demonstrar entregas frequentes durante o período, com dados reais de deploy; não criar uma quantidade mínima de execuções inexistente no HTML.
- [x] OBJ-12 — Separar avaliação da UC de inscrição/engajamento/premiação do concurso: não influenciam a nota. Decisão de escopo documentada na auditoria.

## 02 e 03 — Squad, papéis e autoria real

- [x] SQ-01 — Nome real do squad: Aura67, informado por Lucca em12/10/2026; [SQUAD.md](../../SQUAD.md).
- [ ] SQ-02 — Registrar exatamente quatro integrantes em SQUAD.md: nome completo, RA e papel de cada um.
- [x] SQ-03 — Quatro papéis oficiais distintos atribuídos em SQUAD.md, com concordância da equipe informada por Lucca em12/10/2026. Coordenação sem exclusividade: todos atuam nas áreas; [equipe.md](../evidencias/equipe.md).
- [ ] SQ-04 — Conferir formação/registro previstos em 02/10 e estabilidade dos integrantes após o registro; não inventar registro passado.
- [ ] SQ-05 — Garantir trabalho real dos quatro: papéis têm responsáveis, mas não exclusividade; todos programam, revisam e aparecem no Git.
- [ ] SQ-06 — Produto assume GDD, backlog, jogabilidade, testes com usuários e roteiro do vídeo.
- [ ] SQ-07 — Desenvolvimento assume arquitetura do jogo e pirâmide de testes.
- [ ] SQ-08 — Plataforma assume workflows, releases, ambientes, entrega e rollback.
- [ ] SQ-09 — SRE assume observabilidade, alertas, DORA, segurança, licenças e triagem.
- [ ] SQ-10 — Registrar commits e PRs aprovados em pelo menos três INT diferentes para o integrante 1.
- [ ] SQ-11 — Registrar commits e PRs aprovados em pelo menos três INT diferentes para o integrante 2.
- [ ] SQ-12 — Registrar commits e PRs aprovados em pelo menos três INT diferentes para o integrante 3.
- [ ] SQ-13 — Registrar commits e PRs aprovados em pelo menos três INT diferentes para o integrante 4.
- [ ] SQ-14 — Participação do integrante 1 na banca, com domínio de sua contribuição.
- [ ] SQ-15 — Participação do integrante 2 na banca, com domínio de sua contribuição.
- [ ] SQ-16 — Participação do integrante 3 na banca, com domínio de sua contribuição.
- [ ] SQ-17 — Participação do integrante 4 na banca, com domínio de sua contribuição.
- [ ] SQ-18 — Conferir o fator F individual pelo histórico: 1,0 para ≥3 INT + banca; 0,8 para dois; 0,5 para um ou nenhum. Preparar respostas se o professor ouvir o squad.
- [ ] SQ-19 — CONDICIONAL: equipe de três ou cinco somente com autorização do professor para a UC; não elegível ao concurso.
- [ ] SQ-20 — CONDICIONAL concurso: conferir exigência de exatamente quatro integrantes e efeito de desistência/cancelamento; não tratar identidade simulada como integrante.

Não há mínimo textual de “três commits na mesma área”. A unidade da exigência é **três integráveis diferentes**, com commits e PRs aprovados. Uma organização possível é um PR substantivo por INT/pessoa, sem dividir artificialmente trabalho ou atribuir commits de terceiros.

## 04 — Arquitetura integrada de referência

- [x] ARQ-01 — Stack que gera site estático escolhida e documentada; HTML/CSS/SVG/TypeScript/esbuild. E4/E7.
- [x] ARQ-02 — Repositório público compatível com Pages gratuito. E1/E5.
- [ ] ARQ-03 — Caminho demonstrável: branch curta → PR → revisão → CI → main → artefato imutável → HML/E2E → aprovação producao → release/rollout → smoke → promoção/rollback → monitoramento/feedback → triagem.
- [x] ARQ-04 — Jobs existentes usam runners GitHub `ubuntu-latest`. E2.
- [x] ARQ-05 — Build é construído uma vez e o preview baixa o mesmo ZIP/checksum da CI. E2/E7.
- [ ] ARQ-06 — Promover esse mesmo artefato da HML aprovada para produção, sem recompilar.
- [ ] ARQ-07 — Ambiente homologacao integrado ao deploy formal /hml/.
- [ ] ARQ-08 — Environment producao integrado ao deploy formal, com reviewer obrigatório e aprovação registrada. Configuração existe, deploy ainda não a usa.
- [ ] ARQ-09 — Alertas/métricas retornam ao backlog e orientam mudança real pela esteira.
- [ ] ARQ-10 — CONDICIONAL Godot: se substituir a stack por export Web, usar configuração sem threads compatível com Pages. Não se aplica à stack atual.

## 05 — INT-01: Repositório e fluxo Git · peso 10% de A

- [x] I01-01 — Repositório único e público, com uma fonte principal de código. E1.
- [ ] I01-02 — Quatro integrantes reais adicionados como colaboradores, com acesso testado. Em13/10, três convites write enviados; aceites/testes pelas próprias contas pendentes. [Evidência003](../evidencias/configuracao-github.md).
- [x] I01-03 — Leitura pública pelo professor confirmada por Lucca em13/10/2026; consulta sem autenticação HTTP200/privatefalse. [Configuração003](../evidencias/configuracao-github.md). Não alegamos acesso pessoal executado pelo professor.
- [x] I01-04 — main protegida, exigindo PR, uma aprovação e check ci verde; vale também para administradores. E1.
- [ ] I01-05 — Revisão efetiva por pessoa diferente do autor antes de cada merge; não apenas configuração. PR #2 ainda sem revisão.
- [x] I01-06 — Estratégia GitHub Flow e branching documentadas no README. E1/README.
- [ ] I01-07 — CONTÍNUO: branches curtas e merges somente após PR revisado/CI verde. Branch atual é longa e aguarda revisão.
- [x] I01-08 — Commits atuais seguem Conventional Commits. Histórico em E1.
- [ ] I01-09 — CONTÍNUO/FINAL: conferir Conventional Commits no histórico completo da release final.
- [ ] I01-10 — Tag SemVer anotada v0.1.0 da prévia: comprovar a situação real, sem criar data/evidência retroativa.
- [ ] I01-11 — Tag SemVer anotada v1.0.0 da entrega, criada sobre versão aprovada.
- [ ] I01-12 — SQUAD.md completo, coerente com colaboradores e autoria. Arquivo existe, dados ausentes.
- [x] I01-13 — .gitignore exclui builds e segredos; código/lockfile versionados. E1/E6.
- [ ] I01-14 — Pelo menos dez PRs reais revisados por pessoa diferente do autor; guardar links e revisores.
- [ ] I01-15 — Conferir commits de cada pessoa em três ou mais INT e seus PRs aprovados (SQ-10 a SQ-13).
- [ ] I01-16 — `git log --oneline v0.1.0..v1.0.0` conta uma história legível, com tags existentes e autoria real.
- [ ] I01-17 — AVANÇADO: histórico exemplar e contribuição equilibrada dos quatro, além de Conventional Commits.
- [ ] I01-18 — Restaurar main como branch padrão após merge revisado; até lá apontar PRs explicitamente para main. Preparação interna para a mudança temporária de visualização.

## INT-02: GDD como código · peso 8% de A

- [x] I02-01 — Premissa define problema de acesso à educação em tecnologia e público-alvo. E4.
- [x] I02-02 — Gênero e plataforma WEB desktop/mobile definidos. E4.
- [x] I02-03 — Loop principal, ações, vitória e derrota definidos. E4.
- [x] I02-04 — Progressão e aprendizagem por fase descritas. E4.
- [x] I02-05 — Referências com autoria/origem e direitos pertinentes registradas. E4/E6; revisão humana final em I05-15.
- [x] I02-06 — Wireframes ou telas de menu, HUD e fim existentes. E4: desenhos próprios.
- [x] I02-07 — Seção Esteira com diagrama e link real do repositório. E4.
- [x] I02-08 — docs/gdd.md versionado e atualizado na branch candidata. E4.
- [ ] I02-09 — GDD efetivamente revisado e aprovado por PR por outro integrante.
- [x] I02-10 — Estágio da pipeline converte Markdown em GDD.pdf com ferramenta equivalente documentada. E2/E4.
- [x] I02-11 — PDF arquivado como artefato do build. E2.
- [x] I02-12 — PDF abre sem erro: pdfinfo passou e páginas foram inspecionadas. E3/E4.
- [ ] I02-13 — Versão e data do GDD coerentes com a tag de release final. Não existe tag final.
- [ ] I02-14 — AVANÇADO: GDD vivo, atualizado por PR revisado a cada mudança de mecânica.
- [ ] I02-15 — AVANÇADO: telas do Stitch comprovadas. Desenhos próprios cumprem a alternativa mínima; não declarar que foram feitos no Stitch. Se propor equivalência, validar com professor.

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
- [ ] GDD-13 — Identificação completa: squad, nomes, RAs e papéis reais.
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
- [ ] I03-09 — Clone limpo reproduz esteira formal completa, sem passos ocultos/configuração local indispensável. CI atual clona e testa; deploy formal ausente.
- [x] I03-10 — Status check ci obrigatório na main. E1.
- [x] I03-11 — Credenciais usadas pelo workflow via secrets/token do GitHub; configuração não sensível via variables. E2/E6.
- [x] I03-12 — Permissões mínimas declaradas nos jobs atuais. E2.
- [ ] I03-13 — CONTÍNUO: revisar permissões/secrets/variables após adicionar deploys, sondas e triagem.
- [x] I03-14 — Relatórios, PDF, ZIP/checksum e SBOM publicados como artefatos da CI, inclusive diagnósticos de falha previstos. E2.
- [ ] I03-15 — Job deploy-hml formal depende de ci e publica o artefato aprovado em /hml/.
- [ ] I03-16 — Regressão E2E contra a URL real da HML a cada deploy, com roteiro completo de INT-04.
- [ ] I03-17 — Job deploy-prd depende do sucesso da HML e usa environment producao com reviewer obrigatório.
- [ ] I03-18 — Produção integra publicação de release, estratégia progressiva, smoke e rollback.
- [ ] I03-19 — Executar aprovação real no environment e preservar seu registro.
- [ ] I03-20 — Esteira formal automática, sem passo manual além da aprovação de produção; não confundir workflow_dispatch de rollback com produção manual.
- [ ] I03-21 — Medir tempo real de push até HML formal ≤15 minutos; registrar horários/execução.
- [x] I03-22 — AVANÇADO: estágios independentes paralelos na CI. E2: qualidade/segurança/build/E2E.
- [x] I03-23 — AVANÇADO: cache de dependências configurado e utilizado pela CI. E2/setup-node.
- [ ] I03-24 — AVANÇADO: notificações da esteira implementadas e recebimento comprovado.
- [ ] I03-25 — AVANÇADO: prazo ≤15 minutos comprovado na esteira formal (mesmo item I03-21, não satisfeito pelo preview).

## INT-04: Testes automatizados · peso 12% de A

- [x] I04-01 — Regras puras separadas da renderização em src/core. E3.
- [x] I04-02 — Pelo menos quinze testes de unidade. E3: 152.
- [x] I04-03 — Cobertura ≥70% de src/core. E3: instruções 97,90%.
- [x] I04-04 — Pelo menos três testes de integração. E3: 26.
- [x] I04-05 — Carregamento e validação de schema do conteúdo JSON testados. E3.
- [x] I04-06 — JSON inválido quebra a build. E3/E7.
- [x] I04-07 — Pelo menos dois cenários E2E de navegador. E3: quinze cenários.
- [ ] I04-08 — Regressão publicada abre a HML, inicia partida, completa primeira fase e verifica tela de fim; implementar/conferir o roteiro inteiro.
- [ ] I04-09 — Essa regressão roda contra HML a cada deploy formal.
- [ ] I04-10 — Smoke reduzido roda contra URL pública depois do deploy formal de produção.
- [x] I04-11 — Teste falhando impede o check ci e bloqueia merge na main. E1/E2.
- [x] I04-12 — Bug real encontrado por teste, corrigido com regressão correspondente. E3: foco/regra antiga/exportação Python, registros em docs/evidencias.
- [ ] I04-13 — Citar bug, falha anterior, correção e teste no relatório técnico final, com links reais.
- [ ] I04-14 — CONDICIONAL Opal/AI Studio: se usados para conteúdo, eval/golden.jsonl valida formato antes de entrar no jogo. Não usados atualmente; não criar evidência fictícia de golden eval.
- [x] I04-15 — AVANÇADO: cobertura acima da meta. E3.
- [x] I04-16 — AVANÇADO: bug real capturado por teste de regressão. E3; falta sua apresentação no relatório (I04-13).
- [ ] I04-17 — CONTÍNUO/FINAL: manter pirâmide e gates verdes na candidata/tag de entrega, sem bugs bloqueantes escondidos.

## INT-05: Segurança, licenças e IA · peso 10% de A

- [x] I05-01 — Gitleaks na pipeline com falha bloqueante ao detectar segredo. E2/E6.
- [x] I05-02 — Histórico Git incluído na varredura. E2: checkout fetch-depth 0.
- [x] I05-03 — Relatório Gitleaks disponível como artefato. E2.
- [x] I05-04 — npm audit das dependências de produção bloqueia vulnerabilidade crítica. E2/E6.
- [x] I05-05 — Relatório npm audit arquivado. E2.
- [x] I05-06 — Dependabot ativado/verificado em13/10/2026: alerts habilitados, APIHTTP200/0alerts, securityupdatesenabled e YAMLnpm/Actions na branchpadrão. [Segurança004](../evidencias/seguranca-inicial.md). Não alegamos PR ou job de atualização executado.
- [x] I05-07 — SBOM CycloneDX/SPDX gerado com npm sbom. E2.
- [x] I05-08 — SBOM disponível como artefato de build. E2.
- [ ] I05-09 — SBOM anexado a cada GitHub Release. Nenhuma release existe.
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
- [ ] I05-22 — CONTÍNUO/FINAL: zero ativo protegido/plagiado sem autorização, inclusive conteúdo gerado; condição eliminatória para o squad.
- [ ] I05-23 — CONTÍNUO/FINAL: zero credencial real no repositório; se houver incidente, revogar e corrigir com evidência sem expor o valor. Credencial real zera INT-05.

## INT-06: Release versionada e empacotada · peso 10% de A

- [x] I06-01 — npm ci + npm run build geram dist sem passo manual. E2/E7.
- [x] I06-02 — dist/version.json contém SemVer, SHA e data do build. E5/E7.
- [x] I06-03 — Versão aparece discretamente na tela inicial. E3/E4.
- [x] I06-04 — build.zip gerado no CI. E2/E7.
- [x] I06-05 — build.zip.sha256 gerado no CI. E2/E7.
- [x] I06-06 — ZIP e checksum publicados como artefatos da execução. E2.
- [ ] I06-07 — Cada tag vX.Y.Z dispara criação de GitHub Release.
- [ ] I06-08 — Cada release anexa build.zip.
- [ ] I06-09 — Cada release anexa checksum.
- [ ] I06-10 — Cada release anexa SBOM.
- [ ] I06-11 — Cada release anexa GDD.pdf.
- [ ] I06-12 — Cada release possui notas de versão revisadas; se geradas por IA, registrar uso/revisão.
- [x] I06-13 — ZIP descompactado permite jogar abrindo index.html, ou método offline documentado. E3/E7.
- [x] I06-14 — Dois builds do mesmo commit têm conteúdo igual, exceto data em version.json. E3/E7.
- [ ] I06-15 — Hash do ZIP promovido à produção formal bate com o da GitHub Release.
- [x] I06-16 — Build atual abaixo de 25 MB. E3: ZIP de cerca de 26 KB.
- [ ] I06-17 — CONTÍNUO/FINAL: conferir offline, tamanho, versão, SHA, data e integridade da release final.
- [ ] I06-18 — AVANÇADO: reunir reprodutibilidade comprovada, notas revisadas e SBOM/GDD anexados na mesma release.

## INT-07: Ambientes, entrega e rollback · peso 12% de A

- [ ] I07-01 — Pages configurado com gh-pages como origem, conforme HTML; atual build_type é workflow. Alinhar ou validar equivalência fundamentada antes do aceite.
- [x] I07-02 — gh-pages escrito apenas pela pipeline nas publicações atuais. E2/E7.
- [ ] I07-03 — CONTÍNUO/FINAL: nenhuma produção alterada à mão; alteração manual de gh-pages zera INT-07.
- [ ] I07-04 — /hml/ contém último build da main aprovado no CI. Atual HML é preview da feature.
- [x] I07-05 — Releases do preview em /releases/<sha>/, preservadas sem sobrescrever conteúdo. E2/E7.
- [ ] I07-06 — Releases formais de produção imutáveis, com teste/evidência dessa propriedade.
- [x] I07-07 — /index.html carrega controle de rollout e redireciona para versão. E5/E7.
- [ ] I07-08 — rollout.json formal contém estavel, anterior, canario e percentual. Preview usa activeSha/previousSha/strategy.
- [ ] I07-09 — Escolher/documentar uma estratégia formal: canário OU azul-verde.
- [ ] I07-10 — CONDICIONAL canário: distribuir aproximadamente 10% das sessões à nova versão.
- [ ] I07-11 — CONDICIONAL canário: smoke e período de observação comprovados antes de promover a 100%.
- [ ] I07-12 — CONDICIONAL azul-verde: publicar/testar versão nova em sua pasta antes da troca.
- [ ] I07-13 — CONDICIONAL azul-verde: virar estavel de uma vez, mantendo referência à anterior; percentual 0 durante preparação.
- [x] I07-14 — Preview preserva versão do jogador durante a sessão quando ainda válida. E7/testes Pages.
- [ ] I07-15 — Validar manutenção de versão na sessão sob a estratégia formal, inclusive retirada da versão defeituosa e armazenamento indisponível.
- [ ] I07-16 — Smoke de produção falhando dispara rollback automático pela pipeline.
- [ ] I07-17 — Rollback restaura estavel para anterior e retira canário defeituoso, sem recompilar.
- [ ] I07-18 — rollback.yml com workflow_dispatch para recuperação manual pela pipeline.
- [ ] I07-19 — Histórico gh-pages registra mudanças em rollout.json, quem disparou e por quê.
- [ ] I07-20 — Ensaio com versão defeituosa proposital, controlado e rastreável.
- [ ] I07-21 — Detecção da falha por alerta ou smoke, com evidência real.
- [ ] I07-22 — Cronometrar recuperação <5 minutos, incluindo propagação Pages.
- [ ] I07-23 — Demonstrar rollback sem a URL sair do ar.
- [ ] I07-24 — Executar a demonstração cronometrada pedida pelo professor na banca.
- [ ] I07-25 — AVANÇADO: comprovar rollback automático e recuperação <5 minutos na banca, sem indisponibilidade (I07-16/22/23/24).

## INT-08: Monitoramento, alertas e DORA · peso 10% de A

- [ ] I08-01 — monitor.yml versionado com schedule a cada quinze minutos.
- [ ] I08-02 — Sondar produção formal.
- [ ] I08-03 — Sondar homologação formal.
- [ ] I08-04 — Registrar código HTTP de cada alvo.
- [ ] I08-05 — Registrar tempo de resposta de cada alvo.
- [ ] I08-06 — Registrar versão servida obtida de version.json.
- [ ] I08-07 — Acumular resultados em status/sondas.csv, com data/alvo/código/tempo e versão registrada.
- [ ] I08-08 — Dados na branch observabilidade; cada sonda não dispara publicação Pages.
- [ ] I08-09 — Criar label alerta nas Issues.
- [ ] I08-10 — Abrir JogoForaDoAr quando resposta diferente de HTTP 200.
- [ ] I08-11 — Abrir LatenciaAlta quando tempo ultrapassa dois segundos.
- [ ] I08-12 — Evitar duplicação de alerta já aberto para o mesmo incidente/alvo.
- [ ] I08-13 — Fechar automaticamente JogoForaDoAr quando serviço volta ao normal.
- [ ] I08-14 — Fechar automaticamente LatenciaAlta quando latência volta ao normal.
- [ ] I08-15 — Quatro integrantes assistem o repositório e verificam recebimento das notificações por e-mail/celular conforme seus canais.
- [ ] I08-16 — Publicar painel /status/ no Pages.
- [ ] I08-17 — Painel mostra disponibilidade.
- [ ] I08-18 — Painel mostra latência.
- [ ] I08-19 — Painel mostra versão em produção.
- [ ] I08-20 — Painel mostra percentual do canário/estado aplicável da estratégia.
- [ ] I08-21 — Painel mostra métricas DORA.
- [ ] I08-22 — scripts/dora.mjs calcula métricas do período com dados verificáveis do GitHub.
- [ ] I08-23 — Frequência de deploy: execuções reais de deploy-prd.
- [ ] I08-24 — Lead time de mudança: commit até produção, com vínculo correto entre fontes e deploy.
- [ ] I08-25 — Taxa de falha de mudança: deploys seguidos de rollback.
- [ ] I08-26 — Tempo de recuperação: abertura até fechamento das Issues de alerta.
- [ ] I08-27 — Comparar lead time medido com linha de base de onze dias da Carparts.
- [ ] I08-28 — Tomar decisão de melhoria a partir dos dados reais.
- [ ] I08-29 — Medir/documentar efeito da melhoria, sem fabricar ganho ou quantidade mínima de execuções.
- [ ] I08-30 — Relatório registra possibilidade de atraso dos schedules do Actions em horários de pico.
- [ ] I08-31 — AVANÇADO: alerta realmente disparado e tratado, com histórico e recuperação.
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
- [ ] I09-08 — Implementar scripts/triagem.sh/job equivalente justificado, integrado à pipeline.
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
- [ ] I09-21 — AVANÇADO: triagem agendada até a banca.
- [ ] I09-22 — AVANÇADO: triagem agendada avisa se a URL cair até a banca, com notificação real.
- [ ] I09-23 — CONDICIONAL concurso: enviar o mesmo pacote ao Drive do responsável e conferir acesso total ao e-mail do regulamento.
- [ ] I09-24 — CONDICIONAL concurso: testar compartilhamento em janela anônima com outra conta.

## INT-10: Vídeo e relatório · peso 5% de A

- [ ] I10-01 — Roteiro do pitch explica proposta de gamificação.
- [ ] I10-02 — Roteiro explica conceito e diferencial.
- [ ] I10-03 — Gravar gameplay real da build de produção formal.
- [ ] I10-04 — Gerar pitch.mp4 com duração ≤90 segundos verificada por ffprobe.
- [ ] I10-05 — Registrar direitos de trilha e imagens em THIRD_PARTY.md, ou declarar ausência de trilha quando aplicável.
- [ ] I10-06 — Inserir legendas legíveis por acessibilidade.
- [ ] I10-07 — Obter concordância real de quem aparece/tem imagem ou voz publicada no vídeo.
- [ ] I10-08 — Preparar relatório técnico PDF com até doze páginas; não substituir pelo GDD.
- [ ] I10-09 — Relatório apresenta arquitetura da esteira e decisões.
- [ ] I10-10 — Relatório apresenta alternativas descartadas e justificativas.
- [ ] I10-11 — Relatório contém prints reais com data e links de build/evidência de cada um dos dez INT.
- [ ] I10-12 — Relatório contém quatro DORA reais e comparação com a linha de base.
- [ ] I10-13 — Retrospectiva registra o que funcionou.
- [ ] I10-14 — Retrospectiva registra o que não funcionou.
- [ ] I10-15 — Retrospectiva registra o que mudariam, sustentado por dados.
- [ ] I10-16 — Contribuição de cada integrante com links dos PRs reais.
- [ ] I10-17 — PDF técnico abre, está legível, tem ≤12 páginas e links acessíveis.
- [ ] I10-18 — Acrescentar evidências reais de release/triagem após as execuções; não declarar sucesso antecipado.
- [ ] I10-19 — AVANÇADO: narrativa clara do pitch, legendas e retrospectiva honesta com dados.

## 06 — Kit de partida: fechar as lacunas dos exemplos

Os esqueletos não passam como estão. Nomes/estrutura exemplificados não obrigam a trocar uma implementação equivalente funcional; justificar equivalências no relatório. Itens repetidos abaixo apontam aos checks principais, para não perder os TODO e instruções do kit.

- [x] KIT-01 — README explica como rodar, branching e arquitetura. README atual.
- [x] KIT-02 — Código organizado em core/renderização/conteúdo e testes unidade/integração/E2E. E3.
- [x] KIT-03 — package.json/lockfile, configuração Gitleaks e esteira versionados. E2/E6.
- [ ] KIT-04 — relatorio.md/fonte equivalente e relatório PDF final (I10-08 a I10-18).
- [ ] KIT-05 — rollback.yml funcional (I07-18).
- [ ] KIT-06 — monitor.yml funcional (I08-01).
- [ ] KIT-07 — Painel pages/status/index.html ou equivalente publicado (I08-16 a I08-21).
- [ ] KIT-08 — Publicação, rollout, DORA e triagem implementados por scripts equivalentes aos exemplos; não copiar TODO como solução.
- [ ] KIT-09 — Revisar versões atuais das Actions antes de fixá-las, compatibilidade e registro da escolha.
- [x] KIT-10 — Cache npm e checkout com histórico para scanner nos jobs atuais. E2.
- [x] KIT-11 — Corrigir lacuna SemVer no version.json do exemplo. E5/E7: version 0.6.0 presente.
- [ ] KIT-12 — Configurar Settings Pages com origem conforme requisito ou equivalência validada (I07-01).
- [ ] KIT-13 — Integrar homologacao e producao nos jobs; producao com reviewer obrigatório (ARQ-07/08).
- [x] KIT-14 — SITE_URL pública configurada em13/10/2026 com https://luccalck.github.io/desafio-arcade e destinos derivados documentados/verificados no [passo003](../evidencias/configuracao-github.md). Integração nos jobs formais/sondas/triagem permanece nos respectivos checks.
- [ ] KIT-15 — Esperar propagação do Pages com tentativa limitada antes dos E2E formais de HML.
- [x] KIT-16 — Publicação atual não cancela um deploy em andamento: grupo pages-preview cancel-in-progress false. E2.
- [ ] KIT-17 — Preservar essa proteção de concorrência no deploy/rollout formal; serializar mudanças de ponteiro.
- [ ] KIT-18 — Implementar ações canario/promover/rollback ou equivalentes da estratégia escolhida, com commit ator/motivo (I07).
- [ ] KIT-19 — Carregador formal trata versão retirada, falha de leitura e armazenamento indisponível; reconferir sob rollout real.
- [ ] KIT-20 — Completar promoção após observação e notificação de falha: TODO do workflow (I03-24/I07).
- [ ] KIT-21 — Ajustar validação SQUAD ao formato real; corrigir contagem de cabeçalho do exemplo (I09-15).
- [ ] KIT-22 — Completar validação das seções do PDF que o exemplo triagem não implementa (I09-12).
- [ ] KIT-23 — Medir duração real, sem truncar segundos para aceitar vídeo acima de 90 s (I09-13).
- [ ] KIT-24 — Prazo configurado de forma verdadeira; 19:00 é exemplo, não horário confirmado (I09-16).
- [ ] KIT-25 — Criar observabilidade/status/sondas.csv e cabeçalho data,alvo,codigo,tempo, registrando também versão (I08).
- [ ] KIT-26 — Completar TODO de fechamento automático e alerta de latência do monitor (I08-11/13/14).
- [ ] KIT-27 — Completar versão sondada, ausente no esqueleto do monitor (I08-06).
- [ ] KIT-28 — Registrar IA com todos os campos do modelo e declaração humana verdadeira; nomes/linhas de exemplo não são nossos integrantes (I05-14/15/16).
- [ ] KIT-29 — CONDICIONAL: golden.jsonl se houver conteúdo Opal/AI Studio, conforme requisito específico I04-14; não impor eval a todo código produzido com IA.

## 07 — Cronograma, prévia, fechamento e envio

Datas abaixo são as datas do enunciado original, não comprovação de que houve entrega. Preservar registros verdadeiros; não retroagir commits/tags. A inscrição opcional é independente da nota.

- [ ] CR-01 — Conferir marcos de 02/10: leitura do regulamento, formação, escolha do tema, SQUAD e repositório, primeiro PR com esqueleto.
- [ ] CR-02 — Conferir prévia formativa de 05/10: v0.1.0, INT-01/02/03/06 e tela jogável na HML pela pipeline; guardar devolutiva real se houver. A prévia não compõe a nota.
- [ ] CR-03 — Conferir atividades previstas para 06–08/10: INT-04/05/07/08 funcionando, ensaio cronometrado, gravação e triagem aprovada.
- [ ] CR-04 — Conferir marco de entrega: tag v1.0.0, pacote, relatório técnico e ficha TXT enviados ao AVA; horário do início da aula não é inferido do script.
- [ ] CR-05 — Confirmar recibo/acesso dos anexos no AVA e URLs para o professor, sem declarar envio que não ocorreu.
- [ ] CR-06 — Ensaiar apresentação de dez minutos com os quatro.
- [ ] CR-07 — Ensaiar demonstração ao vivo de cinco minutos com falha injetada e rollback.
- [ ] CR-08 — Preparar os quatro para cinco minutos de perguntas.
- [ ] CR-09 — Após v1.0.0, congelar funcionalidades: somente correções fix: via PR e pipeline completa.
- [ ] CR-10 — CONTÍNUO: nunca alterar produção/gh-pages manualmente após congelamento.
- [ ] CR-11 — CONDICIONAL concurso: submissão até 21/10/2026, 23h59, horário de Brasília.
- [ ] CR-12 — CONDICIONAL concurso: melhorias após devolutiva continuam passando pela esteira.
- [ ] CR-13 — CONDICIONAL concurso: manter URL pública no ar durante triagem de novembro.

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
- [ ] B-03 — Viabilidade técnica/execução (25%): demonstrar commit → produção ao vivo.
- [ ] B-04 — Viabilidade técnica/execução: demonstrar falha injetada → alerta → rollback, com continuidade.
- [ ] B-05 — Viabilidade técnica/execução: justificar manutenção e evolução da solução.
- [ ] B-06 — Jogabilidade (30%): colega de outra turma joga por três minutos sem explicação.
- [ ] B-07 — Jogabilidade: observar/registrar compreensão real, sem inventar respostas.
- [ ] B-08 — Jogabilidade: observar/registrar diversão real.
- [ ] B-09 — Jogabilidade: observar/registrar aprendizagem real.
- [ ] B-10 — Jogabilidade: não há bugs bloqueantes na build demonstrada.
- [ ] B-11 — Apresentação (20%): fala clara e dentro do tempo.
- [ ] B-12 — Apresentação: divisão efetiva da fala entre os quatro.
- [ ] B-13 — Apresentação: vídeo com qualidade/clareza suficientes e direitos conferidos.
- [ ] B-14 — Apresentação: responder perguntas com domínio dos fatos e limitações.
- [ ] B-15 — Conferir pesos A: 10/8/15/12/10/10/12/10/8/5; pesos B: 25/25/30/20; aplicar F real, sem prometer nota.

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

- [ ] EL-01 — Sem plágio ou ativo sem licença/autorização: infração zera avaliação do squad.
- [ ] EL-02 — Produção somente pela pipeline: alteração manual zera INT-07.
- [ ] EL-03 — Nenhuma credencial real no repositório: infração zera INT-05 e requer revogação.
- [ ] EL-04 — Pipeline funciona desde clone limpo: falha nessa condição zera INT-03.
- [ ] EL-05 — Regra do enunciado original: integrável entregue após o início da aula de 09/10, sem justificativa aceita, recebe nota zero nesse integrável. Conferir condições aplicáveis sem afirmar cumprimento cronológico sem evidência.

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
- [ ] DIR-13 — Concordância real de quem aparecer no vídeo (I10-07).
- [ ] DIR-14 — Conferir declaração coletiva de propriedade/originalidade: na UC, protótipo pertence ao squad.
- [ ] DIR-15 — Não publicar CPF/assinaturas/segredos em código, logs, capturas ou artefatos públicos; reconferência final complementar às orientações do projeto.
- [ ] DIR-16 — CONDICIONAL concurso: decisão informada e conjunta sobre licença à Framework e uso de nome/imagem/voz; não aceitar termos automaticamente.

## 10 — Ficha TXT: campos e validações reais do JavaScript

Preencher juntos no HTML original, com declarações verdadeiras. Validação de formulário não verifica automaticamente a existência/qualidade das evidências. Não marcar os dez INT só para liberar o botão.

- [x] FIC-01 — Aura67 preenchido no rascunho do HTML original/Live Server em12/10/2026; [registro](../evidencias/equipe.md). Reconferir ao gerar ficha final.
- [x] FIC-02 — URL HTTP/HTTPS do repositório real disponível. E1; inserção no formulário em FIC-29.
- [ ] FIC-03 — Integrante 1: nome completo com pelo menos duas palavras, RA com pelo menos três caracteres, papel real.
- [ ] FIC-04 — Integrante 2: nome completo com pelo menos duas palavras, RA com pelo menos três caracteres, papel real.
- [ ] FIC-05 — Integrante 3: nome completo com pelo menos duas palavras, RA com pelo menos três caracteres, papel real.
- [ ] FIC-06 — Integrante 4: nome completo com pelo menos duas palavras, RA com pelo menos três caracteres, papel real.
- [x] FIC-07 — Quatro papéis oficiais distintos conferidos/selecionados no HTML original em12/10/2026, conforme equipe confirmada; [registro](../evidencias/equipe.md). RAs/entrega continuam pendentes.
- [ ] FIC-08 — URL pública de produção formal — obrigatória.
- [ ] FIC-09 — Link/print da última execução verde — obrigatório; escolher a execução final, não somente a candidata E2.
- [ ] FIC-10 — Link do painel /status/ — obrigatório.
- [ ] FIC-11 — Vídeo pitch no AVA ou link — obrigatório.
- [ ] FIC-12 — Relatório técnico PDF acessível — obrigatório.
- [ ] FIC-13 — URL HML — campo opcional na ficha, ambiente obrigatório na atividade; incluir para rastreabilidade.
- [ ] FIC-14 — CONDICIONAL concurso: link Drive — opcional na ficha, preencher se inscritos.
- [ ] FIC-15 — INT-01 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] FIC-16 — INT-02 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] FIC-17 — INT-03 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] FIC-18 — INT-04 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] FIC-19 — INT-05 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] FIC-20 — INT-06 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] FIC-21 — INT-07 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] FIC-22 — INT-08 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] FIC-23 — INT-09 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] FIC-24 — INT-10 entregue/evidenciado e autoavaliação 0–10 verdadeira.
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

- [ ] CON-01 — Decisão explícita e conjunta de inscrição.
- [ ] CON-02 — Exatamente quatro integrantes elegíveis; todos maiores de dezoito anos na inscrição.
- [ ] CON-03 — CPF válido e residência no Brasil, conferidos privadamente; não inserir CPF no Git/artefatos públicos.
- [ ] CON-04 — Inscrição individual pelo formulário oficial da landing page, janela 21/09–21/10/2026.
- [ ] CON-05 — Reler regulamento vigente antes da inscrição: organizadora pode alterá-lo (item 17.2).
- [ ] CON-06 — Ler cláusulas de propriedade intelectual/uso de imagem, itens 12 e 13, e aceitar somente com orientação humana específica.
- [ ] CON-07 — Vídeo no Instagram em colaboração com @framework.digital e perfil oficial do Programadores do Amanhã, conforme regulamento vigente.
- [ ] CON-08 — Drive do responsável com todos os materiais, acesso total ao e-mail correto da organização e verificação com outra conta.
- [ ] CON-09 — Submissão completa até 21/10/2026, 23h59 Brasília; sem prazo extra de produção previsto no regulamento.
- [ ] CON-10 — Manter link no ar na triagem de novembro.
- [ ] CON-11 — Conferir que inscrição/termos/imagem/voz não foram aceitos automaticamente em nome de alguém.

O critério de engajamento social do item 9.3 pertence ao concurso, não à banca da UC. A Faculdade SENAI não organiza nem tem vínculo com o concurso.

## Checkpoints G0–G8 e roteiros por área

Este checklist não substitui entradas → ações → saídas → aceites dos roteiros. Pode haver preparação independente sem aceite final; marcar apenas após validação das condições de liberação.

- [ ] G0 — Preparação: equipe registrada, acessos funcionando, estratégia Git e proteção preparadas. **Primeiro aceite incompleto.**
- [ ] G1 — Definição: mecânica/aprendizagem/fluxo/stack definidos e backlog compreendido pelos quatro.
- [ ] G2 — Base: clone limpo gera jogo/PDF; checks bloqueiam erros e segredos; ciclo jogável e ativos integrados.
- [ ] G3 — Homologação: /hml/ formal funciona, regressão completa passa e pacote offline é jogável.
- [ ] G4 — Produção controlada: mesma build, aprovação registrada, monitoramento ativo e versão verificável.
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
