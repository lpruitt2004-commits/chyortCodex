// Day 3: DOM Manipulation Practice
//
// INSTRUCTIONS:
// Complete the functions to manipulate the DOM
// 
// Code review:
// python3 ../../../ollama_duo.py --file day3.js --optimize --optimize-json

// Exercise 1: Select an element by ID and change its text
function changeHeading() {
    // Select the h1 with id="main-heading"
    // Change its textContent to "DOM Master!"
    // YOUR CODE HERE:
}

// Exercise 2: Create and append a new element
function addListItem() {
    // Select the ul with id="my-list"
    // Create a new li element
    // Set its textContent to "New Item"
    // Append it to the list
    // YOUR CODE HERE:
}

// Exercise 3: Remove an element
function removeFirstItem() {
    // Select the first li in the list
    // Remove it from the DOM
    // YOUR CODE HERE:
}

// Exercise 4: Change CSS with JavaScript
function changeStyles() {
    // Select the div with class="box"
    // Change its background color to blue
    // Change its width to 300px
    // YOUR CODE HERE:
}

// Exercise 5: Toggle a class
function toggleHighlight() {
    // Select the p with id="text"
    // Toggle the class "highlight" on it
    // YOUR CODE HERE:
}

// Exercise 6: Loop through elements
function highlightAllItems() {
    // Select all li elements
    // Loop through them and add class "active" to each
    // YOUR CODE HERE:
}

// Don't change this - it connects buttons to functions
window.onload = function() {
    document.getElementById('btn-heading').addEventListener('click', changeHeading);
    document.getElementById('btn-add').addEventListener('click', addListItem);
    document.getElementById('btn-remove').addEventListener('click', removeFirstItem);
    document.getElementById('btn-style').addEventListener('click', changeStyles);
    document.getElementById('btn-toggle').addEventListener('click', toggleHighlight);
    document.getElementById('btn-highlight').addEventListener('click', highlightAllItems);
};
