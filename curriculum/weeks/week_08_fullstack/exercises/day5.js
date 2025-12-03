// Day 5: Polish & Packaging
// Goal: Add Helmet, rate limit, simple validation, and 404/500 handlers.

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(['/auth', '/tasks'], limiter);

// TODO: Add real routes or import from previous days
app.get('/health', (req, res) => res.json({ ok: true }));

// 404
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

// 500
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Day 5 server on ${PORT}`));
