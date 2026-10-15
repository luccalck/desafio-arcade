# Passo 007 — Esteira e contrato de artefatos

Revisão de13/10/2026, R02/R03/S02, INT-03/06/05, preparaçãoG2. Reutilizamos build.mjs/package.mjs/prepare-pages.mjs; não alteramos o jogo. Fonte validada: `a2016fd635d55defc79d688958532537e711bf28`, v0.6.0. [PR#9](https://github.com/luccalck/desafio-arcade/pull/9) draft, base temporária006; revisão de outro autor antes do merge pendente.

## Fluxo implementado

Qualidade, segurança, build e E2E continuam paralelos com npm ci/lockfile, cache e ubuntu-latest. Seus relatórios são arquivados mesmo em falha. `pacote-ci` depende dos quatro sucessos e reúne os arquivos daquela execução; `ci` depende também da coleta e recusa estados diferentes de success. Uma coleta quebrada bloqueia ci, não apenas deploy.

```text
qualidade + seguranca + build + e2e
                    → pacote-ci → ci
                    → deploy-hml → deploy-prd
                    → resumo de status no Actions
```

Push de branches curtas/Dependabot e PRs de qualquer base recebem CI; não usamos pull_request_target nem concedemos publicação a PR. Tags continuam validadas pelo build/SemVer; release por tag pertence aos015/035. Checkout não persiste credencial. Global contents:read; somente jobs de publicação têm contents:write/pages:write/id-token:write, restritos por evento/branch/flag e environment. Jobs de publicação compartilham fila pages-publicacao sem cancelamento em andamento.

Deploys preparados: deploy-hml depende de ci/pacote-ci e usa homologacao; deploy-prd depende também do sucesso HML e usa producao. Cada job baixa o mesmo pacote do mesmo SHA/run/tentativa, valida-o e chama script futuro por contrato. Não roda npm run build, conversãoGDD ou empacotamento. npm ci nesses jobs prepara ferramentas de validação, não recompila o jogo.

## Contrato verificável

Artefato `pacote-ci-<sha>-<run_id>-<run_attempt>`, criado pelo job pacote-ci:

```text
build.zip
build.zip.sha256
GDD.pdf
version.json
sbom.cdx.json
ci-manifest.json
reports/qualidade/...
reports/seguranca/...
reports/construcao/...
reports/e2e/...
```

Os cinco artefatos de entrada também incluem SHA/run/tentativa no nome. O download pertence ao run atual, sem token de leitura de outra execução. Reexecutar **todos os jobs** quando precisar de nova tentativa completa; uma reexecução parcial sem todos os artefatos daquela tentativa bloqueia a coleta, em vez de misturar origens.

`ci-bundle.mjs` copia bytes originais, exige ZIP/checksum/PDF/version/SBOM/JUnit/cobertura/scanners/pdfinfo/reprodutibilidade, confere ZIP através do validador Pages existente, rejeita caminhos relativos perigosos/symlinks e não sobrescreve diretório de saída não vazio. O manifesto lista hashes SHA-256 e tamanhos de todos os arquivos, com origem/versão/data; consumidor recusa arquivo extra, ausente, adulterado ou SHA/run divergente. version.json externo precisa ser byte a byte o JSON do ZIP. PDF é validado por pdfinfo no build; o contrato também confere cabeçalho PDF. O inventário não é uma assinatura criptográfica independente do GitHub; confiança de origem depende do workflow/checkout/artefato daquela execução.

## Validações reais

[Resumo de comandos/relatórios e pacote](ci-formal-validacoes.json).

- Antes da implementação, teste de contrato falhou porque o módulo ainda não existia; depois,6cenários passaram (bytes preservados, ausências, checksum/SHA, adulteração, origem/arquivo extra e caminho perigoso). Fixtures são sintéticas; não são PDFs ou evidência de execução acadêmica.
- actionlint1.7.12, distribuição oficial com checksum conferido: exit0. ShellCheck não estava instalado e foi desabilitado nessa execução; não declaramos sua análise. ESLint/TypeScript: exit0.
- Comando real do gate extraído do YAML, com estados sintéticos: success→exit0, failure/skipped→exit1. É validação local do bloqueio, não execução GitHub de falha induzida nem bug real do jogo.
- Clone local novo do commit a2016fd, sem node_modules/dist/reports iniciais: npm ci/lint/test:ci/build/gdd:pdf/package/reproducibility/E2E exit0; pdfinfo exit0, GDD13pA4. Git status final sem alterações rastreadas. Clone temporário ignorado em.contexto/passo-007/clone-limpo, usado somente para QA.
- JUnit do clone:152testes de unidade +32integrações (184total),17E2E; zero falhas/erros/ignorados. Os6novos testes são de integração do contrato, não inflaram cobertura do core.
- [CI38428808065](https://github.com/luccalck/desafio-arcade/actions/runs/38428808065):SUCCESS em qualidade/segurança/build/E2E/pacote-ci/ci/notificar. Publicar-preview/deploy-hml/deploy-prd ignorados, sem implantação.
- Baixamos o pacote real e executamos verify:83arquivos, origem a2016fd/run38428808065, ZIP26485bytes, checksum `17c4fa92eb2888202979a287cd2023a86916315d9392200f10c24c8f6f043e00`. Nenhuma reconstrução ao coletar/validar esse pacote.

Logs/red/green/relatórios/clone/pacote baixado estão em.contexto/passo-007, ignorado; CI conserva artefatos. A cópia de QA e validação local não é pacote manual de submissão. OriginaisHTML/DOCX preservados, fontes e regras detalhadas dos roteiros considerados.

## Actions e compatibilidade

[Inventário verificado por releases, refs e action.yml oficiais](actions-versoes-007.json): checkout7.0.1, setup-node7.1.0, upload-artifact7.0.2, download-artifact8.0.2, configure-pages6.0.0, upload-pages-artifact5.0.0, deploy-pages5.0.1. Todas fixadas por SHA40hex; runtimesnode24/composite compatíveis com runner hospedado. [Release oficial setup-node](https://github.com/actions/setup-node/releases/tag/v7.1.0), [checkout](https://github.com/actions/checkout), [upload-artifact](https://github.com/actions/upload-artifact) fundamentam essa revisão. CI comprovou checkout/setup/upload/download atuais; Actions de Pages tiveram configuração/runtime revisados, mas não foram executadas neste007. Sua execução fica para011.

## Avisos e publicação futura

Job notificar sempre registra tabela de jobs, SHA/run/tentativa e nome de artefato no GITHUB_STEP_SUMMARY e log do Actions, distinguindo falha, sucesso e deploy ignorado. Job executou com SUCCESS e seu log foi conferido. Não enviamos mensagens externas. Recebimento/consulta pelo squad ainda não comprovado; I03-24 permanece aberto. Se quiser canal externo, precisa de autorização real e configuração secrets adequada.

Flags FORMAL_HML_ENABLED/FORMAL_PRD_ENABLED não estão configuradas; condição aceita somente string true e pushmain. SITE_URL existente foi consultada. Não as habilitamos antes dos scripts e aceites reais. Contratos para011/019:

```sh
bash scripts/publicar.sh --bundle pacote-ci --sha "$SOURCE_SHA" --run "$SOURCE_RUN" --site-url "$SITE_URL"
bash scripts/promover.sh --bundle pacote-ci --sha "$SOURCE_SHA" --run "$SOURCE_RUN" --site-url "$SITE_URL"
```

011 deve implementar publicação somenteHML preservando loader/releases/status, migração Pages/origemgh-pages, espera/regressão dos dois projetos006 e evidências/tempo real.019 deve integrar promoção do mesmo artefato, environment/aprovação, estratégia018, smoke014, rollback022/023 e provas. Não reutilizar o prepare-pages de preview como promotor formal: ele atualiza também ponteiro/release. Script ausente falha quando flag habilitada; não há job echo que declare entrega concluída.

KIT-09 fechado pela revisão/pins/compatibilidade registrada. KIT-08 continua parcial: publicação formal/rollout/DORA/triagem dependem de011/018/024/031/032/035. I03-09/15–19/21/24 e gates finais continuam abertos; clone/CI verde não comprova deploy, revisão humana, recuperação, prazo ou recebimento. Main permanece protegida. Branch padrão atualizada para007 após CIverde para rastreamento; não houve merge. [Pendências por passo](../execucao/05-pendencias-por-passo.md).
