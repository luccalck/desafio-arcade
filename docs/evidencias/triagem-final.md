# Etapa 036 — Triagem Final e Auditoria Eliminatória

**Responsável:** Lucas Souza da Silva (`6lucassilvaaa`)  
**Data:** 14/10/2026  
**Versão Avaliada:** `v1.0.0` (candidata à entrega)  
**Checkpoint:** G7  

---

## 1. Auditoria das Condições Eliminatórias da Rubrica

Foi realizada uma auditoria rigorosa de todas as condições eliminatórias estipuladas no regulamento acadêmico e na ficha de avaliação:

| Critério Eliminatório | Requisito da Avaliação | Resultado da Auditoria | Evidência / Status |
|---|---|:---:|---|
| **EL-01 / I05-22** | Sem plágio ou uso de ativo sem licença/autorização | **CONFORME** | Todos os mapas, ilustrações, wireframes e diagramas foram gerados por código SVG ou capturados diretamente da aplicação. Bibliotecas de terceiros (esbuild, Vitest, Playwright, fflate, Ajv) possuem licenças permissivas (MIT/ISC/Apache-2.0) inventariadas em `THIRD_PARTY.md` e `LICENSE.txt`. |
| **EL-02 / I07-03** | Produção exclusivamente pela esteira automatizada | **CONFORME** | A branch `gh-pages` e os artefatos de publicação são manipulados unicamente pelo bot `github-actions[bot]` através do workflow `.github/workflows/esteira.yml`. Zero commits ou alterações manuais foram realizados no ambiente de publicação. |
| **EL-03 / I05-23** | Zero credenciais ou segredos reais no repositório | **CONFORME** | Varredura completa com Gitleaks em todo o histórico (`fetch-depth: 0`) executada sem nenhum achado de credencial. Credenciais de API utilizadas em sessões locais operam exclusivamente em memória/variáveis de ambiente locais e nunca foram versionadas em código ou logs. |
| **EL-04 / I03-09** | Pipeline reproduzível a partir de clone limpo | **CONFORME** | A esteira CI executa em containers limpos `ubuntu-latest` com `npm ci` estrito via `package-lock.json`, executando lint, 260 testes unitários/integração, 36 testes Playwright E2E, build estática, geração de PDF e empacotamento sem depender de arquivos locais. |
| **EL-05** | Regra do prazo original do enunciado | **CONFORME** | Todo o histórico de execução, commits Conventional Commits e PRs rastreia com honestidade o desenvolvimento contínuo da squad, sem falsificação cronológica ou antecipação artificial de datas. |

---

## 2. Auditoria da Triagem de Submissão (I09-19, I09-20)

A integridade do pacote de submissão foi auditada através do validador oficial `scripts/triagem.mjs` e do executor `scripts/triagem.sh`:

1. **Validação Estrutural e Contratos:**
   - `build.zip`: Válido, contendo `index.html`, `LEIA-ME.txt`, `game.js`, `style.css` e metadados com 29.003 bytes (< 50 MB regulamentares).
   - `GDD.pdf`: Válido com 8 páginas A4, contendo as 4 seções obrigatórias (premissa, high concept, gênero/plataforma, mecânicas-core).
   - `RelatorioTecnico.pdf`: Válido com 6 páginas A4 (< 12 páginas) cobrindo os 10 INTs, bugs reais, métricas DORA e retrospectiva.
2. **Entrada de Vídeo e Triagem em Modo Vigilância:**
   - O validador rejeita qualquer submissão formal sem o arquivo real `pitch.mp4` (vídeo gravado por humanos com duração ≤ 90s verificado via `ffprobe`).
   - O workflow agendado `.github/workflows/triagem-agendada.yml` opera em modo de vigilância contínua (`--modo=vigilancia`), monitorando a integridade dos contratos e disparando alertas (`notifyAlert`) via GitHub Issues com a label `alerta` em caso de regressão operacional até o momento da banca avaliadora.
3. **Condições Pendentes para a Submissão Formal Definitiva:**
   - Gravação humana do vídeo demonstrativo (Passo 029);
   - Preenchimento do RA numérico de Lucca Castilho em `SQUAD.md`;
   - Definição do horário oficial da variável `PRAZO` no ambiente da esteira;
   - Aprovação final de Lucca Castilho (`luccalck`) no PR antes do merge na branch protegida `main`.
