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
            if (err) {
                return console.error(new Error(err));
            }
            console.log('Message sent to:', email);
        });
    });
}

function checkBlacklist(userEmail) {
    console.log('checkBlacklist()');
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

function sendConfirmation(info) {
    console.log('sendConfirmation()');
    const { gameTitle, userEmail, price, expiration } = info;
    const subject = gameTitle + ' is now being tracked';
    const message = (
        'Game Price Tracker is now tracking the price of <strong>' + gameTitle + '</strong>. ' +
        'If it drops below $' + price + ' before ' + new Date(expiration).toDateString() + ', ' +
        'you will be messaged again at this email address.<br><br>' +
        'Use ' + generateManagePriceAlertLink(info, 'this link') + ' to manage your price alert, or to unsubscribe completely.'
    );
    sendEmail(userEmail, subject, message);
}

function sendSalePrice(info) {
    console.log('sendSalePrice()');
    const { gameTitle, userEmail, price, url } = info;
    const subject = gameTitle + ' is on sale';
    const message = (
        gameTitle + ' is currently on sale for $' + price + ' on the Sony PlayStation store.' +
        ' Check it out <a href=' + url + '>here</a>' +
        '<br><br>' +
        'No more? ' + generateManagePriceAlertLink(info, 'unsubscribe')
    );
    sendEmail(userEmail, subject, message);
}

function sendRemovingPriceAlert(info) {
    console.log('sendRemovingPriceAlert()');
    const { gameTitle, userEmail } = info;
    const subject = 'Removing Game Price Tracker alert for ' + _id;
    const message = (
        gameTitle + ' has not gone on sale for 18 weeks. We are removing this price alert. ' +
        'Feel free to visit Game Price Tracker to sign up for another 18 week period.'
    );
    sendEmail(userEmail, subject, message);
}

function generateManagePriceAlertLink(info, linkText) {
    const { _id, userEmail } = info;
    const userDetails = encryption.encrypt('id:' + _id + 'user:' + userEmail);
    const managePriceAlertUrl = process.env.NODE_ENV === 'production' ?
        'https://game-price-tracker.herokuapp.com/manage/' :
        'https://localhost:3000/manage/';

    return '<a href=' + managePriceAlertUrl + userDetails + '>' + linkText + '</a>';
}


module.exports = { sendConfirmation, sendSalePrice, sendRemovingPriceAlert };
