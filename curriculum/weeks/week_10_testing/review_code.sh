#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required. Please install Node.js." >&2
  exit 1
fi

npm install
npm test
