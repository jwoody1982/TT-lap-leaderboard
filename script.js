const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOUHhPhIQyhFGOCuPUH0TSfz8xTOmWEOpHjhO2-zvA5MxiFyp4Pyu4MtIALk_hG1OKUK91cCuzuDIX/pub?gid=0&single=true&output=csv';

async function fetchCSV(url) {
  const response = await fetch(url);
  const data = await response.text();
  return data;
}

function parseCSV(data) {
  const rows = data.split('\n').map(row => row.trim().split(','));
  return rows.filter(row => row.length > 4 && row[4] !== ''); // Basic filter to remove invalid rows
}

function createTable(data) {
  const table = document.createElement('table');
  table.classList.add('leaderboard');

  const header = document.createElement('tr');
  ['#', 'Name', 'Car', 'Time', 'Gap', 'Avg Speed'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    header.appendChild(th);
  });
  table.appendChild(header);

  for (let i = 0; i < data.length; i++) {
    const row = document.createElement('tr');

    const pos = document.createElement('td');
    pos.textContent = i === 0 ? '-' : i + 1;
    row.appendChild(pos);

    const name = document.createElement('td');
    name.textContent = data[i][4];
    row.appendChild(name);

    const car = document.createElement('td');
    car.textContent = data[i][5];
    row.appendChild(car);

    const time = document.createElement('td');
    time.textContent = data[i][7];
    row.appendChild(time);

    const gap = document.createElement('td');
    if (i === 0) {
      gap.textContent = '-';
    } else {
      const gapMs = timeToMs(data[i][7]) - timeToMs(data[i - 1][7]);
      gap.textContent = `+${msToTime(gapMs)}`;
    }
    row.appendChild(gap);

    const speed = document.createElement('td');
    speed.textContent
