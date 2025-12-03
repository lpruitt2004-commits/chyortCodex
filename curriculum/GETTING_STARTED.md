# 👨‍🏫 How to Use This Curriculum

Welcome! This curriculum is inspired by Robin Nixon’s "Learning PHP, MySQL & JavaScript (5th Edition)" and is organized into week-by-week folders. Each week’s README and exercises are mapped to chapters and topics from the book, so you always know what to read and practice.

You’ll work through hands-on exercises, get instant AI code reviews, and build real projects—just like a modern coding bootcamp, but with a focus on the Nixon stack.

---

## 📅 Quick Workflow

<<<<<<< HEAD

1. **Read the Week’s README**
   - Example: `code curriculum/weeks/week_01_html_css/README.md`
   - _Where to find book references:_ Each README lists the Nixon chapters/sections for the week’s topics and exercises.
2. **Do the Daily Exercise**
   - Example: `code curriculum/weeks/week_01_html_css/exercises/day1.html`
3. **Test in Browser**
   - Open your HTML file, refresh to see changes, check the console for errors.
4. **Get AI Code Review**
   - Example: `./review_code.sh exercises/day1.html`
5. **Fix Issues & Repeat**
   - Read feedback, fix code, re-run review until clean.
6. **Move to Solutions**
   - Example: `cp exercises/day1.html solutions/day1.html`
7. **Track Progress**
   - # Example: `code curriculum/PROGRESS.md`

### 1. Read the Week Overview

```bash
open curriculum/weeks/week_01_html_css/README.md
```

### 2. Complete Daily Exercises

Each day has practice files in the `exercises/` folder:

**Example - Week 1, Day 1:**

```bash
# Open the exercise
open curriculum/weeks/week_01_html_css/exercises/day1.html

# Edit in VS Code
code curriculum/weeks/week_01_html_css/exercises/day1.html
code curriculum/weeks/week_01_html_css/exercises/day1.css
```

### 3. Test Your Work

- Open the HTML file in your browser
- Refresh browser to see updates
- Check browser console (F12) for JavaScript errors

### 4. Get AI Code Review (Your "Instructor")

When you finish an exercise, get it reviewed:

```bash
legion --file exercises/day1.html --optimize
```

**What the AI checks:**

- ✅ Code correctness
- ✅ Best practices
- ✅ Performance issues
- ✅ Bugs or edge cases
- ✅ Suggestions for improvement

### 5. Fix Issues & Re-submit

If the AI finds issues:

1. Read the feedback
2. Fix your code
3. Run review again

### 6. Move to Solutions

Once your code is solid:

```bash
cp exercises/day1.html solutions/day1.html
cp exercises/day1.css solutions/day1.css
```

### 7. Track Progress

Mark items complete in your progress tracker:

```bash
open curriculum/PROGRESS.md
```

> > > > > > > 755e7f0a4fc4f5d55cadacf50517299ff5bcc900

---

---

## 📂 Folder Structure & Week Mapping

```
curriculum/
├── README.md                    # Navigation hub
├── PROGRESS.md                  # Your progress tracker
├── GETTING_STARTED.md          # This file
│
├── weeks/
│   ├── week_01_html_css/         # Nixon Ch. 1-3: HTML & CSS
│   ├── week_02_js_basics/        # Nixon Ch. 4-5: JavaScript
│   ├── week_03_php_basics/       # Nixon Ch. 6-8: PHP
│   ├── week_04_mysql_integration/# Nixon Ch. 9-12: MySQL & PHP
│
└── projects/
    ├── project_01_portfolio/
    │   └── README.md           # Full project spec
---


### Quick Review
```

=======

### Detailed Review with JSON output

> > > > > > > 755e7f0a4fc4f5d55cadacf50517299ff5bcc900
> > > > > > > legion --file exercises/day1.html --optimize --optimize-json

````

### Ask Questions

```bash
legion -p "Explain CSS Flexbox with examples"
````

### Debug Help

```bash
legion -p "Why is my flexbox not centering? [paste your code]"
```

### Project Ideas

```bash
legion -p "Suggest a beginner HTML/CSS project"
```

---

<<<<<<< HEAD

## 📋 Week-by-Week Guide (with Book References)

=======

### Week 1: HTML & CSS

**Files to complete:**

- [ ] `exercises/day1.html` & `day1.css` (Resume page)
- [ ] `exercises/day3.html` & `day3.css` (Flexbox layout)
- [ ] `exercises/day4.html` & `day4.css` (CSS Grid gallery)
- [ ] `exercises/day5.html` & `day5.css` (Responsive design)
- [ ] Week project: Portfolio landing page
  > > > > > > > 755e7f0a4fc4f5d55cadacf50517299ff5bcc900

### Week 1: HTML & CSS (Nixon Ch. 1-3)

- [ ] Complete daily exercises in `exercises/`
- [ ] Project: Personal homepage
- _Book references in README_

### Week 2: JavaScript Basics (Nixon Ch. 4-5)

- [ ] Complete daily exercises in `exercises/`
- [ ] Project: Interactive form
- [ ] Complete daily exercises in `exercises/`
- [ ] Project: Contact form with PHP
- [ ] Complete daily exercises in `exercises/`
- [ ] Project: Guestbook/blog

### Week 3: Advanced JavaScript

- [ ] `exercises/day1.js` (Objects & prototypes)
- [ ] `exercises/day3.js` (Async/await)
- [ ] `exercises/day5.js` (ES6+ features)

3. Test in browser
4. Get AI review

- [ ] `exercises/day1.html` (Components & JSX)
- [ ] `exercises/day2.html` (State & Events)
      **Daily routine:**

2. Open HTML file in browser (React loaded via CDN)
3. Complete exercises in <script> tags
4. Test in browser
5. Get AI review
6. Move to solutions/

---

## 🎯 Tips for Success

- Set aside 4-6 hours minimum
- Consistency beats cramming

### 2. Don't Just Copy

- Type out the code yourself
- Understand every line
- Experiment and break things

### 3. Use the AI Instructor

- Ask questions when stuck
- Get explanations for concepts

- Complete all weekly projects
- Deploy them live
- Add to your portfolio

### 5. Track Your Progress

- Check off skills as you master them
- Celebrate small wins
- Review previous work

---

## 🆘 Getting Help

### Stuck on a concept?

```bash
legion -p "Explain [concept] with simple examples"
```

### Code not working?

1. Check browser console for errors
2. Use console.log() to debug
3. Ask AI: `legion -p "Debug this error: [error message]"`

### Need a better explanation?

```bash
legion -p "Explain CSS Grid like I'm 10 years old"
```

---

## 📊 Measuring Progress

### Daily

- [ ] Complete day's exercise
- [ ] Get AI review
- [ ] Fix all issues
- [ ] Understand the concepts

### Weekly

- [ ] All exercises complete
- [ ] Week project finished
- [ ] Project deployed (when applicable)
- [ ] Skills checklist updated

### Phase (4 weeks)

- [ ] All 4 weeks complete
- [ ] All projects in portfolio
- [ ] Can explain concepts clearly
- [ ] Ready for next phase

---

## 🚀 What Success Looks Like

**After Week 1:**

- Build responsive pages from scratch
- Understand Flexbox and Grid
- Portfolio site deployed

**After Week 2:**

- Add interactivity with JavaScript
- Manipulate the DOM
- Handle user events
- Working to-do app

**After 12 Weeks:**

- 12+ portfolio projects
- Full-stack skills
- Deployed applications
- Ready for internships

---

## 💡 Pro Tips

1. **Read error messages carefully** - They tell you exactly what's wrong
2. **Use browser DevTools** - Inspect, debug, test responsive design
3. **Comment your code** - Explain complex parts
4. **Commit to Git often** - Save your progress
5. **Deploy early** - See your work live
6. **Ask questions** - Use the AI instructor liberally

---

## 🎓 Next Steps

**Week 1, Day 1 Action Plan:**

1. ✅ Read this guide
2. Open `curriculum/weeks/week_01_html_css/README.md`
3. Read Day 1 objectives
4. Open `exercises/day1.html` in browser
5. Start coding!
6. Get review when done
7. Mark complete in PROGRESS.md

---

**You've got this!** Start coding and let the AI instructor help you along the way. 🚀

---

## Quick Reference Commands

```bash
# Navigate to a week
cd curriculum/weeks/week_01_html_css

# Review your code
legion --file exercises/day1.html --optimize

# Ask the AI
legion -p "Your question here"

# Open in browser
open exercises/day1.html

# Track progress
open ../../PROGRESS.md

# See week overview
open README.md
```
