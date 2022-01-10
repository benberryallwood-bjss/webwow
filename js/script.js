const form = document.getElementById("new-album-form");

form.onsubmit = (e) => {
  e.preventDefault();
  form.style.display = "none";

  let albumName = document.getElementById("album-input").value;
  let artist = document.getElementById("artist-input").value;
  let year = document.getElementById("year-input").value;

  addAlbumToTable(albumName, artist, year);
  form.reset();
};

function showAlbumForm() {
  form.style.display = "inline";
}

const addAlbumToTable = (albumName, artist, year) => {
  let newRow = document.createElement("tr");
  let albumCell = document.createElement("td");
  let artistCell = document.createElement("td");
  let yearCell = document.createElement("td");

  albumCell.innerHTML = albumName;
  artistCell.innerHTML = artist;
  yearCell.innerHTML = year;

  newRow.appendChild(albumCell);
  newRow.appendChild(artistCell);
  newRow.appendChild(yearCell);

  const table = document.getElementById("album-table");
  table.appendChild(newRow);
};

