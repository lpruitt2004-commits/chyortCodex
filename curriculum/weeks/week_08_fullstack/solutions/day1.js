// Day 1 Solution: API + DB Skeleton
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: '*'}));

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || 'week8_tasks',
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/tasks', async (req, res) => {
  res.json([
    { id: 1, title: 'Sample Task A' },
    { id: 2, title: 'Sample Task B' },
  ]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Day 1 running on ${PORT}`));
