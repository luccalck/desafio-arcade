# Execução em quatro blocos — 40 passos

**Atualização:** 12/10/2026. Organização solicitada: Lucca faz os dez primeiros passos, entrega a Davi, que faz os dez seguintes, depois Miguel e Lucas. Um jogo WEB/um repositório, sem cópias por integrante. Os prompts continuam completos, com check, comando, evidência, commit pela própria conta e PR revisado.

Use o [registro único de pendências por passo](05-pendencias-por-passo.md) ao encerrar cada execução.

## Ordem obrigatória dos blocos

| Ordem | Responsável | Passos | Entrega principal | Próximo |
|---|---|---|---|---|
| 1 | Lucca Castilho | 001–010 | Equipe/acessos, produto/GDD/telas, núcleo/testes, segurança, CI/build/offline | Davi |
| 2 | Davi Paes | 011–020 | HML/E2E, releases, sondas/alertas, loader, PRD aprovada com rollback básico e painel | Miguel |
| 3 | Miguel Oliveira | 021–030 | Playtest, recuperação automática/manual, DORA, melhoria, candidata, vídeo real e validadores de triagem | Lucas |
| 4 | Lucas Souza | 031–040 | Pacote/agendamento, relatório, estabilidade, tag/release, triagem, ficha, entrega e banca | Fechamento |

**Você, Lucca, executa 001 → 002 → 003 → 004 → 005 → 006 → 007 → 008 → 009 → 010.** Os antigos números alternados entre autores foram substituídos por esta atribuição. Não use cópias antigas dos prompts.

## O que é concluir um bloco

Concluir seu código/documentação e validações que já são possíveis, commits pela sua identidade, PRs revisados/CI verde e entrega dos contratos/evidências. Os checks finais dependentes de publicação/release/banca estão atribuídos a passos posteriores. Não esperar um integrante desenvolver uma função futura para concluir seu escopo; também não marcar esse check futuro como realizado.

Revisão humana de outro autor continua obrigatória desde o bloco de Lucca. Dados de equipe/acessos, concordâncias e participação dos quatro são colaborativos desde o começo; a vez de implementar dez passos não suspende essas obrigações. Se faltar acesso/dado humano, manter aceite pendente e entregar preparação revisável, sem inventar conclusão.

Use o [protocolo de passagem de bloco](04-passagem-de-bloco.md). Ao terminar010 Davi inicia011; depois020 Miguel inicia021; depois030 Lucas inicia031. Dependências dentro dos blocos são de números anteriores e provas disponíveis. Gates G0–G8 e códigos C01/C02/P01–P07/D01–D07/R01–R07/S01–S06 permanecem preservados.

## Autoria, revisão e fator individual

| Integrante | Papel oficial proposto | INT de autoria substancial planejada | Revisor proposto |
|---|---|---|---|
| Lucca Castilho | Produto e Game Design | 01 (equipe/Git), 02 (GDD/telas), 04 (núcleo/regressões), 05 (licenças/segurança), 06 (offline) | Davi Paes |
| Davi Paes | Desenvolvimento e Qualidade | 03 (HML/PRD), 06 (releases), 07 (rollout), 08 (sondas/alertas/painel) | Miguel Oliveira |
| Miguel Oliveira | Plataforma e Release | 04 (playtest/regressões), 07 (recuperação), 08 (DORA/melhoria), 10 (vídeo) | Lucas Souza |
| Lucas Souza | SRE e Segurança | 09 (pacote/triagem), 10 (relatório/ficha/banca), 01 (tag/contribuição), 05 (auditoria) | Lucca Castilho |

Papéis têm donos, não exclusividade. No passo001, Lucca confirmou squad Aura67, contas e concordância com papéis/revisão cruzada; **todos participam de todas as áreas**. Contas: luccalck, DaviSouza78, miguelsenai2024 e6lucassilvaaa, conforme [SQUAD.md](../../SQUAD.md). RAs e execução de acessos/revisões permanecem pendentes. F1 exige commits e PRs aprovados em pelo menos três INT por pessoa **e participação na banca**; mínimo de dez PRs reais revisados por outro autor no squad. Não contar estes arquivos preparados pela IA como contribuição dos colegas. Os quatro falam na banca e fornecem consentimentos/gravações reais quando necessário, mesmo que Lucas coordene o último bloco.

Meta: faixa avançada, sem garantir nota. Fórmula `(0,7×A + 0,3×B)×F`; pesos A 10/8/15/12/10/10/12/10/8/5; B 25/25/30/20. Autoavaliações10 são estimativas solicitadas, não prova ou nota oficial.

## Checks, gates e produção

Mapa inicial preserva cobertura dos313 checks abertos do snapshot original. Estado atualizado fica no checklist principal: após cinco fechamentos específicos do001 e configuração de SITE_URL/acesso público do professor no003 e Dependabot/privacidade no004 e coordenaçãoProduto/GDD no005 e revisão das Actions no007, são114 marcados e298 abertos/condicionais. Nenhum INT/gate inteiro foi aceito. O mapa não substitui esse estado.

G0–G2 são preparados por Lucca; G3/G4 por Davi; G5 e preparação G6 por Miguel; G6–G8 por Lucas. Liberação continua conforme entradas/aceites dos roteiros e pessoas reais. Rollback básico deve estar integrado ANTES de primeira PRD no019; Miguel fortalece e comprova no022/026. Painel020 trata DORA indisponível honestamente até Miguel ligar dados reais no024. Assim não há retorno obrigatório a Davi para implementar esses itens.

Vídeo029 vem de produção candidata e é entrada humana anterior à tag035; pacote031 não recompila entre HML/PRD. Relatório033 é completado com evidência final no037. Correção tardia fica com executor da etapa atual, por PR/teste/revisão, coordenando com autor original; não esconder falha, sobrescrever release ou mover tag.

## Passos numerados

| Nº | Responsável | Prompt | INT | Dependências técnicas anteriores |
|---|---|---|---|---|
| 001 | Lucca Castilho | [001 — Registrar equipe, contexto e marcos reais](<Lucca Castilho/001-equipe-contexto.md>) | INT-01/02/09 | Contexto |
| 002 | Lucca Castilho | [002 — Verificar arquitetura e baseline de qualidade](<Lucca Castilho/002-arquitetura-baseline.md>) | INT-04/06/03 | 001 |
| 003 | Lucca Castilho | [003 — Preparar acessos, revisão Git e configuração Pages](<Lucca Castilho/003-acessos-git-pages.md>) | INT-01/03/07 | 001 |
| 004 | Lucca Castilho | [004 — Completar segurança inicial e privacidade](<Lucca Castilho/004-dependabot-privacidade.md>) | INT-05/08/03 | 001, 003 |
| 005 | Lucca Castilho | [005 — Completar identificação e conteúdo do GDD](<Lucca Castilho/005-gdd-identificacao.md>) | INT-02/01 | 001, 002 |
| 006 | Lucca Castilho | [006 — Completar regressão de navegador exigida na HML](<Lucca Castilho/006-regressao-hml.md>) | INT-04/03 | 002, 005 |
| 007 | Lucca Castilho | [007 — Preparar esteira formal e contratos de artefatos](<Lucca Castilho/007-ci-formal.md>) | INT-03/06/05 | 002, 003, 004, 006 |
| 008 | Lucca Castilho | [008 — Conferir licenças, autoria e revisão humana da IA](<Lucca Castilho/008-licencas-ia-direitos.md>) | INT-05/02/01 | 001, 004, 005 |
| 009 | Lucca Castilho | [009 — Produzir telas e validar UX conforme faixa avançada](<Lucca Castilho/009-stitch-ux.md>) | INT-02/04/05 | 005, 008 |
| 010 | Lucca Castilho | [010 — Conferir build offline e integridade antes da HML](<Lucca Castilho/010-offline-integridade.md>) | INT-06/04 | 002, 006, 007, 009 |
| 011 | Davi Paes | [011 — Publicar HML formal e medir até quinze minutos](<Davi Paes/011-deploy-hml.md>) | INT-03/07/04 | 003, 006, 007, 010 |
| 012 | Davi Paes | [012 — Implementar sondas e histórico de observabilidade](<Davi Paes/012-sondas-monitor.md>) | INT-08/03 | 004, 007, 011 |
| 013 | Davi Paes | [013 — Validar aprendizagem, conteúdo e condicionais de IA](<Davi Paes/013-aprendizagem-conteudo.md>) | INT-04/02/10 | 005, 006, 009 |
| 014 | Davi Paes | [014 — Preparar smoke PRD formal e gates de teste](<Davi Paes/014-smoke-producao.md>) | INT-04/07/03 | 006, 010, 011 |
| 015 | Davi Paes | [015 — Automatizar GitHub Releases por tag e anexos](<Davi Paes/015-releases-tags.md>) | INT-06/01/07 | 007, 010, 011 |
| 016 | Davi Paes | [016 — Implementar dois alertas e fechamento automático](<Davi Paes/016-alertas-issues.md>) | INT-08/05 | 008, 012 |
| 017 | Davi Paes | [017 — Preparar roteiro do vídeo e concordância de imagem](<Davi Paes/017-roteiro-pitch.md>) | INT-10/05/02 | 005, 008, 013 |
| 018 | Davi Paes | [018 — Implementar controle de rollout e sessão](<Davi Paes/018-rollout-carregador.md>) | INT-07/04 | 010, 014, 015 |
| 019 | Davi Paes | [019 — Entregar produção com aprovação e azul-verde](<Davi Paes/019-producao-aprovacao.md>) | INT-03/07/06 | 011, 012, 014, 015, 016, 018 |
| 020 | Davi Paes | [020 — Publicar painel de disponibilidade e DORA](<Davi Paes/020-painel-status.md>) | INT-08/03 | 012, 016, 019 |
| 021 | Miguel Oliveira | [021 — Realizar playtest e registrar aprendizagem real](<Miguel Oliveira/021-playtest-real.md>) | INT-04/10/02 | 013, 019, 020 |
| 022 | Miguel Oliveira | [022 — Fortalecer e validar rollback automático existente](<Miguel Oliveira/022-rollback-automatico.md>) | INT-07/04/03 | 014, 018, 019 |
| 023 | Miguel Oliveira | [023 — Criar recuperação manual pela pipeline](<Miguel Oliveira/023-rollback-manual.md>) | INT-07/03 | 018, 019, 022 |
| 024 | Miguel Oliveira | [024 — Calcular quatro DORA e linha de base](<Miguel Oliveira/024-dora-real.md>) | INT-08/10 | 012, 016, 019, 023 |
| 025 | Miguel Oliveira | [025 — Revisar GDD vivo e PDF da candidata final](<Miguel Oliveira/025-gdd-vivo-pdf.md>) | INT-02/10/06 | 005, 009, 021, 024 |
| 026 | Miguel Oliveira | [026 — Ensaiar falha controlada, recuperação e regressões](<Miguel Oliveira/026-ensaio-falha-bug.md>) | INT-07/04/08 | 020, 021, 022, 023, 024 |
| 027 | Miguel Oliveira | [027 — Verificar versão candidata, artefato e hashes PRD](<Miguel Oliveira/027-reprodutibilidade-final.md>) | INT-06/07/03 | 015, 019, 025, 026 |
| 028 | Miguel Oliveira | [028 — Implementar e medir melhoria orientada por DORA](<Miguel Oliveira/028-melhoria-metrica.md>) | INT-08/03/09 | 024, 026, 027 |
| 029 | Miguel Oliveira | [029 — Gravar e validar pitch real de produção](<Miguel Oliveira/029-gravar-pitch.md>) | INT-10/09/05 | 017, 025, 026, 027, 028 |
| 030 | Miguel Oliveira | [030 — Implementar triagem automatizada e testes negativos](<Miguel Oliveira/030-triagem-validadores.md>) | INT-09/04 | 010, 017, 029 |
| 031 | Lucas Souza | [031 — Automatizar pacote com vídeo como entrada humana](<Lucas Souza/031-pacote-pipeline.md>) | INT-09/06/03 | 015, 027, 029, 030 |
| 032 | Lucas Souza | [032 — Agendar triagem e alertas até banca](<Lucas Souza/032-triagem-agendada.md>) | INT-09/08 | 016, 030, 031 |
| 033 | Lucas Souza | [033 — Escrever relatório técnico com evidências reais](<Lucas Souza/033-relatorio-tecnico.md>) | INT-10/02/08/04 | 021, 024, 025, 026, 028, 029, 031, 032 |
| 034 | Lucas Souza | [034 — Executar estabilidade e revisão da candidata](<Lucas Souza/034-aceite-candidata.md>) | INT-04/06/07 | 025, 026, 027, 029, 030, 031, 032, 033 |
| 035 | Lucas Souza | [035 — Criar tag final e executar release formal](<Lucas Souza/035-tag-final-release.md>) | INT-01/03/06/07/09 | 031, 032, 033, 034 |
| 036 | Lucas Souza | [036 — Executar triagem final e auditoria eliminatória](<Lucas Souza/036-triagem-final-eliminatorios.md>) | INT-09/05/07/03 | 035 |
| 037 | Lucas Souza | [037 — Consolidar relatório, ficha e apresentação](<Lucas Souza/037-ficha-relatorio-banca.md>) | INT-10/09/01 | 033, 035, 036 |
| 038 | Lucas Souza | [038 — Conferir URLs finais e congelamento de código](<Lucas Souza/038-freeze-verificacao-final.md>) | INT-04/06/07/01 | 035, 036, 037 |
| 039 | Lucas Souza | [039 — Confirmar entrega e demonstrar esteira na banca](<Lucas Souza/039-entrega-acessos-demo.md>) | INT-09/10/01/07 | 035, 036, 037, 038 |
| 040 | Lucas Souza | [040 — Auditar fator individual e condicionais restantes](<Lucas Souza/040-contribuicao-condicionais.md>) | INT-01/05/08/09/10 | 037, 038, 039 |

## Documentos de apoio

- [Estrutura exata](01-estrutura-repositorio.md).
- [Mapa de todos os checks](02-mapa-checks.md).
- [Controle de execução](03-controle-execucao.md).
- [Passagem de bloco](04-passagem-de-bloco.md).
- [Checklist principal](../gestao/checklist-avaliacao.md) e [auditoria do HTML](../gestao/auditoria-avaliacao.md).

Originais preservados. Repositório/arquivo principal único; .contexto e acompanhamento local não integram pacote acadêmico. Critérios eliminatórios e condicionais continuam nos prompts. Concurso não está autorizado por esta reorganização.

## Preparação validada do passo006 — 13/10/2026

[Regressão completa e evidências](../evidencias/regressao-hml.md):17E2E locais/CI e5cenários no preview público; dois roteiros HML entregues ao011 e smoke separado para014/019. Nenhum novo check geral fechado;113marcados/299abertos permanecem. Execução formal e revisão humana ainda pendentes.

## Preparação validada do passo007 — 13/10/2026

[Esteira e contrato de artefatos](../evidencias/ci-formal.md):clone limpo, CI/pacote/avisos no Actions validados. KIT-09 fechado:114marcados/298abertos. Deploys formais e recebimento permanecem nos passos indicados no registro único.

## Preparação do008 — 13/10/2026

[Inventários, direitos e revisão necessária](../evidencias/direitos.md):158componentes/26ativos e rastreabilidade das etapasIA conhecidas. Nenhum novo check geral fechado;114marcados/298abertos. Declarações/revisões humanas e reconferência com novos ativos/vídeo continuam obrigatórias.

## Preparação009 — 13/10/2026

[Stitch e UX](../evidencias/stitch-ux.md): seis referências reais exportadas, falhas documentadas sem integração ao runtime e17E2E locais verdes. I02-15 comprovado;115marcados/297abertos. PR#11/bca6a71 com CIpush38442245309/PR38442289110verdes. G1/aceites humanos abertos.
