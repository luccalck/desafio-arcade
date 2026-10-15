# Publicação e configuração operacional

Versão candidata0.7.0. O pitch permanece pendente por orientação de Lucca Castilho Costa; não criar MP4 substituto, pacote final ou aprovação de triagem sem os arquivos reais. Configurações abaixo não são segredos; tokens são somente secrets/GITHUB_TOKEN.

## Preparação e proteção

1. Revisar a candidata por PR, com pessoa diferente do autor, e integrar na main com CI obrigatório. Restaurar main como default após conter o código atual.
2. Preservar os reviewers e can_admins_bypass=false de producao. A aprovação precisa aparecer no histórico da execução; a regra prevent_self_review do environment controla quem pode aprovar. PR continua exigindo revisão de outro autor.
3. As policies de homologacao, producao e github-pages aceitam main e tagsv*. Tags estáveis só passam após release.mjs provar anotação/mainprotegida/PRaprovado/versão correspondente. Não criar tagfinal prematura.
4. PagesActions publica explicitamente a árvore gh-pages produzida pela pipeline. A equivalência da configuração de origem em relação ao HTML deve ser documentada/validada; não afirmar aceite do professor. Nunca escrever gh-pages manualmente.

## Ativação por etapa

| Variável | Valor/condição |
|---|---|
| SITE_URL | https://luccalck.github.io/desafio-arcade |
| PAGES_PREVIEW_ENABLED | false após a main assumir publicação formal |
| FORMAL_HML_ENABLED | true somente após main revisada e scripts/contratos/testes prontos |
| FORMAL_PRD_ENABLED | true após habilitação HML e ambiente protegido pronto; job exige HML aceita |
| MONITOR_ENABLED / ALERTS_ENABLED | true com monitor/alertas da main e baseline pública pronta; comprovar execução, não só flags |
| FORMAL_RELEASE_ENABLED | true quando tags/refpolicies/notas e contrato de produção estiverem prontos |
| RELEASE_NOTES_SHA256 | SHA256 real do arquivo docs/notas-versao.md revisado para a tag, obtido por Get-FileHash ou sha256sum |
| SUBMISSAO_ENABLED | false enquanto faltar pitch; depois true somente com produção/tag/release aceitas, vídeo fixado e PRAZO verdadeiro |
| TRIAGEM_AGENDADA_ENABLED | false até a submissão final existir e os metadados abaixo estarem fixados |
| PRAZO | ISO8601 com data/hora/fuso oficiais fornecidos; não usar19:00 ou data fictícia |

## Entrada humana do vídeo — depois da gravação

Executar entrada-video.yml com origem autorizada (run com artefato pitch-video ou asset), ID e SHA256 reais, producao_sha/run/tentativa do gameplay, e confirmações verdadeiras de direitos/legendas. O limite é90s, sem truncar frações. Registrar os valores retornados nas variables VIDEO_VALIDATION_RUN, VIDEO_VALIDATION_ATTEMPT, VIDEO_VALIDATION_SHA e VIDEO_SHA256. A submissão compara SHA/versão/data/ZIP e origem do vídeo à produção; não usa a última run arbitrária. Guardar consentimentos privadamente, semCPF/assinatura pública.

## Triagem agendada — depois do pacote aprovado

Fixar SUBMISSION_SHA, SUBMISSION_RUN_ID, SUBMISSION_RUN_ATTEMPT, SUBMISSION_TAG, SUBMISSION_ARTIFACT_ID e SUBMISSION_ARTIFACT_DIGEST=sha256:<digest real retornado peloGitHub>. Só então habilitar TRIAGEM_AGENDADA_ENABLED. O workflow baixa o artefato exato, confere digest/manifesto/tag e reexecuta PDF/ZIP/vídeo/smoke. Falta de arquivo não pode virar aprovação porHTTP200. Não registrar notificações que não ocorreram.

## Evidências e limites

- Main e tag do mesmo commit usam a mesma data de origem Git no version.json e geram o mesmoZIP. Horários reais das execuções permanecem no Actions; reprodutibilidade verifica bytes inclusive data estável. HML→PRD consome sempre o mesmo pacote da execução, sem rebuild.
- Tempo push→HML exige eventoGitHub de SHA/ref exatos ou criação de tag com refremota conferida. Sem fonte verificável, falha em vez de inventar duração.
- Preservar os recibos HML/PRD, smoke/capturas, manifesto, registro da aprovação e hashes HTTP. CI verde com deployskipped não é execução de ambiente.
- DORA usa viradas reais registradas, distinguindo revalidação de tag e promoção. Sem amostras, exibir N/D; falha sem confirmaçãoCDN recebe essa limitação explícita.
- Fator individual e nota são atribuições do professor. Playtest, vídeo, banca e AVA só recebem aceite depois da execução humana real.
