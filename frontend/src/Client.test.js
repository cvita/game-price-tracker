import Client from './Client';
const fetchMock = require('fetch-mock');

const mockInfo = { info: 'this is simply a placeholder' };


describe('confirms routes and fetch methods for games collection in db', () => {
  it('returns a value after finding all games in db', () => {
    const maxResults = 25;
    fetchMock.get(`/games/find/all?max=${maxResults}`, { api: mockInfo });
    return Client.findAllGames()
      .then(resp => {
        expect(resp).toBeDefined();
        expect(resp).toEqual(mockInfo);
        fetchMock.restore();
      });
  });

  it('returns expected value after finding one game in db', () => {
    const id = 'UP9000-CUSA00552_00-THELASTOFUS00000';
    fetchMock.get(`/games/find/one/?id=${encodeURIComponent(id)}`, { api: mockInfo });
    return Client.findOneGame(id)
      .then(resp => {
        expect(resp).toBeDefined();
        expect(resp).toEqual(mockInfo);
        fetchMock.restore();
      });
  });

  it('returns expected value after adding or updating a game in db', () => {
    fetchMock.post('/games/add', { api: mockInfo });
    return Client.addOrUpdateGame(mockInfo)
      .then(resp => {
        expect(resp).toBeDefined();
        expect(resp).toEqual(mockInfo);
        fetchMock.restore();
      });
  });
});


describe('confirms routes and fetch methods for price alerts collection in db', () => {
  it('returns expected value after creating a new price alert', () => {
    fetchMock.post('/priceAlerts/add', { api: mockInfo });
    expect.assertions(2);
    return Client.createPriceAlert(mockInfo)
      .then(resp => {
        expect(resp).toBeDefined();
        expect(resp).toEqual(mockInfo);
        fetchMock.restore();
      });
  });

  it('returns expected value after finding an existing price alert', () => {
    fetchMock.post('/priceAlerts/find/one', { api: mockInfo });
    expect.assertions(2);
    return Client.findOnePriceAlert(mockInfo)
      .then(resp => {
        expect(resp).toBeDefined();
        expect(resp).toEqual(mockInfo);
        fetchMock.restore();
      });
  });

  it('returns expected value deleting an existing price alert', () => {
    fetchMock.delete('/priceAlerts/delete', { api: mockInfo });
    expect.assertions(2);
    return Client.deletePriceAlert(mockInfo)
      .then(resp => {
        expect(resp).toBeDefined();
        expect(resp).toEqual(mockInfo);
        fetchMock.restore();
      });
  });
});


describe('confirms routes and fetch methods for blacklist collection in db', () => {
  it('returns expected value after checking if a user is on the email blacklist', () => {
    fetchMock.post('/blacklist/find/one', { api: mockInfo });
    expect.assertions(2);
    return Client.checkBlacklist(mockInfo)
      .then(resp => {
        expect(resp).toBeDefined();
        expect(resp).toEqual(mockInfo);
        fetchMock.restore();
      });
  });

  it('returns expected value after adding a user to the email blacklist', () => {
    fetchMock.put('/blacklist/add', { api: mockInfo });
    expect.assertions(2);
    return Client.addToBlacklist(mockInfo)
      .then(resp => {
        expect(resp).toBeDefined();
        expect(resp).toEqual(mockInfo);
        fetchMock.restore();
      });
  });
});
