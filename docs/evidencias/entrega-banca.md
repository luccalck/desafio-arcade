# Evidência de Entrega, Artefatos e Demonstração da Esteira na Banca

**Data:** 14/10/2026
**Responsável:** Lucas Souza da Silva (`6lucassilvaaa`)
**Papel oficial:** SRE e Segurança (Squad Aura 67)
**Etapa:** 039 — Confirmar entrega e demonstrar esteira na banca
**Branch de trabalho:** `feature/passos-039-040-entrega-contribuicao`
**Base:** `feature/passos-037-038-ficha-banca-freeze` (`b043001`)

---

## 1. Estado real dos entregáveis

A [CI auditada38649548723](https://github.com/luccalck/desafio-arcade/actions/runs/38649548723) produziu buildZIP de29.001 bytes, GDD 18páginas e relatórios de testes/segurança. Não produziu submissão final, pitch ou relatório técnico no bundle. O vídeo permanece pendente por ordem de Lucca. Os scripts de manifesto/pacote são implementação; não comprovam entrega.

Relatório técnico revisado: [fonte](../relatorio.md), a gerar/validar/publicar pelaCI. Ficha: [rascunho](../gestao/ficha-entrega.md), semTXTfinal gerado. Os49campos devem receber respostas verdadeiras, sem tratar links presumidos ou estimativas10como aceites.

## 2. Orientações para a Submissão no AVA Institucional (Ação Humana)

O envio dos entregáveis acadêmicos no Ambiente Virtual de Aprendizagem (AVA) é uma ação estritamente humana e não pode ser forjada ou executada automaticamente pela IA:

1. **Arquivos a serem anexados no AVA:**
   - Pacote de submissão zipado gerado pela pipeline contendo os artefatos compilados.
   - Relatório Técnico oficial: `artifacts/RelatorioTecnico.pdf`.
   - Ficha de avaliação preenchida em formato de texto: `DevOps_Avaliacao_Arcade_Aura_67.txt` (gerada a partir de `docs/gestao/ficha-entrega.md` no navegador através de `Avaliação.html`).
2. **Procedimento de Comprovação e Recibo (CR-04 e CR-05):**
   - O responsável pela submissão no AVA deve realizar o envio dentro do prazo oficial da disciplina.
   - Imediatamente após a submissão, deve-se gerar o comprovante/recibo com data, hora e hash dos arquivos anexados, salvando a confirmação para fins de auditoria acadêmica.
   - Não declarar o envio como concluído antes da realização efetiva do upload e da emissão do recibo institucional.

---

## 3. Roteiro de Demonstração ao Vivo na Banca (5 Minutos — CR-07, B-03, B-04, B-05)

A demonstração ao vivo da esteira perante a banca examinadora foi desenhada para comprovar a viabilidade técnica, resiliência operacional e governança do ciclo de vida:

```
[00:00 - 01:30] Demonstração de Commit → CI Verde → Produção (B-03)
  - Apresentar o fluxo de branch curta e Pull Request com branch protection.
  - Exibir a execução da esteira GitHub Actions com testes paralelos e gate estrito.
  - Mostrar a promoção atômica para produção sem recompilação (mesmo SHA/artefato).

[01:30 - 03:30] Injeção de Falha Controlada → Alerta → Rollback < 5 min (B-04, CR-07)
  - Demonstrar a detecção imediata por sondas sintéticas (`observar-producao.mjs`).
  - Exibir a abertura automática da Issue de incidente com a label "alerta".
  - Acionar o workflow manual protegido `rollback.yml` com motivo "alerta-confirmado".
  - Comprovar que o `previousSha` estável é restaurado em menos de 5 minutos,
    os alertas são fechados automaticamente e o serviço permanece ininterrupto no Pages.

[03:30 - 05:00] Contingência 100% Offline e Arquitetura Limpa (B-05)
  - Simular desconexão total de rede e abrir `file:///.../dist/index.html` do `build.zip`.
  - Executar a campanha do jogo, edição de regras Python por AST e exportação offline.
  - Justificar decisões de sustentabilidade: custo zero de infraestrutura, zero dependências
    pesadas e total privacidade do usuário (DIR-09, sem telemetria ou cookies).
```

---

## 4. Divisão de Fala entre os Quatro Integrantes (10 Minutos)

Para assegurar o atendimento aos critérios **SQ-14**, **SQ-15**, **SQ-16**, **SQ-17**, **B-11** e **B-12**, o tempo total de fala de 10 minutos foi distribuído equitativamente (2m30s para cada um):

- **00:00 – 02:30 | Lucca Castilho Costa (Produto e Game Design):**
  - High concept do *Rota do Código*, premissa pedagógica e público-alvo (GDD 12 seções).
  - Loop de jogabilidade: 5 missões educativas, interpretador Python AST e exportação.
  - Governança de design, backlog e condução dos primeiros ciclos.
- **02:30 – 05:00 | Davi Marcondes (Desenvolvimento e Qualidade):**
  - Arquitetura de código em TypeScript modular (`src/core`, `src/scenes`, `src/content`).
  - Pirâmide de testes automatizados (260 testes unitários/integração com cobertura core > 97%).
  - Esteira CI/CD no GitHub Actions e infraestrutura de ambientes desacoplados.
- **05:00 – 07:30 | Miguel Oliveira (Plataforma e Release):**
  - Estratégia de rollout azul-verde, imutabilidade de artefatos e testes E2E Playwright.
  - Engenharia de recuperação e rollback automatizado (< 5 min) documentado no ensaio.
  - Monitoramento contínuo, métricas DORA e protocolo de playtest com usuários.
- **07:30 – 10:00 | Lucas Souza (SRE e Segurança):**
  - Conformidade estrita de segurança e privacidade (DIR-09: zero cookies, zero telemetria).
  - Gitleaks no histórico, SBOM CycloneDX e auditoria de condições eliminatórias (EL-01 a EL-05).
  - Pipeline de submissão acadêmica, modo vigilância até a banca e política de Code Freeze.

---

## 5. Contribuições e defesa

O [inventário](../contribuicoes.md) mapeia autoria e escopo dos28 PRs; snapshot inicial sem reviews registrados. Não atesta aprovação ou F=1,0. Presença/domínio na banca e ensaio cronometrado ainda precisam ocorrer. O roteiro acima é uma proposta; recuperação abaixo de 5 min precisa ser medida em operação antes da demonstração.
