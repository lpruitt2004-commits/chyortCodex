#!/bin/bash
# Auto-review script for this week's exercises
# Uses ollama_duo.py for code review

echo "🔍 Reviewing week exercises..."

for file in exercises/**/*.{jsx,js,tsx,ts}; do
    if [ -f "$file" ]; then
        echo "Reviewing $file..."
        python3 ../../ollama_duo.py --file "$file" --optimize
    fi
done

echo "✅ Review complete!"
