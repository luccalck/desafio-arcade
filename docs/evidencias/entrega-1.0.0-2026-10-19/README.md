# Entrega 1.0.0 — evidências de 19/10/2026

Produto congelado: be281493c7699468f991a2333df074ec76691b3d. Horários das fontes em UTC; 20/10,00h corresponde a19/10,21h em Brasília.

- Main39346940628/1 SUCCESS:325testes,37E2E,HML4/4 em173,519s,PRD aprovada porluccalck,smoke/monitor.
- Tag anotadav1.0.0, run39348283211/1; HML200,367s.
- ZIP30.469bytes, SHA-256bbb63fde0a8808e7b9765b76fd5900b955534d5e6083202d0a1cfe85c27f5b9d; igual na main, na tag, emHML ePRD. Bundle173arquivos verificado.
- Pitch86s/FullHD/H264/AAC, entrada-video39348162168/1 SUCCESS, asset657824292. SHA643425bde35e1da9ed594a54e05b3d63ff637f7fada446798d58f9fad72c5c90. Captura real porIA, sem alegar playtest humano.
- Revisão final dispensada explicitamente pelo proprietário; integracao-excepcional.json preserva humanApproved:false e política restaurada. Não atribuir APPROVE a integrante.
- Prazo antigo mantido e relógio real; conferir resultado efetivo da triagem na execução da tag. Não transformar auditoria técnica em aceite temporal.

## Fontes e reprodução

Recibosmain/tag são cópias dos artefatos originais. PNGs/WEBMs vieram do navegador; captura.json registra ações, erros e hashes publicados. As cartelas editoriais do pitch não são telas simuladas de execução. O JSON de captura usa caminhos locais relativos aos arquivos versionados. O áudio fornecido e seu alinhamento continuam documentados emdocs/pitch e no conjunto históricoElevenLabs.

```powershell
python scripts/pitch/editar-elevenlabs.py --capture docs/evidencias/entrega-1.0.0-2026-10-19 --alignment docs/evidencias/pitch-elevenlabs-2026-10-16/alinhamento-palavras.json --audio docs/pitch/narracao-elevenlabs.mp3 --work .contexto/reedicao-1.0.0 --output .contexto/reedicao-1.0.0/pitch.mp4
```

Mudança de encoder/fonte pode alterar os bytes de uma reedição. O vídeo entregue é identificado pelo hash validado, não por igualdade presumida de reexecuções futuras. Pacote acadêmico deve ser recuperado da pipeline, sem montagem manual.

## Resultado da entrega

Releasev1.0.0 publicada com seisassets públicos conferidos. Pacote originalActions:artefato12231549745,6.712.350bytes,SHA-2561c3d83df20426005fd17e4c4361f71b7b91c7873bfa26540ae767cede62eac98. Cópia pública permanente emdocs/entrega/1.0.0/submissao.zip. A triagem formalREPROVOU o prazo antigo mantido. Auditoria técnica posterior passou emmodo vigilância,sem aprovar prazo. Logoriginalsubmissao-job preservado; reports/ausente e captura destderr corrigidos no workflow posterior.
