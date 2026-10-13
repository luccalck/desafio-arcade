# Passo 019 — Entregar produção com aprovação e azul-verde

**Responsável proposto:** Miguel Oliveira · Plataforma e Release. **Revisor proposto:** Lucas Souza (conta real a confirmar).
**INT:** INT-03/07/06. **Roteiros preservados:** R05. **Checkpoint:** G4.
**Dependências de execução:** 011, 012, 014, 015, 016, 018. Estes números são entradas; preparação independente pode avançar sem fingir aceite final. Histórico de gates é G0→G8.

- [ ] Trabalho implementado/documentado com autoria real.
- [ ] Validações executadas e evidências arquivadas.
- [ ] Commit/push pela identidade GitHub do responsável.
- [ ] PR revisado por outro autor e CI verde.
- [ ] Checks aplicáveis atualizados, sem declarações fictícias.

## Prompt profissional — copiar este conteúdo para a IA

Você atua como especialista em desenvolvimento de jogos educativos WEB, DevOps, qualidade, segurança e comunicação técnica. Trabalha com **Miguel Oliveira**, responsável por este passo. Execute **somente o passo 019: Entregar produção com aprovação e azul-verde** e as preparações necessárias autorizadas, preservando alterações do usuário. Não executar passos futuros indiscriminadamente.

### Contexto e fontes obrigatórias

O projeto é Rota do Código/Desafio Arcade, oficina Python de cinco missões e desafio final já implementada. Tem que continuar WEB estático, responsivo, offline, sem engine instalada pelo jogador, backend obrigatório ou serviço pago. Stack existente: TypeScript/HTML/CSS/SVG, esbuild, Ajv, Vitest/Playwright, Node24/npm lockfile, GitHub Actions/Pages. Python dos desafios é subset AST, não aplicativo nativo.

Repositório: https://github.com/luccalck/desafio-arcade . Fonte local de referência: `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`; em outro computador, localizar o clone real com `git rev-parse --show-toplevel`, não criar cópia concorrente. A branch completa estava em feature/primeiro-ciclo/PR#2; main era bootstrap. Inspecione estado atual/remotes antes de escolher base e preservar main protegida.

Leia `docs/checklist-avaliacao.md`, `docs/auditoria-avaliacao.md`, `docs/gdd.md`, `README.md`, `SQUAD.md`, `AI-USAGE.md`, `THIRD_PARTY.md`, `SECURITY.md`, o índice deste conjunto e o roteiro R05 no contexto. Leia também o HTML **inteiro**, suas abas e JavaScript da ficha, em `C:/Users/user/Downloads/jogo/Avaliação.html` (ou a cópia de Downloads), e modelo GDD se o passo envolver documento. Em outro computador, peça acesso aos originais faltantes; não alegue que os leu se indisponíveis. Os originais são preservados e não devem ser sobrescritos.

Confirme instruções aplicáveis do ambiente/AGENTS.md. Dados de RAs, contas dos outros integrantes, nome do squad e aceites humanos ainda precisam confirmação; não inventar. Os arquivos deste plano foram preparados pela IA para Lucca, não contam como contribuição de Davi/Miguel/Lucas.

### Resultado específico e execução

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

### Checks pendentes atribuídos a este passo

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

### Rubrica, integridade e aceites

Busque a faixa avançada de cada INT relacionado: mínimos + aceites + critério avançado. Nota oficial não é garantida. Fórmula `(0,7×A + 0,3×B)×F`; A pesos INT01–10 = 10/8/15/12/10/10/12/10/8/5; B originalidade25/execução25/jogabilidade30/apresentação20. Para F1 cada pessoa precisa commits e PRs aprovados em >=3 INT diferentes e participar da banca. Revisão não substitui autoria; mínimo squad >=10 PRs reais revisados por outro autor. Não criar commits vazios, dividir artificialmente trabalho nem simular colegas.

Eliminatórios: plágio/ativo sem licença zera squad; produção manual zera INT07; credencial real zera INT05 e exige revogação; pipeline sem clone limpo zera INT03; regra de prazo original deve ser conferida sem cronologia inventada. Nunca testar com segredo real. Não publicar CPF/assinatura/token em arquivo, log, screenshot, relatório ou release. IA exige registro e revisão humana antes do merge. Concurso é opcional e não autoriza inscrição/aceite de termos/uso de imagem em nome dos outros.

Validações específicas e resultados esperados:

- gh run view e deployment/environment com aprovação real; HTTP raíz/HML/releases e version.json; smoke na versão candidata e estável.
- Mesmo hash da HML/PRD; sem rebuild; falha interrompe promoção/aciona recuperação quando aplicável.

Para alteração de código, crie primeiro regressão significativa quando houver comportamento novo/bug verificável, execute a falha e corrija; para documentação, confira conteúdo/link/evidência sem inventar testes. Não executar teste espelhado da implementação nem repetir suites sem necessidade. CI obrigatória deve passar. No PowerShell local, configure `$env:npm_config_script_shell = (Get-Command pwsh).Source` se houver EACCES de cmd. Na CI Linux use comandos nativos do runner.

### Commit obrigatório pelo GitHub do usuário responsável

**Faça commit pelo GitHub do usuário Miguel Oliveira, usando a própria conta autenticada e a identidade Git real desse usuário.** Não faça commit em nome de luccalck se a pessoa atual for outra, não use conta de colega e não invente e-mail/username. Verifique antes de gravar:

```sh
git status --short
git remote -v
git config --get user.name
git config --get user.email
gh api user --jq .login
```

Se identidade/autenticação não corresponderem ao responsável, peça que ele autentique sua conta e configure nome/e-mail Git; nunca solicitar token no chat. Continue apenas preparações que não forjem autoria. Branch sugerida deste passo: `feature/passo-019-producao-aprovacao`; crie a partir de base real aprovada/dependência, sem descartar alterações. Exemplo do fluxo, **após conferir base e arquivos**:

```sh
git switch -c feature/passo-019-producao-aprovacao
git diff --check
```

Use `git add` somente com caminhos efetivamente alterados neste escopo, revise diff staged e scanner, então:

```sh
git diff --cached --check
git diff --cached --stat
git commit -m "ci: entregar produção com aprovação e azul-verde"
git push -u origin HEAD
gh pr create --base main --draft --title "Passo 019: Entregar produção com aprovação e azul-verde" --body-file .contexto/pr-passo-019.md
```

Escolha prefixo Conventional correto: docs/ci/test/fix/feat conforme mudança; mensagem em português. Crie body-file real com problema→resultado→INT→checks→comandos/resultados→IA→pendências→evidências, novas linhas verdadeiras. Solicite revisão humana do colega confirmado **Lucas Souza** pela conta GitHub fornecida; não adivinhar @username. Aguarde CI/revisão, não dar merge próprio sem aceite. Se um PR for criado por ferramenta Codex, anexar ao chat com attach_artifact. Não modificar main/gh-pages manualmente nem burlar check/reviewer.

### Evidências, pessoas e resposta final

Aprovação do environment é de reviewer humano. Não obter bypass, aprovar por API em identidade fictícia ou chamar preview de PRD formal.

Atualize `docs/checklist-avaliacao.md` só com provas: data real, SHA/tag/run/URL, arquivos, comandos e resultado. Atualize AI-USAGE com ferramenta/finalidade/prompt resumido/resultado/revisão/PR verdadeiro. Registre status no `03-controle-execucao.md` e índice de evidências, sem dizer que todo INT foi aceito quando apenas parte foi concluída.

Quando for possível, preencha ficha original no navegador com dados e URLs reais já verificados; autoavaliações10 são estimativas solicitadas, não nota atribuída. Check de entrega e declarações só quando verdadeiros. Não alterar original/JS para liberar botão nem enviar e-mail/AVA sem autorização no contexto da execução. Se a sessão for interrompida, salvar estado administrativo local fora dos entregáveis acadêmicos.

Ao terminar, informe objetivamente: passo/INT/checks realmente fechados, arquivos, execução/testes, commit do usuário/PR/revisor, evidências, pendências humanas e próximo passo habilitado. Se bloqueado por acesso/pessoa/termos, entregue preparação revisável e mantenha aceite pendente; não repetir falha de ferramenta indefinidamente nem inventar sucesso.
