let gGame;
const gLevels = [
  { name: 'Beginner', size: 4, mines: 2 },
  { name: 'Medium', size: 8, mines: 12 },
  { name: 'Expert', size: 12, mines: 30 },
];
let gLevel;
let gBoard = [];
let gIntervalTimer;
const EMPTY = '';
const MINE = '🧨';
const FLAG = '🚩';

function pageLoad() {
  renderLevels(gLevels);
  initGame();
}

function initGame() {
  gGame = { isOn: false, isOver: false, secsPassed: 0, score: 0, lives: 3, isPeeking: false };
  gLevel = getSelectedLevel();
  clearInterval(gIntervalTimer);
  gBoard = buildBoard(gLevel.size, gLevel.size);
  renderBoard(gBoard);
  renderScore(0);
  renderTimer(0);
  renderLogo('ACTIVE');
  renderLives(3);
}

function startGame(elCellClicked) {
  gGame.isOn = true;
  placeMines(gBoard, elCellClicked);
  setMinesNegsCount(gBoard);
  renderBoard(gBoard);
  activateTimer();
}

function buildBoard(rows, cols) {
  const board = [];
  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < cols; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      };
    }
  }
  return board;
}

function activateTimer() {
  const timerStart = Date.now();
  let diff;
  gIntervalTimer = setInterval(() => {
    diff = parseInt((Date.now() - timerStart) / 1000);
    renderTimer(diff);
    gGame.secsPassed = diff;
  }, 500);
}

function placeMines(board, elCellClicked) {
  // elCellClicked is the cell the user clicked on to start the game.
  // The function creates an array of all the board positions;
  // For every mine to be assigned, it takes a random location from the board positions array
  // and changes the board content in this position to MINE.
  // (This process is needed becuase we want to be certain that the same board position
  //  doesn't get randomized twice)
  const { row: clickedRow, col: clickedCol } = getCellFromElement(elCellClicked, board);
  const boardPositions = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (i === clickedRow && j === clickedCol) continue;
      boardPositions.push({ i, j });
    }
  }

  for (let i = 0; i < gLevel.mines; i++) {
    // (For every mine that needs to be placed on the board):
    const randIndex = Math.floor(Math.random() * (boardPositions.length - 1));
    const randBoardPos = boardPositions.splice(randIndex, 1)[0];
    board[randBoardPos.i][randBoardPos.j].isMine = true;
    console.log('Mine at:', randBoardPos.i, randBoardPos.j);
  }
}

function getSelectedLevel() {
  const elLevels = document.querySelectorAll('.level');
  for (const elLevel of elLevels) {
    if (elLevel.checked) {
      return gLevels[elLevel.id];
    }
  }
  // if nothing found - return default first level:
  return gLevels[0];
}

function setMinesNegsCount(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      const cellNegsIndexes = getIndexOfNegs(board, i, j);
      const minesNegsCount = cellNegsIndexes.filter((cell) => board[cell.i][cell.j].isMine).length;
      cell.minesAroundCount = minesNegsCount;
    }
  }
}
