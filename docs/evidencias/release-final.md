# Etapa 035 — Preparação e Execução da Release Formal v1.0.0

**Responsável:** Lucas Souza da Silva (`6lucassilvaaa`)  
**Data:** 14/10/2026  
**Versão Alvo:** `v1.0.0`  
**Checkpoint:** G7  
**Status:** Preparada tecnicamente; publicação remota aguarda revisão humana e aprovação do environment de produção  

---

## 1. Contrato e Proveniência da Tag SemVer (I01-11, I02-13)

A release final do projeto **Rota do Código** foi estruturada sob regras estritas de proveniência SemVer implementadas em `scripts/release.mjs`:

1. **Tag SemVer Anotada (`v1.0.0`):**
   - Deve ser criada obrigatoriamente como tag anotada (`git tag -a v1.0.0 -m "Entrega Desafio Arcade v1.0.0"`), garantindo metadados de autor, data e mensagem de commit.
   - Aponta exclusivamente para o commit aprovado e integrado na branch protegida `main`.
2. **Coerência de Metadados e Documentação (I02-13):**
   - Versão em `package.json`: v1.0.0.
   - GDD (`docs/gdd.md`) e Relatório Técnico (`docs/relatorio.md`) com versão e data harmonizadas.
   - Artefatos PDF (`artifacts/GDD.pdf` e `artifacts/RelatorioTecnico.pdf`) compilados com numeração de páginas A4 e cabeçalhos `%PDF-1.4` válidos.

---

## 2. Inventário de Artefatos e Imutabilidade (I06-15, I06-17, I06-18)

O empacotamento formal da release segue o princípio de artefato imutável (*Build Once, Deploy Anywhere*). O mesmo pacote ZIP gerado no job `pacote-ci` da esteira é promovido para homologação e produção sem recompilação (`npm run build` nunca é reexecutado nos jobs de deploy):

| Artefato da Release | Tamanho (Bytes) | Checksum SHA-256 | Validação / Contrato |
|---|:---:|:---:|---|
| `build.zip` | 29.003 | `037a3d554348e87e2a2214cc99696eecb4937dee5d511fd1da0c6217259fc6de` | Contém `index.html`, `game.js`, `style.css`, `version.json`, `LEIA-ME.txt`, `LICENSE.txt`, `THIRD_PARTY.txt`. Operação 100% offline via `file://` comprovada no E2E. |
| `build.zip.sha256` | 80 | *(conteúdo texto)* | `037a3d55...  build.zip` |
| `GDD.pdf` | ~310.000 | Verificado no build | 8 páginas A4, high concept de 804 caracteres, 6 mapas conceituais em SVG. |
| `RelatorioTecnico.pdf` | 238.816 | Verificado no build | 6 páginas A4 (< 12 páginas), 10 INTs rastreados, DORA transparente e retrospectiva técnica. |
| `sbom.cdx.json` | ~45.000 | CycloneDX 1.5 | Inventário completo de dependências sem vulnerabilidades críticas. |
| `release-manifest.json`| ~1.200 | Hash dos ativos | Manifesto com hashes SHA-256 e tamanhos de todos os componentes da release. |

### Reprodutibilidade Determinística (I06-18)
O comando `npm run reproducibility` foi reexecutado e confirmou que builds consecutivas geram exatamente os mesmos hashes SHA-256 bit a bit (com normalização determinística de data no `version.json`).

---

## 3. Clone Limpo e Verificação de Esteira (I03-09)

A esteira CI/CD em `.github/workflows/esteira.yml` opera em ambiente limpo e isolado nos runners `ubuntu-latest` do GitHub:
- `actions/checkout` sem persistência de credenciais;
- `npm ci` estrito baseado no lockfile `package-lock.json`;
- Testes unitários (260 testes) e E2E Playwright (36 cenários em Desktop e Mobile) passam sem requisições externas;
- Zero variáveis de ambiente ocultas ou passos manuais necessários para compilar e empacotar o projeto.

---

## 4. Governança e Condições para a Criação Remota da Tag

Em obediência às regras de governança e integridade do projeto:
- A tag pública remota `v1.0.0` e o deploy no environment `producao` exigem:
  1. Revisão humana formal de Lucca Castilho (`luccalck`) nos PRs pendentes;
  2. Merge da cadeia de PRs na branch protegida `main`;
  3. Aprovação manual pelo revisor designado no environment `producao` do GitHub Actions;
  4. Inclusão da gravação humana do vídeo demonstrativo (Passo 029/031).
- **Decisão Técnica:** Para não forjar aceites humanos ou criar tags prematuras em branches secundárias, a preparação da release v1.0.0 está 100% validada e documentada com seus contratos, permanecendo o push da tag anotada condicionado à aprovação humana na main.
