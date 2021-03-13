/*jshint esversion: 6 */
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const subtract = (a, b) => a - b;
const display = document.querySelector("#display");
const DEC_BUTTON = document.querySelector("#decimal");
const INITIAL_VAL = "0";

let firstNumber = INITIAL_VAL;
let secondNumber = "";
let chosenOperator = "";
let result = "";

const options = document.querySelectorAll("button");
options.forEach((button) => {
    button.addEventListener("click", () => updateDisplayText(button));
});

function updateDisplayText(button) {
    if (button.id == "clear-all") {
        initialize();
        display.textContent = INITIAL_VAL;
    } else if (button.id == "backspace") {
        display.textContent = deleteChar();
    } else if ((display.textContent === INITIAL_VAL) && (firstNumber !== INITIAL_VAL)) {
        initialize();
        display.textContent = processButton(button);
    } else if ((result === firstNumber) && (chosenOperator === "") && (button.classList[0] === "numbers")) {
        initialize();
        display.textContent = INITIAL_VAL;
        display.textContent = processButton(button);
    } else {
        display.textContent = processButton(button);
    }
}

function initialize() {
    firstNumber = INITIAL_VAL;
    secondNumber = "";
    chosenOperator = "";
    DEC_BUTTON.disabled = false;
}

function processButton(button) {
    if (button.classList[0] === "operators") {
        return processOperators(button);
    } else if (button.classList[0] === "numbers") {
        return processNumbers(button);
    } else if (button.id === "decimal") {
        button.disabled = true;
        return processNumbers(button);
    }

}

function processOperators(button) {
    let new_text = display.textContent;
    if (button.id == "equals") {
        if (isEqualReady()) {
            DEC_BUTTON.disabled = false;
            new_text = calcResult();
        }
    } else {
        DEC_BUTTON.disabled = false;
        if (chosenOperator == "") {
            new_text += button.textContent;
            chosenOperator = button.id;
        } else {
            let saveOperator = chosenOperator;
            let operatorText = button.textContent;
            new_text = calcResult();
            new_text += operatorText;
            chosenOperator = saveOperator;
        }
    }
    return new_text;
}

function calcResult() {
    firstNumber = roundResult(operate(chosenOperator, Number(firstNumber), Number(secondNumber)));
    secondNumber = "";
    chosenOperator = "";
    result = firstNumber;
    return result;
}

function roundResult(number) {
    if (number % 1 != 0) {
        number = Number(number.toFixed(8));
    }
    return number;
}

function operate(operator, a, b) {
    return (operator === "add") ? add(a, b) :
        (operator === "subtract") ? subtract(a, b) :
        (operator === "multiply") ? multiply(a, b) :
        (operator === "divide") ? divide(a, b) :
        console.log("operate error");
}

const isEqualReady = () => firstNumber && secondNumber && chosenOperator ? 1 : 0;

function processNumbers(button) {
    let new_text = "";
    if (chosenOperator == "") {
        [new_text, firstNumber] = processDigit(button, firstNumber);
    } else {
        [new_text, secondNumber] = processDigit(button, secondNumber);
    }
    return new_text;
}

function processDigit(button, number) {
    let new_text = display.textContent;
    let digit = getDigit(button.id);
    if (display.textContent === INITIAL_VAL) {
        new_text = (digit === '.') ? new_text + digit : digit;
    } else {
        new_text += digit;
    }
    return [new_text, (number + digit)];
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
        (buttonID == "decimal") ? "." : console.log("getDigit error");
}

function deleteChar() {
    let currentText = display.textContent;
    lastChar = currentText[currentText.length - 1];
    let new_text = currentText.slice(0, -1);

    if (firstNumber == INITIAL_VAL) {
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

    if (new_text == "") {
        new_text = INITIAL_VAL;
    }
    return new_text;
}