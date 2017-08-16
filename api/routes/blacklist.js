const { decrypt } = require('../encrypt');
const { checkIfUserIsOnBlacklist, addToBlacklist, deleteAllPriceAlertsForUser } = require('./Model');


module.exports = function (app) {
    app.post('/blacklist/find/one', (req, res) => {
        const userEmail = parseUserEmailFromString(req.body.userEmail);
        checkIfUserIsOnBlacklist(userEmail).then(result => {
            res.send({ api: { onBlacklist: result, userEmail: userEmail } });
        });
    });

    app.put('/blacklist/add', (req, res) => {
        const userEmail = parseUserEmailFromString(req.body.userEmail);
        deleteAllPriceAlertsForUser(userEmail);
        addToBlacklist(userEmail).then(result => {
            res.send({ api: { onBlacklist: result, userEmail: userEmail } });
        });
    });
};

function parseUserEmailFromString(string) {
    const emailValidation = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailValidation.test(string)) {
        const decryptedString = decrypt(string);
        string = decryptedString.slice(decryptedString.indexOf('user:') + 5);
    }
    if (emailValidation.test(string)) {
        return string;
    }
    const error = new Error('invalid user email');
    console.error(error);
    throw error;
}
