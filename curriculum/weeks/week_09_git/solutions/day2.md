# Day 2 Solution: Branching & Merging

Example commands:
```bash
# header
git switch -c feature/header
echo "<header>Header</header>" > header.html
git add header.html
git commit -m "feat(header): add header layout"

# footer
git switch main
git switch -c feature/footer
echo "<footer>Footer</footer>" > footer.html
git add footer.html
git commit -m "feat(footer): add footer layout"

# merge header first
git switch main
git merge --ff-only feature/header

# merge footer (may create merge commit)
git merge feature/footer

# conflict example
git switch -c conflict/a
printf "A\n" > index.html
git add index.html && git commit -m "feat: add A"

git switch main
git switch -c conflict/b
printf "B\n" > index.html
git add index.html && git commit -m "feat: add B"

git switch conflict/a
git merge conflict/b  # resolve markers in index.html
# edit file to final
git add index.html
git commit

# safe rebase example
git switch feature/footer
git rebase main
```
Notes: Prefer rebase on local feature branches; avoid rebasing shared branches.
