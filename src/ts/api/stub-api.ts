import { Api } from './Api.js';

const stubApi: Api = {
  getAlbums: async () => {
    return stubbedData.sort((album1, album2) => {
      // Sort by artist, ignoring case
      let artist1 = album1.artist.toUpperCase();
      let artist2 = album2.artist.toUpperCase();
      if (artist1 < artist2) return -1;
      if (artist1 > artist2) return 1;

      // then by year
      if (album1.year < album2.year) return -1;
      if (album1.year > album2.year) return 1;

      // then by album name, ignoring case
      let name1 = album1.name.toUpperCase();
      let name2 = album2.name.toUpperCase();
      if (name1 < name2) return -1;
      if (name2 < name1) return 1;

      return 0;
    });
  },

  addAlbum: async ({ name, artist, year }) => {
    let id = getMaxId() + 1;
    stubbedData.push({ id, name, artist, year });
  },

  editAlbum: async ({ id, name, artist, year }) => {
    stubbedData = stubbedData.map((album) =>
      album.id == id ? { id, name, artist, year } : album
    );
  },

  deleteAlbum: async (id) => {
    stubbedData = stubbedData.filter((a) => a.id != id);
  },

  getFavouriteYear: async () => {
    let freqMap: Map<string, number> = new Map();
    stubbedData.forEach((album) => {
      if (freqMap.has(album.year)) {
        freqMap.set(album.year, freqMap.get(album.year) as number + 1);
      } else {
        freqMap.set(album.year, 1);
      }
    });
    let favouriteYear = Array.from(freqMap.entries()).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];
    return favouriteYear;
  },
};

let stubbedData: Array<{id: number, name: string, artist: string, year: string}> = [
  {
    id: 1,
    name: 'Telefone',
    artist: 'Noname',
    year: '2016',
  },
  {
    id: 2,
    name: 'Room 25',
    artist: 'Noname',
    year: '2018',
  },
  {
    id: 3,
    name: 'Djesse Vol. 3',
    artist: 'Jacob Collier',
    year: '2020',
  },
  {
    id: 4,
    name: 'BELIEVE IN ME, WHO BELIEVES IN YOU',
    artist: 'Aries',
    year: '2021',
  },
  {
    id: 5,
    name: 'An Evening With Silk Sonic',
    artist: 'Bruno Mars, Anderson .Paak, Silk Sonic',
    year: '2021',
  },
  {
    id: 6,
    name: 'Heavier Things',
    artist: 'John Mayer',
    year: '2003',
  },
  {
    id: 7,
    name: 'Sob Rock',
    artist: 'John Mayer',
    year: '2021',
  },
  {
    id: 8,
    name: 'Illuminate',
    artist: 'Shawn Mendes',
    year: '2017',
  },
  {
    id: 9,
    name: 'Best of Me',
    artist: 'Cory Henry',
    year: '2021',
  },
  {
    id: 10,
    name: 'Baby Darling Doll Face Honey',
    artist: 'Band Of Skulls',
    year: '2009',
  },
  {
    id: 11,
    name: 'The Making Of:',
    artist: 'The Middle Coast',
    year: '2017',
  },
  {
    id: 12,
    name: 'Remarkably Human',
    artist: 'Nick Johnston',
    year: '2016',
  },
  {
    id: 13,
    name: 'Wide Eyes in the Dark',
    artist: 'Nick Johnston',
    year: '2019',
  },
  {
    id: 14,
    name: 'All That You Dream',
    artist: 'Joey Landreth',
    year: '2021',
  },
  {
    id: 15,
    name: 'From the Reach',
    artist: 'Sonny Landreth',
    year: '2008',
  },
  {
    id: 16,
    name: 'How Long',
    artist: 'Ariel Posen',
    year: '2019',
  },
  {
    id: 17,
    name: 'Whiskey',
    artist: 'Joey Landreth',
    year: '2019',
  },
  {
    id: 18,
    name: 'Mile End',
    artist: 'Ariel Posen',
    year: '2021',
  },
  {
    id: 19,
    name: 'Royal Blood',
    artist: 'Royal Blood',
    year: '2014',
  },
  {
    id: 20,
    name: 'Between the Devil & the Deep Blue Sea',
    artist: 'Black Stone Cherry',
    year: '2011',
  },
  {
    id: 21,
    name: 'White Bear',
    artist: 'The Temperance Movement',
    year: '2016',
  },
  {
    id: 22,
    name: 'The Temperance Movement',
    artist: 'The Temperance Movement',
    year: '2013',
  },
  {
    id: 23,
    name: 'World on Fire',
    artist: 'Slash',
    year: '2014',
  },
  {
    id: 24,
    name: 'Apocalyptic Love',
    artist: 'Slash',
    year: '2012',
  },
];

const getMaxId = () => {
  return stubbedData.length > 0
    ? Math.max(...stubbedData.map((album) => +album.id))
    : 0;
};

export { stubApi };