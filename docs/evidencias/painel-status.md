# Painel de disponibilidade e DORA — 020

14/10/2026, DaviSouza78. Painel implementado em pages/status/index.html/status.mjs, entregue por prepare-pages/rollout019 junto da árvore preservada. Não existe publicação formal deste painel neste momento: consulta real de14/10 às03:52UTC a https://luccalck.github.io/desafio-arcade/status/ retornou **HTTP404**. A API da branch observabilidade também retornou404; o coletor scripts/status.mjs exibiu métricas indisponíveis, sem uptime/latência/DORA fictícios. Resultado real arquivado em validacoes-019-020.json. Não preencher FIC-10 como entrega comprovada antes de HTTP200/renderização da URL publicada.

## Leitura pública e atualização

O navegador resolve uma vez o SHA da branch observabilidade pela API pública de refs. Lê sondas.csv, ultima.json e dora.json em raw.githubusercontent.com **nesse mesmo commit**, evitando mistura de versões da branch. Lê rollout.json na própria origem Pages. Nunca envia token, cookies de autenticação, dados de jogador ou credenciais. Não há backend ou serviço pago. Falha/404/rate limit/CORS/rede deixam causa explícita e botão para nova tentativa; não há polling automático no navegador.

monitor.yml acumula CSV, snapshot ultima.json e JSON por run/attempt somente na observabilidade. Isso não dispara Pages: gatilhos formais da esteira seguem main/tags. O HTML/JS estático é atualizado quando a pipeline publica o site; cada consulta do painel lê a branch de dados sem novo deploy. Job monitor-pos-producao solicita o monitor separado após sucesso/recuperação verificada, sem afirmar que dispatch sozinho prova amostras. Flags e integração ainda ausentes.

Disponibilidade: proporção HTTP200 entre códigos conhecidos nas últimas24h; informa contagens e desconhecidos, sem chamar amostragem de SLA contínuo. Latência: média dos tempos medidos, incluindo respostas de erro; falha sem tempo não recebe zero. Período e última amostra em UTC visíveis. Sem coleta há valornull/Indisponível. Com mais de30min sem amostras, estado atual é desconhecido e agregados são identificados como históricos. CSV vazio com cabeçalho é válido sem métricas; CSV malformado, data futura, duplicata contraditória ou cabeçalho errado bloqueiam agregados com causa legível. Limite de leitura:2MiB; se ultrapassado, equipe deve compactar/particionar histórico com contrato explícito.

Versão só aparece com snapshot schema1/formalPrd=true, amostra de produção fresca HTTP200/erro=null, mesmo timestamp/código/tempo/versão do CSV e SHA correspondente a estavel do rollout formal. Preview não é produção formal. Rollout informa azul-verde, candidata e percentual0; não simula distribuição canário. O painel não concede G4 por exibir um número.

## Contrato entregue para Miguel/024

Sem necessidade de mudar o painel:024 grava `status/dora.json` na observabilidade, na mesma transação de dados quando possível. Estrutura schema1, generatedAt ISO, period.from/period.to ISO e metrics com as chaves abaixo. Cada métrica contém value (number ou null), unit, samples (contagem real), source (URL HTTPS GitHub/API/raw da evidência), reason (motivo quando indisponível). Não há mínimo inventado de dez execuções. Zero só aparece se existe amostragem>0 e origem verificável; ausência de dados usa null e motivo.

| Chave | Unidade exata | Significado / responsabilidade024 |
|---|---|---|
| deploymentFrequency | deploys/dia | Implantações formais bem-sucedidas por período; não contar CI/preview como produção |
| leadTime | horas | Mudança até implantação, com definição e eventos rastreáveis |
| changeFailureRate | % | Mudanças formais com falha sobre conjunto observado; intervalo0–100 |
| mttr | minutos | Recuperação observada de incidentes; sem incidente medido, indisponível |

O painel exige generatedAt e fim do período não futuros e recentes (até24h), início anterior ao fim, valor finito não negativo, unidade exata, samples>0 e origem GitHub HTTPS. Cada métrica falha separadamente; não transforma script ausente em zero. A definição/fórmulas/eventos e validação humana são de024; este passo não inventou valores DORA.

## Validações e limites

Testes de CSV vazio/malformado/desconhecido, janela/atraso/falha, vínculo de versão, DORA com origem/ausência e leitura por SHA foram executados. E2E serve **os arquivos reais do painel em HTTP local**, com fontes sintéticas explicitamente identificadas: ausência404, indicadores com fixtures, texto malicioso como texto, teclado/link de salto/botão, viewport390x844 e ausência de overflow. Capturas no relatório/artefato Playwright são desse servidor local, não de produção. Não houve auditoria automatizada completa WCAG nem teste humano de leitor de tela; legibilidade foi conferida visualmente e por teclado.

Pendências operacionais, revisão Miguel, fontes S03, URL/FIC-10, monitoramento ativo eG4 estão somente no registro único, Passo020. O repasse do bloco relaciona contratos e entradas humanas sem simular recebimento por Miguel.

Publicação MD5 — 14/10/2026: commit próprio3ee8b5c3c5113b0fe14c240a140319ff64935ee4, [PR#19](https://github.com/luccalck/desafio-arcade/pull/19), base temporária MD4/PR#18. [CI push38509445953](https://github.com/luccalck/desafio-arcade/actions/runs/38509445953) e [CI PR38509479123](https://github.com/luccalck/desafio-arcade/actions/runs/38509479123): SUCCESS, inclusive ci agregado. Pacote real170 arquivos inventariados baixado/verificado por SHA/run/tentativa1; JUnit235 testes e36E2E sem falhas/erros/ignorados. Deploys, monitor operacional e release foram ignorados por condição; nenhuma produção/aprovação/recuperação real foi alegada. Identidade Git/PR/API confirmada como DaviSouza78; revisão miguelsenai2024 solicitada, ainda sem aprovação. [Provas estruturadas](validacoes-019-020.json). Passagem técnica entregue, recebimento humano pendente; nenhuma etapa021+ executada.
