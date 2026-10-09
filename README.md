# Rota do Código — Desafio Arcade

**Oficina de Jogos WEB:** corrija cinco funções JavaScript para construir o minijogo Órbita. Controles, movimento, colisão, pontuação e ondas mostram o efeito das regras. Teste entradas diferentes, pilote e ajuste seu código; ajuda/casos sob demanda. Final: cinco funções passam nos testes e vencem uma partida para exportar seu jogo como HTML independente e editável. Cinco missões/final, menus e até 700 XP, site estático responsivo/offline, sem backend ou conta.

Alternativa A aprovada em 09/10/2026. [GDD completo](docs/gdd.md), [decisões](docs/design.md), [plano atual](docs/superpowers/plans/2026-10-09-oficina-jogos.md), [backlog](docs/backlog.md), [squad pendente](SQUAD.md), [IA](AI-USAGE.md) e [licenças](THIRD_PARTY.md).

## Estado verificável

Candidata 0.5.0 no [PR draft #2](https://github.com/luccalck/desafio-arcade/pull/2); main no bootstrap até revisão por outro autor. 127 unidades/18 integrações passaram localmente; cobertura de instruções de src/core 97,93%. Suite com 13 E2E: edição, campanha teclado/toque, final, exportação offline. [Evidências/limites](docs/evidencias/oficina-jogos.md). CI gera jogo/PDF/relatórios/SBOM/ZIP/checksum. HML/PRD/recuperação/sondas/DORA/vídeo/pacote final pendentes. Sem URL pública de jogo validada.

## Desenvolvimento

Node 24/npm, Chrome para navegador/PDF, Poppler/pdfinfo. Em PowerShell deste ambiente, spawn cmd.exe EACCES é resolvido com `$env:npm_config_script_shell = (Get-Command pwsh).Source`; não é requisito do jogador/Linux.

```text
npm ci
npm run lint
npm run test:ci
npm run build
npm run dev
```

Preview: http://127.0.0.1:4173 . `npm run test:e2e` verifica controles reais/file:// sem rede. `npm run gdd:pdf` gera artifacts/GDD.pdf; validar com pdfinfo. `npm run package` gera ZIP/SHA-256; `npm run reproducibility` compara builds normalizando somente data em version.json; `npm run sbom` produz CycloneDX no stdout.

## Controles e offline

Edite função, Testar regra compara resultados, Jogar mostra efeito. Setas/A-D pilotam fora do editor; celular tem botões de direção. Editar pausa/invalida regra aplicada; Testar/Jogar aplica novamente. Pausa conserva, Jogar reinicia. Ajuda/casos explicam sem preencher solução. Código/vitórias persistem quando armazenamento está disponível; opções de texto/movimento.

Descompactar build.zip e abrir index.html. LEIA-ME.txt acompanha build; nenhuma instalação de Node/engine para jogar. Após vencer final, Baixar meu jogo entrega meu-jogo.html com cinco funções/player/estilos/MIT completos, sem rede. Editor aceita subconjunto JavaScript documentado no GDD. Projeto do aprendiz é distinto do pacote acadêmico. Produção deve usar mesmo ZIP da HML sem recompilar.

## Arquitetura e colaboração

src/core: parser/intérprete AST/regras/motor puros sem DOM/eval/Function. src/content: JSON/schema/contratos; referência passa, fonte inicial falha, conteúdo inválido bloqueia build. src/scenes: editor/HTML/SVG/player compartilhado com exportação. tests: unidade/integração/E2E. scripts: construção/documentos/empacotamento. Sem dependência nova.

GitHub Flow: branch → PR → revisão de outro integrante → ci → main. Conventional Commits; tags anotadas/coerência SemVer/SHA/data após aceites. Não editar gh-pages manualmente. Hook em SECURITY.md. Bootstrap não conta como PR revisado/colaboração. Dez PRs e contribuição dos quatro exigem pessoas reais.

C01/C02, P01–P07, D01–D07, R01–R07, S01–S06 e G0–G8 nos roteiros do contexto. G0 é primeiro aceite incompleto; preparação de G1/G2 não encerra gates humanos. Uma campanha ativa; histórico preservado.
