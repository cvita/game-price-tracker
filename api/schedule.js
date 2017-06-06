const schedule = require('node-schedule');
const mongodb = require('mongodb');
const database = require('../db/database');
const scrapeSony = require('./scrape');
const sendEmail = require('./email');


var scheduledScrape = schedule.scheduleJob('15 9 * * *', () => {
    checkPriceForEachGameInDatabase();
    console.log(
        'Ran checkPriceForEachGameInDatabase on' +
        new Date().toDateString()
    );
});


function checkPriceForEachGameInDatabase() {
    mongodb.MongoClient.connect(database.url, function (err, db) {
        if (err) {
            console.error(err);
        }

        var games = db.collection('games');

        games.find().toArray(function (err, docs) {
            if (err) {
                console.error(err);
            }

            var today = new Date().getTime();
            docs.forEach((doc, index) => {
                if (today < doc.expirationInt) {
                    scrapeSony(doc.gameUrl).then(result => {
                        if (result.priceInt < doc.priceInt) {

                            sendEmail(
                                doc.email,
                                doc.game + ' is on sale',
                                doc.game + ' is currently on sale for ' + result.price + '.'
                            );
                            // Todo: Consider deleting Mongo document or creating condition to avoid sending emails each day game is on sale
                        }
                    });
                } else {
                    console.log('Deleting', doc._id);
                    games.deleteOne({ "_id": doc._id });
                    sendEmail(
                        doc.email,
                        'Removing Game Price Tracker alert for ' + doc.game,
                        doc.game + ' has not gone on sale for 18 weeks. We are removing this price alert. ' +
                        'Feel free to visit Game Price Tracker to sign up for another 18 week period.'
                    );
                }
            });
        });
    });
}
