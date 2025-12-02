const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// TODO: Configure PostgreSQL connection
// Hint: use DATABASE_URL environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, db: 'connected', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ ok: false, db: 'disconnected', error: err.message });
  }
});

// TODO: Implement database-backed CRUD endpoints
app.get('/todos', async (req, res) => {
  // Query todos from database
  res.json({ message: 'TODO: Implement' });
});

app.post('/todos', async (req, res) => {
  // Insert todo into database
  res.json({ message: 'TODO: Implement' });
});

app.put('/todos/:id', async (req, res) => {
  // Update todo in database
  res.json({ message: 'TODO: Implement' });
});

app.delete('/todos/:id', async (req, res) => {
  // Delete todo from database
  res.sendStatus(204);
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

module.exports = app;
