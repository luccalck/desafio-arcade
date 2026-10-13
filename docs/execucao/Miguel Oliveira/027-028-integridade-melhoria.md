# MD 4/5 — Etapas 027–028: integridade melhoria

**Responsável:** Miguel Oliveira · conta real esperada: `miguelsenai2024`. **Organização atual:** cinco MDs deste integrante, sem reduzir as dez etapas originais. Os números 027/028 continuam no controle e no registro único de pendências. A preparação destes prompts por Lucca/IA não constitui contribuição do colega.

## Prompt de execução do arquivo completo

Leia este arquivo integralmente e execute **as etapas 027 e 028, nessa ordem**, com suas fontes, entradas, tarefas, checks e validações completos abaixo. Expressões como “este passo” nas seções de uma etapa se referem àquela etapa; o pedido para executar este MD abrange ambas. Não executar o próximo MD automaticamente.

1. Inspecione o clone e preserve alterações. Leia SQUAD, checklist, pendências, GDD e a passagem do bloco anterior; não presuma que a branch padrão foi aprovada ou integrada na main.
2. Confirme a identidade Git/GitHub real de Miguel Oliveira, conta `miguelsenai2024`, antes de qualquer commit. **Faça commit pela própria conta GitHub do responsável**, sem configurar a identidade de outra pessoa ou inventar e-mail. Lucca não executa estas etapas usando a identidade dos colegas.
3. Execute primeiro a etapa 027; registre provas e pendências na seção **Passo 027** do registro único. Depois execute a etapa 028, respeitando suas entradas, e registre **Passo 028**. Se faltar aceite humano, avance apenas preparações independentes permitidas; não invente a entrada nem libere produção.
4. Use uma branch curta real para este par, sugerida nas duas etapas. Se ela já foi criada na primeira etapa, reutilize-a na segunda; não repetir git switch -c. Se o PR do par já existe, atualize-o com commits e descrição reais em vez de criar PR duplicado. Faça commits substantivos e PR(s) revisáveis conforme o trabalho exigir; cinco MDs não significam somente cinco commits, nem revisão dispensada. Nunca dividir artificialmente commits para fabricar participação.
5. Preserve a diferenciação entre preparação, execução e aceite de G0–G8. Os roteiros C01/C02, P01–P07, D01–D07, R01–R07 e S01–S06 e os IDs do checklist continuam válidos. Não aceitar o par enquanto parte do trabalho realizável foi omitida; pendências humanas/finais devem ficar explícitas.
6. Ao terminar, atualizar checklist somente com provas, controle de ambas as etapas, AI-USAGE e pendências. Relatar arquivos, comandos, resultados, commits/PR/CI, revisão real e próximo MD. Ao concluir o quinto MD, registrar passagem do bloco; recebimento pelo colega é ação humana, não declaração da IA.

Os dados de equipe já confirmados estão em SQUAD; os RAs foram adiados e não devem ser inventados ou solicitados repetidamente. Estes prompts não alteram a decisão WEB/offline, a rubrica ou os critérios eliminatórios. Referências locais são relativas ao mesmo clone e os caminhos Windows originais são contexto; em outro computador localizar o clone real.

## Ordem e dependências preservadas

| Etapa | Entradas originais | Destino de evidências/pendências |
|---|---|---|
| [027](#etapa-027) | 015, 019, 025, 026 | Controle/registro único, seção 027 |
| [028](#etapa-028) | 024, 026, 027 | Controle/registro único, seção 028 |

## Etapa 027

### Verificar versão candidata, artefato e hashes PRD

**Responsável:** Miguel Oliveira · bloco 3. **Papel oficial proposto:** Plataforma e Release. **Revisor proposto:** Lucas Souza (conta indicada em SQUAD; revisão efetiva ainda precisa ocorrer).
**INT:** INT-06/07/03. **Roteiros preservados:** R02/R05. **Checkpoint:** G5/G6.
**Dependências de execução:** 015, 019, 025, 026. Dependências técnicas vêm de números anteriores, do mesmo bloco ou do bloco já entregue. Revisões/dados humanos não dependem da vez de implementar. Gates continuam G0→G8.

- [ ] Trabalho implementado/documentado com autoria real.
- [ ] Validações executadas e evidências arquivadas.
- [ ] Commit/push pela identidade GitHub do responsável.
- [ ] PR revisado por outro autor e CI verde.
- [ ] Checks aplicáveis atualizados, sem declarações fictícias.

### Regra da execução por blocos

Este passo pertence ao bloco **021–030 de Miguel Oliveira**. Este bloco só inicia após a passagem do passo 020. Execute os cinco MDs do bloco em ordem, cumprindo as duas etapas de cada arquivo, respeitando as entradas anteriores; não espere implementação de outro integrante para um número dentro deste bloco. Ao concluir 030, faça a passagem descrita em `04-passagem-de-bloco.md`.

Revisão por outro autor, dados/acessos, consentimentos, playtest e banca continuam sendo ações humanas obrigatórias. O colega pode revisar já no primeiro bloco, antes de começar seus próprios cinco MDs. Finalizar este passo significa concluir seu escopo e entregar provas/contratos; não é assinalar checks de release, vídeo ou banca futuros. O próximo responsável executa a validação posterior, sem exigir que você volte a desenvolver seus passos.

### Prompt profissional — copiar este conteúdo para a IA

Você atua como especialista em desenvolvimento de jogos educativos WEB, DevOps, qualidade, segurança e comunicação técnica. Trabalha com **Miguel Oliveira**, responsável por este passo. Execute a **etapa 027: Verificar versão candidata, artefato e hashes PRD** deste arquivo e as preparações necessárias autorizadas, preservando alterações do usuário. Não executar etapas externas ao par definido no cabeçalho deste MD.

Ao encerrar este passo, atualize `docs/execucao/05-pendencias-por-passo.md` na seção correspondente com todas as pendências reais, requisitos/checks, dependências, próximos passos e provas necessárias. Não fechar itens sem evidência; manter obrigações futuras explícitas.

#### Contexto e fontes obrigatórias

O projeto é Rota do Código/Desafio Arcade, oficina Python de cinco missões e desafio final já implementada. Tem que continuar WEB estático, responsivo, offline, sem engine instalada pelo jogador, backend obrigatório ou serviço pago. Stack existente: TypeScript/HTML/CSS/SVG, esbuild, Ajv, Vitest/Playwright, Node24/npm lockfile, GitHub Actions/Pages. Python dos desafios é subset AST, não aplicativo nativo.

Repositório: https://github.com/luccalck/desafio-arcade . Fonte local de referência: `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`; em outro computador, localizar o clone real com `git rev-parse --show-toplevel`, não criar cópia concorrente. A branch completa estava em feature/primeiro-ciclo/PR#2; main era bootstrap. Inspecione estado atual/remotes antes de escolher base e preservar main protegida.

Leia `docs/gestao/checklist-avaliacao.md`, `docs/gestao/auditoria-avaliacao.md`, `docs/gdd.md`, `README.md`, `SQUAD.md`, `AI-USAGE.md`, `THIRD_PARTY.md`, `SECURITY.md`, o índice deste conjunto e o roteiro R02/R05 no contexto. Leia também o HTML **inteiro**, suas abas e JavaScript da ficha, em `C:/Users/user/Downloads/jogo/Avaliação.html` (ou a cópia de Downloads), e modelo GDD se o passo envolver documento. Em outro computador, peça acesso aos originais faltantes; não alegue que os leu se indisponíveis. Os originais são preservados e não devem ser sobrescritos.

Confirme instruções aplicáveis do ambiente/AGENTS.md. Use os nomes, squad e contas já confirmados em SQUAD; RAs seguem adiados. Acessos, revisão e demais aceites humanos exigem prova real; não inventar nem solicitar novamente dados já disponíveis. Os arquivos deste plano foram preparados pela IA para Lucca, não contam como contribuição de Davi/Miguel/Lucas.

#### Resultado específico e execução

1. Prepare versão candidata 1.0.0 conforme SemVer e GDD revisado, com PR/CI/HML/PRD aprovados antes da gravação. Não criar tag v1.0.0 ainda; ela é passo35.
2. Do mesmo commit, reproduza build e compare dist ignorando somente data permitida. Confirme ZIP<25MB e index/LEIA-ME/version/licenças.
3. Compare checksum do ZIP aprovado HML com produção e release disponível; se tag final ainda ausente, prepare prova e deixe aceite final pendente até35.
4. Confirme metadados de versão na tela/JSON, exportação offline e arquivos publicados. Não reconstruir no deploy ou atualizar ZIP imutável.
5. Se após esta candidata houver mudança de jogo/versão, refazer checks e gravação afetada; relatório/triagem posterior não deve criar ciclo com build.

Arquivos/configurações a inspecionar/criar/alterar **relativos ao clone real**, com escopo limitado:

- `package.json`
- `package-lock.json`
- `scripts/reproducibility.mjs`
- `docs/evidencias/release-integridade.md`

Se houver equivalente já funcional, reutilize e documente o caminho efetivo. Não substituir o projeto por scaffold novo. Quem altera workflow compartilhado coordena com Plataforma; não sobrescrever mudança de outra pessoa. Dados de monitoramento ficam em observabilidade, site em gh-pages, fonte em main/branches de PR; quatro pastas deste plano contêm somente prompts, não quatro jogos.

#### Checks pendentes atribuídos a este passo

Este passo reconfere **I06-14/I06-16** e prepara **I06-15/I06-17**: candidata reproduzível, versão, offline, tamanho e hashes. A conferência contra a GitHub Release final é feita no035 por Lucas. Não exigir que Miguel crie tag final antes de entregar sua candidata.

Cada item abaixo vem literalmente do checklist inicial. Alguns exigem execução posterior, reconferência final ou condição opcional. Preparar código não encerra execução/humano. Não mudar um checkbox condicional para [x] quando não aplicável: registrar decisão com fonte. Consulte mapa para referências compartilhadas.


#### Rubrica, integridade e aceites

Busque a faixa avançada de cada INT relacionado: mínimos + aceites + critério avançado. Nota oficial não é garantida. Fórmula `(0,7×A + 0,3×B)×F`; A pesos INT01–10 = 10/8/15/12/10/10/12/10/8/5; B originalidade25/execução25/jogabilidade30/apresentação20. Para F1 cada pessoa precisa commits e PRs aprovados em >=3 INT diferentes e participar da banca. Revisão não substitui autoria; mínimo squad >=10 PRs reais revisados por outro autor. Não criar commits vazios, dividir artificialmente trabalho nem simular colegas.

Eliminatórios: plágio/ativo sem licença zera squad; produção manual zera INT07; credencial real zera INT05 e exige revogação; pipeline sem clone limpo zera INT03; regra de prazo original deve ser conferida sem cronologia inventada. Nunca testar com segredo real. Não publicar CPF/assinatura/token em arquivo, log, screenshot, relatório ou release. IA exige registro e revisão humana antes do merge. Concurso é opcional e não autoriza inscrição/aceite de termos/uso de imagem em nome dos outros.

Validações específicas e resultados esperados:

- npm ci; npm run build; npm run package; npm run reproducibility; hash SHA256 dos assets/ZIP publicados.
- Fonte/SHA/SemVer/data/digest/URL registrados, sem chamar candidata sem tag de release final.

Para alteração de código, crie primeiro regressão significativa quando houver comportamento novo/bug verificável, execute a falha e corrija; para documentação, confira conteúdo/link/evidência sem inventar testes. Não executar teste espelhado da implementação nem repetir suites sem necessidade. CI obrigatória deve passar. No PowerShell local, configure `$env:npm_config_script_shell = (Get-Command pwsh).Source` se houver EACCES de cmd. Na CI Linux use comandos nativos do runner.

#### Commit obrigatório pelo GitHub do usuário responsável

**Faça commit pelo GitHub do usuário Miguel Oliveira, usando a própria conta autenticada e a identidade Git real desse usuário.** Não faça commit em nome de luccalck se a pessoa atual for outra, não use conta de colega e não invente e-mail/username. Verifique antes de gravar:

```sh
git status --short
git remote -v
git config --get user.name
git config --get user.email
gh api user --jq .login
```

Se identidade/autenticação não corresponderem ao responsável, peça que ele autentique sua conta e configure nome/e-mail Git; nunca solicitar token no chat. Continue apenas preparações que não forjem autoria. Branch sugerida deste passo: `feature/passos-027-028-integridade-melhoria`; crie a partir de base real aprovada/dependência, sem descartar alterações. Exemplo do fluxo, **após conferir base e arquivos**:

```sh
git switch -c feature/passos-027-028-integridade-melhoria
git diff --check
```

Use `git add` somente com caminhos efetivamente alterados neste escopo, revise diff staged e scanner, então:

```sh
git diff --cached --check
git diff --cached --stat
git commit -m "test: verificar versão candidata, artefato e hashes prd
"
git push -u origin HEAD
gh pr create --base main --draft --title "Passo 027: Verificar versão candidata, artefato e hashes PRD" --body-file .contexto/pr-passo-027.md
```

Escolha prefixo Conventional correto: docs/ci/test/fix/feat conforme mudança; mensagem em português. Crie body-file real com problema→resultado→INT→checks→comandos/resultados→IA→pendências→evidências, novas linhas verdadeiras. Solicite revisão humana do colega confirmado **Lucas Souza** pela conta GitHub fornecida; não adivinhar @username. Aguarde CI/revisão, não dar merge próprio sem aceite. Se um PR for criado por ferramenta Codex, anexar ao chat com attach_artifact. Não modificar main/gh-pages manualmente nem burlar check/reviewer.

#### Evidências, pessoas e resposta final

Revisão de outro integrante antes do merge. Não simular identidade ou aceite.

Atualize `docs/gestao/checklist-avaliacao.md` só com provas: data real, SHA/tag/run/URL, arquivos, comandos e resultado. Atualize AI-USAGE com ferramenta/finalidade/prompt resumido/resultado/revisão/PR verdadeiro. Registre status no `03-controle-execucao.md` e índice de evidências, sem dizer que todo INT foi aceito quando apenas parte foi concluída.

Quando for possível, preencha ficha original no navegador com dados e URLs reais já verificados; autoavaliações10 são estimativas solicitadas, não nota atribuída. Check de entrega e declarações só quando verdadeiros. Não alterar original/JS para liberar botão nem enviar e-mail/AVA sem autorização no contexto da execução. Se a sessão for interrompida, salvar estado administrativo local fora dos entregáveis acadêmicos.

Ao terminar, informe objetivamente: passo/INT/checks realmente fechados, arquivos, execução/testes, commit do usuário/PR/revisor, evidências, pendências humanas e próximo passo habilitado. Se bloqueado por acesso/pessoa/termos, entregue preparação revisável e mantenha aceite pendente; não repetir falha de ferramenta indefinidamente nem inventar sucesso.

---

## Etapa 028

### Implementar e medir melhoria orientada por DORA

**Responsável:** Miguel Oliveira · bloco 3. **Papel oficial proposto:** Plataforma e Release. **Revisor proposto:** Lucas Souza (conta indicada em SQUAD; revisão efetiva ainda precisa ocorrer).
**INT:** INT-08/03/09. **Roteiros preservados:** S05/S06. **Checkpoint:** G5/G6.
**Dependências de execução:** 024, 026, 027. Dependências técnicas vêm de números anteriores, do mesmo bloco ou do bloco já entregue. Revisões/dados humanos não dependem da vez de implementar. Gates continuam G0→G8.

- [ ] Trabalho implementado/documentado com autoria real.
- [ ] Validações executadas e evidências arquivadas.
- [ ] Commit/push pela identidade GitHub do responsável.
- [ ] PR revisado por outro autor e CI verde.
- [ ] Checks aplicáveis atualizados, sem declarações fictícias.

### Regra da execução por blocos

Este passo pertence ao bloco **021–030 de Miguel Oliveira**. Este bloco só inicia após a passagem do passo 020. Execute os cinco MDs do bloco em ordem, cumprindo as duas etapas de cada arquivo, respeitando as entradas anteriores; não espere implementação de outro integrante para um número dentro deste bloco. Ao concluir 030, faça a passagem descrita em `04-passagem-de-bloco.md`.

Revisão por outro autor, dados/acessos, consentimentos, playtest e banca continuam sendo ações humanas obrigatórias. O colega pode revisar já no primeiro bloco, antes de começar seus próprios cinco MDs. Finalizar este passo significa concluir seu escopo e entregar provas/contratos; não é assinalar checks de release, vídeo ou banca futuros. O próximo responsável executa a validação posterior, sem exigir que você volte a desenvolver seus passos.

### Prompt profissional — copiar este conteúdo para a IA

Você atua como especialista em desenvolvimento de jogos educativos WEB, DevOps, qualidade, segurança e comunicação técnica. Trabalha com **Miguel Oliveira**, responsável por este passo. Execute a **etapa 028: Implementar e medir melhoria orientada por DORA** deste arquivo e as preparações necessárias autorizadas, preservando alterações do usuário. Não executar etapas externas ao par definido no cabeçalho deste MD.

Ao encerrar este passo, atualize `docs/execucao/05-pendencias-por-passo.md` na seção correspondente com todas as pendências reais, requisitos/checks, dependências, próximos passos e provas necessárias. Não fechar itens sem evidência; manter obrigações futuras explícitas.

#### Contexto e fontes obrigatórias

O projeto é Rota do Código/Desafio Arcade, oficina Python de cinco missões e desafio final já implementada. Tem que continuar WEB estático, responsivo, offline, sem engine instalada pelo jogador, backend obrigatório ou serviço pago. Stack existente: TypeScript/HTML/CSS/SVG, esbuild, Ajv, Vitest/Playwright, Node24/npm lockfile, GitHub Actions/Pages. Python dos desafios é subset AST, não aplicativo nativo.

Repositório: https://github.com/luccalck/desafio-arcade . Fonte local de referência: `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`; em outro computador, localizar o clone real com `git rev-parse --show-toplevel`, não criar cópia concorrente. A branch completa estava em feature/primeiro-ciclo/PR#2; main era bootstrap. Inspecione estado atual/remotes antes de escolher base e preservar main protegida.

Leia `docs/gestao/checklist-avaliacao.md`, `docs/gestao/auditoria-avaliacao.md`, `docs/gdd.md`, `README.md`, `SQUAD.md`, `AI-USAGE.md`, `THIRD_PARTY.md`, `SECURITY.md`, o índice deste conjunto e o roteiro S05/S06 no contexto. Leia também o HTML **inteiro**, suas abas e JavaScript da ficha, em `C:/Users/user/Downloads/jogo/Avaliação.html` (ou a cópia de Downloads), e modelo GDD se o passo envolver documento. Em outro computador, peça acesso aos originais faltantes; não alegue que os leu se indisponíveis. Os originais são preservados e não devem ser sobrescritos.

Confirme instruções aplicáveis do ambiente/AGENTS.md. Use os nomes, squad e contas já confirmados em SQUAD; RAs seguem adiados. Acessos, revisão e demais aceites humanos exigem prova real; não inventar nem solicitar novamente dados já disponíveis. Os arquivos deste plano foram preparados pela IA para Lucca, não contam como contribuição de Davi/Miguel/Lucas.

#### Resultado específico e execução

1. Escolha gargalo real observado em DORA/ensaio, defina hipótese e intervenção pequena mensurável: tempo HML/propagação/recuperação, por exemplo. Não assumir melhoria antes de medir.
2. Faça alteração substantiva no componente responsável, com testes e revisão do dono para evitar conflito. Não criar commits de fachada só para terceiro INT.
3. Reexecute esteira/sonda e calcule métricas após a mudança, comparando períodos/limites da amostra. Preserve resultados sem melhoria também.
4. Atualize painel e retrospectiva com antes/depois/decisão/efeito e links das execuções; não expor segredo nem forçar outage para inflar métrica.
5. Confirme G5 somente após recuperação real/Issues/bug/playtest e dados verificáveis.

Arquivos/configurações a inspecionar/criar/alterar **relativos ao clone real**, com escopo limitado:

- `docs/evidencias/melhoria-dora.md`
- `scripts/dora.mjs`
- `workflow ou script efetivamente identificado pelos dados`

Se houver equivalente já funcional, reutilize e documente o caminho efetivo. Não substituir o projeto por scaffold novo. Quem altera workflow compartilhado coordena com Plataforma; não sobrescrever mudança de outra pessoa. Dados de monitoramento ficam em observabilidade, site em gh-pages, fonte em main/branches de PR; quatro pastas deste plano contêm somente prompts, não quatro jogos.

#### Checks pendentes atribuídos a este passo

Cada item abaixo vem literalmente do checklist inicial. Alguns exigem execução posterior, reconferência final ou condição opcional. Preparar código não encerra execução/humano. Não mudar um checkbox condicional para [x] quando não aplicável: registrar decisão com fonte. Consulte mapa para referências compartilhadas.

- [ ] **ARQ-09** — Alertas/métricas retornam ao backlog e orientam mudança real pela esteira.
- [ ] **I08-28** — Tomar decisão de melhoria a partir dos dados reais.
- [ ] **I08-29** — Medir/documentar efeito da melhoria, sem fabricar ganho ou quantidade mínima de execuções.
- [ ] **I08-32** — AVANÇADO: melhoria orientada por métrica com resultado verificável.
- [ ] **G5** — Recuperação/dados: rollback comprovado, Issues tratadas, DORA real, bug/regressão e playtest documentados.

#### Rubrica, integridade e aceites

Busque a faixa avançada de cada INT relacionado: mínimos + aceites + critério avançado. Nota oficial não é garantida. Fórmula `(0,7×A + 0,3×B)×F`; A pesos INT01–10 = 10/8/15/12/10/10/12/10/8/5; B originalidade25/execução25/jogabilidade30/apresentação20. Para F1 cada pessoa precisa commits e PRs aprovados em >=3 INT diferentes e participar da banca. Revisão não substitui autoria; mínimo squad >=10 PRs reais revisados por outro autor. Não criar commits vazios, dividir artificialmente trabalho nem simular colegas.

Eliminatórios: plágio/ativo sem licença zera squad; produção manual zera INT07; credencial real zera INT05 e exige revogação; pipeline sem clone limpo zera INT03; regra de prazo original deve ser conferida sem cronologia inventada. Nunca testar com segredo real. Não publicar CPF/assinatura/token em arquivo, log, screenshot, relatório ou release. IA exige registro e revisão humana antes do merge. Concurso é opcional e não autoriza inscrição/aceite de termos/uso de imagem em nome dos outros.

Validações específicas e resultados esperados:

- Executar teste específico do componente modificado, CI e scripts/dora.mjs real com origem/janela.
- Resultado medido e limitação da comparação descritos; ausência de efeito não vira ganho fictício.

Para alteração de código, crie primeiro regressão significativa quando houver comportamento novo/bug verificável, execute a falha e corrija; para documentação, confira conteúdo/link/evidência sem inventar testes. Não executar teste espelhado da implementação nem repetir suites sem necessidade. CI obrigatória deve passar. No PowerShell local, configure `$env:npm_config_script_shell = (Get-Command pwsh).Source` se houver EACCES de cmd. Na CI Linux use comandos nativos do runner.

#### Commit obrigatório pelo GitHub do usuário responsável

**Faça commit pelo GitHub do usuário Miguel Oliveira, usando a própria conta autenticada e a identidade Git real desse usuário.** Não faça commit em nome de luccalck se a pessoa atual for outra, não use conta de colega e não invente e-mail/username. Verifique antes de gravar:

```sh
git status --short
git remote -v
git config --get user.name
git config --get user.email
gh api user --jq .login
```

Se identidade/autenticação não corresponderem ao responsável, peça que ele autentique sua conta e configure nome/e-mail Git; nunca solicitar token no chat. Continue apenas preparações que não forjem autoria. Branch sugerida deste passo: `feature/passos-027-028-integridade-melhoria`; crie a partir de base real aprovada/dependência, sem descartar alterações. Exemplo do fluxo, **após conferir base e arquivos**:

```sh
git switch -c feature/passos-027-028-integridade-melhoria
git diff --check
```

Use `git add` somente com caminhos efetivamente alterados neste escopo, revise diff staged e scanner, então:

```sh
git diff --cached --check
git diff --cached --stat
git commit -m "fix: implementar e medir melhoria orientada por dora
"
git push -u origin HEAD
gh pr create --base main --draft --title "Passo 028: Implementar e medir melhoria orientada por DORA" --body-file .contexto/pr-passo-028.md
```

Escolha prefixo Conventional correto: docs/ci/test/fix/feat conforme mudança; mensagem em português. Crie body-file real com problema→resultado→INT→checks→comandos/resultados→IA→pendências→evidências, novas linhas verdadeiras. Solicite revisão humana do colega confirmado **Lucas Souza** pela conta GitHub fornecida; não adivinhar @username. Aguarde CI/revisão, não dar merge próprio sem aceite. Se um PR for criado por ferramenta Codex, anexar ao chat com attach_artifact. Não modificar main/gh-pages manualmente nem burlar check/reviewer.

#### Evidências, pessoas e resposta final

Revisão de outro integrante antes do merge. Não simular identidade ou aceite.

Atualize `docs/gestao/checklist-avaliacao.md` só com provas: data real, SHA/tag/run/URL, arquivos, comandos e resultado. Atualize AI-USAGE com ferramenta/finalidade/prompt resumido/resultado/revisão/PR verdadeiro. Registre status no `03-controle-execucao.md` e índice de evidências, sem dizer que todo INT foi aceito quando apenas parte foi concluída.

Quando for possível, preencha ficha original no navegador com dados e URLs reais já verificados; autoavaliações10 são estimativas solicitadas, não nota atribuída. Check de entrega e declarações só quando verdadeiros. Não alterar original/JS para liberar botão nem enviar e-mail/AVA sem autorização no contexto da execução. Se a sessão for interrompida, salvar estado administrativo local fora dos entregáveis acadêmicos.

Ao terminar, informe objetivamente: passo/INT/checks realmente fechados, arquivos, execução/testes, commit do usuário/PR/revisor, evidências, pendências humanas e próximo passo habilitado. Se bloqueado por acesso/pessoa/termos, entregue preparação revisável e mantenha aceite pendente; não repetir falha de ferramenta indefinidamente nem inventar sucesso.
