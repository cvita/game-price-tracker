const nodemailer = require('nodemailer');

var emailPassword = process.env.emailPassword || require('../local-dev-creds').emailPassword;

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'game.price.tracker@gmail.com',
        pass: emailPassword
    }
});

module.exports = function sendEmail(to, subject, message) {
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
};
