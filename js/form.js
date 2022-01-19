import { api } from "./api.js";

const form = document.getElementById("new-album-form");
const addButton = document.getElementById("add-button");

const showAlbumForm = () => {
  form.style.display = "inline";
  addButton.innerText = "Cancel";
};

const hideAlbumForm = () => {
  form.style.display = "none";
  addButton.innerText = "Add Album";
};

const clearAlbumForm = () => {
  form.reset();
};

const toggleAlbumForm = () => {
  if (form.style.display == "none") {
    showAlbumForm();
  } else {
    hideAlbumForm();
    clearAlbumForm();
  }
};

const formSubmitHandler = async (e, editingId) => {
  e.preventDefault();
  hideAlbumForm();

  let albumName = document.getElementById("album-input").value;
  let artistName = document.getElementById("artist-input").value;
  let albumYear = document.getElementById("year-input").value;

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
  form,
  addButton,
  showAlbumForm,
  toggleAlbumForm,
  hideAlbumForm,
  clearAlbumForm,
  formSubmitHandler,
};
