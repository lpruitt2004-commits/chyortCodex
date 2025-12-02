// Day 3: DOM Manipulation Practice - SOLUTION
//
// This demonstrates:
// - getElementById and querySelector
// - textContent and innerHTML
// - createElement and appendChild
// - classList (add, remove, toggle)
// - querySelectorAll and forEach
// - Removing elements from DOM

console.log('=== Day 3: DOM Manipulation ===');

// Exercise 1: Select an element by ID and change its text
function changeHeading() {
    const heading = document.getElementById('main-heading');
    heading.textContent = "DOM Master!";
    console.log('✓ Heading changed');
}

// Exercise 2: Create and append a new element
function addListItem() {
    const list = document.getElementById('my-list');
    const newItem = document.createElement('li');
    
    // Count existing items to create unique text
    const itemCount = list.children.length + 1;
    newItem.textContent = `New Item ${itemCount}`;
    
    list.appendChild(newItem);
    console.log('✓ List item added');
}

// Exercise 3: Remove an element
function removeFirstItem() {
    const list = document.getElementById('my-list');
    const firstItem = list.querySelector('li');
    
    if (firstItem) {
        firstItem.remove();
        // Alternative: list.removeChild(firstItem);
        console.log('✓ First item removed');
    } else {
        console.log('⚠ No items to remove');
    }
}

// Exercise 4: Change CSS with JavaScript
function changeStyles() {
    const box = document.querySelector('.box');
    box.style.backgroundColor = 'blue';
    box.style.width = '300px';
    // Bonus: animate it
    box.style.borderRadius = '10px';
    console.log('✓ Styles changed');
}

// Exercise 5: Toggle a class
function toggleHighlight() {
    const text = document.getElementById('text');
    text.classList.toggle('highlight');
    
    if (text.classList.contains('highlight')) {
        console.log('✓ Highlight ON');
    } else {
        console.log('✓ Highlight OFF');
    }
}

// Exercise 6: Loop through elements
function highlightAllItems() {
    const allItems = document.querySelectorAll('#my-list li');
    
    allItems.forEach(function(item) {
        item.classList.add('active');
    });
    
    // Alternative with arrow function:
    // allItems.forEach(item => item.classList.add('active'));
    
    console.log(`✓ ${allItems.length} items highlighted`);
}

// Don't change this - it connects buttons to functions
window.onload = function() {
    document.getElementById('btn-heading').addEventListener('click', changeHeading);
    document.getElementById('btn-add').addEventListener('click', addListItem);
    document.getElementById('btn-remove').addEventListener('click', removeFirstItem);
    document.getElementById('btn-style').addEventListener('click', changeStyles);
    document.getElementById('btn-toggle').addEventListener('click', toggleHighlight);
    document.getElementById('btn-highlight').addEventListener('click', highlightAllItems);
    
    console.log('✅ Page loaded! Click buttons to test DOM manipulation.');
};
