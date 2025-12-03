# Week 1: HTML & CSS Foundations (Robin Nixon, Learning PHP, MySQL & JavaScript 5th Edition)

**Theme:** Building the Web’s Foundation  
**Duration:** 5 days  
**Goal:** Understand and use HTML5 and CSS3 to create basic web pages

---

## Learning Objectives

- [ ] Understand the structure of an HTML document
- [ ] Use common HTML elements (headings, paragraphs, lists, links, images, tables, forms)
- [ ] Apply CSS for layout, color, and typography
- [ ] Make pages visually appealing and accessible

---

## Daily Breakdown (with Nixon Book References)

### Day 1: Introduction to the Web & HTML Basics

**Reading:**

- Chapter 1: Introduction to Dynamic Web Programming
- Chapter 2: Getting Started with HTML
  **Topics:**
- What is a website? How browsers work
- HTML document structure (DOCTYPE, html, head, body)
- Headings, paragraphs, line breaks, comments
  **Exercise:**
- Create a simple "About Me" page with headings and paragraphs

---

### Day 2: More HTML Elements

**Reading:**

- Chapter 2: Getting Started with HTML (cont.)
  **Topics:**
- Lists (ordered, unordered, definition)
- Links and images
- Tables (basic structure)
  **Exercise:**
- Add a list of your favorite things, an image, and a table to your page

---

### Day 3: HTML Forms & Structure

**Reading:**

- Chapter 2: Getting Started with HTML (forms section)
  **Topics:**
- Creating forms (input, textarea, select, button)
- Form attributes and accessibility
- Grouping content with div and span
  **Exercise:**
- Add a contact form to your page

---

### Day 4: CSS Fundamentals

**Reading:**

- Chapter 3: Introduction to CSS
  **Topics:**
- CSS syntax and selectors
- Colors, backgrounds, borders
- Fonts and text styling
  **Exercise:**
- Style your page: set background color, change fonts, add borders

---

### Day 5: CSS Layout & Responsive Design

**Reading:**

- Chapter 3: Introduction to CSS (cont.)
  **Topics:**
- Box model (margin, border, padding, content)
- Layout with float, display, and position
- Responsive design basics (media queries)
  **Exercise:**
- Make your page mobile-friendly and visually appealing

---

## Resources

- [Robin Nixon’s Book Companion Site](https://www.robinixon.com/)
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
- [W3Schools CSS Tutorial](https://www.w3schools.com/css/)

---

## Project for the Week

**Build a personal homepage** that includes:

- Headings, paragraphs, lists, links, images, and a table
- A contact form
- CSS styling for layout and color
- Responsive design for mobile devices

---

## Tips

- Reference the book’s code examples as you build
- Experiment with different HTML elements and CSS properties
- Validate your HTML and CSS using online validators
- [CSS Tricks Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

### Day 4: CSS Grid

**Topics:**

- Grid container and items
- Grid template rows/columns
- Grid areas and gaps
- Responsive grids with auto-fit/auto-fill

**Practice:**

- Build a photo gallery grid
- Create a dashboard layout

**Resources:**

- [Grid Garden Game](https://cssgridgarden.com/)
- [CSS Tricks Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

### Day 5: Responsive Design

**Topics:**

- Mobile-first approach
- Media queries
- Responsive images
- Viewport meta tag
- CSS variables

**Practice:**

- Make all previous projects responsive

**Resources:**

- [Responsive Web Design Basics](https://web.dev/responsive-web-design-basics/)

---

## Week Project: Portfolio Landing Page

**Description:**  
Build a professional portfolio landing page with sections for:

- Hero section with name and tagline
- About section
- Skills section with icons
- Projects section (placeholders for now)
- Contact form
- Footer

**Requirements:**

- [ ] Semantic HTML5
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Flexbox for navbar and sections
- [ ] Grid for projects layout
- [ ] Smooth scrolling navigation
- [ ] Custom CSS (no frameworks)
- [ ] Deployed to GitHub Pages or Netlify

**Bonus:**

- [ ] CSS animations on scroll
- [ ] Dark mode toggle
- [ ] Custom favicon

---

## 📁 Practice Files

All exercises are in the `exercises/` folder. Solutions in `solutions/`.

**Daily Exercises:**

- `day1.html` & `day1.css` - HTML resume page
- `day3.html` & `day3.css` - Flexbox navbar and cards
- `day4.html` & `day4.css` - CSS Grid photo gallery

**How to work:**

1. Open the HTML file in your browser
2. Write your code in VS Code
3. Refresh browser to see changes
4. When done, get AI code review:
   ```bash
   ./review_code.sh exercises/day1.html
   ```

**Alternative review:**

```bash
python3 ../../ollama_duo.py --file exercises/day1.html --optimize --optimize-json
```

---

## Skills Checklist

- [ ] HTML5 semantic elements
- [ ] CSS selectors and specificity
- [ ] Box model understanding
- [ ] Flexbox layouts
- [ ] CSS Grid layouts
- [ ] Media queries
- [ ] Responsive design principles
- [ ] Browser DevTools

---

## Resources

- [freeCodeCamp Responsive Web Design](https://www.freecodecamp.org/learn/responsive-web-design/)
- [Frontend Mentor HTML/CSS Challenges](https://www.frontendmentor.io/)
- [Can I Use](https://caniuse.com/) - Browser compatibility

---

## Next Week Preview

Week 2: JavaScript basics - adding interactivity to your pages
