import { all, call, put, takeLatest } from 'redux-saga/effects';
import Client from '../Client';
import { showLoading, hideLoading } from 'react-redux-loading-bar';


function* fetchAllGamesInDb(action) {
    try {
        const allGames = yield call(Client.findAllGames);
        yield put({ type: 'FETCH_ALL_GAMES_IN_DB_SUCCEEDED', allGames });
    } catch (e) {
        yield put({ type: 'FETCH_ALL_GAMES_IN_DB_FAILED', message: e.message });
    }
}

function* makeActiveGame(action) {
    try {
        yield put(showLoading());
        var activeGame = yield call(Client.findGameFromSony, action.payload.url);
        yield put({ type: 'MAKE_ACTIVE_GAME_SUCCEEDED', activeGame });
    } catch (e) {
        yield put({ type: 'MAKE_ACTIVE_GAME_FAILED', message: e.message });
    } finally {
        yield put(hideLoading());
    }
}

function* submitPriceAlert(action) {
    try {
        const priceAlert = yield call(Client.createPriceAlert, action.payload.priceAlertInfo);
        yield put({ type: 'SUBMIT_PRICE_ALERT_SUCCEEDED', priceAlert });
    } catch (e) {
        yield put({ type: 'SUBMIT_PRICE_ALERT_FAILED', message: e.message });
    }
}

function* fetchPriceAlert(action) {
    try {
        const gameAndUserInfo = yield call(Client.findOnePriceAlert, action.payload._id);
        console.log(gameAndUserInfo);
        yield put({ type: 'FETCH_PRICE_ALERT_SUCCEEDED', gameAndUserInfo });
    } catch (e) {
        yield put({ type: 'FETCH_PRICE_ALERT_FAILED', message: e.message });
    }
}

function* deletePriceAlert(action) {
    try {
        const priceAlert = yield call(Client.deletePriceAlert, action.payload.userInfo);
        yield put({ type: 'DELETE_PRICE_ALERT_SUCCEEDED', priceAlert });
    } catch (e) {
        yield put({ type: 'DELETE_PRICE_ALERT_FAILED', message: e.message });
    }
}

function* checkBlacklist(action) {
    try {
        const blacklistInfo = yield call(Client.checkBlacklist, action.payload.userEmail);
        yield put({ type: 'CHECK_BLACKLIST_SUCCEEDED', blacklistInfo });
    } catch (e) {
        yield put({ type: 'CHECK_BLACKLIST_FAILED', message: e.message });
    }
}

function* addToBlacklist(action) {
    try {
        const blacklistInfo = yield call(Client.addToBlacklist, action.payload.userEmail);
        yield put({ type: 'ADD_TO_BLACKLIST_SUCCEEDED', blacklistInfo });
    } catch (e) {
        yield put({ type: 'ADD_TO_BLACKLIST_FAILED', message: e.message });
    }
}


function* gamePriceTrackerSagas() {
    yield all([
        takeLatest('FETCH_ALL_GAMES_IN_DB_REQUESTED', fetchAllGamesInDb),
        takeLatest('MAKE_ACTIVE_GAME_REQUESTED', makeActiveGame),
        takeLatest('SUBMIT_PRICE_ALERT_REQUESTED', submitPriceAlert),
        takeLatest('CHECK_BLACKLIST_REQUESTED', checkBlacklist),
        takeLatest('ADD_TO_BLACKLIST_REQUESTED', addToBlacklist),
        takeLatest('FETCH_PRICE_ALERT_REQUESTED', fetchPriceAlert),
        takeLatest('DELETE_PRICE_ALERT_REQUESTED', deletePriceAlert)
    ]);
}


export default gamePriceTrackerSagas;
