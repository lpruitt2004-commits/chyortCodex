-- Day 2: CRUD Operations & Filtering
-- Exercise: Build SQL queries for a product inventory system

-- =============================================================================
-- SETUP: Create the products table
-- =============================================================================

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    supplier VARCHAR(100),
    last_restock_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data provided
INSERT INTO products (name, category, price, stock_quantity, supplier, last_restock_date) VALUES
('Laptop Pro 15', 'Electronics', 1299.99, 25, 'TechSupply Co', '2024-01-15'),
('Wireless Mouse', 'Electronics', 29.99, 150, 'TechSupply Co', '2024-01-20'),
('Office Chair', 'Furniture', 249.99, 40, 'FurniWorld', '2024-01-10'),
('Desk Lamp', 'Furniture', 45.99, 75, 'LightHouse Inc', '2024-01-18'),
('Notebook Set', 'Stationery', 12.99, 200, 'PaperMasters', '2024-01-22'),
('Ballpoint Pens (10pk)', 'Stationery', 5.99, 500, 'PaperMasters', '2024-01-25'),
('Monitor 27"', 'Electronics', 349.99, 30, 'TechSupply Co', '2024-01-12'),
('Keyboard Mechanical', 'Electronics', 89.99, 60, 'TechSupply Co', '2024-01-20'),
('Desk Organizer', 'Stationery', 18.99, 120, 'PaperMasters', '2024-01-15'),
('Standing Desk', 'Furniture', 599.99, 15, 'FurniWorld', '2024-01-08');


-- =============================================================================
-- TASK 1: UPDATE Operations
-- =============================================================================

-- Update 1: Increase the price of all Electronics by 10%
-- YOUR CODE HERE


-- Update 2: Restock the 'Wireless Mouse' to 200 units and update last_restock_date to today
-- YOUR CODE HERE


-- Update 3: Change the supplier of all Stationery items to 'Office Depot'
-- YOUR CODE HERE


-- Update 4: Mark products with stock_quantity less than 20 as needing reorder
-- (Add a new column 'needs_reorder' as boolean and set it to true)
-- YOUR CODE HERE



-- =============================================================================
-- TASK 2: DELETE Operations
-- =============================================================================

-- Delete 1: Remove all products that have 0 stock
-- (First, set one product's stock to 0 for testing)
-- YOUR CODE HERE


-- Delete 2: Remove products older than 1 year
-- (Based on created_at timestamp)
-- YOUR CODE HERE


-- =============================================================================
-- TASK 3: Advanced Filtering with WHERE
-- =============================================================================

-- Query 1: Find all products priced between $20 and $100
-- YOUR CODE HERE


-- Query 2: Find all Furniture or Electronics with stock > 50
-- YOUR CODE HERE


-- Query 3: Find products from 'TechSupply Co' that cost more than $50
-- YOUR CODE HERE


-- Query 4: Find products that were NOT restocked in January 2024
-- YOUR CODE HERE


-- Query 5: Find products with names starting with 'Desk'
-- YOUR CODE HERE


-- =============================================================================
-- TASK 4: Sorting and Limiting
-- =============================================================================

-- Query 6: Get the 5 most expensive products
-- YOUR CODE HERE


-- Query 7: Get the 3 most recently restocked products
-- YOUR CODE HERE


-- Query 8: Get all Electronics sorted by price (lowest to highest)
-- YOUR CODE HERE


-- Query 9: Get products with stock < 50, ordered by stock_quantity (lowest first)
-- YOUR CODE HERE


-- =============================================================================
-- TASK 5: Aggregate Functions
-- =============================================================================

-- Query 10: Count total number of products
-- YOUR CODE HERE


-- Query 11: Calculate the total value of all inventory (price * stock_quantity)
-- YOUR CODE HERE


-- Query 12: Find the average price of all products
-- YOUR CODE HERE


-- Query 13: Find the minimum and maximum stock quantities
-- YOUR CODE HERE


-- Query 14: Count how many products are in each category
-- YOUR CODE HERE


-- =============================================================================
-- TASK 6: GROUP BY and HAVING
-- =============================================================================

-- Query 15: Get the total inventory value per category
-- YOUR CODE HERE


-- Query 16: Get the average price per supplier
-- YOUR CODE HERE


-- Query 17: Find categories that have more than 3 products
-- YOUR CODE HERE


-- Query 18: Find suppliers whose total inventory value exceeds $5000
-- YOUR CODE HERE


-- =============================================================================
-- BONUS CHALLENGES
-- =============================================================================

-- Bonus 1: Create a view that shows low-stock products (stock < 30)
-- YOUR CODE HERE


-- Bonus 2: Find the category with the highest average price
-- YOUR CODE HERE


-- Bonus 3: Calculate the percentage of total inventory each category represents
-- YOUR CODE HERE


-- Bonus 4: Find products that haven't been restocked in the last 30 days
-- YOUR CODE HERE
