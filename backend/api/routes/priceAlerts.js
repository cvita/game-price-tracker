const { decrypt } = require('../encrypt');
const { findOnePriceAlert, createOrUpdatePriceAlert, deletePriceAlert } = require('./Model');
const { sendConfirmation } = require('../email');


module.exports = function (app) {
    app.post('/priceAlerts/find/one', (req, res) => {
        const manageId = decrypt(req.body.id);
        const priceAlertId = manageId.slice(3, (manageId.indexOf('user:')));
        findOnePriceAlert(priceAlertId)
            .then(result => res.send({ api: result }));
    });

    app.post('/priceAlerts/add', (req, res) => {
        const priceAlertInfo = req.body;
        if (!priceAlertInfo.onBlacklist) {
            createOrUpdatePriceAlert(priceAlertInfo).then(result => {
                priceAlertInfo._id = result.value ?
                    result.value._id :
                    result.lastErrorObject.upserted;
                res.send({ api: result });
                sendConfirmation(priceAlertInfo);
            });
        }
    });

    app.delete('/priceAlerts/delete', (req, res) => {
        deletePriceAlert(req.body.userEmail, req.body.game_id)
            .then(result => res.send({ api: result.deletedCount === 1 }));
    });
};
