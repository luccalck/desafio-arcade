# Notas de versão — Rota do Código

## 1.0.0

Candidata de entrega da oficina educativa WEB: cinco missões de funções Python, testes públicos com 23 casos e um projeto final que integra as regras escritas pelo jogador. Exportações .py/HTML e execução offline pelo LEIA-ME do ZIP.

- Consolidamos correções revisadas de homologação, publicação de Release e feedback ao reiniciar a partida. O PR41 foi aprovado por Davi no HEADcea6745 e integrado em16/10/2026, merge4678830.
- Mantemos CI com lint, unidade/integração/E2E, JSON inválido bloqueante, cobertura core, Gitleaks, audit de produção, SBOM, build reproduzível, GDD/PDF e relatório técnico automático.
- A esteira promove o mesmo ZIP entre HML e produção, com aprovação e azul-verde. Ensaios anteriores mediram recuperação manual80,66s e automática17,166s, incluindo Pages/smoke. Não representam nova execução desta candidata.
- Sondas/painel/DORA operacionais e alertas de ensaio permanecem separados. Melhoria do ensaio: média3s→2,5s e consultas de labels12→2, sem afirmar causalidade sustentada ou MTTR de incidentes da produção.
- Pitch86s com áudioElevenLabs fornecido porLucca, legendasBold52px e registros de fontes. A edição existente filmou0.7.0/e9; o procedimento exige recaptura real da candidata publicada e validação da origem antes do pacote acadêmico.
- SemVer1.0.0 no package/lockfile/GDD. Tag anotada, Release e TRIAGEM APROVADA somente serão declaradas depois das execuções correspondentes. A fichaTXT e o relatório pós-triagem usam os resultados reais; AVA/banca continuam ações humanas.

Estas notas descrevem o código candidato e os resultados anteriores identificados. Não antecipam aprovação do professor, fator individual, publicação1.0.0 ou submissão concluída. Conteúdo preparado com IA, sujeito à revisão humana do PR antes do merge e à autorização do hash destas notas para a Release.

## 0.7.0

Oficina web Rota do Código: cinco missões de funções Python e projeto final integrado, exportaçõesHTML/.py e funcionamento offline.

- CI com testes, segurança, reprodutibilidade, GDD/PDF, relatório técnico e ZIP/checksum identificados por SHA/run/tentativa.
- Cadeia formal HML→aprovação em producao→azul-verde→smoke→monitor executada na versão88d533e, com HML216,414s e mesmo ZIP entre ambientes.
- Painel e sondas públicos; dados DORA reais com limites explícitos. Três métricas operacionais têm amostra; MTTR de produção permanece indisponível.
- Preparação de ensaio isolado e correção de deduplicação; ensaio de alertas38847296363 executado com Issues38/39 e tempos próprios. Recuperação no Pages continua sujeita à execução após revisão/integração.
- Relatório técnico candidato de dez páginas com evidências verificáveis; atualizar com resultados de release/triagem quando ocorrerem.

Esta candidata não é entrega acadêmica final. Pitch, playtest humano, direitos/declarações coletivas, triagem final, TXT/AVA e banca mantêm suas dependências. Não existe GitHub Release publicada apenas por existir este arquivo. Conteúdo revisto tecnicamente com assistência de IA a pedido de Lucca; aprovação externa do PR34 e configuração do hash exato das notas permanecem gates antes da tag/publicação.

## 0.6.0

Histórico: oficina Python, editor/testes públicos, minijogo, progresso/opções e exportação offline. Os previews antigos e suas CIs continuam evidências históricas; não são a versão final da entrega.
