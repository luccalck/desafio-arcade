# Oficina em Python e preview GitHub Pages — design

Data: 12/10/2026. Fonte única jogo-arcade, branch feature/primeiro-ciclo, PR#2. O solicitante aprovou a oficina existente e pediu explicitamente desafios em Python, commits em sua identidade e publicação Pages. Mantém o conceito já aprovado; linguagem e hospedagem são as alterações autorizadas. Escolhas técnicas abaixo detalham esse escopo, sem exigir novo aceite do mesmo conceito. Não há autorização para simular revisão de outro integrante ou desproteger main.

## Abordagens e decisão

1. Subconjunto de Python interpretado por AST no navegador (escolhido): mantém build pequena, file:// offline, regras puras e limite por avaliação. Exige testes de semântica contra CPython; não oferece toda a linguagem.
2. Runtime Python completo no navegador: amplia bibliotecas/linguagem, mas traz distribuição maior, inicialização e adaptações de sandbox/offline. Desnecessário para cinco funções pequenas.
3. Backend Python: exige serviço/conexão, conflita com WEB estática/offline e foi descartado.

## Experiência educativa

Mesmas missões controlar/mover/colidir/pontuar/criarOnda; cada função recebe dicionário entrada. Python válido, com def, quatro espaços sugeridos, entrada["campo"], True/False, =, +=, comparação ==/!=, not/and/or, if/elif/else, listas/append, for em range de1–3 argumentos. Comentários #. Sem import, chamadas livres, rede, arquivos, classes ou while; erros com linha/indentação explícitos. Não aceitar JavaScript com etiqueta Python.

```python
def mover(entrada):
    return entrada["posicao"] + entrada["direcao"] * entrada["velocidade"]
```

Parser produz AST, runtime respeita escopo de função, listas vazias falsas, comparação estrutural, range avaliado uma vez e passo não zero, divisão/modulo coerentes. Guardas continuam6000caracteres/300nós/20níveis/2000passos/64iterações/64itens; subset documentado. Comparação com Python instalado usa exclusivamente fixtures editoriais confiáveis, timeout e processo isolado; navegador nunca envia tentativas a backend. Motor/player permanece TypeScript/SVG, pois o pedido é linguagem do desafio, não instalação de Python para jogar.

Editor ganha Tab com quatro espaços e Enter com indentação sugerida, sem perder foco/comportamento de Escape/menu. Conteúdo/ajuda/arte ilustrativa/títulos .py/PY substituem JavaScript ativo. Mesmos casos, final exige23casos e partida100pontos; exporta HTML jogável com AST e interpretador compartilhado e texto Python editável em download .py separado. Declaração honesta: HTML usa motor JavaScript; funções .py executam num Python convencional com dicionário entrada. Não afirmar que editar Python bruto dentro do HTML altera motor sem recompilar.

Persistência nova workshop-python:v5 e sources:v5 preserva código/XP JavaScript anteriores sem importar fonte inválida ou desbloqueios. Preferências mantidas. Version0.6.0 candidata/data12/10; não retroagir prazo09/10. GDD12seções/Esteira, LEIA-ME/README/AI-USAGE/matriz/evidências atualizados.

## Repositório e publicação

Repo existente https://github.com/luccalck/desafio-arcade, conta/autorGitluccalck e256704169+luccalck@users.noreply.github.com confirmados; não criar cópia/repo concorrente. PRdraft#2/review_required, main protegida/ci+outroautor; preserve. Publicação autorizada como preview público, sem representar aprovação final de produção.

Actions: ci verde → recuperar o build.zip/checksum da mesma execução → montar /hml/ e /releases/<sha>/ imutável → escrever gh-pages somente pelo job → publicar mesmo diretório com Pages Actions → smoke HTTP/versão/partida por Playwright. Sem rebuild na implantação. Root abre a versão candidata, não mostra dados da equipe ausentes. gh-pages recebe somente site/loader/versões; não secrets/relatórios pessoais.

Job restrito a push de feature/primeiro-ciclo, variável PAGES_PREVIEW_ENABLED e ci success; PRs/forks não publicam. Contents:write somente na escrita gh-pages; Pages:write/id-token:write somente no deploy. Actions terceiros fixados por SHA verificado. Environment hml/github-pages para preview; approval do environment producao continua necessária para promoção acadêmica futura. URL prevista https://luccalck.github.io/desafio-arcade/ só é confirmada após HTTP/smoke real. Não inventar HML≤15min, rollout, rollback<5min/DORA/triagem/banca: não fazem parte desta conclusão.

## Validação e fechamento

Contratos antes do parser; semântica/subset/erros/limites/CPython/core; integração JSON/export .py/HTML; E2E edição/indentação/campanha/final/mobile/download/offline/storage legado, regressão regra antiga. Gate>=15unidades/3integrações/2E2E e70%core, sem testes artificiais de contagem. Lint/security/audit/SBOM/reprod/ZIP<25MB/PDFpdfinfo/render todas páginas, CI final, Pages HTTP e smoke real. Capturas reais e links do run/commit/URL. Registrar preparo/implementado/execução/dependências; G0/humanos e demais INT/checkpoints não integralmente atendidos. Revisão humana de PR antes de merge permanece exigida.

Referências primárias: https://docs.python.org/3/tutorial/controlflow.html ; https://docs.python.org/3/tutorial/datastructures.html ; https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages ; https://docs.github.com/en/rest/pages/pages . Documentação consultada12/10/2026; nenhum ativo copiado.

Decisão refinada na implementação: exportação compartilha executeCode e AST com a oficina, em vez de manter um segundo runtime em JS emitido. Pontes JS chamam o mesmo interpretador Python limitado. Isso conserva exatamente budgets/semântica entre navegador e HTML offline, reduzindo divergência. Comparação com CPython cobre referências e fixtures confiáveis; .py separado contém fontes Python reais.
