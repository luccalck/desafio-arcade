# Pitch — Rota do Código

[Assistir ou baixar o MP4](pitch.mp4) · [Legendas SRT](pitch-legendas.srt) · [Proveniência e montagem](pitch-producao.json) · [Roteiro da narração](narracao.md) · [Áudio WAV](narracao.wav)

Pitch com voz sintética em português brasileiro, sem música, com **79,96 segundos**, resolução 1920×1080 e vídeo H.264 a 25 fps. Mostra o conceito, o teste de uma regra incorreta, a edição de Python, cinco missões, o projeto final com vitória, a exportação de funções e o HTML exportado funcionando offline. As legendas incorporadas transcrevem as17falas; oSRT é complementar. O áudioAAC tem a mesma duração e início do vídeo. [Recibo temporal](narracao-sincronia.json). A [versão silenciosa original](pitch-sem-narracao.mp4) foi preservada.

Gravamos a produção pública **v0.7.0 / e9dd28c** com Playwright e Chrome, sem alterar DOM, regras, progresso ou relógio do jogo. O piloto automatizado usa eventos de teclado do navegador. Os cortes são declarados e não aceleram a simulação. Abertura e encerramento são cartelas editoriais. A gravação não é um playtest humano.

As [fontes originais e os recibos](../evidencias/pitch-2026-10-16/) preservam as gravações WEBM, os arquivos exportados, as ações, os quadros e as verificações. Veja o [registro técnico](../evidencias/pitch.md). Não usamos rostos, voz humana gravada, trilha, marcas externas ou depoimentos. A voz públicaPiper/faber não representa integrante do squad.

## Reproduzir a edição

Ferramentas de autoria: Python 3, Pillow, Playwright com Chrome e FFmpeg/ffprobe no PATH. Elas não são dependências do jogador nem da build estática. Na raiz do repositório:

```powershell
python scripts/pitch/editar.py --capture docs/evidencias/pitch-2026-10-16 --output .contexto/pitch-reeditado
```

A edição acima reproduz a fonte silenciosa. A narração é montada por `scripts/pitch/narrar.py`, com o roteiroJSON, Piper1.8.0 e modelo `pt_BR-faber-medium`; fonte/revisão/hash estão em `../evidencias/narracao-2026-10-16/origem-modelo.json`. O modelo fica fora da build e doGit.

O script usa Segoe UI instalada no Windows. Não redistribuímos arquivos de fonte. Versões, fontes e plataformas podem mudar os bytes da reedição; o manifesto comprova o arquivo entregue, sem prometer renderização idêntica em outra máquina.

Para outra candidata aprovada e publicada, consulte `python scripts/pitch/capturar.py --help`, forneça seu SHA e ZIP originais e aguarde a conclusão real da sessão antes de editar. Não atribua o vídeo da v0.7.0 a outro SHA.

## Vínculo com a submissão

O arquivo existe e foi validado tecnicamente. A `entrada-video.yml` ainda não foi executada: a run que publicou e9 (`38852413982/2`) tem conclusão global `failure`, enquanto a validação exige `SUCCESS`. Esse gate foi preservado.

Após publicar a candidata final aprovada, refaça a captura se o SHA mudar e vincule o vídeo à origem correspondente antes da tag e do pacote. Este diretório não comprova triagem, pacote acadêmico completo ou revisão humana do vídeo.


## Sincronização conferida

As17falas foram posicionadas por amostras a48kHz, sem aceleração ou corte e sem atravessar a cena correspondente. A comparação entre oWAVoriginal e oAACdecodificado não detectou deslocamento nos17trechos, na resolução da busca. As janelas doMDnão são uma transcrição de leitura humana. A inspeção auditiva humana não foi declarada; o arquivo está disponível para avaliação.
