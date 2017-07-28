import * as types from '../constants/actionTypes';
import initialState from '../initialState';


function newGames(state = initialState.newGames, action) {
    switch (action.type) {
        case types.FIND_NEW_GAMES_SUCCEEDED:
            return action.payload;
        default:
            return state;
    }
}


export default newGames;
