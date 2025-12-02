// Day 3: Auth + Protected Endpoints
// Goal: Add register/login (JWT), auth middleware, user-scoped tasks.

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: '*'}));

const JWT_SECRET = process.env.JWT_SECRET || 'dev_super_secret_change_me';

// TODO: Pool
const pool = null; // YOUR CODE HERE

// In-memory users for exercise
const users = []; // { id, email, passwordHash }
let uid = 1;

// Register
app.post('/auth/register', async (req, res) => {
  // YOUR CODE HERE (validate, hash, store, return public user)
});

// Login -> issue token {sub: user.id}
app.post('/auth/login', async (req, res) => {
  // YOUR CODE HERE (verify, sign token, return { token })
});

// Auth middleware
function authenticate(req, res, next) {
  // Read Authorization: Bearer <token>, verify, attach req.user
  // YOUR CODE HERE
}

// User-scoped GET /tasks (requires auth)
app.get('/tasks', authenticate, async (req, res) => {
  // Later query tasks where user_id = req.user.id
  // For now mock filtered by req.user.id
  // YOUR CODE HERE
});

// User-scoped POST /tasks (requires auth)
app.post('/tasks', authenticate, async (req, res) => {
  // Validate, assign user_id from token subject
  // YOUR CODE HERE
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Day 3 server on ${PORT}`));
