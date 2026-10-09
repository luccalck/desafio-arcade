# Rota do Código — execução do primeiro lote

> Execução na sessão atual com a skill executing-plans. Este arquivo detalha o lote dos roteiros externos já lidos, sem substituir seus códigos ou os checkpoints.

**Objetivo:** preparar conceito aprovado, conteúdo validado, ciclo jogável, build offline e CI em uma branch para revisão humana.

**Arquitetura:** core puro produz estados/eventos; interface HTML/SVG apresenta o resultado. JSON validado antes da build, script IIFE com metadados locais. Uma build deverá ser promovida sem recompilação.

**Stack:** Node 24, TypeScript 6 (compatível com typescript-eslint; 7 não satisfaz seu peer dependency), esbuild, Vitest, Ajv e Playwright. Versões verificadas no registro npm e fixadas em package/lockfile.

## C02/R01 e P01/D01 — definição e contratos

- [x] Estabelecer base de main com README de identificação, sem código, antes dos PRs; bootstrap não conta como revisão/colaboração.
- [x] Abrir `feature/primeiro-ciclo`; nenhuma implementação em main.
- [x] Registrar design aprovado em `docs/design.md`, GDD em `docs/gdd.md` e contribuições pendentes em `docs/backlog.md`.
- [x] Criar `src/core/types.ts`: Direction, Primitive, Command, Level, Execution, RunState.
- [x] Criar `src/content/levels.json` e `schema.json`: três mapas com solução editorial, inicial, objetivo, dica, limites e aprendizagem.

## D02 — regras guiadas por teste

- [x] Escrever `tests/unit/engine.test.ts`; executar `npm test -- tests/unit/engine.test.ts` antes de criar engine; guardar falha por módulo ausente em registro local.
- [x] Implementar `src/core/engine.ts`: `countBlocks`, `compile`, `startRun`, `stepRun`, `runProgram`.
- [x] Verificar quatro curvas, colisão, borda, programa vazio/excessivo, repetição, fim, vitória antecipada, limite e imutabilidade.
- [x] Executar `npm run test:ci`; exigir mínimo de 15 unidades e cobertura de cada métrica ≥ 70% em core.

## D04 — conteúdo e build

- [x] Escrever `tests/integration/content.test.ts` antes do validador; executar e confirmar falha do import.
- [x] Implementar `src/content/validate.ts`: Ajv, retângulo, posições/células, IDs, limites e solução real via core.
- [x] `scripts/check-content.ts` deve aceitar caminho opcional; arquivo malformado ou inválido retorna código != 0, sem fallback para conteúdo anterior.
- [x] `scripts/build.mjs`: gerar dist com index, CSS, script clássico, version.json e LEIA-ME. Metadados de mesma origem na UI e JSON; apenas version.json varia com a data.
- [x] `scripts/reproducibility.mjs`: dois builds, comparação de hashes de todos os arquivos normalizando somente data em version.json.

## P02/P03/P04, D03 — apresentação

- [x] Desenhar SVGs originais de mapas, wireframes identificados como projeto e robô; documentar origem/licença.
- [x] `src/scenes/app.ts` coordena menu/editor/execução/fim/campanha; `board.ts` apresenta células/direção; `program.ts` edita ações e repetição sem arrastar.
- [x] `src/style.css`: oficina de eletrônica, papel claro, tinta escura e acento laranja; mapa legível, foco e movimento reduzido.
- [x] Executar ciclo completo; edição desabilitada durante execução, modo por passo, reinício e retorno ao menu.

## D05 local, R02/R03, S01/S02 — verificação e automação

- [x] Playwright: abertura/primeira fase/fim; derrota/correção/reinício; repetição/campanha; viewport móvel; offline por file:// com rede bloqueada.
- [x] `scripts/gdd-pdf.mjs`: Markdown → HTML e Chromium PDF com SVGs locais; validar pdfinfo e renderização. GDD inclui 12 seções, Esteira e identificação pendente explícita.
- [x] CI em `.github/workflows/esteira.yml`: qualidade, E2E, scanners, build/PDF/SBOM/ZIP; `ci` agrega os resultados e bloqueia falhas.
- [x] Gitleaks bloqueante, npm audit produção nível critical, SBOM, Dependabot, LICENSE, THIRD_PARTY, AI-USAGE, pre-commit e política de segurança.
- [x] Executar CI real na branch/PR; preparar proteção de main com uma aprovação de outro autor, `ci` obrigatório e admins sem bypass.
- [x] Abrir PR draft, anexar ao chat, manter sem merge até revisão de outro integrante.

G0/G1 permanecem com aceites humanos pendentes: a aprovação do conceito permite preparação, mas não substitui squad/acessos/compreensão dos quatro. HML/PRD, recuperação, monitoramento real, vídeo, pacote final e G3–G8 não serão declarados executados pelo sucesso dos testes locais.
