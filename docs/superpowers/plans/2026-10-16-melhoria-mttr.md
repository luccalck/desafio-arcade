# Melhoria de MTTR no ensaio — plano de execução

Escopo autorizado por Lucca: melhoria DORA e preparação do PR41 para validação por outro integrante. Seguimos o desenho já aprovado de ensaio isolado: sem indisponibilidade pública, alteração de proteção ou mistura entre incidente operacional e ensaio. Trata-se de correção do custo repetido de metadados no adaptador existente, sem nova estratégia de rollout ou de falha.

**Objetivo:** retirar consultas redundantes da reconciliação de alertas e observar o efeito no tempo real de recuperação do ensaio. Não prometer redução antes da medição nem alterar o DORA histórico para obtê-la.

**Baseline:** run38950333359,Issues43/44,abertura→fechamento2s/4s,média3s. Seis fases executam ensureLabel(alerta/ensaio):12consultas de metadados, inclusive antes de fechar cada Issue. Requisições de listagem/criação/fechamento continuam necessárias.

**Decisão técnica:** guardar por instância do adaptador apenas labels confirmadas por GET ou criação bem-sucedida. O processo dura uma única execução. Falhas não entram no cache; instâncias novas revalidam. Não guardar listagens de Issues, medições HTTP ou recuperações presumidas. Alternativa considerada: paralelizar as consultas de labels em cada fase; manteria12requisições e maior pressão na API. Escolhemos retirar o trabalho repetido. Preservamos o atraso real2,2s,os marcadores e o isolamentoDORA.

- [x] Reproduzir desperdício com teste que conta chamadas reais ao adaptador usando fetch controlado:seis fases/duaslabels,esperado2GETs.
- [x] Cobrir falha503 seguida de sucesso,criação após404,erro de criação,instâncias independentes e rótulo inválido; não usar segredo real.
- [x] Implementar cache de confirmações; executar suítes focais e lint.
- [ ] Commit/push com identidadeLucca confirmada e Gitleaks; aguardarCI no HEAD.
- [ ] Executar um novo ensaioHTTP/GitHub pelo workflow existente, sem deploy; preservar resultado favorável ou desfavorável, sem repetir para escolher o melhor.
- [ ] Comparar timestamps e chamadas antes/depois. Reportar escopo,arredondamento de segundos e variação entre runners; não afirmar ganho causal sustentado ou alteração doMTTR operacional sem incidente.
- [ ] Atualizar evidências/checks/relatório/pendências e CI documental; preparar prompt com HEAD exato para Davi/Miguel/Lucas revisar o diff completo e aprovar somente após conferência humana própria.

A melhoria de metadados alcança toda reconciliação que reutiliza a mesma instância. No monitor normal, hoje há uma única reconciliação por processo: não alegar redução de chamadas desse fluxo sem medição correspondente. O efeito operacional após integração depende de novo evento real; o ensaio continua identificado separadamente.
