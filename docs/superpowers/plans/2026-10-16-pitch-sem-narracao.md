# Pitch de produção sem narração — plano

> Execução: executing-plans; captura e conferência com webapp-testing.

**Objetivo:** MP4 real ≤90s com proposta, conceito, diferencial, gameplay e legendas; registrar confirmações do squad declaradas por Lucca.

**Arquitetura:** scripts Python separados para captura e edição. Fontes reais e logs em contexto local; MP4, legendas, roteiro e manifesto acessíveis no Git. Sem dependências no runtime do jogo.

**Ferramentas:** Playwright Python, Chrome, FFmpeg/ffprobe, Pillow, Git/GitHub CLI.

- [x] Ler HTML INT-10, roteiro, direitos, automação de entrada e produção real.
- [x] Isolar branch docs/pitch-producao a partir de cea6745, preservando PR41.
- [x] Registrar confirmação declarada do squad e fechar apenas checks correspondentes.
- [x] Capturar sessão real, falha/correção, cinco missões, vitória, exportação e arquivo offline; registrar SHA/URL/ações/resultados/arquivos e hashes.
- [x] Editar a narrativa sem áudio, cortes declarados, legendas legíveis e créditos completos.
- [x] Validar MP4 por ffprobe/decodificação, revisar quadros reais, sincronização e duração; conferir proveniência/hashes.
- [x] Atualizar registros/IA/terceiros/checklist/pendências sem declarar pacote completo ou triagem futura.
- [x] Identidade GitHub luccalck conferida, fontes preparadas para Gitleaks/commit/push em branch própria. Conferir os resultados remotos no GitHub e no acompanhamento local após o envio, sem novo commit apenas para registrar sua própria CI; preservar HEAD PR41.
