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
  image: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/UP0082-CUSA05532_00-FFXIIGAMEPS400NA/image?w=225&h=225',
  details: {
    platforms: ['PS4™'],
    description: "FINAL FANTASY® XII THE ZODIAC AGE improves upon the classic FINAL FANTASY® XII, now more beautiful and easier to play than ever. The high-definition remaster introduces several modern advancements, including reconstructed battle design and a revamped job system. Players both returning and new to the game will experience a grand adventure that spans the world of Ivalice in an entirely fresh and improved way.<br><br>Enter an era of war within the world of Ivalice. The small kingdom of Dalmasca, conquered by the Archadian Empire, is left in ruin and uncertainty. Princess Ashe, the one and only heir to the throne, devotes herself to the resistance to liberate her country. Vaan, a young man who lost his family in the war, dreams of flying freely in the skies. In a fight for freedom and fallen royalty, join these unlikely allies and their companions as they embark on a heroic adventure to free their homeland. <br><br>1 player<br>DUALSHOCK®4<br><br>  Software subject to license (us.playstation.com/softwarelicense). Online features require an account and are subject to terms of service and applicable privacy policy (playstationnetwork.com/terms-of-service & playstationnetwork.com/privacy-policy). One-time license fee for play on account’s designated primary PS4™ system and other PS4™ systems when signed in with that account.<br><br>© 2006, 2017 SQUARE ENIX CO., LTD. All Rights Reserved.<br>ILLUSTRATION: ©2006 YOSHITAKA AMANO<br>THE ZODIAC AGE is a registered trademark or trademark of Square Enix Co., Ltd.<br>FINAL FANTASY, SQUARE ENIX and the SQUARE ENIX logo are registered trademarks or trademarks of Square Enix Holdings Co., Ltd.<br><br>THE ZODIAC AGE is a registered trademark or trademark of Square Enix Co., Ltd.<br>FINAL FANTASY, SQUARE ENIX and the SQUARE ENIX logo are registered trademarks or trademarks of Square Enix Holdings Co., Ltd.",
    releaseDate: '2017-07-11T00:00:00Z',
    gameDev: 'SQUARE ENIX CO. LTD.',
    starRating: 4.91,
    esrbRating: 'https://cdn-a.sonyentertainmentnetwork.com/grc/images/ratings/hd/esrb/t.png'
  },
  screenshots: [
    "https://apollo2.dl.playstation.net/cdn/UP0082/CUSA05532_00/FREE_CONTENTBgAaMmiGMSq0UnRDpFC2/PREVIEW_SCREENSHOT1_140665.jpg",
    "https://apollo2.dl.playstation.net/cdn/UP0082/CUSA05532_00/FREE_CONTENTKVHVkKGVmCdWUNwp4QuB/PREVIEW_SCREENSHOT2_140665.jpg",
    "https://apollo2.dl.playstation.net/cdn/UP0082/CUSA05532_00/FREE_CONTENTC0poaIqoqScXxe0VTsSq/PREVIEW_SCREENSHOT3_140665.jpg",
  ]
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

describe('findPopularGames()', () => { });
it('returns expected values when searching sony store for new games', () => {
  fetchMock.get(
    'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/STORE-MSF77008-TOPGAMES?size=25',
    fs.readFileSync('./src/sonyStore/__mockData__/sonyStoreApiFindPopularGames.json', 'utf8')
  );
  expect.assertions(2);
  return sonyStore.findPopularGames(25)
    .then(resp => {
      expect(resp).toBeDefined();
      expect(resp[0]).toEqual(multipleResultSearchEx);
      fetchMock.restore();
    });
});
