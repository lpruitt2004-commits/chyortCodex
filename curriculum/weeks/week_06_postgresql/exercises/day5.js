// Day 5: Advanced Topics & Database Design
// Exercise: E-commerce database with transactions and optimization

const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'ecommerce_db',
  password: 'your_password',
  port: 5432,
});


// =============================================================================
// TASK 1: Create Normalized Database Schema
// =============================================================================
// Create the following tables with proper relationships and constraints:

// 1. customers table
//    - id, email (unique), first_name, last_name, created_at

// 2. products table
//    - id, name, description, price, stock_quantity, category, created_at

// 3. orders table
//    - id, customer_id (FK), order_date, total_amount, status, created_at

// 4. order_items table (junction table with additional data)
//    - id, order_id (FK), product_id (FK), quantity, price_at_purchase

async function createSchema() {
  const client = await pool.connect();
  
  try {
    // YOUR CODE HERE
    // Create all four tables with proper constraints
    
    console.log('Schema created successfully');
  } catch (err) {
    console.error('Error creating schema:', err);
  } finally {
    client.release();
  }
}


// =============================================================================
// TASK 2: Create Indexes for Performance
// =============================================================================
// Add indexes on frequently queried columns:
// - customers.email
// - orders.customer_id
// - orders.status
// - order_items.order_id
// - order_items.product_id

async function createIndexes() {
  // YOUR CODE HERE
  
}


// =============================================================================
// TASK 3: POST /orders - Create Order with Transaction
// =============================================================================
// Implement order creation using a transaction to ensure data integrity:
// 1. Begin transaction
// 2. Create order record
// 3. Create order_items records
// 4. Update product stock quantities
// 5. Commit transaction
// If any step fails, rollback the entire transaction

app.post('/orders', async (req, res) => {
  const { customer_id, items } = req.body;
  // items format: [{ product_id: 1, quantity: 2 }, ...]
  
  const client = await pool.connect();
  
  try {
    // YOUR CODE HERE
    // 1. Start transaction with BEGIN
    // 2. Calculate total_amount by fetching product prices
    // 3. Insert into orders table
    // 4. Insert into order_items table
    // 5. Update products stock quantities
    // 6. COMMIT transaction
    
  } catch (err) {
    // YOUR CODE HERE
    // ROLLBACK transaction on error
    
  } finally {
    client.release();
  }
});


// =============================================================================
// TASK 4: GET /orders/:id - Get Order with Items (Optimized)
// =============================================================================
// Retrieve a complete order with all items in a single query using JOIN
// Include: order details, customer info, and all order items with product details

app.get('/orders/:id', async (req, res) => {
  // YOUR CODE HERE
  // Use JOIN to get all related data in one query
  
});


// =============================================================================
// TASK 5: PUT /orders/:id/status - Update Order Status with Validation
// =============================================================================
// Update order status with business logic validation:
// - Only allow valid status transitions (pending -> processing -> shipped -> delivered)
// - Use a transaction to ensure consistency

app.put('/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  
  // YOUR CODE HERE
  // Validate status transition and update
  
});


// =============================================================================
// TASK 6: GET /analytics/sales - Sales Analytics with Aggregation
// =============================================================================
// Implement an analytics endpoint that returns:
// - Total revenue
// - Number of orders
// - Average order value
// - Top 5 selling products
// Use date range filters: ?start_date=2024-01-01&end_date=2024-12-31

app.get('/analytics/sales', async (req, res) => {
  // YOUR CODE HERE
  
});


// =============================================================================
// TASK 7: Database Migration Function
// =============================================================================
// Create a function to add a new column to products table
// Add 'weight' column (decimal) for shipping calculations

async function addProductWeight() {
  // YOUR CODE HERE
  
}


// =============================================================================
// TASK 8: Implement Stock Check Before Order
// =============================================================================
// Create a function to check if all products have sufficient stock
// before creating an order

async function checkStockAvailability(items) {
  // YOUR CODE HERE
  // Return true if all items have sufficient stock
  // items format: [{ product_id: 1, quantity: 2 }, ...]
  
}


// =============================================================================
// BONUS TASKS
// =============================================================================

// Bonus 1: Implement a function to handle order cancellation
// - Use transaction to restore product stock quantities
// - Update order status to 'cancelled'
async function cancelOrder(orderId) {
  // YOUR CODE HERE
  
}


// Bonus 2: Create a view for customer order history
// Include: customer info, order count, total spent
async function createCustomerOrderHistoryView() {
  // YOUR CODE HERE
  
}


// Bonus 3: Implement optimistic locking for stock updates
// Add 'version' column to products and use it to prevent race conditions


// Bonus 4: Add full-text search on products
// Create an index and search endpoint for product name and description


// =============================================================================
// Server Setup
// =============================================================================
const PORT = process.env.PORT || 3000;

async function startServer() {
  await createSchema();
  await createIndexes();
  
  app.listen(PORT, () => {
    console.log(`E-commerce API running on port ${PORT}`);
  });
}

startServer();

process.on('SIGINT', async () => {
  await pool.end();
  process.exit(0);
});
