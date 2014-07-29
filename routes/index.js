/**
 * Module dependencies
 */
var express = require('express'),
    controllers = require('../controllers');

/**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
var indexRouter = express.Router();

indexRouter.all('/secure/*', function(req, res, next) {
    res.status(403).send('Secure. Not allowed.');
});

/**
 * this accepts all request methods to the `/` path
 */
indexRouter.route('/')
    .all(controllers.index);

// about page route (http://localhost:8080/about)
indexRouter.get('/about', function(req, res) {
    res.render('about', {
        title: 'About'
    });
});

exports.indexRouter = indexRouter;