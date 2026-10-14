# Etapa 027 — integridade da candidata e limite de promoção

Miguel Oliveira, 14/10/2026. Preflight no clone e na branch `feature/passos-027-028-integridade-melhoria`, iniciado sobre o HEAD `92757b6dbe3d825aebbd6ef6a12b1924b8af320b` do MD3. A validação local não equivale a release ou produção formal.

## Candidata local reproduzível

Ambiente observado: Node `v24.19.0`, npm `11.17.0`; `node_modules` já estava presente. `npm run reproducibility` passou: duas builds do mesmo checkout tiveram os mesmos hashes, normalizando somente `dist/version.json.build`, e o script restaurou a build normal ao final. `npm run package` passou e conferiu os bytes das sete entradas após descompactação. `artifacts/build.zip` ficou com **29.022 bytes**, SHA-256 `eccc278dfd4230757414154b4c018ab04dbe0e311ec3066d81cb45d2a2da411d`, abaixo de 25 MB. `dist/version.json` declara versão `0.6.0` e SHA de fonte `92757b6dbe3d825aebbd6ef6a12b1924b8af320b`. O build contém index, JS, CSS, versão, LEIA-ME e avisos/licenças; a verificação do empacotador confirma a igualdade byte a byte das entradas.

Este pacote é prova de reprodutibilidade local para o SHA acima. A alteração documental desta etapa produzirá outro SHA; por isso, não o chamamos de artefato final imutável do PR ou de release.

## Conferência remota, sem promoção

Em 14/10/2026, a API do repositório informou default branch `docs/ficha-entrega-dados-equipe`, zero deployments com environment `producao` e zero GitHub Releases. As únicas Actions variables listadas eram `PAGES_PREVIEW_ENABLED` e `SITE_URL`; não estavam configuradas as flags formais de HML/PRD/monitor/alertas. A raiz pública e `/hml/` responderam HTTP 200; `/status/` respondeu 404. O `hml/version.json` público declara `0.6.0`, SHA `71933bfd4bd35f8c3ac8f5899a0e9af00db29f32`, anterior ao checkout. O PR#22 do MD3 está aberto e sem reviews; a cadeia não foi aprovada/integrada na `main`.

Não existe hash de ZIP HML/PRD formal ou release publicada para comparação com o pacote local. A versão de `package.json` permanece `0.6.0`. Não criei tag `v1.0.0`, não declarei candidata formal, não comparei bytes de ambientes diferentes e não publiquei nada. O MD condiciona a candidata 1.0.0 à aprovação de PR/CI/HML/PRD; essa entrada não está disponível.

## Pendências

As dependências de aprovação, ambientes, pacote promovido e release estão discriminadas em [Passo 027](../execucao/05-pendencias-por-passo.md#passo-027). I06-14 e I06-16 foram revalidados localmente para o SHA registrado; I06-15 e I06-17 permanecem abertos até comparação e reconferência da release real. [Controle](../execucao/03-controle-execucao.md) e checklist mantêm a distinção entre evidência local e promoção formal.
