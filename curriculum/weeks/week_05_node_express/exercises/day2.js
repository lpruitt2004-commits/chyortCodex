// Day 2: Express Basics Practice
// 
// INSTRUCTIONS:
// 1. Run: npm install express
// 2. Run: node day2.js
// 3. Test in browser: http://localhost:3000
//
// Code review:
// python3 ../../../ollama_duo.py --file day2.js --optimize --optimize-json

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

console.log('=== Day 2: Express Basics ===\n');

// Exercise 1: Create a simple GET route
// Route: GET /
// Response: "Welcome to my Express server!"
// YOUR CODE HERE:



// Exercise 2: Route with URL parameter
// Route: GET /users/:id
// Response: JSON object with the user ID
// YOUR CODE HERE:



// Exercise 3: Query parameters
// Route: GET /search
// Read query parameter 'q' and send it back
// Test: http://localhost:3000/search?q=test
// YOUR CODE HERE:



// Exercise 4: POST route
// Route: POST /api/data
// Read request body and send it back
// Test with Postman or curl
// YOUR CODE HERE:



// Exercise 5: Multiple HTTP methods
// Create routes for GET, POST, PUT, DELETE on /api/items
// YOUR CODE HERE:



// Exercise 6: Send JSON response
// Route: GET /api/users
// Send array of user objects
// YOUR CODE HERE:



// Start the server
app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
    console.log('Test the routes in your browser or Postman\n');
});
