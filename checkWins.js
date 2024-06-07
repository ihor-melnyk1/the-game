const matchesToWin = 5;
const leftMostIndex = matchesToWin - 1;

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

      const winnerObj = { winner, row: i + 1, col: j - leftMostIndex + 1 }
      if (countBlack === matchesToWin) {
        winner = 1;
        return winnerObj;
      } else if (countWhite === matchesToWin) {
        winner = 2;
        return winnerObj
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

      const winnerObj = { winner, row: i - leftMostIndex + 1, col: j + 1 }
      if (countBlack === matchesToWin) {
        winner = 1;
        return winnerObj; // i-leftMostIndex for topmost stone
      } else if (countWhite === matchesToWin) {
        winner = 2;
        return winnerObj;
      }
    }
  }

  return 0; // No vertical winner found
}

const diagoanalCondition = (i, j, k, state, board, target) => {
  const colIndex = target === 'bottom' ? (i + k) : (i - k);
 
  
  if (board[colIndex][j + k] === 1) {
    state.countBlack++;
    state.countWhite = 0;
  } else if (board[colIndex][j + k] === 2) {
    state.countWhite++;
    state.countBlack = 0;
  } else {
    state.countBlack = 0;
    state.countWhite = 0;
  }

  const topLeftIndex = target === 'bottom' ?  (k - leftMostIndex) : (leftMostIndex - k);
  const winnerObj  = { winner: state.winner, row: i + topLeftIndex + 1, col: j + k - leftMostIndex + 1 }
  if (state.countBlack === matchesToWin) {
    state.winner = 1;
    return winnerObj; // top-left stone
  } else if (state.countWhite === matchesToWin) {
    state.winner = 2;
    return winnerObj; // top-left stone
  }
  else return 0;

}

function checkDiagonalWins(board) {
  const size = board.length;
  // Check for diagonal wins from top left to bottom right
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const state = {
        countBlack: 0,
        countWhite: 0,
        winner: 0,
      };
      for (let k = 0; k < Math.min(size - i, size - j); k++) {
        const conditionRes = diagoanalCondition(i,j,k,state,board, 'bottom');
        if(conditionRes === 0) {
          continue;
        } else {
          return conditionRes;
        }
      }
    }
  }

  // Check for diagonal wins from bottom left to top right
  for (let i = size - 1; i >= 0; i--) {
    for (let j = 0; j < size; j++) {
      const state = {
        countBlack: 0,
        countWhite: 0,
        winner: 0,
      };
      for (let k = 0; k <= Math.min(i, j); k++) {
        const conditionRes = diagoanalCondition(i,j,k,state,board, 'top');
        if(conditionRes === 0) {
          continue;
        } else {
          return conditionRes;
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