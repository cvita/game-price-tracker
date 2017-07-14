export function fetchAllGamesInDb() {
    console.log('fetchAllGamesInDb()');
    return {
        type: 'FETCH_ALL_GAMES_IN_DB_REQUESTED',
        payload: {}
    };
}

export function makeActiveGame(url) {
    console.log(`makeActiveGame(${url.slice(0, 10)})`);
    return {
        type: 'MAKE_ACTIVE_GAME_REQUESTED',
        payload: { url }
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
