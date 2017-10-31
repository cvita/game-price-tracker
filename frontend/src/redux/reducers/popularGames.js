import * as types from '../constants/actionTypes';
import initialState from '../initialState';


function popularGames(state = initialState.popularGames, action) {
    switch (action.type) {
        case types.FIND_POPULAR_GAMES_SUCCEEDED:
            return action.payload;
        default:
            return state;
    }
}


export default popularGames;
