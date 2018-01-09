import request from 'supertest';
import { encrypt } from '../../support/encrypt';
import app from '../../app';


const example = {
  gameId: 'UP2154-CUSA04794_00-TESTGAMETSPS04NA',
  email: 'OnBlacklistFalse@myGmail.com',
  price: 19.99
};

// Testing both routes in same file enables unit tests to behave more like an acceptance test.
describe('routes: `/priceAlerts`, `/users`', () => {
  it('handles POST `/priceAlerts` by upserting a price alert, and creating the user', () => {
    return request(app)
      .post('/priceAlerts')
      .type('form')
      .send(example)
      .expect(200)
      .then(res => {
        const { priceAlertSaved, alert_id } = res.body;
        expect(priceAlertSaved).toEqual(true);
        expect(typeof alert_id).toBe('number');
        example.alert_id = alert_id;
      });
  });

  it('handles GET `/users/manage/:alert_id/:email` by getting user and price alert info', () => {
    return request(app)
      .get(`/users/manage/${encrypt(example.alert_id.toString())}/${encrypt(example.email)}`)
      .expect(200)
      .then(res => {
        const { on_blacklist, email, game_id, price, alert_id } = res.body;
        expect(on_blacklist).toEqual(false);
        expect(email).toEqual(example.email);
        expect(game_id).toEqual(example.gameId);
        expect(price).toEqual(example.price);
        expect(alert_id).toEqual(example.alert_id);
      });
  });

  it('handles DELETE `/priceAlerts/:game_id/:email` by deleting the example price alert', () => {
    return request(app)
      .delete(`/priceAlerts/${example.gameId}/${encodeURIComponent(example.email)}`)
      .expect(200)
      .then(res => expect(res.body).toEqual(true));
  });

  it('handles PUT `/users` by adding user to blacklist and deleting all users\' price alerts', () => {
    return request(app)
      .put('/users')
      .type('form')
      .send({ email: example.email })
      .expect(200)
      .then(res => expect(res.body).toEqual(true));
  });

  it('handles GET `/users/:email` by checking user\' blacklist status', () => {
    return request(app)
      .get(`/users/${encodeURIComponent(example.email)}`)
      .expect(200)
      .then(res => expect(res.body).toEqual(true));
  });

  // This route is not currently used by the app, by may be later. Including now to tear down test.
  it('handles DELETE `/users/:email` by deleting user', () => {
    return request(app)
      .delete(`/users/${encodeURIComponent(example.email)}`)
      .expect(200)
      .then(res => expect(res.body).toEqual(true));
  });
});
