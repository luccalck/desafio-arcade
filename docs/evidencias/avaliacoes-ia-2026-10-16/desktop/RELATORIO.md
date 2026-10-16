# Avaliação exploratória por IA — desktop/teclado

Esta é uma avaliação técnica por um agente de IA com conhecimento prévio de Python, executada em navegador Chrome headless real via Playwright. Não houve participante humano, estudante de outra turma, consentimento de usuário ou medição de aprendizagem. Não substitui o playtest humano exigido.

## Escopo e método

Produção pública `https://luccalck.github.io/desafio-arcade/`, contexto novo, viewport 1440 × 1000, versão visível `v0.7.0 · e9dd28c`. Consulte `sessao.json` para horários UTC, duração, ações e erros. As soluções foram deduzidas exclusivamente do editor, objetivos, ajuda e resultados visíveis na interface; não foram lidos core, testes ou helpers antes/durante a sessão.

Foram exploradas quatro missões, menu, mapa, opções, editor e partida. Houve 65 segundos de teclas alternadas em uma rodada e mais 30 segundos em outra, além das ações de navegação/edição/consulta. Parte da primeira rodada permaneceu na tela de derrota antes do reinício; isso está limitado nas conclusões. Um timeout de automação de 30 segundos ocorreu por tentativa de clicar atrás de um modal de confirmação. Esse intervalo não é evidência de interação ativa nem falha do produto.

## Resultados observados

- Menu apresentou objetivo, cinco missões/projeto final, versão e progresso local.
- Missão 1: código inicial 1/4; ajuda explicou sinais, prioridade e `return`; correção resultou em 4/4 e 100 XP.
- Missão 2: expressão incompleta produziu erro em linha 2. Correção via fórmula da ajuda resultou em 5/5 e 200 XP; jogo pôde ser iniciado, nave respondeu a teclas, ocorreu derrota com 70 pontos e reinício foi possível.
- Missão 3: código inicial 0/5; painel mostrou entrada, esperado e obtido incluindo fronteira. Troca para `<=` concluiu missão e elevou progresso a 300 XP.
- Missão 4: restauração exigiu confirmação explícita; código inicial 0/5. Ajuda explicou acumulado e `+=`; regra corrigida foi testada e partida iniciada. Estado final consta no JSON/screenshot.
- Mapa exibiu três missões concluídas, quarta disponível e demais bloqueadas naquele momento.
- Escape fechou modais. Enter ativou botões focados. Space alterou as duas opções. Tab permaneceu no editor para indentar; Escape e Tab permitiram sair do editor.
- Texto maior e movimento reduzido permaneceram marcados após recarregar a página; 300 XP também persistiram antes da conclusão da quarta missão.
- Não foi encontrado defeito bloqueante reproduzível no escopo explorado. `pageErrors` e a imagem final estão no registro bruto; ausência de erro JavaScript não implica ausência de qualquer defeito.

## Clareza e limites

A ajuda e o feedback esperado/obtido foram suficientes para um agente que já conhece programação resolver os problemas. Isso não demonstra que pessoas leigas compreenderão `entrada["campo"]`, indentação ou função sem auxílio. A ajuda aparece sob `?` e não foi exibida automaticamente; observar descoberta e compreensão por iniciantes permanece uma pergunta para teste humano.

O teclado foi usado com foco dirigido por seletores Playwright em vários controles; isto verifica ativação, não constitui auditoria completa de acessibilidade ou navegação sequencial de toda a aplicação. Não foram concluídas missão 5, projeto final ou exportação nesta sessão; nenhuma afirmação sobre essas partes é derivada deste ensaio. Não foram inventadas pessoas, satisfação, aprendizagem, consentimentos ou aprovação de banca.

## Evidências

- `sessao.json`: ações cronológicas, URL, duração, versão e erros.
- `01-menu.png` a `09-final.png`: screenshots reais; `partida-*.png`: amostras reais da rodada.
- `session.py`: condutor interativo de navegador utilizado; comandos de exploração estão descritos no JSON, sem credenciais.

## Achado P3 — mensagem de fim persiste após reiniciar

Reprodução em produção E9: iniciar missão 2/4, jogar até perder todas as vidas, clicar em **Jogar** novamente. A nave reinicia com três vidas, zero pontos e onda 1; a mensagem abaixo do tabuleiro continua **“A partida acabou. Você pode jogar novamente.”**. Repetir Jogar preservou o aviso. Esperado: limpar/substituir o aviso ao iniciar uma partida ativa. Obtido: aviso desatualizado, embora o jogo reinicie. Evidências: `09-final.png`, `10-reinicio-status-residual.png` e `final_body` em `sessao.json`. Não bloqueia a resolução das missões, mas prejudica clareza e anúncio acessível do estado atual.

A quarta missão foi concluída com **5/5 e 400 XP**. O JSON registra o SHA integral do ponteiro público consultado ao fim, sem consultar código-fonte para resolver os desafios. A sessão durou cerca de quatro minutos; o tempo exato está no JSON, incluindo o timeout de automação explicitamente separado.
