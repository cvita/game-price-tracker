import * as types from '../constants/actionTypes'


export function fetchAllGamesInDb(maxResults) {
    console.log(`fetchAllGamesInDb(${maxResults})`);
    return {
        type: types.FETCH_ALL_GAMES_IN_DB_REQUESTED,
        payload: maxResults
    };
}

export function findPopularGames(maxResults) {
    console.log(`findPopularGames(${maxResults})`);
    return {
        type: types.FIND_POPULAR_GAMES_REQUESTED,
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
    return {
        type: types.SUBMIT_PRICE_ALERT_REQUESTED,
        payload: priceAlertInfo
    };
}

export function fetchPriceAlert(alertId, email) {
    return {
        type: types.FETCH_PRICE_ALERT_REQUESTED,
        payload: [alertId, email]
    };
}

export function deletePriceAlert(gameId, email) {
    return {
        type: types.DELETE_PRICE_ALERT_REQUESTED,
        payload: [gameId, email]
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
    return {
        type: types.ADD_TO_BLACKLIST_REQUESTED,
        payload: userEmail
    };
}

export function searchVideo(keywords) {
    console.log(`searchVideo(${keywords})`);
    return {
        type: types.SEARCH_VIDEO_REQUESTED,
        payload: keywords
    };
}
