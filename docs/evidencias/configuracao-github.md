# Passo003 — Configuração GitHub e colaboração

**Data:**13/10/2026, America/Sao_Paulo. **Responsável:**LuccaCastilho/luccalck. **Tarefa:**003/C02/R01; INT01/03/07; preparaçãoG0/G1. **Base:**4d9acf4cb7e70dc52d53d018446c891301c09aad. Preparação e convites executados; sem merge, revisão de colega, deploy ou escrita manual de gh-pages.

## Identidade e fonte única

Conferimos Gitluccalck/256704169+luccalck@users.noreply.github.com e APIloginluccalck/nomeLuccaCastilho. Fonte C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade; originhttps://github.com/luccalck/desafio-arcade, público. Defaultfeature/primeiro-ciclo; mainbootstrap. Preservamos trabalho local anterior e não criamos outro repositório.

## Acessos: convites reais

| Conta | Resultado da API | Permissão |
|---|---|---|
| luccalck | Proprietário/colaborador ativo | admin |
| DaviSouza78 | Convite337428337 enviado, aguardando aceite | write |
| miguelsenai2024 | Convite337428340 enviado, aguardando aceite | write |
| 6lucassilvaaa | Convite337428342 enviado, aguardando aceite | write |

PUT repos/luccalck/desafio-arcade/collaborators/<conta> com permission=push retornou convites, reconferidos na listagem. Não concedemos admin. Os colegas aceitam nas próprias contas e testam acesso; I01-02 ainda aberto. Conta existente, convite, aceite e contribuição são provas distintas.

Professor: solicitamos conta GitHub ou confirmação da orientação de leitura pública; ainda sem resposta na conferência. I01-03 permanece aberto, sem conta adivinhada ou alegação de acesso testado pelo professor.

## Main, PRs e branches

GET main/protection: required_approving_review_count1; ci/stricttrue; dismiss_stale_reviewstrue; require_last_push_approvaltrue; enforce_adminstrue; forcepush/deletionfalse. Proteção preservada; nenhuma ação de merge/bypass.

PR#2: draft, base main/headfeature/primeiro-ciclo, SHA71933bf; reviews[], REVIEW_REQUIRED. Checks existentes verdes não substituem aprovação. Davi é revisor previsto; solicitação formal depende do aceite/acesso. Não alegamos request enviado ou aprovação.

Normal: branch curta → PRmain → outroautor → civerde → merge. PRs dependentes usam temporariamente bases empilhadas (003→002→001→primeiro-ciclo→main) para isolar diffs; registrar exceção, integrar dependências com revisão/CI, ajustar bases e restaurar defaultmain somente após merge revisado do primeiro ciclo. I01-05/I01-18 continuam abertos.

## Ambientes, permissões e variables

| Ambiente | Configuração conferida | Limite |
|---|---|---|
| github-pages | Branchesmain efeature/primeiro-ciclo; preview usa esse environment | Não é producao formal |
| homologacao | Existe, sem regras adicionais | Deploy formal não integrado |
| producao | Reviewer obrigatório luccalck; prevent_self_reviewfalse; can_admins_bypasstrue; sem filtro de branch | Configuração não comprova aprovação/deploy; reconciliar política/gate com fluxo formal antes de PRD |

Não inferimos proteção da main como proteção dos environments. Não houve aprovação/bypass de produção. Workflow mantém contentsreadglobal, qualidade/segurança/build/E2E e gateci; publicar-preview apenas recebe contentswrite/pageswrite/id-tokenwrite, concorrência serializada e branchcondicionada. Checkout persist-credentialsfalse; scanner fetch-depth0. Nenhum workflow alterado nesta etapa.

Configuramos `gh variable set SITE_URL --repo luccalck/desafio-arcade --body https://luccalck.github.io/desafio-arcade` e reconferimos a lista. PAGES_PREVIEW_ENABLEDtrue já existia. Não lemos tokens/valores de secrets. ghsecretlist sem entradas de secrets de repositório não prova ausência de token automático ou secrets em outros níveis.

Destinos coerentes: baseSITE_URL; HMLSITE_URL/hml/; PRDSITE_URL/ com loader; releasesSITE_URL/releases/<sha>/; painelSITE_URL/status/. Últimos jobs/painel/triagem permanecem nas etapas previstas. KIT-14 fecha somente configuração da variável pública/destinos, sem antecipar consumidores formais.

## Pages atual e plano de transição007/011

APIpages: build_typeworkflow; html_urlhttps://luccalck.github.io/desafio-arcade/; sourcebranchmain/path/. Como o tipo ativo éworkflow, source não comprova publicação por branchmain. Branchgh-pages existe, SHA5b8d9268814580ded744c008024b10e7e53b9d32; escrita atual pela pipeline. Settings não alterado nesta etapa.

O HTML exige origemliteralgh-pages. A [documentação oficial](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) informa que commits com GITHUB_TOKEN não disparam buildPages por branch. Não basta trocar Settings sem alinhar o mecanismo de publicação.

Plano para007/011, sem executar funções futuras:

1. Preparar por PR publicação formal recuperando ZIP/checksum aprovados, preservando hml/releases/loader e releases anteriores; não recompilar entre ambientes.
2. Validar método suportado com origemliteralgh-pages, permissões mínimas, comportamento do push do bot, disparo da publicação, propagação, concorrência e recuperação. Não pressupor PAT nem pedir token no chat.
3. Coordenar job aprovado e Settingsbranchgh-pages/raiz em uma transição, com árvore anterior recuperável pela pipeline e plano de retorno. Não editar conteúdo publicado manualmente.
4. Executar HTTP/versão/E2E e registrar Settings/run/fonte/artefato. Se houver impedimento, justificar equivalente e obter validação do professor. I07-01/KIT-12 permanecem abertos até execução/aceite.

Plano não é evidência de transição sem indisponibilidade. Ambiente configurado não comprova execução/gate.

## Validações e fontes

Comandos: ghrepoview; ghapi mainprotection/collaborators/invitations/pages/environments/branchpolicies/gh-pages; ghprview2(reviews/reviewDecision/statusCheckRollup); ghvariablelist/set; ghsecretlist(nomes somente). Snapshot redigido .contexto/passo-003/configuracao-redigida.json, ignorado, sem credenciais.

HTTP por urllib em13/10: raiz200/1129bytes; hml/version.json200,0.6.0/SHA71933bfd4bd35f8c3ac8f5899a0e9af00db29f32/build2026-10-13T02:06:51.969Z. Verifica disponibilidade/versão do preview; não é novo smokePRD, regressão completa ou DORA.

Fontes lidas nesta sessão/reconferidas: HTML integral/abas/script, modeloGDD/tabelas/declarações, requisitos/checklist/auditoria/GDD, índice/C02/R01, políticas/IA/licenças e workflow. Originais preservados: HTMLSHA19362485b3ec9534bdf31303ca0b92b6fe96de21bb87867977d37a7393565275; DOCXSHA2a67b417bad4b25e5b4a3362fad4e3db0281e548bee105fbd83f2d2443d6d5ff.

## Pendências do aceite

Aceite/teste dos convites; leitura do professor; revisão efetiva antes do merge; defaultmain após integração; migraçãoPages007/011 e ambientes formais. SQ-08 depende de participação real de Plataforma, sem conferir autoria fictícia ao papel. RAs adiados; G0/G1 não liberados. [Pendências](../execucao/05-pendencias-por-passo.md). Nenhum INT inteiro aceito.

## Publicação e CI da preparação

Commit próprio `25ba5e7910c73d8550d732c21615a8aa6a0a3c07`; [PR#5](https://github.com/luccalck/desafio-arcade/pull/5) draft sobre feature/passo-002-arquitetura-baseline, sem merge/reviews. [CI38342833196](https://github.com/luccalck/desafio-arcade/actions/runs/38342833196) concluída com sucesso; qualidade/segurança/build/E2E/ci verdes e preview corretamente ignorado. Atualização documental posterior exige reconferir o HEAD no PR.

Validações administrativas:84Markdown locais semlinks ausentes;40passos/dezporintegrante/313IDssemomissão/depsacíclicas; checklist109marcados303abertos. gitdiffcheckfinal passou; src/tests/scripts/dependências/workflows sem mudanças contra a base4d9acf4. HookGitleaks sem vazamentos no commit. Alterações locais anteriores preservadas fora do índice; não declaramos worktree limpo.
