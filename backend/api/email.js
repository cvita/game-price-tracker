const nodemailer = require('nodemailer');
const { encrypt } = require('./encrypt');


function sendEmail(email, subject, message) {
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
}


function sendConfirmation(info) {
    console.log(info);
    const { title, email, price, expires } = info;
    const subject = `${title} is now being tracked`;
    const message = (
        `<p>Game Price Tracker is now tracking the price of <strong>${title}</strong>. If it drops below $${price} before ${new Date(expires).toDateString()}, you will be messaged again at this email address.</p>
        <p>Use ${generateManagePriceAlertLink(info, 'this link')} to manage your price alert, or to unsubscribe completely.</p>`
    );
    sendEmail(email, subject, message);
}

function sendSalePrice(info, salePrice, url) {
    console.log(`sendSalePrice(${info.userEmail})`);
    const { gameTitle, userEmail } = info;
    const subject = gameTitle + ' is on sale';
    const message = (
        gameTitle + ' is currently on sale for $' + salePrice + ' on the Sony PlayStation store. ' +
        'Check it out <a href=' + url + '>here</a>' +
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
    const { alert_id, email } = info;
    const url = process.env.NODE_ENV === 'production' ?
        'https://game-price-tracker.herokuapp.com/manage' :
        'http://localhost:3000/manage';
    return (`<a href=${url}/?alert_id=${encrypt(alert_id.toString())}&email=${encrypt(email)}>${linkText}</a>`);
}


module.exports = {
    sendConfirmation,
    sendSalePrice,
    sendRemovingPriceAlert
};
