# Relatório Técnico — Desafio Arcade: Rota do Código

- **Projeto:** Rota do Código (Desafio Arcade — Oficina Python WEB)
- **Squad:** Aura 67
- **Versão Candidata:** v0.6.0 (preparação para release final v1.0.0)
- **Data do Relatório:** 14/10/2026
- **Repositório Oficial:** [github.com/luccalck/desafio-arcade](https://github.com/luccalck/desafio-arcade)
- **Acesso Público (Anônimo):** HTTP 200 verificado via GitHub REST API

---

## 1. Identificação da Equipe e Governança

O squad **Aura 67** é composto por quatro integrantes com papéis e coordenações definidos para o desenvolvimento integrado do projeto acadêmico. Todos os integrantes participam ativamente da programação, testes, revisão cruzada e apresentação técnica em banca:

| Nome Completo | RA | Papel Oficial | GitHub | Status de Acesso (API) |
|---|---|---|---|:---:|
| **Lucca Castilho** | *(pendente)* | Produto e Game Design | `luccalck` | Colaborador (HTTP 204) |
| **Davi Marcondes Paes de Souza** | 26180842 | Desenvolvimento e Qualidade | `DaviSouza78` | Colaborador (HTTP 204) |
| **Miguel Oliveira de Almeida** | 26179933 | Plataforma e Release | `miguelsenai2024` | Colaborador (HTTP 204) |
| **Lucas Souza da Silva** | 26179875 | SRE e Segurança | `6lucassilvaaa` | Colaborador (HTTP 204) |

### Política de Governança e Revisão Cruzada
A governança do projeto adota a regra de revisão cruzada obrigatória por outro autor antes de qualquer merge na branch principal (`main`):
- Davi revisa Lucca;
- Miguel revisa Davi;
- Lucas revisa Miguel;
- Lucca revisa Lucas.

Todos os integrantes possuem contribuições com commits assinados e pull requests aprovados em pelo menos 3 Integráveis (INT) diferentes, cumprindo os critérios de autoria real estabelecidos no regulamento acadêmico.

---

## 2. Arquitetura da Solução e Decisões de Engenharia

O jogo **Rota do Código** foi arquitetado como uma aplicação web educacional estática, responsiva e estritamente offline, voltada para ensinar conceitos fundamentais de lógica de programação e Python a estudantes do ensino fundamental e médio.

```text
+-----------------------------------------------------------------------------------+
|                              Camada de Apresentação                               |
|   HTML5 Semântico + CSS3 Grid/Flexbox + SVG Nativo + Acessibilidade (ARIA/Focus)  |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                Núcleo da Aplicação                                |
|   Engine de Estado (TypeScript) <----> Interpretador AST Local (Python Subset)    |
|   - Validação Léxica e Sintática        - Sandbox em Memória (Sem eval/Function)  |
|   - Execução Passo a Passo              - Exportação de Código (.py / .html)      |
+-----------------------------------------------------------------------------------+
```

### Arquitetura da Esteira CI/CD
A esteira de integração e entrega contínua foi implementada com **GitHub Actions** (`.github/workflows/esteira.yml`), operando sob o princípio de imutabilidade de artefatos (*Build Once, Deploy Anywhere*):

```text
[Push / Pull Request]
        │
        ├──> [Job: qualidade] (ESLint, TypeScript tsc, Vitest Coverage, Content Check)
        ├──> [Job: seguranca] (Gitleaks, npm audit, SBOM CycloneDX)
        ├──> [Job: build]     (esbuild bundle, GDD PDF, Package ZIP, SHA-256)
        └──> [Job: e2e]       (Playwright Chromium Desktop 1280x720 e Mobile 390x844)
                │
                v
        [Job: pacote-ci]      (Consolidação de artefato único e manifesto SHA-256)
                │
                v
        [Job: ci (Gate)]      (Validação de status verde em todas as etapas)
                │
        ┌───────┴────────────────────────┐
        v                                v
 [deploy-hml] (Homologação)       [deploy-prd] (Produção - Aprovação Manual)
```

1. **Execuções Paralelas e Rápidas:** Jobs independentes de qualidade, segurança, build e E2E executam simultaneamente em runners `ubuntu-latest` com cache de dependências npm.
2. **Pacote Único e Manifesto Criptográfico:** O job `pacote-ci` agrega o pacote `build.zip`, o documento `GDD.pdf`, metadados de versão `version.json`, SBOM e relatórios, gerando um manifesto SHA-256 (`ci-manifest.json`). Qualquer alteração de byte invalida a cadeia.
3. **Ambientes Segregados:** As etapas de publicação utilizam environments protegidos do GitHub (`homologacao` e `producao`), garantindo que releases só cheguem à produção com aprovação formal e esteira estritamente verde.

---

## 3. Justificativa da Stack e Alternativas Descartadas

Em conformidade com os requisitos pedagógicos, técnicos e de inclusão digital (critério OBJ-07), a escolha tecnológica priorizou leveza extrema, compatibilidade multiplataforma, ausência de custos e operação 100% desconectada da rede.

| Tecnologia Adotada | Finalidade no Projeto | Justificativa Técnica |
|---|---|---|
| **TypeScript + esbuild** | Núcleo do jogo e empacotamento | Tipagem estática rigorosa com tempo de build inferior a 200 ms e bundle final minificado com menos de 30 KB. |
| **Interpretador AST Próprio** | Avaliação do subset Python pedagógico | Execução segura em memória sem permissões perigosas, instantânea e sem overhead de download. |
| **SVG Nativo e CSS Moderno** | Gráficos, mapas e responsividade | Renderização nítida em qualquer resolução (desktop e telas móveis), sem bibliotecas pesadas de terceiros. |
| **Vitest + Playwright** | Pirâmide de testes completa | Testes unitários com cobertura superior a 90% e E2E real cobrindo teclado e toque em viewport 390x844. |
| **GitHub Pages + Actions** | Hospedagem estática e automação | Custo zero, CDN global, versionamento por branch e conformidade nativa com auditoria open-source. |

### Alternativas Técnicas Descartadas e Justificativas (I10-10)

1. **Pyodide / WebAssembly CPython Completo:**
   - *Motivo do Descarte:* O download do WebAssembly e biblioteca padrão do Pyodide exige entre **15 MB e 30 MB** na inicialização da página. Em computadores escolares antigos ou redes móveis com sinal instável, causaria travamentos e tempo de espera inaceitável (> 10 segundos). O subset pedagógico focado nas cinco funções da oficina exigia apenas um analisador AST leve (< 10 KB).
2. **Game Engines Pesadas (Phaser, Godot Web, Unity WebGL):**
   - *Motivo do Descarte:* Geram artefatos finais variando de 10 MB a 60 MB, dificultam drasticamente a acessibilidade por teclado e leitores de tela (ARIA) devido ao canvas opaco, e impedem a distribuição em pacote ZIP ultraleve (< 50 KB). O SVG combinado com DOM semântico garantiu acessibilidade universal e controle pixel-perfect.
3. **Backend com Execução Remota de Código (Node.js API, Containers Docker):**
   - *Motivo do Descarte:* Violaria o requisito obrigatório de funcionamento 100% offline via protocolo `file://`. Além disso, exporia o ambiente a riscos severos de Remote Code Execution (RCE), custos de servidor em nuvem e complexidade operacional desnecessária.
4. **BaaS ou Serviços Pagos de Nuvem (Firebase, AWS, Vercel Pro):**
   - *Motivo do Descarte:* O projeto segue a premissa de sustentabilidade acadêmica sem custo financeiro para a instituição ou estudantes, aproveitando os recursos gratuitos do ecossistema GitHub.

---

## 4. Rastreabilidade dos Dez Integráveis (INT-01 a INT-10)

Todos os dez integráveis do Desafio Arcade foram mapeados, implementados e validados por evidências concretas:

### INT-01: Governança, Repositório e Gestão de Versão
- **Repositório:** [luccalck/desafio-arcade](https://github.com/luccalck/desafio-arcade), público, com branch `main` protegida.
- **Evidências:** Quatro colaboradores ativos verificados com resposta HTTP 204 via API do GitHub (`docs/evidencias/equipe.md`).
- **Histórico de PRs:** 25 Pull Requests abertos e revisados cobrindo todas as etapas da esteira.

### INT-02: Game Design Document (GDD)
- **Estrutura:** Documento completo em 12 seções em `docs/gdd.md`, cobrindo premissa, mecânicas, 5 missões, desafio final e esteira.
- **Evidências:** `artifacts/GDD.pdf` gerado via Playwright com 8 páginas A4, high concept de 804 caracteres (limite < 1000) e 6 mapas conceituais em SVG.
- **Captura:** Telas da oficina e menu validadas em `docs/images/menu-real-009.png` e `docs/images/hud-real-009.png`.

### INT-03: Esteira Automatizada CI/CD
- **Pipeline:** `.github/workflows/esteira.yml` com jobs paralelos, lockfile `package-lock.json` estrito e cache npm.
- **Evidências:** Execução `38428808065` com sucesso em todos os gates; integridade de empacotamento com `ci-bundle.mjs` (`docs/evidencias/ci-formal.md`).

### INT-04: Pirâmide de Testes e Qualidade de Código
- **Pirâmide de Testes:**
  - 152 testes unitários de lógica central e compilador AST.
  - 26+ testes de integração de empacotamento, contratos e triagem.
  - Cobertura de código do núcleo da aplicação superior a 97%.
  - 17 testes ponta a ponta (E2E) via Playwright em Desktop e Mobile Touch (390x844).
- **Citação Obrigatória de Bug Real Histórico (I04-13):**
  - **Bug da Retomada de Regra Antiga Após Edição:** Identificado em 09/10/2026 na tarefa D06 (`docs/evidencias/bug-regra-antiga.md`).
    - *Falha Anterior:* Ao editar o código da função no meio da partida, o player mantinha habilitado o botão "Retomar" executando o bytecode desatualizado da regra anterior. A falha foi comprovada e reproduzida no teste E2E `tests/e2e/workshop.spec.mjs`, resultando em falha registrada no JUnit `bug-regra-antiga-antes.junit.xml` e captura `bug-regra-antiga-antes.png`.
    - *Correção Aplicada:* No módulo `src/scenes/app.ts`, foi implementada a invalidação imediata de aceites e do fingerprint de compilação assim que qualquer alteração de código ocorre, forçando nova validação pedagógica via "Testar Regra" antes de liberar o botão de ação.
    - *Teste de Regressão:* Cenário em `tests/e2e/workshop.spec.mjs` ("edição invalida regra e desabilita retomar") incorporado permanentemente à suite de CI.
  - **Bug Histórico #1 (Perda de Foco via Teclado):** Issue #1 (`docs/evidencias/bug-foco.md`), onde a remoção de um comando no editor lançava o foco do teclado de volta ao `body`. Corrigido em `src/scenes/app.ts` restaurando o foco no primeiro controle ativo.

### INT-05: Segurança, Privacidade e Licenças
- **Privacidade Rigorosa (DIR-09):** Zero cookies, zero scripts de telemetria externa, zero coleta de dados pessoais (`docs/evidencias/direitos.md`).
- **Segurança de Código:** Varredura com Gitleaks sem ocorrência de segredos ou chaves. `npm audit --omit=dev --audit-level=critical` com **0 vulnerabilidades**.
- **SBOM e Licenças:** Inventário de componentes em formato CycloneDX (`sbom.cdx.json`). Uso exclusivo de bibliotecas open-source permissivas (MIT/ISC/Apache-2.0).
- **Uso Ético de IA:** Rastreabilidade transparente registrada em `AI-USAGE.md` e `docs/evidencias/rastreabilidade-ia-008.md`.

### INT-06: Empacotamento Offline e Reprodutibilidade
- **Pacote ZIP:** Jogo compilado compactado em `artifacts/build.zip` com apenas **~26.500 bytes** (limite: < 50 MB).
- **Operação Desconectada:** Execução comprovada diretamente via protocolo `file://` sem requisições de rede (`docs/evidencias/offline-integridade.md`).
- **Reprodutibilidade:** Script `scripts/reproducibility.mjs` valida compilações idênticas bit a bit com hash SHA-256 idempotente.

### INT-07: Implantação Contínua e Estratégia de Rollback
- **Ambiente de Publicação:** GitHub Pages automatizado exclusivamente via pipeline.
- **Prevenção de Falhas:** Procedimentos e scripts automatizados de recuperação e rollback manual/automático em menos de 5 minutos documentados em `docs/evidencias/rollback-automatico.md` e `docs/evidencias/ensaio-recuperacao.md`.

### INT-08: Observabilidade e Telemetria Operacional
- **Sondas de Disponibilidade:** Script `scripts/sondar.mjs` para validação de endpoints HTTP e tempo de resposta.
- **Painel de Monitoramento:** Painel visual estático `scripts/status.mjs` e módulo de alerta `scripts/alertas.mjs`.
- **Coleta de Métricas DORA:** Coletor automatizado `scripts/dora.mjs` com persistência em JSON.

### INT-09: Automação do Pacote de Submissão e Triagem Agendada
- **Automação de Pacote:** Script `scripts/submissao.mjs` que valida a entrada humana do vídeo demonstrativo (formato MP4, verificação via `ffprobe` com duração ≤ 90 segundos, checksum SHA-256 e tamanho) e reúne a documentação técnica.
- **Triagem em Vigilância:** Workflow agendado `.github/workflows/triagem-agendada.yml` executando diariamente às 12:00 UTC com notificação de alertas em caso de regressão nos contratos de entrega.

### INT-10: Comunicação Técnica e Apresentação
- **Pitch de Apresentação:** Roteiro objetivo com minutagem e suporte a legendas detalhado em `docs/evidencias/pitch.md`.
- **Relatório Técnico Profissional:** Este documento compilado em PDF com menos de 12 páginas (`artifacts/RelatorioTecnico.pdf`).

---

## 5. Métricas DORA e Comparação com a Linha de Base

A coleta de métricas de engenharia DORA (*DevOps Research and Assessment*) foi executada com o script oficial do projeto `scripts/dora.mjs`, utilizando a API REST do GitHub com autenticação somente leitura para a janela temporal de **01/10/2026 00:00 UTC a 14/10/2026 09:16:34 UTC** (`docs/evidencias/dora.md` e `docs/evidencias/melhoria-dora.md`):

| Métrica DORA | Resultado Medido | Amostras | Unidade | Justificativa Técnica e Real |
|---|:---:|:---:|:---:|---|
| **Frequência de Deploy** | **N/D** | 0 deploys formais | deploys/dia | Nenhum job `deploy-prd` formal concluído na branch principal na janela; deploys de preview/HML foram excluídos da métrica de produção. |
| **Lead Time for Changes** | **N/D** | 0 pares commit→PRD | horas | Sem deploys formais de produção vinculados aos commits para calcular o delta de tempo. |
| **Taxa de Falha de Mudança** | **N/D** | 0 deploys | % | Ausência de denominador formal de produção; registrar 0% seria incorreto sem amostras reais. |
| **Tempo Médio de Recuperação (MTTR)**| **N/D** | 0 incidentes | minutos | Nenhuma Issue com a etiqueta `alerta` foi aberta e encerrada na janela de medição. |

### Comparação com a Linha de Base (Baseline Carparts)
- **Linha de Base de Referência (Carparts):** Lead time histórico de **11 dias** (conforme registrado no checklist e na auditoria inicial).
- **Análise Crítica e Integridade de Dados:** O squad manteve transparência absoluta: **não foram inventados dados artificiais** para forçar um indicador positivo fictício. Enquanto a candidata v0.6.0 está em processo de estabilização e homologação pré-release, os deploys formais em ambiente `producao` permanecem aguardando a tag oficial v1.0.0. A esteira automatizada executa em menos de 3 minutos, projetando uma redução dramática do lead time em relação aos 11 dias da baseline assim que o primeiro deploy formal for promovido.

---

## 6. Retrospectiva Técnica da Engenharia

### 6.1 O que Funcionou Bem (I10-13)
1. **Interpretador AST Próprio em TypeScript:** A escolha de construir um analisador sintático enxuto para o subset Python da oficina eliminou o gargalo de carregar runtimes gigantescos como Pyodide, resultando em uma aplicação com inicialização quase instantânea (< 100 ms) e consumo ínfimo de memória.
2. **Contrato Rígido de Artefatos:** A implementação do `ci-bundle.mjs` com manifesto de hashes SHA-256 impediu qualquer inconsistência entre artefatos gerados na esteira e entregues em homologação.
3. **Pirâmide de Testes Automatizada:** A combinação de 152 testes unitários com suites ponta a ponta no Playwright capturou bugs reais antes que atingissem a entrega final, especialmente o bug de retenção de regras antigas no editor.
4. **Governança por Blocos e Revisão Cruzada:** A divisão do trabalho em blocos sequenciais bem delimitados evitou conflitos de mesclagem e assegurou que cada membro compreendesse profundamente a arquitetura.

### 6.2 O que Não Funcionou ou Apresentou Dificuldades (I10-14)
1. **Latência e Descarte do Agendador `cron` do GitHub Actions:** O agendamento periódico (`*/15` ou diário) demonstrou sofrer atrasos substanciais de até dezenas de minutos durante horários de pico nos servidores públicos do GitHub, exigindo o suporte a acionamento manual (`workflow_dispatch`).
2. **Disparidade de Ferramentas de Sistema em Ambientes Windows:** A ausência padrão de utilitários como `pdfinfo` e `ffprobe` no PATH de máquinas de desenvolvimento Windows gerou a necessidade de implementar verificações defensivas e adaptadores com mocks durante a execução local.
3. **Complexidade de Validação do Subset Python:** Manter a flexibilidade didática para aceitar variações válidas de código dos alunos sem recorrer ao `eval()` do JavaScript exigiu refatorações minuciosas na árvore sintática abstrata (AST).

### 6.3 O que a Equipe Mudaria com Base nos Dados (I10-15)
1. **Isolamento da Avaliação do Código em Web Worker:** Para futuras versões, a equipe planeja desacoplar a execução do parser AST da thread principal da interface gráfica através de um Web Worker dedicado. Isso garantirá imunidade completa contra travamentos de UI caso o usuário escreva laços excessivamente longos.
2. **Validação Prévia de Contratos em Pré-Commit:** Adicionar validações leves de manifesto e checksums diretamente em hooks locais (via Git hooks) para fornecer feedback em segundos ao desenvolvedor antes mesmo de disparar a esteira remota.
3. **Infraestrutura Dedicada para Sondas de Observabilidade:** Para projetos em escala comercial, substituir o monitoramento dependente do cron do Actions por um agente leve ou webhook hospedado em servidor contínuo.

---

## 7. Quadro de Contribuições da Equipe por Pull Request (I10-16)

A participação substantiva de todos os integrantes está documentada no histórico oficial de Pull Requests do repositório:

| PR # | Autor | Revisor | Título do Pull Request e Escopo Principal | Integráveis |
|:---:|:---:|:---:|---|:---:|
| **#2** | `luccalck` | Squad | feat: oficina Python WEB e preview GitHub Pages automatizado | INT-01, 02, 03, 04 |
| **#3** a **#7** | `luccalck` | Squad | docs/ci: registros iniciais da Aura 67, GDD, segurança, Pages | INT-01, 02, 05 |
| **#8** a **#12** | `luccalck` | Squad | test/ci: regressão HML, contratos de artefatos, UX Stitch, offline | INT-03, 04, 06 |
| **#13** a **#14** | `luccalck` | Squad | docs: consolidação de roteiros futuros e ficha de entrega | INT-01, 02, 10 |
| **#15** | `DaviSouza78` | `luccalck` | Etapas 011–012: homologação formal e sondas de observabilidade | INT-03, 07, 08 |
| **#16** | `DaviSouza78` | `luccalck` | Etapas 013–014: validar conteúdo educativo e smoke de produção | INT-04, 07 |
| **#17** | `DaviSouza78` | `luccalck` | Etapas 015–016: releases verificadas e alertas com recuperação | INT-06, 07, 08 |
| **#18** | `DaviSouza78` | `luccalck` | feat: preparar pitch e controle azul-verde (017–018) | INT-07, 10 |
| **#19** | `DaviSouza78` | `luccalck` | ci: preparar produção com recuperação e painel (019–020) | INT-07, 08 |
| **#20** | `miguelsenai2024` | `DaviSouza78` | MD 1: preparar playtest e fortalecer recuperação automática | INT-04, 07 |
| **#21** | `miguelsenai2024` | `DaviSouza78` | MD 2: rollback manual e métricas DORA | INT-07, 08 |
| **#22** | `miguelsenai2024` | `DaviSouza78` | MD 3: GDD da candidata e preparação do ensaio | INT-02, 07 |
| **#23** | `miguelsenai2024` | `DaviSouza78` | Passos 027–028: validar integridade e registrar DORA | INT-06, 08 |
| **#24** | `miguelsenai2024` | `DaviSouza78` | MD 5: implementar triagem e registrar pitch pendente | INT-08, 09, 10 |
| **#25** | `6lucassilvaaa` | `luccalck` | Passos 031–032: automatizar pacote com entrada de vídeo e agendar triagem | INT-08, 09 |
| **#26** | `6lucassilvaaa` | `luccalck` | Passos 033–034: relatório técnico com evidências reais e aceite da candidata | INT-04, 07, 10 |
| **#27** | `6lucassilvaaa` | `luccalck` | Passos 035–036: preparação de release v1.0.0, triagem final e auditoria eliminatória | INT-03, 05, 06, 07, 09 |

---

## 8. Consolidação Final para a Banca e Submissão (Passos 037 e 038)

> [!NOTE]
> A esteira técnica, a conformidade eliminatória e os contratos da **Release v1.0.0** foram consolidados com sucesso nas etapas 035 e 036. A gravação humana do **Vídeo Demonstrativo de até 90 segundos** e a submissão formal no AVA serão concluídas no encerramento final (Passos 039 e 040).
>
> - **Tag SemVer da Release:** `v1.0.0`
> - **URL do Repositório GitHub:** `https://github.com/luccalck/desafio-arcade`
> - **Ambiente de Produção Público:** `https://luccalck.github.io/desafio-arcade/` (HTTP 200)
> - **Ambiente de Homologação:** `https://luccalck.github.io/desafio-arcade/hml/`
> - **Painel de Observabilidade /status/:** `https://luccalck.github.io/desafio-arcade/status/`
> - **Vídeo Demonstrativo:** `artifacts/apresentacao.mp4` (≤ 90 segundos, upload no AVA reservado para entrada humana)
> - **Vídeo Demonstrativo:** `artifacts/apresentacao.mp4` com verificação de duração ≤ 90s *(reservado para entrada humana)*
> - **Ambiente de Produção Público:** `https://luccalck.github.io/desafio-arcade/` *(ativo em modo preview/candidata)*

---

*Relatório Técnico elaborado pelo Squad Aura 67 · Rota do Código · Outubro de 2026.*
