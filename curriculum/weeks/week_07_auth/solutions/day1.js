// Day 1: Passwords & JWT Basics — SOLUTION
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_super_secret_change_me';

// POST /hash { password }
app.post('/hash', async (req, res) => {
  try {
    const { password } = req.body || {};
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'password is required' });
    }
    const hash = await bcrypt.hash(password, 10);
    res.json({ hash });
  } catch (err) {
    res.status(500).json({ error: 'internal error' });
  }
});

// POST /verify { password, hash }
app.post('/verify', async (req, res) => {
  try {
    const { password, hash } = req.body || {};
    if (!password || !hash) {
      return res.status(400).json({ error: 'password and hash are required' });
    }
    const valid = await bcrypt.compare(password, hash);
    res.json({ valid: !!valid });
  } catch (err) {
    res.status(500).json({ error: 'internal error' });
  }
});

// POST /token { sub, role }
app.post('/token', (req, res) => {
  try {
    const { sub, role = 'user' } = req.body || {};
    if (!sub) return res.status(400).json({ error: 'sub is required' });
    const token = jwt.sign({ sub, role }, JWT_SECRET, { expiresIn: '15m' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'internal error' });
  }
});

// GET /verify-token (Authorization: Bearer <token>)
app.get('/verify-token', (req, res) => {
  try {
    const auth = req.headers.authorization || '';
    const [, token] = auth.split(' ');
    if (!token) return res.status(401).json({ error: 'missing token' });
    const payload = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, payload });
  } catch (err) {
    return res.status(401).json({ valid: false, error: 'invalid token' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Day 1 running on ${PORT}`));
