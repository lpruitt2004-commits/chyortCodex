# Week 6: PostgreSQL Database

## Overview
This week introduces PostgreSQL, a powerful relational database management system. You'll learn SQL fundamentals, database design principles, and how to integrate PostgreSQL with Node.js applications.

## Learning Objectives
- Understand relational database concepts
- Write SQL queries (SELECT, INSERT, UPDATE, DELETE)
- Design normalized database schemas
- Use joins to query related data
- Integrate PostgreSQL with Node.js using node-postgres
- Implement CRUD operations with a database backend

## Daily Breakdown

### Day 1: SQL Fundamentals & Database Setup
**Topics:**
- Installing PostgreSQL
- Understanding databases, tables, rows, and columns
- Basic data types (INTEGER, VARCHAR, TEXT, BOOLEAN, DATE, TIMESTAMP)
- CREATE, DROP commands
- INSERT, SELECT basics

**Skills:**
- Set up PostgreSQL locally
- Create databases and tables
- Insert and retrieve data
- Use basic WHERE clauses

**Exercise:** Create a database schema for a book library and insert sample data

### Day 2: CRUD Operations & Filtering
**Topics:**
- Complete CRUD operations (CREATE, READ, UPDATE, DELETE)
- WHERE clauses with operators (=, !=, >, <, LIKE, IN, BETWEEN)
- ORDER BY and LIMIT
- Aggregate functions (COUNT, SUM, AVG, MIN, MAX)
- GROUP BY and HAVING

**Skills:**
- Update and delete records
- Filter data with complex conditions
- Sort and limit results
- Perform calculations on data

**Exercise:** Build SQL queries for a product inventory system with filtering and reporting

### Day 3: Relationships & Joins
**Topics:**
- Primary keys and foreign keys
- One-to-many relationships
- Many-to-many relationships (junction tables)
- INNER JOIN, LEFT JOIN, RIGHT JOIN
- Self-joins

**Skills:**
- Design relational schemas
- Create foreign key constraints
- Query related data across tables
- Understand different join types

**Exercise:** Create a blog database with users, posts, and comments with proper relationships

### Day 4: Node.js + PostgreSQL Integration
**Topics:**
- node-postgres (pg) library
- Connection pooling
- Parameterized queries (preventing SQL injection)
- Async/await with database queries
- Error handling for database operations

**Skills:**
- Connect Node.js to PostgreSQL
- Execute queries from JavaScript
- Use prepared statements safely
- Handle database errors

**Exercise:** Build a RESTful API that connects to PostgreSQL for user management

### Day 5: Advanced Topics & Database Design
**Topics:**
- Indexes for performance
- Transactions and ACID properties
- Database normalization (1NF, 2NF, 3NF)
- Schema migrations
- Environment-based database configuration

**Skills:**
- Create indexes to optimize queries
- Use transactions for data integrity
- Design normalized schemas
- Manage database changes

**Exercise:** Design and implement a complete e-commerce database schema with transactions

## Week Project: Task Management System with Database

Build a full-stack task management API with PostgreSQL persistence.

### Requirements

#### Database Schema
1. **users table**
   - id (serial primary key)
   - username (varchar, unique)
   - email (varchar, unique)
   - password_hash (varchar)
   - created_at (timestamp)

2. **tasks table**
   - id (serial primary key)
   - user_id (integer, foreign key to users)
   - title (varchar)
   - description (text)
   - status (varchar: 'pending', 'in_progress', 'completed')
   - priority (varchar: 'low', 'medium', 'high')
   - due_date (date)
   - created_at (timestamp)
   - updated_at (timestamp)

3. **categories table**
   - id (serial primary key)
   - name (varchar, unique)
   - color (varchar)

4. **task_categories table** (junction table)
   - task_id (integer, foreign key to tasks)
   - category_id (integer, foreign key to categories)
   - Primary key: (task_id, category_id)

#### API Endpoints
- `POST /users` - Create new user
- `GET /users/:id` - Get user by ID
- `POST /tasks` - Create new task
- `GET /tasks` - Get all tasks (with filtering by status, priority, user)
- `GET /tasks/:id` - Get task by ID with categories
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `POST /categories` - Create category
- `GET /categories` - Get all categories
- `POST /tasks/:id/categories` - Assign category to task

#### Features
- Connection pooling for database efficiency
- Parameterized queries to prevent SQL injection
- Error handling for constraint violations
- Transactions for complex operations
- Indexes on frequently queried columns

## Resources

### Documentation
- [PostgreSQL Official Documentation](https://www.postgresql.org/docs/)
- [node-postgres Documentation](https://node-postgres.com/)
- [SQL Tutorial - W3Schools](https://www.w3schools.com/sql/)

### Tools
- [pgAdmin](https://www.pgadmin.org/) - PostgreSQL GUI
- [DBeaver](https://dbeaver.io/) - Universal database tool
- [Postman](https://www.postman.com/) - API testing

### Learning
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [SQL Cheat Sheet](https://www.sqltutorial.org/sql-cheat-sheet/)

## Setup Instructions

### Install PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download installer from [postgresql.org](https://www.postgresql.org/download/windows/)

### Create Development Database
```bash
# Access PostgreSQL
psql postgres

# Create database
CREATE DATABASE taskmanager_dev;

# Create user (optional)
CREATE USER taskuser WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE taskmanager_dev TO taskuser;

# Exit
\q
```

### Install Node.js Dependencies
```bash
npm install
```

## Skills Checklist
By the end of this week, you should be able to:
- [ ] Install and configure PostgreSQL
- [ ] Create databases and tables with appropriate data types
- [ ] Write SELECT queries with WHERE, ORDER BY, LIMIT
- [ ] Perform INSERT, UPDATE, DELETE operations
- [ ] Use aggregate functions and GROUP BY
- [ ] Design schemas with primary and foreign keys
- [ ] Write INNER and LEFT JOINs
- [ ] Connect Node.js to PostgreSQL with node-postgres
- [ ] Execute parameterized queries safely
- [ ] Handle database errors in async code
- [ ] Create indexes for query optimization
- [ ] Use transactions for data integrity
- [ ] Design normalized database schemas

## Common Pitfalls
- **SQL Injection**: Always use parameterized queries, never concatenate user input into SQL strings
- **Missing Foreign Keys**: Forgetting foreign key constraints leads to orphaned data
- **N+1 Queries**: Use JOINs instead of making separate queries in loops
- **Not Closing Connections**: Always release database connections back to the pool
- **Case Sensitivity**: PostgreSQL is case-sensitive for quoted identifiers
- **Async Handling**: Remember to await database queries

## Next Week Preview
Week 7 covers **Authentication & Security**, where you'll learn to:
- Hash passwords with bcrypt
- Implement JWT authentication
- Secure routes with middleware
- Handle sessions and cookies
- Apply security best practices
