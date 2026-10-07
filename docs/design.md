# Rota do Código - decisões aprovadas

A bancada visual foi aprovada pelo solicitante com “Sim” em 07/10/2026. [Especificação](superpowers/specs/2026-10-07-bancada-visual-design.md) e [plano](superpowers/plans/2026-10-07-bancada-visual.md). Aprovação de concepção não substitui revisão de PR por outro integrante.

Problema educativo: relacionar dados, transformação, condições e memória ao comportamento de um sistema. Público iniciante, sem sintaxe prévia. O jogador constrói máquinas numa grade 7×5: coloca/move/configura peças e conecta portas por arraste ou seleção de peça/saída/destino. Dados animados mostram o efeito; falha preserva montagem e destaca causa. Ajuda, lotes e registro sob demanda; sem aula ou prática obrigatória.

Cinco missões: conexões sob parede/alcance, composição de +1/+2 para generalizar +3, classificação por integridade, (credencial E energia) OU manutenção sob oito combinações, buffer que conta/guarda/libera após fechar o lote. Final reúne íntegro E autorizado, +3 e memória sob três lotes, inclusive zero aprovados. Resultados/limites públicos determinam vitória; duas montagens editoriais válidas por missão são verificadas, sem exigir igualdade com elas.

Uma primeira vitória concede 100 XP; final 200; total 700, sem duplicação. Estrelas comparam peças com a menor das duas soluções editoriais, sem bônus ou promessa de ótimo global. Menu/pausa/opções; preferências de texto maior/movimento reduzido. Progresso usa rota-do-codigo:bench:v3; versões antigas ficam preservadas sem desbloquear a nova. Drafts de montagem são da sessão. Armazenamento indisponível mantém sessão.

Stack mantida: TypeScript/core puro, HTML/CSS/SVG, esbuild IIFE, Ajv, Vitest e Playwright. Eventos determinísticos, sem DOM/eval/ciclos. Limites de 512 eventos, dez pacotes de conteúdo e valores0..999. Cabos seguem percurso ortogonal válido, com alcance/obstáculos; cruzamentos não criam junção. Girar muda orientação visual e preserva regras/conexões. Sem dependência nova.

Azul escuro, ciano e amarelo; vetores originais assistidos por Codex, fontes locais e ausência de áudio. Responsividade/gestos/teclado/pausa e regressão real de foco #1 têm testes de navegador. Capturas locais identificadas; mapas/wireframes/concept são desenhos de projeto. Eficácia/diversão e acessibilidade completa ainda precisam de revisão/playtest humano.

WEB estática/offline file://, mesma experiência responsiva, sem backend/API IA/cadastro/serviço pago. CI gera testes, segurança, build/PDF/ZIP/checksum. Esteira restante: mesmo artefato → HML → aprovação producao → release imutável → azul-verde/smoke → rollback → sondas/DORA. Nenhuma execução de implantação/recuperação/monitoramento foi declarada. G0 permanece pendente de dados/participação reais dos quatro e horário da aula.
