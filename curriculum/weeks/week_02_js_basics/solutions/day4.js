// Day 4: Event Handling Practice - SOLUTION
// 
// This demonstrates:
// - Click events
// - Mouse events (enter, leave)
// - Form submission with preventDefault
// - Keyboard events
// - Event object properties

console.log('=== Day 4: Event Handling ===');

// Exercise 1: Click event
const clickBtn = document.getElementById('clickBtn');
let clickCount = 0;

clickBtn.addEventListener('click', function() {
    clickCount++;
    console.log(`Button clicked! (${clickCount} times)`);
    clickBtn.textContent = `Clicked ${clickCount} times!`;
});


// Exercise 2: Mouse enter/leave
const hoverBtn = document.getElementById('hoverBtn');
const originalText = hoverBtn.textContent;

hoverBtn.addEventListener('mouseenter', function() {
    hoverBtn.textContent = '🎉 You are hovering!';
    hoverBtn.style.backgroundColor = '#2ecc71';
    console.log('Mouse entered button');
});

hoverBtn.addEventListener('mouseleave', function() {
    hoverBtn.textContent = originalText;
    hoverBtn.style.backgroundColor = '#3498db';
    console.log('Mouse left button');
});


// Exercise 3: Click to change color
const colorBox = document.getElementById('colorBox');
const colors = ['lightblue', 'lightcoral', 'lightgreen', 'lightyellow', 'lightpink', 'lavender'];
let colorIndex = 0;

colorBox.addEventListener('click', function() {
    colorIndex = (colorIndex + 1) % colors.length;
    colorBox.style.backgroundColor = colors[colorIndex];
    console.log(`Box color changed to: ${colors[colorIndex]}`);
});


// Exercise 4: Form submission
const form = document.getElementById('myForm');
const nameInput = document.getElementById('nameInput');
const output = document.getElementById('output');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload
    
    const name = nameInput.value.trim();
    
    if (name) {
        output.style.display = 'block';
        output.textContent = `Hello, ${name}! Welcome to Event Handling.`;
        console.log(`Form submitted with name: ${name}`);
        
        // Clear input
        nameInput.value = '';
    } else {
        output.style.display = 'block';
        output.style.background = '#f8d7da';
        output.style.borderLeftColor = '#e74c3c';
        output.textContent = 'Please enter a name!';
        console.log('Form submitted without name');
    }
});


// BONUS: Keyboard events
const keyOutput = document.getElementById('keyOutput');

document.addEventListener('keydown', function(e) {
    const keyInfo = `
        Key: ${e.key} | 
        Code: ${e.code} | 
        Shift: ${e.shiftKey} | 
        Ctrl: ${e.ctrlKey} | 
        Alt: ${e.altKey}
    `;
    
    keyOutput.textContent = keyInfo;
    console.log(`Key pressed:`, e.key);
    
    // Special key combinations
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault(); // Prevent browser save dialog
        console.log('Ctrl+S pressed (save prevented)');
        alert('Save shortcut detected!');
    }
});


// Additional: Double-click example
colorBox.addEventListener('dblclick', function() {
    colorBox.style.backgroundColor = 'gold';
    colorBox.textContent = '✨ Double-clicked! ✨';
    console.log('Box double-clicked');
    
    setTimeout(() => {
        colorBox.textContent = 'Click to change color';
    }, 1500);
});


console.log('✅ All event listeners attached! Try interacting with elements.');
