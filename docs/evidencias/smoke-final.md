# Evidência de Smoke Final, URLs e Congelamento de Código (Code Freeze)

**Data:** 14/10/2026
**Responsável:** Lucas Souza da Silva (`6lucassilvaaa`)
**Papel oficial:** SRE e Segurança (Squad Aura 67)
**Etapa:** 038 — Conferir URLs finais e congelamento de código
**Branch de trabalho:** `feature/passos-037-038-ficha-banca-freeze`
**Commit base:** `0011668`

---

## 1. Conferência Externa de URLs e Ambientes

Em 14/10/2026, foi realizada a verificação externa automatizada via requisições HTTP reais (`curl.exe`):

| Recurso / Ambiente | URL Verificada | Status HTTP | Detalhes da Verificação |
|---|---|---|---|
| Repositório público | `https://github.com/luccalck/desafio-arcade` | 200 OK | Repositório público acessível sem credenciais; 4 colaboradores confirmados. |
| Produção / Preview | `https://luccalck.github.io/desafio-arcade/` | 200 OK | Servindo estaticamente via GitHub Pages. HTML/CSS/JS operacionais sem falhas no console. |
| Homologação (HML) | `https://luccalck.github.io/desafio-arcade/hml/` | 200 OK | Ambiente HML isolado servido estaticamente no Pages. |
| Painel de Status | `https://luccalck.github.io/desafio-arcade/status/` | 404 Not Found (remoto) | O diretório `status/` em `gh-pages` aguarda publicação do workflow após o merge formal na branch `main`. Localmente, `pages/status/index.html` e `tests/e2e/status.spec.mjs` estão 100% funcionais e validados. |
| Última execução da CI | `https://github.com/luccalck/desafio-arcade/actions/runs/38634524654` | 200 OK | Execução da pipeline do PR #27 concluída com status `success` (CI verde). |

### Registro da chamada de verificação:
```powershell
$urls = @(
    "https://github.com/luccalck/desafio-arcade",
    "https://luccalck.github.io/desafio-arcade/",
    "https://luccalck.github.io/desafio-arcade/hml/",
    "https://luccalck.github.io/desafio-arcade/status/",
    "https://github.com/luccalck/desafio-arcade/actions/runs/38634524654"
)
foreach ($url in $urls) {
    $code = (curl.exe -s -o /dev/null -w "%{http_code}" $url)
    Write-Output "$code : $url"
}
```
**Saída real:**
```text
200 : https://github.com/luccalck/desafio-arcade
200 : https://luccalck.github.io/desafio-arcade/
200 : https://luccalck.github.io/desafio-arcade/hml/
404 : https://luccalck.github.io/desafio-arcade/status/
200 : https://github.com/luccalck/desafio-arcade/actions/runs/38634524654
```

---

## 2. Validação de Execução 100% Offline e Pacote ZIP

Para garantir a operação resiliente mesmo em caso de falha de conexão na banca examinadora:
- O pacote `build.zip` foi gerado via `npm run package` (29.001 bytes, SHA-256 `3c5e99b7d9862f08dda82df3243fd22b1e4533297343ca7e083b1317fb2dcbe7`).
- O teste E2E do pacote offline (`tests/e2e/offline-package.spec.mjs`) foi executado via Playwright sob o protocolo `file://`, simulando a campanha completa e downloads reais sem rede:

```text
Running 1 test using 1 worker
  ok 1 tests\e2e\offline-package.spec.mjs:9:1 › ZIP offline: campanha completa e downloads reais sem rede (13.4s)
  1 passed (14.5s)
```

---

## 3. Política de congelamento e autoria — reconferência

A consulta inicial de 14/10/2026 não encontrou tag v1.0.0 nem release final. A política de code freeze está preparada; não declarar congelamento pós-release como executado. Toda alteração operacional deve passar por PR/CI e publicação exclusiva pela pipeline; não editar gh-pages manualmente.

Os 28 PRs #2–#29 estavam abertos e sem reviews registrados no snapshot. As listas de “PRs aprovados” e aptidão ao fator máximo anteriormente presentes foram corrigidas. O [quadro de contribuições](../contribuicoes.md) preserva o escopo autoral e a distribuição proposta de revisão. Lucca declarou posteriormente ter revisado o trabalho dos colegas; somente eventos reais podem confirmar aprovação/integração. Próprios PRs exigem outra pessoa.

## 4. Contingência preparada

O ZIP offline é a alternativa de demonstração em falta de rede. Rollback manual e automático estão preparados em scripts e testes, mas o objetivo de recuperação abaixo de cinco minutos, incluindo propagação Pages e continuidade de URL, exige ensaio real cronometrado. Não prometemos esse tempo antes da medição.

O HTTP200 da raiz/HML acima comprova o preview consultado, não produção formal da candidata. A auditoria reconferiu HML no SHA71933bf e status404. A [reconferência de registros](reconferencia-registros.md) delimita os resultados auditados e as provas ainda necessárias.
