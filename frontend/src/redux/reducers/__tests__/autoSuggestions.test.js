import reducer from '../autoSuggestions';
import initialState from '../../initialState';
import * as types from '../../constants/actionTypes';


describe('autoSuggestions reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState.autoSuggestions);
  });

  it('should handle GENERATE_AUTO_SUGGESTIONS_SUCCEEDED', () => {
    const stubData = [
      { title: 'Last Of Us' },
      { title: 'Bioshock II' },
      { title: 'Uncharted 4: A Theif\'s End' }
    ];
    expect(
      reducer([], { type: types.GENERATE_AUTO_SUGGESTIONS_SUCCEEDED, payload: stubData })
    ).toEqual(stubData);
  });

  it('should handle SEARCH_BY_TITLE_SUCCEEDED', () => {
    expect(
      reducer([], { type: types.SEARCH_BY_TITLE_SUCCEEDED, payload: { title: 'Some Game' } })
    ).toEqual(initialState.autoSuggestions);
  });

  it('should handle MAKE_ACTIVE_GAME_REQUESTED', () => {
    const stubData = 'UP1280-CUSA05205_00-RLL4000000000000';
    expect(
      reducer([], { type: types.MAKE_ACTIVE_GAME_REQUESTED, payload: { gameId: stubData } })
    ).toEqual(initialState.autoSuggestions);
  });

  it('should handle RESET_ACTIVE_GAME', () => {
    expect(
      reducer([], { type: types.RESET_ACTIVE_GAME, payload: null })
    ).toEqual(initialState.autoSuggestions);
  });
});
