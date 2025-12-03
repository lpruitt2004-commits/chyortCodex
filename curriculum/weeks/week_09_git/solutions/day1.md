# Day 1 Solution: Git Fundamentals

Example commands:
```bash
mkdir -p The-Directory/week9-demo
cd The-Directory/week9-demo
echo "# Week 9 Demo" > README.md
echo -e "node_modules/\n.env\n" > .gitignore

git init -b main
git add README.md
git commit -m "feat: add README with project purpose"

git add .gitignore
git commit -m "chore: add .gitignore for node and env"

git log --oneline --graph -n 5
git show HEAD
echo "\nDetails" >> README.md
git diff

echo "scratch" > tmp.txt
git add tmp.txt
git restore --staged tmp.txt
```
Expected `git log --oneline --graph` shows two commits on main.
