# Pitch — Rota do Código

[Assistir ou baixar o MP4](pitch.mp4) · [Legendas SRT](pitch-elevenlabs.srt) · [Texto da narração](narracao-elevenlabs.md) · [Proveniência](pitch-producao.json)

**Versão atual:86segundos,FullHD,H.264/AAC.** Usa o áudioElevenLabs fornecido porLucca, na velocidade original. A narraçãoPiper e as legendas da edição anterior foram retiradas da montagem corrente.

As legendas são brancas,em negrito,com52px,até duas linhas e34caracteres efetivos porlinha. Trinta blocos acompanham193palavras,confrontadas com a transcrição real doMP3. O texto fica fora da área do jogo. [Sincronização e apresentação](narracao.md).

As cenas mostram a produção realv0.7.0/e9dd28c:problema nos controles,edição/testePython,movimento,colisão,pontuação,repetições,partida final,vitória,exportação eHTMLfuncionando offline. A montagem foi subordinada às falas,sem acelerar o jogo ou a voz. Menus/trechos longos foram recapturados em navegador real. As cartelas de abertura/encerramento são editoriais,não telas simuladas do jogo.

[Fontes e recibos atuais](../evidencias/pitch-elevenlabs-2026-10-16/) preservam o áudio fornecido porhash,gravaçõesWEBM,transcrição/tempos,estiloASS,quadros e validações. A cópia doMP3está em[narracao-elevenlabs.mp3](narracao-elevenlabs.mp3); o original emDownloads não foi alterado. [Captura anterior e histórico](../evidencias/pitch.md).

## Reproduzir a edição

Ferramentas de autoria:Python3,Pillow,FFmpeg/ffprobe; transcrição local opcional comfaster-whisper/numpy e modelo público pinado. Não são dependências do jogador ou do site estático. Na raiz do repositório:

```powershell
python scripts/pitch/editar-elevenlabs.py --capture docs/evidencias/pitch-elevenlabs-2026-10-16 --alignment docs/evidencias/pitch-elevenlabs-2026-10-16/alinhamento-palavras.json --audio docs/pitch/narracao-elevenlabs.mp3 --work .contexto/reedicao-elevenlabs --output .contexto/reedicao-elevenlabs/pitch.mp4
```

O script usa SegoeUI instalada noWindows; nenhumTTFé distribuído. Os vídeos de origem são reais. Versões,fontes ouencoders diferentes podem mudar os bytes da reedição; o manifesto comprova os arquivos entregues.

## Submissão acadêmica

Este vídeo continua vinculado à produçãoe9/v0.7.0filmada. A validaçãoentrada-video.yml exige uma origem globalmenteSUCCESS, enquanto a run que publicou e9tem conclusãofailure. O gate não foi alterado. A candidata final aprovada deverá usar vídeo do mesmoSHA/ZIP; recapturar se a versão mudar. Não declaramos pacote acadêmico completo ou triagem final por existir esteMP4.
