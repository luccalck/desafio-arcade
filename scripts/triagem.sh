#!/usr/bin/env bash
set -euo pipefail
if [[ $# -ne 1 ]]; then
  echo 'Uso: bash scripts/triagem.sh <diretório-submissão>' >&2
  exit 2
fi
exec node scripts/triagem.mjs "$1"
