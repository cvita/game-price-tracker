// Each of these are action creators...
// Note that an action is just an object with a payload
// Also note the es6 syntax in these objects, where key:value pairs are the same



// export function increment(index) { // note the export here
//     return {
//         type: 'INCREMENT_LIKES',
//         index
//     };
// }

// export function addComment(postId, author, comment) {
//     return {
//         type: 'ADD_COMMENT',
//         postId,
//         author,
//         comment
//     };
// }

// export function removeComment(postId, i) {
//     return {
//         type: 'REMOVE_COMMENT',
//         i,
//         postId
//     };
// }

export function scrapeUrl(url) {
    console.log('Action creator, here', url);
    return {
        type: 'SCRAPE_URL',
        url
    }
}

export function makeActiveGame(gameUrl, userEmail) {
    return {
        type: 'MAKE_ACTIVE_GAME_REQUESTED',
        payload: { gameUrl, userEmail }
    };
}

export function resetActiveGame() {
    console.log('Reset active game called');
    return {
        type: 'RESET_ACTIVE_GAME',
        payload: {}
    };
}

export function createPriceAlertFromActiveGame(priceAlertInfo) {
    console.log(priceAlertInfo);
    return {
        type: 'CREATE_PRICE_ALERT_REQUESTED',
        payload: { priceAlertInfo }
    };
}

export function fetchGamesInDb() {
    return {
        type: 'FETCH_GAMES_IN_DB_REQUESTED',
        payload: {}
    };
}

