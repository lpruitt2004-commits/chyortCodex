# Week 4: React Fundamentals

## Overview
Build dynamic user interfaces with React. Learn component composition, state management, hooks, and modern React patterns using React CDN for quick learning.

## Learning Objectives
- Understand JSX syntax and component composition
- Manage state with useState and handle user events
- Work with side effects using useEffect
- Build forms with validation
- Share state with Context API
- Apply React best practices

## Daily Breakdown

### Day 1: Components & JSX
**Topics**: Functional components, JSX syntax, props, conditional rendering

**Exercises**:
- Build a Welcome component that renders a personalized greeting
- Create a UserCard component displaying user information
- Build a ProductList component mapping over data arrays
- Implement conditional rendering based on props
- Use proper key props in lists

### Day 2: State & Event Handling
**Topics**: useState hook, event handlers, controlled inputs

**Exercises**:
- Counter with increment/decrement/reset buttons
- Toggle switch component with conditional styling
- Text mirror component that displays input as you type
- Form validation basics

### Day 3: Effects & Lifecycle
**Topics**: useEffect hook, cleanup functions, dependency arrays, data fetching

**Exercises**:
- Document title updater based on input
- Interval-based timer component with cleanup
- Data fetching with loading states
- Side effect patterns and best practices

### Day 4: Forms & Validation
**Topics**: Form handling, validation patterns, controlled components

**Exercises**:
- Login form with email/password validation
- Registration form with multiple fields
- Todo list with add/remove functionality
- Form error handling

### Day 5: Context API
**Topics**: Context API, createContext, Provider, useContext

**Exercises**:
- Create ThemeContext for light/dark mode
- Build UserContext for authentication state
- Use useContext hook to consume context
- Combine multiple contexts

## Running the Exercises
Each exercise is a single HTML file with React loaded via CDN:

```bash
cd curriculum/weeks/week_04_react/exercises

# Open in browser
firefox day1.html
# or
google-chrome day1.html
# or simply double-click the file
```

Compare with solutions:
```bash
cd ../solutions
firefox day1.html
```

## Code Review
Get AI feedback on your solutions:
```bash
python3 ../../ollama_duo.py --file exercises/day1.html --optimize
```

## Skills Checklist
- [ ] Create functional components with JSX
- [ ] Use props to pass data between components
- [ ] Manage component state with useState
- [ ] Handle user events (clicks, inputs, forms)
- [ ] Use useEffect for side effects and lifecycle
- [ ] Fetch data from APIs with proper loading states
- [ ] Build controlled form components with validation
- [ ] Share state globally with Context API
- [ ] Apply React best practices (keys, immutability, cleanup)

## Resources
- React Docs: https://react.dev/
- useState Hook: https://react.dev/reference/react/useState
- useEffect Hook: https://react.dev/reference/react/useEffect
- Context API: https://react.dev/reference/react/createContext
- React Tutorial: https://react.dev/learn
