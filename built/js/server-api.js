var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUri = 'http://127.0.0.1:8080';
const albumsUri = `${baseUri}/albums`;
const yearUri = `${baseUri}/favourite-year`;
const serverApi = {
    getAlbums: () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield fetch(albumsUri);
        let albums = yield response.json();
        return albums;
    }),
    addAlbum: ({ name, artist, year }) => __awaiter(void 0, void 0, void 0, function* () {
        yield fetch(albumsUri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, artist, year }),
        });
    }),
    editAlbum: ({ id, name, artist, year }) => __awaiter(void 0, void 0, void 0, function* () {
        yield fetch(`${albumsUri}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, artist, year }),
        });
    }),
    deleteAlbum: (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield fetch(`${albumsUri}/${id}`, {
            method: 'DELETE',
        });
    }),
    getFavouriteYear: () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield fetch(yearUri);
        let favouriteYear = yield response.json();
        return favouriteYear;
    }),
};
export { serverApi };
