# Pendências após cada passo

Atualizado em 13/10/2026. Registro único das pendências encontradas durante a execução. Complementa o [controle](03-controle-execucao.md) e o [checklist da avaliação](../gestao/checklist-avaliacao.md), sem substituí-los.

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

Execução ainda não realizada. Encaminhamento003: implementar/executar deploy-hml/environmenthomologacao, migração coordenada Pages para origemgh-pages e regressão/HTTP/versão após propagação. [MD011](<Davi Paes/011-012-hml-sondas.md#etapa-011>). I07-01/KIT-12/ARQ-07/I03-15 dependem dessas provas, não de Settings ou plano.

## Passo 012

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 013

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 014

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 015

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 016

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 017

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 018

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

## Passo 019

Execução ainda não realizada. Encaminhamento003: implementar/executar deploy-prd/environmentproducao após HML/rollout/rollback preparados, recuperar o mesmo artefato e obter aprovação real. [MD019](<Davi Paes/019-020-producao-painel.md#etapa-019>). Gate/branchmain já configurados; não há execução de PRD registrada.

## Passo 020

Não executado. Preencher as pendências efetivamente encontradas ao encerrar este passo, seguindo seu MD e critérios de aceite.

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
