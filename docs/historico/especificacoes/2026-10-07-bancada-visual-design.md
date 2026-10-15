# Rota do Código — proposta de bancada visual interativa

Data: 07/10/2026. Estado: design aprovado pelo solicitante com “Sim”; implementação em andamento. Substitui a concepção de interação da versão candidata 0.3.0 com aceite recebido. Fonte principal permanece jogo-arcade; PR #2 e histórico preservados.

## Diagnóstico real

A versão 0.3.0 tem regras/testes funcionais e CI verde, mas isso não comprova uma experiência divertida ou clara. A missão inicial tem solução fixa de quatro ações e revela suas dependências na própria paleta. O jogador atravessa aula, exemplo, prática e desafio em sequência obrigatória. A tela de partida reúne objetivo, cenários, ajuda, simulador, registro, editor e descrições de botões. No final, grupos/seletores/ramos produzem uma página longa. O usuário pediu menos texto, manipulação visual, liberdade para experimentar e desafios mais profundos.

## Alternativas avaliadas

A. Bancada de máquinas de dados — recomendada. Jogador coloca, gira e conecta módulos; dados animados percorrem o sistema. A solução é julgada pelas saídas, com várias montagens possíveis. Um simulador compartilhado sustenta cinco missões e final, preservando WEB/offline/testes. Custo principal: interação de conexões e novo simulador visual.

B. Sala de manutenção explorável. Jogador movimenta personagem, encontra dispositivos e resolve puzzles locais. Traz exploração espacial, mas acrescenta movimentação, câmera, colisões e mais arte sem garantir profundidade lógica; aumenta o escopo antes da esteira.

C. Editor de programação por peças arrastáveis. Preserva grande parte do intérprete atual e custa menos, mas mantém a atividade de montar instruções em lista, próxima da interação que foi rejeitada. Não é a recomendação.

Referências pesquisadas nas páginas oficiais: Opus Magnum (https://www.zachtronics.com/opus-magnum/) descreve construção de máquinas e puzzles abertos; SpaceChem (https://zachtronics.com/spacechem/) associa projeto de fábricas a metas; Human Resource Machine (https://tomorrowcorporation.com/humanresourcemachine) usa dados/memória e desafios de otimização. A proposta toma princípios de experimentação e feedback, sem copiar código, telas, textos, personagens ou ativos. São referências de design, não builds WEB a incorporar. A página Zachademics (https://zachtronics.com/zachademics/) também ressalta a necessidade de introdução e apoio; retirar texto não significa retirar orientação.

## Mecânica recomendada

O jogador recupera uma fábrica digital construindo pequenos circuitos de processamento. As peças representam transporte, transformação, decisão, combinação de condições e memória. Pacotes têm números e símbolos legíveis; forma/ícone distinguem integridade/permissão. Esses atributos são abstrações educativas, não simulação elétrica, criptografia real ou prática de invasão.

Loop: observar a meta → montar/conectar peças → ligar a simulação → acompanhar dados/saídas → corrigir a montagem. Encaixar uma peça não conclui a missão. O sistema deve funcionar para a coleção de entradas da missão, sem reenviar manualmente um pacote por vez. Nada exige executar uma solução pronta para liberar a tentativa.

Interação: arrastar peça da bandeja para um encaixe; ligar portas com um cabo; girar, configurar, mover ou remover a peça selecionada. Clique/toque em peça e depois no encaixe oferece alternativa ao arraste. Conexões também podem ser feitas selecionando origem/destino; teclado permite selecionar encaixe, peça e porta. Conectar portas incompatíveis produz indicação visual e mensagem curta. Desfazer e reiniciar tentativa são acessíveis.

Uma montagem aceita pode ter posições/rotas diferentes: validação usa entradas, saídas e limites públicos, não igualdade com uma solução editorial. Pelo menos duas soluções distintas devem ser demonstradas em cada missão para sustentar essa promessa. Dificuldade vem de restrições de espaço/componentes, condições combinadas, estado e entradas variadas. Não haverá vitória por clicar corretamente em quatro botões, pressão obrigatória de tempo ou regra secreta.

## Exemplo concreto de jogabilidade

A central recebe pacotes numerados 1, 3 e 5. Deve produzir 4, 6 e 8. A bandeja oferece módulos +1, +2 e ×2, com orçamento de dois transformadores. Jogador escolhe peças, ordem e conexões. Ao ligar, os pacotes percorrem cabos e mudam de valor nos módulos. ×2 e +2 passam no pacote 1 e falham nos demais: o erro aparece no pacote e na saída. +1 seguido de +2 ou +2 seguido de +1 resolve a meta. A interface apresenta uma pequena amostra de entrada/saída; a regra precisa ser descoberta e generalizada.

Essa cena exemplifica a segunda missão. A primeira ensina o gesto de montar/conectar com um problema espacial breve, sem repetir toda a cadeia aula/exemplo/prática/desafio. Os cenários do desafio continuam verificáveis e finitos; não se introduz geração aleatória sem controle ou dados escondidos.

## Cinco missões e final

1. Reconectar a central: caminhos interrompidos, obstáculos e peças de transporte limitadas; restaurar saídas indicadas pelos símbolos. Aprendizagem: fluxo e dependência entre componentes. Primeiro contato curto e visual.
2. Calibrar sinais: transformar valores sob entradas diferentes, orçamento de processadores e alternativas de montagem. Aprendizagem: estado, operações e generalização.
3. Separar dados: sensor/classificador com duas saídas; dados íntegros chegam ao servidor e corrompidos à revisão. Nenhum item pode desaparecer ou chegar ao destino errado. Aprendizagem: decisão e tratamento de exceção.
4. Controlar acesso: sensores e peças E/OU/negação combinam credencial, energia e manutenção. Casos que parecem semelhantes exigem decisões diferentes. Aprendizagem: composição de regras booleanas e diagnóstico.
5. Gerenciar o buffer: guardar/contar itens válidos e liberar um lote ao atingir a meta; processar coleções distintas com estado inicial explícito. Aprendizagem: memória, acumulação e automação repetida. Contador visual deve representar o estado real do simulador.
Final. Recuperar o núcleo: combinar transformação, classificação, condição e memória com orçamento conhecido; testar vários lotes e liberar somente os que atendem a meta. Bônus de eficiência são opcionais; conclusão básica exige comportamento correto.

Listas exatas de peças, mapas, entradas, metas e soluções serão definidas/validadas nos contratos do plano após aprovação. Isso não permite inventar aceites: só construir a primeira missão e o caso representativo da segunda pode confirmar a interação, antes de expandir o mesmo simulador para as demais. A entrega pretendida continua sendo cinco missões e um final, sem seis engines independentes.

## Interface com informação progressiva

Tela principal de partida: bancada ocupando a maior parte da área, meta visual compacta no topo, bandeja de peças embaixo e controle ligar/pausar. Permanecem nome curto da missão, progresso visual e ajuda. Versão continua no menu inicial.

Texto do objetivo em uma frase curta; entradas/saídas como cartões numéricos/ícones. Descrição de peça aparece somente quando selecionada. Aula conceitual substituída por demonstração animada curta e opcional no botão de ajuda, com legenda de uma frase. Primeiro uso destaca onde pegar/encaixar/conectar, sem avançar por telas obrigatórias. Erro marca peça/pacote/saída e mostra uma causa breve. Registro detalhado e dados de teste ficam em painel sob demanda. Resultado usa saída funcionando, medalha e próxima missão, com mínimo de leitura.

Paleta azul escuro/ciano/amarelo e identidade Rota do Código preservadas. Efeitos respondem a ações e estado real. Movimento reduzido permite simulação discreta com resultados visíveis; texto/símbolos acompanham cores. Celular usa a mesma WEB: encaixes com área de toque adequada, bandeja recolhível e ajuste da bancada à tela; zoom/pan somente se necessário e com alternativa de navegação acessível. Nenhuma área do editor deve depender de acertar um pequeno cabo com o dedo.

## Arquitetura e verificação previstas

Continuar com TypeScript/core puro, conteúdo JSON validado, SVG/HTML/CSS e build estática IIFE. Modelo novo separa definição de missão, montagem em encaixes, portas/conexões, pacotes, memória e estado por tick. Camada visual anima snapshots; vitória é decidida pelo core. Transporte/transformação/classificação/booleanos/contador usam componentes limitados e determinísticos, não engine de física ou código arbitrário.

Um grafo com portas tipadas representa a montagem. Rotas sem saída, ligações incompatíveis, duplicação/perda de dados, ciclos não suportados e orçamento excedido têm diagnósticos próprios. Simulação tem orçamento finito de ticks e quantidade de pacotes. Repetição é processamento automático da coleção; circuito acíclico evita loop infinito. Valores e limites educativos constam do conteúdo. Memória reinicia por ensaio/lote conforme missão, sem estado escondido entre tentativas.

Preservar testes significativos de persistência/segurança/offline e regressão do bug real #1, adaptando o necessário à nova UI. Novos testes cobrem transformações, portas/rotas, conservação de pacotes, estado/contador, cenários que distinguem regra errada da correta, duas soluções válidas, montagem incompatível e limites. E2E deve construir/conectar peças por UI, corrigir falha, completar campanha, verificar teclado/toque/celular e executar offline sem rede. Testes automatizados não medem diversão/aprendizagem; playtest humano continua P05.

GDD completo, mapas, fluxo, wireframes, IA/licenças e evidências atualizados no mesmo PR após implementação. GDD.pdf/build/ZIP/checksum permanecem automáticos. Não alterar a esteira para ocultar falhas nem declarar HML/PRD/DORA realizados. Nenhuma nova dependência é decidida apenas por aparência; eventual necessidade deve ser justificada por implementação/testabilidade/offline.

## Critérios de aceite da mudança

- Bancada manipulável como atividade central, com colocar/conectar/girar/ajustar/desfazer e resposta visual real.
- A ajuda e o log não ocupam a tela principal; nenhuma sequência de aulas ou exemplos é obrigatória para iniciar uma tentativa.
- Cinco missões e final com dificuldade crescente, entradas diferentes, objetivos funcionais e pelo menos duas soluções válidas por missão.
- Erro localizado visualmente e programa/montagem preservado para correção.
- Mesma WEB estática, offline, teclado/toque e responsividade; versão visível no menu.
- Core e conteúdo validados, E2E real e CI verde; GDD/evidências coerentes. Revisão humana antes do merge continua necessária.

## Situação e próximo passo

Exploração de contexto e pesquisa concluídas; autoverificação da proposta conferiu interação central, escopo, aprendizagem, critérios e limites de evidência. Esta proposta não muda o código nem aprova os checkpoints. G0 continua pendente de pessoas/acessos e dados já adiados pelo responsável; C/P/D/R/S e G0–G8 preservados. O solicitante aprovou também esta proposta escrita; a aprovação de concepção não substitui revisão humana do PR.

Após aceite desta proposta escrita: registrar design aprovado no repo e preparar plano/contratos → validar a interação da primeira missão e transformação → construir as demais no mesmo simulador → testar/atualizar GDD/CI. Sem criar outra fonte principal ou jogo concorrente.

