# Playtest do passo 021 — registro preparado

Em 14/10/2026, Miguel Oliveira preparou este registro para a sessão humana de três minutos prevista em P05/D06. **Nenhum participante foi observado nesta preparação.** O protocolo detalhado já está em [aprendizagem-conteudo.md](aprendizagem-conteudo.md); este arquivo reserva a evidência da execução, sem preencher resultados antecipadamente.

## Preparação e fonte técnica

- Usar uma build identificada por URL e SHA. Registrar se é preview, HML ou produção; não chamar preview de produção formal.
- Convidar uma pessoa de outra turma. Dizer apenas: “Você tem três minutos para experimentar este jogo. Faça o que achar que ele pede.” Não explicar objetivos, botões ou solução durante a sessão; anotar qualquer intervenção inevitável.
- Obter autorização para registrar observações anônimas. Não incluir nome, imagem, voz, turma específica ou contato no Git. Gravação exige autorização separada.
- Iniciar cronômetro quando a pessoa receber o controle; encerrar aos 180 segundos ou antes, se ela quiser parar. Registrar duração efetiva, dispositivo e horário real.
- Observar sequência de ações, identificação do objetivo, controles, editor, teste da regra, feedback, erros e retomada. Registrar fatos separadamente das interpretações.
- Após jogar, pedir que explique o que mudou e por quê, preveja outra entrada e diga o que achou interessante ou confuso. Respostas, previsão e justificativa são a base para discutir compreensão, diversão e aprendizagem; XP e testes automatizados não as substituem.

Revisão técnica prévia: as cinco missões ligam decisões, operações, fronteira de colisão, estado e repetição a mudanças visíveis no jogo. Em 14/10/2026, `content.test.ts` (15) e `content-generalization.test.mjs` (2) passaram no clone, incluindo soluções alternativas em AST, HTML exportado e CPython. Isso verifica coerência técnica, sem medir aprendizagem humana. Não houve defeito de mecânica observado neste passo que justifique alterar GDD, backlog ou E2E.

## Registro da sessão — preencher somente após execução real

| Campo | Evidência a registrar |
|---|---|
| Data, horário e duração efetiva | Pendente |
| Build, SHA, URL e dispositivo | Pendente |
| Autorização para registro anônimo | Pendente |
| Objetivo e controles identificados sem ajuda | Pendente |
| Ações observadas e eventuais intervenções | Pendente |
| Respostas sobre compreensão e previsão de nova entrada | Pendente |
| Relato da pessoa sobre interesse ou dificuldade | Pendente |
| Erros bloqueantes observados, com reprodução | Pendente |
| Interpretação, limites de uma sessão e melhoria priorizada | Pendente |

B-06 a B-09 e G5 permanecem abertos até haver sessão e registro autorizados. Se surgir defeito real, abrir Issue, reproduzir com teste significativo antes da correção e vincular o PR. A avaliação da banca e revisão por outro integrante continuam separadas.
