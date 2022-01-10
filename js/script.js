const form = document.getElementById("new-album-form");
const table = document.getElementById("album-table");

form.onsubmit = (e) => {
  e.preventDefault();
  form.style.display = "none";

  let albumName = document.getElementById("album-input").value;
  let artist = document.getElementById("artist-input").value;
  let year = document.getElementById("year-input").value;

  addAlbumToTable(albumName, artist, year);
  form.reset();
};

const showAlbumForm = () => {
  form.style.display = "inline";
};

const addAlbumToTable = (albumName, artist, year) => {
  let newRow = document.createElement("tr");
  let albumCell = document.createElement("td");
  let artistCell = document.createElement("td");
  let yearCell = document.createElement("td");
  let iconCell = document.createElement("td");
  let editIcon = document.createElement("i");
  let deleteIcon = document.createElement("i");

  editIcon.classList.add("icon", "fa", "fa-edit");
  deleteIcon.classList.add("icon", "fa", "fa-remove");

  albumCell.innerHTML = albumName;
  artistCell.innerHTML = artist;
  yearCell.innerHTML = year;

  iconCell.appendChild(editIcon);
  iconCell.appendChild(deleteIcon);

  newRow.classList.add("main-table-content");
  iconCell.classList.add("icon-column");

  newRow.appendChild(albumCell);
  newRow.appendChild(artistCell);
  newRow.appendChild(yearCell);
  newRow.appendChild(iconCell);

  addListenersToIcons(newRow);
  table.appendChild(newRow);
};

const addListenersToIcons = (row) => {
  let editIcon = row.children[3].firstChild;
  let deleteIcon = row.children[3].lastChild;

  row.onmouseenter = () => {
    editIcon.style.opacity = "1";
    editIcon.style.color = "#EBCB8B";
    deleteIcon.style.opacity = "1";
    deleteIcon.style.color = "#BF616A";
  };

  row.onmouseleave = () => {
    editIcon.style.opacity = "0.2";
    editIcon.style.color = "#2E3440";
    deleteIcon.style.opacity = "0.2";
    deleteIcon.style.color = "#2E3440";
  };

  editIcon.onclick = (e) => {
    const row = e.target.parentNode.parentNode;
    editAlbum(row);
  };

  deleteIcon.onclick = (e) => {
    const row = e.target.parentNode.parentNode;
    deleteAlbum(row);
  };
};

const editAlbum = (row) => {
  const currentAlbumName = row.children[0].innerText;
  const currentArtist = row.children[1].innerText;
  const currentYear = row.children[2].innerText;
  form.children[0].value = currentAlbumName;
  form.children[1].value = currentArtist;
  form.children[2].value = currentYear;
  showAlbumForm();
  deleteAlbum(row);
};

const deleteAlbum = (row) => {
  row.parentNode.removeChild(row);
};

let tableRows = [...table.children[0].children];
tableRows.shift();

tableRows.forEach((row) => {
  addListenersToIcons(row);
});

