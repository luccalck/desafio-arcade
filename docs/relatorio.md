# Relatório Técnico — Desafio Arcade

**Rota do Código · Squad Aura 67 · Candidata {{VERSION}} · 14/10/2026**

Construímos uma oficina WEB de programação em que o jogador corrige cinco funções Python e usa suas próprias regras num minijogo de nave. O produto atravessa uma esteira de integração, teste, segurança e entrega estática no GitHub. Este relatório distingue o que foi implementado, o que executamos e as provas ainda pendentes.

**Repositório:** [luccalck/desafio-arcade](https://github.com/luccalck/desafio-arcade). **Referência técnica auditada:** [CI 38649548723](https://github.com/luccalck/desafio-arcade/actions/runs/38649548723), SHA `e71de729219028ee314fb52949e1ee28ffeeb678`, versão 0.6.0. A candidata {{VERSION}} corrige o fechamento; não é declarada como entrega acadêmica final v1.0.0. Dados da referência não são atribuídos automaticamente ao novo código ou a uma publicação posterior.

## 1. Equipe, autoria e problema educativo

| Integrante | RA | Coordenação | GitHub |
|---|---|---|---|
| Lucca Castilho Costa | 26179873 | Produto e Game Design | luccalck |
| Davi Marcondes Paes de Souza | 26180842 | Desenvolvimento e Qualidade | DaviSouza78 |
| Miguel Oliveira de Almeida | 26179933 | Plataforma e Release | miguelsenai2024 |
| Lucas Souza da Silva | 26179875 | SRE e Segurança | 6lucassilvaaa |

Os papéis organizam a coordenação; todos participam das áreas. O nome completo e RA de Lucca foram confirmados pelo próprio integrante em 14/10. Não incluímos CPF, assinaturas ou credenciais públicas.

O problema educativo é memorizar comandos sem compreender como uma regra muda um programa. O público é iniciante em programação, com leitura básica em português e familiaridade com teclado ou toque. Cada missão apresenta um defeito, um editor curto e uma arena para experimentar. Comparar entradas e saídas fornece feedback observável; o final integra as cinco funções, exige 100 pontos com três vidas e permite exportar HTML jogável offline e fontes .py.

| Missão | Conceito praticado | Critério verificável |
|---|---|---|
| Controlar | Eventos e decisões | -1/0/1 conforme teclas; direita tem prioridade |
| Mover | Operações e parâmetros | Posição + direção × velocidade |
| Colidir | Comparação e fronteira | Distância menor ou igual ao raio |
| Pontuar | Estado e condições | Preservar acumulado; cristal +10, estrela +25 |
| Criar onda | Listas e repetição | Quantidade exata, início 40, intervalo 80 |
| Projeto final | Integração e depuração | 23 casos e vitória no jogo construído |

Ações e resultados são reais no navegador, mas XP, testes aprovados e vitória não medem aprendizagem por si. O playtest de três minutos com colega de outra turma ainda precisa ocorrer. Não atribuímos resultados a usuários inexistentes.

## 2. Arquitetura e decisões

O site estático usa TypeScript, HTML/CSS/SVG e esbuild. Regras puras ficam em `src/core`, separadas da apresentação e do conteúdo JSON validado por contrato. O interpretador lê uma AST de um subconjunto explícito de Python: funções, condições, operações, listas e repetição limitada. Não é CPython completo e não executa imports ou bibliotecas arbitrárias. Limites de nós, passos e iterações reduzem o risco de travamento; não usamos eval/Function para executar a fonte do jogador.

A oficina e a exportação compartilham a semântica do interpretador e as regras do motor. Preferências/progresso usam armazenamento local, sem conta ou backend. O método offline documentado é descompactar build.zip e abrir index.html no navegador. A experiência móvel é o mesmo site responsivo; editar código em tela pequena continua sendo uma limitação a avaliar com pessoas.

| Decisão | Motivo | Alternativa e limite da decisão |
|---|---|---|
| DOM/SVG e TypeScript | Interface acessível por teclado, escopo pequeno e regras testáveis | Engine web poderia ser válida; acrescentaria integração e dependências sem necessidade demonstrada |
| Subconjunto Python local | Operação offline e regras curtas de cinco missões | CPython/WASM ampliaria compatibilidade, mas não foi necessário; não fizemos benchmark comparativo |
| Site estático no Pages | Build publicável sem backend, VM ou nuvem paga | Execução remota exigiria infraestrutura e quebraria o método offline |
| Vitest e Playwright | Testar regras, contratos, navegador, toque e exportação | Contagens/cobertura não substituem playtest ou revisão humana |
| Azul-verde | Preservar versão estável, candidata e rota de recuperação | Canário é alternativa permitida; não é preciso implementar as duas |

A build da CI de referência tem 29.001 bytes compactados, abaixo de 25 MB. Esse tamanho é uma medida do artefato auditado, não previsão de tempo de carga, desempenho em dispositivo antigo ou tamanho de outra versão.

## 3. Esteira e cadeia de confiança

```text
branch curta → PR → revisão de outro autor → CI → main protegida
  → pacote único + manifesto → /hml/ + E2E
  → environment producao aprovado → /releases/<sha>/ + smoke
  → promoção azul-verde ou rollback → sondas + Issues + /status/
  → vídeo real como entrada → submissão + triagem → AVA e banca
```

A CI distribui qualidade, segurança, build e E2E em jobs independentes no runner ubuntu-latest. Usa lockfile/npm ci, lint/tipagem, validação de conteúdo, testes/cobertura, Gitleaks bloqueante, auditoria de produção contra vulnerabilidades críticas, SBOM, build, PDF e checksum. O gate `ci` depende dos resultados; o bundle consolida os arquivos e seus hashes para impedir mistura de execuções.

O contrato de entrega é compilar uma vez e promover o mesmo ZIP. HML precisa executar regressão real; produção exige aprovação no environment, release imutável, smoke e promoção. A sessão mantém a versão válida para evitar troca no meio da partida. Recuperação automática/manual deve preservar o serviço e ser medida incluindo propagação Pages. Proteções e CI permanecem; autorização de Lucca não permite simular revisão de outro autor nos próprios PRs.

A reconferência identificou lacunas: relatório fora do bundle, pacote concorrente com produção, proveniência insuficiente, seleção de vídeo só por execução recente, triagem agendada sem recuperar o pacote e inconsistência entre versão/tag. Corrigimos os registros para tornar essas lacunas explícitas. A execução dos scripts e testes corrigidos precisa gerar novas provas; a existência do código não valida implantação.

## 4. Qualidade, segurança e evidências visuais

Na CI de referência, os JUnit confirmam **152 testes de unidade + 108 de integração = 260**, além de **36 E2E**, sem falhas ou skips. A cobertura ponderada de `src/core` é **97,91% das instruções, 100% das linhas, 100% das funções e 95,24% das ramificações**. Supera os mínimos de 15/3/2 testes e 70% do core nessa execução. A medição deve ser refeita no HEAD final; cenários de adaptadores não provam eventos de produção. No fechamento da candidata {{VERSION}}, a reexecução local passou em **270 testes de unidade/integração**; lint/tipagem e actionlint também passaram. Esses resultados locais, informados pela execução de fechamento, ainda não são CI remota nem deploy. A suíte local E2E do HEAD corrigido também passou: **36/36 em 53 s**, com servidor isolado na porta4187 e dois workers. Essas execuções revalidam os testes da candidata, preservando a distinção da referência histórica; não comprovam HML ou PRD.

Baixamos o bundle real da CI e conferimos 170 arquivos por tamanho/SHA-256 sem divergência. O ZIP tem SHA-256 `3bfb09573d93a58d34e72c3379ae6a6386202dbb40047d151ea106cbc3754a87`; contém LEIA-ME.txt e metadados. O E2E offline faz parte da suíte aprovada. O GDD PDF abre via pdfinfo e tem 18 páginas A4. O limite de doze páginas é deste relatório, não do GDD.

Gitleaks não reportou achados e npm audit de produção não reportou vulnerabilidades no bundle consultado. SBOM e registros de IA/terceiros existem. Esses resultados têm alcance limitado à execução e ao inventário: não garantem direitos de todo ativo ou ausência absoluta de segredos. Revalidar tag, artefatos e vídeo; nunca introduzir segredo real para testar detecção. Ativos do Stitch são referências identificadas, não capturas de execução.

### Capturas reais da aplicação

![Menu real da oficina](images/menu-real-009.png)

**Figura 1.** Menu capturado em 13/10/2026 às 14:38:06, America/Sao_Paulo. Origem: localhost:4173, versão 0.6.0, SHA b94469ee; metadados preservados em docs/evidencias/menu-real-009.json. É prova histórica local da interface, não produção da candidata atual.

![Missão real com editor e arena](images/hud-real-009.png)

**Figura 2.** Primeira missão capturada em 13/10/2026 às 14:38:07, America/Sao_Paulo, mesma origem/versão, viewport 1280×900; metadados em docs/evidencias/hud-real-009.json. Mostra a regra editada e feedback 4/4; não comprova playtest humano nem aprendizagem.

### Bug real e regressão

O registro histórico de D06 documenta a retomada de regra antiga após editar código durante a partida: a ação de retomar podia executar a compilação anterior. A correção invalida o aceite/fingerprint ao editar e exige nova aplicação da fonte. O cenário E2E de regressão permanece em tests/e2e/workshop.spec.mjs; falha anterior, JUnit e captura estão em docs/evidencias/bug-regra-antiga.md e arquivos associados. Não criamos bug fictício para cumprir rubrica. [PR da regressão e contexto](https://github.com/luccalck/desafio-arcade/pull/8).

## 5. Rastreabilidade dos dez integráveis

Cada linha traz uma fonte acessível, um resultado conhecido e o limite do aceite. Os links são de PRs ou execuções reais, não certificação de que tudo foi integrado.

| INT / peso em A | Fonte e evidência | Estado e pendência de aceite |
|---|---|---|
| INT-01 /10% | [PR14](https://github.com/luccalck/desafio-arcade/pull/14), [PR29](https://github.com/luccalck/desafio-arcade/pull/29); SQUAD/contribuições | Quatro autores/colaboradores;15 reviews de Lucca nos PRs 15–29 confirmados após autorização. PRs próprios exigem outro revisor; integração/banca a conferir |
| INT-02 /8% | [CI auditada](https://github.com/luccalck/desafio-arcade/actions/runs/38649548723), [PR22](https://github.com/luccalck/desafio-arcade/pull/22) | GDD completo, PDF 18p; revisar a versão/identificação atualizada e coerência com a release efetiva |
| INT-03 /15% | [CI auditada](https://github.com/luccalck/desafio-arcade/actions/runs/38649548723), [PR15](https://github.com/luccalck/desafio-arcade/pull/15) | CI verde; HML/PRD ignorados naquele run. Execução formal e push→HML≤15min precisam de prova |
| INT-04 /12% | [CI auditada](https://github.com/luccalck/desafio-arcade/actions/runs/38649548723), [PR16](https://github.com/luccalck/desafio-arcade/pull/16) | 260 + 36 testes e cobertura comprovados; revalidar HEAD e E2E/smoke dos ambientes reais |
| INT-05 /10% | [PR10](https://github.com/luccalck/desafio-arcade/pull/10), [CI auditada](https://github.com/luccalck/desafio-arcade/actions/runs/38649548723) | Scanners/SBOM/inventários; revisar direitos de componentes e materiais finais |
| INT-06 /10% | [PR17](https://github.com/luccalck/desafio-arcade/pull/17), [PR23](https://github.com/luccalck/desafio-arcade/pull/23) | ZIP/checksum/offline; tag/release e equivalência comPRD precisam de execução |
| INT-07 /12% | [PR19](https://github.com/luccalck/desafio-arcade/pull/19), [PR21](https://github.com/luccalck/desafio-arcade/pull/21) | Contratos/testes de azul-verde e rollback; medir operação < 5 min e continuidade real |
| INT-08 /10% | [PR19](https://github.com/luccalck/desafio-arcade/pull/19), [PR23](https://github.com/luccalck/desafio-arcade/pull/23) | Scripts/painel/coletor; publicar status, executar sondas/Issues/DORA e comprovar melhoria |
| INT-09 /8% | [PR24](https://github.com/luccalck/desafio-arcade/pull/24), [PR25](https://github.com/luccalck/desafio-arcade/pull/25) | Automação preparada; pacote/triagem finais bloqueados porpitch e demais verificações |
| INT-10 /5% | [PR26](https://github.com/luccalck/desafio-arcade/pull/26), [PR28](https://github.com/luccalck/desafio-arcade/pull/28) | Fonte/gerador do relatório e roteiros; publicar PDF revisado, pitch, ensaio e banca pendentes |

A raiz [Pages](https://luccalck.github.io/desafio-arcade/) e [HML](https://luccalck.github.io/desafio-arcade/hml/) responderam200 na consulta da auditoria; HML/rollout apontavam para o preview 71933bf. `/status/` respondeu404. Não chamamos essas respostas de produção formal da candidata e não preenchemos a ficha com URLs finais presumidas.

## 6. Operação, DORA e recuperação

| Métrica | Definição adotada | Situação do snapshot auditado |
|---|---|---|
| Frequência de implantação | Deploys formais de produção bem-sucedidos por janela | N/D; previews não usados como produção |
| Lead time de mudanças | Intervalo verificável da mudança até produção | N/D; comparar amostras futuras com a linha de base de 11 dias |
| Taxa de falha de mudança | Deploys formais com falha/incidente sobre deploys da janela | N/D; ausência de amostra não é0% |
| Tempo de recuperação | Do início de falha registrada até recuperação validada | N/D; testes de fixtures não são incidente real |

O coletor deve usar timestamps de deploys/PRs/Issues e explicitar janela, IDs, denominadores e ausências. A linha de base de 11 dias é referência do enunciado, não uma medida já obtida no jogo. Não há mínimo inventado de dez execuções. Uma hipótese de melhoria é reduzir retrabalho pela verificação de proveniência antes da publicação; somente dados reais de antes/depois permitem afirmar efeito.

As sondas previstas a cada 15 min registram HTTP, latência e versão. Issues JogoForaDoAr e LatenciaAlta usam limiar > 2 s, idempotência e fechamento automático. O painel deve mostrar ausência de amostra como indisponível. Ensaios controlados devem ser identificados como tal e distinguir janela/timestamps, propagação Pages, alertas e disponibilidade contínua. Não registramos recuperação < 5 min ou ganho DORA sem medição.

## 7. Colaboração, retrospectiva e próximos aceites

| Integrante | PRs autorais de referência | Escopo de contribuição |
|---|---|---|
| Lucca | [#2](https://github.com/luccalck/desafio-arcade/pull/2) a [#14](https://github.com/luccalck/desafio-arcade/pull/14) | Produto, GDD, jogoPython, segurança,CI eoffline |
| Davi | [#15](https://github.com/luccalck/desafio-arcade/pull/15) a [#19](https://github.com/luccalck/desafio-arcade/pull/19) | HML, conteúdo/testes, release,alertas,produção/painel |
| Miguel | [#20](https://github.com/luccalck/desafio-arcade/pull/20) a [#24](https://github.com/luccalck/desafio-arcade/pull/24) | Playtest preparado, recuperação,DORA,GDD,integridade,triagem |
| Lucas | [#25](https://github.com/luccalck/desafio-arcade/pull/25) a [#29](https://github.com/luccalck/desafio-arcade/pull/29) | Submissão,relatório,candidata,release/ficha/banca eautoria |

No snapshot inicial,28 PRs estavam abertos sem reviews. Após Lucca afirmar que revisou o trabalho dos colegas e autorizar o registro, a API confirmou15 aprovações suas nos PRs 15–29, nos HEADs correspondentes. Isso cumpre o mínimo numérico de dezreviews por outro autor nesse recorte, mas não aprova os própriosPRs, não comprova merge e não determina F. Nenhuma revisão foi atribuída a outra pessoa. A nota depende de(0,7×A+0,3×B)×F e da banca; as autoavaliações10na ficha permanecem estimativas solicitadas.

**O que funcionou:** regras separadas da interface permitiram testar comportamento e exportação; a CI detecta contratos inválidos e arquiva provas; o bundle com manifesto permitiu conferir170 arquivos sem divergência. **O que falhou no processo:** documentos anteciparam aceites sem eventos correspondentes; acumularPRsabertos e gates ignorados gerou aparência de entrega completa. A auditoria reabriu27checks contestados e separou preparação de execução.

**O que mudamos:** identificação real completa, ficha com campos finais vazios, conclusões limitadas à prova e correção da cadeia de automação. **O que medir adiante:** tempo real de entrega, recuperação e efeito de uma melhoria DORA. Não usamos supostas falhas de cron, benchmarks ou consentimentos não observados para sustentar a retrospectiva.

O pitch real permanece pendente por orientação de Lucca. Sem esse vídeo não há pacote acadêmico final completo nem triagem final aprovável. Ainda precisam ocorrer playtest humano, preenchimento verdadeiro do HTML/TXT, envio/reciboAVA, ensaio10min+5min e banca com os quatro. Concurso externo é opcional, sem inscrição ou decisão coletiva comprovada; nenhum termo é aceito automaticamente.

**Fontes locais de acompanhamento:** docs/execucao/05-pendencias-por-passo.md, docs/gestao/checklist-avaliacao.md, docs/evidencias/reconferencia-registros.md e docs/contribuicoes.md. Os resultados operacionais posteriores devem acrescentar run/SHA/hashes/horários reais a este relatório antes da versão de entrega; até lá, não é relatório de encerramento integral.
