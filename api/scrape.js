const Horseman = require('node-horseman');

// Does not allow arrow functions
module.exports = function scrapeSony(url) {
    return new Promise(function (resolve, reject) {
        console.log('Running scrapeSony()...');

        if (url.indexOf('store.playstation.com') === -1) {
            console.log('Error, must be a Sony PlayStation store url');
            return;
        }

        const horseman = new Horseman({
            injectJquery: true,
            timeout: 10000
        });

        horseman
            .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
            .open(url)
            .waitForSelector('.buyPrice', '.productTitle')
            .evaluate(function () {
                var onSale = false;
                var strikePrice = $('.strikePrice:not(li) .price').text();
                if (strikePrice !== '') {
                    onSale = true;
                    strikePrice = parseFloat(strikePrice.slice(1));
                }

                return {
                    _id: $('.productTitle').text().replace(/’/g, "\'"),
                    price: parseFloat($('.buyPrice .price').text().slice(1)),
                    onSale: onSale,
                    strikePrice: strikePrice,
                    lastUpdated: new Date(new Date().toDateString()).getTime(),
                    image: $('.productThumbImg img').attr('src'),
                };
            })
            .then(function (result) {
                horseman.close();
                result.url = url;
                resolve(result);
            })
            .catch(function (err) {
                console.error(err);
                reject(err);
            });
    });
};
