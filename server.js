/*jshint esversion: 6 */

var express = require("express");
var path = require('path');
var app = module.exports = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var port = process.env.port || 3000;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var indexRoute = require('./routes/index.js');
var mediaRoute = require('./routes/media.js');
var adminRoute = require('./routes/admin.js');

//Set up and connect to mongo database

mongoose.connect('mongodb://dimethyltryptamine:Dmtmakeamandream1@ds021691.mlab.com:21691/staysavage-media-content', function (err) {
    if (err) return console.log(err);
    else {
        console.log('Connection Succesful');
    }
    //connect to server
    app.listen(port, function () {
        console.log('listening on port ' + port);
    });
});

// Setup Views & View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Define ./public as static
app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/partials', express.static(__dirname + '/views/partials'));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(cookieParser());
app.use(require('express-session')({
    secret: 'staysavagesecret',
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());

//Passport engine
app.use(passport.initialize());
app.use(passport.session());

//passport config
var Account = require('./models/account.js');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//Get routes requests
app.use('/', indexRoute);
app.use('/media', mediaRoute);
app.use('/admin', adminRoute);

module.exports = app;