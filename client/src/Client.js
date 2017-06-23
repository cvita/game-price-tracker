function requestScrape(gameUrl) {
    return new Promise((resolve, reject) => {
        var request = new Request('/games/find', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'POST',
            body: JSON.stringify({ "gameUrl": gameUrl })
        }).then(response => {
            if (!response.ok) {
                reject('Unable to get info from store');
            }
            resolve(response.json());
        });
    });
}

function createPriceAlert(gameInfo) {
    return new Promise((resolve, reject) => {
        var request = new Request('/games/create', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'POST',
            body: JSON.stringify(gameInfo)
        }).then(response => {
            if (!response.ok) {
                reject('Unable to add price alert to db');
            }
            response.json().then(response => {
                resolve(response);
            });
        });
    });
}

function checkForCurrentPriceAlerts(userEmail) {
    return new Promise((resolve, reject) => {
        var request = new Request('/games/check', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'POST',
            body: JSON.stringify({ "userEmail": userEmail })
        }).then(response => {
            if (!response.ok) {
                reject('Unable to check for active price alerts for userEmail');
            }
            response.json().then(response => {
                resolve(response);
            });
        });
    });
}

function deletePriceAlert(alertInfo) {
    return new Promise((resolve, reject) => {
        var request = new Request('/games/delete', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'DELETE',
            body: JSON.stringify(alertInfo)
        }).then(response => {
            if (!response.ok) {
                reject('Unable to delete from DB');
            }
            response.json().then(response => {
                resolve(response);
            });
        });
    });
}

function checkBlacklistForUserEmail(userEmail) {
    return new Promise((resolve, reject) => {
        var request = new Request('/blacklist/check', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'POST',
            body: JSON.stringify({ "userEmail": userEmail })
        }).then(response => {
            if (!response.ok) {
                reject('Unable to check blacklist for userEmail');
            }
            response.json().then(response => {
                resolve(response);
            });
        });
    });
}

function addUserToBlacklist(userEmail) {
    return new Promise((resolve, reject) => {
        var request = new Request('/blacklist/add', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'PUT',
            body: JSON.stringify({ "userEmail": userEmail })
        }).then(response => {
            if (!response.ok) {
                reject('Unable to add to email blacklist');
            }
            response.json().then(response => {
                resolve(response);
            });
        });
    });
}


const Client = { requestScrape, createPriceAlert, checkForCurrentPriceAlerts, deletePriceAlert, checkBlacklistForUserEmail, addUserToBlacklist };
export default Client;
