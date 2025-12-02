// Day 2: Functions & Scope Practice - SOLUTION
// 
// This demonstrates:
// - Function declarations and expressions
// - Arrow functions
// - Default parameters
// - Scope and closures
// - Higher-order functions

console.log('=== Day 2: Functions & Scope ===\n');

// Exercise 1: Function Declarations
// Create a function that calculates the area of a rectangle
function calculateArea(width, height) {
    return width * height;
}

console.log('Exercise 1: Function Declarations');
console.log(`calculateArea(5, 10) = ${calculateArea(5, 10)}\n`);


// Exercise 2: Function Expressions
// Create a function expression that converts Celsius to Fahrenheit
// Formula: (celsius * 9/5) + 32
const celsiusToFahrenheit = function(celsius) {
    return (celsius * 9/5) + 32;
};

console.log('Exercise 2: Function Expressions');
console.log(`celsiusToFahrenheit(0) = ${celsiusToFahrenheit(0)}°F`);
console.log(`celsiusToFahrenheit(100) = ${celsiusToFahrenheit(100)}°F\n`);


// Exercise 3: Arrow Functions
// Convert this function to an arrow function
function square(num) {
    return num * num;
}

const squareArrow = (num) => num * num;
// Alternative: const squareArrow = num => num * num;

console.log('Exercise 3: Arrow Functions');
console.log(`square(5) = ${square(5)}`);
console.log(`squareArrow(5) = ${squareArrow(5)}\n`);


// Exercise 4: Default Parameters
// Create a function that greets a user with a default greeting
function greet(name, greeting = 'Hello') {
    return `${greeting}, ${name}!`;
}

console.log('Exercise 4: Default Parameters');
console.log(greet('Alice'));
console.log(greet('Bob', 'Good morning'));
console.log();


// Exercise 5: Return Values
// Create a function that finds the larger of two numbers
function max(a, b) {
    return a > b ? a : b;
    
    // Alternative:
    // if (a > b) {
    //     return a;
    // } else {
    //     return b;
    // }
}

console.log('Exercise 5: Return Values');
console.log(`max(10, 5) = ${max(10, 5)}`);
console.log(`max(3, 15) = ${max(3, 15)}\n`);


// Exercise 6: Scope
// Fix this code - the variable should be accessible
let message; // Declare in outer scope

function testScope() {
    message = "Hello from inside!";
}

testScope();
console.log('Exercise 6: Scope');
console.log(message); // Now accessible
console.log();


// Exercise 7: Closures
// Create a counter function using closures
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

console.log('Exercise 7: Closures');
const counter = createCounter();
console.log(`counter() = ${counter()}`); // 1
console.log(`counter() = ${counter()}`); // 2
console.log(`counter() = ${counter()}`); // 3

// Demonstrate that each counter is independent
const counter2 = createCounter();
console.log(`counter2() = ${counter2()}`); // 1
console.log(`counter() again = ${counter()}`); // 4
console.log();


// BONUS: Higher-Order Functions
// Create a function that takes a function as an argument
function applyOperation(x, y, operation) {
    return operation(x, y);
}

console.log('BONUS: Higher-Order Functions');
console.log(`applyOperation(5, 3, add) = ${applyOperation(5, 3, (a, b) => a + b)}`);
console.log(`applyOperation(5, 3, multiply) = ${applyOperation(5, 3, (a, b) => a * b)}`);
console.log(`applyOperation(10, 2, divide) = ${applyOperation(10, 2, (a, b) => a / b)}`);


console.log('\n✅ All exercises complete!');
