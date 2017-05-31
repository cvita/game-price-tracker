const crypto = require('crypto');

const password = process.env.cryptokey || 'secretPassword';

module.exports = function decrypt(text) {
    const decipher = crypto.createDecipher('aes-256-ctr', password);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};