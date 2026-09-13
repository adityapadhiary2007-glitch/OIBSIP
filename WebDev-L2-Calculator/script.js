const display = document.getElementById("display");
const keys = document.getElementById("keys");

keys.addEventListener("click", function (e) {
    if (!e.target.matches("button")) return;

    const key = e.target.dataset.key;

    if (key === "C") {
        display.value = "";
    } 
    else if (key === "back") {
        display.value = display.value.slice(0, -1);
    } 
    else if (key === "=") {
        calculate();
    } 
    else {
        display.value += key;
    }
});

function calculate() {
    try {
        if (!display.value) return;

        const result = solve(display.value);

        if (!isFinite(result)) throw Error();

        display.value = result;
    } catch {
        display.value = "Error";
    }
}

function solve(expression) {
    const numbers = expression.split(/[-+*/]/).map(Number);
    const operators = expression.match(/[-+*/]/g) || [];

    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "*" || operators[i] === "/") {
            let result;

            if (operators[i] === "*")
                result = numbers[i] * numbers[i + 1];
            else
                result = numbers[i] / numbers[i + 1];

            numbers.splice(i, 2, result);
            operators.splice(i, 1);
            i--;
        }
    }

    let result = numbers[0];

    operators.forEach((op, i) => {
        if (op === "+") result += numbers[i + 1];
        if (op === "-") result -= numbers[i + 1];
    });

    return result;
}