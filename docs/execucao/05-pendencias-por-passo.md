# Pendências após cada passo

Atualizado em 14/10/2026. Registro único das pendências encontradas durante a execução. Complementa o [controle](03-controle-execucao.md) e o [checklist da avaliação](../gestao/checklist-avaliacao.md), sem substituí-los.

Ao encerrar cada passo, atualizar sua seção com todas as pendências: requisito/check, motivo, responsável ou dependência, próximo passo e evidência necessária. Fechar um item apenas com evidência real, registrando arquivo, commit, execução ou ação humana. Diferenciar pendência de execução, aceite e obrigação futura. Passo não executado não significa ausência de pendências.

## Como registrar os MDs consolidados

Davi, Miguel e Lucas têm cinco MDs cada, mas este arquivo conserva as seções001–040. Ao executar um par, registrar cada etapa em sua própria seção, incluindo ações humanas e obrigações futuras. Não fundir status nem marcar duas etapas como feitas apenas por abrir o arquivo. [Índice vigente](00-indice-geral.md) e [mapa de consolidação](07-mapa-consolidacao.json).

## Requisitos gerais pendentes

- [ ] **Revisão humana e integração (INT-01):** PR#3 e PR#4 ainda sem aprovação de outro integrante. Por orientação de Lucca, não tratar essa revisão como bloqueio para avançar na preparação do passo002; continua obrigatória para merge/aceite da rubrica. Acesso aos colegas será configurado no003. CI verde não substitui revisão. Mínimo de dez PRs revisados e fator individual continuam exigindo provas reais.

## Passo 001 — Equipe, contexto e marcos reais

Estado: preparação executada; identificação e aceites incompletos. [Evidências](../evidencias/equipe.md).

- [ ] **RA de Lucca:** permanece adiado/em branco. Em13/10 recebemos nomes completos e RAs de Davi(26180842), Miguel(26179933) e Lucas(26179875), registrados emSQUAD/GDD e [ficha persistente](../gestao/ficha-entrega.md). Falta o RA deLucca e a conferência/preenchimento final doHTML; SQ-02/I01-12/FIC-03–06 não são aceitos automaticamente por registrar dados noMD.
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

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 022

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 023

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 024

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 025

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 026

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 027

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 028

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 029

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 030

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 031

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 032

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 033

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 034

Execução ainda não realizada. Conferir ao final, conforme orientação de Lucca, aceite dos três convites e acesso real de cada integrante. Atualizar I01-02 e registro003 somente com prova. [MD034](<Lucas Souza/033-034-relatorio-aceite-candidata.md#etapa-034>). Ausência de acesso bloqueia aceite final; não marcar concluído só por convite.

## Passo 035

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 036

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 037

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 038

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 039

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 040

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Respostas persistentes da ficha — 13/10/2026

[MDcompleto para preencher oHTML no fechamento](../gestao/ficha-entrega.md):49campos de entrada, quatro declarações e sete validadores conferidos noJavaScript original. Dados desconhecidos em branco; notas10 são somente estimativas solicitadas. Não houve geraçãoTXT, preenchimento final doHTML, envioAVA ou aceite de declaração. RAdeLucca e evidências finais permanecem pendentes; nenhum check fechado por esta preparação.
