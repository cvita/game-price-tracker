import Client from './Client';


function findGameFromSony(storeCode) {
    return new Promise((resolve, reject) => {
        const request = new Request(`https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/${storeCode}`);
        fetch(request, { method: 'GET' })
            .then(response => processResponse(response))
            .then(response => {
                Client.addOrUpdateGame(response);
                resolve(response);
            }).catch(err => {
                reject(err);
            });
    });
}

function processResponse(resp) {
    return new Promise((resolve, reject) => {
        resp.json().then(game => {
            try {
                const today = new Date(new Date().toDateString()).getTime();
                const normalPrice = game.skus[0].display_price === 'Free' ?
                    '0.00' :
                    parseFloat(game.skus[0].display_price.slice(1));
                const onSale = game.default_sku.rewards.length > 0;
                var salePrice = null;
                var discount = null;
                var strikePrice = null;
                if (onSale) {
                    let saleInfo = game.default_sku.rewards[0];
                    salePrice = parseFloat(saleInfo.display_price.slice(1));
                    discount = parseInt(saleInfo.discount, 10);
                    strikePrice = normalPrice;
                }

                const info = {
                    _id: game.id,
                    title: game.title_name,
                    url: `https://store.playstation.com/#!/en-us/games/cid=${game.id}`,
                    price: normalPrice || salePrice,
                    strikePrice: strikePrice,
                    onSale: onSale,
                    discount: discount,
                    saleHistory: {},
                    lastUpdated: today,
                    image: `https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/${game.id}/image?w=400&h=400`,
                    media: { screenshots: [], videos: [] }
                };

                info.details = {
                    description: game.long_desc.slice(0, game.long_desc.indexOf('<br>')),
                    releaseDate: game.release_date,
                    gameDev: game.provider_name,
                    platforms: game.playable_platform.map(system => system.slice(0, system.indexOf('™'))),
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
            } catch (e) {
                const test = new Error();
                reject(test);
            }
        });
    });
}


export default findGameFromSony;
