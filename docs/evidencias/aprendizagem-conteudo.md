# Etapa 013 — conteúdo e aprendizagem

Davi Marcondes Paes de Souza / DaviSouza78, 13/10/2026 (America/Montevideo). Base técnica: 9ce2522, MD1 publicado com CI verde; isso não comprova integração revisada em main. Dependências 005/006/009 disponíveis na candidata, com aceites humanos ainda pendentes.

## Revisão das cinco missões

| Missão | Objetivo e exemplos conferidos | Efeito observável e transferência verificada |
|---|---|---|
| controlar | Teclas booleanas, -1/0/1, prioridade da direita quando ambas são pressionadas | Nave muda direção; alternativa com if/elif/return aceita as quatro combinações |
| mover | Posição + direção × velocidade; parada e velocidades distintas | Deslocamento varia com entrada; ordem equivalente dos operandos aceita; posição/velocidade fracionárias verificadas |
| colidir | Comparação de distância com raio incluindo igualdade | Contato na fronteira é coleta/dano; alternativa com not e > aceita, inclusive outro raio e valor logo após o limite |
| pontuar | Preservar estado, cristal +10, estrela +25, demais +0 | Pontos acumulados mudam; variável bônus aceita; tipo desconhecido conserva 42 pontos |
| criarOnda | Lista de posições desde40, passo80 e quantidade0..5 | Quantidade/posição dos objetos; range com três argumentos aceita; quantidades2/4 completam a cobertura0/1/3/5 |

O final reúne as cinco funções, 23 casos públicos e pilotagem até vitória. Não houve mudança de mecânica, casos públicos, progressão ou recompensa. Os seis casos adicionais são fixtures de transferência em teste; não alteram os 23 casos da UI. O validador semântico já bloqueia resultados inventados, starter resolvido, referência incorreta, entradas/ordem/campos/IDs inválidos e ausência de casos essenciais; reutilizado.

Dois testes adicionais em content-generalization.test.mjs verificam soluções diferentes das referências e as mesmas saídas em fonte interpretada, AST do HTML efetivamente exportado e arquivo Python executado por CPython. Somente fixtures editoriais confiáveis são executadas no processo Python. Não se executa código de jogador no servidor. Os15testes de content.test.ts foram preservados; os dois novos usam .mjs, como code-native, pois a configuraçãoTypeScript atual não inclui tiposNode para testes. A tentativa inicial em .ts passou noVitest mas falhou noTypeScript; a separação resolveu sem adicionar dependências. content:check, lint e a suíte completa de194testes passaram, core97,90%instruções/95,23%branches/100%funções/linhas.

Ensaio de conteúdo inválido: somente o resultado esperado do primeiro caso foi adulterado temporariamente para5. npm run build retornou1 por “Resultado não corresponde à regra real”, antes de construir. O arquivo original foi restaurado em finally e seu SHA256 conferido idêntico:720a0bfa8e253a10ac2ace30799858adff89a70c7504acc10e466ae5fac9c87b. Build válido posterior havia passado e a fonte permaneceu semdiff. Log temporário externo ao projeto; nenhuma entrada inválida incorporada aoGit.

Opal/AI Studio não foram usados para conteúdo, conforme AI-USAGE/THIRD_PARTY/GDD e fontes atuais. I04-14/KIT-29 permanecem condicionais não aplicáveis; nenhum golden.jsonl fictício foi criado. Codex auxilia código/documentação e Stitch forneceu referências visuais, usos distintos dessa condição.

## Protocolo humano para a etapa 021 — ainda não executado

Convidar participante real de outra turma, sem registrar dados pessoais em Git. Explicar somente: “Você tem três minutos para experimentar este jogo. Faça o que achar que ele pede.” Usar versão/URL/SHA reais; registrar dispositivo, horário, duração e identificador anônimo. Não explicar botões, código ou solução. Interromper se a pessoa quiser parar; anotar qualquer ajuda inevitável como intervenção, sem atribuir conclusão independente.

1. Iniciar cronômetro ao entregar controle. Observar como identifica objetivo, editor, Testar regra, Jogar e ajuda. Registrar ações e tempos, sem inferir compreensão pelo clique.
2. Registrar tentativa inicial, alteração de uma regra, consulta aos casos, resultado obtido e efeito no movimento. Anotar erros, hesitação, frustração e retomada como observações, sem classificar diversão automaticamente.
3. Encerrar aos180s, mesmo sem concluir. Perguntar depois: “O que você mudou e por quê?”, “O que aconteceria com as duas teclas?”, “Como verificar outra entrada?” e “O que foi interessante ou confuso?”. Não dar a resposta antes de registrá-la.
4. Propor uma previsão para entrada ainda não vista e pedir justificativa. Distinguir acerto casual de explicação coerente. Não afirmar ganho de aprendizagem sem comparação observável; teste automatizado não mede isso.
5. Registrar respostas anonimizadas, exemplos de ações, intervenções, limitações da amostra e decisão de melhoria. Consentimento para voz/imagem é separado e humano; não gravar/publicar sem autorização. Não preencher resultados antecipadamente.

Indicadores: objetivo identificado sem ajuda; ciclo editar/testar/observar explicado; previsão com justificativa; tentativa após erro; interesse/dificuldade relatados pela pessoa. Não somar XP como nota de aprendizagem. Uma sessão não demonstra eficácia geral.

## Explicação para a banca

O jogador produz e depura regras que comandam um minijogo, em vez de escolher respostas prontas. A mesma função aceita entradas diferentes e gera comportamento visível; no final, suas cinco funções são exportáveis em Python e HTML offline. Isso descreve o diferencial implementado. Originalidade, clareza, diversão e aprendizagem exigem observação e avaliação humana na021/banca; B-01/B-02 e gates não são aceitos pela IA.

## Fontes e limites

MD2 completo, índice, SQUAD, README, GDD, checklist/auditoria, AI-USAGE, THIRD_PARTY, SECURITY, passagem010 e contratos006/011 consultados nesta sessão ou na continuidade imediatamente anterior. HTML original de Downloads e seu JavaScript preservados e lidos noMD1, hash19362485b3ec9534bdf31303ca0b92b6fe96de21bb87867977d37a7393565275. P05/D02/D05 externos ao clone não foram encontrados; não alegamos leitura desses originais. Disponibilização/confronto e avaliação humana permanecem no registro único, seções013/014.
