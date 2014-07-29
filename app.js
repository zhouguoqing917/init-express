var express = require('express'),
    config = require('./config'),
    path = require('path'),
    helmet = require('helmet'),
    csrf = require('csurf'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    cookieSession = require('cookie-session'),
    methodOverride = require('method-override'),
    compress = require('compression'),
    routes = require('./routes'),
    app = express();

app.set('port', (process.env.PORT || config.serverport));
app.use(compress());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(helmet());
app.use(methodOverride());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('case sensitive routing', true);
app.use(cookieParser('guess me'));
app.use(cookieSession({
    secret: 'dant guess me',
}));

// CSRF Protection
app.use(csrf());
app.use(function(req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.locals.csrf_token = req.csrfToken();
    next();
});

app.use(function(req, res, next) {
    app.log(req.method + ': ' + req.url + ' ');
    next();
});

app.log = function(message) {
    console.log(new Date().getTime() + ': ' + message);
};

app.use(express.static(path.join(__dirname, 'public')))
app.use(routes.indexRouter);

app.use(function(req, res) {
    res.status(404).send('404 - No route or static file matched ' + req.url + '.');
});

// START SERVER
app.listen(app.get('port'), function() {
    console.log('Node app is running at localhost:' + app.get('port'));
});

module.exports = app;