# Correções da candidata —14/10/2026

Pedido aprovado por Lucca Castilho Costa, RA26179873. Identidade GitHub conferida:luccalck, e-mail de commit noreply vinculado à conta. Preservamos as alterações locais anteriores na worktree original; correções na worktree isolada fix/fechamento-verificado.

## Implementações e verificações locais reais

- INT01/02: identificação completa e correção de marcações antecipadas;15PRs dos colegas(#15–29) receberam APPROVED pela conta deLucca, após ele informar revisão humana e autorizarregistro. Isso não cria review dosPRs deLucca nem substitui revisãoexterna da consolidação.
- INT03/06/09/10: relatórioPDF obrigatório no bundle; produção/release precedem submissão; pacote/vídeo fixados porSHA/run/tentativa/digest; triagem agendada recupera artefato completo e retorna literalTRIAGEM APROVADA somente no sucesso. Pitch continua ausente/pendente.
- INT07: correção de comparação tx.version inexistente no rollbackmanual; validação debaseline porHTTP/hash antes de marcar recuperação; tag/main comSHAestável aceita revalidação com recibo/aprovação atuais, sem alterar releaseimutável.
- INT08: revalidação da tag não conta como implantação nova; DORA distingue confirmação pósCDN/smoke de commit decontrole em runfalha.
- Reprodutibilidade: npm run reproducibility passou, incluindo duas builds normais com hashes deZIP idênticos e version.json com data deorigem estável; experimentos com datasalternativas verificam a exceção de campo data explicitamente normalizada.
- npm run lint passou (ESLint e TypeScript). npm run test:ci -- --maxWorkers=2 passou270/270 em25arquivos; cobertura100%linhas/97,9%instruções core. actionlint passou semachados.

Os testes de contrato usam fixtures claramente sintéticas, não vídeos/execuções de produção. Defeitos novos foram identificados por inspeção e protegidos por regressões; não afirmamos execuções vermelhas antigas que não foram guardadas. O bugreal histórico de edição/regraantiga conserva sua captura/JUnit/PR próprios.

E2E, PDFs, CI remota e ambientes: registrar resultado eSHA/run somente depois de concluírem. Ativar flags não comprova operação. Política de tagsv* foi adicionada aos três environments sem remover main/reviewers; aprovação deprodução continua obrigatória e respeita prevent_self_review configurado noGitHub.

Pendências acompanham docs/execucao/05-pendencias-por-passo.md. Não há envioAVA, playtesthumano ou banca realizados por esta automação.
