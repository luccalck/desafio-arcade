#!/usr/bin/env bash
set -euo pipefail
if [[ $# -lt 1 ]]; then
  echo 'Uso: bash scripts/triagem.sh <diretório-submissão> [opções]' >&2
  exit 2
fi
exec node scripts/triagem.mjs "$@"
