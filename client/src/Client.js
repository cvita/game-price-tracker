function requestScrape(gameUrl) {
    return new Promise((resolve, reject) => {
        var request = new Request('/scrape', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });

        fetch(request, {
            method: 'POST',
            body: JSON.stringify({ "gameUrl": gameUrl })
        }).then(response => {
            if (response.ok) {
                resolve(response.json());
            } else {
                reject('Unable to get info from store');
            }
        });
    });
}

function createDBEntry(gameInfo) {
    return new Promise((resolve, reject) => {
        var request = new Request('/games', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });

        fetch(request, {
            method: 'POST',
            body: JSON.stringify(gameInfo)
        }).then(response => {
            if (response.ok) {
                response.json().then(response => {
                    if (!response.error) {
                        resolve(response);
                    } else {
                        reject(response.error);
                    }
                });
            } else {
                reject('Unable to add to DB');
            }
        });
    });
}

function deleteDBEntry(documentId) {
    return new Promise((resolve, reject) => {
        var request = new Request('/games/id:', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });

        fetch(request, {
            method: 'DELETE',
            body: JSON.stringify({ "id": documentId })
        }).then(response => {
            if (response.ok) {
                resolve('Successfully deleted from DB!');
            } else {
                reject('Unable to delete from DB');
            }
        });
    });
}

function confirmDBEntryExists(documentId) {
    return new Promise((resolve, reject) => {
        fetch(`/games/:?q=${documentId}`, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                response.json().then(response => {
                    resolve(response);
                });
            } else {
                reject('Unable to confirm if DB entry exists');
            }
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
            if (response.ok) {
                resolve('Successfully added to email blacklist!');
            } else {
                reject('Unable to add to email blacklist');
            }
        });
    });
}

function confirmUserIsOnBlacklist(userEmail) {
    return new Promise((resolve, reject) => {
        fetch(`/blacklist/:?q=${userEmail}`, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                response.json().then(response => {
                    resolve(response);
                });
            } else {
                reject('Unable to confirm if DB entry exists');
            }
        });
    });
}



const Client = { requestScrape, createDBEntry, deleteDBEntry, confirmDBEntryExists, addUserToBlacklist, confirmUserIsOnBlacklist };
export default Client;
