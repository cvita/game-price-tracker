import * as types from '../constants/actionTypes';
import initialState from '../initialState';


function userInfo(state = initialState.userInfo, action) {
    switch (action.type) {
        case types.MAKE_ACTIVE_GAME_SUCCEEDED:
            return {
                ...state,
                gameId: action.payload._id,
                title: action.payload.title,
                price: action.payload.price
            };
        case types.CHECK_BLACKLIST_REQUESTED:
            return {
                ...state,
                email: action.payload
            };
        case types.CHECK_BLACKLIST_SUCCEEDED:
            return {
                ...state,
                onBlacklist: action.payload
            };
        case types.ADD_TO_BLACKLIST_SUCCEEDED:
            return { on_blacklist: action.payload };
        case types.FETCH_PRICE_ALERT_SUCCEEDED:
            return {
                ...state,
                ...action.payload
            };
        case types.RESET_ACTIVE_GAME:
            return initialState.userInfo;
        default:
            return state;
    }
}


export default userInfo;
