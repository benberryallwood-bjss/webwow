import { addAlbum_server, editAlbum_server } from "./server.js";

const form = document.getElementById("new-album-form");
let editingId = null;

const showAlbumForm = () => {
  form.style.display = "inline";
};

const hideAlbumForm = () => {
  form.style.display = "none";
};

const clearAlbumForm = () => {
  form.reset();
};

const formSubmitHandler = async (e, editingId) => {
  e.preventDefault();
  hideAlbumForm();

  let albumName = document.getElementById("album-input").value;
  let artistName = document.getElementById("artist-input").value;
  let albumYear = document.getElementById("year-input").value;

  if (editingId === null) {
    if (USE_STUBS) {
      let ids = [...tbody.children].map((a) => +a.id);
      let id = `${Math.max(...ids) + 1}`;
      addAlbumToTable({ id, artistName, albumName, albumYear });
      addAlbumToData({ id, artistName, albumName, albumYear });
    } else {
      await addAlbum_server({
        artist: artistName,
        name: albumName,
        year: albumYear,
      });
      // updateTable();
    }
  } else {
    let id = editingId;
    if (USE_STUBS) {
      editAlbum_stub({ id, artistName, albumName, albumYear });
    } else {
      await editAlbum_server({
        id: id,
        artist: artistName,
        name: albumName,
        year: albumYear,
      });
      // updateTable();
    }
    editingId = null;
  }

  clearAlbumForm();
  // updateFavYear();
};

export {
  form,
  showAlbumForm,
  hideAlbumForm,
  clearAlbumForm,
  formSubmitHandler,
  editingId,
};
