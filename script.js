fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQOUHhPhIQyhFGOCuPUH0TSfz8xTOmWEOpHjhO2-zvA5MxiFyp4Pyu4MtIALk_hG1OKUK91cCuzuDIX/pub?gid=0&single=true&output=csv')
.then(response => response.text())
.then(csv => {
    const rows = csv.trim().split('\n').slice(1); // skip header
    const data = rows.map(row => row.split(','));
    data.sort((a, b) => a[2].localeCompare(b[2])); // sort by lap time
    const tbody = document.querySelector("#leaderboard tbody");
    data.forEach((row, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${i + 1}</td><td>${row[0]}</td><td>${row[2]}</td>`;
        tbody.appendChild(tr);
    });
});
