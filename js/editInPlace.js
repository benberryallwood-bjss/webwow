const getAlbumForm = (currentAlbumName = "") => {
  const albumForm = document.createElement("form");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "albumName";

  input.value = currentAlbumName;
  if (input.value == "") {
    input.placeholder = "Album name";
  }

  if (!(input.value = currentAlbumName)) {
    input.placeholder = "Album name";
  }

  albumForm.appendChild(input);

  return albumForm;
};

const editRow = (row) => {
  const currentAlbumName = row.children[0].innerText;
  const cell = row.children[0];

  if (cell.firstChild) cell.removeChild(cell.firstChild);

  newForm = getAlbumForm(currentAlbumName);
  newForm.onsubmit = (e) => {
    e.preventDefault();
    cell.innerText = newForm["albumName"].value;
  };

  cell.appendChild(newForm);
};

// table.children[1].children[0].onclick = () => {
//   editRow(table.children[1].children[0]);
// };
