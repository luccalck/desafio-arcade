# Rota do Código - Desafio Arcade

Puzzle educativo **WEB**: recupere um laboratório montando máquinas de dados numa bancada visual. Cinco missões trabalham conexões, transformação de valores, decisões, E/OU e memória; um desafio final combina os conceitos em três lotes. Coloque peças, conecte portas, ligue e observe os dados para corrigir a montagem. Ajuda, configuração e registro ficam sob demanda. Menus, medalhas e até 700 XP, sem duplicação no replay. Site estático responsivo e offline, sem backend ou conta de jogador. Bancada aprovada em 07/10/2026.

Avaliação de Integração e Entrega Contínua / DevOps. [GDD completo](docs/gdd.md), [decisões](docs/design.md), [backlog](docs/backlog.md), [squad pendente](SQUAD.md), [IA](AI-USAGE.md) e [licenças](THIRD_PARTY.md).

## Estado verificável

Candidata 0.4.0 em branch; main contém somente bootstrap até revisão por outro autor. CI produz jogo, PDF, relatórios, SBOM, ZIP e checksum. HML, PRD, rollback, sondas/DORA, vídeo e pacote final dependem das próximas etapas e execuções. 87 testes de unidade e 14 de integração passaram localmente; cobertura de instruções de src/core: 99,17%. Suite com 15 E2E, incluindo campanha/celular/offline. [Evidências e limites da validação](docs/evidencias/bancada-visual.md). Ainda não há URL pública de jogo validada.

## Desenvolvimento

Node 24 e npm; Chrome para navegador/PDF; Poppler/pdfinfo para validar PDF. Se npm falhar com spawn cmd.exe EACCES no PowerShell deste ambiente, executar `$env:npm_config_script_shell = (Get-Command pwsh).Source`. Isso não é requisito de Linux/CI nem do jogador.

```text
npm ci
npm run lint
npm run test:ci
npm run build
npm run dev
```

Preview: http://127.0.0.1:4173 . `npm run test:e2e` verifica montagem por controles reais, campanha, correção, celular, teclado e arquivo offline. `npm run gdd:pdf` gera artifacts/GDD.pdf; `pdfinfo artifacts/GDD.pdf` valida estrutura. `npm run package` gera ZIP/SHA-256. `npm run reproducibility` compara builds normalizando somente data em version.json. `npm run sbom` produz CycloneDX no stdout.

## Controles e offline

Arraste uma peça ou selecione na bandeja e escolha um encaixe. Para conectar, selecione a peça, escolha saída no inspetor e depois o destino; também pode arrastar a porta. Configuração, mover, girar, remover e soltar cabos aparecem na seleção. Girar altera orientação visual, preservando regra/conexões. Ligar testa todos os lotes. Setas navegam encaixes, Enter seleciona, Delete remove e Escape cancela. Ajuda e registro são opcionais. Montagens ficam na sessão; vitórias e preferências persistem quando há armazenamento disponível.

Descompactar build.zip e abrir index.html no navegador. LEIA-ME.txt acompanha a build. Nenhuma instalação de Node ou engine para o jogador. E2E usa file:// com rede desativada; produção deve usar o mesmo ZIP, sem recompilar entre HML e PRD.

## Arquitetura e colaboração

src/core: regras puras sem DOM. src/content: JSON/schema/validador que executa duas soluções por missão em todos os lotes. src/scenes: HTML/SVG. tests: unidade, integração e E2E. scripts: construção, documentos/empacotamento. Conteúdo inválido interrompe build.

GitHub Flow: branch curta → PR → revisão de outro integrante → check ci → main. Conventional Commits; tags anotadas SemVer/SHA/data coerentes após aceites. Não editar gh-pages manualmente. Hook em SECURITY.md.

Bootstrap direto em main não conta como PR revisado ou colaboração. Squad, dez PRs revisados e contribuição nos integráveis dependem de pessoas reais. C01/C02, P01–P07, D01–D07, R01–R07, S01–S06 e G0–G8 continuam nos roteiros do contexto. [Plano atual](docs/superpowers/plans/2026-10-07-bancada-visual.md). Campanhas anteriores preservadas no Git; uma única campanha ativa na fonte.
