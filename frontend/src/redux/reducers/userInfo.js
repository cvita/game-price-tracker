import * as types from '../constants/actionTypes';
import initialState from '../initialState';


function userInfo(state = initialState.userInfo, action) {
    switch (action.type) {
        case types.MAKE_ACTIVE_GAME_SUCCEEDED:
            return {
                ...state,
                game_id: action.payload._id,
                gameTitle: action.payload.title,
                price: action.payload.price
            };
        case types.CHECK_BLACKLIST_REQUESTED:
            return {
                ...state,
                userEmail: action.payload
            };
        case types.CHECK_BLACKLIST_SUCCEEDED:
            return {
                ...state,
                onBlacklist: action.payload
            };
        case types.ADD_TO_BLACKLIST_SUCCEEDED:
            return {
                ...state,
                onBlacklist: action.payload.onBlacklist,
                userEmail: action.payload.userEmail
            };
        case types.FETCH_PRICE_ALERT_SUCCEEDED:
            delete action.payload.userInfo.onBlacklist;
            return {
                ...state,
                ...action.payload.userInfo
            };
        case types.RESET_ACTIVE_GAME:
            return initialState.userInfo;
        default:
            return state;
    }
}


export default userInfo;
