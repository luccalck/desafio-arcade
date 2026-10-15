# Primeira CI real — 07/10/2026

Fonte: commit de branch `e6d4ad6ebdd19249b744fc0415725dc9a0ab9b35`, PR draft [#2](https://github.com/luccalck/desafio-arcade/pull/2).

- [Push](https://github.com/luccalck/desafio-arcade/actions/runs/37619899434): success.
- [Pull request](https://github.com/luccalck/desafio-arcade/actions/runs/37619977719): success; iniciado 07/10/2026 12:17:48 UTC, encerrado 12:18:33 UTC. Esse intervalo é duração de CI, **não push→HML**.
- Checkout limpo em ubuntu-latest, npm ci pelo lockfile; qualidade, seguranca, build, e2e e agregado ci passaram.
- 25 unidades +7 integrações; 7 E2E, incluindo arquivo offline e teclado. Core: 98,52% de instruções, 98,24% de branches, 100% de funções/linhas.
- Gitleaks JSON `[]`; audit de produção: zero vulnerabilidades; SBOM CycloneDX gerado.
- PDF gerado no Linux/Chrome: 8 páginas A4, 102.684 bytes, pdfinfo válido; todas as páginas renderizadas e inspecionadas localmente após download.
- build.zip: 13.595 bytes, SHA-256 `3275280dba39e0d707ef538daab57750c833a28478fc0ff0429f640b1a0e53af`, conferido contra checksum baixado.

O artefato de PR usa o SHA do merge de teste do GitHub `fb3e59379d52171c99ec895353bc8e2ea3951eab`, registrado em version.json. Ele não é uma release pública. Datas, hashes e métricas acima pertencem à execução vinculada; mudanças posteriores exigem sua própria CI.

Configurações reais consultadas pela API: main exige ci estrito, uma aprovação, aprovação após último push, resolução de conversas e aplicação a admins; force push e exclusão desativados. PR tem REVIEW_REQUIRED/BLOCKED, sem aprovação simulada. Environments homologacao e producao criados; producao exige revisão da conta real luccalck. Nenhum deployment ou aprovação de produção aconteceu.

R03 ainda requer demonstração de check falhando bloquear merge; a falha real de foco foi reproduzida localmente. R04/R05 e G3–G8 permanecem sem execução. Artefatos/relatórios da CI são as fontes primárias, não as imagens de projeto do GDD.
