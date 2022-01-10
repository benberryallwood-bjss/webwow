
function addAlbumToTable() {
    let row = document.createElement("tr");
    let artistName = document.createElement("td");

    artistName.innerHTML = "new artist";
    row.appendChild(artistName);

    const table = document.getElementById("album-table");
    table.appendChild(row);
}