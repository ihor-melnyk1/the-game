const fs = require('fs');

function parseInputFile(filePath) {

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n').filter((str) => str.trim());

  const testCases = [];
  const gameLength = 19;
  for (let i = 1; i < lines.length; i += gameLength) {
    // Extract board data for each test case
    const boardData = lines.slice(i, i + gameLength).map((line) => line.split(' ').map(Number));
    testCases.push(boardData);
  }
  return testCases;
}

module.exports = parseInputFile