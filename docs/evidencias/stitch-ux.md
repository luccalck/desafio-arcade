# Passo009 — Stitch e conferência de UX

Executamos somente009/INT-02/04/05, P03/P04/D03, em13/10/2026. Mantemos mecânica, stack e aparência do jogo aprovado; não importamos código do Stitch nem alteramos src, dependências ou workflows. G1 depende do entendimento real dos quatro.

## Origem e exportação efetivas

Criamos **Rota do Código UI** no [Stitch](https://stitch.withgoogle.com/projects/9671895915842664821?pli=1), conta do responsável Lucca, opção WEB, modelo exibido **Balanced** (não identificamos o modelo interno). Lucca autorizou explicitamente o aceite dos termos adicionais; marketing e pesquisa foram desmarcados antes de Continuar. Nenhuma conexão GitHub/AI Studio/Figma/Netlify foi feita. O prompt só contém requisitos públicos do jogo.

[Prompt inicial integral](stitch-prompt-009.txt). Segunda instrução: corrigir as seis telas, remover Laboratório/Conquistas/Pyodide/telemetria/SHA/tempo falso, usar fontes locais/SVG e dicionário entrada com retorno -1/0/1, preservar menu/5missões/final e distinguir referências de execução. A revisão foi enviada pelo campo do Stitch e exportada em ZIP. A espera automatizada pelo evento de download expirou; o arquivo real `stitch_rota_do_c_digo_ui.zip` apareceu em Downloads, com1.016.086bytes. Conferimos sua estrutura e hashes antes de extrair. ZIP/HTML originais permanecem em `.contexto/passo-009`, fora da build e da submissão; PNGs originais sem retoques são versionados.

[Manifesto de sete imagens](stitch-export-009.json) registra SHA-256/dimensões: seis telas mais mascote gerado pelo serviço. São **referências produzidas pelo Stitch**, não screenshots do jogo e não provas de funcionamento ou métricas.

| Tela | Desktop | Celular |
|---|---|---|
| Menu | [PNG original](../images/stitch-009/menu_principal_desktop/screen.png) | [PNG original](../images/stitch-009/menu_principal_m_vel/screen.png) |
| HUD/oficina | [PNG original](../images/stitch-009/oficina_hud_desktop/screen.png) | [PNG original](../images/stitch-009/oficina_hud_m_vel/screen.png) |
| Encerramento | [PNG original](../images/stitch-009/encerramento_do_projeto_desktop/screen.png) | [PNG original](../images/stitch-009/encerramento_do_projeto_m_vel/screen.png) |

## Conferência técnica e decisões

A paleta azul/ciano/amarelo, editor junto da arena e controles de toque são coerentes com a proposta. A revisão removeu parte dos recursos inventados; ainda restam divergências. **Não aprovamos essas referências como especificação implementada.**

| Divergência observada no export | Decisão |
|---|---|
| HUD mostra150XP e recompensa+50XP; jogo usa100XP por missão e itens10/25pontos | Usar contratos do GDD/core, sem importar valores gerados |
| Mobile prioriza esquerda; core prioriza direita quando ambas pressionadas; desktop ainda contém comparações por string | Rejeitar código gerado; jogo existente e testes continuam fonte da regra |
| Resultado usa assinaturas mover(pos,vel), colidir(nave,obst), pontuar(cristais), criarOnda(nivel) | Todos os contratos reais recebem entrada; referência visual não é tutorial executável |
| Menu sugere áudio/Python3 e outras etiquetas; jogo não tem áudio nem runtime CPython no navegador | Remover antes de eventual redesenho; nenhum recurso prometido |
| Telas muito longas: HUD mobile1326px, final desktop1112px | Referência requer rolagem; não prova ausência de overflow na aplicação |
| CDN Tailwind, Google Fonts/Material Symbols e imagem gerada remota persistem no HTML apesar do pedido | Não incorporar HTML/arquivos remotos no site; manter fontes/arte locais existentes |
| Testes/estatísticas exibidos pelo mockup são ilustrativos | Não usar como evidência de testes ou aprendizagem |

Os PNGs documentam uso efetivo do Stitch e podem ser comparados às capturas reais abaixo; não substituem a revisão por outro autor. A escolha de integrar qualquer desenho futuro requer revisão/concepção e regressão próprias.

## Execução real da aplicação

Build local0.6.0, fonte **b94469ee807093a4e64769f868c13143a0ff5b0c**,13/10/2026. `npm run build`: seis missões válidas. `npm run test:e2e -- --workers=1 --output .contexto/passo-009/jogo-results`: **17passed,56.1s**. [JUnit original](stitch-ux-009.junit.xml). Sem injetar desbloqueio/progresso da campanha. Nenhuma execução de HML/PRD formal ou playtest humano neste passo.

| Prova local | Arquivo / metadados |
|---|---|
| Menu1280×900 | [PNG](../images/menu-real-009.png), [JSON](menu-real-009.json) |
| Primeira missão concluída | [PNG](../images/hud-real-009.png), [JSON](hud-real-009.json) |
| Partida final vencida | [PNG](../images/fim-real-009.png), [JSON](fim-real-009.json) |
| Vitória390×844 por toque | [PNG](../images/fim-mobile-real-009.png), cenário12 do JUnit |

Testes verificaram ajuda sob demanda, retorno de foco, pausa, erro de sintaxe, menus/bloqueio, preferências, persistência, teclado, Tab/Enter/Escape no editor, vitória no celular sem overflow horizontal e HTML exportado offline sem requisições externas. Isso não certifica todos os aparelhos, contraste completo ou compreensão por leigos.

GDD mantém seis mapas derivados do conteúdo com arena480×320, nave/objetos/posições e diagrama de estados, além dos wireframes próprios. Três categorias ficam identificadas: desenhos de projeto, referências Stitch e capturas de execução local.

## Direitos, critérios e pendências

Referências assistidas por IA, com prompt/origem em AI-USAGE e condições em THIRD_PARTY. Não declaramos exclusividade ou licença MIT sobre fontes/ícones de terceiros. Bibliotecas remotas do export não integram build/npm/SBOM; o ZIP original não é entrega acadêmica.

**I02-15:** comprovado uso/exportação de telas Stitch com origem; nenhum equivalente inventado. **G1:** aberto: Desenvolvimento precisa conferir fluxo e os quatro precisam compreender o backlog; revisão de outro autor antes do merge, direitos coletivos e playtest continuam pendentes. Acesso do revisor teveAPI422 no008; não simulamos revisão nem insistimos em solicitação idêntica.

GDD/PDF local:12seções preservadas, highconcept804caracteres,18páginasA4, pdfinfo válido; páginas1/10–16 renderizadas/inspecionadas. Primeira geração falhou por CRLF introduzido na edição; normalizaçãoLF corrigiu, sem mudar scripts ou aproveitar PDF antigo como prova. CI: registrar execução efetiva após publicação. PR/candidato deste passo será registrado no controle; sem merge ou promoção. Próximo passo010 somente por instrução própria.
