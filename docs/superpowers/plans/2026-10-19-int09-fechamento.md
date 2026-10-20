# Fechamento do INT-09

**Objetivo:** executar a triagem da entrega v1.0.0 sobre o pacote original, com prazo antigo preservado e exceção temporal explicitamente autorizada para esse pacote. Não afirmar que a execução ocorreu dentro do prazo.

**Arquitetura:** separar as validações compartilhadas para eliminar o ciclo triagem → submissão → triagem no CLI. Uma política de exceção vinculada a tag/SHA/digest/prazo e responsável autenticado aceita somente a condição temporal desse pacote; todas as demais checagens continuam bloqueantes. O validador pode evoluir sem recompilar ou substituir o produto publicado.

**Stack:** Node 24, Vitest, GitHub Actions, Bash, Poppler, FFmpeg e Playwright.

## Sequência e aceites

- [x] Reproduzir o encerramento exit13 do CLI com regressão de subprocesso; dependências externas simuladas somente no teste, sem apresentar como prova operacional.
- [x] Extrair primitivas de pacote para módulo sem dependência do CLI; comprovar regressão corrigida.
- [x] Testar prazo estrito por padrão; negar exceção sem autorização ou com tag/SHA/digest/prazo/ator divergentes.
- [x] Implementar política temporal com recibo `withinDeadline:false` quando aplicável, sem divulgar justificativa.
- [ ] Reutilizar o artefato12231549745, digest1c3d83df, tagv1.0.0/SHAbe28149; verificar todos os gates originais e a identidade do produto.
- [ ] Executar `scripts/triagem.sh` com ferramentas reais, registrar versão do validador separadamente da versão do produto e arquivar resultado, logs e manifesto.
- [ ] Integrar com CI verde, dispensa de revisão já autorizada e política restaurada; congelar produção durante mudanças da esteira/documentação.
- [ ] Atualizar INT-09, pendências, relatório e ficha apenas após resultado real; não gerar TXT.

## Limites

PRAZO continua2026-10-16T22:35:43-03:00. Não alterar relógio, histórico, tag, pacote ou release imutável. Não registrar justificativa pessoal ou atribuir revisão/ação humana inexistente. Agendamentos futuros até a banca são acompanhamento contínuo, não execução já ocorrida. Concurso permanece opcional e sem inscrição.
