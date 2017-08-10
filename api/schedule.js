const { findAllPriceAlerts, deletePriceAlert, addToPriceHistory, createOrUpdateGame } = require('./routes/Model');
const { sendRemovingPriceAlert, sendSalePrice } = require('./email');
const querySony = require('./querySony');
const today = new Date(new Date().toDateString()).getTime();


(function updateAndInformUsers() {
    console.log('updateAndInformUsers beginning...');
    const startTime = new Date().getTime();
    
    removeExpiredPriceAlerts().then(() => {
        return addGamesFromPriceAlertsToDb();
    }).then(result => {
        return determineSaleEvents(result);
    }).then(result => {
        const completionMessage = 'updateAndInformUsers completed in ' + (new Date().getTime() - startTime) + 'ms';
        console.log(result + '\n' + completionMessage);
    }).catch(e => {
        throw new Error(e.message);
    });
})();

function removeExpiredPriceAlerts() {
    return new Promise(resolve => {
        console.log('removeExpiredPriceAlerts()');
        findAllPriceAlerts('$lte', today).then(expiredAlerts => {
            if (expiredAlerts.length === 0) {
                resolve('removeExpiredPriceAlerts() complete');
                return;
            }
            let counter = 0;
            expiredAlerts.forEach(priceAlert => {
                deletePriceAlert(priceAlert.userEmail, priceAlert.game_id);
                sendRemovingPriceAlert(priceAlert);
                counter++;
                if (counter === expiredAlerts.length) {
                    resolve('removeExpiredPriceAlerts() complete');
                }
            });
        });
    });
}

function addGamesFromPriceAlertsToDb() {
    return new Promise(resolve => {
        console.log('addGamesFromPriceAlertsToDb()');
        findAllPriceAlerts('$gt', today).then(currentPriceAlerts => {
            let counter = 0;
            let currentGames = [];
            currentPriceAlerts.forEach(priceAlert => {
                querySony(priceAlert.game_id).then(gameInfo => {
                    addToPriceHistory({ _id: gameInfo._id, date: today, price: gameInfo.price });
                    createOrUpdateGame(gameInfo).then(() => {
                        currentGames.push(gameInfo);
                        counter++;
                        if (counter === currentPriceAlerts.length) {
                            resolve({
                                message: 'addGamesFromPriceAlertsToDb() complete',
                                currentPriceAlerts: currentPriceAlerts,
                                currentGames: currentGames
                            });
                        }
                    });
                });
            });
        });
    });
}

function determineSaleEvents(info) {
    return new Promise(resolve => {
        console.log('determineSaleEvents()');
        const games = info.currentGames;
        const priceAlerts = info.currentPriceAlerts;
        let counter = 0;
        games.forEach(game => {
            priceAlerts.forEach(priceAlert => {
                if (game._id === priceAlert.game_id && game.price < priceAlert.price) {
                    sendSalePrice(Object.assign(priceAlert, { url: game.url }));
                }
            });
            counter++;
            if (counter === games.length) {
                resolve('determineSalesEvents() complete');
            }
        });
    });
}
