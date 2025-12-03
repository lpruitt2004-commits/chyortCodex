-- Day 3: Relationships & Joins
-- Exercise: Create a blog database with users, posts, and comments

-- =============================================================================
-- TASK 1: Create Users Table
-- =============================================================================

-- Create a 'users' table with:
-- - id: serial primary key
-- - username: varchar(50), unique, not null
-- - email: varchar(100), unique, not null
-- - bio: text
-- - created_at: timestamp, default current_timestamp

-- YOUR CODE HERE



-- =============================================================================
-- TASK 2: Create Posts Table with Foreign Key
-- =============================================================================

-- Create a 'posts' table with:
-- - id: serial primary key
-- - user_id: integer, foreign key references users(id) ON DELETE CASCADE
-- - title: varchar(200), not null
-- - content: text, not null
-- - published: boolean, default false
-- - created_at: timestamp, default current_timestamp
-- - updated_at: timestamp, default current_timestamp

-- YOUR CODE HERE



-- =============================================================================
-- TASK 3: Create Comments Table with Foreign Key
-- =============================================================================

-- Create a 'comments' table with:
-- - id: serial primary key
-- - post_id: integer, foreign key references posts(id) ON DELETE CASCADE
-- - user_id: integer, foreign key references users(id) ON DELETE CASCADE
-- - content: text, not null
-- - created_at: timestamp, default current_timestamp

-- YOUR CODE HERE



-- =============================================================================
-- TASK 4: Create Tags Table and Junction Table (Many-to-Many)
-- =============================================================================

-- Create a 'tags' table with:
-- - id: serial primary key
-- - name: varchar(50), unique, not null

-- YOUR CODE HERE


-- Create a 'post_tags' junction table with:
-- - post_id: integer, foreign key references posts(id) ON DELETE CASCADE
-- - tag_id: integer, foreign key references tags(id) ON DELETE CASCADE
-- - Primary key: (post_id, tag_id)

-- YOUR CODE HERE



-- =============================================================================
-- TASK 5: Insert Sample Data
-- =============================================================================

-- Insert at least 3 users
-- YOUR CODE HERE


-- Insert at least 5 tags (e.g., 'JavaScript', 'Python', 'Web Dev', 'Tutorial', 'News')
-- YOUR CODE HERE


-- Insert at least 5 posts by different users
-- YOUR CODE HERE


-- Insert comments on various posts
-- YOUR CODE HERE


-- Assign tags to posts (use post_tags table)
-- YOUR CODE HERE



-- =============================================================================
-- TASK 6: INNER JOIN Queries
-- =============================================================================

-- Query 1: Get all posts with their author's username
-- SELECT posts.title, users.username, posts.created_at
-- YOUR CODE HERE


-- Query 2: Get all comments with the commenter's username and post title
-- YOUR CODE HERE


-- Query 3: Get all posts with their tags
-- (Join posts, post_tags, and tags)
-- YOUR CODE HERE


-- Query 4: Get all published posts by a specific user (e.g., username 'john_doe')
-- YOUR CODE HERE


-- =============================================================================
-- TASK 7: LEFT JOIN Queries
-- =============================================================================

-- Query 5: Get all users and their post count (including users with 0 posts)
-- YOUR CODE HERE


-- Query 6: Get all posts and their comment count (including posts with 0 comments)
-- YOUR CODE HERE


-- Query 7: Find users who have never posted
-- YOUR CODE HERE


-- Query 8: Find posts that have no comments
-- YOUR CODE HERE


-- =============================================================================
-- TASK 8: Complex Multi-Table Joins
-- =============================================================================

-- Query 9: Get posts with author name, comment count, and tag names
-- YOUR CODE HERE


-- Query 10: Find the most active commenters (users with most comments)
-- YOUR CODE HERE


-- Query 11: Find the most popular posts (posts with most comments)
-- YOUR CODE HERE


-- Query 12: Get all posts tagged with 'JavaScript' along with author names
-- YOUR CODE HERE


-- =============================================================================
-- TASK 9: Self-Join (BONUS)
-- =============================================================================

-- Add a 'parent_id' column to comments table for nested replies
-- YOUR CODE HERE


-- Query 13: Get comments and their parent comments
-- YOUR CODE HERE


-- =============================================================================
-- TASK 10: Aggregate with Joins
-- =============================================================================

-- Query 14: Find users who have written more than 2 posts
-- YOUR CODE HERE


-- Query 15: Find tags used on more than 2 posts
-- YOUR CODE HERE


-- Query 16: Get the average number of comments per user's posts
-- YOUR CODE HERE


-- =============================================================================
-- BONUS CHALLENGES
-- =============================================================================

-- Bonus 1: Create a view that shows post details with author, comment count, and tags
-- YOUR CODE HERE


-- Bonus 2: Find posts that have all tags (assuming you know specific tag IDs)
-- YOUR CODE HERE


-- Bonus 3: Get the user with the most total engagement (posts + comments)
-- YOUR CODE HERE


-- Bonus 4: Find posts with no tags assigned
-- YOUR CODE HERE
