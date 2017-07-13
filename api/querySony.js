const rp = require('request-promise');


module.exports = function querySony(gameCode) {
    return new Promise((resolve, reject) => {
        console.log(`Now running querySony(${gameCode})`);

        const options = {
            uri: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/' + gameCode,
            headers: { 'User-Agent': 'Request-Promise' },
            json: true
        };

        rp(options)
            .then(game => {
                const today = new Date(new Date().toDateString()).getTime();
                const normalPrice = parseFloat(game.skus[0].display_price.slice(1));
                const onSale = game.default_sku.rewards.length > 0;
                var salePrice = null;
                var discount = null;
                var strikePrice = null;

                if (onSale) {
                    let saleInfo = game.default_sku.rewards[0];

                    salePrice = parseFloat(saleInfo.display_price.slice(1));
                    discount = parseInt(saleInfo.discount);
                    strikePrice = normalPrice;
                }

                resolve({
                    _id: game.title_name,
                    url: 'https://store.playstation.com/#!/en-us/games/' + game.id,
                    price: normalPrice || salePrice,
                    onSale: onSale,
                    discount: discount,
                    lastDateOnSale: null, // Todo: track last known sale
                    lastUpdated: today,
                    image: options.uri + '/image?_version=00_09_000&platform=chihiro&w=400&h=400',
                    releaseDate: game.release_date,
                    gameDev: game.provider_name,
                    media: {
                        screenshots: game.mediaList.screenshots.slice(0, 3).map(pic => pic.url),
                        videos: game.promomedia.slice(0, 2).map(video => video.url),
                        description: game.long_desc.slice(0, game.long_desc.indexOf('<br>'))
                    }
                });
            })
            .catch(err => {
                reject(err);
            });
    });
};
