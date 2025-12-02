# Week 10: Testing & TypeScript

## Overview
Level up your engineering rigor with TypeScript and testing. You’ll write unit, async, and API tests with Jest, apply mocking and fakes, and add integration tests around simple services. Finish by enforcing coverage and clean testing patterns.

## Learning Objectives
- Configure Jest for TypeScript with `ts-jest`
- Write unit tests for pure functions and types
- Test async code (timers, promises) and mock collaborators
- Test Express APIs with Supertest
- Structure services for testability (dependency injection)
- Enforce coverage and adopt healthy testing patterns

## Daily Breakdown

### Day 1: TS + Jest Fundamentals
- Setup ts-jest, first tests, matchers
- Pure functions + edge cases, TDD loop

### Day 2: Async & Mocking
- Fake timers, promise flows
- Mock fetch/HTTP and isolate units

### Day 3: API Testing
- Minimal Express app
- Supertest for endpoints (happy/edge paths)

### Day 4: Integration Testing
- Service + repository pattern with in-memory repo
- Error cases and boundary conditions

### Day 5: Coverage & Patterns
- Coverage thresholds, useful patterns (arrange-act-assert)
- Test data builders, type guards

## Project: Tested Mini-Service
Build a small service (tasks or notes) with:
- Unit tests for utilities
- API tests for CRUD endpoints
- Integration tests for service + repo
- Coverage thresholds ≥ 80%

## Commands
```bash
cd curriculum/weeks/week_10_testing
npm install
npm test
npm run day1   # run day1-focused tests
```

## Skills Checklist
- [ ] Configure Jest + TS
- [ ] Write clean, isolated unit tests
- [ ] Use fake timers and mocks
- [ ] Test Express endpoints with Supertest
- [ ] Structure services for testability
- [ ] Enforce coverage thresholds

## Resources
- Jest Docs: https://jestjs.io/docs/getting-started
- ts-jest: https://kulshekhar.github.io/ts-jest/
- Supertest: https://github.com/ladjs/supertest
- TypeScript Handbook: https://www.typescriptlang.org/docs/
