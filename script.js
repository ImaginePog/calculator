const numberBtns = document.querySelectorAll(".number-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const resultBtn = document.querySelector("#result-btn");
const floatBtn = document.querySelector("#float-btn");

const clearBtn = document.querySelector("#clear-btn");
const removeBtn = document.querySelector("#remove-btn");

const display = document.querySelector(".display");
const history = document.querySelector(".display-history");

let left = "";
let buffer = null;
let currOperator = "";
let ans = "";
let onDisplay = false;

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function product(a, b) {
	return a * b;
}

function divide(a, b) {
	if (b === 0) {
		alert("cannot divide by 0!!");
		clear();
	} else {
		return a / b;
	}
}

function operate(a, b, operator) {
	let result;
	switch (operator) {
		case "+":
			result = add(a, b);
			break;
		case "-":
			result = subtract(a, b);
			break;
		case "*":
			result = product(a, b);
			break;
		case "/":
			result = divide(a, b);
			break;
	}

	return parseFloat(result.toFixed(2));
}

function clear() {
	clearBuffer();
	left = null;
	right = null;
	currOperator = null;
	onOperate = false;
	onDisplay = false;

	history.textContent = "0";
	display.textContent = "0";
}

function numberListener(e) {
	if (onDisplay) {
		clear();
	}

	const number = e.target.textContent;

	if (buffer) {
		buffer += number;
	} else {
		buffer = number;
	}

	if (onOperate) history.textContent += number;
	else history.textContent = buffer;
}

function clearBuffer() {
	buffer = null;
}

let onOperate = false;
function operatorListener(e) {
	if (!onOperate) {
		currOperator = e.target.textContent;

		if (onDisplay) {
			left = parseFloat(ans);
			onDisplay = false;
		} else left = parseFloat(buffer);

		clearBuffer();
		onOperate = true;
	} else {
		if (buffer) {
			left = operate(parseFloat(left), parseFloat(buffer), currOperator);
			clearBuffer();
			currOperator = e.target.textContent;

			display.textContent = left;
		} else {
			currOperator = e.target.textContent;
		}
	}

	history.textContent = left + currOperator;
}

function resultListener(e) {
	if (!onDisplay) {
		onOperate = false;
		ans = operate(parseFloat(left), parseFloat(buffer), currOperator);
		clearBuffer();

		display.textContent = ans;

		onDisplay = true;
	}
}

function makeFloat() {
	if (buffer.includes(".")) return;
	else {
		buffer += ".";
		history.textContent += ".";
	}
}

function remove() {
	if (!onDisplay) {
		if (buffer) {
			buffer = buffer.split("");
			buffer.pop();
			buffer = buffer.join("");

			if (buffer === "") {
				clearBuffer();
			}
		} else if (currOperator) {
			currOperator = null;
			onOperate = false;
			buffer = String(left);
			left = "";
		}

		let str = history.textContent;
		str = str.split("");
		str.pop();
		str = str.join("");

		if (str === "" || str === "0") str = "0";

		history.textContent = str;
	}
}

numberBtns.forEach((button) => {
	button.addEventListener("click", numberListener);
});

operatorBtns.forEach((button) => {
	button.addEventListener("click", operatorListener);
});

resultBtn.addEventListener("click", resultListener);

floatBtn.addEventListener("click", makeFloat);

clearBtn.addEventListener("click", clear);

removeBtn.addEventListener("click", remove);
