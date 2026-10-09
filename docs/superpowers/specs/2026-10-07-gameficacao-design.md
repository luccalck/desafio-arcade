# Rota do Código — proposta de evolução das missões e da interface

Data: 07/10/2026. Estado: design aprovado pelo solicitante com “sim”; implementação deste lote em andamento. Pedido: interface mais gamificada, jogo mais intuitivo e desafios concretos de tecnologia.

Fonte principal: `C:\dev\studies\senai\semester-2\devops\desafio-arcade\jogo-arcade`. Branch atual: `feature/primeiro-ciclo`; PR #2 ainda sem revisão humana/merge. Esta proposta evolui o conceito A aprovado e não fecha G0–G8.

## Diagnóstico da experiência atual

Interface inspecionada no navegador local: menu com apresentação editorial, explicações em texto e três etapas. Conteúdo/core inspecionados: sequência, depuração e repetição produzem movimento em uma grade; o objetivo é chegar ao módulo. Não existem coleta explícita de dados, variáveis observáveis ou portas lógicas interativas. As dicas atuais podem revelar toda a solução. A necessidade de entender orientação e construir a sequência aparece antes de uma experiência guiada curta.

Essas observações são análise da interface e do código, não resultados de playtest humano. O navegador aberto ainda mostrava uma build anterior em cache; não foi reiniciado nem teve uma partida do usuário descartada.

## Alternativas

| Caminho | Benefício | Custo / limite |
|---|---|---|
| A — campanha de programação com objetos tecnológicos interativos, recomendado | Preserva robô/core; transforma ações em manipulação de dados, depuração, lógica booleana e automação | Exige ampliar comandos/estado e revisar mapas/tests/GDD |
| B — coleção de microjogos sobre redes, binário e hardware | Maior variedade de temas e tipos de interação | Vários modelos de regras/tutoriais; aumenta integração e testes no prazo |
| C — simulação de terminal com comandos e perguntas | Interface técnica compacta | Maior carga de leitura; perguntas isoladas pouco ajudam a tornar a interação intuitiva |

Recomendação A: quatro missões curtas dentro de uma campanha coerente. Conteúdo educativo será aplicado pela ação e pelo estado do sistema, mantendo uma implementação estática, offline e testável.

## Premissa e aprendizagem

O robô recupera um pequeno sistema digital em uma placa estilizada. Dados, terminais, interruptores e portas têm funções no desafio. Esta é uma simulação educativa abstrata de programação/lógica; não representa uma rede real ou um simulador físico de eletrônica.

Público permanece iniciante em tecnologia. O jogo deve mostrar a relação entre instrução, mudança de estado e resultado, em vez de exigir conhecimento prévio. Depuração é uma ferramenta utilizável em toda a campanha.

## Quatro missões concretas

1. **Recuperar os dados — sequência e variáveis.** Programar deslocamentos e usar `coletar` nos dois terminais para obter pacotes antes da entrega. HUD mostra `pacotes = 0/2`, depois 1/2 e 2/2. Chegar ao destino sem os dados explica a condição ainda não satisfeita. A introdução ensina avançar/virar/coletar por pequenas ações guiadas, seguida do desafio independente.
2. **Corrigir o firmware — depuração.** Receber uma sequência inicial incorreta. Executar por passo, acompanhar a linha destacada, posição/direção e pacotes, identificar a instrução que impediu a missão e editar a sequência. Erro preparado é conteúdo educativo, separado do bug real de software #1.
3. **Destravar o circuito — lógica booleana AND.** Dois interruptores definem A e B. Usar `ativar` ao alcançar cada interruptor. Uma porta permite passagem somente com `A AND B = verdadeiro`. A/B/resultado aparecem como 0/1 e falso/verdadeiro; acionar somente um demonstra por que a porta continua fechada. A lógica realmente altera a travessia, não apenas o texto.
4. **Automatizar a inspeção — repetição.** Recolher dados de três terminais em um padrão repetido. Montar um bloco `repetir` com movimento/coleta; o limite de blocos exige representar o padrão. Exibir iteração atual e terminais atendidos. Encerrar com explicação da relação entre grupo, repetições e ações executadas.

Os mapas terão soluções editoriais executadas pelo core e verificadas na validação do conteúdo. A introdução guiada não substitui a primeira missão independente. Mais temas/minijogos não integram este lote.

## Interface e gamificação

- Tela inicial funciona como entrada da campanha: objetivo curto, botão jogar e mapa das quatro missões com estados bloqueada/disponível/concluída.
- Cenário com identidade de laboratório digital: placa/circuitos vetoriais, robô original, terminais reconhecíveis, portas/sinais e percurso marcado. Painéis escuros, acentos de ciano e amarelo e textos com contraste; evitar depender de cor para indicar estado.
- Mapa ocupa a área principal. Objetivo persistente em uma frase; HUD com missão, pacotes, passos, interruptores quando pertinentes e progresso.
- Editor de blocos com ícone + verbo, sequência numerada, ações de remover/reordenar e destaque sincronizado. Setas de direção e exemplos visuais explicam a diferença entre avançar e virar.
- Ações `Executar`, `Um passo` e `Recomeçar` claras; menu secundário. Controles HTML por teclado/toque; nenhuma ação exige arrastar.
- Tutorial contextual deixa o jogador realizar a ação e observar seu efeito. Dicas graduais explicam a próxima ideia sem entregar a sequência inteira. Feedback indica instrução, motivo e opção de correção.
- Concluir missão concede 100 XP uma única vez e uma medalha do conceito aplicado; desbloqueia a próxima. XP máximo de campanha: 400, sem farm, ranking ou alegação de nota acadêmica. Falha não remove XP nem vidas; não há cronômetro.
- Vitória celebra o sistema recuperado e explica o aprendizado aplicado. Progresso pode ser salvo localmente, sem dados pessoais; falha/indisponibilidade de armazenamento mantém a partida utilizável em memória.
- Animações curtas mostram deslocamento, coleta, porta e vitória. Movimento reduzido conserva todos os feedbacks e evita efeitos prolongados/piscantes. Áudio permanece ausente neste lote, declarado no GDD.

## Contratos e implementação prevista

Core puro passa a tratar objetos do mapa e estado de pacotes/interruptores; inclui comandos explícitos `coletar` e `ativar`. Renderer apenas apresenta estados/eventos. Uma coleta é idempotente: terminal já atendido não concede outro pacote/XP. Porta fechada bloqueia o movimento com explicação; avanço continua movendo uma célula, virar continua mudando direção sem mover.

Vitória exige destino e objetivos da missão. Estado é reiniciado a cada tentativa; programa permanece editável após falha. Limites de blocos/passos e repetições continuam validados. Não interpretar código arbitrário nem chamar IA em runtime. Dados JSON/schema descrevem objetos, objetivos, introdução, dicas e soluções.

Progresso local só guarda IDs de missões concluídas e versão do formato. Dados inválidos devem ser ignorados com fallback seguro, sem quebrar a aplicação. Reiniciar campanha limpa somente esse progresso do jogo.

## Critérios de aceite da mudança

- Primeira interação ensina um comando com ação observável; missões anunciam objetivo/regras antes da execução.
- Pacotes e AND alteram estado e condições reais de vitória/passagem; programa inicial defeituoso pode ser diagnosticado por passo.
- Todas as missões têm solução executável; testes cobrem coleta duplicada, objetivo incompleto, combinações AND, porta bloqueada e repetição com coleta.
- E2E verifica introdução/campanha, depuração, lógica AND, desbloqueio/progresso, teclado, celular e offline. Preservar regressão do bug real de foco.
- Manter mínimos de unidade/integração/E2E e cobertura >=70% de src/core, JSON inválido bloqueante, ZIP <25MB e CI verde.
- GDD completo recebe novos mapas/fluxo/wireframes/arte/regras, versão e IA/terceiros atualizados por PR. Capturas vêm da implementação após execução; esta proposta não serve de evidência de jogo rodando.

## Ordem e pendências

Após aprovação desta proposta: complementar plano preservando P01/P02/P03/P04, D01–D04/D05, R02/R03 e S01/S02; escrever testes dos novos contratos, implementar core/conteúdo e depois interface, validar e atualizar PR. Não alterar main ou promover a produção sem os aceites e revisão exigidos.

Equipe, revisor e horário permanecem pendentes como no acompanhamento anterior. Esta proposta não repete pedidos de nomes/RAs adiados. HML/PRD, recuperação/DORA, vídeo/triagem/pacote final continuam no roteiro e não serão declarados atendidos pelo redesenho.
