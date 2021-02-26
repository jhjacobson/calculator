const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const subtract = (a, b) => a - b;

function operate(operator, a, b) {
    return (operator === "+") ? add(a, b) :
        (operator === "-") ? subtract(a, b) :
        (operator === "*") ? multiply(a, b) :
        (operator === "/") ? divide(a, b) :
        console.log("operate error");
}

function processOperator(buttonID) {
    return (buttonID == "add") ? "+" :
        (buttonID == "subtract") ? "-" :
        (buttonID == "multiply") ? "*" :
        (buttonID == "divide") ? "/" :
        console.log("process operator error");
}

function processButtonID(buttonID) {
    return (buttonID == "zero") ? 0 :
        (buttonID == "one") ? 1 :
        (buttonID == "two") ? 2 :
        (buttonID == "three") ? 3 :
        (buttonID == "four") ? 4 :
        (buttonID == "five") ? 5 :
        (buttonID == "six") ? 6 :
        (buttonID == "seven") ? 7 :
        (buttonID == "eight") ? 8 :
        (buttonID == "nine") ? 9 : "ERROR";
}

function processButton(button) {
    if (button.classList[0] == 'operators') {
        if (button.id == 'equals') {
            let result = operate(chosenOperator, firstNumber, secondNumber);
            display.textContent = result;
            firstNumber = "";
            secondNumber = "";
            return result;
        } else {
            chosenOperator = processOperator(button.id);
            return chosenOperator;
        }
    } else if (button.classList[0] == 'numbers') {
        if (chosenOperator == "") {
            let digit = processButtonID(button.id);
            display.textContent += digit;
            firstNumber = Number(firstNumber.toString() + digit);
            return firstNumber;
        } else {
            let digit = processButtonID(button.id);
            display.textContent += digit;
            secondNumber = Number(secondNumber.toString() + digit);
            return secondNumber;
        }
    }
}

function updateDisplayText(button) {
    if (button.id == 'clear-all') {
        display.textContent = 0;
        firstNumber = "";
        secondNumber = "";
        chosenOperator = "";
    } else if (display.textContent == 0) {
        display.textContent = processButton(button);
    } else if ((button.classList[0] == 'operators') && button.id !== "equals") {
        display.textContent += processButton(button);
    } else { processButton(button) };
}

const display = document.querySelector('#display');

let firstNumber = "";
let secondNumber = "";
let chosenOperator = "";


const options = document.querySelectorAll('button');
options.forEach((button) => {
    button.addEventListener('click', () => updateDisplayText(button));
});