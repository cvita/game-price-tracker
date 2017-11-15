import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import * as sagas from './sagas';
import * as types from './constants/actionTypes';
import * as actionCreators from './actions/actionCreators';
import sony from '../client/sony';
import mongo from '../client/mongo';
import youTube from '../client/youTube';


const stubData = [{ placeholderData: 'some data' }];
const error = new Error('An error message');


describe('saga: fetchAllGamesInDb', () => {
  it('fetches all games in db', () => {
    return expectSaga(sagas.fetchAllGamesInDb, actionCreators.fetchAllGamesInDb())
      .provide([
        [matchers.call.fn(mongo.findAllGames), stubData]
      ])
      .put({ type: types.FETCH_ALL_GAMES_IN_DB_SUCCEEDED, payload: stubData })
      .run();
  });

  it('handles errors', () => {
    return expectSaga(sagas.fetchAllGamesInDb, actionCreators.fetchAllGamesInDb())
      .provide([[matchers.call.fn(mongo.findAllGames), throwError(error)]
      ])
      .put({ type: types.FETCH_ALL_GAMES_IN_DB_FAILED, message: error.message })
      .run();
  });
});

describe('saga: findPopularGames', () => {
  it('finds new games from sony', () => {
    return expectSaga(sagas.findPopularGames, actionCreators.findPopularGames(25))
      .provide([
        [matchers.call.fn(sony.findPopularGames), stubData]
      ])
      .put({ type: types.FIND_POPULAR_GAMES_SUCCEEDED, payload: stubData })
      .run();
  });

  it('handles errors', () => {
    return expectSaga(sagas.findPopularGames, actionCreators.findPopularGames(25))
      .provide([[matchers.call.fn(sony.findPopularGames), throwError(error)]
      ])
      .put({ type: types.FIND_POPULAR_GAMES_FAILED, message: error.message })
      .run();
  });
});

describe('saga: searchTitle', () => {
  it('finds game by title', () => {
    return expectSaga(sagas.searchTitle, actionCreators.searchByTitle('A game title'))
      .provide([
        [matchers.call.fn(sony.findGameByTitle), stubData]
      ])
      .put({ type: types.SEARCH_BY_TITLE_SUCCEEDED, payload: stubData })
      .run();
  });

  it('handles errors', () => {
    return expectSaga(sagas.searchTitle, actionCreators.searchByTitle('A game title'))
      .provide([[matchers.call.fn(sony.findGameByTitle), throwError(error)]
      ])
      .put({ type: types.SEARCH_BY_TITLE_FAILED, message: error.message })
      .run();
  });
});

describe('saga: generateAutoSuggestions', () => {
  it('generates autosuggestions by searching by title', () => {
    return expectSaga(sagas.generateAutoSuggestions, actionCreators.generateAutoSuggestions('A game title', 5))
      .provide([
        [matchers.call.fn(sony.findGameByTitle), stubData]
      ])
      .put({ type: types.GENERATE_AUTO_SUGGESTIONS_SUCCEEDED, payload: stubData })
      .run();
  });

  it('handles errors', () => {
    return expectSaga(sagas.generateAutoSuggestions, actionCreators.generateAutoSuggestions('A game title', 5))
      .provide([[matchers.call.fn(sony.findGameByTitle), throwError(error)]
      ])
      .put({ type: types.GENERATE_AUTO_SUGGESTIONS_FAILED, message: error.message })
      .run();
  });
});

describe('saga: makeActiveGame', () => {
  it('makes the selected game the `active game`', () => {
    return expectSaga(sagas.makeActiveGame, actionCreators.makeActiveGame('A game id'))
      .provide([
        [matchers.call.fn(sony.findGameById), stubData]
      ])
      .put({ type: types.MAKE_ACTIVE_GAME_SUCCEEDED, payload: stubData })
      .run();
  });

  it('handles errors', () => {
    return expectSaga(sagas.makeActiveGame, actionCreators.makeActiveGame('A game id'))
      .provide([[matchers.call.fn(sony.findGameById), throwError(error)]
      ])
      .put({ type: types.MAKE_ACTIVE_GAME_FAILED, message: error.message })
      .run();
  });
});

describe('saga: submitPriceAlert', () => {
  it('creates a new price alert', () => {
    return expectSaga(sagas.submitPriceAlert, actionCreators.createPriceAlert(stubData))
      .provide([
        [matchers.call.fn(mongo.createPriceAlert), stubData]
      ])
      .put({ type: types.SUBMIT_PRICE_ALERT_SUCCEEDED, payload: stubData })
      .run();
  });

  it('handles errors', () => {
    return expectSaga(sagas.submitPriceAlert, actionCreators.createPriceAlert(stubData))
      .provide([[matchers.call.fn(mongo.createPriceAlert), throwError(error)]
      ])
      .put({ type: types.SUBMIT_PRICE_ALERT_FAILED, message: error.message })
      .run();
  });
});

describe('saga: fetchPriceAlert', () => {
  it('fetches an existing price alert', () => {
    return expectSaga(sagas.fetchPriceAlert, actionCreators.fetchPriceAlert(stubData))
      .provide([
        [matchers.call.fn(mongo.findOnePriceAlert), stubData],
        [matchers.call.fn(sony.findGameById), stubData]
      ])
      .put({ type: types.FETCH_PRICE_ALERT_SUCCEEDED, payload: { activeGame: stubData, userInfo: stubData } })
      .run();
  });

  it('handles errors', () => {
    return expectSaga(sagas.fetchPriceAlert, actionCreators.fetchPriceAlert(stubData))
      .provide([
        [matchers.call.fn(mongo.findOnePriceAlert), throwError(error)]
      ])
      .put({ type: types.FETCH_PRICE_ALERT_FAILED, message: error.message })
      .run();
  });
});

describe('saga: deletePriceAlert', () => {
  it('deletes an existing price alert', () => {
    return expectSaga(sagas.deletePriceAlert, actionCreators.deletePriceAlert(stubData))
      .provide([
        [matchers.call.fn(mongo.deletePriceAlert), stubData]
      ])
      .put({ type: types.DELETE_PRICE_ALERT_SUCCEEDED, payload: stubData })
      .run();
  });

  it('handles errors', () => {
    return expectSaga(sagas.deletePriceAlert, actionCreators.deletePriceAlert(stubData))
      .provide([
        [matchers.call.fn(mongo.deletePriceAlert), throwError(error)]
      ])
      .put({ type: types.DELETE_PRICE_ALERT_FAILED, message: error.message })
      .run();
  });
});

describe('saga: checkBlacklist', () => {
  it('checks blacklist for user email', () => {
    return expectSaga(sagas.checkBlacklist, actionCreators.checkBlacklist(stubData))
      .provide([
        [matchers.call.fn(mongo.checkBlacklist), stubData]
      ])
      .put({ type: types.CHECK_BLACKLIST_SUCCEEDED, payload: stubData })
      .run();
  });

  it('handles errors', () => {
    return expectSaga(sagas.checkBlacklist, actionCreators.checkBlacklist(stubData))
      .provide([
        [matchers.call.fn(mongo.checkBlacklist), throwError(error)]
      ])
      .put({ type: types.CHECK_BLACKLIST_FAILED, message: error.message })
      .run();
  });
});

describe('saga: addToBlacklist', () => {
  it('adds user email to blacklist', () => {
    return expectSaga(sagas.addToBlacklist, actionCreators.addToBlacklist(stubData))
      .provide([
        [matchers.call.fn(mongo.addToBlacklist), stubData]
      ])
      .put({ type: types.ADD_TO_BLACKLIST_SUCCEEDED, payload: stubData })
      .run();
  });

  it('handles errors', () => {
    return expectSaga(sagas.addToBlacklist, actionCreators.addToBlacklist(stubData))
      .provide([
        [matchers.call.fn(mongo.addToBlacklist), throwError(error)]
      ])
      .put({ type: types.ADD_TO_BLACKLIST_FAILED, message: error.message })
      .run();
  });
});

describe('saga: searchVideo', () => {
  it('searches YouTube for videoId', () => {

    return expectSaga(sagas.searchVideo, actionCreators.searchVideo(stubData))
      .provide([
        [matchers.call.fn(youTube.searchVideo), stubData]
      ])
      .put({ type: types.SEARCH_VIDEO_SUCCEEDED, payload: stubData })
      .run();
  });

  it('handles errors', () => {
    return expectSaga(sagas.searchVideo, actionCreators.searchVideo(stubData))
      .provide([
        [matchers.call.fn(youTube.searchVideo), throwError(error)]
      ])
      .put({ type: types.SEARCH_VIDEO_FAILED, message: error.message })
      .run();
  });
});
