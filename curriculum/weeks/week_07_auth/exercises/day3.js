// Day 3: Sessions, Cookies, and CSRF
// Goal: Implement session-based auth with CSRF protection.

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const app = express();
app.use(express.json());
app.use(cookieParser());

const SESSION_SECRET = process.env.SESSION_SECRET || 'dev_session_secret_change_me';

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set true behind HTTPS in production
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60, // 1 hour
  },
}));

// CSRF protection (using cookie-based tokens)
const csrfProtection = csrf({ cookie: true });

// =============================================================================
// TASK 1: Session login
// =============================================================================
// POST /login { username }
// - Set req.session.user = { username }
// - Return success
app.post('/login', (req, res) => {
  // YOUR CODE HERE
});

// =============================================================================
// TASK 2: Session logout
// =============================================================================
// POST /logout -> destroy session
app.post('/logout', (req, res) => {
  // YOUR CODE HERE
});

// =============================================================================
// TASK 3: Protected route using session
// =============================================================================
// GET /profile -> requires req.session.user
function requireSession(req, res, next) {
  // YOUR CODE HERE
}

app.get('/profile', requireSession, (req, res) => {
  // YOUR CODE HERE
});

// =============================================================================
// TASK 4: CSRF protection
// =============================================================================
// - Apply csrfProtection to state-changing routes (POST/PUT/DELETE)
// - Provide route to fetch CSRF token
// GET /csrf-token -> { csrfToken }
app.get('/csrf-token', csrfProtection, (req, res) => {
  // YOUR CODE HERE
});

// Example state-changing route (protected by session + CSRF)
app.post('/change-email', requireSession, csrfProtection, (req, res) => {
  // YOUR CODE HERE
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Day 3 server running on port ${PORT}`);
});
