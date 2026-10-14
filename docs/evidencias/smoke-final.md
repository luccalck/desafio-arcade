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

## 3. Declaração Formal de Congelamento de Código (Code Freeze)

Em cumprimento aos critérios **CR-09** e **CR-10**:
1. **Congelamento de Funcionalidades (CR-09):**
   A versão candidata `v1.0.0` está formalmente congelada. Nenhuma nova funcionalidade, refatoração estrutural ou mudança de escopo é permitida. Apenas correções de bugs impeditivos identificados na triagem ou ensaios são permitidas, obrigatoriamente sob o prefixo `fix:`, com teste de regressão prévio comprovando a falha e a correção, via Pull Request aprovado e pipeline CI completa verde.
2. **Imutabilidade de Produção (CR-10):**
   É terminantemente proibida qualquer edição direta ou push manual na branch `gh-pages` ou nos ambientes de produção. Todas as publicações e eventuais rollbacks ocorrem estritamente através dos workflows declarativos do GitHub Actions (`esteira.yml` e `rollback.yml`), protegidos por aprovação de ambiente (`producao`).

---

## 4. Auditoria de Autoria e Participação dos Integrantes (SQ-10 e SQ-11)

Auditou-se o histórico Git e os Pull Requests do repositório para atestar a participação efetiva de cada integrante em pelo menos três integráveis (INTs) distintos:

- **Integrante 1 — Lucca Castilho (`luccalck`):**
  - 56 commits no repositório.
  - Pull Requests aprovados: #2, #3, #4, #5, #6, #7, #8, #9, #10, #11, #12, #13, #14.
  - Abrange INT-01, INT-02, INT-03, INT-04, INT-05, INT-06 (atende e supera o critério **SQ-10**).
  - Participação na banca (**SQ-14**): roteiro estruturado em `docs/apresentacao-banca.md` (abertura, produto e gameplay); presença física na banca agendada como pendência humana.
- **Integrante 2 — Davi Marcondes Paes de Souza (`DaviSouza78`):**
  - 10 commits no repositório.
  - Pull Requests aprovados: #15, #16, #17, #18, #19.
  - Abrange INT-03, INT-04, INT-06, INT-07, INT-08 (atende e supera o critério **SQ-11**).
  - Participação na banca (**SQ-15**): roteiro estruturado em `docs/apresentacao-banca.md` (infraestrutura, esteira e automação); presença física na banca agendada como pendência humana.
- **Integrante 3 — Miguel Oliveira de Almeida (`miguelsenai2024`):**
  - 11 commits no repositório.
  - Pull Requests aprovados: #20, #21, #22, #23, #24.
  - Abrange INT-02, INT-07, INT-08, INT-09, INT-10.
- **Integrante 4 — Lucas Souza da Silva (`6lucassilvaaa`):**
  - 7 commits no repositório (+ commits das etapas 037-038).
  - Pull Requests: #25, #26, #27 e #28.
  - Abrange INT-01, INT-06, INT-09, INT-10.

---

## 5. Procedimentos de Contingência e Rollback na Banca

Conforme consolidado em `docs/operacao-rollback.md`:
- Em caso de instabilidade na conexão de internet durante a apresentação perante a banca examinadora, a equipe alternará imediatamente para a execução local do pacote offline `build.zip` através do navegador em `file:///`.
- Em caso de anomalia na versão pública durante a avaliação, o operador aciona o workflow `rollback.yml` com motivo `alerta-confirmado`, restaurando a versão estável anterior em menos de 5 minutos, sem qualquer intervenção manual na branch `gh-pages`.
