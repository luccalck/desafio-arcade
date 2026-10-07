# Rota do Código — Game Design Document

Versão de projeto: **{{VERSION}}**. Data: **07/10/2026**. Conceito A aprovado pelo responsável nesta data. Documento da versão candidata, ainda sem release publicada.

| Identificação | Valor verdadeiro nesta etapa |
|---|---|
| Jogo | Rota do Código |
| Atividade | Desafio Arcade — Integração e Entrega Contínua / DevOps |
| Squad e quatro integrantes (nome, RA, papel) | Identificação será fornecida pelo responsável; registro de equipe ainda incompleto |
| Repositório | https://github.com/luccalck/desafio-arcade |
| Build pública de produção / homologação | Ainda não publicada; não confundir preview local com produção |
| Vídeo | Ainda não gravado; deverá usar gameplay real da produção |
| Plataforma | WEB responsiva; mesma aplicação em computador e celular |

Este GDD descreve a versão candidata implementada em branch e o desenho da esteira. Os aceites de colaboração, revisão, publicação e avaliação educativa não são comprovados pela existência do documento. A identificação pendente impede considerar INT-02 concluído. CPF e assinaturas não integram a versão pública; eventual documento privado será confirmado com o professor.

## 1. Premissa e problema endereçado

O jogo trata a dificuldade de relacionar instruções a seu resultado e localizar a causa de uma falha, no início do aprendizado de programação. O público são estudantes iniciantes em tecnologia, com leitura básica em português e sem conhecimento prévio necessário de código. O acesso acontece por navegador e pela build offline, sem cadastro ou engine instalada pelo jogador.

A gamificação transforma um algoritmo em um percurso observável: montar comandos, executar, inspecionar e ajustar. Os erros permitem nova tentativa, sem perda de vidas ou limite de tempo. A conclusão de fases libera novos desafios e explica o conceito aplicado. Essa é uma hipótese de abordagem educativa; não houve estudo ou playtest humano que permita afirmar eficácia, diversão ou ganho medido.

## 2. High concept

Rota do Código é um puzzle educativo web em que o jogador programa um pequeno robô para atravessar uma oficina e entregar um módulo de energia. Em mapas curtos, monta comandos, executa passo a passo e observa a instrução responsável por cada movimento. Ao encontrar um obstáculo ou terminar longe do destino, recebe uma explicação concreta e pode depurar a sequência. Três desafios introduzem ordem de execução, correção de erros e repetição, com controles por teclado e toque, sem conta e com build offline. O diferencial é aprender pela relação visível entre programa, trajetória e resultado.

## 3. Gênero e plataforma

Puzzle educativo de programação por turnos, destinado obrigatoriamente à **WEB**, com interface responsiva. Não há versão nativa, APK ou executável de engine para o jogador.

TypeScript, HTML/CSS e vetores SVG originais; sem engine de jogo ou React. O esbuild empacota um script clássico IIFE e incorpora conteúdo local. Vitest testa as regras, Ajv valida JSON e Playwright testa o navegador. Node 24 e lockfile são ferramentas de desenvolvimento/CI, não requisitos para abrir a build offline. A escolha evita dependências de física ou renderização desnecessárias para um tabuleiro discreto e mantém controles HTML acessíveis.

## 4. Mecânicas-core

O jogador adiciona, remove e reordena ações. **Avançar** move uma célula na direção atual; **virar à esquerda/direita** gira 90 graus sem mover. A orientação inicial é leste. `Executar` anima comandos; `Um passo` executa uma ação básica por vez, inclusive dentro de repetição. `Parar` interrompe e retorna à edição; nova execução começa no início do mapa. Não há interpretação de código arbitrário.

Loop: objetivo → programa → execução/traço → resultado educativo → correção ou progressão. O comando em execução é destacado e as mensagens descrevem ação, direção e falha. Uma tentativa vence ao atingir o módulo; a execução termina imediatamente. Falha se o robô tenta atravessar parede ou borda, termina comandos fora do destino ou alcança o limite de passos. Após a falha, o programa é preservado para edição. Reiniciar a fase restaura posição, contador e programa inicial.

| Fase | Conteúdo / desafio | Limites e aprendizado |
|---|---|---|
| 1 — Primeira entrega | Corredor com curva; programa inicialmente vazio | 8 blocos / 16 passos; sequência e orientação |
| 2 — Rota interrompida | Duas ações iniciais, cuja segunda avança contra parede; corrigir rota | 14 blocos / 25 passos; diagnóstico pelo traço e depuração |
| 3 — Padrão de rota | Caminho em escada; representar padrão repetido | 5 blocos / 24 passos; repetir um grupo quatro vezes |

Repetição aparece na fase 3: de 2 a 4 vezes, com corpo de 1 a 8 ações básicas e sem grupos aninhados. A contagem considera um bloco para `repetir` e cada ação de seu corpo, independentemente das iterações. O grupo da solução usa 5 blocos e expande para 16 ações; a entrega termina na ação 15, antes da última curva.

Recompensas são progressão e explicação do conceito. Não há pontuação, ranking, monetização ou telemetria de partidas. O erro preparado da fase 2 é parte do conteúdo educativo, não o bug real de software exigido em INT-04.

## 5. Enredo e personagens

Um robô de entrega percorre uma oficina abstrata para alcançar um módulo de energia. O robô é uma criação vetorial original; não tem nome, biografia, diálogos ou avatar de terceiros. A narrativa é curta para manter a atenção na relação entre comandos e trajetória. Não há combate, adversários, storyboard narrativo ou sistema de personagens adicional nesta versão.

![Conceito visual original](images/concept.svg)

## 6. Fluxo do jogo

![Diagrama de estados](images/fluxo.svg)

O menu apresenta objetivo e controles. A partida reúne objetivo, mapa, editor, feedback e ajuda. Execução bloqueia edição; `Parar` libera uma nova tentativa. Vitória/falha leva à tela de fim da tentativa com mapa final e registro. Vitória permite avançar; falha permite editar. O terceiro sucesso abre o fim da campanha e o reinício retorna à primeira fase. Retornar ao menu interrompe qualquer execução pendente.

## 7. Level design

Mapas completos abaixo correspondem ao JSON versionado. Escuro representa parede, claro caminho livre, R o início e M o módulo. Cada movimento usa coordenadas inteiras. A interface fala em coluna/linha a partir de 1; o JSON usa índices a partir de 0. Não existem objetos coletáveis, recursos consumíveis ou plataformas físicas adicionais.

![Mapa da fase 1](images/mapa-1.svg)

Fase 1: início (0,3), leste; destino (3,1). Solução editorial: avançar três vezes, esquerda, avançar duas vezes. Caminho em L, com dica explícita para introduzir os controles.

![Mapa da fase 2](images/mapa-2.svg)

Fase 2: início (0,4), leste; destino (4,0). Solução: avançar, esquerda, avançar duas vezes, direita, avançar três vezes, esquerda, avançar duas vezes. O programa inicial avança duas vezes: a segunda ação encontra parede. O jogador deve usar o feedback para corrigir a curva ausente.

![Mapa da fase 3](images/mapa-3.svg)

Fase 3: início (0,4), leste; destino (4,0). Escada com quatro trechos iguais. Solução: repetir quatro vezes [avançar, esquerda, avançar, direita]. O limite de cinco blocos estimula representar o padrão em vez de escrever toda a sequência.

O validador exige mapa retangular, posições livres/diferentes, IDs únicos, programas dentro dos limites e solução editorial que realmente vence. Conteúdo inválido interrompe a build.

## 8. Interface do usuário — UI/UX

![Wireframes de projeto: menu, HUD e fim](images/wireframes.svg)

O visual usa oficina de eletrônica: bancada em papel claro, mapa escuro, robô amarelo e ação principal laranja. Menu explica as três etapas de uso. HUD mostra programa, blocos, passos, posição e direção. O fim explica a vitória ou causa da falha e oferece a próxima ação. Wireframes são imagens de projeto, não evidências de execução.

Todas as ações têm controles HTML por teclado/toque, sem arrastar obrigatório. Há link de salto, foco visível, mensagens de estado, orientação textual, legendas de mapa e movimento reduzido. Cor e áudio não são o único meio de feedback. A ordem de leitura mantém objetivo antes do mapa/editor. No celular, os painéis são empilhados. O teste de teclado cobre restauração do foco ao remover comandos; os testes de viewport e offline verificam uma parte dessas condições, sem constituir certificação de acessibilidade.

Telas do Stitch ainda não foram utilizadas; não declarar o diferencial avançado dessa ferramenta atendido. O playtest de três minutos por colega de outra turma e sua revisão continuam pendentes em P05.

## 9. Áudio e música

A versão candidata não utiliza áudio, música ou efeito sonoro. Não há downloads ou ativos de som. Instruções e feedback são visuais/textuais. Áudio opcional só será acrescentado com origem, licença, controle de volume e alternativa textual registrados por PR.

## 10. Arte e referências visuais

Concept art, robô, mapas, wireframes e diagramas foram criados em SVG para este projeto com assistência do Codex. A interface usa fontes existentes no sistema, sem distribuir arquivos de fontes nem carregá-los de CDN. Símbolos simples de direção são caracteres de interface; o robô não imita personagem ou marca externa. As imagens/logotipos do modelo Word não foram incorporados ao produto.

Referências técnicas consultadas: [esbuild — formato IIFE](https://esbuild.github.io/api/#format), [Vitest](https://vitest.dev/guide/), [Playwright — assertions](https://playwright.dev/docs/test-assertions), [GitHub — ambientes](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments) e [GitHub — origem do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Documentação informa escolhas técnicas; suas imagens/textos não são copiados para o jogo. Origem e licenças dos componentes distribuídos ou usados na construção estão em THIRD_PARTY e no SBOM.

## 11. IA e componentes de terceiros

| Ferramenta / componente | Uso | Licença / condição |
|---|---|---|
| Codex | Requisitos, concepção aprovada, código, conteúdo, testes, SVGs e documentação | Uso assistido registrado em AI-USAGE; revisão humana do lote pendente antes do merge |
| TypeScript / esbuild | Checagem e empacotamento | Apache-2.0 / MIT, conforme inventário |
| Ajv / Vitest / Playwright | Validação, regras e navegador | MIT / MIT / Apache-2.0 |
| Markdown-it / fflate | GDD e ZIP automatizados | MIT / MIT |
| ESLint / typescript-eslint / tsx | Lint e validação no desenvolvimento | MIT, conforme inventário e dependências transitivas |

As versões exatas, autores, URLs e dependências transitivas estão no lockfile, THIRD_PARTY e SBOM. Nenhum material Opal/AI Studio foi utilizado; essa condição não dispensa esquema e revisão dos textos assistidos pelo Codex. Não há backend remoto, API de IA em runtime, imagem terceirizada, dado pessoal de jogador ou serviço pago necessário.

Declaração de direitos/originalidade: o projeto foi concebido para este trabalho com assistência de IA explicitada; os materiais próprios e as licenças de terceiros são identificados. A revisão e confirmação coletiva do squad sobre os direitos ainda não estão registradas. Não declarar um aceite inexistente dos termos do concurso, nem assinatura ou revisão humana fictícia. A versão pública da UC não representa inscrição no concurso.

## 12. Ideias adicionais e próximos passos

Na branch candidata: três fases, editor de ações/repetição, execução automática/por passo, feedback, fim/reinício, conteúdo validado e build estática. Validações locais são registradas no acompanhamento; não equivalem a release em produção.

Prioridades restantes: revisões reais, colaboração dos quatro, CI verde de clone limpo, HML/PRD, ambientes protegidos, rollback/sondas/DORA reais, playtest, vídeo legendado, triagem e relatório técnico. Mais fases, condicionais, áudio e personalização são ideias futuras, sem compromisso de implementação nesta entrega. Mudança de mecânica exige atualização do GDD por PR.

## Esteira

![Diagrama da esteira proposta](images/esteira.svg)

Repositório: https://github.com/luccalck/desafio-arcade . GitHub Flow e Conventional Commits. PR requer outra pessoa e CI verde; IA é revisada antes do merge. CI verifica lint, regras/conteúdo, E2E local, segurança, SBOM e build/GDD/ZIP. O mesmo ZIP deve ser usado na HML e PRD.

Arquitetura de implantação: `gh-pages` escrito apenas pela pipeline, `/hml/`, `/releases/<sha>/` imutáveis e carregador/rollout. Estratégia azul-verde: testar nova pasta, aprovar produção, trocar `estavel`, executar smoke e recuperar o ponteiro em caso de falha. Sessão preserva a versão enquanto válida; rollback retira seleção inválida. Histórico registra responsável e motivo. Rollback < 5 minutos incluindo Pages deve ser medido, não presumido.

Monitorar HTTP/latência/versão de HML e PRD a cada 15 minutos; dados em `observabilidade`, alertas como Issues e painel `/status/`. DORA real segue a definição do enunciado e comparação de lead time com 11 dias. O cron pode atrasar; o ensaio usa detecção ativa por smoke/workflow.

Na tag final, a pipeline deve gerar GDD.pdf, LINK_DO_JOGO.txt, build.zip com LEIA-ME, vídeo humano e MANIFESTO.sha256, seguido de triagem real. O vídeo é uma entrada gravada de produção antes do fechamento; o relatório recebe os resultados finais de release/triagem depois. A release, GDD e metadados precisam coincidir em versão/data, com links reais e identificação preenchida. Nenhum desses aceites externos é declarado cumprido neste documento candidato.
