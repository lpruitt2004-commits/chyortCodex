// Day 2: JWT Auth API (Register/Login/Me)
// Goal: Implement register, login, JWT issuance, auth middleware, and /me.

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_super_secret_change_me';

// In-memory user store for exercises only
// User: { id, email, passwordHash, fullName, role }
const users = [];
let nextId = 1;

// =============================================================================
// TASK 1: Register endpoint
// =============================================================================
// POST /register { email, password, fullName }
// - Validate inputs (basic checks ok)
// - Ensure unique email
// - Hash password
// - Save user with role 'user'
// - Return { id, email, fullName }
app.post('/register', async (req, res) => {
  // YOUR CODE HERE
});

// =============================================================================
// TASK 2: Login endpoint
// =============================================================================
// POST /login { email, password }
// - Find user by email
// - Compare password
// - If ok, sign access token with sub=user.id, role=user.role
// - Return { token }
app.post('/login', async (req, res) => {
  // YOUR CODE HERE
});

// =============================================================================
// TASK 3: Auth middleware
// =============================================================================
// - Read Authorization header, verify JWT
// - Attach req.user = { id, role }
function authenticate(req, res, next) {
  // YOUR CODE HERE
}

// =============================================================================
// TASK 4: /me (protected)
// =============================================================================
// GET /me -> returns current user profile without passwordHash
app.get('/me', authenticate, (req, res) => {
  // YOUR CODE HERE
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Day 2 server running on port ${PORT}`);
});
