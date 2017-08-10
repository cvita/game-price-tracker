const express = require('express');
const app = express();
const bodyParserJSON = require('body-parser').json;
app.use(bodyParserJSON());

const gamesRoutes = require('./api/routes/games');
const priceAlertsRoutes = require('./api/routes/priceAlerts');
const blacklistRoutes = require('./api/routes/blacklist');
gamesRoutes(app);
priceAlertsRoutes(app);
blacklistRoutes(app);


module.exports = app;
