# Oficina de Jogos — evidências parciais, 09/10/2026

Candidata 0.5.0, fonte única jogo-arcade, branch feature/primeiro-ciclo e [PR draft #2](https://github.com/luccalck/desafio-arcade/pull/2). Alternativa A aprovada com instrução de planejar/iniciar. Plano 9598ac1, implementação 76b7797. Documentos complementares no mesmo PR; revisão por outro autor e publicação pendentes.

| Tarefas / INT | Arquivos e comportamento | Execução disponível |
|---|---|---|
| P01/P02/D01 — 02/04/05 | code-types/parser/runtime/print; contratos antes do módulo | Falha inicial por import ausente registrada em .contexto/oficina-tdd/red.xml; depois contratos passaram. Fontes editoriais comparadas com JavaScript nativo sob timeout, nunca fonte do jogador em eval no aplicativo |
| D02/D04 — 04/06 | arcade-engine, workshop-save, progress/preferences, missions/schema/validate | 127 unidades +18 integrações passaram; instruções core97,93%, branches95,20%, funções98,14%, linhas99,20%. Referências passam, fontes iniciais falham; JSON/schema/contratos incoerentes bloqueiam build |
| P03/P04/D03 — 02/04 | app/views/player/export/editor/CSS; cinco funções e final | 13 E2E passaram em21,7s antes dos ajustes finais identificados abaixo. Edição/casos/efeito real, menus, pausa, foco, preferências, fontes persistentes, reset próprio, fallback e legado preservado |
| D05 local/D06 — 04/06 | workshop.spec/helpers/smoke, bug real de regra antiga | Na fonte76b7797, três cenários em17,2s: regra reaplicada muda direção real, campanha desktop com download HTML/MIT/offline, campanha mobile por toque. Depois smoke2 passou em3,6s. Suite completa da CI será conferida no acompanhamento local |
| R02/R03 — 03/06 | build/reproducibility/package | Lint/types passaram. Comparação de builds passou normalizando somente data. ZIP76b7797:23.985bytes; entradas descompactadas comparadas; SHA-2566250654e2b1f79e14884cccdef968229368d6e5d6c60a9075c0244310d54a465 |
| P04/R03 — 02 | gdd/assets, seis mapas/fluxo/wireframes/concept e duas capturas | High concept786 caracteres; PDF0.5.0/A4/12páginas/320.063bytes, pdfinfo. Todas as páginas renderizadas com pdftoppm e inspecionadas. Este GDD não é o relatório técnico, ainda pendente |
| S01/S02 — 05 | Hook, audit/SBOM/licenças/AI-USAGE | Gitleaks staged passou nos commits9598ac1/76b7797; audit de produção0 vulnerabilidades; SBOM CycloneDX local. Artefatos da CI têm SHA próprio e serão verificados |

Comandos: npm run lint, test:ci, content:check, build, test:e2e, reproducibility, package, gdd:pdf; npm audit --omit=dev --audit-level=critical; npm sbom --sbom-format cyclonedx; pdfinfo/pdftoppm. Relatórios e capturas em reports, artefatos em artifacts, ambos ignorados e gerados pela automação. Hook e job de segurança verificam o histórico sem segredo real de teste. A data do pacote muda por execução; não confundir checksum local com o artefato da CI.

## Contratos e navegador

Sintaxe/precedência/escopos/const/short-circuit/strings/arrays/for/retorno, cópia de entradas, mensagens por linha e limites contra loops ou APIs não permitidas. Motor puro verifica controle/movimento/colisão/estado/ondas, vitória/perda, erro localizado e estado final idempotente. Casos de fronteira, entrada parada, ponto acumulado e quantidade zero evitam regras que acertem apenas um exemplo. Conteúdo exige referências corretas e starters com erro real do conceito.

Player usa função da missão mais quatro regras de apoio; final usa as cinco fontes salvas. Testes de navegador preenchem textarea e acionam controles reais; piloto observa posições no DOM e usa teclado/toque. Não injeta vitórias, XP ou estado de runtime. Final exige testar23casos e vencer100pontos para ganhar200XP e exportar; total700, replay não duplica. Não houve bug novo inventado a partir de tentativas educativas erradas.

Navegador: edição invalida regra anterior; nova direção/velocidade altera partida; pausa conserva atualizações/score/posição; ajuda/casos/foco/reset; reload de código/vitória; storage indisponível e campanha antiga preservada. Campanha desktop/mobile390×844, sem overflow horizontal da página; exportação HTML executa file:// com rede desligada e MIT completo. Build principal também testada file://. Isso não é regressão HML, smoke PRD ou playtest humano.

## Capturas e histórico

Fonte76b7797, Chrome154/Playwright local em09/10: reports/screens/oficina-primeira-desktop.png, oficina-final-desktop.png, oficina-vitoria-desktop.png, oficina-final-mobile.png, oficina-vitoria-mobile.png e oficina-export-offline.png. Duas cópias no GDD: docs/images/oficina-primeira-real.png e oficina-final-real.png. Outras capturas históricas não são atribuídas a esta fonte. Mapas/wireframes/concept são desenhos identificados; PNGs não foram fabricados ou editados para simular execução.

[Bug real de regra antiga](bug-regra-antiga.md), com captura/JUnit anteriores, permanece separado do [bug histórico de foco #1](bug-foco.md). Evidências de circuitos0.4 permanecem em bancada-visual.md e histórico Git; não são apresentadas como execução da oficina.

## Limites e próximo checkpoint

Primeiro checkpoint sem aceite completo: G0, por identificação/participação/acessos dos quatro e horário real da aula, dados adiados pelo responsável. G1/G2 têm preparação autorizada, não substituem compreensão/revisão humana. G3–G8 não liberados; nenhum INT integralmente fechado. HML/PRD, tag/release, recuperação medida, sondas/DORA, vídeo, pacote final/triagem e banca não executados. Aprendizagem/diversão/acessibilidade completa não medidas. Commits deste redesign não são dez PRs revisados por outros autores.
