window.addEventListener("DOMContentLoaded", function () {
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOUHhPhIQyhFGOCuPUH0TSfz8xTOmWEOpHjhO2-zvA5MxiFyp4Pyu4MtIALk_hG1OKUK91cCuzuDIX/pub?gid=0&single=true&output=csv',
    simpleSheet: true,
    callback: function (data) {
      const leaderboardDiv = document.getElementById("leaderboard");
      let html = "<table><thead><tr><th>Pos</th><th>Name</th><th>Car</th><th>Time</th><th>Gap</th><th>Avg Speed</th></tr></thead><tbody>";

      data.forEach((row, index) => {
        const pos = index + 1;
        const name = row['Driver Name'];
        const car = row['Car'];
        const time = row['Time'];
        const avgSpeed = row['Average Speed'];
        let gap = "-";
        if (index > 0) {
          const prevTime = parseTime(data[0]['Time']);
          const currTime = parseTime(row['Time']);
          const gapSec = (currTime - prevTime).toFixed(2);
          gap = "+" + gapSec + "s";
        }

        html += `<tr><td>${pos}</td><td>${name}</td><td>${car}</td><td>${time}</td><td>${gap}</td><td>${avgSpeed}</td></tr>`;
      });

      html += "</tbody></table>";
      leaderboardDiv.innerHTML = html;

      // Enable search
      const searchInput = document.getElementById("searchInput");
      searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        const rows = leaderboardDiv.querySelectorAll("tbody tr");

        rows.forEach(row => {
          const name = row.children[1].textContent.toLowerCase();
          row.style.display = name.includes(query) ? "" : "none";
        });
      });
    }
  });

  // Parse time like "17:32.01" to seconds
  function parseTime(timeStr) {
    const parts = timeStr.split(":");
    const minutes = parseInt(parts[0]);
    const seconds = parseFloat(parts[1]);
    return minutes * 60 + seconds;
  }
});
