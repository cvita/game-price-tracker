const request = require('supertest');
const app = require('../../../app');
const { deleteUserFromBlacklist } = require('../Model');


const exampleUser = 'gamePriceTracker.user@gmail.com';
afterAll(() => deleteUserFromBlacklist(exampleUser));

describe('routes: /blacklist', () => {
  it('handles a POST to `/blacklist/find/one` by returning matching doc', () => {
    return request(app)
      .post('/blacklist/find/one')
      .send({ userEmail: exampleUser })
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expectBlacklistPropertiesAndTypes(response.body.api);
      });
  });

  it('handles a PUT to `/blacklist/add` by adding to blacklist collection', () => {
    return request(app)
      .put('/blacklist/add')
      .send({ userEmail: exampleUser })
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expectBlacklistPropertiesAndTypes(response.body.api);
      });
  });
});

function expectBlacklistPropertiesAndTypes(blacklistResponseObject) {
  expect(blacklistResponseObject).toHaveProperty('onBlacklist');
  expect(blacklistResponseObject).toHaveProperty('userEmail');
  expect(typeof blacklistResponseObject.onBlacklist).toBe('boolean');
  expect(typeof blacklistResponseObject.userEmail).toBe('string');
}
