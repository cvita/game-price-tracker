const encryption = require('../encrypt'); // may not need
const { checkIfUserIsOnBlacklist, addToBlacklist } = require('../model');


module.exports = function (app, blacklist) {
    app.post('/blacklist/find/one', (req, res) => {
        var userEmail = req.body.userEmail;
        if (userEmail.indexOf('@') === -1) {
            const manageId = encryption.decrypt(userEmail);
            const priceAlertId = manageId.slice(0, manageId.indexOf('user:'));
            userEmail = manageId.slice(manageId.indexOf('user:') + 5);
        }
        checkIfUserIsOnBlacklist(blacklist, userEmail).then(result => {
            res.send({ api: { onBlacklist: result, userEmail: userEmail } });
        });
    });

    app.put('/blacklist/add', (req, res) => {
        var userEmail = req.body.userEmail;
        if (userEmail.indexOf('@') === -1) {
            const manageId = encryption.decrypt(userEmail);
            const priceAlertId = manageId.slice(0, manageId.indexOf('user:'));
            userEmail = manageId.slice(manageId.indexOf('user:') + 5);
        }
        addToBlacklist(blacklist, userEmail).then(result => {
            res.send({ api: { onBlacklist: result, userEmail: userEmail } });
        });
    });
};
