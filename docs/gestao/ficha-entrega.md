# Respostas persistentes — ficha de entrega do professor

Atualização:19/10/2026, America/Sao_Paulo. Registro dos49 controles da seção10 do HTML original, sem alterar seus validadores. Não é a fichaTXT. Respostas vazias aguardam evidência final; não copiar como aceites concluídos. Notas10 são a autoavaliação solicitada pelo squad, não nota oficial nem fator individual comprovado.

Fonte preservada: `C:/Users/user/Downloads/jogo/Avaliação.html`. Dados/papéis em [SQUAD](../../SQUAD.md); pendências atuais em [registro por passo](../execucao/05-pendencias-por-passo.md). Projeto: Rota do Código, jogo WEB estático/offline; o HTML não tem campo próprio para o nome do jogo.

## 1. Squad e repositório —2 controles

| Campo | Resposta |
|---|---|
| squadNome | Aura 67 |
| squadRepo | https://github.com/luccalck/desafio-arcade |

## 2. Integrantes —12 controles

Classes `.mNome`, `.mRA`, `.mPapel`, índices0–3. Papéis oficiais distintos; coordenações não impedem participação de todos nas demais áreas.

| Linha | Nome completo | RA | Papel literal |
|---|---|---|---|
| 1 | Lucca Castilho Costa | 26179873 | Produto e Game Design |
| 2 | Davi Marcondes Paes de Souza | 26180842 | Desenvolvimento e Qualidade |
| 3 | Miguel Oliveira de Almeida | 26179933 | Plataforma e Release |
| 4 | Lucas Souza da Silva | 26179875 | SRE e Segurança |

## 3. Evidências —7 controles

Links abaixo são reais; conferir SHA/versão da entrega antes do TXT. Não usar link local como URL pública do relatório.

| Campo | Obrigatório | Resposta conhecida | Situação da resposta final |
|---|---|---|---|
| lkBuild | Sim | https://luccalck.github.io/desafio-arcade/ | Atual1.0.0/be28149;HTTP200,sete hashes iguais ao ZIPbbb63fde da tag |
| lkHml | Não | https://luccalck.github.io/desafio-arcade/hml/ | Atual1.0.0/be28149,HML4/4;main173,519s/tag200,367s |
| lkCI | Sim | https://github.com/luccalck/desafio-arcade/actions/runs/39346940628 | Main1.0.0 integralmenteverde,325/37,HML173,519s,PRD/smoke/monitor. Tag39348283211:release passou;jobsubmissao falhou no prazo,sem sucesso global |
| lkGraf | Sim | https://luccalck.github.io/desafio-arcade/status/ | Sondas39348785870:HML/PRD200,1.0.0;4deploys/14dias,lead20min21s,CFR25%,MTTRnull |
| lkVideo | Sim | https://github.com/luccalck/desafio-arcade/releases/download/midia-pitch-v1.0.0/pitch.mp4 | Edição86s/ElevenLabs,30legendas bold,produção filmada1.0.0/be28149;entrada-video39348162168SUCCESS |
| lkRel | Sim | https://github.com/luccalck/desafio-arcade/releases/download/midia-pitch-v1.0.0/RelatorioTecnico-pos-execucao.pdf | PDF pós-execução separado dos assets imutáveis; cópia original daCI e proveniência próprias na release de mídia |
| lkDrive | Não | | Concurso opcional; sem inscrição autorizada |

## 4. Integráveis —20 controles

Cada linha corresponde a `.iChk` e `.iNota`. Campo final vazio significa que não atestamos entrega integral ainda. As estimativas10 ficam mantidas por solicitação do squad; limites de evidência permanecem explícitos.

| INT literal | Peso A | Entregue/evidenciado: resposta final | Autoavaliação | Conferência de fechamento |
|---|---:|---|---:|---|
| INT-01 Repositório e fluxo Git | 10% | Sim | 10 | Repositório/fluxo entregues;20PRs revisados e contribuição real. Exceção finalPR47 registrada semAPPROVE;critério de revisão não integral. |
| INT-02 GDD como código | 8% | Sim | 10 | GDD1.0.0/19p,12seções/Esteira gerado naCI;revisão documental posterior identificada. |
| INT-03 Pipeline CI/CD no GitHub Actions | 15% | Sim | 10 | Main39346940628SUCCESS;tagHML200,367s,PRD/smoke/monitor/release passaram;submissao falhou no prazo. |
| INT-04 Testes automatizados | 12% | Sim | 10 | 325testes/37E2E,HML4/4,core>70%,regressões reais;sem atribuir sessão humana. |
| INT-05 Segurança, licenças e uso de IA | 10% | Sim | 10 | Scanners/tag/SBOM/inventários/MP3 verificados;dispensa de revisão não é revisão humana integral. |
| INT-06 Release versionada e empacotada | 10% | Sim | 10 | Releasev1.0.0 gerada pela pipeline,seisassets públicos/hash iguais àCI,ZIP30.469B/offline. |
| INT-07 Ambientes, entrega progressiva e rollback | 12% | Sim | 10 | Azul-verde/imutabilidade/smokes e recuperações80,66s/17,166s;demonstração presencial continua na banca. |
| INT-08 Monitoramento, alertas e métricas DORA | 10% | Sim | 10 | Sondas/painel/CSV,DORA4deploys;MTTRoperacionalnull e ensaios separados. |
| INT-09 Build pública e pacote de submissão | 8% | Sim | 10 | Retriagem39483855023 APROVADA sobre pacote original v1.0.0,com validador atualizado e exceção temporal limitada;withinDeadline:false. Não apaga falha original. |
| INT-10 Vídeo pitch e relatório técnico | 5% | Sim | 10 | Pitch1.0.0 de86s validado e relatório pós-execução de10p;TXT/AVA/banca não realizados. |

## 5. Estimativa da banca —4 controles

Classes `.bNota`. Não é avaliação realizada ou eficácia educativa medida.

| Critério | Peso B | Autoavaliação |
|---|---:|---:|
| Inovação e originalidade | 25% | 10 |
| Viabilidade técnica e execução | 25% | 10 |
| Qualidade do protótipo (jogabilidade) | 30% | 10 |
| Apresentação | 20% | 10 |

## 6. Declarações literais —4 controles

Classes `.dChk`, índices0–3. Não reescrever o texto do professor para contornar uma condição. “Sim” registra fonte indicada, não uma assinatura fabricada.

| Nº | Texto literal | Resposta disponível | Base/condição |
|---|---|---|---|
| 1 | O squad tem 4 integrantes registrados em SQUAD.md, sem alterações desde 02/10. | Sim | Lucca confirmou explicitamente em16/10: “Sim, confirmo”. Declaração humana atual, sem retroagir documentos |
| 2 | Todo ativo de terceiros e todo uso de IA estão registrados em THIRD_PARTY.md e AI-USAGE.md. | Sim | Inventários/tag/MP3/usos atualizados e declaração do squad;dispensa de revisão final explicitamente registrada |
| 3 | Nenhuma credencial real está no repositório e a produção só foi alterada pela pipeline. | Sim | Gitleaks/tag semachados,no escopo;publicação do jogo somente pela pipeline;sem garantia absoluta fora do escopo |
| 4 | O scripts/triagem.sh foi executado na tag v1.0.0 e terminou com TRIAGEM APROVADA. | Sim, com ressalva abaixo | Retriagem39483855023/1 sobre pacote da tag v1.0.0:TRIAGEM APROVADA;validador5f3833d,produto be28149;exceção temporal limitada |

## 7. Prazo e geração

Lucca solicitou expressamente usar o instante atual como limite; configuramos `PRAZO=2026-10-16T22:35:43-03:00`. A triagem padrão posterior reprova; a retriagem39483855023 passou com política temporal expressamente limitada ao pacote original,registrando withinDeadline:false e exceptionApplied:true. Não alterar relógio nem inventar data futura para liberar a declaração4. A hora “Gerada em” deve ser a hora real do botãoTXT; não é substituta do prazo ou reciboAVA.

## 8. Sete validadores originais

- [x] Squad/repositório reais disponíveis; URLHTTP/HTTPS.
- [x] Quatro nomes completos/RAs reais disponíveis.
- [x] Quatro papéis oficiais distintos disponíveis.
- [x] Links finais obrigatórios acessíveis:produção/HML/status1.0.0,mainCIverde,pitchvalidado ePDFpós-execução daCI39350798673 com10p/568.292B/hash07198130,HTTP200conferido.
- [ ] Dez integráveis efetivamente entregues/evidenciados, confrontados com o checklist integral.
- [x] Dez autoavaliaçõesA/quatro estimativasB:10, por solicitação; faixa0–10, passo0,5.
- [x] Declarações conferidas com ressalva expressa da quarta:execução nova do validador sobre o pacote original da tag,não o código antigo nem a execução original.

Os três cálculos `vA`, `vB` e `vF` são resultados do JavaScript. Com todas as estimativas10, a simulação resultaA10/B10/nota10 com hipóteseF1; isso não comprova a nota, a banca ou o fator individual.

## 9. Procedimento final

1. Conferir a entrega1.0.0 já publicada, captura do mesmo SHA e pacote original; retriagem aprovada com política temporal limitada. Conferir [procedimento do pacote](../pacote-submissao.md).
2. Substituir links do quadro3 por fontes finais verificadas. Preencher os dez checks e quatro declarações apenas conforme as provas reais. Manter limites da banca/humanos na documentação.
3. Abrir o HTML original por servidor local, preencher seus49 controles por sua própriaUI e verificar sete validadores/cálculos sem modificar o arquivo/JS ou habilitar botão à força.
4. Gerar pelo botão “Gerar ficha(.txt)” e conferir o arquivo `DevOps_Avaliacao_Arcade_Aura_67.txt`: data/hora real, quatro nomes/RAs, links e declarações literais.
5. Entregar TXT com pacote e relatório pelo responsável noAVA; registrar recibo real. Não enviar e-mail, inscrever no concurso ou declarar banca concluída automaticamente.

Preservamos o histórico anterior peloGit. Este documento contém as respostas correntes; referências a pendências já encerradas foram reconciliadas, sem transformar limitações ainda existentes em aceites.

## Estado final para revisão

PacoteActions12231549745/digest1c3d83df gerado na tag1.0.0 e preservado. A falha original39348283211 continua no histórico. A retriagem39483855023/1 aprovou o mesmo pacote com scripts/triagem.sh do validador5f3833d,distinto do produto be28149. Aprovação temporal por política limitada,withinDeadline:false,exceptionApplied:true; não declarar cumprimento de prazo. A declaração4 é interpretada como validação do pacote da tag com ferramenta atualizada,com esta ressalva explícita; não houve reexecução do código antigo da tag.

A ficha permanece para revisão; não gerar TXT por enquanto. Dispensa de revisão externa não criaAPPROVE. Autoavaliações10 são estimativas solicitadas,não nota ou fator individual comprovados. Banca/AVA/recibo e limites humanos permanecem reais. Evidências: [INT-09](../evidencias/int09-2026-10-20/).
