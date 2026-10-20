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
| lkBuild | Sim | https://luccalck.github.io/desafio-arcade/ | Atual0.7.0/4678830, HTTP200 e sete hashes iguais ao ZIP; reconferir1.0.0 após publicação |
| lkHml | Não | https://luccalck.github.io/desafio-arcade/hml/ | Atual4678830, HML4/4; reconferir candidata1.0.0 |
| lkCI | Sim | https://github.com/luccalck/desafio-arcade/actions/runs/38991328634 | Publicação4678830 verde, CI322/37, HML175,423s, PRD/smoke/monitor aprovados; substituir pela tag final quando concluída |
| lkGraf | Sim | https://luccalck.github.io/desafio-arcade/status/ | Sondas38991747764: HML/PRD200; DORA3deploys/14dias, lead time25min29s, CFR33,33%, MTTRnull. Revalidar na entrega |
| lkVideo | Sim | https://raw.githubusercontent.com/luccalck/desafio-arcade/d497f9a25ce897624ec68dd9bf79aa5763e2a22b/docs/pitch/pitch.mp4 | Edição86s/ElevenLabs, áudio fornecido e30legendas bold; produção filmadae9/0.7.0. Substituir pelo vídeo validado da candidata1.0.0 |
| lkRel | Sim | https://github.com/luccalck/desafio-arcade/releases/download/v0.7.0/RelatorioTecnico.pdf | PDF técnico anterior, real e público. Substituir pelo relatório acadêmico pós-triagem, sem sobrescrever este asset |
| lkDrive | Não | | Concurso opcional; sem inscrição autorizada |

## 4. Integráveis —20 controles

Cada linha corresponde a `.iChk` e `.iNota`. Campo final vazio significa que não atestamos entrega integral ainda. As estimativas10 ficam mantidas por solicitação do squad; limites de evidência permanecem explícitos.

| INT literal | Peso A | Entregue/evidenciado: resposta final | Autoavaliação | Conferência de fechamento |
|---|---:|---|---:|---|
| INT-01 Repositório e fluxo Git | 10% | | 10 | PR41 aprovado porDavi no HEADcea6745 e integrado; candidata posterior exige sua revisão. Matriz comprova trêsINT por integrante, sem atestar banca |
| INT-02 GDD como código | 8% | | 10 | Doze seções/modelo, imagens ePDF automático. Reconferir versão/data/PR da candidata |
| INT-03 Pipeline CI/CD no GitHub Actions | 15% | | 10 | CI/HML/PRD/monitor formais anteriores comprovados; aguardar candidata final |
| INT-04 Testes automatizados | 12% | | 10 | Última CI do pitch:322 testes/37E2E; cobertura core superior a70%, regressões reais; conferir CI final |
| INT-05 Segurança, licenças e uso de IA | 10% | | 10 | Gitleaks/audit/SBOM/inventários e confirmação coletiva; revisão e varredura dos materiais posteriores |
| INT-06 Release versionada e empacotada | 10% | | 10 | Técnica0.7.0 pública;1.0.0 e anexos ainda não publicados |
| INT-07 Ambientes, entrega progressiva e rollback | 12% | | 10 | Azul-verde/recuperação real manual80,66s/automática17,166s; demonstração ao vivo continua na banca |
| INT-08 Monitoramento, alertas e métricas DORA | 10% | | 10 | Sondas/painel/DORA; alertas e melhoria medidos em ensaio. MTTR operacional sem amostra, sem inventar incidente |
| INT-09 Build pública e pacote de submissão | 8% | | 10 | Pacote/triagem na tag1.0.0/vigilância ainda não executados |
| INT-10 Vídeo pitch e relatório técnico | 5% | | 10 | Pitch86s pronto ePDF10p da CI; vincular vídeo/relatório aos resultados finais |

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
| 2 | Todo ativo de terceiros e todo uso de IA estão registrados em THIRD_PARTY.md e AI-USAGE.md. | | Inventários atualizados, inclusive MP3 fornecido. Reconferir candidata final e revisão antes do merge |
| 3 | Nenhuma credencial real está no repositório e a produção só foi alterada pela pipeline. | | Revalidar scanner/histórico/artefatos finais e registro de publicação |
| 4 | O scripts/triagem.sh foi executado na tag v1.0.0 e terminou com TRIAGEM APROVADA. | | Só aceitar após execução real aprovada na tag; hoje ainda não ocorreu |

## 7. Prazo e geração

Lucca solicitou expressamente usar o instante atual como limite; configuramos `PRAZO=2026-10-16T22:35:43-03:00`. Uma triagem executada depois desse horário será corretamente reprovada. Não alterar relógio nem inventar data futura para liberar a declaração4. A hora “Gerada em” deve ser a hora real do botãoTXT; não é substituta do prazo ou reciboAVA.

## 8. Sete validadores originais

- [x] Squad/repositório reais disponíveis; URLHTTP/HTTPS.
- [x] Quatro nomes completos/RAs reais disponíveis.
- [x] Quatro papéis oficiais distintos disponíveis.
- [ ] Links finais obrigatórios acessíveis e coerentes com a versão entregue.
- [ ] Dez integráveis efetivamente entregues/evidenciados, confrontados com o checklist integral.
- [x] Dez autoavaliaçõesA/quatro estimativasB:10, por solicitação; faixa0–10, passo0,5.
- [ ] Quatro declarações verdadeiras aceitas após conferência; primeira já confirmada.

Os três cálculos `vA`, `vB` e `vF` são resultados do JavaScript. Com todas as estimativas10, a simulação resultaA10/B10/nota10 com hipóteseF1; isso não comprova a nota, a banca ou o fator individual.

## 9. Procedimento final

1. Fechar candidata revisada/publicada, captura do mesmoSHA, tag1.0.0/pacote/triagem verdadeiros e relatório pós-execução. Conferir [procedimento do pacote](../pacote-submissao.md).
2. Substituir links do quadro3 por fontes finais verificadas. Preencher os dez checks e quatro declarações apenas conforme as provas reais. Manter limites da banca/humanos na documentação.
3. Abrir o HTML original por servidor local, preencher seus49 controles por sua própriaUI e verificar sete validadores/cálculos sem modificar o arquivo/JS ou habilitar botão à força.
4. Gerar pelo botão “Gerar ficha(.txt)” e conferir o arquivo `DevOps_Avaliacao_Arcade_Aura_67.txt`: data/hora real, quatro nomes/RAs, links e declarações literais.
5. Entregar TXT com pacote e relatório pelo responsável noAVA; registrar recibo real. Não enviar e-mail, inscrever no concurso ou declarar banca concluída automaticamente.

Preservamos o histórico anterior peloGit. Este documento contém as respostas correntes; referências a pendências já encerradas foram reconciliadas, sem transformar limitações ainda existentes em aceites.
