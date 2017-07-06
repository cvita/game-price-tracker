import { all, call, put, takeLatest } from 'redux-saga/effects';
import Client from '../Client';
import { showLoading, hideLoading } from 'react-redux-loading-bar';


function* fetchGamesInDb(action) {
    try {
        yield put(showLoading());
        const gamesInDb = yield call(Client.findAllGamesInDb);
        yield put({ type: "FETCH_GAMES_IN_DB_SUCCEEDED", gamesInDb });
    } catch (e) {
        yield put({ type: "FETCH_GAMES_IN_DB_FAILED", message: e.message });
    } finally {
        yield put(hideLoading());
    }
}

function* makeActiveGame(action) {
    try {
        yield put(showLoading());
        const activeGame = yield call(Client.findGame, action.payload.gameUrl);
        yield put({ type: "MAKE_ACTIVE_GAME_SUCCEEDED", activeGame });
    } catch (e) {
        yield put({ type: "MAKE_ACTIVE_GAME_FAILED", message: e.message });
    } finally {
        yield put(hideLoading());
    }
}

function* submitPriceAlert(action) {
    try {
        yield put(showLoading());
        const priceAlert = yield call(Client.createPriceAlert, action.payload.priceAlertInfo);
        yield put({ type: "SUBMIT_PRICE_ALERT_SUCCEEDED", priceAlert });
    } catch (e) {
        yield put({ type: "SUBMIT_PRICE_ALERT_FAILED", message: e.message });
    } finally {
        yield put(hideLoading());
    }
}


function* gamePriceTrackerSagas() {
    yield all([
        takeLatest('FETCH_GAMES_IN_DB_REQUESTED', fetchGamesInDb),
        takeLatest('MAKE_ACTIVE_GAME_REQUESTED', makeActiveGame),
        takeLatest('SUBMIT_PRICE_ALERT_REQUESTED', submitPriceAlert)
    ]);
}


export default gamePriceTrackerSagas;
