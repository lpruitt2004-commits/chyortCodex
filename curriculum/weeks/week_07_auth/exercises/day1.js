// Day 1: Passwords & JWT Basics
// Goal: Practice hashing/verifying passwords and signing/verifying JWTs.

const express = require('express');
// Use bcryptjs for portability (no native build)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// TODO: Load from process.env in Day 5 hardening
const JWT_SECRET = process.env.JWT_SECRET || 'dev_super_secret_change_me';

// =============================================================================
// TASK 1: Hash a password
// =============================================================================
// POST /hash { password }
// Return: { hash }
app.post('/hash', async (req, res) => {
  // YOUR CODE HERE
});

// =============================================================================
// TASK 2: Verify a password against a hash
// =============================================================================
// POST /verify { password, hash }
// Return: { valid: true/false }
app.post('/verify', async (req, res) => {
  // YOUR CODE HERE
});

// =============================================================================
// TASK 3: Create a JWT
// =============================================================================
// POST /token { sub, role }
// Return: { token }
// Hints: use jwt.sign(payload, secret, { expiresIn: '15m' })
app.post('/token', (req, res) => {
  // YOUR CODE HERE
});

// =============================================================================
// TASK 4: Verify a JWT
// =============================================================================
// GET /verify-token (Authorization: Bearer <token>)
// Return: { valid: true, payload } or 401 if invalid
app.get('/verify-token', (req, res) => {
  // YOUR CODE HERE
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Day 1 server running on port ${PORT}`);
});
