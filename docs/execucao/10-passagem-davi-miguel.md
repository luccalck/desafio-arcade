# Passagem técnica 011–020 — Davi → Miguel

14/10/2026. Davi Paes/DaviSouza78 preparou seus cinco MDs, com dez etapas registradas. Este documento entrega contratos e provas; **não declara recebimento por Miguel, base aprovada, produção publicada ou gates aceitos**. Pendências detalhadas permanecem exclusivamente no registro único, nas seções011–020.

## Base real para conferir

Clone utilizado: `C:/Users/Administrator/Documents/Codex/2026-10-13/sou-o-davi-e-aceitei-o/desafio-arcade`. Fonte única; não montar cópias separadas do jogo. Branch técnica mais recente deste bloco: feature/passos-019-020-producao-painel, sobre d6a72f6/MD4. Main ainda é bootstrap c04b8fa; a default permanece docs/ficha-entrega-dados-equipe. Não atualizar a partir de main presumindo código integrado.

Miguel confere status/remotes/branch, preserva alterações e usa sua própria conta miguelsenai2024. A cadeia empilhada precisa de revisão humana e integração coordenada antes de publicação formal. Nenhum desses PRs estava aprovado na conferência; CI verde não substitui aprovação. MD5 publicado no PR#19/3ee8b5c; provas deCI vinculadas abaixo. Correção de ator em reexecução segue no mesmoPR.

| Etapas | Entrega / interface | Referência real |
|---|---|---|
|011/012 | HML sem rebuild, preservação de árvore, sondas HTTP/latência/versão, CSV/JSON e branch de dados | PR#15; deploy-hml.md/sondas.md; b3d5353/9ce2522 |
|013/014 | Conteúdo/AST/Python coerentes e protocolo de playtest; smoke reutilizável candidata/raiz, relatório e exit code | PR#16; aprendizagem-conteudo.md/smoke-prd.md;909ac53/8ae86cc |
|015/016 | Tag/release com proveniência, notas/hash, anexos idempotentes; alertas/deduplicação/fechamento e label real | PR#17; releases.md/alertas.md;389b1b0/1d4f710 |
|017/018 | Roteiro/SRT de80s planejados, consentimentos confirmados porDavi com registro privado; azul-verde/sessão/imutabilidade/retirada | PR#18; video-direitos.md/rollout.md;59b35f2/d6a72f6 |
|019 | Recibo HML por bytes, aprovação real exigida, candidata→smoke→virada→raiz, recuperação automática antes de PRD, monitor pós-produção aguardado | scripts/promover.mjs/.sh, aguardar-versao.mjs, observar-producao.mjs, esteira.yml e evidencias/producao.md; preparado, não executado formalmente |
|020 | Painel estático acessível por teclado/celular, fontes públicas por commit, estados desconhecidos, contrato completo para quatro DORA | pages/status/, scripts/status.mjs, monitor.yml e evidencias/painel-status.md; HTTP público404, sem publicação alegada |

## Como consumir os contratos

- PacoteCI: baixar o mesmo SHA/run/tentativa, conferir ci-manifest.json/inventário/checksum e não reconstruir ZIP/GDD no deploy. Ver scripts/ci-bundle.mjs.
- Rollout: abrir mantém estável e candidata0; promover exige relatório novo de smoke correspondente; rollback restaura anterior e retira defeituosa; abortar retira candidata inativa. CLI de escrita bloqueia execução fora da pipeline. Guard não é autorização para forjar ambiente local.
- Produção: precisa HML aceita, recibo HTTP dos sete arquivos, aprovação humana do environment e todas as flags formais/monitor/alertas. Checkpoint inclui baseline/versão anterior, ator, aprovação e hash. Falhas mantêm job vermelho, mesmo após recuperação verificada; release espera produção e monitor bem-sucedidos.
- Monitor: CSV/ultima.json/runs ficam na observabilidade e não disparam Pages. Monitor pós-produção espera run novo identificado e sucesso de sondas/alertas/validação da versão; simples dispatch não basta. Após rollback, HML pode conservar candidata diferente da produção recuperada; ambas precisam estar válidas e versão de produção deve corresponder ao SHA esperado.
- Painel024: gravar status/dora.json conforme schema/chaves/unidades/período/amostras/origem em painel-status.md. O painel já lê esse contrato e não precisa de nova implementação de Davi. Sem dados, mostra indisponível; não inventar DORA0, uptime100 ou latência0.

## Limites da entrega e próximo responsável

G0–G4 e aceites finais continuam abertos no controle/checklist. HML/PRD formais, aprovação de deployment, observabilidade ativa, recuperação medida e URL do painel ainda não existem como provas. Originais externos R/P/D/S indisponíveis estão registrados por passo; não alegamos sua leitura. Consentimentos/Watch foram declarações reais de Davi identificadas nos arquivos; gravação/playtest/revisão/banca são ações humanas posteriores.

Validações locais do MD5:236 testes de unidade/integração, cobertura de instruções core97,90%;36E2E completos, três do painel reconferidos após ajustes visuais; lint/build/actionlint sem ShellCheck. Capturas em docs/evidencias/imagens/passo020 são HTTP local com fontes sintéticas identificadas, nunca produção. CI remota e pacote serão conferidos após push.

Miguel começa seu MD1/5 (021/022) **somente quando solicitado**, conferindo este repasse e as entradas reais: playtest humano e fortalecimento de recuperação. Nenhuma etapa021+ executada por este chat. Recebimento/compreensão, revisão e base aprovada dependem de Miguel/equipe; não são assinados por Davi ou pela IA em nome dele.

Publicação MD5 — 14/10/2026: commit próprio3ee8b5c3c5113b0fe14c240a140319ff64935ee4, [PR#19](https://github.com/luccalck/desafio-arcade/pull/19), base temporária MD4/PR#18. [CI push38509445953](https://github.com/luccalck/desafio-arcade/actions/runs/38509445953) e [CI PR38509479123](https://github.com/luccalck/desafio-arcade/actions/runs/38509479123): SUCCESS, inclusive ci agregado. Pacote real170 arquivos inventariados baixado/verificado por SHA/run/tentativa1; JUnit235 testes e36E2E sem falhas/erros/ignorados. Deploys, monitor operacional e release foram ignorados por condição; nenhuma produção/aprovação/recuperação real foi alegada. Identidade Git/PR/API confirmada como DaviSouza78; revisão miguelsenai2024 solicitada, ainda sem aprovação. [Provas estruturadas](../evidencias/validacoes-019-020.json). Passagem técnica entregue, recebimento humano pendente; nenhuma etapa021+ executada.
