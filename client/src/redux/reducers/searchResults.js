import * as types from '../constants/actionTypes';
import initialState from '../initialState';


function searchResults(state = initialState.searchResults, action) {
    switch (action.type) {
        case types.SEARCH_BY_TITLE_SUCCEEDED:
            return action.payload;
        case types.RESET_ACTIVE_GAME:
            return initialState.searchResults;
        default:
            return state;
    }
}


export default searchResults;
