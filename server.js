const app = require('./app');
const path = require('path');
const expressStatic = require('express').static;


app.set('port', (process.env.PORT || 3001));

app.use('*', function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') { // Specific to Heroku
        res.redirect('https://' + req.get('host') + req.url);
    } else {
        next();
    }
});

// app.get('*.js*', function (req, res, next) {
//     if (req.url !== '/service-worker.js' && req.url !== '/manifest.json') {
//         req.url = req.url + '.gz';
//         res.set('Content-Encoding', 'gzip');
//     }
//     next();
// });

const gzippedFileExtensions = [
    '*main.*.js',
    '*main.*.js.map'
];

app.get('*', function (req, res, next) {
    if (gzippedFileExtensions.some(fileExt => req.url === fileExt)) {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
    }

    // if (req.url !== '/service-worker.js' && req.url !== '/manifest.json') {
    //     req.url = req.url + '.gz';
    //     res.set('Content-Encoding', 'gzip');
    // }
    next();
});

app.get('*.css*', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/css'); // try setting Content-type for service-worker.js
    next();
});

if (process.env.NODE_ENV === 'production') {
    app.use(expressStatic('client/build'));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(app.get('port'), function () {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
