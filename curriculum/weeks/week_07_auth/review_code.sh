#!/bin/bash

# Week 7: Authentication & Security - Code Review Script

set -e

echo "========================================"
echo "Week 7: Authentication & Security Review"
echo "========================================"

REVIEWER="../../ollama_duo.py"

if [ ! -f "$REVIEWER" ]; then
  echo "Error: ollama_duo.py not found at $REVIEWER"
  exit 1
fi

review_sql_msg() {
  python3 "$REVIEWER" "$1" "$2"
}

# Review exercise scaffolds (intent clarity) and solutions (security)
for f in exercises/day{1..5}.js; do
  echo "Reviewing exercise: $f"
  python3 "$REVIEWER" "$f" "Review this exercise for clarity of instructions, correctness of TODO guidance, and alignment with Week 7 goals (JWT, sessions, CSRF, RBAC, hardening)."
  echo
done

for f in solutions/day{1..5}.js; do
  echo "Reviewing solution: $f"
  python3 "$REVIEWER" "$f" "Security review: verify password hashing, token handling, cookie flags, CSRF usage, rate limiting, validation, error handling, and general best practices. Suggest improvements if any."
  echo
done

echo "========================================"
echo "Review complete!"
echo "========================================"