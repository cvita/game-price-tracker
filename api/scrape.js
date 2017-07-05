const Horseman = require('node-horseman');

module.exports = function scrapeSony(gameUrl) {
    return new Promise(function (resolve, reject) {
        console.log('Running scrapeSony()...');

        if (gameUrl.indexOf('store.playstation.com') === -1) {
            console.log('Error, must be a Sony PlayStation store url');
            return;
        }

        const horseman = new Horseman({
            injectJquery: true,
            timeout: 10000
        });

        horseman
            .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
            .open(gameUrl)
            .waitForSelector('.buyPrice')
            .evaluate(function () {
                const strikePrice = $('.strikePrice:not(li) .price').text();
                const onSale = strikePrice === "" ? false : true;

                return {
                    "game": $('.productTitle').text(),
                    "gameImage": $('.productThumbImg img').attr('src'),
                    "price": $('.buyPrice .price').text(),
                    "priceInt": Math.ceil($('.buyPrice .price').text().slice(1)),
                    "strikePrice": strikePrice,
                    "onSale": onSale
                }
            })
            .then(function (result) {
                horseman.close();
                resolve(result);
            })
            .catch(function (err) {
                console.error(err);
                reject(err);
            });
    });
};
