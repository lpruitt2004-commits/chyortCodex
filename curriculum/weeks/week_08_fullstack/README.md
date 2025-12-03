# Week 8: Full-Stack Integration (Client + API + DB)

## Overview
Build a cohesive full‑stack feature: a Tasks app powered by an Express API (PostgreSQL) with a minimal client (vanilla HTML/JS served statically). Focus on clean API design, client integration with fetch, auth, and state management. We avoid React build tooling to keep the week self‑contained and runnable.

## Learning Objectives
- Design a client‑friendly REST API with PostgreSQL
- Implement auth on the backend and persist client sessions/tokens
- Build a minimal client that consumes the API via fetch
- Handle loading/error states and optimistic UI
- Prepare a production‑minded Node server (envs, CORS, logging)

## Daily Breakdown

### Day 1: API + DB Skeleton
- Setup Express + `pg` pool, `.env`, CORS, morgan
- Define schema and seed script for tasks (users, tasks)
- Basic endpoints: health, list tasks (public or mock user)

### Day 2: Create/Update/Delete (CRUD)
- POST/PUT/DELETE for tasks with validation
- Error handling pattern (400/404/500) and input checks
- Return consistent JSON responses

### Day 3: Auth + Protected Endpoints
- Register/Login issuing JWT access token
- Auth middleware (Bearer) and user‑scoped tasks
- Logout, token invalidation strategy (in‑memory)

### Day 4: Client Integration
- Static `index.html` + `app.js` served from Express
- Login form, task list, add/edit/delete with fetch
- Loading, errors, token storage, and logout

### Day 5: Polish & Packaging
- Pagination/filters, input validation, 404/500 page
- Security (helmet, rate limit), production env
- Run scripts and docs for launch

## Week Project: Tasks App (Full‑Stack)
- Users can register/login
- Create/read/update/delete tasks (title, description, status)
- Auth protects task mutating routes; tasks scoped by user
- Simple client UI to manage tasks

## Setup

```bash
cd curriculum/weeks/week_08_fullstack
cp .env.example .env
npm install
npm run db:setup
npm run day4
```

### .env.example
```
PORT=3000
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=week8_tasks
JWT_SECRET=dev_super_secret_change_me
NODE_ENV=development
```

## Skills Checklist
- [ ] Express + `pg` pool with env config
- [ ] Schema + seed scripts
- [ ] CRUD routes with validation and errors
- [ ] JWT auth middleware + user scoping
- [ ] Client fetch integration with tokens
- [ ] Helmet, rate limiting, and robust logging

## Try It
- Day 1 API: `npm run day1`
- Day 2 CRUD: `npm run day2`
- Day 3 Auth: `npm run day3`
- Day 4 Client: `npm run day4`
- Day 5 Polish: `npm run day5`
