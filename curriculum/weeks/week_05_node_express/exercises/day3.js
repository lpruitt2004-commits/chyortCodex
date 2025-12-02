// Day 3: Middleware Practice
// 
// INSTRUCTIONS:
// 1. Run: npm install express morgan cors
// 2. Run: node day3.js
//
// Code review:
// python3 ../../../ollama_duo.py --file day3.js --optimize --optimize-json

const express = require('express');
const app = express();
const PORT = 3000;

console.log('=== Day 3: Middleware ===\n');

// Exercise 1: Built-in middleware
// Add express.json() middleware
// YOUR CODE HERE:



// Exercise 2: Custom logging middleware
// Create middleware that logs: METHOD URL TIMESTAMP
function logger(req, res, next) {
    // YOUR CODE HERE
    // Log the request method, URL, and timestamp
    // Don't forget to call next()!
}

// Use the middleware
// YOUR CODE HERE:



// Exercise 3: Third-party middleware (morgan)
// Uncomment and use morgan for request logging
// const morgan = require('morgan');
// YOUR CODE HERE - use morgan('dev')



// Exercise 4: CORS middleware
// Import and use cors to enable cross-origin requests
// const cors = require('cors');
// YOUR CODE HERE:



// Exercise 5: Custom validation middleware
// Create middleware to check if request has Authorization header
function requireAuth(req, res, next) {
    // YOUR CODE HERE
    // Check if req.headers.authorization exists
    // If not, send 401 status
    // Otherwise, call next()
}

// Test route that uses the middleware
app.get('/protected', requireAuth, (req, res) => {
    res.json({ message: 'You are authorized!' });
});


// Exercise 6: Error handling middleware
// Create error handling middleware (must have 4 parameters!)
function errorHandler(err, req, res, next) {
    // YOUR CODE HERE
    // Log the error
    // Send JSON response with error message
}

// Use error handler (must be last!)
// YOUR CODE HERE:



// Test route that throws an error
app.get('/error', (req, res, next) => {
    next(new Error('This is a test error'));
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Try: http://localhost:${PORT}/protected (should fail)');
    console.log('Try: http://localhost:${PORT}/error\n');
});
