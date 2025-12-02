#!/bin/bash
set -e

echo "========================================"
echo "Week 8: Full-Stack Integration Review"
echo "========================================"

REVIEWER="../../ollama_duo.py"
if [ ! -f "$REVIEWER" ]; then
  echo "Error: ollama_duo.py not found at $REVIEWER"; exit 1; fi

for f in exercises/**/*.js exercises/day4_client/* solutions/**/*.js; do
  if [ -f "$f" ]; then
    echo "Reviewing: $f"
    python3 "$REVIEWER" "$f" "Full-stack review: API design, auth, validation, error handling, client fetch flows, and state management. Suggest improvements."
    echo
  fi
done

echo "========================================"
echo "Review complete"
echo "========================================"