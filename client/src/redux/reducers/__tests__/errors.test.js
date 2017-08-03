import reducer from '../errors';
import initialState from '../../initialState';
import * as types from '../../constants/actionTypes';


describe('errors reducer', () => {
  const stubData = { message: 'An error message' };

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.errors);
  });

  it('should handle ADD_TO_BLACKLIST_FAILED', () => {
    expect(
      reducer([], { type: types.ADD_TO_BLACKLIST_FAILED, message: stubData })
    ).toEqual([stubData]);
  });

  it('should handle CHECK_BLACKLIST_FAILED', () => {
    expect(
      reducer([], { type: types.CHECK_BLACKLIST_FAILED, message: stubData })
    ).toEqual([stubData]);
  });

  it('should handle DELETE_PRICE_ALERT_FAILED', () => {
    expect(
      reducer([], { type: types.DELETE_PRICE_ALERT_FAILED, message: stubData })
    ).toEqual([stubData]);
  });

  it('should handle FETCH_ALL_GAMES_IN_DB_FAILED', () => {
    expect(
      reducer([], { type: types.FETCH_ALL_GAMES_IN_DB_FAILED, message: stubData })
    ).toEqual([stubData]);
  });

  it('should handle MAKE_ACTIVE_GAME_FAILED', () => {
    expect(
      reducer([], { type: types.MAKE_ACTIVE_GAME_FAILED, message: stubData })
    ).toEqual([stubData]);
  });

  it('should handle SEARCH_BY_TITLE_FAILED', () => {
    expect(
      reducer([], { type: types.SEARCH_BY_TITLE_FAILED, message: stubData })
    ).toEqual([stubData]);
  });

  it('should handle SUBMIT_PRICE_ALERT_FAILED', () => {
    expect(
      reducer([], { type: types.SUBMIT_PRICE_ALERT_FAILED, message: stubData })
    ).toEqual([stubData]);
  });
});
