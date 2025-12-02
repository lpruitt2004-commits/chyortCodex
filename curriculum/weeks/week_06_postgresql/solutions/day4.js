// Day 4: Node.js + PostgreSQL Integration
// SOLUTION

const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// =============================================================================
// TASK 1: Set up PostgreSQL connection pool
// =============================================================================
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: 'user_management_db',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});


// =============================================================================
// TASK 2: Create Users Table
// =============================================================================
async function createUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      full_name VARCHAR(100),
      age INTEGER CHECK (age >= 0 AND age <= 150),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await pool.query(createTableQuery);
    console.log('Users table created successfully');
  } catch (err) {
    console.error('Error creating users table:', err);
  }
}

createUsersTable();


// =============================================================================
// TASK 3: GET /users - Retrieve all users
// =============================================================================
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to retrieve users' 
    });
  }
});


// =============================================================================
// TASK 4: GET /users/:id - Retrieve a single user by ID
// =============================================================================
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to retrieve user' 
    });
  }
});


// =============================================================================
// TASK 5: POST /users - Create a new user
// =============================================================================
app.post('/users', async (req, res) => {
  const { username, email, full_name, age } = req.body;
  
  // Validation
  if (!username || !email) {
    return res.status(400).json({ 
      success: false, 
      error: 'Username and email are required' 
    });
  }
  
  try {
    const result = await pool.query(
      `INSERT INTO users (username, email, full_name, age) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [username, email, full_name || null, age || null]
    );
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Error creating user:', err);
    
    // Handle unique constraint violations
    if (err.code === '23505') {
      if (err.constraint === 'users_username_key') {
        return res.status(409).json({ 
          success: false, 
          error: 'Username already exists' 
        });
      }
      if (err.constraint === 'users_email_key') {
        return res.status(409).json({ 
          success: false, 
          error: 'Email already exists' 
        });
      }
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create user' 
    });
  }
});


// =============================================================================
// TASK 6: PUT /users/:id - Update an existing user
// =============================================================================
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { full_name, email, age } = req.body;
  
  // Build dynamic update query
  const updates = [];
  const values = [];
  let paramCount = 1;
  
  if (full_name !== undefined) {
    updates.push(`full_name = $${paramCount}`);
    values.push(full_name);
    paramCount++;
  }
  
  if (email !== undefined) {
    updates.push(`email = $${paramCount}`);
    values.push(email);
    paramCount++;
  }
  
  if (age !== undefined) {
    updates.push(`age = $${paramCount}`);
    values.push(age);
    paramCount++;
  }
  
  if (updates.length === 0) {
    return res.status(400).json({ 
      success: false, 
      error: 'No valid fields to update' 
    });
  }
  
  values.push(id); // Add ID as the last parameter
  
  try {
    const result = await pool.query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Error updating user:', err);
    
    // Handle unique constraint violations
    if (err.code === '23505' && err.constraint === 'users_email_key') {
      return res.status(409).json({ 
        success: false, 
        error: 'Email already exists' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update user' 
    });
  }
});


// =============================================================================
// TASK 7: DELETE /users/:id - Delete a user
// =============================================================================
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete user' 
    });
  }
});


// =============================================================================
// TASK 8: GET /users/search - Search users by username or email
// =============================================================================
app.get('/users/search', async (req, res) => {
  const { username, email } = req.query;
  
  if (!username && !email) {
    return res.status(400).json({ 
      success: false, 
      error: 'Please provide username or email search parameter' 
    });
  }
  
  try {
    let query = 'SELECT * FROM users WHERE ';
    const conditions = [];
    const values = [];
    let paramCount = 1;
    
    if (username) {
      conditions.push(`username ILIKE $${paramCount}`);
      values.push(`%${username}%`);
      paramCount++;
    }
    
    if (email) {
      conditions.push(`email ILIKE $${paramCount}`);
      values.push(`%${email}%`);
      paramCount++;
    }
    
    query += conditions.join(' OR ');
    
    const result = await pool.query(query, values);
    
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (err) {
    console.error('Error searching users:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to search users' 
    });
  }
});


// =============================================================================
// BONUS TASKS
// =============================================================================

// Bonus 1: Add pagination to GET /users
app.get('/users/paginated', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  
  try {
    // Get total count
    const countResult = await pool.query('SELECT COUNT(*) FROM users');
    const totalUsers = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalUsers / limit);
    
    // Get paginated data
    const result = await pool.query(
      'SELECT * FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    
    res.json({
      success: true,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        usersPerPage: limit
      },
      data: result.rows
    });
  } catch (err) {
    console.error('Error fetching paginated users:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to retrieve users' 
    });
  }
});

// Bonus 2: Add sorting to GET /users
app.get('/users/sorted', async (req, res) => {
  const sortBy = req.query.sortBy || 'created_at';
  const order = req.query.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  
  const allowedSortFields = ['id', 'username', 'email', 'full_name', 'age', 'created_at'];
  
  if (!allowedSortFields.includes(sortBy)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid sort field' 
    });
  }
  
  try {
    const result = await pool.query(
      `SELECT * FROM users ORDER BY ${sortBy} ${order}`
    );
    
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (err) {
    console.error('Error fetching sorted users:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to retrieve users' 
    });
  }
});

// Bonus 3: Input validation middleware
function validateUser(req, res, next) {
  const { email, age } = req.body;
  
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid email format' 
    });
  }
  
  if (age !== undefined && (age < 0 || age > 150)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Age must be between 0 and 150' 
    });
  }
  
  next();
}

// Apply to routes
app.post('/users', validateUser);
app.put('/users/:id', validateUser);


// Bonus 4: Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});


// =============================================================================
// Server Startup
// =============================================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`User Management API running on port ${PORT}`);
  console.log('\nAvailable endpoints:');
  console.log('  GET    /users          - Get all users');
  console.log('  GET    /users/:id      - Get user by ID');
  console.log('  POST   /users          - Create new user');
  console.log('  PUT    /users/:id      - Update user');
  console.log('  DELETE /users/:id      - Delete user');
  console.log('  GET    /users/search   - Search users');
});


// =============================================================================
// Graceful Shutdown
// =============================================================================
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await pool.end();
  process.exit(0);
});
