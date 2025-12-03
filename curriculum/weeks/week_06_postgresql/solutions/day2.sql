-- Day 2: CRUD Operations & Filtering
-- SOLUTION

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
UPDATE products
SET price = price * 1.10
WHERE category = 'Electronics';

-- Verify:
SELECT name, category, price FROM products WHERE category = 'Electronics';

-- Update 2: Restock the 'Wireless Mouse' to 200 units and update last_restock_date to today
UPDATE products
SET stock_quantity = 200,
    last_restock_date = CURRENT_DATE
WHERE name = 'Wireless Mouse';

-- Verify:
SELECT name, stock_quantity, last_restock_date FROM products WHERE name = 'Wireless Mouse';

-- Update 3: Change the supplier of all Stationery items to 'Office Depot'
UPDATE products
SET supplier = 'Office Depot'
WHERE category = 'Stationery';

-- Verify:
SELECT name, category, supplier FROM products WHERE category = 'Stationery';

-- Update 4: Mark products with stock_quantity less than 20 as needing reorder
-- First add the column
ALTER TABLE products
ADD COLUMN needs_reorder BOOLEAN DEFAULT false;

-- Then update
UPDATE products
SET needs_reorder = true
WHERE stock_quantity < 20;

-- Verify:
SELECT name, stock_quantity, needs_reorder FROM products ORDER BY stock_quantity;


-- =============================================================================
-- TASK 2: DELETE Operations
-- =============================================================================

-- Delete 1: Remove all products that have 0 stock
-- First, set one product's stock to 0 for testing
UPDATE products SET stock_quantity = 0 WHERE name = 'Desk Organizer';

-- Then delete
DELETE FROM products
WHERE stock_quantity = 0;

-- Verify:
SELECT name, stock_quantity FROM products;

-- Delete 2: Remove products older than 1 year
DELETE FROM products
WHERE created_at < CURRENT_TIMESTAMP - INTERVAL '1 year';

-- Note: With sample data all created recently, this won't delete anything
-- To test, you could create an old product:
INSERT INTO products (name, category, price, stock_quantity, created_at) VALUES
('Old Product', 'Electronics', 99.99, 10, '2020-01-01');

-- Then run the delete again


-- =============================================================================
-- TASK 3: Advanced Filtering with WHERE
-- =============================================================================

-- Query 1: Find all products priced between $20 and $100
SELECT name, price FROM products
WHERE price BETWEEN 20 AND 100
ORDER BY price;

-- Query 2: Find all Furniture or Electronics with stock > 50
SELECT name, category, stock_quantity FROM products
WHERE category IN ('Furniture', 'Electronics')
  AND stock_quantity > 50
ORDER BY category, stock_quantity DESC;

-- Query 3: Find products from 'TechSupply Co' that cost more than $50
SELECT name, supplier, price FROM products
WHERE supplier = 'TechSupply Co'
  AND price > 50
ORDER BY price DESC;

-- Query 4: Find products that were NOT restocked in January 2024
SELECT name, last_restock_date FROM products
WHERE last_restock_date NOT BETWEEN '2024-01-01' AND '2024-01-31'
   OR last_restock_date IS NULL;

-- Query 5: Find products with names starting with 'Desk'
SELECT name FROM products
WHERE name LIKE 'Desk%';


-- =============================================================================
-- TASK 4: Sorting and Limiting
-- =============================================================================

-- Query 6: Get the 5 most expensive products
SELECT name, price FROM products
ORDER BY price DESC
LIMIT 5;

-- Query 7: Get the 3 most recently restocked products
SELECT name, last_restock_date FROM products
WHERE last_restock_date IS NOT NULL
ORDER BY last_restock_date DESC
LIMIT 3;

-- Query 8: Get all Electronics sorted by price (lowest to highest)
SELECT name, price FROM products
WHERE category = 'Electronics'
ORDER BY price ASC;

-- Query 9: Get products with stock < 50, ordered by stock_quantity (lowest first)
SELECT name, stock_quantity FROM products
WHERE stock_quantity < 50
ORDER BY stock_quantity ASC;


-- =============================================================================
-- TASK 5: Aggregate Functions
-- =============================================================================

-- Query 10: Count total number of products
SELECT COUNT(*) as total_products FROM products;

-- Query 11: Calculate the total value of all inventory (price * stock_quantity)
SELECT SUM(price * stock_quantity) as total_inventory_value
FROM products;

-- Formatted version:
SELECT TO_CHAR(SUM(price * stock_quantity), 'FM$999,999,999.00') as total_inventory_value
FROM products;

-- Query 12: Find the average price of all products
SELECT AVG(price) as average_price FROM products;

-- Rounded:
SELECT ROUND(AVG(price), 2) as average_price FROM products;

-- Query 13: Find the minimum and maximum stock quantities
SELECT 
    MIN(stock_quantity) as min_stock,
    MAX(stock_quantity) as max_stock
FROM products;

-- Query 14: Count how many products are in each category
SELECT 
    category,
    COUNT(*) as product_count
FROM products
GROUP BY category
ORDER BY product_count DESC;


-- =============================================================================
-- TASK 6: GROUP BY and HAVING
-- =============================================================================

-- Query 15: Get the total inventory value per category
SELECT 
    category,
    SUM(price * stock_quantity) as inventory_value
FROM products
GROUP BY category
ORDER BY inventory_value DESC;

-- Query 16: Get the average price per supplier
SELECT 
    supplier,
    ROUND(AVG(price), 2) as avg_price,
    COUNT(*) as product_count
FROM products
GROUP BY supplier
ORDER BY avg_price DESC;

-- Query 17: Find categories that have more than 3 products
SELECT 
    category,
    COUNT(*) as product_count
FROM products
GROUP BY category
HAVING COUNT(*) > 3;

-- Query 18: Find suppliers whose total inventory value exceeds $5000
SELECT 
    supplier,
    SUM(price * stock_quantity) as total_value
FROM products
GROUP BY supplier
HAVING SUM(price * stock_quantity) > 5000
ORDER BY total_value DESC;


-- =============================================================================
-- BONUS CHALLENGES
-- =============================================================================

-- Bonus 1: Create a view that shows low-stock products (stock < 30)
CREATE OR REPLACE VIEW low_stock_products AS
SELECT 
    name,
    category,
    stock_quantity,
    supplier,
    price * stock_quantity as inventory_value
FROM products
WHERE stock_quantity < 30
ORDER BY stock_quantity ASC;

-- Use the view:
SELECT * FROM low_stock_products;

-- Bonus 2: Find the category with the highest average price
SELECT 
    category,
    ROUND(AVG(price), 2) as avg_price
FROM products
GROUP BY category
ORDER BY avg_price DESC
LIMIT 1;

-- Bonus 3: Calculate the percentage of total inventory each category represents
SELECT 
    category,
    SUM(price * stock_quantity) as category_value,
    ROUND(
        100.0 * SUM(price * stock_quantity) / 
        (SELECT SUM(price * stock_quantity) FROM products),
        2
    ) as percentage_of_total
FROM products
GROUP BY category
ORDER BY percentage_of_total DESC;

-- Bonus 4: Find products that haven't been restocked in the last 30 days
SELECT 
    name,
    last_restock_date,
    CURRENT_DATE - last_restock_date as days_since_restock
FROM products
WHERE last_restock_date < CURRENT_DATE - INTERVAL '30 days'
   OR last_restock_date IS NULL
ORDER BY last_restock_date ASC;
