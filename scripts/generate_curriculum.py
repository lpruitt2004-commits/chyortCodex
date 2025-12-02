#!/usr/bin/env python3
"""Generate a fullstack web developer curriculum using ollama_duo.

Inspired by LearningFuze bootcamp structure, this script orchestrates
multiple ollama_duo calls to build a comprehensive learning path.

Usage:
  python scripts/generate_curriculum.py --out-dir curriculum --style learningfuze
  python scripts/generate_curriculum.py --out-dir curriculum --weeks 12 --focus frontend
  python scripts/generate_curriculum.py --out-dir curriculum --internship-ready

The script generates:
- Weekly lesson plans (markdown)
- Project assignments
- Skills checklist
- Resource links
- Progress tracker

Modes:
  learningfuze: Mimics LearningFuze bootcamp structure (default)
  custom: Flexible weeks and focus areas
  internship-ready: Fast-track for immediate job readiness
"""
import argparse
import json
import subprocess
import sys
from pathlib import Path


def run_duo(prompt: str, coder="codellama:latest", reviewer="llama2:latest", json_output=True):
    """Run ollama_duo.py and return JSON result."""
    cmd = [
        "python3", "ollama_duo.py",
        "-p", prompt,
        "--coder", coder,
        "--reviewer", reviewer,
        "--json"
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=Path(__file__).parent.parent)
    if result.returncode != 0:
        sys.stderr.write(f"[error] duo failed: {result.stderr}\n")
        return None
    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError:
        sys.stderr.write(f"[error] Invalid JSON from duo\n")
        return None


def generate_curriculum_outline(weeks: int, style: str, focus: str, internship: bool):
    """Generate high-level curriculum structure."""
    prompt = f"""Create a {weeks}-week fullstack web development curriculum outline.
Style: {style} bootcamp (intensive, project-based, industry-ready).
Focus: {focus if focus else 'balanced frontend + backend + devops'}.
Internship ready: {'Yes - include portfolio projects and interview prep' if internship else 'No'}.

Return STRICT JSON with this structure (no markdown, no code fences):
{{
  "title": "Curriculum Name",
  "duration_weeks": {weeks},
  "weekly_themes": [
    {{"week": 1, "theme": "HTML/CSS Fundamentals", "key_topics": ["...", "..."]}},
    ...
  ],
  "capstone_projects": ["Project 1", "Project 2"],
  "skills_covered": ["skill1", "skill2", ...]
}}
"""
    return run_duo(prompt, coder="codellama:latest", reviewer="llama2:latest")


def generate_week_detail(week_num: int, theme: str, topics: list, internship: bool):
    """Generate detailed lesson plan for one week."""
    prompt = f"""Create a detailed Week {week_num} lesson plan for: {theme}.
Topics to cover: {', '.join(topics)}.
Internship focus: {'Include real-world scenarios, Git workflow, code reviews' if internship else 'Standard learning'}.

Return STRICT JSON (no markdown):
{{
  "week": {week_num},
  "theme": "{theme}",
  "daily_lessons": [
    {{"day": 1, "title": "...", "objectives": ["...", "..."], "activities": ["...", "..."]}},
    ...
  ],
  "project": {{"title": "...", "description": "...", "requirements": ["...", "..."]}},
  "resources": [{{"type": "video/article/doc", "title": "...", "url": "..."}}],
  "skills_checklist": ["skill1", "skill2"]
}}
"""
    return run_duo(prompt)


def generate_project(project_name: str, week: int, difficulty: str):
    """Generate detailed project specification."""
    prompt = f"""Create a detailed project specification for: {project_name}.
Week: {week}, Difficulty: {difficulty}.

Return STRICT JSON:
{{
  "name": "{project_name}",
  "difficulty": "{difficulty}",
  "duration_days": 3,
  "description": "...",
  "learning_objectives": ["...", "..."],
  "technical_requirements": ["...", "..."],
  "user_stories": ["As a user, I want...", ...],
  "bonus_features": ["...", "..."],
  "evaluation_criteria": ["...", "..."]
}}
"""
    return run_duo(prompt)


def save_json(data, path: Path):
    """Save JSON data to file."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2))


def save_markdown_week(week_data, path: Path):
    """Convert week JSON to readable markdown."""
    path.parent.mkdir(parents=True, exist_ok=True)
    md = f"# Week {week_data['week']}: {week_data['theme']}\n\n"
    
    for day in week_data.get('daily_lessons', []):
        md += f"## Day {day['day']}: {day['title']}\n\n"
        md += "**Objectives:**\n"
        for obj in day.get('objectives', []):
            md += f"- {obj}\n"
        md += "\n**Activities:**\n"
        for act in day.get('activities', []):
            md += f"- {act}\n"
        md += "\n"
    
    proj = week_data.get('project', {})
    if proj:
        md += f"## Week Project: {proj.get('title', 'TBD')}\n\n"
        md += f"{proj.get('description', '')}\n\n"
        md += "**Requirements:**\n"
        for req in proj.get('requirements', []):
            md += f"- {req}\n"
        md += "\n"
    
    md += "## Resources\n\n"
    for res in week_data.get('resources', []):
        md += f"- [{res.get('title', 'Resource')}]({res.get('url', '#')}) ({res.get('type', 'link')})\n"
    
    md += "\n## Skills Checklist\n\n"
    for skill in week_data.get('skills_checklist', []):
        md += f"- [ ] {skill}\n"
    
    path.write_text(md)


def main():
    p = argparse.ArgumentParser(description="Generate fullstack curriculum with ollama_duo.")
    p.add_argument("--out-dir", default="curriculum", help="Output directory.")
    p.add_argument("--weeks", type=int, default=12, help="Curriculum duration in weeks.")
    p.add_argument("--style", default="learningfuze", help="Bootcamp style (learningfuze/custom).")
    p.add_argument("--focus", help="Optional focus area (frontend/backend/fullstack).")
    p.add_argument("--internship-ready", action="store_true", help="Add internship prep content.")
    p.add_argument("--coder", default="codellama:latest")
    p.add_argument("--reviewer", default="llama2:latest")
    args = p.parse_args()

    out = Path(args.out_dir)
    out.mkdir(parents=True, exist_ok=True)

    print(f"Generating {args.weeks}-week curriculum ({args.style} style)...")
    
    # Generate outline
    print("Step 1: Creating curriculum outline...")
    outline_data = generate_curriculum_outline(args.weeks, args.style, args.focus, args.internship_ready)
    if not outline_data:
        sys.stderr.write("Failed to generate outline.\n")
        sys.exit(1)
    
    outline = outline_data.get('final_output')
    try:
        outline_json = json.loads(outline) if isinstance(outline, str) else outline
    except (json.JSONDecodeError, TypeError):
        outline_json = {"weekly_themes": [], "title": "Custom Curriculum"}
    
    save_json(outline_json, out / "curriculum_outline.json")
    print(f"  Saved: {out / 'curriculum_outline.json'}")

    # Generate week details
    print("Step 2: Generating weekly lesson plans...")
    weekly_themes = outline_json.get('weekly_themes', [])
    for week_info in weekly_themes[:min(len(weekly_themes), args.weeks)]:
        week_num = week_info.get('week', 1)
        theme = week_info.get('theme', 'General')
        topics = week_info.get('key_topics', [])
        
        print(f"  Week {week_num}: {theme}")
        week_data = generate_week_detail(week_num, theme, topics, args.internship_ready)
        if week_data:
            week_json = week_data.get('final_output')
            try:
                week_obj = json.loads(week_json) if isinstance(week_json, str) else week_json
            except (json.JSONDecodeError, TypeError):
                week_obj = {"week": week_num, "theme": theme}
            
            save_json(week_obj, out / f"week_{week_num:02d}_data.json")
            save_markdown_week(week_obj, out / f"week_{week_num:02d}.md")
            print(f"    Saved: week_{week_num:02d}.md")

    # Generate projects
    print("Step 3: Creating project specifications...")
    projects = outline_json.get('capstone_projects', [])
    for i, proj_name in enumerate(projects[:3], start=1):
        print(f"  Project {i}: {proj_name}")
        proj_data = generate_project(proj_name, week_num=(args.weeks // len(projects)) * i, difficulty="intermediate")
        if proj_data:
            proj_json = proj_data.get('final_output')
            try:
                proj_obj = json.loads(proj_json) if isinstance(proj_json, str) else proj_json
            except (json.JSONDecodeError, TypeError):
                proj_obj = {"name": proj_name}
            save_json(proj_obj, out / f"project_{i:02d}.json")

    # Create tracker
    tracker_md = f"# {outline_json.get('title', 'Fullstack Curriculum')} - Progress Tracker\n\n"
    tracker_md += f"**Duration:** {args.weeks} weeks\n\n"
    tracker_md += "## Weekly Progress\n\n"
    for week_info in weekly_themes:
        tracker_md += f"- [ ] Week {week_info.get('week')}: {week_info.get('theme')}\n"
    tracker_md += "\n## Skills Mastery\n\n"
    for skill in outline_json.get('skills_covered', [])[:20]:
        tracker_md += f"- [ ] {skill}\n"
    tracker_md += "\n## Projects Completed\n\n"
    for proj in projects:
        tracker_md += f"- [ ] {proj}\n"
    
    (out / "PROGRESS.md").write_text(tracker_md)
    print(f"  Saved: {out / 'PROGRESS.md'}")

    print(f"\n✅ Curriculum generated in: {out}/")
    print(f"   Start with: {out}/curriculum_outline.json")
    print(f"   Track progress: {out}/PROGRESS.md")


if __name__ == "__main__":
    main()
