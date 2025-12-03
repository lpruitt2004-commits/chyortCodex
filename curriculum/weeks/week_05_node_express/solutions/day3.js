// Day 3: Middleware Practice - SOLUTION
// 
// Run: npm install express morgan cors
// Then: node day3.js
//
// This demonstrates:
// - Built-in middleware
// - Custom middleware
// - Third-party middleware
// - Error handling middleware

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 3000;

console.log('=== Day 3: Middleware ===\n');

// Exercise 1: Built-in middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

console.log('✓ Built-in middleware configured');


// Exercise 2: Custom logging middleware
function logger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); // IMPORTANT: Call next() to pass control to next middleware
}

app.use(logger);
console.log('✓ Custom logger middleware added');


// Exercise 3: Third-party middleware (morgan)
app.use(morgan('dev')); // Logs requests in dev format
console.log('✓ Morgan logging middleware added');


// Exercise 4: CORS middleware
app.use(cors()); // Enable CORS for all routes
console.log('✓ CORS middleware enabled');


// Exercise 5: Custom validation middleware
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: No auth header provided' });
    }
    
    // In real app, verify the token here
    console.log('Auth header:', authHeader);
    next();
}

// Protected route using middleware
app.get('/protected', requireAuth, (req, res) => {
    res.json({ message: 'You are authorized!', data: 'Secret data here' });
});

console.log('✓ Auth middleware created');


// Exercise 6: Request ID middleware
function requestId(req, res, next) {
    req.id = Math.random().toString(36).substring(7);
    console.log(`Request ID: ${req.id}`);
    next();
}

app.use(requestId);


// Test routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'Middleware demo',
        requestId: req.id
    });
});

app.post('/data', (req, res) => {
    res.json({
        message: 'Data received',
        body: req.body,
        requestId: req.id
    });
});

// Route that throws an error
app.get('/error', (req, res, next) => {
    const error = new Error('This is a test error');
    error.status = 500;
    next(error); // Pass error to error handler
});


// Exercise 7: Error handling middleware (MUST be last!)
function errorHandler(err, req, res, next) {
    console.error('Error caught by middleware:', err.message);
    
    res.status(err.status || 500).json({
        error: {
            message: err.message,
            status: err.status || 500,
            requestId: req.id
        }
    });
}

app.use(errorHandler);
console.log('✓ Error handler middleware added');


// 404 handler (for routes that don't exist)
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path
    });
});


app.listen(PORT, () => {
    console.log(`\n✅ Server running on http://localhost:${PORT}`);
    console.log('\nTry these routes:');
    console.log(`  http://localhost:${PORT}/`);
    console.log(`  http://localhost:${PORT}/protected (should fail - no auth)`);
    console.log(`  http://localhost:${PORT}/protected (with header: Authorization: Bearer token123)`);
    console.log(`  http://localhost:${PORT}/error`);
    console.log('\nWatch the console for middleware logs!\n');
});
