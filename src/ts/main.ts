import { api } from './api/ApiImpl.js';
import {
  body,
  favouriteYear,
  form,
  addButton,
  toTopButton,
  noAlbumsHeading,
  favouriteYearHeading,
  albumsSection,
} from './selectors.js';
import { showAlbumForm, toggleAlbumForm, formSubmitHandler } from './form.js';

let albums: Array<{ id: number; name: string; artist: string; year: string }>;
let editingId: number | null = null;

form.onsubmit = async (e: SubmitEvent): Promise<void> => {
  await formSubmitHandler(e, editingId);
  updateTable();
  updateFavouriteYear();
  editingId = null;
};

const addAlbumToTable = ({
  id,
  artist,
  name,
  year,
}: {
  id: number;
  artist: string;
  name: string;
  year: string;
}) => {
  let tile: HTMLDivElement = document.createElement('div');
  let albumName: HTMLHeadingElement = document.createElement('h2');
  let artistName: HTMLParagraphElement = document.createElement('p');
  let albumYear: HTMLParagraphElement = document.createElement('p');
  let iconColumn: HTMLDivElement = document.createElement('div');
  let editButton: HTMLButtonElement = document.createElement('button');
  let editIcon: HTMLElement = document.createElement('i');
  let deleteButton: HTMLButtonElement = document.createElement('button');
  let deleteIcon: HTMLElement = document.createElement('i');

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
  };

  editButton.onclick = () => {
    editAlbum(tile);
  };

  tile.append(albumName, artistName, albumYear, iconColumn);
  tile.dataset.id = id.toString();

  albumsSection.appendChild(tile);
};

const editAlbum = (tile: HTMLDivElement): void => {
  const currentAlbumName: string = (tile.children[0] as HTMLElement).innerText;
  const currentArtist: string = (tile.children[1] as HTMLElement).innerText;
  const currentYear: string = (tile.children[2] as HTMLElement).innerText;
  const id: number = +tile.dataset.id!;

  form['albumName'].value = currentAlbumName;
  form['artist'].value = currentArtist;
  form['year'].value = currentYear;
  editingId = id;
  showAlbumForm();
  window.scroll(0, 0);
};

const deleteAlbum = async (id: number): Promise<void> => {
  await api.deleteAlbum(id);
  updateTable();
  updateFavouriteYear();
};

const clearTableBody = (): void => {
  albumsSection.innerHTML = '';
};

const updateTable = async (): Promise<void> => {
  clearTableBody();
  albums = await api.getAlbums();
  albums.forEach((album) => {
    addAlbumToTable(album);
  });
};

const updateFavouriteYear = async (): Promise<void> => {
  let year: string = await api.getFavouriteYear();
  if (year) {
    favouriteYear.innerText = year;
    favouriteYearHeading.style.display = 'inline';
    noAlbumsHeading.style.display = 'none';
  } else {
    favouriteYearHeading.style.display = 'none';
    noAlbumsHeading.style.display = 'inline';
  }
};

addButton.onclick = (): void => {
  editingId = null;
  toggleAlbumForm();
};

toTopButton.onclick = (): void => {
  window.scroll(0, 0);
};

window.onscroll = (): void => {
  if (
    document.body.scrollTop > 250 ||
    document.documentElement.scrollTop > 250
  ) {
    toTopButton.classList.add('to-top-btn--visible');
  } else {
    toTopButton.classList.remove('to-top-btn--visible');
  }
};

body.onload = (): void => {
  updateTable();
  updateFavouriteYear();
  addButton.style.display = 'inline-block';
  form.style.display = 'none';
};
