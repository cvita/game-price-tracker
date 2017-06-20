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

function checkIfPriceAlertExists(documentId) {
    return new Promise((resolve, reject) => {
        fetch(`/games/:?q=${documentId}`, {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                reject('Unable to confirm if price alert exists');
            }
            response.json().then(response => {
                resolve(response);
            });
        });
    });
}

function checkIfUserIsOnBlacklist(userEmail) {
    return new Promise((resolve, reject) => {
        fetch(`/blacklist/:?q=${userEmail}`, {
            method: 'GET'
        }).then(response => {
            if (!response.ok) {
                reject('Unable to confirm if DB entry exists');
            }
            response.json().then(response => {
                resolve(response);
            });
        });
    });
}

function deletePriceAlert(documentId) {
    return new Promise((resolve, reject) => {
        var request = new Request('/games/id:', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'DELETE',
            body: JSON.stringify({ "id": documentId })
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


const Client = { requestScrape, createPriceAlert, deletePriceAlert, checkIfPriceAlertExists, addUserToBlacklist, checkIfUserIsOnBlacklist };
export default Client;
