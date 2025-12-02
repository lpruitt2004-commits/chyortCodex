// Day 5: Advanced Express Features
// 
// INSTRUCTIONS:
// 1. Run: npm install express ejs dotenv
// 2. Create a .env file with PORT=3000
// 3. Run: node day5.js
//
// Code review:
// python3 ../../../ollama_duo.py --file day5.js --optimize --optimize-json

const express = require('express');
const path = require('path');
// Uncomment when ready:
// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log('=== Day 5: Advanced Express ===\n');

// Exercise 1: Serve static files
// Serve files from 'public' directory
// YOUR CODE HERE - use express.static()



// Exercise 2: Template engine setup (EJS)
// Set up EJS as the view engine
// YOUR CODE HERE:
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));



// Exercise 3: Render a template
// Route: GET /
// Render index.ejs with data
app.get('/', (req, res) => {
    // YOUR CODE HERE
    // res.render('index', { title: 'My App', message: 'Welcome!' });
});


// Exercise 4: Handle form submission
// Add body parser middleware
app.use(express.urlencoded({ extended: true }));

// Route: POST /submit
// Handle form data from req.body
app.post('/submit', (req, res) => {
    // YOUR CODE HERE
    // Access form data from req.body
    // Send response or redirect
});


// Exercise 5: Input validation
// Create validation middleware for user registration
function validateUser(req, res, next) {
    // YOUR CODE HERE
    // Check if email and password exist in req.body
    // Check if password length is at least 6 characters
    // If invalid, send 400 error
    // Otherwise, call next()
}

app.post('/register', validateUser, (req, res) => {
    res.json({ message: 'User registered successfully!' });
});


// Exercise 6: Environment variables
// Load .env file and use environment variables
// Create a .env file with:
// PORT=3000
// API_KEY=your_api_key_here
// YOUR CODE HERE - use process.env.API_KEY



// BONUS: JSON file storage
// Save data to a JSON file
const fs = require('fs');

function saveToFile(data) {
    // YOUR CODE HERE
    // Use fs.writeFileSync() to save JSON data
}

function readFromFile() {
    // YOUR CODE HERE
    // Use fs.readFileSync() to read JSON data
}



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('');
});
