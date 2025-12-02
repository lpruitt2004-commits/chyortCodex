# Week 2: JavaScript Basics

**Theme:** Adding interactivity to web pages  
**Duration:** 5 days  
**Goal:** Build an interactive to-do list application

---

## Learning Objectives
- [ ] Understand JavaScript fundamentals (variables, data types, operators)
- [ ] Write functions and understand scope
- [ ] Manipulate the DOM
- [ ] Handle user events
- [ ] Store data in localStorage

---

## Daily Breakdown

### Day 1: JavaScript Fundamentals
**Topics:**
- Variables (let, const, var)
- Data types (string, number, boolean, array, object)
- Operators (arithmetic, comparison, logical)
- Conditionals (if/else, switch, ternary)
- Loops (for, while, forEach)

**Practice:**
- FizzBuzz challenge
- Array manipulation exercises

---

### Day 2: Functions & Scope
**Topics:**
- Function declarations vs expressions
- Arrow functions
- Parameters and arguments
- Return values
- Scope (global, function, block)
- Closures basics

**Practice:**
- Build calculator functions
- Create utility functions

---

### Day 3: DOM Manipulation
**Topics:**
- Selecting elements (querySelector, getElementById)
- Creating and removing elements
- Modifying element content and attributes
- Traversing the DOM
- classList manipulation

**Practice:**
- Build a dynamic UI that adds/removes elements

---

### Day 4: Event Handling
**Topics:**
- addEventListener
- Event types (click, input, submit, keydown)
- Event object and preventDefault
- Event delegation
- Form validation

**Practice:**
- Create interactive forms
- Build click counters and toggles

---

### Day 5: localStorage & JSON
**Topics:**
- localStorage API (getItem, setItem, removeItem)
- JSON.stringify and JSON.parse
- Data persistence
- Debugging with console.log

**Practice:**
- Save and load data from localStorage

---

## Week Project: Interactive To-Do List

**Description:**  
Build a to-do list app with full CRUD functionality and data persistence.

**Requirements:**
- [ ] Add new tasks with input field
- [ ] Mark tasks as complete (toggle)
- [ ] Delete tasks
- [ ] Edit existing tasks
- [ ] Filter tasks (all, active, completed)
- [ ] Clear completed tasks
- [ ] Persist data with localStorage
- [ ] Task counter
- [ ] Responsive design

**Bonus:**
- [ ] Drag and drop to reorder
- [ ] Due dates for tasks
- [ ] Priority levels (color-coded)
- [ ] Categories/tags

---

## 📁 Practice Files

All exercises are in the `exercises/` folder.

**Daily Exercises:**
- `day1.html` & `day1.js` - JavaScript fundamentals (variables, loops, functions)
- `day3.html` & `day3.js` - DOM manipulation practice

**How to work:**
1. Open the HTML file in your browser
2. Open browser console (F12) to see output
3. Write your code in the .js file
4. Refresh browser to test
5. Get AI code review when done:
   ```bash
   ./review_code.sh exercises/day1.js
   ```

**Alternative review:**
```bash
python3 ../../ollama_duo.py --file exercises/day1.js --optimize --optimize-json
```

---

## Skills Checklist
- [ ] Variables and data types
- [ ] Functions and scope
- [ ] Array methods (push, pop, map, filter)
- [ ] Object manipulation
- [ ] DOM selection and manipulation
- [ ] Event listeners
- [ ] localStorage API
- [ ] JSON parsing

---

## Resources
- [JavaScript.info](https://javascript.info/)
- [Eloquent JavaScript Book](https://eloquentjavascript.net/)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

---

## Next Week Preview
Week 3: Advanced JavaScript - async programming and APIs
