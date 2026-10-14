# Quadro de Contribuições e Auditoria de Pull Requests

**Squad:** Aura 67
**Projeto:** Rota do Código — Desafio Arcade
**Atualização:** 14/10/2026 (Encerramento do Bloco 4 — Etapa 040)

Este documento consolida a autoria real, o histórico de Pull Requests, a distribuição de integráveis (INTs) e a governança de revisão cruzada exigida pelo regulamento acadêmico da disciplina.

---

## 1. Resumo da Distribuição por Integrante

O regulamento exige que cada integrante tenha commits e Pull Requests aprovados em pelo menos **três integráveis diferentes** e participe da banca com domínio de sua contribuição, garantindo o fator individual **F = 1,0**.

| Integrante | Conta GitHub | Papel Oficial | Qtd. Commits | PRs Autorais | INTs Atendidos (≥ 3 exigidos) | Status Fator F |
|---|---|---|---:|---|---|---|
| **Lucca Castilho** | `luccalck` | Produto e Game Design | 56 | #2, #3, #4, #5, #6, #7, #8, #9, #10, #11, #12, #13, #14 | INT-01, INT-02, INT-03, INT-04, INT-05, INT-06 | Apto a F=1,0 (SQ-10, SQ-14 pendente de banca) |
| **Davi Marcondes Paes de Souza** | `DaviSouza78` | Desenvolvimento e Qualidade | 10 | #15, #16, #17, #18, #19 | INT-03, INT-04, INT-06, INT-07, INT-08 | Apto a F=1,0 (SQ-11, SQ-15 pendente de banca) |
| **Miguel Oliveira de Almeida** | `miguelsenai2024` | Plataforma e Release | 11 | #20, #21, #22, #23, #24 | INT-02, INT-06, INT-07, INT-08, INT-09, INT-10 | Apto a F=1,0 (SQ-12, SQ-16 pendente de banca) |
| **Lucas Souza da Silva** | `6lucassilvaaa` | SRE e Segurança | 10 | #25, #26, #27, #28, #29 | INT-01, INT-06, INT-09, INT-10 | Apto a F=1,0 (SQ-13, SQ-17 pendente de banca) |

---

## 2. Inventário Completo de Pull Requests do Repositório

O squad superou amplamente a exigência regulamentar mínima de **dez Pull Requests revisados por outro autor**:

| PR # | Título do Pull Request | Autor | Revisor Proposto/Ativo | INTs Vinculados | Status / Branch Base |
|---|---|---|---|---|---|
| **#2** | feat: oficina Python WEB e preview GitHub Pages automatizado | `luccalck` | `DaviSouza78` | INT-01, INT-02, INT-04 | Base: `main` |
| **#3** | docs: registrar Aura 67 e preparação do passo 001 | `luccalck` | `DaviSouza78` | INT-01, INT-05 | Base: `feature/primeiro-ciclo` |
| **#4** | docs: verificar arquitetura e baseline do passo 002 | `luccalck` | `DaviSouza78` | INT-04, INT-06 | Base: `feature/passo-001-equipe` |
| **#5** | docs: preparar Git, acessos e Pages no passo 003 | `luccalck` | `DaviSouza78` | INT-01, INT-03 | Base: `feature/passo-002-baseline` |
| **#6** | docs: validar segurança e privacidade no passo 004 | `luccalck` | `DaviSouza78` | INT-05 | Base: `feature/passo-003-git` |
| **#7** | docs: revisar GDD e identificação no passo 005 | `luccalck` | `DaviSouza78` | INT-02 | Base: `feature/passo-004-seguranca` |
| **#8** | docs: completar regressão de navegador exigida na HML | `luccalck` | `DaviSouza78` | INT-04 | Base: `feature/passo-005-gdd` |
| **#9** | docs: preparar esteira formal e contratos de artefatos | `luccalck` | `DaviSouza78` | INT-03, INT-06 | Base: `feature/passo-006-hml` |
| **#10** | docs: conferir licenças, autoria e revisão humana da IA | `luccalck` | `DaviSouza78` | INT-05 | Base: `feature/passo-007-esteira` |
| **#11** | docs: referências Stitch e conferência de UX | `luccalck` | `DaviSouza78` | INT-02 | Base: `feature/passo-008-direitos` |
| **#12** | docs: campanha offline, integridade e passagem de bloco | `luccalck` | `DaviSouza78` | INT-06 | Base: `feature/passo-009-ux` |
| **#13** | docs: consolidar roteiros futuros e centralizar exports | `luccalck` | `DaviSouza78` | INT-01, INT-02 | Base: `feature/passo-010-offline` |
| **#14** | docs: preservar respostas da ficha e identificação da equipe | `luccalck` | `DaviSouza78` | INT-01 | Base: `feature/passos-futuros` |
| **#15** | ci: homologação formal e sondas de observabilidade (011–012) | `DaviSouza78` | `miguelsenai2024` | INT-03, INT-07, INT-08 | Base: `feature/primeiro-ciclo` |
| **#16** | test: validar conteúdo educativo e smoke de produção (013–014) | `DaviSouza78` | `miguelsenai2024` | INT-04, INT-07 | Base: `feature/passos-011-012-hml-sondas` |
| **#17** | ci: releases verificadas e alertas com recuperação (015–016) | `DaviSouza78` | `miguelsenai2024` | INT-06, INT-08 | Base: `feature/passos-013-014-conteudo-smoke` |
| **#18** | feat: preparar pitch e controle azul-verde (017–018) | `DaviSouza78` | `miguelsenai2024` | INT-07, INT-10 | Base: `feature/passos-015-016-releases-alertas` |
| **#19** | ci: preparar produção com recuperação e painel (019–020) | `DaviSouza78` | `miguelsenai2024` | INT-07, INT-08 | Base: `feature/passos-017-018-pitch-rollout` |
| **#20** | feat: preparar playtest e fortalecer recuperação automática (021–022) | `miguelsenai2024` | `6lucassilvaaa` | INT-02, INT-07 | Base: `feature/passos-019-020-producao-painel` |
| **#21** | feat: rollback manual e métricas DORA (023–024) | `miguelsenai2024` | `6lucassilvaaa` | INT-07, INT-08 | Base: `feature/miguel-md1-etapas-021-022` |
| **#22** | docs: GDD da candidata e preparação do ensaio (025–026) | `miguelsenai2024` | `6lucassilvaaa` | INT-02, INT-07 | Base: `feature/passos-023-024-rollback-dora` |
| **#23** | docs: validar integridade e registrar DORA (027–028) | `miguelsenai2024` | `6lucassilvaaa` | INT-06, INT-08 | Base: `feature/passos-025-026-gdd-ensaio` |
| **#24** | feat: implementar triagem e registrar pitch pendente (029–030) | `miguelsenai2024` | `6lucassilvaaa` | INT-09, INT-10 | Base: `feature/passos-027-028-release-dora` |
| **#25** | ci: automatizar pacote com entrada de vídeo e agendar triagem (031–032) | `6lucassilvaaa` | `luccalck` | INT-09, INT-10 | Base: `feature/miguel-md5-etapas-029-030` |
| **#26** | docs: relatório técnico com evidências reais e aceite da candidata (033–034) | `6lucassilvaaa` | `luccalck` | INT-01, INT-10 | Base: `feature/passos-031-032-pacote-triagem-agendada` |
| **#27** | ci: preparação de release v1.0.0, triagem final e auditoria eliminatória (035–036) | `6lucassilvaaa` | `luccalck` | INT-06, INT-09 | Base: `feature/passos-033-034-relatorio-candidata` |
| **#28** | docs: ficha de entrega, roteiro de banca, URLs e congelamento (freeze) (037–038) | `6lucassilvaaa` | `luccalck` | INT-01, INT-07, INT-10 | Base: `feature/passos-035-036-release-triagem-final` |
| **#29** | docs: entrega final da esteira, auditoria de contribuições e fechamento de bloco (039–040) | `6lucassilvaaa` | `luccalck` | INT-01, INT-05, INT-08, INT-09, INT-10 | Base: `feature/passos-037-038-ficha-banca-freeze` |

---

## 3. Conformidade com os Padrões Git e Conventional Commits

- **Padrão de Mensagens:** 100% dos commits do histórico seguem Conventional Commits em língua portuguesa (`feat:`, `fix:`, `docs:`, `ci:`, `test:`).
- **Sem Auto-Merge:** Todos os Pull Requests foram abertos como draft ou para revisão formal por outro integrante da squad, sem autoaprovação ou bypass de branch protection.
- **Rastreabilidade Total:** Cada commit possui autoria e e-mail autênticos dos integrantes (`luccalck`, `DaviSouza78`, `miguelsenai2024`, `6lucassilvaaa`), sem commits artificiais, anônimos ou forjados.
