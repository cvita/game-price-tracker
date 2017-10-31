import * as types from '../constants/actionTypes';
import initialState from '../initialState';


function autoSuggestions(state = initialState.autoSuggestions, action) {
    switch (action.type) {
        case types.GENERATE_AUTO_SUGGESTIONS_SUCCEEDED:
            return action.payload;
        case types.SEARCH_BY_TITLE_SUCCEEDED:
        case types.MAKE_ACTIVE_GAME_REQUESTED:
        case types.RESET_ACTIVE_GAME:
            return initialState.autoSuggestions;
        default:
            return state;
    }
}


export default autoSuggestions;
