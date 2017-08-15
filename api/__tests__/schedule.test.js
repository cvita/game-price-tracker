const { connectToDb, deleteAllPriceAlertsForUser } = require('../routes/Model');
const updateInfoAndInformUsers = require('../schedule');


const examplePriceAlerts = [
  {
    "userEmail": "gamePriceTracker.user@gmail.com",
    "onBlacklist": false,
    "game_id": "UP0006-CUSA02685_00-UNRAVELUNRAVEL09",
    "price": 19.99,
    "dateAdded": 1502434800000,
    "expiration": 1413321200000, // Set to trigger expiration event
    "gameTitle": "Unravel"
  },
  {
    "userEmail": "gamePriceTracker.user@gmail.com",
    "onBlacklist": false,
    "game_id": "UP9000-CUSA00552_00-THELASTOFUS00000",
    "price": 19.99,
    "dateAdded": 1502434800000,
    "expiration": 1513321200000,
    "gameTitle": "The Last Of Us™ Remastered "
  },
  {
    "userEmail": "gamePriceTracker.user@gmail.com",
    "onBlacklist": false,
    "game_id": "UP1001-CUSA03979_00-BIOSHOCKCOLLECTN",
    "price": 159.99, // Set to trigger a sale event
    "dateAdded": 1502434800000,
    "expiration": 1513321200000,
    "gameTitle": "BioShock: The Collection"
  }
];

const requiredKeys = [
  'started',
  'elapsed',
  'expiredAlerts',
  'currentGames'
];

beforeAll(() => {
  return connectToDb('priceAlerts').then(collection => {
    collection.insertMany(examplePriceAlerts);
  });
});

afterAll(() => deleteAllPriceAlertsForUser('gamePriceTracker.user@gmail.com'));


describe('schedule.js', () => {
  it('handles updateInfoAndInformUsers() and returns `status`', () => {
    return updateInfoAndInformUsers().then(status => {
      expect(status).toBeInstanceOf(Object);
      requiredKeys.forEach(key => expect(status).toHaveProperty(key));
      expect(typeof status.started).toBe('number');
      expect(typeof status.elapsed).toBe('number');
      expect(Array.isArray(status.expiredAlerts)).toBe(true);
      expect(Array.isArray(status.currentGames)).toBe(true);
    });
  });
});
