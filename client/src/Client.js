
function requestScrape(gameUrl) {
    return new Promise((resolve, reject) => {
        var request = new Request('/scrape', {
            headers: new Headers({ 'Content-Type': 'application/json' })
        });

        fetch(request, {
            method: 'POST',
            body: JSON.stringify({"gameUrl": gameUrl})
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
                resolve('Successfully added to DB!');
            } else {
                reject('Unable to add to DB');
            }
        });
    });
}


const Client = { requestScrape, createDBEntry };
export default Client;
