# Passo 040 — Auditar fator individual e condicionais restantes

**Responsável proposto:** Lucas Souza · SRE e Segurança. **Revisor proposto:** Lucca Castilho (conta real a confirmar).
**INT:** INT-01/05/08/09/10. **Roteiros preservados:** C02/S06/P07. **Checkpoint:** G8 e pós-entrega condicional.
**Dependências de execução:** 037, 038, 039. Estes números são entradas; preparação independente pode avançar sem fingir aceite final. Histórico de gates é G0→G8.

- [ ] Trabalho implementado/documentado com autoria real.
- [ ] Validações executadas e evidências arquivadas.
- [ ] Commit/push pela identidade GitHub do responsável.
- [ ] PR revisado por outro autor e CI verde.
- [ ] Checks aplicáveis atualizados, sem declarações fictícias.

## Prompt profissional — copiar este conteúdo para a IA

Você atua como especialista em desenvolvimento de jogos educativos WEB, DevOps, qualidade, segurança e comunicação técnica. Trabalha com **Lucas Souza**, responsável por este passo. Execute **somente o passo 040: Auditar fator individual e condicionais restantes** e as preparações necessárias autorizadas, preservando alterações do usuário. Não executar passos futuros indiscriminadamente.

### Contexto e fontes obrigatórias

O projeto é Rota do Código/Desafio Arcade, oficina Python de cinco missões e desafio final já implementada. Tem que continuar WEB estático, responsivo, offline, sem engine instalada pelo jogador, backend obrigatório ou serviço pago. Stack existente: TypeScript/HTML/CSS/SVG, esbuild, Ajv, Vitest/Playwright, Node24/npm lockfile, GitHub Actions/Pages. Python dos desafios é subset AST, não aplicativo nativo.

Repositório: https://github.com/luccalck/desafio-arcade . Fonte local de referência: `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`; em outro computador, localizar o clone real com `git rev-parse --show-toplevel`, não criar cópia concorrente. A branch completa estava em feature/primeiro-ciclo/PR#2; main era bootstrap. Inspecione estado atual/remotes antes de escolher base e preservar main protegida.

Leia `docs/checklist-avaliacao.md`, `docs/auditoria-avaliacao.md`, `docs/gdd.md`, `README.md`, `SQUAD.md`, `AI-USAGE.md`, `THIRD_PARTY.md`, `SECURITY.md`, o índice deste conjunto e o roteiro C02/S06/P07 no contexto. Leia também o HTML **inteiro**, suas abas e JavaScript da ficha, em `C:/Users/user/Downloads/jogo/Avaliação.html` (ou a cópia de Downloads), e modelo GDD se o passo envolver documento. Em outro computador, peça acesso aos originais faltantes; não alegue que os leu se indisponíveis. Os originais são preservados e não devem ser sobrescritos.

Confirme instruções aplicáveis do ambiente/AGENTS.md. Dados de RAs, contas dos outros integrantes, nome do squad e aceites humanos ainda precisam confirmação; não inventar. Os arquivos deste plano foram preparados pela IA para Lucca, não contam como contribuição de Davi/Miguel/Lucas.

### Resultado específico e execução

1. Audite as quatro identidades, commits e PRs aprovados em pelo menos três INT por pessoa, banca dos quatro e pelo menos dez PRs do squad revisados por outro autor. Mapear PR, autor, revisor e INT; não atribuir planejamento da IA aos colegas.
2. F1 é objetivo condicionado às provas; F0,8 para dois INT e F0,5 para um ou nenhum. Conferir pesos A 10/8/15/12/10/10/12/10/8/5 e B 25/25/30/20. Notas estimadas 10 não são nota oficial.
3. Confira condicionais sem ativá-las por obrigação falsa: canário quando azul-verde escolhido, Godot, ranking, telemetria, Opal/AI Studio, e-mail da ficha, squad excepcional e concurso.
4. Somente com autorização separada de concurso: verificar maiores de dezoito anos, CPF privado, residência Brasil, formulário individual, squad fixo, cláusulas 12/13, regulamento vigente, Instagram colaborativo, Drive com acesso total e outra conta, prazo 21/10 23h59 Brasília e URL até novembro. Não aceitar termos automaticamente.
5. Finalize confronto HTML/checklist/GDD/rubrica com provas, separando implementado, executado, humano, não atendido e N/A condicional. Lucas participa da banca e comprova INT-05/08/09 pelo Git. Não prometer nota.

Arquivos/configurações a inspecionar/criar/alterar **relativos ao clone real**, com escopo limitado:

- `docs/contribuicoes.md`
- `docs/evidencias/auditoria-encerramento.md`
- `docs/checklist-avaliacao.md`
- `docs/concurso-decisao.md`

Se houver equivalente já funcional, reutilize e documente o caminho efetivo. Não substituir o projeto por scaffold novo. Quem altera workflow compartilhado coordena com Plataforma; não sobrescrever mudança de outra pessoa. Dados de monitoramento ficam em observabilidade, site em gh-pages, fonte em main/branches de PR; quatro pastas deste plano contêm somente prompts, não quatro jogos.

### Checks pendentes atribuídos a este passo

Cada item abaixo vem literalmente do checklist inicial. Alguns exigem execução posterior, reconferência final ou condição opcional. Preparar código não encerra execução/humano. Não mudar um checkbox condicional para [x] quando não aplicável: registrar decisão com fonte. Consulte mapa para referências compartilhadas.

- [ ] **SQ-13** — Registrar commits e PRs aprovados em pelo menos três INT diferentes para o integrante 4.
- [ ] **SQ-17** — Participação do integrante 4 na banca, com domínio de sua contribuição.
- [ ] **SQ-18** — Conferir o fator F individual pelo histórico: 1,0 para ≥3 INT + banca; 0,8 para dois; 0,5 para um ou nenhum. Preparar respostas se o professor ouvir o squad.
- [ ] **SQ-20** — CONDICIONAL concurso: conferir exigência de exatamente quatro integrantes e efeito de desistência/cancelamento; não tratar identidade simulada como integrante.
- [ ] **I01-09** — CONTÍNUO/FINAL: conferir Conventional Commits no histórico completo da release final.
- [ ] **I01-14** — Pelo menos dez PRs reais revisados por pessoa diferente do autor; guardar links e revisores.
- [ ] **I01-15** — Conferir commits de cada pessoa em três ou mais INT e seus PRs aprovados (SQ-10 a SQ-13).
- [ ] **I01-16** — `git log --oneline v0.1.0..v1.0.0` conta uma história legível, com tags existentes e autoria real.
- [ ] **I01-17** — AVANÇADO: histórico exemplar e contribuição equilibrada dos quatro, além de Conventional Commits.
- [ ] **I09-23** — CONDICIONAL concurso: enviar o mesmo pacote ao Drive do responsável e conferir acesso total ao e-mail do regulamento.
- [ ] **I09-24** — CONDICIONAL concurso: testar compartilhamento em janela anônima com outra conta.
- [ ] **I10-16** — Contribuição de cada integrante com links dos PRs reais.
- [ ] **CR-08** — Preparar os quatro para cinco minutos de perguntas.
- [ ] **CR-11** — CONDICIONAL concurso: submissão até 21/10/2026, 23h59, horário de Brasília.
- [ ] **CR-12** — CONDICIONAL concurso: melhorias após devolutiva continuam passando pela esteira.
- [ ] **CR-13** — CONDICIONAL concurso: manter URL pública no ar durante triagem de novembro.
- [ ] **B-15** — Conferir pesos A: 10/8/15/12/10/10/12/10/8/5; pesos B: 25/25/30/20; aplicar F real, sem prometer nota.
- [ ] **DIR-16** — CONDICIONAL concurso: decisão informada e conjunta sobre licença à Framework e uso de nome/imagem/voz; não aceitar termos automaticamente.
- [ ] **FIC-14** — CONDICIONAL concurso: link Drive — opcional na ficha, preencher se inscritos.
- [ ] **FIC-39** — CONDICIONAL: botão enviar por e-mail é opção de exportação, não requisito de envio adicional; usar apenas com autorização explícita. O corpo pode ser truncado, TXT é a ficha completa.
- [ ] **CON-01** — Decisão explícita e conjunta de inscrição.
- [ ] **CON-02** — Exatamente quatro integrantes elegíveis; todos maiores de dezoito anos na inscrição.
- [ ] **CON-03** — CPF válido e residência no Brasil, conferidos privadamente; não inserir CPF no Git/artefatos públicos.
- [ ] **CON-04** — Inscrição individual pelo formulário oficial da landing page, janela 21/09–21/10/2026.
- [ ] **CON-05** — Reler regulamento vigente antes da inscrição: organizadora pode alterá-lo (item 17.2).
- [ ] **CON-06** — Ler cláusulas de propriedade intelectual/uso de imagem, itens 12 e 13, e aceitar somente com orientação humana específica.
- [ ] **CON-07** — Vídeo no Instagram em colaboração com @framework.digital e perfil oficial do Programadores do Amanhã, conforme regulamento vigente.
- [ ] **CON-08** — Drive do responsável com todos os materiais, acesso total ao e-mail correto da organização e verificação com outra conta.
- [ ] **CON-09** — Submissão completa até 21/10/2026, 23h59 Brasília; sem prazo extra de produção previsto no regulamento.
- [ ] **CON-10** — Manter link no ar na triagem de novembro.
- [ ] **CON-11** — Conferir que inscrição/termos/imagem/voz não foram aceitos automaticamente em nome de alguém.

### Rubrica, integridade e aceites

Busque a faixa avançada de cada INT relacionado: mínimos + aceites + critério avançado. Nota oficial não é garantida. Fórmula `(0,7×A + 0,3×B)×F`; A pesos INT01–10 = 10/8/15/12/10/10/12/10/8/5; B originalidade25/execução25/jogabilidade30/apresentação20. Para F1 cada pessoa precisa commits e PRs aprovados em >=3 INT diferentes e participar da banca. Revisão não substitui autoria; mínimo squad >=10 PRs reais revisados por outro autor. Não criar commits vazios, dividir artificialmente trabalho nem simular colegas.

Eliminatórios: plágio/ativo sem licença zera squad; produção manual zera INT07; credencial real zera INT05 e exige revogação; pipeline sem clone limpo zera INT03; regra de prazo original deve ser conferida sem cronologia inventada. Nunca testar com segredo real. Não publicar CPF/assinatura/token em arquivo, log, screenshot, relatório ou release. IA exige registro e revisão humana antes do merge. Concurso é opcional e não autoriza inscrição/aceite de termos/uso de imagem em nome dos outros.

Validações específicas e resultados esperados:

- gh pr list --state all; gh pr view de cada PR com reviews; git log com autores; conferir fontes DORA, artefatos e recibos.
- Cada check aplicável tem prova ou pendência nominal. Decisão N/A tem fundamento; não marcar condicionais inexistentes como realizadas.

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

Se identidade/autenticação não corresponderem ao responsável, peça que ele autentique sua conta e configure nome/e-mail Git; nunca solicitar token no chat. Continue apenas preparações que não forjem autoria. Branch sugerida deste passo: `feature/passo-040-contribuicao-condicionais`; crie a partir de base real aprovada/dependência, sem descartar alterações. Exemplo do fluxo, **após conferir base e arquivos**:

```sh
git switch -c feature/passo-040-contribuicao-condicionais
git diff --check
```

Use `git add` somente com caminhos efetivamente alterados neste escopo, revise diff staged e scanner, então:

```sh
git diff --cached --check
git diff --cached --stat
git commit -m "docs: auditar fator individual e condicionais restantes"
git push -u origin HEAD
gh pr create --base main --draft --title "Passo 040: Auditar fator individual e condicionais restantes" --body-file .contexto/pr-passo-040.md
```

Escolha prefixo Conventional correto: docs/ci/test/fix/feat conforme mudança; mensagem em português. Crie body-file real com problema→resultado→INT→checks→comandos/resultados→IA→pendências→evidências, novas linhas verdadeiras. Solicite revisão humana do colega confirmado **Lucca Castilho** pela conta GitHub fornecida; não adivinhar @username. Aguarde CI/revisão, não dar merge próprio sem aceite. Se um PR for criado por ferramenta Codex, anexar ao chat com attach_artifact. Não modificar main/gh-pages manualmente nem burlar check/reviewer.

### Evidências, pessoas e resposta final

Banca, consentimentos, contas, inscrição e termos só por pessoas autorizadas. Nenhum roteiro garante nota do professor.

Atualize `docs/checklist-avaliacao.md` só com provas: data real, SHA/tag/run/URL, arquivos, comandos e resultado. Atualize AI-USAGE com ferramenta/finalidade/prompt resumido/resultado/revisão/PR verdadeiro. Registre status no `03-controle-execucao.md` e índice de evidências, sem dizer que todo INT foi aceito quando apenas parte foi concluída.

Quando for possível, preencha ficha original no navegador com dados e URLs reais já verificados; autoavaliações10 são estimativas solicitadas, não nota atribuída. Check de entrega e declarações só quando verdadeiros. Não alterar original/JS para liberar botão nem enviar e-mail/AVA sem autorização no contexto da execução. Se a sessão for interrompida, salvar estado administrativo local fora dos entregáveis acadêmicos.

Ao terminar, informe objetivamente: passo/INT/checks realmente fechados, arquivos, execução/testes, commit do usuário/PR/revisor, evidências, pendências humanas e próximo passo habilitado. Se bloqueado por acesso/pessoa/termos, entregue preparação revisável e mantenha aceite pendente; não repetir falha de ferramenta indefinidamente nem inventar sucesso.
