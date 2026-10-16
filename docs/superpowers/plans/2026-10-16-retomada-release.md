# Plano de correção e retomada da Release

1. Preservar falhas e draft, reproduzir consulta por tag em teste. Concluído:1falha/5passes.
2. Corrigir consulta autenticada e revalidação porID, manter integridade. Concluído:8focais/314totais; leituraAPIreal.
3. Implementado validador/workflow protegido:12testes focais e318totais; actionlint/lint verdes; origem real validada somente em leitura. Execução do workflow ainda pendente.
4. Atualizar relatório10p/checklist/GDD/ficha/pendências e manifesto bruto; CI e PR revisável.
5. Após aprovação externa, suspender FORMAL_PRD_ENABLED antes do merge e aguardar a run da main terminar HML com PRD skipped intencionalmente, preservando produçãoe9. Reativar a flag e executar retomada pela main; aprovação producao, comparar anexos públicos e recibo. Não executar código não revisado em escrita.
6. Atualizar relatório com resultado da retomada e manter pitch, playtest humano, TXT, triagemfinal, AVA/banca pendentes.

O grupo de concorrência da retomada é release-refs/tags/<tag>, igual ao jobrelease original, impedindo duas escritas simultâneas no mesmo draft. A checagem da versão pública bloqueia a retomada caso outra produção tenha substituído oSHAoriginal; não fazer downgrade silencioso.
