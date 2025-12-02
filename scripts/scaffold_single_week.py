#!/usr/bin/env python3
"""
Scaffold a single curriculum week using Chyort's Legion
Usage: python3 scaffold_single_week.py <week_number>
Example: python3 scaffold_single_week.py 3
"""
import os
import sys
import subprocess

# Week configurations
WEEKS = {
    3: {
        "title": "Advanced JavaScript",
        "folder": "week_03_js_advanced",
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
        "folder": "week_04_react",
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
        "folder": "week_05_node_express",
        "topics": [
            "Node.js runtime fundamentals",
            "Express server setup",
            "RESTful API design",
            "Middleware concepts"
        ],
        "project": "RESTful API for task management"
    },
    6: {
        "title": "PostgreSQL Database",
        "folder": "week_06_postgresql",
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
        "folder": "week_07_auth",
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
        "folder": "week_08_fullstack",
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
        "folder": "week_09_git",
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
        "folder": "week_10_testing",
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
        "folder": "week_11_deployment",
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
        "folder": "week_12_capstone",
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
    print(f"\n🤖 Calling {model}...")
    try:
        result = subprocess.run(
            ["ollama", "run", model, prompt],
            capture_output=True,
            text=True,
            timeout=180
        )
        return result.stdout.strip()
    except Exception as e:
        print(f"❌ Error calling {model}: {e}")
        return None

def scaffold_week(week_num):
    """Scaffold a single week"""
    if week_num not in WEEKS:
        print(f"❌ Week {week_num} not found. Valid weeks: 3-12")
        return False
    
    config = WEEKS[week_num]
    base_path = f"curriculum/weeks/{config['folder']}"
    
    print(f"\n{'='*60}")
    print(f"🔥 Scaffolding Week {week_num}: {config['title']}")
    print(f"{'='*60}\n")
    
    # Create folder structure
    os.makedirs(f"{base_path}/exercises", exist_ok=True)
    os.makedirs(f"{base_path}/solutions", exist_ok=True)
    print(f"✓ Created folder structure: {base_path}/")
    
    # Generate README with llama3.1:8b
    topics_list = "\n".join([f"- {topic}" for topic in config['topics']])
    
    readme_prompt = f"""Create a detailed README.md for Week {week_num} of a LearningFuze-style web development bootcamp.

# Week {week_num}: {config['title']}

## Topics:
{topics_list}

## Week Project:
{config['project']}

Please create a comprehensive README with these sections:
1. **Week Overview** - Brief intro and learning objectives
2. **Daily Breakdown** - Monday through Friday lesson plans
   - Each day: specific topics, concepts, and practice goals
3. **Exercises** - Description of daily practice exercises
4. **Week Project** - Detailed project specification
5. **Resources** - Links and references for learning
6. **Review & Practice** - How to use the review script

Format using markdown. Make it practical and hands-on like a real bootcamp. Include specific examples and actionable steps."""

    print("📝 Generating README.md with llama3.1:8b...")
    readme_content = call_ollama(readme_prompt, "llama3.1:8b")
    
    if readme_content:
        with open(f"{base_path}/README.md", "w") as f:
            f.write(readme_content)
        print(f"✓ Created {base_path}/README.md")
    else:
        print("❌ Failed to generate README")
        return False
    
    # Create review script
    review_script = """#!/bin/bash
# Auto-review script for this week's exercises
# Uses ollama_duo.py for code review

echo "🔍 Reviewing week exercises..."

for file in exercises/*.{html,css,js}; do
    if [ -f "$file" ]; then
        echo "Reviewing $file..."
        python3 ../../ollama_duo.py --file "$file" --optimize
    fi
done

echo "✅ Review complete!"
"""
    
    with open(f"{base_path}/review_code.sh", "w") as f:
        f.write(review_script)
    os.chmod(f"{base_path}/review_code.sh", 0o755)
    print(f"✓ Created {base_path}/review_code.sh")
    
    # Generate sample exercise files
    print("\n💻 Generating sample exercise with deepseek-coder:33b...")
    
    exercise_prompt = f"""Create a starter exercise file for Week {week_num}: {config['title']}.

Topic: {config['topics'][0]}

Create a practical coding exercise with:
1. Clear instructions in comments
2. Starter code with TODOs
3. Expected output description
4. Hints for the student

Make it hands-on and educational. File should be ready for a student to fill in."""

    exercise_code = call_ollama(exercise_prompt, "deepseek-coder:33b")
    
    if exercise_code:
        # Determine file extension based on week
        if week_num <= 2:
            ext = "html"
        elif week_num <= 4:
            ext = "js"
        elif week_num <= 8:
            ext = "js"
        else:
            ext = "js"
        
        with open(f"{base_path}/exercises/day1.{ext}", "w") as f:
            f.write(exercise_code)
        print(f"✓ Created {base_path}/exercises/day1.{ext}")
    
    print(f"\n{'='*60}")
    print(f"✅ Week {week_num} scaffolding complete!")
    print(f"{'='*60}")
    print(f"\nLocation: {base_path}/")
    print(f"\nNext steps:")
    print(f"1. Review {base_path}/README.md")
    print(f"2. Add more exercises to exercises/ folder")
    print(f"3. Create solutions in solutions/ folder")
    print(f"4. Run: git add {base_path} && git commit -m 'Add week {week_num}'")
    
    return True

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 scaffold_single_week.py <week_number>")
        print("\nAvailable weeks:")
        for num, config in WEEKS.items():
            status = "✓" if os.path.exists(f"curriculum/weeks/{config['folder']}") else "○"
            print(f"  {status} Week {num}: {config['title']}")
        sys.exit(1)
    
    try:
        week_num = int(sys.argv[1])
    except ValueError:
        print(f"❌ Invalid week number: {sys.argv[1]}")
        sys.exit(1)
    
    # Change to repo root
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)
    os.chdir(repo_root)
    
    success = scaffold_week(week_num)
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
