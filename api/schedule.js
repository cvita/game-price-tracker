const mongodb = require('mongodb');
const database = require('../db/database');
const scrapeSony = require('./scrape');
const email = require('./email');


(function checkPriceForEachGameInDatabase() {
    console.log('schedule.js: beginning script');
    mongodb.MongoClient.connect(database.url, (err, db) => {
        if (err) {
            return console.error(err);
        }
        const today = new Date().getTime();

        updateGamePriceToday(db, today).then(result => {
            console.log(result);
            emailSaleNotificationToActivePriceAlerts(db, today);
            deleteExpiredPriceAlerts(db, today); // Not currently notifying users
        });
    });
})();


function updateGamePriceToday(db, date) {
    return new Promise((resolve, reject) => {
        db.collection('games').find().toArray((err, allPriceAlerts) => {
            var counter = 0;
            allPriceAlerts.forEach((priceAlert, index) => {
                const previouslyRecordedPrice = priceAlert.gamePriceToday;
                scrapeSony(priceAlert.gameUrl).then(result => {
                    const newPrice = result.priceInt;
                    const onSale = newPrice < previouslyRecordedPrice;
                    db.collection('games').update(
                        { _id: priceAlert._id, gameUrl: priceAlert.gameUrl },
                        { $set: { gamePriceToday: newPrice, onSale: onSale } }, (err, doc) => {
                            if (err) {
                                console.error(err);
                                reject(err);
                            }
                            if (doc !== null) {
                                counter++;
                                if (counter === allPriceAlerts.length) {
                                    resolve("All gamePriceToday fields updated as of " + date);
                                }
                            }
                        });
                });
            });
        });
    });

}

function emailSaleNotificationToActivePriceAlerts(db, date) {
    db.collection('games').find({ onSale: true, alerts: { $elemMatch: { expirationInt: { $gte: date } } } })
        .toArray((err, docs) => {
            if (err) {
                console.error(err);
            }
            docs.forEach(doc => {
                var gameInfo = doc;
                gameInfo.alerts.forEach(priceAlert => {
                    console.log('schedule.js: alerting ' + priceAlert.userEmail + ' to sale');
                    email.sendSalePriceEmail(gameInfo, priceAlert.userEmail);
                });
            });
        });
}

function deleteExpiredPriceAlerts(db, date) {
    db.collection('games').update(
        { alerts: { $elemMatch: { expirationInt: { $lte: date } } } },
        { $pull: { alerts: { expirationInt: { $lte: date } } } }, (err, doc) => {
            if (err) {
                console.error(err);
            }
            console.log('schedule.js: deleted expired price alerts:', doc !== null); // Not an indication if anything was deleted
        });
}
