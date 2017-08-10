const request = require('supertest');
const fs = require('fs');
const app = require('../../app');
const { deleteGame } = require('./Model');
const exampleGameInfo = JSON.parse(fs.readFileSync('./api/routes/__mockData__/exampleGameInfo.json', 'utf8'));
afterAll(() => deleteGame(exampleGameInfo._id));

const requiredKeys = [
  '_id',
  'title',
  'url',
  'price',
  'strikePrice',
  'onSale',
  'discount',
  'psPlusPrice',
  'lastUpdated',
  'image',
  'details',
  'screenshots'
];

describe.skip('routes: /games', () => {
  it('handles a POST to `/games/add` by adding to games collection', () => {
    return request(app)
      .post('/games/add')
      .send(exampleGameInfo)
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        const body = response.body.api;
        expect(body).toBeInstanceOf(Object);
        expect(body.nModified).toEqual(0);
        expect(body).toHaveProperty('upserted');
      });
  });

  it('handles a GET to `games/find/all` by returning games collection as an array', () => {
    return request(app)
      .get('/games/find/all')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        const body = response.body.api;
        expect(body).toBeInstanceOf(Array);
        body.forEach(game => {
          requiredKeys.forEach(key => {
            expect(game).toHaveProperty(key);
          });
          checkTypesOnGameObject(game);
        });
      });
  });

  it('handles a GET to `/games/find/one/` by returning matching doc', () => {
    return request(app)
      .get(`/games/find/one/?id=${exampleGameInfo._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        const game = response.body.api;
        expect(game).toBeInstanceOf(Object);
        requiredKeys.forEach(key => {
          expect(game).toHaveProperty(key);
        });
        checkTypesOnGameObject(game);
      });
  });
});

expect.extend({
  toBeNullOrNumber(received) {
    const pass = received === null || typeof received === 'number';
    if (pass) {
      return {
        message: () => (`expected ${received} to not be null or number`),
        pass: true,
      };
    } else {
      return {
        message: () => (`expected ${received} to be null or number`),
        pass: false,
      };
    }
  }
});

function checkTypesOnGameObject(game) {
  expect(typeof game._id).toBe('string');
  expect(typeof game.title).toBe('string');
  expect(typeof game.url).toBe('string');
  expect(typeof game.price).toBe('number');
  expect(typeof game.onSale).toBe('boolean');
  expect(typeof game.lastUpdated).toBe('number');
  expect(typeof game.image).toBe('string');
  expect(game.details).toBeInstanceOf(Object);
  expect(game.screenshots).toBeInstanceOf(Array);
  expect(game.discount).toBeNullOrNumber();
  expect(game.strikePrice).toBeNullOrNumber();
  expect(game.psPlusPrice).toBeNullOrNumber();
}
