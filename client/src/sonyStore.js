function findOneGameById(gameId) {
    return new Promise((resolve, reject) => {
        const request = new Request(`https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/${gameId}`);
        fetch(request, { method: 'GET' })
            .then(response => response.json())
            .then(response => processSingleResultGameInfo(response))
            .then(response => resolve(response))
            .catch(err => reject(err));
    });
}

function findOneGameByTitle(title) {
    return new Promise((resolve, reject) => {
        const apiUrl = 'https://store.playstation.com/store/api/chihiro/00_09_000/tumbler/US/en/19/';
        const request = new Request(apiUrl + title + '?suggested_size=5&mode=game&mode=film&mode=tv&mode=live_event');
        fetch(request, { method: 'GET' })
            .then(resp => resp.json())
            .then(resp => processMultipleResultGameInfo(resp))
            .then(resp => resolve(resp))
            .catch(err => reject(err));
    });
}


function processSingleResultGameInfo(game) {
    return new Promise(resolve => {
        const normalPrice = game.skus[0].display_price !== 'Free' ?
            parseFloat(game.skus[0].display_price.slice(1)) :
            '0.00';

        const info = {
            _id: game.id,
            title: game.title_name,
            url: `https://store.playstation.com/#!/en-us/games/cid=${game.id}`,
            price: normalPrice,
            strikePrice: null,
            onSale: game.default_sku.rewards.length > 0,
            discount: null,
            saleHistory: {},
            lastUpdated: new Date(new Date().toDateString()).getTime(),
            image: `https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/${game.id}/image?w=400&h=400`,
        };

        if (info.onSale) {
            let saleInfo = game.default_sku.rewards[0];
            info.price = parseFloat(saleInfo.display_price.slice(1));
            info.strikePrice = normalPrice;
            info.discount = parseInt(saleInfo.discount, 10);
        }

        info.details = {
            description: game.long_desc.slice(0, game.long_desc.indexOf('<br>')),
            releaseDate: game.release_date,
            gameDev: game.provider_name,
            platforms: game.playable_platform,
            starRating: parseFloat(game.star_rating.score),
            esrbRating: game.content_rating.url
        };

        try {
            info.media = {
                screenshots: game.mediaList.screenshots.slice(0, 3).map(pic => pic.url),
                videos: game.promomedia.slice(0, 2).map(video => video.url)
            };
        } catch (e) {
            info.media = { screenshots: [], videos: [] };
        }

        resolve(info);
    });
}

function processMultipleResultGameInfo(results) {
    return new Promise(resolve => {
        if (!results.hasOwnProperty('links') || !Array.isArray(results.links)) {
            resolve([]);
        }
        const idValidation = /UP\d{4}-\w{9}_00-\w{16}/g;
        let validResults = [];

        for (let i = 0; i < results.links.length; i++) {
            let game = results.links[i];
            try {
                if (!idValidation.test(game.id)) {
                    continue;
                }
                if (validResults.length >= 15) {
                    break;
                }
                validResults.push({
                    _id: game.id,
                    title: game.name,
                    price: parseFloat(game.default_sku.display_price.slice(1)),
                    image: game.url + '/image?w=250&h=250',
                    details: { platforms: game.playable_platform, gameContentType: game.game_contentType }
                });
            } catch (e) {
                continue;
            }
        }

        resolve(validResults);
    });
}


export default {
    findOneGameById,
    findOneGameByTitle
};
