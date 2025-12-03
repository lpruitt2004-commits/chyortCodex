#!/usr/bin/env python3
"""
Scaffold remaining curriculum weeks using Chyort's Legion (llama3.1:8b + deepseek-coder:33b)
"""
import os
import subprocess
import json

# Week configurations based on LEARNING_PATH.md
WEEKS = {
    3: {
        "title": "Advanced JavaScript",
        "topics": [
            "ES6+ features (arrow functions, destructuring, modules)",
            "Asynchronous JavaScript (callbacks, promises, async/await)",
            "Fetch API and AJAX",
            "Error handling"
        ],
        "project": "Weather app with external API"
    },
    4: {
        "title": "React Fundamentals",
        "topics": [
            "Components, props, state",
            "Hooks (useState, useEffect, useContext)",
            "React Router",
            "Component lifecycle"
        ],
        "project": "Multi-page React SPA (blog or e-commerce frontend)"
    },
    5: {
        "title": "Node.js & Express",
        "topics": [
            "Node.js runtime fundamentals",
            "Express server setup",
            "RESTful API design",
            "Middleware concepts"
        ],
        "project": "Build a RESTful API for task management"
    },
    6: {
        "title": "PostgreSQL Database",
        "topics": [
            "Relational database concepts",
            "SQL queries (SELECT, JOIN, WHERE, GROUP BY)",
            "Database design & normalization",
            "Connecting Node.js to PostgreSQL"
        ],
        "project": "Add PostgreSQL backend to task API"
    },
    7: {
        "title": "Authentication & Security",
        "topics": [
            "Password hashing (bcrypt)",
            "JWT authentication",
            "Session management",
            "CORS, HTTPS basics"
        ],
        "project": "User authentication system"
    },
    8: {
        "title": "Full-Stack Integration",
        "topics": [
            "Connecting React frontend to Express backend",
            "Environment variables",
            "Error handling & validation",
            "API integration patterns"
        ],
        "project": "Full-stack CRUD app with auth"
    },
    9: {
        "title": "Git & Collaboration",
        "topics": [
            "Git advanced (branching, merging, rebasing)",
            "GitHub workflows",
            "Code reviews and PRs",
            "CI/CD basics"
        ],
        "project": "Collaborate on team repo"
    },
    10: {
        "title": "Testing & TypeScript",
        "topics": [
            "TypeScript basics",
            "Testing (Jest, React Testing Library)",
            "Linting & formatting (ESLint, Prettier)",
            "Test-driven development"
        ],
        "project": "Refactor previous project with TypeScript + tests"
    },
    11: {
        "title": "Deployment",
        "topics": [
            "Deploying frontend (Vercel/Netlify)",
            "Deploying backend (Railway/Render/Heroku)",
            "Database hosting (Supabase/Neon)",
            "Environment configuration"
        ],
        "project": "Deploy full-stack app live"
    },
    12: {
        "title": "Capstone & Interview Prep",
        "topics": [
            "Build portfolio capstone project",
            "Code challenges practice (LeetCode easy/medium)",
            "Behavioral interview prep",
            "Resume & LinkedIn optimization"
        ],
        "project": "Original full-stack application"
    }
}

def call_ollama(prompt, model="llama3.1:8b"):
    """Call Ollama model with a prompt"""
    try:
        result = subprocess.run(
            ["ollama", "run", model],
            input=prompt,
            capture_output=True,
            text=True,
            timeout=120
        )
        return result.stdout.strip()
    except Exception as e:
        print(f"Error calling {model}: {e}")
        return None

def generate_week_readme(week_num, config):
    """Generate README.md for a week using llama3.1:8b"""
    topics_list = "\n".join([f"- {topic}" for topic in config['topics']])
    
    prompt = f"""Create a detailed week curriculum README for a LearningFuze-style bootcamp.

Week {week_num}: {config['title']}

Topics to cover:
{topics_list}

Week Project: {config['project']}

Generate a comprehensive README.md with:
1. Week overview with learning objectives
2. 5 daily lesson plans (Monday-Friday) with specific topics and exercises
3. Daily practice exercises description
4. Weekend project specification
5. Resources and references
6. Review script instructions

Format it exactly like a professional bootcamp curriculum. Use markdown formatting.
Keep it practical and hands-on focused like LearningFuze."""

    print(f"  Generating Week {week_num} README with llama3.1:8b...")
    content = call_ollama(prompt, "llama3.1:8b")
    return content

def generate_example_code(week_num, config, day):
    """Generate example code using deepseek-coder:33b"""
    prompt = f"""Create example code for Week {week_num}: {config['title']}, Day {day}.

Topics: {', '.join(config['topics'][:2])}

Generate practical, well-commented code examples that a student would practice.
Include HTML, CSS, and JavaScript as appropriate.
Make it beginner-friendly but realistic."""

    print(f"  Generating Day {day} example code with deepseek-coder:33b...")
    code = call_ollama(prompt, "deepseek-coder:33b")
    return code

def create_week_structure(week_num):
    """Create folder structure for a week"""
    base_path = f"../curriculum/weeks/week_{week_num:02d}_{WEEKS[week_num]['title'].lower().replace(' ', '_').replace('&', 'and')}"
    
    os.makedirs(f"{base_path}/exercises", exist_ok=True)
    os.makedirs(f"{base_path}/solutions", exist_ok=True)
    
    # Create review script
    review_script = """#!/bin/bash
# Auto-review script for this week's exercises
# Uses ollama_duo.py for code review

echo "Reviewing Week exercises..."
python3 ../../ollama_duo.py --file exercises/*.{html,css,js} --optimize
"""
    
    with open(f"{base_path}/review_code.sh", "w") as f:
        f.write(review_script)
    
    os.chmod(f"{base_path}/review_code.sh", 0o755)
    
    return base_path

def scaffold_week(week_num):
    """Scaffold a complete week"""
    print(f"\n{'='*60}")
    print(f"Scaffolding Week {week_num}: {WEEKS[week_num]['title']}")
    print(f"{'='*60}")
    
    config = WEEKS[week_num]
    base_path = create_week_structure(week_num)
    
    # Generate README
    readme_content = generate_week_readme(week_num, config)
    if readme_content:
        with open(f"{base_path}/README.md", "w") as f:
            f.write(readme_content)
        print(f"✓ Created {base_path}/README.md")
    
    # Generate example exercises for 3 days (to save time)
    for day in [1, 3, 5]:
        code = generate_example_code(week_num, config, day)
        if code:
            with open(f"{base_path}/exercises/day{day}.js", "w") as f:
                f.write(code)
            print(f"✓ Created {base_path}/exercises/day{day}.js")
    
    print(f"✓ Week {week_num} scaffolding complete!")

def main():
    print("🔥 Chyort's Legion Curriculum Scaffolder 🔥")
    print("Using llama3.1:8b for content + deepseek-coder:33b for code\n")
    
    # Change to script directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Scaffold weeks 3-12
    for week_num in range(3, 13):
        scaffold_week(week_num)
    
    print("\n" + "="*60)
    print("✅ All weeks scaffolded successfully!")
    print("="*60)
    print("\nNext steps:")
    print("1. Review generated content in curriculum/weeks/")
    print("2. Customize and expand as needed")
    print("3. Commit to git: git add . && git commit -m 'Add weeks 3-12'")

if __name__ == "__main__":
    main()
