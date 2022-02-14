import { api } from './api/ApiImpl.js';
import { form, albumInput, addButton } from './selectors.js';

const showAlbumForm = (): void => {
  form.style.display = 'grid';
  addButton.innerText = 'Cancel';
  albumInput.focus();
};

const hideAlbumForm = (): void => {
  form.style.display = 'none';
  addButton.innerText = 'Add Album';
};

const clearAlbumForm = (): void => {
  form.reset();
};

const toggleAlbumForm = (): void => {
  if (form.style.display == 'none') {
    showAlbumForm();
  } else {
    hideAlbumForm();
    clearAlbumForm();
  }
};

const formSubmitHandler = async (e: SubmitEvent, editingId: number | null): Promise<void> => {
  e.preventDefault();
  hideAlbumForm();

  let albumName: string = form['albumName'].value;
  let artistName: string = form['artist'].value;
  let albumYear: string = form['year'].value;

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
