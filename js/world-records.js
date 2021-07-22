const DB_URL = 'https://minesweeper-records-12264-default-rtdb.europe-west1.firebasedatabase.app';

async function getWorldRecords() {
  const response = await fetch(`${DB_URL}/records.json`);
  if (!response.ok) {
    gRecords = {};
  } else {
    gRecords = await response.json();
  }
  renderWorldRecords(gRecords);
}

async function checkWorldRecord(level, time) {
  await getWorldRecords();
  if (time < gRecords[level].time) {
    showRecordModal();
    return true;
  }
  return false;
}

function renderWorldRecords(records) {
  let strHTML = `<tr>
    <th>Name</th>
    <th>Time</th>
    <th>Level</th>
    </tr>`;
  for (const level in records) {
    if (Object.hasOwnProperty.call(records, level)) {
      const record = records[level];
      strHTML += '<tr>';
      strHTML += `<td class="records-cell">${record.name}</td>`;
      strHTML += `<td class="records-cell">${record.time}</td>`;
      strHTML += `<td class="records-cell">${level}</td>`;
      strHTML += '</tr>';
    }
  }
  const elTable = document.querySelector('.records-table');
  elTable.innerHTML = strHTML;
}

async function submitRecord(event) {
  event.preventDefault();
  const name = event.target.recordName.value;
  const time = gGame.secsPassed;
  const level = gLevel.name;
  const response = await fetch(`${DB_URL}/records/${level}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, time }),
  });
  gRecords[level] = await response.json();
  hideRecordModal();
  renderWorldRecords(gRecords);
}

function showRecordModal() {
  const elRecordModal = document.querySelector('.record-modal');
  elRecordModal.classList.remove('hidden');
  const elOverlay = document.querySelector('.overlay');
  elOverlay.classList.remove('hidden');
}

function hideRecordModal() {
  const elRecordModal = document.querySelector('.record-modal');
  elRecordModal.classList.add('hidden');
  const elOverlay = document.querySelector('.overlay');
  elOverlay.classList.add('hidden');
}
