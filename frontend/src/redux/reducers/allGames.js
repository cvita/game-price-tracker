import * as types from '../constants/actionTypes';
import initialState from '../initialState';


function allGames(state = initialState.allGames, action) {
  switch (action.type) {
    case types.FETCH_ALL_GAMES_IN_DB_SUCCEEDED:
      return action.payload;
    default:
      return state;
  }
}


export default allGames;
