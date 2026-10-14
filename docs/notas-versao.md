# Notas de versão — proposta para revisão

## 0.7.0

Candidata de engenharia para validar a esteira formal do Desafio Arcade.

- Identificação de Lucca Castilho Costa, RA26179873, e correção dos registros que confundiam preparação com execução.
- Relatório técnico PDF integrado à CI, verificações de proveniência e submissão condicionada à produção aceita.
- Triagem completa do pacote imutável, vídeo fixado por origem/digest e registros de aprovação com fontes reais.
- Build com data de origem estável por commit para preservar as releases por SHA entre main e tag.
- Revalidação idempotente e correções dos contratos de recuperação, testadas antes da execução operacional.

O pitch, a submissão acadêmica final, o playtest humano e a banca continuam sujeitos às suas evidências. Esta candidata não é a entrega final v1.0.0. Resultados de deploy, smoke, monitoramento e recuperação são registrados somente após a execução.


Estas notas ainda não receberam aprovação humana e não descrevem uma release publicada. Antes da tag autorizada, revisar conteúdo por PR e configurar RELEASE_NOTES_SHA256 com o hash exato deste arquivo aprovado. Alteração posterior exige nova revisão/hash. Não há tagv0.1.0 histórica comprovada; v1.0.0 pertence à etapa035.

## 1.0.0

- Release candidata final da oficina web Rota do Código (Desafio Arcade), com cinco missões e projeto final de lógica em Python.
- Relatório técnico estruturado (`artifacts/RelatorioTecnico.pdf`, 6 páginas A4) com rastreabilidade completa dos 10 INTs, bugs reais históricos (regra antiga e perda de foco no teclado), DORA transparente e retrospectiva técnica da engenharia.
- Automação de submissão acadêmica (`scripts/submissao.mjs`) e triagem agendada em modo vigilância (`.github/workflows/triagem-agendada.yml`).
- Pirâmide de testes completa com 260 testes unitários e de integração (cobertura > 97% no core) e 36 testes ponta a ponta Playwright cobrindo navegação por teclado e toque em telas móveis (390x844).
- Pacote jogável 100% offline via protocolo `file://` (`artifacts/build.zip`, ~29 KB) com reprodutibilidade determinística verificada.
- Privacidade rigorosa (DIR-09) com zero cookies/trackers, auditoria de dependências com 0 vulnerabilidades e Gitleaks limpo.

## 0.6.0

- Oficina web com cinco missões de funções Python e projeto final integrado, edição/teste das regras e minijogo com controles, movimento, colisão, pontuação e ondas.
- Exportação de HTML jogável offline e fontes Python, progresso local e opções de texto/movimento.
- CI com validação de conteúdo, testes, segurança, GDD/PDF e ZIP/checksum; contratos preparados para HML, sondas, smoke e releases a partir do mesmo pacote.

Limites: preview não comprova produção formal. Playtest educativo, revisão de colegas, promoção/recuperação, monitoramento operacional e aceites finais permanecem pendentes. Não há eficácia de aprendizagem, disponibilidade formal ou recuperação cronometrada comprovadas por estas notas.
