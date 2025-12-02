#!/bin/bash
# Code review script for Week 5 exercises

if [ -z "$1" ]; then
    echo "Usage: ./review_code.sh <filename>"
    echo "Example: ./review_code.sh exercises/day1.js"
    exit 1
fi

echo "🔍 Reviewing code: $1"
echo ""

python3 ../../ollama_duo.py --file "$1" --optimize --optimize-json
