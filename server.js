const express = require('express');
const app = express();
const path = require('path');
const bodyParserJSON = require('body-parser').json;

const gamesRoutes = require('./api/routes/games');
const priceAlertsRoutes = require('./api/routes/priceAlerts');
const blacklistRoutes = require('./api/routes/blacklist');


app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(app.get('port'), function () {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

app.use(bodyParserJSON());
gamesRoutes(app);
priceAlertsRoutes(app);
blacklistRoutes(app);
