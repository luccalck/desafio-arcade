# Pendências após cada passo

Atualizado em 14/10/2026. Registro único das pendências encontradas durante a execução. Complementa o [controle](03-controle-execucao.md) e o [checklist da avaliação](../gestao/checklist-avaliacao.md), sem substituí-los.

Ao encerrar cada passo, atualizar sua seção com todas as pendências: requisito/check, motivo, responsável ou dependência, próximo passo e evidência necessária. Fechar um item apenas com evidência real, registrando arquivo, commit, execução ou ação humana. Diferenciar pendência de execução, aceite e obrigação futura. Passo não executado não significa ausência de pendências.

## Reconferência de fechamento — 14/10/2026

A implementação dos MDs não representa aceite integral dos checkpoints. A revisão atual corrige conclusões sem prova e mantém pendências técnicas, operacionais e humanas. O nome completo **Lucca Castilho Costa** e RA **26179873** foram fornecidos pelo próprio integrante e sincronizados em SQUAD/GDD/ficha/relatório. As observações antigas de RA ausente abaixo são históricas, superadas por esse dado; não repetir a cobrança. Lucca declarou que revisou os trabalhos dos colegas; só eventos reais podem registrar essas revisões, sem autoaprovação. Pitch permanece pendente por sua orientação. A candidata em preparação é **0.7.0**, não a entrega acadêmica final v1.0.0. Ver [reconferência dos registros](../evidencias/reconferencia-registros.md).

## Como registrar os MDs consolidados

Davi, Miguel e Lucas têm cinco MDs cada, mas este arquivo conserva as seções001–040. Ao executar um par, registrar cada etapa em sua própria seção, incluindo ações humanas e obrigações futuras. Não fundir status nem marcar duas etapas como feitas apenas por abrir o arquivo. [Índice vigente](00-indice-geral.md) e [mapa de consolidação](07-mapa-consolidacao.json).

## Requisitos gerais pendentes

- [ ] **Revisão humana e integração (INT-01):** PR#3 e PR#4 ainda sem aprovação de outro integrante. Por orientação de Lucca, não tratar essa revisão como bloqueio para avançar na preparação do passo002; continua obrigatória para merge/aceite da rubrica. Acesso aos colegas será configurado no003. CI verde não substitui revisão. Mínimo de dez PRs revisados e fator individual continuam exigindo provas reais.

## Passo 001 — Equipe, contexto e marcos reais

Estado: preparação executada; identificação e aceites incompletos. [Evidências](../evidencias/equipe.md).

- [x] **Identificação de Lucca:** Lucca Castilho Costa / RA26179873 informado em14/10/2026, sincronizado nos documentos. O preenchimento final doHTML é outra ação e continua aberto.
- [ ] **Acesso dos colegas ao repositório:** Lucca fará posteriormente; conferir no passo003 convites aceitos e permissões reais. Contas existentes não comprovam acesso.
- [ ] **Histórico anterior registrado em 12/10:** precisamos anexar a referência ao GitHub principal anterior e registros reais do início em 03/10/2026 e da continuidade do trabalho. Registramos esse histórico no README; a comprovação continua pendente.
- [ ] **Marcos de 02/10 e 05/10 (SQ-04, CR-01/02):** verificar se existem registros externos reais da formação, escolha/registro do squad e prévia jogável. Git consultado começa em07/10 e não possui tag/release v0.1.0. Se houver evidência fora do Git, registrar sua origem/data; se não houver, manter sem comprovação. Não fabricar ou retroagir commits/tags. É conferência histórica, não execução de duas novas tarefas com datas antigas.
- [ ] **Participação real dos quatro (SQ-05 e fator individual):** construir nos passos seguintes autoria substancial com commits/PRs aprovados em pelo menos três INT por pessoa, revisão e participação na banca; registrar links/evidências ao acontecer. Papéis coordenam; todos participam das áreas. Planejamento não comprova contribuição.

A revisão do PR está na seção geral, não repetida como bloqueio operacional do001. G0 permanece sem aceite completo. Equipe excepcional e concurso são condicionais; não assumir inscrição/aceite. Checks específicos já fechados: OBJ-08, SQ-01, SQ-03, FIC-01 e FIC-07.

## Passo 002 — Arquitetura e baseline de qualidade

**Escopo técnico concluído.** Baseline documentado e validado em12/10/2026; conferência final e organização das pendências em13/10/2026. [Evidências](../evidencias/baseline-tecnico.md).

- [x] Arquitetura e contratos de conteúdo/motor/editor/exportação documentados.
- [x] Instalação, lint, unidades/integrações, cobertura, build, JSON inválido e E2E executados.
- [x] Publicação pela própria conta: PR#4 e HEAD4d9acf4; CI38339356756 concluída com sucesso.

Por orientação de Lucca em13/10, retiramos as conferências específicas de Davi e Miguel dos aceites deste passo. Isso não registra aprovação ou contribuição deles. A revisão do PR permanece somente nos requisitos gerais de integração, conforme o professor, sem bloquear a preparação do próximo passo.

Regressão HML/smoke PRD formais, estabilidade da candidata final e playtest pertencem aos passos posteriores; não são trabalho técnico faltante do002. SQ-07 continua no checklist geral como responsabilidade/contribuição efetiva de Desenvolvimento. ARQ-10 não se aplica à stack atual. Nenhum INT ou G0/G1 completo foi aceito apenas por encerrar o escopo técnico.

## Passo 003 — Acessos, Git e configuração Pages

Preparação executada em13/10/2026; [evidências](../evidencias/configuracao-github.md). SITE_URL configurada e três convites write enviados.

- [ ] **Aceite/acesso (I01-02), conferência final034:** convites enviados; verificar aceite e acesso real no [034](<Lucas Souza/033-034-relatorio-aceite-candidata.md#etapa-034>) por orientação de Lucca. Não considerar atendido até prova.
- [x] **Professor (I01-03):** leitura pública confirmada por Lucca; consulta sem autenticação HTTP200/privatefalse em13/10. Não requer usuário GitHub adicional.
- [ ] **Main (I01-18):** PR#2 pronto para revisão, merge automático habilitado condicionado às regras; ainda OPEN/REVIEW_REQUIRED. Após aprovação real/merge, restaurar defaultmain e ajustar bases. Não usar bypass.
**Trabalho futuro encaminhado, não execução faltante do003:** migraçãoPages atribuída aos007/011 abaixo, com orientação nos próprios MDs.
- [x] **Configuração dos ambientes:** homologacao/producao limitados à main; producao com reviewer obrigatório e bypassadminfalse, conferidos por API. Uso real dos jobs atribuídos a007/011/019 abaixo; nenhum deploy/aprovação simulados.
- [x] **Publicação deste passo:**25ba5e7/PR#5; CI38342833196 verde. Reconferir cada HEAD atualizado; revisão antes do merge permanece geral.

SQ-08/participação de Plataforma permanece geral; sem aceite coletivo inventado. KIT-14 fechado somente quanto à variável/destinos. G0/G1 incompletos.

## Passo 004 — Segurança inicial e privacidade

Escopo técnico validado em13/10/2026; [evidências](../evidencias/seguranca-inicial.md).

- [x] Dependabot habilitado e verificado depois da autenticação humana; I05-06 fechado.
- [x] Gitleaks/hook/audit/SBOM executados e política documentada; fixture sintética/redação/exit1 comprovados.
- [x] README declara ausência de telemetria; código/rede observados; DIR-12 fechado.
- [x] Publicação própria ba7494b/PR#6 e CI38345279238 verde; reconferir HEAD atualizado. Revisão antes do merge permanece geral.

**Obrigações gerais/futuras:** política/direitos/participação real da equipe e SQ-09 seguem no checklist geral; não conferimos autoria ou aceite fictício a colegas. G0 segue incompleto por dados/acessos/aceites anteriores. DIR-09 é reconferência da candidata final, encaminhada ao034; logs de atualizações Dependabot devem ser conferidos no fechamento e CI dos seusPRs/base correta no007.

Ranking/telemetria/contagem/Opal/Godot não adotados: condicionais registrados sem implementação ou marcação fictícia. Nenhuma autenticação adicional pendente nesta execução, após a confirmação“pronto” e APIs verificadas.

## Passo 005 — GDD e identificação disponível

GDD e PDF revisados/validados em13/10/2026; [evidências](../evidencias/gdd-revisao.md).

- [x] Aura67/nomes/contas/papéis e links reais disponíveis registrados;12seções/Esteira/declarações mantidas.
- [x] Highconcept804caracteres; PDF13pA4/pdfinfo e inspeção integral; SQ-06coordenação confirmado pelo trabalho deProduto.
- [ ] **RAs/GDD-13:** completar quando fornecidos, conforme orientação de deixar para depois; não substituímos por valores inventados.
- [x] Publicação própria214736a/PR#7 e CI38346858370verde; reconferir o HEAD atualizado.
- [x] Branch padrão atualizada para `feature/passo-005-gdd-identificacao`, após CI38347042669verde; API confirmou o rastreamento, sem merge/deploy. PDF da CI baixado e validado; evidências acima.

Revisão/direitos coletivos permanecem gerais antes do merge. Versão/data/linkrelease e reconferênciaPDF final pertencem ao025/035/037; não são execução final comprovada neste005. Playtest/pitch futuros, sem medições inventadas. G1 não aceito coletivamente só pela revisão técnica.

## Passo 006 — Regressão HML preparada e preview validado

- [x] Dois cenários completos compartilhados: primeira missão→campanha→vitória e reinício confirmado/progressão, sem injetar progresso.
- [x] Desktop/teclado e390×844/toque emulado; smoke de release separado; entradas BASE_URL/PAGES_URL/EXPECTED_SHA e espera limitada.
- [x] Build/lint;17E2E locais verdes com1worker e5cenários públicos verdes após ajuste de esperaHTTP. Falhas iniciais preservadas nas [evidências](../evidencias/regressao-hml.md).
- [x] Publicação própria1e0b4b5/PR#8 e CI38348580349verde; JUnit da CI confirma17testes/0falhas. Branch padrão atualizada para006 após CIverde, sem merge/deploy; conferir CI de registros posteriores.
- [ ] **I04-08/I04-09/I03-16 — passo011:** usar o módulo preparado a cada deploy-hml da main aprovada e guardar run/URL/SHA/JUnit/capturas. Preview experimental não encerra a execução formal.
- [ ] **I04-10 —014/019:** smoke depois da promoção real de produção, usando o mesmo artefato; não declarar smoke do preview como PRD formal.

Revisão por outro autor permanece geral antes do merge. Nenhum novo check geral fechado; I04-07 revalidado. G3 não aceito. A instabilidade inicial de Chrome com4workers e de consultasHTTP de5s foi investigada/registrada; suite serial e esperaHTTP limitada validaram os mesmos fluxos, sem retry ilimitado ou mudanças no jogo.

## Passo 007 — Esteira e contrato preparados

- [x] Jobs paralelos/gate ci e pacoteCI porSHA/run/tentativa preparados; integridade/artefato obrigatório antes do deploy, sem recompilar.
- [x] Actions oficiais revisadas/fixadas; KIT-09 fechado. Actionlint/testes6contrato/gate local, clone limpo184testes+17E2E, GDD/pdfinfo/build/package/reprodutibilidade e CI38428808065 verdes.
- [x] PR#9draft/commita2016fd da conta própria; branch padrão007 atualizada apósCIverde para rastreamento. Registros posteriores exigem CI do HEAD.
- [ ] **I03-24:** aviso no Actions implementado/executado; comprovar consulta/recebimento pelo squad. Nenhuma mensagem externa enviada.
- [ ] **011 — I03-09/15/16/21, G3:** implementar scripts/publicar.sh segundo contrato, ativar FORMAL_HML_ENABLED somente com script/aceites reais, migrar Pages e executar HML da main/revisão/E2E/medição<=15min. Preparação de007 não é implantação.
- [ ] **019/014/018/022/023 — I03-17/18/19, G4/G5:** scripts/promover.sh, FORMAL_PRD_ENABLED, mesmo pacote/ambiente/aprovação/estratégia/smoke/recuperação reais.
- [ ] **KIT-08:** publicação/rollout/DORA/triagem seguem nos011/018/024/031/032/035; contratos preparados não encerram esses requisitos.

Revisão por outro autor/participação e aceites gerais permanecem antes do merge. PRsDependabot recebemCI em qualquer base; nenhuma execução de atualização do bot foi fabricada. Reexecutar todos os jobs para outra tentativa íntegra; ausência de artefato da tentativa bloqueia coleta. [Evidências007](../evidencias/ci-formal.md).

## Passo008 — Inventário e rastreabilidade preparados

- [x] Inventário158componentes/26ativos com licenças/créditos/URLs/hashes/fontesGit; arte e fatos educativos conferidos tecnicamente.
- [x] Matriz das etapasIA conhecidas ligada a commits/PRs reais, sem atribuir trabalho aos colegas ou aprovação fictícia.
- [x] Termos oficiais consultados; scannerGit53commits/0achados, formatosCPF analisados sem candidatos; fontesPDF daCI identificadas. Limites nas [evidências](../evidencias/direitos.md).
- [x] Publicação própria7ffb58d/PR#10draft; CIpush38434944934/CIpr38435010458verdes. Branch padrão008 atualizada apósCIverde; conferência deHEAD posteriores permanece necessária.
- [ ] **GDD-15/DIR-14:** confirmação coletiva dos quatro sobre autoria/direitos/propriedade do protótipo naUC; não assinamos por ninguém e não publicamos CPF/assinaturas.
- [ ] **I05-14/15/21,KIT-28,DIR-02:** revisão real noPR; solicitaçãoDaviSouza78 bloqueada pela APIHTTP422 por não ser colaborador reconhecido. Regularizar acesso003/034 e revisar antes do merge. Completar registros pessoais/poruso; ciência do solicitante não substitui outro autor.
- [ ] **DIR-01/I05-16:** confirmar adequação/aceite do uso das ferramentas pelos responsáveis e declaração coletiva; consulta técnica dos termos não presta consentimento pessoal.
- [ ] **I05-11/17,DIR-04/05/06/07/15:** reconferir inventário, originalidade/marcas, licenças e ausência de dados privados até tagfinal, incluindo Stitch009/vídeo029/release035/fechamento040. Nenhum vídeo existente para validar agora.

- [ ] **Créditos de seis dependências:** @esbuild/win32-x64,@eslint/config-helpers,@rolldown/binding-win32-x64-msvc,argparse,lightningcss/lightningcss-win32-x64-msvc não declaram autor/titular nos campos inspecionados; confirmar na origem antes do aceite humano final. SPDX declarado não substitui todos os direitos.

I05-10/12/13 revalidados no escopo atual; nenhum dos16checks atribuídos fechado. Preparação técnica entregue; G1/G2 coletivos não aceitos. RAs continuam adiados no001/005, sem nova solicitação.

## Passo 009

Escopo técnico preparado em13/10/2026: seis telas reaisStitch exportadas/manifesto, conferência de divergências, GDD atualizado e17E2E locais verdes; [evidência](../evidencias/stitch-ux.md). I02-15 comprovado, G1 aberto.

- [ ] **G1/P04/D03:** Desenvolvimento conferir fluxo e quatro integrantes compreenderem backlog; guardar aceite verdadeiro, sem aprovação atribuída à IA.
- [ ] Revisão de outro autor antes do merge e direitos coletivos008 continuam obrigatórios. Solicitação de revisor bloqueada pelo acessoAPI422 identificado no008; resolver acesso real, sem revisão fictícia.
- [ ] ReferênciasStitch têm divergências de XP/contratos/fontes/CDN; não integrar ao jogo. Corrigir/revisar se decidir adotar visual futuramente; não é comportamento faltante do jogo existente.
- [ ] Playtest e clareza/acessibilidade humana no021; capturas/testes automatizados não o substituem.

PDF18p/pdfinfo e páginas alteradas inspecionados; bca6a71/PR#11draft, CIpush38442245309/PR38442289110verdes. Resultados completos no registroUX/controle. RAs seguem adiados. Nenhum010 executado nem produção promovida.

## Passo 010

Escopo técnico validado em13/10/2026: fontec56df79/clone limpo,184testes/18E2E verdes, campanha completa doZIPfile://semrede e exportações, PDF18p, checksum/tamanho/version/reprodutibilidade. [Evidências](../evidencias/offline-integridade.md); [passagem paraDavi](06-passagem-lucca-davi.md).

- [ ] **G2:** base técnica comprovada; liberação sequencial permanece dependente de G0/G1 e integração revisada na main, sem aceite coletivo daIA.
- [ ] Revisão por outro autor antes do merge; resolver acesso doDavi (API422 no008) sem aprovação fictícia. Recebimento/compreensão da passagem porDavi ainda não registrados.
- [ ] RAs/acessos/direitos/quatro permanecem nos passos001/003/005/008/009 e conferência034; RAs seguem adiados.
- [ ] Release/tag/notas/SBOM/GDDanexados e checksumPRD/release:015/027/035. Conferir offline/versão/tamanho/checksum finais no027/035/038; validação atual não encerra I06-07–12/15/17/18.
- [ ] HMLformal e push→HML no011, smoke014/019, produção019; consumir o mesmo artefato daCI sem recompilar nos ambientes. Nenhum desses passos foi executado no010.

Nenhum novo check geral fechado;115marcados/297abertos. Publicação010:c56df79/0f0104c; PR#12draft sobre009, CIpush38444743006/PR38444831221 verdes; semmerge/deploy/revisão presumidos.

## Passo 011

Implementação local preparada por DaviSouza78 em13/10/2026: publicadorHML sem recompilação/promoção, preservação de produção/releases/status e integração deploy-hml/Pages/regressão006. [Evidência](../evidencias/deploy-hml.md), [MD011](<Davi Paes/011-012-hml-sondas.md#etapa-011>). Não houve deploy formal ou aceiteG3.

- [ ] Revisão de Miguel/miguelsenai2024 e CI do HEAD real; integrar dependências revisadas em main. Candidata e28fb1c contém010/consolidação; main permanece bootstrap. Não habilitar FORMAL_HML_ENABLED antes desses aceites.
- [ ] G0/G1/G2 e UX humana; recebimento/compreensão pessoal do repasse010 ainda não registrado pelaIA. RAs já disponíveis emSQUAD não serão solicitados de novo.
- [ ] Executar deploy-hml da main aprovada, environmenthomologacao, mesmo pacoteSHA/run/tentativa, HTTP/version/E2E/ZIPoffline e recuperação. ARQ-07/I03-15/16/I04-08/09/I07-04/KIT-15/G3 aguardam essas provas.
- [ ] I07-01/KIT-12: origemliteralgh-pages ou equivalênciaPagesActions validada pelo professor; transição coordenada/configuração real ainda não executadas. BotGITHUB_TOKEN precisa de deployPages explícito; Settings isolado não basta.
- [ ] I03-21/25: obter horário real do recebimento do push e medir atéHML/E2E. Relatório prepared usa createdAt do run como proxy, mantém pushToHmlSeconds=null; não prova prazo.
- [ ] Originais R04/D05/S03 externos ao clone não disponíveis; contratos preservados noMD/006/007 usados, sem alegar leitura desses originais. HTML deDownloads localizado/hash confere; nenhum preenchimento/declaração/envio realizado.

Autenticação da integraçãoGitHub confirmouDaviSouza78 e permissão push=true em nova consulta; porém create-tree retornou403 Resource not accessible by integration. Não houve publicação remota nessa tentativa. CLI autenticado posteriormente: ghapiuser confirmouDaviSouza78/id266862169, push=true, mainprotegida eSITE_URLreal; publicação segue pelo Git da própria conta. Não solicitar/expor token, nem usar credencial deLucca. Commit local usa nome/e-mail próprios conferidos; publicação/CI serão registrados após resultados reais.

### Conferência publicada do MD1 — 13/10/2026

Commit b3d5353b2110abf7703954ab919645943739a813, PR#15 pela própria conta DaviSouza78. [CI push 38501135262](https://github.com/luccalck/desafio-arcade/actions/runs/38501135262) e [CI PR 38501139202](https://github.com/luccalck/desafio-arcade/actions/runs/38501139202): SUCCESS. Login CLI/WRITE resolvidos; revisão solicitada a Miguel, ainda sem aprovação. O erro403 do conector permanece como histórico, superado para transporte pelo Git autenticado. Pacote real validado e ensaio local sem recompilar: 52 arquivos preservados e sete arquivos HML iguais ao ZIP.

| O que falta | Motivo e dependência | Ação necessária / responsável |
|---|---|---|
| Aprovação e integração em main | Dependências003/006/007/010 e candidata ainda fora da main protegida; CI não substitui revisão | Miguel revisa PR#15; responsáveis integram a cadeia revisada, ajustam base doPR e restauram main como padrão |
| G0/G1/G2, recebimento do repasse e UX humana | Aceites coletivos não podem ser concedidos pela IA | Davi/equipe registram compreensão, revisão e aceites reais |
| HML formal, HTTP/SHA/E2E/ZIP e G3 | Falta main aprovada; FORMAL_HML_ENABLED não habilitada | Após entradas humanas, habilitar o job e publicar somente pela pipeline; arquivar artefato/run e regressão completa |
| Origem Pages/equivalência e recuperação | Pages atual usa Actions; configuração de homologacao não prova execução aceita | Coordenar com Plataforma e professor; validar origem/equivalência, OIDC/environment e preservação/recuperação em execução real |
| Tempo real push até HML <=15min | Não houve deploy formal; createdAt do run é apenas proxy | Obter horário real do evento push e medir até E2E concluído; manter pushToHmlSeconds=null sem essa prova |
| Originais externos R04/D05/S03 | Caminhos citados não existem neste computador | Equipe disponibiliza originais para leitura/confronto; contratos preservados no MD006/007 não substituem acesso alegado |

## Passo 012

Preparação independente executada após contrato011: monitor.yml/sondar.mjs/testes/CSVJSON, mantendo011formal como entrada pendente. [Evidência e contrato016/020](../evidencias/sondas.md). Consultas locais do preview tiveramHTTP200/versão0.6.0/SHA71933bf e horários reais; não são produçãoformal, workflow_dispatch ou dados já publicados naobservabilidade.

- [ ] Revisão humanaMiguel/CI/integrar emmain; restaurar main como padrão após integração. Schedule roda somente na default e pode atrasar; documentação preserva esse limite.
- [ ] Ativar MONITOR_ENABLED somente emG4, executar workflow_dispatch real e conferir observabilidade/status/sondas.csv/status/runs por run/tentativa, sem dispararPages. Inicialização é feita pela pipeline; não inserir fixtures como dados reais.
- [ ] I08-02/03: sondar PRD/HML formais após011/019; até lá JSON diferenciaformalHml/formalPrd=false. I08-04–08/KIT-06/25/27 exigem amostras/persistência operacional reais, além dos testes locais.
- [x] I08-01: arquivo/cron publicados no commit b3d5353 e PR#15, com CI verde. Antes da publicação permanecia pendente; este fechamento é estrutural e não comprova ativação. Documentação de atraso não substitui relatório técnico finalI08-30.
- [ ] Integrar consumidores016/020 respeitando codigo/tempo desconhecidos, versao desconhecida e erroJSON; compatibilizar esquema do ponteiro se018alterar rollout. Não executar alertas/painel/DORA nesta etapa.
- [ ] G2/G4/aceites coletivos continuam abertos; 012não aceita dependência011 por mera implementação local.

### Conferência publicada do MD1 — 13/10/2026

Workflow e cron versionados no commit b3d5353b2110abf7703954ab919645943739a813; I08-01 comprovado por esse escopo, sem afirmar monitor ativo. [CI push 38501135262](https://github.com/luccalck/desafio-arcade/actions/runs/38501135262) e [CI PR 38501139202](https://github.com/luccalck/desafio-arcade/actions/runs/38501139202): SUCCESS. Revisão humana solicitada e não aprovada.

| O que falta | Motivo e dependência | Ação necessária / responsável |
|---|---|---|
| Dispatch e schedule efetivos | Dispatch retornou404: monitor.yml ausente na branch padrão; gate exige main/MONITOR_ENABLED | Equipe integra após revisão, restaura main padrão; Davi ativa somente com entradas deG4 e executa workflow_dispatch |
| observabilidade/status/sondas.csv e JSON por run | Sem execução remota do monitor, não há persistência operacional comprovada | A pipeline inicializa/escreve a branch; conferir amostras reais e garantir que nenhuma sonda dispara Pages |
| Sondar HML/PRD formais (I08-02/03) | 011 não publicado formalmente; produção é entrada019; URLs atuais são preview | Após011/019, executar/arquivar amostras com SHA/versão e flags formais corretas, sem renomear preview como produção |
| I08-04–08/KIT-06/25/27 e G4 | Testes locais e CI não comprovam histórico de monitor executado | Validar códigos/latências/versões, acumulação deCSV e isolamento da branch por runs reais |
| Consumo por016/020 e compatibilidade018 | Alertas/painel/rollout formal pertencem a etapas posteriores | Responsáveis dessas etapas consomem JSON/CSV, respeitam erro/desconhecido e validam esquema do ponteiro; esteMD não executa essas etapas |
| Relatório final do atraso do cron (I08-30) | Limite documentado aqui, mas relatório técnico final ainda futuro | Preservar aviso e registrar horários efetivos no relatório final, sem assumir frequência exata de15min |

## Passo 013

Revisão técnica executada após as entradas005/006/009 da candidata; alternativas/transferência verificadas em fonte, AST/HTML e CPython. [Evidência e protocolo021](../evidencias/aprendizagem-conteudo.md). Não houve playtest humano nem aceite de inovação/aprendizagem. I04-14/KIT-29 continuam condicionais não aplicáveis, pois não há conteúdoOpal/AIStudio.

| O que falta | Motivo/dependência | Ação necessária |
|---|---|---|
| Playtest real e avaliação B-01/B-02 | A eficácia e o diferencial percebido não podem ser inferidos dos testes; sessão pertence à021 | Equipe/participante executam três minutos sem explicação, registram previsões/justificativas, intervenções e observações anônimas |
| Revisão e integração | Dependências e MD1 ainda precisam de revisão humana; CIs do commit909ac53 verdes; conferir tambémHEAD documental final | Miguel revisa oPR doMD2; integrar somente com CI verde e dependências aprovadas, sem bypass |
| Fontes externas P05/D02 | Caminhos citados não existem neste computador; contratos locais usados | Equipe disponibiliza originais para leitura/confronto; não alegar acesso ausente |
| Gates G3/G5 e direitos coletivos | HML formal/ações humanas pendentes; preparação não libera gate | Equipe registra aceites/provas reais nas etapas próprias; preservar ausência de declarações fictícias |

Publicação013/014 — 13/10/2026: commit próprio 909ac53a2f4d01c8d17493c9b2e27407a383bd8c, [PR#16](https://github.com/luccalck/desafio-arcade/pull/16), base temporária feature/passos-011-012-hml-sondas/PR#15. [CI push38502833358](https://github.com/luccalck/desafio-arcade/actions/runs/38502833358) e [CI PR38502867894](https://github.com/luccalck/desafio-arcade/actions/runs/38502867894): SUCCESS, incluindo ci agregado. Relatórios do pacote real conferidos:194testes e28E2E semfalhas/erros/ignorados; pacote157arquivos validado porSHA/run, PDF19pA4. Revisão de miguelsenai2024 solicitada, ainda semaprovação. Deploys ignorados; CI não comprova playtest/HML/PRD/rollback. Nenhuma etapa015+ executada.

## Passo 014

Smoke compartilhado preparado depois da revisão013: raiz/candidata diferenciadas deHML, recursos/versão/SHA/erros fatais/controle testados com fixtures locais. [Contrato e evidências](../evidencias/smoke-prd.md). Projeto público executado contra CSS404 sintético retornouexit1 e produziu relatórios. Não houve smoke dePRD formal, deploy ou recuperação; I04-10 continua aberto.

| O que falta | Motivo/dependência | Ação necessária |
|---|---|---|
| HML formal da011 | CI doMD1 passou, mas main/integração/aceites e publicação formal continuam pendentes | Equipe conclui as entradas documentadas noPasso011 e arquiva HML/E2E do mesmo artefato |
| Smoke real pós-deploy e I04-10 | Produção ainda não entregue; depende de014/018/019 e aprovação humana | Na019, chamar release-smoke antes da promoção e prd-smoke depois, com URL/SHA reais e mesmo pacote, semrebuild |
| Integração das chamadas e recuperação | scripts/promover.sh ainda ausente e rollback pertence a019/022; não antecipar essas etapas | Implementador019 consome exitcode, bloqueia promoção e restaura ponteiro se raiz falhar;022 valida recuperação comSHA restaurado |
| Relatórios operacionais | Fixtures comprovam bloqueio local, não uma execução dePRD/rollback | Arquivar JUnit/HTML/JSON/screenshots/traces por invocação, inclusive falhas; manter relatórios de candidata e raiz distintos |
| Revisão, integração e G4 | Dependências006/010 técnicas disponíveis; CIs909ac53 verdes, revisão humana e CI doHEAD final ainda a conferir; gates humanos não presumidos | Miguel revisa oPR; aguardar CI verde e entradas aprovadas antes do merge; registrar aprovação real |
| Original D05 e equivalências | Roteiro externo não existe neste computador; contrato006 preservado consultado | Equipe disponibiliza original e confere aderência; não alegar leitura ausente |

Publicação013/014 — 13/10/2026: commit próprio 909ac53a2f4d01c8d17493c9b2e27407a383bd8c, [PR#16](https://github.com/luccalck/desafio-arcade/pull/16), base temporária feature/passos-011-012-hml-sondas/PR#15. [CI push38502833358](https://github.com/luccalck/desafio-arcade/actions/runs/38502833358) e [CI PR38502867894](https://github.com/luccalck/desafio-arcade/actions/runs/38502867894): SUCCESS, incluindo ci agregado. Relatórios do pacote real conferidos:194testes e28E2E semfalhas/erros/ignorados; pacote157arquivos validado porSHA/run, PDF19pA4. Revisão de miguelsenai2024 solicitada, ainda semaprovação. Deploys ignorados; CI não comprova playtest/HML/PRD/rollback. Nenhuma etapa015+ executada.

## Passo 015

Contrato de proveniência/tag/anexos e idempotência preparado e testado; [evidência](../evidencias/releases.md). Nenhuma tag ou release publicada; nenhum aceite de produção ou imutabilidadePages presumido.

| O que falta | Motivo e dependência | Ação necessária |
|---|---|---|
| Revisão/integração/main eHML011 | Main ainda bootstrap; CI dosMDs não substitui aprovação/integração | Miguel revisaPR doMD3 e responsáveis integram cadeia aprovada; concluir011 antes de publicar |
| Políticas de ambientes para tags autorizadas | Homologacao/producao aceitam somentemain; WRITE não autoriza remover gates | Coordenar comPlataforma/responsável as tags mínimas e manter reviewer/proteções/sem bypass; validar com execução real |
| Notas revisadas eRELEASE_NOTES_SHA256 | Proposta ainda sem aprovação humana/hash autorizado | Humano revisa arquivo porPR; registrarhash exato aprovado e habilitarFORMAL_RELEASE_ENABLED somente após entradas |
| Execução da tag/pacote/HML/PRD/anexos eI05-09/I06-07–12 | Publicador preparado, mas sem tag autorizada/deploy019; simulação não comprova entrega | Na035, tag anotada sobrecommit aprovado, mesmaexecução/pacote, aprovaçãoproducao e hashes dos anexos; arquivar ghreleaseview/run |
| v0.1.0 histórica/I01-10 | Tag/evidência não existe na conferência atual | Responsável/professor orientam regularização semdatas retroativas; não criar história fictícia |
| ImutabilidadePages/I07-06 e gatesG4/G7 | GitHubRelease e diretórioPages são objetos distintos; operação futura | Validar preservação deprodução/bytes via019/027/035 e obter aceites reais; v1.0.0 somente035 |
| FontesR05/R02 externas | Caminhos originais não existem no computador | Equipe disponibiliza originais para confronto; contratos preservados não são leitura desses originais |

PublicaçãoMD3 — 14/10/2026: commit próprio 389b1b0da88432fc02e2689111785d6791964910, [PR#17](https://github.com/luccalck/desafio-arcade/pull/17), base temporária MD2. [CI push38504617087](https://github.com/luccalck/desafio-arcade/actions/runs/38504617087) e [CI PR38504677552](https://github.com/luccalck/desafio-arcade/actions/runs/38504677552) SUCCESS, inclusive ci agregado. Pacote real157arquivos baixado/verificado porSHA/run:204testes de unidade/integração e28E2E, semfalhas/erros/ignorados. Release/deploys ignorados porcondição; não houve tag/produção/Issue deincidente. I08-09/I08-15 têm fontes reais distintas (labelAPI e confirmação deDavi). Revisão deMiguel e aceites operacionais permanecem pendentes.

- [ ] **Repetição operacional/035:** testes garantem idempotência do mesmo pacote; rerun isolado pode buscar artefato da nova tentativa inexistente. Validar procedimento porrun/tentativa original antes da tag, com políticas/aprovações reais; falha deve permanecer explícita, sem escolher origem alternativa ou sobrescrever draft/release com bytes novos.

## Passo 016

Reconciliação deIssues preparada após015, com testes de falha/recuperação sem incidentes fictícios. [Evidência](../evidencias/alertas.md). I08-09: labelalerta criada eAPI conferida em14/10/2026. I08-15: Davi confirmou nestechat que os quatro fizeramWatch e verificaramnotificações; fonte humana, sem atribuir inspeção pessoal àIA.

| O que falta | Motivo e dependência | Ação necessária |
|---|---|---|
| Monitor/alertas operacionais eG4 | 012 ainda semrunpersistido/formal; main/integração e aprovação pendentes; flags não habilitadas | IntegrarPRs revisados, concluirHML011/PRD019 e entradasG4, ativarMONITOR_ENABLED/ALERTS_ENABLED só então |
| I08-10–14/KIT-26 e histórico real | Testesmock não sãoIssues reais; não há incidente comprovado | Rodarworkflow com sondas verdadeiras; arquivarabertura/deduplicação/normalização/fechamento, alvos e URLs/run; não fabricar outageCSV |
| Ensaio026 e insumoDORA024 | Falha controlada/observação pertencem a etapasposteriores | No026, induzir falha autorizada e demonstrar detecção/recuperação; no024 usar horários reais deIssues, não métricas sintéticas |
| Revisão eCI doHEAD | CIs389b1b0 passaram; workflows compartilhados ainda precisam de revisão dePlataforma/Miguel e CI verde doHEAD final | Solicitar revisão noPR doMD3 e integrar somente após aprovação; preservar políticas/permissões sem bypass |
| OriginalS03 externo | Caminho original não disponível nestecomputador | Equipe disponibiliza para leitura/confronto; contrato012 local consultado sem alegar original ausente |

Conferência transversalMD3 — 14/10/2026: não houve redução de proteções/alteração de políticas. Homologacao/producao seguem somente branchmain viaAPI. A compatibilidade da sonda012 com o ponteiro formal018 ainda exige confronto ao implementar018: erro deponteiro mantém alertas abertos/desconhecidos, nunca conta como recuperação. Pendências operacionais específicas permanecem nas seções015/016 acima.

PublicaçãoMD3 — 14/10/2026: commit próprio 389b1b0da88432fc02e2689111785d6791964910, [PR#17](https://github.com/luccalck/desafio-arcade/pull/17), base temporária MD2. [CI push38504617087](https://github.com/luccalck/desafio-arcade/actions/runs/38504617087) e [CI PR38504677552](https://github.com/luccalck/desafio-arcade/actions/runs/38504677552) SUCCESS, inclusive ci agregado. Pacote real157arquivos baixado/verificado porSHA/run:204testes de unidade/integração e28E2E, semfalhas/erros/ignorados. Release/deploys ignorados porcondição; não houve tag/produção/Issue deincidente. I08-09/I08-15 têm fontes reais distintas (labelAPI e confirmação deDavi). Revisão deMiguel e aceites operacionais permanecem pendentes.

## Passo 017

Preparação executada em 14/10/2026 por DaviSouza78 com assistência Codex: roteiro de 80s planejados, quatro falas, capturas reais previstas, SRT preliminar e inventário sem trilha. Provas: docs/pitch-roteiro.md, docs/pitch-legendas.srt, docs/evidencias/video-direitos.md e THIRD_PARTY.md. Não há MP4 ou duração humana medida.

- **I10-07/DIR-13 — concordâncias (resolvido por confirmação humana em 14/10):** inicialmente faltavam confirmações de imagem/voz; Davi respondeu à pergunta sobre os quatro: “todos concordamos, existe sim um registro”. Prova: declaração humana registrada em docs/evidencias/video-direitos.md. Não confundida comWatch016 e sem inspeção do documento privado pela IA. Reconferir com revisor o escopo/canais/data do registro privado antes depublicar; não incorporar dados sensíveis ao Git.
- **Ensaio/gravação/G6:** faltam leitura cronometrada, sincronizaçãoSRT, capturas de produção/conclusão/exportação, MP4 e revisão deacessibilidade/direitos. Motivo: entrega humana e produçãoformal ainda ausentes. Dependências: 005/008/013 revisados, gates/HML/PRD e integrantes. Ação: ensaiar, gravar com consentimento, verificar duração<=90s e inventáriofinal; entregar vídeo antes datag035, relatório recebe provas de release/triagem depois. I10-05 exige reconferênciafinal.
- **Fontes P06/P04 e revisão:** guias externos não disponíveis nestePC. Dependência: originais e revisor Miguel. Ação: disponibilizar e reconciliar fontes; revisar roteiro e PR com CIverde antes demerge. Aceites G0–G2/direitos prévios continuam abertos, não substituídos por este roteiro.


Conferência publicada017 — 14/10/2026: 59b35f2/PR#18, autoriaGit/PR e ator do push confirmados pela API como DaviSouza78; CIpush38506934761/CIpr38506968459 SUCCESS. Roteiro/SRT validados estruturalmente:16cues sem sobreposição, máximo39caracteres/linha e14,6caracteres/s;80s e143palavras são planejamento, não leitura cronometrada. Revisão deMiguel solicitada e ainda ausente; gravação e demais entradas humanas acima continuam pendentes.

## Passo 018

Preparação técnica executada em 14/10/2026, após 017, por DaviSouza78 com assistência Codex. [Contrato/provas](../evidencias/rollout.md): abrir/promover/rollback, migração do preview, sessão/retirada, falhas/storage, imutabilidade, CLI com ator/motivo e integração com publicador/sonda/smoke. Modelo pages/rollout.json tem referênciasnull: não é release implantada.218testes locais e33E2E passaram; cincoE2E novos do carregador também revalidados após relatório desmoke. Nenhum deploy ou ponteiro remoto alterado.

| O que falta | Motivo / dependência | Ação necessária / responsável |
|---|---|---|
| Aprovação da estratégia azul-verde e PR; G2 | Escolha técnica implementada, aceite de Plataforma/Miguel e integração da cadeia010/014/015 ausentes; CI não aprova estratégia coletiva | Miguel revisa contrato, código, caches e PR; integrar dependências revisadas na main protegida. I07-09 permanece aberto até essa conferência |
| I07-08/I07-15/KIT-18/KIT-19 operacionais eG4 | Contrato/ações/carregador testados localmente, mas não houve rollout formal ou commit de controle em gh-pages pela pipeline | No019, consumir pacote mesmoSHA/run/tentativa, serializar todo abrir→publicar→smoke→promover e reconsultarpredecessor; arquivar ator/motivo/commit/run e repetir sessão/retirada/storage/HTTP reais. Não executar deploymanual |
| Rollback observado, propagação/cache e recuperação | Simulações/CLI Git temporário não são incidente ou recuperação de produção; HTML antigo/CDN e abas já abertas têm limites descritos no contrato | Após019/G4, executar022 pela pipeline com aprovação; medir recuperação, reconferir cache/root e política para links diretos/abas existentes; arquivar smoke eURLs reais |
| Pacote/tentativa e integração final | Abrir exige runAttempt no manifesto novo; artefatos legados sem campo não autorizam candidata formal. Job de produção 019 ainda não implementado nesteMD | Pipeline019 usa novo pacote/run/tentativa e relatório fresco de smoke com exit0; manter flags formais bloqueadas até gates; reconferir reruns035 |
| Fontes externas D04/D05 | Guias originais fora do clone não disponíveis nestePC | Equipe disponibiliza originais para leitura/confronto com contrato; HTMLoriginal/hash e fontes comuns reutilizados sem alegar acesso aos guias |

Canário percentual é condicional não aplicável à estratégia escolhida: não houve distribuição probabilística nem marcação falsa desses checks. As pendências anteriores de011/014/015/016/G0–G4 continuam; este registro não encerra obrigações futuras019/022 ou revisão humana.


Conferência publicada018 — 14/10/2026: mesmo59b35f2/PR#18 e duasCIs SUCCESS. Pacote real164arquivos verificado porSHA/run/tentativa;218testes/33E2E semfalhas/erros/ignorados. EnsaioCLI local preservou57arquivos, sete arquivos iguais aoZIP, estável/anterior conservadas e candidata0; semcommit/push/deploy doensaio. Prova em docs/evidencias/validacoes-017-018.json. CI resolvida para implementação; revisão e linhas operacionais acima permanecem abertas. Commit subsequente somente registra essas provas e também requerCI verde noHEAD final.

## Passo 019

Execução ainda não realizada. Encaminhamento003: implementar/executar deploy-prd/environmentproducao após HML/rollout/rollback preparados, recuperar o mesmo artefato e obter aprovação real. [MD019](<Davi Paes/019-020-producao-painel.md#etapa-019>). Gate/branchmain já configurados; não há execução de PRD registrada.

Registro019 iniciado em14/10/2026, antes de020: código de promoção/recibo HML/recuperação automática e integração da esteira preparados; testes sintéticos de contrato não são produção. Provas em docs/evidencias/producao.md. O encaminhamento003 anterior permanece válido.

Pendências019: (1) revisão Miguel e integração da cadeia011–018 na main protegida, pois main ainda é bootstrap; (2) gates G0–G3/HML aceita e flags formais/monitor/alertas, ausentes na API; equipe deve obter aceites e ativar somente após entradas; (3) aprovação humana real de producao, reviewerLucca e can_admins_bypass=false configurados, mas sem run aprovado; Lucca deve aprovar pela própria conta depois de HML, sem autoaprovação/bypass; (4) execução candidata→smoke→virada→raiz, hash HML=PRD, histórico ator/motivo e recuperação/propagação/caches observados ainda ausentes; executar exclusivamente pipeline e arquivar provas antes de fechar OBJ-05/ARQ-03/06/08/I03-17–20/I07-12/13/19/KIT-13/17/20/G4; (5) políticas de tags/Pages/OIDC e fontes externas R05/S03 precisam de conferência da Plataforma/equipe; disponibilizar guias, validar origem/equivalência e limites de cancelamento/recuperação022/023. Canário10% é condicional não aplicável, sem marcação falsa. Nenhuma produção, incidente ou métrica foi inventada.


Conferência publicada019 — 14/10/2026: 3ee8b5c/PR#19 pela contaDaviSouza78, CIs push38509445953 e PR38509479123 SUCCESS. Pacote real170 arquivos, JUnit235testes/36E2E semfalhas/erros/ignorados. Preparação de workflow/recuperação validada; jobs formais ignorados. Revisão/aprovação/produção/monitoramento e demais entradas acima continuam pendentes. Ajuste subsequente registra ator efetivo de rerun e acrescenta1teste local (236); CI doHEAD final obrigatória.

## Passo 020

Preparação independente executada em14/10/2026 após019: painel estático com dados públicos fixados por commit, disponibilidade/latência/versão/rollout, quatroDORA indisponíveis com causa e contrato pronto para024. CSV/snapshot ficam na observabilidade; nenhuma sonda publica o jogo. Provas em docs/evidencias/painel-status.md e testes reais locais. Consulta pública de14/10/2026: /status/ e API da observabilidade HTTP404; nenhum painel publicado foi alegado.

| O que falta | Motivo e dependência | Ação necessária / responsável |
|---|---|---|
| I08-16–20/KIT-07/FIC-10: URL publicada e indicadores operacionais | /status/ público404; branch de dados404, monitor012/016 e PRD019 não executados formalmente | Após integração/revisão/gates, pipeline019 publica os arquivos; monitor grava CSV/ultima.json; conferir HTTP200/renderização/versão/SHA/horários e só então inserir link na ficha |
| DORA operacional/I08-21 | Script/dados024 ainda não executados; ausência não representa zero | Miguel024 grava status/dora.json conforme contrato schema1/chaves/unidades/origem/período/amostras; validar fórmulas/eventos e conferir quatro métricas sem nova implementação do painel |
| G4 e revisão humana | CI/local não são aprovação de producao, monitor ativo ou aceites G0–G3 | Miguel revisa PR/código/legibilidade; equipe integra dependências e executa aprovação/deploy/sondas/alertas reais; arquivar provas antes de fecharG4 |
| Fontes S03 e reconferências de acessibilidade/dados | Guia externo indisponível; testes locais/visuais/teclado não são auditoria WCAG completa ou leitor de tela humano | Disponibilizar original e confrontar; reconferir painel publicado em teclado/celular/leitor de tela e limites de dados/CORS/rate limit; entradas inválidas devem continuar desconhecidas |
| Passagem Davi→Miguel | Preparação técnica entregue, mas nenhuma base aprovada/produção real e recebimento humano ainda ausentes | Usar documento de passagem e registro único como referência; Miguel confere clone/base/PRs/pacotes, registra recebimento pela própria conta e resolve entradas antes de promover. Não executar021+ automaticamente |


Conferência publicada020 — 14/10/2026: mesmoPR#19/3ee8b5c e CIs verdes; painel real local com fontes sintéticas, teclado/celular e capturas rastreadas. HTTP público404 e ausência de observabilidade mantêm I08-16–20/KIT-07/FIC-10/G4 abertos; DORA024/recebimentoMiguel não simulados. Passagem técnica em docs/execucao/10-passagem-davi-miguel.md e provas em docs/evidencias/validacoes-019-020.json. Não foi executado021+.

## Passo 021

Preparação técnica de Miguel Oliveira em 14/10/2026: protocolo existente de 013 revisado e registro da sessão criado em `docs/evidencias/playtest.md`, sem respostas fictícias. Os 17 testes focais de conteúdo/transferência passaram no clone; confirmam coerência técnica, não compreensão, diversão ou aprendizagem de uma pessoa. Nenhum bug observado ou mudança de mecânica justifica alterar GDD, backlog ou E2E nesta preparação.

- [ ] **B-06/B-07/B-08/B-09 — sessão humana.** Falta convidar uma pessoa real de outra turma para jogar até três minutos sem explicação, com autorização para anotações anônimas, build/URL/SHA, horário e duração efetivos, ações e respostas posteriores. Motivo: a IA não pode substituir participante nem inventar observações. Dependências: pessoa disponível, build acessível e protocolo em `docs/evidencias/playtest.md`. Ação: Miguel realiza/observa a sessão, separa fatos de interpretação, registra limites e vincula prova; só então avaliar os quatro checks.
- [ ] **Entrada operacional 019/020 e G5.** Produção/HML formais, painel público e monitor ainda não têm aceite na passagem Davi→Miguel; PRs empilhados aguardam revisão e integração. Motivo: preview/fixtures não comprovam implantação formal. Dependências: fechamento real de 011/019/020, G0–G4, revisão humana e publicação pela pipeline. Ação: equipe integra PRs revisados, executa gates e identifica a build usada no playtest sem renomear preview como produção.
- [ ] **Fontes originais P05/D06 e HTML da avaliação.** Não localizados neste computador; registros derivados no clone foram lidos, mas não substituem confronto com os originais. Dependência: disponibilização pelo responsável. Ação: conferir texto/JS e atualizar protocolo/checks se houver diferença material; não declarar leitura do arquivo indisponível.
- [ ] **Revisão/aceite do passo.** PR#20/6942e82 aberto por Miguel; CI PR38513446231 passou, inclusive `ci` agregado. Revisão de Lucas foi solicitada e ainda não ocorreu; também falta resultado humano do playtest. Dependência: disponibilidade do revisor e participante real. Ação: obter revisão pela conta do colega e manter G5 aberto até as evidências acima. Deploys formais foram ignorados pela condição do workflow.

## Passo 022

Miguel Oliveira fortaleceu a recuperação existente em 14/10/2026: checkpoint de hashes da baseline, bloqueio de bytes locais divergentes, smoke final da mesma execução/versão e comparação HTTP dos sete arquivos recuperados. Testes novos falharam antes da implementação e passaram depois; 240 testes da suíte de CI local e lint passaram. Ver `docs/evidencias/rollback-automatico.md`. Estes resultados são fixtures/testes locais, não rollback operacional nem medição de Pages.

- [ ] **I07-16/I07-17 — recuperação operacional.** Falta falha de smoke de produção real disparando `recuperar`, restauração de `estavel` para `anterior`, retirada da versão defeituosa e confirmação HTTP/raiz sem recompilar. Motivo: jobs formais ainda não foram executados em main revisada; fixtures não comprovam o comportamento no Pages. Dependências: 014/018/019 integrados com revisão, HML aceita, flags/monitor/alertas, environment `producao` com aprovação humana e G0–G4. Ação: executar ensaio controlado na 026, arquivar run/SHA/ator/causa/ZIP/hashes, smoke e ponteiro antes/depois; só então avaliar os checks.
- [ ] **Falha parcial e limites da recuperação.** A comparação de bytes detecta baseline/HTTP divergentes e a reexecução local é idempotente, mas não há prova de recuperação após cancelamento abrupto do runner, erro de publicação Pages ou propagação lenta. Dependência: ambiente formal, observabilidade e alternativa manual da etapa 023. Ação: testar falhas parciais controladas com equipe, manter job vermelho, registrar logs e usar recuperação manual pela pipeline quando a automática não puder confirmar estado saudável.
- [ ] **Alertas normalizados e tempo de recuperação.** Falta executar monitor pós-produção, observar alertas/sondas voltando ao normal e medir tempo fim a fim incluindo Pages; não inferir <5 min de testes unitários ou espera configurada. Dependências: monitor012/alertas016 operacionais, produção019 e ensaio026. Ação: correlacionar runs, amostras, Issues e timestamps reais; deixar I07-20–25/G5 abertos até a prova.
- [ ] **Fontes originais D05/R06 e revisão.** Roteiros externos/HTML da avaliação não foram localizados neste computador. PR#20/6942e82 teve CI PR38513446231 verde, com deploys formais ignorados; a revisão de Lucas foi solicitada e ainda não ocorreu. Dependência: disponibilização dos originais e revisão pela conta do colega. Ação: conferir textos e JS sem sobrescrevê-los, corrigir divergência material por PR e aguardar revisão humana; a preparação local não é aceite coletivo.

## Passo 023

Preparação técnica em 14/10/2026 por Miguel: `rollback.yml`, plano de rollback derivado somente de `anterior`, aprovação do environment, retirada de versão defeituosa/canário, smoke/versão/hashes e espera de monitor foram implementados. Fixtures locais e procedimento em `docs/evidencias/rollback-manual.md` e `docs/operacao-rollback.md`; não constituem recuperação operacional.

- [ ] **I07-18/KIT-05 — execução funcional.** Falta disparar `rollback.yml` pela main com motivo factual, versão anterior publicada, aprovação de outro usuário autorizado, commit `gh-pages`, smoke/HTTP, monitor e alertas normalizados. Motivo: main/PRs anteriores ainda aguardam revisão/integração e não há produção formal nem `anterior` real. Dependências: 018/019/022 integrados, G0–G4, flags e environment protegido, ensaio controlado 026. Ação: equipe autoriza o ensaio, executa o dispatch, arquiva run/log/ator/causa/ponteiro/versões antes/depois e mede a propagação. Manter G5 aberto.
- [ ] **Falhas e concorrência.** Não há execução de push concorrente, propagação lenta ou monitor pós-recuperação no Pages; testes locais apenas verificam contrato. Dependência: ambiente formal e ensaio seguro. Ação: testar caso controlado com logs e falha explícita; se houver push rejeitado ou smoke vermelho, reinspecionar ponteiro antes de qualquer nova tentativa, sem força nem edição manual.
- [ ] **Revisão e fontes originais.** [PR#21](https://github.com/luccalck/desafio-arcade/pull/21), commit inicial `9da5cdb`, [CI push38514889299](https://github.com/luccalck/desafio-arcade/actions/runs/38514889299) e [CI PR38514915985](https://github.com/luccalck/desafio-arcade/actions/runs/38514915985) `success`; Lucas (`6lucassilvaaa`) foi solicitado, mas não revisou. R06 e HTML/JS original não foram localizados neste computador. Dependências: revisão humana, CI verde do HEAD final e disponibilidade dos originais. Ação: conferir CI final, obter aprovação do revisor, confrontar fontes quando disponibilizadas e corrigir divergência material sem simular aceite.

## Passo 024

Script `scripts/dora.mjs`, testes de paginação/janela/cálculo/N/D, integração futura no `monitor.yml` e relatório em `docs/evidencias/dora.md`. Consulta GitHub real em 14/10/2026 05:02 UTC, janela 01/10 00:00–14/10 05:02 UTC: zero deploys `deploy-prd` formais bem-sucedidos, zero Issues de alerta encerradas; quatro valores N/D. API da branch `observabilidade` retornou 404. CI/preview não foram contados como produção.

- [ ] **OBJ-11, I08-22–27 — medição operacional.** Faltam execuções formais de `deploy-prd`, commits/SHA de promoção, eventuais rollbacks correlacionados e Issues de alerta reais abertas/fechadas para denominadores, lead time, falha, MTTR e comparação mensurada com 11 dias Carparts. Motivo: produção/monitor ainda não ativos e sem observações formais. Dependências: 012/016/019/023 integrados, G4/G5, autorização de produção, branch de dados criada pela pipeline. Ação: rodar coleta após deploys reais, guardar JSON por commit da observabilidade, links GitHub e horário; comparar 11 dias somente após lead time válido. Não fabricar quantidade mínima de dez execuções.
- [ ] **I08-21 e painel público.** Falta `status/dora.json` na branch observabilidade e painel publicado lendo esse commit. Motivo: branch ausente (API 404) e monitor formal ainda não habilitado. Dependências: main revisada, `MONITOR_ENABLED`, Pages/painel 020. Ação: permitir pipeline do monitor criar/publicar dados, verificar SHA da branch, HTTP/renderização e valores/causas no painel sem chamar preview de produção.
- [ ] **I08-30 e horários agendados.** Possibilidade de atraso/descarte do schedule foi documentada em `docs/relatorio.md` e evidências, mas não há amostras de execução para quantificar atraso ou relatório final aceito. Dependências: monitor agendado ativo e redação/aceite final. Ação: comparar cron e timestamps reais dos runs, registrar lacunas e limites no relatório final; manter check aberto até essa prova.
- [ ] **Revisão e fontes originais.** Mesmo PR#21/`9da5cdb` e CIs push38514889299/PR38514915985 `success`; Lucas solicitado, sem revisão registrada. S05 e HTML/JS original não foram localizados. Dependências: Lucas, CI verde do HEAD final e acesso aos originais. Ação: conferir CI final, obter revisão e confrontar originais antes de fechar checks ou ficha.

## Passo 025

Revisão da candidata do GDD feita por Miguel em 14/10/2026: doze seções confrontadas com implementação/arte/IA/direitos disponíveis, versão 0.6.0 gerada de `package.json`, high concept 804 caracteres, roadmap futuro separado, PDF local automático de 18 páginas A4 validado com `pdfinfo`, texto e inspeção visual. O [PR#22](https://github.com/luccalck/desafio-arcade/pull/22) foi aberto sobre o MD2, com [CI de push 38517089940](https://github.com/luccalck/desafio-arcade/actions/runs/38517089940) e [CI do PR 38517115866](https://github.com/luccalck/desafio-arcade/actions/runs/38517115866) verdes; PDF arquivado pela CI do PR baixado e inspecionado. Lucas foi solicitado para revisão, ainda sem aprovação registrada. Ver `docs/evidencias/gdd-final.md`. Nenhuma mecânica foi alterada ou release final declarada.

- [ ] **I02-09/I02-14 — revisão/aprovação humana do GDD vivo.** Falta outro integrante revisar e aprovar o PR#22 e manter revisão por PR a cada futura mudança de mecânica. Motivo: teste/inspeção de Miguel não substitui aprovação cruzada. Dependências: Lucas (`6lucassilvaaa`), já solicitado como revisor, CI verde do HEAD final e integração coordenada da cadeia de PRs. Ação: obter revisão registrada; atualizar GDD por PR para qualquer mecânica posterior, sem fechar check antes da prova.
- [ ] **GDD-13 e fontes originais.** O RA ausente no clone de Miguel foi fornecido em14/10 e está registrado. Modelo GDD, roteiros P02/P07 e HTML/JS original não foram localizados naquele computador; estão disponíveis no ambiente de fechamento e foram usados na reconferência. Motivo: não inventar identificação ou declarar confronto com originais indisponíveis. Dependências restantes: ciência coletiva das fontes, direitos e declarações verdadeiras antes do aceite; não atribuir leitura passada aos colegas.
- [ ] **PDF/versão final da release.** O PDF local e o artefato PDF da primeira CI do PR foram validados; vídeo/produção/tag/release final não têm URL ou metadata aceita. Motivo: etapas e gates finais ainda não executados. Dependências: CI do HEAD final, publicação formal, vídeo humano e etapa035. Ação: conferir artefato da CI final, depois reconciliar SemVer, SHA, data, links e tag/artefatos após 035; reabrir checks se houver diferença.

## Passo 026

Preflight não destrutivo e plano de ensaio em `docs/evidencias/ensaio-recuperacao.md`. Em 14/10/2026, API confirmou zero deployments de produção, flags formais ausentes e `rollback.yml` indisponível na branch padrão; URLs raiz/HML eram preview e `/status/` retornou 404. Build, 247 testes com dois workers e 36 E2E locais passaram; bug real histórico de regra antiga reconferido em `docs/evidencias/bug-regressao.md`. Não houve falha injetada, Issue de ensaio, aprovação operacional ou tempo medido.

- [ ] **I07-20/I07-21 — falha e detecção reais.** Falta janela/controlador/SHAs combinados com squad, versão anterior saudável e candidata defeituosa autorizada, deploy pela pipeline, smoke/alerta e Issue reais. Motivo: main e PRs anteriores não integrados/revisados, zero deployments de produção, flags formais ausentes e workflow manual não disponível na default. Dependências: 020–024, G0–G4, environments/aprovação e acordo operacional. Ação: squad define janela/versões/plano; após integração, executa ensaio pela esteira e arquiva run/SHA/logs/Issue/timestamps sem criar incidente fictício.
- [ ] **I07-22/I07-23/I07-25 — recuperação medida e banca.** Falta observar rollback automático e, quando necessário, manual, raiz e release anterior saudáveis, URL 200 durante todo intervalo e recuperação fim a fim <5 min com propagação Pages. Motivo: nenhuma falha operacional foi disparada; E2E/fixtures locais não cronometram Pages. Dependências: ensaio autorizado acima, monitor, aprovador humano e participação real na banca. Ação: registrar início/fim e cada tentativa, HTTP/versão/hashes antes/depois, monitor e resultado; se >5 min ou queda, investigar/corrigir por PR e repetir com nova janela sem apagar tentativa anterior.
- [ ] **I08-31 — alerta tratado.** Falta Issue de alerta disparada e autocerrada por sondas reais, ligada ao run e recuperação. Motivo: monitor formal/observabilidade não ativos, `/status/` 404. Dependências: 012/016/020/024 integrados e ensaio. Ação: preservar amostras, Issue e horários de abertura/fechamento; confirmar fechamento automático sem edição manual simulada.
- [ ] **CR-03, fontes e revisão.** Conferência histórica 06–08/10 não pode ser retroagida; roteiros D06/D07/R06/S05 e HTML original não disponíveis aqui; Lucas foi solicitado para revisar o PR#22, e a CI do HEAD final deve passar. Dependências: registros/fontes originais, revisor e cadeia integrada. Ação: confrontar cronologia/documentos, registrar fatos reais sem inventar prazo e manter checklist aberto até prova.
- [ ] **Intermitência do teste CPython.** `npm run test:ci` teve 1 timeout de VM de 100 ms sob 23 workers (246/247); arquivo isolado 16/16 e suíte com `--maxWorkers=2` 247/247. Motivo: limite curto sob carga, sem defeito de produto demonstrado. Dependência: repetição no runner ou diagnóstico de temporização. Ação: monitorar CI; se recorrente, corrigir confiabilidade do teste por PR com falha e validação preservadas, sem classificar como incidente de produção.

## Passo 027

Pré-validação em 14/10/2026: `npm run reproducibility` passou no SHA `92757b6`; `npm run package` conferiu sete entradas, ZIP de 29.022 bytes. O [PR#23](https://github.com/luccalck/desafio-arcade/pull/23) foi publicado no commit `430c1be`; CIs [push38541424956](https://github.com/luccalck/desafio-arcade/actions/runs/38541424956) e [PR38541450551](https://github.com/luccalck/desafio-arcade/actions/runs/38541450551) passaram. O pacote `build.zip` da CI foi baixado e hash conferido; ver [release-integridade.md](../evidencias/release-integridade.md). API consultada pela conta `miguelsenai2024`: default branch `docs/ficha-entrega-dados-equipe`, zero deployments `producao`, zero Releases e ausência das flags formais; preview/HML públicos continuam em `0.6.0`/SHA anterior. PR#23 continua sem review aprovada; sem aprovação/produção/release/tag 1.0.0, não houve comparação PRD nem aceite como candidata formal.

- [ ] **I06-15 — mesmo ZIP promovido à produção e release.** Falta hash do pacote aprovado em HML/PRD formal e da GitHub Release final. Motivo: a API encontrou zero deployments `producao` e zero Releases; a HML pública responde com SHA antigo (`71933bfd...`), não com a branch candidata. Dependências: revisão/integração da cadeia, HML e PRD formais com aprovações reais, pacote imutável identificado por SHA/run/tentativa e release posterior. Ação: depois dos gates, baixar o mesmo artefato CI, comparar SHA-256 entre aprovação HML, produção e release sem recompilar; registrar run/URL/hash de cada origem.
- [ ] **I06-17/GDD-14 — candidata final e links/metadados.** Localmente `package.json` segue `0.6.0`; o ZIP produzido neste preflight pertence ao SHA `92757b6` e não é promovido. Motivo: roteiro exige PR/CI/HML/PRD aprovados para a candidata `1.0.0`, ainda inexistentes; tag final pertence ao035. Dependências: PRs revisados/integrados, CI final, dados/aprovações formais, vídeo e release035. Ação: preparar/validar versão conforme os gates, verificar UI/JSON/offline/avisos e reproduzir do mesmo SHA; reconciliar data, tag, links e hashes no035, sem criar tag prematura.
- [ ] **Revisão, fonte original e continuidade da prova.** PR#23 está aberto e em rascunho, sem reviews; Lucas (`6lucassilvaaa`) foi solicitado, mas não aprovou. PR#22 predecessor também segue sem aprovação. Os roteiros originais R02/R05 e HTML/JS do professor não foram encontrados neste computador. Motivo: CI e revisão de Miguel não substituem revisão cruzada nem confronto com a fonte original. Dependências: disponibilidade de Lucas e dos originais. Ação: obter revisão registrada, conferir fonte original quando acessível e repetir integridade para o SHA aprovado, sem fechar check por esta pré-validação.

## Passo 028

Consulta DORA autenticada somente leitura executada em 14/10/2026, janela 01/10 00:00–14/10 09:16:34 UTC, com o coletor existente; prova em [melhoria-dora.md](../evidencias/melhoria-dora.md) e JSON redigido. Frequência, lead time, taxa de falha e MTTR são N/D, cada qual com zero amostras. Nenhuma intervenção foi escolhida ou alegada: falta observação real que fundamente gargalo, hipótese e comparação antes/depois.

- [ ] **ARQ-09/I08-28 — decisão ancorada em dados reais.** Falta um gargalo observado em frequência/lead time/falhas/recuperação ou sonda formal, para formular hipótese e intervenção. Motivo: 0 deployments `producao`, 0 Issues de alerta fechadas e todas as métricas N/D; CI/preview/teste local não são DORA de produção. Dependências: 012/016/019/020/023/026 integrados e revisados, environments/monitor/alertas aprovados, produção e Issues reais. Ação: habilitar operação após gates, coletar amostras completas e escolher pequena alteração ligada ao resultado observado, documentando a decisão e fonte.
- [ ] **I08-29/I08-32 — medir e comprovar efeito.** Falta implementar intervenção sustentada pelo item anterior e comparar janela/amostras válidas antes e depois, incluindo resultado sem melhora se ocorrer. Motivo: sem baseline operacional não há denominador nem efeito mensurável; ausência não pode ser convertida em zero ou ganho. Dependências: decisão 028, script/coletor integrado e novas medições reais. Ação: executar pipeline/sonda após mudança, recalcular DORA com origem/janela e documentar hipótese, hashes, runs e limitações; manter aberto até prova.
- [ ] **G5 — recovery, issues, DORA, bug e playtest.** Esta etapa não consegue concluir o gate coletivo. Motivo: 026 não teve ensaio real, e playtest humano de 021 continua pendente; a consulta atual não contém observações formais. Dependências: aceites humanos/produção, janela/controlador, alertas, rollback/monitor e participante do playtest. Ação: squad realiza cada atividade no passo e ambiente previstos, preserva evidências reais e reavalia G5 coletivamente.
- [ ] **Revisão e roteiros originais S05/S06.** PR#23 está aberto em rascunho, sem reviews; Lucas foi solicitado. CIs push/PR do commit `430c1be` passaram, mas não substituem revisão. S05/S06 externos não estão presentes no clone/contexto disponível. Motivo: não alegar aprovação ou leitura indisponível. Dependências: revisor e fonte original acessível. Ação: concluir revisão humana antes do merge e confrontar roteiro quando for fornecido; CI verde não encerra esta pendência.

## Passo 029

Executado em 14/10/2026 com preparação verificável; pitch real não gravado. Evidência e fontes em [pitch.md](../evidencias/pitch.md), roteiro/legendas preliminares e [direitos](../evidencias/video-direitos.md).

- [ ] **I10-03 / G6 — gameplay de produção.** Falta gravar a sessão real com versão/SHA e edição Python, teste, efeito jogável e diferencial. Motivo: não há candidata formal de produção; a raiz/HML públicas são preview antigo, e nenhuma produção/release foi comprovada no MD4. Dependências: gates/revisões e deploy formal da candidata, mais participação humana. Ação: depois da aprovação e promoção, gravar a navegação real completa e identificar URL, SHA, versão, data e run.
- [ ] **I10-04 / I10-06 — MP4 final, duração e legendas.** Falta ensaio cronometrado, gravação autorizada, exportação, conferência integral de áudio/imagem/legendas, duração fracionária por ffprobe e hash. Motivo: roteiro de 80s e SRT são rascunhos; nenhum MP4 foi fornecido nem lido/reproduzido. Dependências: build formal, pessoas autorizadas, ferramenta de gravação/edição e revisão humana. Ação: gravar/exportar o vídeo real, sincronizar SRT ao áudio, validar <=90s sem truncar frações, reproduzir o arquivo inteiro e registrar tamanho/hash/localização restrita.
- [ ] **Consentimento/publicação e FIC-11.** O registro `video-direitos.md` relata a confirmação de Davi sobre um registro privado dos quatro, mas a IA não acessou o documento nem conferiu escopo/canais; não há autorização de publicação independente. Dependência: concordância/registro privado acessível ao revisor e envio pelo responsável ao AVA. Ação: outro integrante conferir escopo e autorização antes de publicação; Miguel anexar/fornecer o link no AVA e registrar prova real. Nenhum envio foi feito.
- [ ] **P06/P04 e fonte acadêmica original.** Roteiros P06/P04 e HTML/JavaScript original da ficha não estão neste clone; os dois caminhos de Downloads citados no MD não existem neste computador. Dependência: fornecimento/acesso aos originais. Ação: conferir requisitos quando os arquivos forem disponibilizados; não declarar leitura atual.

## Passo 030

Implementação e testes de contrato concluídos em 14/10/2026; candidata real não submetida à triagem. Contratos e limites em [triagem-contratos.md](../evidencias/triagem-contratos.md).

- [ ] **I09-09–18 / KIT-21–24 / OBJ-10 — execução integral em entrada real.** Falta submeter pacote real GDD.pdf, LINK_DO_JOGO.txt, build.zip, pitch.mp4 e MANIFESTO.sha256; rodar `pdfinfo`/`pdftotext`, ffprobe, URL HTTP e smoke Playwright no candidato publicado. Motivo: etapa029 não dispõe de vídeo nem produção candidata; CI normal também não executa integração de submissão. Testes atuais usam fixtures/adaptadores e só provam comportamento do validador. Dependências: etapa029, pipeline de pacote 031, URL/SHA reais e runner com Bash, Poppler e ferramentas necessárias. Ação: passo031 integrar o contrato ao job sem aprovar fixture, instalar/verificar ferramentas no runner e executar uma submissão real; registrar saída, URL, SHA, run e manifesto.
- [ ] **I09-15 / KIT-21 — cadastro real do squad.** A parser ignora cabeçalho, exige quatro linhas completas e rejeita RA ausente/não numérico; a falha de cadastro por RA ausente foi resolvida com o dado26179873 em14/10. Falta executar a triagem completa com produção/pacote/vídeo reais; não fechar o check por preencher o cadastro.
- [ ] **I09-16 / KIT-24 — instante de prazo.** `PRAZO` é obrigatório em ISO 8601 com fuso e o validador não assume horário padrão. O GDD informa 09/10/2026 até o início da aula, sem horário confirmado; não existe configuração verdadeira disponível, portanto execução real bloqueada. Dependência: registro oficial do horário/fuso pelo responsável da avaliação. Ação: obter essa confirmação e configurar `PRAZO` no job; não inferir que 19:00 é real nem simular relógio.
- [ ] **Smoke operacional e artefato.** Contratos negativos para HTTP!=200 e falha de Playwright passam por adaptadores, sem browser/URL real. O wrapper Bash foi executado pelo Bash do Git for Windows; apenas o caso sem argumentos foi conferido (retornou uso e código 2). Dependências: runner de integração do passo031 e candidata publicada com o SHA esperado. Ação: executar wrapper em submissão real no runner e guardar log do smoke real; preview antigo não serve como prova da candidata.
- [ ] **D04/D07/S04 e HTML original.** Esses roteiros/fontes citados não foram localizados no clone; o HTML/JS da avaliação também não existe nos dois caminhos de Downloads testados. Dependência: acesso aos originais. Ação: confrontar implementação quando fornecidos; registrar fonte consultada sem afirmar leitura ausente.
- [ ] **Aceite humano e etapas posteriores.** CI de push/PR está verde no SHA `12e826b`, mas Lucas ainda não submeteu review; integração de submissão e agendamento pertencem às etapas 031–032 e nenhuma tag final foi feita. Ação: obter aprovação registrada antes do merge e deixar job final para etapa036; não declarar release/AVA aprovados.

## Passo 031

Automação e pipeline de submissão preparadas em 14/10/2026 por Lucas Souza (`6lucassilvaaa`). Implementado `scripts/submissao.mjs` (com geração/verificação de pacote, manifesto SHA-256 e metadados de proveniência), workflow `.github/workflows/entrada-video.yml` (validação de MP4 com ffprobe e digest por workflow_dispatch), integração do job `submissao` em `.github/workflows/esteira.yml` com flag `vars.SUBMISSAO_ENABLED` e execução do wrapper `scripts/triagem.sh`. Testes de integração em `tests/integration/submissao.test.mjs` (4/4 passando). Documentação em `docs/pacote-submissao.md`.

- [ ] **I09-06 / INT-10 — vídeo pitch real (entrada humana).** Falta o arquivo real de gravação humana do pitch (Passo 029). Motivo: gravação e apresentação humana não podem ser simuladas por IA; o empacotador e a pipeline bloqueiam a montagem definitiva sem vídeo real. Dependências: Passo 029 (Miguel/Squad) e arquivo MP4 real. Ação: squad gravar o pitch <= 90s, ingerir via `entrada-video.yml` e verificar digest e duração fracionária com ffprobe.
- [ ] **OBJ-09 / I09-01–04 / I09-07 — geração formal da pasta submissao na esteira.** Falta executar a montagem e triagem do pacote final em runner de produção formal. Motivo: depende da promoção formal da candidata v1.0.0 e da presença do vídeo real. Dependências: Passos 019, 029, 035 e flag `vars.SUBMISSAO_ENABLED`. Ação: após os gates e vídeo disponíveis, acionar a esteira formal com o mesmo artefato promovido e arquivar `submissao/` com `MANIFESTO.sha256`.
- [x] **Nome e RA de Lucca:** resolvido em14/10/2026: Lucca Castilho Costa /26179873 registrado em SQUAD/GDD/ficha/relatório. Esse dado não comprova triagem final ou envio acadêmico.
- [ ] **Configuração do PRAZO oficial.** O validador exige data ISO 8601 com fuso para o prazo de entrega. Dependência: confirmação do horário oficial da aula/entrega. Ação: registrar a variável `PRAZO` no repositório com o fuso correto.
- [ ] **Roteiro R07 e fontes externas.** Roteiros originais externos e HTML original da ficha de avaliação não se encontram no clone local; contratos preservados e implementações locais foram seguidos. Dependência: disponibilização dos originais. Ação: confrontar com arquivos originais quando acessíveis.
- [ ] **Revisão humana cruzada.** PR deste par aberto em rascunho aguarda revisão de Lucca Castilho (`luccalck`); CI de push/PR deve passar no commit do HEAD. Dependência: revisão humana registrada no GitHub. Ação: obter aprovação antes de qualquer merge.

## Passo 032

Triagem agendada e mecanismo de vigilância preparados em 14/10/2026 por Lucas Souza (`6lucassilvaaa`). Implementado o workflow `.github/workflows/triagem-agendada.yml` com schedule diário (`0 12 * * *`) e `workflow_dispatch`, aprimorado `scripts/triagem.mjs` com suporte a `--modo=vigilancia` (não reprova por expiração do prazo de envio e monitora até a banca) e notificação de alertas via GitHub Issues (`notifyAlert`) com a label `alerta` e marcadores idempotentes. Testes de integração em `tests/integration/triagem.test.mjs` cobrindo o modo vigilância e disparo de alertas em falha 503/timeout (9/9 passando). Documentação em `docs/evidencias/triagem-agendada.md`.

- [ ] **I09-21 — triagem agendada ativa na branch padrão.** Falta execução recorrente do cron na branch `main`. Motivo: GitHub Actions agenda workflows cron exclusivamente na branch padrão; o repositório mantém branches de feature encadeadas aguardando integração. Dependências: revisão e merge da cadeia de PRs na branch padrão. Ação: após integração na branch padrão, acompanhar as execuções diárias agendadas e arquivar relatórios em `reports/triagem-agendada-execucao.json`.
- [ ] **I09-22 — notificação operacional real em queda de URL.** Mecanismo validado com adaptadores/fixtures locais e mocks de API; falta observação em produção real. Motivo: ambiente de homologação e produção formal ainda não promovidos. Dependências: deploy formal em produção (Passo 019/035). Ação: manter vigilância ativa até a data da banca; caso ocorra indisponibilidade real da URL ou adulteração de arquivos, confirmar abertura automática de Issue com label `alerta`.
- [ ] **Atraso operacional do scheduler.** Latência inerente aos agendamentos do GitHub Actions (variações de minutos a horas). Ação: documentar data/hora efetiva da execução e atraso em `reports/triagem-agendada-execucao.json`.
- [ ] **Roteiros S04/S03 e fontes originais.** Guias externos e HTML original da ficha não estão presentes no ambiente local. Dependência: acesso aos originais. Ação: conferir quando disponibilizados, sem afirmar leitura ausente.
- [ ] **Revisão humana cruzada.** PR deste par aguarda revisão de Lucca Castilho (`luccalck`); CI do HEAD final deve passar. Dependência: revisão formal registrada. Ação: aguardar revisão humana antes de merge.

Publicação MD1 Lucas — 14/10/2026: commits próprios `35b38f5` e `19ecb7c`, [PR#25](https://github.com/luccalck/desafio-arcade/pull/25) em rascunho sobre a branch do MD5. [CI push 38630118693](https://github.com/luccalck/desafio-arcade/actions/runs/38630118693) e [CI PR 38630201513](https://github.com/luccalck/desafio-arcade/actions/runs/38630201513) SUCCESS, inclusive ci agregado. Suíte completa com 260 testes em 25 arquivos e cobertura mantida. Revisão de Lucca Castilho (`luccalck`) solicitada; revisão humana obrigatória antes de qualquer merge.

## Passo 033

Relatório técnico preparado por Lucas e revisado neste fechamento para separar implementação de execução. A fonte e o gerador existem; o PDF revisado deve ser gerado/renderizado, validar até12páginas e entrar no bundleCI acessível. A versão anterior de6páginas não comprovava publicação, imagens incorporadas, DORA medidos ou release final. Os prints reais datados históricos e links porINT entram na nova fonte, sem tratá-los como produção doHEADatual. I10-12/I10-18/FIC-12 permanecem abertos até provas reais.

- [ ] **Consolidação final com tag v1.0.0 e vídeo (Passo 037).** O relatório é versão candidata preliminar; os links definitivos da release v1.0.0 e triagem final com vídeo demonstrativo serão consolidados na etapa 037 após as etapas 035 e 036. Dependências: Passos 035 e 036. Ação: consolidar links e hashes definitivos no encerramento.
- [x] **Nome e RA de Lucca:** resolvido em14/10/2026: Lucca Castilho Costa /26179873 registrado em SQUAD/GDD/ficha/relatório. Esse dado não comprova triagem final ou envio acadêmico.
- [ ] **Roteiros P07/S05 e fontes externas.** Roteiros externos e arquivo HTML original da ficha de avaliação não se encontram presentes no diretório local; contratos e documentações preservados foram estritamente seguidos. Dependência: acesso aos arquivos. Ação: confrontar quando fornecidos, sem declarar leitura prévia inexistente.
- [ ] **Revisão humana cruzada.** PR deste par em rascunho aguarda revisão formal de Lucca Castilho (`luccalck`); CI verde obrigatório antes de qualquer merge. Dependência: revisão humana registrada no GitHub.

## Passo 034

A candidata e71de72 possui CI38649548723 aprovada:152testes de unidade+108integração+36E2E; core97,91%instruções/100%linhas. O bundle conferido inclui ZIP29.001bytes/GDD18p e segurança sem achados. Os quatro colaboradores estão ativos. Isso não comprova ausência absoluta de bugs, aceitação humana do jogo ou ambientes formais: deploys/submissão foram ignorados. Revalidar HEADcorrigido e realizar playtest.

- [ ] **Publicação formal em produção (Passo 035).** A candidata v0.6.0 foi aceita tecnicamente; a publicação formal na branch principal com tag v1.0.0 e environment `producao` pertence à etapa 035. Dependência: etapa 035 e aprovação humana. Ação: executar rollout formal na tag final.
- [ ] **Gravação humana do vídeo demonstrativo (Passos 029/031/036).** Falta o arquivo real de vídeo de até 90 segundos a ser gravado pela equipe. Motivo: gravação não pode ser gerada por IA. Dependência: squad gravar e fornecer `apresentacao.mp4`. Ação: validar duração fracionária e digest com `scripts/submissao.mjs` no passo 036.
- [ ] **Revisão humana cruzada.** PR deste par aguarda aprovação de Lucca Castilho (`luccalck`); CI deve permanecer verde no commit do HEAD. Dependência: revisão humana no GitHub. Ação: manter revisão antes do merge.

## Passo 035

Preparação autoral de release noPR27. Snapshot inicial sem tags/releases remotas, versão0.6.0. Candidata0.7.0 em preparação para publicar o jogo corrigido, sem rotular entrega acadêmica completa. Alinhar SemVer/package/lock/GDD/notas e aprovar/revalidar oSHA antes da tag anotada; preservar mesmoZIP entreHML/PRD/release. O inventário daCIe71de72 não é inventário de release futura.

- [ ] **Tag anotada pública remota v1.0.0 e deploy de produção (I01-11, G7).** A criação da tag anotada remota no GitHub e a publicação no environment protegido `producao` exigem: merge da cadeia de PRs na branch padrão `main` e aprovação humana do reviewer no GitHub Actions. Motivo: evitar tags prematuras em branches de feature e garantir aprovação humana formal. Dependência: aprovação e merge por Lucca Castilho (`luccalck`). Ação: após o merge na main, criar a tag remota anotada `git tag -a v1.0.0` e acompanhar a execução da release.
- [ ] **Entrada humana do vídeo pitch (Passo 029/031).** A release final depende da inclusão do arquivo MP4 real de gravação humana para completar o pacote de submissão. Dependência: gravação humana pelo squad. Ação: disponibilizar `pitch.mp4` para validação via `entrada-video.yml`.
- [x] **Nome e RA de Lucca:** resolvido em14/10/2026: Lucca Castilho Costa /26179873 registrado em SQUAD/GDD/ficha/relatório. Esse dado não comprova triagem final ou envio acadêmico.
- [ ] **Revisão humana cruzada.** PR deste par em rascunho aguarda revisão formal de Lucca Castilho (`luccalck`); CI verde obrigatório antes de qualquer merge. Dependência: revisão humana registrada no GitHub.

## Passo 036

Triagem final NÃO executada/aprovada na tagv1.0.0. O relatório anterior de100%conformidade foi corrigido. Scanners/testes e históricoPages trazem evidências limitadas; direitos, produção formal, pacote/vídeo final e triagem dependem de execução real. Não há vigilância operacional comprovada pelo simples cronversionado. Ver triagem-final.md e reconferencia-registros.md.

- [ ] **Submissão formal definitiva e TRIAGEM APROVADA (I09-19, I09-20, G7).** A emissão formal de TRIAGEM APROVADA pelo validador com saída zero em runner de produção depende da presença física do vídeo real `pitch.mp4` (Passo 029), da URL pública de produção formal e do preenchimento dos 4 RAs em `SQUAD.md`. Dependências: Passo 029, promoção formal em produção e dado de Lucca. Ação: após o merge e vídeo, executar `bash scripts/triagem.sh submissao` no runner de CI e arquivar o pacote e logs da triagem.
- [ ] **Variável PRAZO oficial.** Configurar o horário ISO 8601 exato com fuso da data limite da entrega no repositório. Dependência: definição da data/horário oficial da aula.
- [ ] **Revisão humana cruzada.** PR deste par aguarda revisão e aprovação de Lucca Castilho (`luccalck`); CI deve permanecer verde no commit do HEAD. Dependência: revisão formal no GitHub.

## Passo 037

Rascunho persistente dos49campos disponível. Os dezSimde entrega foram retirados por falta de aceite completo; notas10mantidas como estimativas solicitadas. Os quatroRAs estão preenchidos. Campos finais desconhecidos continuam vazios, sem linkPDFinventado, vídeo inexistente ou status404como resposta. TXTfinal deve ser gerado peloHTMLoriginal após conferir declarações verdadeiras e evidências.

- [ ] **Preenchimento do HTML original no navegador e geração do TXT (FIC-29 a FIC-37).** Abertura do arquivo original `Avaliação.html` via Live Server no navegador pelo responsável Lucas, transcrição dos dados consolidados de `docs/gestao/ficha-entrega.md` e acionamento do botão para gerar `DevOps_Avaliacao_Arcade_Aura_67.txt`. Dependência: ação humana do integrante no ambiente com o arquivo original baixado. Ação: realizar o preenchimento, conferir os sete validadores e salvar o arquivo TXT na raiz dos artefatos.
- [x] **Nome e RA de Lucca:** resolvido em14/10/2026: Lucca Castilho Costa /26179873 registrado em SQUAD/GDD/ficha/relatório. Esse dado não comprova triagem final ou envio acadêmico.
- [ ] **Declarações formais 1 e 4 da ficha (FIC-30, FIC-33).** A Declaração 1 (composição desde 02/10) e Declaração 4 (triagem na v1.0.0 aprovada) dependem da validação final do fechamento e da tag definitiva v1.0.0. Dependência: encerramento do ciclo e confirmação humana.
- [ ] **Apresentação física e ensaio com os quatro (CR-06, B-11, B-12, B-14).** A realização do ensaio conjunto de 10 minutos e a participação efetiva na banca examinadora são ações humanas presenciais agendadas para a data da avaliação. Dependência: agenda da banca examinadora.
- [ ] **Gravação física do vídeo de pitch (B-13, FIC-11).** Gravação de vídeo ≤ 90s pelos quatro integrantes permanece como dependência humana da etapa 029/031.
- [ ] **Revisão humana cruzada.** PR deste par em rascunho aguarda revisão formal de Lucca Castilho (`luccalck`); CI verde obrigatório antes de qualquer merge. Dependência: revisão registrada no GitHub.

## Passo 038

Preservamos a consultaHTTP real de preview/HML200 e status404emsmoke-final.md. Esse teste não comprova produção formal ou funcionamento do console. Política de congelamento está preparada, mas a tagfinal não existe no snapshot inicial; freeze pós-release e recuperação<5min exigem execução, medição e continuidade real.

- [ ] **Participação presencial dos integrantes 1 e 2 na banca (SQ-14, SQ-15).** A presença física e o domínio da fala de Lucca e Davi na banca examinadora são ações humanas que ocorrerão no evento da banca. Roteiro e divisão de falas preparados em `docs/apresentacao-banca.md`. Dependência: evento da banca avaliadora.
- [ ] **Deploy de produção da release v1.0.0 e painel /status/ no Pages.** A URL `https://luccalck.github.io/desafio-arcade/status/` retornou HTTP 404 em gh-pages pois o deploy formal depende do merge da cadeia de PRs na branch `main` e da aprovação humana no environment `producao`. Localmente, `pages/status/index.html` e sua suíte de testes estão 100% operacionais. Dependência: merge formal na branch padrão e aprovação humana. Ação: após o merge na main, acompanhar o workflow de publicação em produção e verificar a disponibilidade do painel online.
- [ ] **Revisão humana cruzada.** PR deste par em rascunho aguarda revisão formal de Lucca Castilho (`luccalck`); CI do HEAD final deve passar com sucesso. Dependência: revisão formal no GitHub.

## Passo 039

Protocolo de envio e roteiro de demonstração/banca preparados; não há reciboAVA, pacote completo com vídeo nem banca realizada. Artefatos deCI não equivalem ao pacote acadêmico final. Corrigimos GDD8p→18pdaCIauditada e retiramos aprovações/aptidãoFsemprova. O relatório revisado acompanha fontes reais e limitações.

- [ ] **Envio dos entregáveis no AVA e arquivamento do recibo (CR-04, CR-05, G8).** Ação estritamente humana de anexar o pacote zip, o relatório técnico PDF e a ficha TXT gerada no AVA da Faculdade SENAI, obtendo e guardando o comprovante oficial de submissão. Dependência: ação humana no AVA institucional.
- [ ] **Execução presencial da demonstração ao vivo na banca (CR-07, I07-24, B-03, B-04, B-05).** A demonstração prática cronometrada de 5 minutos com simulação de falha, acionamento do rollback e exibição do modo offline perante os avaliadores. Dependência: realização presencial da banca examinadora.
- [ ] **Participação presencial de Miguel Oliveira na banca (SQ-16).** Presença física e domínio das contribuições de Plataforma/Release na arguição da banca. Dependência: evento da banca avaliadora.
- [ ] **Gravação física do vídeo de pitch (B-13, FIC-11).** Arquivo de gravação humana `apresentacao.mp4` (≤ 90s) a ser gravado pela equipe (Passo 029/031).
- [ ] **Revisão humana cruzada.** PR deste par em rascunho aguarda aprovação formal de Lucca Castilho (`luccalck`); CI verde obrigatório antes de qualquer merge.

## Passo 040

Inventário de28PRsautorais preservado. Snapshot inicial:28abertos/zeroreviews. Lucca informou revisão dos colegas e autorizou formalizá-la; registrar eventos reais sem autoaprovarPRspróprios ou atribuir reviewsaoutros. Fpermanece sujeito às contribuições aprovadas e banca. Concurso opcional sem decisão coletiva comprovada; a afirmação anterior de reunião/unanimidade foi corrigida.

- [ ] **Participação presencial de Lucas Souza na banca (SQ-17).** Presença física e defesa das contribuições de SRE e Segurança perante a banca avaliadora para homologação final do fator F = 1,0. Dependência: realização do evento da banca.
- [ ] **Atribuição oficial do fator individual e nota final pelo professor (SQ-18, B-15).** A avaliação definitiva, homologação do fator F e atribuição da nota são prerrogativas exclusivas do docente avaliador após a apresentação do squad.
- [ ] **Preenchimento do HTML original no navegador e geração do TXT oficial (FIC-29 a FIC-37).** Abertura de `Avaliação.html` no navegador, transcrição dos dados consolidados de `docs/gestao/ficha-entrega.md` e acionamento do botão para gerar `DevOps_Avaliacao_Arcade_Aura_67.txt`.
- [ ] **Preenchimento do RA numérico de Lucca Castilho em SQUAD.md.** Aguarda fornecimento do dado oficial pelo integrante.
- [ ] **Merge final da cadeia de PRs na branch padrão main e deploy de produção.** Após as revisões humanas obrigatórias de todos os PRs, realizar o merge na main, criar a tag anotada remota `v1.0.0` e aprovar o deployment no environment protegido `producao`.
- [ ] **Revisão humana cruzada.** PR deste par em rascunho aguarda aprovação formal de Lucca Castilho (`luccalck`); CI verde obrigatório antes de qualquer merge.

## Respostas persistentes da ficha — 13/10/2026

[MDcompleto para preencher oHTML no fechamento](../gestao/ficha-entrega.md):49campos de entrada, quatro declarações e sete validadores conferidos noJavaScript original. Dados desconhecidos em branco; notas10 são somente estimativas solicitadas. Não houve geraçãoTXT, preenchimento final doHTML, envioAVA ou aceite de declaração. RAdeLucca foi recebido em14/10; evidências finais permanecem pendentes; nenhum check fechado por esta preparação.

## Pendências consolidadas deste fechamento — 14/10/2026

- [x] **001/025/030/031/033/035/037 — identificação:** nome completo e RA de Lucca recebidos e sincronizados. Não confundir identificação com registro histórico em02/10 ou preenchimento doHTML.
- [x] **033/035–040 — corrigir registros antecipados:** revisão de ficha, contribuições, relatório, passagem e evidências retira conclusões de aprovação, F=1,0, 100%eliminatórios e entrega final sem suporte. Preserva autoria/roteiros e evidências reais.
- [ ] **001/003/040 — revisões/integração:** registrar naAPIas revisões dos colegas informadas porLucca, obter revisão real de outro integrante nosPRsdeLucca e preservar proteção/CI. Atualizar contagem somente após eventos; não criar identidades ou autoaprovação.
- [ ] **007/011/014/015/018–020/022–024/026–028 — execução operacional:** corrigir automação, revalidarHEAD, publicarHML/PRD/painel, medirpush→HML, provar mesmoZIP, alertas e recuperação automática/manual<5min comURLcontínua, DORAcomamostras e melhoria real. Registrar run/SHA/hash/horários e falhas, sem transformar testes de fixtures emincidentereal.
- [ ] **017/029/031/036 — pitch:** manter pendente por orientação expressa deLucca. Falta gravação real deprodução, <=90s, legendas/créditos/escopo deconsentimentos e entradaverificada. Não produzirplaceholder nemaprovartagacadêmicafinalsemvídeo.
- [ ] **021 — playtest humano:** realizar trêsminutos comcolegadeoutraturma, autorizaçãoreal, registroanônimo e resultados seminferiraprendizagemdosE2E.
- [ ] **033 — relatório:** gerar PDFrevisado naCI, abrir/renderizar, contar<=12páginas, checar links/acesso; acrescentar provas operacionais posteriores sem inventá-las.
- [ ] **035/036 — entrega final:** taganotada compatível, releaseimutável/manifestos, submissãopelaCI comvídeo e TRIAGEMAPROVADArealnatagfinal. Não confundir release técnica0.7.0 com pacoteacadêmicocompleto.
- [ ] **037–040 — ficha/AVA/banca:** preencherHTMLsomentecomrespostasverdadeiras, gerar/conferirTXT, enviarAVA/guardarrecibo, ensaiar e participarcomosquatro. A IA não atestaevento humano futuro.
- [ ] **040 — concurso opcional:** obter decisãohumana real seforparticipar; seminscrição/termos/Drive/Instagram automaticamente. Ausência de autorização não é decisão unânime de não participar.

### Validação local do fechamento — 14/10/2026

PDF técnico revisado gerado e conferido:6páginas A4, doisprints reais com legendas/origens/datashistóricas e linksdos10INT. Gerador verificado com3casosnegativos(imagemausente, remota e fora dedocs), todos bloqueados comsaída1; ESLintdoscriptaprovado. Lint/tipagem/actionlint globais,270testesunidade/integração e36E2EdoHEADcorrigido passaram localmente; essasprovas não são publicaçãoCI/PRD. Manter I10-17/FIC-12pendentes até artefatoCIacessível e reconferência final.
