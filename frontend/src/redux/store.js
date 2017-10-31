import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index';
import gamePriceTrackerSagas from './sagas';
import initialState from './initialState';
import { loadingBarMiddleware } from 'react-redux-loading-bar'

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const loadingBar = loadingBarMiddleware();
const middleware = [routerMiddleware(history), sagaMiddleware, loadingBar];
const enhancers = [];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(rootReducer, initialState, composedEnhancers);
sagaMiddleware.run(gamePriceTrackerSagas);

if (module.hot) { // Enable hot reloading for reducers
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}


export default store;
