# Rota do Código — Desafio Arcade

Para continuar o projeto, abra o [índice de execução](docs/execucao/00-indice-geral.md). **Lucca começa pelo [passo001](<docs/execucao/Lucca Castilho/001-equipe-contexto.md>) e segue até010**; depois Davi011–020, Miguel021–030 e Lucas031–040. Os arquivos de orientação são locais, dentro deste mesmo projeto.

Um jogo educativo WEB para aprender programação construindo as regras de um minijogo. Em cinco missões e um desafio final, você edita funções Python de controles, movimento, colisão, pontuação e ondas, testa resultados e observa o efeito jogando. Ao concluir, pode baixar suas funções `.py` e seu minijogo em HTML independente.

**[Jogar no navegador](https://luccalck.github.io/desafio-arcade/)** · **[GDD completo](docs/gdd.md)** · **[Checklist completo de pendências](docs/gestao/checklist-avaliacao.md)** · **[Auditoria do enunciado](docs/gestao/auditoria-avaliacao.md)**

**[25 MDs e quarenta etapas preservadas](docs/execucao/00-indice-geral.md)** — Lucca mantém001–010; Davi, Miguel e Lucas têm cinco arquivos cada, com duas etapas completas por arquivo. Tarefas/checks/dependências/validações preservados, commit pela própria conta e revisão cruzada desde o início. [Passagem de bloco](docs/execucao/04-passagem-de-bloco.md) e [estrutura exata do repositório e entregáveis](docs/execucao/01-estrutura-repositorio.md).

O jogo é estático, responsivo e funciona offline. O jogador não precisa instalar Node, Python ou uma engine. O editor executa um subconjunto educativo de Python documentado no GDD, sem backend ou conta.

## Estado do projeto

A versão publicada é **1.0.0**, SHA `be281493c7699468f991a2333df074ec76691b3d`. [Jogar](https://luccalck.github.io/desafio-arcade/) · [Homologação](https://luccalck.github.io/desafio-arcade/hml/) · [Painel](https://luccalck.github.io/desafio-arcade/status/) · [Release](https://github.com/luccalck/desafio-arcade/releases/tag/v1.0.0).

A main é a branch padrão protegida. A [publicação39346940628/1](https://github.com/luccalck/desafio-arcade/actions/runs/39346940628) passou com **325 testes e 37 E2E**, HML em173,519s, aprovação real de produção, smoke e monitor. Promovemos o mesmo ZIP de30.469bytes, sem recompilar entre ambientes. O [pitch atual](docs/pitch/pitch-v1.0.0.mp4) tem86s, áudioElevenLabs fornecido pelo squad e legendas sincronizadas; foi validado contra essa produção.

A revisão externa do fechamento foi expressamente dispensada pelo proprietário. O registro preserva `approved:false`, com restauração da política da main após integrar; não é uma aprovação acadêmica. O pacote e o resultado real da triagem estão nas [evidências da entrega](docs/evidencias/entrega-1.0.0-2026-10-19/). Prazo antigo mantido, sem retroagir execução ou declarar triagem aprovada indevidamente. [Pendências e limites](docs/execucao/05-pendencias-por-passo.md) · [Ficha persistente](docs/gestao/ficha-entrega.md).

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
| `npm run relatorio:pdf` | Gerar `artifacts/RelatorioTecnico.pdf` |
| `npm run package` | Gerar ZIP e checksum |
| `npm run reproducibility` | Comparar builds, normalizando somente a data de version.json |
| `npm run sbom` | Emitir SBOM CycloneDX |

A [regressão preparada no passo006](docs/evidencias/regressao-hml.md) amplia a suíte para17E2E locais/CI e valida5cenários no preview público, incluindo campanha até vitória por teclado/toque emulado e reinício. A execução formal após cada deploy permanece no011.

A [preparação da esteira007](docs/evidencias/ci-formal.md) reúne ZIP/GDD/SBOM/relatórios em pacote validado por SHA e execução, com clone limpo/CI comprovados. Os jobs de publicação dependem dos scripts/aceites011 e019; aviso no Actions não comprova recebimento pelo squad.

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

GitHub Flow: branch curta → PR para `main` → revisão de outro integrante → CI verde → merge. Usar Conventional Commits e tags anotadas após os aceites. `gh-pages` é escrito apenas pela pipeline. Após a versão candidata `v1.0.0`, vigora a política de **congelamento de código (Code Freeze - CR-09/CR-10)**: apenas correções com prefixo `fix:` via PR revisado e esteira CI completa são permitidas. Mudanças manuais em `gh-pages` continuam estritamente proibidas. Consulte os procedimentos de contingência em [operação de rollback](docs/operacao-rollback.md) e [evidência de smoke final](docs/evidencias/smoke-final.md).

O professor exige pelo menos **dez PRs revisados por outro autor** e, para cada integrante, **commits e PRs aprovados em pelo menos três integráveis diferentes**, além da participação na banca. A equipe e a distribuição real estão registradas em [SQUAD.md](SQUAD.md); os commits de um único autor não substituem o trabalho dos quatro.

Consulte [decisões de projeto](docs/gestao/design.md), [plano Python/Pages](docs/historico/planos/2026-10-12-python-pages.md), [backlog](docs/gestao/backlog.md), [segurança](SECURITY.md), [registro de IA](AI-USAGE.md) e [terceiros/licenças](THIRD_PARTY.md).

Os roteiros do contexto preservam C01/C02, P01–P07, D01–D07, R01–R07, S01–S06 e os checkpoints G0–G8. G0 é o primeiro aceite incompleto. Preparação técnica não substitui revisão humana, dados reais ou evidências de execução.

## Fluxo Git e configuração GitHub — passo003

Uma fonte principal, branches curtas e commits Conventional Commits em português (`feat:`, `fix:`, `test:`, `docs:`, `ci:`). Antes de gravar, cada integrante confere `git config --get user.name`, `git config --get user.email` e `gh api user --jq .login`; não usa a conta de um colega. Antes de trocar de branch, confere status e preserva alterações locais.

Fluxo normal: branch curta → PR main → revisão de outro autor → ci verde do HEAD → merge. Main exige uma aprovação, ci/strict e proteção também para administradores. Novos pushes podem descartar aprovação antiga. Sem autoaprovação ou bypass.

Enquanto o PRprincipal#2 aguarda integração, os diffs dependentes são isolados temporariamente:003→002→001→primeiro-ciclo→main. Registramos a exceção no PR; após integração revisada/CI, ajustamos bases e restauramos main como padrão. Isso não equivale a aprovação/merge.

Enviamos convites write a DaviSouza78, miguelsenai2024 e6lucassilvaaa em13/10/2026; aceites/acessos e leitura do professor ainda precisam de confirmação. Papéis coordenam, sem limitar contribuição nas outras áreas.

Variables públicas: `SITE_URL=https://luccalck.github.io/desafio-arcade`, `PAGES_PREVIEW_ENABLED=true`. Segredos ficam em secrets/token do job. Pages atual usa Actions; planejamos origem gh-pages juntamente com publicação automatizada nos007/011. Não trocar Settings isoladamente. [Configuração, resultados e plano](docs/evidencias/configuracao-github.md).

## Privacidade e dados locais

Não implementamos telemetria, analytics, contagem remota de partidas ou coleta de dados pessoais do jogador. O jogo não solicita nome, e-mail, idade ou localização, não possui cadastro/ranking e não envia o código Python digitado para um servidor. Conteúdo e execução ficam na build estática.

Guardamos somente progresso, funções Python e preferências no localStorage do navegador, nas chaves da oficina v5 e settingsv1. O carregador do preview guarda na sessionStorage o SHA da versão selecionada; suas requisições de rollout/version.json servem à escolha da release, não à telemetria de partidas. Armazenamento indisponível mantém a oficina na sessão. Reiniciar oficina remove apenas suas fontes/progresso; preferências e campanhas anteriores são preservadas.

Não usamos cookies da aplicação, publicidade, APIs de IA em runtime ou serviços externos na partida. A hospedagem entrega os arquivos estáticos por HTTP; abrir index.html da build permite jogar offline. Novas integrações/coletas exigem revisão desta declaração antes de entrar na build. [Conferência de segurança e privacidade](docs/evidencias/seguranca-inicial.md).

## Consultar os materiais do Stitch

[Telas, prompt, proveniência e ZIP original](docs/images/stitch-009/README.md) estão neste repositório. O projeto editável no serviçoGoogle exige acesso à respectiva conta; consultar os resultados não depende desse acesso. GDD/build/relatórios gerados pelaCI ficam nos artefatos doActions, com retenção; anexos permanentes da release serão entregues na etapa de release. Não há pitch final gravado ou pacote final neste momento.
