# Day 2: Async & Mocking

Goals:
- Master fake timers with promises
- Mock collaborators to isolate units

Tasks:
1) Implement `delay(ms)` that resolves after `ms` using `setTimeout`.
2) Implement `retry(fn, attempts)` to retry an async function on failure.
3) Implement `getUserName(id, client)` where `client.get(url)` returns `{ name: string }`.

Run tests:
```bash
npm run day2
```
