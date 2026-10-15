# MD 3/5 — Etapas 025–026: gdd ensaio falha

**Responsável:** Miguel Oliveira · conta real esperada: `miguelsenai2024`. **Organização atual:** cinco MDs deste integrante, sem reduzir as dez etapas originais. Os números 025/026 continuam no controle e no registro único de pendências. A preparação destes prompts por Lucca/IA não constitui contribuição do colega.

## Prompt de execução do arquivo completo

Leia este arquivo integralmente e execute **as etapas 025 e 026, nessa ordem**, com suas fontes, entradas, tarefas, checks e validações completos abaixo. Expressões como “este passo” nas seções de uma etapa se referem àquela etapa; o pedido para executar este MD abrange ambas. Não executar o próximo MD automaticamente.

1. Inspecione o clone e preserve alterações. Leia SQUAD, checklist, pendências, GDD e a passagem do bloco anterior; não presuma que a branch padrão foi aprovada ou integrada na main.
2. Confirme a identidade Git/GitHub real de Miguel Oliveira, conta `miguelsenai2024`, antes de qualquer commit. **Faça commit pela própria conta GitHub do responsável**, sem configurar a identidade de outra pessoa ou inventar e-mail. Lucca não executa estas etapas usando a identidade dos colegas.
3. Execute primeiro a etapa 025; registre provas e pendências na seção **Passo 025** do registro único. Depois execute a etapa 026, respeitando suas entradas, e registre **Passo 026**. Se faltar aceite humano, avance apenas preparações independentes permitidas; não invente a entrada nem libere produção.
4. Use uma branch curta real para este par, sugerida nas duas etapas. Se ela já foi criada na primeira etapa, reutilize-a na segunda; não repetir git switch -c. Se o PR do par já existe, atualize-o com commits e descrição reais em vez de criar PR duplicado. Faça commits substantivos e PR(s) revisáveis conforme o trabalho exigir; cinco MDs não significam somente cinco commits, nem revisão dispensada. Nunca dividir artificialmente commits para fabricar participação.
5. Preserve a diferenciação entre preparação, execução e aceite de G0–G8. Os roteiros C01/C02, P01–P07, D01–D07, R01–R07 e S01–S06 e os IDs do checklist continuam válidos. Não aceitar o par enquanto parte do trabalho realizável foi omitida; pendências humanas/finais devem ficar explícitas.
6. Ao terminar, atualizar checklist somente com provas, controle de ambas as etapas, AI-USAGE e pendências. Relatar arquivos, comandos, resultados, commits/PR/CI, revisão real e próximo MD. Ao concluir o quinto MD, registrar passagem do bloco; recebimento pelo colega é ação humana, não declaração da IA.

Os dados de equipe já confirmados estão em SQUAD; os RAs foram adiados e não devem ser inventados ou solicitados repetidamente. Estes prompts não alteram a decisão WEB/offline, a rubrica ou os critérios eliminatórios. Referências locais são relativas ao mesmo clone e os caminhos Windows originais são contexto; em outro computador localizar o clone real.

## Ordem e dependências preservadas

| Etapa | Entradas originais | Destino de evidências/pendências |
|---|---|---|
| [025](#etapa-025) | 005, 009, 021, 024 | Controle/registro único, seção 025 |
| [026](#etapa-026) | 020, 021, 022, 023, 024 | Controle/registro único, seção 026 |

## Etapa 025

### Revisar GDD vivo e PDF da candidata final

**Responsável:** Miguel Oliveira · bloco 3. **Papel oficial proposto:** Plataforma e Release. **Revisor proposto:** Lucas Souza (conta indicada em SQUAD; revisão efetiva ainda precisa ocorrer).
**INT:** INT-02/10/06. **Roteiros preservados:** P02/P07. **Checkpoint:** G5/G6.
**Dependências de execução:** 005, 009, 021, 024. Dependências técnicas vêm de números anteriores, do mesmo bloco ou do bloco já entregue. Revisões/dados humanos não dependem da vez de implementar. Gates continuam G0→G8.

- [ ] Trabalho implementado/documentado com autoria real.
- [ ] Validações executadas e evidências arquivadas.
- [ ] Commit/push pela identidade GitHub do responsável.
- [ ] PR revisado por outro autor e CI verde.
- [ ] Checks aplicáveis atualizados, sem declarações fictícias.

### Regra da execução por blocos

Este passo pertence ao bloco **021–030 de Miguel Oliveira**. Este bloco só inicia após a passagem do passo 020. Execute os cinco MDs do bloco em ordem, cumprindo as duas etapas de cada arquivo, respeitando as entradas anteriores; não espere implementação de outro integrante para um número dentro deste bloco. Ao concluir 030, faça a passagem descrita em `04-passagem-de-bloco.md`.

Revisão por outro autor, dados/acessos, consentimentos, playtest e banca continuam sendo ações humanas obrigatórias. O colega pode revisar já no primeiro bloco, antes de começar seus próprios cinco MDs. Finalizar este passo significa concluir seu escopo e entregar provas/contratos; não é assinalar checks de release, vídeo ou banca futuros. O próximo responsável executa a validação posterior, sem exigir que você volte a desenvolver seus passos.

### Prompt profissional — copiar este conteúdo para a IA

Você atua como especialista em desenvolvimento de jogos educativos WEB, DevOps, qualidade, segurança e comunicação técnica. Trabalha com **Miguel Oliveira**, responsável por este passo. Execute a **etapa 025: Revisar GDD vivo e PDF da candidata final** deste arquivo e as preparações necessárias autorizadas, preservando alterações do usuário. Não executar etapas externas ao par definido no cabeçalho deste MD.

Ao encerrar este passo, atualize `docs/execucao/05-pendencias-por-passo.md` na seção correspondente com todas as pendências reais, requisitos/checks, dependências, próximos passos e provas necessárias. Não fechar itens sem evidência; manter obrigações futuras explícitas.

#### Contexto e fontes obrigatórias

O projeto é Rota do Código/Desafio Arcade, oficina Python de cinco missões e desafio final já implementada. Tem que continuar WEB estático, responsivo, offline, sem engine instalada pelo jogador, backend obrigatório ou serviço pago. Stack existente: TypeScript/HTML/CSS/SVG, esbuild, Ajv, Vitest/Playwright, Node24/npm lockfile, GitHub Actions/Pages. Python dos desafios é subset AST, não aplicativo nativo.

Repositório: https://github.com/luccalck/desafio-arcade . Fonte local de referência: `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`; em outro computador, localizar o clone real com `git rev-parse --show-toplevel`, não criar cópia concorrente. A branch completa estava em feature/primeiro-ciclo/PR#2; main era bootstrap. Inspecione estado atual/remotes antes de escolher base e preservar main protegida.

Leia `docs/gestao/checklist-avaliacao.md`, `docs/gestao/auditoria-avaliacao.md`, `docs/gdd.md`, `README.md`, `SQUAD.md`, `AI-USAGE.md`, `THIRD_PARTY.md`, `SECURITY.md`, o índice deste conjunto e o roteiro P02/P07 no contexto. Leia também o HTML **inteiro**, suas abas e JavaScript da ficha, em `C:/Users/user/Downloads/jogo/Avaliação.html` (ou a cópia de Downloads), e modelo GDD se o passo envolver documento. Em outro computador, peça acesso aos originais faltantes; não alegue que os leu se indisponíveis. Os originais são preservados e não devem ser sobrescritos.

Confirme instruções aplicáveis do ambiente/AGENTS.md. Use os nomes, squad e contas já confirmados em SQUAD; RAs seguem adiados. Acessos, revisão e demais aceites humanos exigem prova real; não inventar nem solicitar novamente dados já disponíveis. Os arquivos deste plano foram preparados pela IA para Lucca, não contam como contribuição de Davi/Miguel/Lucas.

#### Resultado específico e execução

1. Confronte doze seções/tabelas/declarações do modelo e mínimo HTML com implementação atual, telas Stitch reais, fluxos/mapas e IA/direitos. Identificação real precisa estar completa.
2. Garanta atualização por PR em cada mudança de mecânica, com revisão de outro integrante. Arquive PDF automático e valide pdfinfo/legibilidade página a página.
3. Use versão SemVer/data geradas/coerentes com a candidata e futura tag, sem retroagir. Links vídeo/release/produção só entram quando disponíveis; manter pendência até prova.
4. Confirme high concept <=1000 caracteres e roadmap claramente futuro. Não usar GDD como relatório técnico.
5. Prepare GDD final para release; depois do passo35 reconfira tag/metadata e reabra checks se divergir.

Arquivos/configurações a inspecionar/criar/alterar **relativos ao clone real**, com escopo limitado:

- `docs/gdd.md`
- `scripts/gdd-pdf.mjs`
- `docs/evidencias/gdd-final.md`
- `docs/images/`

Se houver equivalente já funcional, reutilize e documente o caminho efetivo. Não substituir o projeto por scaffold novo. Quem altera workflow compartilhado coordena com Plataforma; não sobrescrever mudança de outra pessoa. Dados de monitoramento ficam em observabilidade, site em gh-pages, fonte em main/branches de PR; quatro pastas deste plano contêm somente prompts, não quatro jogos.

#### Checks pendentes atribuídos a este passo

Cada item abaixo vem literalmente do checklist inicial. Alguns exigem execução posterior, reconferência final ou condição opcional. Preparar código não encerra execução/humano. Não mudar um checkbox condicional para [x] quando não aplicável: registrar decisão com fonte. Consulte mapa para referências compartilhadas.

- [ ] **I02-09** — GDD efetivamente revisado e aprovado por PR por outro integrante.
- [ ] **I02-14** — AVANÇADO: GDD vivo, atualizado por PR revisado a cada mudança de mecânica.

#### Rubrica, integridade e aceites

Busque a faixa avançada de cada INT relacionado: mínimos + aceites + critério avançado. Nota oficial não é garantida. Fórmula `(0,7×A + 0,3×B)×F`; A pesos INT01–10 = 10/8/15/12/10/10/12/10/8/5; B originalidade25/execução25/jogabilidade30/apresentação20. Para F1 cada pessoa precisa commits e PRs aprovados em >=3 INT diferentes e participar da banca. Revisão não substitui autoria; mínimo squad >=10 PRs reais revisados por outro autor. Não criar commits vazios, dividir artificialmente trabalho nem simular colegas.

Eliminatórios: plágio/ativo sem licença zera squad; produção manual zera INT07; credencial real zera INT05 e exige revogação; pipeline sem clone limpo zera INT03; regra de prazo original deve ser conferida sem cronologia inventada. Nunca testar com segredo real. Não publicar CPF/assinatura/token em arquivo, log, screenshot, relatório ou release. IA exige registro e revisão humana antes do merge. Concurso é opcional e não autoriza inscrição/aceite de termos/uso de imagem em nome dos outros.

Validações específicas e resultados esperados:

- npm run gdd:pdf; pdfinfo artifacts/GDD.pdf; inspeção visual e extração de texto versão/seções.
- PR humano aprovado; PDFs/links e metadata final conferidos após release35.

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

Se identidade/autenticação não corresponderem ao responsável, peça que ele autentique sua conta e configure nome/e-mail Git; nunca solicitar token no chat. Continue apenas preparações que não forjem autoria. Branch sugerida deste passo: `feature/passos-025-026-gdd-ensaio-falha`; crie a partir de base real aprovada/dependência, sem descartar alterações. Exemplo do fluxo, **após conferir base e arquivos**:

```sh
git switch -c feature/passos-025-026-gdd-ensaio-falha
git diff --check
```

Use `git add` somente com caminhos efetivamente alterados neste escopo, revise diff staged e scanner, então:

```sh
git diff --cached --check
git diff --cached --stat
git commit -m "docs: revisar gdd vivo e pdf da candidata final
"
git push -u origin HEAD
gh pr create --base main --draft --title "Passo 025: Revisar GDD vivo e PDF da candidata final" --body-file .contexto/pr-passo-025.md
```

Escolha prefixo Conventional correto: docs/ci/test/fix/feat conforme mudança; mensagem em português. Crie body-file real com problema→resultado→INT→checks→comandos/resultados→IA→pendências→evidências, novas linhas verdadeiras. Solicite revisão humana do colega confirmado **Lucas Souza** pela conta GitHub fornecida; não adivinhar @username. Aguarde CI/revisão, não dar merge próprio sem aceite. Se um PR for criado por ferramenta Codex, anexar ao chat com attach_artifact. Não modificar main/gh-pages manualmente nem burlar check/reviewer.

#### Evidências, pessoas e resposta final

Revisão de outro integrante antes do merge. Não simular identidade ou aceite.

Atualize `docs/gestao/checklist-avaliacao.md` só com provas: data real, SHA/tag/run/URL, arquivos, comandos e resultado. Atualize AI-USAGE com ferramenta/finalidade/prompt resumido/resultado/revisão/PR verdadeiro. Registre status no `03-controle-execucao.md` e índice de evidências, sem dizer que todo INT foi aceito quando apenas parte foi concluída.

Quando for possível, preencha ficha original no navegador com dados e URLs reais já verificados; autoavaliações10 são estimativas solicitadas, não nota atribuída. Check de entrega e declarações só quando verdadeiros. Não alterar original/JS para liberar botão nem enviar e-mail/AVA sem autorização no contexto da execução. Se a sessão for interrompida, salvar estado administrativo local fora dos entregáveis acadêmicos.

Ao terminar, informe objetivamente: passo/INT/checks realmente fechados, arquivos, execução/testes, commit do usuário/PR/revisor, evidências, pendências humanas e próximo passo habilitado. Se bloqueado por acesso/pessoa/termos, entregue preparação revisável e mantenha aceite pendente; não repetir falha de ferramenta indefinidamente nem inventar sucesso.

---

## Etapa 026

### Ensaiar falha controlada, recuperação e regressões

**Responsável:** Miguel Oliveira · bloco 3. **Papel oficial proposto:** Plataforma e Release. **Revisor proposto:** Lucas Souza (conta indicada em SQUAD; revisão efetiva ainda precisa ocorrer).
**INT:** INT-07/04/08. **Roteiros preservados:** D06/D07/R06/S05. **Checkpoint:** G5.
**Dependências de execução:** 020, 021, 022, 023, 024. Dependências técnicas vêm de números anteriores, do mesmo bloco ou do bloco já entregue. Revisões/dados humanos não dependem da vez de implementar. Gates continuam G0→G8.

- [ ] Trabalho implementado/documentado com autoria real.
- [ ] Validações executadas e evidências arquivadas.
- [ ] Commit/push pela identidade GitHub do responsável.
- [ ] PR revisado por outro autor e CI verde.
- [ ] Checks aplicáveis atualizados, sem declarações fictícias.

### Regra da execução por blocos

Este passo pertence ao bloco **021–030 de Miguel Oliveira**. Este bloco só inicia após a passagem do passo 020. Execute os cinco MDs do bloco em ordem, cumprindo as duas etapas de cada arquivo, respeitando as entradas anteriores; não espere implementação de outro integrante para um número dentro deste bloco. Ao concluir 030, faça a passagem descrita em `04-passagem-de-bloco.md`.

Revisão por outro autor, dados/acessos, consentimentos, playtest e banca continuam sendo ações humanas obrigatórias. O colega pode revisar já no primeiro bloco, antes de começar seus próprios cinco MDs. Finalizar este passo significa concluir seu escopo e entregar provas/contratos; não é assinalar checks de release, vídeo ou banca futuros. O próximo responsável executa a validação posterior, sem exigir que você volte a desenvolver seus passos.

### Prompt profissional — copiar este conteúdo para a IA

Você atua como especialista em desenvolvimento de jogos educativos WEB, DevOps, qualidade, segurança e comunicação técnica. Trabalha com **Miguel Oliveira**, responsável por este passo. Execute a **etapa 026: Ensaiar falha controlada, recuperação e regressões** deste arquivo e as preparações necessárias autorizadas, preservando alterações do usuário. Não executar etapas externas ao par definido no cabeçalho deste MD.

Ao encerrar este passo, atualize `docs/execucao/05-pendencias-por-passo.md` na seção correspondente com todas as pendências reais, requisitos/checks, dependências, próximos passos e provas necessárias. Não fechar itens sem evidência; manter obrigações futuras explícitas.

#### Contexto e fontes obrigatórias

O projeto é Rota do Código/Desafio Arcade, oficina Python de cinco missões e desafio final já implementada. Tem que continuar WEB estático, responsivo, offline, sem engine instalada pelo jogador, backend obrigatório ou serviço pago. Stack existente: TypeScript/HTML/CSS/SVG, esbuild, Ajv, Vitest/Playwright, Node24/npm lockfile, GitHub Actions/Pages. Python dos desafios é subset AST, não aplicativo nativo.

Repositório: https://github.com/luccalck/desafio-arcade . Fonte local de referência: `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`; em outro computador, localizar o clone real com `git rev-parse --show-toplevel`, não criar cópia concorrente. A branch completa estava em feature/primeiro-ciclo/PR#2; main era bootstrap. Inspecione estado atual/remotes antes de escolher base e preservar main protegida.

Leia `docs/gestao/checklist-avaliacao.md`, `docs/gestao/auditoria-avaliacao.md`, `docs/gdd.md`, `README.md`, `SQUAD.md`, `AI-USAGE.md`, `THIRD_PARTY.md`, `SECURITY.md`, o índice deste conjunto e o roteiro D06/D07/R06/S05 no contexto. Leia também o HTML **inteiro**, suas abas e JavaScript da ficha, em `C:/Users/user/Downloads/jogo/Avaliação.html` (ou a cópia de Downloads), e modelo GDD se o passo envolver documento. Em outro computador, peça acesso aos originais faltantes; não alegue que os leu se indisponíveis. Os originais são preservados e não devem ser sobrescritos.

Confirme instruções aplicáveis do ambiente/AGENTS.md. Use os nomes, squad e contas já confirmados em SQUAD; RAs seguem adiados. Acessos, revisão e demais aceites humanos exigem prova real; não inventar nem solicitar novamente dados já disponíveis. Os arquivos deste plano foram preparados pela IA para Lucca, não contam como contribuição de Davi/Miguel/Lucas.

#### Resultado específico e execução

1. Combine janela/controlador/versão anterior saudável com squad. Produza versão defeituosa controlada pela pipeline, mantendo estável disponível até teste planejado; não editar produção à mão.
2. Dispare falha autorizada, preserve detecção real por smoke/alerta, timestamps dos workflows/Issues e recuperação. Não incluir tempos falsos ou cortar propagação Pages.
3. Comprove rollback automático e manual conforme plano, URL sem queda, versão antiga saudável e alerta autocerrado; mede <5 minutos inteiro.
4. Documente bug real existente com falha anterior/teste correspondente/correção; defeito injetado do ensaio não substitui automaticamente bug de produto.
5. Se tempo ultrapassar meta, investigar e corrigir por PR, repetir somente quando mudança justificar; não ocultar tentativa anterior.

Arquivos/configurações a inspecionar/criar/alterar **relativos ao clone real**, com escopo limitado:

- `docs/evidencias/ensaio-recuperacao.md`
- `docs/evidencias/bug-regressao.md`
- `tests/e2e/`
- `Issue real de ensaio`

Se houver equivalente já funcional, reutilize e documente o caminho efetivo. Não substituir o projeto por scaffold novo. Quem altera workflow compartilhado coordena com Plataforma; não sobrescrever mudança de outra pessoa. Dados de monitoramento ficam em observabilidade, site em gh-pages, fonte em main/branches de PR; quatro pastas deste plano contêm somente prompts, não quatro jogos.

#### Checks pendentes atribuídos a este passo

Cada item abaixo vem literalmente do checklist inicial. Alguns exigem execução posterior, reconferência final ou condição opcional. Preparar código não encerra execução/humano. Não mudar um checkbox condicional para [x] quando não aplicável: registrar decisão com fonte. Consulte mapa para referências compartilhadas.

- [ ] **I07-20** — Ensaio com versão defeituosa proposital, controlado e rastreável.
- [ ] **I07-21** — Detecção da falha por alerta ou smoke, com evidência real.
- [ ] **I07-22** — Cronometrar recuperação <5 minutos, incluindo propagação Pages.
- [ ] **I07-23** — Demonstrar rollback sem a URL sair do ar.
- [ ] **I07-25** — AVANÇADO: comprovar rollback automático e recuperação <5 minutos na banca, sem indisponibilidade (I07-16/22/23/24).
- [ ] **I08-31** — AVANÇADO: alerta realmente disparado e tratado, com histórico e recuperação.
- [ ] **CR-03** — Conferir atividades previstas para 06–08/10: INT-04/05/07/08 funcionando, ensaio cronometrado, gravação e triagem aprovada.

#### Rubrica, integridade e aceites

Busque a faixa avançada de cada INT relacionado: mínimos + aceites + critério avançado. Nota oficial não é garantida. Fórmula `(0,7×A + 0,3×B)×F`; A pesos INT01–10 = 10/8/15/12/10/10/12/10/8/5; B originalidade25/execução25/jogabilidade30/apresentação20. Para F1 cada pessoa precisa commits e PRs aprovados em >=3 INT diferentes e participar da banca. Revisão não substitui autoria; mínimo squad >=10 PRs reais revisados por outro autor. Não criar commits vazios, dividir artificialmente trabalho nem simular colegas.

Eliminatórios: plágio/ativo sem licença zera squad; produção manual zera INT07; credencial real zera INT05 e exige revogação; pipeline sem clone limpo zera INT03; regra de prazo original deve ser conferida sem cronologia inventada. Nunca testar com segredo real. Não publicar CPF/assinatura/token em arquivo, log, screenshot, relatório ou release. IA exige registro e revisão humana antes do merge. Concurso é opcional e não autoriza inscrição/aceite de termos/uso de imagem em nome dos outros.

Validações específicas e resultados esperados:

- Logs/Issues/Pages/smoke e cronômetro real ou timestamps verificáveis mostram sequência completa.
- npm run test:ci/test:e2e; nenhum bug bloqueante na candidata após recuperação.

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

Se identidade/autenticação não corresponderem ao responsável, peça que ele autentique sua conta e configure nome/e-mail Git; nunca solicitar token no chat. Continue apenas preparações que não forjem autoria. Branch sugerida deste passo: `feature/passos-025-026-gdd-ensaio-falha`; crie a partir de base real aprovada/dependência, sem descartar alterações. Exemplo do fluxo, **após conferir base e arquivos**:

```sh
git switch -c feature/passos-025-026-gdd-ensaio-falha
git diff --check
```

Use `git add` somente com caminhos efetivamente alterados neste escopo, revise diff staged e scanner, então:

```sh
git diff --cached --check
git diff --cached --stat
git commit -m "test: ensaiar falha controlada, recuperação e regressões
"
git push -u origin HEAD
gh pr create --base main --draft --title "Passo 026: Ensaiar falha controlada, recuperação e regressões" --body-file .contexto/pr-passo-026.md
```

Escolha prefixo Conventional correto: docs/ci/test/fix/feat conforme mudança; mensagem em português. Crie body-file real com problema→resultado→INT→checks→comandos/resultados→IA→pendências→evidências, novas linhas verdadeiras. Solicite revisão humana do colega confirmado **Lucas Souza** pela conta GitHub fornecida; não adivinhar @username. Aguarde CI/revisão, não dar merge próprio sem aceite. Se um PR for criado por ferramenta Codex, anexar ao chat com attach_artifact. Não modificar main/gh-pages manualmente nem burlar check/reviewer.

#### Evidências, pessoas e resposta final

Ensaio operacional precisa ser combinado com humanos; banca exige demonstração real posterior, não somente este ensaio.

Atualize `docs/gestao/checklist-avaliacao.md` só com provas: data real, SHA/tag/run/URL, arquivos, comandos e resultado. Atualize AI-USAGE com ferramenta/finalidade/prompt resumido/resultado/revisão/PR verdadeiro. Registre status no `03-controle-execucao.md` e índice de evidências, sem dizer que todo INT foi aceito quando apenas parte foi concluída.

Quando for possível, preencha ficha original no navegador com dados e URLs reais já verificados; autoavaliações10 são estimativas solicitadas, não nota atribuída. Check de entrega e declarações só quando verdadeiros. Não alterar original/JS para liberar botão nem enviar e-mail/AVA sem autorização no contexto da execução. Se a sessão for interrompida, salvar estado administrativo local fora dos entregáveis acadêmicos.

Ao terminar, informe objetivamente: passo/INT/checks realmente fechados, arquivos, execução/testes, commit do usuário/PR/revisor, evidências, pendências humanas e próximo passo habilitado. Se bloqueado por acesso/pessoa/termos, entregue preparação revisável e mantenha aceite pendente; não repetir falha de ferramenta indefinidamente nem inventar sucesso.
