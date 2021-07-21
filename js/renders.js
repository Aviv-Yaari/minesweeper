function renderBoard(board) {
  // debugger;
  let strHTML = '<table border="0"><tbody>';
  for (let i = 0; i < board.length; i++) {
    strHTML += '<tr>';
    for (let j = 0; j < board[0].length; j++) {
      const cell = board[i][j];
      const cellDisplay = getCellDisplay(cell);
      const shownClass = cell.isShown ? 'shown' : '';
      strHTML += `<td class="cell ${shownClass}" data-row="${i}" data-col="${j}" 
      onclick="cellLeftClickHandler(this)" 
      oncontextmenu="cellRightClickHandler(event, this)">${cellDisplay}</td>`;
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  const elContainer = document.querySelector('.table-container');
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

  return cell.minesAroundCount;
}

function renderScore(score) {
  const elScore = document.querySelector('.score');
  elScore.textContent = score;
}

function renderLogo(type) {
  const elLogo = document.querySelector('.logo');
  switch (type) {
    case 'LOST':
      elLogo.textContent = '😭';
      break;
    case 'WON':
      elLogo.textContent = '😎';
      break;
    case 'ACTIVE':
      elLogo.textContent = '😀';
      break;
    case 'LOST LIFE':
      elLogo.textContent = '😰';
      break;
    default:
      break;
  }
}

function renderLives(amount) {
  const elLives = document.querySelector('.lives');
  elLives.textContent = '';
  for (let i = 0; i < amount; i++) {
    elLives.textContent += '♥';
  }
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
