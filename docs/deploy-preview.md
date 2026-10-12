# Publicação do preview no GitHub Pages

URL publicada e validada pela execução86390e0 (ci-python-pages.md): https://luccalck.github.io/desafio-arcade/ . Site criado em12/10/2026 por solicitação explícita do responsável. Resultado e evidências de implantação são os do job publicar-preview na [Esteira](https://github.com/luccalck/desafio-arcade/actions/workflows/esteira.yml), não inferidos desta configuração. Preview público é diferente de produção formal aprovada para a rubrica.

## Caminho do artefato

Push em feature/primeiro-ciclo → qualidade/segurança/build/E2E → ci verde → publicar-preview. Job exige variable PAGES_PREVIEW_ENABLED=true, evento push e ref exata; PRs/forks não implantam. Usa build.zip e checksum da mesma execução, verifica SHA/versão/tamanho/arquivos e prepara site sem recompilar o jogo.

Pipeline escreve gh-pages com /releases/<sha>/, /hml/, index.html carregador e rollout.json. Releases existentes com conteúdo diferente são recusadas; anteriores permanecem disponíveis. Carregador usa caminhos relativos ao projeto e conserva versão na sessão quando a pasta ainda responde corretamente. HML aponta ao build atual. Pages Actions publica esse mesmo diretório. Regras de preparação em scripts/prepare-pages.mjs, testes de integridade em tests/integration/pages.test.mjs.

Environment github-pages tem policy de branches main e feature/primeiro-ciclo; branch de trabalho foi adicionada para este preview autorizado. Proteção da main/ci/revisão de outro autor mantidas. Workflow tem permissions read por padrão, contents:write/pages:write/id-token:write somente no job que escreve e publica. Configuração não sensível em variable; GITHUB_TOKEN efêmero somente no runner. Não guardar tokens/credenciais no repositório. Actions de Pages/download fixadas por SHA consultado no repositório oficial.

Depois de publicar, playwright.public.config.mjs verifica HTTP/versão da HML e release, cases Python, edição e movimento real; também verifica root→release correta. JUnit/capturas/trace são artefatos preview-<sha>. Inspeção da URL depois dessa execução é obrigatória antes de declarar publicação validada. Main segue bootstrap até revisão humana; fontes completas estão no PR#2.

## Limites e operação

Isso não implementa promoção com aprovação em producao, canário/azul-verde formal, rollback automático/manual ou recuperação medida<5min. Sondas/alertas/status/DORA/tag final/triagem/pacote acadêmico seguem pendentes. Não chamar preview de nota final, entrega concluída ou colaboração do squad. G0 incompleto; preparação/publicação explicitamente autorizada não encerra demais gates.

Reexecução do job de deploy com o mesmo artefato é idempotente. Recompilar o mesmo SHA com data diferente e tentar sobrescrever sua pasta é recusado; reutilize o artefato original ou faça novo commit. Desabilitar a variable impede novas publicações, preservando site existente. Nunca editar gh-pages manualmente. Após merge revisado, planejar produção formal pelos roteiros R/S, mantendo o mesmo artefato.
