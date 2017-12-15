import request from 'supertest';
import app from '../../app';


describe('route: /games', () => {
  it('handles a GET request to `/games` by returning all games', () => {
    return request(app)
      .get('/games')
      .expect(200)
      .then(res => {
        expect(res.body).toBeInstanceOf(Array);
        checkTypes(res.body[0]);
      });
  });
});


const checkTypes = res => {
  const {
    id,
    title,
    url,
    price,
    strike_price,
    on_sale,
    discount,
    ps_plus_price,
    last_updated,
    image,
    details,
    screenshots
      } = res;
  expect(typeof id).toEqual('string')
  expect(typeof title).toBe('string');
  expect(typeof url).toBe('string');
  expect(typeof price).toBe('number');
  expect(typeof strike_price).toBe('number');
  expect(typeof on_sale).toBe('boolean');
  expect(typeof ps_plus_price).toBe('number');
  expect(typeof last_updated).toBe('string');
  expect(typeof image).toBe('string');
  expect(details).toBeInstanceOf(Object);
  expect(screenshots).toBeInstanceOf(Array);
};
