# Day 5 Solution: Team Simulation

Suggested flow:
```bash
# Issues -> branches
# feature A
git switch -c feat/a
# ... code ...
git add -A && git commit -m "feat: implement A (#101)"
git push -u origin feat/a
# open PR, request review

# feature B
git switch -c feat/b
# ... code ...
git add -A && git commit -m "feat: implement B (#102)"
git push -u origin feat/b

# bugfix C
git switch -c fix/c
# ... code ...
git add -A && git commit -m "fix: address C (#103)"
git push -u origin fix/c

# after reviews and merges
git switch main
git pull --ff-only

git tag -a v1.0.0 -m "v1.0.0: A, B, and C"
git push --tags
```
Changelog snippet (example):
```
## 1.0.0 (2025-12-02)
### Features
- implement A (#101)
- implement B (#102)
### Fixes
- address C (#103)
```
