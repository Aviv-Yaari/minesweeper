function cellLeftClickHandler(elCell) {
  // first checks:
  const { row, col, cell } = getCellFromElement(elCell, gBoard);
  if (gGame.isOver) return;
  if (cell.isShown) return;
  if (!gGame.isOn) startGame(elCell);
  if (gGame.isPeeking) return;

  // actions:
  cell.isShown = true;

  if (cell.isMine) {
    gGame.lives--;
    renderLives(gGame.lives);
    if (!gGame.lives) {
      gameOver(false);
      return;
    }
    peek(elCell, gBoard);
    return;
  }

  //(if we reached here, we assume cell is a blank square)
  if (!cell.minesAroundCount) {
    expandShown(gBoard, row, col);
  }
  updateScore(1);
  renderBoard(gBoard);
  checkWin(gBoard);
}

function cellRightClickHandler(event, elCell) {
  // first checks:
  event.preventDefault();
  const { cell } = getCellFromElement(elCell, gBoard);
  if (gGame.isOver) return;
  if (cell.isShown && !cell.isMarked) return;
  if (gGame.isPeeking) return;

  // actions: (if we reached here, we assume cell is a blank square)
  cell.isShown = !cell.isShown; // flip visibility
  cell.isMarked = !cell.isMarked; // flip mark
  renderBoard(gBoard);
  checkWin(gBoard);
}

function getIndexOfNegs(board, row, col) {
  const res = [];
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      // Check if out of bounds:
      if (i < 0 || j < 0 || i >= board.length || j >= board[0].length || (i === row && j === col))
        continue;
      // otherwise, add to res array:
      res.push({ i, j });
    }
  }
  return res;
}

function getCellFromElement(element, board) {
  const row = parseInt(element.dataset.row);
  const col = parseInt(element.dataset.col);
  const cell = board[row][col];
  return { row, col, cell };
}

function expandShown(board, row, col) {
  const cell = board[row][col];
  if (!cell.minesAroundCount) {
    cell.isShown = true;
  }
  const cellNegsIndexes = getIndexOfNegs(board, row, col);
  // emptyNegs is an array of cells that have no mines around them,
  // and are also not shown, marked or mines. (empty)
  const emptyNegsIndexes = cellNegsIndexes.filter((cellIndex) => {
    const cell = board[cellIndex.i][cellIndex.j];
    return !cell.minesAroundCount && !cell.isShown && !cell.isMine && !cell.isMarked;
  });

  for (const emptyNegIndex of emptyNegsIndexes) {
    const { i, j } = emptyNegIndex;
    expandShown(board, i, j);
  }
}

function updateScore(diff) {
  gGame.score += diff;
  renderScore(gGame.score);
}
