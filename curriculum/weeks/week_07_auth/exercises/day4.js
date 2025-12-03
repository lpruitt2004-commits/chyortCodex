// Day 4: Authorization & Refresh Tokens
// Goal: Add RBAC and refresh token rotation with httpOnly cookies.

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_super_secret_change_me';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'dev_refresh_secret_change_me';

// In-memory stores (exercise only)
const users = []; // { id, email, passwordHash, role }
let nextId = 1;

// Store refresh tokens with rotation
// Map<tokenId, { userId, valid: boolean }>
const refreshStore = new Map();

// =============================================================================
// TASK 1: Register/Login (reuse from Day 2)
// =============================================================================
// POST /register, POST /login -> same behavior as Day 2 but include role: 'user' or 'admin'
// On login: issue access token (15m) and refresh token (httpOnly cookie)
// YOUR CODE HERE

// =============================================================================
// TASK 2: Auth middleware & RBAC
// =============================================================================
// function authenticate(req,res,next) -> verify access token
// function authorize(...roles) -> ensure req.user.role is included
// YOUR CODE HERE

// =============================================================================
// TASK 3: Refresh token rotation
// =============================================================================
// POST /auth/refresh
// - Read refresh token from cookie
// - Verify and check store valid
// - Invalidate old, issue new refresh + new access token
// YOUR CODE HERE

// =============================================================================
// TASK 4: Admin-only route
// =============================================================================
// GET /admin -> requires authorize('admin')
// YOUR CODE HERE

// =============================================================================
// TASK 5: Logout (revoke refresh)
// =============================================================================
// POST /logout -> revoke refresh token in store + clear cookie
// YOUR CODE HERE

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Day 4 server running on port ${PORT}`);
});
