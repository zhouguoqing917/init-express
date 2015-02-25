var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var lusca = require('lusca');
var methodOverride = require('method-override');
var flash = require('express-flash');
var path = require('path');
var expressValidator = require('express-validator');
var routes = require('./routes');
var secrets = require('./config/secrets');
var assets = require('./config/assets');

var app = express();

// app.set('env', 'production');
// console.log(app.get('env'));

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
    secret: secrets.session,
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(lusca({
    csrf: true,
    xframe: 'SAMEORIGIN',
    xssProtection: true
}));
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});
app.use(express.static(path.join(__dirname, assets.paths.dist), {
    maxAge: 31557600000
}));

if (app.get('env') === 'production') {
    //
} else if (app.get('env') === 'development') {
    app.use(errorHandler());
}

app.use(routes.indexRouter);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;