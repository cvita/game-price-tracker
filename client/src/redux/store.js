import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';
import gamePriceTrackerSagas from './sagas';
import { loadingBarMiddleware } from 'react-redux-loading-bar'

//import {loadState, saveState} from './localStorage';

import initialState from './initialState';

const sagaMiddleware = createSagaMiddleware();
const loadingBar = loadingBarMiddleware();

const enhancers = compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(loadingBar),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

//const persistedState = loadState();

const store = createStore(rootReducer, initialState, enhancers);

// store.subscribe(() => {
//     saveState(store.getState());
// });

sagaMiddleware.run(gamePriceTrackerSagas);


export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) { // Enable hot reloading for reducers
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}


export default store;
