import * as types from '../constants/actionTypes';
import initialState from '../initialState';


function errors(state = initialState.errors, action) {
  switch (action.type) {
    case types.ADD_TO_BLACKLIST_FAILED:
    case types.CHECK_BLACKLIST_FAILED:
    case types.DELETE_PRICE_ALERT_FAILED:
    case types.FETCH_ALL_GAMES_IN_DB_FAILED:
    case types.MAKE_ACTIVE_GAME_FAILED:
    case types.SEARCH_BY_TITLE_FAILED:
    case types.SUBMIT_PRICE_ALERT_FAILED:
      return [...state, action.message];
    default:
      return state;
  }
}


export default errors;
