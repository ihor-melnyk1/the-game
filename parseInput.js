const fs = require('fs');

function parseInputFile(filePath) {

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split('\n').filter((str) => str.trim());

  const testCases = [];

  for (let i = 1; i < lines.length; i += 19) {
    // Extract board data for each test case
    const boardData = lines.slice(i, i + 19).map((line) => line.split(' ').map(Number));
    testCases.push(boardData);
  }
  return testCases;
}

module.exports = parseInputFile