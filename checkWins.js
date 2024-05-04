function checkHorizontalWins(board) {
  const size = board.length;

  for (let i = 0; i < size; i++) {
    let countBlack = 0;
    let countWhite = 0;
    let winner = 0;

    for (let j = 0; j < size; j++) {
      if (board[i][j] === 1) {
        countBlack++;
        countWhite = 0;
      } else if (board[i][j] === 2) {
        countWhite++;
        countBlack = 0;
      } else {
        countBlack = 0;
        countWhite = 0;
      }

      if (countBlack === 5) {
        winner = 1;
        return { winner, row: i + 1, col: j - 4 + 1 }; // j-4 for leftmost stone
      } else if (countWhite === 5) {
        winner = 2;
        return { winner, row: i + 1, col: j - 4 + 1 };
      }
    }
  }

  return 0; // No horizontal winner found
}

function checkVerticalWins(board) {
  const size = board.length;

  for (let j = 0; j < size; j++) {
    let countBlack = 0;
    let countWhite = 0;
    let winner = 0;

    for (let i = 0; i < size; i++) {
      if (board[i][j] === 1) {
        countBlack++;
        countWhite = 0; 
      } else if (board[i][j] === 2) {
        countWhite++;
        countBlack = 0;
      } else {
        countBlack = 0;
        countWhite = 0;
      }

      if (countBlack === 5) {
        winner = 1;
        return { winner, row: i - 4 + 1, col: j + 1 }; // i-4 for topmost stone
      } else if (countWhite === 5) {
        winner = 2;
        return { winner, row: i - 4 + 1, col: j + 1 };
      }
    }
  }

  return 0; // No vertical winner found
}

function checkDiagonalWins(board) {
  const size = board.length;
  // Check for diagonal wins from top left to bottom right
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let countBlack = 0;
      let countWhite = 0;
      let winner = 0;
      for (let k = 0; k < Math.min(size - i, size - j); k++) {
        if (board[i + k][j + k] === 1) {
          countBlack++;
          countWhite = 0;
        } else if (board[i + k][j + k] === 2) {
          countWhite++;
          countBlack = 0;
        } else {
          countBlack = 0;
          countWhite = 0;
        }

        if (countBlack === 5) {
          winner = 1;
          return { winner, row: i + k - 4 + 1, col: j + k - 4 + 1 }; // top-left stone
        } else if (countWhite === 5) {
          winner = 2;
          return { winner, row: i + k - 4 + 1, col: j + k - 4 + 1 }; // top-left stone
        }
      }
    }
  }

  // Check for diagonal wins from bottom left to top right
  for (let i = size - 1; i >= 0; i--) {
    for (let j = 0; j < size; j++) {
      let countBlack = 0;
      let countWhite = 0;
      let winner = 0;

      for (let k = 0; k <= Math.min(i, j); k++) {
        if (board[i - k][j + k] === 1) {
          countBlack++;
          countWhite = 0;
        } else if (board[i - k][j + k] === 2) {
          countWhite++;
          countBlack = 0;
        } else {
          countBlack = 0;
          countWhite = 0;
        }

        if (countBlack === 5) {
          winner = 1;
          return { winner, row: i - k + 4 + 1, col: j + k - 4 + 1 }; // bottom-left stone
        } else if (countWhite === 5) {
          winner = 2;
          return { winner, row: i - k + 4 + 1, col: j + k - 4 + 1 }; // bottom-left stone
        }
      }
    }
  }

  return 0; // No diagonal winner found
}

function checkWinner(board) {
  
  let result = checkHorizontalWins(board);
  if (result !== 0) {
    return result; // Horizontal winner found
  }
  
  result = checkVerticalWins(board);
  if (result !== 0) {
    return result; // Vertical winner found
  }

  // Check for diagonal wins
  result = checkDiagonalWins(board);
  if (result !== 0) {
    return result; // Vertical winner found
  }

  return 0; // No winner found
}

module.exports = checkWinner