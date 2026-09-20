const display = document.getElementById("display");

function appendNumber(number) {
    if (display.value === "0") {
        display.value = number;
    } else {
        display.value += number;
    }
}

function appendOperator(operator) {
    const lastCharacter = display.value.slice(-1);

    if ("+-*/%".includes(lastCharacter)) {
        return;
    }

    display.value += operator;
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {
    if (display.value.length === 1) {
        display.value = "0";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    try {
        const expression = display.value;

        if (!expression) {
            return;
        }

        const result = Function("return " + expression)();

        if (!Number.isFinite(result)) {
            display.value = "Error";
            return;
        }

        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function(event) {

    if (!isNaN(event.key)) {
        appendNumber(event.key);
    }

    if ("+-*/%".includes(event.key)) {
        appendOperator(event.key);
    }

    if (event.key === "Enter") {
        calculate();
    }

    if (event.key === "Escape") {
        clearDisplay();
    }

    if (event.key === "Backspace") {
        deleteLast();
    }

});