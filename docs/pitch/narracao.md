# Narração e legendas correntes — áudio ElevenLabs fornecido

O pitch atual usa exclusivamente `narracao-elevenlabs.mp3`, fornecido por Lucca. A voz anterior do Piper e as legendas antigas não entram na montagem. O texto completo e fluido está em [narracao-elevenlabs.md](narracao-elevenlabs.md).

O MP3 original tem85,968938s; a montagem tem86s, com31ms de preenchimento final e sem alteração da velocidade da fala. Áudio e vídeo têm iníciozero e duração declarada86s. A codificaçãoAAC pode apresentar16ms adicionais no último quadro quando decodificada integralmente; isso está registrado na validação.

As193palavras do roteiro foram confrontadas com a transcrição local. O reconhecedor separou “mini-jogo” e escreveu “5”; agrupamos a grafia de “minijogo” e restauramos “cinco”, sem alterar as falas. Os tempos por palavra foram usados para montar30blocos de legenda. Nenhum texto foi acrescentado à voz.

## Apresentação das legendas

FonteSegoeUIem negrito,52px na tela1920×1080,branca com contorno e sombra escuros. No máximo duas linhas; a maior linha efetiva tem34caracteres. Máxima velocidade de leitura medida18,55caracteres/s. A faixa fica abaixo da captura do jogo, sem esconder editor,objetivos,HUD ou exportação.

[LegendasSRT](pitch-elevenlabs.srt) · [Tempos por palavra e blocos](narracao-sincronia.json) · [Evidências](../evidencias/pitch-elevenlabs-2026-10-16/)

## Verificações

Decodificação integral doMP4sem erros; um único streamdeáudio,AAC48kHz. Comparação doMP3original decodificado com oAACfinal:30/30blocos com deslocamento não detectado na resolução da busca e correlação mínima0,999978; nenhuma amostra saturada. Os timestamps de palavras são estimativas do reconhecimento automático, não uma alegação de alinhamento fonético humano perfeito. As capturas e os quadros renderizados foram inspecionados porIA; não inventamos uma sessão de revisão humana.

A edição acompanha os parágrafos da voz e preserva a velocidade real do jogo. Recapturamos menu,correção e ondas por mais tempo quando necessário. Não usamos congelamento ou aceleração para simular uma partida. A edição anterior continua recuperável noGit.
