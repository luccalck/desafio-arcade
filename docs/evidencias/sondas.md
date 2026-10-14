# Etapa 012 — sondas e contrato de observabilidade

13/10/2026, America/Montevideo. Davi Paes / DaviSouza78, mesma branch do011. Implementação independente preparada depois do contrato011; deploy formal011 ainda é entrada pendente para aceite operacional.

`monitor.yml` tem schedule `*/15 * * * *` e workflow_dispatch. Ativação exige main e `MONITOR_ENABLED=true` em G4; não habilitamos flags. Permissão global contents:read, write apenas no job que persiste dados; não pede issues/pages/id-token. O script usa somente Node24, sem instalar dependências/npm para monitorar. Concurrency serializa amostras. A pipeline inicializa observabilidade se ausente e escreve exclusivamente status/sondas.csv e status/runs/<run>/<tentativa>.json nessa branch. A esteira não inclui observabilidade entre branches de push e o monitor não recebe push; não dispara Pages a cada amostra.

`scripts/sondar.mjs` mede resposta HTTP/corpo em segundos e UTC real. HML consulta version.json direto; raiz segue rollout.activeSha e verifica version.json da release contra esse SHA. Timeout por consulta10s; rede/timeout mantém código/tempo desconhecidos quando a resposta não existe. HTTP503 continua503; JSON/versão/SHA/ponteiro inválidos ficam desconhecidos, com erro explícito. HTTP200 da raiz com erro de versão não é prova de versão saudável. Campos CSV: `data,alvo,codigo,tempo,versao`; valores ausentes escritos como desconhecido/desconhecida, sem latência zero ou uptime100 inventados.

Contrato para016/020: JSON schema1 contém run/runAttempt, formalHml/formalPrd e samples com data, alvo, url, codigo, tempo, versao, sha, versionUrl e erro. Consumidores devem considerar erro além do código e separar flags formais de preview. CSV guarda as cinco colunas exigidas; JSON retém diagnóstico e origem. Alertas/Issues, painel e DORA não foram executados neste par; a compatibilização com o rollout formal018 deve acompanhar eventual alteração do esquema do ponteiro. Não há telemetria/dados de jogadores.

## Provas locais e consultas públicas

Seis testes de integração incluem servidor HTTP sintético com200/503, timeout/rede, carregador/release ativa, JSON/versão/SHA/ponteiro inválidos, histórico/cabeçalho e escapeCSV. O teste inicial falhou por módulo ausente; implementação passou depois. Fixtures ficam somente nos testes, não em status/sondas.csv de dados reais.

Consulta local real ao preview em2026-10-14T02:18:39.733Z (13/10,23:18:39 emMontevideo): HMLHTTP200,0,3394023s, versão0.6.0, SHA71933bfd4bd35f8c3ac8f5899a0e9af00db29f32. Raiz consultada às02:18:40.271Z: HTTP200,0,2054283s, mesmoSHA/versão, resolvido pela release ativa. A raiz ainda é preview, apesar do nome técnico alvo=producao. `formalHml=false/formalPrd=false`; essas consultas não comprovam deploy formal, produção ou workflow_dispatch. Bytes originais CSV/JSON em reports/sondas-preview.*, ignorados; resumo versionado em validacoes-011-012.json.

Schedule opera apenas na branch padrão e pode atrasar/ser descartado sob carga: [GitHub Docs](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule). Para ativar, integrar revisão/CI em main, restaurar main como padrão após integração e habilitar MONITOR_ENABLED em G4. Registrar horários efetivos; não assumir intervalo exato15min.

## Pendências

Executar workflow_dispatch real autorizado, conferir persistência na observabilidade e ausência de deploy; acumular amostras HML/PRD formais; obter revisão deMiguel/CI. A branch de dados será criada pela pipeline, sem inserir fixtures/manual de produção. I08-01/02–08,KIT-06/25/27 seguem abertos enquanto publicação/execução remota não forem comprovadas. I08-30 tem esta documentação do limite, sem alegar relatório técnico final. Nenhuma etapa013 ou alerta016/painel020 foi executada.
