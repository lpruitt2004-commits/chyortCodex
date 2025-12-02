# 👨‍🏫 How to Use This Curriculum

## For Students

### Getting Started
This curriculum is designed like LearningFuze bootcamp - you'll work through exercises each day and get AI code reviews just like having an instructor check your work.

---

## 📅 Daily Workflow

### 1. Read the Week Overview
Start each week by reading the README:
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
- Make changes in VS Code
- Refresh browser to see updates
- Check browser console (F12) for JavaScript errors

### 4. Get AI Code Review (Your "Instructor")
When you finish an exercise, get it reviewed:

```bash
cd curriculum/weeks/week_01_html_css
./review_code.sh exercises/day1.html
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
4. Repeat until clean

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

---

## 📂 Folder Structure

```
curriculum/
├── README.md                    # Navigation hub
├── PROGRESS.md                  # Your progress tracker
├── GETTING_STARTED.md          # This file
│
├── weeks/
│   ├── week_01_html_css/
│   │   ├── README.md           # Week overview & daily lessons
│   │   ├── exercises/          # Your practice files
│   │   │   ├── day1.html
│   │   │   ├── day1.css
│   │   │   ├── day3.html
│   │   │   └── ...
│   │   ├── solutions/          # Your completed work
│   │   └── review_code.sh      # Quick review script
│   │
│   ├── week_02_js_basics/
│   │   ├── README.md
│   │   ├── exercises/
│   │   │   ├── day1.js
│   │   │   ├── day1.html
│   │   │   └── ...
│   │   ├── solutions/
│   │   └── review_code.sh
│   └── ...
│
└── projects/
    ├── project_01_portfolio/
    │   └── README.md           # Full project spec
    └── ...
```

---

## 🤖 Using the AI Instructor

### Quick Review
```bash
./review_code.sh exercises/day1.html
```

### Detailed Review
```bash
python3 ../../ollama_duo.py --file exercises/day1.html --optimize --optimize-json
```

### Ask Questions
```bash
python3 ollama_duo.py -p "Explain CSS Flexbox with examples" --show-draft
```

### Debug Help
```bash
python3 ollama_duo.py -p "Why is my flexbox not centering? [paste your code]"
```

### Project Ideas
```bash
python3 ollama_duo.py -p "Suggest a beginner HTML/CSS project"
```

---

## 📋 Week-by-Week Guide

### Week 1: HTML & CSS
**Files to complete:**
- [ ] `exercises/day1.html` & `day1.css` (Resume page)
- [ ] `exercises/day3.html` & `day3.css` (Flexbox layout)
- [ ] `exercises/day4.html` & `day4.css` (CSS Grid gallery)
- [ ] Week project: Portfolio landing page

**Daily routine:**
1. Read day's lesson in README
2. Complete the exercise file
3. Get AI review
4. Fix issues
5. Move to solutions/

### Week 2: JavaScript Basics
**Files to complete:**
- [ ] `exercises/day1.js` (JS fundamentals)
- [ ] `exercises/day3.js` (DOM manipulation)
- [ ] Week project: To-Do List App

**Daily routine:**
1. Read day's lesson
2. Complete exercise
3. Test in browser console
4. Get AI review
5. Fix bugs
6. Move to solutions/

---

## 🎯 Tips for Success

### 1. Code Every Day
- Set aside 4-6 hours minimum
- Consistency beats cramming

### 2. Don't Just Copy
- Type out the code yourself
- Understand every line
- Experiment and break things

### 3. Use the AI Instructor
- Review your code before moving on
- Ask questions when stuck
- Get explanations for concepts

### 4. Build Real Projects
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
python3 ollama_duo.py -p "Explain [concept] with simple examples"
```

### Code not working?
1. Check browser console for errors
2. Use console.log() to debug
3. Ask AI: `python3 ollama_duo.py -p "Debug this error: [error message]"`

### Need a better explanation?
```bash
python3 ollama_duo.py -p "Explain CSS Grid like I'm 10 years old" --show-draft
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
./review_code.sh exercises/day1.html

# Ask the AI
python3 ../../ollama_duo.py -p "Your question here"

# Open in browser
open exercises/day1.html

# Track progress
open ../../PROGRESS.md

# See week overview
open README.md
```
