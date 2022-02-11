var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { api } from './api.js';
import { form, albumInput, addButton } from './selectors.js';
const showAlbumForm = () => {
    form.style.display = 'grid';
    addButton.innerText = 'Cancel';
    albumInput.focus();
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
    }
    else {
        hideAlbumForm();
        clearAlbumForm();
    }
};
const formSubmitHandler = (e, editingId) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    hideAlbumForm();
    let albumName = form['albumName'].value;
    let artistName = form['artist'].value;
    let albumYear = form['year'].value;
    if (editingId === null) {
        yield api.addAlbum({
            artist: artistName,
            name: albumName,
            year: albumYear,
        });
    }
    else {
        yield api.editAlbum({
            id: editingId,
            name: albumName,
            artist: artistName,
            year: albumYear,
        });
    }
    clearAlbumForm();
});
export { showAlbumForm, toggleAlbumForm, hideAlbumForm, clearAlbumForm, formSubmitHandler, };
