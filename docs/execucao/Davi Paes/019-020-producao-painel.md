# MD 5/5 — Etapas 019–020: producao painel

**Responsável:** Davi Paes · conta real esperada: `DaviSouza78`. **Organização atual:** cinco MDs deste integrante, sem reduzir as dez etapas originais. Os números 019/020 continuam no controle e no registro único de pendências. A preparação destes prompts por Lucca/IA não constitui contribuição do colega.

## Prompt de execução do arquivo completo

Leia este arquivo integralmente e execute **as etapas 019 e 020, nessa ordem**, com suas fontes, entradas, tarefas, checks e validações completos abaixo. Expressões como “este passo” nas seções de uma etapa se referem àquela etapa; o pedido para executar este MD abrange ambas. Não executar o próximo MD automaticamente.

1. Inspecione o clone e preserve alterações. Leia SQUAD, checklist, pendências, GDD e a passagem do bloco anterior; não presuma que a branch padrão foi aprovada ou integrada na main.
2. Confirme a identidade Git/GitHub real de Davi Paes, conta `DaviSouza78`, antes de qualquer commit. **Faça commit pela própria conta GitHub do responsável**, sem configurar a identidade de outra pessoa ou inventar e-mail. Lucca não executa estas etapas usando a identidade dos colegas.
3. Execute primeiro a etapa 019; registre provas e pendências na seção **Passo 019** do registro único. Depois execute a etapa 020, respeitando suas entradas, e registre **Passo 020**. Se faltar aceite humano, avance apenas preparações independentes permitidas; não invente a entrada nem libere produção.
4. Use uma branch curta real para este par, sugerida nas duas etapas. Se ela já foi criada na primeira etapa, reutilize-a na segunda; não repetir git switch -c. Se o PR do par já existe, atualize-o com commits e descrição reais em vez de criar PR duplicado. Faça commits substantivos e PR(s) revisáveis conforme o trabalho exigir; cinco MDs não significam somente cinco commits, nem revisão dispensada. Nunca dividir artificialmente commits para fabricar participação.
5. Preserve a diferenciação entre preparação, execução e aceite de G0–G8. Os roteiros C01/C02, P01–P07, D01–D07, R01–R07 e S01–S06 e os IDs do checklist continuam válidos. Não aceitar o par enquanto parte do trabalho realizável foi omitida; pendências humanas/finais devem ficar explícitas.
6. Ao terminar, atualizar checklist somente com provas, controle de ambas as etapas, AI-USAGE e pendências. Relatar arquivos, comandos, resultados, commits/PR/CI, revisão real e próximo MD. Ao concluir o quinto MD, registrar passagem do bloco; recebimento pelo colega é ação humana, não declaração da IA.

Os dados de equipe já confirmados estão em SQUAD; os RAs foram adiados e não devem ser inventados ou solicitados repetidamente. Estes prompts não alteram a decisão WEB/offline, a rubrica ou os critérios eliminatórios. Referências locais são relativas ao mesmo clone e os caminhos Windows originais são contexto; em outro computador localizar o clone real.

## Ordem e dependências preservadas

| Etapa | Entradas originais | Destino de evidências/pendências |
|---|---|---|
| [019](#etapa-019) | 011, 012, 014, 015, 016, 018 | Controle/registro único, seção 019 |
| [020](#etapa-020) | 012, 016, 019 | Controle/registro único, seção 020 |

## Etapa 019

### Entregar produção com aprovação e azul-verde

**Responsável:** Davi Paes · bloco 2. **Papel oficial proposto:** Desenvolvimento e Qualidade. **Revisor proposto:** Miguel Oliveira (conta indicada em SQUAD; revisão efetiva ainda precisa ocorrer).
**INT:** INT-03/07/06. **Roteiros preservados:** R05. **Checkpoint:** G4.
**Dependências de execução:** 011, 012, 014, 015, 016, 018. Dependências técnicas vêm de números anteriores, do mesmo bloco ou do bloco já entregue. Revisões/dados humanos não dependem da vez de implementar. Gates continuam G0→G8.

- [ ] Trabalho implementado/documentado com autoria real.
- [ ] Validações executadas e evidências arquivadas.
- [ ] Commit/push pela identidade GitHub do responsável.
- [ ] PR revisado por outro autor e CI verde.
- [ ] Checks aplicáveis atualizados, sem declarações fictícias.

### Regra da execução por blocos

Este passo pertence ao bloco **011–020 de Davi Paes**. Este bloco só inicia após a passagem do passo 010. Execute os cinco MDs do bloco em ordem, cumprindo as duas etapas de cada arquivo, respeitando as entradas anteriores; não espere implementação de outro integrante para um número dentro deste bloco. Ao concluir 020, faça a passagem descrita em `04-passagem-de-bloco.md`.

Revisão por outro autor, dados/acessos, consentimentos, playtest e banca continuam sendo ações humanas obrigatórias. O colega pode revisar já no primeiro bloco, antes de começar seus próprios cinco MDs. Finalizar este passo significa concluir seu escopo e entregar provas/contratos; não é assinalar checks de release, vídeo ou banca futuros. O próximo responsável executa a validação posterior, sem exigir que você volte a desenvolver seus passos.

### Prompt profissional — copiar este conteúdo para a IA

Você atua como especialista em desenvolvimento de jogos educativos WEB, DevOps, qualidade, segurança e comunicação técnica. Trabalha com **Davi Paes**, responsável por este passo. Execute a **etapa 019: Entregar produção com aprovação e azul-verde** deste arquivo e as preparações necessárias autorizadas, preservando alterações do usuário. Não executar etapas externas ao par definido no cabeçalho deste MD.

Ao encerrar este passo, atualize `docs/execucao/05-pendencias-por-passo.md` na seção correspondente com todas as pendências reais, requisitos/checks, dependências, próximos passos e provas necessárias. Não fechar itens sem evidência; manter obrigações futuras explícitas.

#### Contexto e fontes obrigatórias

O projeto é Rota do Código/Desafio Arcade, oficina Python de cinco missões e desafio final já implementada. Tem que continuar WEB estático, responsivo, offline, sem engine instalada pelo jogador, backend obrigatório ou serviço pago. Stack existente: TypeScript/HTML/CSS/SVG, esbuild, Ajv, Vitest/Playwright, Node24/npm lockfile, GitHub Actions/Pages. Python dos desafios é subset AST, não aplicativo nativo.

Repositório: https://github.com/luccalck/desafio-arcade . Fonte local de referência: `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`; em outro computador, localizar o clone real com `git rev-parse --show-toplevel`, não criar cópia concorrente. A branch completa estava em feature/primeiro-ciclo/PR#2; main era bootstrap. Inspecione estado atual/remotes antes de escolher base e preservar main protegida.

Leia `docs/gestao/checklist-avaliacao.md`, `docs/gestao/auditoria-avaliacao.md`, `docs/gdd.md`, `README.md`, `SQUAD.md`, `AI-USAGE.md`, `THIRD_PARTY.md`, `SECURITY.md`, o índice deste conjunto e o roteiro R05 no contexto. Leia também o HTML **inteiro**, suas abas e JavaScript da ficha, em `C:/Users/user/Downloads/jogo/Avaliação.html` (ou a cópia de Downloads), e modelo GDD se o passo envolver documento. Em outro computador, peça acesso aos originais faltantes; não alegue que os leu se indisponíveis. Os originais são preservados e não devem ser sobrescritos.

Confirme instruções aplicáveis do ambiente/AGENTS.md. Use os nomes, squad e contas já confirmados em SQUAD; RAs seguem adiados. Acessos, revisão e demais aceites humanos exigem prova real; não inventar nem solicitar novamente dados já disponíveis. Os arquivos deste plano foram preparados pela IA para Lucca, não contam como contribuição de Davi/Miguel/Lucas.

#### Resultado específico e execução

1. Configure deploy-prd needs deploy-hml, environment producao e reviewer obrigatório. Execute aprovação humana rastreável; existência do environment não comprova aprovação.
2. Baixe exatamente ZIP/checksum aceito na HML, publique /releases/<sha>/ imutável e teste candidato antes da virada azul-verde. Smoke precisa validar também raiz pública/versão após troca.
3. Serialize publicações sem cancelamento no meio. Preserve site e versão anterior. Ator/motivo da promoção entram no histórico; permissions mínimas por job.
4. Ative sondas/alertas e confirme versão, HTTPS e artefatos. Notifique canais autorizados com resultado verdadeiro.
5. Mantenha estratégia canário como alternativa condicional; se escolhida em vez de azul-verde, implementar10%/observação/100% e testes, não misturar nomes para simular rollout.

Arquivos/configurações a inspecionar/criar/alterar **relativos ao clone real**, com escopo limitado:

- `.github/workflows/esteira.yml`
- `scripts/publicar.sh`
- `scripts/publicar.mjs`
- `scripts/rollout.mjs`
- `docs/evidencias/producao.md`

Se houver equivalente já funcional, reutilize e documente o caminho efetivo. Não substituir o projeto por scaffold novo. Quem altera workflow compartilhado coordena com Plataforma; não sobrescrever mudança de outra pessoa. Dados de monitoramento ficam em observabilidade, site em gh-pages, fonte em main/branches de PR; quatro pastas deste plano contêm somente prompts, não quatro jogos.

Antes da primeira promoção real, conecte rollback automático ao smoke no workflow, usando a operação de restauração já implementada no passo018. Smoke falhando restaura anterior, retira canário, espera propagação e verifica a versão recuperada. Não colocar PRD sem esse mecanismo. O passo022 de Miguel aprofunda testes e robustez; o passo026 comprova a recuperação real.

#### Checks pendentes atribuídos a este passo

Cada item abaixo vem literalmente do checklist inicial. Alguns exigem execução posterior, reconferência final ou condição opcional. Preparar código não encerra execução/humano. Não mudar um checkbox condicional para [x] quando não aplicável: registrar decisão com fonte. Consulte mapa para referências compartilhadas.

- [ ] **OBJ-05** — Demonstrar a esteira completa de Git até triagem: jogo em produção só pela esteira rastreável.
- [ ] **ARQ-03** — Caminho demonstrável: branch curta → PR → revisão → CI → main → artefato imutável → HML/E2E → aprovação producao → release/rollout → smoke → promoção/rollback → monitoramento/feedback → triagem.
- [ ] **ARQ-06** — Promover esse mesmo artefato da HML aprovada para produção, sem recompilar.
- [ ] **ARQ-08** — Environment producao integrado ao deploy formal, com reviewer obrigatório e aprovação registrada. Configuração existe, deploy ainda não a usa.
- [ ] **I03-17** — Job deploy-prd depende do sucesso da HML e usa environment producao com reviewer obrigatório.
- [ ] **I03-18** — Produção integra publicação de release, estratégia progressiva, smoke e rollback.
- [ ] **I03-19** — Executar aprovação real no environment e preservar seu registro.
- [ ] **I03-20** — Esteira formal automática, sem passo manual além da aprovação de produção; não confundir workflow_dispatch de rollback com produção manual.
- [ ] **I07-10** — CONDICIONAL canário: distribuir aproximadamente 10% das sessões à nova versão.
- [ ] **I07-11** — CONDICIONAL canário: smoke e período de observação comprovados antes de promover a 100%.
- [ ] **I07-12** — CONDICIONAL azul-verde: publicar/testar versão nova em sua pasta antes da troca.
- [ ] **I07-13** — CONDICIONAL azul-verde: virar estavel de uma vez, mantendo referência à anterior; percentual 0 durante preparação.
- [ ] **I07-19** — Histórico gh-pages registra mudanças em rollout.json, quem disparou e por quê.
- [ ] **KIT-13** — Integrar homologacao e producao nos jobs; producao com reviewer obrigatório (ARQ-07/08).
- [ ] **KIT-17** — Preservar essa proteção de concorrência no deploy/rollout formal; serializar mudanças de ponteiro.
- [ ] **KIT-20** — Completar promoção após observação e notificação de falha: TODO do workflow (I03-24/I07).

#### Rubrica, integridade e aceites

Busque a faixa avançada de cada INT relacionado: mínimos + aceites + critério avançado. Nota oficial não é garantida. Fórmula `(0,7×A + 0,3×B)×F`; A pesos INT01–10 = 10/8/15/12/10/10/12/10/8/5; B originalidade25/execução25/jogabilidade30/apresentação20. Para F1 cada pessoa precisa commits e PRs aprovados em >=3 INT diferentes e participar da banca. Revisão não substitui autoria; mínimo squad >=10 PRs reais revisados por outro autor. Não criar commits vazios, dividir artificialmente trabalho nem simular colegas.

Eliminatórios: plágio/ativo sem licença zera squad; produção manual zera INT07; credencial real zera INT05 e exige revogação; pipeline sem clone limpo zera INT03; regra de prazo original deve ser conferida sem cronologia inventada. Nunca testar com segredo real. Não publicar CPF/assinatura/token em arquivo, log, screenshot, relatório ou release. IA exige registro e revisão humana antes do merge. Concurso é opcional e não autoriza inscrição/aceite de termos/uso de imagem em nome dos outros.

Validações específicas e resultados esperados:

- gh run view e deployment/environment com aprovação real; HTTP raíz/HML/releases e version.json; smoke na versão candidata e estável.
- Mesmo hash da HML/PRD; sem rebuild; falha interrompe promoção/aciona recuperação quando aplicável.

Para alteração de código, crie primeiro regressão significativa quando houver comportamento novo/bug verificável, execute a falha e corrija; para documentação, confira conteúdo/link/evidência sem inventar testes. Não executar teste espelhado da implementação nem repetir suites sem necessidade. CI obrigatória deve passar. No PowerShell local, configure `$env:npm_config_script_shell = (Get-Command pwsh).Source` se houver EACCES de cmd. Na CI Linux use comandos nativos do runner.

#### Commit obrigatório pelo GitHub do usuário responsável

**Faça commit pelo GitHub do usuário Davi Paes, usando a própria conta autenticada e a identidade Git real desse usuário.** Não faça commit em nome de luccalck se a pessoa atual for outra, não use conta de colega e não invente e-mail/username. Verifique antes de gravar:

```sh
git status --short
git remote -v
git config --get user.name
git config --get user.email
gh api user --jq .login
```

Se identidade/autenticação não corresponderem ao responsável, peça que ele autentique sua conta e configure nome/e-mail Git; nunca solicitar token no chat. Continue apenas preparações que não forjem autoria. Branch sugerida deste passo: `feature/passos-019-020-producao-painel`; crie a partir de base real aprovada/dependência, sem descartar alterações. Exemplo do fluxo, **após conferir base e arquivos**:

```sh
git switch -c feature/passos-019-020-producao-painel
git diff --check
```

Use `git add` somente com caminhos efetivamente alterados neste escopo, revise diff staged e scanner, então:

```sh
git diff --cached --check
git diff --cached --stat
git commit -m "ci: entregar produção com aprovação e azul-verde
"
git push -u origin HEAD
gh pr create --base main --draft --title "Passo 019: Entregar produção com aprovação e azul-verde" --body-file .contexto/pr-passo-019.md
```

Escolha prefixo Conventional correto: docs/ci/test/fix/feat conforme mudança; mensagem em português. Crie body-file real com problema→resultado→INT→checks→comandos/resultados→IA→pendências→evidências, novas linhas verdadeiras. Solicite revisão humana do colega confirmado **Miguel Oliveira** pela conta GitHub fornecida; não adivinhar @username. Aguarde CI/revisão, não dar merge próprio sem aceite. Se um PR for criado por ferramenta Codex, anexar ao chat com attach_artifact. Não modificar main/gh-pages manualmente nem burlar check/reviewer.

#### Evidências, pessoas e resposta final

Aprovação do environment é de reviewer humano. Não obter bypass, aprovar por API em identidade fictícia ou chamar preview de PRD formal.

Atualize `docs/gestao/checklist-avaliacao.md` só com provas: data real, SHA/tag/run/URL, arquivos, comandos e resultado. Atualize AI-USAGE com ferramenta/finalidade/prompt resumido/resultado/revisão/PR verdadeiro. Registre status no `03-controle-execucao.md` e índice de evidências, sem dizer que todo INT foi aceito quando apenas parte foi concluída.

Quando for possível, preencha ficha original no navegador com dados e URLs reais já verificados; autoavaliações10 são estimativas solicitadas, não nota atribuída. Check de entrega e declarações só quando verdadeiros. Não alterar original/JS para liberar botão nem enviar e-mail/AVA sem autorização no contexto da execução. Se a sessão for interrompida, salvar estado administrativo local fora dos entregáveis acadêmicos.

Ao terminar, informe objetivamente: passo/INT/checks realmente fechados, arquivos, execução/testes, commit do usuário/PR/revisor, evidências, pendências humanas e próximo passo habilitado. Se bloqueado por acesso/pessoa/termos, entregue preparação revisável e mantenha aceite pendente; não repetir falha de ferramenta indefinidamente nem inventar sucesso.

### Encaminhamento explícito do passo003 — 13/10/2026

Este passo executa a integração real de deploy-prd/environmentproducao após HML aceita, mesma build, rollout e rollback necessários. Em13/10 configuramos producao para branchmain, requiredreviewerluccalck e can_admins_bypassfalse. Reconferir configuração e executar aprovação registrada; não usar aprovação de PR como substituto do gate. Implementar/validar promoção/smoke/recuperação antes da primeira produção, conforme018/019; configuração existente sozinha não fecha ARQ-08/I03-17/19/KIT-13.

### Contrato de promoção recebido do007

Job deploy-prd depende de ci/pacote-ci/deploy-hml e environmentproducao, downloads do mesmo SHA/run/tentativa e validação antes de consumo. Implementar scripts/promover.sh com --bundle/--sha/--run/--site-url; jamais reconstruir o ZIP/GDD. Integrar estratégia018, smoke014, rollback básico018019 e aprovação real; fortalecimento022 e workflow manual023 ficam no bloco posterior de Miguel; habilitar FORMAL_PRD_ENABLED somente com script e aceites reais. [Contrato007](../../evidencias/ci-formal.md). Preparação do job não comprova promoção/recuperação/aprovação.

---

## Etapa 020

### Publicar painel de disponibilidade e DORA

**Responsável:** Davi Paes · bloco 2. **Papel oficial proposto:** Desenvolvimento e Qualidade. **Revisor proposto:** Miguel Oliveira (conta indicada em SQUAD; revisão efetiva ainda precisa ocorrer).
**INT:** INT-08/03. **Roteiros preservados:** S03. **Checkpoint:** G4.
**Dependências de execução:** 012, 016, 019. Dependências técnicas vêm de números anteriores, do mesmo bloco ou do bloco já entregue. Revisões/dados humanos não dependem da vez de implementar. Gates continuam G0→G8.

- [ ] Trabalho implementado/documentado com autoria real.
- [ ] Validações executadas e evidências arquivadas.
- [ ] Commit/push pela identidade GitHub do responsável.
- [ ] PR revisado por outro autor e CI verde.
- [ ] Checks aplicáveis atualizados, sem declarações fictícias.

### Regra da execução por blocos

Este passo pertence ao bloco **011–020 de Davi Paes**. Este bloco só inicia após a passagem do passo 010. Execute os cinco MDs do bloco em ordem, cumprindo as duas etapas de cada arquivo, respeitando as entradas anteriores; não espere implementação de outro integrante para um número dentro deste bloco. Ao concluir 020, faça a passagem descrita em `04-passagem-de-bloco.md`.

Revisão por outro autor, dados/acessos, consentimentos, playtest e banca continuam sendo ações humanas obrigatórias. O colega pode revisar já no primeiro bloco, antes de começar seus próprios cinco MDs. Finalizar este passo significa concluir seu escopo e entregar provas/contratos; não é assinalar checks de release, vídeo ou banca futuros. O próximo responsável executa a validação posterior, sem exigir que você volte a desenvolver seus passos.

### Prompt profissional — copiar este conteúdo para a IA

Você atua como especialista em desenvolvimento de jogos educativos WEB, DevOps, qualidade, segurança e comunicação técnica. Trabalha com **Davi Paes**, responsável por este passo. Execute a **etapa 020: Publicar painel de disponibilidade e DORA** deste arquivo e as preparações necessárias autorizadas, preservando alterações do usuário. Não executar etapas externas ao par definido no cabeçalho deste MD.

Ao encerrar este passo, atualize `docs/execucao/05-pendencias-por-passo.md` na seção correspondente com todas as pendências reais, requisitos/checks, dependências, próximos passos e provas necessárias. Não fechar itens sem evidência; manter obrigações futuras explícitas.

#### Contexto e fontes obrigatórias

O projeto é Rota do Código/Desafio Arcade, oficina Python de cinco missões e desafio final já implementada. Tem que continuar WEB estático, responsivo, offline, sem engine instalada pelo jogador, backend obrigatório ou serviço pago. Stack existente: TypeScript/HTML/CSS/SVG, esbuild, Ajv, Vitest/Playwright, Node24/npm lockfile, GitHub Actions/Pages. Python dos desafios é subset AST, não aplicativo nativo.

Repositório: https://github.com/luccalck/desafio-arcade . Fonte local de referência: `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`; em outro computador, localizar o clone real com `git rev-parse --show-toplevel`, não criar cópia concorrente. A branch completa estava em feature/primeiro-ciclo/PR#2; main era bootstrap. Inspecione estado atual/remotes antes de escolher base e preservar main protegida.

Leia `docs/gestao/checklist-avaliacao.md`, `docs/gestao/auditoria-avaliacao.md`, `docs/gdd.md`, `README.md`, `SQUAD.md`, `AI-USAGE.md`, `THIRD_PARTY.md`, `SECURITY.md`, o índice deste conjunto e o roteiro S03 no contexto. Leia também o HTML **inteiro**, suas abas e JavaScript da ficha, em `C:/Users/user/Downloads/jogo/Avaliação.html` (ou a cópia de Downloads), e modelo GDD se o passo envolver documento. Em outro computador, peça acesso aos originais faltantes; não alegue que os leu se indisponíveis. Os originais são preservados e não devem ser sobrescritos.

Confirme instruções aplicáveis do ambiente/AGENTS.md. Use os nomes, squad e contas já confirmados em SQUAD; RAs seguem adiados. Acessos, revisão e demais aceites humanos exigem prova real; não inventar nem solicitar novamente dados já disponíveis. Os arquivos deste plano foram preparados pela IA para Lucca, não contam como contribuição de Davi/Miguel/Lucas.

#### Resultado específico e execução

1. Crie /status/ no Pages com disponibilidade, latência, versão produção, percentual/estado rollout e quatro DORA. Use CSV/dados reais da observabilidade e API/artefatos autorizados; nenhum backend pago/token no navegador.
2. Mostre período, última coleta, atraso/ausência de amostras e estado desconhecido. Não usar uptime100/latência0/DORA0 como placeholders; métrica indisponível deve ser explícita.
3. Atualize painel sem fazer cada sonda disparar deploy do jogo. Explique como dados da branch são consumidos por página estática sem exposição de segredo.
4. Valide legibilidade/acessibilidade/teclado/celular; mantenha foco em observabilidade, não informações pessoais.
5. Publicar URL real e inserir na ficha apenas depois de HTTP200/renderização; G4 só fecha com PRD/aprovação/monitoramento ativo.

Arquivos/configurações a inspecionar/criar/alterar **relativos ao clone real**, com escopo limitado:

- `pages/status/index.html`
- `scripts/status.mjs`
- `tests/integration/status.test.mjs`
- `docs/evidencias/painel-status.md`

Se houver equivalente já funcional, reutilize e documente o caminho efetivo. Não substituir o projeto por scaffold novo. Quem altera workflow compartilhado coordena com Plataforma; não sobrescrever mudança de outra pessoa. Dados de monitoramento ficam em observabilidade, site em gh-pages, fonte em main/branches de PR; quatro pastas deste plano contêm somente prompts, não quatro jogos.

O painel deve funcionar já neste bloco. Para DORA que ainda não tem dados/script do passo024, mostre indisponível e a causa, sem números fictícios. Entregue o contrato de leitura; Miguel liga os dados reais no passo024, sem precisar de implementação adicional de Davi.

#### Checks pendentes atribuídos a este passo

Cada item abaixo vem literalmente do checklist inicial. Alguns exigem execução posterior, reconferência final ou condição opcional. Preparar código não encerra execução/humano. Não mudar um checkbox condicional para [x] quando não aplicável: registrar decisão com fonte. Consulte mapa para referências compartilhadas.

- [ ] **I08-16** — Publicar painel /status/ no Pages.
- [ ] **I08-17** — Painel mostra disponibilidade.
- [ ] **I08-18** — Painel mostra latência.
- [ ] **I08-19** — Painel mostra versão em produção.
- [ ] **I08-20** — Painel mostra percentual do canário/estado aplicável da estratégia.
- [ ] **KIT-07** — Painel pages/status/index.html ou equivalente publicado (I08-16 a I08-21).
- [ ] **FIC-10** — Link do painel /status/ — obrigatório.
- [ ] **G4** — Produção controlada: mesma build, aprovação registrada, monitoramento ativo e versão verificável.

#### Rubrica, integridade e aceites

Busque a faixa avançada de cada INT relacionado: mínimos + aceites + critério avançado. Nota oficial não é garantida. Fórmula `(0,7×A + 0,3×B)×F`; A pesos INT01–10 = 10/8/15/12/10/10/12/10/8/5; B originalidade25/execução25/jogabilidade30/apresentação20. Para F1 cada pessoa precisa commits e PRs aprovados em >=3 INT diferentes e participar da banca. Revisão não substitui autoria; mínimo squad >=10 PRs reais revisados por outro autor. Não criar commits vazios, dividir artificialmente trabalho nem simular colegas.

Eliminatórios: plágio/ativo sem licença zera squad; produção manual zera INT07; credencial real zera INT05 e exige revogação; pipeline sem clone limpo zera INT03; regra de prazo original deve ser conferida sem cronologia inventada. Nunca testar com segredo real. Não publicar CPF/assinatura/token em arquivo, log, screenshot, relatório ou release. IA exige registro e revisão humana antes do merge. Concurso é opcional e não autoriza inscrição/aceite de termos/uso de imagem em nome dos outros.

Validações específicas e resultados esperados:

- Teste CSV vazio/malformado, dados atrasados, falha/normalização e métricas ausentes; npx playwright test do painel real.
- HTTP /status/ e screenshot mostram dados com origem/horário verificáveis, sem painel fictício.

Para alteração de código, crie primeiro regressão significativa quando houver comportamento novo/bug verificável, execute a falha e corrija; para documentação, confira conteúdo/link/evidência sem inventar testes. Não executar teste espelhado da implementação nem repetir suites sem necessidade. CI obrigatória deve passar. No PowerShell local, configure `$env:npm_config_script_shell = (Get-Command pwsh).Source` se houver EACCES de cmd. Na CI Linux use comandos nativos do runner.

#### Commit obrigatório pelo GitHub do usuário responsável

**Faça commit pelo GitHub do usuário Davi Paes, usando a própria conta autenticada e a identidade Git real desse usuário.** Não faça commit em nome de luccalck se a pessoa atual for outra, não use conta de colega e não invente e-mail/username. Verifique antes de gravar:

```sh
git status --short
git remote -v
git config --get user.name
git config --get user.email
gh api user --jq .login
```

Se identidade/autenticação não corresponderem ao responsável, peça que ele autentique sua conta e configure nome/e-mail Git; nunca solicitar token no chat. Continue apenas preparações que não forjem autoria. Branch sugerida deste passo: `feature/passos-019-020-producao-painel`; crie a partir de base real aprovada/dependência, sem descartar alterações. Exemplo do fluxo, **após conferir base e arquivos**:

```sh
git switch -c feature/passos-019-020-producao-painel
git diff --check
```

Use `git add` somente com caminhos efetivamente alterados neste escopo, revise diff staged e scanner, então:

```sh
git diff --cached --check
git diff --cached --stat
git commit -m "feat: publicar painel de disponibilidade e dora
"
git push -u origin HEAD
gh pr create --base main --draft --title "Passo 020: Publicar painel de disponibilidade e DORA" --body-file .contexto/pr-passo-020.md
```

Escolha prefixo Conventional correto: docs/ci/test/fix/feat conforme mudança; mensagem em português. Crie body-file real com problema→resultado→INT→checks→comandos/resultados→IA→pendências→evidências, novas linhas verdadeiras. Solicite revisão humana do colega confirmado **Miguel Oliveira** pela conta GitHub fornecida; não adivinhar @username. Aguarde CI/revisão, não dar merge próprio sem aceite. Se um PR for criado por ferramenta Codex, anexar ao chat com attach_artifact. Não modificar main/gh-pages manualmente nem burlar check/reviewer.

#### Evidências, pessoas e resposta final

Revisão de outro integrante antes do merge. Não simular identidade ou aceite.

Atualize `docs/gestao/checklist-avaliacao.md` só com provas: data real, SHA/tag/run/URL, arquivos, comandos e resultado. Atualize AI-USAGE com ferramenta/finalidade/prompt resumido/resultado/revisão/PR verdadeiro. Registre status no `03-controle-execucao.md` e índice de evidências, sem dizer que todo INT foi aceito quando apenas parte foi concluída.

Quando for possível, preencha ficha original no navegador com dados e URLs reais já verificados; autoavaliações10 são estimativas solicitadas, não nota atribuída. Check de entrega e declarações só quando verdadeiros. Não alterar original/JS para liberar botão nem enviar e-mail/AVA sem autorização no contexto da execução. Se a sessão for interrompida, salvar estado administrativo local fora dos entregáveis acadêmicos.

Ao terminar, informe objetivamente: passo/INT/checks realmente fechados, arquivos, execução/testes, commit do usuário/PR/revisor, evidências, pendências humanas e próximo passo habilitado. Se bloqueado por acesso/pessoa/termos, entregue preparação revisável e mantenha aceite pendente; não repetir falha de ferramenta indefinidamente nem inventar sucesso.
