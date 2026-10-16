# Operação após revisão do PR34 — 16/10/2026

## Revisão e integração

Confirmamos a aprovação de Lucas/6lucassilvaaa no HEAD e9dd28ccee535e9b1259a710742482e44db47aed: revisão5543092743. Integramos o PR34 por merge normal acb03d8b018227cabbbeb47242cc5c097a3c0df1, sem bypass ou identidade simulada. Suspendemos FORMAL_PRD_ENABLED apenas durante a primeira HML para preservar a baseline; reativamos antes dos ensaios. Nenhuma edição manual de gh-pages ocorreu. Fontes: [aprovação](operacao-release-2026-10-16/aprovacao-pr34.json) e [merge](operacao-release-2026-10-16/merge-pr34.json).

## Homologação

Run38851455266: 311 testes, 36 E2E, regressão HML4/4 e 182,361 s do merge até E2E completo. Fonte temporal: merged_at/merge_commit_sha, não data do commit. PRD foi skipped intencionalmente nesse push; não é deploy executado. [Recibo](operacao-release-2026-10-16/hml-main-tempo.json).

## Recuperação manual

Run38851754358, motivo ensaio-controlado, aprovação no environment producao, conclusão SUCCESS. Restaurou 88d533e/0.7.0 para71933bf/0.6.0; baseline passou smoke público antes do acionamento. Pages publicou a árvore restaurada, sete arquivos foram verificados por hash e a raiz passou smoke. Foram **80,662735 s do dispatch ao smoke**, incluindo fila/aprovação/preparo/Pages; hashes confirmados no mesmo step bem-sucedido. Não houve rebuild ou incidente espontâneo.

Observador independente: **171 respostas HTTP200**, nenhuma falha na janela. Sessão da versão retirada88 voltou à baseline719. [Transação](operacao-release-2026-10-16/manual-transacao.json), [smoke](operacao-release-2026-10-16/manual-smoke.json), [HTTP](operacao-release-2026-10-16/manual-observacao.json) e [medição](operacao-release-2026-10-16/manual-verificacao.json). Amostras discretas não garantem disponibilidade entre consultas.

## Recuperação automática

Run38851915984, dispatch recuperacao, SHAacb03d8: CI/HML próprias, aprovação em producao, candidata promovida por azul-verde a partir do mesmo ZIP da HML. O smoke normal passou. Em seguida o observador Playwright abortou game.js apenas em seu contexto; exit1 acionou a recuperação existente.

A pipeline restaurou o ponteiro, retirou a candidata, publicou Pages, confirmou sete hashes da baseline719 e smoke da raiz. Tempo **17,166 s** desde a injeção até recibo após verificação pública; **65 amostras HTTP200**, nenhuma falha observada. [Medição](operacao-release-2026-10-16/automatico-ensaio-recuperacao.json), [injeção](operacao-release-2026-10-16/automatico-ensaio-falha.json), [recibo](operacao-release-2026-10-16/automatico-producao-recuperacao.json) e [HTTP](operacao-release-2026-10-16/automatico-ensaio-http.json).

A run terminou FAILURE pela injeção deliberada; os steps de rollback, confirmação e medição passaram. Monitor pós-recuperação38852398492 passou. Não transformamos o vermelho em verde, nem chamamos o observador com falha de build defeituosa. A demonstração literal do professor na banca continua sendo atividade própria.

## Sessão e artefato

Navegador real manteve719 durante promoções, enquanto permitido. Sessão nova e armazenamento indisponível abriram e9. [JSON de sessão](operacao-release-2026-10-16/sessao-promocao.json) preserva horários/ponteiros/seleções, sem alterar preferências do usuário.

Bundle da tag na tentativa1 validado por ci-bundle.mjs:173 arquivos e identidade SHA/run/tentativa. ZIP29.265 bytes, SHA2566517fa79749c4bea490acc36eb197ce19a95617a24a5cba56d2edb40c6fabe9f; coincide com CI anterior do mesmo SHA. HML/PRD consomem os mesmos bytes.

## Release técnica e falha preservada

Tag anotada v0.7.0 criada/publicada em16/10, sem retroagir. Aponta para e9dd28c, aprovado e ancestral da main, com árvore Git idêntica ao merge acb03d8. [Comparação](operacao-release-2026-10-16/release-arvore-revisada.json). Evita reutilizar a candidata acb retirada pelo ensaio. Notas do commit aprovado autorizadas pelo hash060d5a27852f6c9de832e9d05e5bebf999596ff3dc472fc7339ddad74dcff4ad.

Run38852413982/1 passou CI/HML/PRD, mas a sonda38852862300 leu HTTP200/0.6.0/SHA719 depois do smoke0.7.0/SHAe9. A Release ficou skipped corretamente. Reconferência38853203550 confirmou e9 em ambos os ambientes às04:56:52 UTC. Há sinais de propagação/cache do ponteiro, sem causa raiz conclusiva. Preservamos a falha e iniciamos repetição integral na tentativa2, sem enfraquecer gates ou misturar artefatos entre tentativas. A tentativa2 passou CI/HML/PRD/monitor, mas falhou no publicador de Release, descrito abaixo.

## Métricas e limites

Após o rollback planejado, o DORA bruto passou a100% de taxa de falha (1 deploy formal seguido de rollback); não é incidente espontâneo. Dispatch de ensaio não entra como deploy formal dessa definição. Correção de interpretação16/10:tag com deploy-prd confirmado entra, mesmo se o publicador de anexos falhar; a coleta38940593792 registra2deploys eCFR50%. A conclusão global falha não desfaz um deploy real já confirmado. A fonte38853203550 mantém janela, eventos e denominadores; não alteramos dados para melhorar métricas. MTTR operacional permanece N/D; média2s das Issues38/39 é exclusiva do ensaio. Comparação com11dias é descritiva, não causal.

Pitch e TXT permanecem para o final. Não há submissao completa, triagemv1.0.0, playtest humano de colega de outra turma, AVA/recibo ou banca. Direitos e marcos históricos não são fabricados. Atualização documental posterior aos ensaios requer sua própria revisão/CI/publicação; Release técnica não equivale à entrega acadêmica completa.

## Falha real no publicador e correção candidata

A tentativa2 confirmou HML em745,303 s desde o push original da tag, abaixo de900 s; recibo PRD state=publicada em05:01:07,200UTC e monitor38853617679 SUCCESS, HML/PRD0.7.0/SHAe9. A run completa ficou FAILURE porque o publicador tentou reencontrar o rascunho pelo endpoint /releases/tags/v0.7.0, que retornou404. A listagem autenticada mostrou draft414556376 com os seis anexos e notas exatas. [Falha](operacao-release-2026-10-16/release-falha-tentativa2.txt), [listagem](operacao-release-2026-10-16/releases-list.json). Não publicar manualmente, mover tag ou chamar draft de Release concluída.

Reproduzimos o defeito no teste de publicação com endpoint por tag indisponível para drafts:1falha/5passes antes. Correção candidata consulta drafts por listagem autenticada, rejeita ambiguidade e reconfere pelo ID antes de publicar, mantendo notas/hashes/imutabilidade. Depois:8testes focais e314testes totais passaram; lint/tipagem verdes. Consulta de leitura pela API real encontrou o draft e seus seis anexos; nenhuma publicação foi feita pelo código não revisado. Código precisa de revisão/CI/merge antes da retomada pela pipeline.

Baixamos cinco anexos mais manifesto do draft e comparamos cada byte com o bundle original38852413982/2:todos iguais. Bundle da tentativa2 validado:172arquivos; é independente dos173da tentativa1, sem mistura. ZIPoriginal do draft passou offline1/1 em14,7 s:cinco missões,23casos finais,700XP, downloadsPython/HTML e HTML exportado jogável; sem rede ou pageerrors. Catorze arquivos HTTP200 em HML/release imutável têm hashes iguais ao ZIP. [Anexos](operacao-release-2026-10-16/draft-assets-verificacao.json), [offline](operacao-release-2026-10-16/release-offline-integridade.json), [hashes públicos](operacao-release-2026-10-16/hashes-publicos-e9.json). Esses resultados não comprovam acesso público a uma Release ainda em draft.

Próximo bloqueio:aprovação externa da correção/documentação e retomada formal do publicador com proveniência do bundle original, sem novo build entre ambientes. O artefato é válido; falta sua publicação pela pipeline.

## Retomada concluída após revisão externa

Lucas aprovouPR40 no HEADa190215, revisão5543614682; merge1e3dd3b. Main38939899867 passou CI/HML178,827s comPRDskipped intencionalmente. Retomada38940532129 SUCCESS publicouReleasev0.7.0 em16/10,17:33:57UTC, sem rebuild/deploy. Seis downloads públicos e hashes conferidos com o bundle original. Os trechos de falha e draft acima são o histórico preservado, não o estado vigente. Estado atual/provas em fechamento-independente-2026-10-16.md.
