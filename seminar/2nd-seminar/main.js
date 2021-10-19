const calculator = require("./calculator");

const addResult = calculator.add(3, 5);
const subResult = calculator.substract(3, 5);
const mulResult = calculator.multifly(3, 5);
const divResult = calculator.divide(3, 5);
console.log(
  `add: ${addResult}, subResult: ${subResult}, mulResult: ${mulResult}, divResult: ${divResult}`
);
