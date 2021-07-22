function renderBoard(board) {
  const disabledClass = gGame.isOver || gGame.isPeeking ? 'disabled' : '';
  const colorClasses = ['', 'blue', 'green', 'red', 'darkblue'];
  let strHTML = '<table class="board" border="0"><tbody>';
  for (let i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (let j = 0; j < board[0].length; j++) {
      const cell = board[i][j];
      const cellDisplay = getCellDisplay(cell);
      const shownClass = cell.isShown ? 'shown' : '';
      const colorClass = !cell.isMarked && !cell.isMine ? colorClasses[cell.minesAroundCount] : '';
      strHTML += `<td class="cell ${shownClass} ${disabledClass} ${colorClass}" data-row="${i}" data-col="${j}" 
      onclick="cellLeftClickHandler(this)" 
      oncontextmenu="cellRightClickHandler(event, this)"
      ondragover="tableDragOver(event)" ondrop="tableDrop(event)"
      >${cellDisplay}</td>`;
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  const elContainer = document.querySelector('.board-container');
  elContainer.innerHTML = strHTML;
}

function getCellDisplay(cell) {
  if (!cell.isShown) {
    return EMPTY;
  }
  if (cell.isMarked) {
    return FLAG;
  }
  if (cell.isMine) {
    return MINE;
  }

  return cell.minesAroundCount === 0 ? '' : cell.minesAroundCount;
}

function renderScore(score) {
  const elScore = document.querySelector('.score');
  elScore.textContent = score;
}

function renderLogo(type) {
  const elLogo = document.querySelector('.logo');
  let strHTML = '<span class="tooltiptext">Start Game</span>';
  switch (type) {
    case 'LOST':
      strHTML += '😭';
      break;
    case 'WON':
      strHTML += '😎';
      break;
    case 'ACTIVE':
      strHTML += '😀';
      break;
    case 'LOST LIFE':
      strHTML += '😰';
      break;
    default:
      break;
  }
  elLogo.innerHTML = strHTML;
}

function renderTimer(time) {
  const elTimer = document.querySelector('.timer');
  elTimer.textContent = time;
}

function renderLevels(levels) {
  const elLevelsContainer = document.querySelector('.levels-container');
  let strHTML = '';
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    strHTML +=
      `<input type="radio" name="levels" class="level" id="${i}" ${i === 0 && 'checked'}>` +
      `<label for="${i}">${level.name}</label> `;
  }
  elLevelsContainer.innerHTML = strHTML;
}

function renderLives(amount) {
  const elLives = document.querySelector('.lives');
  if (!amount) {
    elLives.innerHTML = '';
    return;
  }
  let strHTML = '<span class="tooltiptext">Lives Left</span>';
  for (let i = 0; i < amount; i++) {
    strHTML += '♥';
  }
  elLives.innerHTML = strHTML;
}

function renderHints(amount) {
  const elHints = document.querySelector('.hints');
  if (!amount) {
    elHints.innerHTML = '';
    return;
  }
  let strHTML = '<span class="tooltiptext">Hints</span>';
  for (let i = 0; i < amount; i++) {
    const onClick = !gGame.isHintMode ? 'onclick=startHintMode()' : '';
    strHTML += `<span class="hint" ${onClick}>💡</span>`;
  }
  elHints.innerHTML = strHTML;
}

function renderSafeClicks(amount) {
  const elSafeClicks = document.querySelector('.safe-clicks');
  if (!amount) {
    elSafeClicks.innerHTML = '';
    return;
  }
  let onClick = '';
  let strHTML = '<span class="tooltiptext">Safe Clicks</span>';
  for (let i = 0; i < amount; i++) {
    if (!gGame.isPeeking && gGame.isOn) {
      onClick = 'onclick=startSafeClickMode()';
    }
    strHTML += `<span class="safe-click" ${onClick}>🔎</span>`;
  }
  elSafeClicks.innerHTML = strHTML;
}

function renderManualMines(amount) {
  const elManualMines = document.querySelector('.manual-mines');
  if (!amount) {
    elManualMines.innerHTML = '';
    return;
  }
  let onClick = '';
  let strHTML = '<span class="tooltiptext"> Manually Assign Mines </span>';
  for (let i = 0; i < amount; i++) {
    if (!gGame.isPeeking && gGame.isOn) {
      onClick = 'onclick=startSafeClickMode()';
    }
    strHTML += `<span
    class="manual-mine"
    draggable="true"
    ondragstart="manualMineDragStart(event, this)"
    ondragend="manualMineDragEnd(event, this)">🧨</span>`;
  }
  elManualMines.innerHTML = strHTML;
}

function renderUndo(isVisible) {
  const elUndoContainer = document.querySelector('.undo-container');
  let onClick = '';
  let strHTML = '<span class="tooltiptext">Undo</span>';
  if (
    !isVisible ||
    !gGame.isOn ||
    gGame.isOver ||
    gBoardHistory.length <= 1 ||
    gGameHistory.length <= 1
  ) {
    elUndoContainer.innerHTML = '';
    return;
  }

  onClick = 'onclick=undo()';
  strHTML += `<span class="undo" ${onClick}>⏪</span>`;
  elUndoContainer.innerHTML = strHTML;
}
