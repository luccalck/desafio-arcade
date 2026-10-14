# Correções e publicação verificadas — plano de execução

Base aprovada: auditoria14/10 e pedido de corrigir registros/automação/testes, executar ambientes e produzir relatório; pitch permanece pendente. Arquitetura existente mantida: WEB estática, mesmo artefato HML→PRD, azul-verde, environments protegidos, observabilidade separada.

- [ ] C01/C02/P01/P07 — Atualizar identificação26179873, corrigir marcações/declarações e relatório/GDD, preservar histórico e pendências humanas. Arquivos: SQUAD.md, docs/gdd.md, docs/relatorio.md, docs/gestao/ficha-entrega.md, docs/gestao/checklist-avaliacao.md, docs/execucao/05-pendencias-por-passo.md. Conferir identidade/49campos/12seções e fontesAPI.
- [ ] R01/R02/D02 — Registrar revisão humana de Lucca emPRs doscolegas autorizados; não aprovar os própriosPRs. Preservar revisãoexterna/proteção e autoria antes da integração.
- [ ] R03/R07/S04/D05 — Corrigir contratosbundle/PDF/vídeo/triagem e dependencies no workflow com testes de regressão; promover somente o mesmoZIP e exigirproveniência. Testar testesintegration, npm run lint, npm run test:ci.
- [ ] R04/R05/D06 — Corrigir recuperação/revalidação main→tag e versão/data estável sem reutilizaraprovação de outrorun. Rodar testes produção/release/rollback e suítes E2E com CI=true e servidor exclusivo.
- [ ] P07/R03 — GerarGDD/relatório automaticamente, validar pdfinfo/limites/texto, renderizar e inspecionar todas as páginas do relatório. Conferirnotas/versão0.7.0 candidata.
- [ ] R04/R05/S01/S02/S03 — ApósPRaprovado, main eCIverde, configurarambientes/flags/refspreservando reviewers, executar HML/E2E, aprovarPRDcomoLuccaautorizado, conferirhashes/versão/smoke/monitor/painel. Ensaiarrecuperação somente com baseline saudável e gatilhoscontrolados/pipeline, registrar eventosreais.
- [ ] S03/S05/S06/P07 — AtualizarDORA/relatório/evidências após runs, medir limites reais e melhoria apenas comamostras. Registrar nãoexecutadosdependentes dehumanos; manterpitchsemarquivo fictício e semtriagemfinal.

Verificações finais: npmci/lint/unidade/integração/E2E/build/reprodutibilidade/ZIPoffline/PDF/scanners; GitHubActions push+PR; aprovaçãoexterna antesmerge; HTTP/version/hashesPRD e HML; schedule/dados/Issues/rollback quando de fato disponíveis. Não retroagir tags/métricas, não enviarAVA/termos semação autorizada. Arquivos locais anteriores permanecem preservados.
