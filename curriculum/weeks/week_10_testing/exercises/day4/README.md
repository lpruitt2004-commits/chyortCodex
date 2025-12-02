# Day 4: Integration Testing (Service + Repo)

Goals:
- Design for testability via dependency injection
- Write integration tests around service + in-memory repo

Tasks:
1) Define `TaskRepo` interface with methods: `add`, `findById`, `list`, `remove`, `existsByTitle`.
2) Implement `TaskService` using the repo. Rules:
   - `create(title)` trims input; title must be non-empty
   - Title must be unique (check `existsByTitle`)
   - `list()` returns tasks
   - `remove(id)` returns boolean
3) Use a simple in-memory fake in tests to validate service behavior.

Run tests:
```bash
npm run day4
```
