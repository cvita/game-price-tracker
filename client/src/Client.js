function findAllGames() {
    return new Promise((resolve, reject) => {
        const request = new Request(`/games/find/all`);
        fetch(request, {
            method: 'GET'
        }).then(response => handleResponse(response, resolve, reject));
    });
}

function findOneGame(url) {
    return new Promise((resolve, reject) => {
        const request = new Request(`/games/find/one/?url=${encodeURIComponent(url)}`);
        fetch(request, {
            method: 'GET'
        }).then(response => handleResponse(response, resolve, reject));
    });
}

function sendLinkToManagePriceAlertsToUser(userEmail) {
    return new Promise((resolve, reject) => {
        const request = new Request(`/priceAlerts/find/all/?userEmail=${userEmail}`);
        fetch(request, {
            method: 'GET'
        }).then(response => handleResponse(response, resolve, reject));
    });
}

function findAllPriceAlertsForUser(userEmail, id) {
    return new Promise((resolve, reject) => {
        const request = new Request('/priceAlerts/find/all', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'POST',
            body: JSON.stringify({ userEmail, id })
        }).then(response => handleResponse(response, resolve, reject));
    });
}

function createPriceAlert(priceAlertInfo) {
    return new Promise((resolve, reject) => {
        const request = new Request('/priceAlerts/add', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'POST',
            body: JSON.stringify(priceAlertInfo)
        }).then(response => handleResponse(response, resolve, reject));
    });
}

function deletePriceAlert(alertInfo) {
    return new Promise((resolve, reject) => {
        const request = new Request('/priceAlerts/delete', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'DELETE',
            body: JSON.stringify(alertInfo)
        }).then(response => handleResponse(response, resolve, reject));
    });
}

function checkBlacklistForUserEmail(userEmail) {
    return new Promise((resolve, reject) => {
        const request = new Request('/blacklist/find', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'POST',
            body: JSON.stringify({ userEmail: userEmail })
        }).then(response => handleResponse(response, resolve, reject));
    });
}

function addUserToBlacklist(userEmail) {
    return new Promise((resolve, reject) => {
        const request = new Request('/blacklist/add', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        fetch(request, {
            method: 'PUT',
            body: JSON.stringify({ userEmail: userEmail })
        }).then(response => handleResponse(response, resolve, reject));
    });
}


function handleResponse(response, resolve, reject) {
    if (!response.ok) {
        reject({ PROBLEM_WITH_RESPONSE: response });
    }
    response.json().then(response => resolve(response));
}


const Client = { findOneGame, createPriceAlert, findAllPriceAlertsForUser, deletePriceAlert, checkBlacklistForUserEmail, addUserToBlacklist, findAllGames, sendLinkToManagePriceAlertsToUser };
export default Client;
