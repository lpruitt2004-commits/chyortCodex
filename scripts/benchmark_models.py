#!/usr/bin/env python3
"""Benchmark multiple Ollama models with a set of prompts.

Measures wall clock time per prompt and approximates token counts.
Designed for lightweight comparison on an M1 8GB machine.

Usage:
  python scripts/benchmark_models.py --models codellama:latest llama2:latest \
      --prompts prompts.txt --repetitions 1 --json results.json

Prompts file: one prompt per line.

Notes:
- Ollama CLI does not expose token usage directly; we approximate tokens by
  splitting on whitespace. For rough relative comparisons only.
- Run models sequentially to avoid memory pressure.
- If a model fails, it's recorded with an error field.
"""
import argparse
import json
import subprocess
import time
from pathlib import Path


def run(model: str, prompt: str, temperature: float):
    start = time.time()
    try:
        result = subprocess.run([
            "ollama", "run", model, f"<temp={temperature}>\n{prompt}"
        ], capture_output=True, text=True, check=True)
        output = result.stdout.strip()
        elapsed = time.time() - start
        tokens = len(output.split())
        return {
            "model": model,
            "prompt": prompt,
            "seconds": round(elapsed, 3),
            "approx_tokens": tokens,
            "tokens_per_second": round(tokens / elapsed, 2) if elapsed > 0 else None,
            "output": output,
            "error": None
        }
    except subprocess.CalledProcessError as e:
        elapsed = time.time() - start
        return {
            "model": model,
            "prompt": prompt,
            "seconds": round(elapsed, 3),
            "approx_tokens": None,
            "tokens_per_second": None,
            "output": None,
            "error": e.stderr.strip() or str(e)
        }


def main():
    p = argparse.ArgumentParser(description="Benchmark multiple Ollama models.")
    p.add_argument("--models", nargs="+", required=True, help="Models to test (space separated).")
    p.add_argument("--prompts", required=True, help="Path to prompts file (one per line).")
    p.add_argument("--repetitions", type=int, default=1, help="Repetitions per prompt per model.")
    p.add_argument("--temperature", type=float, default=0.3, help="Temperature to use.")
    p.add_argument("--json", help="Optional path to write JSON results.")
    p.add_argument("--summary", action="store_true", help="Print concise summary table.")
    args = p.parse_args()

    prompt_lines = [l.strip() for l in Path(args.prompts).read_text().splitlines() if l.strip()]
    results = []
    for model in args.models:
        for prompt in prompt_lines:
            for r in range(args.repetitions):
                entry = run(model, prompt, args.temperature)
                entry["repetition"] = r + 1
                results.append(entry)

    if args.json:
        Path(args.json).write_text(json.dumps(results, indent=2))
    if args.summary:
        # Aggregate per model
        agg = {}
        for row in results:
            m = row["model"]
            agg.setdefault(m, {"total_seconds": 0.0, "count": 0, "token_sum": 0})
            agg[m]["total_seconds"] += row["seconds"]
            if row["approx_tokens"]:
                agg[m]["token_sum"] += row["approx_tokens"]
            agg[m]["count"] += 1
        print("Model                 Avg_s   Avg_tokens   TPS")
        print("------------------------------------------------")
        for m, a in agg.items():
            avg_s = a["total_seconds"] / a["count"]
            avg_tokens = a["token_sum"] / a["count"] if a["count"] else 0
            tps = avg_tokens / avg_s if avg_s > 0 else 0
            print(f"{m:20} {avg_s:6.2f} {int(avg_tokens):11d} {tps:6.2f}")

    if not args.summary:
        # If no summary flag, still notify
        print(f"Completed {len(results)} runs. Use --summary for aggregate view.")


if __name__ == "__main__":
    main()
