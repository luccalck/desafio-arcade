# Retomada da publicação técnica após falha do publicador

Contexto: a publicação completa foi autorizada por Lucca; a run38852413982/2 passou CI/HML/PRD/monitor, mas o endpoint por tag não reencontrou o draft414556376. A correção é consultar rascunhos autenticados e reconferir pelo ID, sem enfraquecer hashes/notas/imutabilidade.

Não repetir uma tag antiga como novo push ou alterar sua data/SHA. A repetição integral futura excederia o gate900s com o push original. Não publicar localmente. Usar workflow manual na main revisada, protegido pelo environment producao, para finalizar exclusivamente a publicação dos bytes da execução original.

Contrato: conferir repositório, evento push, workflowesteira.yml, tag/SHA/tentativa e jobs qualidade/segurança/build/E2E/pacote/CI/HML/PRD/monitor bem-sucedidos na tentativa informada. Baixar somente bundle de nomeSHA-run-tentativa; verificar inventário, notas autorizadas, tag anotada integrada/protegida/revisada e SHA público atual. O código publicador vem da main revisada; checkout da tag serve para comprovar origem e ler notas/package originais. Não recompila ou altera Pages.

Uma divergência bloqueia antes da escrita. Draft existente só pode ser concluído se notas e seis anexos forem exatamente os esperados; publicação imutável não é reparada/sobrescrita. Recibo identifica tanto implementação da retomada quanto SHA/run/tentativa originais. A run original mantém FAILURE; retomada é execução nova e explícita, sem fingir que a primeira publicação passou. Pitch/submissão continuam independentes e pendentes.

Validação: regressão reproduzindo endpoint publicado sem draft; adapter mockado e leitura API real; matriz negativa de proveniência/jobs e falta de sonda; CI314+novos testes/36E2E. A execução com escrita só ocorrerá depois de revisão externa/merge e aprovação do environment.
