# Etapa 022 — robustez da recuperação automática

Miguel Oliveira, 14/10/2026. Base técnica `feature/passos-019-020-producao-painel` em `8bc8905`. Esta é uma validação **local e sintética** do contrato de recuperação; não houve HML/produção formal, incidente ou medição de tempo no Pages.

## Mudança verificável

O passo 019 já ligava falha de smoke à fase `recuperar` do job `deploy-prd` e mantinha o job vermelho. Revisei o caminho `abrir → publicar candidata → testar → promover → testar raiz → recuperar`. O checkpoint agora guarda SHA-256 dos sete arquivos da release estável anterior. Antes de promover ou recuperar, a árvore `gh-pages` clonada deve corresponder a esses hashes; uma baseline modificada bloqueia a operação com diagnóstico do arquivo divergente. A recuperação continua sem recompilar e sem sobrescrever um predecessor alheio.

Após publicar a árvore recuperada, a esteira já esperava a propagação do SHA na raiz e executava o smoke do jogo. A confirmação agora também exige relatório novo da mesma execução/tentativa, SHA/URL/versão anterior e ausência de erros. Em seguida, compara por HTTP os sete arquivos da release recuperada com os hashes do checkpoint. Só grava `producao-recuperacao.json` se tudo passar; o recibo inclui SHA defeituoso e recuperado, ator, execução/tentativa, hash do ZIP de origem, hashes servidos e causa genérica vinculada aos logs. Uma falha de propagação, smoke ou bytes mantém a confirmação sem aceite; a falha original do job não é convertida em sucesso.

O contrato existente usa espera limitada de até 180 s por fase. A reexecução do planejamento de recuperação após rollback já aplicado é idempotente e conserva a versão retirada. Isso não garante recuperação após cancelamento abrupto do runner; a alternativa manual e o ensaio operacional pertencem a 023/026. Não foram ativadas flags, mudados ambientes, publicados arquivos ou enviados comandos de deploy.

## Validações em 14/10/2026

1. Antes da correção, dois testes novos falharam: a baseline alterada era aceita e a verificação HTTP não existia. Um terceiro teste de smoke de recuperação também falhou antes da implementação da guarda.
2. Depois da correção, `npm.cmd exec -- vitest run tests/integration/producao.test.mjs tests/integration/rollout.test.mjs --maxWorkers=2`: 23 testes passaram. Os cenários incluem smoke aprovado/falho, rollback após virada, candidata abortada, predecessor alheio, baseline alterada, bytes HTTP parciais, smoke de versão errada e reexecução idempotente.
3. `npm.cmd run lint`: passou. `npm.cmd run test:ci -- --maxWorkers=2`: 240 testes em 22 arquivos passaram, cobertura de instruções de `src/core` 97,90%. `git diff --check`: passou.

Fixtures e HTTP simulado não comprovam I07-16/I07-17, recuperação em menos de cinco minutos, disponibilidade da URL ou normalização de alertas. O ensaio 026 precisa usar versão defeituosa controlada, run/ator/aprovação reais, hashes HTTP, smoke da versão anterior e monitor/alertas observados, com coordenação de SRE/Plataforma. A execução formal depende antes de PRs revisados, main integrada, G0–G4, HML aceita, flags e aprovação humana em `producao`.

Publicação: commit de Miguel `6942e82` no [PR #20](https://github.com/luccalck/desafio-arcade/pull/20), base temporária do MD5. A [CI do PR 38513446231](https://github.com/luccalck/desafio-arcade/actions/runs/38513446231) terminou `success`, incluindo qualidade, segurança, build, E2E, pacote e `ci` agregado. Deploy HML/PRD, monitor e release foram ignorados por condição. Revisão de Lucas foi solicitada e permanece pendente; CI verde não substitui aprovação.
