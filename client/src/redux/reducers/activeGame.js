import * as types from '../constants/actionTypes';
import initialState from '../initialState';


function activeGame(state = initialState.activeGame, action) {
  switch (action.type) {
    case types.MAKE_ACTIVE_GAME_SUCCEEDED:
      return action.payload;
    case types.FETCH_PRICE_ALERT_SUCCEEDED:
      return action.payload.activeGame;
    case types.RESET_ACTIVE_GAME:
    case types.DELETE_PRICE_ALERT_SUCCEEDED:
      return initialState.activeGame;
    default:
      return state;
  }
}


export default activeGame;
