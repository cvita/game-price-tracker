import reducer from '../searchResults';
import initialState from '../../initialState';
import * as types from '../../constants/actionTypes';


describe('searchResults reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.searchResults);
  });

  it('should handle SEARCH_BY_TITLE_SUCCEEDED', () => {
    const stubData = [
      { title: 'Last Of Us' },
      { title: 'Bioshock II' },
      { title: 'Uncharted 4: A Theif\'s End' }
    ];
    expect(
      reducer([], { type: types.SEARCH_BY_TITLE_SUCCEEDED, payload: stubData })
    ).toEqual(stubData);
  });

  it('should handle RESET_ACTIVE_GAME', () => {
    expect(
      reducer([], { type: types.RESET_ACTIVE_GAME, payload: null })
    ).toEqual(initialState.searchResults);
  });
});
