// Day 5: Advanced Topics & Database Design
// SOLUTION

const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: 'ecommerce_db',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});


// =============================================================================
// TASK 1: Create Normalized Database Schema
// =============================================================================
async function createSchema() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Customers table
    await client.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
        stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
        category VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Orders table
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Order items table (junction table with additional data)
    await client.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
        quantity INTEGER NOT NULL CHECK (quantity > 0),
        price_at_purchase DECIMAL(10, 2) NOT NULL CHECK (price_at_purchase >= 0)
      );
    `);
    
    await client.query('COMMIT');
    console.log('Schema created successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating schema:', err);
    throw err;
  } finally {
    client.release();
  }
}


// =============================================================================
// TASK 2: Create Indexes for Performance
// =============================================================================
async function createIndexes() {
  try {
    await pool.query('CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);');
    
    console.log('Indexes created successfully');
  } catch (err) {
    console.error('Error creating indexes:', err);
  }
}


// =============================================================================
// TASK 3: POST /orders - Create Order with Transaction
// =============================================================================
app.post('/orders', async (req, res) => {
  const { customer_id, items } = req.body;
  // items format: [{ product_id: 1, quantity: 2 }, ...]
  
  if (!customer_id || !items || items.length === 0) {
    return res.status(400).json({ 
      success: false, 
      error: 'customer_id and items are required' 
    });
  }
  
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // 1. Fetch product prices and check stock
    const productIds = items.map(item => item.product_id);
    const productsResult = await client.query(
      'SELECT id, price, stock_quantity FROM products WHERE id = ANY($1)',
      [productIds]
    );
    
    const productsMap = {};
    productsResult.rows.forEach(product => {
      productsMap[product.id] = product;
    });
    
    // Validate all products exist and have sufficient stock
    let totalAmount = 0;
    for (const item of items) {
      const product = productsMap[item.product_id];
      
      if (!product) {
        throw new Error(`Product ${item.product_id} not found`);
      }
      
      if (product.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for product ${item.product_id}. Available: ${product.stock_quantity}, Requested: ${item.quantity}`);
      }
      
      totalAmount += parseFloat(product.price) * item.quantity;
    }
    
    // 2. Create order
    const orderResult = await client.query(
      `INSERT INTO orders (customer_id, total_amount, status) 
       VALUES ($1, $2, 'pending') 
       RETURNING *`,
      [customer_id, totalAmount]
    );
    
    const order = orderResult.rows[0];
    
    // 3. Create order items and update product stock
    for (const item of items) {
      const product = productsMap[item.product_id];
      
      // Insert order item
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) 
         VALUES ($1, $2, $3, $4)`,
        [order.id, item.product_id, item.quantity, product.price]
      );
      
      // Update product stock
      await client.query(
        'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }
    
    await client.query('COMMIT');
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating order:', err);
    
    res.status(400).json({ 
      success: false, 
      error: err.message 
    });
  } finally {
    client.release();
  }
});


// =============================================================================
// TASK 4: GET /orders/:id - Get Order with Items (Optimized)
// =============================================================================
app.get('/orders/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(`
      SELECT 
        o.id as order_id,
        o.order_date,
        o.total_amount,
        o.status,
        c.id as customer_id,
        c.email,
        c.first_name,
        c.last_name,
        json_agg(
          json_build_object(
            'product_id', p.id,
            'product_name', p.name,
            'quantity', oi.quantity,
            'price_at_purchase', oi.price_at_purchase,
            'subtotal', oi.quantity * oi.price_at_purchase
          ) ORDER BY oi.id
        ) as items
      FROM orders o
      INNER JOIN customers c ON o.customer_id = c.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.id = $1
      GROUP BY o.id, c.id, c.email, c.first_name, c.last_name
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Order not found' 
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to retrieve order' 
    });
  }
});


// =============================================================================
// TASK 5: PUT /orders/:id/status - Update Order Status with Validation
// =============================================================================
app.put('/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ 
      success: false, 
      error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
    });
  }
  
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Get current status
    const currentResult = await client.query(
      'SELECT status FROM orders WHERE id = $1',
      [id]
    );
    
    if (currentResult.rows.length === 0) {
      throw new Error('Order not found');
    }
    
    const currentStatus = currentResult.rows[0].status;
    
    // Validate status transition
    const validTransitions = {
      'pending': ['processing', 'cancelled'],
      'processing': ['shipped', 'cancelled'],
      'shipped': ['delivered'],
      'delivered': [],
      'cancelled': []
    };
    
    if (!validTransitions[currentStatus].includes(status)) {
      throw new Error(`Cannot transition from ${currentStatus} to ${status}`);
    }
    
    // Update status
    const result = await client.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    await client.query('COMMIT');
    
    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: result.rows[0]
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error updating order status:', err);
    
    if (err.message === 'Order not found') {
      return res.status(404).json({ success: false, error: err.message });
    }
    
    res.status(400).json({ 
      success: false, 
      error: err.message 
    });
  } finally {
    client.release();
  }
});


// =============================================================================
// TASK 6: GET /analytics/sales - Sales Analytics with Aggregation
// =============================================================================
app.get('/analytics/sales', async (req, res) => {
  const { start_date, end_date } = req.query;
  
  try {
    let dateFilter = '';
    const params = [];
    
    if (start_date && end_date) {
      dateFilter = 'WHERE o.order_date BETWEEN $1 AND $2';
      params.push(start_date, end_date);
    }
    
    // Overall statistics
    const statsResult = await pool.query(`
      SELECT 
        COUNT(*) as total_orders,
        COALESCE(SUM(total_amount), 0) as total_revenue,
        COALESCE(AVG(total_amount), 0) as average_order_value,
        COUNT(DISTINCT customer_id) as unique_customers
      FROM orders o
      ${dateFilter}
    `, params);
    
    // Top 5 selling products
    const topProductsResult = await pool.query(`
      SELECT 
        p.id,
        p.name,
        SUM(oi.quantity) as total_sold,
        SUM(oi.quantity * oi.price_at_purchase) as revenue
      FROM order_items oi
      INNER JOIN products p ON oi.product_id = p.id
      INNER JOIN orders o ON oi.order_id = o.id
      ${dateFilter}
      GROUP BY p.id, p.name
      ORDER BY total_sold DESC
      LIMIT 5
    `, params);
    
    // Sales by status
    const statusResult = await pool.query(`
      SELECT 
        status,
        COUNT(*) as count,
        SUM(total_amount) as revenue
      FROM orders o
      ${dateFilter}
      GROUP BY status
      ORDER BY count DESC
    `, params);
    
    res.json({
      success: true,
      data: {
        summary: statsResult.rows[0],
        top_products: topProductsResult.rows,
        by_status: statusResult.rows
      }
    });
  } catch (err) {
    console.error('Error generating analytics:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate analytics' 
    });
  }
});


// =============================================================================
// TASK 7: Database Migration Function
// =============================================================================
async function addProductWeight() {
  try {
    await pool.query(`
      ALTER TABLE products
      ADD COLUMN IF NOT EXISTS weight DECIMAL(10, 2) CHECK (weight >= 0);
    `);
    
    console.log('Product weight column added successfully');
  } catch (err) {
    console.error('Error adding weight column:', err);
  }
}


// =============================================================================
// TASK 8: Implement Stock Check Before Order
// =============================================================================
async function checkStockAvailability(items) {
  try {
    const productIds = items.map(item => item.product_id);
    
    const result = await pool.query(
      'SELECT id, name, stock_quantity FROM products WHERE id = ANY($1)',
      [productIds]
    );
    
    const productsMap = {};
    result.rows.forEach(product => {
      productsMap[product.id] = product;
    });
    
    for (const item of items) {
      const product = productsMap[item.product_id];
      
      if (!product) {
        return { 
          available: false, 
          message: `Product ${item.product_id} not found` 
        };
      }
      
      if (product.stock_quantity < item.quantity) {
        return { 
          available: false, 
          message: `Insufficient stock for ${product.name}. Available: ${product.stock_quantity}, Requested: ${item.quantity}` 
        };
      }
    }
    
    return { available: true };
  } catch (err) {
    console.error('Error checking stock:', err);
    return { 
      available: false, 
      message: 'Error checking stock availability' 
    };
  }
}


// =============================================================================
// BONUS TASKS
// =============================================================================

// Bonus 1: Implement order cancellation with stock restoration
async function cancelOrder(orderId) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Get order status
    const orderResult = await client.query(
      'SELECT status FROM orders WHERE id = $1',
      [orderId]
    );
    
    if (orderResult.rows.length === 0) {
      throw new Error('Order not found');
    }
    
    const currentStatus = orderResult.rows[0].status;
    
    // Can only cancel pending or processing orders
    if (!['pending', 'processing'].includes(currentStatus)) {
      throw new Error(`Cannot cancel order with status: ${currentStatus}`);
    }
    
    // Get order items
    const itemsResult = await client.query(
      'SELECT product_id, quantity FROM order_items WHERE order_id = $1',
      [orderId]
    );
    
    // Restore stock quantities
    for (const item of itemsResult.rows) {
      await client.query(
        'UPDATE products SET stock_quantity = stock_quantity + $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }
    
    // Update order status
    await client.query(
      'UPDATE orders SET status = $1 WHERE id = $2',
      ['cancelled', orderId]
    );
    
    await client.query('COMMIT');
    
    return { success: true, message: 'Order cancelled successfully' };
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error cancelling order:', err);
    return { success: false, error: err.message };
  } finally {
    client.release();
  }
}

// Endpoint for order cancellation
app.post('/orders/:id/cancel', async (req, res) => {
  const { id } = req.params;
  const result = await cancelOrder(id);
  
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});


// Bonus 2: Create customer order history view
async function createCustomerOrderHistoryView() {
  try {
    await pool.query(`
      CREATE OR REPLACE VIEW customer_order_history AS
      SELECT 
        c.id as customer_id,
        c.email,
        c.first_name,
        c.last_name,
        COUNT(o.id) as total_orders,
        COALESCE(SUM(o.total_amount), 0) as total_spent,
        COALESCE(AVG(o.total_amount), 0) as average_order_value,
        MAX(o.order_date) as last_order_date
      FROM customers c
      LEFT JOIN orders o ON c.id = o.customer_id
      GROUP BY c.id, c.email, c.first_name, c.last_name;
    `);
    
    console.log('Customer order history view created successfully');
  } catch (err) {
    console.error('Error creating view:', err);
  }
}

// Endpoint to get customer history
app.get('/customers/:id/history', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM customer_order_history WHERE customer_id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('Error fetching customer history:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve customer history' });
  }
});


// =============================================================================
// Server Setup
// =============================================================================
const PORT = process.env.PORT || 3000;

async function startServer() {
  await createSchema();
  await createIndexes();
  await addProductWeight();
  await createCustomerOrderHistoryView();
  
  app.listen(PORT, () => {
    console.log(`E-commerce API running on port ${PORT}`);
    console.log('\nAvailable endpoints:');
    console.log('  POST   /orders                - Create new order');
    console.log('  GET    /orders/:id            - Get order details');
    console.log('  PUT    /orders/:id/status     - Update order status');
    console.log('  POST   /orders/:id/cancel     - Cancel order');
    console.log('  GET    /analytics/sales       - Get sales analytics');
    console.log('  GET    /customers/:id/history - Get customer order history');
  });
}

startServer();

process.on('SIGINT', async () => {
  console.log('\nShutting down...');
  await pool.end();
  process.exit(0);
});
