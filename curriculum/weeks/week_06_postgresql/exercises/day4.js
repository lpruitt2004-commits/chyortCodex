// Day 4: Node.js + PostgreSQL Integration
// Exercise: Build a RESTful API with PostgreSQL for user management

const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// =============================================================================
// TASK 1: Set up PostgreSQL connection pool
// =============================================================================
// Create a connection pool with your database credentials
// Database: user_management_db
// Your configuration should include: user, host, database, password, port

// YOUR CODE HERE
const pool = null; // Replace with actual Pool instance


// =============================================================================
// TASK 2: Create Users Table
// =============================================================================
// Write a function to create the users table if it doesn't exist
// Table structure:
// - id: SERIAL PRIMARY KEY
// - username: VARCHAR(50) UNIQUE NOT NULL
// - email: VARCHAR(100) UNIQUE NOT NULL
// - full_name: VARCHAR(100)
// - age: INTEGER
// - created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

async function createUsersTable() {
  // YOUR CODE HERE
  
}

// Call this function to initialize the table
createUsersTable();


// =============================================================================
// TASK 3: GET /users - Retrieve all users
// =============================================================================
// Implement an endpoint that returns all users from the database
// Use parameterized queries
// Handle errors appropriately

app.get('/users', async (req, res) => {
  // YOUR CODE HERE
  
});


// =============================================================================
// TASK 4: GET /users/:id - Retrieve a single user by ID
// =============================================================================
// Implement an endpoint that returns a specific user by their ID
// Return 404 if user not found
// Use parameterized queries to prevent SQL injection

app.get('/users/:id', async (req, res) => {
  // YOUR CODE HERE
  
});


// =============================================================================
// TASK 5: POST /users - Create a new user
// =============================================================================
// Implement an endpoint to create a new user
// Required fields: username, email
// Optional fields: full_name, age
// Return the created user with their new ID
// Handle duplicate username/email errors (constraint violations)

app.post('/users', async (req, res) => {
  // YOUR CODE HERE
  
});


// =============================================================================
// TASK 6: PUT /users/:id - Update an existing user
// =============================================================================
// Implement an endpoint to update a user's information
// Allow updating: full_name, email, age
// Don't allow updating username or id
// Return the updated user
// Return 404 if user doesn't exist

app.put('/users/:id', async (req, res) => {
  // YOUR CODE HERE
  
});


// =============================================================================
// TASK 7: DELETE /users/:id - Delete a user
// =============================================================================
// Implement an endpoint to delete a user by ID
// Return a success message
// Return 404 if user doesn't exist

app.delete('/users/:id', async (req, res) => {
  // YOUR CODE HERE
  
});


// =============================================================================
// TASK 8: GET /users/search - Search users by username or email
// =============================================================================
// Implement a search endpoint with query parameters
// Example: GET /users/search?username=john
// Support searching by username or email using LIKE operator

app.get('/users/search', async (req, res) => {
  // YOUR CODE HERE
  
});


// =============================================================================
// BONUS TASKS
// =============================================================================

// Bonus 1: Add pagination to GET /users
// Support ?page=1&limit=10 query parameters
// Return total count along with paginated results


// Bonus 2: Add sorting to GET /users
// Support ?sortBy=created_at&order=DESC


// Bonus 3: Add input validation middleware
// Validate email format, age range, etc.


// Bonus 4: Implement proper error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});


// =============================================================================
// Server Startup
// =============================================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`User Management API running on port ${PORT}`);
});


// =============================================================================
// Graceful Shutdown
// =============================================================================
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await pool.end();
  process.exit(0);
});
