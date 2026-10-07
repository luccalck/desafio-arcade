# Segurança e revisão

Nunca colocar credenciais, CPF ou assinaturas em código, logs ou artefatos. Configuração não sensível usa variables; credenciais necessárias usam secrets com acesso mínimo. Nenhum segredo é necessário para jogar ou construir este lote.

CI executa Gitleaks com regras padrão, relatório redigido e falha bloqueante. `npm audit --omit=dev --audit-level=critical` bloqueia vulnerabilidade crítica de produção. Ferramentas de desenvolvimento são inventariadas no SBOM. Dependabot propõe atualizações por PR, sem merge automático.

Instalar hook: `git config core.hooksPath .githooks`. Instalar Gitleaks 8.30.1 a partir da release oficial verificando SHA-256 e disponibilizá-lo no PATH. O hook falha se faltar scanner ou houver detecção. Não usar credencial real para exercitar detecção.

PR exige revisão por outra pessoa, CI verde e revisão de usos de IA/licenças. Para vazamento real, revogar/rotacionar primeiro e preservar evidência sem valor sensível; corrigir histórico com coordenação dos colaboradores. Não publicar credenciais em Issues.
