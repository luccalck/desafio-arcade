# Etapa 014 — contrato de smoke PRD e bloqueios

Davi Paes / DaviSouza78, 13/10/2026. Base9ce2522; dependências006/010 locais e CI comprovadas. 011 ainda não tem HML formal, e produção pertence à019: este documento não declara execução em PRD ou aceiteG4/I04-10.

## Fluxo e URLs

`tests/e2e/release-smoke.mjs` compartilha verifyBuild/evidence do roteiro HML006. `tests/deploy/pages.spec.mjs` usa esse helper nos projetos `prd-smoke` (raiz/carregador) e `release-smoke` (candidata direta). Os dois projetosHML e sua regressão completa permanecem separados. HML é recusada como substituta de PRD; a URL candidata precisa terminar em releases/<SHA40>/.

O smoke exige SHA real, ponteiro ativo coerente (activeSha do preview ou estavel formal, sem contradição), version.json/SemVer/SHA/DOM, HTTP200 dos recursos críticos game.js/style.css, redirecionamento da raiz para a release esperada, início pelo menu, correção/teste da primeira regra, nave com deslocamento real e pausa. Escuta pageerror, console.error, requestfailed e HTTP>=400 da árvore testada desde antes da navegação. Mensagens genéricas de recurso no console são tratadas pelos eventos de rede com URL/escopo, para não classificar o favicon opcional da origem como erro fatal da aplicação.

Nenhuma vitória/progresso é injetado em storage, nem funções internas são chamadas para movimentar. Não cria, promove ou modifica ponteiro. `retries:0` permanece na configuração pública; a espera limitada do verifyBuild é reutilizada depois da conferência direta doSHA. SHA errado falha antes dessa espera. A aprovação humana e a promoção não são funções desse helper.

## Contrato para019 e recuperação022

Depois de publicar a candidata e esperar propagação, com os bytes do mesmo pacote aceito:

```sh
PAGES_URL="$SITE_URL/" RELEASE_URL="$SITE_URL/releases/$SOURCE_SHA/" EXPECTED_SHA="$SOURCE_SHA" npx playwright test --config playwright.public.config.mjs --project=release-smoke
```

Depois da promoção aprovada pela019:

```sh
PAGES_URL="$SITE_URL/" EXPECTED_SHA="$SOURCE_SHA" npx playwright test --config playwright.public.config.mjs --project=prd-smoke
```

Execução bem-sucedida retorna0; qualquer falha lança erro e o runner retorna código diferente de0. O promotor019 deve capturar esse código, impedir promoção adicional e restaurar o ponteiro anterior pela pipeline quando a raiz falhar; recuperação022 deve consumir o mesmo contrato e verificar a raiz com o SHA restaurado. Não usar `|| true`, retry para mascarar falha, rebuild, ou apenas o teste da candidata como prova da raiz. Rollback efetivo é trabalho019/022 e não foi implementado/disparado nesteMD.

Upload mesmo em falha: reports/pages-smoke.xml (JUnit), reports/pages-e2e/ (HTML), test-results/ (screenshots, traces de falha, anexosJSON). Cada invocação anexa URL, modo, release, SHA esperado, versão observada, horário, resultado e erros. Para candidata e raiz na mesma execução, arquivar cada relatório antes do segundo comando ou usar pastas distintas por invocação. Os jobs019 já possuem upload de reports/test-results em always; inserir chamadas no promotor ao implementá-lo. O gateci doPR executa os contratos locais como parte da suíteE2E, sem liberar deploy.

## Ensaios locais e limites

Fixtures HTTP locais usam a build real e carregador/ponteiro sintéticos, sem tocar o site público. Cenários positivos da raiz e candidata; negativos de ponteiro/SHA errado, carregador sem redirecionamento, CSS404, exceção de runtime, console fatal e controles sem efeito. Outro caso recusa HML/URL candidata incoerente. Cada negativo exige rejeição pela causa esperada, sem simular uma medição de produção.

A primeira tentativa, antes do helper, falhou por módulo ausente. A montagem inicial por page.route não atendia page.request e gerou sete falhas por HTTP404 artificial; corrigida usando servidor HTTP local. Depois, favicon404 produzia diagnóstico genérico deconsole e quatro cenários falharam; corrigimos o escopo dos eventos de rede e a fixture. Nove cenários passaram antes da adição do teste deURLs. Esses erros pertenciam ao teste/contrato novo, não são bugs educativos ou incidentes de produção.

Um ensaio adicional executou o projeto público prd-smoke contra servidor isolado que devolvia style.css404: o comando retornou exit1, JUnit1falha e screenshot/trace/diagnóstico foram preservados fora dos entregáveis. Isso prova o bloqueio do runner, não um deploy/rollback. Não houve consulta de smoke à PRD como se fosse formal. Suíte completa/CI e resultados finais constarão na publicação do par.

Pendências: revisão deMiguel, integração revisada das entradas/011, HML formal, deploy019 com aprovação e mesmo artefato, chamadas do smoke no promotor, rollback/verificação022 e evidências remotas desses fluxos. P05/D02/D05 originais externos não disponíveis. Registro único nas seções013/014; I04-10 permanece aberto.

Validação local concluída:27E2E da suíte completa passaram semretry, preservando18anteriores e9novos contratos. O caso adicional que recusaHML/candidata incoerente passou emexecução focal posterior; CIvalidará os28juntos. Lint/TypeScript final e194testes de unidade/integração passaram. Relatórios locais identificam build9ce2522 (fonte de jogo preservada), não um deploy da nova branch.

Publicação013/014 — 13/10/2026: commit próprio 909ac53a2f4d01c8d17493c9b2e27407a383bd8c, [PR#16](https://github.com/luccalck/desafio-arcade/pull/16), base temporária feature/passos-011-012-hml-sondas/PR#15. [CI push38502833358](https://github.com/luccalck/desafio-arcade/actions/runs/38502833358) e [CI PR38502867894](https://github.com/luccalck/desafio-arcade/actions/runs/38502867894): SUCCESS, incluindo ci agregado. Relatórios do pacote real conferidos:194testes e28E2E semfalhas/erros/ignorados; pacote157arquivos validado porSHA/run, PDF19pA4. Revisão de miguelsenai2024 solicitada, ainda semaprovação. Deploys ignorados; CI não comprova playtest/HML/PRD/rollback. Nenhuma etapa015+ executada.
