# Passagem do bloco001–010 — Lucca → Davi

Preparação do bloco concluída no escopo técnico em13/10/2026; nenhum gate coletivo/final é aceito apenas por este registro. Uma fonte principal: jogo-arcade. Davi executa cinco MDs cobrindo011–020 pela própria contaDaviSouza78, preservando alterações existentes e revisão cruzada. Lucca continua responsável por revisar/participar da banca e pelas pendências humanas compartilhadas.

## Base e verificação antes de começar011

Candidata: feature/passo-010-offline-integridade, dependente de009. O commit técnicoc56df79 foi validado em clone limpo; commits documentais/PR/CI atuais constam no controle e em offline-integridade.md. Não chamamos a candidata de base aprovada: a integração na main ainda depende de outro autor e CIverde. A branch padrão acompanha a candidata apenas para rastreamento.

No clone do Davi: conferir git status, git remote -v, identidadeGit/GitHub, git fetch e versão da candidata antes de trocar/criar branch. Não usar a contaLucca, resetar mudanças pessoais ou manter quatro jogos. Preparar011 sobre a candidata mais recente; promover somente código revisado na main protegida. Ajustar bases dos PRs empilhados durante integração revisada.

## Contratos entregues

| Área / passos | Entrega local | Situação |
|---|---|---|
|001/003/004 | SQUAD.md, SECURITY.md, evidencias/equipe.md, configuracao-github.md, seguranca-inicial.md | Equipe parcial, proteção/environments/variables/scanners; RAs/acessos reais adiados |
|002/006 | src/core/content/scenes, tests, evidencias/baseline-tecnico.md, regressao-hml.md |184unidade/integração, roteiroHML preparado; execução formal011/014pendente |
|005/008/009 | docs/gdd.md, imagens, AI-USAGE.md, THIRD_PARTY.md, evidencias/direitos.md, stitch-ux.md |12seções/PDF/telas/inventários; review/direitos/quatro/G1 pendentes |
|007/010 | scripts/ci-bundle.mjs, prepare-pages.mjs, build/package/reproducibility, esteira.yml, evidencias/ci-formal.md, offline-integridade.md | Artefato porSHA/run/tentativa; ZIP/checksum/PDF;18E2E e clone/offline comprovados |

PRs reais do bloco001–009: #3,#4,#5,#6,#7,#8,#9,#10,#11, todos de luccalck e abertos na conferência13/10. PR010: [#12](https://github.com/luccalck/desafio-arcade/pull/12), draft sobre009, commitsc56df79/0f0104c eCIpush38444743006/PR38444831221 verdes. Nenhum desses registros prova aprovação dos colegas ou conta como autoria deles.

## Entradas concretas para011

- Usar scripts/ci-bundle.mjs verify com SHA/run esperados; pacote-ci contém o ZIP/GDD/relatórios aprovados. Recuperar o artefato da mesma execução/tentativa; não recompilar no deploy.
- Implementar o contrato de scripts/publicar.sh já chamado por deploy-hml. Preservar releases/carregador/status/rollout e escrever gh-pages somente pela pipeline. Alinhar origemPages conforme plano sem interromper URL.
- VariáveisSITE_URL e flagsFORMAL_HML_ENABLED/FORMAL_PRD_ENABLED: não habilitar a etapa ausente; deploy-hml depende de main/ci. Produçãoformal fica019, com aprovação humana e mesmo artefato.
- Executar os roteiros prepared de006 na URL/hml publicada, registrarSHA/HTTP/E2E e medir push→HML≤15min. Preview atual não substitui HMLformal.
- Continuar012–020 conforme seus MDs, mantendo monitoramento/segurança/revisão desde o início. Não criar tagfinal, vídeo/relatório/pacote retroativos neste repasse.

## O que continua aberto

[Registro único por passo](05-pendencias-por-passo.md) e [checklist](../gestao/checklist-avaliacao.md) prevalecem. G0/G1/G2/G3 não liberados coletivamente. Identificação/acesso/revisão/direitos/participação e playtest são reais. Release/tag/SBOManexado/notas, HML/PRD, recuperação/sondas/DORA, vídeo/pacote/triagem/relatório/ficha/banca pertencem aos passos seguintes.

Davi deve registrar recebimento e compreensão deste repasse pessoalmente; não atribuímos esse aceite à IA ou a Lucca. Revisão exigida pelo professor continua obrigatória antes do merge; não usar aprovação da concepção para substituí-la.

## Primeiro arquivo vigente após consolidação

[Davi — MD1/5, etapas011–012](<Davi Paes/011-012-hml-sondas.md>): HMLformal e sondas, cumprindo cada etapa na ordem e registrando separadamente execução/pendências. Os quatro MDs seguintes estão no índice; não usar os antigos arquivos unitários.
