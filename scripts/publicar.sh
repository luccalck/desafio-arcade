#!/usr/bin/env bash
set -euo pipefail
# O job é responsável pela escrita autenticada e pelo deploy Pages da árvore.
node scripts/publicar.mjs "$@" --existing pages-tree --output pages-site
