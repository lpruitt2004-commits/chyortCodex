// Day 2: CRUD for Tasks
// Goal: Add POST/PUT/DELETE for tasks with validation and errors.

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: '*'}));

// TODO: Create pool
const pool = null; // YOUR CODE HERE

// GET /tasks (read)
app.get('/tasks', async (req, res) => {
  // YOUR CODE HERE (query DB later; mock ok)
});

// POST /tasks (create)
app.post('/tasks', async (req, res) => {
  // Validate title (required)
  // Insert and return created task (mock ok)
  // YOUR CODE HERE
});

// PUT /tasks/:id (update)
app.put('/tasks/:id', async (req, res) => {
  // Validate id exists; update fields
  // Return 404 if not found
  // YOUR CODE HERE
});

// DELETE /tasks/:id (delete)
app.delete('/tasks/:id', async (req, res) => {
  // Delete by id; return 204 or 404
  // YOUR CODE HERE
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Day 2 server on ${PORT}`));
