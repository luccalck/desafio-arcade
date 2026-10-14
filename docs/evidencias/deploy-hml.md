# Etapa 011 — contrato de homologação formal

13/10/2026, America/Montevideo. Responsável: Davi Marcondes Paes de Souza / DaviSouza78, conta confirmada pela integração GitHub. Base de dependência: `e28fb1c243eb2d33ccecf77ee2b8cdc403b7a19e`, branch `docs/ficha-entrega-dados-equipe`; inclui 010 e os roteiros consolidados. Main ainda é bootstrap; a candidata não é base aprovada. Branch do par: `feature/passos-011-012-hml-sondas`.

## Implementação

`scripts/publicar.sh` adapta bash para `scripts/publicar.mjs`. O módulo valida SHA/run, inventário/hash/checksum/versão do pacote com `verifyBundle`; extrai os sete arquivos já construídos para `/hml/`, sem recompilar. Substitui somente a HML; preserva raiz, rollout, releases anteriores e status byte a byte. Não cria release de produção nem troca ponteiro. Saída deve estar vazia e separada das entradas; symlinks são recusados.

`deploy-hml` conserva `needs: [ci, pacote-ci]`, push de main, flag `FORMAL_HML_ENABLED=true`, environment homologacao e concorrência pages-publicacao sem cancelamento. Baixa o pacote do próprio SHA/run/tentativa, recupera gh-pages, grava somente hml/.nojekyll pela identidade do bot e faz deploy Pages explícito da árvore preservada. Nenhum push manual de gh-pages foi feito nesta execução.

Após publicação, executa os projetos hml-desktop/hml-toque do roteiro006. O helper existente espera o SHA por até60s, consultas de até10s, sem retry da suíte. JUnit/HTML/traces e relatórios são arquivados mesmo em falha; deploy-prd continua dependente do sucesso HML e de sua própria flag.

Commits feitos com GITHUB_TOKEN não iniciam builds Pages por branch: [documentação oficial](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Mantemos o mecanismo Actions já usado pelo projeto, agora consumindo uma árvore gh-pages sem promoção da produção. Não alteramos Settings isoladamente. Origem literal gh-pages ou equivalência aprovada pelo professor, permissões/environment Pages e recuperação em execução real continuam pendentes.

`reports/hml-run.json` registrará createdAt do run, término do E2E, SHA/run e duração observada; acima de900s falha. Horário do recebimento do push **não** é igual à data do commit ou createdAt do run: `pushToHmlSeconds` permanece null até prova dessa origem. A medição proxy não fecha I03-21/25.

## Validações locais realizadas

- Dois testes novos, primeiro falhando por módulo ausente e depois verdes: preservação byte a byte de produção/releases/status, substituição da HML, adulteração de ZIP e origem/run incorreta bloqueados. Fixtures explicitamente sintéticas, sem alegar pacote CI real.
- ESLint/TypeScript, actionlint1.7.12 (checksum oficial conferido; ShellCheck não instalado) e git diff --check passaram.
- Suíte local:192testes de unidade/integração e18E2E passaram; core97,90%instruções/95,23%branches/100%funções/linhas. A primeira suíte teve14falhas porque python apontava ao atalho Store. A repetição usou CPython do runtime no PATH e passou, sem mudar/remover testes.
- Build de6missões, PDF18p/A4 conferido por pdfinfo, ZIP28725bytes e reprodutibilidade passaram. Esses artefatos locais identificam a base e28fb1c; não foram publicados nem apresentados como artefato aprovado do novo commit.
- Gitleaks8.30.1 com checksum oficial: varredura local redigida sem achados. Relatórios em reports/ e artefatos locais ignorados pelo Git.

O HTML original em Downloads foi localizado; SHA256 `19362485b3ec9534bdf31303ca0b92b6fe96de21bb87867977d37a7393565275` coincide com a fonte registrada pelo projeto. README, SQUAD, índice, MD integral, GDD, checklist/auditoria, passagem010 e contratos006/007/políticas foram consultados. Os originais externos dos roteiros R04/D05/S03, no caminho C:/dev/studies/.../docs/superpowers/plans/execucao-por-areas, não estão neste clone; sua leitura original permanece pendente. Usamos os contratos preservados nos MDs/evidências, sem alegar acesso aos originais ausentes.

## Aceites pendentes

Revisão de Miguel (`miguelsenai2024`), integração revisada das dependências em main, G0/G1/G2 e validação humana de UX. Só então habilitar/publicar HML formal, observar Pages, HTTP/version/SHA/E2E do artefato correto, comprovar tempo real push→HML e G3. Nenhum check de publicação formal foi fechado nesta preparação. A conexão autenticadaGitHub confirmou push=true, mas create-tree foi recusado403 Resource not accessible by integration; não houve publicação remota. Depois da falha403, CLI autenticado por DaviSouza78; ghapiuser confirmoulogin/id266862169 e acesso push=true. Publicação será pelo Git autenticado, sem contornar proteção. O commit local usa identidade própria conferida; a CI remota não foi executada.
