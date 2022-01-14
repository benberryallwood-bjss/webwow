const uri = "http://localhost:8080/albums";

const getAlbums_server = async () => {
  let albumsJson = await fetch(uri);
  let albums = await albumsJson.json();
  return albums;
  // fetch(uri, { method: "GET" })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // console.log(data);
  //     // console.log(typeof data);
  //     // data.forEach((album) => console.log(album));
  //     return data;
  //   })
  //   .catch((error) => console.error("Unable to get albums", error));
};

const addAlbum_server = ({ id, name, artist, year }) => {};

const editAlbum_server = ({ id, name, artist, year }) => {};

const deleteAlbum_server = (id) => {};
