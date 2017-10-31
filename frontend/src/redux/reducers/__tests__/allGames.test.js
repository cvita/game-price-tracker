import reducer from '../allGames';
import initialState from '../../initialState';
import * as types from '../../constants/actionTypes';


describe('allGames reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.allGames);
  });

  it('should handle FETCH_ALL_GAMES_IN_DB_SUCCEEDED', () => {
    const stubData = [
      { title: 'Last Of Us' },
      { title: 'Bioshock II' },
      { title: 'Uncharted 4: A Theif\'s End' }
    ];
    expect(
      reducer([], { type: types.FETCH_ALL_GAMES_IN_DB_SUCCEEDED, payload: stubData })
    ).toEqual(stubData);
  });
});
