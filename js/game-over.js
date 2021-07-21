function checkWin(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      if ((cell.isMine && !cell.isMarked) || (!cell.isMine && cell.isMarked) || !cell.isShown) {
        return false;
      }
    }
  }
  gameOver(true);
  renderLogo('WON');
  return true;
}

function gameOver(isWon) {
  gGame.isOver = true;
  clearInterval(gIntervalTimer);
  renderLogo('LOST');
  if (isWon) {
    console.log('Win!');
  } else {
    console.log('Lose!');
    showMines(gBoard);
  }
  disableAllCells();
}

function showMines(board) {
  const mineCells = findCellsByKey('isMine', board);
  for (const mineCell of mineCells) {
    const { i, j } = mineCell;
    board[i][j].isShown = true;
  }
  renderBoard(board);
}

// Find cells in board
function findCellsByKey(key, board) {
  const res = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const currCell = board[i][j];
      if (currCell[key]) {
        // if this cell is marked as true for the key given
        res.push({ i, j });
      }
    }
  }
  return res;
}