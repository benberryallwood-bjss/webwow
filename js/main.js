import { api } from './api.js';
import {
  body,
  favouriteYear,
  tbody,
  form,
  addButton,
  toTopButton,
  noAlbumsHeading,
  favouriteYearHeading,
} from './selectors.js';
import { showAlbumForm, toggleAlbumForm, formSubmitHandler } from './form.js';

let albums;
let editingId = null;

form.onsubmit = async (e) => {
  await formSubmitHandler(e, editingId);
  updateTable();
  updateFavouriteYear();
  editingId = null;
};

const addAlbumToTable = ({ id, artist, name, year }) => {
  let newRow = document.createElement('tr');
  let albumCell = document.createElement('td');
  let artistCell = document.createElement('td');
  let yearCell = document.createElement('td');
  let iconCell = document.createElement('td');
  let editIcon = document.createElement('i');
  let deleteIcon = document.createElement('i');

  editIcon.classList.add('album-table__icon', 'fa', 'fa-edit');
  deleteIcon.classList.add('album-table__icon', 'fa', 'fa-remove');
  albumCell.classList.add('album-table__data');
  artistCell.classList.add('album-table__data');
  yearCell.classList.add('album-table__data');
  iconCell.classList.add('album-table__data');

  albumCell.innerHTML = name;
  artistCell.innerHTML = artist;
  yearCell.innerHTML = year;

  iconCell.appendChild(editIcon);
  iconCell.appendChild(deleteIcon);

  newRow.classList.add('main-table-content');
  iconCell.classList.add('album-table__icon-column');

  newRow.id = id;
  // TODO Add data attributes
  // newRow.dataset.id = id;

  newRow.append(albumCell, artistCell, yearCell, iconCell);

  addListenersToIcons(newRow);
  tbody.appendChild(newRow);
};

const addListenersToIcons = (row) => {
  let editIcon = row.children[3].firstChild;
  let deleteIcon = row.children[3].lastChild;

  row.onmouseenter = () => {
    editIcon.style.opacity = '1';
    editIcon.style.color = '#EBCB8B';
    deleteIcon.style.opacity = '1';
    deleteIcon.style.color = '#BF616A';
  };

  row.onmouseleave = () => {
    editIcon.style.opacity = '0.2';
    editIcon.style.color = '#2E3440';
    deleteIcon.style.opacity = '0.2';
    deleteIcon.style.color = '#2E3440';
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
  // TODO data attributes
  // const id = row.dataset.id
  form['albumName'].value = currentAlbumName;
  form['artist'].value = currentArtist;
  form['year'].value = currentYear;
  editingId = id;
  showAlbumForm();
  window.scrollTo(top);
};

const deleteAlbum = async (row) => {
  await api.deleteAlbum(row.id);
  // TODO data attributes
  // await api.deleteAlbum(row.dataset.id);
  updateTable();
  updateFavouriteYear();
};

const clearTableBody = () => {
  tbody.innerHTML = '';
};

const updateTable = async () => {
  clearTableBody();
  albums = await api.getAlbums();
  albums.forEach((album) => {
    addAlbumToTable(album);
  });
};

const updateFavouriteYear = async () => {
  let year = await api.getFavouriteYear();
  if (year) {
    favouriteYear.innerText = year;
    favouriteYearHeading.style.display = 'inline';
    noAlbumsHeading.style.display = 'none';
  } else {
    favouriteYearHeading.style.display = 'none';
    noAlbumsHeading.style.display = 'inline';
  }
};

addButton.onclick = () => {
  editingId = null;
  toggleAlbumForm();
};

toTopButton.onclick = () => {
  window.scrollTo(top);
};

window.onscroll = () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    toTopButton.style.display = 'block';
  } else {
    toTopButton.style.display = 'none';
  }
};

body.onload = () => {
  updateTable();
  updateFavouriteYear();
  form.style.display = 'none';
  toTopButton.style.display = 'none';
};
