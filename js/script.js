const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const subtract = (a, b) => a - b;

function operate(operator, a, b) {
    return (operator === "add") ? add(a, b) :
        (operator === "subtract") ? subtract(a, b) :
        (operator === "multiply") ? multiply(a, b) :
        (operator === "divide") ? divide(a, b) :
        console.log("operate error");
}

function getDigit(buttonID) {
    return (buttonID == "zero") ? 0 :
        (buttonID == "one") ? 1 :
        (buttonID == "two") ? 2 :
        (buttonID == "three") ? 3 :
        (buttonID == "four") ? 4 :
        (buttonID == "five") ? 5 :
        (buttonID == "six") ? 6 :
        (buttonID == "seven") ? 7 :
        (buttonID == "eight") ? 8 :
        (buttonID == "nine") ? 9 :
        (buttonID == "decimal") ? "." : console.log('getDigit error');
}

function processOperators(button) {
    if (button.id == 'equals') {
        if (isEqualReady()) {
            DEC_BUTTON.disabled = false;
            return calcResult();
        }
    } else {
        DEC_BUTTON.disabled = false;
        if (chosenOperator == "") {
            display.textContent += button.textContent;
            chosenOperator = button.id;
        } else {
            let saveOperator = chosenOperator;
            let operatorText = button.textContent;
            calcResult();
            display.textContent += operatorText;
            chosenOperator = saveOperator;
        }
    }
}

function isEqualReady() {
    return (firstNumber && secondNumber && chosenOperator) ? 1 : 0;
}

function calcResult() {
    firstNumber = roundResult(operate(chosenOperator, Number(firstNumber), Number(secondNumber)));
    secondNumber = "";
    chosenOperator = "";
    result = firstNumber;
    display.textContent = firstNumber;
    return firstNumber;
}

function roundResult(number) {
    if (number % 1 != 0) {
        number = Number(number.toFixed(8))
    }
    return number;
}

function processNumbers(button) {
    if (chosenOperator == "") {
        firstNumber = processDigit(button, firstNumber);
        return firstNumber;
    } else {
        secondNumber = processDigit(button, secondNumber);
        return secondNumber;
    }
}

function processDigit(button, number) {
    let digit = getDigit(button.id);
    display.textContent += digit;
    return (number.toString() + digit);
}

function processButton(button) {
    if (button.classList[0] === 'operators') {
        return processOperators(button);
    } else if (button.classList[0] === 'numbers') {
        return processNumbers(button);
    } else if (button.id === 'decimal') {
        button.disabled = true;
        return processNumbers(button);
    }

}

function updateDisplayText(button) {
    if (button.id == 'clear-all') {
        initialize();
    } else if (button.id == 'backspace') {
        deleteChar();
    } else if (display.textContent == 0) {
        initialize();
        display.textContent = processButton(button);
    } else if ((result === firstNumber) && (chosenOperator === "") && (button.classList[0] === 'numbers')) {
        initialize();
        display.textContent = processButton(button);
    } else {
        processButton(button)
    };
}

function deleteChar() {
    let currentText = display.textContent;
    lastChar = currentText[currentText.length - 1];
    display.textContent = currentText.slice(0, -1);

    if (firstNumber == "") {
        // Initial state. Just keep 0 in display.
    } else if (chosenOperator == "") {
        firstNumber = firstNumber.slice(0, -1);
    } else if (secondNumber == "") {
        chosenOperator = "";
    } else {
        secondNumber = secondNumber.slice(0, -1);
    }

    if (lastChar === ".") {
        DEC_BUTTON.disabled = false;
    }

    if (display.textContent == "") {
        display.textContent = 0;
    }
}

function initialize() {
    display.textContent = 0;
    firstNumber = "";
    secondNumber = "";
    chosenOperator = "";
    DEC_BUTTON.disabled = false;
}

const display = document.querySelector('#display');
const DEC_BUTTON = document.querySelector('#decimal');

let firstNumber = "";
let secondNumber = "";
let chosenOperator = "";
let result = "";

const options = document.querySelectorAll('button');
options.forEach((button) => {
    button.addEventListener('click', () => updateDisplayText(button));
});