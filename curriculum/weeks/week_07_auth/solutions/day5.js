// Day 5: Security Hardening — SOLUTION
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(helmet());

// Log to console + file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));

const JWT_SECRET = process.env.JWT_SECRET || 'dev_super_secret_change_me';

// Simple audit log
const auditStream = fs.createWriteStream(path.join(__dirname, 'audit.log'), { flags: 'a' });
function audit(event, meta = {}) {
  auditStream.write(JSON.stringify({ ts: new Date().toISOString(), event, ...meta }) + '\n');
}

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(['/login', '/register'], authLimiter);

// In-memory users + lockout
const users = []; // { id, email, passwordHash, fullName, role }
let nextId = 1;
const failures = new Map(); // key -> { count, until }

// Validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8)
    .regex(/[A-Z]/, 'uppercase')
    .regex(/[a-z]/, 'lowercase')
    .regex(/[0-9]/, 'number')
    .regex(/[^A-Za-z0-9]/, 'symbol')
    .required(),
  fullName: Joi.string().min(2).max(100).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

function isLocked(key) {
  const info = failures.get(key);
  if (!info) return false;
  if (info.until && Date.now() < info.until) return true;
  if (info.until && Date.now() >= info.until) failures.delete(key);
  return false;
}

function recordFailure(key) {
  const cur = failures.get(key) || { count: 0, until: null };
  cur.count += 1;
  if (cur.count >= 5) cur.until = Date.now() + 15 * 60 * 1000;
  failures.set(key, cur);
}

function clearFailures(key) { failures.delete(key); }

// Register
app.post('/register', async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  const { email, password, fullName } = value;
  if (users.some(u => u.email === email)) return res.status(409).json({ error: 'email in use' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: nextId++, email, passwordHash, fullName, role: 'user' };
  users.push(user);
  audit('register', { email });
  res.status(201).json({ id: user.id, email: user.email, fullName: user.fullName });
});

// Login + lockout
app.post('/login', async (req, res) => {
  const key = req.body?.email || req.ip;
  if (isLocked(key)) {
    audit('login_locked', { email: req.body?.email, ip: req.ip });
    return res.status(429).json({ error: 'Too many attempts. Try later.' });
  }

  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  const { email, password } = value;
  const user = users.find(u => u.email === email);
  if (!user) {
    recordFailure(key); audit('login_failed', { email, reason: 'not_found' });
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    recordFailure(key); audit('login_failed', { email, reason: 'bad_password' });
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  clearFailures(key);
  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
  audit('login_success', { email });
  res.json({ token });
});

// Example protected route with simple bearer auth
function authenticate(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    const [, token] = auth.split(' ');
    if (!token) return res.status(401).json({ error: 'missing token' });
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ error: 'invalid token' });
  }
}

app.get('/me', authenticate, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'not found' });
  const { passwordHash, ...publicUser } = user;
  res.json(publicUser);
});

// Global error handler
app.use((err, req, res, next) => {
  audit('server_error', { message: err.message });
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Day 5 hardened server running on ${PORT}`));
