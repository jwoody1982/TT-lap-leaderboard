window.addEventListener('DOMContentLoaded', () => {
  const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOUHhPhIQyhFGOCuPUH0TSfz8xTOmWEOpHjhO2-zvA5MxiFyp4Pyu4MtIALk_hG1OKUK91cCuzuDIX/pub?gid=0&single=true&output=csv';

  Papa.parse(publicSpreadsheetUrl, {
    download: true,
    header: false,
    complete: function(results) {
      const data = results.data;
      const leaderboard = document.getElementById('leaderboard');
      if (!leaderboard) return;

      let html = '<table><thead><tr><th>Pos</th><th>Name</th><th>Car</th><th>Time</th><th>Gap</th><th>Avg Speed</th></tr></thead><tbody>';

      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row.length < 8) continue;

        const pos = row[1];
        const name = row[4];
        const car = row[5];
        const time = row[7];
        const speed = row[8];
        const gap = i === 1 ? '-' : calcGap(data[1][7], row[7]);

        html += `<tr>
          <td>${pos}</td>
          <td>${name}</td>
          <td>${car}</td>
          <td>${time}</td>
          <td>${gap}</td>
          <td>${speed}</td>
        </tr>`;
      }

      html += '</tbody></table>';
      leaderboard.innerHTML = html;
    }
  });

  function calcGap(firstTime, currentTime) {
    const toSeconds = t => {
      const [min, sec] = t.split(':');
      const [whole, frac = '0'] = sec.split('.');
      return parseInt(min) * 60 + parseInt(whole) + parseFloat(`0.${frac}`);
    };
    const gap = toSeconds(currentTime) - toSeconds(firstTime);
    return `+${gap.toFixed(2)}s`;
  }
});
