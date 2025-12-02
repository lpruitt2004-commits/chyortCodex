# Week 5: Node.js & Express

**Theme:** Backend Development with Node.js  
**Duration:** 5 days  
**Goal:** Build a RESTful API server

---

## Learning Objectives
- [ ] Understand Node.js runtime and npm
- [ ] Create HTTP servers with Express
- [ ] Build RESTful API endpoints
- [ ] Handle request/response cycle
- [ ] Implement middleware
- [ ] Serve static files and JSON data

---

## Daily Breakdown

### Day 1: Node.js Fundamentals
**Topics:**
- What is Node.js?
- Node.js runtime vs browser
- npm (Node Package Manager)
- package.json basics
- CommonJS modules (require/module.exports)
- File system operations
- Process and environment variables

**Practice:**
- Initialize npm project
- Create simple Node.js scripts
- Read/write files with fs module

**Resources:**
- [Node.js Official Docs](https://nodejs.org/en/docs/)
- [npm Getting Started](https://docs.npmjs.com/getting-started)

---

### Day 2: Express Basics
**Topics:**
- What is Express?
- Setting up Express server
- Routing basics (GET, POST, PUT, DELETE)
- Request and response objects
- Query parameters and URL params
- Sending JSON responses

**Practice:**
- Create first Express server
- Define multiple routes
- Handle different HTTP methods

**Resources:**
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

---

### Day 3: Middleware
**Topics:**
- What is middleware?
- Built-in middleware (express.json, express.static)
- Third-party middleware (cors, morgan)
- Custom middleware functions
- Error handling middleware
- Middleware order matters

**Practice:**
- Create logging middleware
- Implement request validation
- Handle errors gracefully

**Resources:**
- [Express Middleware Guide](https://expressjs.com/en/guide/using-middleware.html)

---

### Day 4: RESTful API Design
**Topics:**
- REST principles
- HTTP status codes
- CRUD operations
- Route organization
- Express Router
- JSON data management
- Postman for API testing

**Practice:**
- Build a TODO API
- Implement CRUD endpoints
- Test with Postman

**Resources:**
- [REST API Tutorial](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)

---

### Day 5: Advanced Express
**Topics:**
- Template engines (EJS)
- Serving static files
- Request body parsing
- File uploads
- Environment variables with dotenv
- Basic input validation

**Practice:**
- Serve HTML with EJS
- Handle form submissions
- Validate user input

**Resources:**
- [EJS Documentation](https://ejs.co/)
- [dotenv Package](https://www.npmjs.com/package/dotenv)

---

## Week Project: Task Management API

**Description:**  
Build a RESTful API for managing tasks with full CRUD operations.

**Requirements:**
- [ ] Express server on port 3000
- [ ] GET /api/tasks - Get all tasks
- [ ] GET /api/tasks/:id - Get single task
- [ ] POST /api/tasks - Create new task
- [ ] PUT /api/tasks/:id - Update task
- [ ] DELETE /api/tasks/:id - Delete task
- [ ] Store tasks in JSON file or in-memory array
- [ ] Proper HTTP status codes
- [ ] Error handling middleware
- [ ] CORS enabled
- [ ] Request logging

**Bonus:**
- [ ] Query parameters for filtering (completed/incomplete)
- [ ] Pagination support
- [ ] Input validation middleware
- [ ] API documentation with comments
- [ ] Rate limiting

**Example Task Object:**
```json
{
  "id": 1,
  "title": "Learn Node.js",
  "description": "Complete Week 5 exercises",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## 📁 Practice Files

All exercises are in the `exercises/` folder. Solutions in `solutions/`.

**Daily Exercises:**
- `day1.js` - Node.js fundamentals
- `day2.js` - Express basics
- `day3.js` - Middleware practice
- `day4.js` - RESTful API
- `day5.js` - Advanced features

**How to work:**
1. Run `npm install` in the exercise directory
2. Start server with `node day1.js` (or nodemon)
3. Test with browser or Postman
4. Check console output
5. Get AI code review when done:
   ```bash
   ./review_code.sh exercises/day1.js
   ```

---

## Skills Checklist
- [ ] Node.js basics
- [ ] npm package management
- [ ] Express server setup
- [ ] Routing (GET, POST, PUT, DELETE)
- [ ] Middleware (built-in and custom)
- [ ] JSON request/response
- [ ] Error handling
- [ ] RESTful API design
- [ ] HTTP status codes
- [ ] Environment variables
- [ ] API testing with Postman

---

## Resources
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Guide](https://expressjs.com/en/starter/installing.html)
- [REST API Best Practices](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
- [HTTP Status Codes Cheatsheet](https://httpstatuses.com/)
- [Postman Learning Center](https://learning.postman.com/)

---

## Next Week Preview
Week 6: PostgreSQL Database - Storing and querying data with SQL
