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

var mediaroute = require('./routes/media.js');
var renderAdmin = require('./routes/adminRoute.js');
var mediaPost = require('./models/media.js');

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

//get handlers
app.get('/', function (req, res) {
    return res.sendFile(__dirname + '/views/index.html');
});

app.get('/shop', function (req, res) {
    return res.sendFile(__dirname + '/views/index.html');
    //simulate click event on shop button
});

app.get('/kvka', function (req, res) {
    return res.sendFile(__dirname + '/views/kvka.html');
});

app.get('/samgat', function (req, res) {
    return res.sendFile(__dirname + '/views/samgat.html');
});

app.get('/submitdata', function (req, res) {
    return res.sendFile(__dirname + '/views/submitdata.html');
});

app.get('/login', function (req, res) {
    res.render('./login', { message: req.flash('error') });
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: '*Invalid username or password.'
}));

app.get('/register', function(req, res) {
    res.render('./register', { });
});

app.post('/register', function (req, res) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
        if (err) {
            return res.render('./register', { account: account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

app.use('/media', mediaroute);
app.use('/admin', renderAdmin);

//post handlers
app.post('/submitpost', function (req, res) {
    var post = new mediaPost();
    post.title = req.body.title;
    post.video = req.body.video;
    post.vidDesc = req.body.vidDesc;

    post.save(function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'Post Created' });
    });
});

//delete handlers
app.delete('/delete/:id', function (req, res) {
    mediaPost.remove({
        _id: req.params.id
    }, function (err, post) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});

module.exports = app;