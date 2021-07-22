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
    checkWorldRecord(gLevel.name, gGame.secsPassed);
  } else {
    showMines(gBoard);
  }
}

function showMines(board) {
  const mineCells = findCellsByKey('isMine', board);
  for (const mineCell of mineCells) {
    const { i, j } = mineCell;
    board[i][j].isShown = true;
  }
  renderBoard(board);
}
