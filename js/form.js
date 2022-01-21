import { api } from './api.js';
import { form, addButton } from './selectors.js';

const showAlbumForm = () => {
  form.style.display = 'grid';
  addButton.innerText = 'Cancel';
};

const hideAlbumForm = () => {
  form.style.display = 'none';
  addButton.innerText = 'Add Album';
};

const clearAlbumForm = () => {
  form.reset();
};

const toggleAlbumForm = () => {
  if (form.style.display == 'none') {
    showAlbumForm();
  } else {
    hideAlbumForm();
    clearAlbumForm();
  }
};

const formSubmitHandler = async (e, editingId) => {
  e.preventDefault();
  hideAlbumForm();

  let albumName = form['albumName'].value;
  let artistName = form['artist'].value;
  let albumYear = form['year'].value;

  if (editingId === null) {
    await api.addAlbum({
      artist: artistName,
      name: albumName,
      year: albumYear,
    });
  } else {
    await api.editAlbum({
      id: editingId,
      name: albumName,
      artist: artistName,
      year: albumYear,
    });
  }

  clearAlbumForm();
};

export {
  showAlbumForm,
  toggleAlbumForm,
  hideAlbumForm,
  clearAlbumForm,
  formSubmitHandler,
};
