#!/usr/bin/env python3
"""
ollama_duo.py

Sequentially orchestrates two Ollama models (e.g., codellama and llama2) on an
Apple M1 8GB machine by running them one after the other to simulate a
"collaboration" without loading both concurrently for generation.

Workflow (default):
1. First model (coder) generates an initial answer.
2. Second model (reviewer) receives a combined prompt containing the original
   user prompt plus the first model's output, and produces a refinement.

Why sequential? On an 8GB M1 Air, simultaneously hosting two 7B models is
memory‑tight; sequential runs keep usage safe.

Usage examples:
  python ollama_duo.py -p "Write a Python function to parse JSON safely."\
      --coder codellama:latest --reviewer llama2:latest

Swap order:
  python ollama_duo.py -p "Explain transformers" --coder llama2:latest --reviewer codellama:latest

Just first model (skip review):
  python ollama_duo.py -p "Summarize bubble sort" --coder codellama:latest --no-review

Adjust temperatures:
  python ollama_duo.py -p "Generate creative startup ideas" --coder-temp 0.7 --reviewer-temp 0.4

Return JSON only:
  python ollama_duo.py -p "Design a REST API" --json

Install requirement: Ollama must be installed (`ollama`) and models pulled.
"""

import argparse
import json
import subprocess
import sys
from datetime import datetime
from pathlib import Path

MAX_FILE_CHARS = 60000  # safeguard to avoid overly large prompts

def read_file_for_analysis(path: str) -> str:
    """Read file contents, truncate if too large, and annotate truncation."""
    p = Path(path)
    if not p.exists():
        sys.stderr.write(f"[error] File not found: {path}\n")
        sys.exit(2)
    data = p.read_text(encoding="utf-8", errors="replace")
    if len(data) > MAX_FILE_CHARS:
        return data[:MAX_FILE_CHARS] + "\n\n[...TRUNCATED for length; original size=" + str(len(data)) + " chars...]"
    return data


def run_model(model: str, prompt: str, temperature: float) -> str:
    """Run an Ollama model with a single prompt and return its output text."""
    full_prompt = f"<temp={temperature}>\n{prompt}" if temperature is not None else prompt
    try:
        result = subprocess.run(
            ["ollama", "run", model, full_prompt],
            capture_output=True,
            text=True,
            check=True,
        )
    except subprocess.CalledProcessError as e:
        sys.stderr.write(f"[error] Model '{model}' failed: {e.stderr}\n")
        sys.exit(1)
    return result.stdout.strip()


def build_reviewer_prompt(original_prompt: str, coder_output: str) -> str:
    return (
        "You are the reviewer model. Improve clarity, correctness, and provide any missing edge cases.\n"
        "Original user prompt:\n" + original_prompt + "\n\n"
        "Coder model draft:\n" + coder_output + "\n\n"
        "Respond with a refined version. If code, keep it minimal and correct.\n"
    )


def main():
    parser = argparse.ArgumentParser(description="Sequential two-model orchestration for Ollama.")
    parser.add_argument("-p", "--prompt", required=False, help="User prompt to send to the first model.")
    parser.add_argument("--file", help="Path to a source file to analyze for optimization.")
    parser.add_argument("--optimize", action="store_true", help="Enable optimization analysis mode for provided file.")
    parser.add_argument("--optimize-json", action="store_true", help="Emit ONLY optimization suggestions as JSON (implies --json).")
    parser.add_argument("--coder", default="codellama:latest", help="First (coder) model name.")
    parser.add_argument("--reviewer", default="llama2:latest", help="Second (reviewer) model name.")
    parser.add_argument("--no-review", action="store_true", help="Skip second model.")
    parser.add_argument("--coder-temp", type=float, default=0.4, help="Temperature for coder model.")
    parser.add_argument("--reviewer-temp", type=float, default=0.3, help="Temperature for reviewer model.")
    parser.add_argument("--json", action="store_true", help="Output result as JSON.")
    parser.add_argument("--show-draft", action="store_true", help="Include coder draft in plain output.")
    args = parser.parse_args()

    start_time = datetime.utcnow().isoformat() + "Z"

    if not args.prompt and not args.file:
        sys.stderr.write("[error] Must provide --prompt or --file.\n")
        sys.exit(3)

    # Build effective prompt
    effective_prompt = args.prompt or "(File Analysis)"
    file_content = None
    optimization_payload = None
    if args.file:
        file_content = read_file_for_analysis(args.file)
        if args.optimize:
            # Structured optimization request
            optimization_prompt = (
                "You are a senior software optimization assistant. Analyze the following file for: \n"
                "- Performance (algorithmic & memory)\n"
                "- Readability & maintainability\n"
                "- Potential bugs or edge cases\n"
                "- Security concerns (if applicable)\n"
                "Provide suggestions grouped under JSON keys: performance, readability, bugs, security, other.\n"
                "Return STRICT JSON only, no prose outside JSON. Do not add code fences.\n"
                f"\nFile Path: {args.file}\n---BEGIN FILE CONTENT---\n{file_content}\n---END FILE CONTENT---\n"
            )
            coder_output = run_model(args.coder, optimization_prompt, args.coder_temp)
            # Attempt to parse JSON from coder_output; if fails keep raw
            try:
                optimization_payload = json.loads(coder_output)
            except json.JSONDecodeError:
                optimization_payload = {"raw": coder_output, "parse_error": True}
            # Reviewer refinement (optional) focusing on validating JSON categories
            reviewer_output = None
            if not args.no_review:
                reviewer_prompt = (
                    "Validate and refine optimization JSON. Ensure concise actionable bullet items.\n"
                    "Return corrected JSON only.\n"
                    f"\nOriginal JSON:\n{coder_output}\n"
                )
                reviewer_text = run_model(args.reviewer, reviewer_prompt, args.reviewer_temp)
                try:
                    reviewer_output = json.loads(reviewer_text)
                except json.JSONDecodeError:
                    reviewer_output = {"raw": reviewer_text, "parse_error": True}
            final_opt = reviewer_output if reviewer_output is not None else optimization_payload
            if args.optimize_json or (args.optimize and args.json):
                print(json.dumps({
                    "timestamp": start_time,
                    "file": args.file,
                    "coder_model": args.coder,
                    "reviewer_model": None if args.no_review else args.reviewer,
                    "optimization": final_opt
                }, indent=2))
                return
            # If optimize but not JSON requested, fall back to plain display.
            if not args.json:
                print(f"=== Optimization Suggestions for {args.file} ===")
                print(json.dumps(final_opt, indent=2))
                return
            # If generic --json (without optimize-json) we include full payload below.
            args.prompt = effective_prompt  # continue to generic JSON branch
        else:
            # Non-optimization file inclusion: prepend content to prompt
            effective_prompt = (
                f"Analyze and respond to user prompt regarding this file. File path: {args.file}.\n"
                f"---BEGIN FILE CONTENT---\n{file_content}\n---END FILE CONTENT---\n\nUser prompt (if supplied): {args.prompt or '(none)'}"
            )
            coder_output = run_model(args.coder, effective_prompt, args.coder_temp)
            reviewer_output = None
            if not args.no_review:
                reviewer_prompt = build_reviewer_prompt(effective_prompt, coder_output)
                reviewer_output = run_model(args.reviewer, reviewer_prompt, args.reviewer_temp)
            if args.json:
                payload = {
                    "timestamp": start_time,
                    "file": args.file,
                    "prompt": args.prompt,
                    "coder_model": args.coder,
                    "reviewer_model": None if args.no_review else args.reviewer,
                    "coder_output": coder_output,
                    "reviewer_output": reviewer_output,
                    "final_output": reviewer_output if reviewer_output is not None else coder_output,
                }
                print(json.dumps(payload, indent=2))
                return
            if reviewer_output is not None and not args.no_review:
                print(f"=== Coder Draft ({args.coder}) ===\n{coder_output}\n")
                print(f"=== Reviewer Refinement ({args.reviewer}) ===\n{reviewer_output}\n")
            else:
                print(coder_output)
            return
    # Original non-file, non-optimize path
    coder_output = run_model(args.coder, args.prompt, args.coder_temp)

    reviewer_output = None
    if not args.no_review:
        reviewer_prompt = build_reviewer_prompt(args.prompt, coder_output)
        reviewer_output = run_model(args.reviewer, reviewer_prompt, args.reviewer_temp)

    if args.json:
        payload = {
            "timestamp": start_time,
            "prompt": args.prompt,
            "coder_model": args.coder,
            "reviewer_model": None if args.no_review else args.reviewer,
            "coder_temperature": args.coder_temp,
            "reviewer_temperature": None if args.no_review else args.reviewer_temp,
            "coder_output": coder_output,
            "reviewer_output": reviewer_output,
            "final_output": reviewer_output if reviewer_output is not None else coder_output,
        }
        print(json.dumps(payload, indent=2))
    else:
        if args.show_draft:
            print("=== Coder Draft (" + args.coder + ") ===")
            print(coder_output)
            print()
        if reviewer_output is not None:
            print("=== Reviewer Refinement (" + args.reviewer + ") ===")
            print(reviewer_output)
        else:
            print("=== Single Model Output (" + args.coder + ") ===")
            print(coder_output)


if __name__ == "__main__":
    main()
