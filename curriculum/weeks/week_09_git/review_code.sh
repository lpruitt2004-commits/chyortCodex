#!/bin/bash
set -e

echo "========================================"
echo "Week 9: Git & Collaboration Review"
echo "========================================"

REVIEWER="../../ollama_duo.py"
if [ ! -f "$REVIEWER" ]; then echo "Missing reviewer at $REVIEWER"; exit 1; fi

for f in exercises/day{1..5}.md solutions/day{1..5}.md; do
  echo "Reviewing: $f"
  python3 "$REVIEWER" "$f" "Check clarity, correctness, and best-practice guidance for Git workflows."
  echo
done

echo "========================================"
echo "Review complete"
echo "========================================"}