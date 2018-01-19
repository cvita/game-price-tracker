import * as actions from './actionCreators';
import * as types from '../constants/actionTypes'


describe('action creators', () => {
  it('should create an action to find new games', () => {
    const maxResults = 25;
    const expectedAction = {
      type: types.FIND_POPULAR_GAMES_REQUESTED,
      payload: maxResults
    };
    expect(actions.findPopularGames(maxResults)).toEqual(expectedAction);
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
      payload: title
    };
    expect(actions.searchByTitle(title)).toEqual(expectedAction);
  });

  it('should create an action to make the active game', () => {
    const gameId = 'UP0082-CUSA05532_00-FFXIIGAMEPS400NA';
    const expectedAction = {
      type: types.MAKE_ACTIVE_GAME_REQUESTED,
      payload: gameId
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
      payload: priceAlertInfo
    };
    expect(actions.createPriceAlert(priceAlertInfo)).toEqual(expectedAction);
  });

  it('should create an action to fetch an existing price alert', () => {
    const alertId = 103;
    const email = 'test@email.com';
    const expectedAction = {
      type: types.FETCH_PRICE_ALERT_REQUESTED,
      payload: [alertId, email]
    };
    expect(actions.fetchPriceAlert(alertId, email)).toEqual(expectedAction);
  });

  it('should create an action to delete an existing price alert', () => {
    const gameId = 'UP0082-CUSA05532_00-FFXIIGAMEPS400NA';
    const email = 'test@email.com';
    const expectedAction = {
      type: types.DELETE_PRICE_ALERT_REQUESTED,
      payload: [gameId, email]
    };
    expect(actions.deletePriceAlert(gameId, email)).toEqual(expectedAction);
  });

  it('should create an action to check the email blacklist for a user', () => {
    const userEmail = 'anyone@gmail.com'
    const expectedAction = {
      type: types.CHECK_BLACKLIST_REQUESTED,
      payload: userEmail
    };
    expect(actions.checkBlacklist(userEmail)).toEqual(expectedAction);
  });

  it('should create an action to add an email to the blacklist', () => {
    const userEmail = 'anyone@gmail.com'
    const expectedAction = {
      type: types.ADD_TO_BLACKLIST_REQUESTED,
      payload: userEmail
    };
    expect(actions.addToBlacklist(userEmail)).toEqual(expectedAction);
  });

  it('should create an action to search YouTube by keywords', () => {
    const searchKeywords = 'Last Of Us';
    const expectedAction = {
      type: types.SEARCH_VIDEO_REQUESTED,
      payload: searchKeywords
    };
    expect(actions.searchVideo(searchKeywords)).toEqual(expectedAction);
  });
});
