# Estrutura exata, responsabilidades e entregáveis

**Uma fonte principal:** `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`. O repositório Git começa nessa pasta. O contexto acadêmico e os originais ficam fora dela. Nos computadores dos colegas, localizar o clone real; não copiar quatro projetos concorrentes para as pastas de nomes.

## Pastas de prompts entregues

```text
docs/execucao/
├── 00-indice-geral.md
├── 01-estrutura-repositorio.md
├── 02-mapa-checks.md
├── 03-controle-execucao.md
├── 04-passagem-de-bloco.md
├── 05-pendencias-por-passo.md
├── 06-passagem-lucca-davi.md
├── 07-mapa-consolidacao.json
├── 08-consolidacao-e-acesso.md
├── Lucca Castilho/  # dez MDs001–010 preservados
├── Davi Paes/  # cinco MDs completos
    ├── 011-012-hml-sondas.md
    ├── 013-014-conteudo-smoke.md
    ├── 015-016-releases-alertas.md
    ├── 017-018-pitch-rollout.md
    └── 019-020-producao-painel.md
├── Miguel Oliveira/  # cinco MDs completos
    ├── 021-022-playtest-rollback-automatico.md
    ├── 023-024-rollback-manual-dora.md
    ├── 025-026-gdd-ensaio-falha.md
    ├── 027-028-integridade-melhoria.md
    └── 029-030-video-triagem.md
└── Lucas Souza/  # cinco MDs completos
    ├── 031-032-pacote-triagem-agendada.md
    ├── 033-034-relatorio-aceite-candidata.md
    ├── 035-036-release-triagem-final.md
    ├── 037-038-ficha-banca-freeze.md
    └── 039-040-entrega-contribuicao.md
```

Lucca mantém dez MDs; os outros três têm exatamente cinco MDs cada, duas etapas completas por arquivo. Os40IDs continuam no controle/checklist/mapa. [Mapa auditável da consolidação](07-mapa-consolidacao.json) e [verificação de cobertura e acesso](08-consolidacao-e-acesso.md). Não fechar checks, atribuir participação ou saltar gates ao reorganizar arquivos.

## Fonte a manter no repositório

Árvore de destino proposta para fechar o enunciado. **Não significa que tudo abaixo já existe:** módulos de release, observabilidade, relatório, triagem e rollback ainda serão criados pelos passos. Reutilizar arquivos equivalentes já presentes, registrar o caminho real e justificar a equivalência quando pertinente.

```text
jogo-arcade/
├── README.md
├── SQUAD.md
├── LICENSE
├── THIRD_PARTY.md
├── AI-USAGE.md
├── SECURITY.md
├── .gitignore
├── .gitleaks.toml
├── .githooks/pre-commit
├── .github/
│   ├── dependabot.yml
│   ├── pull_request_template.md
│   └── workflows/
│       ├── esteira.yml          # ci → deploy-hml → deploy-prd e release por tag
│       ├── rollback.yml         # workflow_dispatch, recuperação pela pipeline
│       ├── monitor.yml          # schedule quinze minutos
│       ├── entrada-video.yml    # entrada humana validada antes da tag final
│       └── triagem-agendada.yml # vigiar pacote/URL até banca
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── eslint.config.mjs
├── vitest.config.ts
├── playwright.config.mjs
├── playwright.public.config.mjs
├── src/
│   ├── core/                   # regras, parser/runtime Python, motor puro
│   ├── scenes/                 # editor/interface/player web
│   └── content/                # conteúdo JSON, schema, contratos
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── deploy/
├── docs/
│   ├── gdd.md                  # documento completo, doze seções + Esteira
│   ├── relatorio.md            # relatório técnico ≤12 páginas
│   ├── gestao/                # checklist, auditoria, backlog e decisões atuais
│   ├── contribuicoes.md        # autoria/INT/PR/revisão, fator individual
│   ├── notas-versao.md
│   ├── pitch-roteiro.md
│   ├── pitch-legendas.srt
│   ├── operacao-rollback.md
│   ├── pacote-submissao.md
│   ├── apresentacao-banca.md
│   ├── concurso-decisao.md     # somente decisão/condicionais, sem CPF/assinaturas
│   ├── images/                 # mapas/telas/diagramas/capturas reais identificadas
│   ├── evidencias/             # INT/data/SHA/URL/resultado/limites
│   ├── historico/             # planos, especificações e evidências anteriores
│   └── execucao/              # quatro blocos de prompts, roteiro vigente
├── pages/
│   ├── index.html              # fonte do carregador de rollout
│   ├── rollout.json            # template/contrato; valores ativos vêm da pipeline
│   └── status/index.html       # fonte do painel público
├── scripts/
│   ├── build.mjs
│   ├── check-content.ts
│   ├── dev.mjs
│   ├── gdd-pdf.mjs
│   ├── docs-assets.mjs
│   ├── package.mjs
│   ├── reproducibility.mjs
│   ├── prepare-pages.mjs
│   ├── publicar.sh             # adaptador CI Linux; não produção manual
│   ├── publicar.mjs            # publicação testável reutilizando código existente
│   ├── rollout.sh
│   ├── rollout.mjs
│   ├── release.mjs
│   ├── sondar.mjs
│   ├── alertas.mjs
│   ├── status.mjs
│   ├── dora.mjs
│   ├── submissao.mjs
│   ├── triagem.sh
│   ├── triagem.mjs
│   └── relatorio-pdf.mjs
└── eval/golden.jsonl           # SOMENTE se conteúdo Opal/AI Studio for usado
```

Os scripts bash do kit podem delegar ao Node para facilitar teste/desenvolvimento Windows; equivalência precisa ser funcional e descrita. Não instalar Docker, Kubernetes, Jenkins, Spring Boot, AWS ou servidor pago para cumprir esta avaliação. Os jogadores continuam sem instalar ferramentas.

## Saídas de build — geradas, não código versionado

```text
dist/
├── index.html
├── style.css
├── game.js
├── version.json          # SemVer, SHA, data real do build
├── LEIA-ME.txt           # abrir index.html offline / método documentado
├── LICENSE.txt
└── THIRD_PARTY.txt

artifacts/
├── GDD.pdf
├── RelatorioTecnico.pdf  # documento separado; não substituir pelo GDD
├── build.zip
└── build.zip.sha256

reports/                 # JUnit, cobertura, scanners, SBOM, screenshots reais
```

Manter dist/artifacts/reports/coverage/node_modules/tmp/.contexto/submissao ignorados no Git, conforme .gitignore atual. PDFs, vídeo e ZIP finais são artefatos/releases, não arquivos pessoais largados no repositório. Não apagar os originais do professor nem materiais do usuário para “limpar”.

## Árvore pública do Pages e branch de observabilidade

```text
gh-pages/                # somente escrita pela pipeline
├── index.html           # carregador, nunca cópia manual do jogo
├── rollout.json         # estavel, anterior, canario, percentual
├── hml/                 # último build da main aprovado, regressão na URL
├── releases/
│   └── <sha>/           # cada release imutável do mesmo ZIP
└── status/              # painel com dados verificáveis

observabilidade/         # branch de dados, não dispara deploy a cada sonda
└── status/
    ├── sondas.csv       # data,alvo,codigo,tempo,versao
    └── dados DORA       # formato implementado/testado no passo024
```

Atualmente Pages usa build_type workflow apesar de a pipeline também escrever gh-pages. O HTML pede origem gh-pages: alinhar de modo controlado e manter a URL ativa, ou validar equivalência documentada antes de encerrar I07-01. Monitoramento atual ainda não existe. Não marcar estrutura futura como entregue.

URLs finais precisam ser reais e testadas:

- Produção: `https://luccalck.github.io/desafio-arcade/` após aprovação formal; hoje é preview.
- Homologação: `https://luccalck.github.io/desafio-arcade/hml/` da main aprovada.
- Releases: `https://luccalck.github.io/desafio-arcade/releases/<sha>/`.
- Painel: `https://luccalck.github.io/desafio-arcade/status/` após implementação/publicação.
- Repositório/release/tag/CI/PR/vídeo/relatório: links reais coletados na execução, sem adivinhar URL de artefato inexistente.

## Pacote exigido, produzido somente pela pipeline

```text
submissao/
├── GDD.pdf
├── LINK_DO_JOGO.txt
├── build.zip            # site dist + LEIA-ME.txt
├── pitch.mp4            # gameplay de produção real, legendas, direitos, ≤90 s
└── MANIFESTO.sha256     # hashes GDD/link/ZIP/vídeo; não criar recursão com seu próprio hash
```

Além do pacote: relatório técnico PDF ≤12 páginas, ficha `DevOps_Avaliacao_Arcade_<Squad>.txt` gerada pelo HTML e acessos do professor. GitHub Release por tag anexa build.zip/checksum/SBOM/GDD e notas revisadas. Não montar pacote final manualmente nem reconstruir build entre HML e PRD.

## Critérios eliminatórios e prioridade

1. Plágio/ativo sem autorização: avaliação do squad zerada. Inventário/licenças/declaração real antes de incorporar.
2. Produção alterada à mão: INT-07 zerado. Gh-pages/rollout somente workflows, inclusive recuperação manual via workflow_dispatch.
3. Credencial real no Git: INT-05 zerado, com revogação necessária. Secrets para credencial; variables para configuração não sensível. Fixture falsa em teste, nunca segredo real.
4. Pipeline que não funciona desde clone limpo: INT-03 zerado. Lockfile/npm ci, comandos/documentação/artefatos e gates reproduzíveis.
5. Condição eliminatória de prazo do HTML: conferir data/horário/condições reais, sem editar relógio, retroagir tag ou usar 19:00 do exemplo como fato.

O plano busca a faixa avançada de todos os INT e F1. Isso exige prova técnica e pessoas reais em três INT/banca. Autoavaliação10 é estimativa solicitada; nota é do professor. Não reduzir proteção, fabricar colaboração ou assinalar declarações para tentar obter máximo.
