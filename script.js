const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';

function updateDisplay(value) {
    display.textContent = value || '0';
}

function handleButtonClick(key) {
    console.log('Button clicked:', key); // Debugging line
    if (key === 'C' || key === 'Backspace') {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('0');
    } else if (key === 'Delete') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
    } else if (key === '=' && currentInput !== '') {
        if (previousInput !== '' && operator !== '') {
            currentInput = eval(`${previousInput}${operator}${currentInput}`).toString();
            previousInput = '';
            operator = '';
            updateDisplay(currentInput);
        }
    } else if (['+', '-', '*', '/'].includes(key)) {
        if (currentInput !== '') {
            operator = key;
            previousInput = currentInput;
            currentInput = '';
        }
    } else if (key === '.') {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay(currentInput);
        }
    } else if (/[0-9]/.test(key)) {
        currentInput += key;
        updateDisplay(currentInput);
    }
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        const key = button.getAttribute('data-key');
        console.log('Key from button:', key); // Debugging line
        handleButtonClick(key);
    });
});

window.addEventListener('keydown', (e) => {
    const key = e.key;
    console.log('Key pressed:', key); // Debugging line
    if (/[0-9]/.test(key) || ['+', '-', '*', '/', '=', 'C', '.', 'Backspace', 'Delete'].includes(key)) {
        handleButtonClick(key);
    } else if (key === 'Enter') {
        handleButtonClick('=');
    }
});
