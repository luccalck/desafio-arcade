# Rota do Código — decisões aprovadas

Alternativa A, **Oficina de Jogos**, aprovada pelo solicitante em 09/10/2026 com instrução de planejar/iniciar. [Especificação](superpowers/specs/2026-10-09-oficina-jogos-design.md) e [plano](superpowers/plans/2026-10-09-oficina-jogos.md). Mantidos nome, paleta e stack; regras JavaScript de minijogo substituem circuitos. Histórico preservado, uma única fonte/campanha ativa.

Público iniciante; eventos, operações, condições, estado e repetição ligados a comportamento executável. Cinco funções defeituosas: editar/testar entradas/observar nave. Ajuda/testes sob demanda, sem preenchimento automático. Outras regras corretas isolam o conceito nas primeiras missões; final usa todas as fontes do jogador, 23 casos e vitória com 100 pontos/três vidas. Exporta HTML independente com funções editáveis/MIT.

Core TypeScript puro, parser/intérprete AST limitado sem eval/Function/DOM/rede/globais. Exportação serializa AST segura para JavaScript; Node VM apenas testa fontes editoriais confiáveis com timeout. Motor/player SVG compartilhados. JSON/schema/semântica exigem seis missões/contratos/referências válidas; conteúdo inválido quebra build. Nenhuma dependência nova ou IA em runtime.

100 XP por primeira missão, 200 final, total 700. Sem medalhas de peças da versão anterior. Editar invalida regra aplicada; pausa conserva, Jogar reinicia. Chaves workshop:v4 preservam campanhas anteriores sem desbloqueio; reset próprio/fallback de sessão. Setas/A-D/toque fora do editor. Paleta azul/ciano/amarelo, SVG/CSS original assistido por Codex, fontes locais e ausência de áudio. Um objetivo/arena/editor; detalhes em diálogo. Mobile empilhado/alvos ≥44px.

WEB estática/offline file://. Testes automatizados não medem aprendizagem/diversão/acessibilidade humana. CI/segurança/PDF/ZIP integrados; HML/PRD/recuperação/sondas/DORA/vídeo/triagem pendentes. G0 incompleto; identificação adiada pelo solicitante. Aprovação de concepção não substitui revisão de outro integrante/aceites G0–G8.
