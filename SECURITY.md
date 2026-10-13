# Segurança, dependências e privacidade

Não colocar credenciais, CPF ou assinaturas em código, logs, artefatos ou capturas. Configuração pública usa variables; credenciais necessárias usam secrets/token do job com acesso mínimo. O jogo e a build local não precisam de segredo do jogador.

## Gates e relatórios

CI executa Gitleaks8.30.1 com regras padrão, histórico completo e `--redact`; detecção falha o job, que compõe o gateci obrigatório. `npm audit --omit=dev --audit-level=critical` bloqueia vulnerabilidade crítica nas dependências de produção. Esse comando não é auditoria completa de ferramentas de desenvolvimento: elas entram no SBOM e nas atualizações/revisões.

RelatóriosGitleaks/audit/SBOM ficam nos artefatos da CI por SHA. SBOM usa CycloneDX; anexação à release final pertence à etapa de release. Scanner/audit verdes não comprovam inexistência de toda vulnerabilidade, direito de uso de ativos ou revisão humana.

## Atualizações com Dependabot

Mantemos `.github/dependabot.yml` com npm e github-actions, diretório/ e intervalo semanal. Em13/10/2026 habilitamos e verificamos alertas Dependabot e securityupdates na API; não há alerta aberto nessa conferência. Secret scanning e push protection estavam habilitados e foram preservados.

Acompanhar a abaDependencygraph/Dependabot e logs da verificação; configuração ativa não significa que um PR precisa existir se não há atualização/alerta aplicável. Segurança e atualizações de versão são funcionalidades distintas. Alterações propostas pelo bot passam por revisão de outro integrante, CI do HEAD e licenças; não habilitar auto-merge nesses PRs como substituto da análise. Não executar código de PR não confiável com secrets ou permissionswrite por conveniência. A integração formal deve permitir CI dos PRs de dependência na base correta.

## Hook local

Instalar com `git config core.hooksPath .githooks`. Obter Gitleaks8.30.1 da release oficial, conferir checksum e deixá-lo no PATH. O hook existente usa set-eu e scanner staged/--redact; scanner ausente ou detecção interrompe o commit. Não usar --no-verify para ocultar falha. Testes de detecção usam valores sintéticos locais, nunca segredo emitido por serviço. Fixture e relatórios de ensaio ficam fora do Git/pacote.

## Tratamento de vulnerabilidade e exposição

1. Confirmar componente, versão, escopo e severidade com origem verificável; comunicar detalhes sensíveis ao responsável pelo repositório por canal privado antes de registrar reprodução pública. Não colocar segredo ou dado pessoal em Issue.
2. Vulnerabilidade crítica de produção bloqueia construção/entrega. Corrigir por branchcurta/PR, atualizar lockfile conforme necessário e executar audit, testes e scanners; não mascarar o gate por flags permissivas. Demais severidades exigem análise e decisão documentada, sem afirmar aceite coletivo não ocorrido.
3. Se houver credencial real exposta, revogar/rotacionar primeiro. Guardar evidência redigida; remover da fonte não elimina exposição no histórico, caches ou artefatos. Coordenar saneamento do histórico e dos acessos com a equipe, preservando rastreabilidade necessária sem publicar o valor.
4. Fechar o registro somente após correção e validação comprovadas; atualizar AI-USAGE/THIRD_PARTY/GDD quando direitos, componentes ou comportamento mudarem.

Não identificamos incidente real neste passo. Não fabricamos exposição ou bug para testar a rubrica.

## Dados e autoria

Não implementamos telemetria ou coleta pessoal no jogo. Progresso, código e preferências ficam no navegador; requests do carregador consultam somente arquivos de versão/rollout. Ranking, contagem remota e Opal/AI Studio não foram adotados; seus requisitos continuam condicionais. [README](README.md) explica chaves, reset e limites.

Antes do merge, outro integrante revisa código/IA/conteúdo/direitos; licenças e usos estão em THIRD_PARTY/AI-USAGE. A participação real da equipe e os aceites finais não são substituídos por esta política. Conferência técnica em [seguranca-inicial.md](docs/evidencias/seguranca-inicial.md).
