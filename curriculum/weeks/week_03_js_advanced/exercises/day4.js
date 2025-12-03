// Day 4: Async/Await Practice
// 
// INSTRUCTIONS:
// Complete each exercise using async/await syntax
// 
// Code review:
// python3 ../../../ollama_duo.py --file day4.js --optimize --optimize-json

console.log('=== Day 4: Async/Await ===\n');

// Exercise 1: Basic Async Function
// Convert this promise-based function to async/await
function fetchDataWithPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Data loaded!');
        }, 1000);
    });
}

// YOUR CODE HERE - create async version
async function fetchDataAsync() {
    // Use await with the promise above
    // Return the result
}

// Test it:
console.log('Exercise 1: Basic Async');
// fetchDataAsync().then(result => console.log(result));


// Exercise 2: Error Handling with Try/Catch
async function fetchWithError() {
    // YOUR CODE HERE
    // Use try/catch to handle errors
    // Try to fetch from a bad URL
    try {
        // Simulate an API call that might fail
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/999999');
        // Check if response is ok
        // Parse and return JSON
    } catch (error) {
        // Handle the error
        console.error('Error caught:', error.message);
    }
}


// Exercise 3: Multiple Await Calls
async function fetchMultipleResources() {
    // YOUR CODE HERE
    // Fetch data from multiple endpoints sequentially
    // https://jsonplaceholder.typicode.com/posts/1
    // https://jsonplaceholder.typicode.com/users/1
    // Log both results
}

// Test it:
console.log('\nExercise 3: Multiple Awaits');
// fetchMultipleResources();


// Exercise 4: Parallel Async Operations with Promise.all
async function fetchParallel() {
    // YOUR CODE HERE
    // Use Promise.all to fetch multiple resources at once
    // This is faster than sequential awaits
    
    // const [posts, users, comments] = await Promise.all([
    //     fetch('https://jsonplaceholder.typicode.com/posts'),
    //     fetch('https://jsonplaceholder.typicode.com/users'),
    //     fetch('https://jsonplaceholder.typicode.com/comments')
    // ]);
    
    // Parse all responses and log them
}


// Exercise 5: Async Function with Parameters
async function getUserById(userId) {
    // YOUR CODE HERE
    // Fetch user data from: https://jsonplaceholder.typicode.com/users/${userId}
    // Use try/catch for error handling
    // Return the user object
}

// Test it:
console.log('\nExercise 5: Async with Parameters');
// getUserById(1).then(user => console.log(user));


// Exercise 6: Waiting for User Input (Advanced)
async function askQuestion() {
    // YOUR CODE HERE (BONUS)
    // Create a promise that waits for button click
    // Return the result when clicked
    
    return new Promise((resolve) => {
        // Setup button click listener that resolves the promise
    });
}


// BONUS: Real API Integration
const fetchBtn = document.getElementById('fetchBtn');
const multiBtn = document.getElementById('multiBtn');
const status = document.getElementById('status');

// YOUR CODE HERE
// Add async click handlers that:
// 1. Fetch from https://randomuser.me/api/
// 2. Display loading state
// 3. Show results in the status div
// 4. Handle errors gracefully

fetchBtn.addEventListener('click', async () => {
    // YOUR CODE HERE
});

multiBtn.addEventListener('click', async () => {
    // YOUR CODE HERE - fetch 3 random users with Promise.all
});
