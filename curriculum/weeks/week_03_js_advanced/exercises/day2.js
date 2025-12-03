// Day 2: Callbacks & Asynchronous JavaScript Practice
// 
// INSTRUCTIONS:
// Complete each exercise to understand callbacks and async timing
// 
// Code review:
// python3 ../../../ollama_duo.py --file day2.js --optimize --optimize-json

console.log('=== Day 2: Callbacks & Async ===\n');

// Exercise 1: Basic Callback
// Create a function that takes a callback and executes it
function doSomething(callback) {
    console.log('Doing something...');
    // YOUR CODE HERE - call the callback function
}

// Test it:
console.log('Exercise 1: Basic Callback');
// doSomething(function() {
//     console.log('Callback executed!');
// });


// Exercise 2: setTimeout
// Use setTimeout to log a message after 2 seconds
console.log('\nExercise 2: setTimeout');
console.log('Starting timer...');
// YOUR CODE HERE - use setTimeout



// Exercise 3: Callback with Parameters
// Create a function that processes data and calls the callback with result
function processData(data, callback) {
    // YOUR CODE HERE
    // Simulate processing by multiplying data by 2
    // Then call the callback with the result
}

// Test it:
console.log('\nExercise 3: Callback with Parameters');
// processData(5, function(result) {
//     console.log('Processed result:', result);
// });


// Exercise 4: setInterval
// Create a countdown timer using setInterval
let countdownValue = 5;
let intervalId;

function startCountdown() {
    console.log('\nExercise 4: Countdown Timer');
    // YOUR CODE HERE
    // Use setInterval to count down from 5 to 0
    // Log each number
    // When it reaches 0, log "Blast off!" and clear the interval
}

// Uncomment to test:
// startCountdown();


// Exercise 5: Callback Hell Example
// Chain multiple callbacks (this shows the problem we'll solve with Promises)
function step1(callback) {
    setTimeout(function() {
        console.log('Step 1 complete');
        // YOUR CODE HERE - call the callback
    }, 1000);
}

function step2(callback) {
    setTimeout(function() {
        console.log('Step 2 complete');
        // YOUR CODE HERE - call the callback
    }, 1000);
}

function step3(callback) {
    setTimeout(function() {
        console.log('Step 3 complete');
        // YOUR CODE HERE - call the callback
    }, 1000);
}

// Test the callback chain:
console.log('\nExercise 5: Callback Chain');
// YOUR CODE HERE - chain step1, step2, step3


// Exercise 6: Event Loop Understanding
console.log('\nExercise 6: Event Loop');
console.log('First');

// YOUR CODE HERE - use setTimeout with 0 delay
// to log 'Third'

console.log('Second');
// What order will they print? Why?


// BONUS: Button click handlers (callbacks in action)
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const countdown = document.getElementById('countdown');

// YOUR CODE HERE
// Add click event listeners to start and stop a countdown
// Update the countdown paragraph with the current number
