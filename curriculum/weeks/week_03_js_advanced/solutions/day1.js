// Day 1: ES6+ Features Practice - SOLUTION
// 
// This demonstrates:
// - Arrow functions
// - Object and array destructuring
// - Template literals
// - Spread and rest operators
// - Default parameters

console.log('=== Day 1: ES6+ Features ===\n');

// Exercise 1: Arrow Functions
// Convert this function to an arrow function
function multiply(a, b) {
    return a * b;
}

const multiplyArrow = (a, b) => a * b;

// Alternative with explicit return:
// const multiplyArrow = (a, b) => { return a * b; };

console.log('Exercise 1: Arrow Functions');
console.log(`multiply(3, 4) = ${multiply(3, 4)}`);
console.log(`multiplyArrow(3, 4) = ${multiplyArrow(3, 4)}\n`);


// Exercise 2: Object Destructuring
// Extract name and age from this object using destructuring
const person = { name: 'Alice', age: 25, city: 'NYC' };
const { name, age } = person;

// Alternative with renaming:
// const { name: personName, age: personAge } = person;

console.log('Exercise 2: Object Destructuring');
console.log(`name: ${name}, age: ${age}`);
console.log(`Full object:`, person);
console.log();


// Exercise 3: Array Destructuring
// Extract the first two colors using destructuring
const colors = ['red', 'blue', 'green', 'yellow'];
const [firstColor, secondColor] = colors;

// Skip elements:
// const [first, , third] = colors; // skips 'blue'

console.log('Exercise 3: Array Destructuring');
console.log(`firstColor: ${firstColor}, secondColor: ${secondColor}`);
console.log(`All colors:`, colors);
console.log();


// Exercise 4: Template Literals
// Create a greeting using template literals
function greet(name, age) {
    return `Hello, my name is ${name} and I am ${age} years old.`;
}

// Multi-line template literal example:
const multiLineGreeting = (name, age) => `
    Hello!
    My name is ${name}.
    I am ${age} years old.
    Nice to meet you!
`;

console.log('Exercise 4: Template Literals');
console.log(greet('Bob', 30));
console.log();


// Exercise 5: Spread Operator
// Combine these two arrays using the spread operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];

// Also works with objects:
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const combinedObj = { ...obj1, ...obj2 };

console.log('Exercise 5: Spread Operator');
console.log('combined arrays:', combined);
console.log('combined objects:', combinedObj);
console.log();


// Exercise 6: Rest Parameters
// Write a function that takes any number of arguments and returns their sum
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// Alternative with traditional loop:
function sumLoop(...numbers) {
    let total = 0;
    for (let num of numbers) {
        total += num;
    }
    return total;
}

console.log('Exercise 6: Rest Parameters');
console.log(`sum(1, 2, 3) = ${sum(1, 2, 3)}`);
console.log(`sum(1, 2, 3, 4, 5) = ${sum(1, 2, 3, 4, 5)}`);
console.log();


// Exercise 7: Default Parameters
// Write a function with default parameters
function createUser(name, role = 'guest') {
    return { name, role }; // Object shorthand
}

// Alternative without shorthand:
// function createUser(name, role = 'guest') {
//     return { name: name, role: role };
// }

console.log('Exercise 7: Default Parameters');
console.log(createUser('Charlie'));
console.log(createUser('Diana', 'admin'));
console.log();


// BONUS: ES6 Modules Explanation
console.log('BONUS: ES6 Modules');
console.log(`
ES6 Modules Example:

// math.js (module file)
export function add(a, b) {
    return a + b;
}

export const PI = 3.14159;

export default function multiply(a, b) {
    return a * b;
}

// app.js (importing file)
import multiply, { add, PI } from './math.js';

console.log(add(2, 3));      // 5
console.log(multiply(2, 3)); // 6
console.log(PI);             // 3.14159

Note: Modules require a server or type="module" in script tag
`);


console.log('✅ All ES6+ exercises complete!');
