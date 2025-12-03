# Day 3: Remotes & PR Workflow — Exercises

Goal: Work with remotes and simulate a PR lifecycle.

Tasks:
1) Fork the main repo to your account (or simulate with a second remote `upstream`).
2) Clone your fork. Verify `origin` and add `upstream` pointing to the original.
3) Create a `feature/profile` branch, push it to your fork, and open a PR.
4) Fetch upstream changes and update your branch (`git fetch upstream` + rebase or merge).
5) Respond to a code review: amend commit or add fixup commits and update the PR.
6) After approval, merge the PR on the platform or simulate by merging locally and pushing.

Deliverables:
- `git remote -v` output and commands used to sync branches.
- Short note describing the PR flow you used (rebase vs merge).
