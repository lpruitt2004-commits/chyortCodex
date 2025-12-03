// Day 4: RESTful API Practice
// 
// INSTRUCTIONS:
// Build a simple TODO API with CRUD operations
// Run: node day4.js
// Test with Postman or curl
//
// Code review:
// python3 ../../../ollama_duo.py --file day4.js --optimize --optimize-json

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

console.log('=== Day 4: RESTful API ===\n');

// In-memory data store
let todos = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build an API', completed: false },
    { id: 3, title: 'Master Express', completed: true }
];

// Exercise 1: GET all todos
// Route: GET /api/todos
// Response: Array of all todos
app.get('/api/todos', (req, res) => {
    // YOUR CODE HERE
});


// Exercise 2: GET single todo by ID
// Route: GET /api/todos/:id
// Response: Single todo object or 404 if not found
app.get('/api/todos/:id', (req, res) => {
    // YOUR CODE HERE
    // Convert id to number: parseInt(req.params.id)
    // Use Array.find() to find the todo
    // If not found, send 404 status
});


// Exercise 3: POST - Create new todo
// Route: POST /api/todos
// Body: { title: "New todo", completed: false }
// Response: Created todo with generated ID
app.post('/api/todos', (req, res) => {
    // YOUR CODE HERE
    // Create new todo with:
    // - id: todos.length + 1 (simple ID generation)
    // - title from req.body.title
    // - completed from req.body.completed (default false)
    // Add to todos array
    // Send 201 status with created todo
});


// Exercise 4: PUT - Update todo
// Route: PUT /api/todos/:id
// Body: { title: "Updated", completed: true }
// Response: Updated todo or 404
app.put('/api/todos/:id', (req, res) => {
    // YOUR CODE HERE
    // Find the todo by id
    // If not found, return 404
    // Update title and/or completed
    // Return updated todo
});


// Exercise 5: DELETE - Remove todo
// Route: DELETE /api/todos/:id
// Response: 204 No Content or 404
app.delete('/api/todos/:id', (req, res) => {
    // YOUR CODE HERE
    // Find index of todo
    // If not found, return 404
    // Remove from array using splice()
    // Return 204 status (no content)
});


// BONUS: Query parameter filtering
// Route: GET /api/todos?completed=true
// Filter todos by completed status
// YOUR CODE HERE - modify the GET /api/todos route



app.listen(PORT, () => {
    console.log(`✓ TODO API running on http://localhost:${PORT}`);
    console.log('Endpoints:');
    console.log('  GET    /api/todos');
    console.log('  GET    /api/todos/:id');
    console.log('  POST   /api/todos');
    console.log('  PUT    /api/todos/:id');
    console.log('  DELETE /api/todos/:id\n');
});
