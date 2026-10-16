# Equivalência técnica da publicação Pages —16/10/2026

O HTML permite ferramentas equivalentes justificadas no relatório. A configuração literal do exemplo é Deploy from a branch/gh-pages; usamos PagesActions (build_type=workflow). Não afirmamos que essas configurações são a mesma opção de Settings.

A fonte material continua a árvore gh-pages: os scripts clonam essa branch, preservam releases/hml/status, fazem commit/push apenas pela pipeline e produzem uma árvore estática sem recompilar. A action interna configurar/upload/deploy-pages publica essa mesma árvore com permissions pages:write/id-token:write e environment protegido. Origem/runtime do jogo permanece estático e offline; sem backend, serviço pago ou alteração manual da produção.

[Documentação oficial](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) descreve publicação de artefato, dependência de build e environment de proteção. Usamos esse mecanismo para explicitar publicação/propagação na mesma esteira em vez de depender de uma publicação implícita separada após push do bot.

Validação técnica real: run38829484114, aprovação registrada, HML216,414s, azul-verde,smoke e catorze hashes HTTP iguais ao ZIP; gh-pages67ce33d24e7dc073894b989cada0a9c590865580, autor github-actions[bot], atorluccalck e motivo/run no commit de promoção. Requisito funcional validado por equivalência; a configuração não é literal e essa diferença fica declarada para avaliação do professor. Não alteramos Settings para aparentar atendimento.
