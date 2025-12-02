// Day 1: ES6+ Features Practice
// 
// INSTRUCTIONS:
// Complete each function below. Test your work by opening day1.html in a browser.
// 
// Code review when done:
// python3 ../../../ollama_duo.py --file day1.js --optimize --optimize-json

// Exercise 1: Arrow Functions
// Convert this function to an arrow function
function multiply(a, b) {
    return a * b;
}

// YOUR CODE HERE (rewrite as arrow function):
const multiplyArrow = null;

// Test it:
console.log(multiplyArrow(3, 4));  // Should print 12


// Exercise 2: Object Destructuring
// Extract name and age from this object using destructuring
const person = { name: 'Alice', age: 25, city: 'NYC' };
// YOUR CODE HERE:



console.log(name, age);  // Should print "Alice 25"


// Exercise 3: Array Destructuring
// Extract the first two colors using destructuring
const colors = ['red', 'blue', 'green', 'yellow'];
// YOUR CODE HERE:



console.log(firstColor, secondColor);  // Should print "red blue"


// Exercise 4: Template Literals
// Create a greeting using template literals
function greet(name, age) {
    // YOUR CODE HERE (use template literals)
    return null;
}

// Test it:
console.log(greet('Bob', 30));  // Should print "Hello, my name is Bob and I am 30 years old."


// Exercise 5: Spread Operator
// Combine these two arrays using the spread operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
// YOUR CODE HERE:



console.log(combined);  // Should print [1, 2, 3, 4, 5, 6]


// Exercise 6: Rest Parameters
// Write a function that takes any number of arguments and returns their sum
function sum(...numbers) {
    // YOUR CODE HERE
}

// Test it:
console.log(sum(1, 2, 3));     // Should print 6
console.log(sum(1, 2, 3, 4, 5)); // Should print 15


// Exercise 7: Default Parameters
// Write a function with default parameters
function createUser(name, role = 'guest') {
    // YOUR CODE HERE (return an object with name and role)
}

// Test it:
console.log(createUser('Charlie'));          // Should print { name: 'Charlie', role: 'guest' }
console.log(createUser('Diana', 'admin'));   // Should print { name: 'Diana', role: 'admin' }


// BONUS: ES6 Modules
// Explain in comments how to:
// 1. Export a function from a module
// 2. Import that function in another file
// YOUR EXPLANATION HERE:
