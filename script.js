let display = document.getElementById('result');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteChar() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace × with * and ÷ with /
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
            
        // Handle percentage calculations
        expression = expression.replace(/([\d.]+)%/g, function(match, number) {
            return parseFloat(number) / 100;
        });

        const result = eval(expression);
        
        if (isFinite(result)) {
            display.value = Number(result.toFixed(8)).toString();
        } else {
            display.value = 'Error';
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers and operators
    if (/[0-9%+\-*/.()]/.test(key)) {
        appendToDisplay(key);
    }
    // Enter or = for calculation
    else if (key === 'Enter' || key === '=') {
        calculate();
    }
    // Backspace for delete
    else if (key === 'Backspace') {
        deleteChar();
    }
    // Clear on 'c' or 'C'
    else if (key.toLowerCase() === 'c') {
        clearDisplay();
    }
});
