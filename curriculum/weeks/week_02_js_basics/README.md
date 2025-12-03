# Week 2: JavaScript Basics (Robin Nixon, Learning PHP, MySQL & JavaScript 5th Edition)

**Theme:** Adding Interactivity with JavaScript  
**Duration:** 5 days  
**Goal:** Understand and use JavaScript to add dynamic features to web pages

---

## Learning Objectives

- [ ] Understand JavaScript syntax and core concepts
- [ ] Use variables, operators, and control structures
- [ ] Write and use functions
- [ ] Manipulate the DOM and handle events
- [ ] Validate forms with JavaScript

---

## Daily Breakdown (with Nixon Book References)

### Day 1: JavaScript Introduction & Syntax

**Reading:**

- Chapter 4: Introduction to JavaScript
  **Topics:**
- Embedding JavaScript in HTML
- Variables, data types, operators
- Basic input/output (alert, prompt, console.log)
  **Exercise:**
- Write a script that greets the user and displays today’s date

---

### Day 2: Control Structures & Functions

**Reading:**

- Chapter 4: Introduction to JavaScript (cont.)
  **Topics:**
- Conditionals (if, else, switch)
- Loops (for, while, do...while)
- Functions (declaration, parameters, return)
  **Exercise:**
- Create a function that checks if a number is even or odd; use a loop to print numbers 1-10

---

### Day 3: Arrays & Objects

**Reading:**

- Chapter 4: Introduction to JavaScript (arrays/objects section)
  **Topics:**
- Arrays (creation, access, methods)
- Objects (properties, methods)
- Iterating over arrays/objects
  **Exercise:**
- Build a list of your favorite books as an array of objects and display them

---

### Day 4: DOM Manipulation & Events

**Reading:**

- Chapter 5: Using JavaScript
  **Topics:**
- Selecting and modifying HTML elements
- Handling events (click, input, submit)
- Changing styles and content dynamically
  **Exercise:**
- Make a button that changes the background color of the page

---

### Day 5: Form Validation & Mini Project

**Reading:**

- Chapter 5: Using JavaScript (forms section)
  **Topics:**
- Validating form input with JavaScript
- Preventing form submission on error
- Integrating JS with HTML forms
  **Exercise:**
- Add validation to your contact form from week 1 (require name/email, check email format)

---

## Resources

- [Robin Nixon’s Book Companion Site](https://www.robinixon.com/)
- [W3Schools JavaScript Tutorial](https://www.w3schools.com/js/)

---

## Project for the Week

**Enhance your personal homepage** by adding:

- A greeting script
- A dynamic list (e.g., favorite books)
- A button to change background color
- Form validation for your contact form

---

## Tips

- Reference the book’s code examples as you build
- Test your scripts in different browsers
- Use browser dev tools for debugging

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
