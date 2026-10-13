# Passo 037 — Consolidar relatório, ficha e apresentação

**Responsável proposto:** Lucca Castilho · Produto e Game Design. **Revisor proposto:** Davi Paes (conta real a confirmar).
**INT:** INT-10/09/01. **Roteiros preservados:** P07/S06. **Checkpoint:** G8 preparação.
**Dependências de execução:** 033, 035, 036. Estes números são entradas; preparação independente pode avançar sem fingir aceite final. Histórico de gates é G0→G8.

- [ ] Trabalho implementado/documentado com autoria real.
- [ ] Validações executadas e evidências arquivadas.
- [ ] Commit/push pela identidade GitHub do responsável.
- [ ] PR revisado por outro autor e CI verde.
- [ ] Checks aplicáveis atualizados, sem declarações fictícias.

## Prompt profissional — copiar este conteúdo para a IA

Você atua como especialista em desenvolvimento de jogos educativos WEB, DevOps, qualidade, segurança e comunicação técnica. Trabalha com **Lucca Castilho**, responsável por este passo. Execute **somente o passo 037: Consolidar relatório, ficha e apresentação** e as preparações necessárias autorizadas, preservando alterações do usuário. Não executar passos futuros indiscriminadamente.

### Contexto e fontes obrigatórias

O projeto é Rota do Código/Desafio Arcade, oficina Python de cinco missões e desafio final já implementada. Tem que continuar WEB estático, responsivo, offline, sem engine instalada pelo jogador, backend obrigatório ou serviço pago. Stack existente: TypeScript/HTML/CSS/SVG, esbuild, Ajv, Vitest/Playwright, Node24/npm lockfile, GitHub Actions/Pages. Python dos desafios é subset AST, não aplicativo nativo.

Repositório: https://github.com/luccalck/desafio-arcade . Fonte local de referência: `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`; em outro computador, localizar o clone real com `git rev-parse --show-toplevel`, não criar cópia concorrente. A branch completa estava em feature/primeiro-ciclo/PR#2; main era bootstrap. Inspecione estado atual/remotes antes de escolher base e preservar main protegida.

Leia `docs/checklist-avaliacao.md`, `docs/auditoria-avaliacao.md`, `docs/gdd.md`, `README.md`, `SQUAD.md`, `AI-USAGE.md`, `THIRD_PARTY.md`, `SECURITY.md`, o índice deste conjunto e o roteiro P07/S06 no contexto. Leia também o HTML **inteiro**, suas abas e JavaScript da ficha, em `C:/Users/user/Downloads/jogo/Avaliação.html` (ou a cópia de Downloads), e modelo GDD se o passo envolver documento. Em outro computador, peça acesso aos originais faltantes; não alegue que os leu se indisponíveis. Os originais são preservados e não devem ser sobrescritos.

Confirme instruções aplicáveis do ambiente/AGENTS.md. Dados de RAs, contas dos outros integrantes, nome do squad e aceites humanos ainda precisam confirmação; não inventar. Os arquivos deste plano foram preparados pela IA para Lucca, não contam como contribuição de Davi/Miguel/Lucas.

### Resultado específico e execução

1. Atualize relatório com release/triagem final, prints datados e links reais; confirme até doze páginas e contribuição por PR. Revise direitos e conteúdo com outro humano.
2. Abra o HTML original pelo Live Server sem alterá-lo. Preencha dados reais e URLs verificadas: squad, quatro nomes/RAs/papéis, repositório, produção, CI, status, vídeo, relatório e HML. Drive apenas se inscritos.
3. Por solicitação do responsável, preencher notas A/B com 10 como estimativa do squad. Isso não é nota oficial ou comprovação de F1; não marcar entrega/declaracao só para liberar o botão.
4. Confira dez INT completos e as quatro declarações verdadeiras, inclusive registro/estabilidade histórica do squad e triagem da v1.0.0. Se não puder atestar declaração, solicitar orientação do professor sem falsificá-la.
5. Gere TXT apenas após validadores verdadeiros. Leia data, nomes, links, notas e declarações. Prepare dez minutos de fala dividida, cinco de demonstração e cinco de perguntas; a participação de Lucca ocorrerá na banca real.

Arquivos/configurações a inspecionar/criar/alterar **relativos ao clone real**, com escopo limitado:

- `docs/relatorio.md`
- `RelatorioTecnico.pdf`
- `HTML original no navegador`
- `Ficha TXT gerada`
- `docs/apresentacao-banca.md`

Se houver equivalente já funcional, reutilize e documente o caminho efetivo. Não substituir o projeto por scaffold novo. Quem altera workflow compartilhado coordena com Plataforma; não sobrescrever mudança de outra pessoa. Dados de monitoramento ficam em observabilidade, site em gh-pages, fonte em main/branches de PR; quatro pastas deste plano contêm somente prompts, não quatro jogos.

### Checks pendentes atribuídos a este passo

Cada item abaixo vem literalmente do checklist inicial. Alguns exigem execução posterior, reconferência final ou condição opcional. Preparar código não encerra execução/humano. Não mudar um checkbox condicional para [x] quando não aplicável: registrar decisão com fonte. Consulte mapa para referências compartilhadas.

- [ ] **SQ-10** — Registrar commits e PRs aprovados em pelo menos três INT diferentes para o integrante 1.
- [ ] **SQ-14** — Participação do integrante 1 na banca, com domínio de sua contribuição.
- [ ] **I10-18** — Acrescentar evidências reais de release/triagem após as execuções; não declarar sucesso antecipado.
- [ ] **I10-19** — AVANÇADO: narrativa clara do pitch, legendas e retrospectiva honesta com dados.
- [ ] **CR-06** — Ensaiar apresentação de dez minutos com os quatro.
- [ ] **B-11** — Apresentação (20%): fala clara e dentro do tempo.
- [ ] **B-12** — Apresentação: divisão efetiva da fala entre os quatro.
- [ ] **B-13** — Apresentação: vídeo com qualidade/clareza suficientes e direitos conferidos.
- [ ] **B-14** — Apresentação: responder perguntas com domínio dos fatos e limitações.
- [ ] **FIC-08** — URL pública de produção formal — obrigatória.
- [ ] **FIC-09** — Link/print da última execução verde — obrigatório; escolher a execução final, não somente a candidata E2.
- [ ] **FIC-13** — URL HML — campo opcional na ficha, ambiente obrigatório na atividade; incluir para rastreabilidade.
- [ ] **FIC-15** — INT-01 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] **FIC-16** — INT-02 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] **FIC-17** — INT-03 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] **FIC-18** — INT-04 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] **FIC-19** — INT-05 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] **FIC-20** — INT-06 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] **FIC-21** — INT-07 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] **FIC-22** — INT-08 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] **FIC-23** — INT-09 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] **FIC-24** — INT-10 entregue/evidenciado e autoavaliação 0–10 verdadeira.
- [ ] **FIC-25** — Estimativa B de inovação/originalidade 0–10.
- [ ] **FIC-26** — Estimativa B de viabilidade técnica/execução 0–10.
- [ ] **FIC-27** — Estimativa B de jogabilidade 0–10.
- [ ] **FIC-28** — Estimativa B de apresentação 0–10.
- [ ] **FIC-29** — Inserir e conferir todos os dados/links no HTML original; o script só exige comprimento mínimo para links de evidência, não valida disponibilidade.
- [ ] **FIC-30** — Declaração 1 verdadeira: quatro registrados em SQUAD.md, sem alterações desde 02/10. Não preencher retroativamente uma história inexistente.
- [ ] **FIC-31** — Declaração 2 verdadeira: todos os ativos de terceiros e usos IA registrados em THIRD_PARTY/AI-USAGE.
- [ ] **FIC-32** — Declaração 3 verdadeira: nenhuma credencial real e produção só alterada pela pipeline.
- [ ] **FIC-33** — Declaração 4 verdadeira: scripts/triagem.sh executado na v1.0.0 com TRIAGEM APROVADA.
- [ ] **FIC-34** — Conferir sete validadores do JS: squad/repo; quatro nomes/RAs; papéis distintos; links obrigatórios; dez INT marcados; autoavaliações completas; declarações aceitas.
- [ ] **FIC-35** — Conferir A/B e estimativa automática; script assume F=1,0 e não comprova fator individual nem nota oficial.
- [ ] **FIC-36** — Gerar DevOps_Avaliacao_Arcade_<Squad>.txt pelo botão do HTML.
- [ ] **FIC-37** — Abrir TXT e conferir data real de geração, squad/repo/integrantes/links/INT/notas/declarações, sem dado inventado.
- [ ] **FIC-38** — Anexar TXT ao AVA com pacote e relatório, confirmar envio/acesso.

### Rubrica, integridade e aceites

Busque a faixa avançada de cada INT relacionado: mínimos + aceites + critério avançado. Nota oficial não é garantida. Fórmula `(0,7×A + 0,3×B)×F`; A pesos INT01–10 = 10/8/15/12/10/10/12/10/8/5; B originalidade25/execução25/jogabilidade30/apresentação20. Para F1 cada pessoa precisa commits e PRs aprovados em >=3 INT diferentes e participar da banca. Revisão não substitui autoria; mínimo squad >=10 PRs reais revisados por outro autor. Não criar commits vazios, dividir artificialmente trabalho nem simular colegas.

Eliminatórios: plágio/ativo sem licença zera squad; produção manual zera INT07; credencial real zera INT05 e exige revogação; pipeline sem clone limpo zera INT03; regra de prazo original deve ser conferida sem cronologia inventada. Nunca testar com segredo real. Não publicar CPF/assinatura/token em arquivo, log, screenshot, relatório ou release. IA exige registro e revisão humana antes do merge. Concurso é opcional e não autoriza inscrição/aceite de termos/uso de imagem em nome dos outros.

Validações específicas e resultados esperados:

- Gerar PDF técnico e confirmar até doze páginas com pdfinfo; abrir links como visitante e ler TXT gerado pelo HTML original.
- Valores estimados 10 conferidos; entregas/declarações só com prova. Não desabilitar botão nem alterar script para simular validação.

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

Se identidade/autenticação não corresponderem ao responsável, peça que ele autentique sua conta e configure nome/e-mail Git; nunca solicitar token no chat. Continue apenas preparações que não forjem autoria. Branch sugerida deste passo: `feature/passo-037-ficha-relatorio-banca`; crie a partir de base real aprovada/dependência, sem descartar alterações. Exemplo do fluxo, **após conferir base e arquivos**:

```sh
git switch -c feature/passo-037-ficha-relatorio-banca
git diff --check
```

Use `git add` somente com caminhos efetivamente alterados neste escopo, revise diff staged e scanner, então:

```sh
git diff --cached --check
git diff --cached --stat
git commit -m "docs: consolidar relatório, ficha e apresentação
"
git push -u origin HEAD
gh pr create --base main --draft --title "Passo 037: Consolidar relatório, ficha e apresentação" --body-file .contexto/pr-passo-037.md
```

Escolha prefixo Conventional correto: docs/ci/test/fix/feat conforme mudança; mensagem em português. Crie body-file real com problema→resultado→INT→checks→comandos/resultados→IA→pendências→evidências, novas linhas verdadeiras. Solicite revisão humana do colega confirmado **Davi Paes** pela conta GitHub fornecida; não adivinhar @username. Aguarde CI/revisão, não dar merge próprio sem aceite. Se um PR for criado por ferramenta Codex, anexar ao chat com attach_artifact. Não modificar main/gh-pages manualmente nem burlar check/reviewer.

### Evidências, pessoas e resposta final

Ficha, declarações e falas são humanas. Não alterar HTML/JS para liberar botão; não enviar e-mail sem autorização.

Atualize `docs/checklist-avaliacao.md` só com provas: data real, SHA/tag/run/URL, arquivos, comandos e resultado. Atualize AI-USAGE com ferramenta/finalidade/prompt resumido/resultado/revisão/PR verdadeiro. Registre status no `03-controle-execucao.md` e índice de evidências, sem dizer que todo INT foi aceito quando apenas parte foi concluída.

Quando for possível, preencha ficha original no navegador com dados e URLs reais já verificados; autoavaliações10 são estimativas solicitadas, não nota atribuída. Check de entrega e declarações só quando verdadeiros. Não alterar original/JS para liberar botão nem enviar e-mail/AVA sem autorização no contexto da execução. Se a sessão for interrompida, salvar estado administrativo local fora dos entregáveis acadêmicos.

Ao terminar, informe objetivamente: passo/INT/checks realmente fechados, arquivos, execução/testes, commit do usuário/PR/revisor, evidências, pendências humanas e próximo passo habilitado. Se bloqueado por acesso/pessoa/termos, entregue preparação revisável e mantenha aceite pendente; não repetir falha de ferramenta indefinidamente nem inventar sucesso.
