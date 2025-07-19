document.addEventListener("DOMContentLoaded", function () {
  fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQOUHhPhIQyhFGOCuPUH0TSfz8xTOmWEOpHjhO2-zvA5MxiFyp4Pyu4MtIALk_hG1OKUK91cCuzuDIX/pub?gid=0&single=true&output=csv")
    .then(response => response.text())
    .then(csv => {
      const lines = csv.trim().split("\n");
      const leaderboard = document.getElementById("leaderboard");

      // Optionally show headers (optional)
      const headerRow = document.createElement("div");
      headerRow.className = "entry header";
      headerRow.innerHTML = `
        <div class="position">Pos</div>
        <div class="name">Name</div>
        <div class="car">Car</div>
        <div class="time">Time</div>
        <div class="speed">Avg Speed</div>
      `;
      leaderboard.appendChild(headerRow);

      // Start from line 1 (skip actual CSV headers)
      lines.slice(1).forEach((line, index) => {
        const cols = line.split(",");

        if (cols.length >= 9) {
          const position = index + 1;
          const name = cols[4].trim();
          const car = cols[5].trim();
          const time = cols[7].trim();
          const speed = cols[8].trim();

          const row = document.createElement("div");
          row.className = "entry";
          row.innerHTML = `
            <div class="position">#${position}</div>
            <div class="name">${name}</div>
            <div class="car">${car}</div>
            <div class="time">${time}</div>
            <div class="speed">${speed}</div>
          `;
          leaderboard.appendChild(row);
        }
      });
    });
});
