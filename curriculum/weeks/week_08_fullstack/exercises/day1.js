// Day 1: API + DB Skeleton
// Goal: Create Express server with PostgreSQL pool, health check, and list tasks (mock).

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: '*'}));

// TODO: Initialize Pool from env vars
// const pool = new Pool({ ... })
const pool = null; // YOUR CODE HERE

// TODO: Implement /health -> { ok: true }
app.get('/health', (req, res) => {
  // YOUR CODE HERE
});

// TODO: Implement GET /tasks -> return array of mock tasks
// Later this will query DB; for now return hardcoded list
app.get('/tasks', async (req, res) => {
  // YOUR CODE HERE
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Day 1 server on ${PORT}`));
