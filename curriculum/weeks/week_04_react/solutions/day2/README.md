# Week 4 – Day 2 Solution: State & Event Handling

This project contains the completed solution for Day 2.

## Implemented Exercises
- Counter with increment/decrement/reset
- Toggle component with dynamic styling
- Controlled input mirror with live output & clear action
- Login form with validation and success feedback
- Todo list (add, delete, empty state)

## Patterns Demonstrated
- Functional state updates (`setState(prev => ...)`)
- Controlled inputs with value/onChange
- Basic validation and conditional rendering
- Immutable array operations (spread, filter)
- Event handlers and user interactions

## Run It
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
Focus on:
- Clear event handlers
- Separation of transient (input) and persistent (todos) state
- Early returns for validation errors
- Immutable state updates

## Next Step
Move to Day 3 (Effects & Lifecycle) for side effects and data fetching.
