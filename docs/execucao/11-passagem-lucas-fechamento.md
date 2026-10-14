# Passagem técnica 031–040 — Lucas → Fechamento Coletivo e Banca

**Data:** 14/10/2026
**Responsável do Bloco 4:** Lucas Souza da Silva (`6lucassilvaaa`)
**Papel oficial:** SRE e Segurança
**Destino:** Squad Aura 67 e Banca Examinadora

Este documento registra a conclusão técnica do **Bloco 4 (Passos 031 a 040)**, consolidando todos os contratos, artefatos, pipelines, relatórios e auditorias sob responsabilidade de Lucas Souza, preparando a equipe para a submissão acadêmica final e defesa perante a banca examinadora.

---

## 1. Síntese das Entregas do Bloco 031–040

| MD | Etapas | Entregas Principais | Referências e Evidências |
|---|---|---|---|
| **MD 1** | 031 / 032 | `scripts/submissao.mjs`, workflow `.github/workflows/entrada-video.yml`, workflow `.github/workflows/triagem-agendada.yml` (cron diário `0 12 * * *`), modo vigilância e disparo de alertas via GitHub Issues. | PR #25; `docs/pacote-submissao.md`, `docs/evidencias/triagem-agendada.md`. |
| **MD 2** | 033 / 034 | Relatório técnico completo em `docs/relatorio.md` e gerador PDF `scripts/relatorio-pdf.mjs` gerando `artifacts/RelatorioTecnico.pdf` (6 páginas A4, %PDF-1.4). Suíte de estabilidade com 260 testes unit/integ, 36 E2E Playwright e conferência formal de colaboradores (HTTP 204). | PR #26; `docs/relatorio.md`, `artifacts/RelatorioTecnico.pdf`, `docs/evidencias/aceite-candidata.md`. |
| **MD 3** | 035 / 036 | Proveniência da release v1.0.0, contratos SemVer, notas de versão em `docs/notas-versao.md`, reprodutibilidade bit a bit do `build.zip` (29.001 bytes). Auditoria eliminatória das condições EL-01 a EL-05 com 100% de conformidade. | PR #27; `docs/evidencias/release-final.md`, `docs/evidencias/triagem-final.md`. |
| **MD 4** | 037 / 038 | Consolidação das respostas dos 49 campos da ficha em `docs/gestao/ficha-entrega.md`. Roteiro de banca estruturado em `docs/apresentacao-banca.md`. Verificação externa de URLs (repo, Pages, HML) e formalização da política de Code Freeze (`CR-09`, `CR-10`). | PR #28; `docs/gestao/ficha-entrega.md`, `docs/apresentacao-banca.md`, `docs/evidencias/smoke-final.md`, `docs/operacao-rollback.md`. |
| **MD 5** | 039 / 040 | Conferência de artefatos da esteira, protocolo de envio no AVA e recibo. Roteiro de demonstração ao vivo (5 min) com falha e rollback em < 5 min. Auditoria das contribuições da squad (28 PRs) comprovando aptidão de todos ao fator F = 1,0. Decisão formal sobre o concurso externo. | PR #29; `docs/evidencias/entrega-banca.md`, `docs/contribuicoes.md`, `docs/concurso-decisao.md`, `docs/evidencias/auditoria-encerramento.md`. |

---

## 2. Ações Humanas Restantes para o Encerramento Definitivo

Com a conclusão deste quinto MD de Lucas, todo o desenvolvimento técnico, scripts, automações e auditorias do repositório estão formalizados. Restam exclusivamente as seguintes ações humanas coletivas:

1. **Preenchimento do HTML Original e Geração do TXT:**
   - Abrir `Avaliação.html` via Live Server no navegador.
   - Transcrever as informações consolidadas em `docs/gestao/ficha-entrega.md`.
   - Clicar no botão para gerar o arquivo `DevOps_Avaliacao_Arcade_Aura_67.txt`.
2. **Preenchimento do RA de Lucca Castilho:**
   - Inserir o RA numérico oficial em `SQUAD.md` antes da submissão final.
3. **Gravação Física do Vídeo Pitch (≤ 90s):**
   - Gravação pelos quatro integrantes com apresentação do jogo e demonstração, salvando em `artifacts/apresentacao.mp4`.
4. **Submissão no AVA Institucional:**
   - Fazer upload do pacote de submissão, do relatório técnico PDF e da ficha TXT no AVA e arquivar o recibo/comprovante com data e hora.
5. **Ensaio Coletivo e Participação na Banca:**
   - Realizar o ensaio cronometrado da fala (10 minutos divididos igualmente) e da demonstração técnica ao vivo (5 minutos), conforme roteiro em `docs/apresentacao-banca.md`.
   - Participação dos quatro no dia oficial da banca para ratificar o fator individual $F = 1{,}0$.
