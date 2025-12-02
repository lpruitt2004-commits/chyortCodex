-- Day 1: SQL Fundamentals & Database Setup
-- SOLUTION

-- =============================================================================
-- TASK 1: Create the database (run this in psql or terminal)
-- =============================================================================
-- CREATE DATABASE library_db;
-- \c library_db


-- =============================================================================
-- TASK 2: Create a books table
-- =============================================================================
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(13) UNIQUE,
    published_year INTEGER,
    genre VARCHAR(50),
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =============================================================================
-- TASK 3: Create a members table
-- =============================================================================
CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    join_date DATE DEFAULT CURRENT_DATE,
    membership_status VARCHAR(20) DEFAULT 'active'
);


-- =============================================================================
-- TASK 4: Insert sample books
-- =============================================================================
INSERT INTO books (title, author, isbn, published_year, genre) VALUES
('To Kill a Mockingbird', 'Harper Lee', '9780061120084', 1960, 'Fiction'),
('1984', 'George Orwell', '9780451524935', 1949, 'Dystopian'),
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 1925, 'Classic'),
('The Hobbit', 'J.R.R. Tolkien', '9780547928227', 1937, 'Fantasy'),
('Sapiens', 'Yuval Noah Harari', '9780062316097', 2011, 'Non-Fiction'),
('The Catcher in the Rye', 'J.D. Salinger', '9780316769488', 1951, 'Fiction'),
('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', '9780590353427', 1997, 'Fantasy'),
('The Lord of the Rings', 'J.R.R. Tolkien', '9780544003415', 1954, 'Fantasy');


-- =============================================================================
-- TASK 5: Insert sample members
-- =============================================================================
INSERT INTO members (first_name, last_name, email, phone) VALUES
('John', 'Smith', 'john.smith@email.com', '555-0101'),
('Sarah', 'Johnson', 'sarah.j@email.com', '555-0102'),
('Michael', 'Williams', 'michael.w@email.com', '555-0103'),
('Emily', 'Brown', 'emily.brown@email.com', '555-0104'),
('David', 'Jones', 'david.jones@email.com', '555-0105');


-- =============================================================================
-- TASK 6: Basic SELECT queries
-- =============================================================================

-- Query 1: Select all books
SELECT * FROM books;

-- Query 2: Select all members
SELECT * FROM members;

-- Query 3: Select only the title and author of all books
SELECT title, author FROM books;

-- Query 4: Select books published after 2000
SELECT * FROM books
WHERE published_year > 2000;

-- Query 5: Select books where the genre is 'Fantasy'
SELECT * FROM books
WHERE genre = 'Fantasy';

-- Query 6: Select members with 'active' membership status
SELECT * FROM members
WHERE membership_status = 'active';

-- Query 7: Select books that are currently available
SELECT * FROM books
WHERE available = true;


-- =============================================================================
-- TASK 7: Practice WHERE clauses
-- =============================================================================

-- Query 8: Find the book with ISBN "9780061120084"
SELECT * FROM books
WHERE isbn = '9780061120084';

-- Query 9: Find members whose last name is "Smith"
SELECT * FROM members
WHERE last_name = 'Smith';

-- Query 10: Find books published between 1900 and 1950
SELECT * FROM books
WHERE published_year BETWEEN 1900 AND 1950;

-- Query 11: Find all Fiction or Fantasy books
SELECT * FROM books
WHERE genre IN ('Fiction', 'Fantasy');

-- Alternative using OR:
SELECT * FROM books
WHERE genre = 'Fiction' OR genre = 'Fantasy';

-- Query 12: Find members who joined in 2024
SELECT * FROM members
WHERE EXTRACT(YEAR FROM join_date) = 2024;

-- Alternative:
SELECT * FROM members
WHERE join_date >= '2024-01-01' AND join_date < '2025-01-01';


-- =============================================================================
-- BONUS CHALLENGES
-- =============================================================================

-- Bonus 1: Add a new column 'pages' (integer) to the books table
ALTER TABLE books
ADD COLUMN pages INTEGER;

-- Update some books with page counts
UPDATE books SET pages = 324 WHERE isbn = '9780061120084';
UPDATE books SET pages = 328 WHERE isbn = '9780451524935';
UPDATE books SET pages = 180 WHERE isbn = '9780743273565';

-- Bonus 2: Update a book to mark it as unavailable
UPDATE books
SET available = false
WHERE isbn = '9780061120084';

-- Verify the update
SELECT title, available FROM books WHERE isbn = '9780061120084';

-- Bonus 3: Delete a member from the database
DELETE FROM members
WHERE email = 'david.jones@email.com';

-- Verify deletion
SELECT * FROM members;

-- Bonus 4: Find books with titles containing the word "The"
SELECT * FROM books
WHERE title LIKE '%The%';

-- Case-insensitive version:
SELECT * FROM books
WHERE title ILIKE '%the%';
