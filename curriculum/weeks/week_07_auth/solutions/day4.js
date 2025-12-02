// Day 4: Authorization & Refresh Tokens — SOLUTION
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

const users = []; // { id, email, passwordHash, role }
let nextId = 1;

// Map<tokenId, { userId, valid: boolean }>
const refreshStore = new Map();

function signAccess(user) {
  return jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
}

function signRefresh(user) {
  const jti = uuidv4();
  const token = jwt.sign({ sub: user.id, jti }, REFRESH_SECRET, { expiresIn: '7d' });
  refreshStore.set(jti, { userId: user.id, valid: true });
  return token;
}

// Register
app.post('/register', async (req, res) => {
  const { email, password, role = 'user' } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email, password required' });
  if (users.some(u => u.email === email)) return res.status(409).json({ error: 'email in use' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: nextId++, email, passwordHash, role };
  users.push(user);
  res.status(201).json({ id: user.id, email: user.email, role: user.role });
});

// Login: issues access + refresh(cookie)
app.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });

  const access = signAccess(user);
  const refresh = signRefresh(user);

  res.cookie('refresh_token', refresh, {
    httpOnly: true,
    sameSite: 'strict',
    secure: false, // set true in prod
    path: '/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ token: access });
});

function authenticate(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    const [, token] = auth.split(' ');
    if (!token) return res.status(401).json({ error: 'missing token' });
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'unauthorized' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'forbidden' });
    next();
  };
}

// Refresh rotation
app.post('/auth/refresh', (req, res) => {
  try {
    const token = req.cookies?.refresh_token;
    if (!token) return res.status(401).json({ error: 'missing refresh token' });
    const payload = jwt.verify(token, REFRESH_SECRET);
    const status = refreshStore.get(payload.jti);
    if (!status || !status.valid) return res.status(401).json({ error: 'refresh invalidated' });

    // Invalidate old
    status.valid = false;

    // Issue new
    const user = users.find(u => u.id === payload.sub);
    if (!user) return res.status(401).json({ error: 'user not found' });

    const access = signAccess(user);
    const nextRefresh = signRefresh(user);

    res.cookie('refresh_token', nextRefresh, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      path: '/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ token: access });
  } catch (e) {
    return res.status(401).json({ error: 'invalid refresh' });
  }
});

// Admin route
app.get('/admin', authenticate, authorize('admin'), (req, res) => {
  res.json({ secret: 'admin panel' });
});

// Logout: revoke refresh
app.post('/logout', (req, res) => {
  try {
    const token = req.cookies?.refresh_token;
    if (token) {
      try {
        const payload = jwt.verify(token, REFRESH_SECRET);
        const status = refreshStore.get(payload.jti);
        if (status) status.valid = false;
      } catch {}
    }
    res.clearCookie('refresh_token', { path: '/auth' });
    res.json({ ok: true });
  } catch {
    res.json({ ok: true });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Day 4 running on ${PORT}`));
