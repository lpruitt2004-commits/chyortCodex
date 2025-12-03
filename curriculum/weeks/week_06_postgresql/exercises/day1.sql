-- Day 1: SQL Fundamentals & Database Setup
-- Exercise: Create a library database schema and insert sample data

-- =============================================================================
-- TASK 1: Create the database (run this in psql or terminal)
-- =============================================================================
-- CREATE DATABASE library_db;
-- \c library_db


-- =============================================================================
-- TASK 2: Create a books table
-- =============================================================================
-- Create a table called 'books' with the following columns:
-- - id: serial primary key
-- - title: varchar(255), not null
-- - author: varchar(100), not null
-- - isbn: varchar(13), unique
-- - published_year: integer
-- - genre: varchar(50)
-- - available: boolean, default true
-- - created_at: timestamp, default current_timestamp

-- YOUR CODE HERE



-- =============================================================================
-- TASK 3: Create a members table
-- =============================================================================
-- Create a table called 'members' with:
-- - id: serial primary key
-- - first_name: varchar(50), not null
-- - last_name: varchar(50), not null
-- - email: varchar(100), unique, not null
-- - phone: varchar(15)
-- - join_date: date, default current_date
-- - membership_status: varchar(20), default 'active'

-- YOUR CODE HERE



-- =============================================================================
-- TASK 4: Insert sample books
-- =============================================================================
-- Insert at least 5 books with different genres:
-- Examples:
-- - "To Kill a Mockingbird", "Harper Lee", "9780061120084", 1960, "Fiction"
-- - "1984", "George Orwell", "9780451524935", 1949, "Dystopian"
-- - "The Great Gatsby", "F. Scott Fitzgerald", "9780743273565", 1925, "Classic"
-- - "The Hobbit", "J.R.R. Tolkien", "9780547928227", 1937, "Fantasy"
-- - "Sapiens", "Yuval Noah Harari", "9780062316097", 2011, "Non-Fiction"

-- YOUR CODE HERE



-- =============================================================================
-- TASK 5: Insert sample members
-- =============================================================================
-- Insert at least 3 library members with different information

-- YOUR CODE HERE



-- =============================================================================
-- TASK 6: Basic SELECT queries
-- =============================================================================

-- Query 1: Select all books
-- YOUR CODE HERE


-- Query 2: Select all members
-- YOUR CODE HERE


-- Query 3: Select only the title and author of all books
-- YOUR CODE HERE


-- Query 4: Select books published after 2000
-- YOUR CODE HERE


-- Query 5: Select books where the genre is 'Fantasy'
-- YOUR CODE HERE


-- Query 6: Select members with 'active' membership status
-- YOUR CODE HERE


-- Query 7: Select books that are currently available
-- YOUR CODE HERE


-- =============================================================================
-- TASK 7: Practice WHERE clauses
-- =============================================================================

-- Query 8: Find the book with ISBN "9780061120084"
-- YOUR CODE HERE


-- Query 9: Find members whose last name is "Smith"
-- YOUR CODE HERE


-- Query 10: Find books published between 1900 and 1950
-- YOUR CODE HERE


-- Query 11: Find all Fiction or Fantasy books
-- YOUR CODE HERE


-- Query 12: Find members who joined in 2024
-- YOUR CODE HERE


-- =============================================================================
-- BONUS CHALLENGES
-- =============================================================================

-- Bonus 1: Add a new column 'pages' (integer) to the books table
-- YOUR CODE HERE


-- Bonus 2: Update a book to mark it as unavailable
-- YOUR CODE HERE


-- Bonus 3: Delete a member from the database
-- YOUR CODE HERE


-- Bonus 4: Find books with titles containing the word "The"
-- Hint: Use LIKE operator
-- YOUR CODE HERE
