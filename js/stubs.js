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

const getAlbums_stub = () => {
  return stubbedData;
};

const addAlbum_stub = (album) => {
  stubbedData.item1.push(album);
};

const editAlbum_stub = (album) => {
  let oldAlbum = stubbedData.item1.find((a) => a.id == album.id);
  oldAlbum = { ...album };
};
