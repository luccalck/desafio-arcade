#!/usr/bin/env bash
set -euo pipefail
if [[ ${1:-} == --* ]]; then set -- abrir "$@"; fi
node scripts/promover.mjs "$@"
