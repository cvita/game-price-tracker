const mongodb = require('mongodb');
const database = require('../db/database');
const scrapeSony = require('./scrape');
const email = require('./email');


// Using the Heroku Scheduler add-on to call this function, daily at 15:30 UTC
(function checkPriceForEachGameInDatabase() {
    console.log('schedule.js: beginning script');
    mongodb.MongoClient.connect(database.url, function (err, db) {
        if (err) console.error(err);

        var emailBlacklist;
        db.collection('blacklist').find().toArray(function (err, docs) {
            if (err) console.err(err);
            emailBlacklist = docs[0].users;
        });

        var games = db.collection('games');
        games.find().toArray(function (err, docs) {
            if (err) console.error(err);
            var today = new Date().getTime();

            docs.forEach(function (doc, index) {
                if (emailBlacklist.indexOf(doc.userEmail) !== -1) {
                    console.log('schedule.js: deleting a price alert as userEmail is on blacklist');
                    games.deleteOne({ "_id": doc._id });
                } else {
                    if (today < doc.expirationInt) {
                        console.log('schedule.js: running scrapeSony() for ' + doc.game);
                        scrapeSony(doc.gameUrl).then(function (result) {
                            if (result.priceInt < doc.priceInt) {
                                console.log('schedule.js: alerting ' + doc.userEmail + ' to sale');
                                email.sendSalePriceEmail(doc, result);
                            } else {
                                console.log('schedule.js: ' + doc.game + ' is not on sale. No message sent');
                            }
                        });
                    } else {
                        console.log('schedule.js: deleting', doc._id);
                        games.deleteOne({ "_id": doc._id });
                        email.sendRemovingPriceAlertEmail(doc);
                    }
                }
            });
        });
    });
})();
