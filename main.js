let currentValue = "";
let previousValue = "";
let operator = "";
document.addEventListener("DOMContentLoaded", () => {
    //select all buttons
    const clearBtn = document.querySelector(".clear");
    const equal = document.querySelector(".equal");
    const decimal = document.querySelector(".decimal");
    const numbers = document.querySelectorAll(".number");
    const operators = document.querySelectorAll(".operator");
    const previousScreen = document.querySelector(".previous");
    const currentScreen = document.querySelector(".current");

    //display the user chosen input on the current screnn
    numbers.forEach(numb => numb.addEventListener("click", (e) => {
        handleNumber(e.target.textContent)
        currentScreen.textContent = currentValue;
    }));

    operators.forEach(op => op.addEventListener("click", (e) => {
        if (currentValue != "") {
            handleOperator(e.target.textContent);
            previousScreen.textContent = previousValue + " " + operator;
            currentScreen.textContent = currentValue;
        }
    }));

    clearBtn.addEventListener("click", () => {
        previousScreen.textContent = "";
        currentScreen.textContent = "";
        previousValue = "";
        currentValue = "";
        operator = "";
    })

    equal.addEventListener("click", () => {
        if (previousValue != "" && currentValue != "") {
            calculate();
            previousScreen.textContent = "";
            currentScreen.textContent = previousValue;
        }
    })

    decimal.addEventListener("click", () => {
        if (!currentValue.includes(".")) {
            currentValue += ".";
        }
        currentScreen.textContent = currentValue;
    })

    //handle cases when keyboard, instead of on screen buttons, is used
    document.addEventListener("keydown", (event) => {
        const keyPressed = event.key;
        console.log(keyPressed);
        if (isFinite(keyPressed) || keyPressed === ".") {
            currentValue += keyPressed;
            currentScreen.textContent = currentValue;
        }
        if (keyPressed === "+" || keyPressed === "-" || keyPressed === "*" || keyPressed === "/") {
            if (currentValue === "") return

            previousValue = currentValue;
            operator = keyPressed;
            currentValue = "";
            previousScreen.textContent = previousValue + " " + operator;
            currentScreen.textContent = "";
        }

        if (keyPressed === "Enter" || keyPressed === "=") {
            calculate();
            previousScreen.textContent = "";
            currentScreen.textContent = previousValue;
        }

        if (keyPressed === "c" || keyPressed === "C") {
            previousScreen.textContent = "";
            currentScreen.textContent = "";
            previousValue = "";
            currentValue = "";
            operator = "";
        }
    })
});

function handleNumber(num) {
    if (currentValue.length <= 14) {
        currentValue += num;
    }
}

function handleOperator(op) {
    operator = op;
    previousValue = currentValue;
    currentValue = ""
}

function calculate() {
    currentValue = Number(currentValue);
    previousValue = Number(previousValue);
    switch (operator) {
        case "+":
            previousValue += currentValue;
            break;
        case "-":
            previousValue -= currentValue;
            break;
        case "*":
            previousValue *= currentValue;
            break;
        case "/":
            previousValue /= currentValue;
            break;
    }
    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
}

function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}