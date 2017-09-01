function findAllGames(maxResults = 25) {
    return new Promise((resolve, reject) => {
        fetch(`/games/find/all?max=${maxResults}`, { method: 'GET' })
            .then(response => handleResponse(response, resolve, reject));
    });
}

function findOneGame(id) {
    return new Promise((resolve, reject) => {
        fetch(`/games/find/one/?id=${encodeURIComponent(id)}`, { method: 'GET' })
            .then(response => handleResponse(response, resolve, reject));
    });
}

function addOrUpdateGame(gameInfo) {
    return new Promise((resolve, reject) => {
        const init = {
            headers: new Headers({ 'Content-Type': 'application/json' }),
            method: 'POST',
            body: JSON.stringify(gameInfo)
        };
        fetch('/games/add', init)
            .then(response => handleResponse(response, resolve, reject));
    });
}

function createPriceAlert(priceAlertInfo) {
    console.log(priceAlertInfo);
    return new Promise((resolve, reject) => {
        const init = {
            headers: new Headers({ 'Content-Type': 'application/json' }),
            method: 'POST',
            body: JSON.stringify(priceAlertInfo)
        };
        fetch('/priceAlerts/add', init)
            .then(response => handleResponse(response, resolve, reject));
    });
}

function findOnePriceAlert(id) {
    return new Promise((resolve, reject) => {
        const init = {
            headers: new Headers({ 'Content-Type': 'application/json' }),
            method: 'POST',
            body: JSON.stringify({ id: id })
        };
        fetch('/priceAlerts/find/one', init)
            .then(response => handleResponse(response, resolve, reject));
    });
}

function deletePriceAlert(userInfo) {
    return new Promise((resolve, reject) => {
        const init = {
            headers: new Headers({ 'Content-Type': 'application/json' }),
            method: 'DELETE',
            body: JSON.stringify(userInfo)
        };
        fetch('/priceAlerts/delete', init)
            .then(response => handleResponse(response, resolve, reject));
    });
}

function checkBlacklist(userEmail) {
    return new Promise((resolve, reject) => {
        const init = {
            headers: new Headers({ 'Content-Type': 'application/json' }),
            method: 'POST',
            body: JSON.stringify({ userEmail: userEmail })
        };
        fetch('/blacklist/find/one', init)
            .then(response => handleResponse(response, resolve, reject));
    });
}

function addToBlacklist(userEmail) {
    return new Promise((resolve, reject) => {
        const init = {
            headers: new Headers({ 'Content-Type': 'application/json' }),
            method: 'PUT',
            body: JSON.stringify({ userEmail: userEmail })
        };
        fetch('/blacklist/add', init)
            .then(response => handleResponse(response, resolve, reject));
    });
}

function handleResponse(response, resolve, reject) {
    if (!response.ok) {
        reject(new Error(response.statusText));
        return;
    }
    response.json().then(response => {
        console.log(response.api);
        resolve(response.api);
    });
}


export default {
    findAllGames,
    findOneGame,
    addOrUpdateGame,
    createPriceAlert,
    findOnePriceAlert,
    deletePriceAlert,
    checkBlacklist,
    addToBlacklist,
};
