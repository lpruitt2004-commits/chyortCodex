# Day 3: API Testing with Supertest

Goals:
- Build a minimal Express API
- Test endpoints with Supertest (happy + edge paths)

Tasks:
1) Implement an Express app in `app.ts` with endpoints:
   - GET `/health` → `{ ok: true }`
   - GET `/tasks` → list tasks
   - POST `/tasks` with `{ title: string }` → create + return `{ id, title }`
   - DELETE `/tasks/:id` → 204 if removed; 404 if not found
2) Keep state in-memory for simplicity.

Run tests:
```bash
npm run day3
```
