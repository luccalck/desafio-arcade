# Relatório técnico — Desafio Arcade

**Estado:** documento em preparação. Não é o relatório final para entrega; PDF técnico, limite de doze páginas e revisão coletiva ainda não foram executados para este arquivo. Consolidação prevista nos passos033/037.

## Produto e arquitetura existentes

Rota do Código é um jogo WEB estático para aprender programação construindo cinco funções Python de um minijogo. O núcleo TypeScript interpreta um subconjunto Python por AST, separado da renderização. A build inclui recursos locais, versão e instrução offline; não há backend obrigatório nem engine instalada pelo jogador. [GDD completo](gdd.md).

A CI atual usa GitHub Actions para qualidade, segurança, testes, build, PDF e empacotamento. O preview do Pages consome o ZIP/checksum da mesma execução, preserva releases por SHA e executa smoke. Produção formal, aprovação, rollback, monitoramento, DORA e triagem final ainda precisam ser concluídos. [Publicação atual](gestao/deploy-preview.md).

## Evidências disponíveis e lacunas

- [Testes, Python e limites](evidencias/python-pages.md).
- [CI, artefatos e publicação](evidencias/ci-python-pages.md).
- [Bug real de regra antiga e regressão](evidencias/bug-regra-antiga.md).
- [Bug real da exportação Python e regressão](evidencias/bug-download-py.md).
- [Matriz dos dez integráveis](gestao/matriz-atendimento.md).
- [Checklist completo com estado de cada item](gestao/checklist-avaliacao.md).

O relatório final deve incluir decisões/alternativas, evidências datadas dos dez INT, quatro métricas DORA reais e comparação com onze dias, melhoria medida, retrospectiva honesta e contribuição por PR de cada integrante. Esses resultados ainda não existem integralmente; não preencher com números ou capturas simulados.

## Consolidação para entrega

O vídeo vem de produção candidata antes da tag final e entra na pipeline como arquivo humano validado. Este relatório recebe os links reais de release e triagem após suas execuções. O GDD.pdf é documento separado; não substitui o PDF técnico. [Execução em blocos](execucao/00-indice-geral.md).
