import request from 'supertest';
import app from '../../app';


const example = {
  "id": "UP2054-CUSA05297_00-TESTGM0000000001",
  "title": "Test-Title",
  "url": "https://store.playstation.com/#!/en-us/games/cid=UP2054-CUSA05297_00-TESTGM0000000001",
  "price": "13.99",
  "strike_price": "2",
  "on_sale": "false",
  "discount": "0",
  "ps_plus_price": "19.99",
  "image": "https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/UP2054-CUSA05297_00-TESTGM0000000001/image?w=225&h=225",
  "details": "{\"game_dev\":\"Playdead ApS\",\"platforms\":[\"PS4™\"],\"description\":\"Hunted and alone, a boy finds himself drawn into the center of a dark project.<br><br>Remote Play requires PS Vita system and sufficiently robust Wi-Fi connection.<br><br>1 player<br>3GB minimum save size<br>DUALSHOCK®4<br>Remote Play<br><br>  Software subject to license (us.playstation.com/softwarelicense). Online features require an account and are subject to terms of service and applicable privacy policy (playstationnetwork.com/terms-of-service & playstationnetwork.com/privacy-policy).\",\"esrb_rating\":\"https://cdn-a.sonyentertainmentnetwork.com/grc/images/ratings/hd/esrb/m.png\",\"star_rating\":4.45,\"release_date\":\"2016-08-23T00:00:00Z\"}",
  "screenshots": "[\"https://apollo2.dl.playstation.net/cdn/UP2054/CUSA05297_00/FREE_CONTENTSseqpYupmNXsgYTRiuPn/PREVIEW_SCREENSHOT1_122189.jpg\", \"https://apollo2.dl.playstation.net/cdn/UP2054/CUSA05297_00/FREE_CONTENTbKEmYl4vlLvQiGeMgRNW/PREVIEW_SCREENSHOT2_122189.jpg\", \"https://apollo2.dl.playstation.net/cdn/UP2054/CUSA05297_00/FREE_CONTENTwXqK2JSlluUtsXsb8brC/PREVIEW_SCREENSHOT3_122189.jpg\"]"
};

describe('route: `/games`', () => {
  it('handles a POST request to `/games` by adding a new game', () => {
    return request(app)
      .post('/games')
      .type('form')
      .send(example)
      .expect(200)
      .then(res => {
        const result = res.body.rows;
        expect(result).toBeInstanceOf(Array);
        checkTypes(result[0]);
        expect(result[0].price).toEqual(13.99);
      });
  });

  it('handles a POST request to `/games` by updating the price of an existing game', () => {
    example.price = "29.99";
    return request(app)
      .post('/games')
      .type('form')
      .send(example)
      .expect(200)
      .then(res => {
        const result = res.body.rows;
        expect(result).toBeInstanceOf(Array);
        checkTypes(result[0]);
        expect(result[0].price).toEqual(29.99);
      });
  });

  it('handles a GET request to `/games` by returning all games', () => {
    return request(app)
      .get('/games')
      .expect(200)
      .then(res => {
        expect(res.body).toBeInstanceOf(Array);
        checkTypes(res.body[0]);
      });
  });

  it('handles a GET request to `/games/:id` by returning a game by id', () => {
    return request(app)
      .get(`/games/${encodeURIComponent(example.id)}`)
      .expect(200)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        checkTypes(res.body);
      });
  });

  it('handles a DELETE request to `/games/:id` by deleting a game by id', () => {
    return request(app)
      .delete(`/games/${encodeURIComponent(example.id)}`)
      .expect(200)
      .then(res => {
        const { command, rowCount } = res.body;
        expect(command).toEqual('DELETE');
        expect(rowCount).toEqual(1);
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
    updated,
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
  expect(typeof updated).toBe('string');
  expect(typeof image).toBe('string');
  expect(details).toBeInstanceOf(Object);
  expect(screenshots).toBeInstanceOf(Array);
};
