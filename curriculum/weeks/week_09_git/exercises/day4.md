# Day 4: Advanced Git — Exercises

Goal: Practice history cleanup and diagnostics.

Tasks:
1) Create 3 WIP commits, then use `git rebase -i` to squash into one clean commit.
2) Use `git cherry-pick` to apply a single commit from another branch.
3) Introduce a bug intentionally, then use `git bisect` to locate the offending commit.
4) Create a tag `v0.1.0` (annotated) and list tags.
5) Use `git stash` (with paths) to shelve changes; apply and drop the stash.
6) Create a linked worktree for a hotfix branch.

Deliverables:
- Commands used and short rationale for each advanced operation.
- Output of `git tag -n` and `git bisect` summary.
