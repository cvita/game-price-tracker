import * as types from '../constants/actionTypes';
import initialState from '../initialState';


function activeGame(state = initialState.activeGame, action) {
  switch (action.type) {
    case types.MAKE_ACTIVE_GAME_SUCCEEDED:
      return action.payload;
    case types.SEARCH_VIDEO_SUCCEEDED:
      return { ...state, videos: action.payload };
    case types.RESET_ACTIVE_GAME:
    case types.DELETE_PRICE_ALERT_SUCCEEDED:
      return initialState.activeGame;
    default:
      return state;
  }
}


export default activeGame;
