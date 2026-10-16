# Conciliação das pendências com o HTML completo

Data:15/10/2026 (America/Sao_Paulo). Confrontamos todas as seções instrucionais, abas INT-01–10, exemplos/estrutura, cronograma, rubrica, direitos e JavaScript da ficha no original `C:/Users/user/Downloads/jogo/Avaliação.html`. Arquivo original preservado; SHA25619362485b3ec9534bdf31303ca0b92b6fe96de21bb87867977d37a7393565275. O modelo GDD completo continua representado pelas doze seções do GDD; não o reduzimos às quatro seções mínimas citadas no HTML.

## Correção de organização

O MD antigo misturava relatórios de cada execução com tarefas atuais. Arquivamos integralmente esse texto em [histórico](pendencias-historico-2026-10-15.md) e reescrevemos o [registro vigente](../execucao/05-pendencias-por-passo.md) com as mesmas 40 seções. Marcamos RAs/acessos/main/HML/PRD/smoke/painel/relatório candidato concluídos no escopo comprovado, mantemos apenas pendências reais e não exigimos novamente o revisor nominal planejado onde a consolidação já teve revisão válida. Isso não cria reviews nos PRs históricos individualmente nem elimina a revisão obrigatória da nova atualização PR34.

## Estado por integrável e lacunas para concluir

| INT / peso em A | Comprovado | Falta executar/conferir |
|---|---|---|
| INT-01 /10% | Equipe/RAs/acessos, main protegida e padrão, Conventional Commits; pelo menos15 PRs revisados por outro autor, mais aprovações32/33/35; commits preservados na integração | Matriz final de autoria/aprovações por≥3INT por pessoa e equilíbrio; tags anotadas, histórico da prévia sem retroação; revisão atual PR34; banca de todos para o fator individual |
| INT-02 /8% | GDD completo como código/PDF automático18p, Stitch, mapas/wireframes/Esteira; revisão de consolidação PR32 | Revisão documental atual PR34, confirmação coletiva de originalidade/direitos e PDF/texto final; versão/data/links coerentes com release |
| INT-03 /15% | Push/PR, jobs paralelos/cache, npmci/lock, gateci, segurança/build/artefatos, HML216,414s, aprovação e PRD funcionais | Confirmação de recebimento da notificação, integração da documentação atual e fechamento dos estágios de release/rollback; não falta reimplementar HML/PRD |
| INT-04 /12% | 299 testes,36E2E,core acima da meta,JSON inválido bloqueante,bug/regressão,HML4/4 e smokePRD | Revalidar eventual alteração final; golden eval Opal/AIStudio não aplicável ao conteúdo adotado |
| INT-05 /10% | Gitleaks/precommit,audit,Dependabot,SBOM,LICENSE,inventários/AI-USAGE e revisões existentes | Confirmar créditos dos seis componentes em direitos.md, direito de uso/declaração coletiva e revisão por uso relevante; conferir materiais finais/vídeo e anexarSBOM naRelease |
| INT-06 /10% | ZIP reproduzível29.000bytes,versão/SHA/data,offline,mesmos bytes HML/PRD | Executar GitHubRelease por tag,notas revisadas,anexosZIP/checksum/SBOM/GDD e comparação do hash daRelease comprodução; conferir pacote final |
| INT-07 /12% | HML/releases imutáveis,loader/rollout,azul-verde formal,aprovação/smoke e commit da pipeline | Validar equivalênciaPagesActions frente à origemliteralgh-pages; sessão entredeploys/retirada; recuperação automática/manual<5min incluindoPages e continuidade,ensaio e demonstração na banca |
| INT-08 /10% | SondasHTTP/latência/versão/CSV,paineldesktop/mobile,trêsDORA com1deploy e comparação11dias; atraso do cron documentado | Dois alertas operacionais comabertura/deduplicação/autocerramento; MTTR deIssue real; decisão/intervenção orientada por métrica e efeito verificável; não usarfixturescomoamostras |
| INT-09 /8% | Scripts/testes de pacote/triagem/vigilância e URLprodução | Vídeo e prazo oficial verdadeiros comoentradas; submissao/automatizada/manifesto,tag v1.0.0 comTRIAGEM APROVADA,artefatos; vigilânciaagendadaexecutada/notificaçãoaté banca |
| INT-10 /5% | Roteiro e relatório candidato profissional10páginas gerado/inspecionado naCI | Pitchreal≤90s/legendas/créditos/consentimentos; incorporar recuperação/playtest/melhoria/release/triagem quandoreais; revisão/publicaçãoPDFfinal; retrospectiva final e fala dosquatro |

Referências locais: [operação](operacao-2026-10-15.md), [revisões confirmadas](revisoes-confirmadas-2026-10-14.md), [direitos](direitos.md), [playtest](playtest.md), [GDD](../gdd.md), [relatório](../relatorio.md) e [checklist completo](../gestao/checklist-avaliacao.md). Casos condicionais permanecem explicitados no checklist, sem inventar obrigação de concurso,canário,Godot,telemetriaouIAemruntime.

## Ficha HTML: dados disponíveis e bloqueios

A seção10 possui49 controles:2 de squad/repositório, 12 dos integrantes, 7 links, 20 dos INT (check + nota), 4 estimativas B e 4 declarações. Há 7 validadores. [Respostas persistentes](../gestao/ficha-entrega.md) já contêm identificação completa,papéis e URLs conhecidas. Faltam vídeo/linkPDFfinal, evidências de conclusão dosdez INT, quatro declarações verdadeiras (composição desde 02/10,terceiros/IA,semcredencial eprodução sópipeline,triagemna v1.0.0) egeração/conferênciaTXT. OHTMLapenas validapreenchimento: marcar10SIMnãoexecutaqualquer requisito.

Preservamos a orientação de preencher oHTML/TXTporúltimo. Não há necessidade de novas respostas deRAouusuários. Se a declaraçãodesde 02/10 não tiver prova suficiente, obter esclarecimento factual/orientação humana; a tagfinal nãoresolveessa declaração histórica.

## Rubrica, banca e critérios que zeram

Nota=(0,7×A+0,3×B)×F. A usa os dez pesos acima; B: inovação 25%, viabilidade 25%, jogabilidade 30%, apresentação 20%. F=1,0 exige commits e PRs revisados em pelo menos três INT e participação na banca; não basta ter três commits e não é atribuído pela IA. Ensaiar10 minutos de apresentação, 5 de demonstração e 5 de perguntas. O playtest exige um colega de outra turma jogando três minutos sem explicação; sucesso automatizado não o substitui.

- Plágio ou ativo sem autorização/licença: zera a avaliação do squad.
- Produção alterada manualmente fora da pipeline: zera INT-07.
- Credencial real commitada: zera INT-05 e exige revogação; não usar segredo real emteste.
- Pipeline que não roda de clone limpo: zera INT-03.
- Conferir marco e horário oficial de entrega conforme enunciado; não presumir19:00,retroagir prévia/tagouinventardataparavaldador.
- Integrável ausente/semfuncionar recebe0–2; pacoteque nãoabre,nãofuncionaoucontémURLindisponível reprovanatriagem.

A nota e o F são atribuídos pelo professor; estimativas10são preenchimento solicitado,não certificam faixa avançada. Concurso21/10éopcionale nãoaltera nota:nenhum aceite/inscrição/Drive/Instagram automático. AVA/recibo eparticipaçãorealnabanca continuampendentes.
