# Passo 001 — Registrar equipe, contexto e marcos reais

**Responsável proposto:** Lucca Castilho · Produto e Game Design. **Revisor proposto:** Davi Paes (conta real a confirmar).
**INT:** INT-01/02/09. **Roteiros preservados:** C01/C02/P01. **Checkpoint:** G0.
**Dependências de execução:** Inspeção do contexto e autorização do usuário; não depende de passo anterior.. Estes números são entradas; preparação independente pode avançar sem fingir aceite final. Histórico de gates é G0→G8.

- [ ] Trabalho implementado/documentado com autoria real.
- [ ] Validações executadas e evidências arquivadas.
- [ ] Commit/push pela identidade GitHub do responsável.
- [ ] PR revisado por outro autor e CI verde.
- [ ] Checks aplicáveis atualizados, sem declarações fictícias.

## Prompt profissional — copiar este conteúdo para a IA

Você atua como especialista em desenvolvimento de jogos educativos WEB, DevOps, qualidade, segurança e comunicação técnica. Trabalha com **Lucca Castilho**, responsável por este passo. Execute **somente o passo 001: Registrar equipe, contexto e marcos reais** e as preparações necessárias autorizadas, preservando alterações do usuário. Não executar passos futuros indiscriminadamente.

### Contexto e fontes obrigatórias

O projeto é Rota do Código/Desafio Arcade, oficina Python de cinco missões e desafio final já implementada. Tem que continuar WEB estático, responsivo, offline, sem engine instalada pelo jogador, backend obrigatório ou serviço pago. Stack existente: TypeScript/HTML/CSS/SVG, esbuild, Ajv, Vitest/Playwright, Node24/npm lockfile, GitHub Actions/Pages. Python dos desafios é subset AST, não aplicativo nativo.

Repositório: https://github.com/luccalck/desafio-arcade . Fonte local de referência: `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`; em outro computador, localizar o clone real com `git rev-parse --show-toplevel`, não criar cópia concorrente. A branch completa estava em feature/primeiro-ciclo/PR#2; main era bootstrap. Inspecione estado atual/remotes antes de escolher base e preservar main protegida.

Leia `docs/checklist-avaliacao.md`, `docs/auditoria-avaliacao.md`, `docs/gdd.md`, `README.md`, `SQUAD.md`, `AI-USAGE.md`, `THIRD_PARTY.md`, `SECURITY.md`, o índice deste conjunto e o roteiro C01/C02/P01 no contexto. Leia também o HTML **inteiro**, suas abas e JavaScript da ficha, em `C:/Users/user/Downloads/jogo/Avaliação.html` (ou a cópia de Downloads), e modelo GDD se o passo envolver documento. Em outro computador, peça acesso aos originais faltantes; não alegue que os leu se indisponíveis. Os originais são preservados e não devem ser sobrescritos.

Confirme instruções aplicáveis do ambiente/AGENTS.md. Dados de RAs, contas dos outros integrantes, nome do squad e aceites humanos ainda precisam confirmação; não inventar. Os arquivos deste plano foram preparados pela IA para Lucca, não contam como contribuição de Davi/Miguel/Lucas.

### Resultado específico e execução

1. Leia integralmente HTML e script da ficha, modelo GDD, requisitos consolidados, índice e roteiros. Compare o regulamento externo citado: confirme versão, cite fonte e informe indisponibilidade sem inventar leitura.
2. Registre os quatro nomes fornecidos e obtenha RAs, GitHubs dos outros três, nome do squad, horários/prazo configurável real e responsáveis por revisão; não substitua dado ausente por nome fictício. Papel proposto para este plano precisa de confirmação pelos quatro.
3. Confira a situação histórica de formação em 02/10, prévia em 05/10, sprint e entrega. Não retroaja registros nem declare tag passada sem prova. Guarde apenas dados acadêmicos necessários; não publique CPF, assinatura ou informação privada.
4. Combine participação real em três INT por pessoa e banca. Documente distribuição e o que cada pessoa precisa entender; não atribua os arquivos criados pela IA às outras pessoas retroativamente.
5. Examine condições de concurso, equipe excepcional e desistência como condicionais; obtenha decisão humana antes de inscrição. Não inscreva nem aceite termos.

Arquivos/configurações a inspecionar/criar/alterar **relativos ao clone real**, com escopo limitado:

- `SQUAD.md`
- `docs/design.md`
- `docs/backlog.md`
- `docs/evidencias/equipe.md`

Se houver equivalente já funcional, reutilize e documente o caminho efetivo. Não substituir o projeto por scaffold novo. Quem altera workflow compartilhado coordena com Plataforma; não sobrescrever mudança de outra pessoa. Dados de monitoramento ficam em observabilidade, site em gh-pages, fonte em main/branches de PR; quatro pastas deste plano contêm somente prompts, não quatro jogos.

### Checks pendentes atribuídos a este passo

Cada item abaixo vem literalmente do checklist inicial. Alguns exigem execução posterior, reconferência final ou condição opcional. Preparar código não encerra execução/humano. Não mudar um checkbox condicional para [x] quando não aplicável: registrar decisão com fonte. Consulte mapa para referências compartilhadas.

- [ ] **OBJ-08** — Ler o regulamento completo citado na seção 02; a tabela do HTML não substitui essa leitura. Não confundir leitura do HTML com leitura do PDF externo.
- [ ] **SQ-01** — Definir nome real do squad.
- [ ] **SQ-02** — Registrar exatamente quatro integrantes em SQUAD.md: nome completo, RA e papel de cada um.
- [ ] **SQ-03** — Atribuir os quatro papéis oficiais, distintos: Produto e Game Design; Desenvolvimento e Qualidade; Plataforma e Release; SRE e Segurança.
- [ ] **SQ-04** — Conferir formação/registro previstos em 02/10 e estabilidade dos integrantes após o registro; não inventar registro passado.
- [ ] **SQ-05** — Garantir trabalho real dos quatro: papéis têm responsáveis, mas não exclusividade; todos programam, revisam e aparecem no Git.
- [ ] **SQ-19** — CONDICIONAL: equipe de três ou cinco somente com autorização do professor para a UC; não elegível ao concurso.
- [ ] **I01-12** — SQUAD.md completo, coerente com colaboradores e autoria. Arquivo existe, dados ausentes.
- [ ] **CR-01** — Conferir marcos de 02/10: leitura do regulamento, formação, escolha do tema, SQUAD e repositório, primeiro PR com esqueleto.
- [ ] **CR-02** — Conferir prévia formativa de 05/10: v0.1.0, INT-01/02/03/06 e tela jogável na HML pela pipeline; guardar devolutiva real se houver. A prévia não compõe a nota.
- [ ] **FIC-01** — Nome do squad preenchido.
- [ ] **FIC-03** — Integrante 1: nome completo com pelo menos duas palavras, RA com pelo menos três caracteres, papel real.
- [ ] **FIC-04** — Integrante 2: nome completo com pelo menos duas palavras, RA com pelo menos três caracteres, papel real.
- [ ] **FIC-05** — Integrante 3: nome completo com pelo menos duas palavras, RA com pelo menos três caracteres, papel real.
- [ ] **FIC-06** — Integrante 4: nome completo com pelo menos duas palavras, RA com pelo menos três caracteres, papel real.
- [ ] **FIC-07** — Quatro papéis distintos dentre os oficiais, sem inventar quinto papel.

### Rubrica, integridade e aceites

Busque a faixa avançada de cada INT relacionado: mínimos + aceites + critério avançado. Nota oficial não é garantida. Fórmula `(0,7×A + 0,3×B)×F`; A pesos INT01–10 = 10/8/15/12/10/10/12/10/8/5; B originalidade25/execução25/jogabilidade30/apresentação20. Para F1 cada pessoa precisa commits e PRs aprovados em >=3 INT diferentes e participar da banca. Revisão não substitui autoria; mínimo squad >=10 PRs reais revisados por outro autor. Não criar commits vazios, dividir artificialmente trabalho nem simular colegas.

Eliminatórios: plágio/ativo sem licença zera squad; produção manual zera INT07; credencial real zera INT05 e exige revogação; pipeline sem clone limpo zera INT03; regra de prazo original deve ser conferida sem cronologia inventada. Nunca testar com segredo real. Não publicar CPF/assinatura/token em arquivo, log, screenshot, relatório ou release. IA exige registro e revisão humana antes do merge. Concurso é opcional e não autoriza inscrição/aceite de termos/uso de imagem em nome dos outros.

Validações específicas e resultados esperados:

- SQUAD tem dados verdadeiros e quatro linhas válidas ou pendências explicitadas, sem máscara de RA ser aceita como RA.
- Regulamento/HTML/contexto têm referências verificáveis. Participantes confirmam organização antes de aceitar G0.

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

Se identidade/autenticação não corresponderem ao responsável, peça que ele autentique sua conta e configure nome/e-mail Git; nunca solicitar token no chat. Continue apenas preparações que não forjem autoria. Branch sugerida deste passo: `feature/passo-001-equipe-contexto`; crie a partir de base real aprovada/dependência, sem descartar alterações. Exemplo do fluxo, **após conferir base e arquivos**:

```sh
git switch -c feature/passo-001-equipe-contexto
git diff --check
```

Use `git add` somente com caminhos efetivamente alterados neste escopo, revise diff staged e scanner, então:

```sh
git diff --cached --check
git diff --cached --stat
git commit -m "docs: registrar equipe, contexto e marcos reais
"
git push -u origin HEAD
gh pr create --base main --draft --title "Passo 001: Registrar equipe, contexto e marcos reais" --body-file .contexto/pr-passo-001.md
```

Escolha prefixo Conventional correto: docs/ci/test/fix/feat conforme mudança; mensagem em português. Crie body-file real com problema→resultado→INT→checks→comandos/resultados→IA→pendências→evidências, novas linhas verdadeiras. Solicite revisão humana do colega confirmado **Davi Paes** pela conta GitHub fornecida; não adivinhar @username. Aguarde CI/revisão, não dar merge próprio sem aceite. Se um PR for criado por ferramenta Codex, anexar ao chat com attach_artifact. Não modificar main/gh-pages manualmente nem burlar check/reviewer.

### Evidências, pessoas e resposta final

Dados/RAs/contas e confirmação dos papéis vêm dos quatro humanos. Não expor detalhes privados de prazo; configuração operacional apenas com valor verdadeiro autorizado.

Atualize `docs/checklist-avaliacao.md` só com provas: data real, SHA/tag/run/URL, arquivos, comandos e resultado. Atualize AI-USAGE com ferramenta/finalidade/prompt resumido/resultado/revisão/PR verdadeiro. Registre status no `03-controle-execucao.md` e índice de evidências, sem dizer que todo INT foi aceito quando apenas parte foi concluída.

Quando for possível, preencha ficha original no navegador com dados e URLs reais já verificados; autoavaliações10 são estimativas solicitadas, não nota atribuída. Check de entrega e declarações só quando verdadeiros. Não alterar original/JS para liberar botão nem enviar e-mail/AVA sem autorização no contexto da execução. Se a sessão for interrompida, salvar estado administrativo local fora dos entregáveis acadêmicos.

Ao terminar, informe objetivamente: passo/INT/checks realmente fechados, arquivos, execução/testes, commit do usuário/PR/revisor, evidências, pendências humanas e próximo passo habilitado. Se bloqueado por acesso/pessoa/termos, entregue preparação revisável e mantenha aceite pendente; não repetir falha de ferramenta indefinidamente nem inventar sucesso.
