# Week 4 – Day 5 Solution: Context API

Global state patterns implemented for theme + auth.

## Provided Contexts
- `ThemeContext` – light/dark + toggle
- `UserContext` – login/logout with session info

## Components
- `Header` consumes theme & toggles it
- `Content` reflects active theme styling
- `LoginForm` writes auth state
- `UserDisplay` conditionally renders auth view or form

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

## Patterns Shown
| Concept | Implementation |
| ------- | -------------- |
| Provider composition | `<ThemeProvider><UserProvider>…` |
| State lifting avoidance | context instead of prop drilling |
| Derived UI | theme className applied selectively |

## Extension Ideas
- Persist auth to `localStorage`
- Custom hooks `useTheme`, `useUser`
- Add role-based access control
- Multiple context consumers

## Capstone Connection
These patterns mirror global state you'll use in full-stack apps (auth, theming, session).
