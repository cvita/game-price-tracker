function requestScrape(gameUrl) {
    return new Promise((resolve, reject) => {
        var request = new Request('/scrape', {
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
        var request = new Request('/games', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'POST',
            body: JSON.stringify(gameInfo)
        }).then(response => {
            if (!response.ok) {
                reject('Unable to add to DB');
            }
            response.json().then(response => {
                resolve(response);
            });
        });
    });
}

function checkForCurrentPriceAlerts(userInfo) {
    return new Promise((resolve, reject) => {
        var request = new Request('/games/user/status', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'POST',
            body: JSON.stringify(userInfo)
        }).then(response => {
            if (!response.ok) {
                reject('Unable to check price alert and blacklist status');
            }
            response.json().then(response => {
                resolve(response);
            });
        });
    });
}

function addUserToBlacklist(userEmail) {
    return new Promise((resolve, reject) => {
        var request = new Request('/blacklist/:id', {
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

function deletePriceAlert(alertInfo) {
    return new Promise((resolve, reject) => {
        var request = new Request('/games/user/delete', {
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


const Client = { requestScrape, createPriceAlert, deletePriceAlert, checkForCurrentPriceAlerts, addUserToBlacklist };
export default Client;
