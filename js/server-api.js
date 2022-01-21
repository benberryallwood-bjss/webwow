const baseUri = 'http://127.0.0.1:8080';
const uri = 'http://127.0.0.1:8080/albums';

const serverApi = {
  getAlbums: async () => {
    let response = await fetch(uri);
    let albums = await response.json();
    return albums;
  },

  addAlbum: async ({ name, artist, year }) => {
    return await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, artist, year }),
    });
  },

  editAlbum: async ({ id, name, artist, year }) => {
    return await fetch(`${uri}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, artist, year }),
    });
  },

  deleteAlbum: async (id) => {
    return await fetch(`${uri}/${id}`, {
      method: 'DELETE',
    });
  },

  getFavouriteYear: async () => {
    let response = await fetch(baseUri + '/favourite-year');
    let favouriteYear = await response.json();
    return favouriteYear;
  },
};

export { serverApi };
