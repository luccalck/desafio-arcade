# Evolução das missões - evidências locais de 07/10/2026

Fonte principal: jogo-arcade, branch feature/primeiro-ciclo, PR #2. Aprovação de conceito/evolução consta em docs/design.md. Não houve merge, revisão humana, implantação ou playtest nesta etapa.

| Tarefa / INT | Arquivos criados/alterados | Execução e resultado |
|---|---|---|
| P01/P02/D01 - 02/04 | types, levels/schema/validate, tutorial, docs/design e GDD | Quatro mapas e soluções editoriais executáveis; schema/semântica bloqueiam conteúdo inválido |
| D02/D04 - 04/06 | engine/progress e testes unitários/integração | Contratos novos inicialmente falharam; depois 67 unidades e 10 integrações passaram. Cobertura core: instruções98,46%, branches97,43%, funções/linhas100% |
| P03/P04/D03 - 02/04 | app/views/board/program, style, index | Treino, briefing, coleta, porta AND, edição, loop, 400XP/medalhas/progresso local; capturas reais Chrome abaixo |
| D05 local/D06 - 04 | tests/e2e, helpers, configuração | 12 cenários passaram localmente; campanha, falha/correção, AND, replay/reload/reset, teclado, celular, file:// offline e armazenamento bloqueado. Regressão do bug real #1 preservada |
| R02/R03 - 02/03/06 | build/docs-assets/gdd-pdf/package/reproducibility, package/lock0.2.0 | lint/tipos, conteúdo, PDF/pdfinfo/renderização/inspeção; duas builds com hashes iguais exceto data normalizada; ZIP descompactado e conferido, 23.062bytes na fonte97d22d2 |
| S01/S02 - 05 | AI-USAGE, scanners/relatórios existentes | Gitleaks staged passou no commit97d22d2; audit produção zero vulnerabilidades; SBOM CycloneDX gerado |

Comandos: npm run lint, npm run test:ci, npm run content:check, npm run build, npm run test:e2e, npm run reproducibility, npm run package, npm audit --omit=dev --audit-level=critical --json, npm sbom --sbom-format cyclonedx, node scripts/docs-assets.mjs, npm run gdd:pdf, pdfinfo e pdftoppm. PowerShell usa npm_config_script_shell=pwsh nesta máquina; CI Ubuntu usa npm ci normal.

Após alteração da barra mobile, o cenário mobile passou isoladamente; após o commit97d22d2, tutorial/mobile/circuito foram executados novamente para capturar a versão indicada na tela. Suíte completa de12 cenários tinha passado antes desses refinamentos; CI do último commit deve confirmar a combinação final. Testes não são medições de aprendizagem.

Capturas versionadas: docs/images/campanha-real.png e missao-real.png, Chrome local, fonte97d22d2, 07/10/2026. Screenshots de celular/circuito e relatórios locais em reports/screens e reports/ (ignorados no Git; CI os publica como artefatos). Mapas/wireframes/concept SVG são documentação de projeto, não prints de execução.

Checksum local do ZIP na fonte97d22d2: 6b3602de07433898a94eff906136828d4d9d822e70ce2c5b602ebcc7d37aaaac. Data e SHA de construção variam entre commits/execuções; cada artefato deve usar seu próprio checksum/version.json. Não reutilizar esse hash para a futura build da CI ou release.

G0 continua pendente de equipe/horário/acessos humanos. Conceito/evolução aprovados permitem preparação, não aceites coletivos. Revisão por outro autor, publicação HML/PRD, smoke/recuperação, sondas/DORA, vídeo e pacote final não atendidos por este lote. Próximo passo: CI do último commit e revisão real do PR; então R04/R05 e demais roteiros, preservando G0–G8 e C/P/D/R/S.

PDF local atualizado: 11 páginas A4, high concept698 caracteres, pdfinfo válido; todas as páginas renderizadas e inspecionadas. A geração dos mapas inicialmente falhou por acesso a position.x, corrigido para os campos x/y do contrato; nova geração/PDF passaram. O PDF antigo não foi usado como evidência da versão nova.
