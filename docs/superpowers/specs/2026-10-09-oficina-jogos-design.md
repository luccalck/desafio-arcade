# Oficina de Jogos - design aprovado

Data09/10/2026. O solicitante escolheu a alternativa A e autorizou “faça seu plano e depois inicie”. Esse aceite autoriza o detalhamento e a execução inline; não repetir pedido de aprovação para a mesma decisão. Não substitui revisão humana do PR. Fonte única C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade, branch feature/primeiro-ciclo e PR#2. C/P/D/R/S e G0–G8 mantidos, G0 ainda pendente de pessoas/acessos/horário.

## Objetivo e experiência

Público iniciante em tecnologia, com leitura básica. Habilidade pretendida: escrever e depurar funções pequenas de JavaScript que controlam um minijogo real. A nave coleta cristais/estrelas e evita pedras. Cinco missões corrigem controles invertidos, movimento, colisão, pontuação e geração de uma onda. Final usa as cinco funções do jogador para alcançar100pontos sem perder todas as vidas. Não há circuito inventado, quiz ou solução por identidade com resposta editorial. Testes públicos usam entradas variadas; resultados corretos e limites determinam aceites.

Tela: jogo visível, objetivo em uma frase, editor com função de até aproximadamente12linhas e ações Testar regras/Jogar. Campo permite escrever código, sem instalação. Ajuda explica o vocabulário de JavaScript/entradas da função e pistas opcionais; casos detalhados sob demanda. Jogar permite ver regra errada e correta no mesmo cenário; testar dá diagnóstico de linha ou entrada/saída. Resultado libera próxima missão; vitória final permite baixar meu-jogo.html, executável offline, com funções editáveis no arquivo. Nenhum botão preenche solução. Paleta azul/ciano/amarelo e menus mantidos, artes SVG/CSS originais; teclado e botões de toque; pause/resume real e movimento reduzido. Preferências persistentes. Progresso/código em chave nova, campanhas antigas preservadas sem desbloqueio.

## Conteúdo

1. controlar(entrada): esquerda/direita retornam-1/1, repouso0; direita tem prioridade se ambas pressionadas. Starter troca sinais. Conceito:eventos e decisões.
2. mover(entrada): posicao+direcao*velocidade; testes com esquerda/direita/repouso e velocidades diferentes. Starter soma direcao+velocidade. Conceito:variáveis e composição aritmética.
3. colidir(entrada): distancia<=raio; casos separados/perto/limite. Starter usa comparação invertida. Conceito:condição e limite de colisão.
4. pontuar(entrada): somar10para cristal,25para estrela e0para outros; preservar pontuação anterior. Starter reseta pontos/usa soma errada. Conceito:estado e regras por evento.
5. criarOnda(entrada): devolver posições40+i*80 para quantidade0..5, sem item extra. Starter usa i<=quantidade. Conceito:laço for, lista/push e erro de limite.
6. Projeto final: revisar as funções salvas, testar todas, pilotar a nave até100pontos com3vidas. Mesmo algoritmo de jogo das missões; sem desbloqueio fabricado. As funções anteriores também podem ser editadas. Download só após testes corretos e vitória atual; replay não duplicaXP.

Cinco recompensas100XP e final200XP, total700. Primeiro estágio já é jogável. A nave está na parte inferior de um campo480×320; dados geométricos/eventos entram nas funções. Motor puro por ticks aplica regras, limita coordenadas, pontuação, vidas, quantidade/posições e spawn; sem aleatoriedade descontrolada. Rodadas determinísticas e repetíveis, controles esquerda/direita por teclado/toque, pausa e reinício. O jogador não precisa copiar sintaxe longa; todo starter já contém a estrutura da função e só precisa de correções, com ajuda opcional. Não afirmar ganho de aprendizado antes de playtest.

## JavaScript e limites

Editor aceita um subconjunto explícito e válido de JavaScript: function nome(entrada), let/const, números/strings/booleanos/listas numéricas, acesso a entrada.campo, aritmética/comparação/E/OU/negação, atribuição, if/else, return e for finito com incremento e push de lista. Parser/interpretador puro gera diagnósticos e não usa eval/Function no navegador. Sem DOM, imports, fetch, objetos/protótipos, funções livres ou APIs arbitrárias. Até6000caracteres,300nós/depth20,2000operações e64iterações por chamada. Limites fazem parte do modo iniciante, sem alegar compatibilidade com todoJavaScript.

As regras editoriais são comparadas com JavaScript nativo apenas nos testes Node com fontes confiáveis, para verificar semântica do subconjunto. Exportação serializa AST validada para funçõesJavaScript com contador de segurança nos laços; fonte/comentários não são interpolados diretamente em scriptHTML. Jogo exportado usa o mesmo motor/renderização/controles empacotados como playerIIFE, sem rede e sem parser externo. Strings são escapadas; inputs/outputs têm contratos. Licenças e IA acompanham documentação/arquivo exportado.

## Arquitetura e validação

core/code-types/parser/runtime/print: contratos, sintaxe, avaliação limitada, emissão segura. core/arcade-engine: física discreta, eventos e score/vidas/ondas, independenteDOM. content/missions/schema/validate: seis missões, starters, referências, casos públicos e verificações de starterfalha/referênciapassa. scenes/arcade-player: SVG/controles/sessão, reutilizado por app e export. scenes/views/app/export: menus/editor/diagnósticos/progresso/download. core/workshop-save: fontes e aceites versionados/fallback. Reutilizar preferences/shared; retirar circuit-* ativos/testes para manter campanha única, preservando Git/evidência#1.

TDD parser/core antes de implementação; pelo menos15unidades/3integrações/2E2E com cobertura core>=70. Casos de sintaxe/injeção/API/limite/semântica/scopes/for/mutação, colisão/controle/vida/score/pausa/ondas/final, conteúdo inválido, exportoffline. E2E altera textarea por UI, testa erro/correção, campanha, pilotagem final, downloadsemrede, mobile/teclado/foco/persistência. PDF12seções/Esteira/maps/capturas reais, reprodutibilidade/ZIP/hash/scanners/SBOM/CIúltimocommit no mesmoPRdraft. Não executar merge/HML/PRD/tag/finalpackage para simular aceites. Históricos0.4preservados;0.5.0 candidata, semtag.
