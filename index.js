const checkWinner = require("./checkWins");
const parseInputFile = require("./parseInput");

const testCases = parseInputFile('input.txt');
for (const testCase of testCases) {
  const result = checkWinner(testCase);
  if(result === 0) {
    console.log(0)
  } else {
    console.log(result.winner);
    console.log(result.row, result.col)
  }
  console.log('\n')
}