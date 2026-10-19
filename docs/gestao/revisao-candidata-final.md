# Revisão humana da candidata final — PR #47

Este roteiro prepara a aprovação real da candidata; não é uma aprovação, um log de testes ou autorização para usar a identidade de outra pessoa. A aprovação de Davi no PR #41 já foi usada na integração daquele diff. O pitch posterior e a preparação da versão 1.0.0 estão no PR #47.

## Prompt para o integrante revisor

Sou um integrante real do squad Aura 67. Revise o PR #47 de `luccalck/desafio-arcade`, com minha própria conta GitHub. Confirme comigo a titularidade da conta antes de publicar: DaviSouza78, miguelsenai2024 ou 6lucassilvaaa. Se estiver autenticado como luccalck, pare antes da aprovação: essa é a conta autora. Não compartilhe nem grave credenciais.

Leia as instruções do repositório e o diff completo contra a main. Consulte e anote o HEAD atual pela API no início e no fim; se mudar, revise as alterações adicionais. Preserve arquivos locais e use um checkout isolado. Não altere o PR durante a revisão sem combinar uma correção.

Confira a CI do HEAD final: lint, 322 testes, 37 cenários E2E, segurança, bundle e PDFs. As quantidades são referências das execuções anteriores; relate o resultado efetivamente observado. Verifique SemVer 1.0.0 no package/lockfile/notas/GDD, as doze seções do GDD e o relatório de até 12 páginas. Notas de versão e conteúdo produzido com IA precisam da sua revisão real.

Assista ao pitch de 86 segundos e confira áudio fornecido, legendas bold de até duas linhas, cortes, créditos e inventários. O arquivo existente é uma captura da produção 0.7.0/e9, corretamente identificada. A candidata ainda será publicada e capturada no SHA correspondente antes de validar o vídeo do pacote final. Não aprove uma atribuição falsa da gravação antiga à versão 1.0.0.

Examine os scripts de autoria: capturar.py conserva o version.json comparado ao ZIP; editar-elevenlabs.py deriva versão/SHA desse registro e confere sua correspondência. A nova execução com a captura original produziu o mesmo MP4 byte a byte, sem acelerar voz ou simulação. As regras do jogo não mudaram nessa preparação.

Confira os manifestos contra os blobs do Git: 63 arquivos no manifesto do pitch e 13 no manifesto de fechamento da candidata. A regra .gitattributes preserva os dois recibos CRLF originais. Compare bytes e SHA-256; não aceite alterar hashes para esconder uma divergência de origem.

Confira os recibos originais do PR #41: run 38991328634 verde, merge 4678830, HML em 175,423 segundos, produção/smoke e sondas aprovados. O prazo configurado está vencido e a tag 1.0.0, o pacote acadêmico e a declaração de triagem ainda não foram concluídos. Esses limites devem permanecer verdadeiros. Não confunda autoavaliação 10 com nota oficial, ensaio técnico com incidente espontâneo ou sessão de IA com playtest humano/banca.

Se encontrar impedimento, registre arquivo/linha/reprodução na revisão e não aprove. Se o diff estiver correto e a CI final estiver verde, envie efetivamente uma revisão APPROVE pela minha conta. Confirme pela API o autor, estado APPROVED, commit_id e URL oficial. Um relatório apenas local não libera a proteção.

Ao concluir, crie RELATORIO-REVISAO-PR47.md local com conta/nome do revisor, HEAD inicial/final, escopo, comandos/resultados reais, URLs das CIs, integridade dos manifestos, achados/limites e URL da revisão publicada. Se não publicou a revisão, declare expressamente isso. Não invente testes, consentimentos ou presença humana.

Não faça merge, tag, deploy, alteração de proteção, liberação de prazo ou geração de ficha. A continuidade operacional será conduzida pelo Lucca. Revisar não exige commit: não crie alterações artificiais para aparentar contribuição.
