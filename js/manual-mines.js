function manualMineDragStart(event, elManualMine) {
  elManualMine.classList.add('dragging');
  event.dataTransfer.dropEffect = 'move';
}
function manualMineDragEnd(event, elManualMine) {
  elManualMine.classList.remove('dragging');
}

function tableDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function tableDrop(event) {
  event.preventDefault();
  event.target.textContent = MINE;
}
