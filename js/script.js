function addAlbumToTable() {
  let newRow = document.createElement("tr");
  let albumName = document.createElement("td");
  let artistName = document.createElement("td");
  let year = document.createElement("td");

  artistName.innerHTML = "new artist";
  albumName.innerHTML = "new album";
  year.innerHTML = "year";

  newRow.appendChild(albumName);
  newRow.appendChild(artistName);
  newRow.appendChild(year);

  const table = document.getElementById("album-table");
  table.appendChild(newRow);
}

