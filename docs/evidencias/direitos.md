# Passo008 — Licenças, autoria e revisão da IA

Conferência técnica em13/10/2026, S01/S02/P04, INT-05/02/01, preparaçãoG1/G2 e contínuo. Fonte `43cf1b3036e89c4e0a5d3cf6c7966716b267c277`, candidata0.6.0. Não modificamos código, conteúdo/mecânicas, ativos, dependências ou workflows. LICENSEMIT existente foi conferida e mantida; não atribuímos propriedade aos quatro sem declaração real.

## Inventário e fontes

npmSBOMCycloneDX exit0:158componentes/nenhuma licença ausente. Confrontamos versões/licenças/créditos de package.json/arquivosLICENSE com o SBOM, ampliando o resumoTHIRD_PARTY. Créditos usam autor declarado ou titular literal da licença, sem inventar indivíduo. [Inventário legível](inventario-npm-008.md), [dados](inventario-npm-008.json), [ativos](inventario-ativos-008.json), [sumário de validações](direitos-validacoes-008.json). Bibliotecas conservam licenças próprias; as ferramentas não são incorporadas como runtime no jogo.

26arquivos gráficos rastreados:10SVGs/16PNGs, com origemGit/hash/tamanho. Inspecionamos todos em pranchas de QA locais e verificamos códigoSVG/CSS inline. PNGs são capturas já registradas de aplicações/versões históricas; SVGs são desenhos de projeto. Não há música, sons, vídeo, arquivos de fonte, personagens ou logotipos de terceiros identificados nesta inspeção. Não é uma busca exaustiva de similaridade/registro de marcas; DIR-04/05/06 exigem revisão humana e incluem o vídeo futuro. Não importamos ativos do HTML/modelo professor.

Fontes:pilhasCSS de sistema no jogo, sem cópiaTTF/WOFF. PDF real da CI007 contém LiberationSans e Bold2.1.5 (fsType0 e créditosGoogle/RedHat), conferidos por PyMuPDF/fontTools. pdffonts não estava disponível no PATH; usamos leitura direta dos metadados, sem declarar execução desse comando. [Microsoft fontFAQ](https://learn.microsoft.com/en-us/typography/fonts/font-faq) distingue nomesCSS de distribuição de fontes; [licença Liberation](https://github.com/liberationfonts/liberation-fonts/blob/main/LICENSE) permite embutimento sob OFL. Reconfirmar fontes reais a cada documento/release.

TermosOpenAIROW e ServiceTerms seção4 foram lidos em fonte oficial; registramos atribuição de saídas na relação usuário/OpenAI, não exclusividade nem dispensa de licenças de terceiros. Links e distinção de confirmação pessoal/coletiva noAI-USAGE. Não confirmamos contratação/aceite pessoal dos demais, nem aceitamos termos de concurso. Propriedade do protótipo do squad na UC precisa ser confirmada pelos quatro, sem CPF/assinatura pública.

## Crítica técnica dos fatos educativos

- Controles:prioridade da direita com duas teclas é convenção do jogo, coerente com dois if e casos; não regra geral imposta pelo Python.
- Movimento:posição +direção×velocidade; velocidade por atualização, sem alegar física real. Nave pode receber limites do motor fora da função educativa.
- Colisão:<=inclui fronteira; True/False de Python e casos de perto/longe/limite coerentes.
- Pontuação:total acumulado, cristal10/estrela25, outros preservam; ==compara e +=acumula. Não confundir redefinição de estado com soma.
- Ondas:range(n) e append para quantidades inteiras não negativas deste contrato; zero produz lista vazia. O interpretador é subset limitado, não compatibilidade integralPython.
- Exportação:HTML jogável e.py com funções para estudo; editar.py não recompilaHTML. Vitória/XP não medem aprendizado humano. Ajuda, GDD e contratos foram confrontados; npmcontent:check valida starters/referências, mas revisão educativa de outra pessoa e playtest seguem necessários.

Esta crítica foi feita com assistência deIA. Não conta como revisão exigida de outro integrante. Não identificamos nesta conferência um bug novo que justificasse inventar Issue/regressão.

## Auditoria e resultados reais

Gitleaks8.30.1 HEAD e --log-opts=--all com --redact:exit0,53commits/zero achados, logs ignorados em.contexto/passo-008. Varredura adicional de formatosCPF/dígitos verificadores nos arquivos textuais rastreados atuais:zero candidatos válidos. Inspeção das capturas não encontrou CPF, assinatura pessoal ou credencial. Isso não certifica todos os formatos de dados pessoais/artifacts futuros, e DIR-15 permanece final. OriginaisHTML/DOCX preservados e hashes noJSONde validação.

GitHubPRs2–9 consultados:abertos,zero reviews. Sem revisão/aprovação de outro autor identificada. AutorGit/GitHub conferido antes do commit; identidade de colegas não foi usada. Nenhum aceite ou participação coletiva inferido do histórico de um único autor.

## Roteiro de revisão humana — ainda não realizado

Outro integrante deve ler os arquivos/termos e os diffs, testar regras relevantes, registrar noPR qual conteúdo/código/direitos verificou, limitações/correções e sua aprovação real. Os quatro devem confirmar que podem usar/licenciar as contribuições e que o protótipo pertence ao squad naUC. Concordância com papéis no001 não é essa declaração. Não há campo com aprovação preenchida pelaIA.

| Escopo a conferir | Fonte | Registro exigido | Estado |
|---|---|---|---|
| Biblioteca/ativo/licença/créditos | THIRD_PARTY e inventários008 | Revisor real/PR e correções | Pendente |
| FatosPython e limites/exports | src/content/core/scenes e GDD | Revisão de outro autor registrada | Pendente |
| UsoIA/histórico/prompt/responsável | AI-USAGE e matriz008 | Revisor/PR/resultado real | Pendente |
| Originalidade/titularidade coletiva | LICENSE/GDD/termos | Confirmação dos quatro, privada quando exigida | Pendente |
| Novos ativosStitch/vídeo/release |009/029/035/040 | Inventário/revisões atualizados | Futuro |

## Checks e continuidade

Nenhum dos16checks atribuídos ao008 foi fechado:todos envolvem confirmação humana, continuidade até release ou vídeo ainda inexistente. I05-10/12/13 foram revalidados no escopo disponível; isso não encerra I05-11/14/15/16/17/21,KIT-28,GDD-15 ouDIR. Documento/source/registro de IA completo por etapas conhecidas é preparação revisável, não garantia de nota ou propriedade definitiva. [Pendências008](../execucao/05-pendencias-por-passo.md).

## Publicação e limitações confirmadas

Commit próprio `7ffb58d4e410bd9ee2a95e21f1170a41d130828e`; [PR#10](https://github.com/luccalck/desafio-arcade/pull/10) draft sobre007. [CIpush38434944934](https://github.com/luccalck/desafio-arcade/actions/runs/38434944934) e [CIpr38435010458](https://github.com/luccalck/desafio-arcade/actions/runs/38435010458) SUCCESS; deploys ignorados. GDD gerado localmente:13pA4/363614bytes/pdfinfo exit0/804caracteres,12seções preservadas; páginas alteradas e adjacentes1/11/12/13 inspecionadas, sem corte observado. CI valida o PDF e arquiva seu próprio artefato.

Corrigimos uma leitura com codificação padrãoWindows que havia deformado campos do inventário; reconstruímos os dados com UTF-8 a partir do SBOM/metadados/créditos explícitos. Nenhum texto genérico de modelos de licença foi mantido como autor. Seis componentes não trazem crédito pessoal/titular nos campos inspecionados: @esbuild/win32-x64, @eslint/config-helpers, @rolldown/binding-win32-x64-msvc, argparse, lightningcss e lightningcss-win32-x64-msvc. Licenças estão declaradas; autoria/créditos precisam confirmação na origem antes do aceite final. Não inserimos nomes inferidos.

Tentativa real de solicitar revisãoDaviSouza78:GitHubCLI retornouexit0, mas nenhum request apareceu; API direta retornouHTTP422, informando que o usuário não é colaborador reconhecido para solicitar review. Consulta reviews/requested_reviewers permanece vazia. Não repetimos solicitações nem fabricamos aprovação. Regularizar acesso conforme pendência anterior003/034 e registrar revisão verdadeira antes do merge; não perguntar novamente pelosRAs ou convites já adiados.

Branch padrão atualizada para008 apósCIverde para rastreamento, sem merge/deploy. Registros posteriores acionam CI própria a conferir peloHEAD.


## Atualização vigente —16/10/2026

Lucca confirmou em nome do squad a autoria/originalidade/titularidade e o direito de uso das ferramentas/ativos atuais. A pendência de obter essa declaração está encerrada; as tabelas acima descrevem o estado histórico de13/10. [Fonte e limites](confirmacao-squad-2026-10-16.md). Revisão formal do PR e novos materiais continuam sujeitos ao seu próprio escopo; não inventamos assinatura nem inspeção de documento privado.
