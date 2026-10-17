# Avaliação técnica independente de acessibilidade por IA

Agente avaliacao_ia_acessibilidade, 16/10/2026. Público observado: https://luccalck.github.io/desafio-arcade/ . Identidade exibida: v0.7.0, e9dd28c (a interface apresenta SHA abreviado; não foi feita validação de bytes nesta sessão).

## Natureza e limites

Esta é uma avaliação técnica automatizada realizada por IA com conhecimento avançado de Python e navegadores. Não representa três minutos de um estudante leigo, pessoa de outra turma, comprovação de aprendizagem, consentimento, playtest humano nem auditoria WCAG completa. Não foram consultados código-fonte, soluções, core ou helpers do jogo. Chromium headless via Python Playwright; viewport 1280 × 900. Não foi usado leitor de tela. A ampliação foi CSS zoom 200%, não zoom nativo do navegador.

## Execuções e integridade

- reconhecimento e scripts curtos descobriram controles pela UI/DOM renderizado.
- O primeiro sessao.py foi interrompido: seletores baseados no texto visual ignoravam aria-label dos botões e causaram timeouts. Isto é falha do script, não defeito do jogo. Não existe JSON final dessa tentativa e sua duração não é somada à complementar.
- complementar.py realizou sessão própria cronometrada, até a etapa final de serialização. A gravação do log completo falhou porque uma ação devolveu objeto Response não serializável; o log em memória foi perdido. sessao-complementar-metadados.json preserva o inventário e timestamps das capturas, não recria ações perdidas. A etapa inicial cobre opções, missões, editor e erro. Após reload, Continuar ficou desabilitado e ciclos seguintes permaneceram principalmente no menu, com Tab/Shift+Tab e tentativas de controles indisponíveis; essas tentativas são registradas como falhas de automação. Não foi completada campanha nem se alega três minutos integralmente dentro de uma missão.
- controles.py e persistencia.py são verificações complementares curtas separadas, não extensão artificial de uma única sessão. Todas as capturas são reais.

## Resultados verificados

1. Link de salto acessível ao início da navegação; acionado pelo script; sem log completo persistido, não se declara resultado de foco desse link.
2. Menus Opções e Missões abriram. Botões de símbolos têm nomes acessíveis úteis: Menu principal, Entender esta missão, Mover nave para esquerda/direita, Pausar ou retomar partida, Restaurar código inicial, Ver situações de teste.
3. Ajuda abriu com foco em Fechar; Escape fechou e devolveu foco a Entender esta missão. Comprovado em controles-semanticos.json e ajuda-real.png.
4. Ver situações de teste abriu a explicação. Sem execução prévia, informa para usar Testar regra, sem resultados fictícios.
5. Restaurar código inicial abriu confirmação explicando escopo da função atual. A confirmação de restauração não foi executada nesta coleta.
6. Regra inicial e Python inválido receberam feedback visível. Não foi avaliada a adequação pedagógica com usuário leigo.
7. Rascunho com comentário persistiu após reload e reentrada por Começar oficina, comprovado em persistencia-reproducao.json. Continuar desabilitado sem missão concluída não implicou perda do rascunho.
8. Ampliação CSS 200% foi capturada; a medição de largura ocorreu em memória e foi perdida com o log; não se declara resultado numérico. Não substitui teste de zoom nativo, contraste, reflow de todos os diálogos ou certificação de acessibilidade.

## Achados

Nenhum defeito do produto foi confirmado neste recorte. O rótulo Continuar desabilitado antes de uma missão concluída enquanto há rascunho salvo pode confundir; considerar em avaliação humana de compreensão. É observação de UX, sem conclusão de erro funcional.

Não se deve marcar como concluído o requisito de playtest humano, consentimento ou participação externa a partir desta avaliação.


Intervalo entre primeira e última captura da execução complementar: 183.702 segundos. Este intervalo é evidência de duração das capturas; as limitações de cobertura e a perda do log acima permanecem.
