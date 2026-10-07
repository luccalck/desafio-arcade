# Conferência parcial — 07/10/2026

Esta matriz acompanha o primeiro lote e a evolução 0.4.0. Não é fechamento da avaliação. “Implementado” identifica arquivo existente; “validado” exige execução; nenhum INT está declarado integralmente atendido.

| INT | Implementado / execução disponível | Dependência / não atendido nesta etapa |
|---|---|---|
| 01 | Repo público, branch, PR draft #2, main protegida com ci e uma aprovação, Conventional Commits | SQUAD, quatro colaboradores/participação em ≥3 INT, ≥10 PRs revisados, tags anotadas |
| 02 | GDD 12 seções/Esteira/imagens, script PDF, pdfinfo e inspeção local do PDF atualizado | Identificação completa, revisão humana, links de HML/PRD/vídeo e coerência com release ainda inexistente; Stitch não utilizado |
| 03 | Actions push/PR/tags, ubuntu-latest, lockfile, jobs paralelos/cache, check ci, artefatos e permissões read; push e PR passaram na CI | deploy-hml/deploy-prd ainda não implementados, aprovação real e push→HML ≤15min não medidos |
| 04 | 87 unidades +14 integração; suite15 E2E com validação completa e subconjuntos finais identificados; core separado; cobertura99,17% de instruções; JSON malformado bloqueou build; bug real #1 e regressão | Regressão HML e smoke PRD pendentes; revisão humana de conteúdo. Opal/AI Studio ausentes, golden condicional não aplicável a essas ferramentas |
| 05 | Gitleaks staged e CI passaram; audit produção 0 vulnerabilidades; SBOM local/CI, licença/terceiros/IA, hook e Dependabot | Revisão de direitos/IA por outro humano antes do merge; Dependabot só ativo após config entrar em main |
| 06 | Build offline testada por file:// sem rede; ZIP22.708 bytes na fonte42678cd; checksum e version.json; comparação de builds passou | Release por tag anotada inexistente; data do GDD deve ser reconciliada com release real; testar offline também na build promovida |
| 07 | Estratégia azul-verde documentada | gh-pages, HML, releases imutáveis, loader/rollout/sessão, aprovação, smoke, rollback manual/automático e recuperação medida ainda não implementados/executados |
| 08 | Necessidades e arquitetura registradas | Sondas/CSV/Issues/painel/DORA/lead time/melhoria não implementados nem medidos |
| 09 | ZIP/checksum automatizados como insumos | Pacote submissao completo, manifesto e triagem real na tag final pendentes; vídeo é entrada humana antes da tag final |
| 10 | Conceito educativo e bug evidenciados; documentação inicial | Pitch real legendado ≤90s, produção, relatório ≤12 páginas, prints de release, retrospectiva, contribuição e banca dos quatro pendentes |

## GDD e rubrica

As seções 1–12 têm texto em docs/gdd.md; 6/7/8/10 têm diagramas/mapas/wireframes/concept SVG. Seção 9 declara honestamente ausência de áudio; seção 11 registra ferramentas/terceiros. Identificação permanece incompleta; originalidade/direitos coletivos não confirmados; Esteira distingue arquitetura de execução. Arte original, cinco missões de conexões/valores/decisões/E-OU/memória e final integrado, bancada interativa, ajuda sob demanda e menus implementados, mas diversão/aprendizagem não foram medidas por playtest humano.

Diferenciais avançados restantes: telas do Stitch, atualizações de mecânica via PR, colaboração equilibrada, execução completa da esteira, recuperação/DORA medidos e evidências da banca. Wireframes cumprem conteúdo de projeto, sem fabricar uso do Stitch. Não prometer pontuação ou nota.

## Checkpoints

Primeiro checkpoint sem aceite completo: **G0**, por dados/participação/acessos humanos. G1 tem conceito aprovado e contratos preparados; falta compreensão/revisão pelos quatro. G2 tem base local candidata e [CI de PR verde no primeiro commit de implementação](https://github.com/luccalck/desafio-arcade/actions/runs/37619977719). [Evidências locais de 0.4.0](bancada-visual.md); resultado da CI atual registrado no acompanhamento local. G3–G8 não liberados. A preparação de arquivos não equivale a liberação de checkpoint.
