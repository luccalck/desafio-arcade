# Pendências vigentes por passo

Conciliação em 15/10/2026 (America/Sao_Paulo). Este é o estado atual dos passos 001–040. Corrigimos checks históricos superados em vez de acrescentar outra lista contraditória. `[x]` indica escopo comprovado; `[ ]` indica trabalho/aceite ainda necessário. Uma etapa pode estar parcialmente concluída. O [checklist integral do HTML](../gestao/checklist-avaliacao.md) conserva todos os códigos e critérios; não considerar um INT inteiro aceito por um check parcial.

O [histórico anterior](../evidencias/pendencias-historico-2026-10-15.md) preserva integralmente diagnósticos, comandos, falhas, publicações e motivos originais. “RAs ausentes”, “acessos não aceitos”, “main bootstrap”, “produção não publicada” e “painel404” são situações antigas, não cobranças atuais. Não exigimos cada revisão planejada nominalmente quando já houve revisão real da consolidação; a revisão do PR34 atual continua obrigatória.

## Evidências de referência

- [Registro operacional](../evidencias/operacao-2026-10-15.md): produção0.7.0/SHA88d533e; run 38829484114 integralmente verde, HML216,414s, smoke, mesmoZIP29.000bytes e14hashesHTTP; ZIPoriginal offline.
- [Sondas/DORA](../evidencias/operacao-2026-10-15/dora-38830013027.json): três métricas com uma implantação; MTTRnull. [Painel testado](../evidencias/operacao-2026-10-15/painel-88-browser.json).
- [Revisões dos colegas](../evidencias/revisoes-confirmadas-2026-10-14.md), [contribuições](../contribuicoes.md) e [conciliação documental](../evidencias/conciliacao-pendencias-2026-10-15.md).
- [Ficha persistente](../gestao/ficha-entrega.md): atualizar respostas disponíveis; HTML/TXT ficam para o último passo, conforme orientação vigente.

## Ordem restante do fechamento

1. Revisão externa e integração da documentação atual PR34; confirmação de direitos/marcos/notificações e equivalênciaPages.
2. Ensaio controlado de recuperação/alertas/sessão, métricas completas e melhoria medida; playtest humano.
3. Pitch real (mantido pendente), notas/GDD/PDF finais e tag/release/pacote/triagem/agendamento pela pipeline.
4. FichaHTML/TXT, envioAVA/recibo e ensaio/banca dos quatro. Conferência histórica e prazo oficial dependem de informações verdadeiras; não criar datas fictícias.

Concurso, canário (usamos azul-verde), Godot, telemetria e golden eval Opal/AIStudio são condicionais, não funcionalidades obrigatórias faltantes da stack adotada. Mantemos as condições no checklist integral sem contabilizá-las como implementação obrigatória. Não prometemos nota ou fator individual máximo.

<a id="passo-001"></a>

## Passo 001 — Equipe, contexto e marcos

INT-01/02/09.

- [x] Aura 67, quatro nomes completos, RAs e papéis registrados em SQUAD/GDD/ficha; Lucca: 26179873.
- [x] Quatro contas com acesso ativo, conferidas novamente na API; não cobrar convites já aceitos.
- [ ] Comprovar, se existirem, registros do início informado em 03/10, Git anterior, composição desde 02/10 e prévia de 05/10; não retroagir documentos/tags. Responsável: squad; conferir também 035/037/040.

<a id="passo-002"></a>

## Passo 002 — Arquitetura e qualidade

INT-04/06/03.

- [x] Core separado da renderização; conteúdo/schema, editor Python e exportação documentados e testados. CI formal: 299 testes e 36 E2E; cobertura core acima de 70%.
- [x] Lint, build, JSON inválido bloqueante, clone limpo e reprodutibilidade verificados. Não repetir o passo por falta de deploy antigo.

<a id="passo-003"></a>

## Passo 003 — Git, acessos e Pages

INT-01/03/07.

- [x] Acesso dos quatro e leitura pública; main restaurada como padrão, protegida com PR/revisão/CI. PR32/33 integrados após revisão real de Lucas.
- [x] Environments homologacao/producao configurados; aprovação de produção efetivamente registrada.
- [ ] I07-01/KIT-12: Pages usa build_type=workflow, alimentado pela branch gh-pages da pipeline. Justificar e obter validação da equivalência permitida no HTML, ou alinhar a origem literal sem quebrar a publicação. Responsável: Plataforma; antes do aceite final.

<a id="passo-004"></a>

## Passo 004 — Segurança e privacidade

INT-05/08/03.

- [x] Dependabot, Gitleaks bloqueante/pre-commit, audit de produção, SBOM e política de vulnerabilidades implementados e executados; relatórios reais disponíveis.
- [x] Ausência de coleta pessoal/telemetria documentada e verificada no escopo testado.
- [ ] Reconferir scanners, licenças e dados privados no material final, incluindo pitch. Responsável: SRE/squad; completar em 008/035/036, sem confundir scanner limpo com garantia de direitos.

<a id="passo-005"></a>

## Passo 005 — GDD e identificação

INT-02/01.

- [x] Quatro RAs completos; todas as doze seções do modelo, identificação, declarações e Esteira presentes. High concept: 804 caracteres.
- [x] GDD revisão027 convertido automaticamente; PDF de 18 páginas validado por pdfinfo e renderização. O limite de 12 páginas é do relatório técnico.
- [ ] Revisão externa da atualização documental no PR34 e alinhamento do GDD com a tag/release final. Responsável: outro integrante/Plataforma; ver 025/035.

<a id="passo-006"></a>

## Passo 006 — Regressão HML

INT-04/03.

- [x] Regressão pública formal executada na main: quatro cenários em HML, incluindo campanha desktop/toque e encerramento; JUnit e capturas arquivados.
- [x] Smoke de candidata e raiz efetivamente executados após promoção formal do mesmo ZIP. Não há smoke de produção faltante para a implantação88d533e.

<a id="passo-007"></a>

## Passo 007 — Esteira formal

INT-03/06/05.

- [x] Jobs paralelos, cache, permissões por job, gate ci, pacote por SHA/run/tentativa, HML e PRD integrados; cadeia 38829484114 integralmente verde.
- [ ] I03-24: notificação executada no Actions; confirmar recebimento/consulta pelo squad. Não confundir Watch dos alertas com recebimento desta notificação.
- [ ] Aceite integral ainda depende de release/recuperação/triagem reais nos015/022/023/026/035/036; não reimplementar os jobs já funcionais.

<a id="passo-008"></a>

## Passo 008 — Licenças, IA e direitos

INT-05/02/01.

- [x] Inventário, THIRD_PARTY, LICENSE, AI-USAGE, scanners e fontes/ativos registrados; revisão do P2 de Miguel efetivamente concluída no PR35 e nova aprovação de Lucas no PR33.
- [ ] Confirmar créditos na origem dos seis componentes apontados em direitos.md: @esbuild/win32-x64, @eslint/config-helpers, @rolldown/binding-win32-x64-msvc, argparse, lightningcss e lightningcss-win32-x64-msvc. Responsável: SRE.
- [ ] Concluir confirmação coletiva de autoria/originalidade/direitos de uso, revisão por uso de IA e inventário final incluindo vídeo; preservar consentimentos privados. Responsável: quatro integrantes; GDD-15, I05-11/14–17/21/22 e DIR aplicáveis.

<a id="passo-009"></a>

## Passo 009 — Stitch e UX

INT-02/04/05.

- [x] Seis referências Stitch exportadas e versionadas; divergências identificadas e não incorporadas ao jogo. Não há obrigação de implementar os desenhos divergentes.
- [ ] Confirmar compreensão do fluxo/backlog pelos quatro e revisar clareza/acessibilidade com pessoas reais; ligar ao playtest021. A revisão coletiva não é simulada pelo teste automatizado.

<a id="passo-010"></a>

## Passo 010 — Offline e integridade

INT-06/04.

- [x] ZIP original da produção88d533e validado offline por file://: campanha, 23 casos, vitória, .py/HTML e HTML exportado, sem rede/erros. Tamanho29.000bytes e checksum confirmados.
- [ ] Repetir a conferência para os artefatos finais da tag/release, e comparar hash da Release com HML/PRD em027/035. Não exigir nova build entre ambientes.

<a id="passo-011"></a>

## Passo 011 — Homologação formal

INT-03/07/04.

- [x] Publicador integrado e executado na main revisada. HML4/4, recibo, HTTP/version/SHA e hashes preservados.
- [x] Medição operacional verificada: 216,414s desde o merge comprovado até conclusão E2E; falha anterior do coletor corrigida por PR33/35. Não resta execução HML desta candidata por fazer.

<a id="passo-012"></a>

## Passo 012 — Sondas e histórico

INT-08/03.

- [x] Monitor habilitado e executado por agendamento, dispatch e pós-produção; HTTP/latência/versão em HML/PRD, CSV na observabilidade e relatórios arquivados.
- [x] Atrasos reais do cron documentados; configuração*/15 não equivale a pontualidade garantida.
- [ ] Continuar coleta até a banca e arquivar amostras, inclusive falhas; tratamento real de alertas pertence a016/026 e vigilância final032.

<a id="passo-013"></a>

## Passo 013 — Conteúdo e aprendizagem

INT-04/02/10.

- [x] Contratos educativos, alternativas e transferência verificados em fonte/AST/HTML/CPython; JSON inválido bloqueia build. Opal/AI Studio não usados para conteúdo.
- [ ] Avaliar compreensão, interesse e aprendizagem observada no playtest021; não inferir resultado humano da CI.

<a id="passo-014"></a>

## Passo 014 — Smoke de produção

INT-04/07/03.

- [x] Smoke formal da candidata e da raiz aprovado na run 38829484114; recursos/versão/editor/movimento/pausa verificados. Relatórios e capturas preservados.
- [ ] Caminho de smoke falhando e recuperação fim a fim precisa do ensaio022/026; sucesso saudável não comprova rollback.

<a id="passo-015"></a>

## Passo 015 — GitHub Releases

INT-06/01/07.

- [x] Publicador por tag, validações de proveniência e anexos implementados e testados.
- [ ] Executar release de tag anotada sobre SHA aprovado, notas revisadas e RELEASE_NOTES_SHA256; verificar políticas para tags e FORMAL_RELEASE_ENABLED sem retirar gates. Nenhuma tag ou GitHub Release existe na consulta atual.
- [ ] Comprovar anexos ZIP/checksum/SBOM/GDD/PDF, hash igual à produção e procedimento de repetição por run/tentativa original. Responsável: Plataforma; etapa035.

<a id="passo-016"></a>

## Passo 016 — Alertas

INT-08/05.

- [x] JogoForaDoAr, LatenciaAlta, deduplicação e autocerramento implementados/testados; label e Watch registrados. Reconciliação saudável real executada com actions vazias.
- [ ] I08-10–14/31: demonstrar os dois alertas com sondas de falha/latência reais num ensaio identificado, abertura/deduplicação/autocerramento de Issues e fontes verificáveis. Não inserir fixtures no CSV como incidentes reais. Responsável: SRE; ver026.

<a id="passo-017"></a>

## Passo 017 — Roteiro do pitch

INT-10/05/02.

- [x] Proposta, conceito/diferencial, roteiro e planejamento de legendas/créditos disponíveis.
- [ ] Gravar/validar o MP4 final e reconferir consentimentos de quem aparece e direitos dos materiais efetivamente usados. Pitch mantido pendente por orientação de Lucca; ver029.

<a id="passo-018"></a>

## Passo 018 — Rollout e sessão

INT-07/04.

- [x] Loader, rollout.json e azul-verde integrados e executados; release imutável, estável/anterior e promoção por commit da pipeline comprovados.
- [ ] I07-15/KIT-19: comprovar sessão mantida entre duas implantações formais, incluindo retirada de versão defeituosa e armazenamento indisponível. Testes de contrato existem; falta evidência operacional do ciclo completo.

<a id="passo-019"></a>

## Passo 019 — Produção aprovada

INT-03/07/06.

- [x] Aprovação real no environment producao, publicação imutável88d533e, promoção azul-verde e smoke; mesma build sem recompilação. Sete arquivos por ambiente, catorze hashes HTTP idênticos.
- [x] Monitor pós-produção integrado e verde; não há publicação formal desta candidata pendente.
- [ ] Tag/release finais, teste de sessão e recuperação permanecem em018/022/026/035; não confundir publicação do site com GitHub Release.

<a id="passo-020"></a>

## Passo 020 — Painel

INT-08/03.

- [x] /status/ publicado HTTP200, desktop/celular/refresh e ausência de overflow/erros conferidos; disponibilidade, latência, versão, estratégia e DORA renderizados.
- [ ] Atualizar/validar dados após ensaio e melhoria; MTTR deve continuar indisponível enquanto não existir alerta real aberto/fechado. Revisão humana de acessibilidade/teclado/leitor de tela ainda não comprovada.

<a id="passo-021"></a>

## Passo 021 — Playtest humano

INT-04/10/02.

- [x] Protocolo e build pública disponíveis; entradas técnicas HML/PRD/painel agora funcionais.
- [ ] B-06–09: colega iniciante de outra turma joga três minutos sem explicação; registrar autorização, URL/SHA/data/duração, ações/respostas e limites anonimamente. Responsável: squad/participante real. Observar IA jogando não substitui a sessão.

<a id="passo-022"></a>

## Passo 022 — Rollback automático

INT-07/04/03.

- [x] Implementação, gates e regressões locais integrados e revisados; implantação saudável não acionou recuperar.
- [ ] I07-16/17: demonstrar smoke falhando, recuperação automática do ponteiro, retirada da defeituosa, hashes/HTTP/smoke da versão restaurada, sem recompilar. Ensaiar falha parcial/propagação conforme risco real, preservar logs e tentativas. Responsável: Plataforma;026.

<a id="passo-023"></a>

## Passo 023 — Rollback manual

INT-07/03.

- [x] rollback.yml e contratos/testes disponíveis na main.
- [ ] I07-18: executar dispatch protegido em ensaio claramente identificado, com motivo factual e aprovação real; comprovar ator, ponteiro, commit, publicação Pages, smoke/sondas e tempo. Preparar modo/motivo de ensaio sem rotular teste como incidente inexistente; validar concorrência e falha parcial de forma controlada.

<a id="passo-024"></a>

## Passo 024 — DORA

INT-08/10.

- [x] Cálculo real publicado e painel atualizado: uma implantação em14dias, frequência0,0714286/dia, lead time5min27s e CFR0% nessa amostra; comparação com referência11dias registrada.
- [ ] I08-26: obter MTTR de abertura→fechamento de Issue de alerta real; hoje null, não zero. Continuar coleta com fontes e janelas; não há mínimo de dez execuções no HTML.

<a id="passo-025"></a>

## Passo 025 — GDD vivo e PDF

INT-02/10/06.

- [x] GDD completo revisado, RAs preenchidos, fontes originais disponíveis no fechamento e PDF automático validado. Não cobrar originais indisponíveis nos computadores antigos.
- [ ] Outro integrante revisar atualização atual no PR34, incluindo texto/mapas/tabelas/PDF; reconciliar versão/data/URLs com release final e confirmação coletiva de direitos. Não atribuir leitura passada aos colegas.

<a id="passo-026"></a>

## Passo 026 — Ensaio de recuperação

INT-07/04/08.

- [x] Baseline formal saudável agora publicada; scripts/testes/roteiro disponíveis.
- [ ] I07-20–23: preparar e executar falha deliberada rastreável em candidata nova, controlador/janela/aborto; medir desde falha até Pages/hashes/smoke saudável, menos de5min e URL sem queda. Amostrar HTTP durante toda a janela; preservar inclusive tentativa que exceder o limite.
- [ ] Ligar detecção real a smoke/alerta, abertura/fechamento automático e observabilidade; provar automático/manual sem edição manual de gh-pages. Reconferir estabilidade/concorrência e limites de timeout; ensaio não substitui demonstração na banca.

<a id="passo-027"></a>

## Passo 027 — Artefato e hashes finais

INT-06/07/03.

- [x] Mesmo ZIP0.7.0/SHA88 em HML/PRD, hash e tamanho/versão/offline confirmados; resultado não é mais preview.
- [ ] I06-15/17,GDD-14: comparar download da GitHub Release final com ZIP aceito em HML/PRD; conferir UI/SemVer/SHA/data/GDD/tag/avisos. Hoje não existe Release para comparação.

<a id="passo-028"></a>

## Passo 028 — Melhoria medida

INT-08/03/09.

- [x] Dados operacionais agora existem e têm limites documentados; três números DORA não são mais N/D.
- [ ] ARQ-09/I08-28/29/32: escolher gargalo observado, registrar hipótese, fazer mudança por PR revisado e medir efeito antes/depois com fontes/janelas comparáveis. Uma implantação não demonstra melhoria causal. Responsável: squad/SRE.

<a id="passo-029"></a>

## Passo 029 — Vídeo real

INT-10/09/05.

- [ ] Gravar gameplay da produção e produzir pitch.mp4 até90s; validar duração fracionária com ffprobe, legendas, proposta/conceito/diferencial, licenças/créditos e consentimentos. Fornecer entrada real ao entrada-video.yml antes da tag final. Pitch permanece pendente, sem placeholder.

<a id="passo-030"></a>

## Passo 030 — Triagem como código

INT-09/04.

- [x] Validadores de URL/smoke/GDD/JSON/ZIP/squad/vídeo/hash/prazo e testes negativos implementados; RAs completos.
- [ ] Exercitar validação com entradas finais reais pela pipeline035/036; confirmar PRAZO oficial com fuso, sem19:00 presumido ou data inventada para passar. CI de fixtures não é TRIAGEM APROVADA final.

<a id="passo-031"></a>

## Passo 031 — Pacote automatizado

INT-09/06/03.

- [x] Empacotador e proveniência implementados e testados.
- [ ] Gerar submissao/ pela pipeline com GDD.pdf, LINK_DO_JOGO.txt, build.zip contendoLEIA-ME.txt, pitch.mp4 e MANIFESTO.sha256. Depende de vídeo real/tag/produção e prazo verificados. Nenhum pacote final manual ou recompile entre ambientes.

<a id="passo-032"></a>

## Passo 032 — Triagem agendada

INT-09/08.

- [x] Workflow de vigilância/agendamento e notificação implementado e testado na main.
- [ ] I09-21/22: habilitar quando pacote real existir e comprovar execução recorrente até banca, relatório/atrasos e notificação real em falha controlada ou efetiva. Flags finais continuam desabilitadas; cron versionado não comprova vigilância executada.

<a id="passo-033"></a>

## Passo 033 — Relatório técnico

INT-10/02/08/04.

- [x] Fonte profissional atualizada com produção/HML/smoke/ZIP/sondas/DORA e limites; PDF original da CI9494224 com10páginas baixado, renderizado e inspecionado. Runs 38831325010/38831330483 verdes.
- [ ] Revisão externa/merge da atualização atual PR34, acrescentar ensaio, alerta/MTTR, melhoria, playtest, release/triagem conforme ocorram; publicar PDF final acessível na Release. Não usar relatório candidato como prova dos eventos ainda não realizados.

<a id="passo-034"></a>

## Passo 034 — Estabilidade e revisão

INT-04/06/07.

- [x] Candidata formal:299 testes/36E2E, cobertura acima da meta, HML4/4,smoke/ZIPoffline e acessos verificados; revisão32/33 e integrações feitas.
- [ ] Revisar PR34 no HEAD atual com CI verde; revalidar apenas alterações/falhas novas e aceite da versão final. Playtest humano/direitos permanecem independentes; não afirmar ausência absoluta de bugs.

<a id="passo-035"></a>

## Passo 035 — Tag e release

INT-01/03/06/07/09.

- [x] Código integrado na main e produção0.7.0 aprovada; não resta bootstrap/main padrão a corrigir.
- [ ] Publicar tag anotada e GitHub Release imutável por pipeline sobre SHA aprovado, SemVer/package/lock/GDD/notas coerentes, anexos e hashes. Candidata técnica pode existir sem pitch, mas v1.0.0 acadêmica exige vídeo/pacote/aceites. Não criar v0.1.0 retroativa; esclarecer o marco sem prova com o professor.

<a id="passo-036"></a>

## Passo 036 — Triagem e eliminatórios

INT-09/05/07/03.

- [x] RAs completos e produção disponível; scanners sem achados no escopo executado, publicação formal somente pela pipeline.
- [ ] Executar triagem real na tag v1.0.0 e arquivar TRIAGEM APROVADA/logs/pacote/manifesto. Conferir PRAZO verdadeiro, todos os arquivos abrindo, integridade e licenças; nenhum aceite final enquanto pitch e entradas reais faltarem.

<a id="passo-037"></a>

## Passo 037 — Ficha e consolidação

INT-10/09/01.

- [x] MD persistente dos49campos com nomes/RAs/papéis/links conhecidos e estimativas disponível; HTML original preservado.
- [ ] Completar links finais do vídeo/PDF, conferir os dez INT e quatro declarações verdadeiras: composição desde 02/10, registro de terceiros/IA, sem credencial/produção pela pipeline e triagem aprovada na v1.0.0. Se faltar prova histórica, obter orientação humana; não burlar validador.
- [ ] Por orientação de Lucca, preencher HTML e gerar/conferir TXT somente no fechamento; atualizar relatório com resultados finais. Estimativas10 não comprovam nota ouF.

<a id="passo-038"></a>

## Passo 038 — URLs e congelamento

INT-04/06/07/01.

- [x] Produção/HML/painel públicos e funcionais; painel não está mais404.
- [ ] Após tag final, conferir URLs e arquivos da versão entregue, aplicar freeze com apenasfix por PR/CI e manter acesso. Smoke operacional atual não prova uma tag ainda inexistente; manter roteiro de contingência/offline e ensaio da banca.

<a id="passo-039"></a>

## Passo 039 — Entrega e banca

INT-10/09/07.

- [x] Protocolo de envio, divisão de fala e demonstração preparado.
- [ ] Enviar pacote automatizado, relatórioPDF e fichaTXT no AVA e guardar recibo/acesso reais. Responsável: integrante com acesso; não houve envio.
- [ ] Realizar ensaio e banca:10min apresentação,5min demonstração real incluindo falha/rollback/offline,5min perguntas, com os quatro e domínio individual. A IA não comprova presença futura.

<a id="passo-040"></a>

## Passo 040 — Autoria e fechamento

INT-01/05/10.

- [x] Quatro autores reais e pelo menos15 PRs de outros autores revisados por Lucca; PR32/33 aprovados porLucas e35porLucca. Conteúdo consolidado na main semsquash; RAs/acessos concluídos.
- [ ] Consolidar matriz final de commits/PRs revisados em pelo menos3INT por pessoa, equilibrar contribuições reais e comprovar participação de todos na banca. PRs históricos empilhados ainda abertos são rastreabilidade; não reexecutar trabalho integrado nem fingir revisão individual inexistente.
- [ ] Conferir direito/originalidade/IA/segredos em todo material final e resolver marcos históricos sem prova; professor atribui nota/F. Concurso é opcional, separado da nota, sem inscrição/termos/Drive/Instagram sem decisão e autorização expressas.

## Checkpoints e códigos preservados

C01/C02, P01–P07, D01–D07, R01–R07 e S01–S06 continuam nos roteiros e mapa; não renumeramos tarefas. G0–G2 têm preparação/base técnica implementada, mas confirmação coletiva/histórica e direitos permanecem nos001/008/009; não atribuir aceite humano retroativo. G3 e G4 têm execução operacional comprovada da candidata88d533e. G5 permanece parcial por recuperação/alertas/MTTR/melhoria/playtest; G6 por pitch/documentos finais; G7 por tag/release/pacote/triagem; G8 por TXT/AVA/banca. Preparações disponíveis não exigem refazer o que já foi executado.
