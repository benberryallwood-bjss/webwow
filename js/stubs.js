const stubbedData = {
  item1: [
    {
      id: "1",
      artistName: "Nas",
      albumName: "Illmatic",
      albumYear: "1994",
    },
    {
      id: "2",
      artistName: "The Notorious B.I.G",
      albumName: "Ready to Die",
      albumYear: "1994",
    },
    {
      id: "3",
      artistName: "Lootpack",
      albumName: "Soundpieces: Da Antidote",
      albumYear: "1998",
    },
  ],
  item2: "1994",
};

const getAlbums_stub = () => stubbedData;

const addAlbum_stub = (album) => {
  stubbedData.item1.push(album);
  recalculateFavouriteYear();
};

const editAlbum_stub = (album) => {
  stubbedData.item1 = stubbedData.item1.map((a) =>
    a.id == album.id ? album : a
  );
  recalculateFavouriteYear();
};

const deleteAlbum_stub = (id) => {
  stubbedData.item1 = stubbedData.item1.filter((a) => a.id != id);
  recalculateFavouriteYear();
};

const recalculateFavouriteYear = () => {
  let years = stubbedData.item1.map((a) => a.albumYear);
  let freqs = {};
  for (let year of years) {
    if (!freqs[year]++) freqs[year] = 1;
  }
  let favouriteYear = Object.entries(freqs).sort((a, b) => b[1] - a[1])[0][0];
  stubbedData.item2 = favouriteYear;
};
