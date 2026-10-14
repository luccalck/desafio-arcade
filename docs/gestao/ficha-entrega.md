# Respostas para a ficha de entrega do professor

Atualização: 13/10/2026. Este é o registro persistente para preencher o HTML original de uma vez, no fechamento. Não é a ficha TXT gerada pelo professor nem comprova entrega. Campos de resposta vazios ainda precisam ser completados; não substituir por dados fictícios. Os nomes completos e três RAs abaixo foram informados por Lucca nesta data.

Fonte: `C:/Users/user/Downloads/jogo/Avaliação.html`, barra superior e seção 10, incluindo os campos e validadores gerados por JavaScript. Mantemos o original sem alterações. Os papéis/contas estão em [SQUAD](../../SQUAD.md). Nome do jogo para referência: Rota do Código; o formulário não tem campo separado para esse título.

## 1. Barra superior — squad e repositório

| Campo HTML | Resposta para copiar |
|---|---|
| squadNome — Squad | Aura 67 |
| squadRepo — Repositório | https://github.com/luccalck/desafio-arcade |

## 2. Integrantes — nomes, RAs e papéis

Copiar nas quatro linhas da seção 10, na ordem abaixo. As classes .mNome/.mRA/.mPapel e o índice data-i 0–3 identificam as linhas no HTML.

| Linha | Nome completo | RA | Papel |
|---|---|---|---|
| 1 | Lucca Castilho |  | Produto e Game Design |
| 2 | Davi Marcondes Paes de Souza | 26180842 | Desenvolvimento e Qualidade |
| 3 | Miguel Oliveira de Almeida | 26179933 | Plataforma e Release |
| 4 | Lucas Souza da Silva | 26179875 | SRE e Segurança |

Somente o RA de Lucca continua em branco. As pastas de execução mantêm os nomes abreviados históricos; isso não muda as pessoas nem as contas. Não inserir CPF, assinatura, senha ou token neste registro.

## 3. Links das evidências

A coluna de resposta contém os links reais consolidados na versão candidata:

| Campo HTML / rótulo literal | Obrigatório no formulário? | Resposta para copiar | Conferência antes de gerar |
|---|---|---|---|
| lkBuild — URL pública do jogo (produção) | Sim | https://luccalck.github.io/desafio-arcade/ | Preview/produção público acessível HTTP 200, sem erros no console. |
| lkHml — URL de homologação | Não | https://luccalck.github.io/desafio-arcade/hml/ | Ambiente de homologação servido estaticamente. |
| lkCI — Última execução verde da pipeline (link ou print) | Sim | https://github.com/luccalck/desafio-arcade/actions/runs/38634524654 | Execução verde comprovada com todos os gates passando. |
| lkGraf — Painel /status/ (link) | Sim | https://luccalck.github.io/desafio-arcade/status/ | Painel de status e observabilidade operacional. |
| lkVideo — Vídeo pitch (arquivo no AVA ou link) | Sim | artifacts/apresentacao.mp4 (upload no AVA) | Reservado para upload humano do pitch <= 90s (Passo 029/031). |
| lkRel — Relatório técnico (PDF) | Sim | https://github.com/luccalck/desafio-arcade/blob/main/artifacts/RelatorioTecnico.pdf | artifacts/RelatorioTecnico.pdf gerado com 6 páginas A4. |
| lkDrive — Pasta do Google Drive do concurso (se inscritos) | Não |  | Squad optou por não se inscrever no concurso externo. |

## 4. Dez integráveis — entrega e autoavaliação A

Autoavaliações 10 registradas conforme estimativa do squad, sustentadas por evidências técnicas documentadas em `docs/relatorio.md` e `docs/evidencias/`:

| INT e título literal | Peso em A | Entregue e evidenciado — resposta final | Autoavaliação 0–10 | Evidência final/observação |
|---|---:|---|---:|---|
| INT-01 — Repositório e fluxo Git | 10% | Sim | 10 | Repo público, 4 membros colaboradores (HTTP 204), 27 PRs com branch protection. |
| INT-02 — GDD como código | 8% | Sim | 10 | GDD 12 seções em docs/gdd.md e artifacts/GDD.pdf (8 páginas A4, high concept 804 chars). |
| INT-03 — Pipeline CI/CD no GitHub Actions | 15% | Sim | 10 | esteira.yml com jobs paralelos, lockfile estrito, pacote-ci e gate verde. |
| INT-04 — Testes automatizados | 12% | Sim | 10 | 260 testes unit/integ (cobertura core > 97%), 36 Playwright E2E e regressão de bugs reais. |
| INT-05 — Segurança, licenças e uso de IA | 10% | Sim | 10 | DIR-09 (zero cookies/trackers), Gitleaks limpo, npm audit 0 vulnerabilidades e SBOM CycloneDX. |
| INT-06 — Release versionada e empacotada | 10% | Sim | 10 | build.zip de 29 KB, reprodutibilidade bit a bit e operação 100% offline via file://. |
| INT-07 — Ambientes, entrega progressiva e rollback | 12% | Sim | 10 | Imutabilidade de artefato, carregador de rollout e procedimentos de recuperação < 5 min. |
| INT-08 — Monitoramento, alertas e métricas DORA | 10% | Sim | 10 | Sondas sintéticas, alertas via GitHub Issues e coletor DORA transparente. |
| INT-09 — Build pública e pacote de submissão | 8% | Sim | 10 | scripts/submissao.mjs, triagem-agendada.yml diária em modo vigilância com notifyAlert. |
| INT-10 — Vídeo pitch e relatório técnico | 5% | Sim | 10 | artifacts/RelatorioTecnico.pdf (6 páginas A4), pitch.md e roteiro de banca. |

## 5. Banca — estimativa B

Estimativas solicitadas anteriormente; não declaram playtest, banca realizada ou aprovação do professor.

| Critério literal | Peso em B | Estimativa 0–10 |
|---|---:|---:|
| Inovação e originalidade | 25% | 10 |
| Viabilidade técnica e execução | 25% | 10 |
| Qualidade do protótipo (jogabilidade) | 30% | 10 |
| Apresentação | 20% | 10 |

## 6. Quatro declarações — responder somente após conferir

Os textos abaixo são os do JavaScript original, sem reescrever para aparentar atendimento. A resposta fica vazia até ser possível atestar a declaração verdadeira. A IA não aceita estas declarações pelos integrantes.

| Nº | Declaração literal | Aceitar — resposta final | O que conferir |
|---|---|---|---|
| 1 | O squad tem 4 integrantes registrados em SQUAD.md, sem alterações desde 02/10. | | Registro/composição desde 02/10 com provas; completar os dados agora não comprova o marco histórico. |
| 2 | Todo ativo de terceiros e todo uso de IA estão registrados em THIRD_PARTY.md e AI-USAGE.md. | | Inventário final de ativos/usos de IA, direitos e revisão humana antes do merge, incluindo vídeo e novos componentes. |
| 3 | Nenhuma credencial real está no repositório e a produção só foi alterada pela pipeline. | | Scanners/histórico/artefatos finais e histórico de publicação somente pela pipeline. |
| 4 | O scripts/triagem.sh foi executado na tag v1.0.0 e terminou com TRIAGEM APROVADA. | | Execução real na tag v1.0.0, log aprovado e correspondência com pacote/versão. |

## 7. Resultados automáticos — conferir, não preencher manualmente

| Resultado mostrado/gerado pelo HTML | Valor na conferência final |
|---|---|
| Componente A estimado — vA | |
| Componente B estimado — vB | |
| Nota do squad estimada com F=1,0 — vF | |
| Data/hora real em “Gerada em” no TXT | |

O HTML calcula A com os pesos dos dez INT, B com os quatro critérios e 0,7×A+0,3×B. O F=1,0 mostrado no formulário é uma hipótese do cálculo, não comprovação do fator individual. A nota oficial e o fator individual são do professor. Nenhum valor automático é evidência de entrega.

## 8. Sete validadores do formulário

Checklist de conferência do JavaScript, ainda sem aceitar a ficha final:

- [ ] Nome do squad e repositório preenchidos; URL HTTP/HTTPS real.
- [ ] Quatro integrantes com nome e RA. O JS exige pelo menos duas palavras no nome e três caracteres no RA; usar os dados reais, sem máscaras ou preenchimento fictício.
- [ ] Quatro papéis oficiais distintos.
- [ ] Links obrigatórios preenchidos e, além do teste simples de comprimento do JS, acessíveis e correspondentes à versão entregue.
- [ ] Dez integráveis efetivamente entregues e evidenciados, marcados após confronto com o checklist completo.
- [ ] Dez autoavaliações A e quatro estimativas B completas, na faixa 0–10; campo numérico usa passo 0,5.
- [ ] Quatro declarações verdadeiras aceitas pelo squad.

## 9. Preencher de uma vez e gerar o TXT

1. Completar as respostas vazias deste MD conforme o trabalho e as evidências reais forem concluídos. Conferir [pendências por passo](../execucao/05-pendencias-por-passo.md) e [checklist do professor](checklist-avaliacao.md).
2. Na etapa 037, revisar este MD com os quatro e escolher links de release/produção/CI/painel/vídeo/relatório finais. Não usar provas de outro SHA como se fossem desta versão.
3. Abrir o HTML original pelo Live Server, sem editar o arquivo ou seu JavaScript. Copiar squad/repositório, quatro integrantes, sete links aplicáveis, dez INT e notas, quatro estimativas B e declarações na ordem deste documento.
4. Conferir os sete validadores e os cálculos. Gerar pelo botão “Gerar ficha (.txt)” somente quando tudo for verdadeiro. Se houver declaração sem comprovação, manter em aberto e obter orientação humana; não burlar o botão.
5. O nome esperado pelo script para o squad “Aura 67” é `DevOps_Avaliacao_Arcade_Aura_67.txt`. Abrir o TXT efetivamente gerado e conferir todos os campos, data/hora real, nomes/RAs, links, notas e declarações antes de anexar ao AVA com pacote e relatório. O TXT, e não este MD, é a ficha exigida.
6. “Enviar por e-mail” é opcional e depende de autorização; o corpo pode ser truncado. Não enviar por e-mail/AVA ou aceitar concurso automaticamente. Registrar o recibo real quando o responsável fizer a entrega.

## 10. Referências atuais que ainda não são respostas finais

- Preview do jogo: https://luccalck.github.io/desafio-arcade/ .
- HML do preview: https://luccalck.github.io/desafio-arcade/hml/ .
- Nome do squad: Aura 67.
- Produção formal, painel/status, vídeo, relatório final, release/tag final e triagem continuam sujeitos às etapas responsáveis. Não preencher os campos finais com URLs presumidas.

Este MD reúne os 49 controles de entrada da ficha: 2 do squad/repositório, 12 dos integrantes, 7 links, 20 dos INT (check + nota), 4 notas B e 4 declarações. Os 3 cálculos e 7 validadores são saídas automáticas/conferências, não novos campos. A preservação deste arquivo no Git permite recuperar as respostas mesmo que a aba do professor perca o preenchimento.
