# Day 5: Coverage & Testing Patterns

Goals:
- Enforce coverage and practice clean patterns
- Use test data builders and type guards

Tasks:
1) Implement `isNonEmptyString(v): v is string` and `asNumber(v): number` in `utils.ts`.
   - `isNonEmptyString` trims and checks non-empty
   - `asNumber` accepts numbers or numeric strings; throws on invalid
2) Implement a simple `taskBuilder` in `utils.ts` that returns `{ id, title }` with sensible defaults and overrides.
3) Write tests in `utils.test.ts` using Arrange-Act-Assert and builders.

Run tests:
```bash
npm run day5
```
