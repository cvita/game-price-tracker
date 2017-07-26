import * as actions from './actionCreators';
import * as types from '../constants/actionTypes'


describe('action creators', () => {
  it('should create an action to fetch all games in the db', () => {
    const expectedAction = {
      type: types.FETCH_ALL_GAMES_IN_DB_REQUESTED,
      payload: {}
    };
    expect(actions.fetchAllGamesInDb()).toEqual(expectedAction);
  });

  it('should create an action to find new games', () => {
    const maxResults = 25;
    const expectedAction = {
      type: types.FIND_NEW_GAMES_REQUESTED,
      payload: { maxResults }
    };
    expect(actions.findNewGames(maxResults)).toEqual(expectedAction);
  });

  it('should create an action to generate autosuggestions', () => {
    const title = 'crash bandicoot';
    const maxResults = 5;
    const expectedAction = {
      type: types.GENERATE_AUTO_SUGGESTIONS_REQUESTED,
      payload: { title, maxResults }
    };
    expect(actions.generateAutoSuggestions(title, maxResults)).toEqual(expectedAction);
  });

  it('should create an action to search by title', () => {
    const title = 'last of us';
    const expectedAction = {
      type: types.SEARCH_BY_TITLE_REQUESTED,
      payload: { title }
    };
    expect(actions.searchByTitle(title)).toEqual(expectedAction);
  });

  it('should create an action to make the active game', () => {
    const gameId = 'UP0082-CUSA05532_00-FFXIIGAMEPS400NA';
    const expectedAction = {
      type: types.MAKE_ACTIVE_GAME_REQUESTED,
      payload: { gameId }
    };
    expect(actions.makeActiveGame(gameId)).toEqual(expectedAction);
  });

  it('should create an action to reset the active game', () => {
    const expectedAction = {
      type: types.RESET_ACTIVE_GAME,
      payload: null
    };
    expect(actions.resetActiveGame()).toEqual(expectedAction);
  });

  it('should create an action to create a new price alert', () => {
    const priceAlertInfo = { mockInfo: 'info' };
    const expectedAction = {
      type: types.SUBMIT_PRICE_ALERT_REQUESTED,
      payload: { priceAlertInfo }
    };
    expect(actions.createPriceAlert(priceAlertInfo)).toEqual(expectedAction);
  });

  it('should create an action to fetch an existing price alert', () => {
    const _id = '5970da5dd6070cc46c9e6b90';
    const expectedAction = {
      type: types.FETCH_PRICE_ALERT_REQUESTED,
      payload: { _id }
    };
    expect(actions.fetchPriceAlert(_id)).toEqual(expectedAction);
  });

  it('should create an action to delete an existing price alert', () => {
    const userInfo = { mockInfo: 'info' };
    const expectedAction = {
      type: types.DELETE_PRICE_ALERT_REQUESTED,
      payload: { userInfo }
    };
    expect(actions.deletePriceAlert(userInfo)).toEqual(expectedAction);
  });

  it('should create an action to check the email blacklist for a user', () => {
    const userEmail = 'anyone@gmail.com'
    const expectedAction = {
      type: types.CHECK_BLACKLIST_REQUESTED,
      payload: { userEmail }
    };
    expect(actions.checkBlacklist(userEmail)).toEqual(expectedAction);
  });

  it('should create an action to add an email to the blacklist', () => {
    const userEmail = 'anyone@gmail.com'
    const expectedAction = {
      type: types.ADD_TO_BLACKLIST_REQUESTED,
      payload: { userEmail }
    };
    expect(actions.addToBlacklist(userEmail)).toEqual(expectedAction);
  });
});
