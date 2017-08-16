const { findAllPriceAlerts, deleteExpiredPriceAlerts, addToPriceHistory, createOrUpdateGame, addScheduleLog } = require('./routes/Model');
const querySony = require('./querySony');
const { sendRemovingPriceAlert, sendSalePrice } = require('./email');


updateInfoAndInformUsers().then(status => {
    console.log(status);
    if (process.env.NODE_ENV === 'production') {
        addScheduleLog(status).then(result => console.log({ logSubmitted: result.insertedId !== null }));
        return;
    }
});


function updateInfoAndInformUsers() {
    return new Promise((resolve, reject) => {
        const status = {
            started: new Date().getTime(),
            elapsed: null
        };
        const expired = () => {
            return new Promise(resolve => {
                findAllPriceAlerts('$lte', status.started)
                    .then(expiredAlerts => handleExpiredAlerts(expiredAlerts))
                    .then(expiredAlerts => resolve(expiredAlerts));
            });
        }
        const current = () => {
            return new Promise(resolve => {
                findAllPriceAlerts('$gt', status.started)
                    .then(currentAlerts => handleCurrentAlerts(currentAlerts))
                    .then(currentGames => resolve(currentGames));
            });
        }

        Promise.all([expired(), current()]).then(results => {
            status.expiredAlerts = results[0];
            status.currentGames = results[1];
            status.elapsed = new Date().getTime() - status.started;
            resolve(status);
        }).catch(e => reject(e));
    });
}

function handleExpiredAlerts(expiredAlerts) {
    return new Promise(resolve => {
        const simplifiedPriceAlertInfo = expiredAlerts.map(priceAlert => {
            sendRemovingPriceAlert(priceAlert);
            return { title: priceAlert.gameTitle, userEmail: priceAlert.userEmail };
        });
        deleteExpiredPriceAlerts().then(() => resolve(simplifiedPriceAlertInfo));
    });
}

function handleCurrentAlerts(currentAlerts) {
    return new Promise((resolve, reject) => {
        const currentGames = currentAlerts.map(priceAlert => {
            return querySony(priceAlert.game_id).then(game => {
                return Promise.all([createOrUpdateGame(game), addToPriceHistory(game)]).then(() => {
                    return { onSale: determineSaleEvents(game, priceAlert), title: game.title };
                });
            }).catch(e => { throw new Error(e.message) });
        });

        Promise.all(currentGames)
            .then(results => resolve(results))
            .catch(e => reject(e));
    });
}

function determineSaleEvents(game, priceAlert) {
    const onSale = game.price < priceAlert.price;
    if (onSale) {
        sendSalePrice(priceAlert, game.url);
    }
    return onSale;
}


module.exports = updateInfoAndInformUsers;
