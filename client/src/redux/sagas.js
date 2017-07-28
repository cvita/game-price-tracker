import { all, call, put, takeLatest } from 'redux-saga/effects';
import Client from '../Client';
import sonyStore from '../sonyStore/sonyStore';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import * as types from './constants/actionTypes'


function* fetchAllGamesInDb(action) {
    try {
        const allGames = yield call(Client.findAllGames);
        yield put({ type: types.FETCH_ALL_GAMES_IN_DB_SUCCEEDED, payload: allGames });
    } catch (e) {
        yield put({ type: types.FETCH_ALL_GAMES_IN_DB_FAILED, message: e.message });
    }
}

function* findNewGames(action) {
    try {
        const games = yield call(sonyStore.findNewGames, action.payload.maxResults);
        yield put({ type: types.FIND_NEW_GAMES_SUCCEEDED, payload: games });
    } catch (e) {
        yield put({ type: types.FIND_NEW_GAMES_FAILED, message: e.message });
    }
}

function* searchTitle(action) {
    try {
        const searchResults = yield call(sonyStore.findGameByTitle, action.payload);
        yield put({ type: types.SEARCH_BY_TITLE_SUCCEEDED, payload: searchResults });
    } catch (e) {
        yield put({ type: types.SEARCH_BY_TITLE_FAILED, message: e.message });
    }
}

function* generateAutoSuggestions(action) {
    try {
        const autoSuggestions = yield call(sonyStore.findGameByTitle, action.payload.title, action.payload.maxResults);
        yield put({ type: types.GENERATE_AUTO_SUGGESTIONS_SUCCEEDED, payload: autoSuggestions });
    } catch (e) {
        yield put({ type: types.GENERATE_AUTO_SUGGESTIONS_FAILED, message: e.message });
    }
}

function* makeActiveGame(action) {
    try {
        yield put(showLoading());
        const activeGame = yield call(sonyStore.findGameById, action.payload);
        yield put({ type: types.MAKE_ACTIVE_GAME_SUCCEEDED, payload: activeGame });
    } catch (e) {
        yield put({ type: types.MAKE_ACTIVE_GAME_FAILED, message: e.message });
    } finally {
        yield put(hideLoading());
    }
}

function* submitPriceAlert(action) {
    try {
        const priceAlert = yield call(Client.createPriceAlert, action.payload);
        yield put({ type: types.SUBMIT_PRICE_ALERT_SUCCEEDED, payload: priceAlert });
    } catch (e) {
        yield put({ type: types.SUBMIT_PRICE_ALERT_FAILED, message: e.message });
    }
}

function* fetchPriceAlert(action) {
    try {
        const userInfo = yield call(Client.findOnePriceAlert, action.payload);
        const activeGame = yield call(sonyStore.findGameById, userInfo.game_id);
        yield put({ type: types.FETCH_PRICE_ALERT_SUCCEEDED, payload: { activeGame, userInfo } });
    } catch (e) {
        yield put({ type: types.FETCH_PRICE_ALERT_FAILED, message: e.message });
    }
}

function* deletePriceAlert(action) {
    try {
        const priceAlert = yield call(Client.deletePriceAlert, action.payload);
        yield put({ type: types.DELETE_PRICE_ALERT_SUCCEEDED, payload: priceAlert });
    } catch (e) {
        yield put({ type: types.DELETE_PRICE_ALERT_FAILED, message: e.message });
    }
}

function* checkBlacklist(action) {
    try {
        const blacklistInfo = yield call(Client.checkBlacklist, action.payload);
        yield put({ type: types.CHECK_BLACKLIST_SUCCEEDED, payload: blacklistInfo });
    } catch (e) {
        yield put({ type: types.CHECK_BLACKLIST_FAILED, message: e.message });
    }
}

function* addToBlacklist(action) {
    try {
        const blacklistInfo = yield call(Client.addToBlacklist, action.payload);
        yield put({ type: types.ADD_TO_BLACKLIST_SUCCEEDED, payload: blacklistInfo });
    } catch (e) {
        yield put({ type: types.ADD_TO_BLACKLIST_FAILED, message: e.message });
    }
}


function* gamePriceTrackerSagas() {
    yield all([
        takeLatest(types.FETCH_ALL_GAMES_IN_DB_REQUESTED, fetchAllGamesInDb),
        takeLatest(types.FIND_NEW_GAMES_REQUESTED, findNewGames),
        takeLatest(types.GENERATE_AUTO_SUGGESTIONS_REQUESTED, generateAutoSuggestions),
        takeLatest(types.SEARCH_BY_TITLE_REQUESTED, searchTitle),
        takeLatest(types.MAKE_ACTIVE_GAME_REQUESTED, makeActiveGame),
        takeLatest(types.SUBMIT_PRICE_ALERT_REQUESTED, submitPriceAlert),
        takeLatest(types.CHECK_BLACKLIST_REQUESTED, checkBlacklist),
        takeLatest(types.ADD_TO_BLACKLIST_REQUESTED, addToBlacklist),
        takeLatest(types.FETCH_PRICE_ALERT_REQUESTED, fetchPriceAlert),
        takeLatest(types.DELETE_PRICE_ALERT_REQUESTED, deletePriceAlert)
    ]);
}


export default gamePriceTrackerSagas;
