import * as types from '../constants/actionTypes'


export function fetchAllGamesInDb() {
    console.log('fetchAllGamesInDb()');
    return {
        type: types.FETCH_ALL_GAMES_IN_DB_REQUESTED,
        payload: null
    };
}

export function findNewGames(maxResults) {
    console.log(`findNewGames(${maxResults})`);
    return {
        type: types.FIND_NEW_GAMES_REQUESTED,
        payload: maxResults
    };
}

export function generateAutoSuggestions(title, maxResults) {
    console.log(`generateAutoSuggestions(${title})`);
    return {
        type: types.GENERATE_AUTO_SUGGESTIONS_REQUESTED,
        payload: { title, maxResults }
    };
}

export function searchByTitle(title) {
    console.log(`searchByTitle(${title})`);
    return {
        type: types.SEARCH_BY_TITLE_REQUESTED,
        payload: title
    };
}

export function makeActiveGame(gameId) {
    console.log(`makeActiveGame(${gameId.slice(0, 10)})`);
    return {
        type: types.MAKE_ACTIVE_GAME_REQUESTED,
        payload: gameId
    };
}

export function resetActiveGame() {
    console.log('resetActiveGame()');
    return {
        type: types.RESET_ACTIVE_GAME,
        payload: null
    };
}

export function createPriceAlert(priceAlertInfo) {
    console.log(`createPriceAlert(${priceAlertInfo})`);
    const today = new Date(new Date().toDateString()).getTime();
    priceAlertInfo.dateAdded = today;
    priceAlertInfo.expiration = today + 10886400000; // 18 weeks
    return {
        type: types.SUBMIT_PRICE_ALERT_REQUESTED,
        payload: priceAlertInfo
    };
}

export function fetchPriceAlert(_id) {
    console.log(`fetchPriceAlert(${_id.slice(0, 10)}...)`);
    return {
        type: types.FETCH_PRICE_ALERT_REQUESTED,
        payload: _id
    };
}

export function deletePriceAlert(userInfo) {
    console.log(`deletePriceAlert(${userInfo})`);
    return {
        type: types.DELETE_PRICE_ALERT_REQUESTED,
        payload: userInfo
    };
}

export function checkBlacklist(userEmail) {
    console.log(`checkBlacklist(${userEmail.slice(0, 10)}...)`);
    return {
        type: types.CHECK_BLACKLIST_REQUESTED,
        payload: userEmail
    };
}

export function addToBlacklist(userEmail) {
    console.log(`addToBlacklist(${userEmail})`);
    return {
        type: types.ADD_TO_BLACKLIST_REQUESTED,
        payload: userEmail
    };
}
