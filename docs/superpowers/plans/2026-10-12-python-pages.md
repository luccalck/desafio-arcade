# Python e GitHub Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans inline. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Converter a oficina aprovada para Python e publicar preview real no GitHub Pages, com commits do autor configurado e main protegida.

**Architecture:** Parser Python→AST, runtime limitado e exportação AST + interpretador compartilhado compartilham motor puro; fontes.py são exportadas separadamente. Actions publica artefato verificado da CI em gh-pages/Pages, sem merge ou rebuild.

**Tech Stack:** TypeScript/HTML/CSS/SVG/esbuild/Ajv/Vitest/Playwright existentes; Python3 como oracle de fixtures confiáveis nos testes; GitHubActions/Pages.

Fonte C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade, mesmafeature/PR#2. Mudança explícita de linguagem/publicação autorizada em12/10; concepção e mecânicas da oficina mantidas. Plano inline, sem outros agentes/checkouts. C01/C02/P01–P07/D01–D07/R01–R07/S01–S06/G0–G8 preservados; revisão requerida e dados dos quatro pendentes.

## 1. P01/P02/D01/D04 — Python puro (INT02/04/05)

Files: src/core/code-types.ts, code-parser.ts, code-runtime.ts, code-print.ts; tests/unit/code.test.ts, code-native.test.mjs.

- [ ] Contratos antes de código: def/indentação/dicionário/TrueFalse/ifelif/range/append, comentários, comparação/logical/math/functionscope; rejeitarJS/import/DOM/calls/while/indentinválida, caps. Executar npm test -- tests/unit/code.test.ts e salvar falha real em .contexto/python-tdd; não chamar fixtures de bug de software.

```ts
expect(compileCode('def mover(entrada):\n    return entrada["posicao"] + entrada["direcao"] * entrada["velocidade"]','mover')({posicao:100,direcao:-1,velocidade:3})).toBe(97);
```

- [ ] Lexer indent/dedent/newline/comments/literais/operators; ASTrange{name,start,stop,step,body}. Parser uma defnome(entrada); suite com indent; instruções assignment/return/ifelifelse/forrange/append; entrada["campo"] apenas. Expressões comparação encadeada avaliada sem duplicar operando, not com precedênciaPython/andor, listas/aritmética.
- [ ] Runtime função com bindings mutáveis/escopoPython; avaliação range uma vez/stepzeroerro/inteiros/cap64, budget2000; truthness/equality/Pythonmodulo/divisão porzero; saída copiada. Print emite ponte JS para a AST JSON escapada; export-player inclui executeCode compartilhado, com os mesmos limites e sem duplicar semântica. Não eval da fonte do jogador.
- [ ] Fixtures confiáveis executadas por processo Python timeout2000ms e comparação com AST e JS serializado. npm test -- tests/unit/code.test.ts tests/unit/code-native.test.mjs; lint após integração. Python instalado local e python3 no Actions, sem dependência do jogador.

## 2. P02/P03/P04/D02/D03 — conteúdo/UI/export (INT02/04/06)

Files: src/content/missions.json/schema/validate; src/core/progress/workshop-save; src/scenes/app/views/export; src/style.css, index; scripts/build/docs-assets; tests/unit/save/progress, integration/export/content, E2Eworkshop/helpers/smoke.

- [ ] Converter fontes/ajuda para Python: controlar if entrada["esquerda"], mover formula, colidir<=, pontuar estado/==/+=, criarOnda for i in range(entrada["quantidade"]): posicoes.append(40+i*80). Starters mantêm defeito observável, contratos/cases/rewards sem alterar número/final.
- [ ] Persistência v5Python/legado preservado; mensagens labels.py/PY/aprendaPython e Enter/Tab assistidos. Definir Tab insere4spaces/Enter mantémindent+4apóscolon/Escape acessível; testes UI acionam teclas reais.
- [ ] Exportar HTML do mesmo motor/AST e funções.py válidas com aviso correto sobre motorJS; downloadPython acessível após final aprovado/vencido. Nunca inserir fonte bruta em script; JSON escapado/HTMLtextescaped. Tests native export e playeroffline, leitura.py comCPython.
- [ ] Version0.6.0/package-lock/index/LEIA-ME/readonlyconteúdo; npm run lint/test:ci/build/test:e2e/content:check. Pilotar desktop/mobile por controles reais; não injetarprogress. Capturas reais atuais; resolver regressões relevantes.

## 3. R02/R03/R04/S01/S02 — publicação preview (INT03/05/06/07 parcial)

Files: .github/workflows/esteira.yml; scripts/prepare-pages.mjs; tests/integration/pages.test.ts; Pages/GitHubAPI config; docs/deploy-preview.md.

- [ ] Preparação pura recebeZIP/checksum e diretório gh-pages; validaSHA/path/versão/arquivos e mantémreleasesimutáveis; cria/hml/rootloader relativo basepath offline não necessárioloader(sósite). Teste não permitirreleaseexistentediferente ou traversal; somentebuildzip existente, sem npm build nojob.
- [ ] Job apósci no push autorizadofeature e variableenabled, download-artifactpinned, gh-pages sópeloActions. UploadPages/deployPagespinned, permissionsmínimasporjob, concurrencyPages, environmentpreview. PRnãoimplanta. Smoke depoisdeployment→HTTP/version e abrir/JogarPython viaPlaywright noURLpublicado. Relatório real onfailure/always.
- [ ] Configurar Pages workflow viaAPI autorizada/enablevariable; não mudar proteção main/review_policy. CI/push real devepublicar artifact0.6.0 e verificar URL, captures eversão; troubleshooting segurosefalhar, semfalsosresultados.

## 4. P04/R03/D06 — docs/PDF/evidências (INT02/04/05/06)

Files: docs/gdd.md/design/backlog/matriz/evidencias/images,README/AI-USAGE/deploy-preview, acompanhamento local.

- [ ] Atualizar12seçõesGDD+Esteira: Python subset, `.py` eHTMLexplain, preview real apósdeploy, data12/10semretroagir. PDFskillmarker uma vez antes deedição; npm run gdd:pdf/pdfinfo/pdftoppm; inspecionartodas latestpages. Gerar mapas/wireframesPython, capturasreais.
- [ ] npm run reproducibility/package; npm audit --omit=dev --audit-level=critical; SBOM/Gitleaks; ZIP/hash/checksum/source. Commit conventionalautorluccalck/pushmesmoPR; CI/Pagesfinalverdes eartifactsconferidos. AtualizarPRbodyescopofinal; mainsemmerge/revisãohumana requerida.
- [ ] SalvarACOMPANHAMENTO_LOCAL códigos/INT/paths/commands/results/evidence/commits/URLs/nextG0. Registro separa implemented/executado/humanopendente/nãoatendido, não declarar fechamentoINTs/nota/colaboração/DORA/pacotefinal. Deixarpreviewlocalativo.

Decisão refinada na implementação: exportação compartilha executeCode e AST com a oficina, em vez de manter um segundo runtime em JS emitido. Pontes JS chamam o mesmo interpretador Python limitado. Isso conserva exatamente budgets/semântica entre navegador e HTML offline, reduzindo divergência. Comparação com CPython cobre referências e fixtures confiáveis; .py separado contém fontes Python reais.
