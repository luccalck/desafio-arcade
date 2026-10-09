# CI da Oficina de Jogos — 09/10/2026

Tarefas R02/R03/S01/S02/D04/D05 local, INT-02/03/04/05/06. A CI não comprova HML, produção ou revisão humana. Fonte única jogo-arcade; [PR draft #2](https://github.com/luccalck/desafio-arcade/pull/2).

Execuções do HEAD 9a5a53c890b57a61145e6968025284749a86db36 concluídas com success: [push 37985563025](https://github.com/luccalck/desafio-arcade/actions/runs/37985563025) e [PR 37985567054](https://github.com/luccalck/desafio-arcade/actions/runs/37985567054). Qualidade, segurança, build, E2E e ci passaram. Clone de checkout da CI usou npm ci/lockfile em ubuntu-latest, sem dependência do servidor local.

Artefatos do PR baixados por gh run download e conferidos, incluindo:

- JUnit: 145 testes (127 unidades e 18 integrações), zero falhas/erros/skips.
- E2E: 13 cenários, zero falhas/erros/skips, 22,66 segundos. Inclui edição que invalida player anterior, final desktop/exportação offline e campanha mobile por toque.
- Cobertura de src/core: instruções 97,93%; branches 95,20%; funções 98,14%; linhas 99,20%.
- Gitleaks: zero achados; audit de produção: zero vulnerabilidades; SBOM CycloneDX gerado.
- Reprodutibilidade: duas builds com hashes iguais, normalizando somente data em version.json.
- GDD 0.5.0: 12 páginas A4, 289.172 bytes, pdfinfo e texto com seções/versão/data verificados. PDF local equivalente tem 320.063 bytes, todas as páginas renderizadas e inspecionadas; diferenças de plataforma/metadados não são erro de versão.
- ZIP: 23.975 bytes, sete entradas (index.html, style.css, game.js, version.json, LEIA-ME.txt, LICENSE.txt, THIRD_PARTY.txt); checksum confrontado com os bytes reais.

SHA-256 do ZIP da CI: f9ec10904d742b0083852546567d3451152315fb43de37ed3accb6649a378aa5.

version.json da CI: versão 0.5.0, SHA de merge de teste 16175aa7891b057d7e87fc789c3dd9f1deb22985, build 2026-10-09T20:14:01.240Z. SHA de merge de teste não é merge em main ou tag de release. ZIP local 76b7797 tem checksum diferente por SHA/data; ambos permanecem candidatos, sem promoção HML/PRD.

Relatórios, PDF, ZIP, versão e capturas estão nos artefatos ligados à execução. Cópia local: tmp/ci-37985567054; conferência resumida em tmp/ci-oficina-verificada.json, ignorados no Git. Capturas de UI são execução real automatizada, não playtest humano ou gravação de produção.

G0 segue o primeiro aceite incompleto, por identificação/participação/acessos e horário da aula. G1/G2 têm preparação autorizada; revisão de outro integrante antes do merge continua exigida. Main permanece bootstrap, PR draft/review_required. G3–G8, HML/PRD/rollback/sondas/DORA/vídeo/triagem/pacote/banca não foram executados. Nenhum INT integralmente atendido ou nota prometida.
