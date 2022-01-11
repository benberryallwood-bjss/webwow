const form = document.getElementById("new-album-form");
const tableRow = document.getElementsByClassName("main-table-content")

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
  let { albumCell, artistCell, yearCell, newRow, iconCell } = createRowElements();

  albumCell.innerHTML = albumName;
  artistCell.innerHTML = artist;
  yearCell.innerHTML = year;

  append(newRow, albumCell, artistCell, yearCell, iconCell);
  setRowEventListeners(newRow);

  const table = document.getElementById("album-table");
  table.appendChild(newRow);
};

function append(newRow, albumCell, artistCell, yearCell, iconCell) {
    newRow.appendChild(albumCell);
    newRow.appendChild(artistCell);
    newRow.appendChild(yearCell);
    newRow.appendChild(iconCell);
}

function createRowElements() {
    let newRow = document.createElement("tr");
    let albumCell = document.createElement("td");
    let artistCell = document.createElement("td");
    let yearCell = document.createElement("td");
    let iconColumn = document.getElementById("icon-column-copy");
    let iconCell = iconColumn.cloneNode(true);
    return { albumCell, artistCell, yearCell, newRow, iconCell };
}

function setRowEventListeners(newRow) {
    newRow.classList.add("main-table-content");
    newRow.addEventListener('mouseover', showIcon);
    newRow.addEventListener('mouseout', dimIcon);
}

function showIcon(e) {
    let row = e.currentTarget;
    console.log("target", e.target);
    console.log("current target", e.currentTarget);
    let icon = row.lastElementChild.firstElementChild;

    icon.style.opacity = 1;
}

function dimIcon(e) {
    let row = e.currentTarget;
    let icon = row.lastElementChild.firstElementChild;

    icon.style.opacity = 0.2;
}

function focusRow(e) {
    let row = e.currentTarget;
    let pencilIcon = row.lastElementChild.firstElementChild;
    let crossIcon = row.lastElementChild.lastElementChild;

    if (crossIcon.style.opacity < 1) {
        crossIcon.style.opacity = 1;
    } else {
        crossIcon.style.opacity = 0.2;
    } 
}

for (let i = 0; i < tableRow.length; i++) {
    tableRow[i].addEventListener('mouseover', showIcon);
    tableRow[i].addEventListener('mouseout', dimIcon);
    tableRow[i].addEventListener('click', focusRow);
}

// function hideIcons() {
//     let icon = document.getElementById("icon");
//     icon.style.opacity = 0.2;
// }