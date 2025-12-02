// Day 5: localStorage Practice - SOLUTION
// 
// This demonstrates:
// - localStorage.setItem() and getItem()
// - JSON.stringify() and JSON.parse()
// - Saving strings, objects, and arrays
// - Building a simple persistent todo list

console.log('=== Day 5: localStorage ===');

// ========== SECTION 1: Simple Text Storage ==========

// Exercise 1: Save to localStorage
const saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', function() {
    const input = document.getElementById('saveInput').value;
    
    if (input.trim()) {
        localStorage.setItem('myText', input);
        console.log('✓ Text saved to localStorage');
        document.getElementById('output').textContent = `Saved: "${input}"`;
        document.getElementById('output').classList.remove('empty');
    } else {
        alert('Please enter some text!');
    }
});

// Exercise 2: Load from localStorage
const loadBtn = document.getElementById('loadBtn');
loadBtn.addEventListener('click', function() {
    const savedText = localStorage.getItem('myText');
    const output = document.getElementById('output');
    
    if (savedText) {
        output.textContent = `Loaded: "${savedText}"`;
        output.classList.remove('empty');
        console.log('✓ Text loaded from localStorage:', savedText);
    } else {
        output.textContent = 'Nothing saved yet!';
        output.classList.add('empty');
        console.log('⚠ No text found in localStorage');
    }
});

// Clear button
const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', function() {
    localStorage.removeItem('myText');
    document.getElementById('output').textContent = 'Storage cleared!';
    document.getElementById('output').classList.add('empty');
    document.getElementById('saveInput').value = '';
    console.log('✓ Text cleared from localStorage');
});


// ========== SECTION 2: Object Storage with JSON ==========

// Exercise 3: Save an object
const saveUserBtn = document.getElementById('saveUserBtn');
saveUserBtn.addEventListener('click', function() {
    const name = document.getElementById('userName').value;
    const age = document.getElementById('userAge').value;
    
    if (name && age) {
        const user = { 
            name: name, 
            age: parseInt(age),
            savedAt: new Date().toLocaleString()
        };
        
        // Convert object to JSON string before saving
        localStorage.setItem('user', JSON.stringify(user));
        console.log('✓ User object saved:', user);
        
        document.getElementById('userOutput').textContent = 
            `Saved: ${user.name}, age ${user.age}`;
        document.getElementById('userOutput').classList.remove('empty');
    } else {
        alert('Please enter both name and age!');
    }
});

// Exercise 4: Load and parse object
const loadUserBtn = document.getElementById('loadUserBtn');
loadUserBtn.addEventListener('click', function() {
    const userJSON = localStorage.getItem('user');
    const output = document.getElementById('userOutput');
    
    if (userJSON) {
        // Parse JSON string back to object
        const user = JSON.parse(userJSON);
        output.textContent = 
            `Loaded: ${user.name}, age ${user.age} (saved at ${user.savedAt})`;
        output.classList.remove('empty');
        console.log('✓ User object loaded:', user);
    } else {
        output.textContent = 'No user data found!';
        output.classList.add('empty');
        console.log('⚠ No user found in localStorage');
    }
});


// ========== SECTION 3: Todo List (Array of Objects) ==========

let todos = [];

// Load todos on page load
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        console.log('✓ Loaded todos from localStorage:', todos);
    }
    renderTodos();
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('✓ Todos saved to localStorage');
}

// Render todos to the page
function renderTodos() {
    const output = document.getElementById('todoOutput');
    
    if (todos.length === 0) {
        output.innerHTML = '<p class="empty">No todos yet. Add one above!</p>';
        return;
    }
    
    const list = document.createElement('ul');
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo.text}</span>
            <button onclick="deleteTodo(${index})" class="danger">Delete</button>
        `;
        list.appendChild(li);
    });
    
    output.innerHTML = '';
    output.appendChild(list);
}

// Add todo
const addTodoBtn = document.getElementById('addTodoBtn');
addTodoBtn.addEventListener('click', function() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        todos.push({
            id: Date.now(),
            text: text,
            completed: false
        });
        saveTodos();
        renderTodos();
        input.value = '';
        console.log('✓ Todo added:', text);
    } else {
        alert('Please enter a todo!');
    }
});

// Delete todo (global function for onclick)
window.deleteTodo = function(index) {
    const deleted = todos.splice(index, 1);
    saveTodos();
    renderTodos();
    console.log('✓ Todo deleted:', deleted[0].text);
};

// Clear all todos
const clearTodosBtn = document.getElementById('clearTodosBtn');
clearTodosBtn.addEventListener('click', function() {
    if (confirm('Delete all todos?')) {
        todos = [];
        localStorage.removeItem('todos');
        renderTodos();
        console.log('✓ All todos cleared');
    }
});

// Initialize todos on page load
loadTodos();


console.log('✅ localStorage demo ready! Open DevTools > Application > Local Storage to inspect.');
