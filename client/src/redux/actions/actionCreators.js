export function scrapeUrl(url) {
    return {
        type: 'SCRAPE_URL',
        url
    }
}

export function makeActiveGame(gameUrl) {
    return {
        type: 'MAKE_ACTIVE_GAME_REQUESTED',
        payload: { gameUrl }
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

export function fetchGamesInDb() {
    return {
        type: 'FETCH_GAMES_IN_DB_REQUESTED',
        payload: null
    };
}
