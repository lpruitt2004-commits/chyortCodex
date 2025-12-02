# Week 3: Advanced JavaScript

**Theme:** Modern JavaScript & Asynchronous Programming  
**Duration:** 5 days  
**Goal:** Build a weather app with external API

---

## Learning Objectives
- [ ] Master ES6+ features (arrow functions, destructuring, modules)
- [ ] Understand asynchronous JavaScript (callbacks, promises, async/await)
- [ ] Work with the Fetch API
- [ ] Handle errors in async code
- [ ] Integrate external APIs into web apps

---

## Daily Breakdown

### Day 1: ES6+ Features
**Topics:**
- Arrow functions
- Destructuring (objects and arrays)
- Template literals
- Spread and rest operators
- Default parameters
- ES6 modules (import/export)

**Practice:**
- Convert functions to arrow syntax
- Destructure objects and arrays
- Use template literals for strings

**Resources:**
- [ES6 Features Overview](https://github.com/lukehoban/es6features)

---

### Day 2: Asynchronous JavaScript - Callbacks
**Topics:**
- Synchronous vs asynchronous code
- Callback functions
- setTimeout and setInterval
- Callback hell problem
- Event loop basics

**Practice:**
- Write functions with callbacks
- Handle delayed operations

---

### Day 3: Promises
**Topics:**
- Promise creation and usage
- .then() and .catch()
- Promise chaining
- Promise.all() and Promise.race()
- Error handling with promises

**Practice:**
- Create custom promises
- Chain multiple asynchronous operations

**Resources:**
- [Promises Guide](https://javascript.info/promise-basics)

---

### Day 4: Async/Await
**Topics:**
- async function syntax
- await keyword
- Try/catch for error handling
- Converting promises to async/await
- Multiple async operations

**Practice:**
- Rewrite promise code with async/await
- Handle errors with try/catch blocks

**Resources:**
- [Async/Await Explained](https://javascript.info/async-await)

---

### Day 5: Fetch API & AJAX
**Topics:**
- What is AJAX?
- Fetch API basics
- GET and POST requests
- Working with JSON
- CORS basics
- Error handling with fetch

**Practice:**
- Fetch data from public APIs
- Send data to an API
- Parse JSON responses

**Resources:**
- [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Free Public APIs](https://github.com/public-apis/public-apis)

---

## Week Project: Weather Dashboard

**Description:**  
Build a weather application that fetches current weather data from an external API and displays it to the user.

**Requirements:**
- [ ] Search for weather by city name
- [ ] Display current temperature, conditions, humidity
- [ ] Show weather icon based on conditions
- [ ] Display 5-day forecast
- [ ] Use async/await for API calls
- [ ] Handle errors (invalid city, network errors)
- [ ] Loading state while fetching data
- [ ] Responsive design
- [ ] localStorage to save last searched city

**Bonus:**
- [ ] Geolocation to get user's current weather
- [ ] Temperature unit toggle (°F/°C)
- [ ] Background changes based on weather
- [ ] Search history with localStorage

**API Suggestions:**
- [OpenWeatherMap API](https://openweathermap.org/api) (free tier)
- [WeatherAPI](https://www.weatherapi.com/) (free tier)

---

## 📁 Practice Files

All exercises are in the `exercises/` folder. Solutions in `solutions/`.

**Daily Exercises:**
- `day1.html` & `day1.js` - ES6+ features practice
- Future days: day3.js (promises), day5.js (fetch API)

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
- [ ] Arrow functions
- [ ] Object and array destructuring
- [ ] Template literals
- [ ] Spread/rest operators
- [ ] ES6 modules
- [ ] Callbacks
- [ ] Promises (.then, .catch)
- [ ] Async/await
- [ ] Fetch API
- [ ] JSON parsing
- [ ] Error handling (try/catch)
- [ ] Async error handling

---

## Resources
- [JavaScript.info - Promises & Async](https://javascript.info/async)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Async JavaScript Course](https://www.youtube.com/watch?v=PoRJizFvM7s)
- [Public APIs List](https://github.com/public-apis/public-apis)

---

## Next Week Preview
Week 4: React fundamentals - building modern UI components
