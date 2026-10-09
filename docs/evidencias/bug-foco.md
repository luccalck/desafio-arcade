# Bug real: perda de foco ao remover comando

Issue: https://github.com/luccalck/desafio-arcade/issues/1 . Data: 07/10/2026. Reprodução local no Chrome, antes de publicar HML.

1. Começar a primeira fase e focar “Avançar”.
2. Pressionar Enter para inserir um comando.
3. Focar “Remover comando 1” e pressionar Enter.
4. Antes da correção, o foco terminava em body após a reconstrução da interface. O teste esperava foco no botão Avançar e falhou.

Causa: o controle removido deixava de existir depois de renderizar o editor. Correção em src/scenes/app.ts: restaurar foco no primeiro botão de adicionar após remoção/reordenação. Regressão: tests/e2e/game.spec.mjs, cenário “teclado: remover último comando preserva foco no editor”.

Execução anterior: seis cenários passaram, um falhou. Após a correção: sete passaram. [JUnit real anterior](bug-foco-antes.junit.xml) e [captura real da falha](bug-foco-antes.png) acompanham este registro. A execução anterior usava fonte ainda sem commit de implementação; não atribuir o comportamento ao bootstrap. Trace anterior preservado no contexto local `.contexto/bug-foco-antes/`; relatórios posteriores são gerados pela CI. Essas execuções não equivalem a homologação nem revisão humana. A Issue permanece aberta até revisão e merge da correção.
