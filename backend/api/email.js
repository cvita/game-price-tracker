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

function sendSalePrice(priceAlert, info) {
    console.log(`sendSalePrice(${priceAlert.email})`);
    const { email } = priceAlert;
    const { title, game_id, price_general } = info;
    const url = `https://store.playstation.com/#!/en-us/games/cid=${game_id}`;
    const subject = `${title} is on sale`;
    const message = (
        `<p>${title} is currently on sale for $${price_general} on the Sony PlayStation store. Check it out <a href=${url}>here</a></p>
        <p>No more? ${generateManagePriceAlertLink(Object.assign(info, priceAlert), 'unsubscribe')}</p>`
    );
    sendEmail(email, subject, message);
}

function sendRemovingPriceAlert(info) {
    console.log(`sendRemovingPriceAlert(${info.email})`);
    const { game_id, email } = info;
    const url = process.env.NODE_ENV === 'production' ?
        `https://game-price-tracker.herokuapp.com/games/${game_id}` :
        `http://localhost:3000/games/${game_id}`;
    const subject = `Removing Game Price Tracker alert for game id: ${game_id}`;
    const message = (
        `<p><a href=${url}>You\'re selected game</a> has not gone on sale for 18 weeks. We are removing this price alert.</p>
        <p>Feel free to visit Game Price Tracker to sign up again.</p>`
    );
    sendEmail(email, subject, message);
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
