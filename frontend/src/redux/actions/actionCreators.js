import * as types from '../constants/actionTypes'


export const findPopularGames = maxResults => ({
    type: types.FIND_POPULAR_GAMES_REQUESTED,
    payload: maxResults
});

export const generateAutoSuggestions = (title, maxResults) => ({
    type: types.GENERATE_AUTO_SUGGESTIONS_REQUESTED,
    payload: { title, maxResults }
});

export const searchByTitle = title => ({
    type: types.SEARCH_BY_TITLE_REQUESTED,
    payload: title
});

export const makeActiveGame = gameId => ({
    type: types.MAKE_ACTIVE_GAME_REQUESTED,
    payload: gameId
});

export const resetActiveGame = () => ({
    type: types.RESET_ACTIVE_GAME,
    payload: null
});

export const createPriceAlert = priceAlertInfo => ({
    type: types.SUBMIT_PRICE_ALERT_REQUESTED,
    payload: priceAlertInfo
});

export const fetchPriceAlert = (alertId, email) => ({
    type: types.FETCH_PRICE_ALERT_REQUESTED,
    payload: [alertId, email]
});

export const deletePriceAlert = (gameId, email) => ({
    type: types.DELETE_PRICE_ALERT_REQUESTED,
    payload: [gameId, email]
});

export const checkBlacklist = userEmail => ({
    type: types.CHECK_BLACKLIST_REQUESTED,
    payload: userEmail
});

export const addToBlacklist = userEmail => ({
    type: types.ADD_TO_BLACKLIST_REQUESTED,
    payload: userEmail
});

export const searchVideo = keywords => ({
    type: types.SEARCH_VIDEO_REQUESTED,
    payload: keywords
});
