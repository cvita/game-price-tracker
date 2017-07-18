function searchByTitle(title) {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://store.playstation.com/store/api/chihiro/00_09_000/tumbler/US/en/19/';
        const request = new Request(apiUrl + title + '?suggested_size=5&mode=game&mode=film&mode=tv&mode=live_event');
        fetch(request, { method: 'GET' })
            .then(resp => resp.json())
            .then(resp => {
                if (!resp.hasOwnProperty('links') || !Array.isArray(resp.links)) {
                    resolve([]);
                }
                const idValidation = /UP\d{4}-\w{9}_00-\w{16}/g;

                var validResults = [];
                for (let i = 0; i < resp.links.length; i++) {
                    let game = resp.links[i];
                    try {
                        if (!idValidation.test(game.id)) {
                            continue;
                        }

                        validResults.push({
                            _id: game.id,
                            title: game.name,
                            price: parseFloat(game.default_sku.display_price.slice(1)),
                            image: game.url + '/image?w=250&h=250',
                            details: { platforms: game.playable_platform, gameContentType: game.game_contentType }
                        });
                        if (validResults.length >= 15) {
                            break;
                        }
                    } catch (e) {
                        continue;
                    }
                }

                resolve(validResults);
            });
    });
}


export default searchByTitle;


