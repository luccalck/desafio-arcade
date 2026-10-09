# Oficina de Jogos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Aprender JavaScript construindo/corrigindo cinco funções de um minijogo jogável e exportável offline.

**Architecture:** Parser/interpretador limitado avalia funções pequenas sem eval; motor de jogo puro usa as funções para controles/movimento/colisão/score/ondas. Um playerSVG com controles reais serve à oficina e ao HTML exportado; editor e diagnósticos não são renderizados a cada frame. Conteúdo JSON estrito e testes públicos conduzem campanha única.

**Tech Stack:** TypeScript/HTML/CSS/SVG, Ajv/Vitest/Playwright/esbuild existentes; sem dependência nova, backend ou serviço pago.

Execução inline explicitamente autorizada após plano. Não usar agentes/checkouts concorrentes. Skills worktree/subagent/finishing não constam no catálogo; manter branch/PR existentes e buscar finishing se necessário no fechamento, sem interromper autorização por escolha operacional. Fonte real C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade. Plano relacionado ao design2026-10-09-oficina-jogos-design.md. G0–G8/C-P-D-R-S preservados.

### 1. P01/P02/D01 - contratos e parser (INT02/04/05)

Files: src/core/code-types.ts, code-parser.ts, code-runtime.ts, code-print.ts; tests/unit/code.test.ts e code-native.test.mjs.

- [x] Escrever contrato antes do módulo e executar `npm test -- tests/unit/code.test.ts`; registrar falha por import ausente em.contexto/oficina-tdd/red.xml.

```ts
import {compileCode} from '../../src/core/code-runtime';
it('avalia regra e preserva entrada',()=>{
 const input={posicao:20,direcao:-1,velocidade:3};
 expect(compileCode('function mover(entrada) { return entrada.posicao + entrada.direcao * entrada.velocidade; }','mover')(input)).toBe(17);
 expect(input.posicao).toBe(20);
});
```

- [x] Tipos Value=number|string|boolean|number[], Input=Record<string,Value>, Rule=(Input)=>Value. AST Expr literal/name/property/array/unary/binary; Stmt declare/assign/if/for/push/return com line; Program={name,body}. Lexer admite comentários/strings/literais/operators. Parser exige functionnome(entrada), lêprecedência/unário/return/ifelse/forlet/++; funçõesnomes restritos. Rejeitar API/call genérico/propriedade externa/computed/loopsoutros; caps6000chars/300nodes/depth20.
- [x] Runtime ambientes por escopo e entrada copiada;2000passos/64loopiter;constnãoatribuir/variávelausente/duplicada/aritméticainválida/nãofinito/pushlimites produzem CodeError com linha. Shortcircuitpreservavalor JS. Compile devolve Rule; não inserir código do usuário em eval/Function/DOM.
- [x] Print AST seguro comoJS: stringifyliteral/escape<emstrings, nomes jávalidados;for comguardainterna2000passos e64iter; evitar interpolação de fonteoriginal. Testes de semântica usam somente referências confiáveis NodeVM com timeout100ms e comparam todososcasoseditoriais comRule.
- [x] Verificar imutabilidade/scopes/operadores/condições/for0/arrays/return/const/limites/sintaxe/linhas/constructor/fetch/infinito. `npm test -- tests/unit/code.test.ts` devepassar; commitcore quandointegrável.

### 2. P02/D01/D04 - conteúdo e motor (INT02/04/06)

Files: src/core/arcade-engine.ts; src/content/missions.json/schema.json/validate.ts; tests/unit/arcade.test.ts; tests/integration/content.test.ts; scripts/check-content.ts.

- [x] Escrever casos das cinco funções, referências e starterserrados comaprendizagem/títulos/goals/help/IDsworkshop/reward100/200. APIdeconteúdo:Mission{id,title,concept,goal,help,functionName,starter,reference,cases[{label,input,expected}],reward}; finalusa todas, semfunctionNameprópria. Ordemnomes controlar/mover/colidir/pontuar/criarOnda/final.

```js
function controlar(entrada) { let direcao=0; if(entrada.esquerda) { direcao=-1; } if(entrada.direita) { direcao=1; } return direcao; }
function mover(entrada) { return entrada.posicao + entrada.direcao * entrada.velocidade; }
function colidir(entrada) { return entrada.distancia <= entrada.raio; }
function pontuar(entrada) { let pontos=entrada.pontos; if(entrada.tipo === 'cristal') { pontos += 10; } if(entrada.tipo === 'estrela') { pontos += 25; } return pontos; }
function criarOnda(entrada) { let posicoes=[]; for(let i=0;i<entrada.quantidade;i++) { posicoes.push(40+i*80); } return posicoes; }
```

- [x] Ajvstrict/adicionaisproibidos/missõessix/source6000/caseslimitados; semântica assegura IDs/reward/ordem e metas por contratos acima; referênciaspassam e startersfalham. Conteúdoextra/metaalterada/casoausente/soluçãoincoerente quebra build.
- [x] Motor API:createGame(Rules),stepGame(GameState,{left,right},Rules). State={status,tick,x,lives,score,wave,items,nextId,error}; itemid/x/y/type. Clonarestado; jogador y270 e x20..460. Aplicarcontrolesdir-1..1/moverfinito, colisãobooleana, scoreint0..9999, posiçõesarray0..5/x20..460. Ondasdeterminísticas a cada150ticks; trajetosverticais2,6px/tick, spawnquantidade3..5; cristal/estrela/pedra porpadrãodeonda.>=100won/vidas0lost;estadofinal idempotente. Falharregelainválida limita/reporta, nãotrava.
- [x] Testarboundary/colisão truefalse/score/vital/perda/vitória/imutabilidade/ondas/caps/runtimeerror; `npm run test:ci` e`content:check`;retirarcorecircuit e testes somenteapósnovoscontratospassarem.

### 3. P03/P04/D03 - missão completa e campanha (INT02/04)

Files: src/scenes/arcade-player.ts/views.ts/app.ts/export.ts/export-player.ts; src/core/workshop-save.ts/progress.ts; tests/unit/save.test.ts; src/style.css/index.html; scripts/build.mjs.

- [x] Player recebeRules e callback, montaSVG480×320/HUD/controlestouch/teclado. Interval20msnãoexecutaquando pausado; inputclearemblur/pagevisibility. SVGoriginalnave/cristais/estrelas/asteroides, valoresescapados;regiãoaria sóeventosrelevantes. Noappeditorkeeptextarea aoatualizarframe. Dispose limpaevents/timers ao mudarview.
- [x] Home/campanha/editor/resultados/opções: umafrasegoal,textareaJScomlinhas, Testar regras/Jogar/Pausa, ajuda/testes sobdemanda. Testar compile+comparacasos e exibesaídareal/esperada;syntaxerrorline. Vitória de testesliberamissões1..5; finaltestatodas e sóconclui comvitória no gameplayatual. Nenhuma preenchesoluçãoautomática.
- [x] Sources/draftsaceitespersistemnaversão nova workshop:v4; dados antigos preservados; reset sóchavesnova. Fonteeditadafica nãoatestada; recompilar aoTestar/Jogar. Final usa fontes anteriores e abas; upload/IA/runtime nãoexistem. XPprimeiravitória/replayidempotente/preferências/fallbackreal.
- [x] Exportcanonical5funções+playerIIFEHTML/estilosinline/semrede/licença eversão. Buildgeraexportplayerwrite:false injeta__PLAYER_BUNDLE__ noapp; playerexportadochama Rulesnativeemmesmomotor. RegraJSserializada viaASTseguro; testeexportnãoaceitafonteinválida. BotãoBaixar apósfinaltestes+vitória. Criarscreenshotrealprimeiramissão antes deexpandire final/mobiledepois.
- [x] Atualizarpackage/lock0.5.0/index/LEIA-ME,manter7arquivosZIP. `npm run lint/build`; verificarprimeiramissãoPlaywright seminjeção. Expandirmesmoeditor/playeràsdemais;não criarsegundoaplicativo.

### 4. D05local/D06 - testes e inspeção (INT04/06)

Files: tests/e2e/workshop.spec.mjs/helpers.mjs/smoke.spec.mjs.

- [x] TestesviaUI: starterfalha→textarea.fill→testespassam→próxima;sourcealteradanãoatestada;gameplaybefore/after;teclado/touch/pausa/reiniciar;help/testes/menus/preferências;reload/XP/reset próprios/storageindisponível/antigopreservado;finaleditar/validar/pilotar por controlesreais;downloadHTMLfile:// offline semrequests;mobile390×844 semoverflow. Não escreverprogressoinventado.

```js
await page.locator('#code-editor').fill(source);
await page.locator('#test-rules').click();
await expect(page.locator('#test-summary')).toContainText('Tudo certo');
```

- [x] `npm run lint/test:ci/build/test:e2e`; inspecionar capturasdesktop/mobile/errocódigo/final. Regressão foco#1adaptadaaoeditor: reset/regra/aba deve preservar foco commodalfechado.>=15unidades/3integrações/2E2E ecorecoverage>=70 são gates, não metaaumentarcontagensartificialmente.

### 5. R02/R03/S01/S02 - documentação e CI (INT02/03/04/05/06)

Files: docs/gdd/design/backlog/evidencias/matriz/images,README/AI-USAGE, scripts/docs-assets.mjs.

- [x] GDDtodas12seções/Esteira/identificação/versão/data/referências, mapasimagensdas5funções+final/wireframes/capturasreais. Registrar0.4histórico/0.5candidata/semprodução; PDFskillmarkeredit uma vez antes deautoria, gdd:pdf/pdfinfo/renderALL/inspeção. Não confundir13pGDDcomrelatório<=12p.
- [ ] `npm run reproducibility/package`; auditprodução crítico/SBOM/hookGitleaks. ZIP<25MB/hash/versionverificados. Commit/pushmesmafeature/PRdraft; reescrevertítulo/body aoescopofinal, CIúltimocommitverde e artifactsbaixados/conferidos. Nãomergerevisão própria/publicarprodução/tagsemaceites.
- [ ] RegistroACOMPANHAMENTO_LOCAL porcodes/INT/paths/commands/tests/evidence/pending/proximo. G0pessoas/horário continua; G3–G8/HML/PRD/rollback/sondas/DORA/vídeo/finalpackagetriagem pendentes. Nãotratarnovo redesign como10PRs humanos.


Execução local verificada na fonte76b7797; documentação/PDF inspecionados em09/10. Comparação nativa implementada em code-native.test.mjs (sem nova dependência de tipos Node). Guardas exportadas contam iterações de laço; interpretador conta passos. Últimos dois itens aguardam conferência da CI/artefatos e registro administrativo, não nova aprovação de conceito.

