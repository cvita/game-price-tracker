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
            return { userEmail: action.payload.userEmail };
        case 'MAKE_ACTIVE_GAME_SUCCEEDED':
            const dateAdded = new Date().toDateString();
            const expiration = new Date(dateAdded).getTime() + 10886400000; // 18 weeks
            return {
                ...state,
                game_id: action.activeGame._id,
                price: action.activeGame.price,
                dateAdded: dateAdded,
                expiration: new Date(expiration).toDateString()
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
    gamesInDb,
    activeGame,
    activePriceAlert,
    userInfo,
    errors,
    loadingBar: loadingBarReducer,
    routing: routerReducer
});

export default rootReducer;
