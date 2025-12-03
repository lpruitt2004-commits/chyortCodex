# Day 3 Solution: Remotes & PR Workflow

Example commands:
```bash
# Clone fork (origin)
git clone git@github.com:youruser/chyortCodex.git
cd chyortCodex

# Add upstream
git remote add upstream git@github.com:lpruitt2004-commits/chyortCodex.git
git remote -v

# Feature branch
git switch -c feature/profile
# ... changes ...
git add -A && git commit -m "feat(profile): add profile section"

git push -u origin feature/profile
# Open PR on GitHub from origin/feature/profile -> upstream/main

# Sync with upstream
git fetch upstream
# Rebase preferred for a clean history
git rebase upstream/main
# or: git merge upstream/main

git push --force-with-lease
```
Notes:
- Use `--force-with-lease` when updating a rebased branch.
- Keep PRs small and focused for easier reviews.
