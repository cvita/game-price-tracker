import { all, call, put, takeLatest } from 'redux-saga/effects';
import mongo from '../client/mongo';
import db from '../client/db';
import sony from '../client/sony';
import youTube from '../client/youTube';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import * as types from './constants/actionTypes'


export function* fetchAllGamesInDb(action) {
    try {
        const allGames = yield call(mongo.findAllGames, action.payload);
        yield put({ type: types.FETCH_ALL_GAMES_IN_DB_SUCCEEDED, payload: allGames });
    } catch (e) {
        yield put({ type: types.FETCH_ALL_GAMES_IN_DB_FAILED, message: e.message });
    }
}

export function* findPopularGames(action) {
    try {
        const games = yield call(sony.findPopularGames, action.payload);
        yield put({ type: types.FIND_POPULAR_GAMES_SUCCEEDED, payload: games });
    } catch (e) {
        yield put({ type: types.FIND_POPULAR_GAMES_FAILED, message: e.message });
    }
}

export function* searchTitle(action) {
    try {
        const searchResults = yield call(sony.findGameByTitle, action.payload);
        yield put({ type: types.SEARCH_BY_TITLE_SUCCEEDED, payload: searchResults });
    } catch (e) {
        yield put({ type: types.SEARCH_BY_TITLE_FAILED, message: e.message });
    }
}

export function* generateAutoSuggestions(action) {
    try {
        const autoSuggestions = yield call(sony.findGameByTitle, action.payload.title, action.payload.maxResults);
        yield put({ type: types.GENERATE_AUTO_SUGGESTIONS_SUCCEEDED, payload: autoSuggestions });
    } catch (e) {
        yield put({ type: types.GENERATE_AUTO_SUGGESTIONS_FAILED, message: e.message });
    }
}

export function* makeActiveGame(action) {
    try {
        yield put(showLoading());
        const activeGame = yield call(sony.findGameById, action.payload);
        yield put({ type: types.MAKE_ACTIVE_GAME_SUCCEEDED, payload: activeGame });
    } catch (e) {
        yield put({ type: types.MAKE_ACTIVE_GAME_FAILED, message: e.message });
    } finally {
        yield put(hideLoading());
    }
}

export function* submitPriceAlert(action) {
    try {
        const priceAlert = yield call(mongo.createPriceAlert, action.payload);
        yield put({ type: types.SUBMIT_PRICE_ALERT_SUCCEEDED, payload: priceAlert });
    } catch (e) {
        yield put({ type: types.SUBMIT_PRICE_ALERT_FAILED, message: e.message });
    }
}

export function* fetchPriceAlert(action) {
    try {
        const userInfo = yield call(mongo.findOnePriceAlert, action.payload);
        const activeGame = yield call(sony.findGameById, userInfo.game_id);
        yield put({ type: types.FETCH_PRICE_ALERT_SUCCEEDED, payload: { activeGame, userInfo } });
    } catch (e) {
        yield put({ type: types.FETCH_PRICE_ALERT_FAILED, message: e.message });
    }
}

export function* deletePriceAlert(action) {
    try {
        const priceAlert = yield call(mongo.deletePriceAlert, action.payload);
        yield put({ type: types.DELETE_PRICE_ALERT_SUCCEEDED, payload: priceAlert });
    } catch (e) {
        yield put({ type: types.DELETE_PRICE_ALERT_FAILED, message: e.message });
    }
}

export function* checkBlacklist(action) {
    try {
        const onBlacklist = yield call(db.checkBlacklist, action.payload);
        yield put({ type: types.CHECK_BLACKLIST_SUCCEEDED, payload: onBlacklist });
    } catch (e) {
        yield put({ type: types.CHECK_BLACKLIST_FAILED, message: e.message });
    }
}

export function* addToBlacklist(action) {
    try {
        const blacklistInfo = yield call(mongo.addToBlacklist, action.payload);
        yield put({ type: types.ADD_TO_BLACKLIST_SUCCEEDED, payload: blacklistInfo });
    } catch (e) {
        yield put({ type: types.ADD_TO_BLACKLIST_FAILED, message: e.message });
    }
}

export function* searchVideo(action) {
    try {
        console.log('SAGA: searchVideo() called');
        const videoId = yield call(youTube.searchVideo, action.payload);
        yield put({ type: types.SEARCH_VIDEO_SUCCEEDED, payload: videoId });
    } catch (e) {
        yield put({ type: types.SEARCH_VIDEO_FAILED, message: e.message });
    }
}


function* gamePriceTrackerSagas() {
    yield all([
        takeLatest(types.FETCH_ALL_GAMES_IN_DB_REQUESTED, fetchAllGamesInDb),
        takeLatest(types.FIND_POPULAR_GAMES_REQUESTED, findPopularGames),
        takeLatest(types.GENERATE_AUTO_SUGGESTIONS_REQUESTED, generateAutoSuggestions),
        takeLatest(types.SEARCH_BY_TITLE_REQUESTED, searchTitle),
        takeLatest(types.MAKE_ACTIVE_GAME_REQUESTED, makeActiveGame),
        takeLatest(types.SUBMIT_PRICE_ALERT_REQUESTED, submitPriceAlert),
        takeLatest(types.CHECK_BLACKLIST_REQUESTED, checkBlacklist),
        takeLatest(types.ADD_TO_BLACKLIST_REQUESTED, addToBlacklist),
        takeLatest(types.FETCH_PRICE_ALERT_REQUESTED, fetchPriceAlert),
        takeLatest(types.DELETE_PRICE_ALERT_REQUESTED, deletePriceAlert),
        takeLatest(types.SEARCH_VIDEO_REQUESTED, searchVideo)
    ]);
}


export default gamePriceTrackerSagas;
