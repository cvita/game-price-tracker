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
        case 'MAKE_ACTIVE_GAME_SUCCEEDED':
            return action.activeGame;
        case 'UPDATE_ACTIVE_GAME_REQUESTED':
            console.log('UPDATING', state);
            return { ...state, updating: true };
        case 'RESET_ACTIVE_GAME':
        case 'DELETE_PRICE_ALERT_SUCCEEDED':
            return null;
        case 'FETCH_PRICE_ALERT_SUCCEEDED':
            return action.gameAndUserInfo.activeGame;
        default:
            return state;
    }
}

function priceAlertCreated(state = false, action) {
    switch (action.type) {
        case 'SUBMIT_PRICE_ALERT_SUCCEEDED':
            return action.priceAlert.ok === 1;
        case 'RESET_ACTIVE_GAME': // revisit this idea...
        case 'DELETE_PRICE_ALERT_SUCCEEDED':
            return false;
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
            return {
                ...state,
                game_id: action.activeGame._id,
                price: action.activeGame.price
            };
        case 'CHECK_BLACKLIST_SUCCEEDED':
        case 'ADD_TO_BLACKLIST_SUCCEEDED':
            return {
                ...state,
                onBlacklist: action.blacklistInfo.onBlacklist,
                userEmail: action.blacklistInfo.userEmail
            };
        case 'FETCH_PRICE_ALERT_SUCCEEDED':
            delete action.gameAndUserInfo.userInfo._id;
            delete action.gameAndUserInfo.userInfo.onBlacklist;
            return {
                ...state,
                ...action.gameAndUserInfo.userInfo
            };
        case 'SUBMIT_PRICE_ALERT_REQUESTED':
            return state;
        case 'SUBMIT_PRICE_ALERT_SUCCEEDED':
            return state;
        case 'RESET_ACTIVE_GAME':
            return {
                userEmail: null,
                onBlacklist: null,
                game_id: null,
                price: null,
                dateAdded: null,
                expiration: null
            };
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
    priceAlertCreated,
    userInfo,
    errors,
    loadingBar: loadingBarReducer,
    routing: routerReducer
});

export default rootReducer;
