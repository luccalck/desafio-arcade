# Evidência da Triagem Agendada e Alertas até a Banca — Etapa 032

**Responsável:** Lucas Souza (`6lucassilvaaa`) · SRE e Segurança
**Data:** 14/10/2026
**INT:** INT-09 / INT-08 · **Roteiros:** S04 / S03 · **Checkpoints:** G6 / G7

---

## 1. Visão Geral

A etapa 032 estabelece a vigilância contínua da entrega final do projeto **Rota do Código (Desafio Arcade)** até a apresentação perante a banca examinadora. Através do workflow `.github/workflows/triagem-agendada.yml`, a integridade do pacote de submissão e a disponibilidade pública do jogo são verificadas periodicamente.

---

## 2. Modo de Vigilância vs. Modo de Entrega

O validador `scripts/triagem.mjs` foi aprimorado para suportar dois modos operacionais distintos:

1. **Modo Entrega (`--modo=entrega`):**
   - Valida estritamente a data limite (`PRAZO`) em formato ISO 8601 com fuso horário.
   - Rejeita qualquer submissão realizada após o instante limite configurado.
   - Utilizado na esteira de submissão inicial.

2. **Modo Vigilância (`--modo=vigilancia`):**
   - Reconhece que a entrega já ocorreu e monitora a estabilidade e a saúde operacional até a banca.
   - Não reprova a execução simplesmente porque a data limite de envio já passou.
   - Mantém ativas todas as demais verificações críticas:
     - Disponibilidade e resposta HTTP 200 da URL pública formal.
     - Integridade dos arquivos (`build.zip`, `GDD.pdf`, `pitch.mp4`, `LINK_DO_JOGO.txt`).
     - Correspondência estrita dos hashes SHA-256 com o `MANIFESTO.sha256`.
     - Suíte de regressão e smoke tests via Playwright.

---

## 3. Mecanismo de Alertas e Notificações (I09-22)

Caso ocorra indisponibilidade da URL de produção (HTTP != 200, timeout ou erro de rede) ou corrupção de artefato:
- O script `scripts/triagem.mjs` aciona o mecanismo de alerta (`notifyAlert`), emitindo uma notificação via GitHub Issues com a label `alerta`.
- Um marcador idempotente (`<!-- arcade-alert:v1:TriagemIndisponivel:producao -->` ou `<!-- arcade-alert:v1:JogoForaDoAr:producao -->`) é utilizado para evitar a criação de chamados duplicados.
- Se o problema for sanado em verificações subsequentes, o histórico é preservado para auditoria.

---

## 4. Agendamento e Atrasos Operacionais do Actions (I09-21)

- **Expressão Cron configurada:** `0 12 * * *` (execução diária às 12:00 UTC).
- **Latência do Agendador:** O agendamento do GitHub Actions opera sob fila compartilhada e pode sofrer variações e atrasos operacionais de alguns minutos até horas, dependendo da carga dos runners da plataforma.
- **Relatório de Execução:** Cada execução agendada grava metadados em `reports/triagem-agendada-execucao.json` registrando data/hora efetiva, ID da run e tipo de evento, para comprovação auditável.

---

## 5. Permissões e Segurança

- **Permissões mínimas:**
  - `contents: read`: Acesso somente leitura ao repositório.
  - `issues: write`: Criação e consulta de notificações de alerta.
- **Isolamento de Segredos:** Tokens de autenticação (`GITHUB_TOKEN` / `GH_TOKEN`) são consumidos exclusivamente via variáveis de ambiente seguras, sem registro em logs, arquivos de relatório ou saídas no console.
- **Não produção manual:** O workflow não efetua deploys manuais nem alterações no código-fonte.

---

## 6. Limitações e Pendências

- **Execução Real com Produção Ativa:** A triagem agendada completa contra a produção formal e artefato `v1.0.0` requer a conclusão prévia da tag definitiva e deploy de produção (Passos 035 e 036).
- **Ambiente de Testes:** Os testes de integração cobrem ambos os modos (`entrega` e `vigilancia`), simulação de falhas de rede, resposta HTTP diferente de 200 e chamadas de notificação de alerta com mocks idempotentes.
