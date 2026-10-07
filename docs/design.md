# Rota do Código — decisões aprovadas

Conceito A aprovado pelo solicitante em 07/10/2026: “Aprovo a Opcao A, rota de codigo”. Aprovação de conceito não constitui revisão de PR por outro integrante.

Problema: relacionar sequência de instruções ao resultado e localizar a causa de uma falha. Público: estudantes iniciantes em tecnologia, com leitura em português. Aprendizagem pretendida: sequência, depuração e repetição. Não há estudo de eficácia realizado.

O jogador monta comandos de um robô, observa a trajetória e corrige tentativas. Avançar move uma célula; esquerda/direita giram 90 graus. Chegar ao módulo vence; parede, borda, fim fora do destino ou limite de passos encerra a tentativa. Tentativas ilimitadas, sem cronômetro. Três mapas introduzem os conceitos nessa ordem. Repetição limitada à fase 3, sem aninhamento.

Stack: TypeScript, HTML/CSS e SVG, core puro e esbuild IIFE. A grade discreta não exige engine, física ou React; controles HTML favorecem teclado e toque. Ajv valida o conteúdo e a solução editorial antes da build; Vitest cobre regras/integração; Playwright verifica navegador e arquivo offline. Node é ferramenta de desenvolvimento, não requisito do jogador.

Arte vetorial própria assistida por IA, fontes do sistema, ausência declarada de áudio. O GDD versionado é a especificação completa, com mapas, fluxo e wireframes. Sem backend, coleta de dados, serviço pago ou chamadas de IA durante a partida.

Arquitetura de entrega planejada: Actions → artefato único → HML → aprovação em producao → release imutável → azul-verde/smoke → rollback. Deploys, recuperação, sondas e DORA precisam de execução real posterior aos aceites; CI verde não os comprova.
