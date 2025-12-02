// Day 5: Advanced Express Features - SOLUTION
// 
// Run: npm install express ejs dotenv
// Create .env file with: PORT=3000
// Then: node day5.js
//
// This demonstrates:
// - Serving static files
// - Template engines (EJS)
// - Environment variables
// - Form handling
// - Input validation
// - File-based storage

const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log('=== Day 5: Advanced Express ===\n');

// Exercise 1: Serve static files
app.use(express.static('public'));
console.log('✓ Static files served from /public');


// Exercise 2: Template engine setup (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log('✓ EJS template engine configured');


// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Exercise 3: Render a template
app.get('/', (req, res) => {
    const data = {
        title: 'Express Advanced Features',
        message: 'Welcome to Day 5!',
        items: ['Static files', 'Templates', 'Validation', 'Environment vars']
    };
    
    // Note: This requires views/index.ejs to exist
    // For demo purposes, we'll send JSON if views don't exist
    try {
        res.render('index', data);
    } catch (error) {
        res.json({
            message: 'Create views/index.ejs to see template rendering',
            data
        });
    }
});


// Exercise 4: Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    
    console.log('Form submission:', { name, email, message });
    
    res.json({
        success: true,
        message: 'Form submitted successfully',
        data: { name, email, message }
    });
});


// Exercise 5: Input validation middleware
function validateUser(req, res, next) {
    const { email, password } = req.body;
    const errors = [];
    
    if (!email) {
        errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Invalid email format');
    }
    
    if (!password) {
        errors.push('Password is required');
    } else if (password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }
    
    next();
}

app.post('/register', validateUser, (req, res) => {
    const { email } = req.body;
    
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: { email }
    });
});


// Exercise 6: Environment variables
app.get('/config', (req, res) => {
    res.json({
        port: PORT,
        nodeEnv: process.env.NODE_ENV || 'development',
        apiKey: process.env.API_KEY ? '***hidden***' : 'not set'
    });
});


// BONUS: JSON file storage
const DATA_FILE = path.join(__dirname, 'data.json');

function saveToFile(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving to file:', error);
        return false;
    }
}

function readFromFile() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const content = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(content);
        }
        return null;
    } catch (error) {
        console.error('Error reading from file:', error);
        return null;
    }
}

// API endpoints for file storage
app.get('/api/data', (req, res) => {
    const data = readFromFile();
    res.json({
        success: true,
        data: data || { message: 'No data yet' }
    });
});

app.post('/api/data', (req, res) => {
    const saved = saveToFile(req.body);
    
    if (saved) {
        res.json({
            success: true,
            message: 'Data saved to file'
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'Error saving data'
        });
    }
});


// BONUS: Create example .env file if it doesn't exist
const envExample = `# Environment Variables
PORT=3000
NODE_ENV=development
API_KEY=your_api_key_here
`;

if (!fs.existsSync('.env')) {
    fs.writeFileSync('.env.example', envExample);
    console.log('✓ Created .env.example file');
}


app.listen(PORT, () => {
    console.log(`\n✅ Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('\nEndpoints:');
    console.log('  GET  / - Home page (template)');
    console.log('  POST /submit - Form submission');
    console.log('  POST /register - User registration (with validation)');
    console.log('  GET  /config - Show environment config');
    console.log('  GET  /api/data - Read data from file');
    console.log('  POST /api/data - Save data to file');
    console.log('');
});
