function cellLeftClickHandler(elCell) {
  // first checks:
  const { row, col, cell } = getCellFromElement(elCell, gBoard);
  if (gGame.isOver) return;
  if (cell.isShown) return;
  if (!gGame.isOn) startGame(elCell);
  if (gGame.isPeeking) return;
  if (gGame.isHintMode) {
    peek(elCell, gBoard);
    return;
  }
  addToHistory();

  // actions:
  cell.isShown = true;
  if (cell.isMine) {
    popFromHistory();
    gGame.lives--;
    renderLives(gGame.lives);
    if (!gGame.lives) {
      gameOver(false);
      return;
    }
    peekLifeLost(elCell, gBoard);
    return;
  }

  //(if we reached here, we assume cell is a blank square)
  if (!cell.minesAroundCount) {
    expandShown(gBoard, row, col);
  } else {
    updateScore(1);
  }
  renderBoard(gBoard);
  checkWin(gBoard);
}

function cellRightClickHandler(event, elCell) {
  event.preventDefault();
  addToHistory();

  // first checks:
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
    updateScore(1);
  }
  const cellNegsIndexes = getIndexOfNegs(board, row, col);

  for (const cellNegIndex of cellNegsIndexes) {
    const { i, j } = cellNegIndex;
    const cell = board[i][j];
    if (cell.isShown || cell.isMine || cell.isMarked) {
      continue;
    }
    if (!cell.minesAroundCount) {
      expandShown(board, i, j);
      continue;
    }
    cell.isShown = true;
    updateScore(1);
  }
}

function updateScore(diff) {
  gGame.score += diff;
  renderScore(gGame.score);
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
