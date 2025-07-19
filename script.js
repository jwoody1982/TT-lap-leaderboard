const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOUHhPhIQyhFGOCuPUH0TSfz8xTOmWEOpHjhO2-zvA5MxiFyp4Pyu4MtIALk_hG1OKUK91cCuzuDIX/pubhtml';

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    simpleSheet: true,
    callback: showInfo,
    parseNumbers: true
  });
}

function showInfo(data) {
  const container = document.getElementById('leaderboard');
  container.innerHTML = ''; // clear
  const table = document.createElement('table');
  table.classList.add('leaderboard');

  // Header
  const header = document.createElement('tr');
  ['#','Name','Car','Time','Gap','Avg Speed'].forEach(h => {
    const th = document.createElement('th');
    th.textContent = h;
    header.appendChild(th);
  });
  table.appendChild(header);

  let prevMs = null;
  data.forEach((row, idx) => {
    const tr = document.createElement('tr');

    // Position
    const posTd = document.createElement('td');
    posTd.textContent = idx + 1;
    tr.appendChild(posTd);

    // Name, Car, Time, Speed
    ['Name','Car','Time','Avg Speed'].forEach(field => {
      const td = document.createElement('td');
      td.textContent = row[field] || '-';
      tr.appendChild(td);
    });

    // Gap calculation
    const gapTd = document.createElement('td');
    if (idx === 0) {
      gapTd.textContent = '-';
    } else {
      const currMs = timeToMs(row['Time']);
      const diff = currMs - prevMs;
      gapTd.textContent = '+' + msToTime(diff);
      prevMs = currMs;
    }
    if (idx === 0) prevMs = timeToMs(data[0]['Time']);
    tr.insertBefore(gapTd, tr.children[tr.children.length - 1]);
    
    table.appendChild(tr);
  });

  container.appendChild(table);
}

function timeToMs(t) {
  const [m, rest] = t.split(':');
  const [s, ms] = rest.split('.');
  return (+m * 60 + +s) * 1000 + (+ms);
}

function msToTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  const c = Math.floor((ms % 1000) / 10);
  return `${m}:${String(s).padStart(2,'0')}.${String(c).padStart(2,'0')}`;
}

window.addEventListener('DOMContentLoaded', init);
