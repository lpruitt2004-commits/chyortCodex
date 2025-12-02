# Week 1: HTML & CSS Fundamentals

**Theme:** Building blocks of the web  
**Duration:** 5 days  
**Goal:** Create a responsive portfolio landing page

---

## Learning Objectives
- [ ] Write semantic HTML5 markup
- [ ] Style layouts with CSS Flexbox and Grid
- [ ] Implement responsive design (mobile-first)
- [ ] Understand the CSS box model
- [ ] Use Chrome DevTools for debugging

---

## Daily Breakdown

### Day 1: HTML Fundamentals
**Topics:**
- HTML structure (DOCTYPE, head, body)
- Semantic elements (header, nav, main, section, article, footer)
- Forms and input types
- Lists, tables, links

**Practice:**
- Build a basic resume page with semantic HTML

**Resources:**
- [MDN HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/HTML)

---

### Day 2: CSS Basics & Box Model
**Topics:**
- CSS selectors (class, id, element, pseudo)
- Box model (margin, border, padding, content)
- Colors, fonts, typography
- Units (px, rem, em, %, vh/vw)

**Practice:**
- Style the resume page from Day 1

**Resources:**
- [CSS Box Model Explained](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)

---

### Day 3: Flexbox Layout
**Topics:**
- Flex container properties (justify-content, align-items, flex-direction)
- Flex item properties (flex-grow, flex-shrink, order)
- Building navigation bars
- Centering content

**Practice:**
- Create a responsive navbar and card layout

**Resources:**
- [Flexbox Froggy Game](https://flexboxfroggy.com/)
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
