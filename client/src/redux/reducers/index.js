import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar'


function allGames(state = [], action) {
    switch (action.type) {
        case 'FETCH_GAMES_IN_DB_SUCCEEDED':
            return action.games.allGames;
        default:
            return state;
    }
}

function activeGame(state = {}, action) {
    switch (action.type) {
        case 'MAKE_ACTIVE_GAME_SUCCEEDED':
            return action.activeGame;
        case 'MAKE_ACTIVE_GAME_REQUESTED':
            return 'fetching game';
        case 'RESET_ACTIVE_GAME':
            return action.payload; // null
        default:
            return state;
    }
}

function activePriceAlert(state = {}, action) {
    switch (action.type) {
        case 'SUBMIT_PRICE_ALERT_SUCCEEDED':
            return action.priceAlert;
        case 'RESET_ACTIVE_GAME': // revisit this idea...
            return null;
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
        case 'RESET_ACTIVE_GAME':
            return {};
        default:
            return state;
    }
}

function allPriceAlerts(state = [], action) {
    switch (action.type) {
        case 'FIND_ALL_PRICE_ALERTS_SUCCEEDED':
            return action.allPriceAlerts.activePriceAlerts;
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
    allPriceAlerts,
    activePriceAlert,
    userInfo,
    errors,
    loadingBar: loadingBarReducer,
    routing: routerReducer
});

export default rootReducer;
