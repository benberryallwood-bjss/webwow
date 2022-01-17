const uri = "http://127.0.0.1:8080/albums";

const getAlbums_server = async () => {
  let response = await fetch(uri);
  let albums = await response.json();
  return albums;
};

const addAlbum_server = async ({ name, artist, year }) => {
  return await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, artist, year }),
  });
};

const editAlbum_server = async ({ id, name, artist, year }) => {
  return await fetch(`${uri}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, artist, year }),
  });
};

const deleteAlbum_server = async (id) => {
  return await fetch(`${uri}/${id}`, {
    method: "DELETE",
  });
};
