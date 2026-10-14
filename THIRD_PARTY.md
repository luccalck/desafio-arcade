# Origem e licenças

## Plano do vídeo017 — 14/10/2026

O [roteiro](docs/pitch-roteiro.md) prevê capturas reais do próprio jogo e vozes dos quatro integrantes, condicionadas às concordâncias individuais. **Sem música, trilha, efeitos sonoros, imagens de banco ou logotipos externos.** UI e ativos próprios seguem o inventário008 abaixo; roteiro/legendas tiveram assistência Codex registrada em AI-USAGE. Nenhuma mídia nova foi produzida ou incorporada. [Inventário e situação dos consentimentos](docs/evidencias/video-direitos.md). Revalidar fontes, créditos e direitos no arquivo final antes de publicação; MIT do código não substitui consentimento de imagem/voz.

Código, CSS, texto educativo, robô, mapas, concept art e wireframes foram criados para o projeto com assistência do Codex, descrita em AI-USAGE. Licença própria: MIT, em LICENSE. Revisão humana dos direitos pendente antes do merge. Fontes são as existentes no sistema do jogador; não há arquivos de fontes, imagens externas, música ou sons redistribuídos.

A build incorpora somente código próprio e JSON local. As bibliotecas abaixo são ferramentas de construção/teste/documentação. O lockfile fixa versões e integridade; `npm sbom --sbom-format cyclonedx` produz o inventário transitivo na CI.

| Componente | Versão | Licença | Responsável / origem |
|---|---|---|---|
| @eslint/js, eslint | 10.0.1, 10.12.0 | MIT | [ESLint](https://github.com/eslint/eslint), projeto fundado por Nicholas C. Zakas |
| @playwright/test | 1.63.0 | Apache-2.0 | [Microsoft](https://github.com/microsoft/playwright) |
| @vitest/coverage-v8, vitest | 5.0.3 | MIT | [Vitest](https://github.com/vitest-dev/vitest), Anthony Fu e contribuidores |
| ajv | 8.20.0 | MIT | [Evgeny Poberezkin / Ajv](https://github.com/ajv-validator/ajv) |
| esbuild | 0.28.2 | MIT | [Evan Wallace / esbuild](https://github.com/evanw/esbuild) |
| fflate | 0.8.3 | MIT | [Arjun Barrett](https://github.com/101arrowz/fflate) |
| globals | 17.13.0 | MIT | [Sindre Sorhus](https://github.com/sindresorhus/globals) |
| markdown-it | 15.0.2 | MIT | [markdown-it](https://github.com/markdown-it/markdown-it), contribuidores |
| tsx | 4.23.15 | MIT | [Hiroki Osame](https://github.com/privatenumber/tsx) |
| typescript | 6.0.3 | Apache-2.0 | [Microsoft](https://github.com/microsoft/TypeScript) |
| typescript-eslint | 8.71.1 | MIT | [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint), contribuidores |
| actionlint | 1.7.12 | MIT | [rhysd/actionlint](https://github.com/rhysd/actionlint), validação local de workflow; licença conferida na distribuição, não integra o site |
| Gitleaks CLI | 8.30.1 | MIT | [Gitleaks](https://github.com/gitleaks/gitleaks), scanner de CI/local |

Metadados npm conferidos nos package.json instalados em 07/10/2026. Licenças completas das ferramentas acompanham suas distribuições/node_modules. Chrome é ferramenta de teste/renderização, não integra build.zip. GitHub Actions/Pages são serviços da plataforma, sem dependência remota para jogar offline.

Documentação técnica foi consultada; imagens/logotipos do modelo do professor não foram incorporados. Nenhum aceite de termos do concurso foi feito em nome da equipe.

Python 3 (CPython) é ferramenta de validação local/CI de fixtures editoriais, sob Python Software Foundation License; não é distribuído no site ou ZIP. Documentação/licença: https://docs.python.org/3/license.html . O jogador não precisa instalar Python para jogar; o arquivo .py exportado contém funções originais do projeto sob MIT. Não há nova dependência npm ou runtime CPython incorporado.

## Conferência008 — 13/10/2026

[Inventário completo158dependências](docs/evidencias/inventario-npm-008.md), [dados de biblioteca/autor ou titular/URL/licença](docs/evidencias/inventario-npm-008.json) e [26ativos rastreados](docs/evidencias/inventario-ativos-008.json) complementam a tabela resumida. Licenças declaradas no SBOM:120MIT,18Apache-2.0,1PSF-2.0,7BSD-2-Clause,3BSD-3-Clause,6ISC,2MPL-2.0 e1BlueOak-1.0.0. Nenhuma sem licença declarada. Terceiros conservam suas licenças; MIT do projeto não os relicencia. Nenhuma dependência npm é importada como biblioteca de runtime pelo jogo; ferramentas/transitivos não são copiados para build.zip como node_modules.

| Ativo / uso | Origem e crédito | Licença / situação |
|---|---|---|
| Código/CSS/JSON/textos educativos | src/, scripts/, pages/ e Git; registroLucca/luccalck, assistênciaCodex | MIT do projeto; confirmação coletiva pendente |
| RobôRDC, nave, pedras, estrelas, cristais, ícones | SVG inline em src/scenes/shared.ts/arcade-player.ts/views.ts e CSS | Autoria assistida do projeto; sem ativo externo identificado na inspeção, direitos coletivos pendentes |
| Dez SVGs de mapas/fluxos/concept/wireframes | docs/images; gerador scripts/gdd-pdf.mjs; hashes/origem no inventário | Desenhos de projeto, MIT; não são prints de execução |
| Dezesseis PNGs | docs/images/docs/evidencias; fontesGit e hashes no inventário | Capturas reais registradas, algumas de versões anteriores; não reatribuímos data/SHA nem tratamos como arte raster gerada |
| Fontes do jogo | TrebuchetMS/Consolas/Arial e fallbacks locais, Microsoft conforme fonts/font-faq | Apenas nomes na pilhaCSS; não distribuímos arquivosTTF/WOFF ou CDN |
| Fontes incorporadas no GDD daCI007 | LiberationSans/Bold2.1.5, titularesGoogle2010/RedHat2012 | SILOFL1.1; metadados extraídos do PDF, fsType0; não copiamos fontes binárias para site |
| Sons, músicas e vídeo | Nenhum arquivo presente nesta candidata | Ausência declarada; reconferir029 e035 antes do pacote final |

Fontes oficiais: [Microsoft sobre pilhasCSS/embutimento](https://learn.microsoft.com/en-us/typography/fonts/font-faq), [licença Liberation](https://github.com/liberationfonts/liberation-fonts/blob/main/LICENSE). Quando o PDF mudar, reconferir fontes incorporadas reais; navegador/runner pode usar outra família. Chrome/CPython/GitHub são ferramentas/serviços de desenvolvimento; não ativos do jogo. Actions e actionlint/Gitleaks constam nos registros007 e distribuições com suas licenças.

Não usamos marcas/logotipos de SENAI ou Framework como ativos. Referências acadêmicas/técnicas por nome não são autorização para incorporar logotipos. Vídeo e eventuais ativos novos exigem origem/licença/crédito reais antes de publicar. Revisão técnica atual e inventário não encerram os aceites humanos: [auditoria e matriz de revisão008](docs/evidencias/direitos.md).

## Referências Stitch009 — 13/10/2026

ServiçoGoogleStitch, saída assistida por IA solicitada por Lucca: seis telasPNG e mascote em docs/images/stitch-009; origem/prompt/hashes em [conferênciaUX](docs/evidencias/stitch-ux.md). Referências conceituais, sem integração ao jogo/build. Termos adicionais aceitos mediante autorização explícita, marketing/pesquisa desmarcados. Não autoriza concurso nem assina declaração coletiva.

[Lista oficial de serviços](https://policies.google.com/terms/service-specific?hl=en) relaciona Stitch aos [TermosGoogle](https://policies.google.com/terms) e à [Política de uso de IA](https://policies.google.com/terms/generative-ai/use-policy). Não atribuímos exclusividade, direitos sobre entradas de terceiros ou licençaMIT automática a essas saídas. Revisão de direitos por outro integrante segue pendente antes do merge.

HTML doexport original ficou restrito a.contexto, pois preservouCDN/fontes/imagemgerada. Os PNGs conservam sua aparência original; texto desenhado com fontes não representa distribuição de arquivos de fonte. Componentes identificados no export: Rubik — [OFL1.1](https://github.com/google/fonts/blob/main/ofl/rubik/OFL.txt), JetBrainsMono — [OFL1.1](https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt), MaterialSymbols/íconesGoogle — [Apache2.0](https://github.com/google/material-design-icons/blob/master/LICENSE), TailwindCSS — [MIT](https://github.com/tailwindlabs/tailwindcss/blob/main/LICENSE). Links oficiais consultados13/10/2026; versões carregadas pelo serviço não identificadas. Nenhum desses arquivos de fonte/CDN foi baixado/distribuído no site. Imagem do robô foi produzida peloStitch no próprio projeto, distinta doSVG original do jogo. Conferência não constitui aceite coletivo.

ExportStitch original passou a estar versionado em docs/evidencias/stitch-009-original.zip para consulta da equipe, sem alterar bytes/hashes ou integrarHTML/CDN/fontes ao runtime. [Portal e classificação](docs/images/stitch-009/README.md). Créditos/condições acima continuam aplicáveis; não relicenciamos terceiros comoMIT nem atribuímos revisão coletiva.
