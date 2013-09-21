/**
 * Module dependencies.
 */
var express = require('express'),
    flash = require('connect-flash'),
    helpers = require('view-helpers'),
    config = require('./config'),
    passport = require('passport'),
    forward = require('../forward'),
    middlewares = require('./middlewares');

module.exports = function (app) {
    // Should be placed before express.static
    app.use(express.compress({
      filter: function (req, res) {
        return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
      },
      level: 9
    }));

    // Proxy to couchdb
    app.use(forward(/\/db\/(.*)/, config.db));

    // Setting the fav icon and static folder
    app.use(express.favicon());
    app.use(express.static(config.root + '/public'));

    // Don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
        app.use(express.logger('dev'));
    }

    // Enable jsonp
    app.enable('jsonp callback');

    app.configure(function () {
        app.use(express.cookieParser());
        app.use(express.bodyParser());
        app.use(express.methodOverride());

        // Session storage
        app.use(express.session({
            secret: 'THANESPOCK'
            // store: new mongoStore({
            //     url: config.db,
            //     collection: 'sessions'
            // })
        }));

        // Flash messages
        app.use(flash());

        // Dynamic helpers
        app.use(helpers(config.app.name));

        // Passport
        app.use(passport.initialize());
        app.use(passport.session());

        app.use(app.router);

        // Not found route
        app.use(middlewares.notFound);

        // Handle custom exceptions (Http errors status code)
        app.use(middlewares.clientError);

        // Handle all errors
        app.use(middlewares.errorHandler);

    });
};
