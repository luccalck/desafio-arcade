# Python e Pages — evidências parciais de 12/10/2026

Candidata0.6.0, fonte única jogo-arcade, mesma branch/PR#2. Conceito da oficina mantido, desafios Python/publicação autorizados pelo solicitante. Plano364dc77, implementação863e866, correção5ebdc64. Autor Git luccalck confirmado; isso não representa revisão de outro integrante.

| Tarefas / INT | Arquivos e trabalho | Execução local real |
|---|---|---|
| P01/P02/D01/D04 — 02/04/05 | code-types/parser/runtime/print; Python indentado/dicionário/if/range/append | Contratos antes da implementação:70testes,48falhas sob parserJS, JUnit.contexto/python-tdd/red.xml. Após adaptação/refinamentos,74contratos passaram |
| D02/D04 — 04 | code-native/core/content | CPython local/CI em processo com timeout2s, sófixtures confiáveis;16testes com referências/casos/semântica, comparados ao interpretador e exportAST.152unidades passaram; coreinstruções97,90%,branches95,23%,funções/linhas100% |
| P03/P04/D03/D06 — 02/04/06 | Editor.py/Tab/Enter/Escape, progressoPythonv5, ajuda e download | Suite15E2E passou antes da inclusão do download.py na regressão. Na fonte5ebdc64, três cenários finais passaram em16,2s: primeira missão/campanha desktop com .py+HTMLMIT/offline/campanha mobile390×844 com vitória real |
| D06 — 04 | Markup de recompensa compartilhado app/views | Bugreal na fonte863e866: botão.py ausente imediatamente ao vencer. Falha anterior/captura/JUnit preservados; fix5ebdc64 e download correspondente passou. Não confundir com starter educativo ou bug histórico de foco/regra antiga |
| R02/R03/R04/S01/S02 — 03/05/06/07 parcial | prepare-pages/workflow/Pagesconfig | Contrato de Pages inicialmente falhou por módulo ausente.6integrações passaram: layout/HML/release/loader, imutabilidade, checksum/SHA e arquivos. Dois cenários de publicação passaram contra site preparado localmente4180; isso não é prova de URL pública |
| P04/R03 — 02 | GDD12seções/Esteira/maps/flow/wireframes/PNG | High concept782caracteres. PDF0.6.0/A4/12p, pdfinfo e inspeção visual de todas as páginas. Capturas5ebdc64 são execução real local |
| R03/S02 — 05/06 | Package/scanner/licenças | ZIP5ebdc64:26.122bytes, sete entradas, SHA2568d7ea5c8edbff34bc984e68e2d5d71d9b055bb53c8e537e2f15a286ac1d750bd. Gitleaks staged passou; audit/SBOM/reprod e CI final serão registrados por execução |

Comandos: npm run lint/test:ci/content:check/build/test:e2e/package/gdd:pdf; python -I para oracle de fixtures; npx playwright test --grep campanhas; npx playwright test --config playwright.public.config.mjs contra site local preparado; pdfinfo/pdftoppm; gh/git. reports/artifacts/tmp/.contexto ignorados, produzidos por execução; imagensGDD/before de bugs versionadas são cópias reais. Sem progresso fabricado: testes escrevem fontes pelo editor e pilotam por teclado/toque.

Python aceito é subconjunto educativo, não runtime CPython completo: def(entrada), leitura de campos de dicionário, números/operações, comparações, True/False/not/and/or, atribuições, if/elif/else, listas numéricas/append e for emrange1–3args. Guardas e subset documentados no GDD. Sem imports, chamadas livres, globais, arquivos/rede/while. ExportHTML compartilha AST/runtime; arquivo.py separado é Python válido, não recompila automaticamente HTML.

Pages configurado em workflow, HTTPS, variableenabled e branchpermitida de preview; repositório jáexistia/não duplicado. Só pipeline escrevegh-pages; main protegida/PRdraft/review_required. [Operação e limites](../deploy-preview.md). Resultado real de CI/Pages/smoke, URL e checksums finais são os do run e acompanhamento local. Nenhum INT integralmente fechado; G0/humanos e G3–G8 além do preview continuam pendentes.

[Execução real CI/Pages e checksums conferidos](ci-python-pages.md): source86390e0,178testes/15E2E/2smokespúblicos, PDF/ZIP/metadados ebytesdosite verificados. Nenhum merge/revisãohumana/aceitefinal simulado.
