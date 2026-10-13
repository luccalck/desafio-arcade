# Rota do Código — Game Design Document

Versão do software: **{{VERSION}}**. Revisão do documento: **005 — 13/10/2026**. Mantemos a oficina de jogos aprovada, com desafios Python e preview web. Este documento descreve a candidata; sua data de revisão não representa data de submissão ou release final.

| Identificação | Situação verdadeira |
|---|---|
| Jogo / atividade | Rota do Código / Desafio Arcade — Integração e Entrega Contínua, DevOps |
| Squad | Aura 67 |
| Coordenação de Produto | Lucca Castilho; participação dos quatro em todas as áreas |
| Data de submissão | Ainda não houve submissão final registrada; preencher na entrega real |
| Repositório | https://github.com/luccalck/desafio-arcade |
| PR do primeiro ciclo | https://github.com/luccalck/desafio-arcade/pull/2; integração protegida ainda pendente |
| Preview público do jogo | https://luccalck.github.io/desafio-arcade/ |
| HML do preview | https://luccalck.github.io/desafio-arcade/hml/ |
| CI de referência conferida | https://github.com/luccalck/desafio-arcade/actions/runs/38345466916 — candidata do passo004, sem deploy nesta execução |
| Produção / homologação / vídeo / release | Preview Pages configurado; publicação/testes rastreados no workflow. Produção formal, vídeo e release final pendentes |
| Plataforma | WEB estática responsiva, mesma experiência no computador e celular |

### Equipe

| Integrante | RA | Coordenação | GitHub |
|---|---|---|---|
| Lucca Castilho | A informar | Produto e Game Design | luccalck |
| Davi Paes | A informar | Desenvolvimento e Qualidade | DaviSouza78 |
| Miguel Oliveira | A informar | Plataforma e Release | miguelsenai2024 |
| Lucas Souza | A informar | SRE e Segurança | 6lucassilvaaa |

Papéis coordenam, sem exclusividade. Os RAs ficaram para preenchimento posterior por orientação do responsável; não representam identificação completa. Fonte dos dados: [SQUAD](../SQUAD.md).

A aprovação de concepção não substitui revisão por outro integrante. CPF e assinaturas não integram Git ou artefatos públicos; eventual versão privada depende de orientação do professor. Identificação, declaração coletiva e links de release continuam pendentes. Capturas locais e testes automatizados não representam produção ou playtest humano.

## 1. Premissa e problema endereçado

Iniciantes podem memorizar comandos sem entender como uma regra altera um programa. A oficina relaciona eventos, variáveis, condições, estado e repetição a um resultado observável: construir funções de um minijogo. Público: pessoas com leitura básica em português, familiaridade com teclado/toque e sem conhecimento prévio de Python. Editar código no celular pode ser mais trabalhoso e precisa de avaliação humana.

Cada missão começa com um defeito numa função curta. O jogador altera código, compara saídas para entradas diferentes e experimenta o efeito numa nave controlável. Ajuda direta fica sob demanda. Cinco missões compõem um projeto integrado exportável como HTML jogável offline e funções Python .py para estudo. XP e desbloqueios sinalizam progresso; não medem aprendizagem. Clareza, diversão e transferência de conhecimento ainda exigem playtest humano; nenhum ganho educativo foi medido.

## 2. High concept

Rota do Código é uma oficina educativa web em que o jogador constrói um minijogo de nave corrigindo cinco funções Python. Controles, movimento, colisão, pontuação e criação de ondas transformam eventos, operações, condições, estado e repetição em efeitos visíveis. Cada regra precisa funcionar para entradas diferentes, com ajuda e testes públicos sob demanda. No desafio final, as cinco funções do jogador comandam uma partida real: alcançar 100 pontos com três vidas libera a exportação de um HTML independente, jogável offline, e das funções .py para continuar estudando. Menus, seis missões e até 700 XP organizam a campanha. O diferencial é produzir e depurar regras de um jogo concreto, relacionando código e comportamento, em vez de repetir uma sequência de comandos ou responder apenas perguntas.

## 3. Gênero e plataforma

Jogo educativo de programação e depuração, com minijogo arcade de coleta e desvio. Destino obrigatório **WEB**, estático e responsivo; sem aplicativo nativo, APK ou instalação de engine para o jogador.

TypeScript, HTML/CSS/SVG e esbuild IIFE, sem framework de interface ou engine física. Core puro separado da renderização; Ajv valida conteúdo, Vitest testa regras/integração e Playwright testa navegador. Node 24 e lockfile são ferramentas de desenvolvimento/CI. Conteúdo, player de exportação e licença são incorporados à build; fontes locais, sem CDN. Descompactar o ZIP e abrir index.html funciona por file:// sem rede. Sem backend, conta, serviço pago ou API de IA em runtime. Nenhuma dependência nova foi necessária.

## 4. Mecânicas-core

A missão apresenta uma frase de objetivo, minijogo e editor Python com linhas. O código inicial tem erro relacionado ao conceito. Testar regra compila a tentativa e compara saídas reais/esperadas em casos públicos; Jogar reinicia usando a função editada. Sintaxe e limites produzem mensagem com linha. Ajuda e casos detalhados são opcionais; nenhum botão preenche solução.

Loop: editar → testar entradas → observar partida → corrigir → concluir regra → próxima missão. Nas cinco primeiras, as outras quatro funções usam regras de apoio corretas para isolar o conceito. Aprovar os casos libera a próxima; jogar mostra o efeito, sem requisito adicional nessa etapa. O final usa as cinco fontes salvas, exige os 23 casos corretos e uma vitória na partida atual para concluir/exportar.

| Missão / função | Aprendizagem por ação | Casos públicos |
|---|---|---|
| 1 — controlar | Eventos/decisões: -1, 0 ou 1 conforme teclas; direita tem prioridade quando ambas pressionadas | 4: esquerda, direita, nenhuma, ambas |
| 2 — mover | Operações: posição + direção × velocidade; parado preserva posição | 5: sentidos, parada, velocidades diferentes |
| 3 — colidir | Condição/fronteira: distância menor ou igual ao raio | 5: centro, dentro, fronteira e fora |
| 4 — pontuar | Estado: conservar pontos; cristal +10, estrela +25, outros +0 | 5: tipos e pontos acumulados |
| 5 — criarOnda | Lista/repetição/limite: quantidade de posições começando em 40, intervalo 80 | 4: quantidades 0, 1, 3 e 5 |
| Final — Órbita | Integrar as cinco funções e pilotar o jogo produzido | 23 casos e vitória com pelo menos 100 pontos |

Arena lógica 480 × 320. Nave começa em x=240, y=270, entre x=20 e 460; velocidade de referência 4 por atualização. Atualiza a cada 20 ms; objetos descem 2,6 unidades por atualização. A cada 150 atualizações surge onda, inicialmente três objetos, crescendo até cinco. Tipos seguem padrão determinístico por onda/índice: pedras, estrelas e cristais. Colisão usa distância e raio 23; pedra retira uma vida, item colidido é removido uma vez. 100 pontos vence; zerar três vidas perde. Sem tempo limite geral, monetização ou ranking.

Saídas inválidas interrompem partida com diagnóstico: direção fora de -1/0/1, posição não finita, colisão não booleana, pontos fora de inteiro 0..9999, lista com quantidade incorreta, posições repetidas ou fora da arena. Motor clona estado/entradas; estado encerrado é idempotente. Testes verificam comportamento, sem exigir fonte igual à referência editorial.

Editor aceita subconjunto explícito de Python: def com dicionário entrada, atribuições, return, if/elif/else, operações numéricas, listas numéricas, append e for em range de um a três argumentos. Blocos usam indentação, comparações ==/!= e booleanos True/False; comentários #. Uma instrução por linha; import/classes/while e demais APIs não disponíveis. Sem chamadas genéricas, DOM, rede, globais ou propriedades arbitrárias. Interpretador lê AST sem eval/Function: até 6.000 caracteres, 300 nós, profundidade 20, 2.000 passos e 64 iterações por laço; arrays até 64 elementos. Limites por avaliação não significam compatibilidade com toda a linguagem.

Editar pausa e invalida resultados/regras anteriores; retomar fica desabilitado até aplicar fonte por Testar/Jogar. Pausa conserva posição, pontuação e atualizações; Jogar reinicia; sair limpa eventos/temporizadores. Perder permite tentar novamente sem apagar fontes. Correção de regra antiga tem regressão documentada.

Primeira conclusão: 100 XP por missão e 200 final, total 700, sem duplicar replay. Código/vitórias usam chaves workshop-python:v5; campanhas anteriores são preservadas sem desbloquear esta. Armazenamento indisponível mantém sessão. Reset confirmado remove somente código/progresso da oficina. Preferências persistem separadamente. Sem dados pessoais ou telemetria.

Após vitória final, Baixar meu jogo gera meu-jogo.html com AST das cinco funções, o mesmo interpretador de Python educativo, motor web, player, estilos e MIT completos. A AST é serializada com escape para HTML, sem fonte bruta em script. Oficina e exportação compartilham semântica e limites. Minhas funções .py entrega fontes Python válidas, com licença e dicionário entrada, para estudo/execução num Python convencional. O HTML jogável usa motor TypeScript/JavaScript e o interpretador do subset; editar o .py separado não recompila automaticamente o HTML. Ambos são criações do aprendiz, distintas do pacote acadêmico.

## 5. Enredo e personagens

RDC-01, robô mascote original, convida o jogador a reparar o protótipo Órbita. Nave é o objeto programado; coletáveis e pedras mostram pontuação/colisão. Narrativa leve, sem biografia extensa ou pretensão de simular hardware. Storyboard cinematográfico não se aplica; sequência educativa conduz progressão.

![Concept art original — desenho de projeto](images/concept.svg)

## 6. Fluxo do jogo

![Estados e navegação — desenho de projeto](images/fluxo.svg)

Menu oferece começar/continuar, missões e opções, versão/progresso. Reinício de campanha existente exige confirmação. Missões são liberadas em ordem; entrar abre editor/arena. Erro mantém tentativa. Regra aprovada nas missões 1–5 oferece próxima/replay. No final, abas permitem editar cinco fontes; testar projeto precede pilotar e vencer para exportar.

Ajuda/casos em diálogos com Escape e retorno de foco. Opções: texto maior, movimento reduzido, reset confirmado. Pausa/retomada no player; voltar à campanha encerra execução. Vitória disponibiliza conquista/download, sem etapa de questionário.

## 7. Level design

Seis mapas são desenhos de projeto gerados do conteúdo versionado, não screenshots. Arena, nave, entradas pelo topo, trajetória vertical e funções/casos definem o espaço. Posições 40/120/200 exemplificam onda inicial; mapas não representam todos os frames ou única solução. JSON contém entradas/resultados/fontes iniciais/referências.

![Missão 1 — controles](images/mapa-1.svg)

Controle invertido; ausência/simultaneidade de teclas distinguem regra geral de dois exemplos.

![Missão 2 — movimento](images/mapa-2.svg)

Deslocamento horizontal depende de posição, direção e velocidade; parada e velocidades diferentes impedem solução com distância fixa.

![Missão 3 — colisão](images/mapa-3.svg)

Raio indica limite de coleta/dano; fronteira exige igualdade. Anel é explicação de projeto, não elemento obrigatório do HUD.

![Missão 4 — pontuação](images/mapa-4.svg)

Cristais/estrelas alteram estado acumulado; outros conservam total. Redefinir pontos a cada objeto falha.

![Missão 5 — ondas](images/mapa-5.svg)

Repetição cria lista de posições espaçadas. Quantidade zero e 1/3/5 revelam objeto extra.

![Final — projeto integrado](images/mapa-6.svg)

Cinco fontes salvas comandam cenário; composição de regras e pilotagem entre recompensas/pedras elevam desafio. Schema/semântica exigem seis missões na ordem, contratos/casos coerentes, referência que passa e fonte inicial que falha. JSON inválido bloqueia build; referência não preenche editor automaticamente.

## 8. Interface do usuário — UI/UX

![Wireframes — desenhos de projeto](images/wireframes.svg)

Paleta aprovada azul escuro/ciano/amarelo. Um objetivo, arena/HUD e editor; informação complementar sob demanda. HUD exibe pontos, vidas e estado real; animação mostra efeito do código. Editor mantém foco enquanto arena atualiza. Mensagens distinguem sintaxe, casos e resultado. Controles não são recriados por frame.

![Primeira missão executada no navegador local](images/python-primeira-real.png)

Captura real Chrome/Playwright, 12/10/2026, fonte 5ebdc64, build 0.6.0; não representa produção/playtest humano. O jogador altera valores da função e observa controles.

![Projeto final vencido no navegador local](images/python-final-real.png)

Mesma fonte/data: campanha pelo editor e partida pilotada pelos controles em teste automatizado, sem injetar progresso. Resultado de execução local.

Setas ou A/D pilotam fora do editor; toque usa botões de direção. Textarea nativo com numeração sincronizada. Tab insere quatro espaços, Enter mantém indentação e sugere nível após dois-pontos; Escape permite sair do editor para os controles. Foco visível, link para conteúdo, rótulos, texto/ícones além da cor, anúncios de eventos relevantes, sem anunciar cada frame. Blur limpa teclas; página oculta pausa. Texto maior/movimento reduzido ajustam preferências; objetos necessários ao gameplay continuam se movendo.

Em 390×844, arena/editor empilhados sem overflow horizontal nos testes; código longo rola dentro do campo. Jogar revela arena no celular. Alvos principais ≥44px, toque 48px. Testes de pausa/erros/menus/foco/campanha/toque/persistência/offline não certificam todos os aparelhos ou acessibilidade completa. P05: playtest por colegas de outra turma e revisão de clareza ainda pendentes.

## 9. Áudio e música

Ausência de trilha/efeitos/controle de volume. Feedback visual/textual. Áudio futuro exige origem/licença, controle e alternativa textual por PR.

## 10. Arte e referências visuais

Mascote/nave/objetos/ícones/mapas/wireframes/concept SVG/CSS originais, criados com assistência do Codex. PNGs são capturas reais. Fontes Trebuchet MS/Consolas e alternativas locais, sem distribuição de arquivos de fonte ou CDN. Sem ativos copiados de jogos/modelo Word.

Referência de interação: relação direta entre código e resultado de um pequeno jogo. Não reproduz outro título nem declara eficácia educativa por referência. Versões anteriores/fontes consultadas permanecem no histórico; não descrevem mecânica ativa.

Referências técnicas: [esbuild](https://esbuild.github.io/api/#format), [Vitest](https://vitest.dev/guide/), [Playwright](https://playwright.dev/docs/test-assertions), [ambientes GitHub](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments) e [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Licenças/versões no lockfile/THIRD_PARTY/SBOM.

## 11. IA e componentes de terceiros

| Ferramenta / componente | Uso efetivo | Licença / condição |
|---|---|---|
| Codex | Requisitos/concepção/código/conteúdo/testes/arte vetorial/documentação | AI-USAGE; revisão por outro humano antes do merge pendente |
| TypeScript / esbuild | Tipos/empacotamento | Apache-2.0 / MIT |
| Ajv / Vitest / Playwright | Schema/regras/navegador | MIT / MIT / Apache-2.0 |
| Markdown-it / fflate | GDD/ZIP | MIT / MIT |
| ESLint / typescript-eslint / tsx | Lint/validação | MIT conforme inventário |

Transitividade/versões no THIRD_PARTY/lockfile/SBOM. Nenhuma dependência nova. Sem Opal, AI Studio, Stitch, raster ou IA em runtime; golden eval dessas ferramentas não se aplica ao uso realizado. Comparação com CPython usa somente fixtures editoriais confiáveis em processo local/CI com timeout. Node VM testa pontes de exportação confiáveis que chamam a mesma AST. Não há CPython, execução remota ou exec/eval da fonte do jogador no navegador.

### Originalidade e direitos

Desenvolvemos o projeto para a atividade, com assistência de IA registrada em [AI-USAGE](../AI-USAGE.md) e componentes/ativos inventariados em [THIRD_PARTY](../THIRD_PARTY.md). O código próprio e o HTML exportado incluem a licença MIT. A confirmação coletiva de direitos e a revisão por outro integrante continuam pendentes antes do merge/entrega; não afirmamos que os quatro assinaram ou aprovaram esta versão.

Não incluímos CPF ou assinaturas nos arquivos públicos. A entrega acadêmica não autoriza inscrição ou aceite dos termos do concurso opcional; eventual documento privado segue a orientação real do professor.

## 12. Ideias adicionais e próximos passos

Implementado na candidata 0.6.0: cinco missões Python/final, editor limitado/diagnósticos, testes públicos, minijogo real, menus/pausa/opções, 700 XP, fontes/vitórias persistentes, HTML exportável. Evidências em [jogo e testes](evidencias/python-pages.md), [baseline técnico](evidencias/baseline-tecnico.md) e [privacidade/segurança](evidencias/seguranca-inicial.md). Uma campanha ativa; versões anteriores recuperáveis no Git.

Restam revisão/participação dos quatro, playtest educativo/acessibilidade humana, promoção PRD, recuperação/sondas/DORA medidos, vídeo, triagem e relatório. Novas funções, editor mais amplo, níveis e áudio são futuro. Não há resultados educativos/produção/colaboração simulados. GDD atualizado por PR quando mecânica muda.

## Esteira

![CI e preview automatizados; etapas finais planejadas](images/esteira.svg)

Repositório: https://github.com/luccalck/desafio-arcade . A branch padrão acompanha temporariamente a candidata mais recente com CI verde; main continua protegida. Isso facilita rastreamento e não representa promoção em produção. GitHub Flow/Conventional Commits, main protegida, PR com ci/revisão por outra pessoa. Actions push/PR: ubuntu-latest/npm ci/lockfile, lint, unidade/integração/conteúdo, E2E, Gitleaks, audit produção, SBOM, reprodutibilidade, GDD/pdfinfo/texto, ZIP/checksum/artefatos. Mapas regenerados ao converter GDD. CI não comprova implantação ou revisão humana.

Preview autorizado: job publicar-preview depois de ci recupera o mesmo ZIP/checksum; publica /hml/, /releases/<sha>/ imutáveis, loader e rollout.json em gh-pages escrito apenas pela pipeline. Pages Actions publica esse diretório e testa HTTP/versão/edição/movimento em HML e release pública. URL configurada: https://luccalck.github.io/desafio-arcade/ . Resultado de implantação e evidências devem ser conferidos na execução, não inferidos dos arquivos. Main mantém proteção e revisão de outro autor. Ainda planejado para produção formal: mesmo artefato até PRD, aprovação em producao, rollout e recuperação medidos. Azul-verde: validar nova pasta, aprovação registrada em producao, promover ponteiro, smoke, recuperação automática/manual. Sessão deve manter versão válida. Recuperação <5 minutos incluindo Pages exige ensaio real, ainda não realizado.

[Configuração GitHub e ambientes](evidencias/configuracao-github.md): homologacao/producao estão limitados à main, produção exige reviewer e não permite bypass administrativo. Jobs formais/migração Pages são trabalho dos007/011/019; a existência dos environments não comprova deploy ou aprovação.

Sondas HTTP/latência/versão a cada 15 minutos, CSV, Issues JogoForaDoAr/LatenciaAlta, fechamento automático, /status/ e quatro DORA reais com comparação ao lead time de 11 dias/melhoria medida permanecem pendentes. Cron pode atrasar; demonstração exige execução observável.

Pipeline da tag final: submissao/GDD.pdf, LINK_DO_JOGO.txt, build.zip com LEIA-ME, pitch.mp4 humano e MANIFESTO.sha256, seguidos de triagem real. Vídeo de produção entra antes da tag final; relatório recebe evidências depois de release/triagem. Data/versão/identificação/URLs devem ser reconciliadas com release real; preview não é tag ou entrega final. Prazo 09/10/2026 até início da aula, horário não confirmado; prévia não retroagida. Nenhum aceite de publicação/pacote/nota/banca declarado nesta candidata.
