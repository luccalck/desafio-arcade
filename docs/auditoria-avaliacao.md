# Auditoria do enunciado — Desafio Arcade

Conferência em 12/10/2026. Este documento lista o que existe e o que falta; não atribui nota nem substitui a avaliação do professor. A candidata atual é a Oficina de Jogos WEB com desafios em Python, versão 0.6.0.

## Fontes e método

Foram relidos o texto integral e o JavaScript de `C:/Users/user/Downloads/jogo/Avaliação.html`, incluindo abas, rubrica, exemplos, cronograma e geração da ficha final. A cópia em `C:/Users/user/Downloads/Avaliação.html` tem o mesmo SHA-256: `19362485b3ec9534bdf31303ca0b92b6fe96de21bb87867977d37a7393565275`.

O modelo GDD e os roteiros por área continuam sendo referências complementares. A plataforma decidida é WEB. Os originais foram preservados. Os exemplos de scripts do HTML são referências, não evidência de que nossos workflows foram executados.

Foram conferidos arquivos, histórico Git, PRs, proteção de main, environments, configuração Pages, tags/releases e evidências anteriores de CI. Os resultados detalhados de jogo e publicação estão em [python-pages.md](evidencias/python-pages.md) e [ci-python-pages.md](evidencias/ci-python-pages.md). Esta auditoria não repetiu todos os testes de comportamento.

## Por que o repositório parecia vazio

Antes desta correção, a página inicial abria `main`, que contém um único commit de bootstrap e somente o README. O código completo está em `feature/primeiro-ciclo`, com 21 commits de origem antes desta auditoria, todos do autor configurado `luccalck`. O [PR #2](https://github.com/luccalck/desafio-arcade/pull/2) continua em rascunho, com destino `main` e sem revisão aprovada.

A branch padrão de visualização passou temporariamente a ser `feature/primeiro-ciclo`, para mostrar código e documentação completos. Isso não é merge nem aprovação acadêmica. `main` continua protegida com CI e uma aprovação obrigatória de outro autor. Novos PRs devem apontar explicitamente para `main`; após o primeiro merge revisado, ela deve voltar a ser a branch padrão.

O título inglês do commit inicial foi preservado no histórico. O README e as descrições atuais estão em português; não reescrevemos o histórico público apenas para traduzir um título. Código, nomes de ferramentas e textos de licenças mantêm os identificadores necessários.

## Participação individual: a regra correta

O HTML, linha 376, exige: **“Cada integrante precisa de commits e pull requests aprovados em pelo menos 3 integráveis.”** INT-01 reforça commits em pelo menos três integráveis e pelo menos dez PRs do squad revisados por pessoa diferente do autor.

Portanto, não basta fazer três commits na mesma área. A contribuição precisa alcançar **três INT diferentes**, com trabalho real, commits e PRs aprovados. O professor verifica o Git e pode entrevistar os integrantes. Os papéis de Produto, Desenvolvimento, Plataforma e SRE não limitam a participação a uma área exclusiva.

Na linha 1100, o fator individual é:

| Contribuição comprovada | Fator F |
|---|---:|
| Commits e PRs revisados em pelo menos três integráveis, com participação na banca | 1,0 |
| Contribuição em dois integráveis | 0,8 |
| Contribuição em um ou nenhum integrável | 0,5 |

Uma forma de organizar o trabalho é cada pessoa entregar um PR substantivo para cada um de três INT: isso daria doze PRs no squad. É uma sugestão de organização, não uma exigência textual de três PRs por pessoa. Um PR pode envolver mais de um INT, desde que sua contribuição seja verificável. Os 21 commits atuais de um único autor não equivalem a dez PRs revisados nem à participação dos outros integrantes.

Exemplos de distribuição futura, ainda sem pessoas atribuídas:

| Papel | Três integráveis possíveis | Trabalho que pode gerar evidência |
|---|---|---|
| Produto | INT-02, INT-04, INT-10 | GDD e telas; avaliação de compreensão e correções; roteiro/relatório com evidências |
| Desenvolvimento | INT-04, INT-06, INT-07 | Regressões; build/offline; smoke e recuperação |
| Plataforma | INT-03, INT-06, INT-07 | Esteira; releases; promoção e rollback |
| SRE | INT-05, INT-08, INT-09 | Segurança; sondas e métricas; pacote e triagem |

Cada integrante deve realizar e compreender seu trabalho, usando sua própria identidade. Não atribuir retroativamente commits já feitos por outra pessoa nem criar revisões fictícias.

## Conferência dos dez integráveis

“Implementado” significa que existe código/configuração; “executado” exige resultado observável. Nenhum INT está completamente encerrado.

| INT / peso em A | Implementado ou executado | Falta para completar e buscar a faixa avançada |
|---|---|---|
| INT-01 / 10% | Repositório público, histórico, PR #2, CI obrigatória e main protegida | Registrar quatro integrantes/RA/papéis em SQUAD; acesso dos quatro e do professor; pelo menos dez PRs com revisão de outro autor; contribuição equilibrada em três INT por pessoa; tags anotadas. Histórico exemplar e Conventional Commits. |
| INT-02 / 8% | GDD com doze seções, Esteira, diagramas/mapas/telas; PDF gerado e conferido com pdfinfo | Identificação e revisão coletiva; coerência de versão/data com release; GDD atualizado por PR em cada mudança de mecânica. O mínimo aceita wireframes OU Stitch; a coluna avançada pede telas do Stitch. Temos SVGs próprios, não evidência de Stitch: usar a ferramenta ou validar equivalente com o professor. |
| INT-03 / 15% | Actions em push/PR, ubuntu-latest, npm ci/lockfile, lint/testes/segurança/build/PDF/artefatos/cache; preview Pages com smoke | Implementar fluxo formal ci → deploy-hml → deploy-prd; HML da main aprovada; E2E na URL; aprovação registrada em producao; permissões mínimas e artefatos por etapa. Medir push → HML ≤15 min. Faixa avançada: paralelismo/cache/notificações com execução comprovada. |
| INT-04 / 12% | 152 testes de unidade, 26 de integração, 15 E2E; cobertura de instruções core 97,90%; JSON inválido bloqueia build; bugs reais com regressão | Completar regressão da HML publicada conforme roteiro: abrir, iniciar, concluir primeira fase e ver encerramento; formalizar smoke após PRD; vincular bug real/teste ao relatório. Os dois smokes públicos atuais não comprovam todo esse roteiro. Golden eval é condicionado ao uso de Opal/AI Studio, ausentes no projeto. |
| INT-05 / 10% | Gitleaks bloqueante/hook, audit de produção, SBOM, LICENSE, THIRD_PARTY, AI-USAGE e política de segurança | Revisão humana de código/IA/direitos antes do merge; comprovar Dependabot ativo e relatórios por release. Configuração de updates existe na branch agora padrão; execução ainda não comprovada. A API de alertas informou alertas desativados e escopo insuficiente para administrá-los. Faixa avançada pede política de vulnerabilidades e IA rastreável por PR. |
| INT-06 / 10% | Site estático offline; version.json; ZIP/checksum na CI; reprodutibilidade testada; build muito abaixo de 25 MB | Tags anotadas gerando GitHub Releases completas: ZIP, checksum, SBOM, GDD e notas revisadas; conferir coerência SemVer/SHA/data e integridade do artefato publicado. Ainda não existem tags nem releases. Não fabricar a prévia histórica. |
| INT-07 / 12% | Preview com /hml/, releases por SHA, carregador, sessão preservada e gh-pages escrito pela pipeline | Produção formal com canário ou azul-verde verificável; rollout.json com estado estável/anterior/canário/percentual; rollback automático e manual; demonstrar recuperação <5 min incluindo Pages, sem URL fora do ar. O preview não comprova essa estratégia. Pages usa atualmente build_type workflow; o HTML pede fonte gh-pages: alinhar a configuração ou validar equivalência documentada. |
| INT-08 / 10% | Requisitos planejados; não há implementação/execução operacional suficiente | Sondas HML/PRD a cada 15 min; HTTP/latência/versão e CSV na branch observabilidade; Issues JogoForaDoAr e LatenciaAlta (>2 s), sem duplicação e com fechamento automático; /status/; quatro DORA reais; comparação com 11 dias e melhoria medida. Faixa avançada: alerta real disparado/tratado e decisão comprovada. Não existe mínimo de dez execuções DORA no HTML. |
| INT-09 / 8% | ZIP/checksum e PDF automatizados, ainda separados | Gerar submissao pela pipeline com GDD.pdf, LINK_DO_JOGO.txt, build.zip, pitch.mp4 e MANIFESTO.sha256; LEIA-ME.txt dentro do ZIP. Implementar triagem real de prazo/squad/GDD/URL/smoke/build/vídeo; aprovação na tag final. Faixa avançada: triagem agendada com alerta de indisponibilidade até a banca. |
| INT-10 / 5% | Conceito e documentos técnicos; correções rastreáveis | Pitch real de produção ≤90 s, legendas/direitos/consentimento; relatório técnico PDF ≤12 páginas com prints datados e links dos dez INT; retrospectiva honesta e contribuição por PR. Banca dos quatro: 10 min apresentação, 5 min demonstração real e 5 min perguntas; teste com outra turma por 3 min sem explicação e observações reais. |

### Configurações que precisam de integração

O environment `producao` existe e tem reviewer obrigatório configurado, mas nenhum deploy atual o utiliza. Sua existência não comprova aprovação nem entrega em produção. O job de preview usa `github-pages`. O environment `homologacao` também existe.

A publicação acessível é um preview da branch de trabalho. HML deve receber o artefato da main aprovada; produção precisa promover **o mesmo build**, sem recompilar entre os ambientes. Pastas por SHA e um ponteiro de versão, sozinhos, não demonstram canário, azul-verde ou rollback.

## GDD: conferir além do resumo mínimo

[docs/gdd.md](gdd.md) contém premissa/problema, high concept, gênero/plataforma, mecânicas, enredo/personagens, fluxo, level design, UI/UX, áudio, arte/referências, IA/terceiros e ideias adicionais, além de identificação e Esteira. Ainda faltam os dados reais dos quatro, revisão coletiva de autoria/direitos, links finais e a versão/data da release aceita. A seção de roadmap não deve ser confundida com implementação.

O PDF do GDD não substitui o relatório técnico de até doze páginas. Não publicar CPF ou assinatura no repositório. Ausência de áudio e referências próprias devem continuar declaradas honestamente.

## Ficha final gerada pelo JavaScript

Não basta copiar o texto inicialmente visível do HTML. A ficha solicita:

- Nome do squad; quatro nomes completos, RAs e quatro papéis distintos.
- Repositório, jogo de produção, pipeline verde, painel /status/, vídeo e relatório técnico. HML é opcional no formulário, mas obrigatória na esteira. Link do concurso é opcional.
- Checklist dos dez INT com evidências; autoavaliações de A e dos quatro critérios de B.
- Declarações verdadeiras sobre squad registrado/sem mudanças desde 02/10, terceiros/IA, ausência de credenciais/produção somente pela pipeline e triagem aprovada na v1.0.0.

Hoje não podemos marcar todas essas declarações como verdadeiras. O script usa F=1 em sua estimativa, mas isso não comprova a contribuição individual; a nota final é do professor. Gerar o TXT só após conferir os dados e as evidências. A inscrição no concurso de 21/10 é opcional e separada da nota.

## O que significa buscar a nota máxima

A fórmula do HTML é **(0,7 × A + 0,3 × B) × F**, na escala de 0 a 10. A usa os pesos da tabela; B avalia originalidade (25%), execução técnica (25%), jogabilidade (30%) e apresentação (20%). Assim, completar arquivos e testes não garante a nota máxima: compreensão, diversão, aprendizagem, demonstração e participação precisam de avaliação real.

Além das lacunas acima, conferir as condições eliminatórias do enunciado: plágio/ativo sem autorização, credencial real commitada, produção manual e CI que falha em clone limpo. Não inserir evidências simuladas, aceite próprio no lugar da revisão de outro autor, tags retroativas ou medições inventadas. O horário 19:00 no script de exemplo não é confirmação do início da aula.

## Ordem de execução a partir daqui

Preservar os roteiros e códigos C01/C02, P01–P07, D01–D07, R01–R07 e S01–S06. **G0 continua sendo o primeiro aceite incompleto**, pois identificação/participação/acordos do squad estão pendentes. Preparação de outras tarefas pode avançar conforme suas entradas; isso não libera os aceites humanos.

1. C01/C02 e G0: completar dados reais e organização dos quatro; distribuir trabalho substantivo em três INT por pessoa e revisão cruzada.
2. Seguir G1–G2 nos roteiros: revisar o produto aprovado, GDD/telas/direitos, conteúdo e núcleo; preparar as bases técnicas independentes.
3. Seguir G3–G5: CI formal, revisão/merge, HML, release e produção com aprovação/estratégia/recuperação. Medir as execuções.
4. Seguir G6–G8: monitoramento/DORA, melhoria, gravação humana em produção, pacote/triagem e banca. Usar vídeo como entrada do pacote antes da tag final; acrescentar evidências de release/triagem ao relatório depois das execuções.

Os aceites detalhados continuam nos roteiros por área; esta lista não os substitui. Separar sempre: implementado, executado/validado, dependente de pessoa/acesso e não atendido.
