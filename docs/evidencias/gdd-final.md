# Etapa 025 — revisão do GDD e PDF da candidata

Miguel Oliveira, 14/10/2026. Fonte: `docs/gdd.md` na branch deste MD, `package.json` versão 0.6.0, conteúdo/implementação existentes, [revisão 005](gdd-revisao.md), [Stitch 009](stitch-ux.md), [playtest 021](playtest.md), [DORA 024](dora.md), [SQUAD](../../SQUAD.md), [IA](../../AI-USAGE.md) e [terceiros](../../THIRD_PARTY.md). O modelo GDD e HTML/JS originais citados no MD não estavam disponíveis neste computador; a comparação com seus textos integrais permanece pendente. O GDD não é o relatório técnico.

| Seção | Confronto nesta revisão |
|---|---|
| 1. Premissa e problema | Público, regra→efeito e ausência de avaliação humana mantidos; playtest021 segue sem participante. |
| 2. High concept | Um parágrafo, 804 caracteres pelo gerador, dentro do limite de 1000. |
| 3. Gênero/plataforma | WEB estática/responsiva/offline; `package.json`/build e ausência de backend/engine para jogador coerentes. |
| 4. Mecânicas | Cinco funções, 23 casos, vitória 100 pontos/três vidas, 700 XP e AST limitada conferidos com conteúdo/testes existentes; nenhuma mecânica mudou. |
| 5. Enredo/personagens | RDC-01 e arte de projeto identificados como originais assistidos; não são captura de execução. |
| 6. Fluxo | Menu→editor→testar→jogar→final/exportar, pausa e reset descritos com `docs/images/fluxo.svg`. |
| 7. Level design | Seis mapas SVG derivados de `src/content/missions.json`; imagens são desenhos de projeto. |
| 8. UI/UX | Capturas locais reais separadas das seis referências Stitch; links de origem e limitações de acesso preservados. |
| 9. Áudio | Ausente; eventual adição permanece futura. |
| 10. Arte/referências | SVG/CSS próprios e inventário de direitos; revisão coletiva pendente. |
| 11. IA/terceiros | Uso de Codex/Stitch e licenças vinculados a AI-USAGE/THIRD_PARTY; aceite humano pendente. |
| 12. Ideias/próximos passos | Implementado separado do roadmap futuro; rollback/DORA preparados, sem operação formal. |

Identificação: squad, nomes completos, três RAs, papéis e contas vêm de `SQUAD.md`; **RA de Lucca continua vazio**, logo GDD-13 e aceite de identificação permanecem abertos. Links de produção, vídeo e release final não foram preenchidos. Consulta HTTP real em 14/10: raiz e `/hml/` responderam 200; HML `version.json` era 0.6.0/SHA `71933bfd4bd35f8c3ac8f5899a0e9af00db29f32`, anterior à branch; `/status/` respondeu 404. A CI do [PR#21](https://github.com/luccalck/desafio-arcade/pull/21) passou, sem deploy formal. Isso não valida a candidata do MD3 em Pages.

`npm run gdd:pdf` executou com sucesso. O script inseriu a versão de `package.json`, regenerou seis mapas/fluxo/wireframes/esteira/concept sem diff de SVG e validou high concept/12 seções. Os 35 links locais do GDD resolveram para arquivos existentes. `pdfinfo artifacts/GDD.pdf`: 18 páginas A4, 1.383.679 bytes, PDF 1.4, não criptografado e sem JavaScript. SHA-256 local: `EAC009C763F37533755C49312CE375CD330E43DFE5096CD9D00AFD8581FBBE15`. `pdftotext -layout` confirmou revisão025, versão0.6.0, seções/Esteira e roadmap; PyMuPDF encontrou zero blocos de texto fora das páginas. As 18 páginas foram renderizadas e inspecionadas em folha de contato; páginas 1 e 18 também foram vistas individualmente. Um parágrafo isolado na página 19 da primeira renderização foi corrigido ajustando espaçamento no gerador; a versão final tem 18 páginas e não deixa página residual. Esse PDF é **local, ignorado pelo Git**; CI do PR deve gerar e arquivar o próprio artefato. Não se aplica ao GDD o limite de 12 páginas do relatório técnico.

O [PR#22](https://github.com/luccalck/desafio-arcade/pull/22), da conta `miguelsenai2024`, parte do commit `6ac05a3` sobre o MD2. A [CI de push 38517089940](https://github.com/luccalck/desafio-arcade/actions/runs/38517089940) e a [CI do PR 38517115866](https://github.com/luccalck/desafio-arcade/actions/runs/38517115866) concluíram com `success`. Baixei o artefato `build-b4d82dd18c3d4f819d6874db80ba9047eabbcada-38517115866-1` da CI do PR: `artifacts/GDD.pdf` tinha 18 páginas A4, 1.343.113 bytes, PDF 1.4, sem criptografia/JavaScript e com texto extraível de revisão 025 e versão 0.6.0. SHA-256 do PDF arquivado: `3E5371A411FB15233F785BE81854B0714B03A19AE47798621707933A0F2AD9E1`. O SHA `b4d82dd` no nome do artefato é o commit sintético de merge da execução `pull_request`; o HEAD do PR era `6ac05a3`.

Lucas (`6lucassilvaaa`) foi solicitado para revisão do PR. Aprovação efetiva por outro integrante, CI verde do HEAD final, identificação completa e reconferência com tag/metadata após 035 ainda são necessárias antes de fechar I02-09/I02-14 ou declarar PDF final aceito. [Pendências 025](../execucao/05-pendencias-por-passo.md#passo-025).
