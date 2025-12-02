-- Day 3: Relationships & Joins
-- SOLUTION

-- =============================================================================
-- TASK 1: Create Users Table
-- =============================================================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =============================================================================
-- TASK 2: Create Posts Table with Foreign Key
-- =============================================================================
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =============================================================================
-- TASK 3: Create Comments Table with Foreign Key
-- =============================================================================
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =============================================================================
-- TASK 4: Create Tags Table and Junction Table (Many-to-Many)
-- =============================================================================
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE post_tags (
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);


-- =============================================================================
-- TASK 5: Insert Sample Data
-- =============================================================================

-- Insert users
INSERT INTO users (username, email, bio) VALUES
('john_doe', 'john@example.com', 'Full-stack developer passionate about web technologies'),
('jane_smith', 'jane@example.com', 'Frontend specialist and UI/UX enthusiast'),
('bob_wilson', 'bob@example.com', 'Backend engineer focusing on scalable systems'),
('alice_brown', 'alice@example.com', 'DevOps engineer and cloud architecture expert');

-- Insert tags
INSERT INTO tags (name) VALUES
('JavaScript'),
('Python'),
('Web Dev'),
('Tutorial'),
('News'),
('Backend'),
('Frontend'),
('Database');

-- Insert posts
INSERT INTO posts (user_id, title, content, published) VALUES
(1, 'Getting Started with Node.js', 'Node.js is a powerful JavaScript runtime...', true),
(1, 'Understanding Async/Await', 'Asynchronous programming in JavaScript...', true),
(2, 'CSS Grid vs Flexbox', 'Let''s explore the differences between these layout systems...', true),
(2, 'React Hooks Deep Dive', 'Hooks revolutionized React development...', true),
(3, 'Building RESTful APIs', 'Learn how to design and implement REST APIs...', true),
(3, 'Database Indexing Strategies', 'Optimizing database performance with indexes...', false),
(4, 'Docker for Beginners', 'Containerization made easy...', true),
(1, 'Draft Post', 'This is not published yet...', false);

-- Insert comments
INSERT INTO comments (post_id, user_id, content) VALUES
(1, 2, 'Great introduction! Very helpful for beginners.'),
(1, 3, 'You should also mention npm and package management.'),
(2, 4, 'Excellent explanation of promises vs async/await!'),
(3, 1, 'I prefer Grid for complex layouts.'),
(3, 4, 'Great comparison! Both have their use cases.'),
(4, 1, 'useState and useEffect are game changers!'),
(4, 3, 'Don''t forget useContext for state management.'),
(5, 2, 'Very thorough API design guide.'),
(5, 1, 'REST is great but also check out GraphQL.'),
(7, 2, 'Docker simplified my deployment workflow completely.');

-- Assign tags to posts
INSERT INTO post_tags (post_id, tag_id) VALUES
(1, 1), (1, 4), (1, 6),  -- Node.js post: JavaScript, Tutorial, Backend
(2, 1), (2, 4),          -- Async post: JavaScript, Tutorial
(3, 3), (3, 7),          -- CSS post: Web Dev, Frontend
(4, 1), (4, 7),          -- React post: JavaScript, Frontend
(5, 6), (5, 4), (5, 3),  -- REST API: Backend, Tutorial, Web Dev
(6, 8), (6, 6),          -- Database post: Database, Backend
(7, 4);                  -- Docker post: Tutorial


-- =============================================================================
-- TASK 6: INNER JOIN Queries
-- =============================================================================

-- Query 1: Get all posts with their author's username
SELECT posts.title, users.username, posts.created_at
FROM posts
INNER JOIN users ON posts.user_id = users.id
ORDER BY posts.created_at DESC;

-- Query 2: Get all comments with the commenter's username and post title
SELECT 
    comments.content,
    users.username as commenter,
    posts.title as post_title,
    comments.created_at
FROM comments
INNER JOIN users ON comments.user_id = users.id
INNER JOIN posts ON comments.post_id = posts.id
ORDER BY comments.created_at DESC;

-- Query 3: Get all posts with their tags
SELECT 
    posts.title,
    tags.name as tag_name
FROM posts
INNER JOIN post_tags ON posts.id = post_tags.post_id
INNER JOIN tags ON post_tags.tag_id = tags.id
ORDER BY posts.title;

-- Query 4: Get all published posts by a specific user
SELECT 
    posts.title,
    posts.content,
    posts.created_at
FROM posts
INNER JOIN users ON posts.user_id = users.id
WHERE users.username = 'john_doe' AND posts.published = true
ORDER BY posts.created_at DESC;


-- =============================================================================
-- TASK 7: LEFT JOIN Queries
-- =============================================================================

-- Query 5: Get all users and their post count (including users with 0 posts)
SELECT 
    users.username,
    users.email,
    COUNT(posts.id) as post_count
FROM users
LEFT JOIN posts ON users.id = posts.user_id
GROUP BY users.id, users.username, users.email
ORDER BY post_count DESC;

-- Query 6: Get all posts and their comment count (including posts with 0 comments)
SELECT 
    posts.title,
    users.username as author,
    COUNT(comments.id) as comment_count
FROM posts
INNER JOIN users ON posts.user_id = users.id
LEFT JOIN comments ON posts.id = comments.post_id
GROUP BY posts.id, posts.title, users.username
ORDER BY comment_count DESC;

-- Query 7: Find users who have never posted
SELECT 
    users.username,
    users.email
FROM users
LEFT JOIN posts ON users.id = posts.user_id
WHERE posts.id IS NULL;

-- Query 8: Find posts that have no comments
SELECT 
    posts.title,
    users.username as author
FROM posts
INNER JOIN users ON posts.user_id = users.id
LEFT JOIN comments ON posts.id = comments.post_id
WHERE comments.id IS NULL;


-- =============================================================================
-- TASK 8: Complex Multi-Table Joins
-- =============================================================================

-- Query 9: Get posts with author name, comment count, and tag names
SELECT 
    posts.id,
    posts.title,
    users.username as author,
    COUNT(DISTINCT comments.id) as comment_count,
    STRING_AGG(DISTINCT tags.name, ', ') as tags
FROM posts
INNER JOIN users ON posts.user_id = users.id
LEFT JOIN comments ON posts.id = comments.post_id
LEFT JOIN post_tags ON posts.id = post_tags.post_id
LEFT JOIN tags ON post_tags.tag_id = tags.id
GROUP BY posts.id, posts.title, users.username
ORDER BY comment_count DESC;

-- Query 10: Find the most active commenters (users with most comments)
SELECT 
    users.username,
    COUNT(comments.id) as comment_count
FROM users
INNER JOIN comments ON users.id = comments.user_id
GROUP BY users.id, users.username
ORDER BY comment_count DESC
LIMIT 5;

-- Query 11: Find the most popular posts (posts with most comments)
SELECT 
    posts.title,
    users.username as author,
    COUNT(comments.id) as comment_count
FROM posts
INNER JOIN users ON posts.user_id = users.id
LEFT JOIN comments ON posts.id = comments.post_id
GROUP BY posts.id, posts.title, users.username
ORDER BY comment_count DESC
LIMIT 5;

-- Query 12: Get all posts tagged with 'JavaScript' along with author names
SELECT 
    posts.title,
    users.username as author,
    posts.created_at
FROM posts
INNER JOIN users ON posts.user_id = users.id
INNER JOIN post_tags ON posts.id = post_tags.post_id
INNER JOIN tags ON post_tags.tag_id = tags.id
WHERE tags.name = 'JavaScript'
ORDER BY posts.created_at DESC;


-- =============================================================================
-- TASK 9: Self-Join (BONUS)
-- =============================================================================

-- Add parent_id column for nested replies
ALTER TABLE comments
ADD COLUMN parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE;

-- Insert some reply comments
INSERT INTO comments (post_id, user_id, content, parent_id) VALUES
(1, 1, 'Thanks for the feedback!', 1),  -- Reply to first comment on post 1
(1, 2, 'You''re welcome!', 3);         -- Reply to the reply

-- Query 13: Get comments and their parent comments
SELECT 
    c1.id,
    c1.content as comment,
    u1.username as commenter,
    c2.content as parent_comment,
    u2.username as parent_commenter
FROM comments c1
LEFT JOIN comments c2 ON c1.parent_id = c2.id
INNER JOIN users u1 ON c1.user_id = u1.id
LEFT JOIN users u2 ON c2.user_id = u2.id
ORDER BY c1.created_at;


-- =============================================================================
-- TASK 10: Aggregate with Joins
-- =============================================================================

-- Query 14: Find users who have written more than 2 posts
SELECT 
    users.username,
    COUNT(posts.id) as post_count
FROM users
INNER JOIN posts ON users.id = posts.user_id
GROUP BY users.id, users.username
HAVING COUNT(posts.id) > 2
ORDER BY post_count DESC;

-- Query 15: Find tags used on more than 2 posts
SELECT 
    tags.name,
    COUNT(post_tags.post_id) as usage_count
FROM tags
INNER JOIN post_tags ON tags.id = post_tags.tag_id
GROUP BY tags.id, tags.name
HAVING COUNT(post_tags.post_id) > 2
ORDER BY usage_count DESC;

-- Query 16: Get the average number of comments per user's posts
SELECT 
    users.username,
    COUNT(DISTINCT posts.id) as post_count,
    COUNT(comments.id) as total_comments,
    ROUND(COUNT(comments.id)::NUMERIC / NULLIF(COUNT(DISTINCT posts.id), 0), 2) as avg_comments_per_post
FROM users
LEFT JOIN posts ON users.id = posts.user_id
LEFT JOIN comments ON posts.id = comments.post_id
GROUP BY users.id, users.username
ORDER BY avg_comments_per_post DESC;


-- =============================================================================
-- BONUS CHALLENGES
-- =============================================================================

-- Bonus 1: Create a view that shows post details with author, comment count, and tags
CREATE OR REPLACE VIEW post_details AS
SELECT 
    posts.id,
    posts.title,
    users.username as author,
    posts.published,
    posts.created_at,
    COUNT(DISTINCT comments.id) as comment_count,
    STRING_AGG(DISTINCT tags.name, ', ' ORDER BY tags.name) as tags
FROM posts
INNER JOIN users ON posts.user_id = users.id
LEFT JOIN comments ON posts.id = comments.post_id
LEFT JOIN post_tags ON posts.id = post_tags.post_id
LEFT JOIN tags ON post_tags.tag_id = tags.id
GROUP BY posts.id, posts.title, users.username, posts.published, posts.created_at;

-- Use the view:
SELECT * FROM post_details WHERE published = true ORDER BY created_at DESC;

-- Bonus 2: Find posts that have all specified tags (e.g., both 'JavaScript' AND 'Tutorial')
SELECT posts.id, posts.title
FROM posts
WHERE posts.id IN (
    SELECT post_tags.post_id
    FROM post_tags
    INNER JOIN tags ON post_tags.tag_id = tags.id
    WHERE tags.name IN ('JavaScript', 'Tutorial')
    GROUP BY post_tags.post_id
    HAVING COUNT(DISTINCT tags.id) = 2
);

-- Bonus 3: Get the user with the most total engagement (posts + comments)
SELECT 
    users.username,
    COUNT(DISTINCT posts.id) as posts_created,
    COUNT(DISTINCT comments.id) as comments_made,
    COUNT(DISTINCT posts.id) + COUNT(DISTINCT comments.id) as total_engagement
FROM users
LEFT JOIN posts ON users.id = posts.user_id
LEFT JOIN comments ON users.id = comments.user_id
GROUP BY users.id, users.username
ORDER BY total_engagement DESC
LIMIT 1;

-- Bonus 4: Find posts with no tags assigned
SELECT 
    posts.title,
    users.username as author
FROM posts
INNER JOIN users ON posts.user_id = users.id
LEFT JOIN post_tags ON posts.id = post_tags.post_id
WHERE post_tags.tag_id IS NULL;
