# Etapa 015 — releases por tag e artefato único

Davi Paes / DaviSouza78. Preparação iniciada em13/10/2026 (America/Montevideo), base8ae86cc/MD2. Dependências007/010 técnicas disponíveis; HML formal011, integração emmain, políticas e revisão humana permanecem pendentes.

## Contrato preparado

Tags vX.Y.Z já disparam a esteira. `scripts/release.mjs provenance`, no jobqualidade, recusa tag leve, versão diferente de package.json, checkout/tag/SHA incoerentes, tag remota movida, commit fora deorigin/main, main semproteção e ausência de PR integrado emmain com aprovação de outro autor noHEAD revisado. APIs e Git reais são usados peloCLI; testes comprovas sintéticas não constituem aprovação real. Falha bloqueia ci antes da publicação.

CondiçõesHML/PRD aceitam main e tagsv, sempre dependentes de ci e suas flags. Uma execução de tag constrói um pacote porSHA/run/tentativa, consumido porHML ePRD semrebuild. Jobrelease só segue após deploy-prd bem-sucedido (que exigeHML e environmentproducao), tag autorizada e FORMAL_RELEASE_ENABLED=true. Revalida a proveniência antes de escrever. Não cria tags, não muda ponteiroPages e não altera policies deambientes.

`planRelease` valida o pacote comci-bundle, versão/data/SHA/checksum e exige hash exato das notas revisadas emRELEASE_NOTES_SHA256. Anexa build.zip, build.zip.sha256, sbom.cdx.json, GDD.pdf e release-manifest.json comorigem/hashes/notas. Nenhuma construção no publicador. Notas emdocs/notas-versao.md são proposta: revisão humana/hash ainda ausentes.

Publicação prepara draft, compara todos os anexos existentes antes de escrever e não usa sobrescrita/clobber. Mesmo tag/bytes/notas pode repetir semescrita; divergência, assets extras/duplicados ou release publicada incompleta bloqueiam. Retomada de draft pode enviar anexos faltantes; publicação ocorre somente após todos os anexos. GitHub Release não é pastaPages: a imutabilidade do diretório deprodução ainda exige prova019/027/035.

## Compatibilidade pendente de ambiente

A API atual mostra main protegida ainda emc04b8fa e environments formais configurados apenas para main. Código aceitando tags não altera essas políticas. Plataforma/Miguel e responsável pelo repositório precisam revisarPR e coordenar regras para somente as tags necessárias, mantendo reviewerobrigatório e sembypass. Não ampliamos permissões deconta, não removemos aprovação, não habilitamos flags e não alteramos Settings. A equivalênciaPagesActions/origemgh-pages também continua pendente.

Na conferência inicial, git tag e gh release list não retornaram tags/releases. v0.1.0 histórica continua semcomprovação: responsável/professor orientam regularização semretroagirdata. v1.0.0 só na035, depois de todas as entradas reais. Nenhuma tag/release de teste foi publicada para fabricar evidência.

## Validações e limites

Quatro testes de integração inicialmente falharam por módulo ausente e depois passaram: tag/proveniência/SemVer, inventário/hash/notas, publicação idempotente e bloqueio de sobrescrita/incompletude. Fixtures PDF/ZIP/provas são explicitamente sintéticas. Actionlint passou semShellCheck. Publicação/API de anexo/ambiente por tag ainda não executados; checksI01-10/I05-09/I06-07–12/I07-06 continuam abertos até prova real.

Fontes comuns doMD3 completo, índice/SQUAD/README/GDD/checklist/auditoria/AI-USAGE/THIRD_PARTY/SECURITY/repasse010 e contratos007/011/014 foram consultados nesta continuidade. HTML eJavaScript originais lidos/preservados noMD1; originais externosR05/R02/S03 não disponíveis, sem alegar acesso. Pendências separadas015/016 no registro único.

Validação adicional em14/10: teste com respostasGit/API sintéticas comprovou aprovação de outro autor noHEAD integrado e recusa de autoaprovação, revisão emHEAD antigo, voto posteriorCHANGES_REQUESTED ouDISMISSED. O publicador também rebaixa/reconfere os anexos do draft antes de publicá-lo; corrupção deupload bloqueia publicação. Isso não é validação de uma tag/approval real. Lint/build/actionlint passaram; suíte completa203testes antes desse caso adicional,10focais depois. CI consolidada doHEAD será conferida após publicação.
