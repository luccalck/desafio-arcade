# Passo005 — revisão do GDD

**Data:**13/10/2026. **Responsável:**LuccaCastilho/luccalck. **Escopo:**005/P01/P02; INT02/01; preparaçãoG1. Fonte-base db4778bfa349a367cbd9fd8bfd0a9799fabd0243, versão0.6.0. Identificação disponível e conteúdo revisados; RAs/aceites finais ainda pendentes.

## Identificação e conteúdo efetivamente atualizados

Registramos Aura67, os quatro nomes/contas/papéis confirmados, coordenaçãoProduto e links reais de repo/preview/HML/CI. RAs constam como“A informar”, conforme orientação anterior; não fabricamos números, CPF ou assinaturas. Revisão005/data13/10 distingue documento de versão do software/data de submissão/release. Nenhuma tag/release final existia na consulta.

Mantivemos12seções do modelo, identificação e Esteira. Conferimos premissa/público/justificativa de gamificação, ações/loop/progressão, vitória/derrota, aprendizagem das cinco funções e final, enredo/mascote, mapas/fluxo/UI, acessibilidade, ausência de áudio, origem/IA/licenças e roadmap.

Highconcept: **804caracteres**, um parágrafo, abaixo1000. ConteúdoJSON:6missões;4/5/5/5/4casos nas funções,23total;100XPcada e200final,700total. Descrição coerente com core/editor/exportação: teclas/direção, operações/movimento, condição/fronteira de colisão, estado/pontos e listas/repetição. Nenhum ganho educativo/playtest humano foi declarado.

Esclarecemos exportaçãoHTMLjogável e fontesPython.py editáveis para estudo; o .py separado não recompila automaticamente o HTML. Não alteramos mecânicas ou runtime.

Declaração de originalidade descreve autoria assistida e inventáriosMIT/THIRD_PARTY/AI-USAGE, preservando confirmação coletiva/direitos/revisão humana antes do merge como pendentes. Não aceitamos termos do concurso. Capturas existentes mantêm data/source originais; mapas/wireframes são desenhos de projeto, não evidência simulada de execução.

## Backlog e coordenação

Atualizamos SQUAD/backlog:Produto/Lucca mantém GDD/backlog e coordena jogabilidade, preparação de playtest/pitch com participação dos quatro. SQ-06 encerra responsabilidade de coordenação, sem alegar vídeo/teste com usuários concluídos. Backlog separa implementado, identificação parcial e tarefas futuras. GDD-13 permanece aberto pelos RAs; G1 não foi coletivamente aceito.

## PDF e validações reais

- `npm run gdd:pdf`: exit0; gerador existente converteMarkdown, incorpora imagens/versão e regenera mapas. Highconcept validado e12seções verificadas.
- `pdfinfo artifacts/GDD.pdf`: exit0;13páginasA4,PDF1.4,não criptografado,sem JavaScript,363380bytes.
- Texto integral extraído comPyMuPDF e páginas renderizadas; inspecionamos todas as13páginas, tabelas, figuras e rodapés. Zero blocos de texto fora dos limites externos; não encontramos corte de conteúdo ou tabela ilegível.
- Limite de12páginas do enunciado aplica-se ao relatório técnico; não inventamos esse limite para GDD. Treze páginas não comprovam, por si só, aceites de conteúdo/direitos.

SHA256PDF: `d45698e9557036da9c1b49da6adfc92a7f33dcfcd8bc151d0c3259229e66a88a`. SHA256fonteGDD: `49c675e911a52a950b1a92c3d3f5e7ee680ee854e1fc48ba06fc20e1e58bdc9c`. Fonte/pacote0.6.0; data de revisão13/10. PDF local arquivado em.contexto/passo-005/GDD-validado.pdf, ignorado; CI gera seu próprio artefato. Não publicamos PDFmanual como pacote final.

OriginaisHTML/DOCXpreservados e comparados aoGDD; todos os campos/modelo/tabelas/declarações foram considerados. O destinoWEB escolhido prevalece sobre alternativa genéricaweb/mobile. Direitos/IA registrados; revisão de outro autor permanece geral. Referências técnicas/arte existentes não foram trocadas nem novas recomendações de stack introduzidas.

## Pendências específicas e continuidade

RAs/GDD-13identificação completa; confirmação coletiva/revisão e coerênciafinal de versão/data/links apósrelease verdadeira. Remetidos à seção005 do [registro único](../execucao/05-pendencias-por-passo.md) e tarefas finais pertinentes, sem bloquear preparação técnica independente. Ficha final/TXT não gerados.

Por autorização persistente de Lucca, a página inicialGitHub será apontada à candidata005 após push/CIverde. Isso atualiza rastreamento, sem merge/deploy ou suspensão deproteção; main volta a ser padrão apósintegração revisada. [GDD](../gdd.md) e [backlog](../gestao/backlog.md).
