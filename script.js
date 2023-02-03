const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
let num1 = '', operator = '', num2 = '';
let num1Submitted = false, equalsPressed = false;
let decimalPressed = false;

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

        button.addEventListener('mousedown', () => {
            if ((!num1 && '+-*÷'.includes(button.textContent)) || (button.textContent == '=' && !num2) || decimalPressed) return;
            button.style.border = '5px solid white';
        })

        button.addEventListener('mouseup', () => {
            if ('+-*÷'.includes(button.textContent)) {
                const buttons = document.querySelectorAll('button.operator');
                for (const button of buttons) {
                    button.style.border = 'none';
                }
            }

            button.style.border = '5px solid white';

            switch (button.textContent) {
                case '+':
                case '-':
                case '*':
                case '÷':
                case '.':
                    break;
                default:
                    const buttons = document.querySelectorAll('button');
                    for (const button of buttons) {
                        button.style.border = 'none';
                    }
                    break;
            }
        })
    }
}

/*
    SPECIAL CASES:
    - Dividing by zero
    - Pressing on operators when !num1 and !num2
    - Rounding to avoid large numbers stretching screen
    - Setting text colors

    TODO:
    - Set text colors on results
    - extra credit on Odin page
*/
function handleClick(buttonText) {
    switch (buttonText) {
        case '+':
        case '-':
        case '*':
        case '÷':
            if (num1.length == 0) return;
            display.style.color = 'white';
            equalsPressed = false;
            
            if (Number.NEGATIVE_INFINITY < num1 && num1 < Number.POSITIVE_INFINITY && num2.length > 0) {
                console.log('Chaining operations...')
                num1 = operate(num1, num2, operator);
                display.textContent = parseFloat(num1).round().toLocaleString("en-US");;
                num2 = '';
            } else {
                console.log('Not chaining..')
                display.textContent = buttonText;
            }

            decimalPressed = false;
            num1Submitted = true;
            operator = buttonText;

            break;
        case '=':
            if (num2.length == 0) return;
            display.style.color = 'white';

            num1 = operate(num1, num2, operator);
            if (num1 == 'DIV_BY_ZERO') {
                alert("don't divide by zero... ");
                return resetCalculator();
            }
            display.style.color = 'lightgreen';
            display.textContent = parseFloat(num1).round().toLocaleString("en-US");

            num2 = '', operator = '';
            decimalPressed = false;
            equalsPressed = true;
            break;
        case 'CLEAR':
            resetCalculator();
            break;
        case '⌫':
            if (equalsPressed) return resetCalculator();

            if (!num1Submitted) {
                num1 = num1.slice(0, -1); 
                display.textContent = num1;

                if (num1 == '') {
                    resetCalculator();
                }
            } else {
                num2 = num2.slice(0, -1);
                display.textContent = num2;

                if (num2 == '') {
                    display.textContent = operator;
                }
            }
            
            break;
        case '.':
            if (decimalPressed && buttonText == '.') return;

            decimalPressed = true;
            // fall-through to allow numbers after decimal
        default: // numbers and decimal only
            if (equalsPressed) {
                resetCalculator();
            }

            if (num1 >= 999999999 && !num1Submitted) return;
            if (num2 >= 999999999 && num1Submitted) return;

            display.style.color = 'white';

            if (!num1Submitted) {
                num1 += buttonText;
                display.textContent = parseFloat(num1).toLocaleString("en-US");
            } else {
                num2 += buttonText;
                display.textContent = parseFloat(num2).toLocaleString("en-US");
            }
            break;
    }
    console.log(`num1 = ${num1}, operator = ${operator}, num2 = ${num2}`);
}

function resetCalculator() {
    num1 = '', num2 = '';
    operator = '';
    num1Submitted = false, equalsPressed = false;
    decimalPressed = false;
    display.style.color = 'gray';
    display.textContent = 'hello';

    console.log('Reset all variables.');
}

function operate(x, y, op) {
    x = parseFloat(x), y = parseFloat(y);
    console.log(`Computing ${x} ${op} ${y}...`);

    if (op == '÷' && y == 0) return 'DIV_BY_ZERO';

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

Number.prototype.round = function(places = 5) {
    return +(Math.round(this + "e+" + places)  + "e-" + places);
  }