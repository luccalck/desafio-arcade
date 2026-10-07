# Laboratório de lógica — evidências parciais, 07/10/2026

Versão candidata 0.3.0, fonte principal jogo-arcade, branch feature/primeiro-ciclo e [PR draft #2](https://github.com/luccalck/desafio-arcade/pull/2). Implementação b7789bb; documentação/scripts complementares no histórico deste PR. Aprovação integral de concepção recebida. Revisão por outro integrante e publicação ainda pendentes.

| Tarefas / INT | Arquivos e comportamento implementado | Execução local e resultado |
|---|---|---|
| P01/P02/D01 — 02/04 | core/lab-types.ts, lab-engine.ts; content/missions.json, schema/validate; design/spec | Seis missões, exemplos/práticas e todos os cenários resolvidos pelo validador; teste contratual inicialmente falhou pelo módulo ausente, depois passou |
| D02/D04 — 04/06 | Interpretador puro, expressões E/OU agrupadas, variáveis/contador, ramos e PARA CADA limitado; progress/preferences | 80 unidades + 13 integrações, 93 testes sem falhas; cobertura core: instruções 94,01%, branches 92,91%, funções 100%, linhas 97,22% |
| P03/P04/D03 — 02/04 | app/views, lab-editor/lab-board, CSS, menu/aula/exemplo/prática/desafio, pausa/opções, seis setores e 700 XP | 13 E2E sem falhas em 30,7 s; campanha inteira por controles reais da UI, sem desbloqueios injetados |
| D05 local/D06 — 04 | E2E de correção, revisão de aula, pausa, teclado/foco, celular, persistência/replay/reset próprio e arquivo offline | Chrome 154; celular 390×844 sem overflow, final com grupos/ramos/3 lotes. Offline file:// com rede bloqueada. Não é regressão de HML nem smoke PRD |
| R02/R03 — 02/03/06 | build/reproducibility/package, gerador GDD e mapas | Lint/types e conteúdo passaram; duas builds têm hashes iguais exceto data explicitamente normalizada. ZIP de b7789bb: 28.770 bytes, entradas descompactadas conferidas; SHA bf052b5af8c121edae1c888b6e030f7e17f0199686d41b38cfc28c50bc19a593 |
| S01/S02 — 05 | Hook/scanner, audit, SBOM, licenças/AI-USAGE | Audit de produção: zero vulnerabilidades; SBOM CycloneDX gerada; hook Gitleaks bloqueante executado nos commits. Nova CI será conferida no acompanhamento local |

Comandos: npm run lint, test:ci, content:check, build, test:e2e, reproducibility, package, gdd:pdf, npm audit --omit=dev --audit-level=critical e npm sbom --sbom-format cyclonedx. pdfinfo valida o PDF; páginas renderizadas por pdftoppm e inspecionadas. Relatórios JUnit/cobertura/segurança/construção e capturas em reports/; CI publica esses arquivos como artifacts. PDF contém as doze seções, identificação ainda incompleta, seis mapas, fluxo, wireframes, arte, IA/direitos e Esteira.

Após os ajustes finais de CSS móvel, três cenários E2E (menus/campanha/celular) passaram novamente em 27,9 s na fonte b7789bb; cenário de aula/sequência passou em 5 s para captura. Esses subconjuntos não substituem os treze cenários completos já executados nem a CI do último commit.

Capturas reais de navegador local: reports/screens/menu-logica-desktop.png, menu-logica-mobile.png, aula-sequencia.png, logica-e-ou-desktop.png, repeticao-desktop.png, nucleo-final-desktop.png, condicoes-mobile.png e final-mobile.png, fonte b7789bb. Duas cópias versionadas em docs/images/lab-menu-real.png e lab-condicao-real.png. Não são imagens de produção nem playtest humano. Mapas/wireframes/concept SVG são documentação de projeto, não simulação de evidência.

## Contratos significativos

Sequência verifica dependências de ligar/iniciar/ler/enviar. Variáveis exigem calcular energia sob duas entradas, carga única e duas operações. SE/SENÃO trata pacote íntegro e corrompido. E/OU resolve seis casos distintos e oito combinações booleanas nos testes de unidade. PARA CADA resolve lotes de três/cinco, inicializa contador e conta apenas após envio, uma vez por item. Final resolve três lotes, inclusive meta zero, e verifica proteção do relatório nas quatro combinações de meta/lote. Liberar incondicionalmente ou usar OU onde a proteção pede E falha. Imutabilidade, instrução inválida, laço aninhado, limite de blocos/itens/cem operações e conteúdo inconsistente são verificados.

Exemplo, prática e desafio têm entradas diferentes; algumas regras do exemplo são mais simples e precisam ser adaptadas no desafio. Aula e prática não concedem XP. Desafio começa sem programa; XP só após todos os casos passarem. Persistência distingue campanha antiga e nova; reset não apaga outras chaves. Preferências e fallback de armazenamento são testados.

A campanha antiga foi retirada das fontes ativas; seu código está no histórico Git. A [evidência do bug real de foco #1](bug-foco.md) permanece preservada; a regressão foi adaptada ao editor atual. Falhas didáticas e a falha contratual inicial não são inventariadas como novos bugs reais. Na revisão dos scripts, foi corrigida referência a levels.json no verificador de reprodutibilidade para missions.json; a verificação posterior passou.

## Limites e próximo checkpoint

G0 continua o primeiro checkpoint sem aceite completo: dados/participação/acessos reais e horário da aula. Os arquivos preparam G1/G2, sem substituir compreensão ou revisão pelos quatro. Nenhum INT está integralmente fechado. HML/PRD, revisão humana, tags/releases, recuperação, sondas/DORA, vídeo, triagem/pacote final e banca não foram executados. Eficácia educativa/diversão/acessibilidade completa não foram medidas. Seguir os roteiros C/P/D/R/S e G0–G8, sem contar esta evolução como PRs/revisões de outras pessoas.
