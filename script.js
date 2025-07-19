fetch('data.csv')
  .then(response => response.text())
  .then(text => {
    const rows = text.trim().split('\n').slice(1); // skip header
    const leaderboard = rows.map(row => {
      const cols = row.split('\t');
      return {
        position: cols[1],
        name: cols[4],
        car: cols[5],
        time: cols[7],
        speed: cols[8]
      };
    });

    const container = document.querySelector('.leaderboard');

    // Add header row
    container.innerHTML += `
      <div class="entry header">
        <div class="position">Pos</div>
        <div class="name">Driver</div>
        <div class="car">Car</div>
        <div class="time">Time</div>
        <div class="gap">Gap</div>
        <div class="speed">Speed</div>
      </div>
    `;

    function parseTime(t) {
      const [mins, secs] = t.split(':');
      return parseFloat(mins) * 60 + parseFloat(secs);
    }

    leaderboard.forEach((entry, i) => {
      let gapToAbove = '-';
      if (i > 0) {
        const currentTime = parseTime(entry.time);
        const aboveTime = parseTime(leaderboard[i - 1].time);
        const gap = currentTime - aboveTime;
        gapToAbove = `+${gap.toFixed(2)}s`;
      }

      const html = `
        <div class="entry">
          <div class="position">${entry.position}</div>
          <div class="name">${entry.name}</div>
          <div class="car">${entry.car}</div>
          <div class="time">${entry.time}</div>
          <div class="gap">${gapToAbove}</div>
          <div class="speed">${entry.speed}</div>
        </div>
      `;
      container.innerHTML += html;
    });
  });

        leaderboard.appendChild(row);
      });
    });
});
