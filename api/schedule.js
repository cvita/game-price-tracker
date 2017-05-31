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

            const weeks18 = 10886400000;
            var today = new Date().getDate();

            docs.forEach((doc, index) => {
                if (today < doc.dateAdded + weeks18) {
                    scrapeSony(doc.gameUrl).then(result => {
                        if (result.price < doc.originalPrice) {

                            sendEmail(
                                doc.userEmail,
                                'Your game is on sale',
                                doc.gameTitle + ' is currently on sale for ' + result.literalPrice + '.'
                            );
                        }
                    });
                } else {
                    console.log('Deleting', doc._id);
                    games.deleteOne({ "_id": doc._id });
                }
            });
        });
    });
}
