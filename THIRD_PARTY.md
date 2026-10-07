# Origem e licenças

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
| Gitleaks CLI | 8.30.1 | MIT | [Gitleaks](https://github.com/gitleaks/gitleaks), scanner de CI/local |

Metadados npm conferidos nos package.json instalados em 07/10/2026. Licenças completas das ferramentas acompanham suas distribuições/node_modules. Chrome é ferramenta de teste/renderização, não integra build.zip. GitHub Actions/Pages são serviços da plataforma, sem dependência remota para jogar offline.

Documentação técnica foi consultada; imagens/logotipos do modelo do professor não foram incorporados. Nenhum aceite de termos do concurso foi feito em nome da equipe.
