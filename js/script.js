import { USE_STUBS } from "./config.js";

import { serverApi } from "./server-api.js";

import {
  form,
  showAlbumForm,
  hideAlbumForm,
  clearAlbumForm,
  formSubmitHandler,
} from "./form.js";

let editingId = null;

form.onsubmit = async (e) => {
  await formSubmitHandler(e, editingId);
  updateTable();
  editingId = null;
};

const addButton = document.getElementById("add-button");
const tbody = document.getElementById("album-table-body");
let data = getAlbums_stub();
let albums = data.item1;
let favYear = document.querySelector(".fav-year__year-display");

const addAlbumToData = async (album) => {
  if (USE_STUBS) {
    addAlbum_stub(album);
  } else {
    await serverApi.addAlbum(album);
  }
};

const addAlbumToTable = ({ id, artistName, albumName, albumYear }) => {
  let newRow = document.createElement("tr");
  let albumCell = document.createElement("td");
  let artistCell = document.createElement("td");
  let yearCell = document.createElement("td");
  let iconCell = document.createElement("td");
  let editIcon = document.createElement("i");
  let deleteIcon = document.createElement("i");

  editIcon.classList.add("album-table__icon", "fa", "fa-edit");
  deleteIcon.classList.add("album-table__icon", "fa", "fa-remove");
  albumCell.classList.add("album-table__data");
  artistCell.classList.add("album-table__data");
  yearCell.classList.add("album-table__data");
  iconCell.classList.add("album-table__data");

  albumCell.innerHTML = albumName;
  artistCell.innerHTML = artistName;
  yearCell.innerHTML = albumYear;

  iconCell.appendChild(editIcon);
  iconCell.appendChild(deleteIcon);

  newRow.classList.add("main-table-content");
  iconCell.classList.add("album-table__icon-column");

  newRow.id = id;

  newRow.append(albumCell, artistCell, yearCell, iconCell);

  addListenersToIcons(newRow);
  tbody.appendChild(newRow);
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

  editIcon.onclick = () => {
    editAlbum(row);
  };

  deleteIcon.onclick = () => {
    deleteAlbum(row);
  };
};

const editAlbum = (row) => {
  const currentAlbumName = row.children[0].innerText;
  const currentArtist = row.children[1].innerText;
  const currentYear = row.children[2].innerText;
  const id = row.id;
  form.children[0].value = currentAlbumName;
  form.children[1].value = currentArtist;
  form.children[2].value = currentYear;
  editingId = id;
  showAlbumForm();
};

const deleteAlbum = async (row) => {
  if (USE_STUBS) {
    deleteAlbum_stub(row.id);
  } else {
    await serverApi.deleteAlbum(row.id);
  }
  updateTable();
  updateFavYear();
};

const clearTableBody = () => {
  tbody.innerHTML = "";
};

const updateTable = async () => {
  if (USE_STUBS) {
    data = getAlbums_stub();
    albums = data.item1;
  } else {
    clearTableBody();
    albums = await serverApi.getAlbums();
    albums.forEach((album) => {
      addAlbumToTable({
        id: album.id,
        artistName: album.artist,
        albumName: album.name,
        albumYear: album.year,
      });
    });
  }
};

const updateFavYear = () => {
  if (USE_STUBS) {
    favYear.innerHTML = data.item2;
  } else {
    favYear.innerHTML = data.item2;
    // TODO implement server function
    // favYear.innerHTML = getFavouriteYear_server();
  }
};

addButton.onclick = showAlbumForm;

const onLoad = () => {
  updateTable();
  updateFavYear();
};

document.getElementById("body").onload = onLoad();
