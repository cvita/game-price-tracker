import model from './model';


function findGameById(gameId) {
    return new Promise((resolve, reject) => {
        if (!model.validateGameId(gameId)) {
            reject(new Error('invalid game ID'));
            return;
        }
        const apiUrl = 'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/';
        const request = apiUrl + gameId;
        fetch(request, { method: 'GET' })
            .then(resp => resp.json())
            .then(resp => model.processSingleResultGameInfo(resp))
            .then(resp => resolve(resp))
            .catch(err => reject(err.message));
    });
}

function findGameByTitle(title, maxResults = 15) {
    return new Promise((resolve, reject) => {
        if (typeof title !== 'string') {
            reject(new Error('invalid game title'));
            return;
        }
        const apiUrl = 'https://store.playstation.com/store/api/chihiro/00_09_000/tumbler/US/en/19/';
        const request = apiUrl + encodeURIComponent(model.normalizeTitle(title)) + '?suggested_size=5&mode=game&mode=film&mode=tv&mode=live_event';
        fetch(request, { method: 'GET' })
            .then(resp => resp.json())
            .then(resp => model.processMultipleResultGameInfo(resp, maxResults))
            .then(resp => resolve(resp))
            .catch(err => reject(err.message));
    });
}

function findPopularGames(maxResults = 25) {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/';
        const request = apiUrl + 'STORE-MSF77008-TOPGAMES?size=' + maxResults;
        fetch(request, { method: 'GET' })
            .then(resp => resp.json())
            .then(resp => model.processMultipleResultGameInfo(resp))
            .then(resp => resolve(resp))
            .catch(err => reject(err.message));
    });
}


export default {
    findGameById,
    findGameByTitle,
    findPopularGames
};
