const nodemailer = require('nodemailer');
const decrypt = require('./decrypt');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'nodeUser123@gmail.com',
        pass: decrypt('0c70bbc027e5827b91a098')
    }
});

module.exports = function sendEmail(to, subject, message) {
    const mailOptions = {
        from: 'nodeUser123@gmail.com',
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