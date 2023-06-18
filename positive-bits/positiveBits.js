
const args = process.argv.slice(2);

function decimalToBinary(decimal) {
  if (decimal === 0) {
    return "0";
  }

  let binary = "";
  while (decimal > 0) {
    binary = (decimal % 2) + binary;
    decimal = Math.floor(decimal / 2);
  }

  return binary;
}

function countAndPositions(n) {
  const binary = decimalToBinary(n);
  const count = [...binary].filter((bit) => bit === "1").length;
  let positions = [...binary]
    .map((bit, index) => (bit === "1" ? index : null))
    .filter((position) => position !== null);
  return [count, ...positions];
}

const n = args[1];
const binary = decimalToBinary(n);
console.log(`🚀 ${n} in binary is:`, binary);

const output = countAndPositions(n);
console.log(`The result is: ${output}`);
