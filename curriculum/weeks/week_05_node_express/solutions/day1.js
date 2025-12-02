// Day 1: Node.js Fundamentals Practice - SOLUTION
// 
// Run with: node day1.js test arg
//
// This demonstrates:
// - Built-in Node.js modules (fs, path, process)
// - File system operations
// - Module exports
// - Environment and command-line arguments

console.log('=== Day 1: Node.js Fundamentals ===\n');

// Exercise 1: Built-in modules
const fs = require('fs');
const path = require('path');

console.log('Exercise 1: Modules imported ✓');


// Exercise 2: Read environment info
console.log('\nExercise 2: Environment Info');
console.log('Node version:', process.version);
console.log('Platform:', process.platform);
console.log('Current directory:', process.cwd());


// Exercise 3: Create a simple module
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

// Export functions
module.exports = {
    add,
    subtract
};

console.log('\nExercise 3: Math Functions');
console.log('add(5, 3) =', add(5, 3));
console.log('subtract(10, 4) =', subtract(10, 4));


// Exercise 4: File system operations - Write
console.log('\nExercise 4: Writing to file');
const content = `Hello from Node.js!
Current time: ${new Date().toISOString()}
Process ID: ${process.pid}
`;

try {
    fs.writeFileSync('output.txt', content);
    console.log('✓ File "output.txt" created successfully');
} catch (error) {
    console.error('Error writing file:', error.message);
}


// Exercise 5: File system operations - Read
console.log('\nExercise 5: Reading from file');
try {
    const fileContent = fs.readFileSync('output.txt', 'utf8');
    console.log('File content:');
    console.log(fileContent);
} catch (error) {
    console.error('Error reading file:', error.message);
}


// Exercise 6: Work with paths
console.log('Exercise 6: Path operations');
const testPath = 'test.js';
console.log('File extension:', path.extname(testPath));
console.log('File name:', path.basename(testPath));
console.log('Directory name:', path.dirname('/user/local/bin/file.js'));
console.log('Joined path:', path.join(__dirname, 'exercises', 'day1.js'));


// BONUS: Command line arguments
console.log('\nBONUS: Command Line Arguments');
console.log('Full arguments:', process.argv);
console.log('Script arguments:', process.argv.slice(2));

if (process.argv.length > 2) {
    console.log('You passed:', process.argv.slice(2).join(', '));
} else {
    console.log('Try running: node day1.js arg1 arg2');
}

// BONUS 2: Environment variables
console.log('\nBONUS 2: Environment Variables');
console.log('HOME directory:', process.env.HOME || process.env.USERPROFILE);
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');

console.log('\n✅ All exercises complete!');
