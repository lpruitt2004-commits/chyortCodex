// Day 2: Express Basics Practice - SOLUTION
// 
// Run: npm install express
// Then: node day2.js
// Test in browser: http://localhost:3000
//
// This demonstrates:
// - Express server setup
// - Route handling (GET, POST, PUT, DELETE)
// - URL parameters and query strings
// - JSON request/response

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

console.log('=== Day 2: Express Basics ===\n');

// Exercise 1: Simple GET route
app.get('/', (req, res) => {
    res.send('Welcome to my Express server!');
});

console.log('✓ Route: GET /');


// Exercise 2: Route with URL parameter
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({
        message: 'User details',
        userId: userId,
        userIdType: typeof userId // Note: URL params are always strings
    });
});

console.log('✓ Route: GET /users/:id');


// Exercise 3: Query parameters
app.get('/search', (req, res) => {
    const searchQuery = req.query.q;
    const filter = req.query.filter || 'all';
    
    res.json({
        query: searchQuery,
        filter: filter,
        results: `Searching for "${searchQuery}" with filter "${filter}"`
    });
});

console.log('✓ Route: GET /search?q=test&filter=new');


// Exercise 4: POST route
app.post('/api/data', (req, res) => {
    const receivedData = req.body;
    
    res.json({
        message: 'Data received successfully',
        yourData: receivedData,
        timestamp: new Date().toISOString()
    });
});

console.log('✓ Route: POST /api/data');


// Exercise 5: Multiple HTTP methods on same endpoint
app.get('/api/items', (req, res) => {
    res.json({ message: 'GET: Fetch all items' });
});

app.post('/api/items', (req, res) => {
    res.json({ message: 'POST: Create new item', item: req.body });
});

app.put('/api/items/:id', (req, res) => {
    res.json({ message: `PUT: Update item ${req.params.id}`, updates: req.body });
});

app.delete('/api/items/:id', (req, res) => {
    res.json({ message: `DELETE: Remove item ${req.params.id}` });
});

console.log('✓ Routes: GET/POST/PUT/DELETE /api/items');


// Exercise 6: Send JSON response with array
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' }
    ];
    
    res.json({
        success: true,
        count: users.length,
        data: users
    });
});

console.log('✓ Route: GET /api/users');


// BONUS: Route with multiple parameters
app.get('/api/posts/:postId/comments/:commentId', (req, res) => {
    res.json({
        postId: req.params.postId,
        commentId: req.params.commentId,
        message: 'Nested resource accessed'
    });
});


// BONUS: Catch-all route (404 handler)
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path,
        method: req.method
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`\n✅ Server running on http://localhost:${PORT}`);
    console.log('\nTest these URLs in your browser:');
    console.log(`  http://localhost:${PORT}/`);
    console.log(`  http://localhost:${PORT}/users/123`);
    console.log(`  http://localhost:${PORT}/search?q=nodejs`);
    console.log(`  http://localhost:${PORT}/api/users`);
    console.log('\nTest POST/PUT/DELETE with Postman or curl\n');
});
