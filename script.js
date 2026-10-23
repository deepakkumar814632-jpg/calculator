
const display = document.getElementById("display");

let currentValue = "0";
let previousValue = null;
let selectedOperator = null;
let waitingForNumber = false;

function updateDisplay() {
    display.value = currentValue;
}

function appendValue(value) {
    if (currentValue === "Error") {
        currentValue = "0";
        waitingForNumber = false;
    }

    if (waitingForNumber) {
        currentValue = value === "." ? "0." :
                       value === "00" ? "0" : value;
        waitingForNumber = false;
        updateDisplay();
        return;
    }

    if (value === ".") {
        if (!currentValue.includes(".")) {
            currentValue += ".";
        }
    } else if (currentValue === "0") {
        currentValue = value === "00" ? "0" : value;
    } else {
        currentValue += value;
    }

    updateDisplay();
}

function chooseOperator(operator) {
    if (currentValue === "Error") return;

    const number = Number(currentValue);

    if (previousValue !== null &&
        selectedOperator !== null &&
        !waitingForNumber) {
        calculate();
    }

    previousValue = Number(currentValue);
    selectedOperator = operator;
    waitingForNumber = true;
}

function calculate() {
    if (previousValue === null ||
        selectedOperator === null ||
        waitingForNumber) {
        return;
    }

    const a = previousValue;
    const b = Number(currentValue);
    let result;

    switch (selectedOperator) {
        case "+":
            result = a + b;
            break;

        case "-":
            result = a - b;
            break;

        case "*":
            result = a * b;
            break;

        case "/":
            result = b === 0 ? NaN : a / b;
            break;

        case "%":
            result = b === 0 ? NaN : a % b;
            break;

        default:
            return;
    }

    if (!Number.isFinite(result)) {
        currentValue = "Error";
    } else {
        currentValue = String(
            Number(result.toPrecision(12))
        );
    }

    previousValue = null;
    selectedOperator = null;
    waitingForNumber = true;
    updateDisplay();
}

function clearDisplay() {
    currentValue = "0";
    previousValue = null;
    selectedOperator = null;
    waitingForNumber = false;
    updateDisplay();
}

function deleteLast() {
    if (currentValue === "Error") {
        clearDisplay();
        return;
    }

    if (waitingForNumber) return;

    currentValue = currentValue.length > 1
        ? currentValue.slice(0, -1)
        : "0";

    if (currentValue === "-") currentValue = "0";

    updateDisplay();
}

updateDisplay();
