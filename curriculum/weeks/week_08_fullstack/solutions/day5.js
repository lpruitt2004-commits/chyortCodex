// Day 5 Solution: Polish & Packaging
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(['/auth', '/tasks'], limiter);

const JWT_SECRET = process.env.JWT_SECRET || 'dev_super_secret_change_me';

let uid = 1, nextTaskId = 1;
const users = []; const tasks = [];

function authenticate(req, res, next) {
  const auth = req.headers.authorization || '';
  const [, token] = auth.split(' ');
  if (!token) return res.status(401).json({ error: 'missing token' });
  try { const p = jwt.verify(token, JWT_SECRET); req.user = { id: p.sub }; next(); }
  catch { return res.status(401).json({ error: 'invalid token' }); }
}

app.get('/health', (req, res) => res.json({ ok: true }));

app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email, password required' });
  if (users.some(u => u.email === email)) return res.status(409).json({ error: 'email in use' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: uid++, email, passwordHash };
  users.push(user);
  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.status(201).json({ token });
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/tasks', authenticate, (req, res) => {
  res.json(tasks.filter(t => t.userId === req.user.id));
});

app.post('/tasks', authenticate, (req, res) => {
  const title = (req.body?.title || '').trim();
  if (!title) return res.status(400).json({ error: 'title required' });
  const task = { id: nextTaskId++, title, userId: req.user.id };
  tasks.push(task);
  res.status(201).json(task);
});

app.delete('/tasks/:id', authenticate, (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex(t => t.id === id && t.userId === req.user.id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  tasks.splice(idx, 1);
  res.status(204).end();
});

app.use((req, res) => res.status(404).json({ error: 'Not Found' }));
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ error: 'Internal Server Error' }); });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Day 5 running on ${PORT}`));
