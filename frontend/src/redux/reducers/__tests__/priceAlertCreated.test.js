import reducer from '../priceAlertCreated';
import initialState from '../../initialState';
import * as types from '../../constants/actionTypes';


describe('priceAlertCreated reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.priceAlertCreated);
  });

  it('should handle SUBMIT_PRICE_ALERT_SUCCEEDED', () => {
    const stubData = true;
    expect(
      reducer([], { type: types.SUBMIT_PRICE_ALERT_SUCCEEDED, payload: stubData })
    ).toEqual(true);
  });

  it('should handle DELETE_PRICE_ALERT_SUCCEEDED', () => {
    expect(
      reducer([], { type: types.DELETE_PRICE_ALERT_SUCCEEDED, payload: null })
    ).toEqual(initialState.priceAlertCreated);
  });

  it('should handle RESET_ACTIVE_GAME', () => {
    expect(
      reducer([], { type: types.RESET_ACTIVE_GAME, payload: null })
    ).toEqual(initialState.priceAlertCreated);
  });
});
