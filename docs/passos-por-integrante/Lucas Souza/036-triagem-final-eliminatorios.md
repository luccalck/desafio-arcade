# Passo 036 — Executar triagem final e auditoria eliminatória

**Responsável proposto:** Lucas Souza · SRE e Segurança. **Revisor proposto:** Lucca Castilho (conta real a confirmar).
**INT:** INT-09/05/07/03. **Roteiros preservados:** S04/S06. **Checkpoint:** G7.
**Dependências de execução:** 035. Estes números são entradas; preparação independente pode avançar sem fingir aceite final. Histórico de gates é G0→G8.

- [ ] Trabalho implementado/documentado com autoria real.
- [ ] Validações executadas e evidências arquivadas.
- [ ] Commit/push pela identidade GitHub do responsável.
- [ ] PR revisado por outro autor e CI verde.
- [ ] Checks aplicáveis atualizados, sem declarações fictícias.

## Prompt profissional — copiar este conteúdo para a IA

Você atua como especialista em desenvolvimento de jogos educativos WEB, DevOps, qualidade, segurança e comunicação técnica. Trabalha com **Lucas Souza**, responsável por este passo. Execute **somente o passo 036: Executar triagem final e auditoria eliminatória** e as preparações necessárias autorizadas, preservando alterações do usuário. Não executar passos futuros indiscriminadamente.

### Contexto e fontes obrigatórias

O projeto é Rota do Código/Desafio Arcade, oficina Python de cinco missões e desafio final já implementada. Tem que continuar WEB estático, responsivo, offline, sem engine instalada pelo jogador, backend obrigatório ou serviço pago. Stack existente: TypeScript/HTML/CSS/SVG, esbuild, Ajv, Vitest/Playwright, Node24/npm lockfile, GitHub Actions/Pages. Python dos desafios é subset AST, não aplicativo nativo.

Repositório: https://github.com/luccalck/desafio-arcade . Fonte local de referência: `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`; em outro computador, localizar o clone real com `git rev-parse --show-toplevel`, não criar cópia concorrente. A branch completa estava em feature/primeiro-ciclo/PR#2; main era bootstrap. Inspecione estado atual/remotes antes de escolher base e preservar main protegida.

Leia `docs/checklist-avaliacao.md`, `docs/auditoria-avaliacao.md`, `docs/gdd.md`, `README.md`, `SQUAD.md`, `AI-USAGE.md`, `THIRD_PARTY.md`, `SECURITY.md`, o índice deste conjunto e o roteiro S04/S06 no contexto. Leia também o HTML **inteiro**, suas abas e JavaScript da ficha, em `C:/Users/user/Downloads/jogo/Avaliação.html` (ou a cópia de Downloads), e modelo GDD se o passo envolver documento. Em outro computador, peça acesso aos originais faltantes; não alegue que os leu se indisponíveis. Os originais são preservados e não devem ser sobrescritos.

Confirme instruções aplicáveis do ambiente/AGENTS.md. Dados de RAs, contas dos outros integrantes, nome do squad e aceites humanos ainda precisam confirmação; não inventar. Os arquivos deste plano foram preparados pela IA para Lucca, não contam como contribuição de Davi/Miguel/Lucas.

### Resultado específico e execução

1. Execute triagem na v1.0.0 contra produção e pacote final. TRIAGEM APROVADA só quando PDF, ZIP, vídeo, manifesto, squad, prazo, URL e smoke passam de verdade.
2. Audite condições eliminatórias: plágio/licença zera squad; produção manual zera INT-07; credencial real zera INT-05 e exige revogação; clone limpo falhando zera INT-03. Conferir regra de prazo original sem inventar cronologia.
3. Verifique histórico gh-pages, bot, ator e motivo do rollout, permissões, scanners, SBOM, revisão humana da IA e ausência de CPF/assinaturas/segredos nos artefatos.
4. Se algum item falhar, manter INT e declaração abertos, corrigir por PR/pipeline e não sobrescrever release imutável. Não maquiar logs nem mudar relógio.
5. Consolidar evidências de G7 para ficha 037; manter vigilância 032 e produção saudável.

Arquivos/configurações a inspecionar/criar/alterar **relativos ao clone real**, com escopo limitado:

- `scripts/triagem.sh`
- `docs/evidencias/triagem-final.md`
- `submissao artefato CI`
- `docs/checklist-avaliacao.md`

Se houver equivalente já funcional, reutilize e documente o caminho efetivo. Não substituir o projeto por scaffold novo. Quem altera workflow compartilhado coordena com Plataforma; não sobrescrever mudança de outra pessoa. Dados de monitoramento ficam em observabilidade, site em gh-pages, fonte em main/branches de PR; quatro pastas deste plano contêm somente prompts, não quatro jogos.

### Checks pendentes atribuídos a este passo

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

### Rubrica, integridade e aceites

Busque a faixa avançada de cada INT relacionado: mínimos + aceites + critério avançado. Nota oficial não é garantida. Fórmula `(0,7×A + 0,3×B)×F`; A pesos INT01–10 = 10/8/15/12/10/10/12/10/8/5; B originalidade25/execução25/jogabilidade30/apresentação20. Para F1 cada pessoa precisa commits e PRs aprovados em >=3 INT diferentes e participar da banca. Revisão não substitui autoria; mínimo squad >=10 PRs reais revisados por outro autor. Não criar commits vazios, dividir artificialmente trabalho nem simular colegas.

Eliminatórios: plágio/ativo sem licença zera squad; produção manual zera INT07; credencial real zera INT05 e exige revogação; pipeline sem clone limpo zera INT03; regra de prazo original deve ser conferida sem cronologia inventada. Nunca testar com segredo real. Não publicar CPF/assinatura/token em arquivo, log, screenshot, relatório ou release. IA exige registro e revisão humana antes do merge. Concurso é opcional e não autoriza inscrição/aceite de termos/uso de imagem em nome dos outros.

Validações específicas e resultados esperados:

- No runner: bash scripts/triagem.sh submissao; sha256sum -c submissao/MANIFESTO.sha256; pdfinfo/ffprobe/Playwright reais.
- Arquivar tag/source/run, relatório eliminatório e TRIAGEM APROVADA somente se tudo passar.

Para alteração de código, crie primeiro regressão significativa quando houver comportamento novo/bug verificável, execute a falha e corrija; para documentação, confira conteúdo/link/evidência sem inventar testes. Não executar teste espelhado da implementação nem repetir suites sem necessidade. CI obrigatória deve passar. No PowerShell local, configure `$env:npm_config_script_shell = (Get-Command pwsh).Source` se houver EACCES de cmd. Na CI Linux use comandos nativos do runner.

### Commit obrigatório pelo GitHub do usuário responsável

**Faça commit pelo GitHub do usuário Lucas Souza, usando a própria conta autenticada e a identidade Git real desse usuário.** Não faça commit em nome de luccalck se a pessoa atual for outra, não use conta de colega e não invente e-mail/username. Verifique antes de gravar:

```sh
git status --short
git remote -v
git config --get user.name
git config --get user.email
gh api user --jq .login
```

Se identidade/autenticação não corresponderem ao responsável, peça que ele autentique sua conta e configure nome/e-mail Git; nunca solicitar token no chat. Continue apenas preparações que não forjem autoria. Branch sugerida deste passo: `feature/passo-036-triagem-final-eliminatorios`; crie a partir de base real aprovada/dependência, sem descartar alterações. Exemplo do fluxo, **após conferir base e arquivos**:

```sh
git switch -c feature/passo-036-triagem-final-eliminatorios
git diff --check
```

Use `git add` somente com caminhos efetivamente alterados neste escopo, revise diff staged e scanner, então:

```sh
git diff --cached --check
git diff --cached --stat
git commit -m "docs: executar triagem final e auditoria eliminatória"
git push -u origin HEAD
gh pr create --base main --draft --title "Passo 036: Executar triagem final e auditoria eliminatória" --body-file .contexto/pr-passo-036.md
```

Escolha prefixo Conventional correto: docs/ci/test/fix/feat conforme mudança; mensagem em português. Crie body-file real com problema→resultado→INT→checks→comandos/resultados→IA→pendências→evidências, novas linhas verdadeiras. Solicite revisão humana do colega confirmado **Lucca Castilho** pela conta GitHub fornecida; não adivinhar @username. Aguarde CI/revisão, não dar merge próprio sem aceite. Se um PR for criado por ferramenta Codex, anexar ao chat com attach_artifact. Não modificar main/gh-pages manualmente nem burlar check/reviewer.

### Evidências, pessoas e resposta final

Revisão de outro integrante antes do merge. Não simular identidade ou aceite.

Atualize `docs/checklist-avaliacao.md` só com provas: data real, SHA/tag/run/URL, arquivos, comandos e resultado. Atualize AI-USAGE com ferramenta/finalidade/prompt resumido/resultado/revisão/PR verdadeiro. Registre status no `03-controle-execucao.md` e índice de evidências, sem dizer que todo INT foi aceito quando apenas parte foi concluída.

Quando for possível, preencha ficha original no navegador com dados e URLs reais já verificados; autoavaliações10 são estimativas solicitadas, não nota atribuída. Check de entrega e declarações só quando verdadeiros. Não alterar original/JS para liberar botão nem enviar e-mail/AVA sem autorização no contexto da execução. Se a sessão for interrompida, salvar estado administrativo local fora dos entregáveis acadêmicos.

Ao terminar, informe objetivamente: passo/INT/checks realmente fechados, arquivos, execução/testes, commit do usuário/PR/revisor, evidências, pendências humanas e próximo passo habilitado. Se bloqueado por acesso/pessoa/termos, entregue preparação revisável e mantenha aceite pendente; não repetir falha de ferramenta indefinidamente nem inventar sucesso.
