// Day 2: Callbacks & Asynchronous JavaScript Practice - SOLUTION
// 
// This demonstrates:
// - Callback functions
// - setTimeout and setInterval
// - Event loop behavior
// - Callback hell problem
// - Asynchronous timing

console.log('=== Day 2: Callbacks & Async ===\n');

// Exercise 1: Basic Callback
// Create a function that takes a callback and executes it
function doSomething(callback) {
    console.log('Doing something...');
    callback(); // Execute the callback
}

console.log('Exercise 1: Basic Callback');
doSomething(function() {
    console.log('✓ Callback executed!');
});
console.log();


// Exercise 2: setTimeout
// Use setTimeout to log a message after 2 seconds
console.log('Exercise 2: setTimeout');
console.log('Starting timer...');

setTimeout(function() {
    console.log('✓ 2 seconds have passed!');
}, 2000);

// Arrow function alternative:
// setTimeout(() => console.log('2 seconds passed!'), 2000);

console.log('Timer started (will complete in 2 seconds)');
console.log();


// Exercise 3: Callback with Parameters
// Create a function that processes data and calls the callback with result
function processData(data, callback) {
    const result = data * 2; // Process the data
    callback(result); // Pass result to callback
}

console.log('Exercise 3: Callback with Parameters');
processData(5, function(result) {
    console.log(`✓ Processed result: ${result}`);
});
console.log();


// Exercise 4: setInterval
// Create a countdown timer using setInterval
let countdownValue = 5;
let intervalId;

function startCountdown() {
    console.log('Exercise 4: Countdown Timer');
    countdownValue = 5; // Reset
    
    intervalId = setInterval(function() {
        console.log(countdownValue);
        countdownValue--;
        
        if (countdownValue < 0) {
            console.log('🚀 Blast off!');
            clearInterval(intervalId);
        }
    }, 1000);
}

// Uncomment to test:
// startCountdown();


// Exercise 5: Callback Hell Example
// Chain multiple callbacks (this shows the problem we'll solve with Promises)
function step1(callback) {
    setTimeout(function() {
        console.log('Step 1 complete');
        callback();
    }, 1000);
}

function step2(callback) {
    setTimeout(function() {
        console.log('Step 2 complete');
        callback();
    }, 1000);
}

function step3(callback) {
    setTimeout(function() {
        console.log('Step 3 complete');
        callback();
    }, 1000);
}

// Test the callback chain (Callback Hell!):
console.log('Exercise 5: Callback Chain (starts in 3 seconds)');
setTimeout(function() {
    console.log('\nStarting callback chain...');
    step1(function() {
        step2(function() {
            step3(function() {
                console.log('✓ All steps complete!\n');
            });
        });
    });
}, 3000);


// Exercise 6: Event Loop Understanding
console.log('Exercise 6: Event Loop');
console.log('First');

setTimeout(function() {
    console.log('Third'); // Runs last even with 0 delay!
}, 0);

console.log('Second');
console.log('Why? setTimeout is async - it goes to the callback queue!\n');


// BONUS: Button click handlers (callbacks in action)
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const countdownDisplay = document.getElementById('countdown');

let displayCountdown = 10;
let displayIntervalId;

startBtn.addEventListener('click', function() {
    console.log('Start button clicked!');
    displayCountdown = 10;
    countdownDisplay.textContent = displayCountdown;
    
    // Clear any existing interval
    if (displayIntervalId) {
        clearInterval(displayIntervalId);
    }
    
    displayIntervalId = setInterval(function() {
        displayCountdown--;
        countdownDisplay.textContent = displayCountdown;
        
        if (displayCountdown <= 0) {
            countdownDisplay.textContent = '🚀 Done!';
            clearInterval(displayIntervalId);
        }
    }, 1000);
});

stopBtn.addEventListener('click', function() {
    console.log('Stop button clicked!');
    clearInterval(displayIntervalId);
    countdownDisplay.textContent = 'Stopped at ' + displayCountdown;
});


console.log('✅ Callbacks demo loaded! Try the buttons above.');
