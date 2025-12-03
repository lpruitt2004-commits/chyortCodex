// Day 2 Solution: CRUD
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: '*'}));

let nextId = 3;
const tasks = [
  { id: 1, title: 'Sample Task A' },
  { id: 2, title: 'Sample Task B' },
];

app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
  const title = (req.body?.title || '').trim();
  if (!title) return res.status(400).json({ error: 'title required' });
  const task = { id: nextId++, title };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'not found' });
  const title = (req.body?.title || '').trim();
  if (!title) return res.status(400).json({ error: 'title required' });
  task.title = title;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  tasks.splice(idx, 1);
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Day 2 running on ${PORT}`));
