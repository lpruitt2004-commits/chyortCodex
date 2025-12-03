#!/bin/bash

# Week 6: PostgreSQL Database - Code Review Script
# This script runs ollama_duo to review your code

echo "========================================"
echo "Week 6: PostgreSQL Database Code Review"
echo "========================================"
echo ""

# Path to the main ollama_duo script
REVIEWER="../../ollama_duo.py"

if [ ! -f "$REVIEWER" ]; then
    echo "Error: ollama_duo.py not found at $REVIEWER"
    exit 1
fi

# Review each day's exercise
for day in {1..3}; do
    echo "Reviewing Day $day (SQL)..."
    python3 "$REVIEWER" "exercises/day$day.sql" "Review this SQL code for correctness, best practices, and learning opportunities. Check for proper use of joins, indexes, and query optimization."
    echo ""
done

for day in {4..5}; do
    echo "Reviewing Day $day (Node.js + PostgreSQL)..."
    python3 "$REVIEWER" "exercises/day$day.js" "Review this Node.js + PostgreSQL code. Check for SQL injection prevention, proper use of connection pooling, error handling, and transaction management."
    echo ""
done

echo "========================================"
echo "Code review complete!"
echo "========================================"
