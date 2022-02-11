import { Api } from './Api.js';

const baseUri = 'http://127.0.0.1:8080';
const albumsUri = `${baseUri}/albums`;
const yearUri = `${baseUri}/favourite-year`;

const serverApi: Api = {
  getAlbums: async () => {
    let response = await fetch(albumsUri);
    let albums = await response.json();
    return albums;
  },

  addAlbum: async ({ name, artist, year }) => {
    await fetch(albumsUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, artist, year }),
    });
  },

  editAlbum: async ({ id, name, artist, year }) => {
    await fetch(`${albumsUri}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, artist, year }),
    });
  },

  deleteAlbum: async (id) => {
    await fetch(`${albumsUri}/${id}`, {
      method: 'DELETE',
    });
  },

  getFavouriteYear: async () => {
    let response = await fetch(yearUri);
    let favouriteYear = await response.json();
    return favouriteYear;
  },
};

export { serverApi };
