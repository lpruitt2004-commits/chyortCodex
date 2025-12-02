// Day 5: Fetch API Practice - SOLUTION
// 
// This demonstrates:
// - GET requests with fetch
// - POST requests with JSON
// - Error handling
// - Working with JSON data
// - Real API integration

console.log('=== Day 5: Fetch API ===\n');

const output = document.getElementById('output');

// Helper function to display results
function displayResult(title, content, type = 'success') {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3 class="${type}">${title}</h3>
        <pre>${content}</pre>
    `;
    output.insertBefore(card, output.firstChild);
}

// Exercise 1: Basic GET Request
async function fetchData() {
    try {
        console.log('Exercise 1: Basic GET Request');
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        // Check if request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✓ Data fetched:', data);
        
        return data;
    } catch (error) {
        console.error('✗ Error:', error.message);
        throw error;
    }
}

// Test on load
fetchData();


// Exercise 2: Fetch with Error Handling
async function fetchWithErrorHandling(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        if (error.message.includes('Failed to fetch')) {
            console.error('Network error - check your connection');
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
}


// Exercise 3: POST Request
async function createPost(postData) {
    try {
        console.log('\nExercise 3: POST Request');
        console.log('Sending:', postData);
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✓ Post created:', data);
        
        return data;
    } catch (error) {
        console.error('✗ Error creating post:', error.message);
        throw error;
    }
}


// Exercise 4: Fetch Multiple Resources
async function fetchAllPosts() {
    try {
        console.log('\nExercise 4: Fetch Multiple Posts');
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        const posts = await response.json();
        
        console.log(`✓ Fetched ${posts.length} posts`);
        return posts;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}


// BONUS: Weather API Integration
async function fetchWeather(city = 'London') {
    try {
        // Using wttr.in - a free weather API that doesn't require API key
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        const current = data.current_condition[0];
        
        console.log('\nWeather for', city);
        console.log('Temperature:', current.temp_C + '°C');
        console.log('Condition:', current.weatherDesc[0].value);
        
        return {
            temp: current.temp_C,
            condition: current.weatherDesc[0].value,
            humidity: current.humidity,
            windSpeed: current.windspeedKmph
        };
    } catch (error) {
        console.error('Error fetching weather:', error.message);
        throw error;
    }
}


// Button Event Handlers
document.getElementById('getBtn').addEventListener('click', async () => {
    output.innerHTML = '<div class="card loading"><h3>Loading...</h3></div>';
    
    try {
        const post = await fetchData();
        displayResult(
            '✓ GET Request Success',
            JSON.stringify(post, null, 2),
            'success'
        );
    } catch (error) {
        displayResult('✗ GET Request Failed', error.message, 'error');
    }
});

document.getElementById('postBtn').addEventListener('click', async () => {
    output.innerHTML = '<div class="card loading"><h3>Sending POST...</h3></div>';
    
    try {
        const newPost = {
            title: 'My New Post',
            body: 'This is the content of my post!',
            userId: 1
        };
        
        const result = await createPost(newPost);
        displayResult(
            '✓ POST Request Success',
            JSON.stringify(result, null, 2),
            'success'
        );
    } catch (error) {
        displayResult('✗ POST Request Failed', error.message, 'error');
    }
});

document.getElementById('allPostsBtn').addEventListener('click', async () => {
    output.innerHTML = '<div class="card loading"><h3>Fetching posts...</h3></div>';
    
    try {
        const posts = await fetchAllPosts();
        const postsList = posts.map(p => `${p.id}. ${p.title}`).join('\n');
        displayResult(
            `✓ Fetched ${posts.length} Posts`,
            postsList,
            'success'
        );
    } catch (error) {
        displayResult('✗ Failed to Fetch Posts', error.message, 'error');
    }
});

document.getElementById('weatherBtn').addEventListener('click', async () => {
    output.innerHTML = '<div class="card loading"><h3>Fetching weather...</h3></div>';
    
    try {
        const weather = await fetchWeather('London');
        const weatherInfo = `
Temperature: ${weather.temp}°C
Condition: ${weather.condition}
Humidity: ${weather.humidity}%
Wind Speed: ${weather.windSpeed} km/h
        `.trim();
        
        displayResult(
            '✓ Weather Data for London',
            weatherInfo,
            'success'
        );
    } catch (error) {
        displayResult('✗ Failed to Fetch Weather', error.message, 'error');
    }
});


// Advanced Examples
console.log('\nAdvanced Fetch Examples:\n');

// Example: Custom headers
async function fetchWithHeaders() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        headers: {
            'Accept': 'application/json',
            'Custom-Header': 'custom-value'
        }
    });
    return await response.json();
}

// Example: Timeout
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Request timed out');
        }
        throw error;
    }
}


console.log('✅ Fetch API demo loaded! Click buttons to test different requests.');
