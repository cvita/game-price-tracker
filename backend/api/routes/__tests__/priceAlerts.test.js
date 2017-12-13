const request = require('supertest');
const app = require('../../../app');
const { encrypt } = require('../../encrypt');


const examplePriceAlert = {
  "userEmail": "chris.vita@gmail.com",
  "onBlacklist": false,
  "game_id": "UP0000-CUSA00000_00-TESTGAMEXXXXXX00",
  "price": 19.99,
  "dateAdded": 1502348400000,
  "expiration": 1513234800000,
  "gameTitle": "The Best Game, Ever"
};

const requiredKeys = [
  '_id',
  'userEmail',
  'onBlacklist',
  'game_id',
  'price',
  'dateAdded',
  'expiration',
  'gameTitle'
];

describe('routes: /priceAlerts', () => {
  it('handles a POST to `/priceAlerts/add` by adding to priceAlerts collection', () => {
    return request(app)
      .post('/priceAlerts/add')
      .send(examplePriceAlert)
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        const body = response.body.api;
        const id = body.lastErrorObject.upserted;
        examplePriceAlert._id = id;
        expect(typeof id).toBe('string');
        expect(id).toHaveLength(24);
        expect(body.lastErrorObject.updatedExisting).toEqual(false);
      });
  });

  it('handles a POST to `/priceAlerts/find/one` by returning matching doc', () => {
    const formattedId = encrypt(
      'id:' + examplePriceAlert._id + 'user:'
    ); // Encrypting and pre/appending strings to match context of common use case
    return request(app)
      .post('/priceAlerts/find/one')
      .send({ id: formattedId })
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        const priceAlert = response.body.api;
        requiredKeys.forEach(key => {
          expect(priceAlert).toHaveProperty(key);
          expect(priceAlert.key).toEqual(examplePriceAlert.key);
        });
      });
  });

  it('handles a DELETE to `/priceAlerts/delete` by removing from priceAlerts collection', () => {
    return request(app)
      .delete('/priceAlerts/delete')
      .send(examplePriceAlert)
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        const body = response.body.api;
        expect(body).toEqual(true);
      });
  });
});
