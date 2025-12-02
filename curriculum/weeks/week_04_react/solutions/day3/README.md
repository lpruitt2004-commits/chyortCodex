# Week 4 – Day 3 Solution: Effects & Lifecycle

Solution implementation for side effect patterns.

## Implemented Components
- Document title updater (`useEffect` dependency array)
- Interval timer with cleanup
- API fetch with loading/error states
- Window resize listener with teardown
- Search filter updating derived data

## Key Effect Patterns
| Pattern | Example |
| ------- | ------ |
| Run once | empty dependency `[]` |
| React to change | `[value]` dependency |
| Cleanup | return function in effect |
| Async work | inner `async` function |

## Run
```bash
npm install
npm run dev
```
Open: http://localhost:5173

## Scripts
- `npm run dev` – Start dev server
- `npm run build` – Production build
- `npm run preview` – Preview build
- `npm run lint` – Run ESLint

## Compare With Exercise
Notice:
- Guarded loading & error branches
- Single state objects vs multiple primitives
- Minimal effect scopes (no inline async directly in callback)
- Proper cleanup to avoid memory leaks

## Next Step
Advance to Router (Day 4) for navigation and dynamic URLs.
