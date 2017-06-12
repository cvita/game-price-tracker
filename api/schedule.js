const schedule = require('node-schedule');
const mongodb = require('mongodb');
const database = require('../db/database');
const scrapeSony = require('./scrape');
const sendEmail = require('./email');
console.log('SEE: schedule.js loaded up!');

// Using Heroku Scheduler add-on for this process
(function () {
    console.log('SCHEDULED-TASK: pt.1 About to run checkPriceForEachGameInDatabase()...');
    checkPriceForEachGameInDatabase();
    console.log(
        'SCHEDULED-TASK: pt.2 Ran checkPriceForEachGameInDatabase() on' +
        new Date().toDateString() + '...'
    );
})();

// Use this code instead of Heroku Scheduler, if running locally
// var scheduledScrape = schedule.scheduleJob('15 9 * * *', function () {
//     console.log('SCHEDULED-TASK: pt.1 About to run checkPriceForEachGameInDatabase()...');
//     checkPriceForEachGameInDatabase();
//     console.log(
//         'SCHEDULED-TASK: pt.2 Ran checkPriceForEachGameInDatabase() on' +
//         new Date().toDateString() + '...'
//     );
// });


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
            docs.forEach(function (doc, index) {
                if (today < doc.expirationInt) {
                    console.log(
                        'SCHEDULED-TASK: pt.3 About to scrapeSony() for ' +
                        doc.game + ' for user ' + doc.userEmail + '...'
                    );
                    // Emailing an extra message during app development
                    sendEmail(
                        doc.userEmail,
                        doc.game + ' is being reevaluated',
                        doc.game + ' may or may not be on sale. Just letting you know we are looking into it'
                    );

                    scrapeSony(doc.gameUrl).then(function (result) {
                        if (result.priceInt < doc.priceInt) {

                            sendEmail(
                                doc.userEmail,
                                doc.game + ' is on sale',
                                doc.game + ' is currently on sale for ' + result.price + '.'
                            );
                            // Todo: Consider deleting Mongo document or creating condition to avoid sending emails each day game is on sale
                        }
                    });
                } else {
                    console.log(
                        'SCHEDULED-TASK: pt.3 About to delete Mongo document for ' +
                        doc.game + ' for user ' + doc.userEmail + '...'
                    );
                    console.log('Deleting', doc._id);
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
}
