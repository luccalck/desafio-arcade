# Narração sincronizada — Rota do Código

Pitch de **79,96 segundos**, com voz sintética em português brasileiro. A demonstração visual é a produção **v0.7.0 / e9dd28c**. A voz não é de um integrante e não foi clonada a partir deles.

## Texto literal e tempos verificados

| Trecho | Entrada do trecho | Fim do trecho de áudio | Limite da janela | Narração |
|---|---:|---:|---:|---|
| 01 / intro | 00:00.300 | 00:03.254 | 00:04.700 | Rota do Código. Aprenda Python criando seu minijogo. |
| 02 / menu | 00:05.200 | 00:08.388 | 00:10.800 | Cinco missões e um desafio final para começar a programar. |
| 03 / falha | 00:11.200 | 00:12.970 | 00:13.600 | Os controles estão invertidos. |
| 04 / falha | 00:14.200 | 00:17.091 | 00:19.800 | Teste a regra. Compare o esperado com o resultado. |
| 05 / correcao | 00:20.400 | 00:22.379 | 00:24.000 | Edite as decisões no código Python. |
| 06 / correcao | 00:24.100 | 00:27.487 | 00:30.200 | Teste novamente. A regra corrigida muda o movimento da nave. |
| 07 / missao-2 | 00:30.760 | 00:32.399 | 00:33.760 | Calcule o movimento da nave. |
| 08 / missao-3 | 00:34.160 | 00:36.539 | 00:37.160 | Compare distâncias para detectar colisões. |
| 09 / missao-4 | 00:37.560 | 00:39.032 | 00:40.560 | Crie a regra de pontuação. |
| 10 / missao-5 | 00:40.960 | 00:43.139 | 00:43.960 | Use repetições para montar uma onda. |
| 11 / final | 00:44.400 | 00:46.878 | 00:48.800 | Reúna as cinco funções no projeto final. |
| 12 / final | 00:49.200 | 00:51.955 | 00:55.600 | Agora, o seu código controla uma partida de verdade. |
| 13 / exportacao | 00:56.200 | 00:57.652 | 00:59.000 | O desafio foi concluído. |
| 14 / exportacao | 00:59.100 | 01:02.034 | 01:03.600 | Exporte suas funções Python e o jogo em HTML. |
| 15 / offline | 01:04.200 | 01:08.480 | 01:10.200 | Abra o HTML exportado sem conexão. O minijogo continua funcionando. |
| 16 / outro | 01:10.800 | 01:12.807 | 01:14.500 | Experimente. Teste. Construa. |
| 17 / outro | 01:15.000 | 01:17.933 | 01:19.600 | Rota do Código. Equipe Aura sessenta e sete. |

## Conferência temporal

As 17 falas foram geradas separadamente, sem aceleração, e inseridas pelo índice de amostra em uma faixa de 48 kHz com 3.838.080 amostras. Todas terminaram dentro da cena correspondente. Os trechos preservam margens externas de até50ms para não cortar ataques/términos. As pausas restantes são intencionais para observar o jogo. Não houve corte de fala ou avanço para a próxima cena.

Áudio AAC e vídeo H.264 começam em 00:00 e têm duração de 79,960000 s. A correlação entre a faixa original e o áudio decodificado do MP4 não detectou deslocamento nos 17 trechos, na resolução de busca utilizada. Os recibos estão em `narracao-sincronia.json` e `../evidencias/narracao-2026-10-16/correlacao-aac.json`. Isso comprova o posicionamento temporal verificado; não substitui a avaliação auditiva de uma pessoa.

As legendas incorporadas e o SRT transcrevem literalmente as falas. Permanecem visíveis até o fim da janela indicada, cobrindo toda a fala. Texto editável em `narracao-roteiro.json`; áudio em `narracao.wav`; MP4 final em `pitch.mp4`.

## Ferramentas e direitos

Síntese local com Piper 1.8.0 e voz pública `pt_BR-faber-medium`, revisão do repositório de vozes `c10ece1aade47bb51c153c893d14e5bf8e5b7117`. O README do repositório de vozes declara MIT, e o model card informa dataset CC0; fonte e hash do modelo estão preservados nas evidências. O modelo e o executável não são distribuídos no jogo. Texto e gravações visuais são do projeto, com assistência IA registrada. Sem música, rosto, voz humana gravada ou fala atribuída aos colegas.
