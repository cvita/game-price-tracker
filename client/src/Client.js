
function requestScrape(gameUrl) {
    return new Promise((resolve, reject) => {
        var sliceTo = gameUrl.indexOf('/#!/') + 4;
        gameUrl = gameUrl.slice(sliceTo);

        return fetch(`/testscrape?q=${gameUrl}`, {
            accept: 'application/json'
        })
            .then(parseJSON)
            .then(result => {
                console.log(result);
                resolve(result);
            })
    });
}

function parseJSON(response) {
    return response.json();
}


function createDBEntry(gameInfo) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "/games");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(gameInfo));

    // How to receive and display response?

    if (xhr.readyState == 4)
        if (xhr.status == 200)
            console.log(xhr.responseText);
}


const Client = { requestScrape, createDBEntry };
export default Client;
