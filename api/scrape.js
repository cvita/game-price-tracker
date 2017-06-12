const Horseman = require('node-horseman');

module.exports = function scrapeSony(gameUrl) {
    return new Promise(function (resolve, reject) {
        console.log('Running scrapeSony()...');

        if (gameUrl.indexOf('store.playstation.com') === -1) {
            console.log('Error, must be a Sony PlayStation store url');
            return;
        }

        var horseman = new Horseman({
            injectJquery: true
        });

        horseman
            .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
            .open(gameUrl)
            .waitForSelector('.buyPrice')
            .evaluate(function () {
                
                var onSale = { "status": false };
                var strikePrice = $('.strikePrice:not(li) .price').text();
                if (strikePrice !== '') {
                    onSale.status = true;
                    onSale.originalPrice = strikePrice;
                }

                return {
                    "priceInt": Math.ceil($('.buyPrice .price').text().slice(1)),
                    "price": $('.buyPrice .price').text(),
                    "title": $('.productTitle').text(),
                    "image": $('.productThumbImg img').attr('src'),
                    "onSale": onSale
                }
            })
            .then(function (result) {
                console.log(result.onSale.originalPrice);
                horseman.close();
                resolve(result);
            })
            .catch(function (err) {
                console.error(err);
                reject(err);
            });
    });
};
