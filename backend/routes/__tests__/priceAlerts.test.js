import request from 'supertest';
import app from '../../app';


const example = {
  gameId: 'UP2154-CUSA04794_00-TESTGAMETSPS04NA',
  email: 'OnBlacklistFalse@myGmail.com',
  price: 19.99
};


describe('route: `/priceAlerts`', () => {
  it('handles a POST request to `/priceAlerts` by upserting the example price alert, and creating a user', () => {
    return request(app)
      .post('/priceAlerts')
      .type('form')
      .send(example)
      .expect(200)
      .then(res => expect(res.body).toEqual(true));
  });

  it('handles a DELETE request to `/priceAlerts/:game_id/:email` by deleting the example price alert', () => {
    return request(app)
      .delete(`/priceAlerts/${example.gameId}/${encodeURIComponent(example.email)}`)
      .expect(200)
      .then(res => expect(res.body).toEqual(true));
  });
});
