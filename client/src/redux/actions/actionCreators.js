export function fetchAllGamesInDb() {
    return {
        type: 'FETCH_ALL_GAMES_IN_DB_REQUESTED',
        payload: {}
    };
}

export function makeActiveGame(url) {
    return {
        type: 'MAKE_ACTIVE_GAME_REQUESTED',
        payload: { url }
    };
}

export function resetActiveGame() {
    return {
        type: 'RESET_ACTIVE_GAME',
        payload: null
    };
}

export function preparePriceAlert(userEmail) {
    return {
        type: 'PREPARE_PRICE_ALERT',
        payload: { userEmail }
    };
}

export function createPriceAlert(priceAlertInfo) {
    return {
        type: 'SUBMIT_PRICE_ALERT_REQUESTED',
        payload: { priceAlertInfo }
    };
}

export function fetchPriceAlert(_id) {
    return {
        type: 'FETCH_PRICE_ALERT_REQUESTED',
        payload: { _id }
    };
}

export function checkBlacklist(userEmail) {
    return {
        type: 'CHECK_BLACKLIST_REQUESTED',
        payload: { userEmail }
    };
}

export function addToBlacklist(userEmail) {
    return {
        type: 'ADD_TO_BLACKLIST_REQUESTED',
        payload: { userEmail }
    };
}
