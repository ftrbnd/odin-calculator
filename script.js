const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
let num1 = '', operator = '', num2 = '', startSecondOperand = false;

loadPage();

function loadPage() {
    attachButtonListeners();
}

function attachButtonListeners() {
    for (const button of buttons) {
        button.addEventListener('mouseover', () => {
            button.classList.add('darken');
        });
    
        button.addEventListener('mouseout', () => {
            button.classList.remove('darken');
        })
        
        button.addEventListener('click', () => {
            handleClick(button.textContent);
        });
    }
}

function handleClick(buttonText) {
    console.log(`num1 = ${num1}, operator = ${operator}, num2 = ${num2}`);

    if ('+-*÷'.includes(buttonText)) {
        if (!num1 && !num2) return; // ignore if no numbers to compute

        display.textContent = buttonText;
        operator = buttonText;
        startSecondOperand = true;
        return;
    }

    if (buttonText == 'CLEAR') {
        display.textContent = 'Hello';
        num1 = '', operator = '', num2 = '', startSecondOperand = false;
        return;
    } else if (buttonText == '=') {
        const solution = operate(num1, num2, operator);
        display.textContent = Math.round(solution * 100) / 100;

        num1 = '', operator = '', num2 = '', startSecondOperand = false;
        return;
    }

    if (startSecondOperand) {
        num2 += buttonText;
        display.textContent = num2;
    } else {
        num1 += buttonText;
        display.textContent = num1;
    }
}

function operate(x, y, op) {
    x = parseInt(x), y = parseInt(y);

    switch (op) {
        case '+':
            return add(x,y);
        case '-':
            return subtract(x,y);
        case '*':
            return multiply(x,y);
        case '÷':
            return divide(x,y);
    }
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}