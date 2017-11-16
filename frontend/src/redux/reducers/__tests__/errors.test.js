import reducer from '../errors';
import initialState from '../../initialState';
import * as types from '../../constants/actionTypes';


describe('errors reducer', () => {
  const stubData = ''
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.errors);
  });

  it('should handle ADD_TO_BLACKLIST_FAILED', () => {
    const expected = [{ message: '', type: types.ADD_TO_BLACKLIST_FAILED }];
    expect(
      reducer([], { type: types.ADD_TO_BLACKLIST_FAILED, message: '' })
    ).toEqual(expected);
  });

  it('should handle CHECK_BLACKLIST_FAILED', () => {
    const expected = [{ message: '', type: types.CHECK_BLACKLIST_FAILED }];
    expect(
      reducer([], { type: types.CHECK_BLACKLIST_FAILED, message: '' })
    ).toEqual(expected);
  });

  it('should handle DELETE_PRICE_ALERT_FAILED', () => {
    const expected = [{ message: '', type: types.DELETE_PRICE_ALERT_FAILED }];
    expect(
      reducer([], { type: types.DELETE_PRICE_ALERT_FAILED, message: '' })
    ).toEqual(expected);
  });

  it('should handle FETCH_ALL_GAMES_IN_DB_FAILED', () => {
    const expected = [{ message: '', type: types.FETCH_ALL_GAMES_IN_DB_FAILED }];
    expect(
      reducer([], { type: types.FETCH_ALL_GAMES_IN_DB_FAILED, message: '' })
    ).toEqual(expected);
  });

  it('should handle MAKE_ACTIVE_GAME_FAILED', () => {
    const expected = [{ message: '', type: types.MAKE_ACTIVE_GAME_FAILED }];
    expect(
      reducer([], { type: types.MAKE_ACTIVE_GAME_FAILED, message: '' })
    ).toEqual(expected);
  });

  it('should handle SEARCH_BY_TITLE_FAILED', () => {
    const expected = [{ message: '', type: types.SEARCH_BY_TITLE_FAILED }];
    expect(
      reducer([], { type: types.SEARCH_BY_TITLE_FAILED, message: '' })
    ).toEqual(expected);
  });

  it('should handle SUBMIT_PRICE_ALERT_FAILED', () => {
    const expected = [{ message: '', type: types.SUBMIT_PRICE_ALERT_FAILED }];
    expect(
      reducer([], { type: types.SUBMIT_PRICE_ALERT_FAILED, message: '' })
    ).toEqual(expected);
  });
});
