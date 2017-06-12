const mongodb = require('mongodb');
const database = require('../db/database');
const scrapeSony = require('./scrape');
const sendEmail = require('./email');


// Using the Heroku Scheduler add-on to call this function, daily at 15:30 UTC
var checkPriceForEachGameInDatabase = function () {
    console.log('schedule.js: beginning script');
    mongodb.MongoClient.connect(database.url, function (err, db) {
        if (err) console.error(err);
        var games = db.collection('games');
        games.find().toArray(function (err, docs) {
            if (err) console.error(err);
            var today = new Date().getTime();

            docs.forEach(function (doc, index) {
                if (today < doc.expirationInt) {
                    console.log('schedule.js: running scrapeSony() for ' + doc.game);
                    scrapeSony(doc.gameUrl).then(function (result) {
                        if (result.priceInt < doc.priceInt) {
                            console.log('schedule.js: alerting ' + doc.userEmail + ' to sale');
                            sendEmail(
                                doc.userEmail,
                                doc.game + ' is on sale',
                                doc.game + ' is currently on sale for ' + result.price + '.'
                            );
                        }
                    });
                } else {
                    console.log('schedule.js: deleting', doc._id);
                    games.deleteOne({ "_id": doc._id });
                    sendEmail(
                        doc.userEmail,
                        'Removing Game Price Tracker alert for ' + doc.game,
                        doc.game + ' has not gone on sale for 18 weeks. We are removing this price alert. ' +
                        'Feel free to visit Game Price Tracker to sign up for another 18 week period.'
                    );
                }
            });
        });
    });
};
