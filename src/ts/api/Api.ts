interface Api {
  getAlbums: () => Promise<Array<any>>;

  addAlbum: ({
    name,
    artist,
    year,
  }: {
    name: string;
    artist: string;
    year: string;
  }) => Promise<void>;

  editAlbum: ({
    id,
    name,
    artist,
    year,
  }: {
    id: number;
    name: string;
    artist: string;
    year: string;
  }) => Promise<void>;

  deleteAlbum: (id: number) => Promise<void>;

  getFavouriteYear: () => Promise<string>;
}

export { Api };
