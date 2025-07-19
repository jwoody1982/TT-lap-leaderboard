document.addEventListener("DOMContentLoaded", function () {
  fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQOUHhPhIQyhFGOCuPUH0TSfz8xTOmWEOpHjhO2-zvA5MxiFyp4Pyu4MtIALk_hG1OKUK91cCuzuDIX/pub?gid=0&single=true&output=csv")
    .then(response => response.text())
    .then(csv => {
      const lines = csv.trim().split("\n");
      const leaderboard = document.getElementById("leaderboard");

      // Header row
      const headerRow = document.createElement("div");
      headerRow.className = "entry header";
      headerRow.innerHTML = `
        <div class="position">Pos</div>
        <div class="name">Name</div>
        <div class="car">Car</div>
        <div class="time">Time</div>
        <div class="gap">Gap to Next</div>
        <div class="speed">Avg Speed</div>
      `;
      leaderboard.appendChild(headerRow);

      // Parse all driver data
      const driverData = lines.slice(1).map((line, index) => {
        const cols = line.split(",");
        return {
          position: index + 1,
          name: cols[4].trim(),
          car: cols[5].trim(),
          time: cols[7].trim(),
          speed: cols[8].trim()
        };
      });

      // Convert time string to seconds
      const timeToSeconds = (timeStr) => {
        const parts = timeStr.split(":");
        const minutes = parseInt(parts[0], 10);
        const seconds = parseFloat(parts[1]);
        return minutes * 60 + seconds;
      };

      // Loop and add rows
      driverData.forEach((driver, index) => {
        let gap = "–";
        if (index < driverData.length - 1) {
          const currentTime = timeToSeconds(driver.time);
          const nextTime = timeToSeconds(driverData[index + 1].time);
          const diff = nextTime - currentTime;
          gap = diff > 0 ? `+${diff.toFixed(2)}s` : "–";
        }

        const row = document.createElement("div");
        row.className = "entry";
        row.innerHTML = `
          <div class="position">#${driver.position}</div>
          <div class="name">${driver.name}</div>
          <div class="car">${driver.car}</div>
          <div class="time">${driver.time}</div>
          <div class="gap">${gap}</div>
          <div class="speed">${driver.speed}</div>
        `;
        leaderboard.appendChild(row);
      });
    });
});
