const app = require('./app');
const path = require('path');
const expressStatic = require('express').static;


app.set('port', (process.env.PORT || 3001));

app.get('*.js', function (req, res, next) {
    console.log('REQ.URL', req.url);
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

app.get('*.css', function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/css');
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
