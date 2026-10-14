# Recuperação manual pela pipeline — etapa 023

Use somente após integração revisada na `main`, gates formais G0–G4 e publicação real da baseline e de uma versão posterior. O acionamento é humano; a alteração de `gh-pages` é feita pelo job protegido `producao`. A versão de destino vem exclusivamente de `rollout.json.anterior`; o operador escolhe uma das quatro categorias de motivo, sem campo livre para segredo ou dado pessoal. O workflow recusa branch diferente de `main`, flags formais inativas, ausência de aprovação de outro usuário autorizado, versão anterior incompleta, checkout concorrente e motivo inválido.

## Antes da banca ou do ensaio controlado

1. Responsável de Plataforma confere incidente, URL, `rollout.json`, SHA estável/anterior, sete arquivos da anterior, monitor/alertas e logs do `deploy-prd`. Registra horário inicial e evidências sem token. Confere que a aprovação do environment `producao` continua obrigatória e sem bypass.
2. Revisor/operador autorizado decide se a recuperação manual é necessária quando a automática não confirmou estado saudável. Não criar defeito em produção sem ensaio combinado com a equipe.
3. Acionar `gh workflow run rollback.yml --ref main -f reason=alerta-confirmado` (ou outra categoria disponível) somente com autorização operacional e versões reais. Guardar fatos detalhados no incidente, sem segredo. O acionamento não é aprovação: outro revisor do environment deve aprovar o job.

## Durante

O job lê proteção/aprovações pela API, clona `gh-pages`, valida o ponteiro e a release anterior, marca estável e eventual canário como retirados, preserva HML e outras releases e registra ator/motivo no commit. Usa `pages-publicacao`, sem cancelamento automático. Push concorrente falha e exige nova inspeção; não usa `--force`. A publicação usa o mesmo componente Pages da esteira. A espera de propagação é limitada a 180 segundos. Smoke da raiz exige SHA, versão, run/tentativa, assets e jogo funcionais; compara também por HTTP os sete hashes da release recuperada. O monitor separado precisa encerrar com sucesso para confirmar sondas e alertas. Qualquer falha deixa o job vermelho.

## Depois

Conferir `gh run view <run> --log`, ponteiro/versão/HTTP e Issue de alerta; arquivar URL/run/tentativa, commit `gh-pages`, motivo, ator, horário início/fim e relatórios de smoke/monitor. Comunicar a equipe pelos canais autorizados. Se o job falhar depois do push, não presumir recuperação: reinspecionar estado público e repetir somente após diagnóstico. Manter logs e histórico, não sobrescrever release nem editar produção manualmente. Medição fim a fim incluindo propagação e meta de cinco minutos pertencem ao ensaio 026; este documento não afirma que ocorreram.

## Conferência e Contingência Operacional para a Banca (Etapa 038)

Para a apresentação perante a banca examinadora e após o congelamento de código (`CR-09` e `CR-10`), a equipe segue o protocolo de conferência antes, durante e depois:

1. **Antes da Banca:**
   - Conferir URL pública de produção (`https://luccalck.github.io/desafio-arcade/`) e ambiente HML (`https://luccalck.github.io/desafio-arcade/hml/`).
   - Conferir que não existem issues de alerta operacionais abertas no repositório.
   - Deixar preparado localmente o pacote offline `build.zip` descompactado (`dist/index.html`) para contingência imediata caso haja oscilação ou queda de conectividade no local da banca.
2. **Durante a Banca (em caso de incidente na demonstração):**
   - **Queda de conexão:** Abrir imediatamente `file:///.../dist/index.html` em Chromium/Chrome. O teste automatizado `tests/e2e/offline-package.spec.mjs` comprova que a campanha completa, o interpretador Python e o download do jogo gerado funcionam 100% offline sem qualquer requisição externa.
   - **Degradação ou defeito em produção:** Se a versão pública apresentar anomalia, o operador aciona `gh workflow run rollback.yml --ref main -f reason=alerta-confirmado`, que retira a versão defeituosa, restaura o `previousSha` saudável em menos de 5 minutos, fecha alertas automaticamente e preserva os logs de auditoria.
3. **Depois da Banca:**
   - Inspecionar logs da esteira e de eventuais rollbacks via `gh run view --log`.
   - Garantir conservação de todos os registros e relatórios de observabilidade sem adulterações.

Fontes: [workflow](../.github/workflows/rollback.yml), [contrato de rollout](../scripts/rollout.mjs), [evidência](evidencias/rollback-manual.md), [smoke final](evidencias/smoke-final.md) e [registro único](execucao/05-pendencias-por-passo.md#passo-023).
