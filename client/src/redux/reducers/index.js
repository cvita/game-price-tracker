import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar'
import * as types from '../constants/actionTypes'


function allGames(state = [], action) {
    switch (action.type) {
        case types.FETCH_ALL_GAMES_IN_DB_SUCCEEDED:
            return action.allGames;
        default:
            return state;
    }
}

function newGames(state = [], action) {
    switch (action.type) {
        case types.FIND_NEW_GAMES_SUCCEEDED:
            return action.games;
        default:
            return state;
    }
}

function activeGame(state = {}, action) {
    switch (action.type) {
        case types.MAKE_ACTIVE_GAME_SUCCEEDED:
            return action.activeGame;
        case types.RESET_ACTIVE_GAME:
        case types.DELETE_PRICE_ALERT_SUCCEEDED:
            return null;
        case types.FETCH_PRICE_ALERT_SUCCEEDED:
            return action.gameAndUserInfo.activeGame;
        default:
            return state;
    }
}

function autoSuggestions(state = [], action) {
    switch (action.type) {
        case types.GENERATE_AUTO_SUGGESTIONS_SUCCEEDED:
            return action.autoSuggestions;
        case types.SEARCH_BY_TITLE_SUCCEEDED:
        case types.MAKE_ACTIVE_GAME_REQUESTED:
        case types.RESET_ACTIVE_GAME:
            return [];
        default:
            return state;
    }
}

function searchResults(state = [], action) {
    switch (action.type) {
        case types.SEARCH_BY_TITLE_SUCCEEDED:
            return action.searchResults;
        case types.RESET_ACTIVE_GAME:
            return [];
        default:
            return state;
    }
}

function priceAlertCreated(state = false, action) {
    switch (action.type) {
        case types.SUBMIT_PRICE_ALERT_SUCCEEDED:
            return action.priceAlert.ok === 1;
        case types.RESET_ACTIVE_GAME:
        case types.DELETE_PRICE_ALERT_SUCCEEDED:
            return false;
        default:
            return state;
    }
}

function userInfo(state = {}, action) {
    switch (action.type) {
        case types.MAKE_ACTIVE_GAME_SUCCEEDED:
            return {
                ...state,
                game_id: action.activeGame._id,
                gameTitle: action.activeGame.title,
                price: action.activeGame.price
            };
        case types.CHECK_BLACKLIST_SUCCEEDED:
        case types.ADD_TO_BLACKLIST_SUCCEEDED:
            return {
                ...state,
                onBlacklist: action.blacklistInfo.onBlacklist,
                userEmail: action.blacklistInfo.userEmail
            };
        case types.FETCH_PRICE_ALERT_SUCCEEDED:
            delete action.gameAndUserInfo.userInfo._id;
            delete action.gameAndUserInfo.userInfo.onBlacklist;
            return {
                ...state,
                ...action.gameAndUserInfo.userInfo
            };
        case types.SUBMIT_PRICE_ALERT_REQUESTED:
        case types.RESET_ACTIVE_GAME:
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
        case types.ADD_TO_BLACKLIST_FAILED:
        case types.CHECK_BLACKLIST_FAILED:
        case types.DELETE_PRICE_ALERT_FAILED:
        case types.FETCH_ALL_GAMES_IN_DB_FAILED:
        case types.MAKE_ACTIVE_GAME_FAILED:
        case types.SEARCH_BY_TITLE_FAILED:
        case types.SUBMIT_PRICE_ALERT_FAILED:
            return [...state, { error: action }];
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    allGames,
    newGames,
    autoSuggestions,
    searchResults,
    activeGame,
    priceAlertCreated,
    userInfo,
    errors,
    loadingBar: loadingBarReducer,
    routing: routerReducer
});

export default rootReducer;
