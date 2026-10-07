# Rota do Código - proposta de laboratório de lógica

Data: 07/10/2026. Estado: concepção integralmente aprovada pelo solicitante em 07/10/2026: "Sim, eu aprovo tudo"; implementação autorizada. Complementa P01/P02/P03/D01 (INT-02/04); preserva C/P/D/R/S e G0–G8. Fonte única continua jogo-arcade. Versão atual0.2.0 permanece intacta.

## Diagnóstico e direção

A versão0.2.0 oferece coleta, porta AND e repetição, porém o programa do jogador ainda é majoritariamente uma rota de avançar/virar. O solicitante deseja raciocínio de programação compreensível para leigos, explicação direta antes da prática, cinco missões e desafio final, menus de jogo e manutenção da paleta escura/ciano/amarelo.

Alternativas: A) laboratório de lógica com blocos em português e simuladores de sistemas digitais (recomendado); B) ampliar o robô com sensores/condicionais, mantendo navegação como tarefa dominante; C) seis minijogos distintos, mais variedade mas mais controles, motores e custo de teste. A ensina decisões/dados/repetição sem exigir sintaxe ou seis motores independentes.

## Experiência e interface propostas

Tela inicial de jogo com robô mascote e botões Novo jogo/Continuar, Missões, Como jogar e Opções. Novo jogo exige confirmação se houver progresso; Continuar aparece habilitado somente com progresso. Opções contemplam movimento reduzido, tamanho do texto e reset confirmado; não oferecem ajuste de áudio inexistente. Fontes/ativos locais, sem serviço externo. Menu de pausa ao jogar: retomar, rever explicação, reiniciar tentativa e voltar às missões.

Campanha como painel de seis setores conectados do laboratório: cinco missões numeradas e núcleo final bloqueado até as cinco conclusões. Cada setor informa conceito e estado (bloqueado/disponível/concluído). Robô atua como mascote/operador; jogador programa regras do sistema, sem usar trajetórias como principal desafio. Paleta aprovada preservada; menus deixam de se organizar como página promocional.

Fluxo de cada missão: explicação curta de um conceito, exemplo animado com botão por passo, prática guiada com uma ajuda inicial, desafio independente com novas entradas, diagnóstico e recompensa. Explicação de no máximo três cartões curtos, em linguagem comum, com metáfora concreta, nome técnico definido e exemplo causa/efeito. Pode ser revista a qualquer momento. A demonstração usa dados distintos dos do desafio para não fornecer sua solução inteira. Sem quiz como mecanismo central, cronômetro ou perda de vidas.

## Cinco missões e final

1. Sequência - Ligar a central. Explicação: programa é uma receita cuja ordem importa. Blocos ligar energia, iniciar sensor, ler temperatura e enviar leitura. Jogador organiza instruções e observa dependências; tentar ler sensor desligado falha indicando estado e instrução. Vence ao enviar uma leitura obtida após inicialização. Não se resume a decorar nomes: exemplo e execução mostram por que cada ação depende da anterior.
2. Variáveis - Memória do sistema. Explicação: variável é uma gaveta com nome cujo valor pode mudar. Energia começa3; carregar acrescenta2, duas operações usam2 cada; objetivo executar ambas e terminar com1. Cartões de valor permitem acompanhar atribuição/alteração antes/depois e detectar falta de energia. Prática guiada explica mudança; desafio usa outros valores/custos explicitamente apresentados, exigindo ajustar o programa. Operações e cargas têm limites declarados para impedir farm/rota irrelevante.
3. Condições - Separar dados. Explicação: SE faz uma escolha, SENÃO cuida do outro caso. Criar regra para enviar pacotes íntegros e separar corrompidos para revisão. Mesma regra executada em um conjunto misto, com ramo percorrido destacado. Vitória requer tratar corretamente todos, incluindo ao menos um de cada tipo; não basta resolver um caso por tentativa.
4. E / OU - Autorizar o acesso. Explicação: E exige as duas condições; OU aceita uma alternativa. Construir a regra (credencial válida E energia suficiente) OU modo de manutenção autorizado. Combinar cartões de condição e conectores em grupos visíveis, sem ambiguidade de precedência. Testar cartões de cenários: nenhuma condição, só uma, ambas e alternativa. Não introduzir NÃO ou expressão textual arbitrária nesta versão. Vence quando a regra concede/nega conforme requisitos em todos os cenários.
5. Repetição - Processar um lote. Explicação: PARA CADA aplica o mesmo trabalho a cada item. Criar um grupo que verifica o pacote, envia/separa com SE/SENÃO e atualiza contador de enviados. Rodar o mesmo programa em lotes de3 e5 itens. Cada pacote é visitado uma vez; saída e contador precisam corresponder às entradas. Assim o jogador generaliza um padrão em vez de escrever ações por item.
Final. Recuperar o núcleo. Sem conceito novo: combinar inicialização, contador, PARA CADA, classificação e condição de liberação. Inicializar contador, processar pacote íntegro com permissão (E), contar somente os enviados, separar os demais; liberar relatório somente com contador igual à meta e lote concluído. Metas coerentes com os dados de cada cenário, sempre informadas. Executar o mesmo programa em três cenários diferentes, incluindo lote sem enviados; todos visíveis/inspecionáveis. Vitória somente em todos; mostra qual entrada, instrução, condição ou valor explica a falha. Não conceder vitória apenas por copiar o exemplo guiado.

## Core, conteúdo e avaliação

Um interpretador puro compartilhado, com ações/variáveis/condições/grupos, em vez de seis motores diferentes. Programas estruturados via controles HTML: sem eval, código arbitrário ou backend. Predicados/ações disponíveis por missão; grupos booleanos com precedência explícita, um PARA CADA contendo condição sem laço dentro de laço. Lotes até8 itens; limite de100 operações por execução. Estados e traço mostram antes/depois, entrada atual, ramo e saída. Cada missão tem suas ações e validação de objetivos/datasets, conservando engine de grade somente enquanto a migração exigir; não manter duas campanhas concorrentes na experiência final.

Prática guiada não dá XP. Desafio independente concede100XP uma vez por missão; final200XP uma vez, total700XP. Replay não duplica. Progresso usa IDs e formato novos, sem converter automaticamente os400XP de rotas em conclusão de conceitos novos. Chave própria nova; não apagar outras aplicações nem destruir o histórico antigo silenciosamente. Tela informa que se trata de nova campanha e progresso anterior não desbloqueia os novos desafios. Sem dados pessoais ou telemetria.

Controles por clique/teclado/toque, sem arrastar obrigatório; ajuda progressiva, texto/ícone além de cor, foco preservado, movimento reduzido, opção de rever aula, layout móvel. A aprendizagem pretendida tem critério observável: ordenar por dependência, acompanhar estado, tratar dois ramos, combinar condições e generalizar para lotes diferentes. Testes de software não comprovam aprendizagem humana; P05 continua obrigatório/pending.

## Validação e documentação necessárias após aprovação

Contratos e testes antes da implementação: ordem/dependências, alteração de valores e energia, SE/SENÃO, tabela E/OU, precedência explícita, iteração com lotes distintos, contador, estado imutável, limites e final em três cenários. Schema/semântica bloqueiam conteúdo inválido e soluções que não passam em todos os cenários. E2E cobre aula → prática → desafio, erro/correção, campanha5+final, menus/pausa, teclado, celular, persistência/replay e offline. Preservar evidência do bug real#1 e adaptar regressão ao novo editor, sem inventar bug novo.

Atualizar GDD12seções/Esteira, seis mapas de circuitos/posições de objetos pertinentes ao novo gênero, fluxo/menu/HUD/fim, arte e uso IA; regenerar PDF pela pipeline e inspecionar. Build estática offline, version.json/ZIP/hash, reproducibilidade, segurança e CI continuam obrigatórios. Uma fonte de código, sem nova engine ou dependência desnecessária. Implementação em incrementos no mesmo PR ainda draft; nenhum merge sem outro humano.

## Pendências reais

Concepção aprovada; isso não é revisão de PR por outro integrante. G0 continua incompleto por dados/acessos/pessoas/prazo real. Revisão humana, playtest, HML/PRD, recuperação, sondas/DORA, vídeo, tag/release e pacote final continuam pendentes. Não existe promessa de nota ou eficácia educativa. O escopo é cinco missões e final com core compartilhado; sem editor livre de código, inventário, multiplayer, ranking, avatar personalizável ou áudio adicional.

