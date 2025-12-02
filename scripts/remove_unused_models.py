#!/usr/bin/env python3
"""Remove Ollama models not in the keep list.

Usage:
  python scripts/remove_unused_models.py --keep codellama:latest llama2:latest

Dry run:
  python scripts/remove_unused_models.py --keep codellama:latest llama2:latest --dry

The script calls `ollama list`, parses model names, and removes any model not
explicitly listed in --keep.
"""
import argparse
import subprocess
import sys


def list_models():
    result = subprocess.run(["ollama", "list"], capture_output=True, text=True, check=True)
    lines = [l.strip() for l in result.stdout.splitlines()[1:] if l.strip()]
    models = []
    for line in lines:
        # Expected format: NAME ID SIZE MODIFIED
        parts = line.split()
        if parts:
            models.append(parts[0])
    return models


def remove_model(name: str):
    result = subprocess.run(["ollama", "rm", name], capture_output=True, text=True)
    return result.returncode == 0, result.stderr.strip() or result.stdout.strip()


def main():
    p = argparse.ArgumentParser(description="Remove Ollama models not in keep list.")
    p.add_argument("--keep", nargs="+", required=True, help="Models to keep.")
    p.add_argument("--dry", action="store_true", help="Dry run; list removals without executing.")
    args = p.parse_args()

    installed = list_models()
    to_remove = [m for m in installed if m not in args.keep]

    if not to_remove:
        print("Nothing to remove; all installed models are in keep list.")
        return

    print(f"Found {len(installed)} installed; removing {len(to_remove)} not in keep list.")

    for m in to_remove:
        if args.dry:
            print(f"DRY: Would remove {m}")
        else:
            ok, msg = remove_model(m)
            status = "OK" if ok else "FAIL"
            print(f"{status}: {m} -> {msg}")


if __name__ == "__main__":
    if sys.version_info < (3, 8):
        sys.stderr.write("Python 3.8+ required.\n")
        sys.exit(1)
    main()
