# Pacote de submissão — procedimento de fechamento

Atualização:16/10/2026. INT-03/06/09/10; R07; G6–G8. A automação existe, mas o pacote acadêmico ainda não foi gerado: o pitch real da produção0.7.0foi produzido,mas a vinculação à candidata final/origemSUCCESS e as demais entradas finais ainda precisam ser concluídas. Não criar arquivos fictícios nem montar submissao manualmente.

## Estrutura exata

```text
submissao/
├── GDD.pdf
├── LINK_DO_JOGO.txt
├── build.zip
├── pitch.mp4
├── MANIFESTO.sha256
└── submissao-manifest.json
```

Os cinco primeiros são exigidos no HTML; o JSON adicional é o recibo de proveniência da implementação. O manifesto cobre os quatro arquivos de conteúdo, sem tentar conter seu próprio hash. Dentro de build.zip: index.html, game.js, style.css, version.json, LEIA-ME.txt, LICENSE.txt e THIRD_PARTY.txt. LEIA-ME explica descompactar e abrir index.html offline. O GDD completo mantém as doze seções do modelo, identificação e Esteira; as quatro seções mínimas verificadas pela triagem não substituem o documento inteiro. O relatório técnico PDF de até12páginas e a fichaTXT são entregues separadamente do pacote obrigatório.

## Ordem sem dependência circular

1. Concluir código/documentação da candidata acadêmica e sua revisão. Para tagv1.0.0, package.json, lockfile e notas precisam declarar1.0.0; não mover a tagv0.7.0 nem chamá-la de entrega final.
2. Integrar por PR/CI e executar a esteira normal na main, com CI/HML/PRD/monitor e aprovação. Esta execução precisa terminar SUCCESS: entrada-video.yml rejeita uma run globalmente falha, mesmo que o deploy-prd isolado tenha passado. A retomada técnica da Release0.7.0 não altera a conclusão vermelha de38852413982.
3. Manter essa produção congelada para gravar o pitch ≤90s, com legendas, direitos e consentimentos pertinentes. Anotar SHA/versão/build/ZIP reais. Não produzir nova build para a gravação.
4. Disponibilizar o MP4 real em uma origem aceita pelo workflow: artefato pitch-video de uma run ou asset autorizado. Fonte, ID e SHA256 devem existir; não preencher agora. Validar pela entrada-video.yml na main, fornecendo a run/tentativa da produção filmada e confirmações verdadeiras de direitos/legendas.
5. Registrar run/tentativa/headSHA do workflow de vídeo e SHA256 do MP4 nas variables abaixo. Reconferir que a produção continua no mesmo SHA/ZIP.
6. Criar tag anotadav1.0.0 no mesmo SHA aprovado e já filmado. A esteira da tag gera seus artefatos rastreáveis e promove o mesmo ZIP entre HML/PRD; a reprodutibilidade mantém os bytes do jogo desse SHA. Não mudar arquivos entre produção filmada e tag.
7. Com SUBMISSAO_ENABLED=true e entradas válidas, o jobsubmissao espera CI/pacote/PRD/Release, baixa vídeo validado e bundle da própria tag, confirma hashes/recibo/smoke, gera pacote e executa scripts/triagem.sh. Só concluir com TRIAGEM APROVADA real nessa tag.
8. Baixar o artefato gerado, conferir arquivos e proveniência; fixar seus IDs/digest para vigilância. Habilitar triagem-agendada apenas depois disso, executar primeiro dispatch e comprovar também o agendamento.
9. Atualizar o relatório com resultados reais de Release/triagem depois das execuções. Gerar esse PDF em CI documental e identificar separadamente o SHA documental e o SHA da versão entregue. Não alterar o ZIP/GDD/vídeo/manifesto já aprovados nem recompilar o jogo para incluir o relatório. Anexar ao AVA o PDF da CI correspondente e registrar seu link real na ficha.
10. Por último, conferir as declarações da ficha, preencher o HTML original, gerarTXT e realizar envio/recibo/ensaio/banca. Não marcar aceite para contornar validadores.

Se uma alteração de código for necessária após a gravação, parar o fechamento: revisar/produzir nova candidata e revalidar ou refazer a gravação correspondente. Não misturar vídeo de um SHA com outro pacote. Atualização documental posterior deve preservar a produção congelada; coordenar a flagdePRD antes de integrar documentos para não promover outro SHA por acidente.

## Entradas reais e flags

| Configuração | Como obter / condição |
|---|---|
| SITE_URL | URLHTTPS real da raiz pública, sem credenciais/query/fragmento |
| RELEASE_NOTES_SHA256 | SHA256 dos bytes LF de docs/notas-versao.md no commit aprovado; não hash da cópiaWindows comCRLF |
| FORMAL_HML_ENABLED / FORMAL_PRD_ENABLED / FORMAL_RELEASE_ENABLED | Flags da esteira; preservar gates e aprovação do environment |
| VIDEO_VALIDATION_RUN / VIDEO_VALIDATION_ATTEMPT | ID/tentativa da entrada-video.yml que terminou SUCCESS |
| VIDEO_VALIDATION_SHA | head_sha real dessa execução de validação, conferido pelaAPI |
| VIDEO_SHA256 | Digest do MP4 autorizado, igual ao vídeo validado |
| SUBMISSAO_ENABLED | Somente habilitar quando vídeo, candidata, notas, direitos e prazo estiverem conferidos |
| PRAZO | Data/hora oficial aplicável com fuso, fornecida e confirmada; não presumir19:00 ou inventar uma data para passar |
| SUBMISSION_SHA / SUBMISSION_TAG | SHA e tag reais da submissão aprovada |
| SUBMISSION_RUN_ID / SUBMISSION_RUN_ATTEMPT | Execução/tentativa real que gerou o pacote final |
| SUBMISSION_ARTIFACT_ID / SUBMISSION_ARTIFACT_DIGEST | ID/digest sha256:… do artefato remoto exato, pelaAPI |
| TRIAGEM_AGENDADA_ENABLED | Somente depois de pacote existente e referências fixadas; comprovar execuções |

Variables são configurações não sensíveis. Credenciais ficam em secrets/token do job, nunca em arquivos, gravações, prints ou prompts.

## Comandos de referência, sem executar antecipadamente

Os comandos abaixo descrevem a automação existente; não são comprovantes de uma execução final:

```text
node scripts/submissao.mjs create <bundle-original> <pitch-real.mp4> <SITE_URL> submissao
node scripts/submissao.mjs verify submissao
bash scripts/triagem.sh submissao
```

A criação ocorre no job da tag, com variáveis de proveniência e recibos correspondentes. O script exige vídeo não vazio, bundle/ZIP/versão/SHA/data, origem do workflow de vídeo e produção coerentes. O job da esteira exige a Release concluída; o publicador é quem valida notas/proveniência/anexos. A triagem executa pdfinfo, ffprobe e smoke; confere exatamente quatro integrantes, prazo e manifesto. O modo vigilancia não reescreve a data de entrega ou simula aprovação de submissão atrasada.

## Aceite e arquivo de evidências

Conservar logs de triagem, IDs/URLs de run e artefato, checksum, versão, recibo de produção e confirmação de cada arquivo abrindo. Não chamar um job skipped, teste com fixtures ou draft de entrega final. A ficha persistente é docs/gestao/ficha-entrega.md; o TXT continua para o último passo. O arquivo de pitch existe e foi validado tecnicamente; sua entrada com proveniênciaSUCCESS e o prazo aplicável ainda não são configurações finais resolvidas.


Pitch disponível16/10: [arquivo/fontes](pitch/README.md),79,96s,com voz sintética. A produção capturada ée9/v0.7.0; não usar esseSHA como se fosse a futura candidata1.0.0. O script permite nova captura real depois da publicação aprovada,sem trabalho manual de edição repetido. Não modificar o validador para aceitar a run globalfailure38852413982/2.
