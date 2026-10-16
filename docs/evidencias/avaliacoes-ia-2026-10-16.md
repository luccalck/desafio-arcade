# Fechamento técnico dos tópicos1–4 e três avaliações por IA

Em16/10/2026, Lucca autorizou três subagentes para testar o jogo. Executamos explorações independentes no navegador contra a produção0.7.0/e9dd28c, registrando explicitamente que são agentes deIA com conhecimento prévio de programação. Não inventamos estudantes, aprendizagem, diversão, consentimentos ou aprovação humana. As soluções foram construídas pelas informações visíveis na UI; os agentes não consultaram core/helpers/soluções antes das sessões.

## Três avaliações realizadas

| Agente / perfil | Evidência verificável | Resultado e limites |
|---|---|---|
|avaliacao_ia_desktop|Chrome1440×1000;264,125s decorridos;47ações;[relatório](avaliacoes-ia-2026-10-16/desktop/RELATORIO.md),[log](avaliacoes-ia-2026-10-16/desktop/sessao.json)|Quatro missões/400XP, ajuda/erros/modais/opções/progresso; zero pageErrors. Encontrou aviso residual de derrota. Inclui timeout de30s da automação, declarado e não contado como interação ativa. Não concluiu toda a campanha.|
|avaliacao_ia_toque|Chrome390×844,toque emulado;190,578s;31ações;[relatório](avaliacoes-ia-2026-10-16/toque/relatorio.md),[log](avaliacoes-ia-2026-10-16/toque/session.json)|Duas missões/200XP, continuidade/restauração/persistência, nenhum bloqueante/pageerror/overflow observado. Editor preenchido pelo Playwright; não testou teclado virtual físico nem toque mantido com medição pixel a pixel.|
|avaliacao_ia_acessibilidade|Chrome1280×900;[relatório](avaliacoes-ia-2026-10-16/acessibilidade/RELATORIO.md),[metadados](avaliacoes-ia-2026-10-16/acessibilidade/sessao-complementar-metadados.json)|Ajuda/foco/Escape/retorno, nomes acessíveis, confirmação e rascunho após reload comprovados em verificações separadas. Capturas cobrem intervalo183,702s, mas o log completo foi perdido por erro de serialização da ferramenta. Não afirmar sessão ininterrupta de3min comprovada. Após reload, parte da exploração ficou no menu. ZoomCSS200%, sem leitor de tela ou auditoriaWCAG completa.|

Os erros de seletor e serialização estão declarados nos relatórios, sem transformá-los em defeitos do jogo. As capturas são screenshots reais, não mockups. A experiência dos agentes não representa jogadores leigos. O HTML do professor situa a sessão de colega de outra turma na banca; B-06–09 continuam sem comprovação humana, no tópico8 do quadro único. O teste humano não será marcado como feito por três agentes.

## Defeito real encontrado e regressão

[Issue42](https://github.com/luccalck/desafio-arcade/issues/42),P3: depois da derrota, Jogar reinicia com três vidas/zero pontos, mas role=status conserva “A partida acabou”. Captura de produção:[reinício com aviso residual](avaliacoes-ia-2026-10-16/desktop/10-reinicio-status-residual.png).

A causa é a mensagem atualizada somente no callback de término; recriar/iniciar o player não renovava o aviso. Corrigimos src/scenes/app.ts para anunciar partida em andamento somente quando o novo estado é playing, preservando o diagnóstico de erro. A regressão tests/e2e/replay-feedback.spec.mjs percorre três missões pelaUI, usa pontuação zero para chegar à derrota real do motor, reinicia e confere vidas/pontos/estado/aviso. O relógio Playwright é virtual para acelerar esse teste; não é medição de recuperação operacional.

- Antes:1teste falhou exatamente porque recebeu “A partida acabou” em vez de “Partida em andamento”. [JSON original](avaliacoes-ia-2026-10-16/replay-antes.json).
- Depois:1teste passou. [JSON original](avaliacoes-ia-2026-10-16/replay-depois.json).
- npm run build/content:check e npm run lint passaram localmente. Build local usou a base3819177 com correção ainda não commitada; não é outro artefato de produção.

A correção está na branch do PR41, sem merge ou deploy nesta execução. A produção observada continuae9dd28c e a Issue permanece aberta até integração/publicação. Não atribuir aos agentes validação do código corrigido: as três sessões ocorreram antes da correção.

## Documentação, recuperação e monitoramento

Reconciliamos os documentos de alertas, DORA, melhoria e recuperação, mais o plano do ensaio, que ainda descreviam preparação antiga como se fosse o estado atual. Conservamos esse histórico identificado. Não reabrimos PR34/40 ou tarefas já comprovadas.

Verificamos101arquivos nos quatro manifestos anteriores e o SHA256 do HTML original, preservado. [Resultado](avaliacoes-ia-2026-10-16/integridade.json). A recuperação técnica já foi executada:manual80,662735s e automática17,166s, incluindo Pages/setehashes/smoke;171+65HTTP200 observados. Não repetimos a recuperação apenas para gerar amostras.

Disparamos monitor.yml na main com expected_sha=e9dd28ccee535e9b1259a710742482e44db47aed. Run38947239547:Sondar,Alertar e Validar-pos-producao concluíramSUCCESS. HML1e3dd3b e PRDe9dd28c, ambas0.7.0/HTTP200; latências amostrais0,170146s/0,104063s. Nenhuma ação de incidente. [Run](avaliacoes-ia-2026-10-16/monitor-run.json),[sondas](avaliacoes-ia-2026-10-16/monitor-sondas.json),[alertas](avaliacoes-ia-2026-10-16/monitor-alertas.json).

DORA recalculado com os eventosGitHub:dois deploys/14dias,0,142857deploy/dia,lead médio35min19s,CFR50% incluindo rollback planejado,MTTR operacionalnull. [Dados](avaliacoes-ia-2026-10-16/monitor-dora.json). Os dois alertas anteriores de ensaio têm abertura/fechamento reais1s/3s, média2s; sua labelensaio e exclusão do MTTR operacional permanecem explícitas. O HTML não exige que o incidente seja espontâneo: a limitação atual é a diferença entre essa evidência isolada e o critério literal labelalerta/DORA, sem promessa de aceitação antecipada.

Fechamos somente os checks funcionaisI08-10–14/KIT-26 comprovados no ensaio, e registramos a decisão atual emI08-28/melhoria-dora.md. Não declaramos efeito positivo deDORA ainda não medido(I08-29/32), nem ausência de todo defeito. Os resultados das três avaliações orientaram uma correção concreta de clareza, não uma alteração de DORA.

## Estado dos quatro tópicos

1. Documentação reconciliada e revisão técnica assistida executada na branch; main continua protegida e PR41 bloqueado sem aprovação. Não solicitamos nova revisão nem usamos os agentes como contas de colegas.
2. Ensaio técnico de recuperação concluído; demonstração presencial permanece no tópico8.
3. Sondas/painel/cálculo executados novamente; abertura/deduplicação/autocerramento já comprovados em ensaio. Critério literal de label/MTTR e efeito de melhoria permanecem com seus limites registrados no tópico3.
4. Três avaliações técnicas deIA concluídas com escopos/limites, um defeito corrigido/testado na branch. Sessão humana exigida na banca continua no tópico8.

Nenhum pitch,TXT,pacote final ou declaração pessoal foi criado. Não alteramos produção, gh-pages ou proteção. INT-02/03/04/07/08/10;P05,D06,S01–S06;G5 permanece parcial por critérios explicitamente não demonstrados. O quadro principal conserva oito tópicos, sem adicionar novas categorias.
