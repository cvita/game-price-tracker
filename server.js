const app = require('./app');
const path = require('path');
const expressStatic = require('express').static;


app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
    app.use('*', function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') { // Specific to Heroku
            res.redirect('https://' + req.get('host') + req.url);
        } else {
            next();
        }
    });

    app.get('*', function (req, res, next) {
        if (req.url.indexOf('main.') !== -1) {
            req.url = req.url + '.gz';
            res.set('Content-Encoding', 'gzip');
            const contentType = req.url.indexOf('.css') !== -1 ? 'text/css' : 'application/javascript';
            res.set('Content-Type', contentType);
        }
        next();
    });

    app.use(expressStatic('client/build'));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(app.get('port'), function () {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
