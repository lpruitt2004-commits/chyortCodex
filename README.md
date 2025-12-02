<div align="center">

# chyortCodex: Local Two‑Model Orchestration Toolkit

Efficient sequential collaboration between lightweight LLMs (e.g., CodeLlama + Llama2) on constrained Apple Silicon hardware.

</div>

## Beginner Quick Guide (Simple Words)
If the rest of this file feels hard, start here.

What this does:
- Runs one AI model to write a draft.
- Runs a second AI model to improve that draft.
- Does them one after another so your computer is not slow.

You need:
1. Install Ollama: `brew install ollama`
2. Get two models: `ollama pull codellama:latest` and `ollama pull llama2:latest`
3. Run a prompt:
  ```bash
  python ollama_duo.py -p "Explain bubble sort" --show-draft
  ```

Want only one model:
```bash
python ollama_duo.py -p "Explain recursion" --no-review
```

Save as JSON (good for tools):
```bash
python ollama_duo.py -p "List 3 API ideas" --json
```

Make it look at a file and suggest improvements:
```bash
python ollama_duo.py --file scripts/benchmark_models.py --optimize --optimize-json
```

Words explained (plain):
- Draft: first answer.
- Review: improved answer.
- Optimize: get suggestions to make a file better.
- JSON: structured data (good for programs).

If something breaks:
- Check you typed model names exactly.
- Make sure Ollama is installed.
- Try a shorter prompt.

After you are OK with this part you can read the rest for more detail.

## Table of Contents
1. Overview
2. Why Sequential (Architecture)
3. System Requirements
4. Quick Start
5. Core Script: `ollama_duo.py`
6. CLI Options (Reference)
7. Usage Patterns (Beginner → Advanced)
8. Included Helper Scripts
9. Model Selection Guidance
10. Performance & Benchmarking
11. Troubleshooting
12. FAQ
13. Glossary
14. Extending & Roadmap
15. Contributing (Informal)
16. File Optimization Mode

| `--file` | Path to a source file to analyze | None |
| `--optimize` | Run optimization analysis over `--file` | False |
| `--optimize-json` | Output only optimization JSON (implies JSON) | False |
---
## 1. Overview
This toolkit demonstrates a pragmatic way to combine the strengths of two local models *without* exceeding memory limits: one drafts (coder) and one refines (reviewer). All operations are **sequential**—only one model is active at a time—ideal for an M1 MacBook Air (8 GB).

## 2. Why Sequential (Architecture)
Running two 7B models concurrently on 8 GB unified memory triggers swap, latency spikes, and thermal throttling. Sequential orchestration:
- Minimizes peak RAM usage.
- Preserves responsiveness (less page swapping).
- Enables a compositional workflow (draft → refine) while staying resource friendly.

High‑level flow:
```
User Prompt -> Coder Model Draft -> Reviewer Prompt (includes draft) -> Reviewer Refinement
```

## 3. System Requirements
- macOS (Apple Silicon tested on M1 8 GB).
- Python 3.8+
- Ollama installed (`brew install ollama`)
- Pulled models (examples below).

## 4. Quick Start
```bash
ollama pull codellama:latest
ollama pull llama2:latest

python ollama_duo.py -p "Summarize bubble sort" --show-draft
```

Single model only:
```bash
python ollama_duo.py -p "Explain recursion" --no-review
```

JSON output (tool integration):
```bash
python ollama_duo.py -p "Design a REST API for notes" --json > result.json
```

## 5. Core Script: `ollama_duo.py`
Stages:
1. Coder phase: initial generation.
2. Reviewer phase: targeted refinement (can be skipped).
3. Output formatting: plain or JSON structure.

### Key Benefits
- Portable (pure Python + Ollama CLI).
- Deterministic staging; easy to wrap with evaluation harnesses.
- Adjustable temperatures per phase for balanced creativity/control.

## 6. CLI Options (Reference)
| Flag | Description | Default |
|------|-------------|---------|
| `-p/--prompt` | User prompt text | (required) |
| `--coder` | Draft model name | `codellama:latest` |
| `--reviewer` | Reviewer model | `llama2:latest` |
| `--no-review` | Skip the reviewer stage | False |
| `--coder-temp` | Temperature coder | 0.4 |
| `--reviewer-temp` | Temperature reviewer | 0.3 |
| `--json` | Emit JSON payload | False |
| `--show-draft` | Show coder draft in plain output | False |

## 7. Usage Patterns
### Beginner
```bash
python ollama_duo.py -p "Explain HTTP caching" --show-draft
```
### Intermediate (Swap order)
```bash
python ollama_duo.py -p "Improve this paragraph" --coder llama2:latest --reviewer codellama:latest
```
### Fast Reviewer (Use tiny model)
```bash
ollama pull phi3:mini
python ollama_duo.py -p "Refactor Python loop" --reviewer phi3:mini
```
### Structured JSON for downstream tools
```bash
python ollama_duo.py -p "Generate 3 API endpoints" --json | jq '.final_output'
```
### File Context (Non-optimization)
```bash
python ollama_duo.py --file scripts/benchmark_models.py -p "Explain potential refactors" --show-draft
```
### File Optimization (JSON suggestions)
```bash
python ollama_duo.py --file scripts/benchmark_models.py --optimize --optimize-json > optimize.json
```
### Optimization With Reviewer Validation
```bash
python ollama_duo.py --file scripts/benchmark_models.py --optimize --coder codellama:latest --reviewer llama2:latest
```

## 8. Included Helper Scripts
Location: `scripts/`

| Script | Purpose |
|--------|---------|
| `benchmark_models.py` | Compare speed & approximate tokens across models. |
| `batch_duo.py` | Run many prompts through duo workflow; output JSONL. |
| `remove_unused_models.py` | Keep a whitelist; remove others to free disk. |
| `interactive_reviewer.py` | Interactive loop: edit coder draft before review. |
| `generate_curriculum.py` | Generate fullstack dev curriculum (LearningFuze-style). |

### Quick Examples
Benchmark two models:
```bash
echo "Sort a list" > prompts.txt
echo "Explain REST" >> prompts.txt
python scripts/benchmark_models.py --models codellama:latest llama2:latest \
  --prompts prompts.txt --summary
```
Batch duo processing:
```bash
python scripts/batch_duo.py --prompts prompts.txt --out batch.jsonl
```
Remove all but two models:
```bash
python scripts/remove_unused_models.py --keep codellama:latest llama2:latest --dry
python scripts/remove_unused_models.py --keep codellama:latest llama2:latest
```
Interactive refinement session:
```bash
python scripts/interactive_reviewer.py --coder codellama:latest --reviewer llama2:latest
```
Generate fullstack bootcamp curriculum:
```bash
python scripts/generate_curriculum.py --out-dir curriculum --weeks 12 --style learningfuze --internship-ready
```

## 9. Model Selection Guidance (M1 Air 8 GB)
| Class | Recommended | Notes |
|-------|-------------|-------|
| 2B–4B | Gemma 2B, Phi3 mini | Fast, minimal RAM footprint |
| 7B | CodeLlama 7B, Llama2 7B, Mistral 7B | Sweet spot for quality/performance |
| 13B+ | Avoid | Memory pressure & slow |

Quantization tip: prefer `q4_K` variants; only drop to `q3_K` if you need speed.

## 10. Performance & Benchmarking
Use `benchmark_models.py` for a coarse comparison. Metrics:
- Wall time per prompt.
- Approximate tokens/sec (word split proxy).
Improve consistency by setting temperature to a low value (e.g. 0.2) across runs.

## 11. Troubleshooting
| Issue | Cause | Fix |
|-------|-------|-----|
| "Model failed" error | Name mismatch or not pulled | `ollama pull <model>` |
| Slow generation | High temp or swap | Close apps; use smaller model |
| Reviewer too similar | Overlapping instruction style | Lower reviewer temp or swap roles |
| JSON decode failure (batch) | Unexpected CLI output | Re-run single prompt to isolate |

## 12. FAQ
**Q: Can I run both models simultaneously?** Not recommended on 8 GB; sequential keeps things responsive.
**Q: Why approximate tokens?** Ollama CLI currently doesn’t expose token counts directly.
**Q: Can I add a third refinement stage?** Yes—chain another run using the JSON output.
**Q: How do I integrate with a web app?** Wrap `ollama_duo.py` in a FastAPI endpoint returning its JSON.

## 13. Glossary
- **Sequential Orchestration**: Executing models one after another, never co‑resident.
- **Draft**: First model’s raw output.
- **Refinement**: Second model’s improvement pass.
- **JSONL**: Each line is a standalone JSON object (streamable logs).

## 14. Extending & Roadmap
Potential enhancements:
- Add timing + token estimate directly in `ollama_duo.py` JSON.
- Pluggable evaluation (e.g., quality scoring heuristics).
- Config file (`duo.config.json`) for default model pairs.
- Async web server (FastAPI) wrapper.

## 15. Contributing (Informal)
## 16. File Optimization Mode
When `--file` and `--optimize` are supplied the coder model is instructed to produce structured JSON with categories:
`performance`, `readability`, `bugs`, `security`, `other`.

If `--optimize-json` is passed the output is limited to a JSON object:
```json
{
  "timestamp": "2025-12-01T00:00:00Z",
  "file": "scripts/benchmark_models.py",
  "coder_model": "codellama:latest",
  "reviewer_model": "llama2:latest",
  "optimization": {
    "performance": ["..."],
    "readability": ["..."],
    "bugs": ["..."],
    "security": ["..."],
    "other": ["..."]
  }
}
```

If the reviewer is enabled it validates / refines the JSON. If parsing fails the raw text is embedded under `raw` with a `parse_error` flag so downstream tooling can detect failures gracefully.

Large files (>60k chars) are truncated with a marker to prevent excessive prompt sizes. Consider running chunked analysis manually for very large repositories (future roadmap feature).

### Tips
- Lower temperatures (e.g., `--coder-temp 0.2 --reviewer-temp 0.1`) for more stable structured JSON.
- For security-focused reviews add a normal prompt: `-p "Emphasize any injection or unsafe subprocess usage."`
- Automate daily scans via cron calling `--optimize-json` and diff results with `jq`.
Open to personal experimentation—add scripts, propose improvements, or adapt for other model pairs. No formal process; just keep scope focused on local orchestration.

---
### Quick Command Index
```bash
# Core duo run
python ollama_duo.py -p "Explain recursion" --show-draft
# JSON output
python ollama_duo.py -p "Design API" --json
# File optimization
python ollama_duo.py --file mycode.py --optimize --optimize-json
# Benchmark
python scripts/benchmark_models.py --models codellama:latest llama2:latest --prompts prompts.txt --summary
# Batch processing
python scripts/batch_duo.py --prompts prompts.txt --out batch.jsonl
# Cleanup unused models
python scripts/remove_unused_models.py --keep codellama:latest llama2:latest
# Interactive refinement
python scripts/interactive_reviewer.py
# Generate learning curriculum
python scripts/generate_curriculum.py --out-dir curriculum --weeks 12 --internship-ready
```

---
### Learning Resources

**Start your fullstack journey:**
- See `LEARNING_PATH.md` for complete 12-week LearningFuze-style curriculum
- Track progress with `curriculum/PROGRESS.md`
- Generate custom curriculum: `python scripts/generate_curriculum.py --help`

---
### Disclaimer
All scripts are provided as utility examples without warranty; validate outputs before production use.
