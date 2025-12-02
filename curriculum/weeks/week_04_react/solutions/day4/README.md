# Week 4 – Day 4 Solution: React Router

Completed routing solution with navigation and dynamic routes.

## Features
- Navigation bar with semantic `<nav>` and accessible links
- Routes: Home / About / Contact / Users / User profile / 404
- Dynamic URL segment (`/users/:userId`) with `useParams`
- Programmatic navigation via `useNavigate`
- Graceful not found fallback

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

## Implementation Notes
- Keeps user data mock inline for clarity
- `NotFound` gives a recovery action (Go Home)
- `UsersList` uses stable keys and link composition
- Router wraps entire app in `BrowserRouter`

## Extend Ideas
- Nested routes for user sub-sections
- Suspense + lazy loaded route components
- Protected routes wrapper
- Active link styling with NavLink

## Next Step
Move to Day 5 for global state via Context API.
