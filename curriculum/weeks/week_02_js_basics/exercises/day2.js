// Day 2: Functions & Scope Practice
// 
// INSTRUCTIONS:
// Complete each function below. Test your work by opening day2.html in a browser.
// 
// Code review when done:
// python3 ../../../ollama_duo.py --file day2.js --optimize --optimize-json

// Exercise 1: Function Declarations
// Create a function that calculates the area of a rectangle
function calculateArea(width, height) {
    // YOUR CODE HERE
}

// Test it:
console.log(calculateArea(5, 10));  // Should print 50


// Exercise 2: Function Expressions
// Create a function expression that converts Celsius to Fahrenheit
// Formula: (celsius * 9/5) + 32
const celsiusToFahrenheit = null; // YOUR CODE HERE

// Test it:
console.log(celsiusToFahrenheit(0));   // Should print 32
console.log(celsiusToFahrenheit(100)); // Should print 212


// Exercise 3: Arrow Functions
// Convert this function to an arrow function
function square(num) {
    return num * num;
}

const squareArrow = null; // YOUR CODE HERE

// Test it:
console.log(squareArrow(5)); // Should print 25


// Exercise 4: Default Parameters
// Create a function that greets a user with a default greeting
function greet(name, greeting = 'Hello') {
    // YOUR CODE HERE - return a greeting string
}

// Test it:
console.log(greet('Alice'));              // Should print "Hello, Alice!"
console.log(greet('Bob', 'Good morning')); // Should print "Good morning, Bob!"


// Exercise 5: Return Values
// Create a function that finds the larger of two numbers
function max(a, b) {
    // YOUR CODE HERE
}

// Test it:
console.log(max(10, 5));  // Should print 10
console.log(max(3, 15));  // Should print 15


// Exercise 6: Scope
// Fix this code - the variable should be accessible
function testScope() {
    // YOUR CODE HERE
    message = "Hello from inside!";
}

testScope();
// console.log(message); // This should work


// Exercise 7: Closures
// Create a counter function using closures
function createCounter() {
    let count = 0;
    
    return function() {
        // YOUR CODE HERE - increment count and return it
    };
}

// Test it:
const counter = createCounter();
console.log(counter()); // Should print 1
console.log(counter()); // Should print 2
console.log(counter()); // Should print 3


// BONUS: Higher-Order Functions
// Create a function that takes a function as an argument
function applyOperation(x, y, operation) {
    // YOUR CODE HERE
}

// Test it:
console.log(applyOperation(5, 3, (a, b) => a + b)); // Should print 8
console.log(applyOperation(5, 3, (a, b) => a * b)); // Should print 15
