# Medição HML — falha observada e correção

Em15/10/2026 integramos oPR32 comaprovação real deLucas (`6lucassilvaaa`) noHEAD59dc830. Merge773af17db29bb9fc46bfe438c0cb9c8304fbd5f5, horárioGitHub03:03:48UTC. A run38674290799 executou270testes/36E2E daCI, publicou HML0.7.0, e passou a regressão pública deHML. O jobfalhou na etapa de comprovar o horário de recebimento do push; produção permaneceu skipped. Não houve promoção manual nem gate ignorado.

## Causa

O coletor usava exclusivamente o feed público Events. O feed consultado não continha PushEvent do merge durante a janela da execução, embora o endpoint dePR confirmasse imediatamente merged_at e merge_commit_sha. O GitHub documenta latência de30segundos a6horas e que essa API não serve a casos de tempo real: https://docs.github.com/en/rest/activity/events#list-repository-events . A espera curta não garante prova dentro do limite de15min.

## Correção proposta

- Para main, obter oPR integrado diretamente pela API commits/SHA/pulls e exigir merged_at real, merged=true, base main e merge_commit_sha exato. Esse horário é o registroGitHub da publicação do merge na main, não o horário do commit do desenvolvedor.
- Para push com payload congelado peloActions, conferir repositório/ref/after e repository.pushed_at, se presente. Tags anotadas conferem primeiro o objeto remoto e ocommit apontado.
- O feedEvents permanece fonte complementar, com intervalo limitado e respeitando60s de polling; criação do run e data do commit não substituem publicação.
- Mantidos limite900s, falha semfonte válida e arquivamento da fonte/SHA/ref/horários. Uma reexecução antiga que exceda15min não se transforma emsucesso medido.

## Testes reais

Acrescentamos trêsregressões decontrato: PRmain semfeed disponível; payload comrepo/ref/SHA/timestamp; tag anotada comobjeto remoto. Antes:3falhas e8passes. Depois:11passes, lint/tsc aprovados. Fixtures são sintéticas e não resultados deprodução. Logs antes/depois locais em .contexto/execucao-2026-10-15; falhaoperacional na run real acima. Nova execuçãoHML/PRD permanece pendente atéPRrevisado eCIverde.

A aprovação existente doPR32 não cobre automaticamente novas alterações deste ajuste. Este fix precisa de novoPR e revisãoexterna sembypass.
