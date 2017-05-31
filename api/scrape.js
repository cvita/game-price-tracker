const Horseman = require('node-horseman');

module.exports = function scrapeSony(gameUrl) {
    return new Promise(function (resolve, reject) {

        if (gameUrl.indexOf('store.playstation.com') === -1) {
            console.log('Error, must be a Sony PlayStation store url');
            return;
        }
        console.log('scrape line 10');
        var horseman = new Horseman({
            injectJquery: true
        });

        horseman
            .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
            .open(gameUrl)
            .waitForSelector('.buyPrice')
            .evaluate(() => {
                return {
                    price: Math.ceil($('.buyPrice .price').text().slice(1)),
                    literalPrice: $('.buyPrice .price').text(),
                    title: $('.productTitle').text(),
                    ut: new Date().getTime()
                }
            })
            .then(result => {
                console.log('Found it!, line 28');
                horseman.close();
                resolve(result);
            })
            .catch(err => {
                console.error(err);
                reject(err);
            });
    });
};
