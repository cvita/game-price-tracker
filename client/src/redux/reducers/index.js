import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar'


function gamesInDb(state = [], action) {
    switch (action.type) {
        case 'FETCH_GAMES_IN_DB_SUCCEEDED':
            return action.gamesInDb.gamesInDb;
        default:
            return state;
    }
}

function activeGame(state = {}, action) {
    switch (action.type) {
        case 'MAKE_ACTIVE_GAME_SUCCEEDED':
            return action.activeGame; // a single object
        case 'MAKE_ACTIVE_GAME_REQUESTED':
            return 'fetching game';
        case 'RESET_ACTIVE_GAME':
            return null;
        default:
            return state;
    }
}

function activePriceAlert(state = {}, action) {
    switch(action.type) {
        case 'CREATE_PRICE_ALERT_SUCCEEDED':
             console.log(action.priceAlert);
            return action.priceAlert;
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
    activeGame,
    activePriceAlert,
    gamesInDb,
    errors,
    loadingBar: loadingBarReducer,
    routing: routerReducer
});

export default rootReducer;
