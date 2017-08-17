import reducer from '../popularGames';
import initialState from '../../initialState';
import * as types from '../../constants/actionTypes';


describe('popularGames reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.popularGames);
  });

  it('should handle FIND_POPULAR_GAMES_SUCCEEDED', () => {
    const stubData = [
      { title: 'Last Of Us' },
      { title: 'Bioshock II' },
      { title: 'Uncharted 4: A Theif\'s End' }
    ];
    expect(
      reducer([], { type: types.FIND_POPULAR_GAMES_SUCCEEDED, payload: stubData })
    ).toEqual(stubData);
  });
});
