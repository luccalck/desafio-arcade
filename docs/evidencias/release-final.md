# Etapa 035 — Preparação da release; execução formal a comprovar

Atualização de 14/10/2026. O trabalho autoral de preparação de Lucas Souza da Silva (`6lucassilvaaa`) está no [PR #27](https://github.com/luccalck/desafio-arcade/pull/27). Esta reconferência corrige a separação entre contrato, artefato CI e release remota.

A candidata auditada é **0.6.0**, SHA `e71de72`; não existe tag ou release remota no snapshot inicial. A versão v1.0.0 é um alvo futuro, não o conteúdo atual de package.json. Antes de usá-la, alinhar package/lock/GDD/notas e obter revisão/CI no SHA integrado. Criar tag anotada sem retroagir data nem inventar prévia passada.

A [CI auditada 38649548723](https://github.com/luccalck/desafio-arcade/actions/runs/38649548723) produziu ZIP de **29.001 bytes** com SHA-256 `3bfb09573d93a58d34e72c3379ae6a6386202dbb40047d151ea106cbc3754a87`, GDD de **18 páginas** e SBOM. O relatório técnico não constava do bundle dessa execução. Medidas de builds locais anteriores não são o inventário de uma release final.

O contrato é promover o mesmo pacote validado em HML para PRD, sem recompilar. A execução deve fornecer: run/tentativa, manifesto, hash do ZIP, metadados SemVer/SHA/data, aprovação do environment, E2E/smoke, URL imutável e assets efetivamente anexados à release. Arquivos preparados e testes do script release.mjs não comprovam publicação.

A publicação do jogo e de uma release técnica pode ocorrer antes do pitch, se o fluxo validado permitir. A submissão acadêmica completa e a triagem final continuam bloqueadas sem o vídeo real; não criar pitch placeholder nem chamar a release técnica de entrega acadêmica completa.

Próximas provas operacionais: [pendências035](../execucao/05-pendencias-por-passo.md), [reconferência](reconferencia-registros.md). Registrar os resultados reais posteriores sem alterar o snapshot histórico.
