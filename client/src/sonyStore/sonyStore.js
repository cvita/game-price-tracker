import model from './model';


function findGameById(gameId) {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/';
        const request = new Request(apiUrl + gameId);
        fetch(request, { method: 'GET' })
            .then(resp => resp.json())
            .then(resp => model.processSingleResultGameInfo(resp))
            .then(resp => resolve(resp))
            .catch(err => reject(err));
    });
}

function findGameByTitle(title, maxResults = 15) {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://store.playstation.com/store/api/chihiro/00_09_000/tumbler/US/en/19/';
        const request = new Request(apiUrl + title + '?suggested_size=5&mode=game&mode=film&mode=tv&mode=live_event');
        fetch(request, { method: 'GET' })
            .then(resp => resp.json())
            .then(resp => model.processMultipleResultGameInfo(resp, maxResults))
            .then(resp => resolve(resp))
            .catch(err => reject(err));
    });
}

function findNewGames(maxResults = 25) {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/';
        const request = new Request(apiUrl + 'STORE-MSF77008-NEWGAMESGRID?size=' + maxResults);
        fetch(request, { method: 'GET' })
            .then(resp => resp.json())
            .then(resp => model.processMultipleResultGameInfo(resp))
            .then(resp => resolve(resp))
            .catch(err => reject(err));
    });
}


export default {
    findGameById,
    findGameByTitle,
    findNewGames
};
