# Ensaio operacional isolado —16/10/2026

## Estado atualizado após execução e publicação —16/10/2026

O preflight e o gate descritos no registro histórico abaixo foram superados. PR34 foi aprovado porLucas5543092743 e integrado emacb03d8. Os ensaios manual38851754358 e automático38851915984 comprovaram recuperação incluindoPages/hash/smoke em80,662735s e17,166s, com171+65HTTP200 observados. Release técnica v0.7.0 publicada pela retomada38940532129 após PR40 revisado/integrado. Fontes atuais:operacao-release-2026-10-16.md e fechamento-independente-2026-10-16.md. Não cobrar novamente revisãoPR34, publicação técnica ou execução da recuperação. PR41 é uma atualização documental diferente e permanece bloqueado sem aprovação. O escopo dos alertas/MTTR de ensaio continua explícito.

## Registro histórico preservado

Executamos sob autorização de Lucca, com assistência de IA e sem atribuir participação a outra pessoa. O [desenho aprovado](../superpowers/specs/2026-10-16-ensaio-operacional-design.md) separa alvos de ensaio da operação normal. Não há participante de playtest humano, pitch, TXT ou banca produzido por esta execução.

## Alertas reais, falha e correção

A primeira execução [38846941358](https://github.com/luccalck/desafio-arcade/actions/runs/38846941358), SHA 73a3259, passou CI mas falhou no job ensaio-alertas por duplicação de Issue. A listagem GitHub não refletiu a escrita recém-realizada; a segunda sonda abriu outra Issue. Preservamos o relatório vermelho e a regressão que falhou antes da correção. Corrigimos o adaptador para combinar listagem remota com escritas já confirmadas na mesma execução, separando labels/escopos e mantendo fechamentos locais. Não alteramos dados de sondas para obter aprovação.

As Issues #36/#37 foram encerradas administrativamente como ensaio abortado; seus corpos identificam a falha e que o fechamento não é recuperação automática. Não são amostras de MTTR. A produção não foi modificada durante esse ensaio.

A repetição [38847296363](https://github.com/luccalck/desafio-arcade/actions/runs/38847296363), SHA 27aab6d, concluiu integralmente com sucesso: CI e ensaio real. O número exato de testes está nos JUnit do run; não inferimos contagem a partir do nome do job. Um servidor HTTP temporário no runner respondeu 404 e depois200; em outro ciclo atrasou a resposta em 2,2 s e depois normalizou. `sondar` mediu respostas e duração reais; `reconcileAlerts` chamou a API real. Duas sondas repetidas por falha não criaram duplicatas após a correção; normalização fechou automaticamente as Issues.

| Ciclo de ensaio | Abertura UTC | Fechamento UTC | Tempo real da Issue |
|---|---|---|---|
| [#38 JogoForaDoAr](https://github.com/luccalck/desafio-arcade/issues/38) | 03:49:54 | 03:49:55 |1s|
| [#39 LatenciaAlta](https://github.com/luccalck/desafio-arcade/issues/39) | 03:49:58 | 03:50:01 |3s|

Horários correspondem a16/10,00:49:54–00:50:01 America/Sao_Paulo. Média de recuperação das Issues do ensaio:2s (0,033333min), conforme API. [Relatório original](ensaio-2026-10-16/alertas-ensaio-aprovado.json). As Issues possuem label ensaio e marcador por run/tentativa; o monitor antigo já consulta apenas label alerta e não será contaminado. O coletor novo também exclui explicitamente o marcador de ensaio. Isso não equivale a declarar um incidente espontâneo na produção ou atender literalmente ao critério de alertas operacionais com label alerta.

## Melhoria medida no escopo do ensaio

Decisão baseada no resultado real: duas Issues para duas sondas repetidas revelaram deduplicação insuficiente frente à consistência da listagem. Intervenção: manter escrituras confirmadas no adaptador da execução. Efeito observado na repetição: uma Issue por falha para duas sondas repetidas; zero duplicatas nos dois ciclos. Para JogoForaDoAr, quantidade2→1 por duas sondas (redução descritiva 50%). São duas execuções de ensaio; não prova melhoria sustentada de DORA ou latência da produção. Fontes originais antes/depois estão preservadas e a regressão continua na suíte.

## Recuperação: preflight real e gate pendente

Implementamos despacho recuperacao somente na main, aprovação em producao, candidata distinta da estável, observador HTTP independente, injeção apenas no navegador do smoke, caminho recuperar existente e confirmação por Pages/hashes/smoke. A medição recusa tempo ≥300 s, hashes divergentes, janela de observação incompleta, falhaHTTP ou versão errada. Testes locais cobrem esses bloqueios; isso ainda não é rollback no Pages.

O preflight local abriu a produção real88d533e, bloqueou uma requisição game.js somente no contexto Playwright e capturou a falha observada. Ponteiro antes/depois permaneceu idêntico; nenhum arquivo ou publicação foi alterado. [JSON](ensaio-2026-10-16/injecao-navegador.json) e [captura real](ensaio-2026-10-16/injecao-navegador.png). Não simula recuperação, indisponibilidade pública ou compreensão de uma pessoa.

O PR34 ainda exige revisão externa no novo HEAD. Sem integração protegida não podemos despachar esse código na main. Antes do merge aprovado, coordenar FORMAL_PRD_ENABLED=false para preservar baseline enquanto main recebe nova candidata; aguardar HML. Reativar a flag e disparar `gh workflow run esteira.yml --ref main -f ensaio=recuperacao`, preservando aprovação em producao. Esse dispatch não é um push: não afirma métrica push→HML; pushes normais mantêm limite900s. Confirmar nova SHA distinta, job vermelho com recuperação, relógio e observações; não executar se o guarda de revalidação indicar versão já estável. Para o ciclo manual usar candidata nova e motivo ensaio-controlado, sem reutilizar SHA retirada.

## Revisão, publicação e limites restantes

Créditos dos seis componentes foram reconferidos em fontes primárias e registrados no inventário. A configuração PagesActions é equivalência técnica documentada: a árvore material continua gh-pages, escrita pela pipeline; configure/upload/deploy-pages publicam essa árvore sem recompilar. [Justificativa](pages-equivalencia-2026-10-16.md). Isso não declara decisão antecipada de nota do professor.

Persistem: aprovação externa do PR34; ensaio completo automático/manual de recuperação e sessão; aceites coletivos/direitos e marcos históricos verdadeiros; playtest humano real; pitch/TXT por último; release por tag/pacote completo/triagem/AVA/banca. MTTR operacional segue sem amostra; usar o valor do ensaio no seu próprio escopo. [Manifesto das provas](ensaio-2026-10-16/manifesto.json).

Reconferência da operação normal: monitor38847618003 terminou success após o ensaio, com sondas HML/produção e DORA preservados em ensaio-2026-10-16. A label ensaio não entrou no cálculo operacional. CI do SHA27aab6d confirma311testes,0falhas/erros; o jobE2E também concluiu success. Não inferimos ensaio de rollback desses resultados.
