import reducer from '../userInfo';
import initialState from '../../initialState';
import * as types from '../../constants/actionTypes';


describe('userInfo reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.userInfo);
  });

  it('should handle MAKE_ACTIVE_GAME_SUCCEEDED', () => {
    const stubData = {
      title: 'Last Of Us',
      _id: 'UP9000-NPUA80960_00-THELASTOFUSDIG01',
      price: 19.99
    };
    const expectedResult = {
      gameTitle: 'Last Of Us',
      game_id: 'UP9000-NPUA80960_00-THELASTOFUSDIG01',
      price: 19.99
    };
    expect(
      reducer([], { type: types.MAKE_ACTIVE_GAME_SUCCEEDED, payload: stubData })
    ).toEqual(expectedResult);
  });

  it('should handle CHECK_BLACKLIST_SUCCEEDED', () => {
    const stubData = { onBlacklist: false, userEmail: 'anyone@gmail.com' };
    expect(
      reducer([], { type: types.CHECK_BLACKLIST_SUCCEEDED, payload: stubData })
    ).toEqual(stubData);
  });

  it('should handle ADD_TO_BLACKLIST_SUCCEEDED', () => {
    const stubData = { onBlacklist: false, userEmail: 'anyone@gmail.com' };
    expect(
      reducer([], { type: types.ADD_TO_BLACKLIST_SUCCEEDED, payload: stubData })
    ).toEqual(stubData);
  });

  it('should handle FETCH_PRICE_ALERT_SUCCEEDED', () => {
    const stubData = {
      userInfo: {
        onBlacklist: false,
        userEmail: 'anyone@gmail.com'
      },
      activeGame: {
        title: 'Last Of Us',
        _id: '5970da5dd6070cc46c9e6b90'
      }
    };
    const expectedResult = { title: 'Last Of Us', userEmail: 'anyone@gmail.com' };
    expect(
      reducer([], { type: types.FETCH_PRICE_ALERT_SUCCEEDED, payload: stubData })
    ).toEqual(expectedResult);
  });

  it('should handle SUBMIT_PRICE_ALERT_REQUESTED', () => {
    expect(
      reducer([], { type: types.SUBMIT_PRICE_ALERT_REQUESTED, payload: null })
    ).toEqual(initialState.userInfo);
  });

  it('should handle RESET_ACTIVE_GAME', () => {
    expect(
      reducer([], { type: types.RESET_ACTIVE_GAME, payload: null })
    ).toEqual(initialState.userInfo);
  });
});
