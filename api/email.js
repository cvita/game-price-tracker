const nodemailer = require('nodemailer');
const encryption = require('./encrypt'); // may not need
const MongoClient = require('mongodb').MongoClient;
const database = require('../db/database').url;


function sendEmail(email, subject, message) {
    checkBlacklist(email).then(result => {
        if (result) {
            return console.log('Email not sent! ' + email + ' is on blacklist.');
        }

        const transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'game.price.tracker@gmail.com',
                pass: process.env.emailPassword || require('../local-dev-creds').emailPassword
            }
        });

        const mailOptions = {
            from: 'game.price.tracker@gmail.com',
            to: email,
            subject: subject,
            html: message
        };

        transport.sendMail(mailOptions, (err, info) => {
            if (error) {
                return console.error(new Error(err));
            }
            console.log('Message sent to:', email);
        });
    });
}

function checkBlacklist(userEmail) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(database, (err, db) => {
            if (err) {
                console.error(new Error(err));
                reject(err);
            }
            const details = { _id: userEmail };
            db.collection('blacklist').findOne(details, (err, doc) => {
                if (err) {
                    console.error(new Error(err));
                    reject(err);
                }
                resolve(doc !== null);
            });
        });
    });
}

function sendConfirmation(info, uri) {
    const { _id, game_id, userEmail, price, expiration } = info;
    const manageId = encryption.encrypt('id:' + _id + 'user:' + userEmail);
    const managePriceAlert = process.env.NODE_ENV === 'production' ?
        'https://' + uri + '/unsubscribe/' + manageId :
        'https://localhost:3000/unsubscribe/' + manageId;
    const subject = game_id + ' is now being tracked';
    const message = (
        'Game Price Tracker is now tracking the price of <strong>' + game_id + '</strong>. ' +
        'If it drops below $' + price + ' before ' + new Date(expiration).toDateString() + ', ' +
        'you will be messaged again at this email address.<br><br>' +
        'Use <a href=' + managePriceAlert + '>this link</a> to manage your price alert, or to unsubscribe completely.'
    );
    sendEmail(userEmail, subject, message);
}

function sendSalePrice(info) {
    const { _id, userEmail, price, url } = info;
    const subject = _id + ' is on sale';
    const message = (
        _id + ' is currently on sale for $' + price + '.' +
        ' Check it out <a href=' + url + '>here</a>.'
    );
    sendEmail(userEmail, subject, message);
}

function sendRemovingPriceAlert(info) {
    const { _id, userEmail } = info;
    var subject = 'Removing Game Price Tracker alert for ' + _id;
    var message = (
        _id + ' has not gone on sale for 18 weeks. We are removing this price alert. ' +
        'Feel free to visit Game Price Tracker to sign up for another 18 week period.'
    );
    sendEmail(userEmail, subject, message);
}


module.exports = { sendConfirmation, sendSalePrice, sendRemovingPriceAlert };
