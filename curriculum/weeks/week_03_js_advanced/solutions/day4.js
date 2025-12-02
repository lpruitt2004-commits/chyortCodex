// Day 4: Async/Await Practice - SOLUTION
// 
// This demonstrates:
// - async/await syntax
// - try/catch error handling
// - Sequential vs parallel async operations
// - Real API integration
// - Loading states

console.log('=== Day 4: Async/Await ===\n');

// Exercise 1: Basic Async Function
// Convert promise-based function to async/await
function fetchDataWithPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Data loaded!');
        }, 1000);
    });
}

async function fetchDataAsync() {
    const result = await fetchDataWithPromise();
    return result;
}

console.log('Exercise 1: Basic Async');
fetchDataAsync().then(result => console.log('✓', result));


// Exercise 2: Error Handling with Try/Catch
async function fetchWithError() {
    try {
        console.log('\nExercise 2: Error Handling');
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✓ Data fetched:', data.title);
        return data;
    } catch (error) {
        console.error('✓ Error caught:', error.message);
    }
}

fetchWithError();


// Exercise 3: Multiple Await Calls (Sequential)
async function fetchMultipleResources() {
    try {
        console.log('\nExercise 3: Sequential Awaits');
        console.log('Fetching posts...');
        
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const post = await postsResponse.json();
        console.log('✓ Post:', post.title);
        
        console.log('Fetching user...');
        const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await userResponse.json();
        console.log('✓ User:', user.name);
        
        return { post, user };
    } catch (error) {
        console.error('Error:', error.message);
    }
}

setTimeout(() => fetchMultipleResources(), 1500);


// Exercise 4: Parallel Async Operations with Promise.all
async function fetchParallel() {
    try {
        console.log('\nExercise 4: Parallel Fetch with Promise.all');
        console.log('Fetching all resources at once...');
        
        const [postsRes, usersRes, commentsRes] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts?_limit=3'),
            fetch('https://jsonplaceholder.typicode.com/users?_limit=3'),
            fetch('https://jsonplaceholder.typicode.com/comments?_limit=3')
        ]);
        
        const posts = await postsRes.json();
        const users = await usersRes.json();
        const comments = await commentsRes.json();
        
        console.log('✓ Posts count:', posts.length);
        console.log('✓ Users count:', users.length);
        console.log('✓ Comments count:', comments.length);
        
        return { posts, users, comments };
    } catch (error) {
        console.error('Error:', error.message);
    }
}

setTimeout(() => fetchParallel(), 3000);


// Exercise 5: Async Function with Parameters
async function getUserById(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        
        if (!response.ok) {
            throw new Error('User not found');
        }
        
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching user:', error.message);
        throw error;
    }
}

setTimeout(async () => {
    console.log('\nExercise 5: Async with Parameters');
    const user = await getUserById(2);
    console.log('✓ User fetched:', user.name);
}, 5000);


// BONUS: Real API Integration with UI
const fetchBtn = document.getElementById('fetchBtn');
const multiBtn = document.getElementById('multiBtn');
const errorBtn = document.getElementById('errorBtn');
const status = document.getElementById('status');

// Fetch single random user
fetchBtn.addEventListener('click', async () => {
    status.className = 'status loading';
    status.textContent = 'Loading...';
    
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];
        
        status.className = 'status success';
        status.innerHTML = `
            <h3>✓ User Fetched</h3>
            <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
        `;
        
        console.log('✓ Random user fetched:', user);
    } catch (error) {
        status.className = 'status error';
        status.textContent = '✗ Error: ' + error.message;
        console.error('Error:', error);
    }
});

// Fetch multiple users in parallel
multiBtn.addEventListener('click', async () => {
    status.className = 'status loading';
    status.textContent = 'Loading 3 users...';
    
    try {
        const [res1, res2, res3] = await Promise.all([
            fetch('https://randomuser.me/api/'),
            fetch('https://randomuser.me/api/'),
            fetch('https://randomuser.me/api/')
        ]);
        
        const data1 = await res1.json();
        const data2 = await res2.json();
        const data3 = await res3.json();
        
        const users = [
            data1.results[0],
            data2.results[0],
            data3.results[0]
        ];
        
        status.className = 'status success';
        status.innerHTML = `
            <h3>✓ 3 Users Fetched (Parallel)</h3>
            ${users.map(user => `
                <p><strong>${user.name.first} ${user.name.last}</strong> - ${user.email}</p>
            `).join('')}
        `;
        
        console.log('✓ Multiple users fetched:', users);
    } catch (error) {
        status.className = 'status error';
        status.textContent = '✗ Error: ' + error.message;
        console.error('Error:', error);
    }
});

// Test error handling
errorBtn.addEventListener('click', async () => {
    status.className = 'status loading';
    status.textContent = 'Attempting to fetch from invalid URL...';
    
    try {
        const response = await fetch('https://invalid-url-12345.com/api');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        status.className = 'status success';
        status.textContent = 'Success: ' + JSON.stringify(data);
    } catch (error) {
        status.className = 'status error';
        status.innerHTML = `
            <h3>✓ Error Handled Correctly</h3>
            <p>Error message: ${error.message}</p>
            <p>This demonstrates proper try/catch error handling!</p>
        `;
        console.log('✓ Error handled gracefully:', error.message);
    }
});


console.log('\n✅ Async/await demo loaded! Try the buttons above.');
