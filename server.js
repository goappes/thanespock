/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    passport = require('passport');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config/config'),
    auth = require('./config/middlewares/authorization'),
    lazyboy = require('LazyBoy');

// Bootstrap db connection
// var db = lazyboy.create_connection(config.db);

// Bootstrap models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
});

// Express app
var app = exports = module.exports = express();

// Custom exceptions (Http errors status code)
require('./config/exceptions');

// Express settings
require('./config/express')(app);

// Bootstrap routes
require('./config/routes')(app, auth);

// Start the app by listening on <port>
var port = config.port;
app.listen(port, function () {
  console.log('Express app started on port ' + port);
});
