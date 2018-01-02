import request from 'supertest';
import app from '../../app';


const example = {
  email: 'OnBlacklistFalse@myGmail.com'
};


describe('route: `/users`', () => {
  it('handles a GET request to `/users/:email` by checking if user is `on_blacklist` and returning a Boolean', () => {
    return request(app)
      .get(`/users/${encodeURIComponent(example.email)}`)
      .expect(200)
      .then(res => expect(res.body).toEqual(false));
  });
});
