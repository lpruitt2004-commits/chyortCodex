// Day 2: JWT Auth API — SOLUTION
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_super_secret_change_me';

const users = []; // { id, email, passwordHash, fullName, role }
let nextId = 1;

// POST /register
app.post('/register', async (req, res) => {
  const { email, password, fullName } = req.body || {};
  if (!email || !password || !fullName) {
    return res.status(400).json({ error: 'email, password, fullName required' });
  }
  if (users.some(u => u.email === email)) {
    return res.status(409).json({ error: 'email already in use' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: nextId++, email, passwordHash, fullName, role: 'user' };
  users.push(user);
  res.status(201).json({ id: user.id, email: user.email, fullName: user.fullName });
});

// POST /login
app.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
  res.json({ token });
});

function authenticate(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    const [, token] = auth.split(' ');
    if (!token) return res.status(401).json({ error: 'missing token' });
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

// GET /me
app.get('/me', authenticate, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'not found' });
  const { passwordHash, ...publicUser } = user;
  res.json(publicUser);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Day 2 running on ${PORT}`));
