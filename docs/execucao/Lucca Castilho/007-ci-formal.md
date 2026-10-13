# Passo 007 — Preparar esteira formal e contratos de artefatos

**Responsável:** Lucca Castilho · bloco 1. **Papel oficial proposto:** Produto e Game Design. **Revisor proposto:** Davi Paes (conta real a confirmar).
**INT:** INT-03/06/05. **Roteiros preservados:** R02/R03/S02. **Checkpoint:** G2.
**Dependências de execução:** 002, 003, 004, 006. Dependências técnicas vêm de números anteriores, do mesmo bloco ou do bloco já entregue. Revisões/dados humanos não dependem da vez de implementar. Gates continuam G0→G8.

- [ ] Trabalho implementado/documentado com autoria real.
- [ ] Validações executadas e evidências arquivadas.
- [ ] Commit/push pela identidade GitHub do responsável.
- [ ] PR revisado por outro autor e CI verde.
- [ ] Checks aplicáveis atualizados, sem declarações fictícias.

## Regra da execução por blocos

Este passo pertence ao bloco **001–010 de Lucca Castilho**. Execute seus dez passos em ordem, respeitando as entradas anteriores; não espere implementação de outro integrante para um número dentro deste bloco. Ao concluir 010, faça a passagem descrita em `04-passagem-de-bloco.md`.

Revisão por outro autor, dados/acessos, consentimentos, playtest e banca continuam sendo ações humanas obrigatórias. O colega pode revisar já no primeiro bloco, antes de começar seus próprios dez passos. Finalizar este passo significa concluir seu escopo e entregar provas/contratos; não é assinalar checks de release, vídeo ou banca futuros. O próximo responsável executa a validação posterior, sem exigir que você volte a desenvolver seus passos.

## Prompt profissional — copiar este conteúdo para a IA

Você atua como especialista em desenvolvimento de jogos educativos WEB, DevOps, qualidade, segurança e comunicação técnica. Trabalha com **Lucca Castilho**, responsável por este passo. Execute **somente o passo 007: Preparar esteira formal e contratos de artefatos** e as preparações necessárias autorizadas, preservando alterações do usuário. Não executar passos futuros indiscriminadamente.

### Contexto e fontes obrigatórias

O projeto é Rota do Código/Desafio Arcade, oficina Python de cinco missões e desafio final já implementada. Tem que continuar WEB estático, responsivo, offline, sem engine instalada pelo jogador, backend obrigatório ou serviço pago. Stack existente: TypeScript/HTML/CSS/SVG, esbuild, Ajv, Vitest/Playwright, Node24/npm lockfile, GitHub Actions/Pages. Python dos desafios é subset AST, não aplicativo nativo.

Repositório: https://github.com/luccalck/desafio-arcade . Fonte local de referência: `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`; em outro computador, localizar o clone real com `git rev-parse --show-toplevel`, não criar cópia concorrente. A branch completa estava em feature/primeiro-ciclo/PR#2; main era bootstrap. Inspecione estado atual/remotes antes de escolher base e preservar main protegida.

Leia `docs/gestao/checklist-avaliacao.md`, `docs/gestao/auditoria-avaliacao.md`, `docs/gdd.md`, `README.md`, `SQUAD.md`, `AI-USAGE.md`, `THIRD_PARTY.md`, `SECURITY.md`, o índice deste conjunto e o roteiro R02/R03/S02 no contexto. Leia também o HTML **inteiro**, suas abas e JavaScript da ficha, em `C:/Users/user/Downloads/jogo/Avaliação.html` (ou a cópia de Downloads), e modelo GDD se o passo envolver documento. Em outro computador, peça acesso aos originais faltantes; não alegue que os leu se indisponíveis. Os originais são preservados e não devem ser sobrescritos.

Confirme instruções aplicáveis do ambiente/AGENTS.md. Dados de RAs, contas dos outros integrantes, nome do squad e aceites humanos ainda precisam confirmação; não inventar. Os arquivos deste plano foram preparados pela IA para Lucca, não contam como contribuição de Davi/Miguel/Lucas.

### Resultado específico e execução

1. Refatore apenas o necessário para ci agregado, deploy-hml e deploy-prd com dependências claras, ubuntu-latest, lockfile/npm ci, lint/unidade/integração/JUnit/cobertura/scanners/build/GDD/ZIP. Preserve jobs independentes paralelos e cache.
2. Defina artefato por SHA/run contendo ZIP/checksum/PDF/SBOM/relatórios; deploy baixa o artefato da execução aceita, não recompila. Registre contrato de paths e quem o usa.
3. Proteja credenciais em secrets, configuração em variables e permissions por job; referências a Actions fixadas com versões atuais verificadas em fontes oficiais.
4. Implemente notificações claras de falha/entrega em canais autorizados. Não mandar mensagens externas ou criar segredo sem autorização explícita.
5. Execute de clone limpo a esteira atual e suas novas validações; preparação dos deploys não equivale a HML/PRD executados. Integre scripts dos outros passos sem editar simultaneamente o mesmo YAML.

Arquivos/configurações a inspecionar/criar/alterar **relativos ao clone real**, com escopo limitado:

- `.github/workflows/esteira.yml`
- `scripts/build.mjs`
- `scripts/package.mjs`
- `docs/evidencias/ci-formal.md`

Se houver equivalente já funcional, reutilize e documente o caminho efetivo. Não substituir o projeto por scaffold novo. Quem altera workflow compartilhado coordena com Plataforma; não sobrescrever mudança de outra pessoa. Dados de monitoramento ficam em observabilidade, site em gh-pages, fonte em main/branches de PR; quatro pastas deste plano contêm somente prompts, não quatro jogos.

### Checks pendentes atribuídos a este passo

Cada item abaixo vem literalmente do checklist inicial. Alguns exigem execução posterior, reconferência final ou condição opcional. Preparar código não encerra execução/humano. Não mudar um checkbox condicional para [x] quando não aplicável: registrar decisão com fonte. Consulte mapa para referências compartilhadas.

- [ ] **I03-24** — AVANÇADO: notificações da esteira implementadas e recebimento comprovado.
- [ ] **KIT-08** — Publicação, rollout, DORA e triagem implementados por scripts equivalentes aos exemplos; não copiar TODO como solução.
- [ ] **KIT-09** — Revisar versões atuais das Actions antes de fixá-las, compatibilidade e registro da escolha.

### Rubrica, integridade e aceites

Busque a faixa avançada de cada INT relacionado: mínimos + aceites + critério avançado. Nota oficial não é garantida. Fórmula `(0,7×A + 0,3×B)×F`; A pesos INT01–10 = 10/8/15/12/10/10/12/10/8/5; B originalidade25/execução25/jogabilidade30/apresentação20. Para F1 cada pessoa precisa commits e PRs aprovados em >=3 INT diferentes e participar da banca. Revisão não substitui autoria; mínimo squad >=10 PRs reais revisados por outro autor. Não criar commits vazios, dividir artificialmente trabalho nem simular colegas.

Eliminatórios: plágio/ativo sem licença zera squad; produção manual zera INT07; credencial real zera INT05 e exige revogação; pipeline sem clone limpo zera INT03; regra de prazo original deve ser conferida sem cronologia inventada. Nunca testar com segredo real. Não publicar CPF/assinatura/token em arquivo, log, screenshot, relatório ou release. IA exige registro e revisão humana antes do merge. Concurso é opcional e não autoriza inscrição/aceite de termos/uso de imagem em nome dos outros.

Validações específicas e resultados esperados:

- npm ci; npm run lint; npm run test:ci; npm run build; npm run gdd:pdf; npm run package; gh run view da execução real após push.
- ci bloqueia quando qualquer dependência falha; relatórios de falha arquivados; revisão humana/CI exigidas no PR.

Para alteração de código, crie primeiro regressão significativa quando houver comportamento novo/bug verificável, execute a falha e corrija; para documentação, confira conteúdo/link/evidência sem inventar testes. Não executar teste espelhado da implementação nem repetir suites sem necessidade. CI obrigatória deve passar. No PowerShell local, configure `$env:npm_config_script_shell = (Get-Command pwsh).Source` se houver EACCES de cmd. Na CI Linux use comandos nativos do runner.

### Commit obrigatório pelo GitHub do usuário responsável

**Faça commit pelo GitHub do usuário Lucca Castilho, usando a própria conta autenticada e a identidade Git real desse usuário.** Não faça commit em nome de luccalck se a pessoa atual for outra, não use conta de colega e não invente e-mail/username. Verifique antes de gravar:

```sh
git status --short
git remote -v
git config --get user.name
git config --get user.email
gh api user --jq .login
```

Se identidade/autenticação não corresponderem ao responsável, peça que ele autentique sua conta e configure nome/e-mail Git; nunca solicitar token no chat. Continue apenas preparações que não forjem autoria. Branch sugerida deste passo: `feature/passo-007-ci-formal`; crie a partir de base real aprovada/dependência, sem descartar alterações. Exemplo do fluxo, **após conferir base e arquivos**:

```sh
git switch -c feature/passo-007-ci-formal
git diff --check
```

Use `git add` somente com caminhos efetivamente alterados neste escopo, revise diff staged e scanner, então:

```sh
git diff --cached --check
git diff --cached --stat
git commit -m "ci: preparar esteira formal e contratos de artefatos
"
git push -u origin HEAD
gh pr create --base main --draft --title "Passo 007: Preparar esteira formal e contratos de artefatos" --body-file .contexto/pr-passo-007.md
```

Escolha prefixo Conventional correto: docs/ci/test/fix/feat conforme mudança; mensagem em português. Crie body-file real com problema→resultado→INT→checks→comandos/resultados→IA→pendências→evidências, novas linhas verdadeiras. Solicite revisão humana do colega confirmado **Davi Paes** pela conta GitHub fornecida; não adivinhar @username. Aguarde CI/revisão, não dar merge próprio sem aceite. Se um PR for criado por ferramenta Codex, anexar ao chat com attach_artifact. Não modificar main/gh-pages manualmente nem burlar check/reviewer.

### Evidências, pessoas e resposta final

Revisão de outro integrante antes do merge. Não simular identidade ou aceite.

Atualize `docs/gestao/checklist-avaliacao.md` só com provas: data real, SHA/tag/run/URL, arquivos, comandos e resultado. Atualize AI-USAGE com ferramenta/finalidade/prompt resumido/resultado/revisão/PR verdadeiro. Registre status no `03-controle-execucao.md` e índice de evidências, sem dizer que todo INT foi aceito quando apenas parte foi concluída.

Quando for possível, preencha ficha original no navegador com dados e URLs reais já verificados; autoavaliações10 são estimativas solicitadas, não nota atribuída. Check de entrega e declarações só quando verdadeiros. Não alterar original/JS para liberar botão nem enviar e-mail/AVA sem autorização no contexto da execução. Se a sessão for interrompida, salvar estado administrativo local fora dos entregáveis acadêmicos.

Ao terminar, informe objetivamente: passo/INT/checks realmente fechados, arquivos, execução/testes, commit do usuário/PR/revisor, evidências, pendências humanas e próximo passo habilitado. Se bloqueado por acesso/pessoa/termos, entregue preparação revisável e mantenha aceite pendente; não repetir falha de ferramenta indefinidamente nem inventar sucesso.

## Encaminhamento explícito do passo003 — 13/10/2026

Ao executar007, preparar no workflow os contratos/dependências ci → deploy-hml → deploy-prd já previstos neste prompt. SITE_URL está configurada; homologacao/producao aceitam branchmain, e producao exige reviewer sem bypass administrativo. Não confundir configuração com deploy executado. Coordenar o método de publicação Pages e migração de origem com011; entregar arquivos/artefatos prontos para011/019 e testes relevantes. Registrar execução pendente nas seções desses passos do05-pendencias-por-passo.md.
