# Day 2: Branching & Merging — Exercises

Goal: Create branches, implement features, and merge resolving conflicts.

Tasks:
1) Create `feature/header` and add a `header.html` file. Commit with `feat(header): add header layout`.
2) Switch to `main`, create `feature/footer` and add `footer.html`. Commit with `feat(footer): add footer layout`.
3) Merge `feature/header` into `main` (fast‑forward).
4) Merge `feature/footer` into `main` (should create a merge commit if diverged).
5) Create conflicting changes in `index.html` on two branches and resolve the conflict during merge.
6) Practice a safe rebase: rebase `feature/footer` onto `main` after `feature/header` merge.

Deliverables:
- Commands used and brief notes on each merge result.
- A screenshot or paste of conflict markers and the final resolution.
