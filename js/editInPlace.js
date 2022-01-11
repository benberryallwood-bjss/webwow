const getAlbumForm = (currentAlbumName = "") => {
  const albumForm = document.createElement("form");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "albumName";
  if (!(input.value = currentAlbumName)) {
    input.placeholder = "Album name";
  }

  albumForm.appendChild(input);

  return albumForm;
};

const editRow = (row) => {
  const currentAlbumName = row.children[0].innerText;
  const cell = row.children[0];

  cell.removeChild(cell.childNodes[0]);
  cell.appendChild(getAlbumForm(currentAlbumName));
};
