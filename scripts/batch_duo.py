#!/usr/bin/env python3
"""Run ollama_duo sequentially for a batch of prompts.

Each line in the input file is treated as an independent prompt. Outputs are
written as JSON Lines containing coder draft and reviewer refinement.

Usage:
  python scripts/batch_duo.py --prompts prompts.txt --out batch_results.jsonl \
      --coder codellama:latest --reviewer llama2:latest

Skip reviewer:
  python scripts/batch_duo.py --prompts prompts.txt --out batch_results.jsonl --no-review
"""
import argparse
import json
import subprocess
from pathlib import Path


def run_duo(script_path: str, prompt: str, coder: str, reviewer: str, no_review: bool,
            coder_temp: float, reviewer_temp: float):
    cmd = ["python3", script_path, "-p", prompt, "--coder", coder, "--coder-temp", str(coder_temp)]
    if not no_review:
        cmd += ["--reviewer", reviewer, "--reviewer-temp", str(reviewer_temp)]
    else:
        cmd += ["--no-review"]
    cmd += ["--json"]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        return {"prompt": prompt, "error": result.stderr.strip()}
    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError:
        return {"prompt": prompt, "error": "Invalid JSON from duo script"}


def main():
    p = argparse.ArgumentParser(description="Batch process prompts through ollama_duo.")
    p.add_argument("--prompts", required=True, help="Input file with one prompt per line.")
    p.add_argument("--out", required=True, help="Output JSONL file path.")
    p.add_argument("--coder", default="codellama:latest", help="Coder model.")
    p.add_argument("--reviewer", default="llama2:latest", help="Reviewer model.")
    p.add_argument("--coder-temp", type=float, default=0.4)
    p.add_argument("--reviewer-temp", type=float, default=0.3)
    p.add_argument("--no-review", action="store_true")
    p.add_argument("--duo-path", default="ollama_duo.py", help="Path to ollama_duo.py.")
    args = p.parse_args()

    prompts = [l.strip() for l in Path(args.prompts).read_text().splitlines() if l.strip()]
    out_path = Path(args.out)
    count = 0
    with out_path.open("w") as f:
        for prompt in prompts:
            data = run_duo(args.duo_path, prompt, args.coder, args.reviewer, args.no_review,
                           args.coder_temp, args.reviewer_temp)
            f.write(json.dumps(data) + "\n")
            count += 1
    print(f"Processed {count} prompts -> {out_path}")


if __name__ == "__main__":
    main()
