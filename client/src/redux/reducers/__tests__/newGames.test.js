import reducer from '../newGames';
import initialState from '../../initialState';
import * as types from '../../constants/actionTypes';


describe('newGames reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.newGames);
  });

  it('should handle FIND_NEW_GAMES_SUCCEEDED', () => {
    const stubData = [
      { title: 'Last Of Us' },
      { title: 'Bioshock II' },
      { title: 'Uncharted 4: A Theif\'s End' }
    ];
    expect(
      reducer([], { type: types.FIND_NEW_GAMES_SUCCEEDED, payload: stubData })
    ).toEqual(stubData);
  });
});
