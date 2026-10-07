# Rota do Código — Desafio Arcade

Puzzle educativo **WEB**: programe um robô, observe cada ação e corrija sua rota. Três desafios introduzem sequência, depuração e repetição. Site estático responsivo, sem backend ou conta de jogador. Conceito A aprovado em 07/10/2026.

Projeto da avaliação de Integração e Entrega Contínua / DevOps. [GDD completo](docs/gdd.md), [decisões](docs/design.md), [backlog](docs/backlog.md), [squad pendente](SQUAD.md), [IA](AI-USAGE.md) e [licenças](THIRD_PARTY.md).

## Estado verificável

Primeiro ciclo candidato em branch; main contém somente o bootstrap até revisão por outro autor. CI produz jogo, PDF, relatórios, SBOM, ZIP e checksum. Homologação, produção, rollback, sondas/DORA, vídeo e pacote de submissão dependem das próximas etapas e execuções. Não há URL pública de jogo validada nesta etapa.

## Desenvolvimento

Node 24 e npm; Chrome para navegador/PDF; Poppler/pdfinfo para validar o PDF. Se npm falhar com `spawn cmd.exe EACCES` no PowerShell deste ambiente, executar `$env:npm_config_script_shell = (Get-Command pwsh).Source` na sessão. Isso não é requisito de Linux/CI nem do jogador.

```text
npm ci
npm run lint
npm run test:ci
npm run build
npm run dev
```

Preview: http://127.0.0.1:4173 . `npm run test:e2e` inclui campanha, falha/correção, celular, teclado e arquivo offline. `npm run gdd:pdf` gera artifacts/GDD.pdf; `pdfinfo artifacts/GDD.pdf` valida estrutura. `npm run package` gera build.zip e SHA-256. `npm run reproducibility` compara duas builds normalizando somente data em version.json. `npm run sbom` produz CycloneDX no stdout.

## Offline

Descompactar build.zip e abrir index.html no navegador. LEIA-ME.txt acompanha a build. Nenhuma instalação de Node ou engine é exigida do jogador. Teste automatizado usa file:// com rede desativada; produção deve usar o mesmo ZIP, sem recompilar entre HML e PRD.

## Arquitetura e colaboração

`src/core`: regras puras sem DOM. `src/content`: JSON, schema e validador. `src/scenes`: apresentação HTML/SVG. `tests`: unidade, integração e E2E. `scripts`: construção, documentos e empacotamento. Conteúdo inválido interrompe a build.

GitHub Flow: branch curta → PR → revisão de outro integrante → check `ci` → main. Conventional Commits, por exemplo `feat(core): executar comandos`. Tags anotadas com SemVer/SHA/data coerentes somente após os aceites. Não editar gh-pages manualmente. Instalar hook conforme SECURITY.md.

O commit inicial direto em main criou identificação mínima do repositório vazio; não conta como PR revisado ou contribuição colaborativa. Squad e dez PRs revisados dependem de participação real. Códigos C01/C02, P01–P07, D01–D07, R01–R07, S01–S06 e checkpoints G0–G8 continuam nos roteiros do contexto; lote detalhado em docs/superpowers/plans/primeiro-lote.md.
