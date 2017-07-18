export function fetchAllGamesInDb() {
    console.log('fetchAllGamesInDb()');
    return {
        type: 'FETCH_ALL_GAMES_IN_DB_REQUESTED',
        payload: {}
    };
}

export function searchByTitle(title) {
    console.log(`searchByTitle(${title})`);
    return {
        type: 'SEARCH_BY_TITLE_REQUESTED',
        payload: { title }
    };
}

export function findAutoSuggestions(title) {
    console.log(`findAutoSuggestions(${title})`);
    return {
        type: 'FIND_AUTO_SUGGESTIONS_REQUESTED',
        payload: { title }
    };
}

export function makeActiveGame(storeCode) {
    console.log(`makeActiveGame(${storeCode.slice(0, 10)})`);
    return {
        type: 'MAKE_ACTIVE_GAME_REQUESTED',
        payload: { storeCode }
    };
}

export function resetActiveGame() {
    console.log('resetActiveGame()');
    return {
        type: 'RESET_ACTIVE_GAME',
        payload: null
    };
}

export function createPriceAlert(priceAlertInfo) {
    console.log(`createPriceAlert(${priceAlertInfo})`);
    const today = new Date(new Date().toDateString()).getTime();
    priceAlertInfo.dateAdded = today;
    priceAlertInfo.expiration = today + 10886400000; // 18 weeks
    return {
        type: 'SUBMIT_PRICE_ALERT_REQUESTED',
        payload: { priceAlertInfo }
    };
}

export function fetchPriceAlert(_id) {
    console.log(`fetchPriceAlert(${_id.slice(0, 10)}...)`);
    return {
        type: 'FETCH_PRICE_ALERT_REQUESTED',
        payload: { _id }
    };
}

export function deletePriceAlert(userInfo) {
    console.log(`deletePriceAlert(${userInfo})`);
    return {
        type: 'DELETE_PRICE_ALERT_REQUESTED',
        payload: { userInfo }
    };
}

export function checkBlacklist(userEmail) {
    console.log(`checkBlacklist(${userEmail.slice(0, 10)}...)`);
    return {
        type: 'CHECK_BLACKLIST_REQUESTED',
        payload: { userEmail }
    };
}

export function addToBlacklist(userEmail) {
    console.log(`addToBlacklist(${userEmail})`);
    return {
        type: 'ADD_TO_BLACKLIST_REQUESTED',
        payload: { userEmail }
    };
}
