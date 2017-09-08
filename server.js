const app = require('./app');
const path = require('path');
const expressStatic = require('express').static;


app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
    app
        .use('*', function (req, res, next) {
            if (req.headers['x-forwarded-proto'] !== 'https') { // Specific to Heroku
                res.redirect('https://' + req.get('host') + req.url);
            } else {
                next();
            }
        })
        .use(expressStatic('client/build'));


    app.get('*', function (req, res, next) {
            if (req.url.indexOf('main.') !== -1) {
                req.url = req.url + '.gz';
                res.set('Content-Encoding', 'gzip');

                if (req.url.indexOf('.css') !== -1) {
                    res.set('Content-Type', 'text/css');
                }
            }
            next();
            res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
        });

    // app.get('*', function (req, res) {
    //     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    // });
}

app.listen(app.get('port'), function () {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
