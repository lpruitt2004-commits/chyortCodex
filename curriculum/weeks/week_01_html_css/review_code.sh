#!/bin/bash
# Code Review Helper Script
# 
# Usage: ./review_code.sh <file>
# Example: ./review_code.sh exercises/day1.html

if [ -z "$1" ]; then
    echo "Usage: ./review_code.sh <file>"
    echo "Example: ./review_code.sh exercises/day1.html"
    exit 1
fi

FILE="$1"

if [ ! -f "$FILE" ]; then
    echo "Error: File '$FILE' not found"
    exit 1
fi

echo "🔍 Reviewing: $FILE"
echo "================================"

# Run ollama_duo optimization
python3 ../../ollama_duo.py --file "$FILE" --optimize --optimize-json

echo ""
echo "================================"
echo "✅ Review complete!"
echo ""
echo "💡 Tip: Fix any issues and run again to verify"
