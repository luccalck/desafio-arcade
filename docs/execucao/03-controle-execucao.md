# Controle da execução humana e técnica

A tabela mantém quarenta etapas para rastreamento, apesar dos25MDs vigentes. Cada MD novo executa duas etapas: atualizar ambas as linhas separadamente, sem registrar etapa não executada. O estado de cada passo consta abaixo. Prompts entregues não significam função implementada/validada ou autoria dos colegas. Atualizar com SHA/run/PR/revisor/dados reais; não preencher colunas com identidade de outra pessoa. Checklist principal é a fonte dos checks.

| Passo | Responsável | Estado | Commit/PR da própria conta | Revisão de outro autor / CI | Checks/evidências fechados | Dependência humana restante |
|---|---|---|---|---|---|---|
| 001 | Lucca Castilho | Preparação executada; identificação parcial | 72d2b6f; PR#3 rascunho sobre candidata | CI38336896510 verde; DaviSouza78 indicado, revisão pendente | OBJ-08, SQ-01, SQ-03, FIC-01, FIC-07; docs/evidencias/equipe.md | RAs adiados; acesso; marcos sem prova; participação futura; revisão como requisito geral; G0 incompleto |
| 002 | Lucca Castilho | Escopo técnico concluído; integração separada | b79828c; PR#4 rascunho sobre passo001 | CI38339356756/4d9acf4 verde; revisão no requisito geral | I04-01–06/15 e I06-01–03 revalidados; baseline-tecnico.md; nenhum novo check fechado | Nenhuma conferência específica para encerrar002; obrigações gerais/aceites G0/G1 preservados |
| 003 | Lucca Castilho | Preparação executada; convites enviados | 25ba5e7; PR#5 draft sobre002 | CI38342833196/25ba5e7 verde; revisão geral pendente | KIT-14/I01-03; configuracao-github.md; proteção/HTTP/ambientes reconferidos | Convites final034; PR2 auto-merge aguardando aprovação; defaultmain após merge; jobs/migração007/011/019; G0/G1 incompletos |
| 004 | Lucca Castilho | Segurança inicial validada; aceites gerais separados | ba7494b; PR#6 draft sobre003 | CI38345279238/ba7494b verde; revisão geral pendente | I05-06/DIR-12; seguranca-inicial.md | Reconferênciafinal/privacy/Dependabot e participação/revisão gerais; G0 não aceito |
| 005 | Lucca Castilho | GDD/PDF validados; identificação parcial | 214736a; PR#7 draft sobre004 | CI38346858370/214736a verde; revisão geral pendente | SQ-06; gdd-revisao.md;12seções/804chars/13páginas | RAs/GDD-13; direitos/revisão gerais; release/links finais |
| 006 | Lucca Castilho | Roteiro preparado; preview validado | 1e0b4b5; PR#8 draft sobre005 | CI38348580349verde; revisão geral pendente | I04-07 revalidado; regressao-hml.md;17locais/5públicos | Execução formal011 e smoke014/019; G3 não aceito |
| 007 | Lucca Castilho | CI/contratos preparados; clone validado | a2016fd; PR#9draft sobre006 | CI38428808065verde; revisão geral pendente | KIT-09; ci-formal.md;184testes+17E2E/pacote83arquivos | RecebimentoI03-24, scripts/deploy011019, KIT-08 futuro; G3/G4 não aceitos |
| 008 | Lucca Castilho | Inventário/auditoria preparados; aceites humanos separados | 7ffb58d; PR#10draft sobre007 | CIpush38434944934/CIpr38435010458verdes; reviewAPI422/acesso pendente | I05-10/12/13 revalidados; direitos.md/158componentes/26ativos |16checksassignedhumanos/contínuos/final; sem aceites coletivos |
| 009 | Lucca Castilho | Escopo técnico documentado/validado; aceites humanos separados | bca6a71; PR#11draft sobre008 | CIpush38442245309/PR38442289110 verdes; revisão pendente | I02-15; stitch-ux.md,6telas/17E2E locais | G1/quatro, Desenvolvimento/direitos/playtest |
| 010 | Lucca Castilho | Base técnica/offline validados; repasse preparado | c56df79/0f0104c; PR#12draft sobre009 | CIpush38444743006/PR38444831221 verdes; clone184testes/18E2E; revisão pendente | I06-01–06/13/14/16 revalidados; offline-integridade.md | G0/G1/G2, revisão/direitos/acessos/recebimentoDavi |
| 011 | Davi Paes | Implementado e validado; HML formal pendente | b3d5353; PR#15 sobre candidata documental | CIpush38501135262/CIpr38501139202 SUCCESS; revisão miguelsenai2024 solicitada | deploy-hml.md; pacoteCI real107arquivos e ensaio semrebuild; nenhum check formal fechado | main revisada/G0–G2, Pages/origem/UX, medição push→HML/G3 |
| 012 | Davi Paes | Sondas publicadas; monitor operacional pendente | b3d5353; mesmo PR#15 | CIpush38501135262/CIpr38501139202 SUCCESS; revisão humana pendente | I08-01: workflow/cron versionados; sondas.md | 011/019/G4, dispatch404 por ausência na default, observabilidade/schedule e amostras formais |
| 013 | Davi Paes | Técnica validada; playtest humano pendente | 909ac53; PR#16 sobreMD1 | CIpush38502833358/CIpr38502867894 SUCCESS; revisão Miguel solicitada | aprendizagem-conteudo.md;194testes, alternativas/fonte/AST/CPython e buildinválido bloqueado | B-01/B-02/playtest021, originaisP05/D02, revisão e gates humanos |
| 014 | Davi Paes | Smoke e bloqueios validados emCI; operação pendente | 909ac53; mesmo PR#16 | CIpush38502833358/CIpr38502867894 SUCCESS; revisão humana pendente | smoke-prd.md;28E2E/194testes/PDF19p; runner bloqueiaCSS404; nenhum checkformal fechado | 011formal, chamadas/produção019 e recuperação022; I04-10/G4 abertos |
| 015 | Davi Paes | Contratos validados emCI; release operacional pendente | 389b1b0; PR#17 sobreMD2 | CIpush38504617087/CIpr38504677552 SUCCESS; revisão Miguel pendente | releases.md;204testes/28E2E; pacote157arquivos verificado; tags/anexos preparados | main/HML011/PRD019, políticas de tags, notas/hash humanos, tag/release035/reruns, v0.1.0 histórica |
| 016 | Davi Paes | Alertas validados emCI; sem incidente operacional | 389b1b0; mesmo PR#17 | CIpush38504617087/CIpr38504677552 SUCCESS; revisão humana pendente | I08-09 label/API; I08-15 confirmaçãoDavi; testesmock dealertas | Monitor012/G4/main, runs/Issues reais/026/DORA024; semoutage fictício |
| 017 | Davi Paes | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 018 | Davi Paes | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 019 | Davi Paes | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 020 | Davi Paes | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 021 | Miguel Oliveira | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 022 | Miguel Oliveira | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 023 | Miguel Oliveira | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 024 | Miguel Oliveira | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 025 | Miguel Oliveira | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 026 | Miguel Oliveira | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 027 | Miguel Oliveira | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 028 | Miguel Oliveira | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 029 | Miguel Oliveira | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 030 | Miguel Oliveira | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 031 | Lucas Souza | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 032 | Lucas Souza | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 033 | Lucas Souza | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 034 | Lucas Souza | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 035 | Lucas Souza | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 036 | Lucas Souza | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 037 | Lucas Souza | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 038 | Lucas Souza | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 039 | Lucas Souza | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
| 040 | Lucas Souza | Pendente | Não executado | Não executada | Nenhum neste plano | Conferir MD/dependências |
