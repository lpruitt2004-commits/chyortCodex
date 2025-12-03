// Day 3: Sessions, Cookies, and CSRF — SOLUTION
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
    secure: false, // true in prod behind HTTPS
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000,
  },
}));

const csrfProtection = csrf({ cookie: true });

// POST /login { username }
app.post('/login', (req, res) => {
  const { username } = req.body || {};
  if (!username) return res.status(400).json({ error: 'username required' });
  req.session.user = { username };
  res.json({ ok: true });
});

// POST /logout
app.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

function requireSession(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: 'unauthorized' });
  next();
}

// GET /profile
app.get('/profile', requireSession, (req, res) => {
  res.json({ user: req.session.user });
});

// GET /csrf-token
app.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// POST /change-email (requires session + CSRF)
app.post('/change-email', requireSession, csrfProtection, (req, res) => {
  // pretend to update
  res.json({ ok: true, email: req.body?.email || 'updated@example.com' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Day 3 running on ${PORT}`));
