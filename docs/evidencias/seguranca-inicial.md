# Passo004 — Segurança inicial e privacidade

**Data:**13/10/2026, America/Sao_Paulo. **Responsável:**LuccaCastilho/luccalck. **Escopo:**004/S01/S02, INT05/08/03, preparaçãoG0/G2. **Fonte executada:**`781af0f9627b453aab3c616577cd539d2b64257f`, versão0.6.0. Nenhum comportamento/dependência/workflow do jogo foi alterado.

## Dependabot: investigação e ativação reais

PrimeiraAPI: alerts403desativados; vulnerability-alerts404 e necessidadeadmin:repo_hook; securityupdatesdisabled. YAML semanalnpm/github-actions presente na branchpadrãofeature/primeiro-ciclo, blobbe719fac4c5956c423ea47f3dd3855814bb7899b. Não havia PRs do Dependabot ou runs com esse nome nas80execuções consultadas; isso não prova ausência de logs fora dessa consulta.

A aba temporária de Settings no IAB não estava autenticada e mostrou404/Signin; não alteramos configuração pela UI nem capturamos senha/token. Solicitamos autenticação ao responsável, que respondeu“pronto”. Depois: PUTvulnerability-alerts passou; GETvulnerability-alerts confirmou habilitado; PATCHsecurity_and_analysis habilitoudependabot_security_updates; GETalerts retornouHTTP200/total0/abertos[]. Secret scanning e push protection enabled preservados.

I05-06 encerrado quanto à ativação verificada/configuração do serviço. Não alegamos atualização ou PR do bot executado. Monitorar próxima verificação/Dependencygraph e CI dos futurosPRs; se a base temporária impedir CI, corrigir no007/restauração da main antes de merge. Sem mergeautomático de PRDependabot habilitado neste passo.

Fontes oficiais: [configurar versionupdates](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configure-version-updates), [securityupdates](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-security-updates). YAML não foi alterado só para produzir atividade artificial; já atende npm/Actions semanais.

## Scanner, audit, SBOM e hook

- `npm audit --omit=dev --audit-level=critical --json`: exit0, total/críticas0; scopeprodução, não diagnóstico de todas as ferramentas de desenvolvimento.
- `npm sbom --sbom-format cyclonedx`: exit0, formatoCycloneDX1.5,158componentes. Arquivo local e CI por SHA; não é anexo de release final já executada.
- `gitleaks git --redact --config .gitleaks.toml --report-format json`: exit0,43commits/3,13MB/zerodetecções na conferência.
- Hookconfigcore.hooksPath=.githooks; shellset-eu, scannerstaged/--redact, falha se scanner ausente ou detecção. CI incluiu fetch-depth0 e gateci agrega status, sem ignorar erro de segurança.
- Ensaioisolado `gitleaks dir`: fixture local claramente sintética/nãoemitidaporserviço, exit1/uma detecção generic-api-key, SecretREDACTED. A fixture não foi commitada/publicada nem usada para autenticar.

As duas primeiras fixtures não foram detectadas; investigamos o config oficial8.30.1 e confirmamos stopwordscredential/not_/only na allowlist. O terceiro valor sintético sem essas palavras validou a detecção e exit1. Isso não é bug real ou segredo vazado; não representamos as tentativas anteriores como detecção. Regras de produção não foram enfraquecidas.

## Privacidade: código e rede observados

Inspecionamos src/core,content,scenes e pages/index.html: sem APIremota/analytics/telemetria no jogo. O editor usa interpretadorAST local; não solicita cadastro/email/localização. LocalStorage: rota-do-codigo:workshop-python:v5, sources:v5 e settings:v1; fallback na sessão quando indisponível. Resetpreservaoutrascampanhas; preferências têm chave própria.

CarregadorPagesconsulta rollout.json/version.json da mesma origem e guarda somente SHA em sessionStorage(rota-do-codigo:preview:selected); não é contagem de partidas ou identificador pessoal.

Executamos Playwright/Chrome headless com bundle local, rota monitorada e bloqueio de qualquer origem externa, via UI: cinco funções corrigidas/casos, final testado, pilotagemcurta, pausa, opções e reload. **6requests, somenteGETlocal;0externas,0WebSockets,0cookies;3chaveslocalStorage;sessionStoragevazia no acesso direto ao jogo.** Na oficina apareceu textarea code-editor; nas opções somente checkboxeslarge-text/reduced-motion. Não apareceu formulário de dado pessoal. Evidência .contexto/passo-004/privacidade-rede.json e captura real do menu; scriptadministrativoignoradopeloGit.

Limites: navegaçãoautomatizada local, não playtesthumano, mediçãoDORA ou auditoria completa de todo dispositivo/versãofutura. O loader foi inspecionado em código; esta rodada não declarou teste de rede do Pages/loader. DIR-09 continua reconferênciafinal; DIR-12 fecha declaração explícita no README. Nenhuma telemetria/ranking/Opal/Godot foi acrescentada.

## Política e permissões

SECURITYdocumenta gates, atualizações, hook, tratamento de vulnerabilidades e revogação de exposição real. Permissões da CI preservadas; não ampliamos tokens/jobs nem lemos credencial. A atualização de autenticação foi concluída pelo responsável, sem senha/token no chat ou relatórios. Confirmação coletiva de direitos/política/participação SRE continua geral para revisão/aceite, sem atribuir contribuição fictícia a Lucas.

Fontes originais/roteiros lidos nesta sessão e reconferidos: HTML integral/abas/script, DOCX/GDD, checklist/auditoria/índice, S01/S02, README/SQUAD/IA/licenças/security/workflow. HTML/DOCX com hashes originais preservados. DadosRAs/acessos seguem orientaçãoanterior, sem repetir perguntas ou testar contas de colegas.

## Integridade dos relatórios locais

- `npm-audit-producao.json`: `45f32926bbc45854030c208f93209553236bce3c999af6f7dc7f9cc979395f3e`.
- `sbom.cdx.json`: `0f820932fa84b6e5c7ded7c15641bb7ac74469c63b8b9852a7e699581150e695`.
- `gitleaks-historico.json`: `37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570`.
- `gitleaks-fixture.json`: `ed9005fadc6b9eb379be3030e471bca651bff37f34da787889ca55f3a8ad3b1b`.
- `privacidade-rede.json`: `e8b721e9a9649cdcadb8ec806a9e96f579d00f3fabd83296ee3d07c159575f3f`.

Relatórios/logs/configs de ensaio em .contexto/passo-004, ignorado. CI fornece seus próprios artefatos verificáveis depois do push. [Registro único de pendências](../execucao/05-pendencias-por-passo.md). DIR-12/I05-06 fechados; G0/INTinteiros/declarações coletivas não fechados por esta execução.
