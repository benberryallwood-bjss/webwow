import { api } from './api.js';
import {
  body,
  favouriteYear,
  // tbody,
  form,
  addButton,
  toTopButton,
  noAlbumsHeading,
  favouriteYearHeading,
  albumsSection
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
  let tile = document.createElement('div');
  let albumName = document.createElement('h2');
  let artistName = document.createElement('p');
  let albumYear = document.createElement('p');
  let iconColumn = document.createElement('div');
  let editButton = document.createElement('button');
  let editIcon = document.createElement('i');
  let deleteButton = document.createElement('button');
  let deleteIcon = document.createElement('i');

  editIcon.classList.add('fa', 'fa-edit');
  deleteIcon.classList.add('fa', 'fa-remove');

  albumName.innerHTML = name;
  artistName.innerHTML = artist;
  albumYear.innerHTML = year;

  editButton.appendChild(editIcon);
  deleteButton.appendChild(deleteIcon);
  iconColumn.append(editButton, deleteButton);

  deleteButton.onclick = () => {
    deleteAlbum(id);
  }

  editButton.onclick = () => {
    editAlbum(tile);
  }

  tile.append(albumName, artistName, albumYear, iconColumn);
  tile.dataset.id = id;

  albumsSection.appendChild(tile);
};

const editAlbum = (tile) => {
  const currentAlbumName = tile.children[0].innerText;
  const currentArtist = tile.children[1].innerText;
  const currentYear = tile.children[2].innerText;
  const id = tile.dataset.id;
  
  form['albumName'].value = currentAlbumName;
  form['artist'].value = currentArtist;
  form['year'].value = currentYear;
  editingId = id;
  showAlbumForm();
  window.scrollTo(top);
}

const deleteAlbum = async (id) => {
  await api.deleteAlbum(id);
  updateTable();
  updateFavouriteYear();
}

const clearTableBody = () => {
  albumsSection.innerHTML = '';
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
  if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
    toTopButton.classList.add('to-top-btn--visible');
  } else {
    toTopButton.classList.remove('to-top-btn--visible');
  }
};

body.onload = () => {
  updateTable();
  updateFavouriteYear();
  addButton.style.display = 'inline-block';
  form.style.display = 'none';
};
