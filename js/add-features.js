function peek(elCell, board) {
  const { cell } = getCellFromElement(elCell, board);
  gGame.isPeeking = true;
  cell.isShown = true;
  renderLogo('LOST LIFE');
  renderBoard(board);
  disableAllCells();

  setTimeout(() => {
    cell.isShown = false;
    gGame.isPeeking = false;
    renderBoard(board);
    renderLogo('ACTIVE');
  }, 1000);
}

function disableAllCells() {
  const elCells = document.querySelectorAll('.cell');
  for (const elCell of elCells) {
    elCell.classList.add('disabled');
  }
}
