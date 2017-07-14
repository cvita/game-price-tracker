const encryption = require('../encrypt');
const email = require('../email');
const { findOnePriceAlert, findOneGame, createOrUpdatePriceAlert, deletePriceAlert } = require('../model');


module.exports = function (app, priceAlerts, games) {
    app.post('/priceAlerts/find/one', (req, res) => {
        var userEmail = req.body.id;
        if (userEmail.indexOf('@') === -1) {
            const manageId = encryption.decrypt(userEmail);
            const priceAlertId = manageId.slice(3, (manageId.indexOf('user:')));
            userEmail = manageId.slice(manageId.indexOf('user:') + 5);
            findOnePriceAlert(priceAlerts, priceAlertId).then(result => {
                if (!result) {
                    res.send({ api: { userInfo: {}, activeGame: null } });
                } else {
                    findOneGame(games, null, result.game_id).then(gameResult => {
                        res.send({ api: { userInfo: result, activeGame: gameResult } });
                    });
                }
            });
        }
    });

    app.post('/priceAlerts/add', (req, res) => {
        const priceAlertInfo = req.body;
        if (!priceAlertInfo.onBlacklist) {
            createOrUpdatePriceAlert(priceAlerts, priceAlertInfo).then(result => {
                priceAlertInfo._id = result.value ?
                    result.value._id :
                    result.lastErrorObject.upserted;
                res.send({ api: result });
                email.sendConfirmation(priceAlertInfo);
            });
        }
    });

    app.delete('/priceAlerts/delete', (req, res) => {
        deletePriceAlert(priceAlerts, req.body).then(result => {
            res.send({ api: result.deletedCount === 1 });
        });
    });
};
