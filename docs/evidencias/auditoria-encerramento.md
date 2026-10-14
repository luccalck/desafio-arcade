# Relatório de Auditoria de Encerramento e Fator Individual

**Squad:** Aura 67
**Data:** 14/10/2026
**Responsável:** Lucas Souza da Silva (`6lucassilvaaa`)
**Papel oficial:** SRE e Segurança
**Etapa:** 040 — Auditar fator individual e condicionais restantes
**Branch de trabalho:** `feature/passos-039-040-entrega-contribuicao`

---

## 1. Auditoria do Fator Individual F (SQ-18, B-15)

A fórmula oficial da avaliação estabelece:
$$\text{Nota Final} = (0{,}7 \times A + 0{,}3 \times B) \times F$$

Onde:
- **Componente A (Pesos dos 10 INTs):**
  - INT-01 (10%), INT-02 (8%), INT-03 (15%), INT-04 (12%), INT-05 (10%), INT-06 (10%), INT-07 (12%), INT-08 (10%), INT-09 (8%), INT-10 (5%). Total: 100%.
- **Componente B (Pesos da Banca):**
  - Inovação e originalidade (25%), Viabilidade técnica e execução (25%), Qualidade da jogabilidade (30%), Apresentação (20%). Total: 100%.
- **Regra de Fator Individual F:**
  - $F = 1{,}0$: Commits e PRs aprovados em pelo menos 3 INTs distintos E participação presencial na banca com domínio de sua contribuição.
  - $F = 0{,}8$: Commits e PRs em apenas 2 INTs.
  - $F = 0{,}5$: Commits e PRs em 1 ou nenhum INT.

### Tabela de Auditoria Individual de Elegibilidade ao F = 1,0:

| Integrante | Commits | PRs Autorais | INTs Cobertos com Prova Git | Aptidão Técnica ao F=1,0 | Condição Humana Restante |
|---|---:|---|---|:---:|---|
| **Lucca Castilho** (`luccalck`) | 56 | #2 a #14 | INT-01, INT-02, INT-03, INT-04, INT-05, INT-06 (6 INTs) | **SIM (SQ-10)** | Presença física e domínio na banca (SQ-14) |
| **Davi Marcondes** (`DaviSouza78`) | 10 | #15 a #19 | INT-03, INT-04, INT-06, INT-07, INT-08 (5 INTs) | **SIM (SQ-11)** | Presença física e domínio na banca (SQ-15) |
| **Miguel Oliveira** (`miguelsenai2024`) | 11 | #20 a #24 | INT-02, INT-06, INT-07, INT-08, INT-09, INT-10 (6 INTs) | **SIM (SQ-12)** | Presença física e domínio na banca (SQ-16) |
| **Lucas Souza** (`6lucassilvaaa`) | 10 | #25 a #29 | INT-01, INT-06, INT-09, INT-10 (4 INTs) | **SIM (SQ-13)** | Presença física e domínio na banca (SQ-17) |

---

## 2. Auditoria de Condicionais e Critérios de Exclusão

Para evitar a marcação fictícia de itens que não se aplicam à arquitetura definida pelo squad:

| Critério Condicional | Decisão / Estado Arquitetural | Justificativa Técnica e Documentação |
|---|---|---|
| **Canário** | Não Adotado | Adotada a estratégia azul-verde com promoção e rollback atômicos (< 5 min), mais segura para SPA estática. |
| **Engine Godot (ARQ-10)** | Não Adotado | Projeto implementado em TypeScript/HTML/SVG nativo com parser AST leve, dispensando engine pesada no navegador. |
| **Ranking / Telemetria / Cookies (DIR-09)** | Rejeitado | Privacidade rigorosa respeitando a LGPD: sem telemetria, cookies, cadastro ou envio de código a servidores externos. |
| **Opal / AI Studio em runtime** | Rejeitado | Zero dependências de IA generativa em runtime. Uso de IA restrito à assistência no desenvolvimento e documentação pré-merge. |
| **Concurso Externo (CON-01 a CON-11)** | Não Participante | Decisão deliberada do squad de foco exclusivo na avaliação da UC, formalizada em `docs/concurso-decisao.md`. |
| **Botão Enviar por E-mail (FIC-39)** | Desativado | A ficha oficial regulamentar é o arquivo `DevOps_Avaliacao_Arcade_Aura_67.txt` anexado ao AVA. |

---

## 3. Auditoria das Condições Eliminatórias da Disciplina

1. **EL-01 / I05-22 — Plágio e Licenciamento:** 100% das imagens, SVGs e diagramas foram gerados pelo squad. Dependências externas permissivas (MIT/BSD/Apache) catalogadas em `THIRD_PARTY.md` e validadas por SBOM CycloneDX.
2. **EL-02 / I07-03 — Alteração Manual de Produção:** Nenhuma alteração foi realizada diretamente na branch `gh-pages` ou em produção. Todas as publicações são realizadas exclusivamente pela esteira automatizada (`esteira.yml` e `rollback.yml`).
3. **EL-03 / I05-23 — Credenciais e Segredos:** Gitleaks executado no histórico completo sem ocorrências de credenciais reais ou segredos.
4. **EL-04 / I03-09 — Reprodutibilidade desde Clone Limpo:** Pipeline executada integralmente em runner `ubuntu-latest` com lockfile estrito (`npm ci`).
5. **EL-05 — Honestidade Cronológica:** Nenhuma data foi retroagida. Pendências não realizadas estão documentadas transparentemente em `docs/execucao/05-pendencias-por-passo.md`.
