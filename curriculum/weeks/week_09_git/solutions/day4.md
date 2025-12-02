# Day 4 Solution: Advanced Git

Example commands and rationale:
```bash
# 1) squash WIP commits
git rebase -i HEAD~3  # mark first as pick, others as squash/fixup

# 2) cherry-pick a commit from another branch
git log other-branch --oneline
git cherry-pick <commit_sha>

# 3) bisect to find a bug source
git bisect start
git bisect bad HEAD
git bisect good v0.1.0
# run tests until git suggests the first bad commit
git bisect reset

# 4) tags
git tag -a v0.1.0 -m "v0.1.0"
git tag -n

# 5) stash partial
git stash push -m "wip partial" -- path/to/file
# later
git stash list
git stash apply stash@{0}
git stash drop stash@{0}

# 6) worktree for hotfix
git worktree add ../hotfix hotfix/urgent
```
