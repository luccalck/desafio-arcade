# Contrato de triagem — etapa 030

Implementação em 14/10/2026: `scripts/triagem.mjs` expõe validadores para data ISO com fuso, exatamente quatro linhas completas de squad sem contar cabeçalho, quatro seções GDD, duração exata (incluindo frações), ZIP com `index.html`/`LEIA-ME.txt` e manifesto SHA-256 dos quatro arquivos. `scripts/triagem.sh` encaminha uma submissão para o módulo Node. A CLI exige `PRAZO`, pasta, SHA esperado e passa a URL por HTTP e smoke `playwright.public.config.mjs`; qualquer falha lança erro e termina não-zero.

`npm test -- tests/integration/triagem.test.mjs`: 8 testes de contrato/negativos aprovados (inclui fluxo com adaptadores injetados). `npm run test:ci`: 24 arquivos/255 testes passaram; cobertura global 97,9% statements, 95,23% branches, 100% functions/lines. `npm run lint` (ESLint e `tsc --noEmit`) passou. Bash do Git for Windows executou o wrapper sem argumento e retornou uso/código 2. Os casos incluem prazo vencido, RA ausente/inválido, seções GDD ausentes, falha simulada de pdfinfo, vídeo 90.1s, ZIP corrompido/incompleto, manifesto adulterado, HTTP 503, exceção de smoke e geração/verificação de manifesto em fluxo fixture. São fixtures e funções injetadas, não evidência de submissão, PDF/vídeo real, browser público ou produção.

O SQUAD real está incompleto (RA de Lucca vazio) e o horário oficial do prazo não está disponível. O wrapper foi só submetido ao teste de uso; a integração do job e execução sobre pacote são da etapa 031.

I09-09–18, KIT-21–24 e OBJ-10 continuam abertos até execução com artefatos e URL reais. Detalhes por dependência/ação estão no Passo 030 do registro único de pendências.
