# Avaliação técnica por IA — toque

**Natureza:** exploração real do navegador por agente de IA com conhecimento prévio de programação. Não é playtest humano, estudante de outra turma ou comprovação de aprendizagem.

- Sessão principal: 16/10/2026, 18:26:36.748–18:29:47.325 UTC (15:26:36–15:29:47 em São Paulo), **190,578 segundos**.
- Chrome headless via Python Playwright, viewport 390 × 844, is_mobile e has_touch habilitados.
- Entrada pública: https://luccalck.github.io/desafio-arcade/
- Release observada: v0.7.0, SHA e9dd28ccee535e9b1259a710742482e44db47aed.
- 31 ações de UI após navegação, com capturas reais e horários em session.json; sem leitura de testes/helpers/core ou soluções do projeto.

## Execução e resultados

1. Menu → Começar oficina → ajuda da missão 1: telas disponíveis por toque e instrução direta sobre direção e prioridade.
2. Testar regra inicial: 1/4 situações corretas. Ver testes mostrou valores esperados/obtidos para esquerda/direita/ambas. Isto é erro intencional da atividade, não defeito da aplicação.
3. Edição no textarea da função controlar, usando somente instrução e código visível da UI: 4/4, 100 XP, botão Próxima missão disponível.
4. Jogar, seta esquerda e pausa acionados. Os comandos foram recebidos; esta exploração não mediu deslocamento pixel a pixel ou comportamento de toque mantido.
5. Próxima missão e ajuda de movimento: expressão posicao + direcao * velocidade passou 5/5 e chegou a 200 XP.
6. Voltar ao menu → Opções: Texto maior e Movimento reduzido selecionados sem erro. Continuar abriu missão 3, preservando progresso.
7. Código com ausência proposital de dois-pontos: feedback “Linha 1: Esperado ‘:’; encontrado ‘fim da linha’.” Sem exceção de página.
8. Restaurar função exigiu confirmação; confirmou e devolveu atividade inicial. Teste voltou ao comportamento da missão; nenhuma remoção das duas missões já concluídas observada.
9. Mapa mostrou missões 1/2 concluídas, 3 disponível, 4/5/projeto bloqueados. Reabrir missão 1 e testar preservou 4/4 e 200 XP, sem XP duplicado observado.
10. Nos estados inspecionados, não houve overflow horizontal em 390 px. Capturas reais foram examinadas; menus, ajuda e confirmação ficaram utilizáveis. Nenhuma pageerror na sessão.

## Achados e limites

**Nenhum bug funcional bloqueante reproduzido nesta sessão.** A ajuda usa vocabulário como dicionário/indentação; a adequação a leigos é hipótese de usabilidade para pesquisa humana, não resultado medido. O editor exige digitação de código e fica abaixo da área inicial no celular; rolagem é necessária e funcionou pela navegação do Playwright. Não houve teste de teclado virtual físico, leitores de tela ou aprendizagem humana.

Primeira tentativa separada, em tooling-first-attempt.json, teve seletores de fechamento por nome acessível incorretos e espera da ferramenta. O harness passou a localizar botão pelo texto visível. Não classifiquei a falha de seletor como defeito do jogo. Ela não foi somada aos 190,578 segundos da sessão principal. Não houve alteração do jogo, commit, review, merge, Issue ou deploy.

Os intervalos entre ações correspondem à inspeção de estado/captura e decisão do agente. Não houve sleep artificial de três minutos para fabricar duração. O polling do canal de comandos aguardou a próxima ação a cada 250 ms.

## Evidências

- session.py: harness executado, não parte do produto.
- session.json: horário, duração monotônica, identidade técnica, URL/SHA e ações.
- tooling-first-attempt.json: tentativa inicial e erros da ferramenta preservados.
- 01-menu.png; 04-inicio.png; 05-ajuda.png; 07-regra-inicial-reprovada.png; 08-testes.png; 11-sucesso.png; 19-mover-sucesso.png; 27-feedback-sintaxe.png; 28-restaurar.png; 32-mapa-progresso.png; 34-preservacao-confirmada.png.
- state.json: último estado observado, não histórico completo.

**Conclusão de escopo:** avaliação técnica independente por IA concluída. Requisito específico de playtest humano de outra turma permanece não demonstrado por esta execução.
