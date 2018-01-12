import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


// Reducers
import activeGame from './activeGame';
import popularGames from './popularGames';
import autoSuggestions from './autoSuggestions';
import searchResults from './searchResults';
import priceAlertCreated from './priceAlertCreated';
import userInfo from './userInfo';
import errors from './errors';
import { loadingBarReducer } from 'react-redux-loading-bar';


const rootReducer = combineReducers({
    popularGames,
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
