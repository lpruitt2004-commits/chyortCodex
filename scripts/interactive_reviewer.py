#!/usr/bin/env python3
"""Interactive loop combining manual edits with model refinement.

Flow:
1. User enters a prompt.
2. Coder model generates a draft.
3. User may accept, edit manually in terminal, or skip.
4. Reviewer model refines final draft.
5. Loop continues until user types /quit.

Usage:
  python scripts/interactive_reviewer.py --coder codellama:latest --reviewer llama2:latest

Commands during input:
  /skip   -> Skip reviewer stage
  /edit   -> Open an edit session for draft (inline)
  /quit   -> Exit
"""
import argparse
import subprocess
import textwrap


def run_model(model: str, prompt: str, temperature: float):
    result = subprocess.run([
        "ollama", "run", model, f"<temp={temperature}>\n{prompt}"
    ], capture_output=True, text=True)
    if result.returncode != 0:
        return f"[error] {result.stderr.strip()}"
    return result.stdout.strip()


def reviewer_prompt(original: str, draft: str) -> str:
    return (
        "Refine the following draft for clarity, correctness, and conciseness.\n"
        "Original prompt:\n" + original + "\n\nDraft:\n" + draft + "\n\n"
        "Return only the improved content."
    )


def interactive_edit(original: str) -> str:
    print("Enter edited content. End with a single '.' on its own line:")
    lines = []
    while True:
        line = input()
        if line.strip() == '.':
            break
        lines.append(line)
    edited = '\n'.join(lines).strip()
    if not edited:
        return original
    return edited


def main():
    p = argparse.ArgumentParser(description="Interactive reviewer loop.")
    p.add_argument("--coder", default="codellama:latest")
    p.add_argument("--reviewer", default="llama2:latest")
    p.add_argument("--coder-temp", type=float, default=0.4)
    p.add_argument("--reviewer-temp", type=float, default=0.3)
    args = p.parse_args()

    print("Interactive Reviewer Session. Type /quit to exit.")
    while True:
        prompt = input("Prompt> ").strip()
        if not prompt:
            continue
        if prompt == '/quit':
            break

        draft = run_model(args.coder, prompt, args.coder_temp)
        print(textwrap.dedent(f"""
        --- Coder Draft ({args.coder}) ---
        {draft}
        Commands: /edit to modify | /skip to skip reviewer | /quit to exit
        """))
        cmd = input("Action (/edit,/skip,Enter for review)> ").strip()
        if cmd == '/quit':
            break
        if cmd == '/edit':
            draft = interactive_edit(draft)
        if cmd == '/skip':
            print("[Final Draft]\n" + draft)
            continue
        refined = run_model(args.reviewer, reviewer_prompt(prompt, draft), args.reviewer_temp)
        print(textwrap.dedent(f"""
        === Reviewer Refinement ({args.reviewer}) ===
        {refined}
        """))

    print("Session ended.")


if __name__ == '__main__':
    main()
