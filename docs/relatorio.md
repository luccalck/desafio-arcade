# Relatório Técnico — Desafio Arcade

**Rota do Código · Squad Aura 67 · Candidata {{VERSION}} · 16/10/2026**

## 1. Síntese, identificação e alcance

Construímos uma oficina educativa WEB em que o jogador corrige cinco funções Python, testa diferentes entradas e usa suas regras num minijogo de nave. O produto é estático, responsivo, exportável e jogável offline pelo método documentado. A avaliação de DevOps exige que esse produto atravesse Git, testes, segurança, homologação, aprovação, produção e acompanhamento com rastreabilidade.

**Repositório:** [luccalck/desafio-arcade](https://github.com/luccalck/desafio-arcade). **Estado desta revisão:** PR34 aprovado por Lucas no HEAD e9dd28c e integrado como acb03d8. CI com 311 testes e 36 E2E; HML da main em 182,361 s. Executamos recuperação manual em 80,66 s e automática em 17,166 s, incluindo Pages e verificações públicas. A tag técnica v0.7.0 foi publicada; a primeira tentativa de Release ficou bloqueada pela sonda que ainda recebeu o ponteiro anterior. A repetição passou CI/HML/PRD/sondas, mas bloqueou no publicador do rascunho. A correção reproduzida por teste está candidata a revisão. Pitch, playtest humano, pacote acadêmico, TXT e banca permanecem pendentes.

| Integrante | RA | Coordenação | GitHub |
|---|---|---|---|
| Lucca Castilho Costa | 26179873 | Produto e Game Design | luccalck |
| Davi Marcondes Paes de Souza | 26180842 | Desenvolvimento e Qualidade | DaviSouza78 |
| Miguel Oliveira de Almeida | 26179933 | Plataforma e Release | miguelsenai2024 |
| Lucas Souza da Silva | 26179875 | SRE e Segurança | 6lucassilvaaa |

Os papéis coordenam o trabalho, sem exclusividade de área. Preservamos a autoria dos commits; os quatro precisam defender suas contribuições na banca. O nome completo e RA de Lucca foram fornecidos pelo próprio integrante em 14/10. Não incluímos CPF, assinaturas ou credenciais.

### Marcos e fontes de referência

|Marco|Fonte verificável|Resultado e alcance|
|---|---|---|
|Auditoria 0.6.0|[CI 38649548723](https://github.com/luccalck/desafio-arcade/actions/runs/38649548723), e71de72|260 testes/36 E2E; histórico anterior aos deploys|
|Primeira HML 0.7.0|[Run 38674290799](https://github.com/luccalck/desafio-arcade/actions/runs/38674290799),773af17|HML 4/4; falha real do coletor; 191 s reconstruídos depois|
|Correções revisadas|[PR35](https://github.com/luccalck/desafio-arcade/pull/35), [PR33](https://github.com/luccalck/desafio-arcade/pull/33)|Dois commits de Miguel preservados; revisão de Lucca; Lucas aprovou a consolidação|
|Entrega técnica formal|[Run 38829484114](https://github.com/luccalck/desafio-arcade/actions/runs/38829484114),88d533e|299 testes/36 E2E; HML 4/4; 216,414 s; PRD aprovada e smoke verde|
|Sondas pós-produção|[Run 38830013027](https://github.com/luccalck/desafio-arcade/actions/runs/38830013027)|HML/PRD 200, ambas 0.7.0/SHA 88; DORA com uma amostra|

Datas deste relatório seguem America/Sao_Paulo: a produção foi observada em 15/10, 21:31:47 (16/10, 00:31:47 UTC). O pitch permanece pendente por orientação de Lucca. Não há declaração de nota, F, playtest humano, AVA ou banca realizados. A entrega técnica atual não equivale ao pacote acadêmico completo.

<div style="break-before: page;"></div>

## 2. Produto educativo e experiência do jogador

O problema é memorizar comandos sem compreender como uma regra altera um programa. O público é iniciante em programação, com leitura básica em português e familiaridade com teclado ou toque. O objetivo é construir, testar e depurar funções que resolvem um comportamento observável, em vez de apenas seguir uma sequência de cliques.

| Missão | Conceito | Ação e condição de conclusão |
|---|---|---|
|1 — Controlar|Eventos e decisões|Corrigir direção conforme teclas; quatro casos públicos|
|2 — Mover|Operações e parâmetros|Posição + direção × velocidade; cinco casos|
|3 — Colidir|Comparação e fronteira|Distância ≤ raio, incluindo igualdade; cinco casos|
|4 — Pontuar|Estado e condições|Conservar acumulado e somar valor do item; cinco casos|
|5 — Criar onda|Lista e repetição|Quantidade exata, início 40 e intervalo 80; quatro casos|
|Final — Órbita|Integração e depuração|Aplicar cinco funções, passar 23 casos e atingir 100 pontos com três vidas|

O ciclo é editar, testar entradas, observar a partida e corrigir. Nas primeiras missões, funções auxiliares corretas isolam o conceito. O final combina as cinco fontes do jogador. Ajuda e detalhes dos testes ficam sob demanda; menus, progresso e XP organizam a campanha. Repetir missão não duplica recompensa.

![Menu real da HML](evidencias/operacao-2026-10-15/hml-88-menu.png)

**Figura 1.** HML pública capturada em 15/10/2026, 21:29:25, America/Sao_Paulo; versão 0.7.0, SHA 88d533e, viewport 1280×900. Origem/tempo/versão em hml-88-menu.json, produzidos pelo navegador durante a regressão real.

A mesma experiência WEB atende computador e celular. Teclado/toque e foco visível ajudam a navegação; o código é editável e os testes indicam a situação que falhou. A validação pública completou campanhas desktop e toque, com vitória e 700 XP, mas isso não mede aprendizagem. O playtest humano de três minutos com colega de outra turma ainda precisa observar clareza, dificuldades e transferência do conceito. Não atribuímos resultados a pessoas inexistentes.

<div style="break-before: page;"></div>

## 3. Arquitetura do jogo e funcionamento offline

A aplicação usa TypeScript, HTML/CSS/SVG e esbuild. A camada visual não decide as regras pedagógicas: o núcleo recebe entradas e devolve resultados, permitindo testar lógica e contratos sem depender da tela. O conteúdo JSON é validado antes de compilar; conteúdo inválido precisa interromper a build.

| Componente | Responsabilidade | Fronteira verificável |
|---|---|---|
|src/core|Estado, regras, compilação/interpretação e contratos|Entradas, saídas, fronteiras e limites testáveis|
|src/scenes|Menu, editor, arena, feedback e navegação|E2E por teclado/toque; regras fora da apresentação|
|src/content|Conteúdo educativo e missões|JSON validado e contratos de aprendizagem|
|pages|Carregador e contrato de rollout|Seleção de release e versão preservada na sessão|
|scripts|Build, empacotamento, publicação e observação|Contratos e falhas separados do produto|
|tests|Unidade, integração e E2E|JUnit/cobertura e artefatos por execução|

### Python pedagógico e limites

O jogador escreve funções Python dentro de um subconjunto delimitado. O analisador produz AST; o interpretador executa condições, operações, listas, atribuições e repetição limitada. Não é CPython completo: imports, classes, bibliotecas arbitrárias e acesso ao DOM/rede não fazem parte do contrato. Não usamos eval/Function para executar a fonte do jogador.

Há limites de fonte, nós, profundidade, passos e iterações. Saídas inválidas interrompem a partida com diagnóstico. Editar pausa e invalida o aceite da regra anterior; retomar exige aplicar a fonte nova. Vitória/derrota são estados finais tratados pelo motor. Esses controles reduzem falhas previsíveis sem prometer segurança absoluta de qualquer entrada.

### Exportação e alternativas técnicas

Concluir o projeto permite baixar HTML independente e funções .py. O HTML inclui motor/AST e compartilha semântica com a oficina. O arquivo .py é estudável num Python convencional; alterá-lo não recompila automaticamente o HTML exportado. Preferências/progresso ficam no navegador, sem conta ou backend. O jogador não precisa instalar Python ou engine.

| Escolha | Justificativa | Alternativa considerada e limite |
|---|---|---|
|DOM/SVG e TypeScript|Escopo pequeno, UI navegável e regras testáveis|Engine web seria válida, mas acrescentaria integração sem necessidade demonstrada|
|Subconjunto Python local|Cinco funções curtas, operação offline e sem execução remota|CPython/WASM ampliaria compatibilidade; não houve benchmark comparativo|
|Site estático Pages|Sem backend, VM ou nuvem paga; ZIP distribuível|Execução remota exigiria infraestrutura e impediria o método offline|
|Vitest/Playwright|Regras, contratos, navegador e exportação|Cobertura/contagens não substituem revisão e playtest|

O método offline é descompactar o ZIP original e abrir index.html, conforme LEIA-ME.txt. Não há API de IA em runtime, cadastro ou telemetria. Os testes offline atuais são apresentados com origem e hash na página seguinte.

<div style="break-before: page;"></div>

## 4. Proveniência, ZIP promovido e teste offline

A [run 38829484114](https://github.com/luccalck/desafio-arcade/actions/runs/38829484114), tentativa 1, produziu o bundle do SHA 88d533e31452036092cd8edef3efa3c0775241dc. Conferimos 172 arquivos pelo manifesto. O mesmo ZIP foi aceito em HML e consumido na promoção PRD; os recibos preservam SHA/run/tentativa e checksum. Não recompilamos o jogo entre ambientes.

**Pacote promovido:** 29.000 bytes, SHA-256 `84105e76a4bd55b5064d466340cb377ea27d49092bae984f65ebdeb7d0d0f937`, abaixo de 25 MB. hml-88-aceite.json registra os hashes dos sete arquivos do jogo; prd-88-recibo.json repete o checksum do ZIP e registra state=publicada, aprovação e observação pública. A conferência final de 14/14 arquivos HTTP, nos dois ambientes, retornou HTTP 200 e hashes iguais ao ZIP original: hashes-88-publicos.json.

O teste offline usa o ZIP original do SHA 88, já desconectado antes de abrir index.html. Passou 1/1 em 14,5 s: cinco missões, 23 casos finais, vitória 700 XP, downloads HTML/Python e HTML exportado jogável. remoteRequests=[] e pageErrors=[]. Fonte: zip-88-offline.json/zip-88-junit.xml,16/10 às 00:31:52,989 UTC, equivalente a 15/10 às 21:31:52 local.

![Vitória offline do ZIP promovido](evidencias/operacao-2026-10-15/zip-88-offline-vitoria.png)

**Figura 2.** Vitória capturada durante execução file:// do ZIP original do SHA 88, versão 0.7.0, em 15/10/2026, 21:31:52, America/Sao_Paulo. A prova pertence ao mesmo pacote entregue; não é uma build refeita para apresentar resultado.

O bundle associa SHA/run/tentativa ao inventário e verifica nomes, tamanhos, SHA-256 e version.json externo contra o empacotado. Reexecuções não podem misturar tentativas. A data de origem é estável para o mesmo SHA; horários reais ficam no Actions/recibos. Na referência anterior 773af17, o ZIP original e os sete arquivos HTTP também foram conferidos; esse histórico é preservado, mas os hashes antigos não são atribuídos à produção do SHA 88.

<div style="break-before: page;"></div>

## 5. Esteira CI/CD e governança dos estágios

O fluxo mantém uma cadeia entre mudança, aprovação, artefato e versão observada. A fronteira operacional avançou para produção aprovada, ensaios reais de alertas e recuperação; falta a submissão acadêmica e os aceites específicos restantes. A falha temporal anterior foi corrigida por PR revisado, sem ignorar o gate.

```text
branch → PR/revisão/CI → main protegida
  → build/ZIP + PDFs + SBOM/relatórios + manifesto
  → /hml/ + E2E + medição temporal
  → aprovação environment producao → release imutável
  → smoke → promoção azul-verde ou recuperação
  → sondas/Issues/status/DORA → vídeo validado → submissão/triagem
```

| Etapa | Contrato implementado | Prova exigida |
|---|---|---|
|Qualidade|npm ci, lint/tipagem, conteúdo, Vitest/cobertura|Logs, JUnit, cobertura e falha bloqueante|
|Segurança|Gitleaks, audit de produção, SBOM|Relatórios do mesmo SHA/run/tentativa|
|Build|Estático, reprodutibilidade, GDD/relatório PDF, ZIP|Version.json, checksum, pdfinfo/texto|
|E2E|Campanha, teclado/toque, exportação/offline|JUnit, capturas e arquivos reais|
|Pacote CI|Consolidar identidade e inventário|ci-manifest.json com tamanhos/hashes|
|HML/PRD|Consumir bundle sem recompilar|Recibos, aprovação, E2E/smoke e hashes HTTP|
|Submissão|Aguardar produção/release e vídeo fixado|Pacote completo e triagem real na tag correta|

Qualidade, segurança, build e E2E executam em jobs independentes de ubuntu-latest; o gate CI depende de seus resultados. Há lockfile e cache npm. GDD.pdf e RelatorioTecnico.pdf entram no bundle; pdfinfo/pdftotext verificam abertura/texto e o relatório deve ter de 1 a 12 páginas. A fonte continua versionada para revisão, sem substituir o GDD completo pelo relatório.

A consolidação corrigiu lacunas reais: relatório antes fora da CI, submissão concorrente com produção, proveniência insuficiente, seleção de vídeo pela última execução e triagem agendada sem recuperar pacote. Agora o vídeo é fixado por SHA/run/tentativa/digest, e o pacote depende de produção/release. Um HTTP 200 isolado não pode substituir a validação de ZIP, PDF, vídeo e manifesto.

Azul-verde separa candidata e estável; o carregador preserva uma versão válida por sessão. Gh-pages é escrita pela pipeline, sem edição manual para contornar a falha. Environments mantêm aprovação/políticas de refs/tags. PagesActions publica a árvore gh-pages preservada, sem recompilar: equivalência técnica justificada e validada por hashes/smoke, declarada frente à origem literal do exemplo. Uma aprovação de PR não substitui a de produção nem se transfere para HEAD alterado.

O PR32 recebeu revisão externa de Lucas no HEAD 59dc830 e foi integrado. O PR35 incorporou dois commits autorais de Miguel, revisados por Lucca; Lucas aprovou a consolidação f38 no PR33 antes do merge 88. A aprovação do environment producao por Lucca foi registrada conforme a política existente. Não simulamos outro revisor, não autoaprovamos PRs de Lucca e não removemos as proteções.

<div style="break-before: page;"></div>

## 6. Qualidade, testes e correção de defeitos

Os resultados pertencem ao SHA e à execução indicada. Uma suíte local/CI não comprova implantação. Mantemos regras separadas da renderização, testes de fronteira/contratos inválidos e integridade do pacote.

| Fonte | Unidade/integração | E2E | Alcance |
|---|---:|---:|---|
|[CI 38649548723](https://github.com/luccalck/desafio-arcade/actions/runs/38649548723), e71de72|260=152+108|36|Referência 0.6.0; bundle auditado|
|[Run 38674290799](https://github.com/luccalck/desafio-arcade/actions/runs/38674290799),773af17|270|36|CI 0.7.0 verde; HML depois falhou na medição|
|[CI 38674970174](https://github.com/luccalck/desafio-arcade/actions/runs/38674970174),78c367d|273|36|Push da correção PR33; sucesso|
|[CI 38674975441](https://github.com/luccalck/desafio-arcade/actions/runs/38674975441), PR33|273|36|Validação de PR, sem deploy formal|
|[CI 38829484114](https://github.com/luccalck/desafio-arcade/actions/runs/38829484114),88d533e|299|36|HML 4/4, PRD formal e smokes aprovados|
|Histórico773: HML pública em 15/10|—|4|Desktop/toque, campanha e reinício; 62,009 s|

No bundle do SHA 88, ci-88-coverage.json mede src/core: 468/478 instruções (**97,90%**), 128/128 linhas (**100%**), 54/54 funções (**100%**) e 320/336 ramificações (**95,23%**). Os JUnit confirmam 299 testes sem falhas em 2,580 s e 36 E2E sem falhas em 67,838 s. A regressão HML 4/4 levou 67,882 s; o smoke PRD 1/1 também passou. Supera os mínimos 15/3/2 e 70% do core com origem remota identificada. Os 53testes locais de recuperação/alertas continuam provas de contratos, não ensaio real.

![Smoke real de produção](evidencias/operacao-2026-10-15/prd-88-tela.png)

**Figura 3.** Smoke real da produção em 15/10/2026, 21:31:47, America/Sao_Paulo; 0.7.0, SHA 88d533e. O navegador abriu a release do SHA correto e verificou editor, movimento e pausa; prd-88-tela.json preserva origem, horário e viewport. É teste automatizado, não playtest humano.

O bug histórico de regra antiga permitia retomar usando compilação anterior após editar. A correção invalida aceite/fingerprint e exige aplicar fonte nova; existem captura, JUnit da falha e regressão em docs/evidencias/bug-regra-antiga.md e tests/e2e/workshop.spec.mjs. [PR de contexto](https://github.com/luccalck/desafio-arcade/pull/8). O defeito temporal HML também gerou três regressões: antes 3 falhas/8 passes; depois 11 passes. Não criamos bug ou incidente fictício para atender rubrica.

<div style="break-before: page;"></div>

## 7. Homologação medida e produção formal aprovada

A correção percorreu revisão real: o PR35 preservou dois commits de Miguel e recebeu aprovação de Lucca. Lucas aprovou o HEAD f38f6d9 da consolidação no [PR33](https://github.com/luccalck/desafio-arcade/pull/33), integrado na main como 88d533e31452036092cd8edef3efa3c0775241dc. A [run 38829484114](https://github.com/luccalck/desafio-arcade/actions/runs/38829484114) concluiu com sucesso, incluindo CI, HML e produção. A política de aprovação e as proteções foram preservadas.

|Marco / fonte|Registro verificável|Resultado|
|---|---|---|
|Merge PR33 / API|16/10, 00:26:22 UTC = 15/10, 21:26:22 local|SHA 88 e base main conferidos|
|E2E HML / hml-88-tempo.json|00:29:58,414 UTC|4/4 cenários; 216,414 s após publicação do merge|
|Aceite HML / hml-88-aceite.json|00:29:59,167 UTC|Sete hashes e ZIP vinculado a SHA/run/tentativa|
|Aprovação / prd-88-recibo.json|Environment producao; revisor luccalck; approved|Aprovação real conforme política existente|
|Smoke candidata|00:31:28,612 UTC; passed=true; errors=[]|Release88 testada antes da promoção|
|Smoke raiz e recibo|00:31:47,097/460 UTC; state=publicada|Raiz redireciona à release88 e passa smoke|

### Origem temporal e limite de quinze minutos

O coletor agora usa o merged_at do PR integrado, exigindo merged=true, base main e merge_commit_sha exato. Confere payload de push e objeto remoto de tags quando aplicável; Events é complementar. Data do commit do desenvolvedor e criação do run não substituem publicação. O recibo atual registra **216,414 segundos — 3 min 36,414 s**, abaixo de 900 s, com fonte GitHub, SHA e run/tentativa identificados.

A primeira execução 773af17 continua registrada como falha do coletor: a regressão passou, mas o feed Events atrasado não trouxe o PushEvent na janela. A reconstrução histórica de 191 s não alterou aquela conclusão. O GitHub documenta latência de 30 segundos a 6 horas nesse feed. [Fonte oficial](https://docs.github.com/en/rest/activity/events#list-repository-events). O novo sucesso decorre de correção revisada e execução posterior, sem ignorar o gate.

### Promoção e fronteira do aceite

O deploy-prd usou o mesmo ZIP aceito em HML, SHA-256 84105e76…d0d0f937. O recibo identifica ator luccalck, run 38829484114/1 e estado publicada às 21:31:47 de 15/10, horário de São Paulo. A URL imutável `/releases/ 88d533e31452036092cd8edef3efa3c0775241dc/` e a raiz foram testadas; `/status/` responde HTTP 200. Isso comprova produção técnica, não rollback, GitHub Release acadêmica, pitch ou triagem final.

Lucas aprovou o PR34 no HEAD e9dd28c, revisão 5543092743. O merge acb03d8 e o HEAD aprovado têm árvore Git idêntica. A atualização posterior aos ensaios precisa de nova revisão/CI. Na tag38852413982/2, CI/HML/PRD/sondas passaram; HML745,303 s desde o push original. O publicador falhou ao buscar draft pelo endpoint de tags publicadas; seis anexos existem no draft, sem publicação. Regressão reproduziu o erro; correção e retomada protegida passaram318testes e12focais. O ZIP do draft passou offline1/1;14hashes públicos coincidem. A retomada exige revisão externa/merge, confere os gates da origem e publica seus bytes sem build/deploy. Não publicamos manualmente ou substituímos bytes da candidata.

<div style="break-before: page;"></div>

## 8. Sondas, alertas, recuperação e DORA

A primeira coleta formal [38830013027](https://github.com/luccalck/desafio-arcade/actions/runs/38830013027) confirmou HML/PRD 0.7.0/SHA88, HTTP200 e latências0,0918/0,0336 s. O painel foi aberto em15/10,21:36:59 local: HTTP200, quatro cartões, sem erro ou overflow em390px. A latência mede o documento HTTP, incluindo corpo; não representa jornada ou percentis/SLA. O cron*/15 não garante pontualidade observada.

|DORA inicial / janela14dias|Valor e denominador|Limite de interpretação|
|---|---|---|
|Frequência|1/14 =0,0714286 deploy/dia|Somente deploy formal confirmado|
|Lead time|5min27s, uma amostra|Commit até deploy-prd concluído|
|Taxa de falha|Inicial0%; após ensaio manual100%|Rollback planejado correlacionado a88|
|MTTR operacional|N/D; nenhuma Issue de incidente|Tempos do ensaio não são incidentes espontâneos|

A fonte inicial está em dora-38830013027.json; a coleta38853203550 registra a mudança bruta da taxa de falha após o rollback planejado. Não removemos eventos para melhorar números. O lead time equivale a0,00378472dias diante da referência11dias do enunciado. Uma amostra não comprova causalidade, maturidade ou melhoria sustentada; comparação é descritiva.

### Dois alertas reais em ensaio isolado

[Run38847296363](https://github.com/luccalck/desafio-arcade/actions/runs/38847296363): servidor temporário no runner respondeu404 e atrasou2,2s por HTTP. Issues38/39 abriram e fecharam automaticamente em1s/3s, média2s do ensaio. Duas sondas por falha não duplicaram Issues. Labels/marcadores próprios separam esses ciclos do MTTR de produção.

Na primeira tentativa38846941358, a listagem GitHub atrasada duplicou Issues. Regressão reproduziu o bug; preservar escritas confirmadas no adaptador reduziu2→1 Issue por duas sondas na repetição real. Melhoria medida no ensaio, sem alegar ganho sustentado de DORA ou esconder a tentativa falha.

### Recuperação real e continuidade observada

[Manual38851754358](https://github.com/luccalck/desafio-arcade/actions/runs/38851754358): aprovação, Pages, sete hashes e smoke; **80,66s** do dispatch ao smoke, incluindo fila/aprovação. Foram171HTTP200. [Automática38851915984](https://github.com/luccalck/desafio-arcade/actions/runs/38851915984): candidataacb aprovada, falha apenas no observador do ensaio, rollback real/Pages/sete hashes/smoke em **17,166s**;65HTTP200. A run ficou vermelha pela injeção; os steps de recuperação passaram. Amostras discretas não garantem disponibilidade entre consultas.

Sessão existente permaneceu na baseline nas promoções; sessão nova e storage indisponível abrirame9. A sonda pós-tag leu o ponteiro anterior e bloqueou a primeira Release; a reconferência38853203550 confirmoue9 em ambos os ambientes. Relatórios brutos e limites: docs/evidencias/operacao-release-2026-10-16/. Não é defeito espontâneo do jogo nem substitui playtest humano/banca.

<div style="break-before: page;"></div>

## 9. Rastreabilidade dos dez integráveis

Cada fonte identifica execução ou PR real. A matriz separa aceite técnico comprovado de atividades finais: produção verde não significa aprovação de todos os integráveis ou entrega acadêmica completa.

|INT / peso A|Fonte verificável|Implementado ou executado|Aceite ainda necessário|
|---|---|---|---|
|INT-01 /10%|[PR33](https://github.com/luccalck/desafio-arcade/pull/33), [PR35](https://github.com/luccalck/desafio-arcade/pull/35)|Quatro autores/RAs; 15 reviews históricos; revisão e merges preservados|Tags finais, conferência individual e banca/F|
|INT-02 /8%|[CI main](https://github.com/luccalck/desafio-arcade/actions/runs/38829484114), [PR22](https://github.com/luccalck/desafio-arcade/pull/22)|GDD completo com 12 seções/Esteira; PDF automático; dados reais|Versão/data/links/direitos da release acadêmica final|
|INT-03 /15%|[Esteira verde](https://github.com/luccalck/desafio-arcade/actions/runs/38829484114)|CI/HML/PRD aprovados; 216,414 s push→HML; aprovação registrada|Revalidar futuras alterações; pacote/triagem finais|
|INT-04 /12%|[CI 299/36](https://github.com/luccalck/desafio-arcade/actions/runs/38829484114), [PR8](https://github.com/luccalck/desafio-arcade/pull/8)|311 testes + 36 E2E na revisão atual; HML 4/4; smokes; offline histórico 1/1|Playtest humano e regressão de futuros HEADs|
|INT-05 /10%|[PR10](https://github.com/luccalck/desafio-arcade/pull/10), [CI](https://github.com/luccalck/desafio-arcade/actions/runs/38829484114)|Scanners, SBOM, inventários, hook e revisão|Direitos/licenças finais e vídeo/tag/artefatos|
|INT-06 /10%|[CI/bundle](https://github.com/luccalck/desafio-arcade/actions/runs/38829484114)|Tag técnica:ZIP29.265B,172arquivos no bundle; cinco anexos+manifesto do draft iguais à CI; offline1/1|Draft técnico conferido; publicar pela pipeline após correção revisada e depois release acadêmica final|
|INT-07 /12%|[Produção](https://github.com/luccalck/desafio-arcade/actions/runs/38829484114/job/116745759301)|Azul-verde, smoke, manual 80,66 s e automático 17,166 s; HTTP observado sem falhas|Demonstração literal na banca; ensaios manual/automático já executados|
|INT-08 /10%|[Sondas/DORA](https://github.com/luccalck/desafio-arcade/actions/runs/38830013027)|HML/PRD 200, mesmo SHA; status 200; três DORA com 1 amostra|Incidentes/MTTR operacionais; ensaio e melhoria observados à parte|
|INT-09 /8%|[PR25](https://github.com/luccalck/desafio-arcade/pull/25), [Esteira](https://github.com/luccalck/desafio-arcade/actions/runs/38829484114)|Empacotador/triagem e origem imutável implementados|Pitch, pacote completo e TRIAGEM APROVADA na tag final|
|INT-10 /5%|[PR34](https://github.com/luccalck/desafio-arcade/pull/34), [PR28](https://github.com/luccalck/desafio-arcade/pull/28)|Relatório atualizado com ensaios, prints reais e roteiro/legendas|Revisão/publicação deste PDF, pitch, ensaio e banca|

### Segurança, direitos e origens

Gitleaks bloqueante no histórico, audit de produção, Dependabot e SBOM acompanham a CI. No bundle do SHA 88, ci-88-gitleaks.json registra zero achados, e ci-88-npm-audit.json registra zero vulnerabilidades, inclusive críticas. Scanner sem achados não garante direitos ou ausência absoluta de qualquer segredo. Reconferir tag, vídeo/logs e ativos finais, sem introduzir segredo real para testar detecção. LICENSE, THIRD_PARTY e AI-USAGE registram origens/usos; bibliotecas conservam suas licenças.

Os três prints atuais vieram do navegador HML/PRD/file:// do SHA 88, com metadados; não são mockups Stitch. O conjunto operacional tem manifesto próprio, separado do pacote acadêmico. O checklist integral e as pendências por passo continuam nos respectivos MDs. A aprovação do PR34 está registrada. Este texto posterior aos ensaios ainda requer revisão e publicação documental próprias; o PDF anterior não foi alterado retroativamente.

<div style="break-before: page;"></div>

## 10. Colaboração, retrospectiva e fechamento

|Integrante|PRs autorais de referência|Escopo documentado|
|---|---|---|
|Lucca|[#2](https://github.com/luccalck/desafio-arcade/pull/2) a [#14](https://github.com/luccalck/desafio-arcade/pull/14), [#32](https://github.com/luccalck/desafio-arcade/pull/32), [#33](https://github.com/luccalck/desafio-arcade/pull/33)|Produto, GDD, jogo Python, CI, segurança, offline, consolidação|
|Davi|[#15](https://github.com/luccalck/desafio-arcade/pull/15) a [#19](https://github.com/luccalck/desafio-arcade/pull/19)|HML, conteúdo/testes, release, alertas, produção/painel|
|Miguel|[#20](https://github.com/luccalck/desafio-arcade/pull/20) a [#24](https://github.com/luccalck/desafio-arcade/pull/24), [#35](https://github.com/luccalck/desafio-arcade/pull/35)|Recuperação, DORA, GDD, integridade/triagem e fallback HML|
|Lucas|[#25](https://github.com/luccalck/desafio-arcade/pull/25) a [#29](https://github.com/luccalck/desafio-arcade/pull/29)|Submissão, relatório, candidata, release/ficha/banca, revisões de consolidação|

Os dois commits novos de Miguel e sua autoria foram preservados; Lucca revisou seu PR35 e Lucas aprovou a consolidação PR33 antes do merge 88. Não simulamos identidades nem autoaprovamos PRs de Lucca. A aprovação do environment por Lucca seguiu a política existente, mantendo visíveis ator/ambiente/recibo. Contribuições aprovadas em integráveis e domínio na banca são condições individuais; nota/F são atribuições do professor.

### Retrospectiva baseada em resultados

**Funcionou:** separar regras da UI, testar campanha pública/offline e promover os mesmos bytes. A execução do SHA 88 comprovou HML ≤ 15 min, smoke da candidata, promoção e smoke da raiz, com aprovação real. A primeira amostra pós-produção habilitou frequência, lead time e taxa de falha calculados de eventos verificáveis.

**Falhou e foi corrigido:** registros anteciparam aceites; reabrimos 27 checks contestados. A dependência exclusiva de Events causou falha real HML. Correções revisadas, incluindo fallback de Miguel, permitiram 216,414 s medidos em nova execução. Preservamos a falha anterior, sem transformá-la em sucesso retroativo. **Limites atuais:** alertas/tempos demonstrados pertencem ao ensaio, sem incidente espontâneo/MTTR operacional. Recuperação real passou nos dois modos; cron não oferece cadência pontual demonstrada. A sonda pós-tag bloqueou a primeira tentativa; na repetição, sondas passaram e surgiu falha no publicador de draft. Correção testada permanece sujeita a revisão; nenhuma falha foi apagada.

**O que medir adiante:** propagação do ponteiro entre observadores, métricas antes/depois de melhorias e playtest humano. O lead time de 5 min 27 s é uma primeira amostra frente à referência de 11 dias, sem inferir ganho causal ou maturidade sustentada. Defeitos futuros só serão chamados reais com reprodução/evidência, não por necessidade da rubrica.

### Critérios restantes de fechamento

|Ação necessária|Evidência para concluir|
|---|---|
|Documentação posterior aos ensaios|PR34 já aprovado/integrado; revisar esta atualização e publicar PDF correspondente|
|Recuperação/alertas|Ensaios executados; demonstrar na banca e manter escopos separados de incidentes|
|Melhoria DORA|Origem/janela/denominadores e antes/depois; MTTR quando houver evento|
|Pitch e playtest|Vídeo real ≤ 90 s, legendas/direitos; registro humano de 3 min|
|Tag/release/submissão|SemVer compatível, assets/manifestos, triagem real na tag final|
|Ficha, AVA, banca|TXT verdadeiro pelo HTML, recibo, ensaio e defesa dos quatro|

O pitch segue pendente por orientação de Lucca. Davi informou consentimento dos quatro e registro privado; conferir escopo/canais com o vídeo final, sem publicar dados pessoais. A apresentação prevista é 10 min + 5 min de demonstração + 5 min de perguntas; não ocorreu nesta automação. Concurso externo é opcional e sem inscrição autorizada. Produção técnica verde é avanço comprovado; G8 e entrega acadêmica completa continuam dependentes das provas finais.
