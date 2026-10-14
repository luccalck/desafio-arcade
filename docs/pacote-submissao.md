# Pacote de Submissão Automatizado — Etapa 031

**Responsável:** Lucas Souza (`6lucassilvaaa`) · SRE e Segurança
**Data:** 14/10/2026
**INT:** INT-09 / INT-06 / INT-03 · **Roteiro:** R07 · **Checkpoints:** G6 / G7

---

## 1. Visão Geral e Ciclo de Entrega

O pacote acadêmico de submissão reúne os materiais obrigatórios para avaliação do projeto **Rota do Código (Desafio Arcade)** em conformidade com as regras da disciplina. A geração da pasta `submissao/` é 100% automatizada pela pipeline, eliminando montagens manuais suscetíveis a erro e garantindo rastreabilidade criptográfica estrita.

### Ciclo formal de produção e empacotamento:
1. **Build & Qualidade:** Código TypeScript, testes e GDD aprovados geram o artefato imutável `pacote-ci` (`build.zip`, `GDD.pdf`, `sbom.cdx.json`).
2. **Homologação e Produção Candidata:** Deploy da mesma release em HML e abertura em produção sob aprovação formal.
3. **Vídeo Real de Pitch:** Gravação real de gameplay e apresentação humana (Etapa 029).
4. **Entrada de Vídeo:** Ingestão segura via workflow `.github/workflows/entrada-video.yml`, validando digest e duração <= 90s via `ffprobe`.
5. **Empacotamento Automatizado:** Execução de `scripts/submissao.mjs` combinando o artefato homologado com o vídeo real.
6. **Triagem Automatizada:** Execução de `scripts/triagem.sh` validando os 4 itens obrigatórios e o manifesto SHA-256.

---

## 2. Estrutura da Pasta `submissao/`

A pasta `submissao/` é composta exclusivamente pelos seguintes arquivos:

| Arquivo | Origem | Validação Obrigatória |
|---|---|---|
| `GDD.pdf` | Pipeline (`artifacts/GDD.pdf`) | Arquivo PDF válido com as quatro seções obrigatórias (`Premissa e problema endereçado`, `High concept`, `Gênero e plataforma`, `Mecânicas-core`). |
| `LINK_DO_JOGO.txt` | Configuração (`SITE_URL`) | URL HTTP(S) pública da produção formal, sem credenciais, parâmetros de query ou fragmentos. |
| `build.zip` | Pipeline (`artifacts/build.zip`) | Site estático idêntico ao promovido, contendo obrigatoriamente `index.html` e `LEIA-ME.txt`. |
| `pitch.mp4` | Ingestão humana (`entrada-video.yml`) | Gravação real <= 90s sem truncamento de frações, validada via `ffprobe`, com SHA-256 verificado. |
| `MANIFESTO.sha256` | `scripts/submissao.mjs` | Hash SHA-256 de cada um dos quatro arquivos obrigatórios. |
| `submissao-manifest.json` | `scripts/submissao.mjs` | Metadados de proveniência (`sourceSha`, `runId`, `runAttempt`, `siteUrl`, `createdAt`). |

---

## 3. Automação e Ferramentas

### Script de Empacotamento (`scripts/submissao.mjs`)
- **Comando de criação:**
  ```bash
  node scripts/submissao.mjs create <origem-bundle> <video-path> <site-url> [out-dir]
  ```
- **Comando de verificação:**
  ```bash
  node scripts/submissao.mjs verify [submissao-dir]
  ```

### Integração à Esteira (`.github/workflows/esteira.yml`)
- Job `submissao` integrado condicionado à flag `vars.SUBMISSAO_ENABLED == 'true'`.
- Consome o artefato `pacote-ci` previamente auditado, garantindo que o build não seja recompilado.
- Requer a presença do artefato de vídeo validado gerado pelo workflow `entrada-video.yml`.
- Executa a triagem formal via `bash scripts/triagem.sh submissao`.

### Workflow de Entrada de Vídeo (`.github/workflows/entrada-video.yml`)
- Disparo manual controlado (`workflow_dispatch`).
- Permissões mínimas (`contents: read`, `actions: read`).
- Validação estrita de hash SHA-256 e duração via `ffprobe` antes de disponibilizar o vídeo para empacotamento.

---

## 4. Rastreamento e Imutabilidade

- **Não recompilação:** O ZIP e o GDD inclusos no pacote de submissão possuem exatamente os mesmos digests SHA-256 aprovados na homologação e vinculados à GitHub Release.
- **Validação de Manifesto:** O manifesto SHA-256 cobre todos os arquivos e é conferido tanto pelo validador interno quanto pelo runner via `sha256sum -c MANIFESTO.sha256`.

---

## 5. Limitações e Pendências Reais

1. **Vídeo de Pitch Real (Entrada Humana):** O pacote não pode ser gerado com placeholders ou simulações. A gravação humana do pitch (Passo 029) permanece pendente, bloqueando a execução final da submissão em produção.
2. **Dados do SQUAD:** Lucca Castilho permanece com o campo de RA pendente em `SQUAD.md`, o que impede a triagem estrita em ambiente de produção sem a devida regularização.
3. **Ambiente Local vs CI:** Em ambiente Windows local, ferramentas de sistema como `poppler-utils` (`pdfinfo`/`pdftotext`) e `ffmpeg` (`ffprobe`) podem exigir instalação prévia caso os scripts sejam executados fora da suite de testes de integração Vitest (que opera com adaptadores/fixtures).
