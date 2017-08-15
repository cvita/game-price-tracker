const nodemailer = require('nodemailer');
const { checkIfUserIsOnBlacklist } = require('./routes/Model');
const { encrypt } = require('./encrypt');


function sendEmail(email, subject, message) {
    checkIfUserIsOnBlacklist(email).then(result => {
        if (result) {
            return console.warn(`Email not sent: ${email} is on blacklist.`);
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
                throw new Error(err.message);
                return;
            }
            console.log(`Message sent to: ${email}`);
        });
    });
}


function sendConfirmation(info) {
    console.log(`sendConfirmation(${info.userEmail})`);
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

function sendSalePrice(info, url) {
    console.log(`sendSalePrice(${info.userEmail})`);
    const { gameTitle, userEmail, price } = info;
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
    console.log(`sendRemovingPriceAlert(${info.userEmail})`);
    const { gameTitle, userEmail } = info;
    const subject = 'Removing Game Price Tracker alert for ' + gameTitle;
    const message = (
        gameTitle + ' has not gone on sale for 18 weeks. We are removing this price alert. ' +
        'Feel free to visit Game Price Tracker to sign up for another 18 week period.'
    );
    sendEmail(userEmail, subject, message);
}

function generateManagePriceAlertLink(info, linkText) {
    const { _id, userEmail } = info;
    const userDetails = encrypt('id:' + _id + 'user:' + userEmail);
    const managePriceAlertUrl = process.env.NODE_ENV === 'production' ?
        'https://game-price-tracker.herokuapp.com/manage/' :
        'http://localhost:3000/manage/';
    return '<a href=' + managePriceAlertUrl + userDetails + '>' + linkText + '</a>';
}


module.exports = {
    sendConfirmation,
    sendSalePrice,
    sendRemovingPriceAlert
};
