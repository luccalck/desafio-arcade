# Uso transparente de IA

| Data | Ferramenta | Etapa e uso efetivo | Saída | Aceite/revisão |
|---|---|---|---|---|
| 07/10/2026 | Codex | Leitura do HTML completo, Word e roteiros; confronto de requisitos; três conceitos e recomendação | Proposta local e docs/gestao/design.md | Solicitante aprovou conceito A nesta data |
| 07/10/2026 | Codex | Core, conteúdo, interface, SVGs originais, testes, correção de foco, scripts e CI | Branch feature/primeiro-ciclo | Testes automatizados registrados; revisão por outro humano ainda pendente antes do merge |
| 07/10/2026 | Codex | GDD completo e documentação de construção/licenças | docs/gdd.md e PDF gerado | Inspeção técnica/visual pela IA; conferência humana e identificação acadêmica pendentes |

Instrução principal: desenvolver jogo WEB educativo conforme os originais do professor e planos C/P/D/R/S, registrar execução verificável e preservar autoria/licenças. Conceito aprovado: programação de robô por sequência, depuração e repetição.

Nenhuma IA em runtime. Nenhum uso de Opal, AI Studio, Stitch ou gerador de imagens raster até este registro. Não houve teste com usuário humano, coleta de consentimento, revisão de colega, vídeo ou medição educativa realizada pela IA.

Revisão necessária antes do merge: fatos educativos, comportamento, direitos de ativos, dependências, segurança e documentação. Registrar autor/revisor reais e link do PR após a revisão. IA não substitui integrantes, aprovação requerida de outro autor ou banca.

## Evolução aprovada - 07/10/2026

Codex auxiliou a proposta aprovada de quatro desafios concretos, testes de contratos antes do core, coleta/AND/repetição, tutorial, editor, campanha/XP/progresso local e interface responsiva. Foram executados testes automatizados e capturas reais via Playwright/Chrome, inspecionados desktop/celular e atualizado o GDD/PDF/mapas. Os testes não representam playtest humano. O solicitante aprovou a mecânica; revisão por outro integrante continua pendente no PR #2. Nenhuma nova ferramenta de IA em runtime, raster, Opal, AI Studio ou Stitch foi usada.

## Laboratório de lógica — 07/10/2026

Codex auxiliou a proposta integralmente aprovada de cinco missões e desafio final, plano, contratos e intérprete puro por blocos, conteúdo educativo e cenários, menus, editor, simuladores, preferências, persistência e testes. Foram retiradas as fontes ativas de rotas, preservadas no Git, e adaptada a regressão do bug real de foco #1. Nenhum integrante/revisor foi simulado. Exemplos, prática e desafios passaram em testes locais; isso não mede aprendizagem humana.

GDD de doze seções atualizado, seis mapas de sistemas/wireframes/diagramas SVG gerados por código e capturas reais de navegador local. PDF gerado automaticamente e inspecionado por página. IA também revisou os scripts e corrigiu referência antiga no verificador de reprodutibilidade. Uso de IA em autoria/desenvolvimento/documentação é explícito; nenhuma IA em runtime ou nova ferramenta de imagem, Opal, AI Studio ou Stitch. Revisão humana de código/conteúdo/licenças antes do merge e participação real dos quatro continuam pendentes.

## Bancada visual - 07/10/2026

Codex auxiliou a comparação de opções e a proposta de máquinas de dados aprovada com “Sim”, o plano e testes contratuais anteriores ao core. Implementação: simulador puro, duas montagens editoriais por missão, dados/sensores/memória, schema/validação, persistência própria, bancada/gestos/menu/feedback visual e ajuda sob demanda. Fontes ativas do laboratório anterior foram retiradas, com histórico e bug real de foco #1 preservados.

Testes automatizados de regras/integração/navegador foram executados; capturas reais desktop/celular têm fonte identificada. GDD de doze seções, mapas derivados do JSON e wireframes/diagramas originais atualizados; PDF gerado pela automação e páginas inspecionadas. Referências de jogos foram consultadas sem copiar ativos. Nenhuma dependência nova, ferramenta raster, Opal, AI Studio, Stitch ou IA em runtime. Nenhum resultado de aprendizagem humana, integrante ou revisão foi simulado. Aprovação do solicitante é de concepção; outro integrante deve revisar código, conteúdo, direitos e evidências antes do merge.

## Oficina de Jogos — 09/10/2026

Codex auxiliou comparação de alternativas, concepção A escolhida e plano aprovado para execução inline. Uso efetivo: parser/intérprete AST limitado, funções JavaScript editoriais, motor/player de nave, editor, persistência, exportação HTML, schema/contratos, testes unitários/integração/navegador, arte SVG/CSS e documentação. Fontes de circuitos retiradas da campanha ativa, preservadas no histórico. Uma fonte principal em jogo-arcade, sem nova dependência.

Testes de comparação com JavaScript nativo usam somente fontes editoriais confiáveis em Node VM com timeout; código do jogador não usa eval/Function no aplicativo. Codex identificou e corrigiu bug real de retomada de regra antiga após edição, com execução falhando antes e regressão passando depois. Capturas desktop/celular/exportação são da aplicação executada via controles reais, sem inserir progresso no armazenamento. GDD completo, seis mapas/wireframes/diagramas originais e PDF gerado pela automação; doze páginas renderizadas e inspecionadas.

Nenhuma IA em runtime, imagem raster gerada, Opal, AI Studio ou Stitch. Sem medição educativa, playtest humano, identidade de integrante, revisão humana ou produção simulados. Aprovação do solicitante é de concepção/execução, não revisão de outro autor. Conteúdo, código, direitos e evidências continuam sujeitos à revisão humana antes do merge e à participação real dos quatro na banca.

## Python e publicação Pages — 12/10/2026

Solicitante pediu desafios Python e acesso pelo GitHub Pages. Codex auxiliou adaptação da oficina aprovada, plano, parser/interpretador Python limitado, semântica/diagnósticos/guardas, conteúdo/ajuda/editor, exportação HTML e funções .py, persistência própria, comparação de fixtures confiáveis com CPython, testes e documentação. Não houve reescrita do motor web para aplicativo nativo ou backend. HTML exportado compartilha o mesmo interpretador AST; nenhum exec/eval de tentativa do jogador em runtime.

Codex auxiliou workflow de preview que recupera ZIP/checksum da CI, escreve gh-pages pelo Actions, preserva releases por SHA, publica Pages e executa smoke real. Configuração autorizada: Pages workflow/HTTPS, variable de preview e branch feature/primeiro-ciclo no environment github-pages. Proteção/revisão da main mantidas; não simular outro autor ou approval em producao. Autor Git confirmado luccalck/256704169+luccalck@users.noreply.github.com, identidade do solicitante, sem atribuir contribuição a integrantes ausentes. Commits de deploy do serviço Actions usam sua identidade de bot, não contam como participação humana.

Teste encontrou ausência de botão .py imediatamente ao vencer; falha/captura anteriores preservadas, markup compartilhado corrigiu e regressão passou. GDD completo/PDF/mapas/wireframes/capturas reais atualizados, sem imagem raster de IA. CPython é ferramenta local/CI de validação, não serviço remoto. Nenhuma dependência npm nova, IA em runtime, Opal, AI Studio, Stitch ou medição de aprendizagem humana. Revisão de outro integrante antes do merge e participação real dos quatro permanecem pendentes. Resultados CI/Pages devem ser os da execução, nunca inferidos desta autoria.

## Auditoria do enunciado e apresentação do repositório — 12/10/2026

Codex auxiliou a releitura integral do HTML e do JavaScript da ficha, a inspeção real de histórico/PRs/configurações e a redação da auditoria, matriz e README em português. A branch padrão passou temporariamente para a branch com o código completo; main continua protegida e aguarda revisão de outro autor. A auditoria distingue configuração, execução, lacunas e dependências humanas, sem atribuir nota ou contribuição fictícia. Nenhuma mecânica, imagem ou identidade nova foi criada nesta etapa. Revisão humana destes documentos e do código antes do merge continua pendente.

## Checklist completo — 12/10/2026

Solicitante pediu um Markdown com todos os itens do HTML e checks atualizados conforme conclusão. Codex desdobrou as dez seções, abas, kit/TODO, cronograma, rubrica, banca e campos/validações JavaScript em docs/gestao/checklist-avaliacao.md, com complemento do modelo GDD claramente identificado. Foram separados mínimos, faixa avançada, condicionais e reconferências finais. Marcação inicial usa arquivos e execuções anteriores verificáveis; itens sem execução ou participação humana continuam abertos. Identificadores e links locais conferidos, sem alteração de mecânica ou criação de evidências. Revisão humana deste documento antes do merge permanece pendente; atualização futura exige evidência para cada check.

## Plano distribuído e rascunho da ficha — 12/10/2026

Solicitante informou Lucca Castilho, Davi Paes, Miguel Oliveira e Lucas Souza e pediu divisão igual de pelo menos vinte passos, com prompts profissionais e commit pela própria conta GitHub. Codex preparou quarenta passos, dez por pasta de integrante, índice/dependências, estrutura de repositório e mapa de todos os 313 checks inicialmente abertos. Papéis/revisores são propostas; nomes são os fornecidos. Esses documentos de planejamento feitos com a conta do solicitante não comprovam autoria/contribuição dos outros três.

Cada prompt inclui escopo, arquivos, contexto HTML/checklist, checks literais, comandos/validações, dependências/aceites G0–G8, integráveis, rubrica, eliminatórios, dados humanos, revisão cruzada e instrução obrigatória de commit com a própria conta real. Não foram implementadas as funções futuras da esteira nesta etapa. Mapa conferido sem omissão/duplicação, quantidade igual e dependências acíclicas. Revisão humana antes do merge permanece pendente.

HTML original foi aberto em Live Server local, preservado. Dados disponíveis e autoavaliações 10 solicitadas foram preenchidos como rascunho; nenhum INT foi declarado entregue e nenhuma declaração aceita. Faltam dados/URLs/execuções verdadeiros para liberar TXT. Valores estimados não são nota oficial nem fator individual comprovado. Estado/captura real ficaram no contexto local; nenhum consentimento, RA ou revisão foi inventado.

## Reorganização em quatro blocos sequenciais — 12/10/2026

Solicitante pediu Lucca nos dez primeiros, seguido de um integrante por dez passos. Codex reorganizou os mesmos quarenta prompts para Lucca001–010, Davi011–020, Miguel021–030 e Lucas031–040. Ações, autoria/commit/revisores, índice, estrutura, mapa e controle foram atualizados; nomes e quantidade preservados. Dependências técnicas seguem números anteriores, sem exigir desenvolvimento de um bloco posterior para entregar o escopo do atual.

Checks de comprovação publicada/final foram atribuídos a etapas com as provas disponíveis; regressão local006 é entregue à publicação011 e comparação de candidata027 à release035. Painel020 informa DORA indisponível até integração real024. Rollback básico precisa estar integrado antes de PRD019; etapa022 fortalece/testa recuperação e026 comprova operação real. Protocolo04-passagem-de-bloco.md registra entradas/saídas/evidências e ações humanas. Papéis continuam propostas e permitem trabalho em outras áreas; os quatro precisam autoria real em três INT, revisão cruzada desde o primeiro bloco e banca.

Verificação administrativa confirmou quarenta arquivos, dez por intervalo/pessoa, todos os 313 checks do snapshot mapeados uma vez, identidade/commit corretos nos prompts, links válidos e dependências acíclicas. Nenhuma função do jogo/esteira foi executada por esta reorganização nem contribuição de colega atribuída. Revisão humana antes de merge permanece pendente.

## Organização conforme o kit do professor — 12/10/2026

Solicitante pediu organização de pastas seguindo o HTML e referências locais. Codex comparou a seção06 com a estrutura real, moveu controles para docs/gestao, execução vigente para docs/execucao, planos/especificações/evidências antigos para docs/historico e preservou os nomes/códigos/conteúdo rastreável. Links e caminhos nos documentos foram atualizados para seus destinos locais atuais; esses movimentos não representam reexecução das evidências históricas.

GDD continua docs/gdd.md; docs/relatorio.md foi criado como fonte em preparação, sem PDF técnico final ou métricas inventadas. Carregador existente extraído de scripts/prepare-pages.mjs para pages/index.html e consumido pelo publicador; o HTML gerado tem bytes idênticos aos anteriores. pages/status registra destino ainda não implementado, sem painel fictício. Root README e README do contexto apontam a um único projeto e ao primeiro passo local. Nenhum passo funcional/INT foi encerrado por reorganização.

Validações reais: quarenta prompts/dez por intervalo/pessoa, mapa dos313checks semomissões/duplicações;80MDslocais semlinks ausentes; lint; seis testes de integração Pages; comparação dos17arquivos de publicação antes/depois byte a byte; build de seis missões; GDDpdf12pA4/pdfinfo. Originais HTML/DOCX preservados e hashes conferidos. Revisão humana antes do merge continua pendente; não houve revisão fictícia ou alteração manual de produção. Origem das ferramentas e registros anteriores permanecem no histórico.
