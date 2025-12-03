// Day 1: JavaScript Fundamentals Practice - SOLUTION
// 
// This demonstrates:
// - Variables and data types
// - Arrays and objects
// - Conditionals and loops
// - Array methods (forEach, map)
// - FizzBuzz algorithm

console.log('=== Day 1: JavaScript Fundamentals ===\n');

// Exercise 1: Variables and Data Types
// Create variables for: name (string), age (number), isStudent (boolean)
const name = 'Alex Johnson';
const age = 24;
const isStudent = true;

console.log('Exercise 1: Variables');
console.log(`Name: ${name} (${typeof name})`);
console.log(`Age: ${age} (${typeof age})`);
console.log(`Is Student: ${isStudent} (${typeof isStudent})\n`);


// Exercise 2: Arrays
// Create an array of 5 favorite foods
const favoriteFoods = ['Pizza', 'Sushi', 'Tacos', 'Pasta', 'Ice Cream'];

console.log('Exercise 2: Arrays');
console.log('Favorite Foods:', favoriteFoods);
console.log(`Number of foods: ${favoriteFoods.length}\n`);


// Exercise 3: Objects
// Create an object representing a person with properties: name, age, city
const person = {
    name: 'Sarah Martinez',
    age: 28,
    city: 'San Francisco'
};

console.log('Exercise 3: Objects');
console.log('Person:', person);
console.log(`${person.name} is ${person.age} years old and lives in ${person.city}\n`);


// Exercise 4: Conditionals
// Write a function that takes a number and returns "even" or "odd"
function isEvenOrOdd(num) {
    if (num % 2 === 0) {
        return 'even';
    } else {
        return 'odd';
    }
}

// Alternative solution using ternary operator:
// function isEvenOrOdd(num) {
//     return num % 2 === 0 ? 'even' : 'odd';
// }

console.log('Exercise 4: Conditionals');
console.log(`isEvenOrOdd(4) = ${isEvenOrOdd(4)}`);  // "even"
console.log(`isEvenOrOdd(7) = ${isEvenOrOdd(7)}\n`);  // "odd"


// Exercise 5: Loops
// Write a function that prints numbers from 1 to n
function printNumbers(n) {
    console.log(`Printing numbers from 1 to ${n}:`);
    for (let i = 1; i <= n; i++) {
        console.log(i);
    }
}

console.log('Exercise 5: Loops');
printNumbers(5);
console.log();


// Exercise 6: FizzBuzz
// Write a function that prints numbers 1-15
// For multiples of 3, print "Fizz"
// For multiples of 5, print "Buzz"
// For multiples of both, print "FizzBuzz"
function fizzBuzz() {
    console.log('FizzBuzz (1-15):');
    for (let i = 1; i <= 15; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log('FizzBuzz');
        } else if (i % 3 === 0) {
            console.log('Fizz');
        } else if (i % 5 === 0) {
            console.log('Buzz');
        } else {
            console.log(i);
        }
    }
}

console.log('Exercise 6: FizzBuzz');
fizzBuzz();
console.log();


// Exercise 7: Array Methods
// Given this array, use forEach to print each item
const fruits = ['apple', 'banana', 'orange', 'grape'];

console.log('Exercise 7: Array Methods');
console.log('Using forEach:');
fruits.forEach(function(fruit) {
    console.log(`- ${fruit}`);
});

// Alternative with arrow function:
// fruits.forEach(fruit => console.log(`- ${fruit}`));

console.log();


// BONUS: Use .map() to create a new array with all fruits in uppercase
const uppercaseFruits = fruits.map(function(fruit) {
    return fruit.toUpperCase();
});

// Alternative with arrow function:
// const uppercaseFruits = fruits.map(fruit => fruit.toUpperCase());

console.log('BONUS: Using map()');
console.log('Original:', fruits);
console.log('Uppercase:', uppercaseFruits);


console.log('\n✅ All exercises complete!');
