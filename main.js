let displayArea = document.querySelector("#display-area-text");
let resetButton = document.querySelector("#reset");
let negation = document.querySelector("#negation");
let percentage = document.querySelector("#percentage");
let division = document.querySelector("#division");
let multiplication = document.querySelector("#multiplication");
let subtraction = document.querySelector("#subtraction");
let addition = document.querySelector("#addition");
let equals = document.querySelector("#equals");
let decimalPoint = document.querySelector("#decimal");
let digits = document.querySelectorAll(".digit");

let operand1;
let operand2;
let currentOperation;

function reset() {
  operand1 = "";
  operand2 = "";
  currentOperation = null;
  displayArea.innerHTML = "0";
}

function operate() {
  switch (currentOperation) {
    case "addition":
      return Number(operand1) + Number(operand2);
    case "subtraction":
      return Number(operand1) - Number(operand2);
    case "multiplication":
      return Number(operand1) * Number(operand2);
    case "division":
      return Number(operand1) / Number(operand2);
  }
}

function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

resetButton.addEventListener("click", () => {
  reset();
});

digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    if (digit.textContent.includes("0") && displayArea.textContent == "0") {
      return;
    }
    if (operand2 == "" && currentOperation == null) {
      if (operand1.length >= 6) {
        return;
      }
      operand1 += digit.textContent.trim();
      displayArea.textContent = formatNumber(operand1);
    } else if (currentOperation != null) {
      if (operand2.length >= 6) {
        return;
      }
      operand2 += digit.textContent.trim();
      displayArea.textContent = formatNumber(operand2);
    }
  });
});

equals.addEventListener("click", () => {
  if (operand1 && operand2) {
    const result = operate();
    reset();
    displayArea.innerHTML = formatNumber(result);
  }
});

negation.addEventListener("click", () => {
  if (operand2) {
    operand2 = "-" + operand2;
    displayArea.innerHTML = formatNumber(operand2);
  } else if (operand1) {
    operand1 = "-" + operand1;
    displayArea.innerHTML = formatNumber(operand1);
  }
});

function handleOperationClick(setOperation) {
  return () => {
    if (!operand1 && displayArea.innerHTML != "0") {
      operand1 = displayArea.innerHTML;
    }
    if (!operand1 && !operand2 && currentOperation == null) {
      return;
    }
    if (operand1 && operand2) {
      operand1 = operate();
      operand2 = "";
      displayArea.innerHTML = formatNumber(operand1);
    }
    setOperation();
  };
}

addition.addEventListener(
  "click",
  handleOperationClick(() => (currentOperation = "addition"))
);

subtraction.addEventListener(
  "click",
  handleOperationClick(() => (currentOperation = "subtraction"))
);

multiplication.addEventListener(
  "click",
  handleOperationClick(() => (currentOperation = "multiplication"))
);

division.addEventListener(
  "click",
  handleOperationClick(() => (currentOperation = "division"))
);

function main() {
  reset();
}

main();
