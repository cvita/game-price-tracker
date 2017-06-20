const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const password = process.env.cryptokey || 'secretPassword';

function encrypt(text) {
    const cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    const decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

const encryption = { encrypt, decrypt };
module.exports = encryption;
