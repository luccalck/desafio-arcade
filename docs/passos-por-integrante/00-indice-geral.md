# Execução distribuída — 40 passos para fechar os requisitos

**Data:** 12/10/2026. Plano de prompts solicitado pelo responsável. **Objetivo:** concluir todos os checks aplicáveis com execução verificável e participação real. **Arquitetura:** um jogo WEB/um repositório, GitHub Actions/Pages, artefato único, HML→aprovação→produção→recuperação→observabilidade→triagem. **Stack:** a existente, sem migração de engine/backend.

> Execução inline por integrante com skill executing-plans quando disponível. Os prompts são para cada pessoa usar sua própria IA/conta; não autorizam agente a simular os quatro. Não despachar outros integrantes automaticamente. Preservar C01/C02/P01–P07/D01–D07/R01–R07/S01–S06 e G0–G8.

Há **40 arquivos de passos, dez em cada pasta**. A igualdade é de quantidade de passos; esforço depende do acesso, implementação e ações humanas. Planejar não encerra qualquer check. O mapa distribui todos os **313 checks abertos** do checklist inicial (inclui condicionais/reconferências), sem omissão e sem tratá-los como 313 funcionalidades novas.

Após esse snapshot, FIC-25 a FIC-28 foram preenchidos no rascunho da ficha. Permanecem no mapa para conferência final, com estado atual no checklist principal: 103 checks específicos marcados e 309 abertos/condicionais. Nenhum INT/gate inteiro está concluído.

## Usar os prompts

1. Confirme papéis propostos com os quatro no passo001. Leia checklist/HTML e estado real antes de cada execução.
2. Abra o MD da sua pasta e copie a seção Prompt profissional inteira para sua IA. Os caminhos são do clone real, não quatro cópias do projeto.
3. Respeite dependências e gates. Números ordenam o trabalho, mas preparação de tarefa pode começar antes do aceite, conforme roteiros. Código shared/workflow deve ser coordenado.
4. Faça trabalho substantivo e commits com SUA conta. Outra pessoa revisa. Passos planejados/arquivos criados pela IA do Lucca não contam como contribuição dos demais.
5. Atualize checks/controle só após execução/prova; se condição não aplica, registrar N/A com decisão, nunca [x] falso. Inscrição não está autorizada.

Para push/revisão dos colegas, acesso do passo003 e identidade real são pré-requisitos. A preparação local do passo002 pode ocorrer antes disso; seu PR não poderá ser aceito até os acessos e a revisão estarem disponíveis. Workflow, scanner, build e docs compartilhados devem ser coordenados, sem sobrescrever alterações concorrentes.

## Fator individual e revisão cruzada

| Integrante | Papel proposto | INT de autoria a comprovar por commits/PRs | Revisor proposto |
|---|---|---|---|
| Lucca Castilho | Produto e Game Design | 02 (GDD/telas), 04 (conteúdo/casos), 10 (pitch/relatório) | Davi Paes |
| Davi Paes | Desenvolvimento e Qualidade | 04 (E2E), 06 (offline/build), 07 (loader/rollback), 09 (triagem) | Miguel Oliveira |
| Miguel Oliveira | Plataforma e Release | 01 (Git), 03 (CI/CD), 06 (releases), 07 (deploy/recuperação), 09 (pacote) | Lucas Souza |
| Lucas Souza | SRE e Segurança | 05 (segurança/IA), 08 (sondas/alertas/DORA), 09 (triagem agendada/final), 01/10 (auditoria/evidências) | Lucca Castilho |

Contas/RAs dos três colegas e nome do squad ainda não foram informados. `luccalck` é a conta já conhecida; confirmar associação no passo001. Todos participam da banca. F1 exige commits+PRs aprovados em>=3 INT e banca; não basta atribuir papel ou fazer revisão. Squad>=10 PRs reais de outro revisor. Meta é faixa avançada, sem garantir nota100; fórmula e critérios completos estão no checklist.

## Ordem global e entradas

G0: equipe/acessos/políticas (001–004). G1/G2: produto/GDD/UI/núcleo/testes/CI/artefatos (005–010 e preparações independentes). G3: HML formal/E2E (011). G4: sondas/alertas/release/loader/aprovação/PRD/painel (012–020). G5: playtest/recuperação/DORA/melhoria (021–028). G6: vídeo/triagem/pacote/relatório/candidata (029–034). G7: tag/release/triagem final (035–036). G8: ficha/URLs/envio/banca/auditoria (037–040). Respeitar as dependências explícitas de cada MD; preparação não aceita um gate humano.

Vídeo é gravado de produção candidata antes da tag final, como entrada humana do pacote. Relatório recebe última prova de release/triagem depois. Se mudança funcional após gravação, refazer evidência afetada. Não reconstruir entre HML e PRD. Após v1.0.0 sófix viaPR/pipeline.

## Passos numerados

| Nº | Integrante | Passo / prompt | INT | Depende de |
|---|---|---|---|---|
| 001 | Lucca Castilho | [001 — Registrar equipe, contexto e marcos reais](<Lucca Castilho/001-equipe-contexto.md>) | INT-01/02/09 | Contexto |
| 002 | Davi Paes | [002 — Verificar arquitetura e baseline de qualidade](<Davi Paes/002-arquitetura-baseline.md>) | INT-04/06/03 | 001 |
| 003 | Miguel Oliveira | [003 — Preparar acessos, revisão Git e configuração Pages](<Miguel Oliveira/003-acessos-git-pages.md>) | INT-01/03/07 | 001 |
| 004 | Lucas Souza | [004 — Completar segurança inicial e privacidade](<Lucas Souza/004-dependabot-privacidade.md>) | INT-05/08/03 | 001, 003 |
| 005 | Lucca Castilho | [005 — Completar identificação e conteúdo do GDD](<Lucca Castilho/005-gdd-identificacao.md>) | INT-02/01 | 001, 002 |
| 006 | Davi Paes | [006 — Completar regressão de navegador exigida na HML](<Davi Paes/006-regressao-hml.md>) | INT-04/03 | 002, 005 |
| 007 | Miguel Oliveira | [007 — Preparar esteira formal e contratos de artefatos](<Miguel Oliveira/007-ci-formal.md>) | INT-03/06/05 | 002, 003, 004, 006 |
| 008 | Lucas Souza | [008 — Conferir licenças, autoria e revisão humana da IA](<Lucas Souza/008-licencas-ia-direitos.md>) | INT-05/02/01 | 001, 004, 005 |
| 009 | Lucca Castilho | [009 — Produzir telas e validar UX conforme faixa avançada](<Lucca Castilho/009-stitch-ux.md>) | INT-02/04/05 | 005, 008 |
| 010 | Davi Paes | [010 — Conferir build offline e integridade antes da HML](<Davi Paes/010-offline-integridade.md>) | INT-06/04 | 002, 006, 007, 009 |
| 011 | Miguel Oliveira | [011 — Publicar HML formal e medir até quinze minutos](<Miguel Oliveira/011-deploy-hml.md>) | INT-03/07/04 | 003, 006, 007, 010 |
| 012 | Lucas Souza | [012 — Implementar sondas e histórico de observabilidade](<Lucas Souza/012-sondas-monitor.md>) | INT-08/03 | 004, 007, 011 |
| 013 | Lucca Castilho | [013 — Validar aprendizagem, conteúdo e condicionais de IA](<Lucca Castilho/013-aprendizagem-conteudo.md>) | INT-04/02/10 | 005, 006, 009 |
| 014 | Davi Paes | [014 — Preparar smoke PRD formal e gates de teste](<Davi Paes/014-smoke-producao.md>) | INT-04/07/03 | 006, 010, 011 |
| 015 | Miguel Oliveira | [015 — Automatizar GitHub Releases por tag e anexos](<Miguel Oliveira/015-releases-tags.md>) | INT-06/01/07 | 007, 010, 011 |
| 016 | Lucas Souza | [016 — Implementar dois alertas e fechamento automático](<Lucas Souza/016-alertas-issues.md>) | INT-08/05 | 008, 012 |
| 017 | Lucca Castilho | [017 — Preparar roteiro do vídeo e concordância de imagem](<Lucca Castilho/017-roteiro-pitch.md>) | INT-10/05/02 | 005, 008, 013 |
| 018 | Davi Paes | [018 — Implementar controle de rollout e sessão](<Davi Paes/018-rollout-carregador.md>) | INT-07/04 | 010, 014, 015 |
| 019 | Miguel Oliveira | [019 — Entregar produção com aprovação e azul-verde](<Miguel Oliveira/019-producao-aprovacao.md>) | INT-03/07/06 | 011, 012, 014, 015, 016, 018 |
| 020 | Lucas Souza | [020 — Publicar painel de disponibilidade e DORA](<Lucas Souza/020-painel-status.md>) | INT-08/03 | 012, 016, 019 |
| 021 | Lucca Castilho | [021 — Realizar playtest e registrar aprendizagem real](<Lucca Castilho/021-playtest-real.md>) | INT-04/10/02 | 013, 019, 020 |
| 022 | Davi Paes | [022 — Implementar rollback automático após smoke falhar](<Davi Paes/022-rollback-automatico.md>) | INT-07/04/03 | 014, 018, 019 |
| 023 | Miguel Oliveira | [023 — Criar recuperação manual pela pipeline](<Miguel Oliveira/023-rollback-manual.md>) | INT-07/03 | 018, 019, 022 |
| 024 | Lucas Souza | [024 — Calcular quatro DORA e linha de base](<Lucas Souza/024-dora-real.md>) | INT-08/10 | 012, 016, 019, 023 |
| 025 | Lucca Castilho | [025 — Revisar GDD vivo e PDF da candidata final](<Lucca Castilho/025-gdd-vivo-pdf.md>) | INT-02/10/06 | 005, 009, 021, 024 |
| 026 | Davi Paes | [026 — Ensaiar falha controlada, recuperação e regressões](<Davi Paes/026-ensaio-falha-bug.md>) | INT-07/04/08 | 020, 021, 022, 023, 024 |
| 027 | Miguel Oliveira | [027 — Verificar versão candidata, artefato e hashes PRD](<Miguel Oliveira/027-reprodutibilidade-final.md>) | INT-06/07/03 | 015, 019, 025, 026 |
| 028 | Lucas Souza | [028 — Implementar e medir melhoria orientada por DORA](<Lucas Souza/028-melhoria-metrica.md>) | INT-08/03/09 | 024, 026, 027 |
| 029 | Lucca Castilho | [029 — Gravar e validar pitch real de produção](<Lucca Castilho/029-gravar-pitch.md>) | INT-10/09/05 | 017, 025, 026, 027, 028 |
| 030 | Davi Paes | [030 — Implementar triagem automatizada e testes negativos](<Davi Paes/030-triagem-validadores.md>) | INT-09/04 | 010, 017, 029 |
| 031 | Miguel Oliveira | [031 — Automatizar pacote com vídeo como entrada humana](<Miguel Oliveira/031-pacote-pipeline.md>) | INT-09/06/03 | 015, 027, 029, 030 |
| 032 | Lucas Souza | [032 — Agendar triagem e alertas até banca](<Lucas Souza/032-triagem-agendada.md>) | INT-09/08 | 016, 030, 031 |
| 033 | Lucca Castilho | [033 — Escrever relatório técnico com evidências reais](<Lucca Castilho/033-relatorio-tecnico.md>) | INT-10/02/08/04 | 021, 024, 025, 026, 028, 029, 031, 032 |
| 034 | Davi Paes | [034 — Executar estabilidade e revisão da candidata](<Davi Paes/034-aceite-candidata.md>) | INT-04/06/07 | 025, 026, 027, 029, 030, 031, 032, 033 |
| 035 | Miguel Oliveira | [035 — Criar tag final e executar release formal](<Miguel Oliveira/035-tag-final-release.md>) | INT-01/03/06/07/09 | 031, 032, 033, 034 |
| 036 | Lucas Souza | [036 — Executar triagem final e auditoria eliminatória](<Lucas Souza/036-triagem-final-eliminatorios.md>) | INT-09/05/07/03 | 035 |
| 037 | Lucca Castilho | [037 — Consolidar relatório, ficha e apresentação](<Lucca Castilho/037-ficha-relatorio-banca.md>) | INT-10/09/01 | 033, 035, 036 |
| 038 | Davi Paes | [038 — Conferir URLs finais e congelamento de código](<Davi Paes/038-freeze-verificacao-final.md>) | INT-04/06/07/01 | 035, 036, 037 |
| 039 | Miguel Oliveira | [039 — Confirmar entrega e demonstrar esteira na banca](<Miguel Oliveira/039-entrega-acessos-demo.md>) | INT-09/10/01/07 | 035, 036, 037, 038 |
| 040 | Lucas Souza | [040 — Auditar fator individual e condicionais restantes](<Lucas Souza/040-contribuicao-condicionais.md>) | INT-01/05/08/09/10 | 037, 038, 039 |

## Controle, estrutura e cobertura

- [Estrutura exata de código, branches, URLs e pacote](01-estrutura-repositorio.md).
- [Mapa de cada check aberto para passo/responsável](02-mapa-checks.md).
- [Controle de execução/revisão/evidência](03-controle-execucao.md).
- [Checklist principal](../checklist-avaliacao.md) e [auditoria do enunciado](../auditoria-avaliacao.md).

HTML original preservado: C:/Users/user/Downloads/jogo/Avaliação.html, hash19362485b3ec9534bdf31303ca0b92b6fe96de21bb87867977d37a7393565275. Todos os campos JS/detalhes/condicionais foram considerados no mapa.
