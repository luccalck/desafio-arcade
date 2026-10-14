# Planejamento da Apresentação para a Banca Avaliadora

**Projeto:** Rota do Código (Desafio Arcade)  
**Squad:** Aura 67  
**Duração Total:** 20 minutos (10 min de fala dividida + 5 min de demonstração ao vivo + 5 min de arguição da banca)  
**Responsável pela Consolidação:** Lucas Souza (`6lucassilvaaa`)  

---

## 1. Divisão Equitativa de Fala (10 Minutos — 2m30s por integrante)

Todos os quatro integrantes possuem papéis formais e domínio comprovado de suas entregas em pelo menos três integráveis diferentes:

### 1.1 Bloco 1 (00:00 a 02:30) — Lucca Castilho (`luccalck`)
**Papel:** Produto e Game Design  
**Foco:** Concepção, GDD e subset pedagógico Python.
- **Abertura e Premissa:** Apresentação do Squad Aura 67 e contextualização do problema: democratizar o aprendizado prático de programação para estudantes do ensino básico sem exigir configuração de ambientes complexos ou instalação de engines pesadas.
- **Game Design e Mecânicas (INT-02):** Apresentação da progressão da oficina em cinco missões modulares (controles, movimento, colisão, pontuação e ondas) culminando no desafio final do minijogo arcade.
- **Subset Pedagógico Python:** Justificativa da escolha por um analisador AST próprio em TypeScript, permitindo feedback imediato de sintaxe e diagnósticos educativos sem executar interpretadores nativos pesados ou código arbitrário em runtime.

### 1.2 Bloco 2 (02:30 a 05:00) — Davi Marcondes (`DaviSouza78`)
**Papel:** Desenvolvimento e Qualidade  
**Foco:** Pirâmide de testes, acessibilidade e regressão de bugs reais.
- **Pirâmide de Testes (INT-04):** Apresentação da cobertura de testes automatizados com 260 testes unitários/integração (cobertura do núcleo > 97%) e 36 cenários ponta a ponta Playwright executados em múltiplos viewports (Desktop 1280x720 e Mobile 390x844).
- **Acessibilidade e Inclusão:** Navegação 100% acessível via teclado (Tab, Enter e Escape no editor), controle de foco e suporte a gestos por toque sem distorções visuais.
- **Bugs Reais Históricos e Regressão:** Explicação do bug real de retomada de regra antiga no editor após edição (tarefa D06) e do bug de perda de foco via teclado (Issue #1), demonstrando como os testes de regressão capturaram as falhas antes da liberação da candidata.

### 1.3 Bloco 3 (05:00 a 07:30) — Miguel Oliveira (`miguelsenai2024`)
**Papel:** Plataforma e Release  
**Foco:** Pipeline CI/CD, imutabilidade, offline e DORA.
- **Esteira Automatizada CI/CD (INT-03, INT-07):** Apresentação do fluxo de integração contínua no GitHub Actions com jobs paralelos de qualidade, segurança, build e E2E, agregados pelo contrato estrito `pacote-ci`.
- **Princípio do Artefato Único e Empacotamento Offline (INT-06):** Demonstração da imutabilidade: o mesmo pacote `build.zip` (~29 KB) é promovido de homologação para produção sem recompilação, funcionando 100% desconectado via `file://`.
- **Métricas DORA e Observabilidade (INT-08):** Transparência e integridade da engenharia: explicação do coletor DORA automatizado e o motivo técnico pelo qual as métricas formais permanecem N/D (0 deploys e incidentes de produção formal antes da tag v1.0.0), comparando honestamente com a linha de base de 11 dias da Carparts.

### 1.4 Bloco 4 (07:30 a 10:00) — Lucas Souza (`6lucassilvaaa`)
**Papel:** SRE e Segurança  
**Foco:** Segurança, privacidade, automação de submissão e triagem.
- **Segurança e Privacidade Rigorosa (INT-05 / DIR-09):** Garantia de conformidade total: zero cookies, zero scripts de terceiros ou telemetria, histórico limpo no Gitleaks, dependências com 0 vulnerabilidades críticas no `npm audit` e inventário SBOM CycloneDX.
- **Automação de Submissão e Entrada de Vídeo (INT-09):** Apresentação do script `scripts/submissao.mjs` que valida a duração fracionária do pitch via `ffprobe` (≤ 90 segundos) e consolida os manifestos criptográficos SHA-256.
- **Triagem em Modo Vigilância e Auditoria Eliminatória:** Funcionamento do workflow diário `triagem-agendada.yml` com disparo de alertas via GitHub Issues (`notifyAlert`) até a banca, garantindo a integridade dos contratos e conformidade com as regras eliminatórias.

---

## 2. Roteiro de Demonstração Prática ao Vivo (5 Minutos — 10:00 a 15:00)

1. **Acesso Público (1 min):**
   - Abrir a aplicação na URL pública de produção: `https://luccalck.github.io/desafio-arcade/`.
   - Mostrar a barra superior informativa com versão `v1.0.0` e SHA do commit.
2. **Ciclo de Edição e Validação Pedagógica (2 min):**
   - Navegar até uma missão da oficina.
   - Digitar código incorreto propositalmente para demonstrar os diagnósticos amigáveis de sintaxe.
   - Corrigir a função e acionar "Testar Regra" (comprovando os casos de teste pedagógicos passando).
   - Acionar "Jogar" e demonstrar o efeito imediato da função Python no comportamento da nave.
3. **Vitória e Exportação Offline (2 min):**
   - Concluir a campanha final alcançando 700 XP.
   - Efetuar o download do arquivo `minhas-funcoes.py` e do minijogo `meu-jogo.html`.
   - Desconectar a máquina da rede (ou abrir localmente via `file://`) demonstrando a execução do jogo 100% offline.

---

## 3. Roteiro de Perguntas e Respostas da Banca (5 Minutos — 15:00 a 20:00)

- **Postura:** Comunicação técnica precisa, fundamentada em dados reais e contratos de código.
- **Direcionamento de Respostas:**
  - Perguntas sobre Game Design, subset Python ou narrativa: respondidas por **Lucca**.
  - Perguntas sobre testes, bugs, Playwright ou acessibilidade: respondidas por **Davi**.
  - Perguntas sobre esteira, Pages, imutabilidade, rollback ou DORA: respondidas por **Miguel**.
  - Perguntas sobre segurança, LGPD, integridade de pacote, triagem ou SRE: respondidas por **Lucas**.
- **Regra de Ouro:** Não inventar funcionalidades ou ocultar limitações. Se a banca questionar métricas DORA ou o vídeo humano, responder com a verdade documentada no relatório técnico e no registro único de pendências.
