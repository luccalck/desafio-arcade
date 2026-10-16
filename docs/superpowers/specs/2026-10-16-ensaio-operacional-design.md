# Ensaio operacional de recuperação e alertas

Proposta técnica de 16/10/2026. Estado: abordagem recomendada aprovada por Lucca no chat em16/10/2026; implementação e execução ainda precisam de evidências. Escopo: INT-07/08, passos016/018/022/023/024/026/028. Não substitui revisão externa do PR nem playtest humano, consentimento, pitch ou banca.

## Abordagens consideradas

1. Recomendada: falhas de rede controladas no observador de uma candidata nova, com recuperação real do ponteiro pela pipeline. O jogo público continua acessível; documentamos explicitamente que a falha é injetada no cliente/observador, sem fingir defeito espontâneo na aplicação. As medições de recuperação e as chamadas GitHub/Pages são reais. Limite: isso comprova resposta da esteira à injeção, mas não substitui automaticamente o pedido específico de versão defeituosa na banca.
2. Candidata deliberadamente defeituosa: alteração explícita e revisada numa nova versão, construída e identificada como ensaio. Permite a demonstração literal, mas expõe parte da sessão ao defeito e exige regras transparentes de CI para a variante de ensaio; não aceitaremos desativar silenciosamente gates ou publicar bytes diferentes do ZIP aprovado.
3. Somente testes locais: seguros e disponíveis, mas não medem Pages, recuperação operacional ou alertas reais; insuficientes para encerrar os critérios.

## Proposta recomendada

Workflow manual exclusivo de ensaio na main, environment producao e revisão do código por outro integrante preservados. Entradas limitadas a uma candidata identificada por SHA/run/tentativa e baseline atual comprovada. Nenhum SHA arbitrário ou alvo externo livre. Preservar releases imutáveis e promover o ZIP original da CI; nenhuma recompilação ou edição manual de gh-pages.

Publicar candidata nova saudável, conferir sete hashes e manter um observador HTTP independente da raiz durante toda a janela. Depois da promoção, injetar uma falha de transporte apenas no navegador do smoke de ensaio, produzindo uma falha efetivamente observada e um relatório que identifica a injeção. Encaminhar o exit code ao mesmo caminho de recuperação já usado por produção; manter o job original vermelho e arquivar logs. Verificar restauração do ponteiro, retirada da candidata, propagação Pages, sete hashes da baseline e smoke da raiz. Cronômetro desde início da falha até confirmação pública, sem subtrair filas/esperas/repetições; meta menos de300s. Se exceder ou falhar, preservar o resultado e corrigir por PR.

Executar um segundo ciclo explicitamente manual para comprovar rollback.yml, com motivo ensaio-controlado, validações equivalentes e aprovação protegida. Não usar smoke-falhou ou incidente como justificativa de um ensaio inexistente. Cada candidata deve ter identidade nova; não reutilizar uma release retirada ou sobrescrever seu diretório.

## Dois alertas e MTTR

Utilizar sondas HTTP verdadeiras sob falha controlada de rede e latência superior a2s medida ponta a ponta, com isolamento de alvo e marcador de ensaio. Uma indisponibilidade apenas do endpoint de ensaio não será registrada como queda espontânea da produção. Não preencher tempo/código manualmente nem publicar fixtures no CSV formal. Issues devem identificar claramente ensaio, origem/run, alvo, horários de abertura/recuperação, deduplicação e autocerramento.

DORA deve distinguir ensaio de operação normal: mostrar duração real da Issue de ensaio num resultado próprio, e não transformar essa duração em MTTR de incidente espontâneo. Qualquer inclusão de ensaio nas métricas deve ser explícita na definição, com fontes e comparação separadas. Hoje MTTR de produção segue sem amostra. A validação do professor determinará se o ensaio atende ao critério de alerta tratado; o relatório não antecipará essa aprovação.

## Validação e abortar

Testes negativos de permissões/ref/SHA/tentativa/recibo/injeção desativada por padrão; regressões para não misturar alertas de ensaio com alertas operacionais. Monitor periódico normal continua ativo. Desligar a injeção e recuperar pela pipeline ao atingir limite, erro de versão ou sinal de interrupção da URL; registrar o ocorrido sem apagar provas. Não obter sucesso com alteração de proteção, segredo, incidente ou participante fictício.

## Dependências atuais e entregas

PR34 HEAD95bdd7a com CI verde ainda não tem aprovação externa. Código novo só poderá integrar/deployar após revisão de outra conta. Identidade atual: luccalck; não há autoaprovação possível. Entregas futuras: workflow/scripts/testes, Issue de ensaio quando ele existir de fato, relatórios JSON/JUnit/CSV, capturas reais, hashes e manifesto de evidência, atualização de GDD/relatório/pendências. Pitch e TXT mantidos para o final; pacote acadêmico completo continua exigindo o MP4 real.

Detalhe de isolamento: os dois alertas serão exercitados com servidor HTTP temporário no próprio runner, respostas404 e atraso real de2,2s, sem backend do produto ou indisponibilidade pública. Isso é ensaio de detecção/reconciliação real, não incidente da produção. Marcadores e MTTR de ensaio separados impedem contaminar o painel operacional.

Proteção adicional: Issues do ensaio recebem label ensaio, não alerta. Assim o coletor antigo já em produção também não as absorve como incidentes antes da integração do filtro novo. Isso não será declarado como atendimento literal do requisito de incidentes operacionais com label alerta.
