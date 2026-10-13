# Rota do Código — Desafio Arcade

Para continuar o projeto, abra o [índice de execução](docs/execucao/00-indice-geral.md). **Lucca começa pelo [passo001](<docs/execucao/Lucca Castilho/001-equipe-contexto.md>) e segue até010**; depois Davi011–020, Miguel021–030 e Lucas031–040. Os arquivos de orientação são locais, dentro deste mesmo projeto.

Um jogo educativo WEB para aprender programação construindo as regras de um minijogo. Em cinco missões e um desafio final, você edita funções Python de controles, movimento, colisão, pontuação e ondas, testa resultados e observa o efeito jogando. Ao concluir, pode baixar suas funções `.py` e seu minijogo em HTML independente.

**[Jogar no navegador](https://luccalck.github.io/desafio-arcade/)** · **[GDD completo](docs/gdd.md)** · **[Checklist completo de pendências](docs/gestao/checklist-avaliacao.md)** · **[Auditoria do enunciado](docs/gestao/auditoria-avaliacao.md)**

**[40 passos e prompts em blocos](docs/execucao/00-indice-geral.md)** — Lucca executa 001–010, depois Davi 011–020, Miguel 021–030 e Lucas 031–040. Dez arquivos por pessoa, com dependências anteriores, checks, validações, commit pela própria conta e revisão cruzada desde o início. [Passagem de bloco](docs/execucao/04-passagem-de-bloco.md) e [estrutura exata do repositório e entregáveis](docs/execucao/01-estrutura-repositorio.md).

O jogo é estático, responsivo e funciona offline. O jogador não precisa instalar Node, Python ou uma engine. O editor executa um subconjunto educativo de Python documentado no GDD, sem backend ou conta.

## Estado do projeto

A candidata atual é a versão **0.6.0**. O GitHub Pages é um preview publicado e testado pela pipeline. Produção formal, recuperação, monitoramento, DORA, vídeo e pacote acadêmico final ainda estão pendentes.

O código completo está em `feature/primeiro-ciclo`, temporariamente definida como branch padrão para aparecer na página inicial. O [PR #2](https://github.com/luccalck/desafio-arcade/pull/2) tem destino `main` e aguarda revisão humana de outro autor. `main` continua protegida e contém o bootstrap. Após o merge revisado, deve voltar a ser a branch padrão. Novos PRs devem indicar `main` como destino.

As evidências disponíveis incluem 152 testes de unidade, 26 de integração, 15 cenários E2E, cobertura de instruções de `src/core` de 97,90%, bugs corrigidos com regressão, PDF gerado, build reproduzível e publicação com smoke. Consulte [testes e limites](docs/evidencias/python-pages.md), [CI e publicação](docs/evidencias/ci-python-pages.md) e a [auditoria do enunciado](docs/gestao/auditoria-avaliacao.md). Esses resultados não encerram os dez integráveis nem comprovam participação coletiva.

## Como jogar

1. Escolha uma missão e edite a função Python.
2. Use **Testar regra** para comparar o resultado com os casos da missão.
3. Use **Jogar** para experimentar o efeito da regra. Setas ou A/D pilotam; no celular, use os controles de direção.
4. Consulte ajuda e exemplos quando precisar. Conclua as cinco funções e vença o desafio final para exportar seu jogo.

Editar pausa e invalida a regra aplicada; testar ou jogar aplica a nova versão. Pausar conserva a partida; jogar reinicia. Código e conquistas persistem quando o armazenamento está disponível. Há opções de texto e movimento.

## Executar e verificar o código

Para desenvolvimento: Node 24, npm, navegador Chromium/Chrome para E2E e PDF, e Poppler/pdfinfo para validar o documento.

```sh
npm ci
npm run lint
npm run test:ci
npm run build
npm run dev
```

Acesse `http://127.0.0.1:4173/`. Neste ambiente Windows, se o shell padrão do npm retornar EACCES, configure no PowerShell antes dos comandos:

```powershell
$env:npm_config_script_shell = (Get-Command pwsh).Source
```

| Comando | Finalidade |
|---|---|
| `npm run test:e2e` | Testar interação, campanha e exportação offline no navegador |
| `npm run gdd:pdf` | Gerar `artifacts/GDD.pdf` |
| `npm run package` | Gerar ZIP e checksum |
| `npm run reproducibility` | Comparar builds, normalizando somente a data de version.json |
| `npm run sbom` | Emitir SBOM CycloneDX |

## Jogar offline

Descompacte `build.zip` e abra `index.html` no navegador, seguindo o `LEIA-ME.txt` incluído no ZIP. O HTML exportado ao vencer o final também funciona sem rede. O arquivo `.py` contém as funções Python; editá-lo não recompila automaticamente o HTML exportado.

O projeto exportado pelo jogador é distinto do pacote acadêmico. A esteira formal deve promover o mesmo artefato da homologação para produção, sem reconstruir o jogo.

## Organização e colaboração

| Pasta | Conteúdo |
|---|---|
| `src/core` | Parser, interpretador Python, regras e motor sem dependência do DOM |
| `src/content` | Conteúdo JSON, schema e contratos de validação |
| `src/scenes` | Editor, interface e jogador compartilhado com a exportação |
| `tests` | Testes de unidade, integração e navegador |
| `scripts` | Build, documentação e empacotamento |
| `.github` | Workflows e configuração de dependências |
| `pages` | Fonte do carregador e destino do painel de status |
| `docs/gdd.md` | GDD completo exigido pelo professor |
| `docs/relatorio.md` | Fonte do relatório técnico, ainda em preparação |
| `docs/execucao` | Único roteiro vigente: quatro blocos e prompts |
| `docs/gestao` | Checklist, auditoria, backlog e decisões atuais |
| `docs/evidencias` | Testes, bugs e publicação da implementação atual |
| `docs/images` | Mapas, telas, diagramas e arte do GDD |
| `docs/historico` | Planos, especificações e evidências anteriores preservados |

GitHub Flow: branch curta → PR para `main` → revisão de outro integrante → CI verde → merge. Usar Conventional Commits e tags anotadas após os aceites. `gh-pages` é escrito apenas pela pipeline.

O professor exige pelo menos **dez PRs revisados por outro autor** e, para cada integrante, **commits e PRs aprovados em pelo menos três integráveis diferentes**, além da participação na banca. A equipe e a distribuição real estão pendentes em [SQUAD.md](SQUAD.md); os commits de um único autor não substituem o trabalho dos quatro.

Consulte [decisões de projeto](docs/gestao/design.md), [plano Python/Pages](docs/historico/planos/2026-10-12-python-pages.md), [backlog](docs/gestao/backlog.md), [segurança](SECURITY.md), [registro de IA](AI-USAGE.md) e [terceiros/licenças](THIRD_PARTY.md).

Os roteiros do contexto preservam C01/C02, P01–P07, D01–D07, R01–R07, S01–S06 e os checkpoints G0–G8. G0 é o primeiro aceite incompleto. Preparação técnica não substitui revisão humana, dados reais ou evidências de execução.

## Fluxo Git e configuração GitHub — passo003

Uma fonte principal, branches curtas e commits Conventional Commits em português (`feat:`, `fix:`, `test:`, `docs:`, `ci:`). Antes de gravar, cada integrante confere `git config --get user.name`, `git config --get user.email` e `gh api user --jq .login`; não usa a conta de um colega. Antes de trocar de branch, confere status e preserva alterações locais.

Fluxo normal: branch curta → PR main → revisão de outro autor → ci verde do HEAD → merge. Main exige uma aprovação, ci/strict e proteção também para administradores. Novos pushes podem descartar aprovação antiga. Sem autoaprovação ou bypass.

Enquanto o PRprincipal#2 aguarda integração, os diffs dependentes são isolados temporariamente:003→002→001→primeiro-ciclo→main. Registramos a exceção no PR; após integração revisada/CI, ajustamos bases e restauramos main como padrão. Isso não equivale a aprovação/merge.

Enviamos convites write a DaviSouza78, miguelsenai2024 e6lucassilvaaa em13/10/2026; aceites/acessos e leitura do professor ainda precisam de confirmação. Papéis coordenam, sem limitar contribuição nas outras áreas.

Variables públicas: `SITE_URL=https://luccalck.github.io/desafio-arcade`, `PAGES_PREVIEW_ENABLED=true`. Segredos ficam em secrets/token do job. Pages atual usa Actions; planejamos origem gh-pages juntamente com publicação automatizada nos007/011. Não trocar Settings isoladamente. [Configuração, resultados e plano](docs/evidencias/configuracao-github.md).
