# Consolidação dos roteiros e acesso aos materiais

Reorganização solicitada por Lucca em13/10/2026. Mantemos uma fonte de código e25MDs de execução: Lucca10; Davi5; Miguel5; Lucas5. Os40IDs originais continuam no controle, no mapa de checks e no registro único de pendências. Não executamos etapas011–040 ao reorganizar seus prompts.

## Cobertura comprovada

[Mapa auditável](07-mapa-consolidacao.json): trinta fontes locais foram lidas e agrupadas em quinze arquivos, duas etapas por MD. Preservamos256ocorrências de checks atribuídos e148ações numeradas, inclusive dependências, arquivos-alvo, validações, encaminhamentos, licenças/IA, eliminatórios, pesos/rubrica/F1, revisão e commit pela própria identidade. Originais de trabalho foram salvos byte a byte em.contexto/reorganizacao-5-mds/fontes; o históricoGit também conserva as versões anteriores. As alterações preexistentes dos MDs futuros foram incorporadas aos novos arquivos; não foram descartadas.

| Pessoa | MDs vigentes | Etapas rastreáveis |
|---|---:|---|
| Lucca Castilho |10preservados |001–010 |
| Davi Paes |5 |011–012,013–014,015–016,017–018,019–020 |
| Miguel Oliveira |5 |021–022,023–024,025–026,027–028,029–030 |
| Lucas Souza |5 |031–032,033–034,035–036,037–038,039–040 |

[Índice](00-indice-geral.md) contém todos os links/dependências. O mapa313checks do snapshot mantém IDs/textos; checklist principal continua115marcados/297abertos. Nenhum check, gate ou contribuição humana foi encerrado por esta reorganização.

## Clareza e correções de coerência

Cada arquivo manda executar ambas as etapas em ordem, registrar duas seções de pendências/status separadamente, reutilizar branch/PR e não executar o próximo MD automaticamente. Preparações independentes podem continuar quando faltar ação humana; promover produção exige entradas/aceites reais. Dados confirmados vêm deSQUAD; RAs seguem adiados.

A leitura independente por outro agente de IA encontrou e ajudou a corrigir duas lacunas antigas: contrato019 não depende mais de desenvolvimento futuro022/023 para a primeira produção; rollback básico018/019 continua obrigatório, evolução fica comMiguel. Etapa015 deve compatibilizar tags autorizadas/refs/environments mantendo proveniência/reviewer/sem bypass, pois configuração atual sómain não atende o fluxo da tag035. A etapa035 confere esse contrato antes de criar a tag. Não implementamos essas funções futuras neste ajuste de documentação.

Perguntas de leitura respondidas: Davi começa pelo011-012; executa ambas; PRD não espera022023, mas exige baseline018019/approval; rubrica exige pelo menos10PRs reais revisados no squad, autoria com commits/PRs aprovados em pelo menos3INT por pessoa e participação na banca. Cinco MDs não são limite ou mínimo artificial de commits. Vídeo/pitch, relatório≤12p, painel, release/tag, triagem, manifesto/ficha/AVA/banca e condicionais continuam nos prompts completos.

A revisão por IA avalia coerência documental; não é revisão humana requerida pelo professor nem aceite dos colegas. Os links relativos e âncoras dos novos arquivos são validados localmente; execução futura e direitos/participação continuam dependentes das provas reais.

## Acesso peloGitHub

[PortalStitch](../images/stitch-009/README.md): seis telas, mascote, prompt, manifesto/proveniência/conferência eZIP original comchecksum ficam versionados neste repositório. Conferimos bytes idênticos ao manifesto009; varreduraGitleaks doZIP com profundidade1 e configuração do projeto terminou sem achados. Isso não substitui revisão coletiva de direitos. Não publicamos credenciaisGoogle ou aceites pessoais.

Ver os exports noGitHub/clone não exige contaStitch. Editar o projeto noGoogle exige conta autorizada ou compartilhamento no próprio serviço; publicar os arquivos não libera essa permissão. HTMLs noZIP são referências com divergências/CDN, não o jogo implementado ou uma demonstração de execução.

PDF/build/relatórios daCI podem ser baixados noGitHubActions, sujeitos à retenção; releases formais receberão anexos conforme015/035. Vídeo, produção formal e pacote final ainda pendentes não são materiais disponíveis. A documentação administrativa ignorada.contexto não é entrega acadêmica nem fonte alternativa de código.

## Publicação

Preparação desta organização é de LuccaCastilho/luccalck, com assistência doCodex e revisão documental por IA registrada. Não é contribuição deDavi/Miguel/Lucas. Commit/PR/CI reais serão registrados após publicação; main/revisão/aprovação continuam preservadas.
