# Week 4: React Fundamentals

**Theme:** Building modern UI with React  
**Duration:** 5 days  
**Goal:** Build a multi-page React SPA (blog or e-commerce frontend)

---

## Learning Objectives
- [ ] Understand React components and JSX
- [ ] Work with props and state
- [ ] Use React hooks (useState, useEffect, useContext)
- [ ] Implement client-side routing with React Router
- [ ] Manage component lifecycle
- [ ] Build reusable components

---

## Daily Breakdown

### Day 1: React Basics & JSX
**Topics:**
- What is React and why use it?
- Setting up a React project (Vite)
- JSX syntax and rules
- Components (function components)
- Props and passing data
- Rendering lists and keys

**Practice:**
- Create simple React components
- Pass props between components
- Render dynamic lists

**Resources:**
- [React Official Docs](https://react.dev/)
- [Vite Getting Started](https://vitejs.dev/guide/)

---

### Day 2: State with useState
**Topics:**
- What is state?
- useState hook basics
- Updating state
- Event handling in React
- Controlled components (forms)
- State vs props

**Practice:**
- Build a counter component
- Create a form with controlled inputs
- Handle button clicks and input changes

**Resources:**
- [useState Hook](https://react.dev/reference/react/useState)

---

### Day 3: useEffect Hook & Side Effects
**Topics:**
- Component lifecycle
- useEffect hook basics
- Dependencies array
- Cleanup functions
- Fetching data with useEffect
- Common useEffect patterns

**Practice:**
- Fetch data from an API on mount
- Create a timer with cleanup
- Watch state changes with useEffect

**Resources:**
- [useEffect Hook](https://react.dev/reference/react/useEffect)

---

### Day 4: React Router
**Topics:**
- Client-side routing basics
- Installing React Router
- Route, Routes, Link components
- useNavigate and useParams hooks
- Nested routes
- 404 pages

**Practice:**
- Set up multi-page navigation
- Create routes with parameters
- Build a navigation bar with links

**Resources:**
- [React Router Docs](https://reactrouter.com/)

---

### Day 5: Context API & State Management
**Topics:**
- Prop drilling problem
- React Context API
- useContext hook
- Creating and providing context
- When to use Context vs props
- Component composition patterns

**Practice:**
- Create a theme context (dark/light mode)
- Share user auth state across components
- Avoid prop drilling with Context

**Resources:**
- [useContext Hook](https://react.dev/reference/react/useContext)

---

## Week Project: React Blog or E-Commerce SPA

**Description:**  
Build a multi-page React application with routing, state management, and API integration.

**Option 1: Blog Application**
- [ ] Home page with list of blog posts
- [ ] Individual post page with routing
- [ ] Create new post form
- [ ] Edit/delete posts
- [ ] Categories or tags
- [ ] Search functionality
- [ ] localStorage for persistence

**Option 2: E-Commerce Frontend**
- [ ] Product listing page
- [ ] Product detail page with routing
- [ ] Shopping cart with Context API
- [ ] Add/remove from cart
- [ ] Cart total calculation
- [ ] Checkout form (UI only)
- [ ] Filter/search products

**Requirements (Both):**
- [ ] React Router for navigation
- [ ] useState for local component state
- [ ] useEffect for data fetching
- [ ] useContext for shared state
- [ ] Reusable components
- [ ] Responsive design
- [ ] PropTypes or TypeScript (bonus)

**Bonus:**
- [ ] Dark mode toggle with Context
- [ ] Pagination for lists
- [ ] Loading states and error handling
- [ ] localStorage for cart persistence
- [ ] CSS modules or styled-components

---

## 📁 Practice Files

All exercises are in the `exercises/` folder. Solutions in `solutions/`.

**Daily Exercises:**
- `day1/` - React basics and JSX practice
- `day2/` - useState exercises
- `day3/` - useEffect practice
- `day5/` - Context API examples

**How to work:**
1. Navigate to the exercise folder
2. Run `npm install` and `npm run dev`
3. Open http://localhost:5173
4. Edit components in the src/ folder
5. Get AI code review when done:
   ```bash
   python3 ../../../ollama_duo.py --file src/App.jsx --optimize --optimize-json
   ```

---

## Skills Checklist
- [ ] Create React components
- [ ] Write JSX syntax
- [ ] Pass and use props
- [ ] Manage state with useState
- [ ] Handle events in React
- [ ] Use useEffect for side effects
- [ ] Fetch data from APIs
- [ ] Set up React Router
- [ ] Navigate between pages
- [ ] Use URL parameters
- [ ] Create and consume Context
- [ ] Avoid prop drilling
- [ ] Build reusable components
- [ ] Handle lists and keys

---

## Resources
- [React Official Tutorial](https://react.dev/learn)
- [React Hooks Explained](https://www.youtube.com/watch?v=TNhaISOUy6Q)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [Vite + React Guide](https://vitejs.dev/guide/)
- [React Dev Tools Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/)

---

## Next Week Preview
Week 5: Node.js & Express - building backend APIs
