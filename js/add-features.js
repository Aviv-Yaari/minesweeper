function peekLifeLost(elCell, board) {
  const { cell } = getCellFromElement(elCell, board);
  gGame.isPeeking = true;
  cell.isShown = true;
  renderLogo('LOST LIFE');
  renderBoard(board);

  setTimeout(() => {
    cell.isShown = false;
    gGame.isPeeking = false;
    renderBoard(board);
    renderLogo('ACTIVE');
  }, 1000);
}

function startHintMode() {
  gGame.isHintMode = true;
  gGame.hints--;
  renderHints(gGame.hints);
  renderUndo(false);
  renderSafeClicks(0);
}

function endHintMode() {
  gGame.isHintMode = false;
  renderHints(gGame.hints);
  renderUndo(true);
  renderSafeClicks(gGame.safeClicks);
}

function startSafeClickMode() {
  gGame.safeClicks--;
  renderSafeClicks(gGame.safeClicks);
  const targetCells = findSafeCells(gBoard);
  if (!targetCells.length) return;
  const randomIndex = Math.floor(Math.random() * (targetCells.length - 1));
  const chosenCell = targetCells.splice(randomIndex, 1)[0];
  const { i, j } = chosenCell;
  const elCell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
  peek(elCell, gBoard);
}

function findSafeCells(board) {
  const res = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      if (!cell.isShown && cell.minesAroundCount && !cell.isMine) {
        res.push({ i, j });
      }
    }
  }
  return res;
}

function peek(elCell, board) {
  gGame.isPeeking = true;
  const { cell } = getCellFromElement(elCell, board);
  cell.isShown = true;
  renderBoard(board);
  setTimeout(() => {
    gGame.isPeeking = false;
    cell.isShown = false;
    endHintMode();
    renderBoard(board);
  }, 1000);
}

function undo() {
  if (gGame.isPeeking || !gGame.isOn || gGame.isOver) return;
  if (gGameHistory.length <= 1 || gBoardHistory.length <= 1) return;
  popFromHistory();
  renderBoard(gBoard);
  renderScore(gGame.score);
  renderTimer(gGame.secsPassed);
  renderLives(gGame.lives);
  renderUndo(true);
}

function addToHistory() {
  gBoardHistory.push(copyMat(gBoard));
  gGameHistory.push({ ...gGame });
  renderUndo(true);
}

function popFromHistory() {
  const previousGameState = gGameHistory.splice(gGameHistory.length - 1, 1)[0];
  const previousBoardState = gBoardHistory.splice(gBoardHistory.length - 1, 1)[0];
  gGame = { ...gGame, score: previousGameState.score, isPeeking: false, isHintMode: false };
  gBoard = copyMat(previousBoardState);
  renderUndo(true);
}
