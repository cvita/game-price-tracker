import sonyStore from './sonyStore';
const fetchMock = require('fetch-mock');
const fs = require('fs');


const singleResultSearchEx = {
  _id: 'UP0082-CUSA05532_00-FFXIIGAMEPS400NA',
  title: 'Final Fantasy XII The Zodiac Age',
  url: 'https://store.playstation.com/#!/en-us/games/cid=UP0082-CUSA05532_00-FFXIIGAMEPS400NA',
  price: 49.99,
  strikePrice: null,
  onSale: false,
  discount: null,
  psPlusPrice: null,
  lastUpdated: new Date(new Date().toDateString()).getTime(),
  image: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/UP0082-CUSA05532_00-FFXIIGAMEPS400NA/image?w=400&h=400',
  details: {
    platforms: ['PS4™'],
    description: "FINAL FANTASY® XII THE ZODIAC AGE improves upon the classic FINAL FANTASY® XII, now more beautiful and easier to play than ever. The high-definition remaster introduces several modern advancements, including reconstructed battle design and a revamped job system. Players both returning and new to the game will experience a grand adventure that spans the world of Ivalice in an entirely fresh and improved way.",
    genre: null,
    releaseDate: '2017-07-11T00:00:00Z',
    gameDev: 'SQUARE ENIX CO. LTD.',
    starRating: 4.91,
    esrbRating: 'https://cdn-a.sonyentertainmentnetwork.com/grc/images/ratings/hd/esrb/t.png'
  },
  media: {
    screenshots: [
      "https://apollo2.dl.playstation.net/cdn/UP0082/CUSA05532_00/FREE_CONTENTBgAaMmiGMSq0UnRDpFC2/PREVIEW_SCREENSHOT1_140665.jpg",
      "https://apollo2.dl.playstation.net/cdn/UP0082/CUSA05532_00/FREE_CONTENTKVHVkKGVmCdWUNwp4QuB/PREVIEW_SCREENSHOT2_140665.jpg",
      "https://apollo2.dl.playstation.net/cdn/UP0082/CUSA05532_00/FREE_CONTENTC0poaIqoqScXxe0VTsSq/PREVIEW_SCREENSHOT3_140665.jpg",
    ],
    videos: [
      "https://apollo2.dl.playstation.net/cdn/UP0082/CUSA05532_00/FREE_CONTENTsZb2lJP4Aqa82gKabf3B/PREVIEW_GAMEPLAY_VIDEO_3_140665.mp4?country=US",
      "https://apollo2.dl.playstation.net/cdn/UP0082/CUSA05532_00/FREE_CONTENTCaeYSIoq0U3UvJQh1Yz0/PREVIEW_GAMEPLAY_VIDEO_4_140665.mp4?country=US"
    ]
  }
};

const multipleResultSearchEx = {
  _id: 'UP0082-CUSA05532_00-FFXIIGAMEPS400NA',
  title: 'Final Fantasy XII The Zodiac Age',
  url: 'https://store.playstation.com/#!/en-us/games/cid=UP0082-CUSA05532_00-FFXIIGAMEPS400NA',
  price: 49.99,
  strikePrice: null,
  onSale: false,
  discount: null,
  psPlusPrice: null,
  lastUpdated: new Date(new Date().toDateString()).getTime(),
  image: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/UP0082-CUSA05532_00-FFXIIGAMEPS400NA/image?w=225&h=225',
  details: {
    platforms: ['PS4™'],
  }
};

describe('findGameById()', () => {
  it('returns expected values when passed a valid gameId', () => {
    fetchMock.get(
      'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/UP0082-CUSA05532_00-FFXIIGAMEPS400NA',
      fs.readFileSync('./src/sonyStore/__mockData__/sonyStoreApiSearchById.json', 'utf8')
    );
    expect.assertions(2);
    return sonyStore.findGameById('UP0082-CUSA05532_00-FFXIIGAMEPS400NA')
      .then(resp => {
        expect(resp).toBeDefined();
        expect(resp).toEqual(singleResultSearchEx);
        fetchMock.restore();
      });
  });

  it('throws an error when passed an invalid gameId', () => {
    return sonyStore.findGameById('gameNumber1234').catch(e => {
      expect(e.message).toEqual('invalid game ID');
    });
  });
});

describe('findGameByTitle()', () => {
  it('returns expected values when passed a string', () => {
    fetchMock.get(
      'https://store.playstation.com/store/api/chihiro/00_09_000/tumbler/US/en/19/final%20fantasy%20XII?suggested_size=5&mode=game&mode=film&mode=tv&mode=live_event',
      fs.readFileSync('./src/sonyStore/__mockData__/sonyStoreApiSearchByTitle.json', 'utf8')
    );
    expect.assertions(2);
    return sonyStore.findGameByTitle('final fantasy XII')
      .then(resp => {
        expect(resp).toBeDefined();
        expect(resp[0]).toEqual(multipleResultSearchEx);
        fetchMock.restore();
      });
  });

  it('throws an error when passed a non-string', () => {
    return sonyStore.findGameByTitle(undefined).catch(e => {
      expect(e.message).toEqual('invalid game title');
    });
  });
});

describe('findNewGames()', () => { });
it('returns expected values when searching sony store for new games', () => {
  fetchMock.get(
    'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/STORE-MSF77008-NEWGAMESGRID?size=25',
    fs.readFileSync('./src/sonyStore/__mockData__/sonyStoreApiFindNewGames.json', 'utf8')
  );
  expect.assertions(2);
  return sonyStore.findNewGames(25)
    .then(resp => {
      expect(resp).toBeDefined();
      expect(resp[0]).toEqual(multipleResultSearchEx);
      fetchMock.restore();
    });
});
