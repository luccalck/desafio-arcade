# MD 3/5 — Etapas 035–036: release triagem final

**Responsável:** Lucas Souza · conta real esperada: `6lucassilvaaa`. **Organização atual:** cinco MDs deste integrante, sem reduzir as dez etapas originais. Os números 035/036 continuam no controle e no registro único de pendências. A preparação destes prompts por Lucca/IA não constitui contribuição do colega.

## Prompt de execução do arquivo completo

Leia este arquivo integralmente e execute **as etapas 035 e 036, nessa ordem**, com suas fontes, entradas, tarefas, checks e validações completos abaixo. Expressões como “este passo” nas seções de uma etapa se referem àquela etapa; o pedido para executar este MD abrange ambas. Não executar o próximo MD automaticamente.

1. Inspecione o clone e preserve alterações. Leia SQUAD, checklist, pendências, GDD e a passagem do bloco anterior; não presuma que a branch padrão foi aprovada ou integrada na main.
2. Confirme a identidade Git/GitHub real de Lucas Souza, conta `6lucassilvaaa`, antes de qualquer commit. **Faça commit pela própria conta GitHub do responsável**, sem configurar a identidade de outra pessoa ou inventar e-mail. Lucca não executa estas etapas usando a identidade dos colegas.
3. Execute primeiro a etapa 035; registre provas e pendências na seção **Passo 035** do registro único. Depois execute a etapa 036, respeitando suas entradas, e registre **Passo 036**. Se faltar aceite humano, avance apenas preparações independentes permitidas; não invente a entrada nem libere produção.
4. Use uma branch curta real para este par, sugerida nas duas etapas. Se ela já foi criada na primeira etapa, reutilize-a na segunda; não repetir git switch -c. Se o PR do par já existe, atualize-o com commits e descrição reais em vez de criar PR duplicado. Faça commits substantivos e PR(s) revisáveis conforme o trabalho exigir; cinco MDs não significam somente cinco commits, nem revisão dispensada. Nunca dividir artificialmente commits para fabricar participação.
5. Preserve a diferenciação entre preparação, execução e aceite de G0–G8. Os roteiros C01/C02, P01–P07, D01–D07, R01–R07 e S01–S06 e os IDs do checklist continuam válidos. Não aceitar o par enquanto parte do trabalho realizável foi omitida; pendências humanas/finais devem ficar explícitas.
6. Ao terminar, atualizar checklist somente com provas, controle de ambas as etapas, AI-USAGE e pendências. Relatar arquivos, comandos, resultados, commits/PR/CI, revisão real e próximo MD. Ao concluir o quinto MD, registrar passagem do bloco; recebimento pelo colega é ação humana, não declaração da IA.

Os dados de equipe já confirmados estão em SQUAD; os RAs foram adiados e não devem ser inventados ou solicitados repetidamente. Estes prompts não alteram a decisão WEB/offline, a rubrica ou os critérios eliminatórios. Referências locais são relativas ao mesmo clone e os caminhos Windows originais são contexto; em outro computador localizar o clone real.

## Ordem e dependências preservadas

| Etapa | Entradas originais | Destino de evidências/pendências |
|---|---|---|
| [035](#etapa-035) | 031, 032, 033, 034 | Controle/registro único, seção 035 |
| [036](#etapa-036) | 035 | Controle/registro único, seção 036 |

## Etapa 035

### Criar tag final e executar release formal

**Responsável:** Lucas Souza · bloco 4. **Papel oficial proposto:** SRE e Segurança. **Revisor proposto:** Lucca Castilho (conta indicada em SQUAD; revisão efetiva ainda precisa ocorrer).
**INT:** INT-01/03/06/07/09. **Roteiros preservados:** R05/R07. **Checkpoint:** G7.
**Dependências de execução:** 031, 032, 033, 034. Dependências técnicas vêm de números anteriores, do mesmo bloco ou do bloco já entregue. Revisões/dados humanos não dependem da vez de implementar. Gates continuam G0→G8.

- [ ] Trabalho implementado/documentado com autoria real.
- [ ] Validações executadas e evidências arquivadas.
- [ ] Commit/push pela identidade GitHub do responsável.
- [ ] PR revisado por outro autor e CI verde.
- [ ] Checks aplicáveis atualizados, sem declarações fictícias.

### Regra da execução por blocos

Este passo pertence ao bloco **031–040 de Lucas Souza**. Este bloco só inicia após a passagem do passo 030. Execute os cinco MDs do bloco em ordem, cumprindo as duas etapas de cada arquivo, respeitando as entradas anteriores; não espere implementação de outro integrante para um número dentro deste bloco. Ao concluir 040, faça a passagem descrita em `04-passagem-de-bloco.md`.

Revisão por outro autor, dados/acessos, consentimentos, playtest e banca continuam sendo ações humanas obrigatórias. O colega pode revisar já no primeiro bloco, antes de começar seus próprios cinco MDs. Finalizar este passo significa concluir seu escopo e entregar provas/contratos; não é assinalar checks de release, vídeo ou banca futuros. O próximo responsável executa a validação posterior, sem exigir que você volte a desenvolver seus passos.

### Prompt profissional — copiar este conteúdo para a IA

Você atua como especialista em desenvolvimento de jogos educativos WEB, DevOps, qualidade, segurança e comunicação técnica. Trabalha com **Lucas Souza**, responsável por este passo. Execute a **etapa 035: Criar tag final e executar release formal** deste arquivo e as preparações necessárias autorizadas, preservando alterações do usuário. Não executar etapas externas ao par definido no cabeçalho deste MD.

Ao encerrar este passo, atualize `docs/execucao/05-pendencias-por-passo.md` na seção correspondente com todas as pendências reais, requisitos/checks, dependências, próximos passos e provas necessárias. Não fechar itens sem evidência; manter obrigações futuras explícitas.

#### Contexto e fontes obrigatórias

O projeto é Rota do Código/Desafio Arcade, oficina Python de cinco missões e desafio final já implementada. Tem que continuar WEB estático, responsivo, offline, sem engine instalada pelo jogador, backend obrigatório ou serviço pago. Stack existente: TypeScript/HTML/CSS/SVG, esbuild, Ajv, Vitest/Playwright, Node24/npm lockfile, GitHub Actions/Pages. Python dos desafios é subset AST, não aplicativo nativo.

Repositório: https://github.com/luccalck/desafio-arcade . Fonte local de referência: `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`; em outro computador, localizar o clone real com `git rev-parse --show-toplevel`, não criar cópia concorrente. A branch completa estava em feature/primeiro-ciclo/PR#2; main era bootstrap. Inspecione estado atual/remotes antes de escolher base e preservar main protegida.

Leia `docs/gestao/checklist-avaliacao.md`, `docs/gestao/auditoria-avaliacao.md`, `docs/gdd.md`, `README.md`, `SQUAD.md`, `AI-USAGE.md`, `THIRD_PARTY.md`, `SECURITY.md`, o índice deste conjunto e o roteiro R05/R07 no contexto. Leia também o HTML **inteiro**, suas abas e JavaScript da ficha, em `C:/Users/user/Downloads/jogo/Avaliação.html` (ou a cópia de Downloads), e modelo GDD se o passo envolver documento. Em outro computador, peça acesso aos originais faltantes; não alegue que os leu se indisponíveis. Os originais são preservados e não devem ser sobrescritos.

Confirme instruções aplicáveis do ambiente/AGENTS.md. Use os nomes, squad e contas já confirmados em SQUAD; RAs seguem adiados. Acessos, revisão e demais aceites humanos exigem prova real; não inventar nem solicitar novamente dados já disponíveis. Os arquivos deste plano foram preparados pela IA para Lucca, não contam como contribuição de Davi/Miguel/Lucas.

#### Resultado específico e execução

1. Após PRs revisados, CI e aceites humanos, selecione commit main aprovado e confirme SemVer 1.0.0, GDD, data e vídeo. Crie tag anotada com data real; não mover tags públicas nem retroagir.
2. Acompanhe pipeline da tag: CI, HML/E2E, aprovação producao, PRD azul-verde, smoke e pacote. Deve ser o mesmo artefato entre HML e PRD.
3. Reviewer humano aprova. Preserve links de checks, commit, tag, deployment, release, notas, anexos, hash e URLs. Restaurar main como padrão se ainda não ocorreu no passo 003.
4. Confira GitHub Release com ZIP, checksum, SBOM, GDD e notas revisadas; pacote abaixo de 25 MB/offline e URLs produção/HML/status disponíveis.
5. Não declarar triagem final antes do passo 036 ou envio AVA antes do passo 039. Preserve tentativas com falha.

Arquivos/configurações a inspecionar/criar/alterar **relativos ao clone real**, com escopo limitado:

- `Tag anotada v1.0.0`
- `GitHub Release v1.0.0`
- `docs/evidencias/release-final.md`
- `README.md`

Se houver equivalente já funcional, reutilize e documente o caminho efetivo. Não substituir o projeto por scaffold novo. Quem altera workflow compartilhado coordena com Plataforma; não sobrescrever mudança de outra pessoa. Dados de monitoramento ficam em observabilidade, site em gh-pages, fonte em main/branches de PR; quatro pastas deste plano contêm somente prompts, não quatro jogos.

#### Checks pendentes atribuídos a este passo

Cada item abaixo vem literalmente do checklist inicial. Alguns exigem execução posterior, reconferência final ou condição opcional. Preparar código não encerra execução/humano. Não mudar um checkbox condicional para [x] quando não aplicável: registrar decisão com fonte. Consulte mapa para referências compartilhadas.

- [ ] **I01-11** — Tag SemVer anotada v1.0.0 da entrega, criada sobre versão aprovada.

- [ ] **I02-13** — Versão e data do GDD coerentes com a tag de release final. Não existe tag final.

- [ ] **I03-09** — Clone limpo reproduz esteira formal completa, sem passos ocultos/configuração local indispensável. CI atual clona e testa; deploy formal ausente.

- [ ] **I06-15** — Hash do ZIP promovido à produção formal bate com o da GitHub Release.

- [ ] **I06-17** — CONTÍNUO/FINAL: conferir offline, tamanho, versão, SHA, data e integridade da release final.

- [ ] **I06-18** — AVANÇADO: reunir reprodutibilidade comprovada, notas revisadas e SBOM/GDD anexados na mesma release.

#### Rubrica, integridade e aceites

Busque a faixa avançada de cada INT relacionado: mínimos + aceites + critério avançado. Nota oficial não é garantida. Fórmula `(0,7×A + 0,3×B)×F`; A pesos INT01–10 = 10/8/15/12/10/10/12/10/8/5; B originalidade25/execução25/jogabilidade30/apresentação20. Para F1 cada pessoa precisa commits e PRs aprovados em >=3 INT diferentes e participar da banca. Revisão não substitui autoria; mínimo squad >=10 PRs reais revisados por outro autor. Não criar commits vazios, dividir artificialmente trabalho nem simular colegas.

Eliminatórios: plágio/ativo sem licença zera squad; produção manual zera INT07; credencial real zera INT05 e exige revogação; pipeline sem clone limpo zera INT03; regra de prazo original deve ser conferida sem cronologia inventada. Nunca testar com segredo real. Não publicar CPF/assinatura/token em arquivo, log, screenshot, relatório ou release. IA exige registro e revisão humana antes do merge. Concurso é opcional e não autoriza inscrição/aceite de termos/uso de imagem em nome dos outros.

Validações específicas e resultados esperados:

- Somente no commit aprovado: git tag -a v1.0.0 -m "Entrega Desafio Arcade v1.0.0"; git push origin v1.0.0; acompanhar gh run view e gh release view v1.0.0.
- Compare hash HML/PRD/release e links. Nunca executar npm run build no deploy para criar outro artefato.

Para alteração de código, crie primeiro regressão significativa quando houver comportamento novo/bug verificável, execute a falha e corrija; para documentação, confira conteúdo/link/evidência sem inventar testes. Não executar teste espelhado da implementação nem repetir suites sem necessidade. CI obrigatória deve passar. No PowerShell local, configure `$env:npm_config_script_shell = (Get-Command pwsh).Source` se houver EACCES de cmd. Na CI Linux use comandos nativos do runner.

#### Commit obrigatório pelo GitHub do usuário responsável

**Faça commit pelo GitHub do usuário Lucas Souza, usando a própria conta autenticada e a identidade Git real desse usuário.** Não faça commit em nome de luccalck se a pessoa atual for outra, não use conta de colega e não invente e-mail/username. Verifique antes de gravar:

```sh
git status --short
git remote -v
git config --get user.name
git config --get user.email
gh api user --jq .login
```

Se identidade/autenticação não corresponderem ao responsável, peça que ele autentique sua conta e configure nome/e-mail Git; nunca solicitar token no chat. Continue apenas preparações que não forjem autoria. Branch sugerida deste passo: `feature/passos-035-036-release-triagem-final`; crie a partir de base real aprovada/dependência, sem descartar alterações. Exemplo do fluxo, **após conferir base e arquivos**:

```sh
git switch -c feature/passos-035-036-release-triagem-final
git diff --check
```

Use `git add` somente com caminhos efetivamente alterados neste escopo, revise diff staged e scanner, então:

```sh
git diff --cached --check
git diff --cached --stat
git commit -m "ci: criar tag final e executar release formal
"
git push -u origin HEAD
gh pr create --base main --draft --title "Passo 035: Criar tag final e executar release formal" --body-file .contexto/pr-passo-035.md
```

Escolha prefixo Conventional correto: docs/ci/test/fix/feat conforme mudança; mensagem em português. Crie body-file real com problema→resultado→INT→checks→comandos/resultados→IA→pendências→evidências, novas linhas verdadeiras. Solicite revisão humana do colega confirmado **Lucca Castilho** pela conta GitHub fornecida; não adivinhar @username. Aguarde CI/revisão, não dar merge próprio sem aceite. Se um PR for criado por ferramenta Codex, anexar ao chat com attach_artifact. Não modificar main/gh-pages manualmente nem burlar check/reviewer.

#### Evidências, pessoas e resposta final

Tag exige aceite real dos quatro e aprovação do environment pelo reviewer humano. Sem isso, preparar e manter pendente.

Atualize `docs/gestao/checklist-avaliacao.md` só com provas: data real, SHA/tag/run/URL, arquivos, comandos e resultado. Atualize AI-USAGE com ferramenta/finalidade/prompt resumido/resultado/revisão/PR verdadeiro. Registre status no `03-controle-execucao.md` e índice de evidências, sem dizer que todo INT foi aceito quando apenas parte foi concluída.

Quando for possível, preencha ficha original no navegador com dados e URLs reais já verificados; autoavaliações10 são estimativas solicitadas, não nota atribuída. Check de entrega e declarações só quando verdadeiros. Não alterar original/JS para liberar botão nem enviar e-mail/AVA sem autorização no contexto da execução. Se a sessão for interrompida, salvar estado administrativo local fora dos entregáveis acadêmicos.

Ao terminar, informe objetivamente: passo/INT/checks realmente fechados, arquivos, execução/testes, commit do usuário/PR/revisor, evidências, pendências humanas e próximo passo habilitado. Se bloqueado por acesso/pessoa/termos, entregue preparação revisável e mantenha aceite pendente; não repetir falha de ferramenta indefinidamente nem inventar sucesso.

---

### Entrada obrigatória da etapa015: tags e ambientes

Antes de criar a tag final, conferir a compatibilização segura dos triggers/refs/regras dos environments entregue em015: tag anotada do commit revisado da main, GDD/SemVer/artefato coerentes, reviewer e ausência de bypass. A configuração antiga exclusiva de refs/heads/main não satisfaz a execução formal da tag. Não criar a tag para descobrir esse bloqueio depois. Guardar os logs reais da execução da tag, HML/E2E, aprovação, PRD/smoke, release e pacote; usar o mesmo ZIP e checksum ao longo do run.

## Etapa 036

### Executar triagem final e auditoria eliminatória

**Responsável:** Lucas Souza · bloco 4. **Papel oficial proposto:** SRE e Segurança. **Revisor proposto:** Lucca Castilho (conta indicada em SQUAD; revisão efetiva ainda precisa ocorrer).
**INT:** INT-09/05/07/03. **Roteiros preservados:** S04/S06. **Checkpoint:** G7.
**Dependências de execução:** 035. Dependências técnicas vêm de números anteriores, do mesmo bloco ou do bloco já entregue. Revisões/dados humanos não dependem da vez de implementar. Gates continuam G0→G8.

- [ ] Trabalho implementado/documentado com autoria real.
- [ ] Validações executadas e evidências arquivadas.
- [ ] Commit/push pela identidade GitHub do responsável.
- [ ] PR revisado por outro autor e CI verde.
- [ ] Checks aplicáveis atualizados, sem declarações fictícias.

### Regra da execução por blocos

Este passo pertence ao bloco **031–040 de Lucas Souza**. Este bloco só inicia após a passagem do passo 030. Execute os cinco MDs do bloco em ordem, cumprindo as duas etapas de cada arquivo, respeitando as entradas anteriores; não espere implementação de outro integrante para um número dentro deste bloco. Ao concluir 040, faça a passagem descrita em `04-passagem-de-bloco.md`.

Revisão por outro autor, dados/acessos, consentimentos, playtest e banca continuam sendo ações humanas obrigatórias. O colega pode revisar já no primeiro bloco, antes de começar seus próprios cinco MDs. Finalizar este passo significa concluir seu escopo e entregar provas/contratos; não é assinalar checks de release, vídeo ou banca futuros. O próximo responsável executa a validação posterior, sem exigir que você volte a desenvolver seus passos.

### Prompt profissional — copiar este conteúdo para a IA

Você atua como especialista em desenvolvimento de jogos educativos WEB, DevOps, qualidade, segurança e comunicação técnica. Trabalha com **Lucas Souza**, responsável por este passo. Execute a **etapa 036: Executar triagem final e auditoria eliminatória** deste arquivo e as preparações necessárias autorizadas, preservando alterações do usuário. Não executar etapas externas ao par definido no cabeçalho deste MD.

Ao encerrar este passo, atualize `docs/execucao/05-pendencias-por-passo.md` na seção correspondente com todas as pendências reais, requisitos/checks, dependências, próximos passos e provas necessárias. Não fechar itens sem evidência; manter obrigações futuras explícitas.

#### Contexto e fontes obrigatórias

O projeto é Rota do Código/Desafio Arcade, oficina Python de cinco missões e desafio final já implementada. Tem que continuar WEB estático, responsivo, offline, sem engine instalada pelo jogador, backend obrigatório ou serviço pago. Stack existente: TypeScript/HTML/CSS/SVG, esbuild, Ajv, Vitest/Playwright, Node24/npm lockfile, GitHub Actions/Pages. Python dos desafios é subset AST, não aplicativo nativo.

Repositório: https://github.com/luccalck/desafio-arcade . Fonte local de referência: `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`; em outro computador, localizar o clone real com `git rev-parse --show-toplevel`, não criar cópia concorrente. A branch completa estava em feature/primeiro-ciclo/PR#2; main era bootstrap. Inspecione estado atual/remotes antes de escolher base e preservar main protegida.

Leia `docs/gestao/checklist-avaliacao.md`, `docs/gestao/auditoria-avaliacao.md`, `docs/gdd.md`, `README.md`, `SQUAD.md`, `AI-USAGE.md`, `THIRD_PARTY.md`, `SECURITY.md`, o índice deste conjunto e o roteiro S04/S06 no contexto. Leia também o HTML **inteiro**, suas abas e JavaScript da ficha, em `C:/Users/user/Downloads/jogo/Avaliação.html` (ou a cópia de Downloads), e modelo GDD se o passo envolver documento. Em outro computador, peça acesso aos originais faltantes; não alegue que os leu se indisponíveis. Os originais são preservados e não devem ser sobrescritos.

Confirme instruções aplicáveis do ambiente/AGENTS.md. Use os nomes, squad e contas já confirmados em SQUAD; RAs seguem adiados. Acessos, revisão e demais aceites humanos exigem prova real; não inventar nem solicitar novamente dados já disponíveis. Os arquivos deste plano foram preparados pela IA para Lucca, não contam como contribuição de Davi/Miguel/Lucas.

#### Resultado específico e execução

1. Execute triagem na v1.0.0 contra produção e pacote final. TRIAGEM APROVADA só quando PDF, ZIP, vídeo, manifesto, squad, prazo, URL e smoke passam de verdade.
2. Audite condições eliminatórias: plágio/licença zera squad; produção manual zera INT-07; credencial real zera INT-05 e exige revogação; clone limpo falhando zera INT-03. Conferir regra de prazo original sem inventar cronologia.
3. Verifique histórico gh-pages, bot, ator e motivo do rollout, permissões, scanners, SBOM, revisão humana da IA e ausência de CPF/assinaturas/segredos nos artefatos.
4. Se algum item falhar, manter INT e declaração abertos, corrigir por PR/pipeline e não sobrescrever release imutável. Não maquiar logs nem mudar relógio.
5. Consolidar evidências de G7 para ficha 037; manter vigilância 032 e produção saudável.

Arquivos/configurações a inspecionar/criar/alterar **relativos ao clone real**, com escopo limitado:

- `scripts/triagem.sh`
- `docs/evidencias/triagem-final.md`
- `submissao artefato CI`
- `docs/gestao/checklist-avaliacao.md`

Se houver equivalente já funcional, reutilize e documente o caminho efetivo. Não substituir o projeto por scaffold novo. Quem altera workflow compartilhado coordena com Plataforma; não sobrescrever mudança de outra pessoa. Dados de monitoramento ficam em observabilidade, site em gh-pages, fonte em main/branches de PR; quatro pastas deste plano contêm somente prompts, não quatro jogos.

#### Checks pendentes atribuídos a este passo

Cada item abaixo vem literalmente do checklist inicial. Alguns exigem execução posterior, reconferência final ou condição opcional. Preparar código não encerra execução/humano. Não mudar um checkbox condicional para [x] quando não aplicável: registrar decisão com fonte. Consulte mapa para referências compartilhadas.

- [ ] **I05-22** — CONTÍNUO/FINAL: zero ativo protegido/plagiado sem autorização, inclusive conteúdo gerado; condição eliminatória para o squad.
- [ ] **I05-23** — CONTÍNUO/FINAL: zero credencial real no repositório; se houver incidente, revogar e corrigir com evidência sem expor o valor. Credencial real zera INT-05.
- [ ] **I07-03** — CONTÍNUO/FINAL: nenhuma produção alterada à mão; alteração manual de gh-pages zera INT-07.
- [ ] **I09-19** — Rodar triagem na tag v1.0.0 e arquivar resultado TRIAGEM APROVADA verdadeiro.
- [ ] **I09-20** — Arquivar pacote e logs da triagem junto da release/execução correspondente.
- [ ] **EL-01** — Sem plágio ou ativo sem licença/autorização: infração zera avaliação do squad.
- [ ] **EL-02** — Produção somente pela pipeline: alteração manual zera INT-07.
- [ ] **EL-03** — Nenhuma credencial real no repositório: infração zera INT-05 e requer revogação.
- [ ] **EL-04** — Pipeline funciona desde clone limpo: falha nessa condição zera INT-03.
- [ ] **EL-05** — Regra do enunciado original: integrável entregue após o início da aula de 09/10, sem justificativa aceita, recebe nota zero nesse integrável. Conferir condições aplicáveis sem afirmar cumprimento cronológico sem evidência.
- [ ] **G7** — Fechamento: release final executada, hashes conferidos, triagem aprovada na tag.

- [ ] **I03-13** — CONTÍNUO: revisar permissões/secrets/variables após adicionar deploys, sondas e triagem.

#### Rubrica, integridade e aceites

Busque a faixa avançada de cada INT relacionado: mínimos + aceites + critério avançado. Nota oficial não é garantida. Fórmula `(0,7×A + 0,3×B)×F`; A pesos INT01–10 = 10/8/15/12/10/10/12/10/8/5; B originalidade25/execução25/jogabilidade30/apresentação20. Para F1 cada pessoa precisa commits e PRs aprovados em >=3 INT diferentes e participar da banca. Revisão não substitui autoria; mínimo squad >=10 PRs reais revisados por outro autor. Não criar commits vazios, dividir artificialmente trabalho nem simular colegas.

Eliminatórios: plágio/ativo sem licença zera squad; produção manual zera INT07; credencial real zera INT05 e exige revogação; pipeline sem clone limpo zera INT03; regra de prazo original deve ser conferida sem cronologia inventada. Nunca testar com segredo real. Não publicar CPF/assinatura/token em arquivo, log, screenshot, relatório ou release. IA exige registro e revisão humana antes do merge. Concurso é opcional e não autoriza inscrição/aceite de termos/uso de imagem em nome dos outros.

Validações específicas e resultados esperados:

- No runner: bash scripts/triagem.sh submissao; sha256sum -c submissao/MANIFESTO.sha256; pdfinfo/ffprobe/Playwright reais.
- Arquivar tag/source/run, relatório eliminatório e TRIAGEM APROVADA somente se tudo passar.

Para alteração de código, crie primeiro regressão significativa quando houver comportamento novo/bug verificável, execute a falha e corrija; para documentação, confira conteúdo/link/evidência sem inventar testes. Não executar teste espelhado da implementação nem repetir suites sem necessidade. CI obrigatória deve passar. No PowerShell local, configure `$env:npm_config_script_shell = (Get-Command pwsh).Source` se houver EACCES de cmd. Na CI Linux use comandos nativos do runner.

#### Commit obrigatório pelo GitHub do usuário responsável

**Faça commit pelo GitHub do usuário Lucas Souza, usando a própria conta autenticada e a identidade Git real desse usuário.** Não faça commit em nome de luccalck se a pessoa atual for outra, não use conta de colega e não invente e-mail/username. Verifique antes de gravar:

```sh
git status --short
git remote -v
git config --get user.name
git config --get user.email
gh api user --jq .login
```

Se identidade/autenticação não corresponderem ao responsável, peça que ele autentique sua conta e configure nome/e-mail Git; nunca solicitar token no chat. Continue apenas preparações que não forjem autoria. Branch sugerida deste passo: `feature/passos-035-036-release-triagem-final`; crie a partir de base real aprovada/dependência, sem descartar alterações. Exemplo do fluxo, **após conferir base e arquivos**:

```sh
git switch -c feature/passos-035-036-release-triagem-final
git diff --check
```

Use `git add` somente com caminhos efetivamente alterados neste escopo, revise diff staged e scanner, então:

```sh
git diff --cached --check
git diff --cached --stat
git commit -m "docs: executar triagem final e auditoria eliminatória
"
git push -u origin HEAD
gh pr create --base main --draft --title "Passo 036: Executar triagem final e auditoria eliminatória" --body-file .contexto/pr-passo-036.md
```

Escolha prefixo Conventional correto: docs/ci/test/fix/feat conforme mudança; mensagem em português. Crie body-file real com problema→resultado→INT→checks→comandos/resultados→IA→pendências→evidências, novas linhas verdadeiras. Solicite revisão humana do colega confirmado **Lucca Castilho** pela conta GitHub fornecida; não adivinhar @username. Aguarde CI/revisão, não dar merge próprio sem aceite. Se um PR for criado por ferramenta Codex, anexar ao chat com attach_artifact. Não modificar main/gh-pages manualmente nem burlar check/reviewer.

#### Evidências, pessoas e resposta final

Revisão de outro integrante antes do merge. Não simular identidade ou aceite.

Atualize `docs/gestao/checklist-avaliacao.md` só com provas: data real, SHA/tag/run/URL, arquivos, comandos e resultado. Atualize AI-USAGE com ferramenta/finalidade/prompt resumido/resultado/revisão/PR verdadeiro. Registre status no `03-controle-execucao.md` e índice de evidências, sem dizer que todo INT foi aceito quando apenas parte foi concluída.

Quando for possível, preencha ficha original no navegador com dados e URLs reais já verificados; autoavaliações10 são estimativas solicitadas, não nota atribuída. Check de entrega e declarações só quando verdadeiros. Não alterar original/JS para liberar botão nem enviar e-mail/AVA sem autorização no contexto da execução. Se a sessão for interrompida, salvar estado administrativo local fora dos entregáveis acadêmicos.

Ao terminar, informe objetivamente: passo/INT/checks realmente fechados, arquivos, execução/testes, commit do usuário/PR/revisor, evidências, pendências humanas e próximo passo habilitado. Se bloqueado por acesso/pessoa/termos, entregue preparação revisável e mantenha aceite pendente; não repetir falha de ferramenta indefinidamente nem inventar sucesso.
