const nodemailer = require('nodemailer');
const encryption = require('./encrypt');


const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'game.price.tracker@gmail.com',
        pass: process.env.emailPassword || require('../local-dev-creds').emailPassword
    }
});

function sendEmail(to, subject, message) {
    const mailOptions = {
        from: 'game.price.tracker@gmail.com',
        to: to,
        subject: subject,
        html: message
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Message sent!');
        }
    });
}

// Todo: Consider encrypting the mongoDoc._id
function sendConfirmationEmail(mongoDoc, uri) {
    var unsubscribeUrl = 'https://' + uri + '/#/unsubscribe?id=' + mongoDoc._id;
    unsubscribeUrl += '&user=' + encryption.encrypt(mongoDoc.userEmail);
    var userEmail = mongoDoc.userEmail;
    var subject = mongoDoc.game + ' is now being tracked';
    var message = (
        'Game Price Tracker is now tracking the price of <strong>' + mongoDoc.game + '</strong>. ' +
        'If it drops below ' + mongoDoc.price + ' before ' + mongoDoc.expiration + ', ' +
        'you will be messaged again at this email address.<br><br>' +
        'All done? <a href=' + unsubscribeUrl + '>Unsubscribe</a>'
    );
    sendEmail(userEmail, subject, message);
}

function sendSalePriceEmail(mongoDoc, newScrape) {
    var userEmail = mongoDoc.userEmail;
    var subject = mongoDoc.game + ' is on sale';
    var message = (
        mongoDoc.game + ' is currently on sale for ' + newScrape.price + '.' +
        ' Check it out <a href=' + mongoDoc.gameUrl + '>here</a>'
    );
    sendEmail(userEmail, subject, message);
}

// Todo: Add link to Game Price Tracker (once the app has a dedicated url)
function sendRemovingPriceAlertEmail(mongoDoc) {
    var userEmail = mongoDoc.userEmail;
    var subject = 'Removing Game Price Tracker alert for ' + mongoDoc.game;
    var message = (
        mongoDoc.game + ' has not gone on sale for 18 weeks. We are removing this price alert. ' +
        'Feel free to visit Game Price Tracker to sign up for another 18 week period.'
    );
    sendEmail(userEmail, subject, message);
}


const email = { sendConfirmationEmail, sendSalePriceEmail, sendRemovingPriceAlertEmail };
module.exports = email;
