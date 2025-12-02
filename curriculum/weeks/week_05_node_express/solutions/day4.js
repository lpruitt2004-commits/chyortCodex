// Day 4: RESTful API Practice - SOLUTION
// 
// Run: node day4.js
// Test with Postman, curl, or any HTTP client
//
// This demonstrates:
// - Full CRUD operations
// - RESTful API design
// - HTTP status codes
// - In-memory data storage

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

console.log('=== Day 4: RESTful API ===\n');

// In-memory data store
let todos = [
    { id: 1, title: 'Learn Node.js', completed: false, createdAt: new Date().toISOString() },
    { id: 2, title: 'Build an API', completed: false, createdAt: new Date().toISOString() },
    { id: 3, title: 'Master Express', completed: true, createdAt: new Date().toISOString() }
];

let nextId = 4;


// Exercise 1: GET all todos
app.get('/api/todos', (req, res) => {
    // BONUS: Query parameter filtering
    const { completed } = req.query;
    
    let filteredTodos = todos;
    
    if (completed !== undefined) {
        const isCompleted = completed === 'true';
        filteredTodos = todos.filter(todo => todo.completed === isCompleted);
    }
    
    res.json({
        success: true,
        count: filteredTodos.length,
        data: filteredTodos
    });
});


// Exercise 2: GET single todo by ID
app.get('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
        return res.status(404).json({
            success: false,
            error: 'Todo not found'
        });
    }
    
    res.json({
        success: true,
        data: todo
    });
});


// Exercise 3: POST - Create new todo
app.post('/api/todos', (req, res) => {
    const { title, completed = false } = req.body;
    
    // Basic validation
    if (!title) {
        return res.status(400).json({
            success: false,
            error: 'Title is required'
        });
    }
    
    const newTodo = {
        id: nextId++,
        title,
        completed,
        createdAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    
    res.status(201).json({
        success: true,
        message: 'Todo created',
        data: newTodo
    });
});


// Exercise 4: PUT - Update todo
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
        return res.status(404).json({
            success: false,
            error: 'Todo not found'
        });
    }
    
    const { title, completed } = req.body;
    
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    todo.updatedAt = new Date().toISOString();
    
    res.json({
        success: true,
        message: 'Todo updated',
        data: todo
    });
});


// Exercise 5: DELETE - Remove todo
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: 'Todo not found'
        });
    }
    
    todos.splice(index, 1);
    
    res.status(204).send(); // No content
});


// BONUS: Get statistics
app.get('/api/todos/stats/summary', (req, res) => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    
    res.json({
        success: true,
        data: {
            total,
            completed,
            pending,
            completionRate: total > 0 ? ((completed / total) * 100).toFixed(2) + '%' : '0%'
        }
    });
});


app.listen(PORT, () => {
    console.log(`✅ TODO API running on http://localhost:${PORT}`);
    console.log('\nAvailable Endpoints:');
    console.log('  GET    /api/todos                 - Get all todos');
    console.log('  GET    /api/todos?completed=true  - Filter by completion');
    console.log('  GET    /api/todos/:id             - Get single todo');
    console.log('  POST   /api/todos                 - Create todo');
    console.log('  PUT    /api/todos/:id             - Update todo');
    console.log('  DELETE /api/todos/:id             - Delete todo');
    console.log('  GET    /api/todos/stats/summary   - Get statistics');
    console.log('\nTest with Postman or curl!\n');
});
