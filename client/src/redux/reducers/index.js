import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar'


function allGames(state = [], action) {
    switch (action.type) {
        case 'FETCH_ALL_GAMES_IN_DB_SUCCEEDED':
            return action.allGames;
        default:
            return state;
    }
}

function activeGame(state = {}, action) {
    switch (action.type) {
        case 'MAKE_ACTIVE_GAME_REQUESTED':
            return 'fetching game';
        case 'MAKE_ACTIVE_GAME_SUCCEEDED':
            return action.activeGame;
        case 'RESET_ACTIVE_GAME':
            return action.payload; // null
        default:
            return state;
    }
}

function activePriceAlert(state = {}, action) {
    switch (action.type) {
        case 'SUBMIT_PRICE_ALERT_SUCCEEDED':
        case 'FETCH_PRICE_ALERT_SUCCEEDED':
            return action.priceAlert;
        case 'RESET_ACTIVE_GAME': // revisit this idea...
            return {};
        default:
            return state;
    }
}

function userInfo(state = {}, action) {
    switch (action.type) {
        case 'PREPARE_PRICE_ALERT':
            return {
                ...state,
                userEmail: action.payload.userEmail
            };
        case 'MAKE_ACTIVE_GAME_SUCCEEDED':
            const dateAdded = new Date(new Date().toDateString()).getTime();
            return {
                ...state,
                game_id: action.activeGame._id,
                price: action.activeGame.price,
                dateAdded: dateAdded,
                expiration: dateAdded + 10886400000 // 18 weeks
            };
        case 'CHECK_BLACKLIST_SUCCEEDED':
        case 'ADD_TO_BLACKLIST_SUCCEEDED':
            return {
                onBlacklist: action.blacklistInfo.onBlacklist,
                userEmail: action.blacklistInfo.userEmail
            };
        case 'RESET_ACTIVE_GAME':
            return {};
        default:
            return state;
    }
}

function errors(state = [], action) {
    switch (action.type) {
        case 'ERROR':
            return [...state, { error: action.error }];
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    allGames,
    activeGame,
    activePriceAlert,
    userInfo,
    errors,
    loadingBar: loadingBarReducer,
    routing: routerReducer
});

export default rootReducer;
