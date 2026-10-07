# Bancada visual - evidências parciais, 07/10/2026

Candidata 0.4.0, única fonte jogo-arcade, branch feature/primeiro-ciclo e [PR draft #2](https://github.com/luccalck/desafio-arcade/pull/2). Concepção aprovada com “Sim”. Plano 4685b0f e implementação 42678cd; documentos complementares no mesmo PR. Revisão por outro integrante e publicação pendentes.

| Tarefas / INT | Arquivos / comportamento | Execução local disponível |
|---|---|---|
| P01/P02/D01 - 02/04 | circuit-types/layout/engine; missions/schema/validate; design/spec | Contrato inicialmente falhou por módulo ausente; depois passou. Seis missões e duas montagens editoriais por missão resolvem todos os lotes no validador |
| D02/D04 - 04/06 | Simulador puro, portas, valores, E/OU, memória; progress/preferences | 87 unidades +14 integrações, 101 testes passaram. Cobertura core: instruções99,17%, branches95,12%, funções100%, linhas99,01% |
| P03/P04/D03 - 02/04 | circuit-board/inspector/app/views/CSS; peças/cabos/dados, menus/ajuda/log sob demanda | Suite completa de15 E2E passou em27,7s antes do ajuste final de arraste de cabos; subconjunto posterior de3 testes passou em16,1s, incluindo arraste/mover/girar/desconectar/desfazer e campanha inteira mobile |
| D05 local/D06 - 04 | helpers constroem montagem/configurações/portas pelo DOM; não injetam desbloqueios | Na fonte42678cd: montagem inicial, erro/correção de valores e campanha mobile passaram novamente, 3 testes em16,2s; capturas atualizadas. Offline file:// sem rede já testado pela suite; isso não é HML ou PRD |
| R02/R03 - 02/03/06 | build/reproducibility/package, GDD/assets | Lint/types passaram. Builds comparadas: mesmos hashes exceto data explicitamente normalizada. ZIP42678cd:22.708bytes, entradas descompactadas conferidas; SHA-256 d01f3ea72fc05754918477ac9fe23b8d702d6062d16f1997d3517256d3b3fd34 |
| R03/P04 - 02 | GDD12seções/Esteira e seis mapas/wireframes/concept, duas capturas reais | High concept818 caracteres; PDF13páginas A4,553.896bytes, pdfinfo; todas as páginas renderizadas e inspecionadas. Limite12páginas é do relatório técnico, que ainda não foi produzido |
| S01/S02 - 05 | Hook/scanner, audit/SBOM/licenças/AI-USAGE | Hook Gitleaks bloqueante passou nos commits; audit de produção0 vulnerabilidades e SBOM CycloneDX local. CI do último commit será conferida no acompanhamento local |

Comandos: npm run lint, test:ci, content:check, build, test:e2e, reproducibility, package, gdd:pdf; npm audit --omit=dev --audit-level=critical; npm sbom --sbom-format cyclonedx; pdfinfo e pdftoppm. Relatórios JUnit/cobertura/E2E e capturas em reports; ZIP/PDF/checksum/SBOM em artifacts, ignorados no Git e gerados pela automação. CI publica relatórios e artefatos próprios com o SHA da execução.

## Comportamentos verificados

Duas montagens por missão, rota/obstáculo/alcance/portas/ciclo/orçamento/configuração inválidos, imutabilidade e final idempotente. Transformação que acerta só a primeira entrada falha nas demais. E/OU/grupos/inversão distinguem oito combinações. Buffer guarda/libera no fim, preserva valores e conta aprovados, inclusive lote zero. Final classifica, soma e guarda sob três lotes. Perdas, duplicações, destino/valor errado e limites têm contratos. Metas inventadas ou soluções incoerentes interrompem validação/build.

Navegador: montagem/conexão por seleção e arraste; mover/girar/desfazer; erro real de tentativa e correção sem apagar peças; pausa/retomada; teclado e regressão do foco #1; ajuda/log/lotes/configurações opcionais; campanha700XP, replay/reset próprio, armazenamento indisponível/antigo; campanha por toque390×844 sem overflow; file:// com rede desligada; smoke local. Tentativa didática errada e falha contratual não foram inventariadas como novos bugs de software. Ambiguidade de locator Menu principal foi corrigida no teste, com escopo .brand.

## Imagens e autoria

Capturas reais Chrome154/Playwright local da fonte42678cd: reports/screens/bancada-conexao-desktop.png, bancada-valores-desktop.png, bancada-erro-real.png, bancada-mobile.png e bancada-final-mobile.png. Duas cópias versionadas: docs/images/bench-conexao-real.png e bench-final-mobile-real.png. Outras capturas históricas não são atribuídas a este commit. Montagens foram construídas via controles; não há progresso fabricado em screenshots. Diagramas SVG são mapas de projeto identificados, derivados do JSON, sem alegação de execução. Referências de interação registradas no GDD, sem copiar ativos. Histórico antigo e evidência real do bug de foco #1 preservados.

## Limites / próximo checkpoint

G0 continua o primeiro checkpoint sem aceite completo: dados/participação/acessos dos quatro e horário da aula. G1/G2 têm preparação autorizada, sem substituir compreensão/revisão humana. Nenhum INT integralmente fechado; G3–G8 não liberados. Sem HML/PRD, tag/release, recuperação medida, sondas/DORA, playtest humano, vídeo, pacote final ou banca executados. Avaliação educativa/diversão/acessibilidade completa não medidas. Não contar commits desta evolução como PRs revisados por outras pessoas. Seguir C/P/D/R/S mantendo as dependências.
