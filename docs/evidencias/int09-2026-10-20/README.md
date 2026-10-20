# INT-09 — retriagem da entrega v1.0.0

A execução [39483855023/1](https://github.com/luccalck/desafio-arcade/actions/runs/39483855023) terminou SUCCESS em 20/10/2026. `scripts/triagem.sh` imprimiu `TRIAGEM APROVADA` em modo `entrega`; o recibo registra `formalDeliveryApproved:true`. HTTP, smoke Playwright público, pdfinfo/seções, ffprobe/duração, ZIP, quatro integrantes e manifesto foram verificados com ferramentas reais.

Produto: tag anotada v1.0.0, SHA be281493c7699468f991a2333df074ec76691b3d. Pacote original: run39348283211/1, artefato12231549745, ZIP6.712.350bytes, digest sha256:1c3d83df20426005fd17e4c4361f71b7b91c7873bfa26540ae767cede62eac98. Nenhum arquivo do produto ou pacote foi substituído.

O validador atualizado é 5f3833d805cfee80c31f7977597cc3c4ea4cadfc. Esta é uma nova execução sobre o artefato da tag, e não uma reclassificação da execução original nem checkout do código antigo do validador. Corrigimos o ciclo de imports do CLI, reproduzido por regressão de subprocesso. A CI de push39483791481 e a de PR39483868561 passaram, com337 testes e37E2E; cobertura local do núcleo97,90% de statements.

Mantivemos PRAZO=2026-10-16T22:35:43-03:00 e o relógio real. A aprovação utiliza política temporal autorizada, limitada ao responsável/repositório/tag/SHA/digest/prazo exatos. O recibo explicita `withinDeadline:false` e `exceptionApplied:true`. Não comprova entrega dentro do prazo. A falha original continua preservada; a exceção não representa uma revisão humana.

## Agendamento e continuidade

A execução39457086815 tem evento real `schedule`, início20/10 às16:24:01UTC (13:24:01Brasília), contra cron nominal12:00UTC: atraso4h24m01s. Concluiu SUCCESS em vigilância. Não equivale à triagem formal de entrega nem garante pontualidade futura. Alertas de falha permanecem implementados; não houve queda neste ciclo, portanto não atribuímos notificação ou incidente inexistentes. Manter acompanhamento até a banca.

## Integridade

Os arquivos deste diretório foram copiados dos artefatos reais e preservados byte a byte; manifesto.json registra SHA-256 e bytes. Os testes locais são identificados separadamente e não substituem a execução pública. Concurso permanece opcional, sem inscrição. Ficha/TXT, envio no AVA e banca não são gerados ou declarados concluídos por este recibo.
