const body: HTMLBodyElement = document.getElementById(
  'body'
) as HTMLBodyElement;

const favouriteYearHeading: HTMLElement = document.getElementById(
  'favourite-year-text'
) as HTMLElement;

const favouriteYear: HTMLSpanElement = document.getElementById(
  'favourite-year'
) as HTMLSpanElement;

const noAlbumsHeading: HTMLElement = document.getElementById(
  'no-albums-heading'
) as HTMLElement;

const addButton: HTMLButtonElement = document.getElementById(
  'add-button'
) as HTMLButtonElement;

const form: HTMLFormElement = document.getElementById(
  'new-album-form'
) as HTMLFormElement;

const albumInput: HTMLInputElement = document.getElementById(
  'album-input'
) as HTMLInputElement;

const albumsSection: HTMLElement = document.getElementById(
  'albums'
) as HTMLElement;

const toTopButton: HTMLButtonElement = document.getElementById(
  'to-top-button'
) as HTMLButtonElement;

export {
  body,
  favouriteYearHeading,
  favouriteYear,
  noAlbumsHeading,
  addButton,
  form,
  albumInput,
  albumsSection,
  toTopButton,
};
