# Rollout e sessão — preparação018

14/10/2026, DaviSouza78. Base técnica MD3/1d4f710 e smoke014; integração/revisão/gates de010/014/015 permanecem pendentes. Nenhuma mudança em produção, gh-pages remoto ou Settings. O contrato está implementado; CI e testes não representam G4 aceito.

## Escolha e estados

**Azul-verde** é a estratégia implementada proposta a Miguel (Plataforma) para revisão no PR. Usa menor ciclo completo: abrir pasta imutável, testar candidata sem tráfego de novas sessões, promover uma vez. Sem distribuição probabilística: `percentual` sempre0; campo `canario` identifica candidata inativa por compatibilidade com a ficha. Checks condicionais de distribuição canário não se aplicam e não foram marcados como realizados.

`pages/rollout.json` é modelo sem publicação (`estavel/anterior/canario=null`), não prova de SHA implantado. Contrato schema1: strategy=azul-verde; estavel/anterior/canario são SHA40 ou null, percentual0, retiradas é lista de SHA40. Referências repetidas, retiradas ainda ativas, traversal, JSON inválido ou ponteiros contraditórios falham. Módulo compartilhado por carregador, sonda e smoke: `pages/rollout-contract.mjs`.

| Ação em scripts/rollout.mjs | Pré-condição / resultado |
|---|---|
| abrir | PacoteCI verificado por inventário/hash, SHA, run e tentativa. Extrai somente os sete bytes originais de releases/SHA; nunca recompila, altera HML/status ou sobrescreve mesmo SHA com bytes diferentes. Migra activeSha/previousSha preservando ativa/anterior. Candidata recebe0% e estável permanece. |
| promover | SHA deve ser candidata completa. Exige smoke passed=true/errors=[]/mode=release, versão/SHA, URL HTTPS exata, mesmo run/tentativa. A pipeline deve respeitar exit code do runner e usar relatório novo do job; JSON fornecido manualmente não é aceite. Vira estável uma vez; antiga vira anterior. Repetição fora do estado candidato é bloqueada. |
| rollback | Destino deve ser anterior completa e coerente. Restaura anterior, retira defeituosa, limpa anterior/candidata. Não exige que versão defeituosa ainda esteja completa, nem regrava seus bytes. Smoke e medição operacional posterior continuam necessários em022. |

`prepare-pages.mjs` mantém preview antigo onde ainda não há contrato formal. Quando formal existe, **não modifica seu ponteiro**. `publicar.mjs` continua homologando somente HML; `rollout.mjs` reutiliza verificação/extração, selecionando apenas releases e controle. `ci-bundle.mjs` passa a registrar runAttempt no manifesto; pacotes legados continuam verificáveis, mas abrir candidata formal exige tentativa registrada. Tentativa ausente/divergente bloqueia, sem fallback silencioso a outro artefato.

## Carregador

`pages/index.html` importa loader.mjs/rollout-contract.mjs, copiados junto da árvore. Reconsulta rollout.json sem cache e sem seguir redirecionamentos. Conserva chave de sessão preview para migração, mas revalida referência, version.json (SHA/SemVer) e index HTTP. Somente estável/anterior atuais são elegíveis; candidata nunca recebe novos jogadores. Retirada ignora sessão antiga mesmo se arquivos ainda existem. Storage bloqueado ou corrompido usa estável verificada; se destino falhar, tenta somente outra referência autorizada. Se ponteiro/rede/JSON/destinos falharem, permanece em erro legível com link de nova tentativa; não há SHA fallback embutido que possa estar retirado ou inexistente.

Revalidação acontece na entrada pela raiz. Uma aba que já executa o jogo não é interrompida remotamente; link direto a pasta histórica também não passa pelo carregador. No ensaio formal, conferir caches/CDN e política de acesso/retirada com Plataforma, incluindo propagação do HTML antigo. Nenhuma garantia de corte instantâneo de abas/cache foi inferida dos testes.

## Interface preparada para a pipeline 019 (não executada neste MD)

`scripts/rollout.sh` delega ao CLI Node. Sem `--commit true`, somente planeja saída separada/vazia; não toca checkout de entrada, não faz push nem deploy. Com commit, exige GITHUB_ACTIONS=true, ator igual GITHUB_ACTOR e raiz de checkout gh-pages limpo. Commit do bot inclui ação/SHA/**ator/motivo** legíveis. Rejeita operações locais e entrada/saída sobrepostas. Este guard evita uso acidental; permissões/environment/concorrência do job protegido são a fronteira operacional, não variáveis de ambiente como autenticação independente.

Contrato do consumidor019, após aprovação/gates: recuperar pacote do mesmo run/tentativa, árvore gh-pages atual e conferir predecessor; executar abrir; a pipeline grava/publica a árvore candidata, mantendo estável; executar projeto release-smoke com RELEASE_URL exata e SMOKE_REPORT=reports/candidata-smoke.json; só com exit0 aplicar promover com esse relatório. Publicar pela mesma pipeline e executar smoke da raiz. Nunca executar esses comandos como deploy manual. O consumidor precisa serializar **todo** abrir→publicar→smoke→promover, reconsultar árvore atual antes de escrever e arquivar o motivo, ator, run e rollback. Job019/política de cache e execução022 ficam pendentes, não implementados como avanço a outro MD.

Argumentos CLI: `--action abrir|promover|rollback --existing ARVORE --output SAIDA --sha SHA --actor ATOR --reason MOTIVO`; abrir também `--bundle PACOTE --run RUN --run-attempt TENTATIVA`; promover também `--run RUN --run-attempt TENTATIVA --site-url URL --smoke RELATORIO`. `--commit true` é opcional e exclusivo da pipeline. O CLI não realiza publicação por conta própria.

## Provas e limites

Testes de contrato: migração, candidata0, promoção com bloqueio de smoke inválido/SHA/run/URL, rollback/retirada/destino ausente, falha da versão defeituosa, imutabilidade, storage/rede/JSON/referências e preservaçãoHML. IntegraçãoCLI usa Git temporário **sintético**, testa bloqueio fora da pipeline e commit ator/motivo sem push. Não é um commit real de deploy.

Cinco E2E executam o carregador real servido sob /arcade/, incluindo módulo/MIME relativo, sessão após promoção, retirada, storage bloqueado, candidata0, HTTP404/JSON/rede e smoke014 com movimento real. Relatório de smoke é escrito pelo runner e anexado, com run/tentativa ou null fora da CI. A suíte local completa passou33E2E; resultados completos/pacote remoto serão vinculados ao PR após CI real. Não foram fabricados dados de produção, consentimentos, resultado de playtest ou aceite de Plataforma. Pendências detalhadas: registro único 018.
