const dbPassword = process.env.dbPassword || require('../local-dev-creds').dbPassword;

module.exports = {
    url: 'mongodb://game-price-tracker-user1:' +
    dbPassword +
    '@ds157971.mlab.com:57971/game-price-tracker-db'
};