const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const password = process.env.cryptokey || require('../local-dev-creds').cryptokey;
let iv = process.env.iv || require('../local-dev-creds').iv;
iv = iv.toString('hex').slice(0, 16);

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, new Buffer(password), new Buffer(iv));
    let crypted = cipher.update(text.toString(), 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    const decipher = crypto.createDecipheriv(algorithm, new Buffer(password), new Buffer(iv));
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}


module.exports = {
    encrypt,
    decrypt
};
