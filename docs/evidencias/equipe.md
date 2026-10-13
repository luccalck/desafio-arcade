# Passo001 — equipe, contexto e marcos

**Data da conferência:** 12/10/2026. **Tarefa:** 001, C01/C02/P01; INT-01/02/09; G0. **Estado:** preparação e identificação parcial executadas; RAs e revisão humana pendentes. Nenhum gate ou integrável foi integralmente aceito.

## Equipe e acordo informado

Lucca informou o nome **Aura 67**, as quatro contas e a concordância da equipe com papéis e revisão. Todos atuam em todas as áreas; o papel indica coordenação. [SQUAD.md](../../SQUAD.md) registra nomes/papéis/contas, com RAs vazios por orientação do responsável.

| Integrante | GitHub | Coordenação | Revisado por | Autoria planejada em pelo menos três INT |
|---|---|---|---|---|
| Lucca Castilho | luccalck | Produto e Game Design | Davi | 01, 02, 04, 05, 06 |
| Davi Paes | DaviSouza78 | Desenvolvimento e Qualidade | Miguel | 03, 06, 07, 08 |
| Miguel Oliveira | miguelsenai2024 | Plataforma e Release | Lucas | 04, 07, 08, 10 |
| Lucas Souza | 6lucassilvaaa | SRE e Segurança | Lucca | 01, 05, 09, 10 |

Essa é distribuição de trabalho a realizar, não contribuição já comprovada. Cada pessoa deve entender problema educativo, regras Python, fluxo do jogo, CI/gates, artefatos, promoção/recuperação, privacidade e evidências, além de explicar seus PRs na banca. Não contar revisão como substituto de autoria, fazer commits vazios ou atribuir os arquivos preparados por Lucca aos colegas.

## Identidade, contas e acesso

- `git config --get user.name`: luccalck.
- `git config --get user.email`: 256704169+luccalck@users.noreply.github.com.
- `gh api user`: login luccalck, nome Lucca Castilho; identidade do solicitante confirmada.
- `gh api users/DaviSouza78`, `users/miguelsenai2024` e `users/6lucassilvaaa`: contas existentes, tipo User.
- `gh api repos/luccalck/desafio-arcade/collaborators`: somente luccalck na conferência. Convites/acessos/revisor do PR seguem como entrada do passo003; não foram configurados neste passo001.

## Fontes efetivamente conferidas

HTML original e extração de texto/JavaScript incluindo abas/ficha; modelo DOCX com tabelas, identificação e declarações; requisitos consolidados; índice C01/C02/P01; GDD, auditoria, políticas/IA/licenças e plano vigente. Os originais foram preservados. Código principal em `C:/dev/studies/senai/semester-2/devops/desafio-arcade/jogo-arcade`.

O [regulamento oficial](https://frameworkdigital.com.br/wp-content/uploads/2026/09/Regulamento-Framework-Arcade.pdf) foi baixado com HTTP200, application/pdf, 323.106 bytes. Capa: edição2026. Foram lidas suas dez páginas (capa inspecionada e conteúdo extraído por pypdf); pdfinfo abre. SHA-256: `02727443c78cd4c815e4ec74c9fe779529801e023a8bd6f540086a13892aa22a`. A cópia consultada ficou no contexto local, sem redistribuir o PDF no repositório.

Diferenças registradas entre fontes:

- O rodapé HTML descreve oito páginas; o PDF consultado possui dez. Usar o conteúdo verificado, sem modificar o original do professor ou presumir uma data de revisão não declarada.
- O DOCX cita itens15.1/15.2 para IA; no PDF consultado o uso de IA está em14.1/14.2. A atividade exige registro/revisão/licenças; não amplia seu escopo por essa diferença.
- O modelo contém CPF, assinaturas e aceite dos termos do concurso. Dados sensíveis/assinaturas não entram no Git público; concordância acadêmica com papéis não é inscrição nem aceite de termos.

Concurso permanece opcional, sem decisão/autorização de inscrição. Equipe excepcional de três/cinco não se aplica à composição de quatro informada; não marcar inscrição, elegibilidade ou aceite como concluídos. A plataforma da atividade permanece obrigatoriamente WEB.

## Marcos: evidência disponível

`git log --reverse --date=iso-strict` mostra o primeiro commit do repositório em07/10/2026 (`c04b8fa`); o primeiro ciclo de código está em07/10 (`e6d4ad6`). Não há evidência no Git consultado de registro em02/10 ou prévia em05/10. Isso não prova eventos fora deste repositório; permanecem sem confirmação. `git tag -n` e `gh release list` retornaram vazios. Não criar tags/data retroativas.

Revisão do PR principal, dez PRs revisados, colaboração efetiva, prévia/tag, prazos operacionais e envio/banca continuam pendentes de evidência/dados humanos. O horário19:00 do exemplo não é confirmação de horário real.

## Ficha e checks deste passo

O rascunho do HTML original no Live Server recebeu Aura67 e os quatro papéis distintos confirmados. Nomes já estavam preenchidos; RAs continuam vazios. Nenhum INT foi marcado entregue, nenhuma declaração aceita e TXT não foi gerado. Estimativas10 anteriormente solicitadas permanecem estimativas.

Fechamentos específicos: OBJ-08 (leitura do regulamento), SQ-01 (nome), SQ-03 (papéis), FIC-01 (nome na ficha), FIC-07 (papéis distintos). Fonte dos estados: [checklist](../gestao/checklist-avaliacao.md).

## Git e continuidade

Branch curta: `feature/passo-001-equipe-contexto`, baseada na candidata71933bf para preservar o código existente. PR do passo sobre `feature/primeiro-ciclo` isola estas alterações enquanto o PR principal#2 ainda aguarda revisão para main. Esse PR intermediário não equivale a integração na main nem aprovação final. CI por push da branch executa o workflow existente; publicação do preview só ocorre na branch candidata configurada.

Não foram executados002/003, convites, promoção, release ou aceite próprio. Revisão prevista por DaviSouza78 depende de acesso confirmado e ação humana. G0 continua incompleto; preparação independente posterior não libera automaticamente seus aceites.

## Publicação e validação desta preparação

Commit `72d2b6f8a743a6d52213948e9cda546964e61377`, de autoria Git confirmada de luccalck, publicado na branch curta. [PR#3](https://github.com/luccalck/desafio-arcade/pull/3) aberto como rascunho sobre a candidata, sem merge e sem revisão humana registrada.

[CI38336896510](https://github.com/luccalck/desafio-arcade/actions/runs/38336896510), para esse SHA: concluída com sucesso; qualidade, segurança, E2E, build e gate ci verdes. Publicação de preview ignorada conforme condição existente de branch. Não representa homologação ou produção deste passo.

Validações locais: `git diff --check` sem erros; verificador de links Markdown: 81 arquivos, zero caminhos locais ausentes; verificador do plano: 40 passos, dez consecutivos por integrante, 313 checks do mapa cobertos uma vez, dependências anteriores sem ciclo. Checklist atual: 108 marcados e 304 abertos. Hook Gitleaks sem vazamentos no commit. Originais HTML/DOCX conferidos por SHA-256 e preservados.

Captura real do rascunho da ficha arquivada apenas no contexto local: `.contexto/passo-001/ficha-squad.png`. A captura não constitui ficha final ou envio.
