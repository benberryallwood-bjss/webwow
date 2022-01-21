const stubApi = {
  getAlbums: () => stubbedData,

  addAlbum: ({ name, artist, year }) => {
    let id = getMaxId() + 1;
    stubbedData.push({ id, name, artist, year });
  },

  editAlbum: ({ id, name, artist, year }) => {
    stubbedData = stubbedData.map((album) =>
      album.id == id ? { id, name, artist, year } : album
    );
  },

  deleteAlbum: (id) => {
    stubbedData = stubbedData.filter((a) => a.id != id);
  },

  getFavouriteYear: () => {
    let freqMap = {};
    stubbedData.forEach((album) => {
      if (!freqMap[album.year]++) freqMap[album.year] = 1;
    });
    let favouriteYear = Object.entries(freqMap).sort(
      (a, b) => b[1] - a[1]
    )[0][0];
    return favouriteYear;
  },
};

let stubbedData = [
  {
    id: '1',
    name: 'Illmatic',
    artist: 'Nas',
    year: '1994',
  },
  {
    id: '2',
    name: 'Ready to Die',
    artist: 'The Notorious B.I.G',
    year: '1994',
  },
  {
    id: '3',
    name: 'Soundpieces: Da Antidote',
    artist: 'Lootpack',
    year: '1998',
  },
];

const getMaxId = () => {
  return Math.max(...stubbedData.map((album) => +album.id));
};

export { stubApi };
